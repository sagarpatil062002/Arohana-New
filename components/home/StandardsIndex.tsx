"use client";

import React, { useState } from "react";

interface StandardItem {
  num: string;
  category: string;
  title: string;
  description: string;
  detail: string;
}

const STANDARDS: StandardItem[] = [
  {
    num: "01",
    category: "COMMERCIAL STRATEGY",
    title: "Thinking Beyond Posts",
    description: "We do not view marketing as a calendar of social posts. Every communication initiative is tied to positioning, commercial clarity and real business outcomes.",
    detail: "Brand assets and social presence must serve bottom-line economics, not arbitrary vanity engagement."
  },
  {
    num: "02",
    category: "SECTOR RIGOR",
    title: "Sector Depth Over Templates",
    description: "We immerse ourselves directly in unit economics, culinary pass timing, foundry metallurgical specs, and high-altitude field logistics.",
    detail: "Generic agency playbook templates do not translate across specialized enterprise domains."
  },
  {
    num: "03",
    category: "GROUND TRUTH",
    title: "Owning Ground Execution",
    description: "From setting up pass SOPs in cafe kitchens to directing sub-zero military documentary filming in Ladakh, we execute directly on the ground.",
    detail: "We stay through the messy realities of rollout until systems run repeatably."
  },
  {
    num: "04",
    category: "ALIGNMENT",
    title: "Complex & Long-Term Partnerships",
    description: "We partner with ambitious enterprises navigating multi-year strategic repositioning, expansion across geographies, or structural generational pivots.",
    detail: "Retainer-led depth where our team acts as an embedded strategic partner."
  },
  {
    num: "05",
    category: "CREDIBILITY",
    title: "Real, Hard-to-Replicate Proof",
    description: "Documenting Indian Army history, deploying mobile cinema networks across the Himalayas, and engineering dining concepts with verified profitability.",
    detail: "We lead with tangible proof rather than fabricated claims or self-awarded trophies."
  },
  {
    num: "06",
    category: "GOVERNANCE",
    title: "Direct Decision-Maker Access",
    description: "You work directly with principal leaders who make decisions and take responsibility. No junior account managers or outsourced agency layers.",
    detail: "Direct founder-to-founder advisory with complete transparency and velocity."
  }
];

export default function StandardsIndex() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStandard = STANDARDS[activeIdx];

  return (
    <section
      className="relative w-full py-28 sm:py-36 bg-[#04060c] text-white border-t border-white/[0.08] overflow-hidden select-none"
      aria-label="Ārohana Principles & Standards"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#C5A46D] font-semibold">[ THE STANDARD ]</span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-white/40 uppercase">
                ENGAGEMENT PRINCIPLES
              </span>
            </div>
            <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight uppercase leading-[1.05] text-white">
              WHAT WE BRING TO <br />
              <span className="text-white/40">EVERY ENGAGEMENT.</span>
            </h2>
          </div>

          <span className="font-mono text-xs text-white/40 max-w-sm hidden sm:block">
            The standard operating code governing every client relationship, design decision, and operational deployment.
          </span>
        </div>

        {/* Interactive Index Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Index (01 — 06) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
            {STANDARDS.map((std, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={std.num}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`py-5 px-3 flex items-center justify-between text-left transition-all duration-300 w-full group ${
                    isSelected ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                  }`}
                  aria-label={`Select principle ${std.num}: ${std.title}`}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-wider transition-colors ${
                        isSelected ? "text-[#C5A46D] font-semibold" : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {std.num}
                    </span>
                    <span
                      className={`font-clash text-lg sm:text-xl font-normal tracking-tight transition-all ${
                        isSelected ? "text-white translate-x-1" : "text-white/60 group-hover:text-white"
                      }`}
                    >
                      {std.title}
                    </span>
                  </div>

                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isSelected ? "bg-[#C5A46D] scale-125" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Display Area: Dominant Principle Title & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 border border-white/[0.1] bg-[#070B14]/80 backdrop-blur-sm min-h-[380px] sm:min-h-[440px] shadow-2xl relative">
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                <span className="font-mono text-[10px] tracking-[0.24em] text-[#C5A46D] uppercase">
                  PRINCIPLE // {activeStandard.num} · {activeStandard.category}
                </span>
                <span className="font-mono text-xs text-white/40">
                  {activeStandard.num} / 06
                </span>
              </div>

              <h3 className="font-clash text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-tight text-white leading-tight">
                {activeStandard.title}
              </h3>

              <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mt-6">
                {activeStandard.description}
              </p>
            </div>

            {/* Bottom Nuance */}
            <div className="pt-6 border-t border-white/[0.08] mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="font-mono text-xs text-white/50 italic">
                “{activeStandard.detail}”
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#C5A46D] uppercase shrink-0">
                VERIFIED STANDARD
              </span>
            </div>

            {/* Progress Hairline at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.08]">
              <div
                className="h-full bg-[#C5A46D] transition-all duration-500"
                style={{ width: `${((activeIdx + 1) / STANDARDS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
