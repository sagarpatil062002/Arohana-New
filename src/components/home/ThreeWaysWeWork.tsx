'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FroxenButton from '@/components/ui/FroxenButton';

const PILLARS = [
  {
    index: '01',
    title: 'DIGITAL BRAND GROWTH',
    description:
      'Brand and communication strategy, social ecosystems, content, creative direction, production, performance and platform execution for businesses wanting genuine market presence.',
    tags: ['Brand Strategy', 'Creative Direction', 'Social Ecosystems', 'Performance Ads', 'SEO & Web'],
    image: '/images/services/digital-growth.jpg',
    href: '/services',
  },
  {
    index: '02',
    title: 'HOSPITALITY CONSULTING',
    description:
      'Restaurant concept, menu development, food cost, pricing, SOPs, staffing, kitchen control, revenue optimisation and marketing — grounded in actual industry experience.',
    tags: ['Concept Architecture', 'Menu Engineering', 'Kitchen Systems & SOPs', 'Staff Training', 'OTA & Revenue'],
    image: '/images/services/hospitality-consulting.jpg',
    href: '/services',
  },
  {
    index: '03',
    title: 'CONTENT & BRAND PRODUCTION',
    description:
      'Films, documentaries, corporate/institutional videos, campaign content, scripting, shoots and post-production for briefs that demand cinematic scale and cultural depth.',
    tags: ['Brand Films', 'Documentaries', 'Institutional Coverage', 'Cinematography', 'Sound Mastering'],
    image: '/images/services/content-production.jpg',
    href: '/services',
  },
];

export const ThreeWaysWeWork: React.FC = () => {
  const [activeService, setActiveService] = useState<number>(0);

  return (
    <section className="relative bg-[#060607] py-28 md:py-40 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-froxen-lime" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                02 / Core Capabilities
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-[0.9] tracking-tight">
              THREE WAYS <span className="text-neutral-500">WE WORK</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            Interactive service architecture. Hover or select to reveal capabilities, approach, and visual production context.
          </p>
        </div>

        {/* Interactive Service Accordion List */}
        <div className="space-y-4">
          {PILLARS.map((service, idx) => {
            const isActive = activeService === idx;
            return (
              <div
                key={service.index}
                onMouseEnter={() => setActiveService(idx)}
                className={`group relative rounded-3xl transition-all duration-500 border ${
                  isActive
                    ? 'bg-[#0e0e11] border-white/20 shadow-2xl'
                    : 'bg-transparent border-white/8 hover:border-white/15'
                } p-6 sm:p-8 md:p-10 cursor-pointer`}
              >
                {/* Top Row: Index + Title + Arrow */}
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-baseline gap-4 sm:gap-8 md:gap-12">
                    <span
                      className={`font-mono text-sm sm:text-base font-bold transition-colors duration-300 ${
                        isActive ? 'text-froxen-lime' : 'text-neutral-600 group-hover:text-neutral-400'
                      }`}
                    >
                      {service.index}
                    </span>
                    <h3
                      className={`font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-white translate-x-2'
                          : 'text-neutral-400 group-hover:text-neutral-200'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                      isActive
                        ? 'bg-froxen-lime text-black border-froxen-lime rotate-45'
                        : 'border-white/10 text-neutral-500 group-hover:border-white/30 group-hover:text-white'
                    }`}
                  >
                    <span className="text-lg font-bold">↗</span>
                  </div>
                </div>

                {/* Expanded Interactive Body */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 mt-6 border-t border-white/10 items-center">
                        {/* Text Description & Tags */}
                        <div className="lg:col-span-7 space-y-6">
                          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
                            {service.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/[0.04] border border-white/10 text-neutral-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="pt-2">
                            <FroxenButton href={service.href} variant="outline">
                              View Capabilities
                            </FroxenButton>
                          </div>
                        </div>

                        {/* Floating Thumbnail Preview */}
                        <div className="lg:col-span-5">
                          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-xl group/thumb">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover/thumb:scale-105"
                              sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-4 text-[11px] font-mono uppercase tracking-widest text-froxen-lime">
                              PROVEN DISCIPLINE
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout & Direct Link */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-neutral-400 uppercase tracking-widest">
          <span>TAILORED AROUND WHAT THE BUSINESS NEEDS — NOT FIXED PACKAGES</span>
          <Link href="/services" className="text-froxen-lime hover:underline">
            EXPLORE FULL SERVICES DIRECTORY →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThreeWaysWeWork;
