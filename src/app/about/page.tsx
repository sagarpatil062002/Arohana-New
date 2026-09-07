'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Building2,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  Calendar,
  BarChart3,
  Quote,
  Layers,
  Award,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ═══════════════════════════════════════════════════════════════════
   STUDIO — The Arohana Story
   Pixel-perfect replication of editorial reference design:
   01 Hero (I didn't plan to build Arohana.) with Founder Portrait Collage
   02 Three Chapters (Three chapters. One direction.) with Interactive Timeline
   03 From Experience to a Standard (Tabs 04 & 05 + 6 Disciplines)
   04 Our Team (People behind possibilities. — 10 Team Members)
   05 Closing / Get In Touch CTA
   ═══════════════════════════════════════════════════════════════════ */

const RED = '#DE322D';
const DARK = '#111113';
const BODY_TEXT = '#4A4A52';
const MUTED = '#71717A';
const FAINT = '#A1A1AA';
const BORDER = '1px solid rgba(0, 0, 0, 0.08)';
const BG_PAGE = '#FBF9F5';
const BG_CARD = '#FFFFFF';

const STATS = [
  { value: '6+', label: 'Years of Experience' },
  { value: '50+', label: 'Brands Worked With' },
  { value: '5', label: 'Core Verticals' },
];

interface ChapterData {
  number: string;
  code: string;
  tag: string;
  title: string;
  subtitle: string;
  leftText: string;
  rightText: string;
  quote: string;
  attribution: string;
}

const CHAPTERS: ChapterData[] = [
  {
    number: '01',
    code: '01 / 03',
    tag: 'THE ROOTS',
    title: 'It started with hospitality.',
    subtitle: 'My first world was hospitality.',
    leftText:
      'I studied Hospitality Management in Muscat before completing my degree in Goa. While studying in Goa, I was selected among the Top 10 finalists from the West Zone for Femina Miss India — an unexpected opportunity that taught me confidence, communication and comfort outside my comfort zone. Not long after, I was selected as one of just 16 students from across India for the Taj Management Training Programme.\n\nOver the years, I worked in Muscat, returned to Kolhapur and eventually decided to build something of my own — Mother India Cafe.',
    rightText:
      "Running a cafe teaches you things no business textbook can quite prepare you for. You learn about people, margins, suppliers, staff, customers, bad days, good days and the uncomfortable reality that every divine moment really shows up in the numbers.\n\nWhile the cafe was still running, another opportunity took me to Goa. I joined Passcode Hospitality as Operations Head and worked on Pings Bia Hoi and Jamun. Later, I moved to London, joined business and sales with Independent Brewers' Home Limited, winning tinted Goa and Delhi.\n\nBy then, I had understood something that would eventually become central to Arohana: a business needs a great-looking brand and still have a proven seasoned run.",
    quote: 'Sometimes what looks like a marketing problem isn’t a marketing problem at all.',
    attribution: '— MADHURA HAWAL · FOUNDER, AROHANA',
  },
  {
    number: '02',
    code: '02 / 03',
    tag: 'THE TURNING POINT',
    title: 'The turning point.',
    subtitle: 'When the unexpected redirected everything.',
    leftText:
      'When COVID hit in 2020, hospitality ground to a complete halt overnight. The business environment shifted dramatically, forcing founders and operators to rethink survival, relevance, and communication. In that period of stillness and uncertainty, I began consulting informally for brands that were struggling to stay afloat.',
    rightText:
      'What started as ad-hoc crisis counsel quickly revealed a massive industry gap: businesses didn’t just need decorative graphics or short-term social media posts — they needed end-to-end commercial alignment, strategic clarity, and disciplined operational execution. This detour became the foundation of what Arohana would become.',
    quote: 'A business cannot outgrow the clarity of its strategy.',
    attribution: '— MADHURA HAWAL · FOUNDER, AROHANA',
  },
  {
    number: '03',
    code: '03 / 03',
    tag: 'EXPANSION & LADAKH',
    title: 'Expansion & Ladakh.',
    subtitle: 'High-altitude challenges and national institutions.',
    leftText:
      'As Arohana grew, our footprint expanded from Kolhapur and Pune across western India and eventually into the high-altitude terrain of Ladakh. Working alongside defence institutions, including the Indian Army’s 14 Corps (Fire & Fury Corps), Western Command, and border initiatives, transformed how we think about scale, discipline, and purpose.',
    rightText:
      'Operating in sensitive, extreme environments taught our entire team a different calibre of accountability. When communications and documentation affect lives and national legacy, there is no margin for superficiality. That standard of uncompromised precision now governs every client brand Arohana touches today.',
    quote: 'Discipline in execution is the ultimate differentiator.',
    attribution: '— MADHURA HAWAL · FOUNDER, AROHANA',
  },
];

const DISCIPLINES = [
  {
    icon: Utensils,
    title: 'Hospitality & F&B',
    category: 'EXPERIENCE AND GROWTH',
    description: 'From independent restaurants to large hospitality brands.',
  },
  {
    icon: Building2,
    title: 'Real Estate & Infrastructure',
    category: 'SPACES FOR TOMORROW',
    description: 'Positioning, digital presence and campaign execution for real estate and lifestyle projects.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & Wellness',
    category: 'PURPOSE LED COMMUNICATION',
    description: 'Strategy and communication for healthcare practices and wellness brands.',
  },
  {
    icon: Sparkles,
    title: 'Consumer & Lifestyle',
    category: 'BRANDS PEOPLE LOVE',
    description: 'Digital content and campaign execution for consumer and lifestyle businesses.',
  },
  {
    icon: ShieldCheck,
    title: 'Institutional & Defence',
    category: 'CRITICAL MISSIONS & COMMUNITIES',
    description: 'Work with Indian Army and institutional projects in high-altitude and sensitive environments.',
  },
  {
    icon: Calendar,
    title: 'Events & Experiences',
    category: 'IDEAS INTO IMPACT',
    description: 'From brand launches to on-ground experiences across sectors.',
  },
];

const ENGAGEMENT_PILLARS = [
  {
    icon: Compass,
    title: 'Commercial & Strategic Clarity',
    category: 'FIRST PRINCIPLES',
    description: 'Diagnosing core business mechanics, revenue drivers, and target audiences before creating a single asset.',
  },
  {
    icon: Layers,
    title: 'Full-Funnel Brand Systems',
    category: 'IDENTITY & NARRATIVE',
    description: 'Positioning, messaging hierarchies, and cohesive design languages built to command industry authority.',
  },
  {
    icon: Sparkles,
    title: 'High-Impact Creative Production',
    category: 'CONTENT & CAMPAIGNS',
    description: 'Multi-platform film, photography, editorial copy, and social narratives executed to perfection.',
  },
  {
    icon: CheckCircle2,
    title: 'Disciplined Operational Execution',
    category: 'SYSTEMS & CADENCE',
    description: 'Relentless project coordination, clear timelines, and dedicated weekly momentum with senior leadership.',
  },
  {
    icon: Award,
    title: 'Institutional & Defence Standard',
    category: 'RIGOR & COMPLIANCE',
    description: 'Battle-tested rigor born from working in Ladakh and sensitive high-altitude institutional assignments.',
  },
  {
    icon: BarChart3,
    title: 'Measured Business Outcomes',
    category: 'ACCOUNTABILITY',
    description: 'Focusing squarely on brand equity, footfalls, revenue growth, and stakeholder trust.',
  },
];

const TEAM = [
  {
    id: 'madhura',
    name: 'Madhura Howal',
    role: 'FOUNDER & STRATEGIC LEAD',
    image: '/images/about/team-madhura.jpg',
  },
  {
    id: 'aditya',
    name: 'Aditya Kulkarni',
    role: 'CREATIVE DIRECTOR',
    image: '/images/about/team-aditya.jpg',
  },
  {
    id: 'tanvi',
    name: 'Tanvi Sardesai, SA',
    role: 'BRAND STRATEGY & COMMUNICATION',
    image: '/images/about/team-tanvi.jpg',
  },
  {
    id: 'arjun',
    name: 'Arjun Patel',
    role: 'LEAD PRODUCER / MEDIA & FILM DIRECTOR',
    image: '/images/about/team-arjun.jpg',
  },
  {
    id: 'radha',
    name: 'Radha Sharma',
    role: 'CLIENT SUCCESS MANAGER & OPERATIONS',
    image: '/images/about/team-radha.jpg',
  },
  {
    id: 'prathamesh',
    name: 'Prathamesh Shirole',
    role: 'BRAND & DIGITAL STRATEGIST',
    image: '/images/about/team-prathamesh.jpg',
  },
  {
    id: 'riya',
    name: 'Riya Naik',
    role: 'CONTENT & SOCIAL MEDIA',
    image: '/images/about/team-riya.jpg',
  },
  {
    id: 'siddhant',
    name: 'Siddhant More',
    role: 'DESIGN & VISUAL COMMUNICATION',
    image: '/images/about/team-siddhant.jpg',
  },
  {
    id: 'omkar',
    name: 'Omkar Jadhav',
    role: 'PROJECT COORDINATOR',
    image: '/images/about/team-omkar.jpg',
  },
  {
    id: 'sanjiv',
    name: 'Sanjiv Patil',
    role: 'BUSINESS DEVELOPMENT',
    image: '/images/about/team-sanjiv.jpg',
  },
];

export default function StudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pillPos = useRef({ x: 0, y: 0 });
  const [pillLabel, setPillLabel] = useState('EXPLORE');

  // Interactive Chapter State
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = CHAPTERS[activeChapterIndex];

  // Interactive Standard Tab State ('04' = Where Arohana stands today, '05' = What we bring)
  const [activeTab, setActiveTab] = useState<'04' | '05'>('04');

  /* Cursor follower */
  useEffect(() => {
    const pill = hoverPillRef.current;
    if (!pill) return;

    let rafId: number;
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const loop = () => {
      pillPos.current.x += (mousePos.current.x - pillPos.current.x) * 0.18;
      pillPos.current.y += (mousePos.current.y - pillPos.current.y) * 0.18;
      gsap.set(pill, { x: pillPos.current.x, y: pillPos.current.y });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handlePillEnter = (label: string) => {
    setPillLabel(label);
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
    }
  };

  const handlePillLeave = () => {
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, { opacity: 0, scale: 0, duration: 0.2, ease: 'power2.in' });
    }
  };

  /* GSAP scroll triggers & reveals */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.st-reveal',
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
      {/* Floating Interactive Cursor Pill */}
      <div
        ref={hoverPillRef}
        className="hide-on-mobile"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          backgroundColor: '#111113',
          color: '#ffffff',
          borderRadius: '9999px',
          padding: '0.55rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
        }}
      >
        <span>{pillLabel}</span>
        <ArrowUpRight size={13} color={RED} />
      </div>

      <div className="padding-global" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1: HERO SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            minHeight: 'calc(100vh - 76px)',
            paddingTop: 'clamp(5.5rem, 8vw, 7.5rem)',
            paddingBottom: 'clamp(2.5rem, 4vw, 4rem)',
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
            {/* Left Column: Headline, Narrative, CTA, Stats */}
            <div>
              {/* Eyebrow label */}
              <div
                className="tag-mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: 'clamp(1.25rem, 2vw, 1.75rem)',
                }}
              >
                <span style={{ width: '22px', height: '2px', backgroundColor: RED, display: 'inline-block' }} />
                THE AROHANA STORY
              </div>

              {/* Main Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5.2vw, 5.2rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  fontWeight: 600,
                  color: DARK,
                  marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                }}
              >
                I didn&rsquo;t plan to
                <br />
                build Arohana<span style={{ color: RED }}>.</span>
              </h1>

              {/* Description Paragraphs */}
              <div style={{ maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 'clamp(1.75rem, 2.5vw, 2.5rem)' }}>
                <p style={{ fontSize: 'clamp(0.98rem, 1.2vw, 1.12rem)', lineHeight: 1.65, color: BODY_TEXT, fontWeight: 450 }}>
                  The road to Arohana was anything but straight. I built it after spending years inside
                  businesses — learning what makes them work, what makes them struggle, and what people
                  see only after they become responsible for the whole thing.
                </p>
                <p style={{ fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)', lineHeight: 1.65, color: MUTED }}>
                  Today, Arohana brings together that experience with strategy, communication, creativity
                  and execution — for businesses that are serious about what they are building.
                </p>
              </div>

              {/* CTA Button */}
              <div style={{ marginBottom: 'clamp(2.25rem, 3.5vw, 3.5rem)' }}>
                <Link
                  href="#chapters"
                  className="button-editorial"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    height: '50px',
                    padding: '0 1.85rem',
                    backgroundColor: DARK,
                    color: '#ffffff',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#222226';
                    handlePillEnter('MEET THE FOUNDER');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = DARK;
                    handlePillLeave();
                  }}
                >
                  <span>Meet the Founder</span>
                  <ArrowRight size={16} color="#ffffff" />
                </Link>
              </div>

              {/* Stats Section (3 columns with clean dividers) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'clamp(1rem, 2.5vw, 2.5rem)',
                  paddingTop: 'clamp(1.25rem, 2vw, 1.75rem)',
                  borderTop: BORDER,
                  maxWidth: '560px',
                }}
              >
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    style={{
                      borderRight: i < STATS.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                      paddingRight: 'clamp(0.5rem, 1vw, 1rem)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'clamp(1.9rem, 3vw, 2.8rem)',
                        fontWeight: 650,
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        color: DARK,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="tag-mono"
                      style={{
                        fontSize: '0.62rem',
                        color: MUTED,
                        letterSpacing: '0.12em',
                        marginTop: '0.5rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {stat.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Founder Collage Artwork */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: 'clamp(0.5rem, 1.5vw, 1.5rem)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '460px',
                  aspectRatio: '450 / 537',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.08))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  handlePillEnter('MADHURA HOWAL');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  handlePillLeave();
                }}
              >
                <Image
                  src="/images/about/hero-founder-collage.png"
                  alt="Madhura Howal — Founder & Strategic Lead, Ārohana Studio"
                  fill
                  priority
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 92vw, 460px"
                />
              </div>
            </div>
          </div>

          {/* Hero Bottom Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: 'clamp(1.5rem, 2.5vw, 2rem)',
              borderTop: BORDER,
              marginTop: 'clamp(2rem, 3.5vw, 3rem)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(0, 0, 0, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowDown size={13} color={RED} />
              </span>
              <span className="tag-mono" style={{ fontSize: '0.64rem', color: MUTED, letterSpacing: '0.18em', fontWeight: 600 }}>
                SCROLL — THE STORY
              </span>
            </div>

            <div className="tag-mono hide-on-mobile" style={{ fontSize: '0.64rem', color: FAINT, letterSpacing: '0.18em' }}>
              DIFFICULT ADAPTATION OF OPERATIONS & CLIENT TRAINING
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2: THREE CHAPTERS SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="chapters"
          style={{
            paddingTop: 'clamp(4rem, 7vw, 6.5rem)',
            paddingBottom: 'clamp(4rem, 7vw, 6.5rem)',
            borderTop: BORDER,
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
            <div
              className="tag-mono"
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                color: RED,
                fontWeight: 700,
                marginBottom: '0.85rem',
              }}
            >
              THE AROHANA STORY
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.4vw, 4.4rem)',
                fontWeight: 600,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                color: DARK,
                marginBottom: '1rem',
              }}
            >
              Three chapters.
              <br />
              One direction<span style={{ color: RED }}>.</span>
            </h2>

            <p style={{ maxWidth: '640px', fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)', lineHeight: 1.65, color: BODY_TEXT }}>
              A journey shaped by people, places and possibilities — from hospitality to unexpected
              detours, and eventually a much bigger purpose.
            </p>
          </div>

          {/* Chapters Layout: Left Timeline Navigation + Right Story Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Timeline Stepper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {/* Connecting hairline */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    bottom: '16px',
                    left: '11px',
                    width: '1px',
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    zIndex: 0,
                  }}
                />

                {CHAPTERS.map((ch, idx) => {
                  const isActive = idx === activeChapterIndex;
                  return (
                    <button
                      key={ch.number}
                      type="button"
                      onClick={() => setActiveChapterIndex(idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1.25rem',
                        position: 'relative',
                        zIndex: 1,
                      }}
                      onMouseEnter={() => handlePillEnter(`CHAPTER ${ch.number}`)}
                      onMouseLeave={handlePillLeave}
                    >
                      {/* Node circle */}
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: isActive ? RED : '#ffffff',
                          border: isActive ? `3px solid #ffffff` : '2px solid rgba(0, 0, 0, 0.25)',
                          boxShadow: isActive ? `0 0 0 4px rgba(222, 50, 45, 0.25)` : 'none',
                          flexShrink: 0,
                          marginTop: '2px',
                          transition: 'all 0.3s ease',
                        }}
                      />

                      <div>
                        <div
                          className="tag-mono"
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            color: isActive ? RED : MUTED,
                            marginBottom: '0.2rem',
                          }}
                        >
                          {ch.number}
                        </div>
                        <div
                          style={{
                            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                            fontWeight: 650,
                            letterSpacing: '-0.015em',
                            color: isActive ? DARK : '#8E8E94',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {ch.tag}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: isActive ? BODY_TEXT : FAINT, marginTop: '0.2rem' }}>
                          {ch.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Subtle bottom scroll cue */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                <span
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: '1px solid rgba(0, 0, 0, 0.18)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowDown size={11} color={RED} />
                </span>
                <span className="tag-mono" style={{ fontSize: '0.6rem', color: FAINT, letterSpacing: '0.18em' }}>
                  SCROLL — THE STORY
                </span>
              </div>
            </div>

            {/* Right Column: Story Card */}
            <div
              style={{
                backgroundColor: BG_CARD,
                borderRadius: '24px',
                border: BORDER,
                padding: 'clamp(1.75rem, 3.5vw, 3.25rem)',
                boxShadow: '0 20px 45px -12px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                position: 'relative',
              }}
            >
              {/* Card Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="tag-mono" style={{ fontSize: '0.72rem', color: RED, fontWeight: 700, letterSpacing: '0.14em' }}>
                  {activeChapter.code}
                </span>
                <span className="tag-mono" style={{ fontSize: '0.68rem', color: MUTED, letterSpacing: '0.18em' }}>
                  {activeChapter.tag}
                </span>
              </div>

              {/* Chapter Main Heading */}
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.9rem)',
                    fontWeight: 650,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: DARK,
                    marginBottom: '0.5rem',
                  }}
                >
                  {activeChapter.title.replace('.', '')}
                  <span style={{ color: RED }}>.</span>
                </h3>
                <p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.18rem)', fontWeight: 600, color: '#2A2A2E', letterSpacing: '-0.01em' }}>
                  {activeChapter.subtitle}
                </p>
              </div>

              {/* Two Column Narrative */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: 'clamp(1.25rem, 2vw, 2rem)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {activeChapter.leftText.split('\n\n').map((p, i) => (
                    <p key={i} style={{ fontSize: '0.92rem', lineHeight: 1.7, color: BODY_TEXT }}>
                      {p}
                    </p>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {activeChapter.rightText.split('\n\n').map((p, i) => (
                    <p key={i} style={{ fontSize: '0.92rem', lineHeight: 1.7, color: BODY_TEXT }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Quote + Chapter Navigation Arrows */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  gap: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                {/* Quote block with red left bar */}
                <div style={{ borderLeft: `3px solid ${RED}`, paddingLeft: '1.25rem', maxWidth: '440px' }}>
                  <blockquote
                    style={{
                      fontSize: 'clamp(0.98rem, 1.3vw, 1.15rem)',
                      fontWeight: 600,
                      fontStyle: 'italic',
                      lineHeight: 1.45,
                      color: DARK,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    &ldquo;{activeChapter.quote}&rdquo;
                  </blockquote>
                  <div className="tag-mono" style={{ fontSize: '0.58rem', color: MUTED, letterSpacing: '0.16em', marginTop: '0.45rem' }}>
                    {activeChapter.attribution}
                  </div>
                </div>

                {/* Chapter arrows */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <button
                    type="button"
                    aria-label="Previous Chapter"
                    onClick={() => setActiveChapterIndex((prev) => (prev > 0 ? prev - 1 : CHAPTERS.length - 1))}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(0, 0, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = DARK;
                      e.currentTarget.style.backgroundColor = '#F4F2EC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <ChevronLeft size={18} color={DARK} />
                  </button>

                  <button
                    type="button"
                    aria-label="Next Chapter"
                    onClick={() => setActiveChapterIndex((prev) => (prev < CHAPTERS.length - 1 ? prev + 1 : 0))}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: DARK,
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.16)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#2A2A30';
                      e.currentTarget.style.transform = 'scale(1.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = DARK;
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <ChevronRight size={18} color="#ffffff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4: FROM EXPERIENCE TO A STANDARD
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="story-standard"
          style={{
            paddingTop: 'clamp(4rem, 7vw, 6.5rem)',
            paddingBottom: 'clamp(4rem, 7vw, 6.5rem)',
            borderTop: BORDER,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
              alignItems: 'flex-end',
              marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
            }}
          >
            <div>
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                AROHANA TODAY
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4.4vw, 4.4rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                  color: DARK,
                }}
              >
                From experience
                <br />
                to a standard<span style={{ color: RED }}>.</span>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)', lineHeight: 1.6, color: BODY_TEXT }}>
                Two final chapters that define where Arohana stands today — our practice and the standard
                we bring to every engagement.
              </p>
              <div className="tag-mono" style={{ fontSize: '0.64rem', color: FAINT, letterSpacing: '0.18em' }}>
                6 SECTORS / 50+ ENGAGEMENTS / CORE PURPOSE
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs (04 and 05) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}
          >
            {/* Tab 04 Button */}
            <button
              type="button"
              onClick={() => setActiveTab('04')}
              style={{
                borderRadius: '18px',
                padding: 'clamp(1.1rem, 2vw, 1.4rem) clamp(1.25rem, 2vw, 1.75rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                border: activeTab === '04' ? 'none' : '1px solid rgba(0, 0, 0, 0.09)',
                background:
                  activeTab === '04'
                    ? 'linear-gradient(135deg, #DE322D 0%, #B81F1A 100%)'
                    : '#FFFFFF',
                color: activeTab === '04' ? '#FFFFFF' : DARK,
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow:
                  activeTab === '04'
                    ? '0 12px 30px rgba(222, 50, 45, 0.28)'
                    : '0 4px 14px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => handlePillEnter('OUR PRACTICE')}
              onMouseLeave={handlePillLeave}
            >
              <div>
                <div
                  className="tag-mono"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.16em',
                    color: activeTab === '04' ? 'rgba(255, 255, 255, 0.8)' : MUTED,
                    marginBottom: '0.35rem',
                  }}
                >
                  04 — OUR PRACTICE
                </div>
                <div style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', fontWeight: 650, letterSpacing: '-0.015em' }}>
                  Where Ārohana stands today.
                </div>
              </div>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: activeTab === '04' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={16} color={activeTab === '04' ? '#ffffff' : DARK} />
              </span>
            </button>

            {/* Tab 05 Button */}
            <button
              type="button"
              onClick={() => setActiveTab('05')}
              style={{
                borderRadius: '18px',
                padding: 'clamp(1.1rem, 2vw, 1.4rem) clamp(1.25rem, 2vw, 1.75rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                border: activeTab === '05' ? 'none' : '1px solid rgba(0, 0, 0, 0.09)',
                background:
                  activeTab === '05'
                    ? 'linear-gradient(135deg, #DE322D 0%, #B81F1A 100%)'
                    : '#FFFFFF',
                color: activeTab === '05' ? '#FFFFFF' : DARK,
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow:
                  activeTab === '05'
                    ? '0 12px 30px rgba(222, 50, 45, 0.28)'
                    : '0 4px 14px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => handlePillEnter('THE STANDARD')}
              onMouseLeave={handlePillLeave}
            >
              <div>
                <div
                  className="tag-mono"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.16em',
                    color: activeTab === '05' ? 'rgba(255, 255, 255, 0.8)' : MUTED,
                    marginBottom: '0.35rem',
                  }}
                >
                  05 — THE STANDARD
                </div>
                <div style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', fontWeight: 650, letterSpacing: '-0.015em' }}>
                  What we bring to every engagement.
                </div>
              </div>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: activeTab === '05' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={16} color={activeTab === '05' ? '#ffffff' : DARK} />
              </span>
            </button>
          </div>

          {/* Unified Content Card */}
          <div
            style={{
              backgroundColor: BG_CARD,
              borderRadius: '24px',
              border: BORDER,
              padding: 'clamp(1.75rem, 3.5vw, 3.5rem)',
              boxShadow: '0 20px 45px -12px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'clamp(2.5rem, 5vw, 4.5rem)',
                alignItems: 'start',
              }}
            >
              {/* Left Column: Summary & Statement */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3
                  style={{
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.9rem)',
                    fontWeight: 650,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: DARK,
                  }}
                >
                  {activeTab === '04' ? 'Where Ārohana stands today' : 'What we bring to every engagement'}
                  <span style={{ color: RED }}>.</span>
                </h3>

                <p style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.06rem)', lineHeight: 1.7, color: BODY_TEXT }}>
                  {activeTab === '04'
                    ? 'What remains constant is the standard: clear thinking, sector-aware strategy, strong creative work and disciplined execution — brought together to make the business more visible, more relevant and more valuable to the people it is trying to reach.'
                    : 'We do not believe in superficial layers. Every strategy is built from the inside out — starting with commercial realities, operating margins, competitive positioning, and consumer psychology.'}
                </p>

                <p style={{ fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)', lineHeight: 1.7, color: MUTED }}>
                  {activeTab === '04'
                    ? 'Today, Ārohana sits at the intersection of brand thinking, business understanding and execution.'
                    : 'Our methodology fuses senior strategic advisory with dedicated in-house production pods, guaranteeing that big ideas convert directly into tangible market advantage.'}
                </p>

                <div
                  className="tag-mono"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    color: RED,
                    fontWeight: 700,
                    marginTop: '1.5rem',
                  }}
                >
                  <span style={{ width: '18px', height: '2px', backgroundColor: RED, display: 'inline-block' }} />
                  {activeTab === '04' ? 'MORE THAN MARKETING' : 'DISCIPLINED EXECUTION'}
                </div>
              </div>

              {/* Right Column: 6 Disciplines / Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(activeTab === '04' ? DISCIPLINES : ENGAGEMENT_PILLARS).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto minmax(0, 1fr)',
                        alignItems: 'flex-start',
                        gap: 'clamp(0.85rem, 1.5vw, 1.5rem)',
                        padding: 'clamp(0.95rem, 1.4vw, 1.25rem) 0',
                        borderTop: idx > 0 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(6px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {/* Icon circle */}
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <Icon size={18} color={RED} />
                      </div>

                      <div>
                        <div
                          className="tag-mono"
                          style={{
                            fontSize: '0.58rem',
                            letterSpacing: '0.16em',
                            color: MUTED,
                            marginBottom: '0.2rem',
                          }}
                        >
                          {item.category}
                        </div>
                        <div
                          style={{
                            fontSize: 'clamp(0.98rem, 1.2vw, 1.12rem)',
                            fontWeight: 650,
                            letterSpacing: '-0.01em',
                            color: DARK,
                            marginBottom: '0.25rem',
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.84rem', lineHeight: 1.5, color: BODY_TEXT }}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5: OUR TEAM ("People behind possibilities.")
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="team"
          style={{
            paddingTop: 'clamp(4rem, 7vw, 6.5rem)',
            paddingBottom: 'clamp(4rem, 7vw, 6.5rem)',
            borderTop: BORDER,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
              alignItems: 'flex-end',
              marginBottom: 'clamp(2.5rem, 4vw, 3.75rem)',
            }}
          >
            <div>
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: '0.85rem',
                }}
              >
                OUR TEAM
              </div>
              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4.4vw, 4.4rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                  color: DARK,
                }}
              >
                People behind
                <br />
                possibilities<span style={{ color: RED }}>.</span>
              </h2>
            </div>

            <div>
              <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)', lineHeight: 1.6, color: BODY_TEXT }}>
                A multidisciplinary team of strategists, creators and operators, united by a shared belief —
                that thoughtful work creates real impact.
              </p>
            </div>
          </div>

          {/* 10 Team Members in a 5x2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 230px), 1fr))',
              gap: 'clamp(1rem, 1.6vw, 1.75rem)',
            }}
          >
            {TEAM.map((member) => (
              <div
                key={member.id}
                style={{
                  backgroundColor: BG_CARD,
                  borderRadius: '18px',
                  border: BORDER,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 35px -10px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(222, 50, 45, 0.3)';
                  handlePillEnter(member.name.toUpperCase());
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px -6px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  handlePillLeave();
                }}
              >
                {/* Photo container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1.15',
                    backgroundColor: '#EBEBEB',
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 230px"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>

                {/* Caption below photo */}
                <div style={{ padding: '1rem 1.15rem 1.25rem' }}>
                  <div
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 650,
                      letterSpacing: '-0.015em',
                      color: DARK,
                      lineHeight: 1.25,
                    }}
                  >
                    {member.name}
                  </div>
                  <div
                    className="tag-mono"
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.12em',
                      color: MUTED,
                      marginTop: '0.35rem',
                      lineHeight: 1.35,
                    }}
                  >
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6: CLOSING CTA (Serious about what you're building.)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
            paddingBottom: 'clamp(4rem, 8vw, 7rem)',
            borderTop: BORDER,
          }}
        >
          <div
            style={{
              backgroundColor: '#111113',
              borderRadius: '26px',
              color: '#ffffff',
              padding: 'clamp(2.5rem, 5vw, 5rem)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25)',
            }}
            onMouseEnter={() => handlePillEnter('START A CONVERSATION')}
            onMouseLeave={handlePillLeave}
          >
            {/* Ambient red glow inside banner */}
            <div
              style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                backgroundColor: 'rgba(222, 50, 45, 0.16)',
                filter: 'blur(90px)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
              <div
                className="tag-mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: '1.25rem',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: RED }} />
                GET IN TOUCH
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4.8vw, 4.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.08,
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                }}
              >
                Serious about what
                <br />
                you&rsquo;re building<span style={{ color: RED }}>.</span>
              </h2>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
                  lineHeight: 1.65,
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '2.5rem',
                  maxWidth: '620px',
                }}
              >
                Strategy, communication, creativity and disciplined execution — for founders and teams ready
                to raise the standard.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.25rem' }}>
                <Link
                  href="/contact"
                  className="button-editorial"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    height: '52px',
                    padding: '0 2rem',
                    backgroundColor: RED,
                    color: '#ffffff',
                    borderRadius: '9999px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px rgba(222, 50, 45, 0.35)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C72420';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = RED;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight size={17} />
                </Link>

                <Link
                  href="/work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '52px',
                    padding: '0 1.5rem',
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                  }}
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Bottom location metadata */}
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.64rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginTop: 'clamp(2.5rem, 4vw, 3.5rem)',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                KOLHAPUR · PUNE · LADAKH
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}