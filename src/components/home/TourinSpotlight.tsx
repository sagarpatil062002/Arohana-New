'use client';

import React from 'react';
import Image from 'next/image';
import FroxenButton from '@/components/ui/FroxenButton';

const TOURIN_HIGHLIGHTS = [
  {
    image: '/images/tourin/tourin-hero.jpg',
    title: 'High-Altitude Solitude',
    caption: 'Beyond the crowded tourist circuits into raw Himalayan landscapes.',
  },
  {
    image: '/images/tourin/tourin-1.jpg',
    title: 'Local Encounters & Culture',
    caption: 'Deep-rooted connections with indigenous families, kitchens and oral histories.',
  },
  {
    image: '/images/tourin/tourin-2.jpg',
    title: 'Considered Pacing',
    caption: 'Curated stays and unhurried exploration designed to truly absorb the region.',
  },
];

export const TourinSpotlight: React.FC = () => {
  return (
    <section className="relative bg-[#060607] py-28 md:py-40 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-froxen-lime" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            05 / Owned Experiential Brand
          </span>
        </div>

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white leading-[0.88] tracking-tight mb-4">
              AND THEN THERE <br />
              <span className="text-froxen-lime">IS TOURIN.</span>
            </h2>
            <p className="font-mono text-sm md:text-base text-neutral-300 uppercase tracking-widest">
              TRAVEL BEYOND THE ITINERARY — BEGINNING WITH LADAKH.
            </p>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <p className="text-neutral-400 text-sm leading-relaxed">
              An experiential travel brand built from lived experience rather than a generic destination catalogue. Designed for curious travelers who want more than a checklist of sights.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
              <span className="text-froxen-lime font-bold">15+</span>
              <span>completed bookings &amp; 20-biker expedition</span>
            </div>
          </div>
        </div>

        {/* 3-Image Photography Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {TOURIN_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              data-cursor="EXPLORE"
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] hover:border-white/25 transition-all duration-500 shadow-xl"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-editorial brightness-90 contrast-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-transparent opacity-90" />

                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <h3 className="font-display font-black text-2xl uppercase text-white tracking-tight mb-1 group-hover:text-froxen-lime transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tourin Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            EXPERIENTIAL TRAVEL ARCHITECTURE · ROOTED IN PLACE
          </span>
          <FroxenButton href="/tourin" variant="lime">
            Explore Tourin Ladakh Journeys
          </FroxenButton>
        </div>
      </div>
    </section>
  );
};

export default TourinSpotlight;
