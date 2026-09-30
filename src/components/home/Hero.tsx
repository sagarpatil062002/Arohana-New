'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

interface HeroSlide {
  id: string;
  image: string;
  caption?: string;
}

export default function Hero() {
  const { content } = useCmsContent();
  const heroCms = content?.home?.hero;

  const tag = heroCms?.badge || 'STRATEGY · COMMUNICATION · EXECUTION';
  const title = heroCms?.headline || 'We build brands,\nbusinesses &\nexperiences.';
  const subtitle =
    heroCms?.subheadline ||
    'Ārohana brings together business thinking, creative communication and execution across sectors.';

  // Build slides array from bannerImages or fallback
  const rawSlides = Array.isArray(heroCms?.bannerImages) && heroCms.bannerImages.length > 0
    ? heroCms.bannerImages
    : [
        {
          id: 'slide-1',
          image: heroCms?.bannerImage || heroCms?.backgroundImage || heroCms?.posterImage || '/images/home/hero-mountain-sky.png',
          caption: 'Strategy · Creative · Execution',
        },
      ];

  const slides: HeroSlide[] = rawSlides.map((s: any, idx: number): HeroSlide => {
    if (typeof s === 'string') {
      return { id: `slide-${idx}`, image: s, caption: '' };
    }
    return {
      id: s.id || `slide-${idx}`,
      image: s.image || s.url || heroCms?.bannerImage || '/images/home/hero-mountain-sky.png',
      caption: s.caption || s.alt || '',
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

  const goToNextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const videoUrl = heroCms?.videoUrl;
  const showVideoCard = Boolean(heroCms?.showVideoCard ?? heroCms?.videoCard?.enabled ?? false);
  const videoCardData = {
    videoUrl: heroCms?.videoCard?.videoUrl || heroCms?.videoUrl || '/videos/hero-montage.mp4',
    posterImage: heroCms?.videoCard?.posterImage || '/images/case-studies/raysons/neora-1.jpg',
    badge: heroCms?.videoCard?.badge || 'PRODUCTION · 4K FILM',
    title: heroCms?.videoCard?.title || 'Raysons Group · Neora Deck',
    subtitle: heroCms?.videoCard?.subtitle || 'Multi-Entity Commercial Film & Social Retainers',
  };
  const showSecondaryCard = Boolean(heroCms?.showSecondaryCard ?? heroCms?.secondaryCard?.enabled ?? false);
  const secondaryCardData = {
    image: heroCms?.secondaryCard?.image || '/images/reels/misu-reel.jpg',
    badge: heroCms?.secondaryCard?.badge || 'DIGITAL GROWTH',
    title: heroCms?.secondaryCard?.title || 'Misu Pan-Asian',
    subtitle: heroCms?.secondaryCard?.subtitle || 'Social Growth & Dining',
  };

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
            {/* Background Media Stage (Multi-Image Carousel or Video) */}
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
                  poster={slides[0]?.image}
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
                <>
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
                          pointerEvents: 'none',
                        }}
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
                      </div>
                    );
                  })}
                </>
              )}

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
                display: showVideoCard ? 'grid' : 'block',
                gridTemplateColumns: showVideoCard ? '1.2fr 0.95fr' : undefined,
                gap: showVideoCard ? 'clamp(2rem, 4vw, 4.5rem)' : undefined,
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* Left Column: Strategic Brand Narrative & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ width: '100%', maxWidth: showVideoCard ? '100%' : '920px' }}
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
                      textShadow: '0 1px 8px rgba(0, 0, 0, 0.75)',
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

                {/* Subtitle Statement */}
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
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontFamily: 'var(--font-mono, monospace)',
                      letterSpacing: '0.12em',
                      fontWeight: 600,
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
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
                        color: '#ffffff',
                        backgroundColor: 'rgba(10, 14, 23, 0.65)',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                        padding: '0.22rem 0.65rem',
                        borderRadius: '3px',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Creative Agency Work & Production Showcase (Rendered only when enabled) */}
              {showVideoCard && (
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
                        src={videoCardData.posterImage}
                        alt={videoCardData.title}
                        fill
                        sizes="(max-width: 991px) 100vw, 450px"
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                      <div className="hero-card-overlay" />
                      <span className="hero-card-badge">{videoCardData.badge}</span>
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
                      <div className="hero-card-title">{videoCardData.title}</div>
                      <div className="hero-card-sub">{videoCardData.subtitle}</div>
                    </div>
                  </div>

                  {/* Secondary Floating Card: Experiential & Digital Growth */}
                  {showSecondaryCard && (
                    <div className="hero-showcase-card hero-showcase-secondary">
                      <div className="hero-showcase-img-wrap">
                        <Image
                          src={secondaryCardData.image}
                          alt={secondaryCardData.title}
                          fill
                          sizes="240px"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="hero-card-overlay" />
                        <span className="hero-card-badge">{secondaryCardData.badge}</span>
                      </div>
                      <div className="hero-card-meta">
                        <div className="hero-card-title">{secondaryCardData.title}</div>
                        <div className="hero-card-sub">{secondaryCardData.subtitle}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Carousel Navigation Bar (Active only when multi-image banner has >1 slides) */}
            {slides.length > 1 && (
              <div
                className="hero-carousel-bar"
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: 'clamp(1.75rem, 4.5vw, 4.5rem)',
                  right: 'clamp(1.75rem, 4.5vw, 4.5rem)',
                  zIndex: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pointerEvents: 'auto',
                }}
              >
                {/* Active Slide Caption & Index */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    backgroundColor: 'rgba(10, 13, 20, 0.65)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#DE322D',
                      letterSpacing: '0.08em',
                    }}
                  >
                    0{activeSlideIndex + 1} / 0{slides.length}
                  </span>
                  {slides[activeSlideIndex]?.caption && (
                    <>
                      <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.4)' }} />
                      <span
                        style={{
                          fontSize: '0.74rem',
                          color: 'rgba(255, 255, 255, 0.85)',
                          fontWeight: 500,
                        }}
                      >
                        {slides[activeSlideIndex].caption}
                      </span>
                    </>
                  )}
                </div>

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
                src={videoCardData.videoUrl || videoUrl || '/videos/hero-montage.mp4'}
                controls
                autoPlay
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: '#000000',
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
