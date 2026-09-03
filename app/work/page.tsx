"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { featuredProjects, clientEcosystem } from "@/data/projects";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "ALL" },
    { id: "hospitality", label: "HOSPITALITY" },
    { id: "real-estate", label: "REAL ESTATE" },
    { id: "healthcare", label: "HEALTHCARE" },
    { id: "lifestyle", label: "LIFESTYLE" },
    { id: "entertainment", label: "ENTERTAINMENT" },
    { id: "travel", label: "TRAVEL" },
    { id: "institutional", label: "INSTITUTIONAL" }
  ];

  const projectImages: Record<string, string> = {
    "raysons-group": "/assets/work-raysons.png",
    "loom-crafts": "/assets/work-loom.png",
    "picturetime": "/assets/work-picturetime.png",
    "project-she": "/assets/work-she.png",
    "misu": "/assets/work-misu.png",
    "rr-skins": "/assets/work-rrskins.png"
  };

  const filteredProjects =
    activeFilter === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => {
          if (activeFilter === "travel") return p.slug === "tourin-ladakh";
          if (activeFilter === "lifestyle") return p.sectorTag === "lifestyle" || p.slug === "loom-crafts";
          return p.sectorTag === activeFilter;
        });

  return (
    <div className="w-full bg-[#0D1524] text-white">
      {/* ==================== HERO (Figma Screen 05) ==================== */}
      <section className="pt-36 pb-16 border-b border-white/10 bg-gradient-to-b from-[#080E18] to-[#0D1524]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl space-y-4">
              <span className="font-mono text-xs text-[#C5A46D] font-semibold tracking-[0.2em] uppercase block">
                05 WORK
              </span>
              <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] font-bold uppercase leading-[1.02] tracking-tight text-white">
                THE WORK IS THE PROOF.
              </h1>
              <p className="text-base sm:text-lg text-[#8A919D] font-normal leading-relaxed pt-2 max-w-2xl">
                We work with business owners, operators, and institutional leads who care about commercial performance as much as creative distinction.
              </p>
            </div>

            {/* Slider Navigation Arrows matching Figma Screen 05 */}
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C5A46D] flex items-center justify-center text-white/70 hover:text-[#C5A46D] transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C5A46D] flex items-center justify-center text-white/70 hover:text-[#C5A46D] transition-colors"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills matching Figma Screen 05 */}
          <div className="flex flex-wrap gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.12em] transition-all border ${
                  activeFilter === cat.id
                    ? "bg-[#C5A46D] text-[#0A0F14] border-[#C5A46D] font-bold"
                    : "bg-[#101622] text-[#8A919D] border-white/10 hover:border-[#C5A46D]/40 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6 PROJECT CARDS GRID (Figma Screen 05) ==================== */}
      <section className="py-24 bg-[#0A0F14] border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => {
              const imageSrc = projectImages[proj.slug] || proj.thumbnail;
              return (
                <Link
                  key={proj.id}
                  href={`/work/${proj.slug}`}
                  className="group flex flex-col bg-[#101622] border border-white/10 hover:border-[#C5A46D]/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative w-full aspect-[16/11] overflow-hidden bg-black">
                    <Image
                      src={imageSrc}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101622] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-7 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                        {proj.index}
                      </span>
                      <h2 className="font-clash text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#C5A46D] transition-colors">
                        {proj.title}
                      </h2>
                      <p className="text-xs font-mono text-[#8A919D]">
                        {proj.category}
                      </p>
                    </div>

                    <p className="text-xs text-[#8A919D] leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8A919D] group-hover:text-white transition-colors">
                      <span>VIEW CASE STUDY</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CLIENT ECOSYSTEM ==================== */}
      <section className="py-24 bg-[#080E18] border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="eyebrow-label">SECTOR COVERAGE</span>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              ACROSS SECTORS. ACROSS STORIES.
            </h2>
            <p className="text-sm text-[#8A919D]">
              Direct engagements across industry, luxury, hospitality, healthcare, and defence institutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-white/10 border border-white/10">
            {clientEcosystem.map((client) => (
              <div
                key={client.name}
                className="p-5 bg-[#0D1524] hover:bg-[#142036] flex flex-col items-center justify-center text-center min-h-[100px] transition-colors group"
              >
                <span className="font-clash text-xs font-bold tracking-wider text-white/80 group-hover:text-[#C5A46D] uppercase">
                  {client.name}
                </span>
                <span className="text-[9px] font-mono text-[#8A919D] mt-1">
                  {client.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 text-center bg-[#0A0F14]">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 space-y-6">
          <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            HAVE A PROJECT TO BUILD?
          </h2>
          <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
            Let&apos;s evaluate your current commercial bottlenecks and structure a proven solution.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-solid group"
            >
              <span>START A CONVERSATION</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

