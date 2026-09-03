"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SectorItem {
  id: string;
  num: string;
  name: string;
  engagements: string;
  capabilities: string[];
  summary: string;
  image: string;
}

const SECTORS: SectorItem[] = [
  {
    id: "hospitality",
    num: "01",
    name: "Hospitality & F&B",
    engagements: "06 Engagements",
    summary: "Restaurant concepts, food cost margin engineering, kitchen pass SOPs, and guest acquisition strategies built from commercial food & beverage operations.",
    capabilities: ["Concept & Menu Design", "Margin & Food Cost Engineering", "Kitchen Pass SOPs", "Guest Acquisition"],
    image: "/images/case-studies/misu/misu-hero.jpg"
  },
  {
    id: "real-estate",
    num: "02",
    name: "Real Estate & Built Environment",
    engagements: "04 Engagements",
    summary: "Positioning premium architectural developments, industrial engineering facilities, and high-value modular pre-fab residences.",
    capabilities: ["Architectural Positioning", "Investor Presentation Films", "Pre-Launch Acquisition", "Spatial Storytelling"],
    image: "/images/case-studies/raysons/realestate-1.jpg"
  },
  {
    id: "healthcare",
    num: "03",
    name: "Healthcare & Aesthetics",
    engagements: "03 Engagements",
    summary: "Translating complex clinical dermatology and specialized healthcare into high-trust patient communication and ethical brand equity.",
    capabilities: ["Clinical Positioning", "Doctor-Led Video Systems", "Patient Acquisition Funnels", "Reputational Governance"],
    image: "/images/case-studies/rrskins/rrskins-hero.jpg"
  },
  {
    id: "lifestyle",
    num: "04",
    name: "Lifestyle & Luxury Brands",
    engagements: "05 Engagements",
    summary: "Direct-to-consumer and B2B luxury lifestyle positioning spanning bespoke outdoor furniture, craft beverage networks, and high-design retail.",
    capabilities: ["Luxury Identity Systems", "High-Net-Worth Journey Mapping", "E-Commerce Architecture", "Editorial Catalogues"],
    image: "/images/case-studies/loom/loom-hero.jpg"
  },
  {
    id: "entertainment",
    num: "05",
    name: "Entertainment & Media",
    engagements: "03 Engagements",
    summary: "Cultural infrastructure, mobile digital cinema networks deployed across the Himalayas, and international film festival coverage.",
    capabilities: ["Cultural Media Infrastructure", "Festival Film Coverage", "Government & Institutional PR", "Broadcast Distribution"],
    image: "/images/case-studies/picturetime/picturetime-hero.jpg"
  },
  {
    id: "travel",
    num: "06",
    name: "Travel & Tourism",
    engagements: "02 Ventures",
    summary: "High-altitude experiential expeditions, mindful motorcycle circuits, and remote Himalayan community tourism.",
    capabilities: ["Bespoke Expedition Curation", "Field Logistics Governance", "Atmospheric Documentary", "Local Community Direct Equity"],
    image: "/images/tourin/tourin-1.jpg"
  }
];

export default function SectorDepthIndex() {
  const [activeSectorIdx, setActiveSectorIdx] = useState(0);
  const activeSector = SECTORS[activeSectorIdx];

  return (
    <section
      className="relative w-full py-28 sm:py-36 bg-[#04060c] text-white border-t border-white/[0.08] overflow-hidden select-none"
      aria-label="Ārohana Sector Depth"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#C5A46D] font-semibold">[ SECTOR DEPTH ]</span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-white/40 uppercase">
                WHERE OUR EXPERIENCE SITS
              </span>
            </div>
            <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight uppercase leading-[1.05] text-white">
              DEEP DOMAIN IMMERSION. <br />
              <span className="text-white/40">ZERO GENERIC TEMPLATES.</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-white/50 max-w-sm hidden sm:block">
            Cross-disciplinary capability deployed across 6 core commercial and institutional sectors.
          </p>
        </div>

        {/* 2.5D Interactive Sector Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: 6 Interactive Sector Rows */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
            {SECTORS.map((sector, idx) => {
              const isSelected = idx === activeSectorIdx;
              return (
                <div
                  key={sector.id}
                  onClick={() => setActiveSectorIdx(idx)}
                  onMouseEnter={() => setActiveSectorIdx(idx)}
                  className="py-5 sm:py-6 px-3 flex items-center justify-between cursor-pointer group transition-colors duration-300 hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-6 sm:gap-8">
                    <span
                      className={`font-mono text-xs tracking-wider transition-colors ${
                        isSelected ? "text-[#C5A46D] font-semibold" : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {sector.num}
                    </span>
                    <h3
                      className={`font-clash text-xl sm:text-2xl lg:text-3xl font-normal uppercase tracking-tight transition-all duration-300 ${
                        isSelected
                          ? "text-white translate-x-2 font-medium"
                          : "text-white/50 group-hover:text-white translate-x-0"
                      }`}
                    >
                      {sector.name}
                    </h3>
                  </div>

                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase transition-colors ${
                      isSelected ? "text-[#C5A46D]" : "text-white/30"
                    }`}
                  >
                    {sector.engagements}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Ambient Visual Vignette & Capability Matrix */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="relative w-full aspect-[4/3] border border-white/[0.12] bg-[#070b16] overflow-hidden group shadow-2xl">
              {SECTORS.map((s, idx) => {
                const isCurrent = idx === activeSectorIdx;
                return (
                  <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      isCurrent ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      style={{ objectFit: "cover" }}
                      className="filter contrast-105 brightness-85"
                    />
                  </div>
                );
              })}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060c] via-transparent to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-white/70 uppercase">
                <span>{activeSector.name}</span>
                <span>{activeSector.engagements}</span>
              </div>
            </div>

            <div className="p-6 border border-white/[0.08] bg-[#070b16]/70 backdrop-blur-sm space-y-3">
              <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                {activeSector.summary}
              </p>
              <div className="pt-3 border-t border-white/[0.08] flex flex-wrap gap-2">
                {activeSector.capabilities.map((c, i) => (
                  <span
                    key={i}
                    className="font-mono text-[9px] text-[#C5A46D] bg-[#C5A46D]/10 border border-[#C5A46D]/20 px-2.5 py-1"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
