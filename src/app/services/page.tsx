'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCmsContent } from '@/lib/cms/content-context';

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
  { num: '01', title: 'Social Media Management' },
  { num: '02', title: 'Brand Strategy & Positioning' },
  { num: '03', title: 'Social relevant Monthly Calendars' },
  { num: '04', title: 'Creative Direction' },
  { num: '05', title: 'Copywriting & Scripting' },
  { num: '06', title: 'Photography & Videography' },
  { num: '07', title: 'Video Production & Editing' },
  { num: '08', title: 'Campaign Development' },
  { num: '09', title: 'Meta & Google Advertising' },
  { num: '10', title: 'SEO' },
  { num: '11', title: 'Website Strategy & Design' },
  { num: '12', title: 'Lead Generation activities' },
  { num: '13', title: 'Website launch' },
];

const HOSPITALITY_DELIVERABLES = [
  { num: '01', title: 'Hospitality Consulting & Concept Development' },
  { num: '02', title: 'Menu Engineering & Margin Architecture' },
  { num: '03', title: 'Kitchen Systems & Standard Operating Procedures' },
  { num: '04', title: 'Staff Training & Service Standards' },
  { num: '05', title: 'Revenue Optimisation & Floor Systems' },
  { num: '06', title: 'Culinary Content & Social Media Storytelling' },
];

const PRODUCTION_DELIVERABLES = [
  { num: '01', title: 'Social Media Content Creation' },
  { num: '02', title: 'Corporate Films' },
  { num: '03', title: 'Brand Films' },
  { num: '04', title: 'Documentaries' },
  { num: '05', title: 'Institutional Films' },
  { num: '06', title: 'Scripting' },
  { num: '07', title: 'Voice-over / Audiobooks' },
  { num: '08', title: 'Photography & Videography' },
  { num: '09', title: 'Editing' },
  { num: '10', title: 'Sound & Post-Production' },
  { num: '11', title: 'UGC content execution' },
];

export default function ServicesPage() {
  const { content } = useCmsContent();
  const servicesCms = content?.services;
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
                What
                <br />
                We Do<span style={{ color: RED }}>.</span>
              </h1>

              {/* Paragraph */}
              <p
                style={{
                  maxWidth: '540px',
                  fontSize: 'clamp(0.98rem, 1.25vw, 1.15rem)',
                  lineHeight: 1.65,
                  color: BODY_TEXT,
                  fontWeight: 450,
                }}
              >
                We help businesses build stronger brands, communicate better and grow through digitally.
                <br /><br />
                Our work spans digital brand growth, hospitality consulting and content & brand production — bringing strategy, creativity and execution together to meet the needs of each business.
              </p>
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
                  src={servicesCms?.heroImage || '/images/services/services-hero-collage.png'}
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
            {/* Left Column: Title & Image */}
            <div>
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
                  maxWidth: '24ch',
                }}
              >
                Digital presence that helps brands stay relevant, consistent and connected with their audiences while resulting in business growth.
              </h2>

              {/* Rectangular Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Image
                  src="/uploads/1790518970031-raysons2.jpg"
                  alt="Digital brand growth & social media management"
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
                      gridTemplateColumns: '26px 1fr',
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
                    <span style={{ fontSize: '0.85rem', color: RED, display: 'inline-flex', alignItems: 'center' }}>
                      ●
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
            {/* Left Column: Title & Deliverables */}
            <div>
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
                        gridTemplateColumns: '26px 1fr',
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
                      <span style={{ fontSize: '0.85rem', color: RED, display: 'inline-flex', alignItems: 'center' }}>
                        ●
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
                  borderRadius: '6px',
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
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                }}
              >
                <Image
                  src="/images/case-studies/raysons/neora-1.jpg"
                  alt="Neora Deck experiential dining and rooftop atmosphere"
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
            {/* Left Column: Title & Image */}
            <div>
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
                  maxWidth: '24ch',
                }}
              >
                Taking Brand stories from concept and scripting to production and communication.
              </h2>

              {/* Rectangular Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Image
                  src="/uploads/1790516827847-rezang-la-memorial.jpg"
                  alt="Cinematic production and on-ground brand storytelling"
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
                      gridTemplateColumns: '26px 1fr',
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
                    <span style={{ fontSize: '0.85rem', color: RED, display: 'inline-flex', alignItems: 'center' }}>
                      ●
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
                  borderRadius: '4px',
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