'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';

const RED = '#DE322D';
const DARK = '#111113';
const BG_PAGE = '#FBF9F5';
const BODY_TEXT = '#4A4A52';

const DEFAULT_IMAGE = '/uploads/1790913499091-hero--what-we-do-collage.png';
const DEFAULT_TITLE = 'What We Do';
const DEFAULT_DESCRIPTION =
  'We help businesses build stronger brands, communicate better and grow through digitally. Our work spans digital brand growth, hospitality consulting and content & brand production — bringing strategy, creativity and execution together to meet the needs of each business.';

export default function WhatWeDoSection() {
  const { content } = useCmsContent();
  const wwdCms = content?.home?.whatWeDo;

  // Section-level visibility
  if (wwdCms?.enabled === false) {
    return null;
  }

  const title = wwdCms?.title || DEFAULT_TITLE;
  const description = wwdCms?.description || DEFAULT_DESCRIPTION;
  const image = wwdCms?.image || DEFAULT_IMAGE;
  const showHeadline = wwdCms?.showHeadline !== false;
  const showDescription = wwdCms?.showDescription !== false;
  const showImage = wwdCms?.showImage !== false;
  const eyebrow = wwdCms?.eyebrow || '';
  const showEyebrow = Boolean(wwdCms?.showEyebrow && eyebrow);

  return (
    <section
      id="what-we-do"
      style={{
        position: 'relative',
        backgroundColor: BG_PAGE,
        color: DARK,
        paddingTop: 'clamp(4.5rem, 6.5vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 6.5vw, 6.5rem)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      }}
    >
      <div
        className="padding-global"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: 'clamp(1.25rem, 3.5vw, 3rem)',
          paddingRight: 'clamp(1.25rem, 3.5vw, 3rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Heading & Narrative */}
          <div>
            {showEyebrow && (
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: RED,
                  marginBottom: '1rem',
                }}
              >
                {eyebrow}
              </div>
            )}

            {showHeadline && (
              <h2
                style={{
                  fontSize: 'clamp(2.8rem, 5.8vw, 5.8rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.04em',
                  fontWeight: 650,
                  color: DARK,
                  margin: '0 0 clamp(1.5rem, 2.5vw, 2.25rem) 0',
                }}
              >
                {title}
              </h2>
            )}

            {showDescription && (
              <p
                style={{
                  maxWidth: '540px',
                  fontSize: 'clamp(0.98rem, 1.25vw, 1.15rem)',
                  lineHeight: 1.65,
                  color: BODY_TEXT,
                  fontWeight: 450,
                  margin: 0,
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Right Column: Visual Collage exactly as in Services page */}
          {showImage && Boolean(image) && (
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                className="what-we-do-visual-card"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '580px',
                  aspectRatio: '1396 / 1127',
                  boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.12)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  backgroundColor: '#FFFFFF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Image
                  src={image}
                  alt={title || 'What We Do - Ārohana Practice Areas'}
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 92vw, 580px"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />

                {/* Hotspot link overlays corresponding to the 3 visual practice areas */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    zIndex: 2,
                  }}
                >
                  <Link
                    href="/services#digital-growth"
                    aria-label="Digital Brand Growth"
                    title="Digital Brand Growth"
                    style={{ height: '100%', width: '100%', cursor: 'pointer' }}
                  />
                  <Link
                    href="/services#hospitality-consulting"
                    aria-label="Hospitality Consulting"
                    title="Hospitality Consulting"
                    style={{ height: '100%', width: '100%', cursor: 'pointer' }}
                  />
                  <Link
                    href="/services#content-production"
                    aria-label="Content & Brand Production"
                    title="Content & Brand Production"
                    style={{ height: '100%', width: '100%', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
