"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Divider, Reveal } from "./Reveal";

// 22 Nov 2026, 7:00 PM India Standard Time (+05:30) so every guest sees the same countdown.
const TARGET = new Date("2026-11-22T19:00:00+05:30").getTime();

function remaining(now: number) {
  const s = Math.max(0, Math.floor((TARGET - now) / 1000));
  return { Days: Math.floor(s / 86400), Hours: Math.floor((s % 86400) / 3600), Minutes: Math.floor((s % 3600) / 60), Seconds: s % 60 };
}

/** Keeps a heading on ONE line: starts from its CSS clamp() size and only scales down if the real font is wider. */
function useFitOneLine<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "";
      if (el.scrollWidth > el.clientWidth + 1) {
        el.style.fontSize = `${((parseFloat(getComputedStyle(el).fontSize) * el.clientWidth) / el.scrollWidth) * 0.98}px`;
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return ref;
}

export default function CountdownSection() {
  const titleRef = useFitOneLine<HTMLHeadingElement>();
  const [t, setT] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const tick = () => setT(remaining(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = t ? Object.entries(t) : ["Days", "Hours", "Minutes", "Seconds"].map((k) => [k, 0] as const);

  return (
    <section className="section countdown-section" aria-label="Countdown to the Walima">
      <Reveal>
        <h2 ref={titleRef} className="title-script one-line">Counting the Days</h2>
      </Reveal>
      <Divider src="/images/divider-fleur.png" />
      <Reveal className="count-frame" delay={0.1}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/map-orn-top.png" alt="" aria-hidden className="map-orn top" />
        <div className="count-grid" role="timer" aria-label="Time remaining until the Walima">
          {units.map(([label, value]) => (
            <div className="count-unit" key={label}>
              <motion.span
                key={`${label}-${value}`}
                className="count-num"
                initial={{ opacity: 0.35, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {String(value).padStart(2, "0")}
              </motion.span>
              <span className="count-rule" aria-hidden />
              <span className="count-label">{label}</span>
            </div>
          ))}
          <span className="count-gem" aria-hidden />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/map-orn-bot.png" alt="" aria-hidden className="map-orn bot" />
      </Reveal>
      <Reveal delay={0.15}>
        <p className="count-caption">
          <span className="count-lead">Until our Walima on</span>
          Sunday, 22 November 2026
          <br />
          at 7:00 PM IST
        </p>
      </Reveal>
    </section>
  );
}
