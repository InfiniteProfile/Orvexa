# ORVEXA — The Infinite Profile

**ONE IDENTITY. INFINITE STATES.** ORVEXA is an **Infinite Profile System**, not a portfolio. One identity unfolds into endless deterministic states, all built in your browser. No server, database or account.

## How it works
`state ID → seed → ORVEXA DNA → content → relationships → layout → render`

- **State IDs** are digit strings with BigInt arithmetic, up to 1000 digits. There is no other maximum. State 1 is the origin.
- **Deterministic generation**: FNV-style hashing feeds a 128-bit sfc32 generator. The same ID always rebuilds the same state, on any device. `Math.random` is used only to pick a Random destination, never for content.
- **DNA** sets composition (8 types), layout, density, type style, accent, symbol, motion and section order.
- **Items** such as IDEA 903 or PROJECT 042 are pure functions of their type and number, so search and Connections point at real content.
- **Relationships**: each state links to a parent (ID halved), two children, an echo and a mirror (digits reversed), forming one infinite graph rooted at state 1.
- **Discovery** uses a separate seed transformation and a different composition (`?state=ID&mode=discover`).
- Anything about the future is labelled Hypothetical.

## URLs
`?state=18472` reconstructs a state. Back and Forward use the History API. Invalid links recover to state 000001 with a notice.

## Controls
Keyboard: ← previous, → next, Space next, Shift+Space discover, Enter deep dive, Esc close. Touch: swipe left/right, swipe up at the end of a page to discover.

## Files
`index.html`, `style.css`, `script.js` are the whole app. `manifest.json`, `sw.js`, `icon.svg` add PWA and offline support. Content banks sit at the top of `script.js`; add words, templates or types there.

## Deploy on GitHub Pages
Push the folder, then Settings → Pages → deploy from branch. All paths are relative, so subdirectory repos work. For link previews, make `og:image` an absolute URL and add a `canonical` link with your final address.

## Storage and offline
Saved states (500 max) and history (60 max) live in `localStorage` as plain ID lists. If storage is blocked or corrupted, ORVEXA keeps working in memory. The service worker caches the shell, so generation works offline. Bump `CACHE` in `sw.js` when you ship changes. For guaranteed install prompts on every browser, add 192 and 512 px PNG icons to the manifest.

## Develop
No build step. Open `index.html`, or run `python3 -m http.server` for service-worker testing.
