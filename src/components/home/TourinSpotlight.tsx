'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface TourinCardData {
  id: string;
  tag: string;
  image: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  link: string;
  linkText: string;
}

const TOURIN_CARDS: TourinCardData[] = [
  {
    id: 'tour-1',
    tag: 'HIMALAYAN EXPEDITIONS',
    image: '/images/tourin/tourin-hero.jpg',
    title: 'And then there is Tourin.',
    description:
      'Curated itineraries, curated hospitality experiences, and high-end luxury travel destinations directly by people who know the mountain terrain intimately.',
    stat: '15+',
    statLabel: 'High-Altitude Expeditions',
    link: '/tourin',
    linkText: 'More details about this tour',
  },
  {
    id: 'tour-2',
    tag: 'COMMUNITY HOMESTAYS',
    image: '/images/tourin/tourin-1.jpg',
    title: 'And then there is Tourin.',
    description:
      'Curated itineraries, curated hospitality experiences, and high-end luxury travel destinations directly by people who know the mountain terrain intimately.',
    stat: '15+',
    statLabel: 'Heritage Village Stays',
    link: '/tourin',
    linkText: 'More details about this tour',
  },
  {
    id: 'tour-3',
    tag: 'HIGH-ALTITUDE LOGISTICS',
    image: '/images/tourin/tourin-2.jpg',
    title: 'And then there is Tourin.',
    description:
      'Curated itineraries, curated hospitality experiences, and high-end luxury travel destinations directly by people who know the mountain terrain intimately.',
    stat: '15+',
    statLabel: 'Remote Pass Crossings',
    link: '/tourin',
    linkText: 'More details about this tour',
  },
  {
    id: 'tour-4',
    tag: 'MOTORCYCLE CONVOYS',
    image: '/images/tourin/tourin-3.jpg',
    title: 'And then there is Tourin.',
    description:
      'Curated itineraries, curated hospitality experiences, and high-end luxury travel destinations directly by people who know the mountain terrain intimately.',
    stat: '15+',
    statLabel: '20-Biker Expeditions',
    link: '/tourin',
    linkText: 'More details about this tour',
  },
  {
    id: 'tour-5',
    tag: 'LUXURY RETREATS',
    image: '/images/tourin/tourin-gallery-1.jpg',
    title: 'And then there is Tourin.',
    description:
      'Curated itineraries, curated hospitality experiences, and high-end luxury travel destinations directly by people who know the mountain terrain intimately.',
    stat: '15+',
    statLabel: 'Bespoke Private Journeys',
    link: '/tourin',
    linkText: 'More details about this tour',
  },
];

