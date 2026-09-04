'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Layers, Compass, ChevronDown } from 'lucide-react';
import { TagPill } from '@/components/ui/TagPill';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

export interface SectorItem {
  id: string;
  number: string;
  title: string;
  count: string;
  description: string;
  capabilities: string[];
  keyClients?: string[];
}

export const SECTORS: SectorItem[] = [
  {
    id: 'hospitality',
    number: '01',
    title: 'Hospitality & F&B',
    count: '06 Engagements',
    description:
      'Restaurant concepts, menu margin engineering, culinary SOPs, staffing, pass operations, and guest acquisition strategies built from commercial food & beverage leadership.',
    capabilities: ['Concept & Menu Design', 'Margin & Food Cost Engineering', 'Kitchen Pass SOPs', 'Guest Acquisition'],
    keyClients: ['Neora Deck', 'Misu Pan-Asian', 'The Blue Door Cafe'],
  },
  {
    id: 'real-estate',
    number: '02',
    title: 'Real Estate & Built Environment',
    count: '04 Engagements',
    description:
      'Industrial manufacturing, luxury modular architecture, residential developments, and investor-grade communication systems that build commercial credibility.',
    capabilities: ['Project Positioning', 'Architectural Visualization', 'Buyer Education', 'Investor Collateral'],
    keyClients: ['Raysons Real Estate', 'Loom Crafts Prefab', 'Raysons Casting'],
  },
  {
    id: 'healthcare',
    number: '03',
    title: 'Healthcare',
    count: '03 Engagements',
    description:
      'Specialised clinical dermatology, doctor-led patient education, ethical medical trust architecture, and practice growth across Tier-1 & Tier-2 cities.',
    capabilities: ['Clinical Reputation Systems', 'Doctor-Led Educational Content', 'Patient Trust Architecture', 'Practice Growth'],
    keyClients: ['RR Skins Dermatology', 'Specialised Clinics'],
  },
  {
    id: 'lifestyle',
    number: '04',
    title: 'Lifestyle & Consumer Brands',
    count: '05 Engagements',
    description:
      'Luxury outdoor living, gourmet retail, packaging identity, retail store launches, and multi-channel brand growth systems built around buyer psychology.',
    capabilities: ['Category Positioning', 'Visual Identity & Packaging', 'Omnichannel Launch', 'Retail Experience'],
    keyClients: ['Loom Crafts Furniture', 'Gourmet Consumer Brands'],
  },
  {
    id: 'entertainment',
    number: '05',
    title: 'Entertainment & Media',
    count: '03 Engagements',
    description:
      'High-altitude mobile digital cinemas, documentary films, cultural impact campaigns, and defence institutional productions in extreme terrains.',
    capabilities: ['High-Altitude Documentary', 'Institutional Films', 'Cultural Campaign Direction', 'Festival Releases'],
    keyClients: ['PictureTime', 'Western Command Indian Army Film'],
  },
  {
    id: 'travel',
    number: '06',
    title: 'Travel & Tourism',
    count: '02 Ventures',
    description:
      'High-altitude Himalayan journeys, lived-experience expeditions, community homestay integration, and mountain logistics executed with regional intimacy.',
    capabilities: ['Expedition Curation', 'Community Homestay Systems', 'High-Altitude Logistics', 'Experiential Branding'],
    keyClients: ['Tourin Ladakh', 'Himalayan Expeditions'],
  },
];

