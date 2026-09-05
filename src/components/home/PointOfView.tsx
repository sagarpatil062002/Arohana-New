'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import MaskedHeading from '@/components/motion/MaskedHeading';

export default function PointOfView() {
  return (
    <section
      className="section-light"
      style={{
        paddingTop: 'clamp(3.5rem, 6vw, 7rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 6rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: Editorial Statement */}
          <div>
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
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
              [ 04 ] Positioning & Philosophy
            </div>

            <MaskedHeading
              as="h2"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                lineHeight: 1.1,
                fontWeight: 400,
                letterSpacing: '-0.035em',
                marginBottom: '1.75rem',
                color: '#111111',
              }}
            >
              Some businesses need better marketing. Others need a better way of thinking about the business itself.
            </MaskedHeading>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                marginBottom: '2.5rem',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                color: '#444444',
                lineHeight: 1.65,
              }}
            >
              <p style={{ color: '#111111', fontWeight: 500 }}>
                Ārohana works with businesses where communication cannot be separated from the business itself. We combine commercial thinking, sector experience and creative execution to help brands become clearer, more credible and more relevant to the people they need to reach.
              </p>
              <p>
                Depending on the brief, that can mean building a digital brand, running an ongoing social ecosystem, creating a film, fixing a restaurant&apos;s menu and operating systems, or taking a project from an idea to on-ground execution.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/about" className="button-editorial button-editorial-dark" style={{ height: '46px', padding: '0 1.5rem' }}>
                <div className="button-texts-slider">
                  <span className="button-text-item">Read Founder Story & Philosophy</span>
                  <span className="button-text-item">Read Founder Story & Philosophy</span>
                </div>
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/services"
                className="button-editorial"
                style={{ height: '46px', padding: '0 1.5rem', backgroundColor: '#f0f0ee', color: '#111' }}
              >
                <div className="button-texts-slider">
                  <span className="button-text-item">Explore Three Practice Areas</span>
                  <span className="button-text-item">Explore Three Practice Areas</span>
                </div>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: Editorial Portrait in Ladakh with Parallax Image */}
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
              }}
            >
              <Image
                src="/images/home/madhura-editorial.jpg"
                alt="Madhura Hawal on-ground directing a project in Ladakh"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.75rem',
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%)',
                  color: '#ffffff',
                }}
              >
                <div className="tag-mono" style={{ fontSize: '0.75rem', color: '#ff4d4f', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Madhura Hawal · Founder
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.45 }}>
                  Madhura Hawal on-ground directing projects across Ladakh and regional commercial hubs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
