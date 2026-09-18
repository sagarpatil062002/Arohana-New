'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCmsContent } from '@/lib/cms/content-context';

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

// Clean flipping digit without any boxes or background containers
function FlipDigit({ digit }: { digit: string }) {
  const [animating, setAnimating] = useState(false);
  const prevDigit = useRef(digit);

  useEffect(() => {
    if (prevDigit.current !== digit) {
      prevDigit.current = digit;
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 240);
      return () => clearTimeout(t);
    }
  }, [digit]);

  return (
    <span
      className="flip-digit-wrapper"
      style={{
        display: 'inline-block',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1,
        perspective: '500px',
        transformStyle: 'preserve-3d',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          animation: animating ? 'cleanDigitFlip 0.24s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          transformOrigin: '50% 50%',
        }}
      >
        {digit}
      </span>
    </span>
  );
}

export default function RealWorldImpact() {
  const { content } = useCmsContent();
  const impactCms = content?.home?.impactStats;
  const activeEyebrow = impactCms?.eyebrow || 'PROOF OF WORK  ·  COMMERCIAL & SECTOR IMPACT';
  const activeHeading = impactCms?.heading || 'Real-world execution across sectors.';
  const activeItems: CounterItem[] = (impactCms?.counters && impactCms.counters.length > 0) ? impactCms.counters : IMPACT_ITEMS;

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
      // Header items fade & slide in
      gsap.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 88%', once: true },
        }
      );

      // Stat cards stagger reveal
      const cards = Array.from(grid.querySelectorAll('.rwi-stat-col'));
      gsap.fromTo(
        cards,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        }
      );

      // Animated numerical counter triggering clean flipping digits
      const obj = { v0: 0, v1: 0, v2: 0, v3: 0 };
      ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v0: activeItems[0]?.target || 0,
            v1: activeItems[1]?.target || 0,
            v2: activeItems[2]?.target || 0,
            v3: activeItems[3]?.target || 0,
            duration: 2.2,
            ease: 'power3.out',
            onUpdate: () =>
              setCounts([
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
  }, [activeItems]);

  return (
    <section
      id="proof-of-work"
      ref={sectionRef}
      className="section-light rwi-section"
      style={{
        paddingTop: 'clamp(4.5rem, 6.5vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 6.5vw, 6.5rem)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large">
        {/* ============================================================
            HEADER ROW: Eyebrow + Headline (Left), Triad (Center), CTA (Right)
            ============================================================ */}
        <div ref={headerRef} className="rwi-header-row">
          {/* Left: Eyebrow Tag + Main Headline */}
          <div className="rwi-header-left">
            <div className="rwi-eyebrow">
              {activeEyebrow}
            </div>

            <h2 className="rwi-headline">
              {activeHeading}
            </h2>
          </div>

          {/* Middle-Right: IDEAS ──── EXECUTION IMPACT */}
          <div className="rwi-triad-col">
            <div className="rwi-triad">
              <div className="rwi-triad-row">
                <span className="rwi-triad-word">IDEAS</span>
                <span className="rwi-triad-rule" />
              </div>
              <span className="rwi-triad-word">EXECUTION</span>
              <span className="rwi-triad-word">IMPACT</span>
            </div>
          </div>

          {/* Right: CTA Button with Decorative Concentric Arcs */}
          <div className="rwi-cta-container">
            {/* Decorative Arcs from Reference Image */}
            <svg
              className="rwi-decorative-arcs"
              width="150"
              height="150"
              viewBox="0 0 150 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 150,0 A 105,105 0 0,0 45,105 A 105,105 0 0,0 150,210"
                stroke="rgba(0, 0, 0, 0.08)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 150,20 A 85,85 0 0,0 65,105 A 85,85 0 0,0 150,190"
                stroke="#DE322D"
                strokeWidth="1.5"
                fill="none"
                opacity="0.85"
              />
            </svg>

            <Link href="/work" className="rwi-pill-button">
              <span>See our work</span>
              <ArrowRight size={16} className="rwi-pill-arrow" />
            </Link>
          </div>
        </div>

        {/* ============================================================
            DIVIDER LINE
            ============================================================ */}
        <div className="rwi-divider" />

        {/* ============================================================
            4-COLUMN STATS GRID: Clean Flipping Numbers (NO BOXES)
            ============================================================ */}
        <div ref={gridRef} className="rwi-stats-grid">
          {activeItems.map((item, idx) => {
            const v = counts[idx] ?? 0;
            const numStr = item.twoDigits && v < 10 ? `0${v}` : `${v}`;
            const digits = numStr.split('');

            return (
              <div key={item.id} className="rwi-stat-col">
                {/* 01 ──── VERIFIED IMPACT */}
                <div className="rwi-tag-row">
                  <span className="rwi-tag-num">{item.tag}</span>
                  <span className="rwi-tag-dash" />
                  <span className="rwi-tag-label">VERIFIED IMPACT</span>
                </div>

                {/* Big Clean Flipping Numbers (Direct on White Background, NO BOXES) */}
                <div className="rwi-stat-number" aria-label={numStr + (item.suffix ?? '')}>
                  <div className="rwi-flip-digits-row">
                    {digits.map((d, dIdx) => (
                      <FlipDigit key={dIdx} digit={d} />
                    ))}
                  </div>
                  {item.suffix && <span className="rwi-num-plus">{item.suffix}</span>}
                </div>

                {/* Title */}
                <h3 className="rwi-stat-title">{item.title}</h3>

                {/* Bottom Accent Dash */}
                <div className="rwi-stat-underline" />

                {/* Description */}
                <p className="rwi-stat-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /* ── Header Row ── */
        .rwi-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          position: relative;
        }

        .rwi-header-left {
          flex: 1;
          max-width: 650px;
        }

        .rwi-eyebrow {
          color: #DE322D;
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
          display: inline-block;
        }

        .rwi-headline {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(2.2rem, 4.4vw, 3.8rem);
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0b1a33;
          margin: 0;
        }

        .rwi-red-dot {
          color: #DE322D;
        }

        /* ── Triad: IDEAS ──── EXECUTION IMPACT ── */
        .rwi-triad-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1.5rem;
        }

        .rwi-triad {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .rwi-triad-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .rwi-triad-word {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #8c9ba5;
        }

        .rwi-triad-rule {
          width: 50px;
          height: 1px;
          background-color: #cbd5e1;
          display: inline-block;
        }

        /* ── Right CTA Container & Arcs ── */
        .rwi-cta-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.5rem;
        }

        .rwi-decorative-arcs {
          position: absolute;
          right: -2.5rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 0;
          overflow: visible;
        }

        .rwi-pill-button {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background-color: #000000;
          color: #ffffff;
          padding: 0.75rem 1.65rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          font-family: var(--font-display, sans-serif);
          font-size: 0.88rem;
          font-weight: 550;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .rwi-pill-button:hover {
          background-color: #222226;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
        }

        .rwi-pill-button:hover :global(.rwi-pill-arrow) {
          transform: translate(2px, -2px);
        }

        :global(.rwi-pill-arrow) {
          transition: transform 0.25s ease;
        }

        /* ── Divider ── */
        .rwi-divider {
          width: 100%;
          height: 1px;
          background-color: rgba(0, 0, 0, 0.08);
          margin-top: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
        }

        /* ── 4-Column Stats Grid ── */
        .rwi-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: start;
        }

        .rwi-stat-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 clamp(0.75rem, 1.8vw, 2rem);
          position: relative;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .rwi-stat-col:not(:last-child) {
          border-right: 1px solid rgba(0, 0, 0, 0.08);
        }

        .rwi-stat-col:hover {
          transform: translateY(-4px);
        }

        .rwi-stat-col:hover .rwi-stat-underline {
          width: 52px;
          background-color: #DE322D;
        }

        /* ── Tag Row: 01 ──── VERIFIED IMPACT ── */
        .rwi-tag-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          margin-bottom: 0.85rem;
        }

        .rwi-tag-num {
          color: #DE322D;
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        .rwi-tag-dash {
          width: 28px;
          height: 1.5px;
          background-color: #94a3b8;
          display: inline-block;
        }

        .rwi-tag-label {
          color: #64748b;
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ── Clean Flipping Numbers (NO BOXES) ── */
        .rwi-stat-number {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          font-size: clamp(3.6rem, 5.8vw, 5.6rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #0b1a33;
          margin-bottom: 0.85rem;
          display: flex;
          align-items: baseline;
          justify-content: center;
        }

        .rwi-flip-digits-row {
          display: inline-flex;
          align-items: baseline;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        }

        .rwi-num-plus {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          color: #DE322D;
          font-weight: 700;
          margin-left: 2px;
          line-height: 1;
        }

        /* ── Stat Title ── */
        .rwi-stat-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(1.02rem, 1.2vw, 1.18rem);
          font-weight: 500;
          color: #0b1a33;
          letter-spacing: -0.015em;
          margin: 0;
          line-height: 1.3;
        }

        /* ── Bottom Underline Dash ── */
        .rwi-stat-underline {
          width: 34px;
          height: 1.5px;
          background-color: #cbd5e1;
          margin-top: 14px;
          margin-bottom: 12px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Description ── */
        .rwi-stat-desc {
          font-family: var(--font-body, sans-serif);
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
          max-width: 240px;
        }

        @keyframes cleanDigitFlip {
          0% {
            transform: rotateX(70deg) translateY(-8%);
            opacity: 0.2;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: rotateX(0deg) translateY(0);
            opacity: 1;
          }
        }

        /* ── Responsive Behavior ── */
        @media (max-width: 1024px) {
          .rwi-header-row {
            flex-wrap: wrap;
            gap: 1.75rem;
          }
          .rwi-triad-col {
            padding: 0;
          }
          .rwi-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 2.5rem;
          }
          .rwi-stat-col:nth-child(odd) {
            border-right: 1px solid rgba(0, 0, 0, 0.08);
          }
          .rwi-stat-col:nth-child(even) {
            border-right: none;
          }
        }

        @media (max-width: 640px) {
          .rwi-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .rwi-triad-col {
            display: none;
          }
          .rwi-cta-container {
            width: 100%;
            justify-content: flex-start;
          }
          .rwi-decorative-arcs {
            display: none;
          }
          .rwi-stats-grid {
            grid-template-columns: 1fr;
            row-gap: 2.25rem;
          }
          .rwi-stat-col {
            border-right: none !important;
            padding: 0;
          }
          .rwi-stat-number {
            font-size: clamp(3rem, 12vw, 4.2rem);
          }
        }
      `}</style>
    </section>
  );
}
