"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade in with a gentle upward drift when scrolled into view. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.2, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Botanical ornament: slow reveal, then a barely-there sway (CSS, see .sway). */
export function Floral({ src, className, from = 0 }: { src: string; className: string; from?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`floral ${className}`}
      initial={{ opacity: 0, scale: 0.94, x: from }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 2.2, ease }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="sway" decoding="async" />
    </motion.div>
  );
}

/** Decorative divider image (gold flourish rule). */
export function Divider({ src, className = "" }: { src: string; className?: string }) {
  return (
    <Reveal>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden className={`divider ${className}`} decoding="async" />
    </Reveal>
  );
}
