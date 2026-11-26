// Hearth & Ledger — the whole app: state, router and every view.
// All money is computed from data.js at render time, so the dashboard,
// budgets, goals and reports can never disagree with each other.

import { CATEGORIES, TRANSACTIONS, OCTOBER, TREND, GOALS, INSIGHTS, HOUSEHOLD } from './data.js';
import { money, money0, pct, shortDate, esc } from './format.js';
import { donut, bars } from './charts.js';

const $ = (sel) => document.querySelector(sel);
const app = $('#app');

// ---- persisted tweaks (the household's own edits, kept in this browser) ----
function load(key, fallback) {
  try {
    const raw = localStorage.getItem('hl-' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem('hl-' + key, JSON.stringify(value)); } catch (e) { /* private mode: edits still work for the visit */ }
}

const state = {
  month: 'nov', // 'nov' | 'oct'
  filter: 'all',
  search: '',
  added: load('added', []), // transactions the household added
  budgetOverrides: load('budgets', {}), // {categoryId: newBudget}
  goalSaved: load('goals', {}), // {goalId: savedAmount}
};

// ---- derived figures ----
function allTransactions() {
  return TRANSACTIONS.concat(state.added);
}
function budgetOf(cat) {
  return state.budgetOverrides[cat.id] ?? cat.budget;
}
function spentByCategory(month) {
  const spent = {};
  CATEGORIES.forEach((c) => { spent[c.id] = 0; });
  if (month === 'oct') return { ...OCTOBER.spent };
  allTransactions().forEach((t) => {
    if (t.category in spent && t.category !== 'savings' && t.category !== 'income') spent[t.category] += t.amount;
  });
  return spent;
}
function incomeTotal(month) {
  if (month === 'oct') return OCTOBER.income;
  return allTransactions().filter((t) => t.category === 'income').reduce((a, t) => a + t.amount, 0);
}
function savingsTotal(month) {
  if (month === 'oct') return OCTOBER.savings;
  return allTransactions().filter((t) => t.category === 'savings').reduce((a, t) => a + t.amount, 0);
}
function summary(month) {
  const spent = spentByCategory(month);
  const spentTotal = Object.values(spent).reduce((a, b) => a + b, 0);
  const income = incomeTotal(month);
  const savings = savingsTotal(month);
  return { spent, spentTotal, income, savings, left: income - spentTotal - savings };
}
function catById(id) { return CATEGORIES.find((c) => c.id === id); }

// ---- shared bits ----
function navLink(hash, label) {
  const active = location.hash.replace('#', '') === hash.replace('#', '') || (hash === '#/' && (location.hash === '' || location.hash === '#/'));
  return `<a href="${hash}" class="${active ? 'active' : ''}">${label}</a>`;
}
function paceBar(spent, budget) {
  const p = budget ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  const trueP = pct(spent, budget);
  const cls = spent > budget ? 'over' : p >= 80 ? 'warm' : 'ok';
  return `<div class="bar"><span class="${cls}" style="width:${p}%"></span></div>
    <div class="pace-line"><span>${money0(spent)} of ${money0(budget)}</span><span>${trueP}%${spent > budget ? ' — over by ' + money0(spent - budget) : ''}</span></div>`;
}
function monthSwitcher() {
  return `<div class="switcher" role="group" aria-label="Summary month">
    <button data-month="nov" class="${state.month === 'nov' ? 'on' : ''}">November 2026</button>
    <button data-month="oct" class="${state.month === 'oct' ? 'on' : ''}">October 2026</button>
  </div>`;
}

// ---- views ----
function viewDashboard() {
  const s = summary(state.month);
  const monthLabel = state.month === 'nov' ? 'November 2026' : 'October 2026';
  const slices = CATEGORIES.filter((c) => c.id !== 'savings').map((c) => ({ label: c.label, value: s.spent[c.id], color: c.color }));
  const legend = slices.slice().sort((a, b) => b.value - a.value).map((sl) => {
    const cat = CATEGORIES.find((c) => c.label === sl.label);
    return `<li><span class="dot" style="background:${sl.color}"></span>${sl.label}<b>${money0(sl.value)}</b><span class="muted">of ${money0(budgetOf(cat))}</span></li>`;
  }).join('');
  const pace = CATEGORIES.filter((c) => c.id !== 'savings')
    .map((c) => ({ c, spent: s.spent[c.id], budget: budgetOf(c), ratio: s.spent[c.id] / budgetOf(c) }))
    .sort((a, b) => b.ratio - a.ratio).slice(0, 5)
    .map(({ c, spent, budget }) => `<div class="pace-row"><div class="pace-head"><span>${c.label}</span><span>${pct(spent, budget)}%</span></div>${paceBar(spent, budget)}</div>`).join('');
  const recent = allTransactions().filter((t) => t.category !== 'income').slice(-6).reverse()
    .map((t) => `<li><span class="t-date">${shortDate(t.date)}</span><span class="t-merchant">${esc(t.merchant)}</span><span class="t-cat">${catById(t.category)?.label ?? t.category}</span><b class="t-amt ${t.category === 'savings' ? 'save' : ''}">${t.category === 'savings' ? '→ savings ' : ''}${money(t.amount)}</b></li>`).join('');
  const goalCards = GOALS.slice(0, 2).map((g) => {
    const saved = state.goalSaved[g.id] ?? g.saved;
    return `<div class="goal-mini"><div class="goal-head"><span>${g.name}</span><b>${pct(saved, g.target)}%</b></div><div class="bar"><span class="ok" style="width:${Math.min(100, pct(saved, g.target))}%"></span></div><p>${money0(saved)} of ${money0(g.target)} saved</p></div>`;
  }).join('');

  return `
  <section class="hero">
    <div>
      <p class="eyebrow">${HOUSEHOLD.name} · ${HOUSEHOLD.members}</p>
      <h1>November, in one calm page.</h1>
      <p class="lede">Money in, money out, and what is left — for a household that would rather know than guess. ${monthLabel} below, worked out from ${allTransactions().length} real transactions.</p>
      ${monthSwitcher()}
    </div>
    <div class="hero-note"><strong>${money0(s.savings)}</strong> moved to savings on payday, before anything was spent. That is the whole trick.</div>
  </section>
  <section class="cards">
    <div class="card stat"><span>Money in</span><strong>${money(s.income)}</strong><p>Salary, freelance, interest &amp; a refund</p></div>
    <div class="card stat"><span>Spent so far</span><strong>${money(s.spentTotal)}</strong><p>Across ${CATEGORIES.filter((c) => c.id !== 'savings').length} everyday categories</p></div>
    <div class="card stat"><span>Set aside</span><strong>${money(s.savings)}</strong><p>${pct(s.savings, s.income)}% of income, saved first</p></div>
    <div class="card stat good"><span>Left to spend</span><strong>${money(s.left)}</strong><p>Free until 30 November, no guilt attached</p></div>
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>Where November went</h2>
      <div class="donut-wrap">${donut(slices, 'spent', money0(s.spentTotal))}<ul class="legend">${legend}</ul></div>
    </div>
    <div class="card">
      <h2>Closest to the limit</h2>
      <p class="muted">The five budgets nearest their ceiling, so nothing sneaks past.</p>
      ${pace}
      <p class="more"><a href="#/budgets">See every budget →</a></p>
    </div>
  </section>
  <section class="grid-2">
    <div class="card">
      <h2>Latest spending</h2>
      <ul class="tx-mini">${recent}</ul>
      <p class="more"><a href="#/transactions">All ${allTransactions().length} transactions →</a></p>
    </div>
    <div class="card">
      <h2>Savings goals</h2>
      ${goalCards}
      <p class="more"><a href="#/goals">All four goals →</a></p>
    </div>
  </section>`;
}

function viewTransactions() {
  const rows = allTransactions().filter((t) => t.category !== 'income').slice().reverse();
  const filtered = rows.filter((t) => (state.filter === 'all' || t.category === state.filter)
    && (!state.search || (t.merchant + ' ' + (t.note || '')).toLowerCase().includes(state.search.toLowerCase())));
  const chips = [{ id: 'all', label: 'All' }].concat(CATEGORIES.filter((c) => c.id !== 'savings').map((c) => ({ id: c.id, label: c.label })))
    .map((c) => `<button class="chip ${state.filter === c.id ? 'on' : ''}" data-filter="${c.id}">${c.label}</button>`).join('');
  const options = CATEGORIES.filter((c) => c.id !== 'savings').map((c) => `<option value="${c.id}">${c.label}</option>`).join('');
  const body = filtered.map((t) => `<tr><td>${shortDate(t.date)}</td><td>${esc(t.merchant)}<small>${esc(t.note || '')}</small></td><td><span class="tag" style="--c:${catById(t.category)?.color ?? '#888'}">${catById(t.category)?.label ?? t.category}</span></td><td class="num ${t.category === 'savings' ? 'save' : ''}">${money(t.amount)}</td></tr>`).join('')
    || `<tr><td colspan="4" class="empty">Nothing matches that filter yet — try clearing the search.</td></tr>`;
  const total = filtered.reduce((a, t) => a + (t.category === 'savings' ? 0 : t.amount), 0);
  return `
  <section class="page-head"><h1>Transactions</h1><p>Every dollar the household moved in November 2026, newest first. Add one below and every total on the site updates at once.</p></section>
  <section class="card">
    <h2>Add a transaction</h2>
    <form id="add-tx" class="add-form">
      <label>Date <input type="date" name="date" value="2026-11-26" required></label>
      <label>What was it? <input type="text" name="merchant" placeholder="e.g. GreenMart — weekly shop" required maxlength="80"></label>
      <label>Category <select name="category">${options}</select></label>
      <label>Amount ($) <input type="number" name="amount" min="0.01" step="0.01" placeholder="0.00" required></label>
      <button type="submit">Add it</button>
    </form>
    <p class="form-msg" id="add-msg" aria-live="polite"></p>
  </section>
  <section class="card">
    <div class="filter-row">${chips}</div>
    <div class="filter-row"><input type="search" id="tx-search" placeholder="Search merchant or note…" value="${esc(state.search)}" aria-label="Search transactions"></div>
    <p class="count">Showing ${filtered.length} of ${rows.length} rows · ${money(total)} spent in view</p>
    <div class="table-wrap"><table>
      <thead><tr><th>Date</th><th>What</th><th>Category</th><th class="num">Amount</th></tr></thead>
      <tbody>${body}</tbody>
    </table></div>
  </section>`;
}

function viewBudgets() {
  const s = summary(state.month);
  const monthLabel = state.month === 'nov' ? 'November 2026' : 'October 2026';
  const totalBudget = CATEGORIES.filter((c) => c.id !== 'savings').reduce((a, c) => a + budgetOf(c), 0);
  const cards = CATEGORIES.filter((c) => c.id !== 'savings').map((c) => {
    const spent = s.spent[c.id], budget = budgetOf(c);
    const remaining = budget - spent;
    return `<div class="card budget-card">
      <div class="budget-head"><span class="dot" style="background:${c.color}"></span><h3>${c.label}</h3><b>${money0(spent)} / ${money0(budget)}</b></div>
      <p class="muted">${c.hint}</p>
      ${paceBar(spent, budget)}
      <p class="${remaining < 0 ? 'over-text' : 'left-text'}">${remaining < 0 ? money0(-remaining) + ' over budget' : money0(remaining) + ' left'}</p>
      <form class="budget-edit" data-cat="${c.id}">
        <label>Monthly budget $ <input type="number" name="budget" min="0" step="1" value="${budget}" required></label>
        <button type="submit">Set budget</button>
      </form>
    </div>`;
  }).join('');
  return `
  <section class="page-head"><h1>Budgets</h1><p>One envelope per category for ${monthLabel}. Change any budget and the dashboard, the donut and the pace bars all follow it.</p></section>
  <section class="card total-row"><span>All everyday budgets</span><strong>${money0(totalBudget)}</strong><span>Spent ${money0(s.spentTotal)} · ${money0(totalBudget - s.spentTotal)} still in the envelopes</span></section>
  <section class="budget-grid">${cards}</section>`;
}

function viewGoals() {
  const cards = GOALS.map((g) => {
    const saved = state.goalSaved[g.id] ?? g.saved;
    const left = Math.max(0, g.target - saved);
    return `<div class="card goal-card">
      <h3>${g.name}</h3><p class="muted">${g.note}</p>
      <div class="goal-big"><strong>${money0(saved)}</strong><span>of ${money0(g.target)}</span></div>
      <div class="bar tall"><span class="ok" style="width:${Math.min(100, pct(saved, g.target))}%"></span></div>
      <p>${pct(saved, g.target)}% there · ${left ? money0(left) + ' to go' : 'Goal reached — nicely done.'}</p>
      <div class="goal-add">
        <button data-goal="${g.id}" data-amt="25">+ $25</button>
        <button data-goal="${g.id}" data-amt="50">+ $50</button>
        <button data-goal="${g.id}" data-amt="100">+ $100</button>
      </div>
    </div>`;
  }).join('');
  const totalSaved = GOALS.reduce((a, g) => a + (state.goalSaved[g.id] ?? g.saved), 0);
  const totalTarget = GOALS.reduce((a, g) => a + g.target, 0);
  return `
  <section class="page-head"><h1>Savings goals</h1><p>${money0(totalSaved)} saved toward ${money0(totalTarget)} of named goals. Tap a button to move money in — the bar moves with it.</p></section>
  <section class="card rule"><h2>The payday rule</h2><p>Savings moves on the 1st, before rent, before groceries, before anything fun. $1,200 left the current account on 1 November and the household never missed it — that is why the emergency fund is already 70% full.</p></section>
  <section class="goal-grid">${cards}</section>`;
}

function viewReports() {
  const s = summary('nov');
  const slices = CATEGORIES.filter((c) => c.id !== 'savings').map((c) => ({ label: c.label, value: s.spent[c.id], color: c.color }));
  const merchants = {};
  allTransactions().filter((t) => t.category !== 'income' && t.category !== 'savings').forEach((t) => {
    merchants[t.merchant] = (merchants[t.merchant] || 0) + t.amount;
  });
  const top = Object.entries(merchants).sort((a, b) => b[1] - a[1]).slice(0, 8)
    .map(([name, amt], i) => `<li><span>${i + 1}. ${esc(name)}</span><b>${money(amt)}</b></li>`).join('');
  const insights = INSIGHTS.map((x) => `<div class="card insight"><h3>${x.title}</h3><p>${x.body}</p></div>`).join('');
  return `
  <section class="page-head"><h1>Reports</h1><p>Six months of spending, the places the money actually went, and what the numbers are saying this month.</p></section>
  <section class="grid-2">
    <div class="card"><h2>Spending by category</h2><div class="donut-wrap">${donut(slices, 'spent', money0(s.spentTotal))}</div></div>
    <div class="card"><h2>Six-month trend</h2>${bars(TREND.map((t) => ({ label: t.month, value: t.spent })))}<p class="muted">Spending, excluding savings transfers. November is the second-highest month — the rent is fixed, so the wobble is groceries and dining out.</p></div>
  </section>
  <section class="grid-2">
    <div class="card"><h2>Top places money went</h2><ol class="top-list">${top}</ol></div>
    <div class="card"><h2>Income, November</h2>
      <ul class="income-list">
        <li><span>Maya — salary</span><b>${money(4200)}</b></li>
        <li><span>Tom — freelance</span><b>${money(1850)}</b></li>
        <li><span>Bank interest</span><b>${money(85)}</b></li>
        <li><span>Refund — returned jacket</span><b>${money(45)}</b></li>
        <li class="total"><span>Total in</span><b>${money(6180)}</b></li>
      </ul>
      <p class="muted">Freelance is the swing factor: a good month adds $1,850, a quiet one half that. The budgets are built to survive a quiet one.</p>
    </div>
  </section>
  <section><h2 class="section-title">What the numbers say</h2><div class="insight-grid">${insights}</div></section>`;
}

// ---- router & wiring ----
const ROUTES = { '/': viewDashboard, '/transactions': viewTransactions, '/budgets': viewBudgets, '/goals': viewGoals, '/reports': viewReports };

function route() {
  const path = (location.hash || '#/').replace('#', '') || '/';
  return ROUTES[path] ? path : '/';
}

function render() {
  const path = route();
  app.innerHTML = ROUTES[path]();
  document.querySelectorAll('header nav a').forEach((a) => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === '#' + path || (href === '#/' && path === '/'));
  });
  window.__shotReady = true;
}