export function SectorDepthInteractive() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const active = SECTORS[selectedIndex >= 0 ? selectedIndex : 0];

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
                <TagPill>Sector Depth</TagPill>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight break-words">
                Where our experience sits.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stodio-muted font-normal max-w-md leading-relaxed">
              Cross-disciplinary capability deployed across 6 core commercial and institutional sectors without generic agency templates.
            </p>
          </div>
        </ScrollDrift>

        {/* DESKTOP INTERACTIVE SPLIT EXPLORER */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          {/* Left 6-Grid Sector Selectors */}
          <div className="col-span-6 grid grid-cols-2 gap-3.5">
            {SECTORS.map((sector, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedIndex(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-5 rounded-2xl text-left flex flex-col justify-between transition-all duration-300 ease-editorial border cursor-pointer group ${isSelected
                      ? 'bg-stodio-surface border-stodio-red shadow-sm scale-[1.02]'
                      : 'bg-white border-stodio-border hover:border-stodio-muted/80 hover:bg-stodio-surface/40'
                    }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${isSelected ? 'text-stodio-red' : 'text-stodio-subtle group-hover:text-stodio-white'
                        }`}
                    >
                      {sector.number}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border transition-colors ${isSelected
                          ? 'bg-white text-stodio-red border-stodio-red/30 font-semibold'
                          : 'bg-stodio-surface text-stodio-muted border-stodio-border'
                        }`}
                    >
                      {sector.count}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold tracking-tight transition-colors ${isSelected ? 'text-stodio-white' : 'text-stodio-muted group-hover:text-stodio-white'
                      }`}
                  >
                    {sector.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right Shared Sector Detail Panel */}
          <div className="col-span-6 flex">
            <div className="w-full rounded-3xl bg-stodio-surface border border-stodio-border p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-stodio-red font-bold px-3 py-1 rounded-full bg-white border border-stodio-border inline-block shadow-sm">
                        SECTOR [{active.number}]
                      </span>
                      <span className="text-xs font-mono text-stodio-white font-semibold uppercase px-3 py-1 rounded-full bg-white border border-stodio-border shadow-sm">
                        {active.count}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-stodio-white tracking-tight leading-tight">
                      {active.title}
                    </h3>

                    <p className="text-sm sm:text-base text-stodio-muted font-normal leading-relaxed">
                      {active.description}
                    </p>
                  </div>

                  {/* Core Capabilities in Sector */}
                  <div className="space-y-2.5 pt-4 border-t border-stodio-border">
                    <span className="text-[10px] font-mono text-stodio-subtle uppercase tracking-wider block">
                      Core Specialized Capabilities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {active.capabilities.map((cap, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[11px] font-mono text-stodio-muted px-2.5 py-1 rounded-full bg-white border border-stodio-border"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link to Work in this Sector */}
                  <div className="pt-4 border-t border-stodio-border flex items-center justify-between">
                    <Link
                      href={`/work#${active.id}`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-stodio-white hover:text-stodio-red transition-colors group uppercase tracking-wider"
                    >
                      <span>Explore {active.title} Projects</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE COMPACT ACCORDION (Screens < lg) */}
        <div className="lg:hidden divide-y divide-stodio-border border-t border-b border-stodio-border">
          {SECTORS.map((sector, idx) => {
            const isExpanded = selectedIndex === idx;
            return (
              <div
                key={sector.id}
                className="py-1 transition-colors duration-300"
              >
                <button
                  onClick={() => setSelectedIndex(isExpanded ? -1 : idx)}
                  className="w-full py-5 flex items-center justify-between text-left gap-3 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${isExpanded ? 'text-stodio-red' : 'text-stodio-subtle'
                        }`}
                    >
                      {sector.number}
                    </span>
                    <span className={`text-base font-bold tracking-tight transition-colors ${isExpanded ? 'text-stodio-red' : 'text-stodio-white'
                      }`}>
                      {sector.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-stodio-muted uppercase px-2 py-0.5 rounded-full bg-white border border-stodio-border">
                      {sector.count.split(' ')[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-stodio-red' : 'text-stodio-subtle'
                        }`}
                    />
                  </div>
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
                        <p className="text-xs sm:text-sm text-stodio-muted leading-relaxed">
                          {sector.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {sector.capabilities.map((cap, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] font-mono text-stodio-muted px-2.5 py-1 rounded-full bg-white border border-stodio-border"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2">
                          <Link
                            href={`/work#${sector.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-stodio-red uppercase tracking-wider"
                          >
                            <span>View Sector Case Studies</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
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
