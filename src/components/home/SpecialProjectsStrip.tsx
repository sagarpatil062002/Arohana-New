'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FroxenButton from '@/components/ui/FroxenButton';

const SPECIAL_PROJECTS = [
  {
    number: '01',
    title: 'SHE INITIATIVE',
    subtitle: 'Remote Health & Women Empowerment',
    location: 'High-Altitude Border Villages, Ladakh',
    image: '/images/home/strip-she.jpg',
    description: 'Bilingual health education modules and community documentary production in remote Himalayan settlements.',
    tag: 'Community Initiative',
  },
  {
    number: '02',
    title: 'OPERATION SAMPARK',
    subtitle: 'Homestay & Border Hospitality Training',
    location: 'LAC & LoC Border Corridors',
    image: '/images/home/strip-sampark.jpg',
    description: 'Practical curriculum and social video production training border residents in sustainable village tourism.',
    tag: 'Hospitality Facilitation',
  },
  {
    number: '03',
    title: 'INDIAN ARMY FILMS & DOCUMENTATION',
    subtitle: '14 Corps & Western Command Coverage',
    location: 'Northern & Western Theatres',
    image: '/images/home/strip-army.jpg',
    description: 'Cinematography, voice-over narrations, investiture documentation, and hardbound regimental publications.',
    tag: 'Documentary Production',
  },
];

export const SpecialProjectsStrip: React.FC = () => {
  return (
    <section className="relative bg-[#060607] py-28 md:py-36 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-froxen-lime" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
              04 / Institutional &amp; Special Briefs
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-[0.9] tracking-tight mb-6">
            THE WORK THAT DOESN'T FIT A{' '}
            <span className="text-froxen-lime">STANDARD AGENCY BOX</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            From remote-community initiatives in Ladakh to films and communication projects for the Indian Army, Ārohana has also worked on briefs where the environment, audience and responsibility demanded a different level of preparation.
          </p>
        </div>

        {/* 3-Image Strip Composition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {SPECIAL_PROJECTS.map((item) => (
            <Link
              key={item.title}
              href="/indian-army-projects"
              data-cursor="EXPLORE"
              className="group block relative rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] hover:border-white/25 transition-all duration-500 shadow-xl"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-editorial brightness-90 contrast-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-[#060607]/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-widest text-froxen-lime">
                  {item.tag}
                </div>

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <span className="font-mono text-xs text-neutral-400 block mb-1">
                    {item.number} / {item.location}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white tracking-tight leading-tight group-hover:text-froxen-lime transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl bg-[#0e0e11] border border-white/10">
          <div>
            <h4 className="font-display text-2xl font-bold uppercase text-white tracking-tight">
              DEDICATED DEFENCE &amp; INSTITUTIONAL PORTFOLIO
            </h4>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              Reviewed under information clearance protocols · Archival integrity &amp; verified assignments
            </p>
          </div>
          <FroxenButton href="/indian-army-projects" variant="primary">
            Explore Selected Projects
          </FroxenButton>
        </div>
      </div>
    </section>
  );
};

export default SpecialProjectsStrip;
