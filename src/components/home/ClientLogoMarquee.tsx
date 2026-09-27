'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ClientLogoItem {
  id: string;
  name: string;
  sub: string;
  badgeBg: string;
  badgeColor: string;
  textColor: string;
  monogram: string;
  logo?: string;
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
    name: 'DTK Jewellery',
    sub: 'Generational Fine Jewellery & Heritage Craft',
    badgeBg: '#1A2E40',
    badgeColor: '#ffffff',
    textColor: '#1A2E40',
    monogram: 'DTK',
    link: '/work',
  },
  {
    id: 'loom-crafts',
    name: 'Loom Crafts',
    sub: 'Luxury All-Weather Living & Modular Prefab',
    badgeBg: 'linear-gradient(135deg, #2A3439 0%, #151B1E 100%)',
    badgeColor: '#ffffff',
    textColor: '#2A3439',
    monogram: 'LC',
    link: '/work/loom-crafts',
  },
  {
    id: 'tourin',
    name: 'Tourin',
    sub: 'Conscious Experiential Journeys · Ladakh',
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
    badgeBg: '#ffffff',
    badgeColor: '#005291',
    textColor: '#005291',
    monogram: 'RG',
    logo: '/uploads/1790487614238-raysons.jpg',
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
    id: 'khau-gully',
    name: 'Khau Gully',
    sub: 'Street Gourmet & Casual Dining · Pune',
    badgeBg: '#ffffff',
    badgeColor: '#E65100',
    textColor: '#E65100',
    monogram: 'KG',
    logo: '/uploads/1790488524999-khau-gully.png',
    link: '/work',
  },
  {
    id: 'rr-skins',
    name: 'RR Skins',
    sub: 'Clinical Dermatology & Healthcare · Kolhapur',
    badgeBg: 'linear-gradient(135deg, #104E5B 0%, #082930 100%)',
    badgeColor: '#ffffff',
    textColor: '#104E5B',
    monogram: 'RR',
    link: '/work/rr-skins',
  },
  {
    id: 'indian-army',
    name: 'Indian Army',
    sub: '14 Corps & Western Command Documentaries',
    badgeBg: 'linear-gradient(135deg, #1C3119 0%, #0D180B 100%)',
    badgeColor: '#ffffff',
    textColor: '#1C3119',
    monogram: 'IA',
    link: '/indian-army-projects',
  },
  {
    id: 'shelkang-cafe',
    name: 'Shelkang Cafe',
    sub: 'High-Altitude Café & Dining · Ladakh',
    badgeBg: 'linear-gradient(135deg, #4A3B32 0%, #2A211C 100%)',
    badgeColor: '#ffffff',
    textColor: '#4A3B32',
    monogram: 'SC',
    link: '/work',
  },
  {
    id: 'residency',
    name: 'Residency Club Kolhapur',
    sub: 'Heritage Hospitality · Kolhapur',
    badgeBg: '#ffffff',
    badgeColor: '#1B4D3E',
    textColor: '#1B4D3E',
    monogram: 'RC',
    logo: '/images/clients/residency-club.png',
    link: '/work',
  },
  {
    id: 'genesis',
    name: 'Genesis Clinic',
    sub: 'Superspeciality Healthcare · Kolhapur',
    badgeBg: '#ffffff',
    badgeColor: '#00838F',
    textColor: '#00838F',
    monogram: 'GSC',
    logo: '/images/clients/genesis.png',
    link: '/work',
  },
  {
    id: 'vital-wellness',
    name: 'Vital Wellness',
    sub: 'Integrative Health & Holistic Wellness',
    badgeBg: '#ffffff',
    badgeColor: '#2B2B52',
    textColor: '#2B2B52',
    monogram: 'VW',
    logo: '/images/clients/vital-wellness.png',
    link: '/work',
  },
  {
    id: 'manchen',
    name: 'Manchen Restaurant',
    sub: 'Authentic Pan-Asian Dining & Craft',
    badgeBg: '#094AA8',
    badgeColor: '#ffffff',
    textColor: '#094AA8',
    monogram: 'MR',
    logo: '/images/clients/manchen.png',
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
    id: 'misu',
    name: 'MISU Pan-Asian',
    sub: 'Fine Dining & Hospitality',
    badgeBg: '#ffffff',
    badgeColor: '#222222',
    textColor: '#222222',
    monogram: 'MISU',
    logo: '/uploads/1790488557207-misu.png',
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
        {marqueeItems.map((client, idx) => (
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
              {/* Brand Monogram or Logo Icon Badge */}
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
                  fontSize: (client.monogram || '').length > 3 ? '0.7rem' : '0.85rem',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name || 'Logo'}
                    fill
                    sizes="42px"
                    style={{ objectFit: 'contain', padding: '4px' }}
                  />
                ) : (
                  client.monogram
                )}
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
        ))}
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
