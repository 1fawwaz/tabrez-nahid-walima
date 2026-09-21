"use client";

import { Divider, Floral, Reveal } from "./Reveal";

export default function ClosingSection() {
  return (
    <section className="section closing-section">
      <Divider src="/images/divider-wide.png" />
      <Reveal delay={0.1}>
        <p className="feature-caps closing">Hope to see you there</p>
      </Reveal>
      <Reveal className="signoff closing-sign" delay={0.15}>
        <p className="accent-line">With love,</p>
        <p className="name-script signature">Tabrez &amp; Nahid</p>
      </Reveal>
      <Reveal className="thanks" delay={0.2}>
        <p className="thank-you">Thank you</p>
      </Reveal>
      <Reveal delay={0.25}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/seal.png" alt="T & N" className="seal" decoding="async" />
      </Reveal>
      <Floral src="/images/spray-l.png" className="fl-spray-l low" from={-12} />
      <Floral src="/images/spray-r.png" className="fl-spray-r low" from={12} />
      <div className="floral star-band" aria-hidden />
    </section>
  );
}
