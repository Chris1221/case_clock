'use strict';

const UNITS_TABLE = [
  { range: '0–15',     units: 1,   tier: 1 },
  { range: '16–30',    units: 2,   tier: 1 },
  { range: '31–45',    units: 3,   tier: 1 },
  { range: '46–60',    units: 4,   tier: 1 },
  { range: '61–75',    units: 6,   tier: 2 },
  { range: '76–90',    units: 8,   tier: 2 },
  { range: '91–105',   units: 11,  tier: 3 },
  { range: '106–120',  units: 14,  tier: 3 },
  { range: '121–135',  units: 17,  tier: 3 },
  { range: '136–150',  units: 20,  tier: 3 },
  { range: '151–165',  units: 23,  tier: 3 },
  { range: '166–180',  units: 26,  tier: 3 },
  { range: '181–195',  units: 29,  tier: 3 },
  { range: '196–210',  units: 32,  tier: 3 },
  { range: '211–225',  units: 35,  tier: 3 },
  { range: '226–240',  units: 38,  tier: 3 },
  { range: '241–255',  units: 41,  tier: 3 },
  { range: '256–270',  units: 44,  tier: 3 },
  { range: '271–285',  units: 47,  tier: 3 },
  { range: '286–300',  units: 50,  tier: 3 },
  { range: '301–315',  units: 53,  tier: 3 },
  { range: '316–330',  units: 56,  tier: 3 },
  { range: '331–345',  units: 59,  tier: 3 },
  { range: '346–360',  units: 62,  tier: 3 },
  { range: '361–375',  units: 65,  tier: 3 },
  { range: '376–390',  units: 68,  tier: 3 },
  { range: '391–405',  units: 71,  tier: 3 },
  { range: '406–420',  units: 74,  tier: 3 },
  { range: '421–435',  units: 77,  tier: 3 },
  { range: '436–450',  units: 80,  tier: 3 },
  { range: '451–465',  units: 83,  tier: 3 },
  { range: '466–480',  units: 86,  tier: 3 },
  { range: '481–495',  units: 89,  tier: 3 },
  { range: '496–510',  units: 92,  tier: 3 },
  { range: '511–525',  units: 95,  tier: 3 },
  { range: '526–540',  units: 98,  tier: 3 },
  { range: '541–555',  units: 101, tier: 3 },
  { range: '556–570',  units: 104, tier: 3 },
  { range: '571–585',  units: 107, tier: 3 },
  { range: '586–600',  units: 110, tier: 3 },
  { range: '601–615',  units: 113, tier: 3 },
  { range: '616–630',  units: 116, tier: 3 },
  { range: '631–645',  units: 119, tier: 3 },
  { range: '646–660',  units: 122, tier: 3 },
  { range: '661–675',  units: 125, tier: 3 },
  { range: '676–690',  units: 128, tier: 3 },
  { range: '691–705',  units: 131, tier: 3 },
  { range: '706–720',  units: 134, tier: 3 },
  { range: '721–735',  units: 137, tier: 3 },
  { range: '736–750',  units: 140, tier: 3 },
  { range: '751–765',  units: 143, tier: 3 },
  { range: '766–780',  units: 146, tier: 3 },
  { range: '781–795',  units: 149, tier: 3 },
  { range: '796–810',  units: 152, tier: 3 },
  { range: '811–825',  units: 155, tier: 3 },
  { range: '826–840',  units: 158, tier: 3 },
  { range: '841–855',  units: 161, tier: 3 },
  { range: '856–870',  units: 164, tier: 3 },
  { range: '871–885',  units: 167, tier: 3 },
  { range: '886–900',  units: 170, tier: 3 },
  { range: '901–915',  units: 173, tier: 3 },
  { range: '916–930',  units: 176, tier: 3 },
  { range: '931–945',  units: 179, tier: 3 },
  { range: '946–960',  units: 182, tier: 3 },
  { range: '961–975',  units: 185, tier: 3 },
  { range: '976–990',  units: 188, tier: 3 },
  { range: '991–1005', units: 191, tier: 3 },
  { range: '1006–1020',units: 194, tier: 3 },
];

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

