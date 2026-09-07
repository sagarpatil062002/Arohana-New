'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

interface BrandItem {
  id: string;
  name: string;
  monogram: string;
  badgeBg: string;
  badgeColor: string;
  link: string;
}

const PARTNER_BRANDS: BrandItem[] = [
  {
    id: 'raysons',
    name: 'Raysons Group',
    monogram: 'RG',
    badgeBg: '#0066B3',
    badgeColor: '#ffffff',
    link: '/work/raysons-group',
  },
  {
    id: 'picturetime',
    name: 'PictureTime',
    monogram: 'PT',
    badgeBg: 'linear-gradient(135deg, #E50914 0%, #831010 100%)',
    badgeColor: '#ffffff',
    link: '/work/picturetime',
  },
  {
    id: 'khau-gully',
    name: 'Khau Gully',
    monogram: 'KG',
    badgeBg: '#E65100',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'tranquil-studio',
    name: 'Tranquil Studio',
    monogram: 'TS',
    badgeBg: '#2E4053',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'she-project',
    name: 'SHE Project',
    monogram: 'SHE',
    badgeBg: 'linear-gradient(135deg, #DE322D 0%, #B22222 100%)',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'dtk',
    name: 'DTK',
    monogram: 'DTK',
    badgeBg: '#1A2E40',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'tourin',
    name: 'Tourin',
    monogram: 'TRN',
    badgeBg: 'linear-gradient(135deg, #0B3C5D 0%, #1D2731 100%)',
    badgeColor: '#ffffff',
    link: '/tourin',
  },
  {
    id: 'vital-wellness',
    name: 'Vital Wellness',
    monogram: 'VW',
    badgeBg: 'linear-gradient(135deg, #6A38EB 0%, #9B51E0 100%)',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'residency-club',
    name: 'Residency Club Kolhapur',
    monogram: 'RC',
    badgeBg: '#1B4D3E',
    badgeColor: '#E6CA65',
    link: '/work',
  },
  {
    id: 'blu-resorts',
    name: 'blu Resorts',
    monogram: 'blu',
    badgeBg: 'linear-gradient(135deg, #00A3E0 0%, #0072CE 100%)',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'amgoc',
    name: 'AMGOC',
    monogram: 'AMG',
    badgeBg: '#F36F21',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'fraganta',
    name: 'Fraganta',
    monogram: 'FG',
    badgeBg: '#D4AF37',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'spice-goa',
    name: 'Spice Goa',
    monogram: 'SG',
    badgeBg: '#C41E3A',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'babies-world',
    name: 'Babies World',
    monogram: 'BW',
    badgeBg: 'linear-gradient(135deg, #E0218A 0%, #00C7B7 100%)',
    badgeColor: '#ffffff',
    link: '/work',
  },
  {
    id: 'shelkhang',
    name: 'Shelkhang',
    monogram: 'SK',
    badgeBg: '#2B547E',
    badgeColor: '#ffffff',
    link: '/tourin',
  },
  {
    id: 'misu',
    name: 'MISU Pan-Asian',
    monogram: 'MISU',
    badgeBg: '#1c1c1e',
    badgeColor: '#ffffff',
    link: '/work',
  },
];

export default function BrandsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  const { content } = useCmsContent();
  const brandsCms = content?.home?.brands;
  const activeEyebrow = brandsCms?.eyebrow || 'TRUSTED BY';
  const activeHeading = brandsCms?.heading || "Brands and organisations we've worked with.";
  const activeBrands = (brandsCms?.list && brandsCms.list.length > 0) ? brandsCms.list : PARTNER_BRANDS;

  // Duplicate items for a seamless infinite loop
  const marqueeItems = [...activeBrands, ...activeBrands];

  return (
    <section
      id="trusted-by"
      className="section-light trusted-by-section"
      style={{
        paddingTop: 'clamp(3.5rem, 5vw, 5.5rem)',
        paddingBottom: 'clamp(3.5rem, 5vw, 5.5rem)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large">
        {/* ============================================================
            SPLIT LAYOUT: Left Column (~42%) + Right Column (~58%)
            ============================================================ */}
        <div className="trusted-split-grid">
          {/* LEFT COLUMN: Title, Tag, Paragraph & CTA Link */}
          <div className="trusted-left-col">
            {/* Tag / Eyebrow: TRUSTED BY */}
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                marginBottom: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#DE322D',
                }}
              />
              {activeEyebrow}
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.1rem, 3.6vw, 3.4rem)',
                lineHeight: 1.1,
                fontWeight: 500,
                letterSpacing: '-0.035em',
                color: '#111111',
                margin: 0,
                marginBottom: '1rem',
              }}
            >
              {activeHeading}
            </h2>

            {/* Descriptive Paragraph */}
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                color: '#555555',
                lineHeight: 1.6,
                margin: 0,
                marginBottom: '1.75rem',
                maxWidth: '480px',
              }}
            >
              From industry leaders to ambitious startups, we collaborate with partners who believe in
              building what&apos;s next.
            </p>

            {/* View All Partners Link */}
            <div>
              <Link
                href="/work"
                className="button-editorial button-editorial-dark"
                style={{
                  height: '46px',
                  padding: '0 1.65rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  textDecoration: 'none',
                }}
              >
                <span>View All Partners</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Single-line Horizontally Scrolling Logo Marquee */}
          <div
            className="trusted-right-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Edge Gradients for Soft Visual Fade */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: 'clamp(30px, 5vw, 60px)',
                background: 'linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: 'clamp(30px, 5vw, 60px)',
                background: 'linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />

            {/* Single Marquee Track (Right to Left) with Square Logo Cards */}
            <div
              className="trusted-marquee-track track-single"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.15rem',
                width: 'max-content',
                animation: 'splitMarqueeRightToLeft 32s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
                willChange: 'transform',
                padding: '0.6rem 0',
              }}
            >
              {marqueeItems.map((brand, idx) => (
                <Link
                  key={`${brand.id}-${idx}`}
                  href={brand.link}
                  title={brand.name}
                  aria-label={brand.name}
                  className="brand-square-card"
                  style={{
                    width: '92px',
                    height: '92px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    flexShrink: 0,
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* Square Logo Mark - ONLY Logo, No Brand Name or Tags */}
                  <div
                    className="brand-logo-mark"
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '6px',
                      background: brand.badgeBg,
                      color: brand.badgeColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize:
                        brand.monogram.length > 3
                          ? '0.78rem'
                          : brand.monogram.length === 3
                          ? '0.9rem'
                          : '1.05rem',
                      letterSpacing: '0.04em',
                      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.25s ease',
                    }}
                  >
                    {brand.monogram}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trusted-split-grid {
          display: grid;
          grid-template-columns: 42% 58%;
          align-items: center;
          gap: clamp(2rem, 4vw, 4rem);
        }

        .trusted-left-col {
          display: flex;
          flex-direction: column;
          justifyContent: center;
        }

        .trusted-right-col {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: 0.5rem 0;
        }

        .brand-square-card:hover {
          transform: translateY(-3px);
          border-color: #DE322D !important;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08) !important;
        }

        .brand-square-card:hover .brand-logo-mark {
          transform: scale(1.08);
        }

        @keyframes splitMarqueeRightToLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trusted-marquee-track {
            animation: none !important;
          }
        }

        @media (max-width: 991px) {
          .trusted-split-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .trusted-left-col {
            max-width: 680px;
          }
        }
      `}</style>
    </section>
  );
}
