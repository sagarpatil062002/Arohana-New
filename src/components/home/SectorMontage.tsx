'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SectorItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  cornerTag: string;
  bottomTag: string;
  image: string;
  link: string;
}

const SECTORS: SectorItem[] = [
  {
    id: 'hospitality',
    number: '01',
    title: 'Hospitality & F&B',
    subtitle: 'MENU CREATION, OPERATING SYSTEMS & REPEAT GUEST VISITS',
    description:
      'Hands-on advisory across experiential dining, boutique resorts, and beverage concepts. We work on menu engineering, guest retention, and operational unit economics.',
    cornerTag: 'GREAT FOOD BETTER EXPERIENCES',
    bottomTag: 'PEOPLE FOOD EXPERIENCES',
    image: '/images/sectors/01-hospitality.jpg',
    link: '/work#hospitality',
  },
  {
    id: 'real-estate',
    number: '02',
    title: 'Real Estate & Built Environment',
    subtitle: 'INDUSTRIAL FOUNDRIES, PREFAB & LUXURY MODULAR LIVING',
    description:
      'Translating complex technical capabilities and high-end living spaces into cohesive commercial brands across foundries, luxury composite decking, and modular architecture.',
    cornerTag: 'PRECISION DESIGN BUILT SPACES',
    bottomTag: 'SPACES FOR A BETTER TOMORROW',
    image: '/images/sectors/02-realestate.jpg',
    link: '/work#real-estate',
  },
  {
    id: 'healthcare',
    number: '03',
    title: 'Healthcare',
    subtitle: 'CLINICAL AUTHORITY, PATIENT EDUCATION & DEEP TRUST',
    description:
      'Elevating patient trust and clinical authority through evidence-based health and dermatological education rather than superficial promises.',
    cornerTag: 'CLINICAL AUTHORITY & INTEGRITY',
    bottomTag: 'PEOPLE HEALTH POSSIBILITIES',
    image: '/images/sectors/03-healthcare.jpg',
    link: '/work#healthcare',
  },
  {
    id: 'lifestyle',
    number: '04',
    title: 'Lifestyle & Consumer Brands',
    subtitle: 'DISTINCTIVE VISUAL IDENTITY & COMMERCIAL MOMENTUM',
    description:
      'Building sustainable brand positioning, content velocity, digital storefronts, and paid acquisition systems for businesses that need a stronger market presence.',
    cornerTag: 'DISTINCTIVE MODERN LIVING',
    bottomTag: 'BRANDS FOR BRIGHTER TOMORROWS',
    image: '/images/sectors/04-lifestyle.jpg',
    link: '/work#lifestyle',
  },
  {
    id: 'entertainment',
    number: '05',
    title: 'Entertainment & Media',
    subtitle: 'CULTURAL EVENTS, DIGITAL DISTRIBUTION & ON-GROUND CONTENT',
    description:
      'Cinematic media production, festival campaigns, and on-ground digital coverage tailored to culturally engaged audiences.',
    cornerTag: 'CINEMATIC CULTURAL STORIES',
    bottomTag: 'STORIES THAT MOVE PEOPLE',
    image: '/images/sectors/05-entertainment.jpg',
    link: '/work#entertainment',
  },
  {
    id: 'travel',
    number: '06',
    title: 'Travel & Tourism',
    subtitle: 'EXPERIENTIAL HIGH-ALTITUDE JOURNEYS & CULTURAL ROOTS',
    description:
      'Thoughtfully planned travel experiences connecting travellers with genuine local cultures, heritage homestays, and remote landscapes.',
    cornerTag: 'JOURNEYS THAT TRANSFORM',
    bottomTag: 'JOURNEYS BEYOND BOUNDARIES',
    image: '/images/sectors/06-travel.jpg',
    link: '/tourin',
  },
];

