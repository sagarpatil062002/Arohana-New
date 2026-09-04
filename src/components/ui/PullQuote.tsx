import React from 'react';
import { clsx } from 'clsx';

interface PullQuoteProps {
  quote: string;
  author?: string;
  role?: string;
  className?: string;
}

export function PullQuote({ quote, author, role, className }: PullQuoteProps) {
  return (
    <div
      className={clsx(
        'relative my-16 md:my-24 py-10 md:py-16 border-y border-stodio-border max-w-4xl mx-auto px-4 md:px-8 bg-stodio-surface/60 rounded-3xl',
        className
      )}
    >
      <div className="text-stodio-red text-4xl md:text-5xl font-sans mb-4 leading-none opacity-80">
        “
      </div>
      <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug text-stodio-white mb-6">
        {quote}
      </blockquote>
      {(author || role) && (
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-stodio-muted">
          {author && <span className="font-semibold text-stodio-white">{author}</span>}
          {author && role && <span className="text-stodio-red">/</span>}
          {role && <span>{role}</span>}
        </div>
      )}
    </div>
  );
}
