'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { TagPill } from '@/components/ui/TagPill';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

export interface Principle {
  number: string;
  title: string;
  description: string;
  shortTag?: string;
}

export const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: 'Thinking Beyond Posts',
    description:
      'We do not view marketing as a calendar of social posts. Every communication initiative is tied to positioning, commercial clarity and real business outcomes.',
    shortTag: 'Commercial & Strategic Clarity',
  },
  {
    number: '02',
    title: 'Sector Depth Over Templates',
    description:
      'We understand the distinct operational and margin realities of hospitality, real estate, healthcare, and consumer businesses rather than applying a single formula to everything.',
    shortTag: 'Operational Realities',
  },
  {
    number: '03',
    title: 'Owning Ground Execution',
    description:
      'We bridge strategy and physical execution — directing factory shoots, structuring kitchen pass SOPs, and managing multi-channel rollouts directly.',
    shortTag: 'Boots-on-the-Ground Delivery',
  },
  {
    number: '04',
    title: 'Complex & Long-Term Partnerships',
    description:
      'Equipped for multi-year corporate retainers, fast-paced commercial launches, and cross-functional leadership advisory.',
    shortTag: 'Institutional Trust',
  },
  {
    number: '05',
    title: 'Real, Hard-to-Replicate Proof',
    description:
      'From high-altitude Himalayan documentary productions and defence projects to luxury architectural spaces and fine dining turnarounds.',
    shortTag: 'Verified Track Record',
  },
  {
    number: '06',
    title: 'Direct Decision-Maker Access',
    description:
      'Serious enough for established group businesses, nimble enough to work directly with founders, owners, and leadership teams.',
    shortTag: 'No Agency Bureaucracy',
  },
];

export function TheStandardInteractive() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const active = PRINCIPLES[selectedIndex >= 0 ? selectedIndex : 0];

  return (
    <section className="py-14 sm:py-20 md:py-28 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left relative overflow-hidden">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-stodio-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-12 text-left">
        {/* Section Header */}
        <ScrollDrift direction="up" distance={30} duration={1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stodio-border">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap">
                  [ 02 ]
                </span>
                <TagPill>The Standard</TagPill>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight break-words">
                What we bring to every engagement.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stodio-muted font-normal max-w-md leading-relaxed">
              The rare combination of business-side hospitality experience, digital creative capability, sector-specific execution, and boots-on-the-ground delivery.
            </p>
          </div>
        </ScrollDrift>

        {/* DESKTOP SPLIT INTERACTIVE (Hidden on small mobile) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Principle Navigation List */}
          <div className="col-span-5 flex flex-col justify-between space-y-2 pr-2">
            <div className="space-y-2">
              {PRINCIPLES.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={item.number}
                    onClick={() => setSelectedIndex(idx)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ease-editorial flex items-center justify-between group relative cursor-pointer border ${
                      isSelected
                        ? 'bg-stodio-surface border-stodio-red shadow-sm'
                        : 'bg-transparent border-transparent hover:bg-stodio-surface/60 hover:border-stodio-border'
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isSelected && (
                      <motion.div
                        layoutId="standardActiveIndicator"
                        className="absolute left-0 top-3 bottom-3 w-1.5 bg-stodio-red rounded-r-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-3.5 pl-2">
                      <span
                        className={`text-xs font-mono font-bold transition-colors duration-200 ${
                          isSelected ? 'text-stodio-red' : 'text-stodio-subtle group-hover:text-stodio-white'
                        }`}
                      >
                        {item.number}
                      </span>
                      <span
                        className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
                          isSelected ? 'text-stodio-white' : 'text-stodio-muted group-hover:text-stodio-white'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-200 transform ${
                        isSelected
                          ? 'text-stodio-red translate-x-0 opacity-100'
                          : 'text-stodio-subtle -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stodio-border flex items-center justify-between text-[11px] font-mono text-stodio-subtle uppercase">
              <span>Interactive Principle Index</span>
              <span>01 — 06</span>
            </div>
          </div>

          {/* Right Column: Large Dynamic Editorial Content Panel */}
          <div className="col-span-7 flex">
            <div className="w-full rounded-3xl bg-stodio-surface border border-stodio-border p-8 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-card min-h-[420px]">
              {/* Subtle watermarked background number */}
              <div className="absolute right-6 -bottom-6 text-[160px] font-bold font-mono text-black/[0.03] select-none pointer-events-none leading-none">
                {active.number}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.number}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 flex-1 flex flex-col justify-between relative z-10"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-mono text-stodio-red font-bold px-3 py-1 rounded-full bg-white border border-stodio-border inline-block shadow-sm">
                        PRINCIPLE [{active.number}]
                      </span>
                      {active.shortTag && (
                        <span className="text-[11px] font-mono text-stodio-muted uppercase px-2.5 py-0.5 rounded-full border border-stodio-border bg-white/70">
                          {active.shortTag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stodio-white tracking-tight leading-tight break-words">
                      {active.title}
                    </h3>

                    <p className="text-base sm:text-lg text-stodio-muted font-normal leading-relaxed break-words">
                      {active.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-stodio-border flex items-center justify-between text-xs font-mono text-stodio-subtle">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-stodio-red flex-shrink-0" />
                      <span className="text-stodio-white font-semibold uppercase tracking-wider">
                        Ārohana Principle
                      </span>
                    </div>
                    <span className="text-stodio-muted">
                      Commitment to execution & clarity
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE COMPACT ACCORDION (Visible on screens < lg) */}
        <div className="lg:hidden divide-y divide-stodio-border border-t border-b border-stodio-border">
          {PRINCIPLES.map((item, idx) => {
            const isExpanded = selectedIndex === idx;
            return (
              <div
                key={item.number}
                className="py-1 transition-colors duration-300"
              >
                <button
                  onClick={() => setSelectedIndex(isExpanded ? -1 : idx)}
                  className="w-full py-5 flex items-center justify-between text-left gap-3 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isExpanded ? 'text-stodio-red' : 'text-stodio-subtle'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className={`text-base font-bold tracking-tight transition-colors ${
                      isExpanded ? 'text-stodio-red' : 'text-stodio-white'
                    }`}>
                      {item.title}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-stodio-red' : 'text-stodio-subtle'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pt-1 space-y-4 pr-4">
                        <p className="text-sm text-stodio-muted leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-stodio-subtle uppercase">
                          <CheckCircle2 className="w-3.5 h-3.5 text-stodio-red" />
                          <span className="text-stodio-white font-semibold">
                            Ārohana Principle
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
