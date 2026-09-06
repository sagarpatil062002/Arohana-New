'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ClientLogoItem {
  id: string;
  name: string;
  sub: string;
  badgeBg: string;
  badgeColor: string;
  textColor: string;
  monogram: string;
  link?: string;
  isSpecial?: 'badge' | 'more';
}

const PRIMARY_CLIENTS: ClientLogoItem[] = [
  {
    id: 'she-project',
    name: 'SHE Project',
    sub: 'Livelihood & Healthcare · Ladakh',
    badgeBg: 'linear-gradient(135deg, #DE322D 0%, #B22222 100%)',
    badgeColor: '#ffffff',
    textColor: '#DE322D',
    monogram: 'SHE',
    link: '/work',
  },
  {
    id: 'dtk',
    name: 'DTK',
    sub: 'High-Altitude Operations & Logistics',
    badgeBg: '#1A2E40',
    badgeColor: '#ffffff',
    textColor: '#1A2E40',
    monogram: 'DTK',
    link: '/work',
  },
  {
    id: 'jewellery-metal',
    name: 'Jewellery & Metal',
    sub: 'Artisanal Craft & Luxury Metals',
    badgeBg: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)',
    badgeColor: '#ffffff',
    textColor: '#A07010',
    monogram: 'J&M',
    link: '/work',
  },
  {
    id: 'touring',
    name: 'Touring',
    sub: 'Conscious Experiential Journeys',
    badgeBg: 'linear-gradient(135deg, #0B3C5D 0%, #1D2731 100%)',
    badgeColor: '#ffffff',
    textColor: '#0B3C5D',
    monogram: 'TRN',
    link: '/tourin',
  },
  {
    id: 'raysons',
    name: 'Raysons Group',
    sub: 'Industrial Castings & Real Estate',
    badgeBg: '#0066B3',
    badgeColor: '#ffffff',
    textColor: '#005291',
    monogram: 'RG',
    link: '/work/raysons-group',
  },
  {
    id: 'picturetime',
    name: 'PictureTime',
    sub: 'Inflatable Cinema & High-Altitude Media',
    badgeBg: 'linear-gradient(135deg, #E50914 0%, #831010 100%)',
    badgeColor: '#ffffff',
    textColor: '#B80810',
    monogram: 'PT',
    link: '/work/picturetime',
  },
  {
    id: 'badge-plus-8',
    name: '+8',
    sub: 'Collaborations',
    badgeBg: '#111111',
    badgeColor: '#ffffff',
    textColor: '#111111',
    monogram: '+8',
    isSpecial: 'badge',
  },
  {
    id: 'more-partners',
    name: 'More Partners',
    sub: 'View all engagements',
    badgeBg: '#111111',
    badgeColor: '#ffffff',
    textColor: '#111111',
    monogram: '↗',
    link: '/work',
    isSpecial: 'more',
  },
  // Additional studio partners from Hero Image reference
  {
    id: 'vital',
    name: 'VITAL WELLNESS',
    sub: 'Clinical Care & Preventive Health',
    badgeBg: 'linear-gradient(135deg, #6A38EB 0%, #9B51E0 100%)',
    badgeColor: '#ffffff',
    textColor: '#5B2EE4',
    monogram: 'VW',
    link: '/work',
  },
  {
    id: 'residency',
    name: 'Residency Club Kolhapur',
    sub: 'Heritage Hospitality · Kolhapur',
    badgeBg: '#1B4D3E',
    badgeColor: '#E6CA65',
    textColor: '#1B4D3E',
    monogram: 'RC',
    link: '/work',
  },
  {
    id: 'blu',
    name: 'blu RESORTS VAGATOR GOA',
    sub: 'Experiential Leisure & Hospitality',
    badgeBg: 'linear-gradient(135deg, #00A3E0 0%, #0072CE 100%)',
    badgeColor: '#ffffff',
    textColor: '#0085BA',
    monogram: 'blu',
    link: '/work',
  },
  {
    id: 'amgoc',
    name: 'AMGOC',
    sub: 'Abhijeet Magdum Group · Real Estate',
    badgeBg: '#F36F21',
    badgeColor: '#ffffff',
    textColor: '#D9580D',
    monogram: 'AMG',
    link: '/work',
  },
  {
    id: 'fraganta',
    name: 'FRAGANTA',
    sub: 'Artisanal Perfumery & Scents',
    badgeBg: '#D4AF37',
    badgeColor: '#ffffff',
    textColor: '#B89025',
    monogram: 'FG',
    link: '/work',
  },
  {
    id: 'spicegoa',
    name: 'Spice Goa',
    sub: 'Coastal Heritage Gastronomy',
    badgeBg: '#C41E3A',
    badgeColor: '#ffffff',
    textColor: '#A0152D',
    monogram: 'SG',
    link: '/work',
  },
  {
    id: 'babiesworld',
    name: 'Babies World',
    sub: 'Premium Childcare & Retail',
    badgeBg: 'linear-gradient(135deg, #E0218A 0%, #00C7B7 100%)',
    badgeColor: '#ffffff',
    textColor: '#C71676',
    monogram: 'BW',
    link: '/work',
  },
  {
    id: 'shelkhang',
    name: 'Shelkhang',
    sub: 'High-Altitude Homestays · Ladakh',
    badgeBg: '#2B547E',
    badgeColor: '#ffffff',
    textColor: '#234466',
    monogram: 'SK',
    link: '/tourin',
  },
  {
    id: 'misu',
    name: 'MISU Pan-Asian',
    sub: 'Fine Dining & Hospitality',
    badgeBg: '#1c1c1e',
    badgeColor: '#ffffff',
    textColor: '#222222',
    monogram: 'MISU',
    link: '/work',
  },
];

