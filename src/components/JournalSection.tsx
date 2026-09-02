"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { AROHANA_CONTENT, JournalArticle } from "@/data/content";

export default function JournalSection() {
  const { journalArticles } = AROHANA_CONTENT;
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="bg-white text-black py-24 md:py-36 px-6 md:px-12 border-b border-black/10">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Indicator */}
        <div className="mb-10 md:mb-16">
          <div className="section-indicator-line text-black/80">
            <span>04. JOURNAL</span>
          </div>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <h2 className="font-display font-display-section text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] text-black">
              INSIGHTS<br />
              AND IDEAS.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-[16px] md:text-[18px] text-black/75 leading-relaxed font-sans mb-8">
              Thoughts on commercial strategy, high-altitude institutional discipline, hospitality operations, and authentic experiential travel.
            </p>
            <div>
              <button
                onClick={() => setSelectedArticle(journalArticles[0])}
                className="group inline-flex items-center gap-3 text-black text-[13px] font-mono tracking-[0.15em] uppercase hover:text-black/70 transition-colors"
              >
                <span>VIEW ALL ARTICLES</span>
                <span className="btn-circle-arrow w-8 h-8 border border-black/40 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Blog Cards Grid (Matching Figma Specification) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              role="button"
              tabIndex={0}
              className="group cursor-pointer flex flex-col bg-neutral-100 border border-neutral-200 overflow-hidden"
            >
              {/* Image with Grayscale & Zoom */}
              <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover img-editorial"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1">
                  {article.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow bg-white">
                <div>
                  <div className="text-[11px] font-mono text-black/50 tracking-widest uppercase mb-3">
                    {article.date} • {article.readTime}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-black uppercase tracking-tight mb-4 group-hover:text-neutral-600 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-black/60 font-sans line-clamp-3 leading-relaxed mb-6">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-black uppercase group-hover:text-black/70">
                  <span className="font-semibold tracking-wider">READ MORE</span>
                  <span className="btn-circle-arrow w-7 h-7 border border-black/30 group-hover:border-black group-hover:bg-black group-hover:text-white">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Slide-Over Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-2xl h-full bg-white text-black p-8 md:p-14 overflow-y-auto relative animate-slideLeft">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="sticky top-0 float-right w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors z-10"
              aria-label="Close Article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="clear-both pt-4">
              <div className="text-xs font-mono text-black/50 tracking-widest uppercase mb-2">
                {selectedArticle.category} • {selectedArticle.date}
              </div>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight mb-6">
                {selectedArticle.title}
              </h2>

              <div className="relative w-full aspect-video rounded-sm overflow-hidden mb-8 border border-neutral-200">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover img-editorial"
                />
              </div>

              <div className="space-y-6 font-sans text-base text-black/80 leading-relaxed">
                {selectedArticle.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-mono text-black/50">ĀROHANA EDITORIAL ARCHIVE</span>
                <Link
                  href="/contact"
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-mono text-black font-semibold uppercase hover:underline flex items-center gap-1"
                >
                  DISCUSS THIS TOPIC <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
