'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { CaseStudy } from '@/types';
import { TagPill } from '@/components/ui/TagPill';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

interface DetailedCaseStudyCarouselProps {
  studies: CaseStudy[];
}

export function DetailedCaseStudyCarousel({ studies }: DetailedCaseStudyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  if (!studies || studies.length === 0) return null;

  const active = studies[currentIndex] || studies[0];
  const title = active.title || 'Case Study';
  const subtitle = active.subtitle || '';
  const imageSrc = active.heroImage || '/images/case-studies/raysons/neora-1.jpg';
  const sector = active.sector || active.snapshot?.sector || 'Case Study';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, studies.length]);

  return (
    <section className="py-10 sm:py-14 md:py-20 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left relative">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollDrift direction="up" distance={30} duration={1} delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stodio-border">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-white bg-stodio-red px-2.5 py-0.5 rounded-full shadow-sm">
                02
              </span>
              <span className="text-xs font-mono text-stodio-white font-bold uppercase tracking-wider">Primary Case Studies</span>
            </div>
            <span className="text-xs font-mono font-bold text-stodio-muted uppercase">
              0{studies.length} Documented Engagements
            </span>
          </div>
        </ScrollDrift>

        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* LEFT: Large Project Image Stage */}
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stodio-card border border-stodio-border rounded-3xl shadow-card">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.slug + '-image'}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    priority={currentIndex === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Impressive Large Top Number Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-stodio-red text-white backdrop-blur-md border border-white/20 uppercase shadow-md">
                        CASE 0{currentIndex + 1}
                      </span>
                      <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-black/70 text-white/90 backdrop-blur-md border border-white/15 uppercase">
                        OF 0{studies.length}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-white/95 uppercase bg-black/60 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/15">
                      {sector}
                    </span>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                    <div className="text-xs font-mono text-stodio-red font-bold uppercase tracking-wider">
                      {sector}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white leading-tight">
                      {title}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: Project Information with Impressive Large Numbers */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-stodio-border bg-stodio-surface rounded-3xl p-6 sm:p-8 md:p-10 shadow-card">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.slug + '-info'}
                  initial={{ opacity: 0, x: direction * 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 flex flex-col justify-between space-y-6"
                >
                  {/* Header Meta with Large Sculptural Number */}
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between border-b border-stodio-border pb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-stodio-red">
                          0{currentIndex + 1}
                        </span>
                        <span className="text-xs font-mono text-stodio-muted uppercase tracking-wider font-semibold">
                          / 0{studies.length}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-stodio-white font-bold uppercase px-3 py-1 rounded-full bg-white border border-stodio-border shadow-sm">
                        {sector}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stodio-white leading-tight break-words">
                      {title}
                    </h3>

                    {subtitle && (
                      <p className="text-sm text-stodio-muted leading-relaxed break-words font-normal">
                        {subtitle}
                      </p>
                    )}
                  </div>

                  {/* Focus Tags */}
                  {tags.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-stodio-border">
                      <span className="text-[11px] font-mono text-stodio-white font-bold uppercase tracking-wider block">
                        Core Focus Areas
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-mono text-stodio-muted font-medium uppercase px-3 py-1 rounded-lg border border-stodio-border bg-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View Case Study Link */}
                  <div className="pt-4 border-t border-stodio-border">
                    <Link
                      href={`/work/${active.slug}`}
                      className="inline-flex items-center justify-between w-full gap-4 px-6 py-3.5 rounded-full bg-stodio-red text-white hover:bg-stodio-redHover transition-all duration-300 shadow-sm text-xs sm:text-sm font-bold tracking-wider uppercase group active:scale-95"
                    >
                      <span>VIEW COMPLETE CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* CAROUSEL CONTROLS BAR WITH HIGH-VISIBILITY ARROWS & SELECTORS */}
          <div className="mt-8 p-4 sm:p-6 border border-stodio-border bg-stodio-surface rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            {/* Numeric Selectors */}
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              {studies.map((s, idx) => {
                const isSelected = currentIndex === idx;
                const studyName = s.title || `Case 0${idx + 1}`;
                return (
                  <button
                    key={s.slug || idx}
                    onClick={() => handleSelect(idx)}
                    title={studyName}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? 'bg-stodio-red text-white border-stodio-red shadow-md scale-105'
                        : 'bg-white text-stodio-muted border-stodio-border hover:border-stodio-white hover:text-stodio-white'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>

            {/* High-Visibility Prev / Next Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous case study"
                className="p-3 rounded-full bg-white border-2 border-stodio-border text-stodio-white hover:border-stodio-red hover:bg-stodio-red hover:text-white active:scale-90 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono font-bold text-stodio-white px-3 py-1 rounded-lg bg-white border border-stodio-border">
                0{currentIndex + 1} / 0{studies.length}
              </span>

              <button
                onClick={handleNext}
                aria-label="Next case study"
                className="p-3 rounded-full bg-white border-2 border-stodio-border text-stodio-white hover:border-stodio-red hover:bg-stodio-red hover:text-white active:scale-90 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
