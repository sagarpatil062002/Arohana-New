'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCmsContent } from '@/lib/cms/content-context';

export default function PointOfView() {
  const { content } = useCmsContent();
  const povCms = content?.home?.pov;

  // Section level enable/disable
  if (povCms?.enabled === false) {
    return null;
  }

  const activeEyebrow = povCms?.eyebrow || '';
  const activeHeadline = povCms?.headline || 'Some businesses need better marketing. Others need a better way of thinking about the business itself.';
  const activeParagraph1 = povCms?.paragraph1 || 'Ārohana works with businesses where communication cannot be separated from the business itself. We combine commercial thinking, sector experience and creative execution to help brands become clearer, more credible and more relevant to the people they need to reach.';
  const activeParagraph2 = povCms?.paragraph2 || "Depending on the brief, that can mean building a digital brand, running an ongoing social ecosystem, creating a film, fixing a restaurant's menu and operating systems, or taking a project from an idea to on-ground execution.";

  // Visibility toggles
  const showEyebrow = povCms?.eyebrowEnabled !== false && Boolean(activeEyebrow);
  const showHeadline = povCms?.headlineEnabled !== false && Boolean(activeHeadline);
  const showParagraph1 = povCms?.paragraph1Enabled !== false && Boolean(activeParagraph1);
  const showParagraph2 = povCms?.paragraph2Enabled !== false && Boolean(activeParagraph2);

  const showFounderCard = povCms?.founderCardEnabled !== false;
  const showFounderPhoto = povCms?.founderPhotoEnabled !== false;
  const showFounderName = povCms?.founderNameEnabled !== false;
  const showFounderRole = povCms?.founderRoleEnabled !== false;
  const showFounderDesc = povCms?.founderDescEnabled !== false;
  const showFounderLink = povCms?.founderLinkEnabled !== false;

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left Content Stagger Animation
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Right Visual Composition Reveal
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { y: 36, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            delay: 0.15,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [showFounderCard]);

  return (
    <section
      id="positioning-philosophy"
      ref={sectionRef}
      className="section-light pov-section"
      style={{
        paddingTop: 'clamp(5rem, 8vw, 8.5rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8.5rem)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="padding-global container-large">
        <div
          className="pov-split-grid"
          style={{
            gridTemplateColumns: showFounderCard ? undefined : '1fr',
          }}
        >
          {/* ============================================================
              LEFT COLUMN: Header, Headline, Paragraphs, CTA Buttons
              ============================================================ */}
          <div
            ref={leftRef}
            className="pov-left-col"
            style={{
              maxWidth: showFounderCard ? '640px' : '960px',
            }}
          >
            {/* Tag / Eyebrow if present & enabled */}
            {showEyebrow ? (
              <div className="pov-eyebrow-row">
                <span className="pov-eyebrow-text">{activeEyebrow}</span>
              </div>
            ) : null}

            {/* Main Headline with Red Accent Text & Underline Dash */}
            {showHeadline ? (
              <h2 className="pov-headline">
                {activeHeadline}
              </h2>
            ) : null}

            {/* Body Copy */}
            {(showParagraph1 || showParagraph2) && (
              <div className="pov-body-copy">
                {showParagraph1 && <p>{activeParagraph1}</p>}
                {showParagraph2 && <p>{activeParagraph2}</p>}
              </div>
            )}
          </div>

          {/* ============================================================
              RIGHT COLUMN: Layered Architectural Shapes, Portrait, Founder Badge
              ============================================================ */}
          {showFounderCard && (
            <div ref={rightRef} className="pov-right-col">
              {/* Visual Composition Container */}
              <div className="pov-composition-box">
                {/* Layer 1: Deep Red Rounded Arch on Left */}
                <div className="pov-shape-red-arch" />

                {/* Layer 2: Thin Red Outline Arc SVG */}
                <svg
                  className="pov-shape-red-outline"
                  width="140"
                  height="220"
                  viewBox="0 0 140 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M 135,15 A 80,80 0 0,0 20,95 L 20,210"
                    stroke="#9e1f24"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.85"
                  />
                </svg>

                {/* Layer 3: Dark Navy Arched Monolith on Right */}
                <div className="pov-shape-navy-pillar" />

                {/* Layer 4: Vertical Text on Far Right (STRATEGY / STORY / EXECUTION) */}
                <div className="pov-vertical-tags">
                  <span>STRATEGY &nbsp;/&nbsp; STORY &nbsp;/&nbsp; EXECUTION</span>
                </div>

                {/* Layer 5: Main Founder Portrait Card */}
                {showFounderPhoto && (
                  <div className="pov-portrait-frame">
                    <Image
                      src={povCms?.founderImage || "/images/home/madhura-editorial.jpg"}
                      alt={`${povCms?.founderName || "Madhura Hawal"} - Founder of Ārohana Consultancy`}
                      fill
                      priority
                      sizes="(max-width: 768px) 300px, (max-width: 1200px) 360px, 400px"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center 15%',
                      }}
                    />
                  </div>
                )}

                {/* Layer 6: Floating Founder Badge Card (Overlapping Bottom Right) */}
                {(showFounderName || showFounderRole || showFounderDesc || showFounderLink) && (
                  <div className="pov-founder-badge">
                    {(showFounderName || showFounderRole) && (
                      <div className="pov-founder-meta">
                        {showFounderName && <span className="pov-founder-name">{povCms?.founderName || "MADHURA HAWAL"}</span>}
                        {showFounderRole && <span className="pov-founder-role">{povCms?.founderRole || "FOUNDER"}</span>}
                      </div>
                    )}
                    {showFounderDesc && (
                      <p className="pov-founder-desc">
                        {povCms?.founderDesc || "Madhura Hawal on-ground directing projects across Ladakh and regional commercial hubs."}
                      </p>
                    )}

                    {/* Floating Red Circular Arrow Button */}
                    {showFounderLink && (
                      <Link
                        href={povCms?.founderLink || "/about"}
                        className="pov-founder-action-btn"
                        aria-label={`View ${povCms?.founderName || "Madhura Hawal"} founder story`}
                      >
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* ── Split Layout ── */
        .pov-split-grid {
          display: grid;
          grid-template-columns: 52% 48%;
          align-items: center;
          gap: clamp(2.5rem, 5vw, 5.5rem);
        }

        /* ── Left Column ── */
        .pov-left-col {
          display: flex;
          flex-direction: column;
          max-width: 640px;
        }

        .pov-eyebrow-row {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.4rem;
        }

        .pov-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #9e1f24;
          text-transform: uppercase;
        }

        .pov-eyebrow-dash {
          width: 44px;
          height: 1.5px;
          background-color: #9e1f24;
          display: inline-block;
        }

        .pov-headline {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(2.2rem, 3.8vw, 3.4rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.035em;
          color: #0b1a33;
          margin: 0 0 1.75rem 0;
        }

        .pov-highlight-phrase {
          color: #9e1f24;
          position: relative;
          display: inline-block;
        }

        .pov-dot {
          color: #9e1f24;
        }

        .pov-headline-dash {
          display: block;
          width: 38px;
          height: 2px;
          background-color: #9e1f24;
          margin-top: 8px;
        }

        .pov-body-copy {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          margin-bottom: 2.25rem;
        }

        .pov-body-copy p {
          font-family: var(--font-body, sans-serif);
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          color: #4a5a70;
          line-height: 1.68;
          margin: 0;
        }

        /* ── Buttons (Black background & white text for both versions) ── */
        .pov-buttons-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .pov-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background-color: #000000;
          color: #ffffff;
          padding: 0.8rem 1.65rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          font-family: var(--font-display, sans-serif);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pov-btn-primary:hover {
          background-color: #222222;
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
        }

        .pov-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background-color: #000000;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 0.8rem 1.65rem;
          border-radius: 4px;
          font-family: var(--font-display, sans-serif);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pov-btn-secondary:hover {
          background-color: #222222;
          border-color: #222222;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
        }

        /* ── Right Column ── */
        .pov-right-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: 100%;
        }

        /* ── Typographic Triad Element ── */
        .pov-triad-element {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          align-self: flex-start;
          margin-left: 2rem;
          margin-bottom: 1rem;
        }

        .pov-triad-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .pov-triad-word {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #8c9ba5;
        }

        .pov-triad-rule {
          width: 50px;
          height: 1px;
          background-color: #cbd5e1;
          display: inline-block;
        }

        /* ── Composition Box ── */
        .pov-composition-box {
          position: relative;
          width: 100%;
          max-width: 440px;
          margin-bottom: 2.5rem;
        }

        /* Red Arch Shape on Left */
        .pov-shape-red-arch {
          position: absolute;
          left: -40px;
          top: 30%;
          width: 65px;
          height: 190px;
          background-color: #9e1f24;
          border-radius: 9999px 0 0 9999px;
          z-index: 1;
        }

        /* Red Outline Arc SVG */
        .pov-shape-red-outline {
          position: absolute;
          left: -55px;
          top: 15%;
          pointer-events: none;
          z-index: 1;
        }

        /* Dark Navy Pillar on Right */
        .pov-shape-navy-pillar {
          position: absolute;
          right: 8px;
          top: 8%;
          width: 75px;
          height: 250px;
          background-color: #0f1c2d;
          border-radius: 40px 40px 0 0;
          z-index: 1;
        }

        /* Vertical Strategy / Story / Execution */
        .pov-vertical-tags {
          position: absolute;
          right: -50px;
          top: 32%;
          transform: rotate(90deg);
          transform-origin: center center;
          white-space: nowrap;
          font-family: var(--font-mono, monospace);
          font-size: 0.64rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #94a3b8;
          z-index: 1;
        }

        /* Main Portrait Frame */
        .pov-portrait-frame {
          position: relative;
          z-index: 2;
          width: clamp(270px, 32vw, 350px);
          height: clamp(340px, 40vw, 440px);
          border-radius: 6px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.14);
          background-color: #e5e5e5;
          margin: 0 auto;
        }

        /* Floating Founder Badge */
        .pov-founder-badge {
          position: absolute;
          bottom: -22px;
          right: -18px;
          z-index: 10;
          background-color: #ffffff;
          border-radius: 6px;
          padding: 1.25rem 1.6rem;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.08);
          max-width: 250px;
        }

        .pov-founder-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 6px;
        }

        .pov-founder-name {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 700;
          color: #9e1f24;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .pov-founder-role {
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .pov-founder-desc {
          font-family: var(--font-body, sans-serif);
          font-size: 0.8rem;
          color: #4a5a70;
          line-height: 1.45;
          margin: 0;
        }

        /* Red Circular Action Button */
        .pov-founder-action-btn {
          position: absolute;
          right: -18px;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #9e1f24;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(158, 31, 36, 0.35);
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pov-founder-action-btn:hover {
          background-color: #ba252b;
          transform: translateY(-50%) scale(1.1);
        }

        /* ── Page Indicator (01 ────── 03) ── */
        .pov-page-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          align-self: flex-end;
          margin-right: 2rem;
        }

        .pov-page-current {
          font-family: var(--font-mono, monospace);
          font-size: 0.8rem;
          font-weight: 700;
          color: #9e1f24;
        }

        .pov-page-dash {
          width: 42px;
          height: 1.5px;
          background-color: #cbd5e1;
        }

        .pov-page-total {
          font-family: var(--font-mono, monospace);
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
        }

        /* ── Responsive Rules ── */
        @media (max-width: 991px) {
          .pov-split-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .pov-left-col {
            max-width: 100%;
          }
          .pov-composition-box {
            margin: 1rem auto 2.5rem auto;
          }
          .pov-triad-element {
            align-self: center;
            margin-left: 0;
          }
          .pov-page-indicator {
            align-self: center;
            margin-right: 0;
          }
        }

        @media (max-width: 640px) {
          .pov-buttons-row {
            flex-direction: column;
            align-items: stretch;
          }
          .pov-btn-primary,
          .pov-btn-secondary {
            justify-content: center;
          }
          .pov-shape-red-arch,
          .pov-shape-red-outline,
          .pov-shape-navy-pillar,
          .pov-vertical-tags {
            display: none;
          }
          .pov-founder-badge {
            right: 0;
            bottom: -15px;
            max-width: calc(100% - 20px);
          }
          .pov-founder-action-btn {
            right: -10px;
          }
        }
      `}</style>
    </section>
  );
}
