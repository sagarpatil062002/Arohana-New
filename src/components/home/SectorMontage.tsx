'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function SectorMontage() {
  const sectors = [
    {
      title: 'Hospitality & F&B',
      desc: 'Experiential dining, boutique resorts, guest retention, and menu economics.',
      image: '/images/case-studies/misu/bar-1.jpg',
      tags: ['Boutique Resorts', 'Pan-Asian Dining', 'Cocktail Bars'],
    },
    {
      title: 'Real Estate & Built Environment',
      desc: 'Industrial foundries, modular luxury pre-fab architecture, and premium composite materials.',
      image: '/images/case-studies/loom/prefab-1.jpg',
      tags: ['Modular Pre-fab', 'Luxury Outdoor', 'Industrial Castings'],
    },
    {
      title: 'Healthcare & Dermatology',
      desc: 'Clinical authority, evidence-based patient education, and ethical medical positioning.',
      image: '/images/case-studies/rrskins/education-1.jpg',
      tags: ['Clinical Authority', 'Patient Trust', 'Medical Communication'],
    },
    {
      title: 'High-Altitude & Defence Operations',
      desc: 'Documentaries, ceremonial productions, and remote community initiatives in Ladakh.',
      image: '/images/home/strip-she.jpg',
      tags: ['Western Command', 'SHE Project', 'High-Altitude Field'],
    },
  ];

  return (
    <section
      className="section-light"
      style={{
        paddingTop: '6rem',
        paddingBottom: '7rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large">
        <div style={{ marginBottom: '4rem' }}>
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
            WHERE OUR EXPERIENCE SITS
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#111111',
              maxWidth: '960px',
            }}
          >
            Sector understanding that shapes practical, commercially grounded execution.
          </h2>
        </div>

        {/* Asymmetric 4-Card Montage Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {sectors.map((sector) => (
            <div
              key={sector.title}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.03)';
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>

              <div style={{ padding: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 500,
                    marginBottom: '0.75rem',
                    color: '#111',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {sector.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#555',
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                  }}
                >
                  {sector.desc}
                </p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {sector.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#f5f5f3',
                        color: '#666',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
