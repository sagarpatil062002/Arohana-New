"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FounderSection() {
  return (
    <section
      className="relative w-full py-28 sm:py-36 md:py-44 bg-[#070B14] text-white border-t border-white/[0.08] overflow-hidden"
      aria-label="Founder Perspective & Operational Leadership"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Authentic Editorial Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/5] border border-white/[0.12] bg-[#0c121e] overflow-hidden group shadow-2xl">
            {/* Corner Precision Marks */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/40 z-20 pointer-events-none" />
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/40 z-20 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/40 z-20 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/40 z-20 pointer-events-none" />

            <Image
              src="/images/about/madhura-portrait.jpg"
              alt="Madhura Hawal — Founder & Principal Consultant, Ārohana Consultancy"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              style={{ objectFit: "cover" }}
              className="filter contrast-[1.04] brightness-95 transition-transform duration-1000 group-hover:scale-102"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent z-10 pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col space-y-1">
              <span className="font-mono text-[9px] tracking-[0.24em] text-[#C5A46D] uppercase">
                FOUNDER &amp; PRINCIPAL CONSULTANT
              </span>
              <h3 className="font-clash text-xl font-medium tracking-tight text-white uppercase">
                MADHURA HAWAL
              </h3>
              <p className="font-mono text-[10px] text-white/60 tracking-wider">
                COMMERCIAL STRATEGY · HOSPITALITY OPERATIONS · SPECIAL PROJECTS
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            <span>OPERATIONAL PEDIGREE</span>
            <span>MUMBAI · GOA · LADAKH</span>
          </div>
        </div>

        {/* Right: Personal Narrative & Credibility */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-[#C5A46D] uppercase">
              PRINCIPAL ADVISORY // GROUND TRUTH
            </span>
          </div>

          <h2 className="font-clash text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-[-0.02em] text-white">
            “The road to Ārohana was built inside businesses — learning what makes them struggle, and what you see only when you are accountable for the whole thing.”
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-white/70 font-light leading-relaxed">
            <p>
              Having trained inside luxury five-star operations with the Taj Management Training Programme, founded and operated Mother India Cafe from scratch, directed craft brewery distribution in Goa, and managed high-altitude field logistics for the Indian Army in Ladakh, Madhura brings uncommon ground reality to executive consulting.
            </p>
            <p>
              We reject the agency echo chamber where vanity awards are celebrated while business owners grapple with unit economics, kitchen variance, and fragmented digital acquisition.
            </p>
          </div>

          {/* Core Founder Domain Tags */}
          <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#C5A46D] uppercase block">
                01 TAJ MANAGEMENT
              </span>
              <span className="text-xs text-white/60 font-mono">1 of 16 Nationwide</span>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#C5A46D] uppercase block">
                02 CAFE OPERATOR
              </span>
              <span className="text-xs text-white/60 font-mono">P&amp;L &amp; Pass SOPs</span>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#C5A46D] uppercase block">
                03 LADAKH EXPEDITIONS
              </span>
              <span className="text-xs text-white/60 font-mono">14,000+ FT Defence Ops</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-white uppercase border-b border-[#C5A46D] pb-1 hover:text-[#C5A46D] transition-colors"
            >
              <span>Read the full leadership background</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
