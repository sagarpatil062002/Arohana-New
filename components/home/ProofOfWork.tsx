"use client";

import React from "react";
import Image from "next/image";

const PROOFS = [
  {
    num: "01",
    stat: "100%",
    title: "FOUNDER & EXECUTIVE ENGAGEMENT",
    headline: "Direct strategic partnership with zero outsourced agency bureaucracy.",
    description: "Every brief is directed by principal leadership with real operational P&L accountability, ensuring that high-level strategy never dissolves in execution.",
    tag: "GOVERNANCE",
    image: "/images/case-studies/loom/prefab-1.jpg"
  },
  {
    num: "02",
    stat: "06",
    title: "CORE INDUSTRY VERTICALS",
    headline: "Hospitality · Real Estate · Healthcare · Luxury · Defence · Travel.",
    description: "Deep domain immersion across complex operating models. We don't apply consumer app marketing templates to high-stakes industrial or institutional briefs.",
    tag: "SECTOR DEPTH",
    image: "/images/case-studies/raysons/casting-3.jpg"
  },
  {
    num: "03",
    stat: "14K+",
    title: "FT OPERATIONAL ELEVATIONS",
    headline: "Zero-failure execution under severe Himalayan winter field conditions.",
    description: "From producing documentaries for 14 Corps in Leh to mobile digital cinema networks across Ladakh, we deliver where conventional agencies cannot mobilize.",
    tag: "FIELD RIGOR",
    image: "/images/army/14corps-2.jpg"
  },
  {
    num: "04",
    stat: "Turnkey",
    title: "CAPABILITY INTEGRATION",
    headline: "Commercial Strategy → Creative Direction → Floor Execution.",
    description: "From culinary menu engineering and pass SOPs to 4K cinematic origin films and full-funnel acquisition, we own the complete lifecycle.",
    tag: "EXECUTION",
    image: "/images/case-studies/misu/kitchen-1.jpg"
  }
];

export default function ProofOfWork() {
  return (
    <section
      className="relative w-full py-28 sm:py-36 md:py-40 bg-[#070B14] text-white border-t border-white/[0.08] overflow-hidden"
      aria-label="Ārohana Proof of Work"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#C5A46D] font-semibold">[ PROOF OF WORK ]</span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-white/40 uppercase">
                EMPIRICAL EXECUTION ACROSS SECTORS
              </span>
            </div>
            <h2 className="font-clash text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight uppercase leading-[1.05] text-white max-w-2xl">
              Real-world execution. <br />
              <span className="text-white/40">Not theoretical decks.</span>
            </h2>
          </div>

          <p className="font-mono text-xs sm:text-sm text-white/60 max-w-md leading-relaxed">
            The rare combination of business-side hospitality leadership, digital creative capability, and boots-on-the-ground delivery.
          </p>
        </div>

        {/* Editorial Proof Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROOFS.map((item) => (
            <div
              key={item.num}
              className="group relative p-8 sm:p-10 border border-white/[0.1] bg-[#0A0F1A]/70 hover:border-[#C5A46D]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Background Project Image Snippet with Subtle Parallax Zoom */}
              <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  style={{ objectFit: "cover" }}
                  className="filter grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0A0F1A]" />
              </div>

              {/* Card Top: Number & Tag */}
              <div className="flex items-baseline justify-between mb-8 relative z-10">
                <span className="font-mono text-xs tracking-[0.24em] text-[#C5A46D] uppercase">
                  {item.num} // {item.tag}
                </span>
                <span className="font-clash text-4xl sm:text-5xl font-light text-white/90 tabular-nums">
                  {item.stat}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-3">
                <span className="font-mono text-[10px] tracking-[0.22em] text-white/50 uppercase block">
                  {item.title}
                </span>
                <h3 className="font-clash text-xl sm:text-2xl font-medium tracking-tight text-white leading-snug">
                  {item.headline}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom Hairline */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase relative z-10">
                <span>VERIFIED ENGAGEMENT</span>
                <span className="group-hover:text-[#C5A46D] transition-colors">ĀROHANA STANDARD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
