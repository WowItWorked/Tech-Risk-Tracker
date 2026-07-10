# Tech Risk Tracker

A newspaper-style daily tracker of technology risk for the financial sector — cyber, fraud, AI,
third-party, resilience, data, physical, and insider risk. Built out from a Claude Design export
("Horizon") into a static web app. **Live edition** since July 9, 2026: content derives solely
from the allowlisted sources in [sources.json](sources.json), under the binding confirmation
process in [EDITORIAL.md](EDITORIAL.md), refreshed weekdays at 6:00 AM ET per
[UPDATE_RUNBOOK.md](UPDATE_RUNBOOK.md). Each run is logged in [data/run-log.md](data/run-log.md).

## Screens

| Route (hash) | Screen |
|---|---|
| `#today` | Front page — the daily brief, the wire (filter/sort/search), 30-day velocity, collection clock |
| `#riskindex` | Risk areas — eight standing watches |
| `#dossier` | Risk-area dossier — current state, assessment, versioned changelog, monitored feeds |
| `#publications` | Archive — monthlies, weeklies, dailies, saved catch-up briefs |
| `#monthly` | Monthly report No. 6 (June 2026) |
| `#diff` | Meeting Prep — render every recorded change since a chosen date |
| `#components` | Component sheet & design tokens |

Keyboard: `/` focuses global search · `Ctrl/⌘K` quick switcher (`↑↓`, `↵`, `1–4`, `esc`).
Catch-up briefs rendered in Meeting Prep are saved to `localStorage` and listed under Publications.

## Architecture

No build step. Preact + htm loaded as ES modules from esm.sh; Google Fonts for type.
Serve the folder from any static host (GitHub Pages works as-is).

- `index.html` — shell, base CSS (reset, keyframes, hover/focus states)
- `ui.js` — Preact/htm exports + display settings
- `data/record.json` — **the generated record** (rewritten by each daily update run)
- `data/run-log.md` — one line per update run: feeds, counts, verification outcome
- `data.js` — thin adapter shaping the record for the views
- `views-shell.js` — masthead, nav + menus + global search, footer, ⌘K switcher
- `views-today.js` — Today, Risk Areas index, dossier
- `views-pubs.js` — Publications, Monthly report, Meeting Prep
- `views-components.js` — component sheet
- `app.js` — application logic (routing, 6 AM countdown, keyboard, search, ledger cross-refs)
- `sources.json` / `EDITORIAL.md` / `UPDATE_RUNBOOK.md` — the update pipeline's contract
- `design-export/` — the original Claude Design export this was built from

## Run locally

```
python -m http.server 8137 --directory "Tech Risk Tracker"
```

then open http://localhost:8137/ (an internet connection is needed for the CDN modules and fonts).
