import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudiesRecord } from "@/data/caseStudies";
import { ArrowRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return Object.keys(caseStudiesRecord).map((slug) => ({
    slug
  }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const caseStudy = caseStudiesRecord[params.slug];
  if (!caseStudy) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.situation.description
  };
}

export default function CaseStudyPage({
  params
}: {
  params: { slug: string };
}) {
  const cs = caseStudiesRecord[params.slug];

  if (!cs) {
    notFound();
  }

  // Use gallery items or fallback images for the 4-card asset grid in the Ivory section
  const showcaseAssets = cs.gallery && cs.gallery.length >= 4
    ? cs.gallery.slice(0, 4)
    : [
        { src: cs.heroImage, caption: "Primary Brand Identity & System" },
        { src: cs.heroImage, caption: "Campaign & Communication Collateral" },
        { src: cs.heroImage, caption: "On-Ground Spatial Experience" },
        { src: cs.heroImage, caption: "Digital Experience & Architecture" }
      ];

  return (
    <div className="w-full bg-[#0D1524] text-white">
      {/* ==================== 1. TOP BAR & HERO (Figma Screen 06) ==================== */}
      <section className="pt-36 pb-20 border-b border-white/10 bg-gradient-to-b from-[#080E18] to-[#0D1524]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          {/* Top Bar matching Screen 06 */}
          <div className="flex items-center justify-between pb-10 mb-10 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#C5A46D] font-bold">06</span>
              <span className="font-mono text-xs tracking-[0.16em] text-[#8A919D] uppercase">
                CASE STUDY &mdash; {cs.title}
              </span>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A919D] hover:text-[#C5A46D] uppercase tracking-wider transition-colors"
            >
              <span>BACK TO WORK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2-Column Hero: Left Headline/Tagline, Right Architecture Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] font-bold uppercase leading-[0.98] tracking-tight text-white">
                  {cs.title}
                </h1>
                <span className="block font-mono text-sm text-[#C5A46D] tracking-wider uppercase pt-2">
                  {cs.category}
                </span>
              </div>
              <p className="text-lg sm:text-2xl text-[#8A919D] font-normal leading-relaxed max-w-xl">
                {cs.subtitle}
              </p>
              <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-[#8A919D]">
                <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-[#101622]">
                  {cs.location}
                </div>
                <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-[#101622]">
                  {cs.engagementModel}
                </div>
                <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-[#101622]">
                  {cs.duration}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-white/15 bg-black shadow-2xl">
                <Image
                  src={cs.heroImage}
                  alt={cs.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. THE SITUATION & THE WORK (IVORY CONTRAST SECTION - Figma Screen 06) ==================== */}
      <section className="py-28 bg-[#F5F2EC] text-[#121215] border-b border-[#121215]/10">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 space-y-16">
          {/* The Situation */}
          <div className="max-w-3xl space-y-4">
            <span className="block font-mono text-xs font-semibold text-[#5A616C] tracking-[0.2em] uppercase">
              THE SITUATION
            </span>
            <h2 className="font-clash text-2xl sm:text-4xl font-bold uppercase leading-tight text-[#121215]">
              {cs.situation.heading}
            </h2>
            <p className="text-base sm:text-lg text-[#555860] leading-relaxed">
              {cs.situation.description}
            </p>
          </div>

          {/* The Work 4-Asset Grid matching Figma Screen 06 */}
          <div className="pt-8 border-t border-[#121215]/10">
            <div className="flex items-center justify-between mb-8">
              <span className="block font-mono text-xs font-semibold text-[#5A616C] tracking-[0.2em] uppercase">
                THE WORK
              </span>
              <span className="font-mono text-xs text-[#8A919D]">
                [ 04 DELIVERABLE ASSETS ]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {showcaseAssets.map((asset, i) => (
                <div
                  key={i}
                  className="group flex flex-col bg-[#FFFFFF] border border-[#121215]/10 rounded-sm overflow-hidden p-3 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-[#101622] mb-3">
                    <Image
                      src={asset.src}
                      alt={asset.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#8A919D] font-bold block mb-1">
                    0{i + 1}
                  </span>
                  <p className="font-clash text-xs font-bold uppercase text-[#121215] line-clamp-2">
                    {asset.caption}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-12 text-left">
              <Link
                href={`/work/${cs.nextSlug}`}
                className="btn-ivory group"
              >
                <span>VIEW NEXT PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. THE CHALLENGE & STRATEGIC THINKING ==================== */}
      <section className="py-24 border-b border-white/10 bg-[#0A0F14]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Challenge */}
            <div className="space-y-6">
              <span className="eyebrow-label">THE CHALLENGE</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                {cs.challenge.heading}
              </h2>
              <p className="text-base text-[#8A919D] leading-relaxed">
                {cs.challenge.description}
              </p>
              <div className="p-6 rounded-sm bg-[#101622] border border-white/10 space-y-2">
                <span className="font-mono text-xs text-[#8A919D] uppercase tracking-widest block">
                  CAPABILITIES DEPLOYED
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cs.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-[#8A919D]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Thinking */}
            <div className="space-y-6">
              <span className="eyebrow-label">STRATEGIC THINKING</span>
              <h2 className="font-clash text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                {cs.thinking.heading}
              </h2>
              <p className="text-base text-[#8A919D] leading-relaxed">
                {cs.thinking.description}
              </p>
              {cs.thinking.quote && (
                <blockquote className="p-6 rounded-sm bg-[#101622] border-l-2 border-[#C5A46D] text-base font-clash uppercase tracking-wide text-white leading-snug">
                  &ldquo;{cs.thinking.quote}&rdquo;
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. PROOF & OUTCOME ==================== */}
      <section className="py-24 border-b border-white/10 bg-[#080E18]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow-label">PROOF &amp; OUTCOME</span>
              <h2 className="font-clash text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                {cs.outcome.heading}
              </h2>
              <p className="text-base text-[#8A919D] leading-relaxed">
                {cs.outcome.description}
              </p>
              <p className="text-sm text-[#8A919D] leading-relaxed">
                {cs.proof.description}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.proof.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-sm bg-[#101622] border border-white/10 space-y-1"
                >
                  <span className="font-clash text-2xl font-bold text-white block">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] text-[#8A919D] uppercase tracking-wider block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. NEXT PROJECT ROUTING ==================== */}
      <section className="py-24 bg-[#0A0F14] text-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 space-y-6">
          <span className="eyebrow-label mx-auto">NEXT CASE STUDY</span>
          <h2 className="font-clash text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            {cs.nextTitle}
          </h2>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href={`/work/${cs.nextSlug}`}
              className="btn-solid group"
            >
              <span>VIEW NEXT CASE STUDY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/work"
              className="btn-primary group"
            >
              <span>ALL WORK</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

