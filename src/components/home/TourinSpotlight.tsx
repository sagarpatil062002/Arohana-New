'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import MaskedHeading from '@/components/motion/MaskedHeading';

export default function TourinSpotlight() {
  return (
    <section
      className="section-light"
      style={{
        paddingTop: '7rem',
        paddingBottom: '8rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large">
        <div
          style={{
            borderRadius: 'clamp(24px, 4vw, 40px)',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            padding: 'clamp(2.5rem, 5vw, 5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Background Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 59, 48, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left: Narrative & Proof */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: '#ff3b30',
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
                OWNED EXPERIENTIAL TRAVEL BRAND
              </div>

              <MaskedHeading
                as="h2"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.8rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  marginBottom: '1.5rem',
                  color: '#ffffff',
                }}
              >
                And then there is Tourin.
              </MaskedHeading>

              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                }}
              >
                An experiential travel brand beginning with Ladakh — built from lived experience
                rather than a generic destination catalogue. We design journeys for curious
                travellers who want more than a checklist of sights.
              </p>

              {/* Verified Proof Box */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  marginBottom: '2.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: '#ff3b30',
                  }}
                >
                  15+
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Separate curated journeys completed — from solo explorers to a 20-biker expedition.
                </div>
              </div>

              <div>
                <Link
                  href="/tourin"
                  className="button-editorial button-editorial-white"
                  style={{ height: '48px', padding: '0 1.75rem' }}
                >
                  <div className="button-texts-slider">
                    <span className="button-text-item">Explore Tourin Ladakh</span>
                    <span className="button-text-item">Explore Tourin Ladakh</span>
                  </div>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Immersive Photography Montage */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  marginTop: '2rem',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                }}
              >
                <Image
                  src="/images/tourin/tourin-hero.jpg"
                  alt="Tourin Ladakh Landscape"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  marginBottom: '2rem',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                }}
              >
                <Image
                  src="/images/tourin/tourin-1.jpg"
                  alt="Tourin Ladakh Journey"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
