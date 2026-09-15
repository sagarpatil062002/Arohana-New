'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

interface ArmyCard {
  id: string;
  index: string;
  category: string;
  title: string;
  location: string;
  image: string;
}

// Exactly ordered layout:
// Far Left: 04, Mid Left: 02, Center (Active): 01, Mid Right: 03, Far Right: 05
const ARMY_PROJECT_CARDS: ArmyCard[] = [
  {
    id: 'army-ceremonies',
    index: '04',
    category: 'INVESTITURE CEREMONY',
    title: 'Indian Army Ceremonies',
    location: 'WESTERN COMMAND HQ THEATRE',
    image: '/images/army/western-command-1.jpg',
  },
  {
    id: 'logistics-support',
    index: '02',
    category: 'OPERATIONAL',
    title: 'Logistics Support',
    location: 'HIGH-ALTITUDE REGIONS',
    image: '/images/army/sampark-1.jpg',
  },
  {
    id: 'high-altitude-impact',
    index: '01',
    category: 'VIBRANT VILLAGES INITIATIVE',
    title: 'High-Altitude Impact',
    location: 'EASTERN LADAKH – LAC BORDERS',
    image: '/images/army/vibrant-villages-1.jpg',
  },
  {
    id: 'border-communities',
    index: '03',
    category: 'COMMUNITY OUTREACH',
    title: 'Border Communities',
    location: 'PEOPLE, PLACES, PROGRESS',
    image: '/images/army/rezang-la-1.jpg',
  },
  {
    id: 'institutional-content',
    index: '05',
    category: 'TRAINING & DOCUMENTATION',
    title: 'Institutional Content',
    location: 'DISCIPLINE IN EVERY FRAME',
    image: '/images/army/western-command-2.jpg',
  },
];

