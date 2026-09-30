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
  const { content } = useCmsContent();
  const brandsCms = content?.home?.brands;
  const activeHeading = brandsCms?.heading || 'Trusted by Brands & Institutions';
  const activeBrands: BrandItem[] = (brandsCms?.list && brandsCms.list.length > 0) ? brandsCms.list : PARTNER_BRANDS;

  const renderBrandCard = (brand: BrandItem, idx: number, prefix: string) => (
    <Link
      key={`${prefix}-${brand.id}-${idx}`}
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
  );

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

      {/* Continuously Flowing Marquee Track - Never Sticks or Pauses */}
      <div
        className="brands-marquee-outer"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '0.85rem 0',
          display: 'flex',
        }}
      >
        <div className="marquee-edge-fade marquee-edge-left" />
        <div className="marquee-edge-fade marquee-edge-right" />

        <div className="brands-marquee-track">
          {activeBrands.map((brand, idx) => renderBrandCard(brand, idx, 't1'))}
        </div>
        <div className="brands-marquee-track" aria-hidden="true">
          {activeBrands.map((brand, idx) => renderBrandCard(brand, idx, 't2'))}
        </div>
      </div>

      <style jsx>{`
        .brands-marquee-outer {
          display: flex;
          width: 100%;
          overflow: hidden;
          user-select: none;
        }

        .brands-marquee-track {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-right: 1.25rem;
          flex-shrink: 0;
          animation: marqueeContinuous 38s linear infinite;
          will-change: transform;
        }

        @keyframes marqueeContinuous {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
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
            padding-right: 0.85rem;
            animation-duration: 28s;
          }
        }
      `}</style>
    </section>
  );
}
