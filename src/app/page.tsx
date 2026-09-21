"use client";

import React, { useState } from "react";
import FloralOverlay from "@/components/FloralOverlay";
import LiveCountdown from "@/components/LiveCountdown";
import HeroVideo from "@/components/HeroVideo";
import BackgroundMusic from "@/components/BackgroundMusic";
import PetalFall from "@/components/PetalFall";

export default function Home() {
  const [petalsActive, setPetalsActive] = useState(false);

  return (
    <main className="min-h-screen bg-[#EADFCD] flex flex-col items-center justify-start gap-0 py-0 overflow-x-hidden selection:bg-[#E5C88A]">
      {/* ── Persistent background music player & elegant toggle ── */}
      <BackgroundMusic />

      {/* Petals ONLY after intro video has completely finished */}
      {petalsActive && <PetalFall />}

      {/* Intro (fixed, once) → couple (in-flow 100vh, loops forever); invite flush below */}
      <div className="w-screen max-w-none m-0 p-0 self-stretch block leading-none">
        <HeroVideo onIntroComplete={() => setPetalsActive(true)} />
      </div>

      <div
        className="w-full max-w-[440px] bg-[#FDF4EB] shadow-[0_0_60px_rgba(122,96,50,0.18)] m-0 sm:mb-6"
        style={{ marginTop: "calc(-3240 / 1760 * min(100vw, 440px))" }}
      >

        {/* ── SECTION 1: Invitation image + floating overlays ──
             Clip includes the map frame AND the gold filigree flourish beneath it.
             Image aspect 14832/1760 = 8.42727; clip through y=9745 → 65.7025% of height
             → paddingBottom = 8.42727 × 0.657025 × 100 = 553.6932%. */}
        <div className="relative w-full">
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "553.6932%" }}>

          {/* Clean invitation background (no baked flowers) — absolutely positioned to fill the clip wrapper */}
          <img
            src="/images/invitation-clean.png"
            alt="Tabrez & Nahid Walima Invitation"
            className="absolute top-0 left-0 w-full h-auto block select-none pointer-events-none"
            draggable={false}
          />

          {/* Floral animation overlay */}
          <FloralOverlay />

          {/* ── SECTION 2 (overlaid): Google Maps embed ──
               Exact grey placeholder on invitation-clean.png (x=153–1610, y=8169–9626)
               within clipped frame height 9745:
               top=8169/9745, height=1458/9745, left=153/1760, width=1458/1760 */}
          <div
            className="absolute z-[1000] overflow-hidden rounded-[16px]"
            style={{ top: "83.828%", left: "8.693%", width: "82.841%", height: "14.962%" }}
          >
            {/* Map preview — non-interactive, visual only */}
            <iframe
              title="Princess Kainat Wedding Hall Location"
              src="https://www.google.com/maps?q=Princess%20Kainat%20Wedding%20Lawn%2C%20Shilphata%20Road%2C%20Mumbra%2C%20Maharashtra%2C%20India&output=embed"
              className="absolute inset-0 block h-full w-full max-w-none border-0 pointer-events-none"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={-1}
              aria-hidden="true"
            />
            {/* Transparent click layer — opens Google Maps navigation */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Princess+Kainat+Wedding+Lawn,+Shilphata+Road,+Mumbra,+Maharashtra,+India"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open venue in Google Maps"
              className="absolute inset-0 z-[1001] cursor-pointer"
              style={{ WebkitTapHighlightColor: "transparent" }}
            />
          </div>
        </div>

          {/* Location flower — prior position (left flush + bottom), smaller size */}
          <img
            src="/images/flower-location-bl.png"
            alt=""
            aria-hidden="true"
            className="absolute z-[1002] h-auto origin-bottom-left flower-sway-d pointer-events-none select-none"
            style={{
              width: "32%",
              left: "-7.68%",
              bottom: "calc(-4.29% + 76px)",
            }}
            draggable={false}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: THE DATE — date shown directly (no scratch)
            ══════════════════════════════════════════════════════════ */}
        <div className="relative z-[1000] w-full bg-[#FDF4EB] px-5 pt-5 pb-2">
          {/* Heading — script, matching invitation-clean reference */}
          <div className="text-center mb-2">
            <p
              className="text-[#A68A4A] leading-none"
              style={{
                fontFamily: "var(--pinyon)",
                fontSize: "clamp(2rem, 9vw, 2.65rem)",
                fontWeight: 400,
              }}
            >
              The Date
            </p>
          </div>

          {/* Gold divider */}
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#DEC285] to-transparent opacity-70" />
            <span className="text-[#C9A85C] text-base leading-none">✦</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#DEC285] to-transparent opacity-70" />
          </div>

          {/* Date tiles — 22 / NOVEMBER / 2026 shown directly */}
          <div className="flex justify-center items-start gap-3">
            {[
              { value: "22", label: "DAY", small: false },
              { value: "NOVEMBER", label: "MONTH", small: true },
              { value: "2026", label: "YEAR", small: false },
            ].map((tile) => (
              <div key={tile.label} className="flex flex-col items-center gap-1.5 select-none">
                <div
                  className="relative rounded-[14px] overflow-hidden flex items-center justify-center border border-[#DEC285] shadow-[0_4px_18px_rgba(160,130,60,0.22),inset_0_2px_4px_rgba(255,255,255,0.7)] bg-gradient-to-b from-[#FFFDF9] via-[#FAF2E3] to-[#F0DFC2]"
                  style={{
                    width: "clamp(70px, 22vw, 104px)",
                    height: "clamp(75px, 23.5vw, 112px)",
                  }}
                >
                  <span
                    className={`font-semibold text-[#8A6825] tracking-wide text-center leading-tight px-1 ${
                      tile.small ? "text-[clamp(9px,2.6vw,13px)]" : "text-[clamp(18px,5.5vw,28px)]"
                    }`}
                    style={{ fontFamily: "var(--serif)" }}
                  >
                    {tile.value}
                  </span>
                </div>
                <span
                  className="text-[#9A7B42] tracking-[0.24em] uppercase"
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(8px, 2.1vw, 10px)",
                    fontWeight: 500,
                  }}
                >
                  {tile.label}
                </span>
              </div>
            ))}
          </div>

          {/* Time text matching reference */}
          <div className="text-center mt-3 sm:mt-4">
            <p
              className="text-[#8A6825] tracking-[0.03em] select-none"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(22px, 6.4vw, 28px)",
                fontWeight: 600,
              }}
            >
              Time: 7:30pm to 11pm
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4: THE CELEBRATION BEGINS — live countdown
            ══════════════════════════════════════════════════════════ */}
        <div className="relative z-[1000] w-full bg-[#FDF4EB] px-5 pt-6 pb-0">

          {/* Heading — script, matching invitation-clean reference */}
          <div className="text-center mb-2">
            <p
              className="text-[#A68A4A] leading-none"
              style={{
                fontFamily: "var(--great-vibes)",
                fontSize: "clamp(1.75rem, 7.5vw, 2.35rem)",
                fontWeight: 400,
              }}
            >
              The Celebration Begins
            </p>
          </div>

          {/* Divider — exact ornament from invitation-clean reference */}
          <div className="flex justify-center mb-4 px-2">
            <img
              src="/images/celebration-divider.png?v=3"
              alt=""
              aria-hidden="true"
              className="w-[84%] max-w-[360px] h-auto block select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Live countdown — single instance, 22 Nov 2026 7:00 PM IST */}
          <LiveCountdown />

          {/* Gold divider separating countdown from the final page */}
          <div className="flex items-center gap-3 mt-5 mb-0 px-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#DEC285] to-transparent opacity-60" />
            <span className="text-[#C9A85C] text-xs leading-none">✦</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#DEC285] to-transparent opacity-60" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5: FULL FINAL INVITATION PAGE
            "HOPE TO SEE YOU THERE / WITH LOVE, WAGHOO FAMILY"
            Matching reference:
            - Full-width ivory/cream luxury page
            - Ornate champagne-gold rectangular decorative border
            - Large floral cluster top-left
            - Large floral cluster bottom-right
            - Small gold ornamental divider above “HOPE TO SEE YOU THERE”
            - Centered typography: “HOPE TO SEE YOU THERE”
            - “With Love,” in elegant script
            - “Waghoo Family” in large elegant script
            - Centered 3D circular T&N monogram seal
            - Geometric gold diamond pattern along the bottom
            ══════════════════════════════════════════════════════════ */}
        <div className="relative w-full bg-[#FDF4EB] overflow-hidden">
          <img
            src="/images/hope-final-clean.png"
            alt="Hope to see you there - With Love, Waghoo Family"
            className="w-full h-auto block select-none pointer-events-none"
            draggable={false}
          />

          {/* Final section flowers — each asset exactly once */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <img
              src="/images/flower-final-tl.png"
              alt=""
              className="absolute top-0 left-0 w-[58%] max-w-[265px] h-auto origin-top-left flower-sway-e pointer-events-none select-none"
              draggable={false}
            />
            <img
              src="/images/flower-final-br.png"
              alt=""
              className="absolute right-0 w-[58%] max-w-[265px] h-auto origin-bottom-right flower-sway-f pointer-events-none select-none"
              style={{ bottom: "36px" }}
              draggable={false}
            />
          </div>
        </div>

      </div>
    </main>
  );
}