function formatTime(totalMinutes) {
  const mins = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Returns the valid billing entry times nearest to the entered end time.
// Valid times are: start + n*15 + 5 for n = 1, 2, 3, ...
// If the entered end time IS valid, returns { isValid: true, above, aboveUnits }.
// Otherwise returns { isValid: false, above, aboveUnits, below?, belowUnits? }.
function cardEntryInfo(startMinutes, elapsedMinutes) {
  if (elapsedMinutes <= 0) return null;
  const remainder = elapsedMinutes - 5;
  const isValid = remainder > 0 && remainder % 15 === 0;
  const n_above = Math.max(1, Math.ceil(remainder / 15));
  const above_elapsed = n_above * 15 + 5;
  const result = {
    isValid,
    above: startMinutes + above_elapsed,
    aboveElapsed: above_elapsed,
    aboveUnits: billingUnits(above_elapsed),
  };
  if (!isValid) {
    const below_elapsed = (n_above - 1) * 15 + 5;
    result.below = startMinutes + below_elapsed;
    result.belowElapsed = below_elapsed;
    result.belowUnits = billingUnits(below_elapsed);
  }
  return result;
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

  if (elapsed < 0) {
    elapsed += 24 * 60;
    overnight = true;
  }

  if (elapsed === 0) {
    // Same start and end: case is just starting — show minimum card entry only
    elapsedDisplay.textContent = '—';
    unitsDisplay.textContent = '—';
    overnightBadge.classList.remove('visible');
    overnightBadge.setAttribute('aria-hidden', 'true');
    tierBreakdownEl.innerHTML = '';
    if (ceDetailEl) ceDetailEl.innerHTML = '';
    const minUnits = billingUnits(20);
    cardEntryEl.innerHTML =
      `<span class="ce-chip ce-rec" data-elapsed="20"><span class="ce-chip-label">next valid</span><span class="ce-chip-time">${formatTime(startMin + 20)}<span class="ce-u">${minUnits}u</span></span></span>`;
    resultsEl.classList.add('visible');
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
  tierBreakdownEl.classList.remove('expanded');
  breakdownToggle.textContent = 'billing unit breakdown ▸';
  breakdownToggle.setAttribute('aria-expanded', 'false');

  if (ceDetailEl) ceDetailEl.innerHTML = '';
  const cardInfo = cardEntryInfo(startMin, elapsed);
  if (cardInfo) {
    let html = '';
    if (cardInfo.isValid) {
      html = `<span class="ce-chip ce-valid" data-elapsed="${cardInfo.aboveElapsed}"><span class="ce-chip-label">valid</span><span class="ce-chip-time">${formatTime(cardInfo.above)}<span class="ce-u">${cardInfo.aboveUnits}u ✓</span></span></span>`;
    } else {
      if (cardInfo.below !== undefined) {
        html += `<span class="ce-chip ce-low" data-elapsed="${cardInfo.belowElapsed}"><span class="ce-chip-label">last valid</span><span class="ce-chip-time">${formatTime(cardInfo.below)}<span class="ce-u">${cardInfo.belowUnits}u</span></span></span>`;
      }
      html += `<span class="ce-chip ce-rec" data-elapsed="${cardInfo.aboveElapsed}"><span class="ce-chip-label">next valid</span><span class="ce-chip-time">${formatTime(cardInfo.above)}<span class="ce-u">${cardInfo.aboveUnits}u</span></span></span>`;
    }
    cardEntryEl.innerHTML = html;
  }

  resultsEl.classList.add('visible');
}

const startInput      = document.getElementById('start-time');
const endInput        = document.getElementById('end-time');
const nowBtn          = document.getElementById('now-btn');
const resultsEl       = document.getElementById('results');
const elapsedDisplay  = document.getElementById('elapsed-display');
const unitsDisplay    = document.getElementById('units-display');
const tierBreakdownEl = document.getElementById('tier-breakdown');
const breakdownToggle = document.getElementById('breakdown-toggle');
const overnightBadge  = document.getElementById('overnight-badge');
const cardEntryEl     = document.getElementById('card-entry');
const ceDetailEl      = document.getElementById('ce-detail');

startInput.addEventListener('change', update);
endInput.addEventListener('change', update);
nowBtn.addEventListener('click', setNow);

breakdownToggle.addEventListener('click', () => {
  const expanded = tierBreakdownEl.classList.toggle('expanded');
  breakdownToggle.textContent = expanded ? 'billing unit breakdown ▾' : 'billing unit breakdown ▸';
  breakdownToggle.setAttribute('aria-expanded', String(expanded));
});

cardEntryEl.addEventListener('click', e => {
  const chip = e.target.closest('.ce-chip');
  if (!chip) return;

  if (chip.classList.contains('active')) {
    chip.classList.remove('active');
    ceDetailEl.innerHTML = '';
    return;
  }

  cardEntryEl.querySelectorAll('.ce-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');

  const chipElapsed = parseInt(chip.dataset.elapsed, 10);
  const tiers = tierBreakdown(chipElapsed);

  ceDetailEl.innerHTML =
    `<div class="ce-summary">` +
      `<span class="ce-sum-elapsed">${formatElapsed(chipElapsed)}</span>` +
      `<span class="ce-sum-arrow">→</span>` +
      `<span class="ce-sum-units">${billingUnits(chipElapsed)}u</span>` +
    `</div>` +
    `<button class="breakdown-toggle ce-breakdown-toggle" aria-expanded="false">billing unit breakdown ▸</button>` +
    `<div class="ce-tier-rows">` +
      tiers.map(t =>
        `<div class="ce-tier-row">` +
          `<span class="tier-name">${t.label}</span>` +
          `<span class="tier-detail">${t.minutes} min</span>` +
          `<span class="tier-units">${t.units} u</span>` +
        `</div>`
      ).join('') +
    `</div>`;

  const ceToggle = ceDetailEl.querySelector('.ce-breakdown-toggle');
  const ceTierRows = ceDetailEl.querySelector('.ce-tier-rows');
  ceToggle.addEventListener('click', () => {
    const expanded = ceTierRows.classList.toggle('expanded');
    ceToggle.textContent = expanded ? 'billing unit breakdown ▾' : 'billing unit breakdown ▸';
    ceToggle.setAttribute('aria-expanded', String(expanded));
  });
});

if (window.matchMedia('(display-mode: standalone)').matches) {
  gtag('event', 'pwa_session');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

fetch('version.json')
  .then(r => r.ok ? r.json() : null)
  .then(data => {
    if (!data) return;
    const el = document.getElementById('app-version');
    if (el) el.textContent = data.version;
  })
  .catch(() => {});

// ── Cheat sheet ──────────────────────────────────────────────────────────────

function renderCheatSheet() {
  const tiers = [
    { num: 1, label: 'Tier 1', rate: '×1 / 15 min', rows: UNITS_TABLE.filter(r => r.tier === 1) },
    { num: 2, label: 'Tier 2', rate: '×2 / 15 min', rows: UNITS_TABLE.filter(r => r.tier === 2) },
    { num: 3, label: 'Tier 3', rate: '×3 / 15 min', rows: UNITS_TABLE.filter(r => r.tier === 3) },
  ];

  document.getElementById('cheat-sheet').innerHTML = tiers.map(t => `
    <div class="sheet-section sheet-tier-${t.num}">
      <div class="sheet-tier-hdr">
        <span>${t.label}</span><span class="sheet-rate">${t.rate}</span>
      </div>
      <div class="sheet-rows">
        ${t.rows.map(r => `
          <div class="sheet-row">
            <span class="sheet-range">${r.range}</span>
            <span class="sheet-units">${r.units}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

const mainCard = document.getElementById('main-card');
const flipBtn  = document.getElementById('flip-btn');

renderCheatSheet();

flipBtn.addEventListener('click', () => {
  const flipped = mainCard.classList.toggle('flipped');
  flipBtn.textContent = flipped ? 'calculator' : 'cheat sheet';
  flipBtn.setAttribute('aria-label', flipped ? 'Show calculator' : 'Show cheat sheet');
});
