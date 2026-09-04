'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

interface FlipDigitProps {
  digit: string;
}

function FlipDigit({ digit }: FlipDigitProps) {
  return (
    <div className="relative inline-flex items-center justify-center min-w-[24px] xs:min-w-[28px] sm:min-w-[36px] md:min-w-[42px] h-[42px] xs:h-[48px] sm:h-[60px] md:h-[70px] bg-black text-white font-mono font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl rounded-lg xs:rounded-xl border border-white/10 shadow-md overflow-hidden select-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: '100%', opacity: 0, rotateX: -90 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 90 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="block tabular-nums"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
      {/* Mechanical Split Line */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/80 z-10 pointer-events-none shadow-sm" />
    </div>
  );
}

interface MetricItemProps {
  targetValue: number;
  suffix?: string;
  prefix?: string;
  padZero?: boolean;
  label: string;
  sublabel: string;
  index: number;
}

function FlipMetricCard({
  targetValue,
  suffix = '',
  prefix = '',
  padZero = false,
  label,
  sublabel,
  index,
}: MetricItemProps) {
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1400; // ms
    const incrementTime = 40;
    const totalSteps = duration / incrementTime;
    const stepValue = targetValue / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= targetValue) {
        setCurrentValue(targetValue);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, targetValue]);

  const numStr = padZero && currentValue < 10 ? `0${currentValue}` : `${currentValue}`;
  const digits = numStr.split('');

  return (
    <div
      ref={ref}
      className="p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-stodio-surface border border-stodio-border hover:border-stodio-red/40 transition-all duration-300 shadow-sm flex flex-col justify-between space-y-3 sm:space-y-4 text-left group"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-stodio-red font-semibold">
          [ 0{index + 1} ]
        </span>
        <span className="text-[10px] font-mono text-stodio-subtle uppercase tracking-wider">
          Verified Impact
        </span>
      </div>

      {/* Flipping Digits Container */}
      <div className="flex items-center gap-1 sm:gap-1.5 pt-1 overflow-x-auto no-scrollbar">
        {prefix && (
          <span className="font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-stodio-white pr-0.5 sm:pr-1">
            {prefix}
          </span>
        )}
        {digits.map((d, i) => (
          <FlipDigit key={i} digit={d} />
        ))}
        {suffix && (
          <span className="font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-stodio-red pl-0.5 sm:pl-1">
            {suffix}
          </span>
        )}
      </div>

      {/* Metric Labels */}
      <div className="space-y-1 pt-1 border-t border-stodio-border/60">
        <h4 className="text-sm sm:text-base font-bold text-stodio-white tracking-tight group-hover:text-stodio-red transition-colors">
          {label}
        </h4>
        <p className="text-xs text-stodio-muted font-normal leading-relaxed">
          {sublabel}
        </p>
      </div>
    </div>
  );
}

export function WorkMetricsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8 sm:space-y-10 text-left">
        {/* Section Header with Standalone "See Our Work" CTA */}
        <ScrollDrift direction="up" distance={25} duration={1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stodio-border">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-stodio-red font-semibold">
                  [ PROOF OF WORK ]
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-stodio-subtle">
                  Commercial & Sector Impact
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stodio-white leading-tight break-words">
                Real-world execution across sectors.
              </h2>
            </div>

            {/* Standalone See Our Work CTA */}
            <div className="flex items-center">
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-stodio-white hover:bg-stodio-red text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ease-editorial shadow-sm hover:shadow-glow active:scale-95"
              >
                <span>See our work</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>
            </div>
          </div>
        </ScrollDrift>

        {/* 4 Authentic Project Metrics with Mechanical Flip Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          <FlipMetricCard
            index={0}
            targetValue={25}
            suffix="+"
            label="Commercial Engagements"
            sublabel="Direct partnerships across hospitality, enterprise & consumer brands."
          />
          <FlipMetricCard
            index={1}
            targetValue={7}
            padZero={true}
            label="Industry Sectors"
            sublabel="Hospitality, Real Estate, Healthcare, Media, Travel & Defence."
          />
          <FlipMetricCard
            index={2}
            targetValue={6}
            padZero={true}
            label="Featured Case Studies"
            sublabel="In-depth multi-entity execution, retainers and technical production."
          />
          <FlipMetricCard
            index={3}
            targetValue={15}
            suffix="+"
            label="Himalayan Expeditions"
            sublabel="Curated high-altitude journeys and community homestay initiatives."
          />
        </div>
      </div>
    </section>
  );
}
