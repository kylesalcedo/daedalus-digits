# Daedalus Digits

*Named for the master craftsman who understood that precision is built, not born.*

<p align="center">
  <img src="assets/daedalus.jpg" alt="Daedalus" width="360" />
  <br/>
  [<a href="https://kylesalcedo.github.io/daedalus-digits/">click to play</a>]
</p>

A typing game grounded in motor science research. Every passage you type is drawn from peer-reviewed studies on hand dexterity, motor learning, and typing biomechanics.

Inspired by [monkeytype](https://monkeytype.com), but where monkeytype measures your speed, Daedalus Digits maps your craft. After each test, a QWERTY heatmap reveals exactly which keys you stumble on and identifies the specific fingers that need coordination work based on standard touch-typing form. It does not just tell you "5 errors." It tells you "your left ring finger needs practice on W, S, and X."

## What sets it apart

- **QWERTY miss heatmap**: Every key colored by error frequency after each test, from cool blue to warm amber.
- **Finger analysis**: Maps your errors to specific fingers using standard touch-typing assignments so you know exactly which fingers need coordination work.
- **30 research-backed passages**: Type real findings from peer-reviewed studies, not random words. Full citations (authors, journal, year) appear live in the reference panel as you type.
- **Research browsing**: Hold Tab and press Up/Down to browse all passages and citations without affecting your test. Press Enter to jump to one.

## All features

- Time mode (15s, 30s, 60s, 120s) and word count mode (10, 25, 50, 100 words)
- Live WPM and countdown timer with toggle visibility (Tab+T)
- Character-by-character typing with color feedback (green for correct, red for incorrect)
- Per-second WPM sparkline with dots and endpoint labels on the results screen
- Session analytics (Ctrl+H) showing average and best WPM, accuracy trends, WPM trends, and the top 5 most-missed keys across all tests in the session
- About page with project overview and full shortcut reference

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Tab` + `Enter` | Restart same test or jump to browsed passage |
| `Esc` | Reset with new words |
| `Tab` + `1` / `2` | Switch time or word mode |
| `Tab` + `Up` / `Down` | Browse research passages |
| `Tab` + `T` | Show or hide timer |
| `Ctrl` + `H` | Toggle session history |
| `Ctrl` + `Backspace` | Delete whole word |

## Tech

Single React component, JetBrains Mono, Vite, deployed to GitHub Pages.

---

*Like Daedalus shaped wax and feather into flight, shape keystrokes into fluency.*
