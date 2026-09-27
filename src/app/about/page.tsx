'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCmsContent } from '@/lib/cms/content-context';
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
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
    tag: 'EXPANSION, LADAKH & TOURIN',
    title: 'Expansion, Ladakh & Tourin.',
    subtitle: 'High-altitude challenges, defence missions, and experiential travel.',
    leftText:
      'As Arohana grew, our footprint expanded from Kolhapur and Pune across western India and into the high-altitude terrain of Ladakh. Working alongside defence institutions, including the Indian Army’s 14 Corps (Fire & Fury Corps), Western Command, and border initiatives, transformed how we think about scale, discipline, and purpose.',
    rightText:
      'Operating in Ladakh also sparked a new dimension of our work: Tourin. Witnessing how conventional travel rushed past the authentic culture of the Himalayas, we conceived Tourin — Arohana’s own experiential travel brand. Rooted in slow pacing, heritage homestays, and genuine community encounters, Tourin demonstrates that thoughtful execution and deep respect for people apply just as powerfully to travel.',
    quote: 'Discipline in execution is the ultimate differentiator.',
    attribution: '— MADHURA HAWAL · FOUNDER, AROHANA',
  },
];



export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TEAM: TeamMember[] = [
  {
    id: 'abijitha',
    name: 'Abijitha',
    role: 'CREATIVE AND BRAND LEAD',
    image: '/images/about/team-abijitha.jpg',
    bio: 'Abijitha is a Brand Marketing Professional who’s with Arohana as Creative and Brand Lead. She enjoys the space where strategy and creativity meets. Curious by nature, she believes the best work comes from looking at things differently. When she’s not working, she’s usually running, exploring, overthinking, or signing up for her next questionable athletic adventure.',
  },
  {
    id: 'jagruti',
    name: 'Jagruti',
    role: 'VIDEO EDITOR',
    image: '/images/about/team-jagruti.jpg',
    bio: 'With a natural eye for aesthetics and a passion for storytelling, I bring ideas to life through visual content and video editing. My approach combines creativity with attention to detail, ensuring that every piece of content feels purposeful, engaging, and well-crafted. I enjoy exploring new creative tools, experimenting with fresh ideas, and continuously refining my skills. Adaptable and committed to quality, I strive to create work that not only looks good but also communicates effectively and leaves a lasting impression.',
  },
  {
    id: 'neha-mehta',
    name: 'Neha Mehta',
    role: 'SOCIAL MEDIA STRATEGIST',
    image: '/images/about/team-neha.jpg',
    bio: 'Neha is a Digital Marketing Executive with two years of experience in this industry, currently working as a Social Media Strategist at Arohana Consultancy. Her expertise includes social media strategy, content planning, performance marketing, and digital brand building. At Arohana, she has had the opportunity to work with brands across different industries, gaining diverse experience in understanding audiences, developing communication strategies, and creating digital campaigns that align with each brand’s goals.',
  },
  {
    id: 'sarika-jain',
    name: 'Sarika Jain',
    role: 'GRAPHIC DESIGNER',
    image: '/images/about/team-sarika.jpg',
    bio: 'With 5+ years of experience, I’ve had the opportunity to work across multiple industries and explore a wide range of creative styles. I love experimenting with fresh ideas, discovering new niches and bringing creativity into everything I do. The designer in me is always searching for inspiration—whether it’s in an advertisement, an Instagram post or something astounding. Every new idea helps me grow, learn and look at design from a different perspective. Most days, I’m either racing against a deadline or working on something the team needed “yesterday”—but I genuinely enjoy the energy of it all. I’m a happy-go-lucky person who believes that a positive attitude, a curious mind and a little bit of humor can make the creative process even better.',
  },
  {
    id: 'bhavika',
    name: 'Bhavika',
    role: 'BRAND STRATEGIST',
    image: '/images/about/team-bhavika.jpg',
    bio: 'I’m Bhavika, a brand strategist, storyteller and professional overthinker. I’m curious about people, pop culture, good food, pretty spaces and the little things that make an idea stick. I’m usually observing, collecting references, making connections between random things and turning them into something interesting. Basically, I’m just trying to make sense of the world and occasionally make something cool out of it.',
  },
  {
    id: 'jeena',
    name: 'Jeena',
    role: 'SOCIAL MEDIA STRATEGIST',
    image: '/images/about/team-jeena.jpg',
    bio: 'Been in this industry for 4+ years, worked across multiple industries and somewhere along the way, I now look at billboards, ads, Instagram posts and campaigns through a completely different lens. Now I’m like - why? What was the thought process behind it? What was the reason behind it? Why did it work? (Which means I have a crazy amount of screenshots, leading to some serious storage issues.) Can I complain, though? Not really. It is what it is! I love playing with fun ideas for campaigns, exploring different niches and bringing creativity into everything I do. I also love sharing funny stickers in the group chat. (I’m a little funny too.)',
  },
];

