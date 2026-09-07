'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

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

const getShortTitle = (title: string, id: string) => {
  if (id === 'hospitality' || title.toLowerCase().includes('hospitality')) return 'Hospitality';
  if (id === 'real-estate' || title.toLowerCase().includes('real estate')) return 'Real Estate';
  if (id === 'healthcare' || title.toLowerCase().includes('healthcare')) return 'Healthcare';
  if (id === 'lifestyle' || title.toLowerCase().includes('lifestyle')) return 'Lifestyle';
  if (id === 'entertainment' || title.toLowerCase().includes('media') || title.toLowerCase().includes('entertainment')) return 'Media';
  if (id === 'travel' || title.toLowerCase().includes('travel')) return 'Travel';
  return title.split(' ')[0];
};

export default function SectorMontage() {
  const { content } = useCmsContent();
  const montageCms = content?.home?.sectorsMontage;
  const sectorsList: SectorItem[] = (montageCms?.sectors && montageCms.sectors.length > 0) ? montageCms.sectors : SECTORS;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? sectorsList.length - 1 : prev - 1));
  }, [sectorsList.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === sectorsList.length - 1 ? 0 : prev + 1));
  }, [sectorsList.length]);

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

  const activeSector = sectorsList[activeIndex] || sectorsList[0];

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
            <span className="experience-eyebrow">{montageCms?.eyebrow || 'SECTOR DEPTH'}</span>
            <h2 className="experience-headline">
              Where our experience sits<span className="headline-dot">.</span>
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
                {sectorsList.map((_, idx) => (
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
                <span className="counter-total">0{sectorsList.length}</span>
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
          {sectorsList.map((sector, idx) => {
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
        {/* ============================================================
            MOBILE & TABLET VIEW (Exact layout matching Reference Image 5)
            ============================================================ */}
        <div className="mobile-showcase-wrap">
          {/* Active Big Sector Card */}
          <div className="mobile-active-card">
            {/* Background Hero Photo with dark moody contrast vignette */}
            <div className="mobile-card-bg-layer" aria-hidden="true">
              <Image
                src={activeSector.image}
                alt={activeSector.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="mobile-card-bg-img"
              />
              <div className="mobile-card-bg-gradient" />
            </div>

            {/* Foreground Content */}
            <div className="mobile-card-content">
              {/* Top Row: 01 —— and Stacked Corner Words */}
              <div className="mobile-card-top-row">
                <div className="mobile-sector-num-row">
                  <span className="mobile-sector-num">{activeSector.number}</span>
                  <span className="mobile-sector-dash" />
                </div>

                <div className="mobile-corner-stack-wrap">
                  <div className="mobile-corner-words">
                    {activeSector.cornerTag.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="mobile-corner-word">{word}</span>
                    ))}
                  </div>
                  <span className="mobile-corner-v-line" />
                </div>
              </div>

              {/* Title, Subtitle, Divider, Description */}
              <h3 className="mobile-sector-title">{activeSector.title}</h3>
              <p className="mobile-sector-subtitle">{activeSector.subtitle}</p>
              
              <div className="mobile-card-divider" />

              <p className="mobile-sector-desc">{activeSector.description}</p>

              {/* CTA Explore Button with white circle arrow icon */}
              <Link href={activeSector.link} className="mobile-explore-action-btn">
                <span className="mobile-explore-arrow-circle">
                  <ArrowRight size={13} strokeWidth={2.4} />
                </span>
                <span className="mobile-explore-btn-text">Explore this sector</span>
              </Link>

              {/* Lower breathing space for the hero image to show clearly */}
              <div className="mobile-card-image-spacer" />

              {/* Bottom Tag Row */}
              <div className="mobile-card-bottom-row">
                <span className="mobile-card-bottom-tag">{activeSector.bottomTag}</span>
              </div>
            </div>
          </div>

          {/* Sector Thumbnails Row (5 cards for other sectors matching Image 5) */}
          <div className="mobile-thumbnails-row">
            {sectorsList
              .filter((_, idx) => idx !== activeIndex)
              .map((sec) => {
                const targetIdx = sectorsList.findIndex((s) => s.id === sec.id);
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => onSelectIndex(targetIdx)}
                    className="mobile-thumb-card"
                    aria-label={`Select ${sec.title}`}
                  >
                    <div className="thumb-card-header">
                      <span className="thumb-card-num">{sec.number}</span>
                      <span className="thumb-card-title">{getShortTitle(sec.title, sec.id)}</span>
                    </div>
                    <div className="thumb-card-photo-box">
                      <Image
                        src={sec.image}
                        alt={sec.title}
                        fill
                        sizes="90px"
                        className="thumb-card-photo"
                      />
                      <div className="thumb-card-photo-scrim" />
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Mobile Bottom Controls Bar: Left Pagination Indicators, Right Circle Arrows */}
          <div className="mobile-bottom-controls-bar">
            {/* Left: Pill Active Indicator + Grey Circles */}
            <div className="mobile-dots-track">
              {sectorsList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className={`mobile-dot-btn ${idx === activeIndex ? 'mobile-dot-active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right: Round Navigation Buttons (< >) */}
            <div className="mobile-arrows-row">
              <button
                type="button"
                onClick={onPrevClick}
                className="mobile-nav-circle-btn"
                aria-label="Previous sector"
              >
                <ArrowLeft size={17} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={onNextClick}
                className="mobile-nav-circle-btn"
                aria-label="Next sector"
              >
                <ArrowRight size={17} strokeWidth={2.2} />
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
          background-color: #000000;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.22);
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 10px 18px 10px 14px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          transition: all 0.25s ease;
          width: fit-content;
        }

        .explore-pill-btn:hover {
          background-color: #1f1f23;
          transform: translateY(-1px);
        }

        .explore-arrow-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #ffffff;
          color: #000000;
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

        /* ── Mobile Layout Matching Image 5 ── */
        .mobile-showcase-wrap {
          display: none;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 24px;
        }

        .mobile-active-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background-color: #0c0d12;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-height: 520px;
        }

        .mobile-card-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        :global(.mobile-card-bg-img) {
          object-fit: cover !important;
          object-position: center 65% !important;
        }

        .mobile-card-bg-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(10, 11, 15, 0.98) 0%,
            rgba(10, 11, 15, 0.92) 40%,
            rgba(10, 11, 15, 0.22) 68%,
            rgba(10, 11, 15, 0.94) 98%
          );
        }

        .mobile-card-content {
          position: relative;
          z-index: 2;
          padding: 24px 20px 18px 20px;
          display: flex;
          flex-direction: column;
        }

        .mobile-card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .mobile-sector-num-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mobile-sector-num {
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
        }

        .mobile-sector-dash {
          width: 22px;
          height: 1.5px;
          background-color: rgba(255, 255, 255, 0.5);
          display: inline-block;
        }

        .mobile-corner-stack-wrap {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .mobile-corner-words {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1px;
        }

        .mobile-corner-word {
          font-family: var(--font-mono, monospace);
          font-size: 7.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.15;
        }

        .mobile-corner-v-line {
          width: 1.5px;
          height: 38px;
          background-color: rgba(255, 255, 255, 0.3);
          display: inline-block;
        }

        .mobile-sector-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(1.85rem, 6.5vw, 2.35rem);
          font-weight: 800;
          line-height: 1.08;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
        }

        .mobile-sector-subtitle {
          font-family: var(--font-mono, monospace);
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #9da3af;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }

        .mobile-card-divider {
          width: 28px;
          height: 1.5px;
          background-color: rgba(255, 255, 255, 0.45);
          margin-bottom: 12px;
        }

        .mobile-sector-desc {
          font-family: var(--font-body, sans-serif);
          font-size: 13px;
          line-height: 1.52;
          color: rgba(255, 255, 255, 0.78);
          margin: 0 0 18px 0;
          max-width: 480px;
        }

        .mobile-explore-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: #000000;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.22);
          padding: 8px 16px 8px 12px;
          border-radius: 9999px;
          text-decoration: none;
          width: fit-content;
          margin-bottom: 8px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .mobile-explore-action-btn:active {
          transform: scale(0.96);
          background-color: #1f1f23;
        }

        .mobile-explore-arrow-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: #ffffff;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease;
        }

        .mobile-explore-btn-text {
          font-family: var(--font-body, sans-serif);
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.01em;
        }

        .mobile-card-image-spacer {
          height: 115px;
        }

        .mobile-card-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
        }

        .mobile-card-bottom-tag {
          font-family: var(--font-mono, monospace);
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }

        /* ── Thumbnails Row (5 cards matching Image 5) ── */
        .mobile-thumbnails-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
          width: 100%;
        }

        .mobile-thumb-card {
          background: linear-gradient(180deg, #1b1e25 0%, #12141a 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 8px 5px 5px 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 106px;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease;
          box-sizing: border-box;
          text-align: left;
        }

        .mobile-thumb-card:active {
          transform: scale(0.96);
          border-color: #DE322D;
        }

        .thumb-card-header {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .thumb-card-num {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
        }

        .thumb-card-title {
          font-family: var(--font-body, sans-serif);
          font-size: 8.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.15;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .thumb-card-photo-box {
          position: relative;
          width: 100%;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
        }

        :global(.thumb-card-photo) {
          object-fit: cover !important;
        }

        .thumb-card-photo-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
        }

        /* ── Mobile Bottom Controls Bar ── */
        .mobile-bottom-controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 2px;
        }

        .mobile-dots-track {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .mobile-dot-btn {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #cbd5e1;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mobile-dot-btn.mobile-dot-active {
          width: 22px;
          height: 6px;
          border-radius: 9999px;
          background-color: #DE322D;
        }

        .mobile-arrows-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mobile-nav-circle-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease;
        }

        .mobile-nav-circle-btn:active {
          transform: scale(0.93);
          background-color: #f1f5f9;
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
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .experience-sits-section {
            padding: 44px 16px 32px 16px;
          }

          .experience-headline {
            font-size: clamp(2rem, 8vw, 2.45rem);
          }

          .experience-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .bottom-scroll-group {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
