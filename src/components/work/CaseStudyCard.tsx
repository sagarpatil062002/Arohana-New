'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { TagPill } from '@/components/ui/TagPill';
import { ZeroGHoverCard } from '@/components/motion/ZeroGHoverCard';

export interface CaseStudyCardItem {
  slug: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  heroMedia?: string;
  sector?: string;
  tags?: string[];
  clientName?: string;
  heroBusinessStatement?: string;
  snapshot?: {
    sector?: string;
    location?: string;
    engagementType?: string;
  };
}

interface CaseStudyCardProps {
  study: CaseStudyCardItem | any;
  index?: number;
  featured?: boolean;
}

export function CaseStudyCard({ study, index, featured = false }: CaseStudyCardProps) {
  const title = study.title || study.clientName || 'Case Study';
  const subtitle = study.subtitle || study.heroBusinessStatement || '';
  const imageSrc = study.heroImage || study.heroMedia || '/images/case-studies/raysons-hero.jpg';
  const sector = study.sector || study.snapshot?.sector || 'Case Study';
  const tags: string[] = Array.isArray(study.tags) && study.tags.length > 0 ? study.tags.slice(0, 3) : [];

  return (
    <ZeroGHoverCard
      enableMagneticTilt={true}
      maxTilt={5}
      hoverScale={1.03}
      hoverY={-10}
      hoverDuration={0.8}
      idleFloat={true}
      idleAmplitude={4}
      idleDuration={6 + (index ? (index % 3) * 0.7 : 0)}
      idleDelay={index ? (index % 4) * 0.3 : 0}
      className={`h-full ${featured ? 'lg:col-span-2' : ''}`}
    >
      <Link
        href={`/work/${study.slug}`}
        className="group relative rounded-3xl bg-stodio-card border border-stodio-border hover:border-stodio-red/60 hover:bg-stodio-cardHover transition-colors duration-500 ease-editorial overflow-hidden flex flex-col justify-between shadow-card hover:shadow-zero-g h-full block"
      >
        {/* Top Media Container */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stodio-surface">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 right-3.5 sm:right-4 flex items-center justify-between gap-2 pointer-events-none z-10">
            <div className="min-w-0 flex-1 pr-2">
              <TagPill variant="dark" className="max-w-full shadow-md">
                <span className="truncate block">{sector}</span>
              </TagPill>
            </div>
            {index !== undefined && (
              <span className="w-8 h-8 shrink-0 rounded-full bg-white/95 backdrop-blur-md border border-stodio-border text-[11px] font-mono text-stodio-red flex items-center justify-center font-bold shadow-md">
                0{index + 1}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Content Container */}
        <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-6">
          <div className="space-y-3">
            {tags.length > 0 && (
              <span className="text-[11px] font-sans font-semibold text-stodio-dark uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#DCDCE2] bg-[#F4F4F6] group-hover:border-stodio-red/40 group-hover:text-stodio-red group-hover:bg-red-50/40 transition-all duration-300 shadow-sm">
                {tags[0]}
              </span>
            )}

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-stodio-white group-hover:text-stodio-red transition-colors duration-300">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-stodio-muted font-normal leading-relaxed line-clamp-2">
              {subtitle}
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-stodio-border flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-stodio-dark uppercase tracking-wider group-hover:text-stodio-red transition-colors duration-300">
              View Case Study
            </span>
            <div className="w-8 h-8 rounded-full bg-stodio-surface border border-stodio-border flex items-center justify-center text-stodio-dark group-hover:bg-stodio-red group-hover:text-white group-hover:border-stodio-red transition-all duration-300 shadow-sm">
              <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </ZeroGHoverCard>
  );
}
