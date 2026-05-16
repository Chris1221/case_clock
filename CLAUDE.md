# CaseClock — Claude Context

## What this is

A mobile-first PWA for anesthesiologists to calculate surgical billing units from start/end times and determine the correct time to write on a billing card. Deployed as a static site at `chrisbcole.me/case_clock/`. No backend, no build step.

## Development workflow

- Push directly to `main` — no PRs, no release process
- GitHub Actions deploys automatically on every push to main (`.github/workflows/version.yml`)
- No build step: it's plain HTML + CSS + JS

## Deployment details

The CI workflow does two things before uploading the artifact:
1. Generates `version.json` with the build number (`build.N` where N is `github.run_number`)
2. Replaces the cache name in `sw.js` via `sed`: `const CACHE = 'caseclock-...'`

**Do not manually bump the cache name in `sw.js`** — it gets overwritten on every deploy. The value in the repo is a placeholder. `version.json` is gitignored for the same reason.

## Service worker

Network-first strategy — always tries the network, falls back to cache. This was a deliberate choice after recurring incidents where users were served stale cached files after deploys. Don't switch to cache-first.

## Billing logic

Tiered unit calculation in `billingUnits()` (`app.js`):
- 0–60 min: 1 unit per 15-min block (×1)
- 60–90 min: 2 units per 15-min block (×2)
- 90+ min: 3 units per 15-min block (×3)

Partial blocks round up (`Math.ceil`).

## "Write on card" domain logic

Valid billing card entry times follow the formula: `start + n×15 + 5 minutes` (for n = 1, 2, 3, ...). The +5 is a safety buffer convention. This is implemented in `cardEntryInfo()`.

- If the entered end time is already valid, one chip is shown (marked "valid")
- If not, two chips are shown: "last valid" (nearest before) and "next valid" (nearest after)
- Same start/end time edge case: show only "next valid" (start + 20 min) since the case is just beginning

## Known gotchas

- **`ceDetailEl` null guard** — `if (ceDetailEl) ceDetailEl.innerHTML = ''` exists in `update()` because old cached versions of `index.html` didn't have the `#ce-detail` element. New `app.js` would crash silently against them. Keep the guard.
- **Overnight cases** — handled by adding 24×60 to elapsed when `endMin < startMin`. Split carefully from the same-time case (`elapsed === 0`), which has different behaviour.
- **`nth-child` selectors for `.ce-tier-row`** — tier rows live inside `.ce-tier-rows` wrapper, so colour selectors are `:nth-child(1/2/3)`, not `:nth-child(2/3/4)`.

## Analytics

Google Analytics 4 — measurement ID `G-1WQ8322CHW` (shared with `chrisbcole.me`). A `pwa_session` custom event fires when the app is opened from the home screen (`display-mode: standalone`). Both are in `index.html` / `app.js`.

## File map

```
index.html        — app shell; links app.js and styles.css
app.js            — all billing logic + DOM interaction
styles.css        — all styling (mobile-first)
sw.js             — service worker (network-first, cache name stamped by CI)
manifest.json     — PWA manifest
version.json      — gitignored; generated at deploy time
.github/workflows/version.yml — deploy workflow
data/units_by_time.csv        — source data used to build UNITS_TABLE in app.js
```
