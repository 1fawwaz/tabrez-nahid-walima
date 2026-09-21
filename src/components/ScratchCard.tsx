"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScratchCardProps {
  value: string;
  label: string;
  isSmallText?: boolean;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ value, label, isSmallText }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#F8EBD0");
    grad.addColorStop(0.3, "#EAD09A");
    grad.addColorStop(0.5, "#FFF8E7");
    grad.addColorStop(0.7, "#DFC07B");
    grad.addColorStop(1, "#C69A45");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Diagonal shimmer lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1.5;
    for (let i = -rect.height; i < rect.width + rect.height; i += 7) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + rect.height, rect.height);
      ctx.stroke();
    }

    // "Scratch here" hint text
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.font = `bold ${Math.min(rect.width * 0.13, 11)}px 'Georgia', serif`;
    ctx.fillStyle = "rgba(120, 90, 30, 0.55)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("scratch", rect.width / 2, rect.height / 2);
    ctx.restore();
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22 * dpr, 0, Math.PI * 2);
    ctx.fill();

    checkProgress(ctx, canvas);
  };

  const checkProgress = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] < 20) transparent++;
      }
      const ratio = transparent / (imgData.data.length / 64);
      if (ratio > 0.38) setIsRevealed(true);
    } catch {
      // cross-origin safe ignore
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };
  const handlePointerUp = () => { isDrawing.current = false; };

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      {/* Scratch card box */}
      <div
        ref={containerRef}
        className="relative rounded-[14px] overflow-hidden flex items-center justify-center border border-[#DEC285] shadow-[0_4px_18px_rgba(160,130,60,0.22),inset_0_2px_4px_rgba(255,255,255,0.7)] bg-gradient-to-b from-[#FFFDF9] via-[#FAF2E3] to-[#F0DFC2]"
        style={{
          width: "clamp(70px, 22vw, 104px)",
          height: "clamp(75px, 23.5vw, 112px)",
          touchAction: "none",
        }}
      >
        {/* Revealed value */}
        <span
          className={`relative z-0 font-bold text-[#8A6825] tracking-wide text-center leading-tight px-1 ${
            isSmallText ? "text-[clamp(8px,2.5vw,12px)]" : "text-[clamp(16px,5.2vw,26px)]"
          }`}
          style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        >
          {value}
        </span>

        {/* Gold foil scratch layer */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-700 ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </div>

      {/* Label */}
      <span
        className="text-[#9A7B42] tracking-[0.24em] uppercase font-medium"
        style={{
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontSize: "clamp(8px, 2.1vw, 10px)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default ScratchCard;
