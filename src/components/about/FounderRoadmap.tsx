'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MapPin, Compass, Award, Shield } from 'lucide-react';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

export interface MilestoneItem {
  id: string;
  chapterNumber: string;
  period: string;
  title: string;
  location: string;
  tagline: string;
  paragraphs: string[];
  keyHighlights: string[];
  image: string;
  imageCaption: string;
}

const ROADMAP_CHAPTERS: MilestoneItem[] = [
  {
    id: 'hospitality-foundations',
    chapterNumber: '01',
    period: '2016 — 2019',
    title: 'Hospitality Foundations & Taj Training',
    location: 'Muscat · Goa · Kolhapur',
    tagline: 'Learning operational discipline where small mistakes compound immediately.',
    paragraphs: [
      'My foundational years were forged directly inside luxury hospitality. I studied Hospitality Management in Muscat before completing my formal degree in Goa. During my university years, I was selected as a Top 13 finalist for Femina Miss India (West Zone) — an intense detour that taught poise and calm under extreme public scrutiny.',
      'Shortly after graduating, I qualified as one of just 16 trainees nationwide for the prestigious Taj Management Training Programme. This was a rigorous immersion in five-star standards, guest journey mapping, and standard operating procedures (SOPs).',
      'Returning to Kolhapur, I founded Mother India Cafe. Running a standalone cafe from scratch teaches you real unit economics, kitchen margins, and how every design or operational choice impacts the daily ledger.',
    ],
    keyHighlights: [
      'Studied Hospitality Management in Muscat & Goa',
      'Top 13 Finalist — Femina Miss India (West Zone)',
      'Qualified for Taj Management Training Programme (1 of 16 pan-India)',
      'Founder & Operator of Mother India Cafe (Kolhapur)',
    ],
    image: '/images/about/mother-india-cafe.jpg',
    imageCaption: 'Mother India Cafe · Ground kitchen SOPs, margins & daily operational realities.',
  },
  {
    id: 'operations-and-pivot',
    chapterNumber: '02',
    period: '2019 — 2021',
    title: 'High-Pace Operations & The Strategic Pivot',
    location: 'Goa · Delhi NCR',
    tagline: 'Heading operations across multi-outlet brands and discovering the gap between marketing and margins.',
    paragraphs: [
      'Following Mother India Cafe, I stepped into senior operational leadership for Passcode Hospitality in Goa, heading rollouts and day-to-day operations for prominent culinary brands including Pings Bia Hoi and Jamun.',
      'This was followed by institutional commercial sales for Latambarcem Brewers across Delhi and Goa, expanding distribution pipelines and managing high-stake institutional accounts.',
      'When COVID-19 disrupted the hospitality sector globally, it triggered a crucial epiphany: businesses rarely struggle because their branding lacks creativity; they struggle when brand positioning is disconnected from physical operations and cash flow realities. This insight became the foundation for Ārohana.',
    ],
    keyHighlights: [
      'Headed operations for Passcode Hospitality (Pings Bia Hoi & Jamun, Goa)',
      'Directed institutional craft beer sales for Latambarcem Brewers (Delhi & Goa)',
      'Navigated pandemic disruptions with lean turnaround strategies',
      'Formulated the commercial advisory framework behind Ārohana',
    ],
    image: '/images/about/passcode-ops.jpg',
    imageCaption: 'Passcode & Latambarcem Operations · Directing rollouts and commercial brewery sales.',
  },
  {
    id: 'specialized-theatres',
    chapterNumber: '03',
    period: '2021 — 2024',
    title: 'Demanding Theatres & High-Altitude Operations',
    location: 'Ladakh · 14,000+ ft · Western Theatres',
    tagline: 'Executing high-stakes documentary and strategic production under strict military protocol.',
    paragraphs: [
      'As advisory briefs expanded, our work moved into highly specialized and physically demanding environments. In Ladakh, we were commissioned on direct engagements for the Indian Army, including the 14 Corps, Fire & Fury Corps, Western Command, and Operation Sadbhavana/Sampark.',
      'Operating at 14,000+ feet in sub-zero climates required unprecedented discipline: tight military clearances, high-altitude logistics, zero margin for equipment failure, and deep cultural sensitivity working alongside border communities.',
      'We directed master films, ceremonial documentation, health awareness campaigns (SHE Sadbhavana), and high-altitude entertainment projects under PictureTime, proving our ability to execute where conventional creative agencies cannot operate.',
    ],
    keyHighlights: [
      'Directed field production for 14 Corps & Fire and Fury Corps HQ',
      'Ceremonial master film documentation for Western Command',
      'Community health outreach campaigns under Operation Sadbhavana (SHE)',
      'Extreme high-altitude production coordination across Ladakh & remote borders',
    ],
    image: '/images/about/ladakh-field.jpg',
    imageCaption: 'High-Altitude Field Direction · 14,000 ft production and military ceremonial documentation.',
  },
  {
    id: 'arohana-today',
    chapterNumber: '04',
    period: '2024 — Present',
    title: 'Ārohana Today: Strategy Meets Execution',
    location: 'Pan-India Advisory',
    tagline: 'Bridging commercial strategy, brand architecture, and physical execution for serious businesses.',
    paragraphs: [
      'Today, Ārohana operates as a bespoke strategic consultancy and creative execution firm. We work directly with founders, corporate leadership, and institutions who need rigorous thinking coupled with ground accountability.',
      'We do not operate as an outsourced assembly line. Every engagement is led directly by principal leadership, integrating financial margins, physical fit-outs, identity architecture, and digital presence into a cohesive whole.',
      'From transforming century-old conglomerates to launching experiential travel brands and executing national campaigns, our standard remains uncompromising: proof over claims, always.',
    ],
    keyHighlights: [
      'Direct founder-led advisory across 6 core industry sectors',
      'Bespoke commercial models tailored to real-world margin structures',
      'Complete full-stack execution: Identity, Spatial, Digital, and Film',
      'Zero agency bloat — 100% principal partner accountability',
    ],
    image: '/images/about/madhura-portrait.jpg',
    imageCaption: 'Ārohana Leadership · Disciplined execution at the intersection of brand and business.',
  },
];

