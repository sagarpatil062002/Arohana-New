'use client';

import React from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { CapabilityItems, EASE, ExplorerHeader } from '@/components/services/CapabilityExplorer';
import type { ResolvedGroup } from '@/data/services-explorer';

interface HospitalityMapProps {
  groups: ResolvedGroup[];
  active: number;
  onActiveChange: (index: number) => void;
}

export default function HospitalityMap({ groups, active, onActiveChange }: HospitalityMapProps) {
  const current = groups[active];
  const panelId = `${current.id}-panel`;

  return (
    <div className="svc-opsmap">
      <ExplorerHeader
        title="What We Deliver"
        count={groups.reduce((n, g) => n + g.items.length, 0)}
        theme="dark"
      />
      <div className="svc-opsmap-body">
        <div className="svc-opsmap-nav">
          <LayoutGroup id="opsmap">
            {groups.map((group, gi) => {
              const isActive = gi === active;
              return (
                <button
                  key={group.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={isActive ? panelId : undefined}
                  className={`svc-opsmap-item${isActive ? ' is-active' : ''}`}
                  onClick={() => onActiveChange(gi)}
                >
                  <span className="svc-opsmap-dot">
                    {isActive && (
                      <motion.span
                        layoutId="opsmap-dot"
                        className="svc-opsmap-dot--active"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                  </span>
                  <span className="svc-opsmap-num">{group.num}</span>
                  <span className="svc-opsmap-name">{group.title}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        <div className="svc-opsmap-detail">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              id={panelId}
              role="region"
              aria-label={current.title}
              className="svc-opsmap-panel"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="svc-opsmap-panel-head">
                <span className="svc-opsmap-panel-num">{current.num}</span>
                <span className="svc-opsmap-panel-title">{current.title}</span>
              </div>
              <CapabilityItems items={current.items} theme="dark" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}