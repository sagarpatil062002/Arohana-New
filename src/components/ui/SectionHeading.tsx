'use client';

import React from 'react';
import { TagPill } from './TagPill';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface SectionHeadingProps {
  tag?: string;
  number?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'split';
  className?: string;
  rightElement?: React.ReactNode;
}

export function SectionHeading({
  tag,
  number,
  title,
  subtitle,
  align = 'left',
  className = '',
  rightElement,
}: SectionHeadingProps) {
  if (align === 'split') {
    return (
      <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16 text-left w-full ${className}`}>
        <ScrollReveal variant="slide-up" duration={650} className="w-full space-y-3 sm:space-y-4 text-left">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {number && (
              <span className="text-xs text-stodio-red font-bold tracking-wider whitespace-nowrap shrink-0">
                [{number}]
              </span>
            )}
            {tag && <TagPill>{tag}</TagPill>}
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight w-full text-left break-words">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-stodio-muted font-normal leading-relaxed w-full text-left break-words">
              {subtitle}
            </p>
          )}
        </ScrollReveal>
        {rightElement && (
          <ScrollReveal variant="slide-up" delay={150} duration={650} className="flex-shrink-0 w-full sm:w-auto">
            {rightElement}
          </ScrollReveal>
        )}
      </div>
    );
  }

  // Consistent left-aligned structure for standard and previously-centered sections
  return (
    <ScrollReveal
      variant="slide-up"
      duration={650}
      className={`space-y-3 sm:space-y-4 w-full mb-10 sm:mb-12 md:mb-16 text-left ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {number && (
          <span className="text-xs text-stodio-red font-bold tracking-wider whitespace-nowrap shrink-0">
            [{number}]
          </span>
        )}
        {tag && <TagPill>{tag}</TagPill>}
      </div>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stodio-white leading-tight w-full text-left break-words">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-stodio-muted font-normal leading-relaxed w-full text-left break-words">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
