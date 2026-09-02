"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AROHANA_MASTER_CONTENT, CaseStudy } from "@/data/content";

interface ResultsSectionProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export default function ResultsSection({ onSelectCaseStudy }: ResultsSectionProps) {
  const { caseStudies, brandStrip } = AROHANA_MASTER_CONTENT;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<CaseStudy | null>(null);

  const filteredProjects = activeTab === "all"
    ? caseStudies
    : caseStudies.filter(c => c.sectorId === activeTab);

  return (
    <section id="work" className="bg-white text-black py-24 md:py-36 px-6 md:px-12 border-b border-black/10">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-10 md:mb-16">
          <div className="section-indicator-line text-black/80">
            <span>03. SELECTED WORK</span>
          </div>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-20">
          <div className="lg:col-span-8">
            <h2 className="font-display font-display-section text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] text-black">
              A FEW BUSINESSES WE'VE HELPED SHAPE, COMMUNICATE OR BUILD.
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-[16px] md:text-[18px] text-black/75 leading-relaxed font-sans mb-8">
              The work is the proof. A selection of businesses and projects across very different operating environments.
            </p>
            <div>
              <Link
                href="/work"
                className="sundown-pill-btn sundown-pill-btn-white"
              >
                <span>View all work & directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 pb-4 border-b border-black/10">
          {[
            { id: "all", label: "ALL WORK" },
            { id: "realestate", label: "REAL ESTATE & BUILT" },
            { id: "hospitality", label: "HOSPITALITY & F&B" },
            { id: "lifestyle", label: "LIFESTYLE & COMMUNITY" },
            { id: "healthcare", label: "HEALTHCARE" },
            { id: "entertainment", label: "ENTERTAINMENT & MEDIA" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-mono tracking-[0.15em] uppercase px-4 py-2 transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white font-medium"
                  : "bg-transparent text-black/60 hover:text-black hover:bg-black/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Visual Case Study Cards (Showing the Work, Not Just Logos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectCaseStudy(project)}
              role="button"
              tabIndex={0}
              className="group cursor-pointer flex flex-col bg-neutral-100 border border-neutral-200 overflow-hidden hover:border-black transition-all duration-300"
            >
              {/* Card Image Wrap with Editorial Grayscale */}
              <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover img-editorial"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#FE320A] text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5 stroke-[2]" />
                  </div>
                </div>

                {/* Sector Badge */}
                <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-sm text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1">
                  {project.sector}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow bg-white">
                <div>
                  <div className="text-[11px] font-mono text-black/50 tracking-wider uppercase mb-1">
                    {project.client}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-black uppercase tracking-tight mb-2 group-hover:text-[#FE320A] transition-colors leading-snug">
                    {project.headline}
                  </h3>
                  <p className="text-xs text-black/70 font-sans line-clamp-3 leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-black/60">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-black uppercase">
                    <span className="font-semibold text-[#FE320A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      VIEW CASE STUDY <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-black/40">{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 5 — WHERE OUR EXPERIENCE SITS (Restrained Text-Led Sector Band) */}
        <div className="pt-16 border-t border-black/15">
          <div className="text-xs font-mono text-black/50 tracking-[0.2em] uppercase mb-6">
            04. PRIMARY COMMERCIAL SECTORS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-black">
            {[
              { name: "Hospitality & F&B", desc: "Concept, kitchen SOPs & digital" },
              { name: "Real Estate & Built", desc: "Positioning & buyer journeys" },
              { name: "Healthcare", desc: "Trust-led patient education" },
              { name: "Lifestyle & Consumer", desc: "Premium brand storytelling" },
              { name: "Entertainment & Media", desc: "Cinema & festival media" },
              { name: "Travel & Tourism", desc: "Experiential destination journeys" }
            ].map((s, idx) => (
              <div key={idx} className="p-4 bg-neutral-50 border-l-2 border-black">
                <h4 className="font-display text-lg uppercase tracking-wide mb-1">{s.name}</h4>
                <p className="text-[11px] font-mono text-black/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6 — SELECTED BRANDS & ORGANISATIONS (Clean Unified Logo / Brand Strip) */}
        <div className="pt-16 mt-16 border-t border-black/10">
          <div className="text-xs font-mono text-black/50 tracking-[0.2em] uppercase text-center mb-8">
            BRANDS AND ORGANISATIONS WE'VE WORKED WITH
          </div>
          <div className="marquee-track flex items-center gap-12 text-lg md:text-xl font-display uppercase tracking-wider text-black/70">
            {brandStrip.concat(brandStrip).map((b, idx) => (
              <span key={idx} className="flex items-center gap-6 hover:text-black transition-colors">
                <span>{b}</span>
                <span className="text-xs text-[#FE320A]">✦</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
