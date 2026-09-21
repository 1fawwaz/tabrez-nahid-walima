"use client";

import { Divider, Floral, Reveal } from "./Reveal";

const PHONE_DISPLAY = "+91 98194 62828";
const PHONE_HREF = "tel:+919819462828";

export default function ContactSection() {
  return (
    <section className="section contact-section">
      <Floral src="/images/spray-l.png" className="fl-spray-l" from={-12} />
      <Floral src="/images/spray-r.png" className="fl-spray-r" from={12} />
      <Reveal>
        <p className="eyebrow">Get in Touch</p>
        <h2 className="title-script">Hosts &amp; Contact</h2>
      </Reveal>
      <Divider src="/images/divider-fleur.png" />
      {/* Same bordered-frame-with-crests treatment as the Location map */}
      <Reveal className="frame-wrap contact-wrap" delay={0.1}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/map-orn-top.png" alt="" aria-hidden className="map-orn top" />
        <div className="frame-card contact-card">
          <p className="eyebrow">Groom&rsquo;s Family</p>
          <p className="contact-name">Imtiyaz Waghoo</p>
          <span className="card-rule" aria-hidden />
          <a className="map-btn call-btn" href={PHONE_HREF} aria-label={`Call Imtiyaz Waghoo on ${PHONE_DISPLAY}`}>
            {PHONE_DISPLAY}
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/map-orn-bot.png" alt="" aria-hidden className="map-orn bot" />
      </Reveal>
    </section>
  );
}
