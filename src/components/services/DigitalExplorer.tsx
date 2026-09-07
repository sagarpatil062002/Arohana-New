'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CapabilityItems, EASE, ExplorerHeader } from '@/components/services/CapabilityExplorer';
import type { ResolvedGroup } from '@/data/services-explorer';

interface DigitalExplorerProps {
  groups: ResolvedGroup[];
  active: number | null;
  onActiveChange: (index: number | null) => void;
}

export default function DigitalExplorer({ groups, active, onActiveChange }: DigitalExplorerProps) {
  return (
    <div className="svc-explorer">
      <ExplorerHeader title="What We Deliver" count={groups.reduce((n, g) => n + g.items.length, 0)} />
      {groups.map((group, gi) => {
        const open = active === gi;
        const panelId = `${group.id}-panel`;
        return (
          <div key={group.id} className="svc-egroup">
            <button
              type="button"
              className={`svc-egroup-head${open ? ' is-open' : ''}`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => onActiveChange(open ? null : gi)}
            >
              <span className="svc-egroup-num">{group.num}</span>
              <span className="svc-egroup-title">{group.title}</span>
              <span className="svc-egroup-count" aria-hidden="true">
                {String(group.items.length).padStart(2, '0')}
              </span>
              <span className="svc-egroup-icon" aria-hidden="true">
                <i className="svc-egroup-icon-h" />
                <i className="svc-egroup-icon-v" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-label={group.title}
                  className="svc-egroup-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <div className="svc-egroup-inner">
                    <CapabilityItems items={group.items} theme="light" />
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