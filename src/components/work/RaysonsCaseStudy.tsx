'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Building2, Utensils, Factory } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TagPill } from '@/components/ui/TagPill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollProgressBar } from '@/components/motion/ScrollProgressBar';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { CaseStudyItem } from '@/types/cms';

interface RaysonsCaseStudyProps {
  caseStudy: CaseStudyItem;
  nextCaseStudy?: CaseStudyItem | null;
}

export function RaysonsCaseStudy({ caseStudy, nextCaseStudy }: RaysonsCaseStudyProps) {
  const nextSlug = nextCaseStudy?.slug || 'loom-crafts';
  const nextTitle = nextCaseStudy?.clientName || 'Loom Crafts';

  return (
    <article className="pb-20 sm:pb-28 bg-stodio-bg text-stodio-white text-left">
      {/* Scroll Progress Bar at Top */}
      <ScrollProgressBar />

      {/* 1. HERO BLOCK */}
      <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 md:pb-24 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-left">
          {/* Back Navigation */}
          <div className="mb-6 sm:mb-8 text-left">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stodio-muted hover:text-stodio-red transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-stodio-red" />
              <span>Back to all case studies</span>
            </Link>
          </div>

          <div className="w-full space-y-4 sm:space-y-6 text-left">
            <ScrollReveal variant="slide-up" duration={700} className="flex flex-wrap items-center justify-start gap-2 sm:gap-3">
              <TagPill variant="red">Raysons Group</TagPill>
              <span className="text-xs font-mono text-stodio-muted uppercase whitespace-nowrap">
                Multi-Entity Business Group
              </span>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" delay={50} duration={750}>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-stodio-white leading-[1.12] sm:leading-[1.08] text-balance text-left w-full break-words">
                One relationship. Three very different businesses.
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" delay={100} duration={700}>
              <p className="text-base sm:text-xl md:text-2xl text-stodio-white/90 font-medium leading-relaxed w-full text-left break-words">
                Our work with Raysons Group began with Neora Deck, expanded into the group&apos;s real-estate business, and later extended into a specialised production project for its casting business.
              </p>
            </ScrollReveal>

            {/* Tags */}
            <ScrollReveal variant="slide-up" delay={150} duration={700} className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 text-left">
              {[
                'Relationship-Led Strategy',
                'Hospitality Ecosystem',
                'Real Estate Communication',
                'Industrial Film Production',
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-stodio-card text-stodio-muted border border-stodio-border whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </ScrollReveal>
          </div>

          {/* Master Hero Visual: Single strong project image (Neora Deck) */}
          <ScrollReveal variant="scale-up" delay={150} duration={850}>
            <ParallaxImage speed={0.08} maxOffset={25} className="mt-8 sm:mt-12 md:mt-16 rounded-2xl sm:rounded-3xl">
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl border border-stodio-border overflow-hidden bg-stodio-card shadow-2xl group text-left">
                <Image
                  src="/images/case-studies/raysons/neora-1.jpg"
                  alt="Neora Deck rooftop space and guest ambiance"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 text-left">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono text-stodio-red uppercase tracking-wider block font-semibold text-left">
                      Hospitality & On-Ground Operations
                    </span>
                    <p className="text-xs sm:text-sm text-white font-medium text-left break-words">
                      Neora Deck rooftop hospitality & on-ground execution — the origin of Ārohana&apos;s partnership with Raysons Group.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-white/90 bg-black/60 px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full border border-white/20 backdrop-blur-md whitespace-nowrap self-start sm:self-auto">
                    Verified Multi-Entity Engagement
                  </span>
                </div>
              </div>
            </ParallaxImage>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. SNAPSHOT SPECIFICATION CARD */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-left">
          <ScrollReveal variant="slide-up" duration={700} className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-stodio-card border border-stodio-border shadow-card text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
              <div className="space-y-1.5 border-l-2 border-stodio-red pl-4 text-left">
                <span className="text-[10px] font-mono text-stodio-subtle uppercase tracking-widest block text-left">
                  Sector Verticals
                </span>
                <p className="text-sm font-medium text-stodio-white text-left break-words">
                  Hospitality, Real Estate & Casting
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-stodio-red pl-4 text-left">
                <span className="text-[10px] font-mono text-stodio-subtle uppercase tracking-widest block text-left">
                  Location / Terrain
                </span>
                <p className="text-sm font-medium text-stodio-white text-left break-words">
                  Kolhapur & Western Maharashtra
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-stodio-red pl-4 text-left">
                <span className="text-[10px] font-mono text-stodio-subtle uppercase tracking-widest block text-left">
                  Engagement Model
                </span>
                <p className="text-sm font-medium text-stodio-white text-left break-words">
                  Relationship-Led Multi-Entity Partnership
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-stodio-red pl-4 text-left">
                <span className="text-[10px] font-mono text-stodio-subtle uppercase tracking-widest block text-left">
                  Duration / Pacing
                </span>
                <p className="text-sm font-medium text-stodio-white text-left break-words">
                  Ongoing Retainers + Project-Based Film
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-stodio-border flex flex-wrap items-center gap-2 text-left">
              <span className="text-xs font-mono text-stodio-subtle uppercase mr-2 whitespace-nowrap">
                Core Capabilities:
              </span>
              {[
                'Content Strategy & Planning',
                'Full-Scope Social Media Management',
                'Architectural & Lifestyle Shoots',
                'Technical Scripting & Video Direction',
                'Corporate Presentation Film',
              ].map((cap, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-stodio-white bg-stodio-surface px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-stodio-border whitespace-nowrap"
                >
                  {cap}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. THE BACKSTORY */}
      <section className="py-14 sm:py-20 md:py-32 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-left">
          <div className="w-full space-y-10 sm:space-y-16 text-left">
            <div className="space-y-4 sm:space-y-6 text-left">
              <ScrollReveal variant="slide-up" duration={700} className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap shrink-0">[ 01 ]</span>
                <TagPill>The Relationship</TagPill>
              </ScrollReveal>

              <ScrollReveal variant="slide-up" delay={50} duration={750}>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight text-left break-words">
                  How one assignment expanded into a multi-entity partnership.
                </h2>
              </ScrollReveal>

              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-stodio-white/90 font-normal leading-relaxed text-left w-full break-words">
                <ScrollReveal variant="slide-up" duration={650}>
                  <p className="text-left">
                    Ārohana&apos;s relationship with Raysons Group began with <strong className="text-stodio-white font-semibold">Neora Deck</strong>, the group&apos;s hospitality business.
                  </p>
                </ScrollReveal>

                <ScrollReveal variant="slide-up" duration={650}>
                  <p className="text-left">
                    What started there grew into a broader engagement with the group&apos;s <strong className="text-stodio-white font-semibold">real-estate business</strong>, where we manage the complete social-media presence — from strategy and content planning to shoots, scripting, design, editing and publishing.
                  </p>
                </ScrollReveal>

                <ScrollReveal variant="slide-up" duration={650}>
                  <p className="text-left">
                    The third assignment was different again: a <strong className="text-stodio-white font-semibold">corporate film for the group&apos;s casting business</strong>, created for prospective clients.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Highlighting the Core Value */}
            <ScrollReveal variant="scale-up" duration={750} className="w-full p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-stodio-card border border-stodio-red/50 shadow-glow space-y-4 text-left">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-stodio-red" />
                <span className="text-xs font-mono text-stodio-red font-semibold uppercase tracking-wider">
                  The Partnership Principle
                </span>
              </div>
              <blockquote className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-stodio-white leading-snug text-left break-words">
                &ldquo;The value of the relationship is not a single campaign. It is the confidence to bring the same strategic and creative partner into businesses with completely different audiences and communication needs.&rdquo;
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. BUSINESS 1: NEORA DECK */}
      <section className="py-14 sm:py-20 md:py-32 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10 sm:space-y-16 text-left">
          <div className="w-full space-y-4 sm:space-y-6 text-left">
            <ScrollReveal variant="slide-up" duration={700} className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap shrink-0">[ 02 ]</span>
              <TagPill variant="red">Hospitality Vertical</TagPill>
              <div className="flex items-center gap-1.5 text-xs font-mono text-stodio-muted whitespace-nowrap">
                <Utensils className="w-3.5 h-3.5 text-stodio-red" />
                <span>Neora Deck</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" delay={50} duration={750}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight text-left break-words">
                Neora Deck
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" delay={100} duration={700}>
              <p className="text-sm sm:text-base md:text-lg text-stodio-white/90 font-normal leading-relaxed text-left w-full break-words">
                For Neora Deck, Ārohana handles the complete social-media function — content calendar, concepts, creative direction, shoots, scripting, graphic design, video editing, posting and ongoing communication.
              </p>
            </ScrollReveal>

            {/* Execution Deliverables */}
            <ScrollReveal variant="slide-up" delay={150} duration={700} className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 text-left">
              {[
                'Content Calendar & Monthly Concepts',
                'Creative Direction & Live Shoots',
                'Scripting & Graphic Design',
                'Video Editing & Colour Grading',
                'Publishing & Community Communication',
              ].map((del, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-stodio-muted bg-stodio-surface px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-stodio-border flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-stodio-red shrink-0" />
                  <span>{del}</span>
                </span>
              ))}
            </ScrollReveal>
          </div>

          {/* Visuals: 4 strong Neora images */}
          <div className="space-y-4 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-stodio-muted uppercase tracking-wider">
                Visual Documentation · Space, Culinary Experience & Social Content
              </span>
              <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap">
                4 Curated Frames
              </span>
            </div>

            <StaggerContainer staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  src: '/images/case-studies/raysons/neora-1.jpg',
                  title: 'Rooftop Ambiance',
                  caption: 'Open-air spatial design, architectural lighting, and deck lounge atmosphere.',
                },
                {
                  src: '/images/case-studies/raysons/neora-2.jpg',
                  title: 'Culinary Craft',
                  caption: 'Artisanal culinary presentation and signature menu storytelling.',
                },
                {
                  src: '/images/case-studies/raysons/neora-3.jpg',
                  title: 'Beverage Craft',
                  caption: 'Craft cocktail mixology and premium beverage captures for social media.',
                },
                {
                  src: '/images/case-studies/raysons/neora-4.jpg',
                  title: 'Guest Experience',
                  caption: 'Evening hospitality energy and vibrant lifestyle community engagement.',
                },
              ].map((item, idx) => (
                <StaggerItem key={idx} index={idx}>
                  <div className="group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-stodio-card border border-stodio-border hover:border-stodio-red/50 hover:-translate-y-1.5 transition-all duration-400 ease-editorial shadow-card h-full text-left">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stodio-surface">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-black/75 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex items-center text-left">
                      <p className="text-xs text-stodio-muted leading-relaxed font-mono group-hover:text-stodio-white transition-colors text-left w-full break-words">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 5. RAYSONS REAL ESTATE (Built Environment Vertical) */}
      <section className="py-14 sm:py-20 md:py-32 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10 sm:space-y-16 text-left">
          <div className="w-full space-y-4 sm:space-y-6 text-left">
            <ScrollReveal variant="slide-up" duration={700} className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap shrink-0">[ 03 ]</span>
              <TagPill variant="red">Built Environment Vertical</TagPill>
              <div className="flex items-center gap-1.5 text-xs font-mono text-stodio-muted whitespace-nowrap">
                <Building2 className="w-3.5 h-3.5 text-stodio-red" />
                <span>Raysons Real Estate</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" delay={50} duration={750}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight text-left break-words">
                Raysons Real Estate
              </h2>
            </ScrollReveal>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-stodio-white/90 font-normal leading-relaxed text-left w-full break-words">
              <ScrollReveal variant="slide-up" duration={650}>
                <p className="text-left">
                  The real-estate brief required a different communication language — one built around projects, credibility, architecture, development and the quality of the business behind them.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="slide-up" duration={650}>
                <p className="text-left">
                  Ārohana manages the complete social-media process: strategy, calendars, concepts, shoots, scripts, design, editing and publishing, creating a consistent digital presence rather than treating individual posts as isolated pieces of content.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="slide-up" duration={650}>
                <p className="text-stodio-muted text-left">
                  Over time, the page has evolved into a more professional and considered representation of the business, with communication designed around the audience the real-estate business wants to reach.
                </p>
              </ScrollReveal>
            </div>

            {/* Execution Deliverables */}
            <ScrollReveal variant="slide-up" delay={150} duration={700} className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 text-left">
              {[
                'Full Social Media Management',
                'Strategy & Editorial Calendars',
                'Architectural & On-Site Shoots',
                'Project Storytelling & Publishing',
                'Audience-Aligned Digital Presence',
              ].map((del, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-stodio-muted bg-stodio-surface px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-stodio-border flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-stodio-red shrink-0" />
                  <span>{del}</span>
                </span>
              ))}
            </ScrollReveal>
          </div>

          {/* Visuals: 4 Real Estate Photography & Social Assets */}
          <div className="space-y-4 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-stodio-muted uppercase tracking-wider">
                Real Estate Photography & Social Feed Assets
              </span>
              <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap">
                4 Curated Frames
              </span>
            </div>

            <StaggerContainer staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  src: '/images/case-studies/raysons/realestate-1.jpg',
                  title: 'Architectural Scale',
                  caption: 'Commercial & residential facade quality, structural geometry and design standards.',
                },
                {
                  src: '/images/case-studies/raysons/realestate-2.jpg',
                  title: 'Living Spaces',
                  caption: 'Interior spatial light, premium finishes, and lifestyle environment documentation.',
                },
                {
                  src: '/images/case-studies/raysons/realestate-3.jpg',
                  title: 'On-Ground Reality',
                  caption: 'Project construction progress and engineering milestones captured in the field.',
                },
                {
                  src: '/images/case-studies/raysons/realestate-4.jpg',
                  title: 'Social Feed Showcase',
                  caption: 'Curated digital feed layout communicating credibility and developer reputation.',
                },
              ].map((item, idx) => (
                <StaggerItem key={idx} index={idx}>
                  <div className="group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-stodio-card border border-stodio-border hover:border-stodio-red/50 hover:-translate-y-1.5 transition-all duration-400 ease-editorial shadow-card h-full text-left">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stodio-surface">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-black/75 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex items-center text-left">
                      <p className="text-xs text-stodio-muted leading-relaxed font-mono group-hover:text-stodio-white transition-colors text-left w-full break-words">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 6. CASTING / INDUSTRIAL FILM (Focused Production Assignment) */}
      <section className="py-14 sm:py-20 md:py-32 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10 sm:space-y-16 text-left">
          <div className="w-full space-y-4 sm:space-y-6 text-left">
            <ScrollReveal variant="slide-up" duration={700} className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap shrink-0">[ 04 ]</span>
              <TagPill variant="red">Specialised Production</TagPill>
              <div className="flex items-center gap-1.5 text-xs font-mono text-stodio-muted whitespace-nowrap">
                <Factory className="w-3.5 h-3.5 text-stodio-red" />
                <span>Casting / Industrial Film</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" delay={50} duration={750}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight text-left break-words">
                Casting / Industrial Film
              </h2>
            </ScrollReveal>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-stodio-white/90 font-normal leading-relaxed text-left w-full break-words">
              <ScrollReveal variant="slide-up" duration={650}>
                <p className="text-left">
                  The third brief came from a completely different part of the group: its <strong className="text-stodio-white font-semibold">casting business</strong>.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="slide-up" duration={650}>
                <p className="text-left">
                  This was not a social-media retainer. The requirement was a focused film for presentations to prospective clients in the casting industry.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="slide-up" duration={650}>
                <p className="text-left">
                  Ārohana handled the concept, scripting and production direction through to final post-production.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="slide-up" duration={650}>
                <p className="text-stodio-muted text-left">
                  It was a different kind of brief — and a useful demonstration of how the team can move from ongoing brand communication to a focused corporate production assignment when the business requires it.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Master Section Hero Visual */}
          <ScrollReveal variant="scale-up" delay={150} duration={850}>
            <ParallaxImage speed={0.06} maxOffset={20} className="rounded-2xl sm:rounded-3xl">
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl border border-stodio-border overflow-hidden bg-stodio-card shadow-2xl group text-left">
                <Image
                  src="/images/case-studies/raysons/casting-hero.jpg"
                  alt="Raysons industrial casting foundry floor and molten metal"
                  fill
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 text-left">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono text-stodio-red uppercase tracking-wider block font-semibold text-left">
                      Section Hero Frame · Industrial Casting Facility
                    </span>
                    <p className="text-xs sm:text-sm text-white font-medium text-left break-words">
                      High-heat foundry operations and molten metal casting — captured with authentic cinematic precision.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-white/90 bg-black/60 px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full border border-white/20 backdrop-blur-md whitespace-nowrap self-start sm:self-auto">
                    B2B Client Presentation Master
                  </span>
                </div>
              </div>
            </ParallaxImage>
          </ScrollReveal>

          {/* Stills Gallery */}
          <div className="space-y-4 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-stodio-muted uppercase tracking-wider">
                Production Stills · Foundry, Metallurgical Workflow & Facility Scale
              </span>
              <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap">
                4 Film Stills
              </span>
            </div>

            <StaggerContainer staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  src: '/images/case-studies/raysons/casting-1.jpg',
                  title: 'Furnace Operations',
                  caption: 'High-temperature induction melting and foundry floor safety workflows.',
                },
                {
                  src: '/images/case-studies/raysons/casting-2.jpg',
                  title: 'Precision Machining',
                  caption: 'Engineering tolerance, metallurgical inspection, and export compliance.',
                },
                {
                  src: '/images/case-studies/raysons/casting-3.jpg',
                  title: 'Plant Operations',
                  caption: 'Factory scale documentation engineered for industrial buyer presentations.',
                },
                {
                  src: '/images/case-studies/raysons/casting-4.jpg',
                  title: 'Post-Production',
                  caption: 'Broadcast-grade color grading, sound engineering, and presentation edit.',
                },
              ].map((item, idx) => (
                <StaggerItem key={idx} index={idx}>
                  <div className="group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-stodio-card border border-stodio-border hover:border-stodio-red/50 hover:-translate-y-1.5 transition-all duration-400 ease-editorial shadow-card h-full text-left">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stodio-surface">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-black/75 text-white px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex items-center text-left">
                      <p className="text-xs text-stodio-muted leading-relaxed font-mono group-hover:text-stodio-white transition-colors text-left w-full break-words">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 7. WHAT THIS PROJECT SHOWS */}
      <section className="py-14 sm:py-20 md:py-32 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10 sm:space-y-16 text-left">
          <div className="text-left w-full space-y-3 sm:space-y-4">
            <ScrollReveal variant="slide-up" duration={700} className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono text-stodio-red font-semibold whitespace-nowrap shrink-0">[ 05 ]</span>
              <TagPill variant="red">What This Project Shows</TagPill>
            </ScrollReveal>

            <ScrollReveal variant="slide-up" delay={50} duration={750}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight text-left break-words">
                Strategic takeaways from multi-entity execution.
              </h2>
            </ScrollReveal>
          </div>

          <StaggerContainer staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
            {[
              {
                num: '01',
                title: 'Long-term relationships can grow beyond the original brief.',
                desc: 'Trust established in one vertical creates the confidence to tackle adjacent commercial challenges.',
              },
              {
                num: '02',
                title: 'Different businesses require different communication modes.',
                desc: 'B2B engineering demands technical rigour and operational credibility; B2C hospitality requires emotional resonance and sensory storytelling.',
              },
              {
                num: '03',
                title: 'Execution is as important as strategy.',
                desc: 'Delivering across multiple distinct verticals builds operational muscle that pure-play strategy or creative boutiques cannot replicate.',
              },
              {
                num: '04',
                title: 'A strong relationship creates deeper institutional context.',
                desc: 'Understanding the leadership mindset and group dynamics enables faster alignment and sharper strategic clarity.',
              },
            ].map((pt, idx) => (
              <StaggerItem key={idx} index={idx}>
                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-stodio-card border border-stodio-border space-y-3 sm:space-y-4 hover:border-stodio-red/50 transition-all duration-300 shadow-card h-full text-left">
                  <div className="text-xs font-mono text-stodio-red font-bold text-left whitespace-nowrap">
                    [ {pt.num} ]
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stodio-white leading-snug text-left break-words">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stodio-muted font-normal leading-relaxed text-left w-full break-words">
                    {pt.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 8. COMPACT CTA & NEXT CASE STUDY */}
      <section className="py-14 sm:py-20 md:py-32 bg-stodio-bg relative overflow-hidden text-left">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-left">
          <ScrollReveal variant="slide-up" duration={800} className="w-full rounded-2xl sm:rounded-3xl bg-stodio-surface border border-stodio-border p-6 sm:p-10 md:p-14 lg:p-16 space-y-6 sm:space-y-8 relative overflow-hidden shadow-card text-left">
            <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3">
              <TagPill variant="red">Next Step</TagPill>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight text-left w-full break-words">
              Have more than one business to communicate? Let&apos;s talk.
            </h2>

            <ScrollReveal variant="slide-up" duration={650}>
              <p className="text-sm sm:text-base md:text-lg text-stodio-muted w-full leading-relaxed text-left break-words">
                Let&apos;s start with the context of each business, not a generic template.
              </p>
            </ScrollReveal>

            <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 pt-2">
              <Button href="/contact" variant="red" size="lg" icon="arrow">
                Start a Conversation
              </Button>
              <Button href={`/work/${nextSlug}`} variant="dark" size="lg" icon="upRight">
                Next: {nextTitle}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </article>
  );
}
