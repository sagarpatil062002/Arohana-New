'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ═══════════════════════════════════════════════════════════════════
   SERVICES — Practice Areas & Capabilities
   Pixel-perfect replication of design reference:
   01 Hero (Three ways we work.) + Architectural Mountain Collage
   02 Digital Brand Growth (01) + Deliverables List
   03 Hospitality Consulting (02) — Full-Width Dark Section
   04 Content & Brand Production (03) + Deliverables List
   05 How Engagements Work (01, 02, 03 Columns)
   06 Team Structure (Assembled around the brief. + Radial Hub Diagram)
   07 Bottom Banner (Don't start with a service. Start with the problem.)
   08 Services Footer
   ═══════════════════════════════════════════════════════════════════ */

const RED = '#DE322D';
const DARK = '#111113';
const BG_PAGE = '#FBF9F5';
const BODY_TEXT = '#4A4A52';
const MUTED = '#71717A';
const FAINT = '#A1A1AA';
const BORDER = '1px solid rgba(0, 0, 0, 0.08)';

const DIGITAL_DELIVERABLES = [
  { num: '01', title: 'Brand positioning & value proposition' },
  { num: '02', title: 'Visual identity & system design' },
  { num: '03', title: 'Website architecture & development' },
  { num: '04', title: 'Content publishing frameworks' },
  { num: '05', title: 'Performance marketing & paid acquisition' },
  { num: '06', title: 'Digital revenue pipelines & analytics' },
];

const HOSPITALITY_DELIVERABLES = [
  { num: '01', title: 'Concept development & culinary narrative' },
  { num: '02', title: 'Menu engineering & margin architecture' },
  { num: '03', title: 'Service journey & front-of-house' },
  { num: '04', title: 'Staff training & brand touchpoints' },
  { num: '05', title: 'Guest retention & local marketing' },
  { num: '06', title: 'Boutique resort & dining diagnostics' },
];

const PRODUCTION_DELIVERABLES = [
  { num: '01', title: 'On-location film direction' },
  { num: '02', title: 'Architectural & interior stills' },
  { num: '03', title: 'Technical scripting & narrative framing' },
  { num: '04', title: 'Sound, color & post-production' },
  { num: '05', title: 'High-altitude / remote capabilities' },
  { num: '06', title: 'Documentary & social asset toolkits' },
];

const ENGAGEMENT_MODELS = [
  {
    num: '01',
    title: 'Strategic Retainers',
    desc: 'Ongoing support for long-term brand, growth and operational goals.',
    href: '/contact',
  },
  {
    num: '02',
    title: 'High-Impact Sprints',
    desc: 'Focused, time-bound projects for specific outcomes.',
    href: '/contact',
  },
  {
    num: '03',
    title: 'Specialised Production Briefs',
    desc: 'Dedicated teams for high-quality content and production needs.',
    href: '/contact',
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* GSAP scroll reveal animations */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-anim-fade',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: BG_PAGE,
        color: DARK,
        minHeight: '100vh',
        overflowX: 'hidden',
        fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      }}
    >
      <div className="padding-global" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1: HERO SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            minHeight: 'calc(100vh - 76px)',
            paddingTop: 'clamp(5.5rem, 8vw, 7.5rem)',
            paddingBottom: 'clamp(3rem, 5vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Heading & Narrative */}
            <div>
              {/* Eyebrow */}
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                PRACTICE AREAS & CAPABILITIES
              </div>

              {/* Main Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2.8rem, 5.8vw, 5.8rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.04em',
                  fontWeight: 650,
                  color: DARK,
                  marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                }}
              >
                Three ways
                <br />
                we work<span style={{ color: RED }}>.</span>
              </h1>

              {/* Double Red Dash Line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}>
                <span style={{ width: '28px', height: '2.5px', backgroundColor: RED, display: 'inline-block' }} />
                <span style={{ width: '12px', height: '2.5px', backgroundColor: RED, display: 'inline-block' }} />
              </div>

              {/* Paragraph */}
              <p
                style={{
                  maxWidth: '520px',
                  fontSize: 'clamp(0.98rem, 1.25vw, 1.15rem)',
                  lineHeight: 1.65,
                  color: BODY_TEXT,
                  fontWeight: 450,
                }}
              >
                We operate at the intersection of commercial context, sector depth and creative execution.
                Our services are built to help you build, grow and communicate with clarity, consistency and impact.
              </p>

              {/* Scroll Indicator */}
              <div style={{ marginTop: 'clamp(3rem, 5vw, 4.5rem)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <span className="tag-mono" style={{ fontSize: '0.62rem', color: FAINT, letterSpacing: '0.22em', fontWeight: 600 }}>
                  SCROLL
                </span>
                <span style={{ width: '1px', height: '28px', backgroundColor: 'rgba(0, 0, 0, 0.25)', display: 'inline-block' }} />
              </div>
            </div>

            {/* Right Column: Architectural Mountain Collage */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '520px',
                  aspectRatio: '223 / 180',
                  boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.12)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Image
                  src="/images/services/services-hero-collage.png"
                  alt="Arohana practice areas — Strategy, Creative, Execution"
                  fill
                  priority
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 92vw, 520px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2: DIGITAL BRAND GROWTH (01)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="digital-growth"
          style={{
            paddingTop: 'clamp(4rem, 6.5vw, 6.5rem)',
            paddingBottom: 'clamp(4rem, 6.5vw, 6.5rem)',
            borderTop: BORDER,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Number, Title, Image */}
            <div>
              {/* Serif Numeral */}
              <div
                style={{
                  fontFamily: 'serif, "Times New Roman", Georgia, serif',
                  fontSize: 'clamp(3rem, 4.5vw, 4.2rem)',
                  lineHeight: 1,
                  color: DARK,
                  marginBottom: '0.85rem',
                  fontWeight: 400,
                }}
              >
                01
              </div>

              {/* Category Tag */}
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                DIGITAL BRAND GROWTH
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  fontWeight: 650,
                  color: DARK,
                  marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  maxWidth: '22ch',
                }}
              >
                Brand systems that drive commercial momentum.
              </h2>

              {/* Rectangular Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Image
                  src="/images/services/digital-growth.jpg"
                  alt="Digital brand growth desk setup with laptop, notebook and coffee"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
                />
              </div>
            </div>

            {/* Right Column: Deliverables List */}
            <div style={{ paddingTop: 'clamp(0.5rem, 2vw, 2rem)' }}>
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: MUTED,
                  fontWeight: 700,
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                }}
              >
                WHAT WE DELIVER
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {DIGITAL_DELIVERABLES.map((item) => (
                  <div
                    key={item.num}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '44px 1fr',
                      alignItems: 'center',
                      padding: 'clamp(0.85rem, 1.25vw, 1.15rem) 0',
                      borderTop: '1px solid rgba(0, 0, 0, 0.07)',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    <span className="tag-mono" style={{ fontSize: '0.72rem', color: FAINT, letterSpacing: '0.12em' }}>
                      {item.num}
                    </span>
                    <span style={{ fontSize: 'clamp(0.92rem, 1.15vw, 1.05rem)', fontWeight: 500, color: '#222225' }}>
                      {item.title}
                    </span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.07)' }} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: HOSPITALITY CONSULTING (02) — FULL-WIDTH DARK BAND
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="hospitality-consulting"
        style={{
          backgroundColor: '#111113',
          color: '#ffffff',
          paddingTop: 'clamp(4.5rem, 7.5vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 7.5vw, 7.5rem)',
          position: 'relative',
        }}
      >
        <div className="padding-global" style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Number, Title, Deliverables */}
            <div>
              {/* Serif Numeral */}
              <div
                style={{
                  fontFamily: 'serif, "Times New Roman", Georgia, serif',
                  fontSize: 'clamp(3rem, 4.5vw, 4.2rem)',
                  lineHeight: 1,
                  color: '#ffffff',
                  marginBottom: '0.85rem',
                  fontWeight: 400,
                }}
              >
                02
              </div>

              {/* Category Tag */}
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                HOSPITALITY CONSULTING
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  fontWeight: 650,
                  color: '#ffffff',
                  marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)',
                  maxWidth: '22ch',
                }}
              >
                Restaurant fundamentals, guest experience & repeat visits.
              </h2>

              {/* Deliverables List on Dark */}
              <div>
                <div
                  className="tag-mono"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                  }}
                >
                  WHAT WE DELIVER
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {HOSPITALITY_DELIVERABLES.map((item) => (
                    <div
                      key={item.num}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '44px 1fr',
                        alignItems: 'center',
                        padding: 'clamp(0.85rem, 1.25vw, 1.15rem) 0',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.paddingLeft = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      <span className="tag-mono" style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.12em' }}>
                        {item.num}
                      </span>
                      <span style={{ fontSize: 'clamp(0.92rem, 1.15vw, 1.05rem)', fontWeight: 450, color: 'rgba(255, 255, 255, 0.92)' }}>
                        {item.title}
                      </span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
                </div>
              </div>
            </div>

            {/* Right Column: Atmospheric Dining Photo with Red Box Accent */}
            <div
              style={{
                position: 'relative',
                padding: 'clamp(0.5rem, 2vw, 2rem)',
              }}
            >
              {/* Outer architectural wireframe box accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '92%',
                  height: '92%',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '18px',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '18%',
                  left: 0,
                  width: '28px',
                  height: '2px',
                  backgroundColor: RED,
                  zIndex: 3,
                }}
              />

              {/* Photo Container */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  aspectRatio: '16 / 10',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                }}
              >
                <Image
                  src="/images/services/hospitality-consulting.jpg"
                  alt="Atmospheric hospitality dining table with wine glasses and mountain window view"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="padding-global" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4: CONTENT & BRAND PRODUCTION (03)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="brand-production"
          style={{
            paddingTop: 'clamp(4.5rem, 7vw, 7rem)',
            paddingBottom: 'clamp(4.5rem, 7vw, 7rem)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Number, Title, Image */}
            <div>
              {/* Serif Numeral */}
              <div
                style={{
                  fontFamily: 'serif, "Times New Roman", Georgia, serif',
                  fontSize: 'clamp(3rem, 4.5vw, 4.2rem)',
                  lineHeight: 1,
                  color: DARK,
                  marginBottom: '0.85rem',
                  fontWeight: 400,
                }}
              >
                03
              </div>

              {/* Category Tag */}
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                CONTENT & BRAND PRODUCTION
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  fontWeight: 650,
                  color: DARK,
                  marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  maxWidth: '22ch',
                }}
              >
                Cinematic visual production with editorial discipline.
              </h2>

              {/* Rectangular Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Image
                  src="/images/services/content-production.jpg"
                  alt="Cinematic production camera on tripod overlooking mountain range"
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
                />
              </div>
            </div>

            {/* Right Column: Deliverables List */}
            <div style={{ paddingTop: 'clamp(0.5rem, 2vw, 2rem)' }}>
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: MUTED,
                  fontWeight: 700,
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                }}
              >
                WHAT WE DELIVER
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {PRODUCTION_DELIVERABLES.map((item) => (
                  <div
                    key={item.num}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '44px 1fr',
                      alignItems: 'center',
                      padding: 'clamp(0.85rem, 1.25vw, 1.15rem) 0',
                      borderTop: '1px solid rgba(0, 0, 0, 0.07)',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    <span className="tag-mono" style={{ fontSize: '0.72rem', color: FAINT, letterSpacing: '0.12em' }}>
                      {item.num}
                    </span>
                    <span style={{ fontSize: 'clamp(0.92rem, 1.15vw, 1.05rem)', fontWeight: 500, color: '#222225' }}>
                      {item.title}
                    </span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.07)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5: HOW ENGAGEMENTS WORK
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
            paddingBottom: 'clamp(3.5rem, 6vw, 5.5rem)',
            borderTop: BORDER,
          }}
        >
          {/* Header */}
          <div
            className="tag-mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              color: DARK,
              fontWeight: 700,
              marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            <span style={{ width: '28px', height: '2px', backgroundColor: RED, display: 'inline-block' }} />
            HOW ENGAGEMENTS WORK
          </div>

          {/* 3 Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
            }}
          >
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <Link
                key={model.num}
                href={model.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingRight: idx < ENGAGEMENT_MODELS.length - 1 ? 'clamp(1rem, 2.5vw, 2.5rem)' : '0',
                  borderRight: idx < ENGAGEMENT_MODELS.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                  textDecoration: 'none',
                  color: DARK,
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div
                    className="tag-mono"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: DARK,
                      letterSpacing: '0.12em',
                      marginBottom: '1rem',
                    }}
                  >
                    {model.num}
                  </div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.2rem, 1.7vw, 1.45rem)',
                      fontWeight: 650,
                      letterSpacing: '-0.02em',
                      marginBottom: '0.75rem',
                      color: DARK,
                    }}
                  >
                    {model.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: MUTED }}>
                    {model.desc}
                  </p>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid rgba(0, 0, 0, 0.18)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowRight size={14} color={DARK} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6: TEAM STRUCTURE ("Assembled around the brief.")
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 'clamp(4rem, 6.5vw, 6.5rem)',
            paddingBottom: 'clamp(4rem, 6.5vw, 6.5rem)',
            borderTop: BORDER,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Heading & Copy */}
            <div>
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                TEAM STRUCTURE
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.6rem)',
                  fontWeight: 650,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.1,
                  color: DARK,
                  marginBottom: '1.25rem',
                }}
              >
                Assembled around the brief<span style={{ color: RED }}>.</span>
              </h2>

              <p
                style={{
                  maxWidth: '480px',
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                  lineHeight: 1.65,
                  color: BODY_TEXT,
                }}
              >
                We bring together specialists from strategy, creative, design, technology, hospitality and
                production — depending on your goals, sector and scale.
              </p>
            </div>

            {/* Right Column: Radial Hub Diagram */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: 'clamp(1rem, 2vw, 2.5rem)',
              }}
            >
              <svg
                viewBox="0 0 540 380"
                style={{ width: '100%', maxWidth: '520px', height: 'auto', overflow: 'visible' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Concentric Outer Circle */}
                <circle cx="270" cy="190" r="70" fill="none" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1" />
                <circle cx="270" cy="190" r="48" fill="none" stroke="rgba(0, 0, 0, 0.14)" strokeWidth="1" />

                {/* Center Circle Hub */}
                <circle cx="270" cy="190" r="38" fill="#FFFFFF" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="1.5" />
                <text
                  x="270"
                  y="186"
                  textAnchor="middle"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="8"
                  fontWeight="700"
                  letterSpacing="0.14em"
                  fill="#8E8E94"
                >
                  YOUR
                </text>
                <text
                  x="270"
                  y="200"
                  textAnchor="middle"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="9.5"
                  fontWeight="800"
                  letterSpacing="0.12em"
                  fill={DARK}
                >
                  BRIEF
                </text>

                {/* Spoke Lines */}
                {/* 1. Top-Left: STRATEGY */}
                <line x1="238" y1="166" x2="135" y2="85" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />
                <circle cx="135" cy="85" r="3" fill={RED} />
                <text
                  x="125"
                  y="88"
                  textAnchor="end"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="8"
                  fontWeight="700"
                  letterSpacing="0.14em"
                  fill={DARK}
                >
                  STRATEGY
                </text>

                {/* 2. Top-Right: CREATIVE */}
                <line x1="302" y1="166" x2="405" y2="85" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />
                <circle cx="405" cy="85" r="3" fill={RED} />
                <text
                  x="415"
                  y="88"
                  textAnchor="start"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="8"
                  fontWeight="700"
                  letterSpacing="0.14em"
                  fill={DARK}
                >
                  CREATIVE
                </text>

                {/* 3. Left: DESIGN */}
                <line x1="222" y1="190" x2="115" y2="190" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />
                <circle cx="115" cy="190" r="3" fill={RED} />
                <text
                  x="105"
                  y="193"
                  textAnchor="end"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="8"
                  fontWeight="700"
                  letterSpacing="0.14em"
                  fill={DARK}
                >
                  DESIGN
                </text>

                {/* 4. Right: DESIGN */}
                <line x1="318" y1="190" x2="425" y2="190" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />
                <circle cx="425" cy="190" r="3" fill={RED} />
                <text
                  x="435"
                  y="193"
                  textAnchor="start"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="8"
                  fontWeight="700"
                  letterSpacing="0.14em"
                  fill={DARK}
                >
                  DESIGN
                </text>

                {/* 5. Bottom-Left: TECH & ANALYTICS */}
                <line x1="238" y1="214" x2="135" y2="295" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />
                <circle cx="135" cy="295" r="3" fill={RED} />
                <text
                  x="125"
                  y="298"
                  textAnchor="end"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="8"
                  fontWeight="700"
                  letterSpacing="0.14em"
                  fill={DARK}
                >
                  TECH & ANALYTICS
                </text>

                {/* 6. Bottom-Right: PRODUCTION */}
                <line x1="302" y1="214" x2="405" y2="295" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="1" />
                <circle cx="405" cy="295" r="3" fill={RED} />
                <text
                  x="415"
                  y="298"
                  textAnchor="start"
                  fontFamily="var(--font-mono, monospace)"
                  fontSize="8"
                  fontWeight="700"
                  letterSpacing="0.14em"
                  fill={DARK}
                >
                  PRODUCTION
                </text>
              </svg>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: BOTTOM BANNER ("Don't start with a service.")
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#111113',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.38 }}>
          <Image
            src="/images/home/hero-mountain-sky.png"
            alt="Mountain ridge silhouette at dusk"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
          />
        </div>
        {/* Gradient dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(17, 17, 19, 0.94) 0%, rgba(17, 17, 19, 0.7) 60%, rgba(17, 17, 19, 0.4) 100%)',
          }}
        />

        <div className="padding-global" style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
              paddingBottom: 'clamp(3.5rem, 6vw, 5.5rem)',
              maxWidth: '720px',
            }}
          >
            <div
              className="tag-mono"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: RED,
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              LET&rsquo;S BUILD
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.4vw, 4.2rem)',
                fontWeight: 650,
                letterSpacing: '-0.035em',
                lineHeight: 1.1,
                color: '#ffffff',
                marginBottom: '1.25rem',
              }}
            >
              Don&rsquo;t start with a service.
              <br />
              Start with the problem<span style={{ color: RED }}>.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem',
              }}
            >
              Tell us what you are trying to build, fix or change.
            </p>

            <div>
              <Link
                href="/contact"
                className="button-editorial"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  height: '48px',
                  padding: '0 1.85rem',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#222226';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Start a Conversation</span>
                <ArrowRight size={16} color="#ffffff" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}