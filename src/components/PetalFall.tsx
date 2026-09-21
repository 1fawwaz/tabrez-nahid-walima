import React from "react";

/**
 * CSS-only falling petals (PNG assets from Downloads/ppp).
 * Mount ONLY after the couple video starts — never during intro.
 */
const PETAL_COUNT = 28;
const ASSETS = Array.from(
  { length: 28 },
  (_, i) => `/images/petals/petal-${String((i % 28) + 1).padStart(2, "0")}.png`
);

const PETALS = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const left = ((i * 37 + 5) % 98) + 1;
  const size = 18 + ((i * 11) % 28);
  const duration = 12 + ((i * 7) % 18);
  const delay = -((i * 13) % 24);
  const drift = (i % 2 === 0 ? 1 : -1) * (20 + ((i * 17) % 70));
  const spin = 6 + ((i * 5) % 10);
  const opacity = 0.5 + ((i * 9) % 40) / 100;
  const sway = 3 + ((i * 3) % 5);
  return {
    src: ASSETS[i % ASSETS.length],
    left: `${left}%`,
    size: `${size}px`,
    duration: `${duration}s`,
    delay: `${delay}s`,
    drift: `${drift}px`,
    spin: `${spin}s`,
    opacity: String(opacity),
    sway: `${sway}s`,
  };
});

export default function PetalFall() {
  return (
    <div
      className="petal-rain"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1010,
      }}
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal-rain__item"
          style={
            {
              left: p.left,
              width: p.size,
              opacity: p.opacity,
              "--fall-dur": p.duration,
              "--fall-delay": p.delay,
              "--drift": p.drift,
              "--spin-dur": p.spin,
              "--sway-dur": p.sway,
            } as React.CSSProperties
          }
        >
          <img src={p.src} alt="" draggable={false} />
        </span>
      ))}
    </div>
  );
}
