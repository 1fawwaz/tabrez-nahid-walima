"use client";

import { Divider, Reveal } from "./Reveal";

const VENUE = "Princess Kainat Wedding Lawn";
// The exact Google Maps place link supplied by the hosts. Do NOT replace this with a name search.
const MAP_URL = "https://share.google/nYMujftYBEH7K60ks";

/** Map pin with an eight-pointed star: the same geometric motif used elsewhere in the invitation. */
function PinMark() {
  return (
    <svg className="card-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <path d="M24 44S10 30.5 10 19.5a14 14 0 0 1 28 0C38 30.5 24 44 24 44z" />
      <rect x="19.5" y="15" width="9" height="9" />
      <rect x="19.5" y="15" width="9" height="9" transform="rotate(45 24 19.5)" />
    </svg>
  );
}

export default function LocationSection() {
  return (
    <section className="section location-section">
      <Reveal>
        <h2 className="title-script">Where to Find Us</h2>
      </Reveal>
      <Divider src="/images/divider-fleur.png" />
      {/* Same bordered frame + crests as the other cards. The whole card is one link, so there is one clear tap target. */}
      <Reveal className="frame-wrap location-wrap" delay={0.1}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/map-orn-top.png" alt="" aria-hidden className="map-orn top" />
        <a className="frame-card location-card" href={MAP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Open ${VENUE} in Google Maps`}>
          <PinMark />
          <span className="venue-name">{VENUE}</span>
          <span className="card-rule" aria-hidden />
          <span className="address">
            Opp. Dosti Building,
            <br />
            Shilphata, Mumbra
          </span>
          <span className="map-btn">Open in Maps</span>
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/map-orn-bot.png" alt="" aria-hidden className="map-orn bot" />
      </Reveal>
    </section>
  );
}
