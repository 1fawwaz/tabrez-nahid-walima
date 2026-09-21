"use client";

import { motion } from "framer-motion";
import { Divider, Floral, Reveal } from "./Reveal";

const tiles = [
  { value: "22", label: "Day" },
  { value: "November", label: "Month" },
  { value: "2026", label: "Year" },
];

/** Gold-foil tile that lifts away to reveal the date, that lifts away as it scrolls into view. */
function FoilTile({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <div className="tile-wrap">
      <div className="tile">
        <span className={`tile-value${value.length > 4 ? " long" : ""}`}>{value}</span>
        <motion.div
          className="tile-foil"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.6, delay: 0.5 + index * 0.35, ease: "easeInOut" }}
        />
      </div>
      <span className="tile-label">{label}</span>
    </div>
  );
}

export default function DateSection() {
  return (
    <section className="section date-section">
      <Floral src="/images/corner-l.png" className="fl-top-l" from={-14} />
      <Floral src="/images/corner-r.png" className="fl-top-r" from={14} />
      <Reveal>
        <h2 className="title-script">The Date</h2>
      </Reveal>
      <Divider src="/images/divider-small.png" />
      <p className="sr-only">22 November 2026, Sunday</p>
      <div className="tiles" aria-hidden>
        {tiles.map((t, i) => (
          <FoilTile key={t.label} {...t} index={i} />
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="weekday">Sunday</p>
        <p className="eyebrow time-label">Time</p>
        <p className="caps-line">7:00 PM – 11:00 PM</p>
      </Reveal>
    </section>
  );
}
