'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FroxenButton from '@/components/ui/FroxenButton';

export const PointOfViewSection: React.FC = () => {
  return (
    <section className="relative bg-[#060607] py-24 md:py-36 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Pill */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-froxen-lime" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            01 / A Point of View
          </span>
        </div>

        {/* Asymmetrical Grid: Large Typography & Narrative (Left) + Editorial Image & Specs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Huge Headline & Strategic Context */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <div>
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white leading-[0.9] tracking-tight">
                Some businesses need <span className="text-neutral-500">better marketing.</span> Others need a{' '}
                <span className="text-froxen-lime">better way of thinking</span> about the business itself.
              </h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
              <p>
                Ārohana works where those two things meet. We bring the commercial context, sector understanding and creative execution needed to move from an idea to something people can actually see, understand and act on.
              </p>
              <p className="text-neutral-400 text-sm">
                A business can have a great-looking brand and still have a problem underneath it. And sometimes what looks like a marketing problem isn't a marketing problem at all.
              </p>
            </div>

            {/* Quick Metrics / Distinctive Pillars in Froxen styling */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="froxen-card p-5 rounded-2xl">
                <span className="font-display text-3xl font-black text-white block mb-1">03</span>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-1">Core Pillars</span>
                <p className="text-xs text-neutral-500">Digital Growth, Hospitality, Production</p>
              </div>

              <div className="froxen-card p-5 rounded-2xl">
                <span className="font-display text-3xl font-black text-froxen-lime block mb-1">06+</span>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-1">Industries</span>
                <p className="text-xs text-neutral-500">F&amp;B, Built Environment, Defence, Travel</p>
              </div>

              <div className="froxen-card p-5 rounded-2xl">
                <span className="font-display text-3xl font-black text-white block mb-1">100%</span>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-1">Real Execution</span>
                <p className="text-xs text-neutral-500">On-ground accountability, zero fluff</p>
              </div>
            </div>

            <div className="pt-2">
              <FroxenButton href="/about" variant="primary">
                Read the Founder Story
              </FroxenButton>
            </div>
          </div>

          {/* Right Column: Editorial Portrait of Madhura on-ground */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] group shadow-2xl">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/home/madhura-editorial.jpg"
                  alt="Madhura Hawal on-ground directing production in Ladakh"
                  fill
                  className="object-cover object-center grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-editorial"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-transparent opacity-80" />
              </div>

              {/* Editorial Caption Box */}
              <div className="p-6 relative z-10 -mt-16 bg-[#0e0e11]/90 backdrop-blur-md border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-froxen-lime">
                    ON-GROUND EXECUTION
                  </span>
                  <span className="text-xs font-mono text-neutral-500">LADAKH SECTOR</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  "You cannot create meaningful communication without understanding the people, the environment and the reality behind it."
                </p>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>MADHURA HAWAL</span>
                  <span>FOUNDER, ĀROHANA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PointOfViewSection;
