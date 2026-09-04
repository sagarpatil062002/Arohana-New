import React from 'react';
import Image from 'next/image';
import { Compass, Check } from 'lucide-react';
import { TourinExperience } from '@/types';
import { Button } from '@/components/ui/Button';
import { TagPill } from '@/components/ui/TagPill';

interface TourinExperienceCardProps {
  experience: TourinExperience;
}

export function TourinExperienceCard({ experience }: TourinExperienceCardProps) {
  return (
    <div className="group rounded-3xl bg-stodio-card hover:bg-stodio-cardHover hover:-translate-y-2 border border-stodio-border hover:border-stodio-red/50 transition-all duration-500 ease-editorial overflow-hidden flex flex-col shadow-card hover:shadow-glow">
      {/* Image & Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stodio-surface">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <TagPill variant="dark">{experience.region}</TagPill>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/80 block mb-1">
            {experience.pacing}
          </span>
          <h3 className="text-xl font-medium text-white leading-snug">
            {experience.title}
          </h3>
        </div>
      </div>

      {/* Body & Highlights */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between space-y-6">
        <div>
          <p className="text-xs font-mono text-stodio-red mb-4 tracking-wide uppercase font-semibold">
            {experience.subtitle}
          </p>

          <p className="text-sm text-stodio-muted leading-relaxed mb-6 font-normal">
            {experience.description}
          </p>

          <div className="space-y-2.5 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-stodio-white block mb-3 font-semibold">
              Journey Highlights
            </span>
            {experience.highlights.map((highlight: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-stodio-muted">
                <Check className="w-3.5 h-3.5 text-stodio-red flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="p-3.5 rounded-2xl bg-stodio-surface border border-stodio-border text-[11px] font-mono text-stodio-subtle leading-relaxed mb-6">
            {experience.sampleNotice}
          </div>

          <Button
            href={`/contact?interest=tourin&journey=${encodeURIComponent(experience.title)}`}
            variant="red"
            size="sm"
            className="w-full"
          >
            Plan This Journey With Tourin
          </Button>
        </div>
      </div>
    </div>
  );
}
