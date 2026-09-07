'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import type { ServicePillarContent } from '@/data/services-content';
import SectionBand from '@/components/services/SectionBand';
import HospitalityMap from '@/components/services/HospitalityMap';
import { HOSPITALITY_GROUPS, resolveGroups } from '@/data/services-explorer';
import { EASE } from '@/components/services/CapabilityExplorer';

interface HospitalitySectionProps {
  pillar: ServicePillarContent;
  sectionId: string;
}

export default function HospitalitySection({ pillar, sectionId }: HospitalitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const groups = resolveGroups(HOSPITALITY_GROUPS, pillar.deliverables, 'hospitality');
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-plate-media',
        { scale: 1.07 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.svc-plate-fig', start: 'top 90%', end: 'bottom 20%', scrub: 0.6 },
        }
      );

      gsap.fromTo(
        '.svc-plate-rail',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.1, ease: 'power3.out', transformOrigin: '50% 0%',
          scrollTrigger: { trigger: '.svc-plate-fig', start: 'top 84%', once: true } }
      );

      gsap.fromTo(
        '.svc-plate-copy > *',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-plate-copy', start: 'top 82%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tickerItems = [pillar.note, pillar.note];

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id={sectionId} className="svc-section svc-section--tall svc-section--dark">
        <div className="padding-global container-large">
          <SectionBand
            index={pillar.num}
            eyebrow={pillar.category}
            meta={`${groups.length} areas · ${pillar.deliverables.length} modules`}
            theme="dark"
          />

          <div className="svc-plate">
            <div className="svc-plate-copy">
              <h2 className="svc-sect-title svc-sect-title--dark">{pillar.title}</h2>
              <p className="svc-sect-tagline svc-sect-tagline--dark">{pillar.tagline}</p>
              <p className="svc-sect-desc svc-sect-desc--dark">{pillar.desc}</p>
            </div>

            <figure className="svc-plate-fig">
              <div className="svc-plate-media">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 46vw"
                  style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
                />
              </div>
              <AnimatePresence initial={false}>
                {(
                  <motion.span
                    key={active}
                    className="svc-plate-pulse"
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.55 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                )}
              </AnimatePresence>
              <span className="svc-plate-ghost" aria-hidden="true">
                {pillar.num}
              </span>
              <span className="svc-plate-rail" aria-hidden="true" />
              <figcaption className="svc-plate-caption">
                <i aria-hidden="true" />
                Built from real hospitality experience
              </figcaption>
            </figure>

            <HospitalityMap groups={groups} active={active} onActiveChange={setActive} />
          </div>

          <div className="svc-impact">
            <span className="svc-impact-kicker">{pillar.noteLabel}</span>
            <div className="svc-ticker">
              <div className="svc-ticker-track">
                {tickerItems.map((text, group) => (
                  <div className="svc-ticker-group" key={group} aria-hidden={group === 1}>
                    <span className="svc-ticker-item">
                      <i aria-hidden="true" />
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}