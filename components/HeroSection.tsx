"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectFeature {
  id: string;
  pillar: "BRANDS" | "BUSINESSES" | "EXPERIENCES";
  title: string;
  discipline: string;
  client: string;
  location: string;
  year: string;
  image: string;
  alt: string;
}

const PILLARS: ProjectFeature[] = [
  {
    id: "01",
    pillar: "BRANDS",
    title: "Spatial & Industrial Architecture",
    discipline: "BRAND IDENTITY & SPATIAL SYSTEMS",
    client: "LOOM CRAFTS",
    location: "NEW DELHI",
    year: "2023",
    image: "/images/case-studies/loom/loom-hero.jpg",
    alt: "Loom Crafts spatial architecture and bespoke design systems"
  },
  {
    id: "02",
    pillar: "BUSINESSES",
    title: "Hospitality Concept & Operations",
    discipline: "COMMERCIAL STRATEGY & DINING DESIGN",
    client: "MISU",
    location: "BANGALORE",
    year: "2022",
    image: "/images/case-studies/misu/misu-hero.jpg",
    alt: "Misu bespoke hospitality interior and dining architecture"
  },
  {
    id: "03",
    pillar: "EXPERIENCES",
    title: "Expeditionary Cultural Production",
    discipline: "HIGH-ALTITUDE EXPERIENTIAL TOURISM",
    client: "TOURIN LADAKH",
    location: "LADAKH",
    year: "2024",
    image: "/images/tourin/tourin-1.jpg",
    alt: "Tourin Ladakh cultural expeditions and on-ground production"
  }
];

