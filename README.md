# Daedalus Digits

*Named for the master craftsman who understood that precision is built, not born.*

A typing game grounded in motor science research. Every passage you type is drawn from peer-reviewed studies on hand dexterity, motor learning, and typing biomechanics.

Inspired by [monkeytype](https://monkeytype.com) — but where monkeytype measures your speed, Daedalus Digits maps your craft. After each test, a QWERTY heatmap reveals exactly which keys you stumble on, and identifies the specific fingers that need coordination work based on standard touch-typing form. It's not just "you made 5 errors" — it's "your left ring finger needs practice."

## What sets it apart

- **QWERTY miss heatmap** — every key colored by error frequency after each test, from cool blue to warm amber
- **Finger analysis** — maps your errors to specific fingers via standard touch-typing assignments, telling you exactly which fingers need coordination work
- **30 research-backed passages** — type real findings from peer-reviewed studies, not random words. Full citations (authors, journal, year) shown live in the reference panel as you type
- **Research browsing** — hold Tab + Up/Down to browse all passages and citations without affecting your test; Enter to jump to one

## All features

- **Time mode** (15s / 30s / 60s / 120s) and **word count mode** (10 / 25 / 50 / 100 words)
- **Live WPM + countdown timer** with toggle visibility (Tab+T)
- **Character-by-character typing** with color feedback (green correct, red incorrect)
- **Per-second WPM sparkline** with dots and endpoint labels on the results screen
- **Session analytics** (Ctrl+H) — average/best WPM, accuracy trends, WPM trends, top 5 most-missed keys across all tests in the session
- **About page** with project overview and full shortcut reference

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Tab` + `Enter` | Restart same test / jump to browsed passage |
| `Esc` | Reset with new words |
| `Tab` + `1` / `2` | Switch time / word mode |
| `Tab` + `↑` / `↓` | Browse research passages |
| `Tab` + `T` | Show/hide timer |
| `Ctrl` + `H` | Toggle session history |
| `Ctrl` + `Backspace` | Delete whole word |

## Tech

- Single React component (`HandTyper.jsx`), no external UI libraries
- JetBrains Mono via Google Fonts
- Vite for development and build
- GitHub Pages deployment via Actions

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Built files output to `dist/`, deployed automatically via GitHub Actions on push to `main`.

---

*Like Daedalus shaped wax and feather into flight — shape keystrokes into fluency.*
