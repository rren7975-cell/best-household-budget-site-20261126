# Hearth & Ledger — best-household-budget-site-20261126-1457

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/rren7975-cell/best-household-budget-site-20261126/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/rren7975-cell/best-household-budget-site-20261126/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

**Hearth & Ledger** is a household budget site for the Marlowe household — Maya & Tom, two kids, one shared pot. It works in a browser on desktop and phone, entirely from its own files: no network, no build step, no framework. Every figure on every page is computed from the same 60 real transactions for November 2026, so the dashboard, budgets, goals and reports can never disagree.

## What it does

- **Dashboard** (`#/`) — money in ($6,180), spent ($4,391.32), set aside ($1,200) and left to spend ($588.68); a spending-by-category donut with a full legend; the five budgets nearest their ceiling; the latest spending; and two savings goals. A month switcher reworks the whole summary for October 2026.
- **Transactions** (`#/transactions`) — all 60 November rows, newest first, with an add-a-transaction form that really adds (totals everywhere update at once), category filter chips and a live search.
- **Budgets** (`#/budgets`) — one envelope per category with spent-vs-budget, a progress bar, money left, and an edit box to set a new monthly budget; the page, the dashboard and the donut all follow the change.
- **Goals** (`#/goals`) — four named savings goals (emergency fund, summer holiday, new bikes, home repaint) with progress bars and +$25 / +$50 / +$100 buttons that move money in for real.
- **Reports** (`#/reports`) — spending donut, a six-month trend chart, the eight places money went most, a full income breakdown, and four written insights drawn from the month's actual numbers.

## The figures

November 2026: $6,180 in (salary $4,200, freelance $1,850, interest $85, a $45 refund), $4,391.32 spent across ten everyday categories, $1,200 moved to savings on payday — a 19% savings rate. Dining out ran $47 over its $240 budget; groceries came in $47 under $720. October's summary is kept as a compact second month so the switcher shows real figures, not an empty page.

## Run it

```sh
node serve.ts            # serves app/ on http://localhost:8080
```

Open http://localhost:8080 in desktop Chrome and at a phone size. The screenshots in `screenshots/` were taken of the site running this way (see `shots.json` for the views). Household edits (added transactions, changed budgets, goal contributions) are kept in the browser's own storage and never leave it.