export default function HeroSection() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHoveringMedia, setIsHoveringMedia] = useState(false);

  // Listen for the custom hero entrance event from LoadingExperience or auto-reveal
  useEffect(() => {
    const handleHeroReady = () => {
      setIsRevealed(true);
    };

    window.addEventListener("arohana:hero-ready", handleHeroReady);

    // If intro was already completed or skipped previously, reveal quickly
    const fallbackTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 400);

    return () => {
      window.removeEventListener("arohana:hero-ready", handleHeroReady);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const activeProject = PILLARS[activePillarIndex];

  return (
    <section
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#070B14] text-white pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 px-6 sm:px-10 md:px-14 select-none"
      aria-label="Ārohana Hero Statement"
    >
      {/* Background Architectural Grid Lines & Atmospheric Sheen */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px"
        }}
      />

      {/* Atmospheric Navy/Obsidian Radial Vignette */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, #192D4A 0%, rgba(7, 11, 20, 0) 70%)"
        }}
      />

      {/* ================= TOP METADATA BAR ================= */}
      <div
        className={`relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 sm:pb-5 transition-all duration-1000 ease-out ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.26em] text-[#C5A46D] uppercase">
            ĀROHANA CONSULTANCY
          </span>
          <span className="text-white/20">/</span>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-white/50 uppercase">
            STRATEGIC PRACTICE
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
            [ 16°41&apos;N 74°14&apos;E — MUMBAI · GOA · LADAKH ]
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-white/60 uppercase">
            EST. 2020
          </span>
        </div>
      </div>

      {/* ================= MAIN EDITORIAL COMPOSITION ================= */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto my-auto py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* LEFT / CENTER-LEFT: MONUMENTAL TYPOGRAPHIC STATEMENT */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Subtitle Monospace Label */}
          <div className="overflow-hidden mb-3 sm:mb-4">
            <span
              className={`inline-block font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#C5A46D] uppercase transition-transform duration-700 delay-100 ease-out ${
                isRevealed ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
            >
              CORE POSITIONING // MASTER STATEMENT
            </span>
          </div>

          {/* Master Statement Lines */}
          <h1 className="font-clash text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.4rem] font-medium tracking-[-0.03em] uppercase leading-[0.94] text-white">
            <div className="overflow-hidden py-1">
              <span
                className={`block transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRevealed ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
                }`}
              >
                WE BUILD
              </span>
            </div>

            <div className="overflow-hidden py-1">
              <span
                className={`block transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRevealed ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
                }`}
              >
                BRANDS,
              </span>
            </div>

            <div className="overflow-hidden py-1">
              <span
                className={`block transition-all duration-1000 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRevealed ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
                }`}
              >
                BUSINESSES &amp;
              </span>
            </div>

            <div className="overflow-hidden py-1">
              <span
                className={`block text-[#F3EFE6] transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRevealed ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
                }`}
              >
                EXPERIENCES.
              </span>
            </div>
          </h1>

          {/* Interactive Pillar Switchers */}
          <div
            className={`pt-8 sm:pt-10 flex flex-wrap items-center gap-3 sm:gap-4 transition-all duration-1000 delay-600 ease-out ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-white/40 uppercase mr-1">
              DISCIPLINES:
            </span>
            {PILLARS.map((p, idx) => {
              const isActive = idx === activePillarIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillarIndex(idx)}
                  onMouseEnter={() => setActivePillarIndex(idx)}
                  className={`group relative flex items-center gap-2 px-3.5 py-1.5 border transition-all duration-300 ${
                    isActive
                      ? "border-[#C5A46D] bg-[#C5A46D]/10 text-white"
                      : "border-white/[0.12] bg-white/[0.02] text-white/60 hover:text-white hover:border-white/30"
                  }`}
                  aria-label={`View ${p.pillar} real work`}
                >
                  <span
                    className={`font-mono text-[9px] tracking-wider transition-colors ${
                      isActive ? "text-[#C5A46D]" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-medium">
                    {p.pillar}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT / ASYMMETRICAL EDITORIAL REAL-WORK FRAME */}
        <div
          className={`lg:col-span-5 relative transition-all duration-1000 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
          }`}
          onMouseEnter={() => setIsHoveringMedia(true)}
          onMouseLeave={() => setIsHoveringMedia(false)}
        >
          {/* Framed Viewport */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[520px] rounded-none border border-white/[0.12] bg-[#0A0F18] overflow-hidden group shadow-2xl">
            {/* Corner Precision Marks */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 z-20 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 z-20 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40 z-20 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40 z-20 pointer-events-none" />

            {/* Top Index Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#070B14]/80 backdrop-blur-md px-2.5 py-1 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D] animate-ping" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/80 uppercase">
                FEATURED WORK // {activeProject.id}
              </span>
            </div>

            {/* Image Stack with Smooth Cross-fade and Ambient Scale */}
            {PILLARS.map((p, idx) => {
              const isCurrent = idx === activePillarIndex;
              return (
                <div
                  key={p.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-1000 ease-out ${
                      isCurrent && isHoveringMedia ? "scale-105" : "scale-100"
                    }`}
                  >
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      style={{ objectFit: "cover" }}
                      className="filter contrast-[1.05] brightness-90"
                    />
                  </div>
                </div>
              );
            })}

            {/* Gradient Dark Overlay for Editorial Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/30 to-transparent z-10 pointer-events-none" />

            {/* Bottom Project Metadata Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.26em] text-[#C5A46D] uppercase">
                  {activeProject.discipline}
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  {activeProject.year}
                </span>
              </div>
              <h3 className="font-clash text-lg sm:text-xl font-medium tracking-tight text-white uppercase">
                {activeProject.client}
              </h3>
              <p className="font-mono text-[10px] text-white/60 tracking-wider">
                {activeProject.title} — {activeProject.location}
              </p>
            </div>
          </div>

          {/* Side Indicator / Monograph Reference */}
          <div className="mt-3 flex items-center justify-between text-white/40 font-mono text-[9px] tracking-[0.2em] uppercase">
            <span>REAL COMMISSIONS &amp; SPACES</span>
            <span>INDEX 01 — 03</span>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM EDITORIAL FOOTNOTE ================= */}
      <div
        className={`relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] pt-4 sm:pt-5 transition-all duration-1000 delay-700 ease-out ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-white/50 uppercase">
            EDITORIAL · CULTURAL · COMMERCIAL · CINEMATIC
          </span>
        </div>

        {/* Scroll Indicator with Fine Animated Line */}
        <div className="flex items-center gap-3 group">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-white/60 uppercase">
            PHASE 01 // BRAND STATEMENT
          </span>
          <div className="w-8 h-[1px] bg-white/30 overflow-hidden relative">
            <span className="absolute inset-0 bg-[#C5A46D] translate-x-[-100%] animate-[marquee_2s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
