import React from "react";
import Link from "next/link";
import Image from "next/image";
import { armyProjectsData, armyStats } from "@/data/armyProjects";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indian Army Projects",
  description:
    "Communication and content for the Indian Army across units, events and operations. Clarity. Respect. Responsibility."
};

export default function ArmyProjectsPage() {
  const figmaArmyCards = [
    {
      title: "WESTERN COMMAND",
      subtitle: "Official Projects",
      image: "/images/army/western-command-1.jpg",
      description: "Comprehensive historical, commemorative and operational communication assets."
    },
    {
      title: "14 CORPS",
      subtitle: "Official Projects",
      image: "/images/army/14corps-2.jpg",
      description: "High-altitude logistical and strategic documentation across Northern frontiers."
    },
    {
      title: "FIRE & FURY",
      subtitle: "A Documentary Film",
      image: "/images/army/army-hero.jpg",
      description: "Official archival documentary film chronicling high-altitude warfare readiness."
    }
  ];

  return (
    <div className="w-full bg-[#0D1524] text-white">
      {/* ==================== HERO (Figma Screen 07) ==================== */}
      <section className="pt-36 pb-20 border-b border-white/10 bg-gradient-to-b from-[#080E18] to-[#0D1524]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#C5A46D] font-bold">07</span>
              <span className="font-mono text-xs tracking-[0.2em] text-[#8A919D] uppercase">
                ARMY PROJECTS
              </span>
            </div>
            <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] font-bold uppercase leading-[1.02] tracking-tight text-white">
              BUILT FOR MISSIONS THAT MATTER.
            </h1>
            <p className="text-base sm:text-xl text-[#8A919D] font-normal leading-relaxed pt-2 max-w-2xl">
              Communication and content for the Indian Army across units, events and operations. Clarity. Respect. Responsibility.
            </p>
          </div>

          {/* 3 Featured Cards matching Figma Screen 07 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            {figmaArmyCards.map((card, i) => (
              <div
                key={i}
                className="group flex flex-col bg-[#101622] border border-white/10 hover:border-[#C5A46D]/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-black">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101622] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-1">
                    <h3 className="font-clash text-xl font-bold uppercase tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="font-mono text-xs text-[#C5A46D]">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-16 border-t border-white/10 mt-16">
            {armyStats.map((st) => (
              <div
                key={st.label}
                className="p-6 rounded-sm bg-[#101622] border border-white/10 space-y-1"
              >
                <span className="font-clash text-3xl font-bold text-white block">
                  {st.value}
                </span>
                <span className="font-mono text-[10px] text-[#8A919D] uppercase tracking-wider block">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS ARCHIVE ==================== */}
      <section className="py-24 bg-[#0A0F14] border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="eyebrow-label">OPERATIONAL ENGAGEMENTS</span>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              VERIFIED MILITARY SECTOR ARCHIVES
            </h2>
          </div>

          {armyProjectsData.map((proj) => (
            <div
              key={proj.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 sm:p-12 rounded-sm bg-[#101622] border border-white/10 hover:border-[#C5A46D]/40 transition-colors"
            >
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#C5A46D]">
                      [ {proj.index} ]
                    </span>
                    <span className="font-mono text-xs text-[#8A919D] uppercase tracking-widest">
                      {proj.command}
                    </span>
                  </div>
                  <h2 className="font-clash text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                    {proj.title}
                  </h2>
                  <p className="text-xs font-mono text-[#8A919D]">
                    Theatre: {proj.theatre} · Elevation: {proj.elevation}
                  </p>
                  <p className="text-sm text-[#8A919D] leading-relaxed pt-2">
                    {proj.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="block font-mono text-[10px] text-[#8A919D] uppercase tracking-widest">
                    OPERATIONAL PROTOCOLS OBSERVED
                  </span>
                  <div className="space-y-1.5 text-xs text-white/80">
                    {proj.protocols.map((proto) => (
                      <div key={proto} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A46D] flex-shrink-0" />
                        <span>{proto}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-black border border-white/10">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 text-center bg-[#080E18]">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 space-y-6">
          <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            INSTITUTIONAL ENGAGEMENTS
          </h2>
          <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
            For military historical archiving, documentary commissions, and commemorative visual direction.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-solid group"
            >
              <span>INITIATE FORMAL INQUIRY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

