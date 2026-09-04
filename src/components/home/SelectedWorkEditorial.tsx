'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FroxenButton from '@/components/ui/FroxenButton';

interface FeaturedProject {
  number: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  client: string;
  year: string;
  impact: string;
  tags: string[];
  image: string;
  layout: 'large' | 'offset' | 'fullwidth' | 'editorial' | 'compact' | 'closing';
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    number: '01',
    slug: 'raysons-group',
    title: 'RAYSONS GROUP',
    headline: 'One group. Multiple businesses. Different communication needs.',
    description:
      'Unified brand architecture, digital growth systems and corporate video production for a diverse multi-vertical industrial and real estate conglomerate.',
    client: 'Raysons Group',
    year: '2022 — Present',
    impact: 'Multi-Brand Scale',
    tags: ['Brand Architecture', 'Digital Ecosystem', 'Corporate Film', 'Industrial & Real Estate'],
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
    client: 'Loom Crafts',
    year: '2023',
    impact: 'Dual Funnel Strategy',
    tags: ['Luxury Outdoor Living', 'Modular Prefab', 'Performance Ads', 'E-Commerce UX'],
    image: '/images/case-studies/loom/loom-hero.jpg',
    layout: 'offset',
  },
  {
    number: '03',
    slug: 'picturetime',
    title: 'PICTURETIME',
    headline: 'From cinema promotion to a broader brand story.',
    description:
      'Expanding mobile inflatable digital theatres from local screening promotions to national cultural narrative and international film festival coverage.',
    client: 'PictureTime Digiplex',
    year: '2021 — 2024',
    impact: 'National Reach',
    tags: ['Cultural Content', 'IFFI Coverage', 'Social Strategy', 'On-Ground Documentaries'],
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
    client: 'SHE Foundation & Defence Sectors',
    year: '2023 — 2024',
    impact: 'Community Impact',
    tags: ['Field Health Education', 'Documentary Film', 'Remote Facilitation', 'Bilingual Campaign'],
    image: '/images/case-studies/she/she-hero.jpg',
    layout: 'editorial',
  },
  {
    number: '05',
    slug: 'misu',
    title: 'MISU HOSPITALITY',
    headline: 'Hospitality thinking that goes beyond the dining room.',
    description:
      'Comprehensive restaurant consulting covering concept development, food costing, kitchen SOPs, staff coaching, and experiential digital marketing.',
    client: 'Misu Pan Asian',
    year: '2022',
    impact: 'F&B Operational Rigor',
    tags: ['Concept & Menu Architecture', 'Kitchen SOPs', 'Food Cost Control', 'Digital Marketing'],
    image: '/images/case-studies/misu/misu-hero.jpg',
    layout: 'compact',
  },
  {
    number: '06',
    slug: 'rr-skins',
    title: 'RR SKINS',
    headline: 'Making a specialised healthcare offering easier to understand and trust.',
    description:
      'Transforming clinical dermatology and trichology into an empathetic, education-first brand experience with seamless appointment conversion.',
    client: 'RR Skins Dermatology Clinic',
    year: '2023 — 2024',
    impact: '+240% Consultation Growth',
    tags: ['Patient Trust', 'Medical Social Strategy', 'Content Education', 'Conversion UX'],
    image: '/images/case-studies/rrskins/rrskins-hero.jpg',
    layout: 'closing',
  },
];

export const SelectedWorkEditorial: React.FC = () => {
  return (
    <section className="relative bg-[#060607] py-28 md:py-40 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-froxen-lime" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                03 / Featured Case Studies
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white leading-[0.88] tracking-tight">
              SELECTED WORK THAT <br />
              <span className="text-froxen-lime">DELIVERS IMPACT</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            A few businesses we've helped shape, communicate or build. Not logos or generic cards — but deep case studies with real outcomes.
          </p>
        </div>

        {/* Dynamic Froxen Editorial Portfolio Showcase */}
        <div className="space-y-24 md:space-y-36">
          {FEATURED_PROJECTS.map((project, idx) => {
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
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-editorial brightness-90 contrast-105"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-[#060607]/40 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-14 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                          <div className="flex items-center gap-3 text-froxen-lime font-mono text-xs uppercase tracking-widest mb-3">
                            <span>{project.number}</span>
                            <span>—</span>
                            <span>{project.impact}</span>
                          </div>
                          <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white tracking-tight leading-[0.9] mb-3 group-hover:text-froxen-lime transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-neutral-300 text-sm sm:text-base font-normal line-clamp-2">
                            {project.headline}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-froxen-lime group-hover:text-black group-hover:border-froxen-lime transition-all">
                            <span className="text-lg font-bold">↗</span>
                          </div>
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
                {/* Visual Block (Alternating Column Order) */}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                      {/* Floating Badge */}
                      <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                        {project.number} / CASE STUDY
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Narrative & Metadata Block */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime">
                      {project.client}
                    </span>
                    <span className="text-neutral-600">·</span>
                    <span className="font-mono text-xs text-neutral-400">{project.year}</span>
                  </div>

                  <Link href={`/work/${project.slug}`} className="block group-hover:text-froxen-lime transition-colors">
                    <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-tight leading-[0.95] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-neutral-300 font-medium text-lg leading-snug">
                      {project.headline}
                    </p>
                  </Link>

                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Specs Table */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/8 text-xs font-mono">
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Focus</span>
                      <span className="text-neutral-200 font-semibold">{project.impact}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider mb-0.5">Discipline</span>
                      <span className="text-neutral-200">{project.tags[0]}</span>
                    </div>
                  </div>

                  {/* Tag Pills */}
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

        {/* View All Work CTA */}
        <div className="mt-28 text-center">
          <FroxenButton href="/work" variant="lime" className="px-10 py-4 text-base">
            View All Projects &amp; Complete Directory
          </FroxenButton>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorkEditorial;
