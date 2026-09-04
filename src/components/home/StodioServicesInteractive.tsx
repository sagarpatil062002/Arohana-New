'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, ArrowRight } from 'lucide-react';
import { TagPill } from '@/components/ui/TagPill';
import { Button } from '@/components/ui/Button';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

export interface EditorialService {
  number: string;
  id: string;
  slug: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  capabilities: string[];
}

export const EDITORIAL_SERVICES: EditorialService[] = [
  {
    number: '01',
    id: 'digital-growth',
    slug: 'digital-brand-growth',
    category: 'Brand & Digital',
    title: 'Brand & Digital Growth',
    tagline: 'Strategy, social ecosystems & creative execution',
    description:
      'Brand and communication strategy, social ecosystems, content production, creative direction, performance and platform execution for brands that refuse to be generic.',
    image: '/images/services/digital-growth.jpg',
    capabilities: ['Brand Strategy', 'Social Ecosystems', 'Creative Direction', 'Performance Marketing', 'Platform Execution'],
  },
  {
    number: '02',
    id: 'brand-production',
    slug: 'content-brand-production',
    category: 'Content & Communication',
    title: 'Content & Communication',
    tagline: 'Documentaries, films & communication in extreme terrains',
    description:
      'Films, documentaries, corporate/institutional communication, campaign assets, scripting, shoots and post-production in demanding environments and high-altitude locations.',
    image: '/images/services/brand-production.jpg',
    capabilities: ['Documentary Films', 'Institutional Films', 'Scripting & Directing', 'High-Altitude Shoots', 'Post-Production'],
  },
  {
    number: '03',
    id: 'hospitality-consulting',
    slug: 'hospitality-consulting',
    category: 'Hospitality & Experience',
    title: 'Hospitality & Experience',
    tagline: 'Concept, kitchen pass, unit economics & guest journeys',
    description:
      'Restaurant concept, menu engineering, food cost control, pricing, operational SOPs, staffing, kitchen control, revenue optimisation and on-ground guest experience.',
    image: '/images/services/hospitality-consulting.jpg',
    capabilities: ['Concept & Menu', 'Food Cost & Pricing', 'Kitchen SOPs', 'Staff Training', 'Guest Experience'],
  },
];

export function StodioServicesInteractive() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  // Desktop active service is either hovered or current selected (defaults to 0)
  const currentDesktopIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
  const currentService = EDITORIAL_SERVICES[currentDesktopIdx] || EDITORIAL_SERVICES[0];

  const handleMobileToggle = (idx: number) => {
    setMobileExpanded((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-14 sm:py-20 md:py-28 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-12 text-left">
        {/* Section Header */}
        <ScrollDrift direction="up" distance={30} duration={1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stodio-border">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap">
                  [ 05 ]
                </span>
                <TagPill>Services & Practice Areas</TagPill>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stodio-white leading-tight break-words">
                Everything we do.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Button href="/services" variant="dark" size="md" icon="upRight">
                Explore Detailed Services
              </Button>
            </div>
          </div>
        </ScrollDrift>

        {/* DESKTOP STODIO-STYLE INTERACTIVE EDITORIAL LAYOUT (Hidden on mobile < md) */}
        <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Large Editorial Typography Service List */}
          <div className="col-span-7 space-y-4">
            {EDITORIAL_SERVICES.map((service, idx) => {
              const isActive = currentDesktopIdx === idx;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    setActiveIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative p-6 lg:p-8 rounded-3xl transition-all duration-400 ease-editorial cursor-pointer border ${
                    isActive
                      ? 'bg-stodio-surface border-stodio-border shadow-sm'
                      : 'bg-transparent border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <Link href={`/services#${service.id}`} className="block w-full">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        {/* Number & Category Label */}
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono text-stodio-red font-semibold">
                            [ {service.number} ]
                          </span>
                          <span className="text-xs font-mono uppercase tracking-wider text-stodio-subtle font-medium">
                            {service.category}
                          </span>
                        </div>

                        {/* Large Headline */}
                        <h3 className={`text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-stodio-white' : 'text-stodio-muted group-hover:text-stodio-white'
                        }`}>
                          {service.title}
                        </h3>

                        {/* Subtle Tagline */}
                        <p className="text-xs lg:text-sm text-stodio-muted font-normal leading-relaxed max-w-xl">
                          {service.tagline}
                        </p>
                      </div>

                      {/* Pill Arrow Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isActive
                          ? 'bg-stodio-red text-white shadow-glow'
                          : 'bg-stodio-surface text-stodio-muted group-hover:text-stodio-white group-hover:bg-white border border-stodio-border'
                      }`}>
                        <ArrowUpRight className={`w-4 h-4 transform transition-transform duration-300 ${
                          isActive ? 'translate-x-0.5 -translate-y-0.5' : ''
                        }`} />
                      </div>
                    </div>

                    {/* Active Capabilities Indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 mt-4 border-t border-stodio-border/60 flex flex-wrap gap-1.5"
                      >
                        {service.capabilities.map((cap, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[10px] font-mono uppercase text-stodio-muted px-2.5 py-0.5 rounded-full bg-white border border-stodio-border shadow-2xs"
                          >
                            {cap}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage Image Display */}
          <div className="col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-stodio-border bg-stodio-card shadow-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentService.image}
                    alt={currentService.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 35vw"
                    priority
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono uppercase text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      Practice Pillar {currentService.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      Ārohana Core
                    </span>
                  </div>

                  {/* Bottom Content Inset */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-3 pointer-events-auto">
                    <div className="space-y-1.5">
                      <TagPill variant="red">{currentService.category}</TagPill>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {currentService.title}
                      </h4>
                      <p className="text-xs text-white/80 leading-relaxed font-normal">
                        {currentService.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href={`/services#${currentService.id}`}
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-white hover:text-stodio-red transition-colors uppercase tracking-wider"
                      >
                        <span>Explore full practice specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE ACCORDION INTERACTION (Screens < md) */}
        <div className="md:hidden space-y-3">
          {EDITORIAL_SERVICES.map((service, idx) => {
            const isExpanded = mobileExpanded === idx;

            return (
              <div
                key={service.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-stodio-surface border-stodio-border shadow-sm'
                    : 'bg-white border-stodio-border'
                }`}
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => handleMobileToggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-stodio-red font-bold">
                      [{service.number}]
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-stodio-white tracking-tight">
                        {service.title}
                      </h3>
                      <span className="text-[10px] font-mono text-stodio-subtle uppercase">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full border border-stodio-border flex items-center justify-center transition-colors ${
                    isExpanded ? 'bg-stodio-red text-white border-stodio-red' : 'bg-white text-stodio-white'
                  }`}>
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Content Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 space-y-4 border-t border-stodio-border/60 pt-4">
                        {/* Service Thumbnail */}
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-stodio-border bg-stodio-card">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-stodio-muted font-normal leading-relaxed">
                          {service.description}
                        </p>

                        {/* Capabilities */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono text-stodio-subtle uppercase tracking-wider block">
                            Capabilities:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.capabilities.map((cap, cIdx) => (
                              <span
                                key={cIdx}
                                className="text-[10px] font-mono text-stodio-muted uppercase px-2 py-0.5 rounded-full bg-white border border-stodio-border"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Link Button */}
                        <div className="pt-2">
                          <Button
                            href={`/services#${service.id}`}
                            variant="dark"
                            size="sm"
                            icon="arrow"
                            className="w-full justify-center"
                          >
                            Explore {service.title}
                          </Button>
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
