'use client';

import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-3xl border transition-all duration-400 ease-editorial overflow-hidden ${
              isOpen
                ? 'bg-stodio-card border-stodio-red/50 shadow-glow'
                : 'bg-stodio-card/60 border-stodio-border hover:border-stodio-border/80 hover:bg-stodio-card'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 md:px-8 py-6 text-left flex items-center justify-between gap-6 cursor-pointer focus:outline-none select-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span className="text-xs text-stodio-red font-bold tracking-wider">
                  0{index + 1}
                </span>
                <span className="text-base sm:text-lg font-medium text-stodio-white tracking-tight">
                  {item.question}
                </span>
              </div>

              {/* Stodio Plus/Minus Circular Badge */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 ease-editorial ${
                  isOpen
                    ? 'bg-stodio-red text-white rotate-45 scale-105'
                    : 'bg-stodio-surface border border-stodio-border text-stodio-muted'
                }`}
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </button>

            {/* Smooth CSS Grid Accordion Collapse/Expand */}
            <div
              className="grid transition-all duration-400 ease-editorial"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <div
                  className="px-6 md:px-8 pb-6 pt-0 text-sm sm:text-base text-stodio-muted font-normal leading-relaxed border-t border-stodio-border/40 mt-2 transition-opacity duration-300"
                  style={{
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="pt-4">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
