'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ExplorerHeaderProps {
  title: string;
  count: number;
  theme?: 'light' | 'dark';
}

export function ExplorerHeader({ title, count, theme = 'light' }: ExplorerHeaderProps) {
  return (
    <div className={`svc-explorer-head${theme === 'dark' ? ' svc-explorer-head--dark' : ''}`}>
      <span>{title}</span>
      <span className="svc-explorer-count" aria-hidden="true">
        {String(count).padStart(2, '0')}
      </span>
    </div>
  );
}

interface CapabilityItemsProps {
  items: { num: string; name: string }[];
  theme?: 'light' | 'dark';
}

export function CapabilityItems({ items, theme = 'light' }: CapabilityItemsProps) {
  return (
    <motion.div
      className={`svc-deliverables${theme === 'dark' ? ' svc-deliverables--dark' : ''}`}
      role="list"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      initial="hidden"
      animate="show"
    >
      {items.map((item) => (
        <motion.div
          key={item.num}
          className="svc-deliverable-row"
          role="listitem"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
          }}
        >
          <span className="svc-deliverable-num">{item.num}</span>
          <span className="svc-deliverable-name">{item.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}