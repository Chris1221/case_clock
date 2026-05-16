# CaseClock

A mobile-first Progressive Web App for anesthesiologists to calculate surgical billing units and determine the correct end time to enter on a billing card.

## Usage

1. Enter the **start time** of the case
2. Enter the **end time** (or tap **Now** to use the current time)
3. The app shows:
   - Elapsed time and total billing units
   - A **billing unit breakdown** toggle — tap to see how units were split across tiers
   - **Write on card** — the valid billing entry times nearest to the entered end time

Tap the **cheat sheet** button in the top right to flip the card and see the full units reference table.

### Write on card

Billing is documented in 15-minute increments from the start time, with a 5-minute safety buffer added to the end of the last unit. Valid card entry times take the form `start + n×15 + 5 min`.

If the entered end time already follows this convention, a single chip is shown marked **valid**. If not, two options are shown:
- **Last valid** — the nearest valid time before the entered end time
- **Next valid** — the nearest valid time after the entered end time

Tap a chip to expand the billing unit breakdown for that specific entry time.

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
