'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHeroSlides } from '@/data/hero-crm-store';
import { HeroSlide } from '@/types/crm';

const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const bgVariants: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

export default function Hero() {
  const { slides, isLoaded } = useHeroSlides();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  // Safe current index
  const safeIndex = totalSlides > 0 ? ((currentIndex % totalSlides) + totalSlides) % totalSlides : 0;
  const currentSlide: HeroSlide | undefined = slides[safeIndex];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > safeIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [safeIndex]
  );

  // Auto-advance slides every 5.0 seconds, pausing on hover/interaction
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, totalSlides]);

  if (!currentSlide) return null;

  const isDarkText = currentSlide.textColorTheme === 'dark';
  const textColor = isDarkText ? '#0f172a' : '#ffffff';
  const subtitleColor = isDarkText ? '#334155' : 'rgba(255, 255, 255, 0.88)';
  const preTitleColor = isDarkText ? '#475569' : 'rgba(255, 255, 255, 0.9)';
  const chevronBg = isDarkText ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.15)';
  const chevronHoverBg = isDarkText ? 'rgba(15, 23, 42, 0.16)' : 'rgba(255, 255, 255, 0.28)';
  const chevronBorder = isDarkText ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.28)';
  const chevronColor = isDarkText ? '#0f172a' : '#ffffff';

  // Render title with line breaks and support for red dot accent
  const renderTitle = (title: string) => {
    const lines = title.split('\n');
    return lines.map((line, idx) => {
      // Check if line ends with a period for accent
      const hasPeriod = line.endsWith('.');
      const cleanLine = hasPeriod ? line.slice(0, -1) : line;

      return (
        <span key={idx} style={{ display: 'block' }}>
          {cleanLine}
          {hasPeriod && <span style={{ color: '#DE322D' }}>.</span>}
        </span>
      );
    });
  };

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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="padding-global"
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
          }}
        >
          {/* ============================================================
              ORGANIC CUTOUT HERO CAROUSEL CONTAINER (ZERO EXTERIOR BORDER LINES)
              ============================================================ */}
          <div
            className="hero-container organic-box"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: 'clamp(580px, 74vh, 760px)',
              overflow: 'hidden',
              userSelect: 'none',
            }}
          >
            {/* Smooth Background Transitions */}
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={currentSlide.id + '-bg'}
                variants={bgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={currentSlide.backgroundImageUrl}
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

                {/* Subtle contrast gradient for dark theme slide */}
                {!isDarkText && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(110deg, rgba(8, 16, 30, 0.88) 0%, rgba(8, 16, 30, 0.72) 42%, rgba(8, 16, 30, 0.15) 75%, rgba(8, 16, 30, 0.5) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Top Spacer for Tab Notch Breathing Room */}
            <div style={{ height: 'clamp(2.5rem, 4vw, 4rem)', position: 'relative', zIndex: 2 }} />

            {/* Gesture-Aware Slide Drag Container */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -45) {
                  nextSlide();
                } else if (info.offset.x > 45) {
                  prevSlide();
                }
              }}
              style={{
                position: 'relative',
                zIndex: 20,
                width: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(1rem, 2.5vw, 2.5rem) clamp(2.5rem, 5.5vw, 5.5rem)',
                cursor: 'grab',
                minHeight: 'clamp(460px, 62vh, 620px)',
              }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {/* Left-Aligned Typography Area */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide.id + '-content'}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    maxWidth: '780px',
                    pointerEvents: 'auto',
                  }}
                >
                  {/* Pre-title Tracker (e.g. BRANDS · EXPERIENCES · IMPACT) */}
                  {currentSlide.preTitle && (
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
                          width: '26px',
                          height: '2px',
                          backgroundColor: '#DE322D',
                        }}
                      />
                      <span
                        className="tag-mono"
                        style={{
                          color: preTitleColor,
                          fontSize: '0.82rem',
                          letterSpacing: '0.14em',
                          fontWeight: 600,
                        }}
                      >
                        {currentSlide.preTitle}
                      </span>
                    </div>
                  )}

                  {/* Headline: Crisp, bold, stacked lines */}
                  <h1
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3.2rem, 6.2vw, 6.4rem)',
                      lineHeight: 1.02,
                      fontWeight: isDarkText ? 700 : 500,
                      letterSpacing: '-0.04em',
                      color: textColor,
                      margin: 0,
                      marginBottom: currentSlide.subtitle ? '1.5rem' : '2rem',
                      textShadow: isDarkText
                        ? 'none'
                        : '0 2px 20px rgba(0, 0, 0, 0.45)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {renderTitle(currentSlide.title)}
                  </h1>

                  {/* Optional/Editable Subtitle brand statement */}
                  {currentSlide.subtitle && (
                    <p
                      style={{
                        fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
                        color: subtitleColor,
                        lineHeight: 1.55,
                        maxWidth: '620px',
                        margin: 0,
                        textShadow: isDarkText
                          ? 'none'
                          : '0 1px 8px rgba(0, 0, 0, 0.35)',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {currentSlide.subtitle}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Minimal Left Carousel Controls (subtle < > chevrons below text area) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginTop: 'clamp(1.5rem, 2.5vw, 3rem)',
                  zIndex: 25,
                }}
              >
                {/* Chevron Prev */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Previous slide"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: chevronBg,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${chevronBorder}`,
                    color: chevronColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = chevronHoverBg;
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = chevronBg;
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <ChevronLeft size={18} strokeWidth={2.2} />
                </button>

                {/* Chevron Next */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Next slide"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: chevronBg,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${chevronBorder}`,
                    color: chevronColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = chevronHoverBg;
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = chevronBg;
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <ChevronRight size={18} strokeWidth={2.2} />
                </button>

                {/* Subtle Slide Indicators: 01 / 02 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginLeft: '0.5rem',
                  }}
                >
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToSlide(idx);
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                      style={{
                        width: idx === safeIndex ? '24px' : '7px',
                        height: '7px',
                        borderRadius: '9999px',
                        backgroundColor:
                          idx === safeIndex
                            ? '#DE322D'
                            : isDarkText
                            ? 'rgba(15, 23, 42, 0.25)'
                            : 'rgba(255, 255, 255, 0.35)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

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
          }
        `}</style>
      </section>
    </>
  );
}
