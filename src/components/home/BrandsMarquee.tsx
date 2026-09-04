'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function BrandsMarquee() {
  const brands = [
    { name: 'Raysons Group', desc: 'Industrial Castings & Real Estate', link: '/work/raysons' },
    { name: 'PictureTime', desc: 'High-Altitude Inflatable Cinema', link: '/work/picturetime' },
    { name: 'Loom Crafts', desc: 'Luxury Outdoor & Modular Structures', link: '/work/loom-crafts' },
    { name: 'Indian Army', desc: 'Western Command & 14 Corps', link: '/indian-army-projects' },
    { name: 'Misu', desc: 'Contemporary Pan-Asian Hospitality', link: '/work/misu' },
    { name: 'RR Skins', desc: 'Clinical Dermatology & Patient Education', link: '/work/rr-skins' },
    { name: 'Blu Resorts', desc: 'Boutique Coastal Living & Hospitality', link: '/work' },
    { name: 'Qubice', desc: 'Architectural Modular Solutions', link: '/work' },
    { name: 'Neora Deck', desc: 'Wood Composite & Built Environment', link: '/work' },
    { name: 'SHE Project', desc: 'High-Altitude Livelihood Initiative', link: '/work/she' },
    { name: 'DTK Karekar', desc: 'Heritage Fine Jewellery & Retail', link: '/work' },
    { name: 'Tourin', desc: 'Experiential Travel Ladakh', link: '/tourin' },
  ];

  return (
    <section
      className="section-light"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large" style={{ marginBottom: '3.5rem' }}>
        <div
          className="tag-mono"
          style={{
            color: '#777777',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#ff3b30',
            }}
          />
          SELECTED BRANDS & ORGANISATIONS
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4.2vw, 3.8rem)',
            maxWidth: '1080px',
            lineHeight: 1.1,
            fontWeight: 400,
            letterSpacing: '-0.03em',
            color: '#111111',
          }}
        >
          We collaborate with forward-thinking organisations to build lasting commercial and creative impact.
        </h2>
      </div>

      {/* Marquee Track with Duplicated Sequence for Continuous Loop */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <div className="marquee-track" style={{ display: 'flex', gap: '1.5rem' }}>
          {[...brands, ...brands].map((brand, index) => (
            <Link
              key={`${brand.name}-${index}`}
              href={brand.link}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '320px',
                minWidth: '320px',
                height: '180px',
                padding: '1.75rem',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 500,
                    color: '#111111',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {brand.name}
                </div>
                <ArrowUpRight size={18} color="#999999" />
              </div>

              <div>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#666666',
                    lineHeight: 1.4,
                  }}
                >
                  {brand.desc}
                </p>
                <span
                  className="tag-mono"
                  style={{
                    fontSize: '0.65rem',
                    color: '#999999',
                    marginTop: '0.5rem',
                    display: 'block',
                  }}
                >
                  VIEW WORK →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
