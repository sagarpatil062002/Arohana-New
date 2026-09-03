import React from "react";
import Link from "next/link";
import Image from "next/image";
import { tourinConfig } from "@/data/tourin";
import { ArrowRight, Mountain, Compass, Users2, Sun } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tourin | Travel Beyond The Itinerary",
  description:
    "The Ladakh people experience and the Ladakh most itineraries sell are not always the same. Ladakh is the beginning, not the boundary."
};

export default function TourinPage() {
  return (
    <div className="w-full bg-[#0D1524] text-white">
      {/* ==================== HERO (Figma Screen 08) ==================== */}
      <section className="relative min-h-[92vh] flex items-center pt-36 pb-20 overflow-hidden bg-[#080E18]">
        {/* Background Motorcycle Highway Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/tourin-ladakh-motorcycle.png"
            alt="Motorcyclist in Ladakh"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-65"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E18] via-[#080E18]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080E18] via-transparent to-transparent" />
        </div>

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#C5A46D] font-bold">08</span>
              <span className="font-mono text-xs tracking-[0.2em] text-[#8A919D] uppercase">
                TOURIN
              </span>
            </div>
            <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] font-bold uppercase leading-[1.02] tracking-tight text-white">
              <span className="block">TRAVEL BEYOND</span>
              <span className="block">THE ITINERARY.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#8A919D] font-normal leading-relaxed pt-2">
              The Ladakh people experience and the Ladakh most itineraries sell are not always the same. Ladakh is the beginning, not the boundary.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#curation-pillars"
                className="btn-solid group"
              >
                <span>EXPLORE EXPERIENCES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="btn-primary group"
              >
                <span>TALK TO US</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A46D] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Stats Bar matching Figma Screen 08 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-16 border-t border-white/10 mt-16">
            <div className="p-6 rounded-sm bg-[#101622]/80 backdrop-blur-sm border border-white/10 space-y-1">
              <span className="font-clash text-3xl font-bold text-white block">
                15+
              </span>
              <span className="font-mono text-[10px] text-[#8A919D] uppercase tracking-wider block">
                SEPARATE BOOKINGS COMPLETED
              </span>
            </div>
            <div className="p-6 rounded-sm bg-[#101622]/80 backdrop-blur-sm border border-white/10 space-y-1">
              <span className="font-clash text-3xl font-bold text-[#C5A46D] block">
                20-BIKER GROUP
              </span>
              <span className="font-mono text-[10px] text-[#8A919D] uppercase tracking-wider block">
                LADAKH EXPEDITION
              </span>
            </div>
            <div className="p-6 rounded-sm bg-[#101622]/80 backdrop-blur-sm border border-white/10 space-y-1">
              <span className="font-clash text-3xl font-bold text-white block">
                14,000 FT
              </span>
              <span className="font-mono text-[10px] text-[#8A919D] uppercase tracking-wider block">
                PEAK ELEVATION
              </span>
            </div>
            <div className="p-6 rounded-sm bg-[#101622]/80 backdrop-blur-sm border border-white/10 space-y-1">
              <span className="font-clash text-3xl font-bold text-white block">
                100%
              </span>
              <span className="font-mono text-[10px] text-[#8A919D] uppercase tracking-wider block">
                LOCAL GROUND GUIDES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3 CORE PILLARS ==================== */}
      <section id="curation-pillars" className="py-24 border-b border-white/10 bg-[#0A0F14]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="eyebrow-label">CURATION PILLARS</span>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              HOW TOURIN JOURNEYS ARE CRAFTED
            </h2>
            <p className="text-sm text-[#8A919D]">
              Zero standardized travel packages. Every expedition is individually paced and culturally anchored.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tourinConfig.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="p-6 rounded-sm bg-[#101622] border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#C5A46D]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-black border border-white/10">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-clash text-xl font-bold uppercase text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#8A919D] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== VISUAL ARCHIVE ==================== */}
      <section className="py-24 border-b border-white/10 bg-[#080E18]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="eyebrow-label">FIELD GALLERY</span>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              HIMALAYAN FRONTIERS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {tourinConfig.gallery.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-sm overflow-hidden bg-[#101622] border border-white/10 space-y-3 p-4 hover:border-[#C5A46D]/40 transition-colors"
              >
                <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-black">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs font-mono text-[#8A919D] pt-1">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 text-center bg-[#0A0F14]">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 space-y-6">
          <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            PLAN A BESPOKE EXPEDITION
          </h2>
          <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
            Inquire for upcoming motorcycle rallies, private family retreats, or high-altitude photography journeys.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-solid group"
            >
              <span>INQUIRE WITH TOURIN CONCIERGE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

