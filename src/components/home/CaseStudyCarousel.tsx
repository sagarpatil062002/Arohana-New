'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { TagPill } from '@/components/ui/TagPill';
import { Button } from '@/components/ui/Button';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

export interface CaseStudyItem {
  slug: string;
  clientName?: string;
  title?: string;
  subtitle?: string;
  heroBusinessStatement?: string;
  heroImage?: string;
  heroMedia?: string;
  sector?: string;
  tags?: string[];
  snapshot?: {
    sector?: string;
    location?: string;
    engagementType?: string;
    duration?: string;
    coreCapabilities?: string[];
  };
  theThinking?: string[];
  theSituation?: string[];
  proofOutcomes?: Array<{
    metricOrChange: string;
    description: string;
  }>;
  proof?: {
    verifiedText?: string;
    metricsNote?: string;
  };
}

interface CaseStudyCarouselProps {
  studies: CaseStudyItem[];
}

export function CaseStudyCarousel({ studies }: CaseStudyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  if (!studies || studies.length === 0) return null;

  const active = studies[currentIndex] || studies[0];
  const title = active.title || active.clientName || 'Case Study';
  const subtitle = active.subtitle || active.heroBusinessStatement || '';
  const imageSrc = active.heroImage || active.heroMedia || '/images/case-studies/raysons/neora-1.jpg';
  const sector = active.sector || active.snapshot?.sector || 'Consultancy & Execution';
  const tags = (Array.isArray(active.tags) && active.tags.length > 0) ? active.tags : [];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? studies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === studies.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, studies.length]);

  return (
    <section className="py-14 sm:py-20 md:py-28 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-stodio-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-12 text-left">
        {/* Section Header */}
        <ScrollDrift direction="up" distance={30} duration={1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stodio-border">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap">
                  [ 04 ]
                </span>
                <TagPill>Selected Work</TagPill>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight break-words">
                A few businesses we’ve helped shape, communicate or build.
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Button href="/work" variant="dark" size="md" icon="upRight">
                View All Case Studies
              </Button>
            </div>
          </div>
        </ScrollDrift>

        {/* MAIN CASE STUDY CAROUSEL CONTAINER */}
        <div className="w-full rounded-3xl bg-stodio-surface border border-stodio-border overflow-hidden shadow-card relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]">
            {/* LEFT COLUMN: Large High-Resolution Project Visual */}
            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[300px] sm:min-h-[400px] lg:min-h-[560px] overflow-hidden bg-stodio-card border-b lg:border-b-0 lg:border-r border-stodio-border group">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Top Badge overlay on image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 uppercase shadow-sm">
                      0{currentIndex + 1} / 0{studies.length}
                    </span>
                    <span className="text-[10px] font-mono text-white/90 uppercase bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/15">
                      Case Study
                    </span>
                  </div>

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                    <div className="text-xs font-mono text-stodio-red font-semibold uppercase tracking-wider">
                      {sector}
                    </div>
                    <div className="text-sm font-medium text-white/90 truncate">
                      {title}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Project Information & Direct Navigation */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, x: direction * 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  {/* Top Meta Bar */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-stodio-red font-bold px-2.5 py-1 rounded-full bg-white border border-stodio-border shadow-sm">
                        0{currentIndex + 1}
                      </span>
                      <span className="text-[11px] font-mono text-stodio-muted uppercase px-3 py-1 rounded-full bg-white/80 border border-stodio-border font-medium">
                        {sector}
                      </span>
                      {tags.length > 0 && (
                        <span className="text-[11px] font-mono text-stodio-muted uppercase px-3 py-1 rounded-full bg-white/80 border border-stodio-border font-medium">
                          {tags[0]}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stodio-white leading-tight break-words">
                      {title}
                    </h3>

                    <p className="text-sm sm:text-base text-stodio-white/90 font-medium leading-relaxed break-words">
                      {subtitle}
                    </p>
                  </div>

                  {/* Direct Case Study Link */}
                  <div className="pt-2">
                    <Link
                      href={`/work/${active.slug}`}
                      className="inline-flex items-center justify-between w-full sm:w-auto gap-4 px-5 py-3 rounded-full bg-stodio-white text-white hover:bg-stodio-red transition-all duration-300 ease-editorial group shadow-sm text-xs sm:text-sm font-semibold tracking-tight active:scale-95"
                    >
                      <span>VIEW COMPLETE CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CAROUSEL CONTROLS BAR */}
              <div className="pt-6 border-t border-stodio-border flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Numeric Pill Selectors (01 - 06) */}
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  {studies.map((s, idx) => {
                    const isSelected = currentIndex === idx;
                    const studyName = s.title || s.clientName || `Case 0${idx + 1}`;
                    return (
                      <button
                        key={s.slug || idx}
                        onClick={() => handleSelect(idx)}
                        title={studyName}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold transition-all duration-300 ease-editorial cursor-pointer border ${
                          isSelected
                            ? 'bg-stodio-red text-white border-stodio-red shadow-sm scale-105'
                            : 'bg-white text-stodio-muted border-stodio-border hover:border-stodio-muted hover:text-stodio-white'
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Prev / Next Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous case study"
                    className="p-2.5 rounded-full bg-white border border-stodio-border text-stodio-white hover:border-stodio-red hover:text-stodio-red active:scale-90 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono font-semibold text-stodio-muted px-2">
                    0{currentIndex + 1} / 0{studies.length}
                  </span>

                  <button
                    onClick={handleNext}
                    aria-label="Next case study"
                    className="p-2.5 rounded-full bg-white border border-stodio-border text-stodio-white hover:border-stodio-red hover:text-stodio-red active:scale-90 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
