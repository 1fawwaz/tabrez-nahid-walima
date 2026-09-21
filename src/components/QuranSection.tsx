"use client";

import { Divider, Floral, Reveal } from "./Reveal";

export default function QuranSection() {
  return (
    <section className="section quran-section">
      <Floral src="/images/corner-l.png" className="fl-top-l small" from={-14} />
      <Floral src="/images/corner-r.png" className="fl-top-r small" from={14} />
      <Divider src="/images/divider-fleur.png" />
      <Reveal>
        <p className="arabic" lang="ar" dir="rtl">
          وَخَلَقْنَاكُمْ أَزْوَاجًا
        </p>
        <p className="body-serif quote">“And We created you in pairs.”</p>
        <p className="eyebrow cite">Surah An-Naba 78:8</p>
      </Reveal>
    </section>
  );
}
