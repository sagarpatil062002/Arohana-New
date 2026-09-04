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
        paddingTop: '7rem',
        paddingBottom: '7rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: Editorial Statement */}
          <div>
            <div
              className="tag-mono"
              style={{
                color: '#777777',
                marginBottom: '1.5rem',
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
              A POINT OF VIEW
            </div>

            <MaskedHeading
              as="h2"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
                lineHeight: 1.05,
                fontWeight: 400,
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
                color: '#111111',
              }}
            >
              Some businesses need better marketing. Others need a better way of thinking about the business itself.
            </MaskedHeading>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                lineHeight: 1.6,
                color: '#444444',
                marginBottom: '2rem',
                maxWidth: '620px',
              }}
            >
              Ārohana works where those two things meet. We bring the commercial context, sector
              depth and creative execution needed to move from an idea to something people can
              actually see, understand and act on.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <Link href="/about" className="button-editorial">
                <div className="button-texts-slider">
                  <span className="button-text-item">Studio & Philosophy</span>
                  <span className="button-text-item">Studio & Philosophy</span>
                </div>
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/services"
                style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                How engagements work →
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
                alt="Madhura directing on ground in Ladakh"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
                  color: '#ffffff',
                }}
              >
                <div className="tag-mono" style={{ fontSize: '0.7rem', color: '#ff3b30' }}>
                  FIELD LEADERSHIP • LADAKH
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  Active leadership across high-altitude and complex operating environments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
