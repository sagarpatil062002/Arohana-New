'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FroxenButton from '@/components/ui/FroxenButton';
import {
  ARMY_TIMELINE_PROJECTS,
  FIELD_NOTES_PILLARS,
  FIELD_PHOTO_ESSAY_GALLERY,
  ARMY_PAGE_PROOF_METRICS,
} from '@/data/indian-army-projects';

export default function IndianArmyProjectsPage() {
  const [activeProjectId, setActiveProjectId] = useState<string>(
    ARMY_TIMELINE_PROJECTS[0].id
  );

  const activeProject =
    ARMY_TIMELINE_PROJECTS.find((p) => p.id === activeProjectId) ||
    ARMY_TIMELINE_PROJECTS[0];

  return (
    <div className="bg-[#060607] min-h-screen text-[#ECECEF] pt-32 pb-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow & Status */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-froxen-lime" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
              Institutional &amp; Defence Portfolio · Documented Assignments
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-widest text-neutral-500 border border-white/10 px-3 py-1 rounded-full">
            PROTOCOL COMPLIANT
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-24 pb-16 border-b border-white/10">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white leading-[0.88] tracking-tight mb-8 max-w-5xl">
            THE WORK THAT DOESN'T FIT A <br />
            <span className="text-froxen-lime">STANDARD AGENCY BOX.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl leading-relaxed font-normal">
            From remote-community initiatives in Ladakh to films, books and communication projects for the Indian Army, Ārohana has worked on briefs where the environment, audience and responsibility demanded a different level of preparation.
          </p>

          {/* Key Facts / Clearance Note */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-white/10 text-xs font-mono">
            {ARMY_PAGE_PROOF_METRICS.map((metric, mIdx) => (
              <div key={mIdx}>
                <span className="font-display font-black text-3xl sm:text-4xl text-froxen-lime block mb-1">
                  {metric.value}
                </span>
                <span className="text-white block uppercase tracking-wider mb-0.5">
                  {metric.label}
                </span>
                <span className="text-neutral-500 text-[11px]">{metric.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DOCUMENTARY PROJECT SHOWCASE */}
        <div className="space-y-32 mb-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-1">
                CINEMATIC FIELD RECORDS
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
                SELECTED ENGAGEMENTS
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest max-w-xs">
              CIVIC-MILITARY STORYTELLING, CEREMONIAL DOCUMENTATION &amp; HARD BOUND VOLUMES
            </p>
          </div>

          {/* Asymmetrical Project Entries */}
          {ARMY_TIMELINE_PROJECTS.map((proj, idx) => {
            const firstVisual = proj.visuals?.[0];
            const isEven = idx % 2 === 0;

            if (proj.isTextOnly) {
              return (
                <div
                  key={proj.id}
                  className="p-8 sm:p-12 rounded-3xl bg-[#0b0b0e] border border-white/10 relative overflow-hidden"
                >
                  <div className="max-w-2xl">
                    <span className="font-mono text-xs text-froxen-lime uppercase tracking-widest block mb-2">
                      {proj.indexNumber} / {proj.organization}
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight mb-3">
                      {proj.title}
                    </h3>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                      {proj.description}
                    </p>
                    {proj.disclosureNotice && (
                      <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest border-t border-white/5 pt-3">
                        RESTRICTION PROTOCOL: {proj.disclosureNotice}
                      </p>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={proj.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Visual Block */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {firstVisual && (
                    <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] group shadow-2xl">
                      <Image
                        src={firstVisual.src}
                        alt={firstVisual.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-editorial brightness-90 contrast-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-widest text-froxen-lime">
                        {proj.indexNumber} / FIELD STILL
                      </div>
                      <div className="absolute bottom-4 left-6 right-6 text-xs font-mono text-neutral-300 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                        {firstVisual.caption}
                      </div>
                    </div>
                  )}
                </div>

                {/* Narrative Block */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    <span>{proj.organization}</span>
                    <span>·</span>
                    <span>{proj.metadata.location}</span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-tight leading-[0.95]">
                    {proj.title}
                  </h3>

                  <p className="text-neutral-300 font-medium text-base leading-snug">
                    {proj.subtitle}
                  </p>

                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Scope Details */}
                  {proj.expandableSections && (
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-2 text-xs font-mono text-neutral-300">
                      <div>
                        <span className="text-froxen-lime font-bold">SCOPE: </span>
                        {proj.expandableSections.scope}
                      </div>
                      <div>
                        <span className="text-neutral-400 font-bold">APPROACH: </span>
                        {proj.expandableSections.creativeApproach}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/8 text-neutral-400 uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FIELD NOTES PILLARS */}
        <section className="pt-24 border-t border-white/10 mb-36">
          <div className="max-w-3xl mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
              DISCIPLINE &amp; ENVIRONMENT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-[0.9]">
              FIELD EXECUTION PRINCIPLES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FIELD_NOTES_PILLARS.map((p) => (
              <div
                key={p.number}
                className="p-8 rounded-3xl bg-[#0e0e11] border border-white/8 hover:border-froxen-lime/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-display font-black text-4xl text-froxen-lime block mb-4">
                    {p.number}
                  </span>
                  <h3 className="font-display font-bold text-2xl uppercase text-white tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mb-4">
                    {p.subtitle}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PHOTO ESSAY ESSENTIALS */}
        <section className="pt-20 border-t border-white/10 mb-32">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
              Visual Archive
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-[0.9]">
              FIELD PHOTO ESSAY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FIELD_PHOTO_ESSAY_GALLERY.map((img) => (
              <div
                key={img.id}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 border-t border-white/5">
                  <h4 className="font-display font-bold text-lg uppercase text-white mb-1">
                    {img.title}
                  </h4>
                  <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING BANNER */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#09090c] border border-white/10 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-froxen-lime block mb-3">
            THE ĀROHANA STANDARD
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight mb-4 max-w-2xl mx-auto leading-tight">
            DIFFERENT ENVIRONMENTS. DIFFERENT AUDIENCES. DIFFERENT BRIEFS.
          </h2>
          <p className="text-neutral-300 text-sm max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            The work changes with the context. The standard of thinking and execution does not.
          </p>
          <FroxenButton href="/contact" variant="lime">
            Start a Conversation
          </FroxenButton>
        </div>
      </div>
    </div>
  );
}
