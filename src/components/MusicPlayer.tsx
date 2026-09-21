"use client";

import { useEffect, useRef } from "react";

const SRC = "/audio/bismillah.mp3";

// Inputs browsers accept as "the guest interacted", so sound may start.
const TAPS = ["pointerup", "touchend", "click", "keydown"] as const;
// Scrolling is tried too (some browsers allow it), but Chrome and Safari do not count a plain scroll as a gesture,
// so on those the first tap or key press is what unlocks the sound. Throttled: a rejected play() is harmless.
const SOFT = ["wheel", "scroll", "touchmove"] as const;

/**
 * The one and only audio element for the whole invitation, mounted once in the root layout so it is never
 * re-created, restarted or duplicated while guests scroll. No UI. Loops forever.
 *  1. Try to autoplay on load.
 *  2. If the browser blocks it, start on the first interaction, then stop listening.
 *  3. If the system interrupts playback later (call, tab switch on iOS), listen again and resume where it left off.
 * We never touch currentTime and never call pause(), so the track can only ever continue from where it is.
 */
export default function MusicPlayer() {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.loop = true;
    a.volume = 0.8;

    let lastSoft = 0;
    const start = () => {
      if (a.paused) a.play().catch(() => {}); // still blocked -> stay armed for the next gesture
    };
    const startSoft = () => {
      const now = Date.now();
      if (now - lastSoft < 400) return;
      lastSoft = now;
      start();
    };
    const arm = () => {
      TAPS.forEach((e) => window.addEventListener(e, start, { capture: true, passive: true }));
      SOFT.forEach((e) => window.addEventListener(e, startSoft, { capture: true, passive: true }));
    };
    const disarm = () => {
      TAPS.forEach((e) => window.removeEventListener(e, start, { capture: true }));
      SOFT.forEach((e) => window.removeEventListener(e, startSoft, { capture: true }));
    };
    const onPlaying = () => disarm();
    const onPause = () => {
      if (!a.ended) arm(); // interrupted by the system, resume on the next gesture
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") start();
    };

    a.addEventListener("playing", onPlaying);
    a.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisible);
    arm();
    start(); // 1. attempt autoplay right away

    return () => {
      a.removeEventListener("playing", onPlaying);
      a.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisible);
      disarm();
    };
  }, []);

  return <audio ref={ref} src={SRC} preload="auto" loop hidden data-walima-music aria-hidden tabIndex={-1} />;
}
