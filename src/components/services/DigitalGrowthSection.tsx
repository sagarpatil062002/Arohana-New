'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import type { ServicePillarContent } from '@/data/services-content';
import SectionBand from '@/components/services/SectionBand';
import DigitalExplorer from '@/components/services/DigitalExplorer';
import { DIGITAL_GROUPS, resolveGroups } from '@/data/services-explorer';
import { EASE } from '@/components/services/CapabilityExplorer';

interface DigitalGrowthSectionProps {
  pillar: ServicePillarContent;
  sectionId: string;
}

export default function DigitalGrowthSection({ pillar, sectionId }: DigitalGrowthSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const groups = resolveGroups(DIGITAL_GROUPS, pillar.deliverables, 'digital');
  const [active, setActive] = useState<number | null>(0);
  const openGroup = active !== null ? groups[active] : null;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-cine-media',
        { scale: 1.06 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.svc-cine', start: 'top 90%', end: 'bottom 20%', scrub: 0.6 },
        }
      );

      gsap.fromTo(
        '.svc-cine-caption',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-cine', start: 'top 72%', once: true } }
      );

      gsap.fromTo(
        '.svc-index-aside',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-index', start: 'top 80%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id={sectionId} className="svc-section">
        <div className="padding-global container-large">
          <SectionBand
            index={pillar.num}
            eyebrow={pillar.category}
            meta={`${groups.length} groups · ${pillar.deliverables.length} capabilities`}
          />

          <figure className="svc-cine">
            <div className="svc-cine-media">
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
              />
            </div>
            <AnimatePresence initial={false}>
              {active !== null && (
                <motion.span
                  key={active}
                  className="svc-cine-pulse"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.55 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              )}
            </AnimatePresence>
            <span className="svc-cine-ghost" aria-hidden="true">
              {pillar.num}
            </span>
            {openGroup && (
              <div className="svc-cine-ui" aria-hidden="true">
                <div className="svc-cine-chip">
                  <i className="svc-cine-chip-dot" />
                  <span className="svc-cine-chip-label">{openGroup.title}</span>
                  <span className="svc-cine-chip-num">{openGroup.num}</span>
                </div>
                <div className="svc-cine-progress">
                  {groups.map((group, gi) => (
                    <span
                      key={group.id}
                      className={`svc-cine-progress-seg${gi <= active! ? ' is-on' : ''}`}
                    />
                  ))}
                </div>
              </div>
            )}
            <figcaption className="svc-cine-caption">
              <span className="svc-cine-fig">FIG. {pillar.num} — {pillar.category}</span>
              <span className="svc-line">
                <span className="svc-line-inner svc-cine-title">{pillar.title}</span>
              </span>
            </figcaption>
          </figure>

          <div className="svc-index">
            <aside className="svc-index-aside">
              <p className="svc-sect-tagline">{pillar.tagline}</p>
              <p className="svc-sect-desc">{pillar.desc}</p>
              <p className="svc-note">
                <b>{pillar.noteLabel}:</b>
                {pillar.note}
              </p>
            </aside>

            <div className="svc-cap-list">
              <DigitalExplorer groups={groups} active={active} onActiveChange={setActive} />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}