'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play, X, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [showShowreel, setShowShowreel] = useState(false);

  return (
    <>
      {/* Invisible SVG ClipPath Definition for the exact organic cropped container */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="heroOrganicClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.0238,0.0000 L 0.3385,0.0000 C 0.3622,0.0000 0.3682,0.0432 0.3919,0.0432 L 0.6176,0.0432 C 0.6413,0.0432 0.6473,0.0000 0.6710,0.0000 L 0.9762,0.0000 C 0.9917,0.0000 1.0000,0.0189 1.0000,0.0541 L 1.0000,0.9459 C 1.0000,0.9811 0.9917,1.0000 0.9762,1.0000 L 0.0475,1.0000 C 0.0321,1.0000 0.0249,0.9811 0.0249,0.9459 L 0.0249,0.5270 C 0.0249,0.4730 0.0000,0.4595 0.0000,0.4054 L 0.0000,0.0541 C 0.0000,0.0189 0.0083,0.0000 0.0238,0.0000 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Hero Section Container (Sits cleanly below independent Navbar) */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '0.75rem',
          paddingBottom: 'clamp(2rem, 3.5vw, 3.5rem)',
          backgroundColor: '#f5f5f3',
        }}
      >
        <div
          className="padding-global"
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
          }}
        >
          {/* ============================================================
              ORGANIC CUTOUT HERO CONTAINER (ZERO EXTERIOR BORDER LINES)
              ============================================================ */}
          <div
            className="hero-container organic-box"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: 'clamp(600px, 80vh, 880px)',
              backgroundColor: '#eef3f8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Background Image: Supplied Hero Image with Floating Brand Logos */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              <Image
                src="/images/home/Hero Image Home Page.png"
                alt="Ārohana Ideas into Impact Hero Background"
                fill
                priority
                quality={95}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 45%',
                }}
              />

              {/* Gentle left-side readability gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.72) 32%, rgba(255, 255, 255, 0.2) 58%, rgba(255, 255, 255, 0) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Top Spacer for Tab Notch Breathing Room */}
            <div style={{ height: 'clamp(2rem, 3.5vw, 3.5rem)', position: 'relative', zIndex: 2 }} />

            {/* Main Hero Body Content */}
            <div
              className="hero-main-content"
              style={{
                position: 'relative',
                zIndex: 20,
                padding: 'clamp(1rem, 2vw, 2rem) clamp(2.5rem, 5.5vw, 5.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                maxWidth: '820px',
              }}
            >
              {/* Pre-title Tracker: — BRANDS · EXPERIENCES · IMPACT */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.25rem',
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '2px',
                    backgroundColor: '#DE322D',
                  }}
                />
                <span
                  className="tag-mono"
                  style={{
                    color: '#DE322D',
                    fontSize: '0.82rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                  }}
                >
                  BRANDS · EXPERIENCES · IMPACT
                </span>
              </div>

              {/* Main Headline: Ideas into Impact. */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.4rem, 6.6vw, 6.8rem)',
                  lineHeight: 1.02,
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  color: '#0f172a',
                  margin: 0,
                  marginBottom: '1.5rem',
                }}
              >
                <span style={{ display: 'block' }}>Ideas</span>
                <span style={{ display: 'block' }}>into</span>
                <span style={{ display: 'block' }}>
                  Impact<span style={{ color: '#DE322D' }}>.</span>
                </span>
              </h1>

              {/* Subtitle Paragraph */}
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
                  color: '#334155',
                  lineHeight: 1.55,
                  maxWidth: '560px',
                  margin: 0,
                  marginBottom: '2.5rem',
                  fontWeight: 400,
                }}
              >
                We create visual stories, experiences and brands that connect people, places and possibilities.
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {/* Primary CTA: Explore Our Work */}
                <Link
                  href="/work"
                  className="button-editorial"
                  style={{
                    height: '50px',
                    padding: '0 1.85rem',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.2)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#1e293b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = '#0f172a';
                  }}
                >
                  <span>Explore Our Work</span>
                  <ArrowUpRight size={17} />
                </Link>

                {/* Secondary CTA: Watch Showreel */}
                <button
                  type="button"
                  onClick={() => setShowShowreel(true)}
                  className="button-editorial"
                  style={{
                    height: '50px',
                    padding: '0 1.65rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#0f172a',
                    border: '1px solid rgba(15, 23, 42, 0.15)',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.15)';
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '1.5px solid #0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Play size={10} fill="#0f172a" style={{ marginLeft: '1.5px' }} />
                  </div>
                  <span>Watch Showreel</span>
                </button>
              </div>
            </div>

            {/* Bottom Section: Metrics & Indian Roots Global Stories */}
            <div
              className="hero-bottom-bar"
              style={{
                position: 'relative',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'clamp(1rem, 2vw, 1.4rem) clamp(2.5rem, 5.5vw, 5.5rem)',
                borderTop: '1px solid rgba(15, 23, 42, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255, 255, 255, 0.55)',
              }}
            >
              {/* Left Side: TRUSTED BY DIVERSE BRANDS & Stats */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 2vw, 2rem)', flexWrap: 'wrap' }}>
                <div
                  className="tag-mono"
                  style={{
                    fontSize: '0.74rem',
                    letterSpacing: '0.12em',
                    color: '#64748b',
                    fontWeight: 600,
                  }}
                >
                  — TRUSTED BY DIVERSE BRANDS
                </div>

                <div
                  style={{
                    width: '1px',
                    height: '14px',
                    backgroundColor: 'rgba(15, 23, 42, 0.15)',
                  }}
                  className="hero-bar-divider"
                />

                <div
                  className="tag-mono hero-stats-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    fontSize: '0.78rem',
                    letterSpacing: '0.06em',
                    color: '#334155',
                  }}
                >
                  <span>
                    <strong style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>50+</strong> Projects Delivered
                  </span>
                  <span style={{ color: 'rgba(15, 23, 42, 0.2)' }}>|</span>
                  <span>
                    <strong style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>15+</strong> Industries
                  </span>
                  <span style={{ color: 'rgba(15, 23, 42, 0.2)' }}>|</span>
                  <span>
                    <strong style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>6</strong> Core Verticals
                  </span>
                  <span style={{ color: 'rgba(15, 23, 42, 0.2)' }}>|</span>
                  <span>
                    <strong style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>1</strong> Purpose
                  </span>
                </div>
              </div>

              {/* Center: Scroll to explore */}
              <div
                className="hide-on-mobile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#64748b',
                  letterSpacing: '0.08em',
                }}
              >
                <span>Scroll to explore</span>
                <ChevronDown size={14} />
              </div>

              {/* Right Side: INDIAN ROOTS GLOBAL STORIES */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                }}
              >
                <span
                  style={{
                    width: '16px',
                    height: '1.5px',
                    backgroundColor: '#DE322D',
                  }}
                />
                <span
                  className="tag-mono"
                  style={{
                    fontSize: '0.74rem',
                    letterSpacing: '0.14em',
                    color: '#0f172a',
                    fontWeight: 700,
                  }}
                >
                  INDIAN ROOTS GLOBAL STORIES
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Showreel Video */}
        {showShowreel && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setShowShowreel(false)}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '960px',
                aspectRatio: '16/9',
                backgroundColor: '#000000',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowShowreel(false)}
                aria-label="Close Showreel modal"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 10,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <X size={20} />
              </button>

              <video
                src="/videos/services.webm"
                controls
                autoPlay
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        )}

        <style jsx>{`
          .organic-box {
            clip-path: url(#heroOrganicClip);
            -webkit-clip-path: url(#heroOrganicClip);
          }
          @media (max-width: 991px) {
            .organic-box {
              clip-path: none;
              -webkit-clip-path: none;
              border-radius: 24px;
            }
            .hero-main-content {
              padding: 2.5rem 1.5rem !important;
            }
            .hero-bottom-bar {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1rem !important;
              padding: 1.25rem 1.5rem !important;
            }
            .hero-stats-row {
              flex-wrap: wrap !important;
              gap: 0.75rem !important;
            }
            .hero-bar-divider {
              display: none !important;
            }
            .hide-on-mobile {
              display: none !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