export default function IndianArmySpotlight() {
  const { content } = useCmsContent();
  const armyCms = content?.home?.armySpotlight;
  const cards: ArmyCard[] = (armyCms?.cards && armyCms.cards.length > 0) ? armyCms.cards : ARMY_PROJECT_CARDS;

  // Center card (item 01 at index 2) is initially active
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = cards.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay automatically every 3.2 seconds
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isDragging) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 3200);
    }
  }, [isDragging, nextSlide]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  const handlePrev = () => {
    prevSlide();
    resetAutoplay();
  };

  const handleNext = () => {
    nextSlide();
    resetAutoplay();
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetAutoplay();
    }
    touchStartX.current = null;
  };

  // Desktop Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) {
      isMouseDown.current = false;
      setIsDragging(false);
      return;
    }
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetAutoplay();
    }
    isMouseDown.current = false;
    mouseStartX.current = null;
    setIsDragging(false);
  };

  const handleMouseLeaveWrapper = () => {
    if (isMouseDown.current) {
      isMouseDown.current = false;
      setIsDragging(false);
      mouseStartX.current = null;
    }
  };

  return (
    <section
      id="army-projects"
      className="section-dark army-spotlight-section"
      style={{
        backgroundColor: '#07080c',
        color: '#ffffff',
        paddingTop: 'clamp(4.5rem, 7vw, 7.5rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 7.5rem)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ============================================================
          UNIFIED HERO RIGHT PANEL: Background Soldier + Framed Box (Clean Borders)
          ============================================================ */}
      <div className="army-hero-right-panel">
        <div className="army-hero-canvas">
          {/* Background Indian Army Soldier with collinear slant clip */}
          <div className="army-hero-img-clip">
            <Image
              src="/images/army/army-hero.jpg"
              alt="Indian Army Personnel on Himalayan LAC Deployment"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'top right',
                opacity: 0.72,
                filter: 'contrast(1.15) brightness(0.95)',
              }}
            />
            {/* Dark gradient blend towards bottom and left */}
            <div className="army-hero-vignette" />
          </div>

          {/* Clean Box SVG with all typography restored, NO RED borders or red lines */}
          <svg
            className="army-hero-svg"
            viewBox="0 0 850 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Subtle radar arc accent */}
            <path
              d="M 90,65 A 70 45 0 0 1 210,65"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
              strokeDasharray="40 25"
              fill="none"
            />

            {/* Trapezoid Box Polygon - Clean subtle border without red stroke */}
            <polygon
              points="66.65,65 356.65,65 356.65,195 120,195"
              fill="rgba(7, 8, 12, 0.94)"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1.5"
              strokeLinejoin="miter"
              filter="drop-shadow(0 10px 30px rgba(0, 0, 0, 0.6))"
            />

            {/* Title Text Inside Box */}
            <text
              x="332"
              y="104"
              fill="#ffffff"
              fontFamily="var(--font-display, sans-serif)"
              fontSize="24"
              fontWeight="800"
              textAnchor="end"
              letterSpacing="0.05em"
            >
              INDIAN
            </text>
            <text
              x="332"
              y="136"
              fill="#ffffff"
              fontFamily="var(--font-display, sans-serif)"
              fontSize="24"
              fontWeight="800"
              textAnchor="end"
              letterSpacing="0.05em"
            >
              ARMY
            </text>
            <text
              x="332"
              y="168"
              fill="#ffffff"
              fontFamily="var(--font-display, sans-serif)"
              fontSize="24"
              fontWeight="800"
              textAnchor="end"
              letterSpacing="0.05em"
            >
              PROJECTS
            </text>
          </svg>
        </div>
      </div>

      <div className="padding-global container-large" style={{ position: 'relative', zIndex: 10 }}>
        {/* ============================================================
            TOP HEADER ROW: Left Content
            ============================================================ */}
        <div className="army-header-row">
          <div className="army-header-left">
            <div className="army-eyebrow-row">
              <span className="army-eyebrow-text">{armyCms?.eyebrow || 'PROOF OF WORK'}</span>
              <span className="army-eyebrow-dash" />
            </div>

            <h2 className="army-headline">
              {armyCms?.title || "Work that doesn't fit a standard agency box"}
            </h2>

            <p className="army-description">
              {armyCms?.description || "From remote-community health initiatives in high-altitude Ladakh to official investiture ceremony films for the Indian Army, Ārohana has worked on projects where the environment, audience and institutional responsibility demanded an entirely different level of preparation and discipline."}
            </p>

            {/* Beyond Boundaries - Clean without red underline stroke */}
            <div className="army-script-badge">
              <span className="army-script-text">Beyond Boundaries</span>
            </div>
          </div>
        </div>

        {/* ============================================================
            3D CURVED CAROUSEL (5 CARDS WITH CLEAN SLEEK HIGHLIGHT)
            ============================================================ */}
        <div
          className="army-carousel-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeaveWrapper}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {/* Navigation Arrow Left */}
          <button
            type="button"
            className="army-nav-btn army-nav-left"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Army Project"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Navigation Arrow Right */}
          <button
            type="button"
            className="army-nav-btn army-nav-right"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Army Project"
          >
            <ArrowRight size={18} />
          </button>

          {/* 3D Cards Track */}
          <div className="army-carousel-viewport">
            <div className="army-cards-stage">
              {cards.map((item, index) => {
                let offset = (index - activeIndex + total) % total;
                if (offset > total / 2) {
                  offset -= total;
                }

                const isVisible = Math.abs(offset) <= 2;
                if (!isVisible) return null;

                const isActive = offset === 0;

                let translateX = 0;
                let translateZ = 0;
                let rotateY = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = 100;

                if (offset === 0) {
                  translateX = 0;
                  translateZ = 0;
                  rotateY = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 100;
                } else if (offset === -1) {
                  translateX = isMobile ? -60 : -190;
                  translateZ = isMobile ? -45 : -75;
                  rotateY = isMobile ? 12 : 16;
                  scale = isMobile ? 0.86 : 0.88;
                  opacity = isMobile ? 0.4 : 0.72;
                  zIndex = 90;
                } else if (offset === 1) {
                  translateX = isMobile ? 60 : 190;
                  translateZ = isMobile ? -45 : -75;
                  rotateY = isMobile ? -12 : -16;
                  scale = isMobile ? 0.86 : 0.88;
                  opacity = isMobile ? 0.4 : 0.72;
                  zIndex = 90;
                } else if (offset === -2) {
                  translateX = isMobile ? 0 : -340;
                  translateZ = -150;
                  rotateY = isMobile ? 0 : 28;
                  scale = 0.76;
                  opacity = isMobile ? 0 : 0.38;
                  zIndex = 80;
                } else if (offset === 2) {
                  translateX = isMobile ? 0 : 340;
                  translateZ = -150;
                  rotateY = isMobile ? 0 : -28;
                  scale = 0.76;
                  opacity = isMobile ? 0 : 0.38;
                  zIndex = 80;
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveIndex(index);
                      resetAutoplay();
                    }}
                    className={`army-card-wrapper ${isActive ? 'card-active' : ''}`}
                    style={{
                      transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      pointerEvents: isMobile && Math.abs(offset) > 1 ? 'none' : 'auto',
                    }}
                  >
                    <div className={`army-card-inner ${isActive ? 'inner-active' : ''}`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 260px, 310px"
                        style={{
                          objectFit: 'cover',
                          transform: isActive ? 'scale(1.05)' : 'scale(1.0)',
                          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />

                      <div className="army-card-overlay" />

                      <div className="army-card-tag">
                        <span className="army-card-tag-num">{item.index}</span>
                        <span className="army-card-tag-line" />
                      </div>

                      <div className="army-card-content">
                        <span className="army-card-category">{item.category}</span>
                        <h4 className="army-card-title">{item.title}</h4>
                        <span className="army-card-location">{item.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .army-hero-right-panel {
          position: absolute;
          top: 0;
          right: 0;
          width: clamp(520px, 58vw, 920px);
          height: clamp(430px, 50vw, 600px);
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .army-hero-canvas {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .army-hero-img-clip {
          position: absolute;
          inset: 0;
          clip-path: polygon(4.70588% 0%, 100% 0%, 100% 100%, 28.8235% 100%);
          -webkit-clip-path: polygon(4.70588% 0%, 100% 0%, 100% 100%, 28.8235% 100%);
        }

        .army-hero-vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(7, 8, 12, 0.05) 0%, rgba(7, 8, 12, 0.45) 60%, #07080c 100%),
            linear-gradient(90deg, #07080c 0%, rgba(7, 8, 12, 0.3) 15%, transparent 50%);
        }

        .army-hero-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* ── Header Row ── */
        .army-header-row {
          display: flex;
          align-items: flex-start;
          margin-bottom: clamp(3rem, 5vw, 4.5rem);
          position: relative;
        }

        .army-header-left {
          flex: 0 0 clamp(340px, 44vw, 620px);
          max-width: 620px;
        }

        .army-eyebrow-row {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .army-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
        }

        .army-eyebrow-dash {
          width: 38px;
          height: 1.5px;
          background-color: rgba(255, 255, 255, 0.35);
          display: inline-block;
        }

        .army-headline {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(2.3rem, 4.8vw, 3.8rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: #ffffff;
          margin: 0 0 1.25rem 0;
        }

        .army-description {
          font-family: var(--font-body, sans-serif);
          font-size: clamp(0.95rem, 1.2vw, 1.05rem);
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 1.6rem 0;
          max-width: 600px;
        }

        .army-script-badge {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .army-script-text {
          font-family: 'Caveat', cursive, sans-serif;
          font-weight: 700;
          font-size: 2.1rem;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.03em;
          transform: rotate(-3deg);
          line-height: 1;
        }

        /* ── 3D Carousel Stage ── */
        .army-carousel-container {
          position: relative;
          width: 100%;
          user-select: none;
        }

        .army-carousel-viewport {
          position: relative;
          width: 100%;
          height: clamp(400px, 48vw, 500px);
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .army-cards-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .army-card-wrapper {
          position: absolute;
          width: clamp(230px, 28vw, 290px);
          height: clamp(330px, 40vw, 420px);
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, width 0.6s ease, height 0.6s ease;
          will-change: transform, opacity;
        }

        .card-active {
          width: clamp(250px, 30vw, 315px);
          height: clamp(370px, 45vw, 475px);
        }

        .army-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background-color: #111319;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        /* Sleek highlight border without heavy red border or red glow */
        .inner-active {
          border: 1px solid rgba(255, 255, 255, 0.45) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 255, 255, 0.08) !important;
        }

        .army-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.25) 40%,
            rgba(0, 0, 0, 0.92) 100%
          );
          z-index: 1;
        }

        .army-card-tag {
          position: absolute;
          top: 1.15rem;
          left: 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          z-index: 2;
        }

        .army-card-tag-num {
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
        }

        .army-card-tag-line {
          width: 22px;
          height: 1.5px;
          background-color: rgba(255, 255, 255, 0.7);
        }

        .army-card-content {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          z-index: 2;
          pointer-events: none;
        }

        .army-card-category {
          color: rgba(255, 255, 255, 0.75);
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }

        .army-card-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(1.2rem, 1.8vw, 1.5rem);
          font-weight: 700;
          line-height: 1.18;
          color: #ffffff;
          margin: 0 0 0.35rem 0;
        }

        .army-card-location {
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
        }

        /* ── Nav Buttons ── */
        .army-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 120;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .army-nav-left {
          left: 0;
          background-color: rgba(14, 16, 22, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #ffffff;
          backdrop-filter: blur(8px);
        }

        .army-nav-left:hover {
          background-color: rgba(255, 255, 255, 0.15);
          border-color: #ffffff;
          transform: translateY(-50%) scale(1.08);
        }

        .army-nav-right {
          right: 0;
          background-color: rgba(14, 16, 22, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #ffffff;
          backdrop-filter: blur(8px);
        }

        .army-nav-right:hover {
          background-color: rgba(255, 255, 255, 0.15);
          border-color: #ffffff;
          transform: translateY(-50%) scale(1.08);
        }

        /* ── Responsive Rules ── */
        @media (max-width: 991px) {
          .army-header-row {
            flex-direction: column;
            margin-bottom: 2.5rem;
            position: relative;
            z-index: 5;
          }
          .army-header-left {
            flex: 1;
            max-width: 100%;
          }
          .army-hero-svg {
            display: none !important;
          }
          .army-hero-right-panel {
            width: 100%;
            height: 440px;
            opacity: 0.38;
            left: 0;
            right: 0;
          }
          .army-hero-img-clip {
            clip-path: none !important;
            -webkit-clip-path: none !important;
          }
          .army-hero-vignette {
            background: linear-gradient(180deg, rgba(7, 8, 12, 0.35) 0%, rgba(7, 8, 12, 0.8) 60%, #07080c 100%),
                        linear-gradient(90deg, rgba(7, 8, 12, 0.85) 0%, rgba(7, 8, 12, 0.3) 50%, rgba(7, 8, 12, 0.85) 100%) !important;
          }
          .army-headline {
            font-size: clamp(2rem, 5.8vw, 2.85rem) !important;
            line-height: 1.12 !important;
            margin-bottom: 1rem !important;
          }
        }

        @media (max-width: 640px) {
          .army-nav-btn {
            width: 38px;
            height: 38px;
          }
          .army-hero-right-panel {
            width: 100%;
            height: 380px;
            opacity: 0.35;
          }
          .army-headline {
            font-size: clamp(1.85rem, 7.5vw, 2.35rem) !important;
            line-height: 1.12 !important;
          }
          .army-description {
            font-size: 0.92rem !important;
            line-height: 1.55 !important;
          }
          .army-card-wrapper {
            width: 250px;
            height: 350px;
          }
          .card-active {
            width: 275px;
            height: 390px;
          }
        }
      `}</style>
    </section>
  );
}
