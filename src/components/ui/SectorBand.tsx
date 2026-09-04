'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { StaggerDrift, StaggerDriftItem } from '@/components/motion/StaggerDrift';
import { ZeroGHoverCard } from '@/components/motion/ZeroGHoverCard';

const SECTORS = [
  {
    id: 'hospitality',
    title: 'Hospitality & F&B',
    count: '06 Engagements',
    description: 'Restaurant concepts, menu margin engineering, culinary SOPs, staffing & guest acquisition.',
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Built Environment',
    count: '04 Engagements',
    description: 'Industrial manufacturing, luxury modular architecture, residential & investor communication.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    count: '03 Engagements',
    description: 'Specialised clinical dermatology, doctor-led patient education & ethical medical trust.',
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle & Consumer Brands',
    count: '05 Engagements',
    description: 'Luxury outdoor living, gourmet retail, packaging identity & multi-channel brand growth.',
  },
  {
    id: 'entertainment',
    title: 'Entertainment & Media',
    count: '03 Engagements',
    description: 'High-altitude mobile digital cinemas, film festivals & cultural impact documentary.',
  },
  {
    id: 'travel',
    title: 'Travel & Tourism',
    count: '02 Ventures',
    description: 'High-altitude Himalayan journeys, lived-experience expeditions & conscious travel.',
  },
];

export function SectorBand() {
  return (
    <StaggerDrift staggerInterval={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {SECTORS.map((sector, index) => (
        <StaggerDriftItem key={sector.id} index={index} distance={50} duration={1.3}>
          <ZeroGHoverCard
            enableMagneticTilt={true}
            maxTilt={4}
            hoverScale={1.03}
            hoverY={-8}
            idleFloat={true}
            idleAmplitude={4}
            idleDuration={5.5 + (index % 3) * 0.7}
            idleDelay={(index % 4) * 0.25}
            className="h-full"
          >
            <Link
              href={`/work#${sector.id}`}
              className="group relative p-7 rounded-3xl bg-stodio-card border border-stodio-border hover:border-stodio-red/50 hover:bg-stodio-cardHover transition-colors duration-300 ease-editorial flex flex-col justify-between h-full shadow-card hover:shadow-zero-g block"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono text-stodio-red font-semibold uppercase tracking-wider">
                    0{index + 1}
                  </span>
                  <span className="text-[11px] font-sans font-semibold text-stodio-dark uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-stodio-border bg-stodio-surface group-hover:border-stodio-red/40 group-hover:text-stodio-red transition-colors shadow-sm">
                    {sector.count}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stodio-white tracking-tight mb-2 group-hover:text-stodio-red transition-colors">
                  {sector.title}
                </h3>
                <p className="text-xs sm:text-sm text-stodio-muted font-normal leading-relaxed">
                  {sector.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-stodio-border">
                <span className="text-xs font-mono font-semibold text-stodio-dark uppercase tracking-wider group-hover:text-stodio-red transition-colors duration-300">
                  Explore Sector
                </span>
                <div className="w-8 h-8 rounded-full bg-stodio-surface border border-stodio-border flex items-center justify-center text-stodio-dark group-hover:bg-stodio-red group-hover:text-white group-hover:border-stodio-red transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </ZeroGHoverCard>
        </StaggerDriftItem>
      ))}
    </StaggerDrift>
  );
}