export function FounderRoadmap() {
  const [activeStep, setActiveStep] = useState(0);
  const activeMilestone = ROADMAP_CHAPTERS[activeStep];

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? ROADMAP_CHAPTERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev === ROADMAP_CHAPTERS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 1. ROADMAP STEP SELECTOR TRACK (HIGHLY VISIBLE PROGRESSION) */}
      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-7 left-8 right-8 h-1 bg-stodio-border -z-0" />

        {/* Milestone Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {ROADMAP_CHAPTERS.map((item, idx) => {
            const isSelected = activeStep === idx;
            const isPast = idx < activeStep;

            return (
              <button
                key={item.id}
                onClick={() => setActiveStep(idx)}
                className={`group p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-stodio-surface border-stodio-red shadow-card ring-2 ring-stodio-red/20'
                    : 'bg-white border-stodio-border hover:border-stodio-muted/60 hover:bg-stodio-surface/40'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                      isSelected
                        ? 'bg-stodio-red text-white shadow-md scale-105'
                        : isPast
                        ? 'bg-stodio-surface text-stodio-white border border-stodio-border font-bold'
                        : 'bg-white text-stodio-muted border border-stodio-border'
                    }`}
                  >
                    {item.chapterNumber}
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-stodio-muted">
                    {item.period}
                  </span>
                </div>

                {/* Node Title */}
                <div>
                  <h4
                    className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-2 leading-snug transition-colors ${
                      isSelected ? 'text-stodio-red' : 'text-stodio-white'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono text-stodio-subtle uppercase block mt-1">
                    {item.location.split(' · ')[0]}
                  </span>
                </div>

                {/* Progress bar indicator */}
                <div
                  className={`h-1 w-full rounded-full transition-colors ${
                    isSelected ? 'bg-stodio-red' : isPast ? 'bg-stodio-white' : 'bg-stodio-border'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ACTIVE CHAPTER STAGE (SPLIT: LEFT NARRATIVE, RIGHT VISUAL & HIGHLIGHTS) */}
      <div className="rounded-3xl bg-stodio-surface border border-stodio-border p-6 sm:p-10 md:p-12 shadow-card relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-stodio-border pb-4">
                <span className="text-xs font-mono font-bold text-white bg-stodio-red px-3 py-1 rounded-full uppercase tracking-wider">
                  Chapter {activeMilestone.chapterNumber}
                </span>
                <span className="text-xs font-mono font-semibold text-stodio-muted px-3 py-1 rounded-full bg-white border border-stodio-border uppercase">
                  {activeMilestone.period}
                </span>
                <span className="text-xs font-mono text-stodio-subtle flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stodio-red" /> {activeMilestone.location}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stodio-white tracking-tight leading-tight">
                  {activeMilestone.title}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-stodio-red leading-snug">
                  "{activeMilestone.tagline}"
                </p>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-stodio-muted font-normal leading-relaxed">
                {activeMilestone.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-justify sm:text-left">
                    {para}
                  </p>
                ))}
              </div>

              {/* Verified Chapter Highlights */}
              <div className="p-5 rounded-2xl bg-white border border-stodio-border space-y-3 shadow-2xs">
                <span className="text-[11px] font-mono font-bold text-stodio-white uppercase tracking-wider block">
                  Key Milestones & Domain Learnings
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeMilestone.keyHighlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-stodio-muted font-medium">
                      <CheckCircle2 className="w-4 h-4 text-stodio-red shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual Stage Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-stodio-card border border-stodio-border shadow-md group">
                <Image
                  src={activeMilestone.image}
                  alt={activeMilestone.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white uppercase font-bold">
                  Stage 0{activeStep + 1} / 0{ROADMAP_CHAPTERS.length}
                </div>
              </div>

              {/* Photo Caption */}
              <p className="text-xs font-mono text-stodio-muted leading-relaxed px-1">
                {activeMilestone.imageCaption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* HIGH-VISIBILITY ROADMAP CONTROLS */}
        <div className="mt-8 pt-6 border-t border-stodio-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono font-bold text-stodio-muted uppercase">
            Milestone 0{activeStep + 1} of 0{ROADMAP_CHAPTERS.length}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous milestone"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-stodio-border text-stodio-white hover:border-stodio-red hover:bg-stodio-red hover:text-white transition-all duration-200 text-xs font-mono font-bold uppercase shadow-sm cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Stage</span>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next milestone"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-stodio-red border-2 border-stodio-red text-white hover:bg-stodio-redHover transition-all duration-200 text-xs font-mono font-bold uppercase shadow-sm cursor-pointer active:scale-95"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
