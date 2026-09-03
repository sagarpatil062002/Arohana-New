"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { tourinConfig } from "@/data/tourin";

export default function TourinFeature() {
  return (
    <section
      className="relative w-full py-32 sm:py-44 bg-[#030509] text-white border-t border-white/[0.08] overflow-hidden"
      aria-label="Tourin Experiential Travel"
    >
      {/* Ambient Dark Himalayan Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/images/tourin/tourin-hero.jpg"
          alt="Tourin Ladakh high mountain pass"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="filter brightness-60 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030509] via-transparent to-[#030509]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Transitional Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C5A46D] animate-ping" />
          <span className="font-mono text-xs text-[#C5A46D] font-semibold">[ THE EXPERIENTIAL UNIT ]</span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-white/50 uppercase">
            HIGH-ALTITUDE HIMALAYAN EXPEDITIONS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-light uppercase tracking-tight text-white leading-[1.02]">
              AND THEN THERE IS <br />
              <span className="font-normal text-[#F3EFE6] tracking-wider">TOURIN.</span>
            </h2>

            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl">
              {tourinConfig.leadParagraph}
            </p>

            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-xl">
              {tourinConfig.extendedCopy}
            </p>

            {/* Tourin Metric Highlights */}
            <div className="pt-6 border-t border-white/[0.1] grid grid-cols-2 sm:grid-cols-4 gap-6">
              {tourinConfig.stats.map((st, i) => (
                <div key={i}>
                  <span className="font-clash text-2xl sm:text-3xl font-light text-[#C5A46D] tabular-nums block">
                    {st.value}
                  </span>
                  <span className="font-mono text-[9px] tracking-wider text-white/50 uppercase block mt-1">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/tourin"
                className="group inline-flex items-center gap-3 px-6 py-3 border border-[#C5A46D] bg-[#050811]/90 hover:bg-[#C5A46D] text-white hover:text-black font-mono text-xs tracking-[0.18em] uppercase transition-all duration-300"
              >
                <span>Enter Tourin Expedition World</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Right Imagery Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] border border-white/[0.14] bg-[#070c14] overflow-hidden group shadow-2xl">
              {/* Corner Marks */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40 z-20 pointer-events-none" />

              <Image
                src="/images/tourin/tourin-2.jpg"
                alt="Tourin Ladakh experiential travel"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
                className="filter contrast-105 brightness-90 transition-transform duration-1000 group-hover:scale-103"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#030509] via-transparent to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-white/70 uppercase">
                <span>ZANSKAR · NUBRA · CHANG LA</span>
                <span>BESPOKE EXPEDITIONS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
