'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FroxenButton from '@/components/ui/FroxenButton';
import { PROJECT_DIRECTORY, SECTORS } from '@/data/projects';

const FEATURED_STUDIES = [
  {
    number: '01',
    slug: 'raysons-group',
    title: 'RAYSONS GROUP',
    headline: 'One group. Multiple businesses. Different communication needs.',
    description:
      'Long-term digital partnership across industrial casting, real estate, and hospitality, alongside corporate film production.',
    tags: ['Industrial & Real Estate', 'Brand Systems', 'Corporate Film'],
    image: '/images/case-studies/raysons/casting-hero.jpg',
    layout: 'large',
  },
  {
    number: '02',
    slug: 'loom-crafts',
    title: 'LOOM CRAFTS',
    headline: 'One brand, two very different buying journeys.',
    description:
      'Designing dual luxury conversion paths across outdoor living systems and architectural modular prefab construction.',
    tags: ['Outdoor Living', 'Modular Prefab', 'Lead Generation'],
    image: '/images/case-studies/loom/loom-hero.jpg',
    layout: 'offset',
  },
  {
    number: '03',
    slug: 'picturetime',
    title: 'PICTURETIME',
    headline: 'From cinema promotion to a broader brand story.',
    description:
      'Expanding mobile inflatable digital theatres from local screening promotions to national cultural narrative and film festival coverage.',
    tags: ['Entertainment & Culture', 'Festival Content', 'National Strategy'],
    image: '/images/case-studies/picturetime/picturetime-hero.jpg',
    layout: 'fullwidth',
  },
  {
    number: '04',
    slug: 'she',
    title: 'SHE INITIATIVE',
    headline: 'A community initiative built around health, dignity and sustainability.',
    description:
      'Field-level health education, community facilitation and sensitive documentary storytelling in high-altitude remote villages of Ladakh.',
    tags: ['Institutional / Community', 'Field Health', 'Documentary Film'],
    image: '/images/case-studies/she/she-hero.jpg',
    layout: 'editorial',
  },
  {
    number: '05',
    slug: 'misu',
    title: 'MISU',
    headline: 'Hospitality thinking that goes beyond the dining room.',
    description:
      'Comprehensive restaurant consulting covering concept development, food costing, kitchen SOPs, staff coaching, and experiential digital marketing.',
    tags: ['Hospitality Consulting', 'Kitchen SOPs', 'Menu Margin Engineering'],
    image: '/images/case-studies/misu/misu-hero.jpg',
    layout: 'compact',
  },
  {
    number: '06',
    slug: 'rr-skins',
    title: 'RR SKINS',
    headline: 'Making a specialised healthcare offering easier to understand and trust.',
    description:
      'Transforming clinical dermatology and trichology into an empathetic, education-first brand experience with patient trust.',
    tags: ['Healthcare', 'Patient Education', 'Conversion UX'],
    image: '/images/case-studies/rrskins/rrskins-hero.jpg',
    layout: 'closing',
  },
];

