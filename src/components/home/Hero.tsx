'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

interface HeroSlide {
  id: string;
  image: string;
  caption?: string;
  clickableUrl?: string;
  isImageClickable?: boolean;
  eyebrow?: string;
  badge?: string;
  eyebrowEnabled?: boolean;
  badgeEnabled?: boolean;
  headline?: string;
  headlineEnabled?: boolean;
  subheadline?: string;
  subheadlineEnabled?: boolean;
  buttonLabel?: string;
  buttonUrl?: string;
  buttonEnabled?: boolean;
  imageEnabled?: boolean;
  enabled?: boolean;
}

export default function Hero() {
  const { content } = useCmsContent();
  const heroCms = content?.home?.hero;

  // Global Hero enable/disable
  if (heroCms?.enabled === false) {
    return null;
  }

  // Build slides array from bannerImages or fallback (respecting enabled flag)
  const rawSlides = Array.isArray(heroCms?.bannerImages) && heroCms.bannerImages.length > 0
    ? heroCms.bannerImages
    : [
        {
          id: 'slide-1',
          image: heroCms?.bannerImage || heroCms?.backgroundImage || heroCms?.posterImage || '/images/home/hero-mountain-sky.png',
          caption: 'Strategy · Creative · Execution',
          enabled: true,
          imageEnabled: heroCms?.imageEnabled !== false,
          isImageClickable: true,
        },
      ];

  const slides: HeroSlide[] = rawSlides
    .filter((s: any) => s && s.enabled !== false)
    .map((s: any, idx: number): HeroSlide => {
      if (typeof s === 'string') {
        return { id: `slide-${idx}`, image: s, caption: '', enabled: true, imageEnabled: true, isImageClickable: true };
      }
      return {
        id: s.id || `slide-${idx}`,
        image: s.image || s.url || heroCms?.bannerImage || '/images/home/hero-mountain-sky.png',
        caption: s.caption || s.alt || '',
        clickableUrl: s.clickableUrl || s.link || s.url || '',
        isImageClickable: s.isImageClickable !== false,
        eyebrow: s.eyebrow || s.badge,
        badge: s.badge || s.eyebrow,
        eyebrowEnabled: s.eyebrowEnabled !== false && s.badgeEnabled !== false,
        badgeEnabled: s.badgeEnabled !== false && s.eyebrowEnabled !== false,
        headline: s.headline,
        headlineEnabled: s.headlineEnabled !== false,
        subheadline: s.subheadline,
        subheadlineEnabled: s.subheadlineEnabled !== false,
        buttonLabel: s.buttonLabel || s.ctaLabel,
        buttonUrl: s.buttonUrl || s.ctaLink,
        buttonEnabled: s.buttonEnabled !== false,
        imageEnabled: s.imageEnabled !== false,
        enabled: s.enabled !== false,
      };
    });

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const autoAdvanceInterval = Number(heroCms?.carouselInterval) || 5000;

  // Auto-advance carousel when multiple slides exist
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slides.length);
    }, autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [slides.length, autoAdvanceInterval]);

  const activeSlide: HeroSlide | undefined = slides[activeSlideIndex] || slides[0];

  // Resolve content: slide override if provided, else top-level hero config
  const rawTag = activeSlide?.eyebrow ?? activeSlide?.badge ?? heroCms?.badge ?? 'STRATEGY · COMMUNICATION · EXECUTION';
  // Remove dash from eyebrow as required: "Remove the dash: — STRATEGY · COMMUNICATION · EXECUTION"
  const tag = rawTag.replace(/^[\s—–-]+/, '').trim();

  const title = activeSlide?.headline ?? heroCms?.headline ?? 'We build brands,\nbusinesses &\nexperiences.';
  const subtitle =
    activeSlide?.subheadline ??
    heroCms?.subheadline ??
    'Ārohana brings together business thinking, creative communication and execution across sectors.';

  // Enable/Disable toggles: Respect both global hero settings and per-slide settings
  const showEyebrow = heroCms?.eyebrowEnabled !== false && activeSlide?.eyebrowEnabled !== false && Boolean(tag);
  const showHeadline = heroCms?.headlineEnabled !== false && activeSlide?.headlineEnabled !== false && Boolean(title);
  const showSubtitle = heroCms?.subheadlineEnabled !== false && activeSlide?.subheadlineEnabled !== false && Boolean(subtitle);
  const showImage = heroCms?.imageEnabled !== false && (activeSlide?.imageEnabled !== false);
  const showButton = heroCms?.ctaEnabled !== false && heroCms?.buttonEnabled !== false && (activeSlide?.buttonEnabled !== false);

  const goToNextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (slides.length === 0) return;
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (slides.length === 0) return;
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const heroBtnLabel = activeSlide?.buttonLabel || heroCms?.ctaLabel || 'Explore Our Work';
  const heroBtnUrl = activeSlide?.buttonUrl || heroCms?.ctaLink || '/work';

  const defaultButtons = [
    {
      id: '1',
      label: heroBtnLabel,
      url: heroBtnUrl,
      variant: 'primary',
    },
  ];

  const buttons = (heroCms?.buttons && Array.isArray(heroCms.buttons) && heroCms.buttons.length > 0 && !activeSlide?.buttonLabel)
    ? heroCms.buttons
    : defaultButtons;

  return (
    <>
      <section
        id="hero-section"
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
            {/* Background Media Stage (Multi-Image Carousel) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              {slides.map((slide, idx) => {
                    const isActive = idx === activeSlideIndex;
                    return (
                      <div
                        key={slide.id || idx}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                          zIndex: isActive ? 2 : 1,
                          pointerEvents: isActive && slide.clickableUrl ? 'auto' : 'none',
                        }}
                      >
                        {(() => {
                          if (!showImage || slide.imageEnabled === false) return null;
                          const isClickable = Boolean(slide.clickableUrl) && slide.isImageClickable !== false;
                          if (isClickable && slide.clickableUrl) {
                            return (
                              <Link
                                href={slide.clickableUrl}
                                style={{ display: 'block', width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
                                aria-label={slide.caption || 'Hero banner'}
                              >
                                <Image
                                  src={slide.image}
                                  alt={slide.caption || "Arohana Creative Agency & Brand Strategy"}
                                  fill
                                  priority={idx === 0}
                                  quality={95}
                                  sizes="100vw"
                                  className="hero-background-image"
                                  style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center 46%',
                                    transform: isActive ? 'scale(1.03)' : 'scale(1)',
                                    transition: 'transform 8s ease-out',
                                  }}
                                />
                              </Link>
                            );
                          }
                          return (
                            <Image
                              src={slide.image}
                              alt={slide.caption || "Arohana Creative Agency & Brand Strategy"}
                              fill
                              priority={idx === 0}
                              quality={95}
                              sizes="100vw"
                              className="hero-background-image"
                              style={{
                                objectFit: 'cover',
                                objectPosition: 'center 46%',
                                transform: isActive ? 'scale(1.03)' : 'scale(1)',
                                transition: 'transform 8s ease-out',
                              }}
                            />
                          );
                        })()}
                      </div>
                    );
                  })}

              {/* Luminous & Clear Visual Overlay for Crisp Photographic Visibility */}
              <div
                className="hero-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 3,
                  background:
                    heroCms?.bannerClarity === 'deep'
                      ? 'linear-gradient(90deg, rgba(7, 10, 16, 0.72) 0%, rgba(7, 10, 16, 0.48) 50%, rgba(7, 10, 16, 0.25) 100%), linear-gradient(180deg, rgba(7, 10, 16, 0.25) 0%, transparent 45%, rgba(7, 10, 16, 0.45) 100%)'
                      : heroCms?.bannerClarity === 'balanced'
                      ? 'linear-gradient(90deg, rgba(7, 10, 16, 0.52) 0%, rgba(7, 10, 16, 0.28) 50%, rgba(7, 10, 16, 0.08) 85%, transparent 100%), linear-gradient(180deg, rgba(7, 10, 16, 0.18) 0%, transparent 45%, rgba(7, 10, 16, 0.38) 100%)'
                      : 'linear-gradient(90deg, rgba(7, 10, 16, 0.38) 0%, rgba(7, 10, 16, 0.18) 45%, rgba(7, 10, 16, 0.04) 80%, transparent 100%), linear-gradient(180deg, rgba(7, 10, 16, 0.12) 0%, transparent 45%, rgba(7, 10, 16, 0.32) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Content Stage — Creative Digital Agency */}
            <div
              className="hero-content-wrapper"
              style={{
                position: 'relative',
                zIndex: 20,
                padding: 'clamp(2.5rem, 4.5vw, 4.5rem) clamp(1.75rem, 4.5vw, 4.5rem)',
                width: '100%',
              }}
            >
              {/* Strategic Brand Narrative & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ width: '100%', maxWidth: '920px' }}
              >
                {/* Pre-title Tracker (no dash) */}
                {showEyebrow && tag && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <span
                      className="tag-mono"
                      style={{
                        color: '#DE322D',
                        fontSize: '0.82rem',
                        letterSpacing: '0.14em',
                        fontWeight: 700,
                        textShadow: '0 1px 8px rgba(0, 0, 0, 0.75)',
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                )}

                {/* Main Headline */}
                {showHeadline && title && (
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
                      textShadow: '0 2px 28px rgba(0, 0, 0, 0.85), 0 1px 4px rgba(0, 0, 0, 0.9)',
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
                )}

                {/* Subtitle Statement */}
                {showSubtitle && subtitle && (
                  <p
                    className="hero-subtitle"
                    style={{
                      fontSize: 'clamp(0.98rem, 1.2vw, 1.12rem)',
                      color: '#ffffff',
                      lineHeight: 1.55,
                      maxWidth: '560px',
                      margin: 0,
                      marginBottom: '2rem',
                      fontWeight: 400,
                      textShadow: '0 1px 12px rgba(0, 0, 0, 0.88), 0 1px 3px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {subtitle}
                  </p>
                )}

                {/* Dynamic CTA Buttons */}
                {showButton && (
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
                )}
              </motion.div>
            </div>

            {/* Carousel Navigation Bar (Active only when multi-image banner has >1 slides) */}
            {slides.length > 1 && (
              <div
                className="hero-carousel-bar"
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  right: 'clamp(1.75rem, 4.5vw, 4.5rem)',
                  zIndex: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  pointerEvents: 'auto',
                }}
              >

                {/* Carousel Controls: Arrows + Dots */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    backgroundColor: 'rgba(10, 13, 20, 0.65)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '9999px',
                  }}
                >
                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={goToPrevSlide}
                    aria-label="Previous banner slide"
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    }}
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {/* Indicator Pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {slides.map((_, idx) => {
                      const isActive = idx === activeSlideIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveSlideIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          style={{
                            width: isActive ? '22px' : '6px',
                            height: '6px',
                            borderRadius: '9999px',
                            backgroundColor: isActive ? '#DE322D' : 'rgba(255, 255, 255, 0.35)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={goToNextSlide}
                    aria-label="Next banner slide"
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    }}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          .hero-container {
            height: auto;
            min-height: 640px;
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
          }
        `}</style>
      </section>
    </>
  );
}
