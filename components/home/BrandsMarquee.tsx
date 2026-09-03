"use client";

import React, { useState } from "react";

const ROW_1 = [
  "Raysons Group",
  "PictureTime Entertainment",
  "Loom Crafts",
  "Neora Deck",
  "Misu",
  "RR Skins",
  "Blu Resorts",
  "Passcode Hospitality"
];

const ROW_2 = [
  "Western Command",
  "14 Corps (Fire & Fury)",
  "Qubice",
  "Kanopy",
  "Citron",
  "DTK Karekar",
  "Project SHE",
  "Border Roads Organisation"
];

export default function BrandsMarquee() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="marquee"
      className="relative w-full py-20 sm:py-28 bg-[#050811] text-white border-t border-b border-white/[0.07] overflow-hidden select-none"
      aria-label="Brands and Organisations We Have Worked With"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Eyebrow */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-white/50 uppercase">
            CLIENT &amp; INSTITUTIONAL ECOSYSTEM
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase hidden sm:inline-block">
          REPRESENTATIVE PARTNERSHIPS
        </span>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="relative w-full overflow-hidden mb-4">
        <div
          className="flex whitespace-nowrap gap-12 sm:gap-16 will-change-transform"
          style={{
            animation: `marqueeLeft 36s linear infinite`,
            animationPlayState: isHovered ? "paused" : "running"
          }}
        >
          {[...ROW_1, ...ROW_1, ...ROW_1].map((name, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-16">
              <span className="font-clash text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white/75 hover:text-white transition-colors uppercase">
                {name}
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#C5A46D]/60 select-none">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex whitespace-nowrap gap-12 sm:gap-16 will-change-transform"
          style={{
            animation: `marqueeRight 42s linear infinite`,
            animationPlayState: isHovered ? "paused" : "running"
          }}
        >
          {[...ROW_2, ...ROW_2, ...ROW_2].map((name, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-16">
              <span className="font-clash text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white/40 hover:text-white/80 transition-colors uppercase">
                {name}
              </span>
              <span className="font-mono text-xs sm:text-sm text-white/20 select-none">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* Edge Gradients for Smooth Infinite Dissolve */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#050811] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#050811] to-transparent pointer-events-none z-10" />
    </section>
  );
}
