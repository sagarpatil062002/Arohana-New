'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import type { ServicePillarContent } from '@/data/services-content';
import SectionBand from '@/components/services/SectionBand';
import ProductionExplorer from '@/components/services/ProductionExplorer';
import { PRODUCTION_GROUPS, resolveGroups } from '@/data/services-explorer';
import { EASE } from '@/components/services/CapabilityExplorer';

interface ProductionSectionProps {
  pillar: ServicePillarContent;
  sectionId: string;
}

export default function ProductionSection({ pillar, sectionId }: ProductionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const groups = resolveGroups(PRODUCTION_GROUPS, pillar.deliverables, 'content');
  const [active, setActive] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-asym-fig',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-asym-fig', start: 'top 88%', once: true },
        }
      );

      gsap.fromTo(
        '.svc-asym-mini',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: '.svc-asym-fig', start: 'top 88%', once: true } }
      );

      gsap.fromTo(
        '.svc-asym-title .svc-line-inner',
        { yPercent: 112 },
        { yPercent: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-asym-copy', start: 'top 78%', once: true } }
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
            meta={`${groups.length} stages · ${pillar.deliverables.length} capabilities`}
          />

          <div className="svc-asym">
            <div className="svc-asym-copy">
              <h2 className="svc-asym-title">
                <span className="svc-line">
                  <span className="svc-line-inner">{pillar.title}</span>
                </span>
              </h2>
              <p className="svc-sect-tagline">{pillar.tagline}</p>
              <p className="svc-sect-desc">{pillar.desc}</p>
              <ProductionExplorer groups={groups} active={active} onActiveChange={setActive} />
              <p className="svc-note">
                <b>{pillar.noteLabel}:</b>
                {pillar.note}
              </p>
            </div>

            <figure className="svc-asym-fig">
              <div className="svc-asym-media">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 52vw"
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                />
              </div>
              <AnimatePresence initial={false}>
                {active !== null && (
                  <motion.span
                    key={active}
                    className="svc-asym-pulse"
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                )}
              </AnimatePresence>
              <span className="svc-asym-ghost" aria-hidden="true">
                {pillar.num}
              </span>
              <figcaption className="svc-asym-caption">
                <i aria-hidden="true" />
                FIG. {pillar.num} — {pillar.category}
              </figcaption>
              {pillar.overlapImage && (
                <div className="svc-asym-mini">
                  <Image
                    src={pillar.overlapImage}
                    alt="On-ground documentary production"
                    fill
                    sizes="(max-width: 1023px) 40vw, 20vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              )}
            </figure>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}