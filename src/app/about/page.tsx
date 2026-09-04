'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FroxenButton from '@/components/ui/FroxenButton';

export default function AboutPage() {
  return (
    <div className="bg-[#060607] min-h-screen text-[#ECECEF] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="pulse-dot" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            About Ārohana · Founder Story
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-20">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white leading-[0.88] tracking-tight mb-8">
            The road to Ārohana <br />
            <span className="text-froxen-lime">was anything but straight.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6 border-t border-white/10">
            <div className="lg:col-span-8 text-lg sm:text-xl text-neutral-200 leading-relaxed font-normal space-y-6">
              <p>
                I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.
              </p>
              <p className="text-neutral-400 text-base">
                Today, Ārohana brings together that experience with strategy, communication, creativity and execution — for businesses that are serious about what they are building.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0e0e11] border border-white/10 text-xs font-mono space-y-3">
              <span className="text-froxen-lime block uppercase tracking-widest font-bold">
                CORE PHILOSOPHY
              </span>
              <p className="text-neutral-300 leading-relaxed">
                Commercial context, hospitality operations, and strategic brand execution unified under one roof.
              </p>
              <div className="pt-2 border-t border-white/8 text-neutral-500">
                MADHURA HAWAL · FOUNDER
              </div>
            </div>
          </div>
        </div>

        {/* Large Editorial Portrait */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e11] mb-28 shadow-2xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
            <Image
              src="/images/home/madhura-editorial.jpg"
              alt="Madhura Hawal - Founder of Ārohana"
              fill
              className="object-cover object-center grayscale contrast-110 brightness-95"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060607] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
              FIELD DIRECTION &amp; LEADERSHIP · LADAKH
            </div>
          </div>
        </div>

        {/* STORY CHAPTERS */}
        <div className="space-y-32">
          {/* Chapter 1: It Started With Hospitality */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
                CHAPTER 01
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-[0.95] mb-6">
                IT STARTED WITH <br />
                <span className="text-neutral-400">HOSPITALITY.</span>
              </h2>

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 mt-6">
                <Image
                  src="/images/services/hospitality-consulting.jpg"
                  alt="Hospitality and restaurant operations"
                  fill
                  className="object-cover brightness-90"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              <p>My first world was hospitality.</p>
              <p>
                I studied Hospitality Management in Muscat before completing my degree in Goa. While I was studying in Goa, I was selected among the Top 13 finalists from the West Zone for Femina Miss India — an unexpected opportunity that took me into a completely different world and taught me a great deal about confidence, communication and being comfortable outside my comfort zone. Not long after, I was selected as one of just 16 students from across India for the Taj Management Training Programme.
              </p>
              <p>
                Over the years, I worked in Muscat, returned to Kolhapur and eventually decided to build something of my own — Mother India Cafe.
              </p>
              <p>
                Running a café teaches you things no business textbook can quite prepare you for. You learn about people, margins, suppliers, staff, customers, bad days, good days and the uncomfortable reality that every decision eventually shows up in the numbers.
              </p>
              <p>
                While the café was still running, another opportunity took me to Goa. I joined Passcode Hospitality as Operations Head and worked on two upcoming restaurants, Pings Bia Hoi and Jamun. That experience took me deeper into the machinery behind a hospitality business — not just how a brand looks, but how an experience is actually built.
              </p>
              <p>
                Later, I moved into institutional business and sales with Latambarcem Brewers Private Limited, working across Goa and Delhi. It gave me another perspective on business: relationships, commercial thinking, negotiation and growth.
              </p>
              <div className="p-6 rounded-2xl bg-[#0e0e11] border-l-2 border-froxen-lime border border-white/8 text-sm text-neutral-200">
                "A business can have a great-looking brand and still have a problem underneath it. And sometimes what looks like a marketing problem isn't a marketing problem at all."
              </div>
            </div>
          </section>

          {/* Chapter 2: There Were A Few Unexpected Detours */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
                CHAPTER 02
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-[0.95]">
                THERE WERE A FEW <br />
                <span className="text-neutral-400">UNEXPECTED DETOURS.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              <p>
                And then, like it did for so many people, COVID changed the direction of things.
              </p>
              <p>
                The café had to close. My work in hospitality was disrupted. What came next wasn't a carefully planned five-year strategy. It was the beginning of a different kind of work.
              </p>
              <p className="font-medium text-white text-xl">
                That work gradually became Ārohana.
              </p>
            </div>
          </section>

          {/* Chapter 3: And Then, The Work Got Interesting */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
                CHAPTER 03
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-[0.95] mb-6">
                AND THEN, THE WORK <br />
                <span className="text-neutral-400">GOT INTERESTING.</span>
              </h2>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/home/strip-army.jpg"
                    alt="Indian Army production"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/home/strip-she.jpg"
                    alt="SHE initiative field work"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              <p>What began with digital marketing projects slowly expanded.</p>
              <p>
                We found ourselves working with restaurants and resorts, real-estate businesses, healthcare brands, consumer businesses and entertainment companies. Sometimes the requirement was a brand strategy. Sometimes it was a complete digital presence. Sometimes it was a campaign, a film, a new menu or an operational problem inside a restaurant.
              </p>
              <p>And sometimes the brief took us somewhere completely unexpected.</p>
              <p className="font-medium text-white">
                My work in Ladakh became one of those chapters.
              </p>
              <p>
                There, I worked on projects associated with the Indian Army, including work connected with 14 Corps, Fire &amp; Fury Corps, Operation Sadbhavana and Operation Sampark. That work eventually extended to other Army environments as well, including Western Command and 12 Rashtriya Rifles under Delta Force.
              </p>
              <p>
                The environments were different. The audiences were different. The responsibility was different.
              </p>
              <p className="text-froxen-lime font-medium">
                And that experience reinforced something I had already learnt from hospitality: you cannot create meaningful communication without understanding the people, the environment and the reality behind it.
              </p>
            </div>
          </section>

          {/* Chapter 4: Where Ārohana Stands Today */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
                CHAPTER 04
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-[0.95]">
                WHERE ĀROHANA <br />
                <span className="text-neutral-400">STANDS TODAY.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              <p>
                What remains constant is the standard: clear thinking, sector-aware strategy, strong creative work and disciplined execution — brought together to make the business more visible, more relevant and more valuable to the people it is trying to reach.
              </p>
              <p>
                That is also why our work can move from a real-estate brand to a healthcare practice, from a restaurant to a consumer brand, or from a commercial campaign to a project in an entirely different environment. The category changes. The thinking has to change with it.
              </p>
              <p>
                The work may begin with a brand question, a business challenge or simply the sense that something is not working as it should. From there, strategy, communication, creative and execution come together around what the business actually needs — rather than around a fixed list of deliverables.
              </p>
              <p>
                We work with businesses at points where a standard agency approach is not enough — when a brand needs sharper positioning, a stronger market presence, a more deliberate digital strategy, or a hospitality business needs to rethink the experience it is creating.
              </p>
              <p className="font-medium text-white text-xl">
                Today, Ārohana sits at the intersection of brand thinking, business understanding and execution.
              </p>
            </div>
          </section>
        </div>

        {/* Closing Block */}
        <div className="mt-32 pt-16 border-t border-white/10 bg-[#0e0e11] p-8 md:p-14 rounded-3xl">
          <div className="max-w-3xl">
            <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-[0.9] tracking-tight mb-6">
              A BRAND IS ONLY AS STRONG AS THE <span className="text-froxen-lime">THINKING BEHIND IT.</span>
            </h3>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8">
              That thinking comes from years of being inside businesses — building, running, selling, solving and starting again. Today, it is what we bring to the businesses we work with.
            </p>
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-8">
              IF YOU'RE BUILDING SOMETHING WORTH BUILDING, LET'S TALK.
            </p>
            <div className="flex flex-wrap gap-4">
              <FroxenButton href="/contact" variant="lime">
                Start a Conversation
              </FroxenButton>
              <FroxenButton href="/work" variant="outline">
                See the Work
              </FroxenButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
