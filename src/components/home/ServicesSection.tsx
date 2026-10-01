'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCmsContent } from '@/lib/cms/content-context';

interface CapabilityItemData {
  title: string;
  tags: string[];
  image: string;
  alt: string;
  description: string;
  href: string;
}

const CAPABILITIES_DATA: CapabilityItemData[] = [
  {
    title: 'Digital Brand Growth',
    tags: ['Content Strategy', 'Social Media Management', 'Performance Marketing', 'Digital Production', 'Website Management & Branding'],
    image: '/images/services/digital-growth.jpg',
    alt: 'Digital brand growth and social media management',
    description:
      'Content strategy | Social Media Management | Performance Marketing | Digital production | Website management and branding',
    href: '/services#digital-growth',
  },
  {
    title: 'Content Production',
    tags: ['Content Ideation', 'Scripting', 'Shoot', 'Post-Production', 'Art Direction', 'Photography', 'Influencer & UGC Content', 'AI Content'],
    image: '/images/services/content-production.jpg',
    alt: 'Content and brand production from scripting through post-production',
    description:
      'Content Ideation | Scripting | Shoot | Post-production | Art Direction | Photography | Influencer & UGC content | AI content',
    href: '/services#brand-production',
  },
  {
    title: 'Hospitality & Experience',
    tags: ['Concept & Menu', 'Food & Space Shoots', 'Kitchen Pass', 'Guest Journeys'],
    image: '/images/case-studies/raysons/neora-1.jpg',
    alt: 'Neora Deck hospitality consulting and visual storytelling',
    description:
      'Menu design, operational systems, staff workflows, revenue optimisation and digital marketing for hospitality brands.',
    href: '/services#hospitality-consulting',
  },
];

interface StatData {
  id: string;
  target: number;
  suffix?: string;
  twoDigits?: boolean;
  label: string;
  detail: string;
}

const SHARP_STATS: StatData[] = [
  {
    id: 'commercial',
    target: 25,
    suffix: '+',
    label: 'Commercial Engagements',
    detail: 'Hospitality, enterprise & consumer brands',
  },
  {
    id: 'sectors',
    target: 10,
    suffix: '+',
    label: 'Industry Sectors',
    detail: 'Hospitality, Real Estate, Healthcare, Media, Travel & Defence',
  },
  {
    id: 'expeditions',
    target: 15,
    suffix: '+',
    label: 'Himalayan Expeditions',
    detail: 'Curated mountain journeys and border initiatives',
  },
];

// Sharp 3D Flipping Digit Component
// Sharp 3D Flipping Digit Component with crisp mechanical timing
function SharpFlipDigit({ digit }: { digit: string }) {
  const [animating, setAnimating] = useState(false);
  const prevDigit = useRef(digit);

  useEffect(() => {
    if (prevDigit.current !== digit) {
      prevDigit.current = digit;
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 140);
      return () => clearTimeout(t);
    }
  }, [digit]);

  return (
    <span
      className="sharp-digit-wrapper"
      style={{
        display: 'inline-block',
        minWidth: '0.62em',
        textAlign: 'center',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontVariantNumeric: 'tabular-nums lining-nums',
        lineHeight: 1,
        perspective: '400px',
        transformStyle: 'preserve-3d',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          animation: animating ? 'sharpDigitFlip 0.14s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          transformOrigin: '50% 50%',
        }}
      >
        {digit}
      </span>
    </span>
  );
}

