'use client';

import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface EditorialSelectorItem {
  number: string;
  title: string;
}

interface EditorialSelectorProps {
  items: EditorialSelectorItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  layoutId: string;
  children: ReactNode;
  footnoteLabel?: string;
  footnoteRange?: string;
}

export function EditorialSelector({
  items,
  activeIndex,
  onSelect,
  layoutId,
  children,
  footnoteLabel = 'Interactive Index',
  footnoteRange,
}: EditorialSelectorProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const defaultRange = items.length > 1 ? `01 — 0${items.length}` : '01';

  return (
    <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-10 items-stretch">
      {/* Left Editorial Navigation Rail */}
      <div className="col-span-5 flex flex-col">
        <div className="flex-1 flex flex-col justify-center space-y-1">
          {items.map((item, idx) => {
            const isSelected = activeIndex === idx;
            const isHovered = hoveredIdx === idx;

            return (
              <button
                key={item.number}
                onClick={() => onSelect(idx)}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  onSelect(idx);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                className="w-full text-left group relative cursor-pointer"
              >
                {/* Active/Hover vertical indicator line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full origin-top"
                  initial={false}
                  animate={{
                    opacity: isSelected ? 1 : isHovered ? 0.4 : 0,
                    scaleY: isSelected ? 1 : isHovered ? 0.6 : 0,
                    backgroundColor: '#DE322D',
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="flex items-start gap-5 pl-6 pr-4 py-5">
                  {/* Number */}
                  <motion.span
                    className="text-[11px] font-mono font-semibold tracking-wide pt-1.5 shrink-0"
                    initial={false}
                    animate={{
                      color: isSelected ? '#DE322D' : isHovered ? '#DE322D' : '#6b7280',
                      x: isSelected ? 0 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.number}
                  </motion.span>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <motion.span
                      className="block font-semibold tracking-tight leading-snug"
                      initial={false}
                      animate={{
                        color: isSelected ? '#ffffff' : isHovered ? '#ffffff' : '#9ca3af',
                        fontSize: isSelected ? '1.4rem' : '1.1rem',
                        fontWeight: isSelected ? 700 : 600,
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {item.title}
                    </motion.span>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="pt-1.5 shrink-0"
                    initial={false}
                    animate={{
                      opacity: isSelected ? 1 : isHovered ? 0.7 : 0,
                      x: isSelected ? 0 : isHovered ? 4 : -4,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ArrowRight className="w-4 h-4 text-stodio-red" />
                  </motion.div>
                </div>

                {/* Divider line */}
                {idx < items.length - 1 && (
                  <div className="ml-6 mr-4 h-px bg-stodio-border/50" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="pt-5 pb-1 px-2 flex items-center justify-between text-[10px] font-mono text-stodio-subtle uppercase tracking-wider border-t border-stodio-border/40">
          <span>{footnoteLabel}</span>
          <span>{footnoteRange || defaultRange}</span>
        </div>
      </div>

      {/* Right Detail Content Panel */}
      <div className="col-span-7 flex">
        <div className="w-full rounded-3xl bg-stodio-surface border border-stodio-border p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shadow-card min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 flex-1 flex flex-col justify-between relative z-10"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

interface EditorialAccordionProps {
  items: EditorialSelectorItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  children: ReactNode[];
}

export function EditorialAccordion({
  items,
  activeIndex,
  onSelect,
  children,
}: EditorialAccordionProps) {
  return (
    <div className="lg:hidden">
      {items.map((item, idx) => {
        const isExpanded = activeIndex === idx;

        return (
          <div
            key={item.number}
            className="border-b border-stodio-border last:border-b-0"
          >
            <button
              onClick={() => onSelect(isExpanded ? -1 : idx)}
              className="w-full py-5 flex items-start text-left gap-4 focus:outline-none cursor-pointer"
            >
              {/* Number */}
              <motion.span
                className="text-[11px] font-mono font-semibold pt-2 shrink-0"
                initial={false}
                animate={{ color: isExpanded ? '#DE322D' : '#6b7280' }}
                transition={{ duration: 0.3 }}
              >
                {item.number}
              </motion.span>

              {/* Title */}
              <motion.span
                className="flex-1 font-semibold tracking-tight"
                initial={false}
                animate={{
                  color: isExpanded ? '#ffffff' : '#9ca3af',
                  fontSize: isExpanded ? '1.25rem' : '1.1rem',
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.title}
              </motion.span>

              {/* Plus/Minus indicator */}
              <div className="pt-1.5 shrink-0">
                <div className="relative w-4 h-4">
                  <motion.div
                    className="absolute top-1/2 left-0 w-4 h-0.5 bg-stodio-red -translate-y-1/2"
                    initial={false}
                    animate={{ opacity: isExpanded ? 1 : 0.5 }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-0 w-0.5 h-4 bg-stodio-red -translate-x-1/2"
                    initial={false}
                    animate={{
                      scaleY: isExpanded ? 0 : 1,
                      opacity: isExpanded ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-0 sm:pl-6 pr-0 sm:pr-2">
                    {children[idx]}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
