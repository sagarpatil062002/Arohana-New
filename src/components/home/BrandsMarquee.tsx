'use client';

import React from 'react';
import Link from 'next/link';
import ClientLogoMarquee from './ClientLogoMarquee';
import { ArrowUpRight } from 'lucide-react';

export default function BrandsMarquee() {
  return (
    <section
      id="trusted-by"
      className="section-light"
      style={{
        paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 6rem)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Header Content: TRUSTED BY */}
      <div className="padding-global container-large" style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            {/* Tag: TRUSTED BY */}
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                marginBottom: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                fontWeight: 700,
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
              TRUSTED BY
            </div>

            {/* Subtitle */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                lineHeight: 1.08,
                fontWeight: 500,
                letterSpacing: '-0.035em',
                color: '#111111',
                margin: 0,
                marginBottom: '1rem',
              }}
            >
              Brands and organisations we&apos;ve worked with.
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
                color: '#555555',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '720px',
              }}
            >
              From industry leaders to ambitious startups, we collaborate with partners who believe in
              building what&apos;s next.
            </p>
          </div>

          <Link
            href="/work"
            className="button-editorial button-editorial-dark"
            style={{ height: '48px', padding: '0 1.65rem' }}
          >
            <span>Explore All Work</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Infinite Horizontal Client Logo Marquee Moving Left -> Right */}
      <ClientLogoMarquee />
    </section>
  );
}
