"use client";

import React from "react";

/**
 * Separate flower layers for Section 1 (arch) + Location (map).
 * Each asset from /Downloads/fffff appears exactly once.
 */
export const FloralOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {/* Second page (invitation arch) — bottom-left corner */}
      <img
        src="/images/flower-section1-bl.png"
        alt=""
        className="absolute left-0 w-[40%] max-w-[170px] h-auto origin-bottom-left flower-sway-a pointer-events-none select-none"
        style={{ bottom: "calc(31% + 36px)" }}
        draggable={false}
      />

      {/* Second page (invitation arch) — bottom-right corner */}
      <img
        src="/images/flower-section1-br.png"
        alt=""
        className="absolute right-0 w-[40%] max-w-[170px] h-auto origin-bottom-right flower-sway-b pointer-events-none select-none"
        style={{ bottom: "calc(31% + 36px)" }}
        draggable={false}
      />

      {/* Page 3 (Location) — top-right corner, near location text */}
      <img
        src="/images/flower-location-tr.png"
        alt=""
        className="absolute right-0 w-[40%] max-w-[170px] h-auto origin-top-right flower-sway-c pointer-events-none select-none"
        style={{ top: "calc(72% - 15px)" }}
        draggable={false}
      />
    </div>
  );
};

export default FloralOverlay;
