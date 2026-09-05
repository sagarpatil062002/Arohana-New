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
  plus?: boolean;
  twoDigits?: boolean;
  title: string;
  desc: string;
}

const IMPACT_ITEMS: CounterItem[] = [
  {
    id: 'commercial',
    tag: '01',
    target: 25,
    plus: true,
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
    plus: true,
    title: 'Himalayan Expeditions',
    desc: 'Curated high-altitude journeys and community homestay initiatives.',
  },
];

// Single mechanical split-flap digit card
function FlipDigit({ digit }: { digit: string }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 'clamp(32px, 4vw, 44px)',
        height: 'clamp(52px, 6.5vw, 68px)',
        backgroundColor: '#0c0c0e',
        color: '#ffffff',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Mechanical horizontal split line */}
      <div
        style={{
          position: 'absolute',
          insetInline: 0,
          top: '50%',
          height: '1px',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          boxShadow: '0 1px 1px rgba(255, 255, 255, 0.1)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 2, fontVariantNumeric: 'tabular-nums' }}>
        {digit}
      </span>
    </div>
  );
}

export default function RealWorldImpact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val0: 0, val1: 0, val2: 0, val3: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val0: IMPACT_ITEMS[0].target,
            val1: IMPACT_ITEMS[1].target,
            val2: IMPACT_ITEMS[2].target,
            val3: IMPACT_ITEMS[3].target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              setCounts([
                Math.round(obj.val0),
                Math.round(obj.val1),
                Math.round(obj.val2),
                Math.round(obj.val3),
              ]);
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-light"
      style={{
        paddingTop: 'clamp(4rem, 6vw, 6rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large">
        {/* Header with Title & See our work CTA */}
        <div
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
                color: '#ff3b30',
                marginBottom: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
              }}
            >
              <span>[ PROOF OF WORK ]</span>
              <span style={{ color: '#aaa' }}>•</span>
              <span style={{ color: '#777' }}>Commercial & Sector Impact</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: '#111111',
              }}
            >
              Real-world execution across sectors.
            </h2>
          </div>

          <Link
            href="/work"
            className="button-editorial button-editorial-dark"
            style={{
              height: '46px',
              padding: '0 1.6rem',
            }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item">See our work</span>
              <span className="button-text-item">See our work</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* 4 Flipping Mechanical Impact Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {IMPACT_ITEMS.map((item, idx) => {
            const currentVal = counts[idx];
            const strVal =
              item.twoDigits || currentVal < 10
                ? currentVal < 10
                  ? `0${currentVal}`
                  : `${currentVal}`
                : `${currentVal}`;

            const digits = strVal.split('');

            return (
              <div
                key={item.id}
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderRadius: '24px',
                  backgroundColor: '#f8f8f6',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.75rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(222, 50, 45, 0.35)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
                }}
              >
                {/* Top Badge Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#DE322D',
                    }}
                  >
                    [ {item.tag} ]
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: '#888888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Verified Impact
                  </span>
                </div>

                {/* Mechanical Flipping Digits */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {digits.map((d, dIdx) => (
                    <FlipDigit key={dIdx} digit={d} />
                  ))}

                  {item.plus && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                        fontWeight: 700,
                        color: '#DE322D',
                        marginLeft: '0.25rem',
                      }}
                    >
                      +
                    </span>
                  )}
                </div>

                {/* Info Text */}
                <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '1rem' }}>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#111111',
                      marginBottom: '0.4rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#666666',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