export default function ServicesSection() {
  const { content } = useCmsContent();
  const srvCms = content?.home?.services;
  const isEnabled = srvCms?.enabled !== false;
  const showEyebrow = srvCms?.showEyebrow !== false;
  const showHeadline = srvCms?.showHeadline !== false;
  const showDescription = srvCms?.showDescription !== false;
  const isStatsEnabled = content?.home?.impactStats?.enabled !== false;
  const isPillarsEnabled = srvCms?.pillarsEnabled !== false;

  const activeEyebrow = srvCms?.eyebrow || 'CAPABILITIES & PRACTICE AREAS';
  const activeTitle = srvCms?.title || 'Three distinct capabilities. One strategic spine.';
  const activeDesc = srvCms?.description && srvCms.description.length < 200
    ? srvCms.description
    : 'Ārohana combines commercial thinking, sector experience and creative execution to build brands and operational systems across environments.';

  // Dynamic stats from CMS: memoized so references stay stable and prevent animation cancellation
  const statsList: StatData[] = useMemo(() => {
    const raw = content?.home?.impactStats?.counters || srvCms?.stats;
    const source = (raw && Array.isArray(raw))
      ? raw.filter((s: any) => s && s.enabled !== false)
      : SHARP_STATS;
    return source.map((s: any, i: number) => ({
      id: s.id || `stat-${i}`,
      target: typeof s.target === 'number' ? s.target : (parseInt(s.target, 10) || SHARP_STATS[i]?.target || 0),
      suffix: s.suffix ?? SHARP_STATS[i]?.suffix ?? '',
      twoDigits: s.twoDigits ?? SHARP_STATS[i]?.twoDigits ?? false,
      label: s.label || s.title || SHARP_STATS[i]?.label || '',
      detail: s.detail || s.desc || SHARP_STATS[i]?.detail || '',
    }));
  }, [srvCms?.stats, content?.home?.impactStats?.counters]);

  const rawCapabilities = (srvCms?.items && srvCms.items.length > 0) ? srvCms.items : CAPABILITIES_DATA;
  const capabilitiesList: CapabilityItemData[] = rawCapabilities
    .filter((item: any) => item && item.enabled !== false)
    .map((item: any, i: number) => ({
      title: item.title || CAPABILITIES_DATA[i]?.title || '',
      tags: Array.isArray(item.tags)
        ? item.tags
        : (typeof item.tags === 'string' ? item.tags.split(',').map((t: string) => t.trim()) : CAPABILITIES_DATA[i]?.tags || []),
      image: item.image || CAPABILITIES_DATA[i]?.image || '',
      alt: item.title || CAPABILITIES_DATA[i]?.alt || '',
      description: item.description || CAPABILITIES_DATA[i]?.description || '',
      href: item.href || CAPABILITIES_DATA[i]?.href || '/services',
    }));

  const sectionRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(() => statsList.map(() => 0));
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Store latest statsList in ref so animation callbacks have stable identities
  const statsListRef = useRef(statsList);
  useEffect(() => {
    statsListRef.current = statsList;
  }, [statsList]);

  const animateCounters = useCallback(() => {
    if (tweenRef.current) tweenRef.current.kill();
    const currentList = statsListRef.current;
    const targets = currentList.map((s) => s.target);
    const obj: Record<string, number> = {};
    targets.forEach((_, idx) => {
      obj[`v${idx}`] = 0;
    });
    setCounts(new Array(targets.length).fill(0));

    const toVars: gsap.TweenVars = {
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => {
        setCounts(targets.map((_, idx) => Math.round(obj[`v${idx}`] || 0)));
      },
    };
    targets.forEach((target, idx) => {
      toVars[`v${idx}`] = target;
    });

    tweenRef.current = gsap.to(obj, toVars);
  }, []);

  const resetCounters = useCallback(() => {
    if (tweenRef.current) tweenRef.current.kill();
    setCounts(new Array(statsListRef.current.length).fill(0));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Subtle image scale on scroll
      const imgElements = gsap.utils.toArray<HTMLElement>('.service-card-img');
      imgElements.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 0.6,
            },
          }
        );
      });

      // Sharp numbers animation - triggers every single time section enters view
      if (statsGridRef.current) {
        ScrollTrigger.create({
          trigger: statsGridRef.current,
          start: 'top 88%',
          end: 'bottom 12%',
          onEnter: () => animateCounters(),
          onEnterBack: () => animateCounters(),
          onLeave: () => resetCounters(),
          onLeaveBack: () => resetCounters(),
        });
      }
    }, sectionRef);

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
      ctx.revert();
    };
  }, [animateCounters, resetCounters]);

  if (!isEnabled) return null;

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#f5f5f3',
        paddingTop: '2rem',
        paddingBottom: '3.5rem',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1520px',
          margin: '0 auto',
          paddingLeft: 'clamp(1rem, 3vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 3vw, 2.5rem)',
          boxSizing: 'border-box',
          overflow: 'visible',
        }}
      >
        {/* Large Black Rounded Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: 'clamp(1.5rem, 3vw, 2.5rem)',
            padding: 'clamp(2.5rem, 4vw, 4.5rem) clamp(1.25rem, 3.5vw, 4rem) clamp(2.5rem, 5vw, 5rem)',
            boxSizing: 'border-box',
            overflow: 'visible',
          }}
        >
          {/* Header Row: Three distinct capabilities. One strategic spine. */}
          {(showEyebrow || showHeadline || showDescription) && (
            <div
              className="services-header-top"
              style={{
                width: '100%',
                paddingBottom: '2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '2.5rem',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ maxWidth: '920px' }}>
                {showEyebrow && (
                  <div
                    className="tag-mono"
                    style={{
                      color: '#DE322D',
                      marginBottom: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                    }}
                  >
                    {activeEyebrow}
                  </div>
                )}
                {showHeadline && (
                  <h2
                    style={{
                      color: '#ffffff',
                      fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
                      fontWeight: 600,
                      fontFamily: 'var(--font-display)',
                      lineHeight: 1.12,
                      letterSpacing: '-0.03em',
                      margin: '0 0 1rem 0',
                    }}
                  >
                    {activeTitle}
                  </h2>
                )}
                {showDescription && (
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.72)',
                      fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                      lineHeight: 1.6,
                      margin: 0,
                      maxWidth: '720px',
                    }}
                  >
                    {activeDesc}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ============================================================
              SHARP FLIPPING NUMBERS GRID (ANIMATES EVERY TIME IN VIEW)
              Razor-sharp linear typography, no rounded bubbly numerals
              ============================================================ */}
          {isStatsEnabled && statsList.length > 0 && (
            <div ref={statsGridRef} className="sharp-stats-grid">
              {statsList.map((stat, idx) => {
                const countVal = counts[idx] ?? 0;
                const formattedNum = stat.twoDigits && countVal < 10 ? `0${countVal}` : `${countVal}`;
                const digits = formattedNum.split('');

                return (
                  <div key={stat.id} className="sharp-stat-item">
                    <div className="sharp-stat-num-row">
                      {digits.map((d, dIdx) => (
                        <SharpFlipDigit key={dIdx} digit={d} />
                      ))}
                      {stat.suffix && <span className="sharp-stat-suffix">{stat.suffix}</span>}
                    </div>
                    <div className="sharp-stat-label">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ============================================================
              CAPABILITIES STACK: 3 DISTINCT CARDS WITHOUT NUMBER BADGES
              ============================================================ */}
          {isPillarsEnabled && capabilitiesList.length > 0 && (
            <div
              className="services-cards-stack"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              position: 'relative',
              overflow: 'visible',
              marginTop: 'clamp(2.5rem, 4vw, 4rem)',
            }}
          >
            {capabilitiesList.map((service, index) => {
              const isLast = index === capabilitiesList.length - 1;

              return (
                <div
                  key={service.title}
                  className="service-card-wrapper"
                  style={{
                    position: 'sticky',
                    top: '16vh',
                    backgroundColor: '#000000',
                    zIndex: index + 1,
                    paddingTop: '1.5rem',
                    paddingBottom: isLast ? '2.5rem' : '5rem',
                    boxSizing: 'border-box',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      marginBottom: '2rem',
                    }}
                  />

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                      gap: 'clamp(1.75rem, 4vw, 4.5rem)',
                      alignItems: 'start',
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: '#000000',
                    }}
                  >
                    {/* Left Column: Title, Reduced Copy, Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                    >                      <h3
                        style={{
                          color: '#FFFFFF',
                          fontSize: 'clamp(2.2rem, 3.4vw, 3.1rem)',
                          fontWeight: 700,
                          fontFamily: 'var(--font-display)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.1,
                          margin: '0 0 0.85rem 0',
                          padding: 0,
                        }}
                      >
                        {service.title}
                      </h3>

                      <p
                        style={{
                          color: 'rgba(255, 255, 255, 0.65)',
                          fontSize: 'clamp(0.88rem, 1.05vw, 0.98rem)',
                          lineHeight: 1.55,
                          margin: '0 0 1.5rem 0',
                          maxWidth: '460px',
                          fontWeight: 400,
                        }}
                      >
                        {service.description}
                      </p>

                      {/* Clean Tag Pills */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.45rem',
                          maxWidth: '420px',
                        }}
                      >
                        {service.tags.map((tag) => (
                          <div
                            key={tag}
                            style={{
                              padding: '0.4rem 0.85rem',
                              borderRadius: '3px',
                              backgroundColor: '#16181e',
                              color: '#a1a1aa',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              letterSpacing: '0.01em',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>

                      {/* Final Card Contact CTA */}
                      {isLast && (
                        <div style={{ marginTop: '2.5rem' }}>
                          <Link
                            href="/contact"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.65rem',
                              padding: '0.85rem 1.75rem',
                              borderRadius: '4px',
                              backgroundColor: '#ffffff',
                              color: '#000000',
                              border: '1px solid rgba(0, 0, 0, 0.12)',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              letterSpacing: '-0.01em',
                              textDecoration: 'none',
                              boxShadow: '0 8px 24px rgba(255, 255, 255, 0.15)',
                              transition: 'transform 0.25s ease, background-color 0.25s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.backgroundColor = '#f1f1f1';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.backgroundColor = '#ffffff';
                            }}
                          >
                            <span>Get in touch</span>
                            <ArrowRight size={15} />
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Right Visual Image Column */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(280px, 34vw, 400px)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="service-card-img"
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>

      <style jsx>{`
        /* ── Sharp Flipping Numbers Grid ── */
        .sharp-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.75rem, 3.5vw, 4rem);
          padding: 2.75rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          width: 100%;
        }

        .sharp-stat-item {
          display: flex;
          flex-direction: column;
          padding-right: 0.75rem;
        }

        .sharp-stat-num-row {
          display: inline-flex;
          align-items: baseline;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          font-size: clamp(3.8rem, 5.8vw, 6rem);
          font-weight: 600;
          letter-spacing: -0.04em;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 0.5rem;
          font-feature-settings: 'tnum' 1, 'zero' 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
        }

        :global(.sharp-digit-wrapper) {
          display: inline-block;
          min-width: 0.62em;
          text-align: center;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          font-variant-numeric: tabular-nums lining-nums;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .sharp-stat-suffix {
          color: #DE322D;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
          font-weight: 600;
          font-size: 0.88em;
          margin-left: 2px;
          line-height: 1;
        }

        .sharp-stat-label {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(1rem, 1.25vw, 1.16rem);
          font-weight: 600;
          color: #f4f4f5;
          margin-top: 0.25rem;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        .sharp-stat-detail {
          font-family: var(--font-body, sans-serif);
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.45;
        }

        @keyframes sharpDigitFlip {
          0% {
            transform: rotateX(0deg);
            opacity: 1;
          }
          40% {
            transform: rotateX(-65deg);
            opacity: 0.6;
          }
          60% {
            transform: rotateX(65deg);
            opacity: 0.6;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }

        @media (max-width: 991px) {
          .sharp-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .sharp-stats-grid {
            grid-template-columns: 1fr;
            gap: 1.85rem;
          }
        }
      `}</style>
    </section>
  );
}
