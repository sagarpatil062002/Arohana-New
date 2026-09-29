'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';

export interface BrandItem {
  id: string;
  name: string;
  monogram: string;
  logo?: string;
  link?: string;
}

const PARTNER_BRANDS: BrandItem[] = [
  {
    id: 'raysons',
    name: 'Raysons Group',
    monogram: 'RG',
    logo: '/images/partners/raysons.svg',
    link: '/work/raysons-group',
  },
  {
    id: 'picturetime',
    name: 'PictureTime',
    monogram: 'PT',
    logo: '/uploads/1790517819970-picture-time-hero.png',
    link: '/work/picturetime',
  },
  {
    id: 'misu',
    name: 'MISU Pan-Asian',
    monogram: 'MISU',
    logo: '/uploads/1790488557207-misu.png',
    link: '/work/misu',
  },
  {
    id: 'she-project',
    name: 'SHE Project',
    monogram: 'SHE',
    logo: '/uploads/1790493040874-she-logo-04.png',
    link: '/work/she',
  },
  {
    id: 'dtk',
    name: 'DTK',
    monogram: 'DTK',
    logo: '/uploads/1790492224271-dk-kharekar-saraf.png',
    link: '/work',
  },
  {
    id: 'khau-gully',
    name: 'Khau Gully',
    monogram: 'KG',
    logo: '/uploads/1790488524999-khau-gully.png',
    link: '/work',
  },
  {
    id: 'loomcrafts',
    name: 'Loom Crafts',
    monogram: 'LC',
    logo: '/uploads/1790495564237-looms-craft.png',
    link: '/work/loom-crafts',
  },
  {
    id: 'rr-skins',
    name: 'RR Skins',
    monogram: 'RR',
    logo: '/uploads/1790521096761-rrskin-logo.jpg',
    link: '/work/rr-skins',
  },
  {
    id: 'indian-army',
    name: 'Indian Army',
    monogram: 'IA',
    logo: '/uploads/1790493031037-indian-army-logo-05.png',
    link: '/indian-army-projects',
  },
  {
    id: 'amgoc',
    name: 'AMGOC',
    monogram: 'AMG',
    logo: '/uploads/1790495501815-amgoc.png',
    link: '/work',
  },
  {
    id: 'shelkang',
    name: 'Shelkang Cafe',
    monogram: 'SC',
    logo: '/uploads/1790495487525-shelkang-cafe.png',
    link: '/work',
  },
  {
    id: 'residency',
    name: 'Residency Club Kolhapur',
    monogram: 'RC',
    logo: '/images/clients/residency-club.png',
    link: '/work',
  },
  {
    id: 'genesis',
    name: 'Genesis Clinic',
    monogram: 'GSC',
    logo: '/images/clients/genesis.png',
    link: '/work',
  },
  {
    id: 'vital-wellness',
    name: 'Vital Wellness',
    monogram: 'VW',
    logo: '/images/clients/vital-wellness.png',
    link: '/work',
  },
  {
    id: 'manchen',
    name: 'Manchen Restaurant',
    monogram: 'MR',
    logo: '/images/clients/manchen.png',
    link: '/work',
  },
  {
    id: 'spice-goa',
    name: 'Spice Goa',
    monogram: 'SG',
    link: '/work',
  },
];

export default function BrandsMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const { content } = useCmsContent();
  const brandsCms = content?.home?.brands;
  const activeHeading = brandsCms?.heading || 'Trusted by Brands & Institutions';
  const activeBrands: BrandItem[] = (brandsCms?.list && brandsCms.list.length > 0) ? brandsCms.list : PARTNER_BRANDS;

  // Seamless loop by duplicating items
  const marqueeItems = [...activeBrands, ...activeBrands];

  return (
    <section
      id="trusted-by"
      className="section-light brands-bottom-section"
      style={{
        paddingTop: 'clamp(3rem, 4.5vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 4.5vw, 4.5rem)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: '#fafaf9',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large" style={{ marginBottom: '2.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.5vw, 2.15rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#18181b',
              margin: 0,
            }}
          >
            {activeHeading}
          </h3>
        </div>
      </div>

      {/* Smooth Marquee Track able to take actual brand logos clearly and bigger */}
      <div
        className="brands-marquee-outer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '0.85rem 0',
        }}
      >
        <div className="marquee-edge-fade marquee-edge-left" />
        <div className="marquee-edge-fade marquee-edge-right" />

        <div className={`brands-marquee-track ${isPaused ? 'paused' : ''}`}>
          {marqueeItems.map((brand, idx) => (
            <Link
              key={`${brand.id}-${idx}`}
              href={brand.link || '/work'}
              className="brand-card-item"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: brand.logo ? '0.85rem 2.25rem' : '0.85rem 1.75rem',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '4px',
                textDecoration: 'none',
                flexShrink: 0,
                minHeight: '80px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {brand.logo ? (
                /* Actual brand logo displayed clearly and bigger */
                <div
                  className="brand-logo-container"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '58px',
                  }}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={220}
                    height={58}
                    style={{
                      maxHeight: '56px',
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              ) : (
                /* Sleek fallback monogram badge + brand name */
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '3px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: '#18181b',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {brand.monogram}
                  </div>
                  <span
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: '#27272a',
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {brand.name}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brands-marquee-track {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          width: max-content;
          animation: marqueeScroll 40s linear infinite;
        }

        .brands-marquee-track.paused {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .brand-card-item:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 0, 0, 0.22) !important;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08) !important;
        }

        .marquee-edge-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 90px;
          z-index: 10;
          pointer-events: none;
        }

        .marquee-edge-left {
          left: 0;
          background: linear-gradient(90deg, #fafaf9 0%, rgba(250, 250, 249, 0) 100%);
        }

        .marquee-edge-right {
          right: 0;
          background: linear-gradient(270deg, #fafaf9 0%, rgba(250, 250, 249, 0) 100%);
        }

        @media (max-width: 768px) {
          .marquee-edge-fade {
            width: 45px;
          }
          .brands-marquee-track {
            gap: 0.85rem;
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
}
