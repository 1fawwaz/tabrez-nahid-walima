"use client";

import React, { useEffect, useRef, useState } from "react";

const introShell: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100dvh",
  minHeight: "100vh",
  margin: 0,
  padding: 0,
  border: "none",
  overflow: "hidden",
  backgroundColor: "#000",
  zIndex: 100,
};

const coupleShell: React.CSSProperties = {
  position: "relative",
  width: "100vw",
  height: "calc(3240 / 1760 * 100vw)",
  margin: 0,
  marginBottom: 0,
  padding: 0,
  border: "none",
  overflow: "hidden",
  backgroundColor: "#FDF4EB",
  zIndex: 10,
  display: "block",
  lineHeight: 0,
};

const videoCover: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  padding: 0,
  border: "none",
  objectFit: "cover",
  objectPosition: "center center",
  display: "block",
  pointerEvents: "none",
};

const videoContain: React.CSSProperties = {
  ...videoCover,
  objectFit: "contain",
  objectPosition: "center top",
};

type HeroVideoProps = {
  /** Fires once when the intro video has completely finished */
  onIntroComplete?: () => void;
};

/**
 * Intro: fixed 100vw×100vh, plays once, scroll locked until it ends, then unlock.
 * Couple: in-flow 100vw×100vh section, autoplays after intro when scrolled into view, loops forever.
 */
export default function HeroVideo({ onIntroComplete }: HeroVideoProps) {
  const introRef = useRef<HTMLVideoElement>(null);
  const coupleRef = useRef<HTMLVideoElement>(null);
  const coupleSectionRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);

  const finishIntro = () => {
    setIntroDone(true);
    onIntroComplete?.();
  };

  // Scroll lock ONLY while intro plays
  useEffect(() => {
    if (introDone) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const prevent = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
    };
  }, [introDone]);

  // Intro playback
  useEffect(() => {
    if (introDone) return;

    const intro = introRef.current;
    if (!intro) return;

    intro.defaultMuted = true;
    intro.muted = true;
    intro.playsInline = true;
    intro.setAttribute("playsinline", "true");
    intro.setAttribute("webkit-playsinline", "true");
    intro.play().catch(() => {});

    const kick = () => {
      if (intro.paused) intro.play().catch(() => {});
    };
    window.addEventListener("touchstart", kick, { once: true, passive: true });
    window.addEventListener("click", kick, { once: true, passive: true });

    let safety: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      const dur = intro.duration;
      const ms = Number.isFinite(dur) && dur > 0 ? dur * 1000 + 600 : 25000;
      safety = setTimeout(finishIntro, ms);
    };
    if (intro.readyState >= 1) arm();
    else intro.addEventListener("loadedmetadata", arm, { once: true });

    return () => {
      if (safety) clearTimeout(safety);
      window.removeEventListener("touchstart", kick);
      window.removeEventListener("click", kick);
    };
  }, [introDone]);

  // Couple: only after intro ends — play when in view; loop forever
  useEffect(() => {
    if (!introDone) return;

    const couple = coupleRef.current;
    const section = coupleSectionRef.current;
    if (!couple || !section) return;

    couple.defaultMuted = true;
    couple.muted = true;
    couple.loop = true;
    couple.playsInline = true;
    couple.setAttribute("playsinline", "true");
    couple.setAttribute("webkit-playsinline", "true");

    const ensurePlaying = () => {
      couple.loop = true;
      if (couple.paused) {
        couple.play().catch(() => {});
      }
    };

    const onEnded = () => {
      couple.currentTime = 0;
      couple.play().catch(() => {});
    };
    couple.addEventListener("ended", onEnded);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
          ensurePlaying();
        }
      },
      { threshold: [0, 0.15, 0.35, 0.6] }
    );
    io.observe(section);
    ensurePlaying();

    return () => {
      io.disconnect();
      couple.removeEventListener("ended", onEnded);
    };
  }, [introDone]);

  return (
    <>
      {/* Intro — true fullscreen, once; unlock scroll when finished */}
      {!introDone && (
        <div style={introShell} aria-label="Walima intro video">
          <video
            ref={introRef}
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={finishIntro}
            style={videoCover}
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Couple — in-flow fullscreen section; loops forever; never unmounts */}
      <div
        ref={coupleSectionRef}
        style={coupleShell}
        aria-label="Walima ceremony couple video"
      >
        <video
          ref={coupleRef}
          src="/videos/couple.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={videoContain}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </>
  );
}