export default function StudioPage() {
  const { content } = useCmsContent();
  const aboutCms = content.about || {};

  const heroData = {
    eyebrow: aboutCms.hero?.eyebrow || 'THE AROHANA STORY',
    headline: aboutCms.hero?.headline || "I didn't plan to build Arohana.",
    subheadline: aboutCms.hero?.subheadline || "I built it because I kept seeing the same gap between what brands were being promised and what was actually happening on the ground.",
    introP1: aboutCms.hero?.introP1 || "The road to Arohana was anything but straight. I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.",
    introP2: aboutCms.hero?.introP2 || "Today, Arohana brings together that experience with strategy, communication, creativity and execution — for businesses that are serious about what they are building. And in Ladakh, that same philosophy led to Tourin, our venture in experiential high-altitude travel.",
    founderName: aboutCms.hero?.founderName || "Madhura Hawal",
    founderTitle: aboutCms.hero?.founderTitle || "Founder & Strategic Director",
    image: aboutCms.hero?.image || aboutCms.hero?.founderImage || '/images/about/madhura-portrait.jpg',
    stats: aboutCms.hero?.stats || STATS,
  };

  const chaptersData: ChapterData[] = (aboutCms.chapters && aboutCms.chapters.length > 0)
    ? aboutCms.chapters
    : CHAPTERS;

  const teamData = aboutCms.team || {
    eyebrow: 'OUR TEAM',
    title: 'People behind\npossibilities.',
    subtitle: 'A multidisciplinary team of strategists, creators and operators, united by a shared belief — that thoughtful work creates real impact.',
    members: TEAM,
  };

  const ctaData = aboutCms.cta || {
    eyebrow: 'GET IN TOUCH',
    headline: "Serious about what\nyou're building.",
    buttonText: 'Start a Conversation',
    buttonUrl: '/contact',
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pillPos = useRef({ x: 0, y: 0 });
  const [pillLabel, setPillLabel] = useState('EXPLORE');

  // Interactive Chapter State
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = chaptersData[activeChapterIndex] || chaptersData[0];



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
          borderRadius: '4px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
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
          <div className="hero-story-grid">
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
                {heroData.eyebrow}
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
                {heroData.headline}
              </h1>

              {/* Description Paragraphs */}
              <div style={{ maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 'clamp(1.75rem, 2.5vw, 2.5rem)' }}>
                <p style={{ fontSize: 'clamp(0.98rem, 1.2vw, 1.12rem)', lineHeight: 1.65, color: BODY_TEXT, fontWeight: 450 }}>
                  {heroData.introP1}
                </p>
                <p style={{ fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)', lineHeight: 1.65, color: MUTED }}>
                  {heroData.introP2}
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
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
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
                className="founder-card-wrapper"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '430px',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: '1.5rem 1rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  handlePillEnter('MADHURA HAWAL');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  handlePillLeave();
                }}
              >
                {/* Ambient Warm Golden Halo (Echoes the temple gold filigree) */}
                <div
                  style={{
                    position: 'absolute',
                    width: '380px',
                    height: '380px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(234, 179, 8, 0.22) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 72%)',
                    top: '-10px',
                    right: '-15px',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />

                {/* Badge 1: Top Right Frosted Glass Card (Strategy · Creativity · Impact) */}
                <div
                  className="founder-top-badge"
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    right: '-20px',
                    zIndex: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    padding: '0.85rem 1.15rem',
                    boxShadow: '0 16px 36px -6px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#DE322D', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', fontWeight: 700, color: '#71717A', textTransform: 'uppercase' }}>
                      THE SPINE
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Caveat', cursive, var(--font-sans), sans-serif",
                      fontSize: '1.55rem',
                      fontWeight: 700,
                      color: '#18181B',
                      lineHeight: 1.1,
                      letterSpacing: '0.01em',
                    }}
                  >
                    <div>Strategy</div>
                    <div>Creativity</div>
                    <div>Impact</div>
                  </div>
                  <svg width="60" height="8" viewBox="0 0 60 8" fill="none" style={{ marginTop: '-1px' }}>
                    <path d="M2 5C16 2.5 42 3 58 5.5" stroke="#DE322D" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Main Framed Founder Portrait Card */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '340 / 425',
                    borderRadius: '26px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 60px -15px rgba(22, 23, 26, 0.22), 0 4px 16px rgba(0, 0, 0, 0.06)',
                    border: '1.5px solid rgba(255, 255, 255, 0.9)',
                    zIndex: 1,
                  }}
                >
                  <Image
                    src={heroData.image && !heroData.image.includes('hero-founder-collage') ? heroData.image : '/images/about/madhura-portrait.jpg'}
                    alt={`${heroData.founderName || 'Madhura Hawal'} — ${heroData.founderTitle || 'Founder & Strategic Director'}, Ārohana Studio`}
                    fill
                    priority
                    style={{ objectFit: 'cover', objectPosition: 'center 12%' }}
                    sizes="(max-width: 768px) 92vw, 430px"
                  />

                  {/* Subtle Gradient Scrim at Bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 16, 20, 0.75) 0%, rgba(15, 16, 20, 0.2) 28%, transparent 55%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Founder Identity Card (Bottom-Left Glass Capsule) */}
                  <div
                    className="founder-identity-card"
                    style={{
                      position: 'absolute',
                      bottom: '1.25rem',
                      left: '1.25rem',
                      backgroundColor: 'rgba(15, 16, 20, 0.78)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: '14px',
                      padding: '0.75rem 1.15rem',
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
                      zIndex: 3,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                        {heroData.founderName || 'Madhura Hawal'}
                      </span>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#DE322D', display: 'inline-block' }} />
                    </div>
                    <div style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D4D4D8' }}>
                      {heroData.founderTitle || 'FOUNDER & STRATEGIC DIRECTOR'}
                    </div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A1A1AA', marginTop: '0.15rem' }}>
                      ĀROHANA STUDIO
                    </div>
                  </div>
                </div>

                {/* Badge 2: Mid-Left Frosted Card (People · Brands · Possibilities) */}
                <div
                  className="founder-left-badge"
                  style={{
                    position: 'absolute',
                    left: '-26px',
                    top: '36%',
                    zIndex: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    padding: '0.85rem 1.05rem',
                    boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
                    <div style={{ width: '4px', height: '7px', backgroundColor: '#D97706', borderRadius: '1.5px' }} />
                    <div style={{ width: '4px', height: '11px', backgroundColor: '#D97706', borderRadius: '1.5px' }} />
                    <div style={{ width: '4px', height: '16px', backgroundColor: '#DE322D', borderRadius: '1.5px' }} />
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 650, color: '#18181B', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                    <div>People</div>
                    <div>Brands</div>
                    <div>Possibilities</div>
                  </div>
                </div>

                {/* Badge 3: Bottom-Right Frosted Quote Card */}
                <div
                  className="founder-quote-badge"
                  style={{
                    position: 'absolute',
                    right: '-22px',
                    bottom: '8%',
                    zIndex: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(222, 50, 45, 0.25)',
                    borderRadius: '18px',
                    padding: '0.85rem 1.15rem',
                    maxWidth: '175px',
                    boxShadow: '0 18px 36px -8px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <div style={{ fontSize: '1.45rem', lineHeight: 1, color: '#DE322D', fontWeight: 800, marginBottom: '0.25rem', fontFamily: 'serif' }}>
                    “
                  </div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 550, color: '#18181B', lineHeight: 1.4 }}>
                    For businesses that build what matters.
                  </div>
                </div>
              </div>
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

          {/* Chapters Layout: Left Timeline Navigation + Right Story Card (Strictly parallel 2-column) */}
          <div className="chapters-layout-grid">
            {/* Left Column: Timeline Stepper (Desktop Only) */}
            <div className="chapters-desktop-stepper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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

                {chaptersData.map((ch, idx) => {
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


            </div>

            {/* Mobile Horizontal Stepper (Visible strictly on mobile devices matching reference) */}
            <div className="chapters-mobile-stepper">
              <div className="chapters-mobile-track-wrap">
                {/* Horizontal connecting hairline passing through nodes */}
                <div className="chapters-mobile-line" />

                <div className="chapters-mobile-nodes-grid">
                  {chaptersData.map((ch, idx) => {
                    const isActive = idx === activeChapterIndex;
                    const shortTag = idx === 0 ? 'The Roots' : idx === 1 ? 'The Turning Point' : 'Ladakh & Tourin';
                    const shortSub = idx === 0 ? 'Hospitality' : idx === 1 ? 'The Detour' : 'Travel & Purpose';
                    return (
                      <button
                        key={ch.number}
                        type="button"
                        onClick={() => setActiveChapterIndex(idx)}
                        className={`chapters-mobile-node-btn ${isActive ? 'active' : ''}`}
                      >
                        {/* Node circle */}
                        <div className={`chapters-mobile-dot ${isActive ? 'active' : ''}`} />

                        {/* Number */}
                        <span className="chapters-mobile-num">{ch.number}</span>

                        {/* Tag */}
                        <span className="chapters-mobile-tag">{shortTag}</span>

                        {/* Subtitle */}
                        <span className="chapters-mobile-sub">{shortSub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Story Card */}
            <div
              className="chapters-story-card"
              style={{
                backgroundColor: BG_CARD,
                borderRadius: '6px',
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

              {/* Two Column Narrative (Parallel side-by-side) */}
              <div className="chapters-narrative-grid">
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
            SECTION 3: TOURIN SPOTLIGHT ("Beyond Client Work")
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 'clamp(4rem, 6vw, 5.5rem)',
            paddingBottom: 'clamp(4rem, 6vw, 5.5rem)',
            borderTop: BORDER,
          }}
        >
          <div
            style={{
              backgroundColor: '#111113',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              position: 'relative',
              boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Left Column: Narrative & CTA */}
            <div
              style={{
                padding: 'clamp(2.5rem, 5vw, 4.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#ffffff',
                zIndex: 2,
              }}
            >
              <div>
                <div
                  className="tag-mono"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.68rem',
                    letterSpacing: '0.18em',
                    color: RED,
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                  }}
                >
                  <span style={{ width: '18px', height: '2px', backgroundColor: RED, display: 'inline-block' }} />
                  BEYOND CLIENT WORK · AN AROHANA VENTURE
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                    fontWeight: 650,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: '#ffffff',
                    marginBottom: '1.25rem',
                  }}
                >
                  Tourin
                  <span style={{ color: RED }}>.</span>
                  <br />
                  <span style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>
                    Travel beyond the itinerary.
                  </span>
                </h3>

                <p
                  style={{
                    fontSize: 'clamp(0.92rem, 1.15vw, 1.02rem)',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.72)',
                    maxWidth: '480px',
                    marginBottom: '1rem',
                  }}
                >
                  Conceived, branded, and operated by Ārohana, Tourin brings our design standard into the physical world through slow, immersive high-altitude journeys in Ladakh.
                </p>

                <p
                  style={{
                    fontSize: 'clamp(0.85rem, 1vw, 0.94rem)',
                    lineHeight: 1.65,
                    color: 'rgba(255, 255, 255, 0.55)',
                    maxWidth: '480px',
                  }}
                >
                  Rooted in authentic heritage homestays, native high-altitude cuisine, starlit dark-sky sanctuaries, and respectful community connection.
                </p>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <Link
                  href="/tourin"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    backgroundColor: RED,
                    color: '#ffffff',
                    padding: '0.85rem 1.65rem',
                    borderRadius: '4px',
                    fontSize: '0.82rem',
                    fontWeight: 650,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = DARK;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = RED;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <span>Explore Tourin</span>
                  <ArrowRight size={15} strokeWidth={2.4} />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Photo */}
            <div
              style={{
                position: 'relative',
                minHeight: '340px',
                width: '100%',
              }}
            >
              <Image
                src="/images/tourin/tourin-hero.jpg"
                alt="High Himalayas and quiet moments in remote Ladakh"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(17, 17, 19, 0.8) 0%, rgba(17, 17, 19, 0.2) 60%, rgba(17, 17, 19, 0.4) 100%)',
                }}
              />
              <div
                className="tag-mono"
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '1.5rem',
                  fontSize: '0.64rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '4px',
                  letterSpacing: '0.12em',
                }}
              >
                LADAKH · EXPERIENTIAL TRAVEL
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
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 'clamp(2.5rem, 4vw, 3.75rem)',
            }}
          >
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
              {teamData.eyebrow}
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
              {teamData.title}
            </h2>
          </div>

          {/* Team Members in a Responsive Grid with Bios */}
          {(() => {
            const rawMembers = (teamData.members && teamData.members.length > 0) ? teamData.members : TEAM;
            const activeTeamMembers = rawMembers.map((member: any) => {
              const fallback = TEAM.find((t) => t.id === member.id || t.name.toLowerCase() === member.name?.toLowerCase());
              return {
                id: member.id || fallback?.id || member.name.toLowerCase().replace(/\s+/g, '-'),
                name: member.name || fallback?.name || '',
                role: member.role || fallback?.role || '',
                image: member.image || fallback?.image || '/images/about/team-abijitha.jpg',
                bio: member.bio || fallback?.bio || '',
              };
            });

            return (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                  gap: 'clamp(1.25rem, 2vw, 2.25rem)',
                }}
              >
                {activeTeamMembers.map((member: any) => (
                  <div
                    key={member.id}
                    style={{
                      backgroundColor: BG_CARD,
                      borderRadius: '6px',
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
                        aspectRatio: '1 / 1.12',
                        backgroundColor: '#EBEBEB',
                      }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>

                    {/* Caption & Bio below photo */}
                    <div style={{ padding: '1.25rem 1.35rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div
                        style={{
                          fontSize: '1.05rem',
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
                          fontSize: '0.64rem',
                          letterSpacing: '0.12em',
                          color: RED,
                          fontWeight: 700,
                          marginTop: '0.35rem',
                          lineHeight: 1.35,
                        }}
                      >
                        {member.role}
                      </div>
                      <p
                        style={{
                          fontSize: '0.82rem',
                          lineHeight: 1.6,
                          color: BODY_TEXT,
                          marginTop: '0.85rem',
                          marginBottom: 0,
                        }}
                      >
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
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
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
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
                {ctaData.eyebrow}
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4.8vw, 4.5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.08,
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  whiteSpace: 'pre-line',
                }}
              >
                {ctaData.headline}
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
                  href={ctaData.buttonUrl || '/contact'}
                  className="button-editorial"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    height: '50px',
                    padding: '0 1.85rem',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
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
                  <span>{ctaData.buttonText || 'Start a Conversation'}</span>
                  <ArrowRight size={16} color="#ffffff" />
                </Link>

                <Link
                  href="/work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    height: '50px',
                    padding: '0 1.85rem',
                    backgroundColor: '#111113',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#222226';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#111113';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight size={16} color="#ffffff" />
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

      <style jsx>{`
        .hero-story-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
        }

        .chapters-layout-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: start;
        }

        .chapters-narrative-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1.25rem, 2vw, 2rem);
        }

        .chapters-mobile-stepper {
          display: none;
        }

        @media (max-width: 860px) {
          .hero-story-grid {
            grid-template-columns: 1fr !important;
          }

          .chapters-layout-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }

          .chapters-desktop-stepper {
            display: none !important;
          }

          .chapters-mobile-stepper {
            display: block !important;
            width: 100% !important;
            margin-bottom: 1.5rem !important;
          }
        }

        @media (max-width: 860px) {
          .hero-story-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .founder-card-wrapper {
            max-width: 380px !important;
            margin: 0 auto !important;
          }
        }

        @media (max-width: 640px) {
          .chapters-narrative-grid {
            grid-template-columns: 1fr !important;
          }
          .founder-card-wrapper {
            max-width: clamp(275px, 86vw, 340px) !important;
            padding: 1.25rem 0.25rem !important;
            margin: 0 auto !important;
          }
          .founder-top-badge {
            right: -6px !important;
            top: -14px !important;
            transform: scale(0.85) !important;
            transform-origin: top right !important;
          }
          .founder-left-badge {
            left: -8px !important;
            top: 36% !important;
            transform: scale(0.85) !important;
            transform-origin: left center !important;
          }
          .founder-quote-badge {
            right: -6px !important;
            bottom: 4% !important;
            transform: scale(0.85) !important;
            transform-origin: bottom right !important;
          }
          .founder-identity-card {
            bottom: 0.75rem !important;
            left: 0.75rem !important;
            padding: 0.6rem 0.9rem !important;
          }
        }

        @media (max-width: 400px) {
          .founder-card-wrapper {
            max-width: 290px !important;
          }
          .founder-top-badge {
            right: 0 !important;
            top: -12px !important;
            transform: scale(0.78) !important;
            transform-origin: top right !important;
          }
          .founder-left-badge {
            left: 0 !important;
            transform: scale(0.78) !important;
            transform-origin: left center !important;
          }
          .founder-quote-badge {
            right: 0 !important;
            bottom: 2% !important;
            transform: scale(0.78) !important;
            transform-origin: bottom right !important;
          }
          .founder-identity-card {
            bottom: 0.6rem !important;
            left: 0.6rem !important;
            padding: 0.5rem 0.75rem !important;
          }
        }

        @media (max-width: 860px) {
          .chapters-mobile-track-wrap {
            position: relative;
            width: 100%;
            padding: 0.5rem 0 1rem 0;
          }

          .chapters-mobile-line {
            position: absolute;
            top: 15px;
            left: 16.66%;
            right: 16.66%;
            height: 1.5px;
            background-color: rgba(0, 0, 0, 0.12);
            z-index: 0;
          }

          .chapters-mobile-nodes-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            position: relative;
            z-index: 1;
          }

          .chapters-mobile-node-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
          }

          .chapters-mobile-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #ffffff;
            border: 2px solid rgba(0, 0, 0, 0.25);
            margin-bottom: 0.45rem;
            transition: all 0.25s ease;
          }

          .chapters-mobile-dot.active {
            background-color: #DE322D;
            border: 3px solid #ffffff;
            box-shadow: 0 0 0 3px rgba(222, 50, 45, 0.25);
          }

          .chapters-mobile-num {
            font-family: var(--font-mono, monospace);
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #71717A;
            margin-bottom: 0.15rem;
          }

          .chapters-mobile-node-btn.active .chapters-mobile-num {
            color: #DE322D;
          }

          .chapters-mobile-tag {
            font-size: 0.74rem;
            font-weight: 650;
            color: #8E8E94;
            line-height: 1.22;
            margin-bottom: 0.15rem;
          }

          .chapters-mobile-node-btn.active .chapters-mobile-tag {
            color: #111113;
          }

          .chapters-mobile-sub {
            font-size: 0.64rem;
            color: #A1A1AA;
            line-height: 1.2;
          }

          .chapters-mobile-node-btn.active .chapters-mobile-sub {
            color: #4A4A52;
          }

          .chapters-story-card {
            padding: 1.6rem 1.25rem !important;
            border-radius: 6px !important;
          }

          /* Horizontal 04 and 05 tabs for mobile */
          .standard-tabs-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.5rem !important;
            margin-bottom: 1.25rem !important;
          }

          .standard-tab-btn {
            padding: 0.75rem 0.65rem !important;
            border-radius: 4px !important;
            gap: 0.4rem !important;
          }

          .standard-tab-tag {
            font-size: 0.52rem !important;
            margin-bottom: 0.2rem !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .standard-tab-heading {
            font-size: clamp(0.72rem, 2.6vw, 0.85rem) !important;
            line-height: 1.2 !important;
          }

          .standard-tab-arrow {
            width: 26px !important;
            height: 26px !important;
            min-width: 26px !important;
          }

          .standard-tab-arrow svg {
            width: 13px !important;
            height: 13px !important;
          }
        }

        .standard-tabs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
          margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
        }

        @media (max-width: 640px) {
          .founder-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem 1rem !important;
          }
        }

        @keyframes cleanDigitFlip {
          0% {
            transform: rotateX(70deg) translateY(-8%);
            opacity: 0.2;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: rotateX(0deg) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}