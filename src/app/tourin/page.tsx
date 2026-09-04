'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FroxenButton from '@/components/ui/FroxenButton';
import { TOURIN_EXPERIENCES, TOURIN_GALLERY } from '@/data/tourin';

export default function TourinPage() {
  return (
    <div className="bg-[#060607] min-h-screen text-[#ECECEF] pt-32 pb-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="pulse-dot" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            Tourin · An Ārohana Experiential Brand
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-20 pb-16 border-b border-white/10">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-white leading-[0.86] tracking-tight mb-8">
            Travel beyond <br />
            <span className="text-froxen-lime">the itinerary.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xl sm:text-2xl text-neutral-200 font-medium">
                Some places are better experienced when you stop trying to see everything.
              </p>
              <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl font-normal">
                Tourin creates experiential journeys for travellers who want more than a checklist of sights — beginning with Ladakh.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap gap-4 lg:justify-end">
              <FroxenButton href="#experiences" variant="lime">
                View Ladakh Experiences
              </FroxenButton>
              <FroxenButton href="/contact" variant="outline">
                Talk to Us
              </FroxenButton>
            </div>
          </div>
        </div>

        {/* Large Human-Focused Hero Visual */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] mb-28 shadow-2xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
            <Image
              src="/images/tourin/tourin-hero.jpg"
              alt="Authentic human moments and living culture in Ladakh"
              fill
              className="object-cover object-center brightness-95"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-xs font-mono uppercase tracking-widest text-neutral-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              LIVED-IN MOMENTS · UNHURRIED LADAKH
            </div>
          </div>
        </div>

        {/* WHY TOURIN & WHAT WE BELIEVE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-24 border-b border-white/10 mb-28">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
              01 / The Realisation
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
              WHY TOURIN
            </h2>
            <div className="space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                Tourin came from a simple realisation: the Ladakh people experience and the Ladakh most itineraries sell are not always the same.
              </p>
              <p>
                There is the Ladakh of famous passes, lakes and photographs. And then there is the place behind them — its people, food, stories, homes, landscapes, silences and everyday life.
              </p>
              <p className="font-medium text-white">
                Tourin was created to make space for the second one. Not by avoiding the places people want to see, but by changing the way the journey is experienced.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
              02 / Philosophy
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
              WHAT WE BELIEVE
            </h2>
            <div className="space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              <p>A good trip should leave you with more than photographs.</p>
              <p className="text-froxen-lime font-medium">
                It should give you a sense of where you were.
              </p>
              <p>
                That can mean eating something you have never tried, spending time with a local family, understanding a tradition, staying somewhere connected to its surroundings, taking a slower route, or simply having enough time to notice the place instead of rushing through it.
              </p>
              <p className="text-neutral-400 text-sm">
                We are interested in travel that feels personal, considered and rooted — not travel that is simply packed with more stops.
              </p>
            </div>
          </div>
        </div>

        {/* WHY LADAKH & WHO IS TOURIN FOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-24 border-b border-white/10 mb-28">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
              03 / The Territory
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              WHY LADAKH
            </h3>
            <p className="text-neutral-300 text-base leading-relaxed">
              Ladakh is where Tourin begins because it is a place we know closely enough to design experiences around more than the obvious itinerary.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              The first journeys are built around exploration, culture, landscapes and meaningful encounters — with enough structure to make the trip comfortable and enough space for the unexpected.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 text-xs font-mono text-neutral-400">
              POSITIONING: Not an "offbeat tour company". We do not compete on cheap packages or rushed stops.
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
              04 / Traveller Profile
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              WHO IS TOURIN FOR?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Curious Explorers', desc: 'Travellers who are curious rather than purely checklist-driven.' },
                { title: 'Cultural Depth', desc: 'People who want to understand a destination, not only photograph it.' },
                { title: 'Thoughtful Pacing', desc: 'Those who value authentic local encounters and slow travel pacing.' },
                { title: 'Small Groups & Solo', desc: 'Small groups, couples, families or solo travellers seeking intimacy.' },
                { title: 'Professional Planning', desc: 'Logistical precision without feeling like a crowded tourist circuit.' },
                { title: 'Special Expeditions', desc: 'Custom groups including cross-country motorcyclists and photographers.' },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#0e0e11] border border-white/8">
                  <h4 className="font-display font-bold text-lg uppercase text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROOF THAT THE IDEA WORKS */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0e0e11] border border-white/10 mb-28">
          <div className="max-w-3xl mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
              Demonstrated Ground Truth
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
              PROOF THAT THE IDEA WORKS
            </h3>
            <p className="text-neutral-300 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              Tourin has already completed 15+ separate bookings, ranging from individual travellers and small groups to larger groups, including a 20-biker expedition.
            </p>
            <p className="text-neutral-400 text-sm mt-2 font-mono">
              These are early proof that there is an audience for the kind of travel Tourin is building.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 text-xs font-mono">
            <div>
              <span className="font-display text-4xl font-black text-froxen-lime block">15+</span>
              <span className="text-neutral-400 uppercase">Completed Bookings</span>
            </div>
            <div>
              <span className="font-display text-4xl font-black text-white block">20</span>
              <span className="text-neutral-400 uppercase">Bikers in Single Tour</span>
            </div>
            <div>
              <span className="font-display text-4xl font-black text-froxen-lime block">100%</span>
              <span className="text-neutral-400 uppercase">Bespoke Curation</span>
            </div>
            <div>
              <span className="font-display text-4xl font-black text-white block">0</span>
              <span className="text-neutral-400 uppercase">Rushed Circuits</span>
            </div>
          </div>
        </div>

        {/* CURATED LADAKH EXPERIENCES (PACKAGES SIT LOWER) */}
        <section id="experiences" className="pb-28 border-b border-white/10 mb-28">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
              Sample Journeys
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight leading-[0.9]">
              CURATED LADAKH EXPERIENCES
            </h2>
            <p className="text-sm text-neutral-400 mt-2 font-mono">
              SAMPLE EXPERIENTIAL ITINERARIES · CUSTOMIZED ACCORDING TO SEASON AND TRAVEL PREFERENCES
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOURIN_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="group rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] hover:border-froxen-lime/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-froxen-lime">
                      {exp.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-black text-2xl uppercase text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-xs font-mono text-froxen-lime mb-3">
                      {exp.subtitle}
                    </p>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {exp.overview}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      {exp.highlights.slice(0, 3).map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                          <span className="text-froxen-lime font-bold">✦</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <FroxenButton href="/contact" variant="outline" className="w-full text-center">
                    Inquire About This Journey
                  </FroxenButton>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FROM ĀROHANA TO TOURIN & THE NEXT CHAPTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 border-b border-white/10 mb-28">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
              The Lineage
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              FROM ĀROHANA TO TOURIN
            </h3>
            <p className="text-neutral-300 text-base leading-relaxed">
              Tourin is an extension of the same instinct that sits behind Ārohana: create something with a clear point of view rather than simply offering what everyone else offers.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Ārohana builds brands and businesses. Tourin applies that thinking to travel — turning a destination into an experience people can connect with.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
              The Future
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              THE NEXT CHAPTER
            </h3>
            <p className="text-neutral-300 text-base leading-relaxed">
              Ladakh is the beginning, not the boundary. As Tourin grows, the intention is to take the same approach to other destinations — places with enough character, culture and story to create journeys worth remembering.
            </p>
          </div>
        </div>

        {/* CLOSING CALL TO ACTION */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#09090c] border border-white/10 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-froxen-lime block mb-2">
            COME TRAVEL DIFFERENTLY
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight mb-4">
            EXPLORE OUR LADAKH JOURNEYS
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-lg mx-auto mb-8 font-normal">
            Whether for an unhurried solo retreat, couple or private group journey — let's design your time in Ladakh with intention.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <FroxenButton href="/contact" variant="lime">
              Talk to Us About a Journey
            </FroxenButton>
            <FroxenButton href="/work" variant="outline">
              Back to Ārohana Work
            </FroxenButton>
          </div>
        </div>
      </div>
    </div>
  );
}