export default function SectorMontage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? SECTORS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === SECTORS.length - 1 ? 0 : prev + 1));
  }, []);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 3500);
  }, [handleNext]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  const onPrevClick = () => {
    handlePrev();
    resetAutoplay();
  };

  const onNextClick = () => {
    handleNext();
    resetAutoplay();
  };

  const onSelectIndex = (idx: number) => {
    setActiveIndex(idx);
    resetAutoplay();
  };

  const activeSector = SECTORS[activeIndex];

  return (
    <section
      id="sector-depth"
      className="experience-sits-section"
      aria-label="Where our experience sits"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetAutoplay();
      }}
    >
      <div className="experience-container">
        {/* ============================================================
            TOP HEADER AREA
            ============================================================ */}
        <div className="experience-header-row">
          <div className="experience-header-left">
            <span className="experience-eyebrow">SECTOR DEPTH</span>
            <h2 className="experience-headline">
              Where our <span className="headline-bold">experience sits</span>
              <span className="headline-dot">.</span>
            </h2>
            <p className="experience-subheading">
              Cross-disciplinary capability deployed across 6 core commercial and
              institutional sectors without generic agency templates.
            </p>
          </div>

          <div className="experience-header-right">
            {/* Dashed Progress Indicators */}
            <div className="progress-group">
              <div className="dashes-track">
                {SECTORS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectIndex(idx)}
                    className={`dash-indicator ${idx === activeIndex ? 'active' : ''}`}
                    aria-label={`Go to sector 0${idx + 1}`}
                  />
                ))}
              </div>
              <span className="counter-text">
                <span className="counter-active">{activeSector.number}</span>
                <span className="counter-slash"> / </span>
                <span className="counter-total">06</span>
              </span>
            </div>

            {/* Navigation Circle Arrows */}
            <div className="nav-arrows-group">
              <button
                type="button"
                onClick={onPrevClick}
                className="nav-arrow-btn prev-btn"
                aria-label="Previous sector"
              >
                <ArrowLeft size={17} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={onNextClick}
                className="nav-arrow-btn next-btn"
                aria-label="Next sector"
              >
                <ArrowRight size={17} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            DESKTOP INTERACTIVE CARD ACCORDION
            ============================================================ */}
        <div className="desktop-accordion-wrap">
          {SECTORS.map((sector, idx) => {
            const isActive = idx === activeIndex;

            if (isActive) {
              return (
                <div
                  key={sector.id}
                  className="accordion-card active-card"
                  role="region"
                  aria-label={`${sector.number} ${sector.title}`}
                >
                  {/* Left Column of Active Card */}
                  <div className="active-card-content">
                    <div className="active-top-block">
                      <div className="sector-number-row">
                        <span className="sector-num">{sector.number}</span>
                        <span className="sector-dash" />
                      </div>

                      <h3 className="active-sector-title">{sector.title}</h3>

                      <p className="active-sector-tag">{sector.subtitle}</p>

                      <p className="active-sector-desc">{sector.description}</p>

                      <Link href={sector.link} className="explore-pill-btn">
                        <span className="explore-arrow-circle">
                          <ArrowRight size={13} strokeWidth={2.6} />
                        </span>
                        <span>Explore this sector</span>
                      </Link>
                    </div>

                    <div className="active-card-bottom-tag">
                      {sector.bottomTag}
                    </div>
                  </div>

                  {/* Right Column / Visual Image of Active Card */}
                  <div className="active-card-visual">
                    <div className="corner-badge-text">
                      {sector.cornerTag}
                    </div>
                    <div className="visual-image-wrapper">
                      <Image
                        src={sector.image}
                        alt={sector.title}
                        fill
                        sizes="(max-width: 1200px) 50vw, 40vw"
                        priority
                        className="active-hero-img"
                      />
                      <div className="active-img-gradient-overlay" />
                    </div>
                  </div>
                </div>
              );
            }

            // Collapsed Vertical Strips
            return (
              <div
                key={sector.id}
                onClick={() => onSelectIndex(idx)}
                className="accordion-card collapsed-card"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectIndex(idx);
                  }
                }}
                aria-label={`Select ${sector.number} ${sector.title}`}
              >
                {/* Background Image with Overlay */}
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  sizes="120px"
                  className="collapsed-bg-img"
                />
                <div className="collapsed-img-overlay" />

                {/* Collapsed Card Top Details */}
                <div className="collapsed-card-top">
                  <div className="collapsed-num-row">
                    <span className="collapsed-num">{sector.number}</span>
                    <span className="collapsed-dash" />
                  </div>
                  <h4 className="collapsed-title">{sector.title}</h4>
                </div>

                {/* Collapsed Card Bottom Tag */}
                <div className="collapsed-card-bottom">
                  <span>{sector.bottomTag}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================
            MOBILE & TABLET VIEW (Compact Card + Thumbnail Selector)
            ============================================================ */}
        <div className="mobile-showcase-wrap">
          {/* Active Card on Mobile */}
          <div className="mobile-active-card">
            <div className="mobile-card-header">
              <div className="sector-number-row">
                <span className="sector-num">{activeSector.number}</span>
                <span className="sector-dash" />
              </div>
              <div className="mobile-corner-tag">{activeSector.cornerTag}</div>
            </div>

            <h3 className="mobile-sector-title">{activeSector.title}</h3>
            <p className="mobile-sector-subtitle">{activeSector.subtitle}</p>
            <p className="mobile-sector-desc">{activeSector.description}</p>

            <Link href={activeSector.link} className="explore-pill-btn">
              <span className="explore-arrow-circle">
                <ArrowRight size={13} strokeWidth={2.6} />
              </span>
              <span>Explore this sector</span>
            </Link>

            <div className="mobile-visual-box">
              <Image
                src={activeSector.image}
                alt={activeSector.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="mobile-hero-img"
              />
            </div>

            <div className="mobile-bottom-tag">{activeSector.bottomTag}</div>
          </div>

          {/* Sector Thumbnails Row */}
          <div className="mobile-thumbnails-row">
            {SECTORS.map((sec, idx) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`mobile-thumb-btn ${idx === activeIndex ? 'thumb-active' : ''}`}
                aria-label={`Select ${sec.title}`}
              >
                <div className="thumb-image-wrap">
                  <Image
                    src={sec.image}
                    alt={sec.title}
                    fill
                    sizes="80px"
                    className="thumb-img"
                  />
                  <div className="thumb-overlay" />
                </div>
                <div className="thumb-caption">
                  <span className="thumb-num">{sec.number}</span>
                  <span className="thumb-title">{sec.title.split(' ')[0]}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div className="mobile-nav-bar">
            <div className="dashes-track">
              {SECTORS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className={`dash-indicator ${idx === activeIndex ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="nav-arrows-group">
              <button
                type="button"
                onClick={onPrevClick}
                className="nav-arrow-btn prev-btn"
                aria-label="Previous sector"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={onNextClick}
                className="nav-arrow-btn next-btn"
                aria-label="Next sector"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            BOTTOM BRAND & NAVIGATION BAR
            ============================================================ */}
        <div className="experience-bottom-bar">
          <div className="bottom-brand-group">
            {/* Red Diagonal Double-Slash / Ārohana Mark */}
            <div className="brand-red-mark">
              <span className="slash-one" />
              <span className="slash-two" />
            </div>
            <span className="brand-divider-line" />
            <span className="brand-statement-text">
              IDEAS INTO REAL-WORLD IMPACT
            </span>
          </div>

          <div className="bottom-scroll-group">
            <span className="scroll-label">SCROLL TO EXPLORE</span>
            <div className="mouse-scroll-icon" aria-hidden="true">
              <span className="scroll-wheel-dot" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SCOPED STYLES
          ============================================================ */}
      <style jsx>{`
        .experience-sits-section {
          width: 100%;
          background-color: #f7f7f8;
          padding: 84px 32px 64px 32px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          position: relative;
          box-sizing: border-box;
        }

        .experience-container {
          max-width: 1380px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* ── Header Row ── */
        .experience-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
          margin-bottom: 36px;
        }

        .experience-header-left {
          max-width: 620px;
        }

        .experience-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8b1e1e;
          margin-bottom: 12px;
        }

        .experience-headline {
          font-size: clamp(2.4rem, 4.2vw, 3.75rem);
          font-weight: 400;
          line-height: 1.08;
          color: #111111;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .headline-bold {
          font-weight: 800;
          color: #111111;
        }

        .headline-dot {
          color: #8b1e1e;
          font-weight: 800;
        }

        .experience-subheading {
          font-size: 15px;
          line-height: 1.6;
          color: #5d5d64;
          max-width: 520px;
        }

        /* ── Header Right / Controls ── */
        .experience-header-right {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-bottom: 6px;
        }

        .progress-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .dashes-track {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dash-indicator {
          width: 18px;
          height: 3px;
          border-radius: 999px;
          background-color: #d8d8dc;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dash-indicator.active {
          width: 28px;
          background-color: #8b1e1e;
        }

        .counter-text {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          font-family: var(--font-mono, monospace);
        }

        .counter-active {
          color: #8b1e1e;
          font-weight: 700;
        }

        .counter-slash {
          color: #a0a0a8;
        }

        .counter-total {
          color: #7b7b84;
        }

        .nav-arrows-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .prev-btn {
          background-color: #eaeaea;
          color: #111111;
        }

        .prev-btn:hover {
          background-color: #dcdcdc;
          transform: translateX(-2px);
        }

        .next-btn {
          background-color: #8b1e1e;
          color: #ffffff;
        }

        .next-btn:hover {
          background-color: #741616;
          transform: translateX(2px);
        }

        /* ── Desktop Accordion ── */
        .desktop-accordion-wrap {
          display: flex;
          gap: 14px;
          height: 520px;
          width: 100%;
          margin-bottom: 40px;
        }

        .accordion-card {
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Active Card */
        .active-card {
          flex: 4.2;
          background-color: #0f0f11;
          color: #ffffff;
          display: flex;
          box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35);
        }

        .active-card-content {
          flex: 1.15;
          padding: 40px 36px 32px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 2;
          position: relative;
        }

        .sector-number-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .sector-num {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #a0a0aa;
          font-family: var(--font-mono, monospace);
        }

        .sector-dash {
          width: 22px;
          height: 1.5px;
          background-color: #55555c;
        }

        .active-sector-title {
          font-size: clamp(1.85rem, 2.3vw, 2.5rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .active-sector-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8c8c96;
          line-height: 1.45;
          margin-bottom: 18px;
          max-width: 380px;
        }

        .active-sector-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 24px;
          max-width: 360px;
        }

        .explore-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: #ffffff;
          color: #0c0c0e;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 10px 18px 10px 14px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s ease;
          width: fit-content;
        }

        .explore-pill-btn:hover {
          background-color: #ebebef;
          transform: translateY(-1px);
        }

        .explore-arrow-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #111111;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }

        .explore-pill-btn:hover .explore-arrow-circle {
          transform: translateX(2px);
        }

        .active-card-bottom-tag {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #6e6e78;
        }

        /* Active Visual Side */
        .active-card-visual {
          flex: 1;
          position: relative;
          height: 100%;
        }

        .corner-badge-text {
          position: absolute;
          top: 36px;
          right: 32px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          text-align: right;
          max-width: 140px;
          line-height: 1.45;
          z-index: 3;
        }

        .visual-image-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        :global(.active-hero-img) {
          object-fit: cover !important;
          object-position: center !important;
        }

        .active-img-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #0f0f11 0%,
            rgba(15, 15, 17, 0.5) 25%,
            transparent 60%
          );
        }

        /* Collapsed Cards */
        .collapsed-card {
          flex: 1;
          min-width: 75px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 28px 18px 24px 18px;
        }

        .collapsed-card:hover {
          flex: 1.18;
        }

        :global(.collapsed-bg-img) {
          object-fit: cover !important;
          object-position: center !important;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .collapsed-card:hover :global(.collapsed-bg-img) {
          transform: scale(1.06) !important;
        }

        .collapsed-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(0, 0, 0, 0.35) 45%,
            rgba(0, 0, 0, 0.85) 100%
          );
          transition: background 0.3s ease;
        }

        .collapsed-card:hover .collapsed-img-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.58) 0%,
            rgba(0, 0, 0, 0.25) 45%,
            rgba(0, 0, 0, 0.76) 100%
          );
        }

        .collapsed-card-top {
          position: relative;
          z-index: 2;
        }

        .collapsed-num-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .collapsed-num {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.8);
          font-family: var(--font-mono, monospace);
        }

        .collapsed-dash {
          width: 14px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.4);
        }

        .collapsed-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .collapsed-card-bottom {
          position: relative;
          z-index: 2;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Mobile Layout ── */
        .mobile-showcase-wrap {
          display: none;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 36px;
        }

        .mobile-active-card {
          background-color: #0f0f11;
          color: #ffffff;
          border-radius: 20px;
          padding: 28px 24px 24px 24px;
          display: flex;
          flex-direction: column;
        }

        .mobile-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .mobile-corner-tag {
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.45);
          text-transform: uppercase;
        }

        .mobile-sector-title {
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 8px;
        }

        .mobile-sector-subtitle {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8c8c96;
          margin-bottom: 14px;
        }

        .mobile-sector-desc {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 20px;
        }

        .mobile-visual-box {
          position: relative;
          width: 100%;
          height: 220px;
          border-radius: 14px;
          overflow: hidden;
          margin-top: 20px;
          margin-bottom: 16px;
        }

        :global(.mobile-hero-img) {
          object-fit: cover !important;
        }

        .mobile-bottom-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6e6e78;
          margin-top: 4px;
        }

        .mobile-thumbnails-row {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
        }

        .mobile-thumb-btn {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          opacity: 0.65;
          transition: all 0.2s ease;
        }

        .mobile-thumb-btn.thumb-active {
          opacity: 1;
          transform: translateY(-2px);
        }

        .thumb-image-wrap {
          position: relative;
          width: 100%;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px solid transparent;
        }

        .mobile-thumb-btn.thumb-active .thumb-image-wrap {
          border-color: #8b1e1e;
        }

        :global(.thumb-img) {
          object-fit: cover !important;
        }

        .thumb-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.25);
        }

        .thumb-caption {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.15;
        }

        .thumb-num {
          font-size: 10px;
          font-weight: 700;
          color: #8b1e1e;
          font-family: var(--font-mono, monospace);
        }

        .thumb-title {
          font-size: 9px;
          font-weight: 600;
          color: #333333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 48px;
        }

        .mobile-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }

        /* ── Bottom Bar ── */
        .experience-bottom-bar {
          padding-top: 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .bottom-brand-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .brand-red-mark {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 18px;
        }

        .slash-one,
        .slash-two {
          width: 5px;
          height: 18px;
          background-color: #8b1e1e;
          transform: skewX(-20deg);
          border-radius: 1px;
        }

        .brand-divider-line {
          width: 36px;
          height: 1.5px;
          background-color: #d0d0d6;
        }

        .brand-statement-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1a1a1f;
        }

        .bottom-scroll-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .scroll-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8a8a94;
        }

        .mouse-scroll-icon {
          width: 16px;
          height: 24px;
          border: 1.5px solid #8a8a94;
          border-radius: 999px;
          display: flex;
          justify-content: center;
          padding-top: 4px;
        }

        .scroll-wheel-dot {
          width: 2.5px;
          height: 5px;
          background-color: #8b1e1e;
          border-radius: 999px;
          animation: mouseScroll 1.8s infinite ease-in-out;
        }

        @keyframes mouseScroll {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
          }
          80% {
            opacity: 0;
            transform: translateY(5px);
          }
          100% {
            opacity: 0;
            transform: translateY(5px);
          }
        }

        /* ── Responsive Media Queries ── */
        @media (max-width: 1080px) {
          .experience-sits-section {
            padding: 64px 24px 48px 24px;
          }

          .desktop-accordion-wrap {
            display: none;
          }

          .mobile-showcase-wrap {
            display: flex;
          }

          .experience-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .experience-header-right {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 640px) {
          .experience-sits-section {
            padding: 52px 18px 36px 18px;
          }

          .experience-headline {
            font-size: 2.2rem;
          }

          .experience-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .bottom-scroll-group {
            display: none;
          }

          .mobile-thumbnails-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
