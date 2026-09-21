"use client";

import { Divider, Floral, Reveal } from "./Reveal";

/** Eight-pointed star (two overlaid squares) with a centre bead: the shared Islamic geometric motif. */
function StarMark() {
  return (
    <svg className="card-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" aria-hidden>
      <rect x="10" y="10" width="28" height="28" />
      <rect x="10" y="10" width="28" height="28" transform="rotate(45 24 24)" />
      <circle cx="24" cy="24" r="4.2" />
    </svg>
  );
}

/** Pointed prayer-niche arch with a small diamond: echoes the arch that frames the couple. */
function NicheMark() {
  return (
    <svg className="card-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <path d="M11 42V24C11 16 19 12.5 24 4c5 8.5 13 12 13 20v18" />
      <path d="M7 42h34" />
      <path d="M24 21l4.5 6-4.5 6-4.5-6z" />
    </svg>
  );
}

export default function BlessingsSection() {
  return (
    <section className="section blessings-section">
      <Floral src="/images/corner-l.png" className="fl-top-l small" from={-14} />
      <Floral src="/images/corner-r.png" className="fl-top-r small" from={14} />
      <Reveal>
        <h2 className="title-script">Your Blessings</h2>
      </Reveal>
      <Divider src="/images/divider-wide.png" />
      <Reveal>
        <p className="body-serif">
          Your presence and your duas are the greatest gift we could ask for.
        </p>
      </Reveal>
      <Reveal className="frame-card blessing-card" delay={0.05}>
        <StarMark />
        <h3 className="sub-script">Your Presence</h3>
        <span className="card-rule" aria-hidden />
        <p className="body-serif">Your love, your laughter, and your prayers are gift enough for us.</p>
      </Reveal>
      <Reveal className="frame-card blessing-card" delay={0.05}>
        <NicheMark />
        <h3 className="sub-script">Your Duas</h3>
        <span className="card-rule" aria-hidden />
        <p className="body-serif">Please keep us in your prayers as we begin this new chapter, In Sha Allah.</p>
      </Reveal>
    </section>
  );
}
