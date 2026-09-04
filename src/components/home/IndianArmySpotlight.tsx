'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function IndianArmySpotlight() {
  const images = [
    {
      src: '/images/home/strip-army.jpg',
      title: 'Indian Army — Western Command',
      subtitle: 'Investiture Ceremony Direction & Production',
    },
    {
      src: '/images/home/strip-sampark.jpg',
      title: '14 Corps Headquarters — Ladakh',
      subtitle: 'Field Operations & High-Altitude Context',
    },
    {
      src: '/images/home/strip-she.jpg',
      title: 'The SHE Project — Remote Ladakh',
      subtitle: 'High-Altitude Women Hygiene & Livelihood',
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '3.5rem',
          }}
        >
          <div>
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
              BEYOND THE STANDARD AGENCY BOX
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#111111',
                maxWidth: '900px',
              }}
            >
              The work that doesn't fit a standard agency box.
            </h2>
          </div>

          <Link href="/indian-army-projects" className="button-editorial">
            <div className="button-texts-slider">
              <span className="button-text-item">Explore Army Projects</span>
              <span className="button-text-item">Explore Army Projects</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
            color: '#444444',
            lineHeight: 1.6,
            maxWidth: '820px',
            marginBottom: '3rem',
          }}
        >
          From remote-community initiatives in Ladakh to films and communication projects for the
          Indian Army, Ārohana has worked on briefs where the operating environment, audience and
          responsibility demanded an entirely different level of discipline.
        </p>

        {/* 3-Image Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {images.map((img) => (
            <Link
              key={img.title}
              href="/indian-army-projects"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/11',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  backgroundColor: '#e6e6e4',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.06)',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    color: '#111',
                    marginBottom: '0.25rem',
                  }}
                >
                  {img.title}
                </div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: '#666',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {img.subtitle}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
