"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { armyProjectsData } from "@/data/armyProjects";

export default function ArmySpecialProjects() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const currentProject = armyProjectsData[activeProjectIdx];

  return (
    <section
      className="relative w-full py-28 sm:py-36 bg-[#04070e] text-white border-t border-white/[0.08] overflow-hidden"
      aria-label="Indian Army Special Projects"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-xs text-[#C5A46D] font-semibold">[ SPECIAL ENGAGEMENTS ]</span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-white/40 uppercase">
                INSTITUTIONAL &amp; DEFENCE MEDIA
              </span>
            </div>

            <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight uppercase leading-[1.02] text-white">
              INDIAN ARMY PROJECTS
              <span className="block text-xl sm:text-2xl font-mono font-light text-white/50 tracking-[0.16em] mt-3">
                WESTERN COMMAND · 14 CORPS · LADAKH
              </span>
            </h2>
          </div>

          <Link
            href="/army-projects"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-[#C5A46D] uppercase border-b border-[#C5A46D]/60 pb-1 hover:border-[#C5A46D] transition-colors w-fit"
          >
            <span>Explore all military briefs</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 2.5D Interactive Project Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Interactive Project List Index */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {armyProjectsData.map((project, idx) => {
              const isActive = idx === activeProjectIdx;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  onMouseEnter={() => setActiveProjectIdx(idx)}
                  className={`text-left p-5 border transition-all duration-300 w-full flex items-start justify-between ${
                    isActive
                      ? "border-[#C5A46D] bg-[#0c1322] shadow-xl"
                      : "border-white/[0.08] bg-transparent hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                  aria-label={`Select ${project.title}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[10px] tracking-widest ${
                          isActive ? "text-[#C5A46D]" : "text-white/40"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-white/50 uppercase">
                        {project.command}
                      </span>
                    </div>
                    <h3
                      className={`font-clash text-lg sm:text-xl font-medium tracking-tight uppercase ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase hidden sm:inline-block ${
                      isActive ? "text-[#C5A46D]" : "text-white/30"
                    }`}
                  >
                    {project.elevation}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Dominant Photography & Protocol Telemetry */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Visual Viewport */}
            <div className="relative w-full aspect-[16/10] border border-white/[0.12] bg-[#070c16] overflow-hidden group shadow-2xl">
              {/* Corner Marks */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40 z-20 pointer-events-none" />

              {/* Real Project Image with Smooth Crossfade */}
              {armyProjectsData.map((p, idx) => {
                const isCurrent = idx === activeProjectIdx;
                return (
                  <div
                    key={p.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      isCurrent ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      style={{ objectFit: "cover" }}
                      className="filter contrast-105 brightness-95"
                      priority={idx === 0}
                    />
                  </div>
                );
              })}

              <div className="absolute inset-0 bg-gradient-to-t from-[#04070e] via-transparent to-black/30 z-10 pointer-events-none" />

              {/* Floating Top Telemetry Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#04070e]/80 backdrop-blur-md px-3 py-1 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.24em] text-white/90 uppercase">
                  THEATRE: {currentProject.theatre}
                </span>
              </div>
            </div>

            {/* Narrative & Strict Security Protocols */}
            <div className="p-6 border border-white/[0.08] bg-[#070c16]/50 backdrop-blur-sm space-y-4">
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {currentProject.summary}
              </p>

              <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#C5A46D] uppercase">
                  PROTOCOLS:
                </span>
                {currentProject.protocols.map((proto, i) => (
                  <span
                    key={i}
                    className="font-mono text-[9px] tracking-wider text-white/60 bg-white/[0.04] px-2.5 py-1 border border-white/[0.06]"
                  >
                    {proto}
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
