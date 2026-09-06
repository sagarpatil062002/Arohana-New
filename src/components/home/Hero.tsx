'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
    tag: '',
    title: 'We build brands,\nbusinesses & experiences',
    subtitle:
      'Ārohana brings together business thinking, creative communication and execution — from digital brand growth and content to hospitality consulting and complex on-ground projects.',
    primaryCtaText: 'Explore Our Work',
    primaryCtaLink: '/work',
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);
  const [showShowreel, setShowShowreel] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentIndex];
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

  // Autoplay every 1.5 seconds from Left to Right
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isInteracting) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 1500);
    }
  }, [isInteracting, nextSlide]);

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
        }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => {
          setIsInteracting(false);
          resetAutoplay();
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
              minHeight: 'clamp(600px, 80vh, 880px)',
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
            <AnimatePresence initial={false} mode="sync">
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
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 46%',
                  }}
                />

                {/* Readability Contrast Overlay */}
                {isDark ? (
                  <div
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
            <div style={{ height: 'clamp(2rem, 3.5vw, 3.5rem)', position: 'relative', zIndex: 2 }} />

            {/* Gesture-Aware Drag Container on Desktop & Mobile */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsInteracting(true)}
              onDragEnd={(_, info) => {
                if (info.offset.x < -35) {
                  nextSlide();
                } else if (info.offset.x > 35) {
                  prevSlide();
                }
                setIsInteracting(false);
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
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide.id + '-content'}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3.2rem, 6.4vw, 6.6rem)',
                      lineHeight: 1.02,
                      fontWeight: 600,
                      letterSpacing: '-0.035em',
                      color: textColor,
                      margin: 0,
                      marginBottom: '1.5rem',
                      textShadow: isDark
                        ? '0 2px 24px rgba(0, 0, 0, 0.65)'
                        : '0 1px 12px rgba(255, 255, 255, 0.5)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {currentSlide.title.split('\n').map((line, idx) => {
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
                    style={{
                      fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
                      color: subtextColor,
                      lineHeight: 1.55,
                      maxWidth: '580px',
                      margin: 0,
                      marginBottom: '2.5rem',
                      fontWeight: 400,
                      textShadow: isDark ? '0 1px 8px rgba(0, 0, 0, 0.5)' : 'none',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {currentSlide.subtitle}
                  </p>

                  {/* CTA Buttons */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
                    <Link
                      href={currentSlide.primaryCtaLink}
                      className="button-editorial"
                      style={{
                        height: '50px',
                        padding: '0 1.85rem',
                        backgroundColor: isDark ? '#DE322D' : '#0f172a',
                        color: '#ffffff',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        boxShadow: isDark
                          ? '0 8px 24px rgba(222, 50, 45, 0.4)'
                          : '0 8px 24px rgba(15, 23, 42, 0.2)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span>{currentSlide.primaryCtaText}</span>
                      <ArrowUpRight size={17} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setShowShowreel(true)}
                      style={{
                        height: '50px',
                        padding: '0 1.65rem',
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        color: textColor,
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(15, 23, 42, 0.15)',
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
                      className="button-editorial"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: `1.5px solid ${textColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Play size={10} fill={textColor} stroke="currentColor" style={{ marginLeft: '1.5px' }} />
                      </div>
                      <span>Watch Showreel</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
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

              {/* Slide Indicator Dots & Index */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {HERO_SLIDES.map((_, idx) => (
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
              </div>
            </div>

            {/* ============================================================
                FLANKING NAVIGATION ARROWS ON SIDES (AS SHOWN IN REFERENCE)
                ============================================================ */}
            {/* Left Arrow Button */}
            <button
              type="button"
              aria-label="Previous Slide"
              onClick={handleManualPrev}
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
        `}</style>
      </section>
    </>
  );
}
