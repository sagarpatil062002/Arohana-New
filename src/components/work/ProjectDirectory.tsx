'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WorkDirectoryItem, SectorType } from '@/types/cms';
import { SECTORS } from '@/data/projects';
import { ScrollDrift } from '@/components/motion/ScrollDrift';

interface ProjectDirectoryProps {
  projects: WorkDirectoryItem[];
}

export function ProjectDirectory({ projects }: ProjectDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<SectorType | 'all'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.sector === activeFilter);

  return (
    <section className="py-10 sm:py-14 md:py-20 border-b border-stodio-dashed border-stodio-border bg-stodio-bg text-left">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollDrift direction="up" distance={30} duration={1} delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stodio-border">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-white bg-stodio-red px-2.5 py-0.5 rounded-full shadow-sm">
                03
              </span>
              <span className="text-xs font-mono text-stodio-white font-bold uppercase tracking-wider">Project Directory</span>
            </div>
            <span className="text-xs font-mono font-bold text-stodio-muted uppercase">
              {filtered.length} Engagements Filtered
            </span>
          </div>
        </ScrollDrift>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mt-6 no-scrollbar scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-300 cursor-pointer flex-shrink-0 border ${
              activeFilter === 'all'
                ? 'bg-stodio-red text-white border-stodio-red shadow-sm'
                : 'bg-stodio-surface text-stodio-muted hover:text-stodio-white border-stodio-border'
            }`}
          >
            All Sectors
          </button>
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveFilter(sector)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-300 cursor-pointer flex-shrink-0 border ${
                activeFilter === sector
                  ? 'bg-stodio-red text-white border-stodio-red shadow-sm'
                  : 'bg-stodio-surface text-stodio-muted hover:text-stodio-white border-stodio-border'
              }`}
            >
              {sector.replace(' & ', ' / ')}
            </button>
          ))}
        </div>

        {/* Compact 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6">
          {filtered.map((project, idx) => {
            const isHovered = hoveredProject === project.id;
            const link = project.caseStudyLink || null;

            return (
              <div
                key={project.id}
                className="group relative rounded-2xl border border-stodio-border bg-stodio-surface hover:border-stodio-red/60 hover:bg-white transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-card"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div>
                  {/* Number + Arrow */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-black text-stodio-red bg-white border border-stodio-border px-2.5 py-0.5 rounded-md shadow-2xs">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    {link && (
                      <Link href={link} className="shrink-0 p-1 rounded-full bg-white border border-stodio-border group-hover:border-stodio-red group-hover:bg-stodio-red group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold tracking-tight transition-colors duration-200 mb-1 leading-snug ${isHovered ? 'text-stodio-red' : 'text-stodio-white'}`}>
                    {project.projectTitle}
                  </h3>

                  {/* Sector */}
                  <span className="text-[10px] font-mono font-bold text-stodio-muted uppercase block mb-2">
                    {project.sector.replace(' & ', ' / ')}
                  </span>

                  {/* Description - compact */}
                  <p className="text-xs text-stodio-muted leading-relaxed line-clamp-2 mb-3">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-3 border-t border-stodio-border/60">
                  {project.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                    <span key={tIdx} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white text-stodio-muted border border-stodio-border">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover image preview - desktop only */}
                <AnimatePresence>
                  {isHovered && project.thumbnail && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 right-0 top-full mt-2 z-20 hidden lg:block"
                    >
                      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-stodio-card border border-stodio-border shadow-xl">
                        <Image
                          src={project.thumbnail}
                          alt={project.projectTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
