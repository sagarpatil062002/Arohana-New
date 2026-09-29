'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

export default function Hero() {
  const { content } = useCmsContent();
  const heroCms = content?.home?.hero;

  const tag = heroCms?.badge || 'STRATEGY · COMMUNICATION · EXECUTION';
  const title = heroCms?.headline || 'We build brands,\nbusinesses &\nexperiences.';
  const subtitle =
    heroCms?.subheadline ||
    'Ārohana brings together business thinking, creative communication and execution across sectors.';

  const bannerImage =
    heroCms?.bannerImage ||
    heroCms?.backgroundImage ||
    heroCms?.posterImage ||
    '/images/home/hero-mountain-sky.png';

  const videoUrl = heroCms?.videoUrl;

  const defaultButtons = [
    {
      id: '1',
      label: heroCms?.ctaLabel || 'Explore Our Work',
      url: heroCms?.ctaLink || '/work',
      variant: 'primary',
    },
  ];

  const buttons = (heroCms?.buttons && Array.isArray(heroCms.buttons) && heroCms.buttons.length > 0)
    ? heroCms.buttons
    : defaultButtons;

  const [showShowreel, setShowShowreel] = useState(false);

  return (
    <>
      <section
        className="hero-section"
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '0.75rem',
          paddingBottom: 'clamp(2rem, 3.5vw, 3.5rem)',
          backgroundColor: '#f5f5f3',
          overflow: 'hidden',
        }}
      >
        <div
          className="padding-global"
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Full Photographic Hero Banner Canvas */}
          <div
            className="hero-container"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '660px',
              backgroundColor: '#0a0d14',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 70px -10px rgba(0, 0, 0, 0.35)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Background Media Stage (Video or Banner Image) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              {videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm')) ? (
                <video
                  src={videoUrl}
                  poster={bannerImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 46%',
                  }}
                />
              ) : (
                <Image
                  src={bannerImage}
                  alt="Arohana Creative Agency & Brand Strategy"
                  fill
                  priority
                  quality={95}
                  sizes="100vw"
                  className="hero-background-image"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 46%',
                  }}
                />
              )}

              {/* Dark Studio & Readability Gradient Overlay */}
              <div
                className="hero-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at 85% 20%, rgba(222, 50, 45, 0.16) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(16, 78, 91, 0.2) 0%, transparent 55%), linear-gradient(90deg, rgba(7, 10, 16, 0.96) 0%, rgba(7, 10, 16, 0.86) 48%, rgba(7, 10, 16, 0.72) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Architectural Fine Grid Overlay for Design Agency Aesthetic */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Content Stage — Creative Digital Agency Grid */}
            <div
              className="hero-content-wrapper"
              style={{
                position: 'relative',
                zIndex: 20,
                padding: 'clamp(2.5rem, 4.5vw, 4.5rem) clamp(1.75rem, 4.5vw, 4.5rem)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.95fr',
                gap: 'clamp(2rem, 4vw, 4.5rem)',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* Left Column: Strategic Brand Narrative & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ width: '100%' }}
              >
                {/* Pre-title Tracker */}
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
                    {tag}
                  </span>
                </div>

                {/* Main Headline */}
                <h1
                  className="hero-headline"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.7rem, 4.6vw, 4.8rem)',
                    lineHeight: 1.06,
                    fontWeight: 600,
                    letterSpacing: '-0.035em',
                    color: '#ffffff',
                    margin: 0,
                    marginBottom: '1.35rem',
                    textShadow: '0 2px 24px rgba(0, 0, 0, 0.65)',
                  }}
                >
                  {title.split('\n').map((line: string, idx: number) => {
                    const hasPeriod = line.endsWith('.');
                    const cleanLine = hasPeriod ? line.slice(0, -1) : line;
                    return (
                      <span key={idx} style={{ display: 'block' }}>
                        {cleanLine}
                        {hasPeriod && <span style={{ color: '#DE322D' }}>.</span>}
                      </span>
                    );
                  })}
                </h1>

                {/* Subtitle Statement */}
                <p
                  className="hero-subtitle"
                  style={{
                    fontSize: 'clamp(0.98rem, 1.2vw, 1.12rem)',
                    color: 'rgba(255, 255, 255, 0.88)',
                    lineHeight: 1.55,
                    maxWidth: '560px',
                    margin: 0,
                    marginBottom: '2rem',
                    fontWeight: 400,
                    textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {subtitle}
                </p>

                {/* Dynamic CTA Buttons */}
                <div
                  className="hero-cta-buttons"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  {buttons.map((btn: any, idx: number) => (
                    <Link
                      key={btn.id || idx}
                      href={btn.url || '#'}
                      className="button-editorial hero-primary-cta"
                      style={{
                        height: '50px',
                        padding: '0 1.85rem',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.backgroundColor = '#1f1f23';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.backgroundColor = '#000000';
                      }}
                    >
                      <span>{btn.label}</span>
                      <ArrowRight size={17} />
                    </Link>
                  ))}
                </div>

                {/* Agency Practice Areas Bar */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.65rem',
                    marginTop: '2rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.66rem',
                      color: 'rgba(255, 255, 255, 0.45)',
                      fontFamily: 'var(--font-mono, monospace)',
                      letterSpacing: '0.12em',
                      fontWeight: 600,
                    }}
                  >
                    DISCIPLINES:
                  </span>
                  {[
                    'Digital Brand Growth',
                    'Content & Film Production',
                    'Hospitality Consulting',
                  ].map((area) => (
                    <span
                      key={area}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.85)',
                        backgroundColor: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '0.22rem 0.65rem',
                        borderRadius: '3px',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Creative Agency Work & Production Showcase */}
              <div className="hero-agency-showcase">
                {/* Floating Agency Proof Pill */}
                <div className="hero-proof-badge">
                  <span className="hero-proof-dot" />
                  <span>Real-World Business Impact · Cross-Sector</span>
                </div>

                {/* Main Card: Commercial Film & Production */}
                <div className="hero-showcase-card hero-showcase-primary">
                  <div className="hero-showcase-img-wrap">
                    <Image
                      src="/images/case-studies/raysons/neora-1.jpg"
                      alt="Raysons Group - Commercial Film and Hospitality"
                      fill
                      sizes="(max-width: 991px) 100vw, 450px"
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                    <div className="hero-card-overlay" />
                    <span className="hero-card-badge">PRODUCTION · 4K FILM</span>
                    <button
                      type="button"
                      onClick={() => setShowShowreel(true)}
                      className="hero-card-play-btn"
                      aria-label="Play showreel"
                    >
                      <Play size={16} fill="#ffffff" stroke="#ffffff" style={{ marginLeft: '2px' }} />
                    </button>
                  </div>
                  <div className="hero-card-meta">
                    <div className="hero-card-title">Raysons Group · Neora Deck</div>
                    <div className="hero-card-sub">Multi-Entity Commercial Film & Social Retainers</div>
                  </div>
                </div>

                {/* Secondary Floating Card: Experiential & Digital Growth */}
                <div className="hero-showcase-card hero-showcase-secondary">
                  <div className="hero-showcase-img-wrap">
                    <Image
                      src="/images/reels/misu-reel.jpg"
                      alt="Misu - Digital Brand Growth & Hospitality"
                      fill
                      sizes="240px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="hero-card-overlay" />
                    <span className="hero-card-badge">DIGITAL GROWTH</span>
                  </div>
                  <div className="hero-card-meta">
                    <div className="hero-card-title">Misu Pan-Asian</div>
                    <div className="hero-card-sub">Social Growth & Dining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Showreel Modal */}
        {showShowreel && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
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
                borderRadius: '8px',
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
                src={videoUrl || '/videos/hero-montage.mp4'}
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
          .hero-container {
            height: auto;
            min-height: 640px;
          }

          .hero-agency-showcase {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 420px;
          }

          .hero-showcase-primary {
            position: relative;
            width: clamp(280px, 27vw, 380px);
            aspect-ratio: 4 / 3;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.16);
            background: #10141D;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }

          .hero-showcase-primary:hover {
            transform: translateY(-4px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
          }

          .hero-showcase-secondary {
            position: absolute;
            bottom: -15px;
            right: -10px;
            width: clamp(170px, 16vw, 220px);
            aspect-ratio: 4 / 5;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: #10141D;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65);
            transition: transform 0.4s ease;
          }

          .hero-showcase-secondary:hover {
            transform: translateY(-4px) scale(1.02);
          }

          .hero-showcase-img-wrap {
            position: relative;
            width: 100%;
            height: calc(100% - 44px);
            background: #1A1E28;
          }

          .hero-card-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.5) 100%);
          }

          .hero-card-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 0.64rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            color: #ffffff;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          .hero-card-play-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(8px);
            border: 1.5px solid rgba(255, 255, 255, 0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.25s ease;
          }

          .hero-card-play-btn:hover {
            background: #DE322D;
            border-color: #DE322D;
            transform: translate(-50%, -50%) scale(1.08);
          }

          .hero-card-meta {
            padding: 0.5rem 0.75rem;
            background: #0E121A;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
          }

          .hero-card-title {
            font-size: 0.8rem;
            font-weight: 650;
            color: #ffffff;
            letter-spacing: -0.01em;
          }

          .hero-card-sub {
            font-size: 0.68rem;
            color: rgba(255, 255, 255, 0.6);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .hero-proof-badge {
            position: absolute;
            top: -12px;
            left: -10px;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.35rem 0.75rem;
            background: rgba(14, 18, 26, 0.9);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 9999px;
            font-size: 0.7rem;
            font-weight: 600;
            color: #ffffff;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
            z-index: 5;
          }

          .hero-proof-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: #4ADE80;
            box-shadow: 0 0 8px #4ADE80;
          }

          @media (max-width: 991px) {
            .hero-content-wrapper {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
              padding: 2.5rem 1.75rem !important;
            }

            .hero-agency-showcase {
              min-height: 340px;
              justify-content: flex-start;
            }

            .hero-showcase-primary {
              width: 75% !important;
            }

            .hero-showcase-secondary {
              width: 45% !important;
              right: 5% !important;
            }
          }

          @media (max-width: 768px) {
            .hero-container {
              min-height: auto !important;
              border-radius: 6px !important;
            }

            .hero-content-wrapper {
              padding: 2.25rem 1.25rem !important;
            }

            .hero-headline {
              font-size: clamp(2.1rem, 7.5vw, 2.85rem) !important;
              line-height: 1.1 !important;
              margin-bottom: 1rem !important;
            }

            .hero-subtitle {
              font-size: clamp(0.88rem, 3.2vw, 0.98rem) !important;
              line-height: 1.5 !important;
              margin-bottom: 1.5rem !important;
            }

            .hero-cta-buttons :global(.hero-primary-cta) {
              height: 46px !important;
              padding: 0 1.4rem !important;
              font-size: 0.84rem !important;
            }

            .hero-agency-showcase {
              display: none !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
