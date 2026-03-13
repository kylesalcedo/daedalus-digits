# Daedalus Digits

A typing game grounded in motor science research. Every passage you type is drawn from peer-reviewed studies on hand dexterity, motor learning, and typing biomechanics.

Inspired by [monkeytype](https://monkeytype.com) in features, minimal in aesthetic — the typing IS the UI.

## Features

- **30 research-backed passages** with full citations (authors, journal, year) shown in a live reference panel
- **Time mode** (15s / 30s / 60s / 120s) and **word count mode** (10 / 25 / 50 / 100 words)
- **Live WPM + countdown timer** with toggle visibility
- **Character-by-character typing** with color feedback (green correct, red incorrect)
- **QWERTY miss heatmap** after each test, colored by error frequency
- **Finger analysis** — identifies which fingers need the most coordination work based on standard touch-typing form
- **Per-second WPM sparkline** on the results screen
- **Session analytics** (Ctrl+H) — average/best WPM, accuracy trends, most-missed keys across tests
- **Research browsing** — hold Tab + Up/Down to browse all passages and citations without penalty; Enter to jump to one
- **About page** with project overview and shortcut reference

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Tab` + `Enter` | Restart same test |
| `Esc` | Reset with new words |
| `Tab` + `1` / `2` | Switch time / word mode |
| `Tab` + `↑` / `↓` | Browse research passages |
| `Tab` + `Enter` | Jump to browsed passage |
| `Tab` + `T` | Show/hide timer |
| `Ctrl` + `H` | Toggle session history |
| `Ctrl` + `Backspace` | Delete whole word |

## Tech

- Single React component (`HandTyper.jsx`), no external UI libraries
- JetBrains Mono from Google Fonts
- Vite for development and build
- Deployed to GitHub Pages

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Built files go to `dist/`, deployed automatically via GitHub Actions on push to `main`.