document.addEventListener('click', (e) => {
  const monthBtn = e.target.closest('[data-month]');
  if (monthBtn) { state.month = monthBtn.dataset.month; render(); return; }
  const chip = e.target.closest('[data-filter]');
  if (chip) { state.filter = chip.dataset.filter; render(); return; }
  const goalBtn = e.target.closest('[data-goal]');
  if (goalBtn) {
    const g = GOALS.find((x) => x.id === goalBtn.dataset.goal);
    const now = (state.goalSaved[g.id] ?? g.saved) + Number(goalBtn.dataset.amt);
    state.goalSaved[g.id] = now;
    save('goals', state.goalSaved);
    render();
  }
});

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id === 'add-tx') {
    const fd = new FormData(e.target);
    const tx = {
      date: fd.get('date'), merchant: String(fd.get('merchant')).trim(),
      category: fd.get('category'), amount: Math.round(Number(fd.get('amount')) * 100) / 100,
      note: 'Added by the household',
    };
    if (!tx.merchant || !(tx.amount > 0)) return;
    state.added.push(tx);
    save('added', state.added);
    render();
    const msg = $('#add-msg');
    if (msg) msg.textContent = `Added ${tx.merchant} — ${money(tx.amount)}. Totals everywhere now include it.`;
    return;
  }
  const edit = e.target.closest('.budget-edit');
  if (edit) {
    const fd = new FormData(edit);
    const v = Math.round(Number(fd.get('budget')));
    if (v >= 0) {
      state.budgetOverrides[edit.dataset.cat] = v;
      save('budgets', state.budgetOverrides);
      render();
    }
  }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'tx-search') {
    state.search = e.target.value;
    const rows = allTransactions().filter((t) => t.category !== 'income').slice().reverse();
    const filtered = rows.filter((t) => (state.filter === 'all' || t.category === state.filter)
      && (!state.search || (t.merchant + ' ' + (t.note || '')).toLowerCase().includes(state.search.toLowerCase())));
    const tbody = document.querySelector('table tbody');
    const total = filtered.reduce((a, t) => a + (t.category === 'savings' ? 0 : t.amount), 0);
    if (tbody) {
      tbody.innerHTML = filtered.map((t) => `<tr><td>${shortDate(t.date)}</td><td>${esc(t.merchant)}<small>${esc(t.note || '')}</small></td><td><span class="tag" style="--c:${catById(t.category)?.color ?? '#888'}">${catById(t.category)?.label ?? t.category}</span></td><td class="num">${money(t.amount)}</td></tr>`).join('')
        || `<tr><td colspan="4" class="empty">Nothing matches that filter yet — try clearing the search.</td></tr>`;
    }
    const count = document.querySelector('.count');
    if (count) count.textContent = `Showing ${filtered.length} of ${rows.length} rows · ${money(total)} spent in view`;
  }
});

window.addEventListener('hashchange', render);
render();