export default function ClientLogoMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  // Repeat items for seamless 100% -> 0% Left to Right looping
  const marqueeItems = [...PRIMARY_CLIENTS, ...PRIMARY_CLIENTS];

  return (
    <div
      className="trusted-marquee-viewport"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        paddingTop: '0.75rem',
        paddingBottom: '1rem',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft gradient edge fade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 'clamp(40px, 8vw, 140px)',
          background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 100%)',
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
          width: 'clamp(40px, 8vw, 140px)',
          background: 'linear-gradient(270deg, #ffffff 0%, rgba(255,255,255,0) 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Marquee Track: Smooth Continuous Left -> Right Movement */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          width: 'max-content',
          animation: 'marqueeLeftToRight 42s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {marqueeItems.map((client, idx) => {
          // Special element: Distinctive Circular "+8" Badge
          if (client.isSpecial === 'badge') {
            return (
              <div
                key={`badge-${idx}`}
                style={{
                  width: '92px',
                  height: '92px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '2px dashed rgba(0, 0, 0, 0.18)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  margin: '0 0.5rem',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.borderColor = '#DE322D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.18)';
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#DE322D',
                    lineHeight: 1,
                  }}
                >
                  +8
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: '#666666',
                    letterSpacing: '0.06em',
                    marginTop: '2px',
                  }}
                >
                  CLIENTS
                </span>
              </div>
            );
          }

          // Special element: Clickable "More Partners" Link
          if (client.isSpecial === 'more') {
            return (
              <Link
                key={`more-${idx}`}
                href="/work"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.95rem 1.65rem',
                  borderRadius: '9999px',
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  flexShrink: 0,
                  margin: '0 0.5rem',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#DE322D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#111111';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>More Partners</span>
                <ArrowUpRight size={15} />
              </Link>
            );
          }

          // Standard Brand Logo Card with Cropped-Edge Diagonal Corners
          return (
            <Link
              key={`${client.id}-${idx}`}
              href={client.link || '/work'}
              className="trusted-logo-card cropped-box"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.95rem 1.5rem',
                backgroundColor: '#f8f8fa',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                textDecoration: 'none',
                flexShrink: 0,
                minWidth: '240px',
                height: '74px',
                // Cropped diagonal edges
                clipPath:
                  'polygon(0% 0%, 94% 0%, 100% 12px, 100% 100%, 6% 100%, 0% calc(100% - 12px))',
                WebkitClipPath:
                  'polygon(0% 0%, 94% 0%, 100% 12px, 100% 100%, 6% 100%, 0% calc(100% - 12px))',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.09)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f8fa';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.03)';
              }}
            >
              {/* Brand Monogram Icon Badge */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  background: client.badgeBg,
                  color: client.badgeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: client.monogram.length > 3 ? '0.7rem' : '0.85rem',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                {client.monogram}
              </div>

              {/* Brand Typography Details */}
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: '#111111',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.25,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {client.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#666666',
                    letterSpacing: '0.02em',
                    lineHeight: 1.3,
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {client.sub}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes marqueeLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
