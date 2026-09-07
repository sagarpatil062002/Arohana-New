'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ENGAGEMENT_MODELS } from '@/data/services-content';
import SectionBand from '@/components/services/SectionBand';

export default function EngagementModels() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-etl-col',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-etl', start: 'top 82%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="svc-section svc-section--dense svc-section--alt">
      <div className="padding-global container-large">
        <SectionBand
          index="04"
          eyebrow="How Engagements Work"
          meta={`${ENGAGEMENT_MODELS.length} models`}
        />

        <div className="svc-etl">
          {ENGAGEMENT_MODELS.map((model) => (
            <div className="svc-etl-col" key={model.num}>
              <span className="svc-etl-num">{model.num}</span>
              <Link href="/contact" className="svc-etl-link" aria-label={`Discuss ${model.title}`}>
                <h3 className="svc-etl-title">{model.title}</h3>
                <span className="svc-etl-arrow">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
              <span className="svc-etl-tag">Best for</span>
              <p className="svc-etl-best">{model.bestFor}</p>
              <p className="svc-etl-desc">{model.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}