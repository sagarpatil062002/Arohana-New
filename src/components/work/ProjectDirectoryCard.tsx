import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { WorkDirectoryItem } from '@/types/cms';

interface ProjectDirectoryCardProps {
  item?: WorkDirectoryItem;
  project?: any;
}

export function ProjectDirectoryCard({ item, project }: ProjectDirectoryCardProps) {
  const data = item || project;
  if (!data) return null;

  const title = data.projectTitle || data.name || 'Project';
  const imageSrc = data.thumbnail || data.image || '/images/services/digital-growth.jpg';
  const sector = data.sector || 'General';
  const description = data.shortDescription || data.description || '';
  const tags: string[] = data.tags || [];
  const link = data.caseStudyLink || (data.caseStudySlug ? `/work/${data.caseStudySlug}` : null);

  const cardContent = (
    <div className="group relative rounded-3xl bg-stodio-card border border-stodio-border hover:border-stodio-red/50 hover:bg-stodio-cardHover hover:-translate-y-1.5 transition-all duration-400 ease-editorial overflow-hidden flex flex-col justify-between h-full shadow-sm hover:shadow-card">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stodio-surface">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-600 ease-editorial group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-sans font-semibold text-stodio-dark uppercase px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-stodio-border shadow-sm">
            {sector}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div>
          {tags.length > 0 && (
            <span className="text-[10px] font-sans font-semibold text-stodio-dark/90 uppercase tracking-wider px-2 py-0.5 rounded-full border border-stodio-border bg-stodio-surface group-hover:border-stodio-red/30 transition-colors">
              #{tags[0]}
            </span>
          )}
          <h4 className="text-lg font-bold text-stodio-white tracking-tight group-hover:text-stodio-red transition-colors duration-300">
            {title}
          </h4>
          <p className="text-xs text-stodio-muted font-normal leading-relaxed mt-1.5 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="pt-3 border-t border-stodio-border flex items-center justify-between text-xs font-mono font-semibold text-stodio-dark">
          <span className="group-hover:text-stodio-red transition-colors duration-300">
            {link ? 'Read Full Story' : 'Project Overview'}
          </span>
          <div className="w-6 h-6 rounded-full bg-stodio-surface border border-stodio-border flex items-center justify-center text-stodio-dark group-hover:bg-stodio-red group-hover:text-white group-hover:border-stodio-red transition-all duration-300 shadow-sm">
            <ArrowUpRight className="w-3 h-3 transform transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}

