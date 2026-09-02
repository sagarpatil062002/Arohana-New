"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Shield } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export default function SpecialProjectsAndTourin() {
  const { specialProjects, tourin } = AROHANA_MASTER_CONTENT;

  return (
    <>
      {/* SECTION 7 — THE WORK THAT DOESN'T FIT A STANDARD AGENCY BOX (BLACK SECTION) */}
      <section className="bg-[#050505] text-white py-24 md:py-36 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
        
        {/* Background Subtle Orange Ambient Glow */}
        <div className="sundown-glow-shape-secondary top-[10%] right-[-10%]" />

        <div className="relative z-10 max-w-[1440px] mx-auto">
          
          <div className="mb-10 md:mb-16">
            <div className="section-indicator-line text-white/70">
              <span>05. SPECIAL PROJECT EXPERIENCE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16">
            <div className="lg:col-span-8">
              <h2 className="font-display font-display-section text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px] text-white leading-none">
                {specialProjects.title.toUpperCase()}
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-[16px] md:text-[18px] text-[#BDBDBD] leading-relaxed font-sans mb-8">
                {specialProjects.copy}
              </p>
              <div>
                <Link
                  href="/indian-army-projects"
                  className="sundown-pill-btn"
                >
                  <span>{specialProjects.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 3-Image Visual Strip (SHE, Operation Sampark, Armed Forces) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialProjects.images.map((item, idx) => (
              <div key={idx} className="group flex flex-col bg-[#111116] border border-white/10 rounded-sm overflow-hidden">
                <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.label}
                    fill
                    className="object-cover img-editorial"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1">
                    HIGH-ALTITUDE // 0{idx + 1}
                  </div>
                </div>
                <div className="p-6 bg-[#0E0E12]">
                  <h3 className="font-display text-2xl text-white uppercase mb-2 group-hover:text-[#FE320A] transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-xs text-text-secondary font-sans leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8 — TOURIN (WHITE CONTRAST SECTION) */}
      <section className="bg-white text-black py-24 md:py-36 px-6 md:px-12 border-b border-black/10">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="mb-10 md:mb-16">
            <div className="section-indicator-line text-black/80">
              <span>06. OWNED BRAND PROPOSITION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-mono text-[#FE320A] tracking-[0.2em] uppercase block mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4" /> EXPERIENTIAL TRAVEL BRAND
              </span>
              <h2 className="font-display font-display-section text-[44px] sm:text-[64px] md:text-[80px] lg:text-[92px] text-black leading-none mb-6">
                AND THEN THERE IS TOURIN.
              </h2>
              <p className="text-lg md:text-xl text-black/80 leading-relaxed font-sans max-w-xl mb-6">
                An experiential travel brand beginning with Ladakh — built from lived experience rather than a generic destination catalogue.
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-100 border border-neutral-200 text-xs font-mono text-black font-semibold mb-8">
                <span>PROOF:</span>
                <span>{tourin.proof}</span>
              </div>
              <div>
                <Link
                  href="/tourin"
                  className="sundown-pill-btn sundown-pill-btn-white"
                >
                  <span>Explore Tourin Ladakh</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border border-neutral-300 rounded-sm shadow-xl">
                <Image
                  src="/assets/tourin_ladakh.jpg"
                  alt="Tourin Ladakh Experiential Journeys"
                  fill
                  className="object-cover img-editorial"
                />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 text-xs font-mono text-white">
                  LADAKH // BEYOND THE ITINERARY
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
