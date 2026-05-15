# CaseClock

A mobile-first Progressive Web App for anesthesiologists to calculate surgical billing units and determine the correct end time to enter on a billing card.

## Usage

1. Enter the **start time** of the case
2. The **end time** defaults to now — adjust it if reviewing a card filled in by someone else
3. The app shows:
   - Elapsed time and total billing units
   - A tier breakdown of how units were calculated
   - **Write on card** — the valid billing entry times nearest to the entered end time

### Write on card

Billing is documented in 15-minute increments from the start time, with a 5-minute safety buffer added to the end of the last unit. Valid card entry times take the form `start + n×15 + 5 min`.

If the entered end time already follows this convention, a single time is shown with a checkmark. If not, the two nearest valid options are shown so you can see which unit count each corresponds to — useful when reviewing a card a resident has filled in.

## Billing unit rates

| Elapsed time | Rate |
|---|---|
| 0–60 min | 1 unit per 15-min block |
| 60–90 min | 2 units per 15-min block |
| 90+ min | 3 units per 15-min block |

Partial blocks are rounded up.

## Install as an app (PWA)

On iPhone/iPad, open the site in Safari, tap the share icon, and choose **Add to Home Screen**. The app will open fullscreen with no browser chrome, just like a native app.

On Android, Chrome will prompt you to install it directly.

## Local development

No build step required — it's plain HTML, CSS, and JS.

```bash
# Any local server works, e.g.:
npx serve .
# or
python3 -m http.server
```

A local server is needed (rather than opening `index.html` directly) for the service worker to register correctly.

## Deployment

The app is a static site with no backend. It deploys to GitHub Pages from the repo root.