export default function WorkPage() {
  const [activeSector, setActiveSector] = useState<string>('All');

  const filteredProjects =
    activeSector === 'All'
      ? PROJECT_DIRECTORY
      : PROJECT_DIRECTORY.filter((p) => p.sector === activeSector);

  return (
    <div className="bg-[#060607] min-h-screen text-[#ECECEF] pt-32 pb-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="pulse-dot" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            Portfolio &amp; Case Studies
          </span>
        </div>

        {/* Hero */}
        <div className="mb-24 pb-12 border-b border-white/10">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-white leading-[0.86] tracking-tight mb-8">
            The work is <br />
            <span className="text-froxen-lime">the proof.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal">
            A selection of businesses and projects that show how Ārohana thinks, creates and executes across very different environments.
          </p>
        </div>

        {/* FEATURED CASE STUDIES EDITORIAL SHOWCASE */}
        <div className="space-y-24 md:space-y-36 mb-36">
          {FEATURED_STUDIES.map((project, idx) => {
            const isEven = idx % 2 === 0;

            if (project.layout === 'fullwidth') {
              return (
                <div
                  key={project.slug}
                  data-cursor="VIEW"
                  className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] hover:border-white/25 transition-all duration-500 shadow-2xl"
                >
                  <Link href={`/work/${project.slug}`} className="block">
                    <div className="relative aspect-[16/9] md:aspect-[24/10] w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-editorial brightness-90"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-[#060607]/40 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                          <span className="text-xs font-mono uppercase tracking-widest text-froxen-lime block mb-2">
                            {project.number} / FEATURED CASE STUDY
                          </span>
                          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight leading-[0.9] mb-3 group-hover:text-froxen-lime transition-colors">
                            {project.title}
                          </h2>
                          <p className="text-neutral-300 text-sm sm:text-base font-normal line-clamp-2">
                            {project.headline}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-froxen-lime group-hover:text-black group-hover:border-froxen-lime transition-all">
                          <span className="text-lg font-bold">↗</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }

            return (
              <div
                key={project.slug}
                data-cursor="VIEW"
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Link href={`/work/${project.slug}`} className="block">
                    <div className="relative aspect-[16/11] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] group-hover:border-white/25 transition-all duration-500 shadow-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-editorial brightness-95"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                        {project.number} / CASE STUDY
                      </div>
                    </div>
                  </Link>
                </div>

                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
                    {project.tags[0]}
                  </span>

                  <Link href={`/work/${project.slug}`} className="block group-hover:text-froxen-lime transition-colors">
                    <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-[0.9] mb-3">
                      {project.title}
                    </h2>
                    <p className="text-neutral-200 font-medium text-lg leading-snug">
                      {project.headline}
                    </p>
                  </Link>

                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/8 text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <FroxenButton href={`/work/${project.slug}`} variant="outline">
                      View Case Study
                    </FroxenButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CLIENT & PROJECT DIRECTORY */}
        <section className="pt-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
                COMPLETE INDEX
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white tracking-tight leading-[0.9]">
                CLIENT &amp; PROJECT DIRECTORY
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest max-w-sm">
              ADDITIONAL SECTOR WORK &amp; CLIENTS SERVED ACROSS INDIA
            </p>
          </div>

          {/* Sector Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setActiveSector('All')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeSector === 'All'
                  ? 'bg-froxen-lime text-black font-bold'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/8'
              }`}
            >
              All Sectors ({PROJECT_DIRECTORY.length})
            </button>
            {SECTORS.map((sector) => {
              const count = PROJECT_DIRECTORY.filter((p) => p.sector === sector).length;
              return (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    activeSector === sector
                      ? 'bg-froxen-lime text-black font-bold'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/8'
                  }`}
                >
                  {sector} ({count})
                </button>
              );
            })}
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((item) => (
              <div
                key={item.id}
                className="group p-6 rounded-2xl bg-[#0e0e11] border border-white/8 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-neutral-900 border border-white/5">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-froxen-lime">
                      {item.sector}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl uppercase text-white tracking-tight mb-2 group-hover:text-froxen-lime transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {item.caseStudySlug && (
                    <Link
                      href={`/work/${item.caseStudySlug}`}
                      className="text-xs font-mono text-froxen-lime hover:underline flex items-center gap-1"
                    >
                      <span>Case Study</span>
                      <span>↗</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <div className="mt-32 p-8 sm:p-14 rounded-3xl bg-[#0e0e11] border border-white/10 text-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight mb-4">
            WANT TO SEE WHAT THIS COULD LOOK LIKE <br />
            <span className="text-froxen-lime">FOR YOUR BUSINESS?</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mb-8 font-normal">
            Let's start with the business context and where you are trying to go — not a generic proposal template.
          </p>
          <FroxenButton href="/contact" variant="lime">
            Start a Conversation
          </FroxenButton>
        </div>
      </div>
    </div>
  );
}
