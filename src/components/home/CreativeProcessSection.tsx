'use client';

import React, { useState } from 'react';
import FroxenButton from '@/components/ui/FroxenButton';

const STEPS = [
  {
    index: '01',
    title: 'DISCOVER',
    subtitle: 'Commercial Context & Field Realities',
    description:
      'We dig into the business mechanics, margins, customer behavior, and operational realities — finding the hard truth worth building around.',
    tags: ['Business Audit', 'Category Research', 'Stakeholder Interviews'],
  },
  {
    index: '02',
    title: 'DEFINE',
    subtitle: 'Strategic Narrative & Positioning',
    description:
      'Positioning, communication architecture and creative direction. One sharp strategic anchor that every subsequent creative decision is measured against.',
    tags: ['Brand Narrative', 'Go-To-Market Strategy', 'Core Thesis'],
  },
  {
    index: '03',
    title: 'DESIGN',
    subtitle: 'Visual Systems & High-Craft Language',
    description:
      'Identity, digital systems, editorial typography and content frameworks developed in parallel. Bold routes tested until the craft is undeniable.',
    tags: ['Visual Identity', 'UX / UI Systems', 'Content Architecture'],
  },
  {
    index: '04',
    title: 'EXECUTE',
    subtitle: 'Production, Systems & On-Ground Launch',
    description:
      'Whether a digital rollout, high-altitude documentary shoot, kitchen SOP implementation or packaging launch — engineered with precision.',
    tags: ['Production Mastering', 'Hospitality SOPs', 'Campaign Launch'],
  },
  {
    index: '05',
    title: 'EVOLVE',
    subtitle: 'Iterative Optimization & Scale',
    description:
      'We monitor performance, refine communications and keep sharpening — because a brand that stops moving stops mattering.',
    tags: ['Conversion Optimization', 'Performance Analytics', 'Long-Term Scale'],
  },
];

export const CreativeProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative bg-[#060607] py-28 md:py-40 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-froxen-lime" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                06 / Methodology
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-[0.9] tracking-tight">
              HOW BOLD WORK <span className="text-froxen-lime">GETS MADE</span>
            </h2>
          </div>
          <FroxenButton href="/contact" variant="primary">
            Start a Project
          </FroxenButton>
        </div>

        {/* Stepped Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.index}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-3xl border transition-all duration-400 cursor-pointer flex flex-col justify-between min-h-[280px] ${
                  isActive
                    ? 'bg-[#101014] border-froxen-lime/50 shadow-xl'
                    : 'bg-[#09090c] border-white/8 hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-sm font-bold ${
                        isActive ? 'text-froxen-lime' : 'text-neutral-500'
                      }`}
                    >
                      {step.index}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-froxen-lime" />}
                  </div>
                  <h3 className="font-display font-bold text-2xl uppercase text-white tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                    {step.subtitle}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {step.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-froxen-lime/10 text-froxen-lime border border-froxen-lime/20'
                            : 'bg-white/5 text-neutral-400'
                        }`}
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

        {/* Progress Rail Indicator */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono text-neutral-500">
          <div>
            ACTIVE STEP:{' '}
            <span className="text-froxen-lime font-bold">
              {STEPS[activeStep].index} — {STEPS[activeStep].title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeStep === i ? 'w-8 bg-froxen-lime' : 'w-2 bg-white/20'
                }`}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeProcessSection;
