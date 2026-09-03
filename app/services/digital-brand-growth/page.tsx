import React from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Brand Growth",
  description:
    "Strategy-led digital presence, content, campaigns and performance systems that build your brand and grow your business."
};

export default function DigitalBrandGrowthPage() {
  const service = servicesData.find((s) => s.slug === "digital-brand-growth")!;

  return (
    <div className="w-full bg-[#0D1524] text-white">
      {/* ==================== HERO ==================== */}
      <section className="pt-36 pb-20 border-b border-white/10 bg-gradient-to-b from-[#080E18] to-[#0D1524]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A919D] hover:text-[#C5A46D] mb-6 uppercase tracking-wider transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK TO ALL SERVICES</span>
          </Link>
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-[#C5A46D]">
                [ 01 ]
              </span>
              <span className="font-mono text-xs text-[#8A919D] uppercase tracking-widest">
                CORE PRACTICE AREA
              </span>
            </div>
            <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] font-bold uppercase leading-[1.02] tracking-tight text-white">
              {service.title}
            </h1>
            <p className="text-base sm:text-xl text-[#8A919D] font-normal leading-relaxed pt-2 max-w-2xl">
              {service.summary}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== STRATEGY OVERVIEW ==================== */}
      <section className="py-24 border-b border-white/10 bg-[#0A0F14]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow-label">COMMERCIAL PHILOSOPHY</span>
              <h2 className="font-clash text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                DIGITAL PRESENCE BUILT AROUND MARGIN REALITY.
              </h2>
              <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
                Most agencies treat digital presence as an aesthetic exercise disconnected from business operations. We build full-funnel digital growth architectures that begin with your unit economics and positioning moat.
              </p>
              <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
                From high-intent B2B inquiries for heavy engineering foundries to high-converting table bookings for luxury restaurants, every piece of content is engineered for measurable authority.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-white/15 bg-black">
                <Image
                  src="/assets/service-digital-large.png"
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FULL CAPABILITY MATRIX ==================== */}
      <section className="py-24 border-b border-white/10 bg-[#080E18]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-16 space-y-2">
            <span className="eyebrow-label">FULL CAPABILITY MATRIX</span>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              WHAT THIS COVERS
            </h2>
            <p className="text-sm text-[#8A919D]">
              End-to-end strategy, creative production, and revenue execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.capabilities.map((cap, idx) => (
              <div
                key={cap}
                className="p-5 rounded-sm bg-[#101622] border border-white/10 hover:border-[#C5A46D]/40 transition-colors space-y-2"
              >
                <span className="font-mono text-xs text-[#C5A46D] font-bold block">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
                <h3 className="font-clash text-sm font-bold uppercase text-white">
                  {cap}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DELIVERABLES & OUTCOMES ==================== */}
      <section className="py-24 border-b border-white/10 bg-[#0A0F14]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Deliverables */}
            <div className="p-8 rounded-sm bg-[#101622] border border-white/10 space-y-6">
              <span className="eyebrow-label">STRUCTURED DELIVERABLES</span>
              <h3 className="font-clash text-2xl font-bold uppercase text-white">
                WHAT YOU RECEIVE
              </h3>
              <ul className="space-y-3 text-sm text-[#8A919D]">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A46D] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div className="p-8 rounded-sm bg-[#101622] border border-white/10 space-y-6">
              <span className="eyebrow-label">MEASURABLE IMPACT</span>
              <h3 className="font-clash text-2xl font-bold uppercase text-white">
                BUSINESS IMPACT
              </h3>
              <ul className="space-y-3 text-sm text-[#8A919D]">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#C5A46D] font-mono font-bold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 text-center bg-[#080E18]">
        <div className="max-w-2xl mx-auto px-6 sm:px-10 space-y-6">
          <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            EXPLORE A DIGITAL PARTNERSHIP
          </h2>
          <p className="text-sm sm:text-base text-[#8A919D] leading-relaxed">
            Ready to replace vanity follower growth with commercial positioning?
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

