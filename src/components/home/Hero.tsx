'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

export default function Hero() {
  const { content } = useCmsContent();
  const heroCms = content?.home?.hero;

  // Content configuration without "Ideas to impact" and without logos on banners
  const tag = heroCms?.badge && !heroCms.badge.includes('BRAND STRATEGY · EXECUTION · CULTURE')
    ? heroCms.badge
    : 'STRATEGY · COMMUNICATION · EXECUTION';

  const title = heroCms?.headline && !heroCms.headline.includes('Ideas')
    ? heroCms.headline
    : 'We build brands,\nbusinesses &\nexperiences.';

  const subtitle = heroCms?.subheadline ||
    'Ārohana brings together business thinking, creative communication and execution across sectors.';

  const primaryCtaText = heroCms?.ctaLabel || 'Explore Our Work';
  const primaryCtaLink = heroCms?.ctaLink || '/work';

  // Pristine high-resolution mountain landscape image without logos
  const backgroundImage = (heroCms?.posterImage && !heroCms.posterImage.includes('Hero Image Home Page.png'))
    ? heroCms.posterImage
    : '/images/home/hero-poster.jpg';

  return (
    <>
      {/* Hero Section Container (Sits cleanly below independent Navbar) */}
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
          {/* Crisp, modern rounded container (replaces old folder cut-out shape) */}
          <div
            className="hero-container"
            style={{
              position: 'relative',
              width: '100%',
              height: '660px',
              minHeight: '660px',
              backgroundColor: '#0a0d14',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.18)',
              overflow: 'hidden',
              userSelect: 'none',
            }}
          >
            {/* Slide Background Image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              <Image
                src={backgroundImage}
                alt="Arohana Brand and Business Execution"
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

              {/* Dark Readability Contrast Overlay */}
              <div
                className="hero-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, rgba(7, 11, 20, 0.92) 0%, rgba(7, 11, 20, 0.78) 45%, rgba(7, 11, 20, 0.35) 75%, rgba(7, 11, 20, 0.45) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Content Stage */}
            <div
              className="hero-content-wrapper"
              style={{
                position: 'relative',
                zIndex: 20,
                padding: 'clamp(2rem, 4.5vw, 4.5rem) clamp(2.5rem, 5.5vw, 5.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '860px',
              }}
            >
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
                    fontSize: 'clamp(2.7rem, 5.2vw, 5.4rem)',
                    lineHeight: 1.05,
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
                    fontSize: 'clamp(0.98rem, 1.25vw, 1.15rem)',
                    color: 'rgba(255, 255, 255, 0.88)',
                    lineHeight: 1.55,
                    maxWidth: '620px',
                    margin: 0,
                    marginBottom: '2.25rem',
                    fontWeight: 400,
                    textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {subtitle}
                </p>

                {/* CTA Buttons */}
                <div
                  className="hero-cta-buttons"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <Link
                    href={primaryCtaLink}
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
                    <span>{primaryCtaText}</span>
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero-container {
            height: 660px;
            min-height: 660px;
          }

          @media (max-width: 991px) {
            .hero-container {
              height: 580px;
              min-height: 580px;
            }
          }

          @media (max-width: 768px) {
            .hero-container {
              height: 540px !important;
              min-height: 540px !important;
              border-radius: 6px !important;
            }

            .hero-content-wrapper {
              padding: 2rem 1.5rem !important;
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

            .hero-cta-buttons {
              gap: 0.75rem !important;
            }

            .hero-cta-buttons :global(.hero-primary-cta),
            .hero-cta-buttons :global(.hero-secondary-cta) {
              height: 46px !important;
              padding: 0 1.4rem !important;
              font-size: 0.84rem !important;
            }

            .hero-overlay {
              background: linear-gradient(180deg, rgba(7, 11, 20, 0.92) 0%, rgba(7, 11, 20, 0.75) 60%, rgba(7, 11, 20, 0.88) 100%) !important;
            }
          }

          @media (max-width: 480px) {
            .hero-container {
              height: 520px !important;
              min-height: 520px !important;
            }

            .hero-content-wrapper {
              padding: 1.75rem 1.25rem !important;
            }

            .hero-headline {
              font-size: clamp(1.95rem, 7.8vw, 2.35rem) !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
