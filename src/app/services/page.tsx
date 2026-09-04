'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FroxenButton from '@/components/ui/FroxenButton';

const SERVICES_DETAILED = [
  {
    number: '01',
    title: 'DIGITAL BRAND GROWTH',
    tagline: 'For businesses that need a stronger brand presence, better communication and consistent execution — not just a schedule of posts.',
    image: '/images/services/digital-growth.jpg',
    capabilities: [
      { name: 'Brand strategy and positioning', note: 'Defining market thesis & identity architecture' },
      { name: 'Strategic communication', note: 'Unified narrative across corporate & retail touchpoints' },
      { name: 'Content strategy & monthly calendars', note: 'High-frequency editorial planning' },
      { name: 'Social media management', note: 'End-to-end platform stewardship' },
      { name: 'Creative direction & copywriting', note: 'High-craft visual tone and compelling scripting' },
      { name: 'Photography and videography', note: 'Field, studio and on-location shoots' },
      { name: 'Campaign development', note: 'Integrated multi-channel brand pushes' },
      { name: 'Performance advertising', note: 'Meta & Google Ads targeted acquisition' },
      { name: 'SEO & Website design', note: 'High-performance discovery and conversion UX' },
      { name: 'Lead generation', note: 'Strategic inbound pipeline engineering' },
    ],
    proofQuote: 'Performance marketing, SEO, websites and lead generation are delivered as deliberate strategic capabilities tailored to the growth phase.',
  },
  {
    number: '02',
    title: 'HOSPITALITY CONSULTING',
    tagline: 'Where Ārohana is different from a conventional marketing agency. Hospitality consulting comes from actual industry ownership and operational leadership.',
    image: '/images/services/hospitality-consulting.jpg',
    capabilities: [
      { name: 'Restaurant / café concept development', note: 'Spatial, culinary and aesthetic brand blueprint' },
      { name: 'Menu creation & menu engineering', note: 'High-margin architecture & culinary psychology' },
      { name: 'Recipe and product development', note: 'Standardized tasting profiles and kitchen prep' },
      { name: 'Pricing & food-cost control', note: 'Rigorous margin modeling and supplier negotiation' },
      { name: 'Kitchen & operational systems', note: 'Back-of-house workflow & equipment efficiency' },
      { name: 'SOPs and staff training', note: 'Front-of-house service protocols & hospitality coaching' },
      { name: 'Revenue optimisation', note: 'Table turns, cover growth, and digital distribution' },
      { name: 'Zomato & Swiggy management', note: 'Listing algorithm optimization & rating health' },
      { name: 'OTA consulting & digital distribution', note: 'Boutique stay and resort inventory yields' },
      { name: 'Operational setup & handover', note: 'Complete pre-launch commissioning and team alignment' },
    ],
    proofQuote: 'Relevant experience includes Misu, Spice Goa, Khana Khazana, Khau Gali, Resort Blu and Holiday Village, among other hospitality projects.',
  },
  {
    number: '03',
    title: 'CONTENT & BRAND PRODUCTION',
    tagline: 'When the story needs to be bigger than a post, Ārohana can take the idea through scripting, production and post-production.',
    image: '/images/services/content-production.jpg',
    capabilities: [
      { name: 'Corporate & brand films', note: 'Cinematic corporate profile and stakeholder narratives' },
      { name: 'Documentaries & institutional films', note: 'High-altitude, cultural and civic coverage' },
      { name: 'Campaign films & reels', note: 'Short-form thumb-stopping social video' },
      { name: 'Scripting & narrative development', note: 'Bilingual voice-over and emotional resonance' },
      { name: 'Shoot direction & cinematography', note: 'Specialized 4K multi-camera field workflows' },
      { name: 'Editing, sound & post-production', note: 'Sound engineering, color grading, and final delivery' },
    ],
    proofQuote: 'Verified proof: SHE documentary, Western Command Investiture Ceremony, Indian Army project videos, PictureTime festival content, and Raysons industrial films.',
  },
];

