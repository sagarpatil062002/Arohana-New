"use client";

import React, { useState } from "react";
import Image from "next/image";

interface WorldItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  location: string;
  image: string;
}

const WORLDS: WorldItem[] = [
  {
    id: "01",
    title: "LADAKH",
    category: "HIGH-ALTITUDE FRONTIERS",
    subtitle: "High-altitude operations, border village healthcare, and raw Himalayan expeditions at 14,000+ ft.",
    location: "Leh, Nubra, Chushul & Changthang",
    image: "/images/tourin/tourin-1.jpg"
  },
  {
    id: "02",
    title: "FOUNDRIES",
    category: "HEAVY INDUSTRY & REALTY",
    subtitle: "Heavy engineering, precision industrial casting, and luxury architectural developments.",
    location: "Kolhapur & Regional Industrial Corridors",
    image: "/images/case-studies/raysons/casting-hero.jpg"
  },
  {
    id: "03",
    title: "DINING",
    category: "HOSPITALITY ARCHITECTURE",
    subtitle: "Turnkey restaurant concepts, food cost margin engineering, kitchen pass SOPs, and guest floor choreography.",
    location: "Goa, Bangalore & Western Hubs",
    image: "/images/case-studies/misu/misu-hero.jpg"
  },
  {
    id: "04",
    title: "FILMS",
    category: "DOCUMENTARY & INSTITUTIONAL",
    subtitle: "Military retrospective archives, corporate manifestos, and cinematic storytelling under demanding field conditions.",
    location: "Northern Frontiers & National Broadcasters",
    image: "/images/case-studies/she/she-hero.jpg"
  }
];

export default function VisualWorldTransition() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeWorld = WORLDS[activeIdx];

  return (
    <section
      className="relative w-full min-h-[90vh] py-24 sm:py-36 bg-[#04060c] text-white overflow-hidden flex flex-col justify-between select-none"
      aria-label="Ārohana Worlds Transition"
    >
      {/* Dynamic Background Image with Smooth Cross-fade and Ambient Scale */}
      <div className="absolute inset-0 z-0">
        {WORLDS.map((w, idx) => {
          const isCurrent = idx === activeIdx;
          return (
            <div
              key={w.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? "opacity-35" : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                className={`relative w-full h-full transition-transform duration-1000 ease-out ${
                  isCurrent ? "scale-100" : "scale-105"
                }`}
              >
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  className="filter contrast-110 brightness-75"
                />
              </div>
            </div>
          );
        })}
        {/* Radial Depth Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060c] via-[#04060c]/60 to-[#04060c]" />
      </div>

      {/* Top Header Eyebrow */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D] animate-ping" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-white/50 uppercase">
            OPERATIONAL THEATRES // 04 REALMS
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#C5A46D] uppercase">
          HOVER TO ENTER DEPTH
        </span>
      </div>

      {/* Center Monumental Spatial Typography Stack */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14 my-auto py-12 flex flex-col items-start justify-center">
        {WORLDS.map((item, idx) => {
          const isCurrent = idx === activeIdx;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
              className="group w-full flex items-baseline justify-between border-b border-white/[0.06] py-3 sm:py-5 cursor-pointer transition-all duration-300"
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span
                  className={`font-mono text-xs sm:text-sm tracking-wider transition-colors duration-300 ${
                    isCurrent ? "text-[#C5A46D]" : "text-white/30 group-hover:text-white/60"
                  }`}
                >
                  0{idx + 1}
                </span>
                <h3
                  className={`font-clash text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light uppercase tracking-tight transition-all duration-500 ${
                    isCurrent
                      ? "text-white translate-x-3 sm:translate-x-6 scale-100 font-normal"
                      : "text-white/30 group-hover:text-white/70 translate-x-0"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              <div className="hidden md:flex flex-col text-right">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#C5A46D] uppercase">
                  {item.category}
                </span>
                <span className="font-mono text-[11px] text-white/50">
                  {item.location}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Context Narrative */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        <p className="font-mono text-xs sm:text-sm text-white/70 max-w-xl">
          {activeWorld.subtitle}
        </p>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
          RANGE OVER NARROW SPECIALIZATION
        </span>
      </div>
    </section>
  );
}
