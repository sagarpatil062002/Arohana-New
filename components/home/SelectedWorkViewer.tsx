"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";

export default function SelectedWorkViewer() {
  const [activeWorkIdx, setActiveWorkIdx] = useState(0);
  const currentWork = featuredProjects[activeWorkIdx];

  return (
    <section
      className="relative w-full py-28 sm:py-36 md:py-44 bg-[#050811] text-white border-t border-white/[0.08] overflow-hidden select-none"
      aria-label="Selected Client Work & Case Studies"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#C5A46D] font-semibold">[ 06 CASE STUDIES ]</span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-white/40 uppercase">
                SELECTED ENTERPRISE COMMISSIONS
              </span>
            </div>
            <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight uppercase leading-[1.05] text-white">
              A FEW BUSINESSES <br />
              <span className="text-white/40">WE&apos;VE HELPED BUILD.</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-[#C5A46D] uppercase border-b border-[#C5A46D]/60 pb-1 hover:border-[#C5A46D] transition-colors w-fit"
          >
            <span>View complete archive (06)</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Cinematic Case Study Viewer */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] border border-white/[0.12] bg-[#070b16] overflow-hidden group shadow-2xl flex flex-col justify-between p-6 sm:p-10 md:p-14">
          {/* Background Project Photography Stack */}
          {featuredProjects.map((p, idx) => {
            const isCurrent = idx === activeWorkIdx;
            return (
              <div
                key={p.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                  isCurrent ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  className="filter contrast-105 brightness-65"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/40 to-black/30" />
              </div>
            );
          })}

          {/* Top Metadata Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/[0.12] pb-4">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D] animate-ping" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.24em] text-[#C5A46D] uppercase font-semibold">
                CASE STUDY // {currentWork.index} OF 06
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase">
              {currentWork.location}
            </span>
          </div>

          {/* Center / Bottom Dominant Case Study Content */}
          <div className="relative z-10 my-auto py-6 space-y-3 max-w-3xl">
            <span className="font-mono text-[11px] tracking-[0.22em] text-white/70 uppercase block">
              {currentWork.category}
            </span>
            <h3 className="font-clash text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white leading-tight">
              {currentWork.title}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed max-w-2xl pt-2">
              {currentWork.description}
            </p>

            <div className="pt-4">
              <Link
                href={`/work/${currentWork.slug}`}
                className="group inline-flex items-center gap-3 px-6 py-3 border border-[#C5A46D] bg-[#050811]/80 hover:bg-[#C5A46D] text-white hover:text-black font-mono text-xs tracking-[0.16em] uppercase transition-all duration-300"
              >
                <span>Read complete case study</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Bottom Project Navigator (01 to 06 Tabs) */}
          <div className="relative z-10 pt-4 border-t border-white/[0.12] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 max-w-full">
              {featuredProjects.map((proj, idx) => {
                const isSelected = idx === activeWorkIdx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveWorkIdx(idx)}
                    className={`px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase border transition-all duration-300 flex items-center gap-2 ${
                      isSelected
                        ? "border-[#C5A46D] bg-[#C5A46D]/20 text-white font-semibold"
                        : "border-white/[0.1] bg-black/40 text-white/50 hover:text-white hover:border-white/30"
                    }`}
                    aria-label={`Select project ${proj.title}`}
                  >
                    <span>0{idx + 1}</span>
                    <span className="hidden sm:inline-block">{proj.title}</span>
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase hidden lg:inline-block">
              DOMINANT VISUAL WORK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
