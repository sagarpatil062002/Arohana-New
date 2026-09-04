import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FroxenButton from '@/components/ui/FroxenButton';
import { CASE_STUDIES } from '@/data/case-studies';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({
    slug: c.slug,
  }));
}

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = CASE_STUDIES.find((c) => c.slug === params.slug);

  if (!caseStudy) {
    return notFound();
  }

  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === params.slug);
  const nextCaseStudy =
    currentIndex >= 0 && currentIndex < CASE_STUDIES.length - 1
      ? CASE_STUDIES[currentIndex + 1]
      : CASE_STUDIES[0];

  return (
    <div className="bg-[#060607] min-h-screen text-[#ECECEF] pt-32 pb-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-froxen-lime transition-colors"
          >
            <span>←</span>
            <span>Back to All Work</span>
          </Link>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            CASE STUDY 0{currentIndex + 1} / 0{CASE_STUDIES.length}
          </div>
        </div>

        {/* HERO */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-froxen-lime block mb-3">
            {caseStudy.sector}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white leading-[0.88] tracking-tight mb-6">
            {caseStudy.title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-medium max-w-4xl leading-snug">
            {caseStudy.subtitle}
          </p>
        </div>

        {/* HERO VISUAL */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] mb-16 shadow-2xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              className="object-cover object-center brightness-95"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-transparent opacity-60" />
            {caseStudy.heroImageCaption && (
              <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8 text-xs font-mono text-neutral-300 max-w-xl bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                {caseStudy.heroImageCaption}
              </div>
            )}
          </div>
        </div>

        {/* SNAPSHOT BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-[#0e0e11] border border-white/10 mb-24 text-xs font-mono">
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider mb-1">Sector</span>
            <span className="text-neutral-200 font-semibold">{caseStudy.snapshot.sector}</span>
          </div>
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider mb-1">Location</span>
            <span className="text-neutral-200">{caseStudy.snapshot.location}</span>
          </div>
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider mb-1">Engagement</span>
            <span className="text-neutral-200">{caseStudy.snapshot.engagementType}</span>
          </div>
          <div>
            <span className="text-neutral-500 block uppercase tracking-wider mb-1">Duration</span>
            <span className="text-froxen-lime font-bold">{caseStudy.snapshot.duration}</span>
          </div>
        </div>

        {/* THE SITUATION & THE REAL CHALLENGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-24 border-b border-white/10 mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-froxen-lime" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                The Situation
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              WHAT THE BUSINESS WAS DEALING WITH
            </h2>
            <div className="space-y-4 text-neutral-300 text-base leading-relaxed font-normal">
              {caseStudy.situation.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-froxen-lime" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                The Real Challenge
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              WHAT NEEDED TO CHANGE AND WHY
            </h2>
            <div className="space-y-4 text-neutral-300 text-base leading-relaxed font-normal">
              {caseStudy.realChallenge.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* THE THINKING (INTELLECTUAL VALUE) */}
        <div className="pb-24 border-b border-white/10 mb-24">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
              Strategic Blueprint
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase text-white tracking-tight leading-[0.9]">
              THE THINKING
            </h2>
            <p className="text-sm text-neutral-400 mt-2 font-mono">
              KEY DECISIONS AND STRATEGIC CHOICES MADE BY ĀROHANA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.thinking.map((decision, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0e0e11] border border-white/8 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-froxen-lime block mb-4">
                    DECISION 0{idx + 1}
                  </span>
                  <p className="text-neutral-200 text-base leading-relaxed font-normal">
                    {decision}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* THE WORK (GROUPED WORKSTREAMS) */}
        <div className="pb-24 border-b border-white/10 mb-24">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
              Execution Architecture
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase text-white tracking-tight leading-[0.9]">
              THE WORK
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudy.work.map((workstream, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0d0d10] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-neutral-500 block mb-2">
                    WORKSTREAM 0{idx + 1}
                  </span>
                  <h3 className="font-display font-bold text-2xl uppercase text-white tracking-tight mb-3">
                    {workstream.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-normal">
                    {workstream.description}
                  </p>
                </div>

                {workstream.bullets && workstream.bullets.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <ul className="space-y-2">
                      {workstream.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <span className="text-froxen-lime mt-0.5 font-bold">✦</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PROOF & VERIFIED OUTCOMES */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0e0e11] border border-white/10 mb-28">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-froxen-lime" />
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime">
                Verified Proof &amp; Outcome
              </span>
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-tight mb-6">
              MEASURABLE BUSINESS SHIFT
            </h3>
            <p className="text-lg sm:text-xl text-neutral-200 leading-relaxed font-normal mb-6">
              {caseStudy.proof.verifiedText}
            </p>
            {caseStudy.proof.metricsNote && (
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                VERIFICATION NOTE: {caseStudy.proof.metricsNote}
              </p>
            )}
          </div>
        </div>

        {/* VISUAL GALLERY */}
        {caseStudy.gallery && caseStudy.gallery.length > 0 && (
          <div className="pb-28 border-b border-white/10 mb-28">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
                Work In Context
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl uppercase text-white tracking-tight leading-[0.9]">
                VISUAL GALLERY
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudy.gallery.map((g, gIdx) => (
                <div
                  key={gIdx}
                  className="rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] group"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={g.image}
                      alt={g.alt || `${caseStudy.title} image ${gIdx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 border-t border-white/5 text-xs font-mono text-neutral-400 leading-relaxed">
                    {g.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLOSING & NEXT CASE STUDY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-between p-8 sm:p-14 rounded-3xl bg-[#09090c] border border-white/10">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
              NEXT CASE STUDY
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
              {nextCaseStudy.title}
            </h3>
            <p className="text-sm text-neutral-400 max-w-lg">
              {nextCaseStudy.subtitle}
            </p>
            <div className="pt-2">
              <FroxenButton href={`/work/${nextCaseStudy.slug}`} variant="primary">
                View Next Project
              </FroxenButton>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0e0e11] border border-white/10 space-y-4">
            <h4 className="font-display text-xl uppercase text-white font-bold">
              Have a similar challenge?
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Let's start with the context and what you are trying to build — not a generic agency template.
            </p>
            <FroxenButton href="/contact" variant="lime">
              Start a Conversation
            </FroxenButton>
          </div>
        </div>
      </div>
    </div>
  );
}
