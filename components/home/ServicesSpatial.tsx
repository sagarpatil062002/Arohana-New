"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";

export default function ServicesSpatial() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const currentService = servicesData[activeServiceIdx];

  return (
    <section
      className="relative w-full py-28 sm:py-36 md:py-44 bg-[#050811] text-white border-t border-white/[0.08] overflow-hidden select-none"
      aria-label="Ārohana Practice Areas"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#C5A46D] font-semibold">[ 03 PRACTICE AREAS ]</span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-white/40 uppercase">
                SPATIAL SERVICE ENVIRONMENT
              </span>
            </div>
            <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight uppercase leading-[1.05] text-white">
              ENGINEERED CAPABILITY. <br />
              <span className="text-white/40">COMMERCIAL IMPACT.</span>
            </h2>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-[#C5A46D] uppercase border-b border-[#C5A46D]/60 pb-1 hover:border-[#C5A46D] transition-colors w-fit"
          >
            <span>Explore all practice scopes</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 3D Layered Spatial Planes Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 3 Monumental Category Triggers */}
          <div className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8">
            {servicesData.map((service, idx) => {
              const isSelected = idx === activeServiceIdx;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveServiceIdx(idx)}
                  onMouseEnter={() => setActiveServiceIdx(idx)}
                  className={`group cursor-pointer p-6 sm:p-8 border transition-all duration-500 relative overflow-hidden ${
                    isSelected
                      ? "border-[#C5A46D] bg-[#0c1424] shadow-2xl scale-[1.02]"
                      : "border-white/[0.08] bg-transparent hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                  style={{
                    transform: isSelected ? "perspective(800px) translateZ(20px)" : "perspective(800px) translateZ(0px)"
                  }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span
                      className={`font-mono text-xs tracking-widest ${
                        isSelected ? "text-[#C5A46D]" : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {service.index} // PRACTICE
                    </span>
                    {isSelected && (
                      <span className="font-mono text-[9px] tracking-widest text-[#C5A46D] uppercase">
                        ACTIVE PLANE
                      </span>
                    )}
                  </div>

                  <h3
                    className={`font-clash text-2xl sm:text-3xl lg:text-4xl font-normal uppercase tracking-tight transition-colors ${
                      isSelected ? "text-white" : "text-white/50 group-hover:text-white"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm font-light mt-3 leading-relaxed transition-opacity duration-300 ${
                      isSelected ? "text-white/75 opacity-100" : "text-white/40 opacity-70"
                    }`}
                  >
                    {service.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#C5A46D] uppercase">
                    <span>Explore scope</span>
                    <span>→</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Spatial Visual Plane & Capability Matrix */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            {/* Viewport Frame */}
            <div className="relative w-full aspect-[16/11] border border-white/[0.12] bg-[#080d1a] overflow-hidden group shadow-2xl">
              {/* Corner Registration Marks */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40 z-20 pointer-events-none" />

              {/* Service Visuals with Depth Crossfade */}
              {servicesData.map((s, idx) => {
                const isCurrent = idx === activeServiceIdx;
                return (
                  <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      isCurrent ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      className="filter contrast-105 brightness-90"
                    />
                  </div>
                );
              })}

              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between font-mono text-[9px] tracking-[0.22em] text-white/60 uppercase">
                <span>{currentService.title}</span>
                <span>{currentService.index} / 03</span>
              </div>
            </div>

            {/* Core Capabilities Chips */}
            <div className="p-6 border border-white/[0.08] bg-[#090f1e]/60 backdrop-blur-sm space-y-3">
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#C5A46D] uppercase block">
                SPECIALIZED CAPABILITIES:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentService.capabilities.slice(0, 8).map((cap, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] text-white/70 bg-white/[0.03] border border-white/[0.06] px-3 py-1 hover:border-[#C5A46D]/40 transition-colors"
                  >
                    {cap}
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