const ENGAGEMENT_MODELS = [
  {
    model: 'Ongoing Digital Partnership',
    bestFor: 'Brands needing continuous strategy, content, creative and platform management month after month.',
    deliverables: 'Strategy · Content Creation · Social Management · Growth',
  },
  {
    model: 'Hospitality Consulting',
    bestFor: 'Restaurants, cafés, resorts and hospitality businesses needing operational, culinary or commercial intervention.',
    deliverables: 'Concept · Menu Engineering · SOPs · Cost Controls · Training',
  },
  {
    model: 'Project Production',
    bestFor: 'Films, documentaries, launches, campaigns, exhibitions or other defined projects with specific delivery timelines.',
    deliverables: 'Scripting · On-Location Shoots · Post-Production · Mastering',
  },
  {
    model: 'Hybrid Engagement',
    bestFor: 'Businesses where business consulting and digital communication need to move together seamlessly.',
    deliverables: 'Executive Advisory · Brand Repositioning · Execution',
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="bg-[#060607] min-h-screen text-[#ECECEF] pt-32 pb-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="pulse-dot" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            Capabilities &amp; Practice Areas
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-24 pb-12 border-b border-white/10">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white leading-[0.88] tracking-tight mb-8 max-w-5xl">
            What we do depends on what the <br />
            <span className="text-froxen-lime">business actually needs.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl leading-relaxed font-normal">
            Ārohana can come in as an ongoing digital partner, a hospitality consultant, a content/production partner or a combination of these.
          </p>
        </div>

        {/* Immersion Service Index */}
        <div className="space-y-36">
          {SERVICES_DETAILED.map((service, idx) => (
            <section
              key={service.number}
              id={`service-${service.number}`}
              className="relative rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 bg-[#0c0c0f] shadow-2xl"
            >
              {/* Header inside Card */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pb-8 border-b border-white/10 mb-10">
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-froxen-lime">
                    {service.number}
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white tracking-tight">
                    {service.title}
                  </h2>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  ĀROHANA PRACTICE AREA
                </span>
              </div>

              {/* Grid: Overview & Visual (Left) + Detailed Capabilities (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 space-y-8">
                  <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
                    {service.tagline}
                  </p>

                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 text-xs text-neutral-400 font-mono leading-relaxed">
                    <span className="text-froxen-lime font-bold block mb-1">EVIDENCE &amp; CONTEXT:</span>
                    {service.proofQuote}
                  </div>
                </div>

                {/* Capabilities Breakdown */}
                <div className="lg:col-span-7">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6 pb-2 border-b border-white/10">
                    Specific Capabilities &amp; Workstreams
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.capabilities.map((cap, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/6 hover:border-white/20 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-froxen-lime group-hover:scale-125 transition-transform" />
                          <h4 className="font-medium text-sm text-white group-hover:text-froxen-lime transition-colors">
                            {cap.name}
                          </h4>
                        </div>
                        <p className="text-xs text-neutral-400 pl-3.5 leading-relaxed">
                          {cap.note}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                    <FroxenButton href="/contact" variant="outline">
                      Discuss This Service
                    </FroxenButton>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* HOW ENGAGEMENTS WORK SECTION */}
        <div className="mt-36 pt-20 border-t border-white/10">
          <div className="max-w-3xl mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-2">
              ENGAGEMENT MODELS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white tracking-tight leading-[0.9]">
              HOW ENGAGEMENTS CAN WORK
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {ENGAGEMENT_MODELS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0e0e11] border border-white/8 hover:border-froxen-lime/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-neutral-500 block mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display font-bold text-2xl uppercase text-white tracking-tight mb-3">
                    {item.model}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {item.bestFor}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-froxen-lime">
                  {item.deliverables}
                </div>
              </div>
            ))}
          </div>

          {/* Note on Team Structure */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0a0a0d] border border-white/10">
            <div className="max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-froxen-lime block mb-2">
                TEAM PHILOSOPHY
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white mb-4">
                SPECIALISTS ASSEMBLED AROUND THE BRIEF
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal mb-8">
                Ārohana does not sell a fixed overhead chart of junior retainers. Instead, the right specialists are assembled around the brief — strategy, design, editing, photography, videography, performance marketing or hospitality specialists as required. You get senior attention and specialized execution without agency bureaucracy.
              </p>
              <div className="p-6 rounded-2xl bg-[#060607] border border-white/10">
                <h4 className="font-display font-black text-2xl sm:text-4xl uppercase text-white tracking-tight mb-2">
                  DON'T START WITH A SERVICE. <span className="text-froxen-lime">START WITH THE PROBLEM.</span>
                </h4>
                <p className="text-sm text-neutral-400 mb-6">
                  Tell us what you are trying to build, fix or change.
                </p>
                <FroxenButton href="/contact" variant="lime">
                  Start a Conversation
                </FroxenButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
