'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Mountain, ShieldCheck, Video, Landmark } from 'lucide-react';

interface ArmyCard {
  id: string;
  index: string;
  category: string;
  title: string;
  location: string;
  image: string;
}

// Exactly ordered matching the reference image layout:
// Far Left: 04, Mid Left: 02, Center (Active): 01, Mid Right: 03, Far Right: 05
// All images are dedicated authentic Indian Army photographs from /images/army/
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
  // Center card (item 01 at index 2) is initially active
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = ARMY_PROJECT_CARDS.length;

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

  // Autoplay automatically every 2.8 seconds
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isDragging) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 2800);
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
          UNIFIED HERO RIGHT PANEL: Image + Slant Line + Framed Box
          Fitted perfectly to the slant line where the background image starts
          ============================================================ */}
      <div className="army-hero-right-panel">
        <div className="army-hero-canvas">
          {/* Background Indian Army Soldier clipped along the slant line */}
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
                opacity: 0.78,
                filter: 'contrast(1.15) brightness(0.95)',
              }}
            />
            {/* Dark gradient blend towards bottom and left */}
            <div className="army-hero-vignette" />
          </div>

          {/* Slant Line & Trapezoid Box SVG - 100% collinear with the image clip */}
          <svg
            className="army-hero-svg"
            viewBox="0 0 850 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Upper slant line continuing from top edge to the box */}
            <line
              x1="40"
              y1="0"
              x2="66.65"
              y2="65"
              stroke="#DE322D"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Tactical radar arc accent above the box */}
            <path
              d="M 90,65 A 70 45 0 0 1 210,65"
              stroke="rgba(222, 50, 45, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="40 25"
              fill="none"
            />

            {/* Trapezoid Box Polygon: left edge is identical to the slant line where image starts */}
            <polygon
              points="66.65,65 356.65,65 356.65,195 120,195"
              fill="rgba(7, 8, 12, 0.92)"
              stroke="#DE322D"
              strokeWidth="3"
              strokeLinejoin="miter"
              filter="drop-shadow(0 0 18px rgba(222, 50, 45, 0.35))"
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

            {/* Values Stack Below the Box */}
            <text
              x="352"
              y="226"
              fill="rgba(255,255,255,0.45)"
              fontFamily="var(--font-mono, monospace)"
              fontSize="10"
              fontWeight="600"
              textAnchor="end"
              letterSpacing="0.26em"
            >
              PEOPLE
            </text>
            <text
              x="352"
              y="244"
              fill="rgba(255,255,255,0.45)"
              fontFamily="var(--font-mono, monospace)"
              fontSize="10"
              fontWeight="600"
              textAnchor="end"
              letterSpacing="0.26em"
            >
              PURPOSE
            </text>
            <text
              x="352"
              y="262"
              fill="rgba(255,255,255,0.45)"
              fontFamily="var(--font-mono, monospace)"
              fontSize="10"
              fontWeight="600"
              textAnchor="end"
              letterSpacing="0.26em"
            >
              POSSIBILITIES
            </text>
            <text
              x="352"
              y="280"
              fill="rgba(255,255,255,0.45)"
              fontFamily="var(--font-mono, monospace)"
              fontSize="10"
              fontWeight="600"
              textAnchor="end"
              letterSpacing="0.26em"
            >
              BEYOND
            </text>
          </svg>
        </div>
      </div>

      <div className="padding-global container-large" style={{ position: 'relative', zIndex: 10 }}>
        {/* ============================================================
            TOP HEADER ROW: Left Content
            ============================================================ */}
        <div className="army-header-row">
          {/* Left Column: Eyebrow, Main Headline, Paragraph, Beyond Boundaries */}
          <div className="army-header-left">
            <div className="army-eyebrow-row">
              <span className="army-eyebrow-text">PROOF OF WORK</span>
              <span className="army-eyebrow-dash" />
            </div>

            <h2 className="army-headline">
              Work that doesn&apos;t fit a<br />
              standard agency box<span className="army-red-dot">.</span>
            </h2>

            <p className="army-description">
              From remote-community health initiatives in high-altitude Ladakh to official investiture
              ceremony films for the Indian Army, AROHANA has worked on projects where the
              environment, audience and institutional responsibility demanded an entirely different
              level of preparation and discipline.
            </p>

            <div className="army-script-badge">
              <span className="army-script-text">Beyond Boundaries</span>
              <span className="army-script-stroke" />
            </div>
          </div>
        </div>

        {/* ============================================================
            3D CURVED CAROUSEL (5 VISIBLE CARDS WITH ACTIVE RED BORDER)
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
              {ARMY_PROJECT_CARDS.map((item, index) => {
                // Calculate position offset relative to activeIndex (-2, -1, 0, 1, 2)
                let offset = (index - activeIndex + total) % total;
                if (offset > total / 2) {
                  offset -= total;
                }

                const isVisible = Math.abs(offset) <= 2;
                if (!isVisible) return null;

                const isActive = offset === 0;

                // 3D Perspective Parameters
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
                      {/* Background Project Image - Dedicated Army Image */}
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

                      {/* Card Gradient Overlay */}
                      <div className="army-card-overlay" />

                      {/* Card Top Tag: 01 ─── */}
                      <div className="army-card-tag">
                        <span className="army-card-tag-num">{item.index}</span>
                        <span className="army-card-tag-line" />
                      </div>

                      {/* Card Bottom Content */}
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

        {/* Divider with Red Dash Accent */}
        <div className="army-divider-wrapper">
          <div className="army-divider-line" />
          <div className="army-divider-red-dash" />
        </div>

        {/* ============================================================
            BOTTOM METRICS ROW: 4 Columns with Icons Matching Reference
            ============================================================ */}
        <div className="army-metrics-grid">
          {/* Metric 1 */}
          <div className="army-metric-item">
            <div className="army-metric-icon-box">
              <Mountain size={20} color="#ffffff" />
            </div>
            <div className="army-metric-number">14,000+ FT</div>
            <div className="army-metric-label">
              High-Altitude Logistics<br />
              in Eastern Ladakh
            </div>
          </div>

          {/* Metric 2 */}
          <div className="army-metric-item">
            <div className="army-metric-icon-box">
              <ShieldCheck size={20} color="#ffffff" />
            </div>
            <div className="army-metric-number">100%</div>
            <div className="army-metric-label">
              Protocol Security &amp;<br />
              Institutional Clearance
            </div>
          </div>

          {/* Metric 3 */}
          <div className="army-metric-item">
            <div className="army-metric-icon-box">
              <Video size={20} color="#ffffff" />
            </div>
            <div className="army-metric-number">MULTI-CAM</div>
            <div className="army-metric-label">
              Ceremonial Filming &amp;<br />
              4K Master Sound
            </div>
          </div>

          {/* Metric 4 */}
          <div className="army-metric-item">
            <div className="army-metric-icon-box">
              <Landmark size={20} color="#ffffff" />
            </div>
            <div className="army-metric-number">HQ THEATRE</div>
            <div className="army-metric-label">
              Western Command &amp;<br />
              14 Corps Headquarters
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Unified Hero Right Panel: Background Image + Slant Line + Box ── */
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
          /* Slant cut: matches viewBox 0 0 850 500 collinear slope (40/850=4.70588%, 245/850=28.8235%) */
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
          background-color: #DE322D;
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

        .army-red-dot {
          color: #DE322D;
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
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: 0.03em;
          transform: rotate(-4deg);
          line-height: 1;
        }

        .army-script-stroke {
          width: 72px;
          height: 3px;
          background-color: #DE322D;
          border-radius: 9999px;
          margin-top: 2px;
          margin-left: 8px;
          transform: rotate(-2deg);
        }

        /* ── 3D Carousel Stage ── */
        .army-carousel-container {
          position: relative;
          width: 100%;
          margin-bottom: clamp(3rem, 5vw, 4.5rem);
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

        .inner-active {
          border: 2px solid #DE322D !important;
          box-shadow: 0 0 35px rgba(222, 50, 45, 0.45), 0 25px 60px rgba(0, 0, 0, 0.9) !important;
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
          color: #DE322D;
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
          width: 46px;
          height: 46px;
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
          border: 1px solid #DE322D;
          color: #DE322D;
          backdrop-filter: blur(8px);
        }

        .army-nav-right:hover {
          background-color: #DE322D;
          color: #ffffff;
          box-shadow: 0 0 20px rgba(222, 50, 45, 0.6);
          transform: translateY(-50%) scale(1.08);
        }

        /* ── Divider ── */
        .army-divider-wrapper {
          position: relative;
          width: 100%;
          margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
        }

        .army-divider-line {
          width: 100%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.12);
        }

        .army-divider-red-dash {
          position: absolute;
          right: 30px;
          top: -1px;
          width: 60px;
          height: 2px;
          background-color: #DE322D;
        }

        /* ── Metrics Grid ── */
        .army-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1.5rem, 3vw, 3rem);
        }

        .army-metric-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .army-metric-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.15rem;
        }

        .army-metric-number {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(1.45rem, 2.2vw, 1.85rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 0.45rem;
          line-height: 1.15;
        }

        .army-metric-label {
          font-family: var(--font-body, sans-serif);
          font-size: clamp(0.8rem, 1.05vw, 0.9rem);
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.45;
        }

        /* ── Responsive Rules ── */
        @media (max-width: 991px) {
          .army-header-row {
            flex-direction: column;
            margin-bottom: 2.5rem;
          }
          .army-header-left {
            flex: 1;
            max-width: 100%;
          }
          .army-hero-right-panel {
            width: 100%;
            height: 380px;
            opacity: 0.55;
          }
          .army-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .army-nav-btn {
            width: 38px;
            height: 38px;
          }
          .army-metrics-grid {
            grid-template-columns: 1fr;
            row-gap: 2rem;
          }
          .army-hero-right-panel {
            width: 100%;
            height: 320px;
            opacity: 0.45;
          }
        }
      `}</style>
    </section>
  );
}
