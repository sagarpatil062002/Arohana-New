import React from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What we do depends on what the business actually needs. Explore Ārohana's core practice areas: Digital Brand Growth, Hospitality Consulting, and Content & Brand Production."
};

export default function ServicesPage() {
  const figmaServices = [
    {
      id: "digital-brand-growth",
      index: "01",
      title: "DIGITAL BRAND GROWTH",
      slug: "digital-brand-growth",
      summary:
        "Strategy-led digital presence, performance and communication that build your brand and grow your business.",
      image: "/assets/service-digital-large.png"
    },
    {
      id: "hospitality-consulting",
      index: "02",
      title: "HOSPITALITY CONSULTING",
      slug: "hospitality-consulting",
      summary:
        "From concept to operations — we design, streamline and optimize hospitality businesses for consistent experience and profitability.",
      image: "/assets/service-hospitality-large.png"
    },
    {
      id: "content-brand-production",
      index: "03",
      title: "CONTENT & BRAND PRODUCTION",
      slug: "content-brand-production",
      summary:
        "Films, brand stories and visual content that communicate clearly and create impact.",
      image: "/assets/service-camera-large.png"
    }
  ];

  return (
    <div className="w-full bg-[#0D1524] text-white">
      {/* ==================== HERO (Figma Screen 04) ==================== */}
      <section className="relative pt-36 pb-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#080E18] to-[#0D1524]">
        {/* Subtle Watermark 01 in top right */}
        <div className="absolute top-16 right-10 select-none pointer-events-none text-white/[0.04] font-clash text-[12rem] lg:text-[16rem] font-bold leading-none">
          01
        </div>

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <span className="font-mono text-xs text-[#C5A46D] font-semibold tracking-[0.2em] uppercase block">
              04 SERVICES OVERVIEW
            </span>
            <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] font-bold uppercase leading-[1.02] tracking-tight text-white">
              WHAT WE DO DEPENDS ON WHAT THE BUSINESS ACTUALLY NEEDS.
            </h1>
            <p className="text-base sm:text-lg text-[#8A919D] font-normal leading-relaxed pt-2 max-w-2xl">
              Ārohana can come in as an ongoing digital partner, a hospitality consultant, a content production partner or a combination of these.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-solid group"
              >
                <span>EXPLORE ALL SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3 FIGMA SERVICE ROW CARDS (Screen 04) ==================== */}
      <section className="py-24 bg-[#0A0F14]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 space-y-8">
          {figmaServices.map((svc) => (
            <Link
              key={svc.id}
              href={`/services/${svc.slug}`}
              className="group block p-8 sm:p-12 rounded-sm bg-[#101622] border border-white/10 hover:border-[#C5A46D]/50 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Index, Title, Summary */}
                <div className="lg:col-span-6 space-y-4">
                  <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                    {svc.index}
                  </span>
                  <h2 className="font-clash text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white group-hover:text-[#C5A46D] transition-colors">
                    {svc.title}
                  </h2>
                  <p className="text-sm text-[#8A919D] leading-relaxed max-w-md">
                    {svc.summary}
                  </p>
                  <div className="pt-3 inline-flex items-center gap-2 font-mono text-xs text-white/80 group-hover:text-[#C5A46D] transition-colors">
                    <span>EXPLORE CAPABILITIES</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                {/* Right: Rich Visual from Figma */}
                <div className="lg:col-span-6">
                  <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden bg-black border border-white/10">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== CAPABILITIES MATRIX ==================== */}
      <section className="py-24 border-t border-white/10 bg-[#080E18]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="eyebrow-label">PRACTICE FRAMEWORK</span>
            <h3 className="font-clash text-2xl sm:text-4xl font-bold uppercase text-white">
              WE REJECT STANDARDIZED TEMPLATE PACKAGES.
            </h3>
            <p className="text-sm text-[#8A919D] leading-relaxed">
              Strategy is mapped directly from business metrics, menu analysis, production protocols, and on-ground deployment parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesData.map((svc) => (
              <div key={svc.id} className="p-7 rounded-sm bg-[#101622] border border-white/10 space-y-6">
                <div>
                  <span className="font-mono text-xs text-[#C5A46D] font-bold block mb-1">
                    [{svc.index}]
                  </span>
                  <h4 className="font-clash text-xl font-bold uppercase text-white">
                    {svc.title}
                  </h4>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono text-[10px] text-[#8A919D] uppercase tracking-widest">
                    CAPABILITIES
                  </span>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    {svc.capabilities.slice(0, 7).map((cap) => (
                      <li key={cap} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A46D] flex-shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#C5A46D] hover:text-white transition-colors"
                  >
                    <span>VIEW CAPABILITY DECK</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 border-t border-white/10 bg-[#0A0F14] text-center">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 space-y-6">
          <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            EXPLORE A CUSTOM SCOPE
          </h2>
          <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
            Need an assessment of your digital pipeline, hospitality margins, or production scope?
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
