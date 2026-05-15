'use strict';

function billingUnits(minutes) {
  if (minutes <= 0) return 0;
  let total = 0;
  const tier1 = Math.min(minutes, 60);
  total += Math.ceil(tier1 / 15) * 1;
  if (minutes > 60) {
    const tier2 = Math.min(minutes - 60, 30);
    total += Math.ceil(tier2 / 15) * 2;
  }
  if (minutes > 90) {
    const tier3 = minutes - 90;
    total += Math.ceil(tier3 / 15) * 3;
  }
  return total;
}

function tierBreakdown(minutes) {
  const tiers = [];
  if (minutes <= 0) return tiers;

  const t1 = Math.min(minutes, 60);
  tiers.push({ label: 'Tier 1', range: '0–60 min', minutes: t1, units: Math.ceil(t1 / 15) });

  if (minutes > 60) {
    const t2 = Math.min(minutes - 60, 30);
    tiers.push({ label: 'Tier 2', range: '60–90 min', minutes: t2, units: Math.ceil(t2 / 15) * 2 });
  }

  if (minutes > 90) {
    const t3 = minutes - 90;
    tiers.push({ label: 'Tier 3', range: '90+ min', minutes: t3, units: Math.ceil(t3 / 15) * 3 });
  }

  return tiers;
}

function timeToMinutes(str) {
  if (!str) return null;
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

function formatElapsed(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function setNow() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  endInput.value = `${hh}:${mm}`;
  update();
}

function update() {
  const startMin = timeToMinutes(startInput.value);
  const endMin   = timeToMinutes(endInput.value);

  if (startMin === null || endMin === null || endInput.value === '') {
    resultsEl.classList.remove('visible');
    return;
  }

  let elapsed = endMin - startMin;
  let overnight = false;

  if (elapsed <= 0) {
    elapsed += 24 * 60;
    overnight = true;
  }

  if (elapsed === 0) {
    resultsEl.classList.remove('visible');
    return;
  }

  const units  = billingUnits(elapsed);
  const tiers  = tierBreakdown(elapsed);

  elapsedDisplay.textContent = formatElapsed(elapsed);
  unitsDisplay.textContent   = String(units);

  overnightBadge.classList.toggle('visible', overnight);
  overnightBadge.setAttribute('aria-hidden', String(!overnight));

  tierBreakdownEl.innerHTML = tiers.map(t =>
    `<div class="tier-row" role="row">` +
      `<span class="tier-name" role="cell">${t.label}</span>` +
      `<span class="tier-detail" role="cell">${t.minutes} min</span>` +
      `<span class="tier-units" role="cell">${t.units} u</span>` +
    `</div>`
  ).join('');

  resultsEl.classList.add('visible');
}

const startInput      = document.getElementById('start-time');
const endInput        = document.getElementById('end-time');
const nowBtn          = document.getElementById('now-btn');
const resultsEl       = document.getElementById('results');
const elapsedDisplay  = document.getElementById('elapsed-display');
const unitsDisplay    = document.getElementById('units-display');
const tierBreakdownEl = document.getElementById('tier-breakdown');
const overnightBadge  = document.getElementById('overnight-badge');

setNow();

startInput.addEventListener('change', update);
endInput.addEventListener('change', update);
nowBtn.addEventListener('click', setNow);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
