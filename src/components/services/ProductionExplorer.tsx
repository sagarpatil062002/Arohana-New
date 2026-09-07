'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CapabilityItems, EASE, ExplorerHeader } from '@/components/services/CapabilityExplorer';
import type { ResolvedGroup } from '@/data/services-explorer';

interface ProductionExplorerProps {
  groups: ResolvedGroup[];
  active: number | null;
  onActiveChange: (index: number | null) => void;
}

export default function ProductionExplorer({
  groups,
  active,
  onActiveChange,
}: ProductionExplorerProps) {
  return (
    <div className="svc-explorer svc-stage">
      <ExplorerHeader title="What We Deliver" count={groups.reduce((n, g) => n + g.items.length, 0)} />
      <div className="svc-stage-body">
        <span className="svc-stage-rail" aria-hidden="true">
          <motion.span
            className="svc-stage-rail-inner"
            animate={{ scaleY: active !== null ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </span>
        <div className="svc-stage-list">
          {groups.map((group, gi) => {
            const open = active === gi;
            const panelId = `stage-${group.id}-panel`;
            return (
              <div key={group.id} className="svc-stage-row">
                <button
                  type="button"
                  className={`svc-stage-head${open ? ' is-open' : ''}`}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => onActiveChange(open ? null : gi)}
                >
                  <span className="svc-stage-num">{group.num}</span>
                  <span className="svc-stage-title">{group.title}</span>
                  <span className="svc-stage-count" aria-hidden="true">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={group.title}
                      className="svc-stage-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <CapabilityItems items={group.items} theme="light" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}