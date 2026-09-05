'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CounterItem {
  id: string;
  tag: string;
  target: number;
  suffix?: string;
  twoDigits?: boolean;
  title: string;
  desc: string;
}

const IMPACT_ITEMS: CounterItem[] = [
  {
    id: 'commercial',
    tag: '01',
    target: 25,
    suffix: '+',
    title: 'Commercial Engagements',
    desc: 'Direct partnerships across hospitality, enterprise & consumer brands.',
  },
  {
    id: 'sectors',
    tag: '02',
    target: 6,
    twoDigits: true,
    title: 'Industry Sectors',
    desc: 'Hospitality, Real Estate, Healthcare, Media, Travel & Defence.',
  },
  {
    id: 'cases',
    tag: '03',
    target: 8,
    twoDigits: true,
    title: 'Featured Case Studies',
    desc: 'In-depth multi-entity execution, retainers and technical production.',
  },
  {
    id: 'expeditions',
    tag: '04',
    target: 15,
    suffix: '+',
    title: 'Himalayan Expeditions',
    desc: 'Curated high-altitude journeys and community homestay initiatives.',
  },
];

export default function RealWorldImpact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!el || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Header items stagger in
      gsap.fromTo(
        Array.from(header.children),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: header, start: 'top 88%', once: true },
        }
      );

      // Cards stagger reveal
      const cards = Array.from(grid.querySelectorAll('.rwi-card'));
      gsap.fromTo(
        cards,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.09,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        }
      );

      // Number counters
      const obj = { v0: 0, v1: 0, v2: 0, v3: 0 };
      ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v0: IMPACT_ITEMS[0].target,
            v1: IMPACT_ITEMS[1].target,
            v2: IMPACT_ITEMS[2].target,
            v3: IMPACT_ITEMS[3].target,
            duration: 2.2,
            ease: 'power3.out',
            onUpdate: () => setCounts([
              Math.round(obj.v0),
              Math.round(obj.v1),
              Math.round(obj.v2),
              Math.round(obj.v3),
            ]),
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-light rwi-section"
      style={{
        paddingTop: 'clamp(4rem, 6vw, 6rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large">

        {/* ── Header row ── */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            paddingBottom: 'clamp(1.25rem, 2.5vw, 2rem)',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                marginBottom: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#DE322D',
                  flexShrink: 0,
                }}
              />
              PROOF OF WORK&nbsp;&nbsp;·&nbsp;&nbsp;COMMERCIAL & SECTOR IMPACT
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#111111',
                margin: 0,
              }}
            >
              Real-world execution across sectors.
            </h2>
          </div>

          <Link
            href="/work"
            className="button-editorial button-editorial-dark"
            style={{ height: '46px', padding: '0 1.6rem', flexShrink: 0 }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item">See our work</span>
              <span className="button-text-item">See our work</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* ── 4-col grid — all columns top-aligned, equal width ── */}
        <div ref={gridRef} className="rwi-grid">
          {IMPACT_ITEMS.map((item, idx) => {
            const v = counts[idx];
            const numStr = item.twoDigits && v < 10 ? `0${v}` : `${v}`;

            return (
              <div key={item.id} className="rwi-card">

                {/* top border */}
                <div className="rwi-border" />

                {/* tag */}
                <p className="rwi-tag">
                  {item.tag}&nbsp;·&nbsp;VERIFIED IMPACT
                </p>

                {/* big number */}
                <div className="rwi-number" aria-label={numStr + (item.suffix ?? '')}>
                  {numStr}
                  {item.suffix && <span className="rwi-suffix">{item.suffix}</span>}
                </div>

                {/* label + desc */}
                <div className="rwi-text">
                  <h3 className="rwi-label">{item.title}</h3>
                  <p className="rwi-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
