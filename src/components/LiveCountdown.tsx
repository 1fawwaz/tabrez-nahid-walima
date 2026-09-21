"use client";

import React, { useEffect, useState } from "react";

// 22 November 2026, 7:00 PM IST (UTC+5:30)
const TARGET_MS = new Date("2026-11-22T19:00:00+05:30").getTime();

interface Unit {
  value: string;
  label: string;
}

export const LiveCountdown: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([
    { value: "--", label: "Days" },
    { value: "--", label: "Hours" },
    { value: "--", label: "Minutes" },
    { value: "--", label: "Seconds" },
  ]);

  useEffect(() => {
    const tick = () => {
      const diff = TARGET_MS - Date.now();
      if (diff <= 0) {
        setUnits([
          { value: "00", label: "Days" },
          { value: "00", label: "Hours" },
          { value: "00", label: "Minutes" },
          { value: "00", label: "Seconds" },
        ]);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setUnits([
        { value: String(d).padStart(2, "0"), label: "Days" },
        { value: String(h).padStart(2, "0"), label: "Hours" },
        { value: String(m).padStart(2, "0"), label: "Minutes" },
        { value: String(s).padStart(2, "0"), label: "Seconds" },
      ]);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full flex items-end justify-center gap-0">
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          <div
            className="flex flex-col items-center"
            style={{ minWidth: "clamp(48px, 19vw, 78px)" }}
          >
            <span
              className="leading-none tabular-nums text-[#A68A4A]"
              style={{
                fontFamily: "var(--serif)",
                fontWeight: 500,
                fontSize: "clamp(1.85rem, 8.5vw, 2.75rem)",
                letterSpacing: "0.02em",
              }}
            >
              {u.value}
            </span>
            <span
              className="mt-1.5 text-[#A68A4A]"
              style={{
                fontFamily: "var(--serif)",
                fontWeight: 500,
                fontSize: "clamp(0.7rem, 2.8vw, 0.95rem)",
              }}
            >
              {u.label}
            </span>
          </div>

          {i < units.length - 1 && (
            <span
              className="text-[#A68A4A] pb-5 px-1 leading-none"
              style={{
                fontFamily: "var(--serif)",
                fontWeight: 400,
                fontSize: "clamp(1.4rem, 6vw, 2rem)",
              }}
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LiveCountdown;
