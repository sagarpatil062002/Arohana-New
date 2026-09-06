'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface JourneyCategory {
  id: string;
  name: string;
  image: string;
  heroImage?: string;
  tagline: string;
}

const JOURNEY_CATEGORIES: JourneyCategory[] = [
  {
    id: 'trekking',
    name: 'Trekking',
    image: '/images/tourin/thumb-trekking.jpg',
    heroImage: '/images/tourin/tourin-hiker-hero.jpg',
    tagline: 'High-Altitude Himalayan Trails',
  },
  {
    id: 'homestays',
    name: 'Homestays',
    image: '/images/tourin/thumb-homestay.jpg',
    heroImage: '/images/tourin/thumb-homestay.jpg',
    tagline: 'Heritage Community Living',
  },
  {
    id: 'experiences',
    name: 'Experiences',
    image: '/images/tourin/thumb-experience.jpg',
    heroImage: '/images/tourin/thumb-experience.jpg',
    tagline: 'Glacial Passes & Bespoke Expeditions',
  },
];

export default function TourinSpotlight() {
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = JOURNEY_CATEGORIES[activeCategory];

  return (
    <section id="tourin" className="tourin-section-wrapper" aria-label="Tourin Experiential Travel">
      <div className="tourin-outer-container">
        {/* ============================================================
            MAIN HERO CARD WITH ORGANIC SPLIT
            ============================================================ */}
        <div className="tourin-hero-card">
          {/* Background / Right Mountain Landscape Visual */}
          <div className="mountain-visual-layer">
            <Image
              src="/images/tourin/tourin-hiker-hero.jpg"
              alt="Hiker overlooking high-altitude Himalayan mountain peaks"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="mountain-hero-img"
            />
            {/* Subtle atmospheric vignette */}
            <div className="mountain-vignette-overlay" />

            {/* Floating Top Pill Badge: [ ĀROHANA ] → [ TOURIN ] */}
            <div className="floating-brand-bridge">
              <div className="bridge-pills-row">
                <div className="bridge-pill arohana-pill">
                  <span>ĀROHANA</span>
                </div>
                <div className="bridge-arrow-icon" aria-hidden="true">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
                <div className="bridge-pill tourin-pill">
                  <span className="tourin-pill-bg" />
                  <span className="tourin-pill-text">TOURIN</span>
                </div>
              </div>
              <span className="bridge-tagline">NEW HORIZONS SAME PURPOSE</span>
            </div>

            {/* Handwritten Script Overlay ("More than a destination") */}
            <div className="handwritten-script-box">
              <span className="script-word">More</span>
              <span className="script-word">than a</span>
              <span className="script-word">destination</span>
              <svg
                className="script-red-underline"
                width="84"
                height="9"
                viewBox="0 0 84 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 6.5C26 2 58 2 82 6.5"
                  stroke="#e03131"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Right Edge Vertical Slider Rail */}
            <div className="vertical-rail-indicator" aria-hidden="true">
              <span className="rail-num">01</span>
              <div className="rail-track">
                <span className="rail-active-thumb" />
              </div>
              <span className="rail-num">03</span>
            </div>
          </div>

          {/* Organic Wave Divider SVG (Smoothly connects dark left & mountain right) */}
          <div className="organic-divider-wrapper" aria-hidden="true">
            <svg
              viewBox="0 0 160 800"
              preserveAspectRatio="none"
              className="organic-divider-svg"
            >
              <path
                d="M0,0 L65,0 C125,180 165,340 70,520 C20,620 15,710 40,800 L0,800 Z"
                fill="#121316"
              />
            </svg>
          </div>

          {/* Left Column Content (Dark Container) */}
          <div className="tourin-content-panel">
            <div className="panel-inner">
              {/* Eyebrow with Red Dash */}
              <div className="eyebrow-row">
                <span className="eyebrow-text">EXPERIENTIAL TRAVEL</span>
                <span className="eyebrow-dash" />
              </div>

              {/* Main Headline */}
              <h2 className="headline-text">
                And then
                <br />
                there is
                <br />
                Tourin<span className="headline-dot">.</span>
              </h2>

              {/* Body Description */}
              <p className="description-text">
                Curated Himalayan routes, community homestays, and high-altitude logistics
                planned directly by people who know the mountain terrain intimately.
              </p>

              {/* Stat Card */}
              <div className="stat-callout-card">
                <div className="stat-num-col">
                  <span className="stat-num">15+</span>
                </div>
                <div className="stat-desc-col">
                  <p className="stat-desc-text">
                    15+ separate bookings/trips so far — from solo high-altitude explorers to
                    corporate and 20-biker expeditions.
                  </p>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="cta-buttons-row">
                <Link href="/tourin" className="btn-primary-pill">
                  <span>Explore Tourin Journeys</span>
                  <ArrowUpRight size={15} strokeWidth={2.4} />
                </Link>

                <Link href="/contact" className="btn-secondary-pill">
                  <span>Plan a Journey</span>
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </Link>
              </div>

              {/* Bottom Left Scroll Indicator */}
              <div className="bottom-scroll-hint">
                <span className="scroll-hint-dash" />
                <span className="scroll-hint-text">SCROLL TO EXPLORE MORE</span>
              </div>
            </div>
          </div>

          {/* Floating Bottom Thumbnails Strip (Trekking, Homestays, Experiences) */}
          <div className="floating-bottom-strip">
            <div className="thumbnails-group">
              {JOURNEY_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(idx)}
                  className={`category-pill-thumb ${activeCategory === idx ? 'active-thumb' : ''}`}
                  aria-label={`Explore ${cat.name}`}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="110px"
                    className="thumb-image-fill"
                  />
                  <div className="thumb-gradient-dim" />
                  <span className="thumb-label">{cat.name}</span>
                </button>
              ))}
            </div>

            <Link
              href="/tourin"
              className="action-circle-red"
              aria-label="View all Tourin expeditions"
            >
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* ============================================================
            BOTTOM BRAND FOOTER (Below the Card)
            ============================================================ */}
        <div className="tourin-bottom-footer">
          <div className="footer-right-statement">
            <span className="footer-line" />
            <div className="footer-text-block">
              <span>NORTH INDIA</span>
              <span>AND BEYOND</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          SCOPED CSS STYLES
          ============================================================ */}
      <style jsx>{`
        .tourin-section-wrapper {
          width: 100%;
          background-color: #ffffff;
          padding: 60px 32px 64px 32px;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }

        .tourin-outer-container {
          max-width: 1360px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* ── Main Hero Card ── */
        .tourin-hero-card {
          position: relative;
          width: 100%;
          min-height: 620px;
          border-radius: 36px;
          background-color: #121316;
          overflow: hidden;
          box-shadow: 0 28px 60px -15px rgba(0, 0, 0, 0.35);
          display: flex;
        }

        /* ── Right Mountain Visual Layer ── */
        .mountain-visual-layer {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 66%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        :global(.mountain-hero-img) {
          object-fit: cover !important;
          object-position: center 30% !important;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .tourin-hero-card:hover :global(.mountain-hero-img) {
          transform: scale(1.025) !important;
        }

        .mountain-vignette-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35) 0%,
            transparent 30%,
            transparent 60%,
            rgba(0, 0, 0, 0.5) 100%
          );
          pointer-events: none;
        }

        /* ── Floating Pill Bridge: [ ĀROHANA ] → [ TOURIN ] ── */
        .floating-brand-bridge {
          position: absolute;
          top: 36px;
          left: 18%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          z-index: 5;
        }

        .bridge-pills-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .bridge-pill {
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .arohana-pill {
          background-color: rgba(18, 19, 22, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .bridge-arrow-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: #ffffff;
          color: #e03131;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .tourin-pill {
          background-color: rgba(45, 35, 30, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .tourin-pill-text {
          position: relative;
          z-index: 2;
        }

        .bridge-tagline {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        /* ── Handwritten Script Badge ("More than a destination") ── */
        .handwritten-script-box {
          position: absolute;
          bottom: 120px;
          left: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.88;
          transform: rotate(-3.5deg);
          z-index: 5;
          pointer-events: none;
        }

        .script-word {
          font-family: 'Caveat', cursive, sans-serif;
          font-size: 2.15rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 3px 12px rgba(0, 0, 0, 0.6);
          letter-spacing: -0.01em;
        }

        .script-red-underline {
          margin-top: 4px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
        }

        /* ── Vertical Rail Indicator ── */
        .vertical-rail-indicator {
          position: absolute;
          top: 50%;
          right: 28px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 5;
        }

        .rail-num {
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-mono, monospace);
          color: rgba(255, 255, 255, 0.55);
        }

        .rail-track {
          width: 2px;
          height: 90px;
          background-color: rgba(255, 255, 255, 0.2);
          position: relative;
          border-radius: 999px;
        }

        .rail-active-thumb {
          position: absolute;
          top: 15px;
          left: -1px;
          width: 4px;
          height: 32px;
          background-color: #e03131;
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(224, 49, 49, 0.8);
        }

        /* ── Organic Divider Wave ── */
        .organic-divider-wrapper {
          position: absolute;
          top: 0;
          left: 36%;
          bottom: 0;
          width: 130px;
          height: 100%;
          z-index: 3;
          pointer-events: none;
        }

        .organic-divider-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Left Content Panel ── */
        .tourin-content-panel {
          position: relative;
          z-index: 4;
          width: 44%;
          background-color: #121316;
          padding: 60px 48px 48px 56px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .panel-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Eyebrow */
        .eyebrow-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .eyebrow-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8c8d94;
        }

        .eyebrow-dash {
          width: 32px;
          height: 1.5px;
          background-color: #e03131;
        }

        /* Headline */
        .headline-text {
          font-size: clamp(2.6rem, 3.8vw, 3.65rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .headline-dot {
          color: #e03131;
        }

        /* Description */
        .description-text {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.72);
          max-width: 420px;
          margin-bottom: 28px;
        }

        /* Stat Callout */
        .stat-callout-card {
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 22px;
          margin-bottom: 32px;
          max-width: 440px;
        }

        .stat-num {
          font-size: 2.3rem;
          font-weight: 800;
          color: #e03131;
          letter-spacing: -0.03em;
          line-height: 1;
          font-family: var(--font-display, sans-serif);
        }

        .stat-desc-text {
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Action Buttons */
        .cta-buttons-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 38px;
        }

        .btn-primary-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #ffffff;
          color: #111114;
          font-size: 13px;
          font-weight: 700;
          padding: 12px 22px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }

        .btn-primary-pill:hover {
          background-color: #eaeaea;
          transform: translateY(-2px);
        }

        .btn-secondary-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: transparent;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-secondary-pill:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        /* Bottom Scroll Hint */
        .bottom-scroll-hint {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .scroll-hint-dash {
          width: 22px;
          height: 1.5px;
          background-color: #e03131;
        }

        .scroll-hint-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6a6b74;
        }

        /* ── Floating Bottom Strip (Thumbnails + Circle Button) ── */
        .floating-bottom-strip {
          position: absolute;
          bottom: 24px;
          left: 42%;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 6;
        }

        .thumbnails-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .category-pill-thumb {
          position: relative;
          width: 96px;
          height: 64px;
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid transparent;
          background: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 8px;
        }

        .category-pill-thumb:hover {
          transform: translateY(-3px);
        }

        .category-pill-thumb.active-thumb {
          border-color: #e03131;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        :global(.thumb-image-fill) {
          object-fit: cover !important;
          object-position: center !important;
        }

        .thumb-gradient-dim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.72) 100%
          );
        }

        .thumb-label {
          position: relative;
          z-index: 2;
          font-size: 10.5px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.04em;
        }

        .action-circle-red {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #e03131;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 6px 18px rgba(224, 49, 49, 0.45);
        }

        .action-circle-red:hover {
          background-color: #c92a2a;
          transform: scale(1.08) translateX(2px);
        }

        /* ── Bottom Footer Row ── */
        .tourin-bottom-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 18px;
          width: 100%;
        }

        .footer-right-statement {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-line {
          width: 2px;
          height: 24px;
          background-color: #d1d5db;
        }

        .footer-text-block {
          display: flex;
          flex-direction: column;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #374151;
          line-height: 1.35;
        }

        /* ── Responsive Queries ── */
        @media (max-width: 1120px) {
          .tourin-hero-card {
            min-height: 560px;
          }

          .tourin-content-panel {
            width: 48%;
            padding: 48px 36px;
          }

          .mountain-visual-layer {
            width: 60%;
          }

          .organic-divider-wrapper {
            left: 42%;
          }

          .floating-bottom-strip {
            left: 46%;
          }
        }

        @media (max-width: 900px) {
          .tourin-section-wrapper {
            padding: 40px 20px;
          }

          .tourin-hero-card {
            flex-direction: column;
            border-radius: 28px;
            min-height: auto;
          }

          .organic-divider-wrapper {
            display: none;
          }

          .tourin-content-panel {
            width: 100%;
            padding: 40px 28px 32px 28px;
          }

          .mountain-visual-layer {
            position: relative;
            width: 100%;
            height: 360px;
          }

          .floating-brand-bridge {
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
          }

          .handwritten-script-box {
            left: 28px;
            bottom: 32px;
          }

          .floating-bottom-strip {
            position: relative;
            bottom: auto;
            left: auto;
            margin: 24px 28px;
            justify-content: space-between;
          }

          .vertical-rail-indicator {
            display: none;
          }

          .tourin-bottom-footer {
            justify-content: flex-start;
            padding-left: 12px;
          }

          .footer-line {
            width: 28px;
            height: 2px;
          }

          .footer-right-statement {
            flex-direction: row;
          }

          .footer-text-block {
            flex-direction: row;
            gap: 6px;
          }
        }

        @media (max-width: 600px) {
          .cta-buttons-row {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-primary-pill,
          .btn-secondary-pill {
            justify-content: center;
          }

          .category-pill-thumb {
            width: 80px;
            height: 56px;
          }
        }
      `}</style>
    </section>
  );
}
