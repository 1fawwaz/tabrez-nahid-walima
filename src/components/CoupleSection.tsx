"use client";

import { Divider, Floral, Reveal } from "./Reveal";

/** First main invitation section: Bismillah, the invitation line and the two names, inside the Mughal arch. */
export default function CoupleSection() {
  return (
    <section className="couple">
      <div className="couple-frame" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/arch-full.png" alt="" className="arch-cap" decoding="async" />
        <div className="pillars" />
      </div>
      <div className="couple-content">
        <Reveal>
          <p className="bismillah-ar" lang="ar" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="bismillah-en">In the Name of Allah, the Most Gracious, the Most Merciful</p>
        </Reveal>
        <Divider src="/images/divider-small.png" />
        <Reveal>
          <p className="invite-line">We joyfully invite you to the Walima ceremony of our beloved</p>
        </Reveal>
        <Reveal>
          <p className="sub-script">Son</p>
          <h2 className="name-script">Tabrez</h2>
        </Reveal>
        <Divider src="/images/divider-small.png" />
        <Reveal>
          <p className="caps-line">
            Son of
            <br />
            Mr &amp; Mrs Waghoo
          </p>
        </Reveal>
        <Reveal>
          <p className="amp-script">&amp;</p>
          <h2 className="name-script">Nahid</h2>
        </Reveal>
        <Divider src="/images/divider-small.png" />
        <Reveal>
          <p className="caps-line">
            Daughter of
            <br />
            Mr &amp; Mrs Khan
          </p>
        </Reveal>
      </div>
      <Floral src="/images/spray-l.png" className="fl-spray-bl" from={-12} />
      <Floral src="/images/spray-r.png" className="fl-spray-br" from={12} />
    </section>
  );
}
