"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { AROHANA_MASTER_CONTENT, CaseStudy } from "@/data/content";
import CaseStudyModal from "@/components/CaseStudyModal";

export default function WorkClient() {
  const { caseStudies, clientDirectory, brandStrip } = AROHANA_MASTER_CONTENT;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filteredProjects = activeTab === "all"
    ? caseStudies
    : caseStudies.filter(c => c.sectorId === activeTab);

  return (
    <div className="bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-12">
          <div className="section-indicator-line text-white/70">
            <span>PORTFOLIO // SELECTED WORK</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="max-w-4xl mb-16">
          <h1 className="font-display font-display-hero text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white mb-8">
            THE WORK IS<br />
            THE PROOF.
          </h1>
          <p className="text-lg md:text-xl text-[#BDBDBD] leading-relaxed font-sans">
            A selection of businesses and projects that show how Ārohana thinks, creates and executes across very different environments.
          </p>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-16 pb-4 border-b border-white/10">
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
                  ? "bg-[#FE320A] text-white font-medium"
                  : "bg-transparent text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Featured Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-[#141414] border border-[#222222] overflow-hidden hover:border-[#FE320A] transition-colors"
            >
              {/* Image with Grayscale & Zoom */}
              <div
                onClick={() => setSelectedCaseStudy(project)}
                className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover img-editorial"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#FE320A] text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5 stroke-[2]" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1">
                  {project.sector}
                </div>
              </div>

              {/* Meta */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow bg-[#111116]">
                <div>
                  <div className="text-[11px] font-mono text-[#FE320A] tracking-wider uppercase mb-1">
                    {project.client}
                  </div>
                  <h3
                    onClick={() => setSelectedCaseStudy(project)}
                    className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide mb-2 group-hover:text-[#FE320A] transition-colors cursor-pointer"
                  >
                    {project.headline}
                  </h3>
                  <p className="text-xs text-text-secondary font-sans line-clamp-3 leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-text-muted uppercase">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedCaseStudy(project)}
                        className="text-white font-semibold hover:text-[#FE320A] transition-colors inline-flex items-center gap-1"
                      >
                        QUICK VIEW <BookOpen className="w-3.5 h-3.5" />
                      </button>
                      <span>•</span>
                      <Link
                        href={`/work/${project.id}`}
                        className="text-[#FE320A] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        FULL PAGE <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CLIENT & PROJECT DIRECTORY (Smaller Project Cards) */}
        <div className="bg-[#111116] border border-white/10 p-8 md:p-14 rounded-sm mb-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono text-text-muted tracking-[0.2em] uppercase block mb-2">
              EXTENDED DIRECTORY
            </span>
            <h2 className="font-display text-3xl sm:text-5xl uppercase text-white tracking-tight">
              ADDITIONAL CLIENT ENGAGEMENTS & COMMISSIONS.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientDirectory.map((item, idx) => (
              <div key={idx} className="p-6 bg-white/[0.02] border border-white/10 hover:border-white/30 transition-colors">
                <span className="text-[10px] font-mono text-[#FE320A] uppercase tracking-widest block mb-1">
                  {item.sector}
                </span>
                <h3 className="font-display text-2xl text-white uppercase mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-text-secondary font-sans leading-relaxed">
                  {item.scope}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BRAND LOGO STRIP */}
        <div className="mb-24 pt-12 border-t border-white/10">
          <div className="text-xs font-mono text-text-muted tracking-[0.2em] uppercase text-center mb-8">
            BRANDS AND ORGANISATIONS WE'VE WORKED WITH
          </div>
          <div className="marquee-track flex items-center gap-12 text-lg md:text-xl font-display uppercase tracking-wider text-white/50">
            {brandStrip.concat(brandStrip).map((b, idx) => (
              <span key={idx} className="flex items-center gap-6 hover:text-white transition-colors">
                <span>{b}</span>
                <span className="text-xs text-[#FE320A]">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 md:p-14 bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/15 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="font-display text-3xl md:text-4xl uppercase text-white mb-2">
              WANT TO SEE WHAT THIS COULD LOOK LIKE FOR YOUR BUSINESS?
            </h3>
            <p className="text-sm text-text-secondary font-sans max-w-xl">
              Let's discuss what you are looking to build, fix or expand.
            </p>
          </div>
          <Link
            href="/contact"
            className="sundown-pill-btn bg-[#FE320A] border-[#FE320A] text-white"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
}
