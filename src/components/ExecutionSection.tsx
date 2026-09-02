"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export default function ExecutionSection() {
  const { threeWaysWeWork } = AROHANA_MASTER_CONTENT;
  const [activeHover, setActiveHover] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  return (
    <section id="services" className="bg-[#050505] text-white py-24 md:py-36 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="sundown-glow-shape-secondary top-[20%] left-[-15%]" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-10 md:mb-16">
          <div className="section-indicator-line text-white/70">
            <span>02. THREE WAYS WE WORK</span>
          </div>
        </div>

        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <h2 className="font-display font-display-section text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] text-white">
              WHAT WE DO DEPENDS ON WHAT THE BUSINESS ACTUALLY NEEDS.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-[16px] md:text-[18px] text-[#BDBDBD] leading-relaxed font-sans mb-8">
              Ārohana can come in as an ongoing digital partner, a hospitality consultant, a content/production partner or a combination of these.
            </p>
            <div>
              <Link
                href="/services"
                className="sundown-pill-btn"
              >
                <span>Explore all services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Interactive Pillars Grid with Image Cards (Figma + Sundown Hybrid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {threeWaysWeWork.map((pillar, idx) => (
            <div
              key={pillar.id}
              onMouseEnter={() => setActiveHover(idx)}
              className="group relative bg-[#111116] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#FE320A] transition-all duration-300"
            >
              {/* Thumbnail Media */}
              <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover img-editorial"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[11px] font-mono tracking-widest uppercase px-3 py-1 border border-white/10">
                  {pillar.number} // PILLAR
                </div>
              </div>

              {/* Body Content */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mb-4 group-hover:text-[#FE320A] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#BDBDBD] font-sans leading-relaxed mb-6">
                    {pillar.shortDesc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white uppercase">
                  <span>VIEW CAPABILITIES</span>
                  <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#FE320A] group-hover:bg-[#FE320A] flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