export default function TourinSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);

  const totalCards = TOURIN_CARDS.length;

  // Scroll to specific card index
  const scrollToIndex = useCallback((index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.children;
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      container.scrollTo({
        left: targetCard.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % totalCards;
      scrollToIndex(next);
      return next;
    });
  }, [totalCards, scrollToIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIdx = (prev - 1 + totalCards) % totalCards;
      scrollToIndex(prevIdx);
      return prevIdx;
    });
  }, [totalCards, scrollToIndex]);

  // Default auto-scroll every 1.5 seconds
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isHovered && !isDragging) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 1500);
    }
  }, [isHovered, isDragging, nextSlide]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  // Update active index on manual scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = 340 + 22; // width + gap
    const idx = Math.round(container.scrollLeft / cardWidth);
    if (idx >= 0 && idx < totalCards && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStart.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      resetAutoplay();
    }
  };

  // Touch Swipe Handlers for Mobile
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setIsHovered(false);
    resetAutoplay();
  };

  return (
    <section
      id="experience-sits"
      className="tourin-experience-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUpOrLeave();
      }}
    >
      <div className="padding-global container-large">
        {/* ============================================================
            1 & 2: SECTION HEADER & DESCRIPTION
            ============================================================ */}
        <div className="section-head-wrap">
          <div className="section-head-left">
            <h2 className="section-main-heading">
              Where our experience sits<span className="dot-accent">.</span>
            </h2>
            <p className="section-main-description">
              Our design strategy is equally designed across a four commercial and institutional sectors
              without specific agency templates.
            </p>
          </div>

          {/* Navigation Controls on Header Right */}
          <div className="section-nav-controls">
            <button
              type="button"
              className="carousel-nav-arrow"
              onClick={prevSlide}
              aria-label="Previous card"
            >
              <ArrowLeft size={17} />
            </button>
            <div className="carousel-nav-dots" aria-label="Carousel pagination">
              {TOURIN_CARDS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-nav-dot ${currentIndex === idx ? 'dot-active' : ''}`}
                  onClick={() => {
                    scrollToIndex(idx);
                    resetAutoplay();
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="carousel-nav-arrow carousel-nav-arrow-primary"
              onClick={nextSlide}
              aria-label="Next card"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* ============================================================
            3 & 4: HORIZONTAL SCROLLING CAROUSEL (CARDS)
            ============================================================ */}
        <div
          ref={carouselRef}
          className={`tourin-carousel-track ${isDragging ? 'is-dragging' : ''}`}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {TOURIN_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className={`tourin-card-item ${currentIndex === idx ? 'card-focused' : ''}`}
            >
              {/* Card Image Header */}
              <div className="tourin-card-media">
                <Image
                  src={card.image}
                  alt={card.tag}
                  fill
                  sizes="(max-width: 768px) 320px, 360px"
                  style={{ objectFit: 'cover' }}
                />
                <span className="tourin-card-badge">{card.tag}</span>
              </div>

              {/* Card Body Content */}
              <div className="tourin-card-body">
                <h3 className="tourin-card-title">{card.title}</h3>
                <p className="tourin-card-desc">{card.description}</p>

                {/* Stat & Link Footer */}
                <div className="tourin-card-footer">
                  <div className="tourin-stat-block">
                    <span className="tourin-stat-num">{card.stat}</span>
                    <span className="tourin-stat-label">{card.statLabel}</span>
                  </div>

                  <Link href={card.link} className="tourin-card-link">
                    <span>{card.linkText}</span>
                    <span className="tourin-link-arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tourin-experience-section {
          background-color: #f8fafc;
          padding-top: clamp(3.5rem, 5.5vw, 5.5rem);
          padding-bottom: clamp(4rem, 6vw, 6.5rem);
          position: relative;
          border-top: 1px solid #eef1f6;
          border-bottom: 1px solid #eef1f6;
          overflow: hidden;
        }

        /* ── Header ── */
        .section-head-wrap {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.25rem;
        }

        .section-head-left {
          max-width: 75%;
        }

        .section-main-heading {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(2rem, 3.4vw, 2.6rem);
          font-weight: 700;
          color: #0b1a33;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0 0 0.5rem 0;
        }

        .dot-accent {
          color: #ff3b30;
        }

        .section-main-description {
          font-family: var(--font-body, sans-serif);
          font-size: clamp(0.98rem, 1.25vw, 1.12rem);
          font-weight: 400;
          color: #4a5a70;
          line-height: 1.6;
          margin: 0;
          max-width: 680px;
        }

        /* ── Header Nav Controls ── */
        .section-nav-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .carousel-nav-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #0b1a33;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .carousel-nav-arrow:hover {
          background-color: #0b1a33;
          border-color: #0b1a33;
          color: #ffffff;
        }

        .carousel-nav-arrow-primary {
          border-color: #1a5cff;
          color: #1a5cff;
        }

        .carousel-nav-arrow-primary:hover {
          background-color: #1a5cff;
          border-color: #1a5cff;
          color: #ffffff;
        }

        .carousel-nav-dots {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0 0.25rem;
        }

        .carousel-nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background-color: #cbd5e1;
          cursor: pointer;
          transition: all 0.25s ease;
          padding: 0;
        }

        .carousel-nav-dot.dot-active {
          width: 22px;
          border-radius: 6px;
          background-color: #1a5cff;
        }

        /* ── Horizontal Scrolling Carousel ── */
        .tourin-carousel-track {
          display: flex;
          gap: 22px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          padding: 0.5rem 0.25rem 1.5rem 0.25rem;
          scrollbar-width: none;
          user-select: none;
          cursor: grab;
        }

        .tourin-carousel-track::-webkit-scrollbar {
          display: none;
        }

        .tourin-carousel-track.is-dragging {
          cursor: grabbing;
          scroll-snap-type: none;
        }

        /* ── Card Specification (Matches Prompt Exactly) ── */
        .tourin-card-item {
          flex: 0 0 340px;
          width: 340px;
          background-color: #ffffff;
          border: 1px solid #eef1f6;
          border-radius: 18px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          scroll-snap-align: start;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .tourin-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(11, 26, 51, 0.08);
          border-color: #dbeafe;
        }

        .card-focused {
          border-color: rgba(26, 92, 255, 0.3);
        }

        /* ── Card Media ── */
        .tourin-card-media {
          position: relative;
          width: 100%;
          height: 190px;
          overflow: hidden;
          background-color: #0b1a33;
        }

        .tourin-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(11, 26, 51, 0.75);
          backdrop-filter: blur(8px);
          color: #ffffff;
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          z-index: 2;
        }

        /* ── Card Body ── */
        .tourin-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .tourin-card-title {
          font-family: var(--font-display, sans-serif);
          font-size: 1.32rem;
          font-weight: 700;
          color: #0b1a33;
          line-height: 1.2;
          margin: 0 0 0.65rem 0;
          letter-spacing: -0.01em;
        }

        .tourin-card-desc {
          font-family: var(--font-body, sans-serif);
          font-size: 0.92rem;
          font-weight: 400;
          color: #4a5a70;
          line-height: 1.55;
          margin: 0 0 1.25rem 0;
          flex: 1;
        }

        /* ── Card Footer: Stat & Link ── */
        .tourin-card-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
          gap: 0.75rem;
        }

        .tourin-stat-block {
          display: flex;
          flex-direction: column;
        }

        .tourin-stat-num {
          font-family: var(--font-display, sans-serif);
          font-size: 1.95rem;
          font-weight: 700;
          color: #1a5cff;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .tourin-stat-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.64rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #64748b;
          text-transform: uppercase;
          margin-top: 0.2rem;
        }

        .tourin-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #1a5cff;
          font-family: var(--font-body, sans-serif);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: gap 0.2s ease, color 0.2s ease;
          padding-bottom: 2px;
        }

        .tourin-card-link:hover {
          color: #0040df;
          gap: 0.55rem;
        }

        .tourin-link-arrow {
          display: inline-block;
          font-size: 1.05rem;
          line-height: 1;
          transition: transform 0.2s ease;
        }

        .tourin-card-link:hover .tourin-link-arrow {
          transform: translateX(3px);
        }

        /* ── Responsive Rules ── */
        @media (max-width: 991px) {
          .section-head-wrap {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .section-head-left {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .tourin-card-item {
            flex: 0 0 calc(100vw - 3rem);
            width: calc(100vw - 3rem);
            max-width: 340px;
          }
        }
      `}</style>
    </section>
  );
}
