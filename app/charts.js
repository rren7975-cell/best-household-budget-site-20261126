// Hand-rolled SVG charts — no library, no network, a few hundred bytes
// each. Both return an SVG string the views drop into the page.

// Donut: slices of [{label, value, color}]. The hole carries the total.
export function donut(slices, totalLabel, totalValue) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const cx = 110, cy = 110, r = 88, inner = 58;
  let a0 = -Math.PI / 2;
  const parts = slices.map((s) => {
    const frac = s.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const ix0 = cx + inner * Math.cos(a1), iy0 = cy + inner * Math.sin(a1);
    const ix1 = cx + inner * Math.cos(a0), iy1 = cy + inner * Math.sin(a0);
    const d = `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${ix0.toFixed(1)} ${iy0.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${ix1.toFixed(1)} ${iy1.toFixed(1)} Z`;
    a0 = a1;
    return `<path d="${d}" fill="${s.color}"><title>${s.label}: $${s.value.toLocaleString('en-US', { maximumFractionDigits: 0 })}</title></path>`;
  });
  return `<svg viewBox="0 0 220 220" role="img" aria-label="Spending by category" class="donut">
    ${parts.join('')}
    <text x="110" y="104" text-anchor="middle" class="donut-total">${totalValue}</text>
    <text x="110" y="124" text-anchor="middle" class="donut-label">${totalLabel}</text>
  </svg>`;
}

// Vertical bars: [{label, value}], one bar each, with a value on top.
export function bars(rows, height = 150) {
  const w = 460, pad = 8, max = Math.max(...rows.map((r) => r.value), 1);
  const bw = (w - pad * 2) / rows.length;
  const parts = rows.map((r, i) => {
    const h = Math.max(4, ((height - 34) / max) * r.value);
    const x = pad + i * bw + bw * 0.18;
    const y = height - 22 - h;
    const current = i === rows.length - 1;
    return `<g>
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${current ? '#c65d3b' : '#4d7c5f'}">
        <title>${r.label}: $${r.value.toLocaleString('en-US')}</title>
      </rect>
      <text x="${(x + bw * 0.32).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" class="bar-value">$${r.value.toLocaleString('en-US')}</text>
      <text x="${(x + bw * 0.32).toFixed(1)}" y="${height - 6}" text-anchor="middle" class="bar-label">${r.label}</text>
    </g>`;
  });
  return `<svg viewBox="0 0 ${w} ${height}" role="img" aria-label="Monthly spending trend" class="bars">${parts.join('')}</svg>`;
}
