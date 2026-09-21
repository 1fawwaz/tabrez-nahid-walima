# Tabrez & Nahid — Walima Invitation

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

```bash
npm install
npm run build   # production build
npm run dev     # http://localhost:3000  (view at 375–430px wide)
```

## Section order
Opening film (9:16, looping) → Bismillah + invitation + names (Mughal arch) → Qur'an verse → Date → Countdown → Where to Find Us → Your Blessings → Get in Touch → Closing.
Each section is one file in `src/components/`. Shared frame/card styles (`.frame-card`, `.frame-wrap`) and the small label style (`.eyebrow`) live in `globals.css`.

## Opening video
`public/videos/hero.mp4` is the supplied clip, unchanged apart from a lossless remux (same H.264 video stream; index moved to the front so it starts fast; the unused silent audio track dropped). It autoplays muted, loops, has no controls, and never captures touches, so the page scrolls normally. The stage takes the video's own 9:16 shape and shows it whole, so nothing is cropped.

## Background music
`public/audio/bismillah.mp3` is played by ONE `<audio>` element (`src/components/MusicPlayer.tsx`) mounted in `src/app/layout.tsx`, so it is never re-created or restarted while guests scroll. It loops.
Browsers block sound until the guest interacts, so: autoplay is attempted on load; if blocked, the first tap / key press starts it (Chrome and Safari do not count a plain scroll-swipe as a gesture, so scrolling alone may not be enough). If the system interrupts it (phone call, iOS backgrounding) it resumes from the same position on the next tap.

## Location
`LocationSection.tsx` links to the exact Google Maps place link supplied by the hosts (`MAP_URL`), opened in a new tab so the music keeps playing in the invitation tab. There is deliberately no embedded map: an embed needs coordinates and the share link cannot be resolved to them offline.

## Fonts
Cormorant Garamond (body/formal text) and Amiri (Arabic) load automatically from Google Fonts. Add `AstenScriptBold.woff2` (or `.ttf`) to `public/fonts/` for all script headings, names and signatures (see the README there). **That file is not in the project yet**, so script text currently falls back to a system cursive font.

## Countdown
Targets 22 Nov 2026, 7:00 PM IST (+05:30). Change `TARGET` in `CountdownSection.tsx` to adjust.
