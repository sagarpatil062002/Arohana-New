'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCmsStore } from '@/lib/cmsStore';
import { SEED_HOME_PAGE } from '@/data/seed-cms';
import { AntigravityFloat } from '@/components/motion/AntigravityFloat';
import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

interface HeroSectionProps {
  poster?: string;
  videoSrc?: string;
}

export function HeroSection({
  poster,
  videoSrc,
}: HeroSectionProps = {}) {
  const { home } = useCmsStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentHome = home || SEED_HOME_PAGE;
  const activeVideoSrc = videoSrc || currentHome.heroVideoUrl || '/videos/hero-montage.mp4';
  const activePoster = poster || currentHome.heroFallbackImage || '/images/home/hero-poster.jpg';

  return (
    <section className="hero-section relative w-full min-h-[92vh] md:min-h-[96vh] flex flex-col justify-between overflow-hidden border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
      {/* 1. Full-Screen Edge-to-Edge Background Video Layer extending beyond the content */}
      <ParallaxLayer speed={-0.12} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full transition-opacity duration-1000 ease-editorial"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scale(1.02)' : 'scale(1.08)',
            transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <video
            key={activeVideoSrc}
            src={activeVideoSrc}
            poster={activePoster}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none opacity-100"
            style={{ filter: 'brightness(0.92) contrast(1.05)' }}
          />

          {/* Cinematic Editorial Ambient Overlay */}
          <div className="absolute inset-0 bg-black/[0.32]" />

          {/* Gentle Bottom Fade */}
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none" />
        </div>
      </ParallaxLayer>

      {/* 2. Main Foreground Hero Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between flex-1 space-y-8 sm:space-y-10 my-auto">
        {/* Top Row: Floating High-Contrast Badges */}
        <ScrollDrift direction="up" distance={30} duration={1.1} delay={0.1}>
          <div className="hero-badges flex flex-wrap items-center justify-start gap-4 sm:gap-6">
            <AntigravityFloat amplitude={3} duration={6} delay={0}>
              <span className="badge-item whitespace-nowrap text-[10px] sm:text-xs">
                <svg
                  className="w-3 sm:w-3.5 h-3 sm:h-3.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.25 2.5H3.75C3.06 2.5 2.5 3.06 2.5 3.75V16.25C2.5 16.94 3.06 17.5 3.75 17.5H16.25C16.94 17.5 17.5 16.94 17.5 16.25V3.75C17.5 3.06 16.94 2.5 16.25 2.5ZM13.125 10.625H10.625V13.125C10.625 13.47 10.345 13.75 10 13.75C9.655 13.75 9.375 13.47 9.375 13.125V10.625H6.875C6.53 10.625 6.25 10.345 6.25 10C6.25 9.655 6.53 9.375 6.875 9.375H9.375V6.875C9.375 6.53 9.655 6.25 10 6.25C10.345 6.25 10.625 6.53 10.625 6.875V9.375H13.125C13.47 9.375 13.75 9.655 13.75 10C13.75 10.345 13.47 10.625 13.125 10.625Z"
                    fill="#DE322D"
                  />
                </svg>
                <span>{currentHome.heroTagline || 'BRANDS, BUSINESSES & EXPERIENCES'}</span>
              </span>
            </AntigravityFloat>

            <AntigravityFloat amplitude={4} duration={6.5} delay={0.3}>
              <span className="badge-item middle-badge whitespace-nowrap text-[10px] sm:text-xs">
                + est. YR2020
              </span>
            </AntigravityFloat>

            <AntigravityFloat amplitude={3} duration={7} delay={0.6}>
              <span className="badge-item hidden sm:inline-flex whitespace-nowrap text-[10px] sm:text-xs">
                + SYSTEM: ĀROHANA
              </span>
            </AntigravityFloat>
          </div>
        </ScrollDrift>

        {/* Center Content: Heading, Description, CTA */}
        <div className="w-full space-y-5 sm:space-y-6 md:space-y-7 text-left">
          <ScrollDrift direction="up" distance={40} duration={1.1} delay={0.15}>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.12] sm:leading-[1.05] text-balance text-left w-full break-words max-w-5xl"
              style={{
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9)',
              }}
            >
              {currentHome.heroHeadline || SEED_HOME_PAGE.heroHeadline}
            </h1>
          </ScrollDrift>

          <ScrollDrift direction="up" distance={35} duration={1.1} delay={0.25}>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 font-normal leading-relaxed w-full max-w-3xl text-left break-words"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9)',
              }}
            >
              {currentHome.heroDescription || SEED_HOME_PAGE.heroDescription}
            </p>
          </ScrollDrift>

          <ScrollDrift direction="up" distance={30} duration={1.1} delay={0.35}>
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-start gap-4">
              <Link
                href={currentHome.heroPrimaryCtaLink || '/contact'}
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#DE322D] hover:bg-[#C5221E] text-white font-medium text-xs sm:text-sm md:text-base tracking-tight shadow-glow hover:shadow-lg transition-all duration-300 ease-editorial active:scale-95 border border-white/20"
              >
                <span>{currentHome.heroPrimaryCtaText || 'Start a conversation'}</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>
            </div>
          </ScrollDrift>
        </div>

        {/* 3. MODERN EDITORIAL LOWER HERO TREATMENT (Areas & Visual Themes) */}
        <ScrollDrift direction="up" distance={20} duration={1.1} delay={0.35}>
          <div className="pt-4 border-t border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-white/90 uppercase tracking-wider text-left">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-1.5">
                <span className="text-[#DE322D] font-bold">01</span>
                <span className="text-white font-semibold">Hospitality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#DE322D] font-bold">02</span>
                <span className="text-white font-semibold">Industry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#DE322D] font-bold">03</span>
                <span className="text-white font-semibold">Defence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#DE322D] font-bold">04</span>
                <span className="text-white font-semibold">Travel</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#DE322D] animate-pulse flex-shrink-0" />
              <span className="normal-case text-[11px] sm:text-xs font-normal">
                Ladakh · Foundries · Dining · Films
              </span>
            </div>
          </div>
        </ScrollDrift>
      </div>
    </section>
  );
}

