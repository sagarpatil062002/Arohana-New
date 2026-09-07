'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

interface HeroSlideData {
  id: string;
  slideNumber: string;
  image: string;
  theme: 'light' | 'dark';
  tag: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
}

const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'slide-01',
    slideNumber: '01',
    image: '/images/home/Hero Image Home Page.png',
    theme: 'light',
    tag: 'BRANDS · EXPERIENCES · IMPACT',
    title: 'Ideas\ninto\nImpact.',
    subtitle:
      'We create visual stories, experiences and brands that connect people, places and possibilities.',
    primaryCtaText: 'Explore Our Work',
    primaryCtaLink: '/work',
  },
  {
    id: 'slide-02',
    slideNumber: '02',
    image: '/images/home/hero-slide-2-symbolic.jpg',
    theme: 'dark',
    tag: 'STRATEGY · COMMUNICATION · EXECUTION',
    title: 'We build brands,\nbusinesses &\nexperiences.',
    subtitle:
      'Ārohana brings together business thinking, creative communication and execution across sectors.',
    primaryCtaText: 'Explore Our Work',
    primaryCtaLink: '/work',
  },
];

export default function Hero() {
  const { content } = useCmsContent();
  const heroCms = content?.home?.hero;

  const activeSlides = React.useMemo(() => {
    if (!heroCms) return HERO_SLIDES;
    return [
      {
        ...HERO_SLIDES[0],
        tag: heroCms.badge || HERO_SLIDES[0].tag,
        title: heroCms.headline || HERO_SLIDES[0].title,
        subtitle: heroCms.subheadline || HERO_SLIDES[0].subtitle,
        primaryCtaText: heroCms.ctaLabel || HERO_SLIDES[0].primaryCtaText,
        primaryCtaLink: heroCms.ctaLink || HERO_SLIDES[0].primaryCtaLink,
        image: heroCms.posterImage || HERO_SLIDES[0].image,
      },
      HERO_SLIDES[1],
    ];
  }, [heroCms]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showShowreel, setShowShowreel] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = activeSlides.length;
  const currentSlide = activeSlides[currentIndex] || activeSlides[0];
  const isDark = currentSlide.theme === 'dark';

  // Navigation callbacks
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Continuous Autoplay every 4 seconds
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  }, [nextSlide]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  const handleManualPrev = () => {
    prevSlide();
    resetAutoplay();
  };

  const handleManualNext = () => {
    nextSlide();
    resetAutoplay();
  };

  // Color tokens based on slide theme
  const textColor = isDark ? '#ffffff' : '#0f172a';
  const subtextColor = isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155';
  const tagColor = '#DE322D';
  const arrowBg = isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)';
  const arrowBorder = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.15)';
  const arrowColor = isDark ? '#ffffff' : '#0f172a';

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
          {/* ============================================================
              ORGANIC CUTOUT HERO CONTAINER (DUAL-IMAGE CAROUSEL)
              ============================================================ */}
          <div
            className="hero-container organic-box"
            style={{
              position: 'relative',
              width: '100%',
              height: '720px',
              minHeight: '720px',
              maxHeight: '720px',
              backgroundColor: '#0a0d14',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
              overflow: 'hidden',
              userSelect: 'none',
            }}
          >
            {/* Animated Slide Backgrounds */}
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide.id + '-bg'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title.replace('\n', ' ')}
                  fill
                  priority
                  quality={95}
                  sizes="100vw"
                  className="hero-background-image"
                  style={{
                    objectFit: 'cover',
                    objectPosition: currentSlide.id === 'slide-01' ? 'right 42%' : 'center 46%',
                  }}
                />

                {/* Readability Contrast Overlay */}
                {isDark ? (
                  <div
                    className="hero-overlay hero-overlay-dark"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(90deg, rgba(7, 11, 20, 0.92) 0%, rgba(7, 11, 20, 0.75) 45%, rgba(7, 11, 20, 0.25) 75%, rgba(7, 11, 20, 0.4) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                ) : (
                  <div
                    className="hero-overlay hero-overlay-light"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(90deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.78) 40%, rgba(255, 255, 255, 0.2) 65%, rgba(255, 255, 255, 0) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Top Spacer for Tab Notch Breathing Room */}
            <div className="hero-top-spacer" style={{ height: 'clamp(2rem, 3.5vw, 3.5rem)', position: 'relative', zIndex: 2 }} />

            {/* Gesture-Aware Drag Container on Desktop & Mobile */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              className="hero-drag-wrapper"
              onDragEnd={(_, info) => {
                if (info.offset.x < -35) {
                  nextSlide();
                } else if (info.offset.x > 35) {
                  prevSlide();
                }
                resetAutoplay();
              }}
              style={{
                position: 'relative',
                zIndex: 20,
                padding: 'clamp(1rem, 2vw, 2rem) clamp(2.5rem, 5.5vw, 5.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                maxWidth: '840px',
                cursor: 'grab',
              }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {/* Left-Aligned Typography Area with Smooth Slide Transition */}
              <div
                className="hero-typography-stage"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '380px',
                  minHeight: '380px',
                  maxHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide.id + '-content'}
                    custom={direction}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{ width: '100%' }}
                  >
                    {/* Pre-title Tracker */}
                    {currentSlide.tag && (
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
                            color: tagColor,
                            fontSize: '0.82rem',
                            letterSpacing: '0.14em',
                            fontWeight: 700,
                          }}
                        >
                          {currentSlide.tag}
                        </span>
                      </div>
                    )}

                    {/* Main Headline */}
                    <h1
                      className="hero-headline"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.7rem, 5.2vw, 5.6rem)',
                        lineHeight: 1.04,
                        fontWeight: 600,
                        letterSpacing: '-0.035em',
                        color: textColor,
                        margin: 0,
                        marginBottom: '1.25rem',
                        textShadow: isDark
                          ? '0 2px 24px rgba(0, 0, 0, 0.65)'
                          : '0 1px 12px rgba(255, 255, 255, 0.5)',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {currentSlide.title.split('\n').map((line: string, idx: number) => {
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
                        fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                        color: subtextColor,
                        lineHeight: 1.5,
                        maxWidth: '580px',
                        margin: 0,
                        marginBottom: '2rem',
                        fontWeight: 400,
                        textShadow: isDark ? '0 1px 8px rgba(0, 0, 0, 0.5)' : 'none',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {currentSlide.subtitle}
                    </p>

                    {/* CTA Buttons - Both black bg and white text */}
                    <div className="hero-cta-buttons" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
                      <Link
                        href={currentSlide.primaryCtaLink}
                        className="button-editorial hero-primary-cta"
                        style={{
                          height: '50px',
                          padding: '0 1.85rem',
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          borderRadius: '9999px',
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
                        <span>{currentSlide.primaryCtaText}</span>
                        <ArrowRight size={17} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setShowShowreel(true)}
                        style={{
                          height: '50px',
                          padding: '0 1.65rem',
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.22)',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                          transition: 'all 0.25s ease',
                        }}
                        className="button-editorial hero-secondary-cta"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.backgroundColor = '#1f1f23';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.backgroundColor = '#000000';
                        }}
                      >
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: '1.5px solid #ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Play size={10} fill="#ffffff" stroke="#ffffff" style={{ marginLeft: '1.5px' }} />
                        </div>
                        <span>Watch Showreel</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Bottom Info Bar & Slide Navigation Controls */}
            <div
              className="hero-bottom-bar"
              style={{
                position: 'relative',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'clamp(1rem, 2vw, 1.4rem) clamp(2.5rem, 5.5vw, 5.5rem)',
                borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(15, 23, 42, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDark ? 'rgba(7, 11, 20, 0.65)' : 'rgba(255, 255, 255, 0.6)',
                transition: 'all 0.4s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 2vw, 2rem)', flexWrap: 'wrap' }}>
                <div
                  className="tag-mono"
                  style={{
                    fontSize: '0.74rem',
                    letterSpacing: '0.12em',
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#64748b',
                    fontWeight: 600,
                  }}
                >
                  — TRUSTED BY DIVERSE BRANDS
                </div>

                <div
                  className="hero-bar-divider"
                  style={{
                    width: '1px',
                    height: '14px',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.15)',
                  }}
                />

                <div
                  className="tag-mono hero-stats-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    fontSize: '0.78rem',
                    letterSpacing: '0.06em',
                    color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155',
                  }}
                >
                  <span>
                    <strong style={{ color: isDark ? '#ffffff' : '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>
                      50+
                    </strong>{' '}
                    Projects Delivered
                  </span>
                  <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)' }}>|</span>
                  <span>
                    <strong style={{ color: isDark ? '#ffffff' : '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>
                      15+
                    </strong>{' '}
                    Industries
                  </span>
                  <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)' }}>|</span>
                  <span>
                    <strong style={{ color: isDark ? '#ffffff' : '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>
                      6
                    </strong>{' '}
                    Core Verticals
                  </span>
                  <span style={{ color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)' }}>|</span>
                  <span>
                    <strong style={{ color: isDark ? '#ffffff' : '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>
                      1
                    </strong>{' '}
                    Purpose
                  </span>
                </div>
              </div>

              {/* Slide Indicator Dots, Index & Mobile Navigation Arrows */}
              <div className="hero-slide-nav-wrap" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {activeSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                        resetAutoplay();
                      }}
                      style={{
                        height: '4px',
                        width: currentIndex === idx ? '24px' : '6px',
                        borderRadius: '9999px',
                        backgroundColor: currentIndex === idx ? '#DE322D' : isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.25)',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>

                <div
                  className="tag-mono"
                  style={{
                    fontSize: '0.75rem',
                    color: isDark ? '#ffffff' : '#0f172a',
                    fontWeight: 700,
                  }}
                >
                  [ 0{currentIndex + 1} / 0{totalSlides} ]
                </div>

                {/* Mobile Navigation Arrows (Visible only on mobile devices) */}
                <div className="hero-mobile-arrows">
                  <button
                    type="button"
                    aria-label="Previous Slide"
                    onClick={handleManualPrev}
                    className="hero-mobile-arrow-btn"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next Slide"
                    onClick={handleManualNext}
                    className="hero-mobile-arrow-btn"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ============================================================
                FLANKING NAVIGATION ARROWS ON SIDES (DESKTOP ONLY)
                ============================================================ */}
            {/* Left Arrow Button */}
            <button
              type="button"
              aria-label="Previous Slide"
              onClick={handleManualPrev}
              className="hero-side-arrow hero-prev-arrow"
              style={{
                position: 'absolute',
                left: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 35,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: arrowBg,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${arrowBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: arrowColor,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DE322D';
                e.currentTarget.style.borderColor = '#DE322D';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(222, 50, 45, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = arrowBg;
                e.currentTarget.style.borderColor = arrowBorder;
                e.currentTarget.style.color = arrowColor;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
            >
              <ChevronLeft size={22} strokeWidth={2.2} />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              aria-label="Next Slide"
              onClick={handleManualNext}
              className="hero-side-arrow hero-next-arrow"
              style={{
                position: 'absolute',
                right: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 35,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: arrowBg,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${arrowBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: arrowColor,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DE322D';
                e.currentTarget.style.borderColor = '#DE322D';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(222, 50, 45, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = arrowBg;
                e.currentTarget.style.borderColor = arrowBorder;
                e.currentTarget.style.color = arrowColor;
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
            >
              <ChevronRight size={22} strokeWidth={2.2} />
            </button>
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
          .hero-container {
            height: 720px;
            min-height: 720px;
            max-height: 720px;
          }
          .organic-box {
            clip-path: url(#heroOrganicClip);
            -webkit-clip-path: url(#heroOrganicClip);
          }
          .hero-mobile-arrows {
            display: none;
          }

          @media (max-width: 991px) {
            .hero-container {
              height: 640px;
              min-height: 640px;
              max-height: 640px;
            }
            .organic-box {
              clip-path: none;
              -webkit-clip-path: none;
              border-radius: 24px;
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
          }

          @media (max-width: 768px) {
            /* 1. HIDE FLANKING SIDE ARROWS THAT OVERLAPPED TEXT */
            .hero-side-arrow {
              display: none !important;
            }

            /* 2. SHOW COMPACT MOBILE NAVIGATION ARROWS IN BOTTOM BAR */
            .hero-mobile-arrows {
              display: flex !important;
              align-items: center;
              gap: 0.45rem;
              margin-left: 0.25rem;
            }

            .hero-mobile-arrow-btn {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: #000000;
              border: 1px solid rgba(255, 255, 255, 0.22);
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .hero-mobile-arrow-btn:active {
              transform: scale(0.92);
              background: #DE322D;
              color: #ffffff;
              border-color: #DE322D;
            }

            /* 3. HERO CONTAINER & INNER SPACING - FIXED HEIGHT ON MOBILE TO PREVENT PAGE JUMPING */
            .hero-container {
              height: 600px !important;
              min-height: 600px !important;
              max-height: 600px !important;
              border-radius: 20px !important;
              overflow: hidden !important;
            }

            .hero-top-spacer {
              height: 2.25rem !important;
            }

            .hero-drag-wrapper {
              padding: 0.5rem 1.35rem 1rem 1.35rem !important;
              max-width: 100% !important;
              flex: 1 !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-start !important;
            }

            .hero-typography-stage {
              height: 380px !important;
              min-height: 380px !important;
              max-height: 380px !important;
              padding-top: 0.25rem !important;
              padding-bottom: 0.5rem !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-start !important;
              overflow: visible !important;
            }

            /* 4. TYPOGRAPHY SCALING */
            .hero-headline {
              font-size: clamp(2rem, 7.2vw, 2.75rem) !important;
              line-height: 1.08 !important;
              margin-bottom: 0.85rem !important;
            }

            .hero-subtitle {
              font-size: clamp(0.86rem, 3.2vw, 0.95rem) !important;
              line-height: 1.48 !important;
              margin-bottom: 1.25rem !important;
              max-width: 100% !important;
            }

            /* 5. CTA BUTTONS ON MOBILE - Strictly Black Background and White Text */
            .hero-cta-buttons {
              gap: 0.65rem !important;
            }

            .hero-cta-buttons :global(.hero-primary-cta),
            .hero-cta-buttons :global(.hero-secondary-cta) {
              height: 46px !important;
              padding: 0 1.35rem !important;
              font-size: 0.84rem !important;
              background-color: #000000 !important;
              color: #ffffff !important;
              border: 1px solid rgba(255, 255, 255, 0.22) !important;
            }

            /* 6. BOTTOM BAR ON MOBILE */
            .hero-bottom-bar {
              flex-direction: row !important;
              flex-wrap: wrap !important;
              align-items: center !important;
              justify-content: space-between !important;
              padding: 0.85rem 1.15rem !important;
              gap: 0.5rem !important;
            }

            .hero-stats-row,
            .hero-bar-divider {
              display: none !important;
            }

            .hero-slide-nav-wrap {
              gap: 0.65rem !important;
            }

            /* 7. FULL READABILITY OVERLAYS ON MOBILE */
            .hero-overlay-dark {
              background: linear-gradient(180deg, rgba(7, 11, 20, 0.88) 0%, rgba(7, 11, 20, 0.65) 55%, rgba(7, 11, 20, 0.85) 100%) !important;
            }

            .hero-overlay-light {
              background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.72) 55%, rgba(255, 255, 255, 0.88) 100%) !important;
            }
          }

          @media (max-width: 480px) {
            .hero-container {
              height: 590px !important;
              min-height: 590px !important;
              max-height: 590px !important;
            }

            .hero-typography-stage {
              height: 375px !important;
              min-height: 375px !important;
              max-height: 375px !important;
            }

            .hero-bottom-bar {
              padding: 0.75rem 1rem !important;
            }

            .hero-headline {
              font-size: clamp(2rem, 7.5vw, 2.45rem) !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
