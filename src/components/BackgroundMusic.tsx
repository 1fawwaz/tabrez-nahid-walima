"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Music auto-starts on open (best-effort on mobile).
 * Button is a true play/pause control; user pause is never overridden.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false);
  const unlockedRef = useRef(false);
  const wasPlayingBeforeHideRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;
    audio.loop = true;

    const sync = () => setIsPlaying(!audio.paused && !audio.ended);

    const onPlaying = () => {
      unlockedRef.current = true;
      if (!userPausedRef.current) setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("play", onPlaying);
    audio.addEventListener("pause", onPause);

    const tryStart = () => {
      if (userPausedRef.current) return;
      if (typeof document !== "undefined" && (document.hidden || document.visibilityState === "hidden")) return;
      audio
        .play()
        .then(() => {
          unlockedRef.current = true;
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    };

    // Immediate autoplay attempt (works when allowed; otherwise waits for gesture)
    if (typeof document !== "undefined" && !document.hidden && document.visibilityState === "visible") {
      tryStart();
    }

    const onGesture = (e: Event) => {
      if (userPausedRef.current) return;
      if (typeof document !== "undefined" && (document.hidden || document.visibilityState === "hidden")) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest?.("[data-music-toggle]")) return;
      tryStart();
    };

    const gestureEvents = ["touchend", "pointerup", "click", "keydown"] as const;
    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, onGesture, { capture: true, passive: true });
    });

    // Page Visibility API + pagehide/pageshow/freeze:
    // Music must play ONLY while the wedding website is actively OPEN and VISIBLE.
    const pauseMusicOnHide = () => {
      if (!audio.paused && !audio.ended) {
        wasPlayingBeforeHideRef.current = true;
      }
      audio.pause();
      setIsPlaying(false);
    };

    const resumeMusicOnVisible = () => {
      if (wasPlayingBeforeHideRef.current && !userPausedRef.current) {
        wasPlayingBeforeHideRef.current = false;
        tryStart();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        pauseMusicOnHide();
      } else if (document.visibilityState === "visible") {
        resumeMusicOnVisible();
      }
    };

    const onPageHide = () => {
      pauseMusicOnHide();
    };

    const onPageShow = () => {
      if (!document.hidden && document.visibilityState === "visible") {
        resumeMusicOnVisible();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("freeze", pauseMusicOnHide);

    sync();

    return () => {
      gestureEvents.forEach((ev) => window.removeEventListener(ev, onGesture, true));
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("freeze", pauseMusicOnHide);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("play", onPlaying);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      // Explicit user pause — must stick
      userPausedRef.current = true;
      wasPlayingBeforeHideRef.current = false;
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // Explicit user play
    userPausedRef.current = false;
    wasPlayingBeforeHideRef.current = false;
    audio
      .play()
      .then(() => {
        unlockedRef.current = true;
        setIsPlaying(true);
      })
      .catch(() => setIsPlaying(false));
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bg-music.mp3"
        loop
        preload="auto"
        playsInline
        aria-hidden="true"
      />

      <button
        data-music-toggle
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMusic();
        }}
        type="button"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isPlaying}
        className="fixed bottom-5 right-5 z-[1001] flex items-center justify-center w-11 h-11 rounded-full bg-[#3D2E1E]/80 hover:bg-[#3D2E1E] text-[#F3E3C3] border border-[#C9A85C]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 active:scale-95 focus:outline-none"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 fill-current animate-pulse" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 fill-current opacity-70" viewBox="0 0 24 24">
            <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.27 4.27c-.42.27-.9.46-1.43.46H12v2h2.84l4.89 4.89 1.27-1.27L4.27 3zM14 7h4V3h-6v5.18l2 2V7z" />
          </svg>
        )}
      </button>
    </>
  );
}
