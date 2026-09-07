'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Instagram,
  Compass,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ═══════════════════════════════════════════════════════════════════
   WORK — "The work is the proof."
   Pixel-perfect replication of design reference:
   01 Hero (The work is the proof. + ©26 Badge)
   02 Instagram Reels Carousel (Auto-scrolling, easy left/right nav, "Watch Reel")
   03 Featured Case Studies Bento Grid (Raysons, Loom Crafts, PictureTime, Misu, SHE, RR Skins)
   04 Additional Work (Client / Project Directory across 7 sectors)
   05 Work Footer
   ═══════════════════════════════════════════════════════════════════ */

const RED = '#DE322D';
const DARK = '#111113';
const BG_PAGE = '#FBF9F5';
const BODY_TEXT = '#4A4A52';
const MUTED = '#71717A';
const FAINT = '#A1A1AA';
const BORDER = '1px solid rgba(0, 0, 0, 0.08)';

interface ReelItem {
  id: string;
  num: string;
  hookTitle: string;
  subtitle: string;
  category: string;
  image: string;
  video?: string;
  instagramUrl: string;
}

const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    num: '01',
    hookTitle: 'Spaces that belong',
    subtitle: 'Raysons Group · Architecture',
    category: 'Real Estate & Built Environment',
    image: '/images/case-studies/raysons/neora-1.jpg',
    video: '/videos/hero-montage.mp4',
    instagramUrl: 'https://www.instagram.com/arohana.studio',
  },
  {
    id: 'reel-2',
    num: '02',
    hookTitle: 'More than a meal',
    subtitle: 'Misu · Pan-Asian Dining',
    category: 'Hospitality & F&B',
    image: '/images/case-studies/misu/misu-hero.jpg',
    instagramUrl: 'https://www.instagram.com/arohana.studio',
  },
  {
    id: 'reel-3',
    num: '03',
    hookTitle: 'Care in focus',
    subtitle: 'RR Skins · Healthcare & Trust',
    category: 'Healthcare',
    image: '/images/case-studies/rrskins/rrskins-hero.jpg',
    instagramUrl: 'https://www.instagram.com/arohana.studio',
  },
  {
    id: 'reel-4',
    num: '04',
    hookTitle: 'Ideas in motion',
    subtitle: 'PictureTime · Cinema Network',
    category: 'Entertainment & Media',
    image: '/images/case-studies/picturetime/picturetime-hero.jpg',
    instagramUrl: 'https://www.instagram.com/arohana.studio',
  },
  {
    id: 'reel-5',
    num: '05',
    hookTitle: 'Stories with purpose',
    subtitle: 'Indian Army · Ladakh Missions',
    category: 'Institutions & Government',
    image: '/images/army/14corps-2.jpg',
    video: '/videos/hero-montage.mp4',
    instagramUrl: 'https://www.instagram.com/arohana.studio',
  },
  {
    id: 'reel-6',
    num: '06',
    hookTitle: 'People and process',
    subtitle: 'Loom Crafts · Handcrafted Living',
    category: 'Real Estate & Built Environment',
    image: '/images/case-studies/loom/furniture-1.jpg',
    instagramUrl: 'https://www.instagram.com/arohana.studio',
  },
  {
    id: 'reel-7',
    num: '07',
    hookTitle: 'Beyond boundaries',
    subtitle: 'Tourin · High-Altitude Journeys',
    category: 'Institutions & Government',
    image: '/images/tourin/tourin-hero.jpg',
    instagramUrl: 'https://www.instagram.com/arohana.studio',
  },
];

const REEL_FILTERS = [
  'All',
  'Real Estate & Built Environment',
  'Hospitality & F&B',
  'Healthcare',
  'Entertainment & Media',
  'Institutions & Government',
];

const CASE_FILTERS = [
  'All',
  'Real Estate',
  'Hospitality',
  'Healthcare',
  'Entertainment',
  'Institutional',
  'Community',
];

interface CaseStudyItem {
  id: string;
  slug: string;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  category: string;
  image: string;
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'raysons',
    slug: 'raysons-group',
    num: '01',
    title: 'Raysons Group',
    desc: 'Shows long-term digital partnership across real estate and hospitality, plus project production.',
    tags: ['Real Estate', 'Hospitality', 'Digital Growth'],
    category: 'Real Estate',
    image: '/images/case-studies/raysons/neora-1.jpg',
  },
  {
    id: 'loom',
    slug: 'loom-crafts',
    num: '02',
    title: 'Loom Crafts',
    desc: 'Shows how one brand can require different communication systems across furniture and prefab.',
    tags: ['Real Estate', 'Built Environment', 'Brand Strategy'],
    category: 'Real Estate',
    image: '/images/case-studies/loom/loom-hero.jpg',
  },
  {
    id: 'picturetime',
    slug: 'picturetime',
    num: '03',
    title: 'PictureTime',
    desc: 'Shows digital brand work plus cultural/event/on-ground content.',
    tags: ['Entertainment', 'Events', 'Content Production'],
    category: 'Entertainment',
    image: '/images/case-studies/picturetime/picturetime-hero.jpg',
  },
  {
    id: 'misu',
    slug: 'misu',
    num: '04',
    title: 'Misu',
    desc: 'Shows the depth of hospitality consulting and digital execution.',
    tags: ['Hospitality', 'Consulting', 'Digital'],
    category: 'Hospitality',
    image: '/images/case-studies/misu/misu-hero.jpg',
  },
  {
    id: 'she',
    slug: 'she',
    num: '05',
    title: 'SHE',
    desc: 'Shows complex institutional/community communication and on-ground execution.',
    tags: ['Institutional', 'Community', 'Documentary'],
    category: 'Institutional',
    image: '/images/case-studies/she/she-hero.jpg',
  },
  {
    id: 'rrskins',
    slug: 'rr-skins',
    num: '06',
    title: 'RR Skins',
    desc: 'Shows healthcare communication built around trust and education.',
    tags: ['Healthcare', 'Brand Strategy', 'Content'],
    category: 'Healthcare',
    image: '/images/case-studies/rrskins/rrskins-hero.jpg',
  },
];

/* ─── Bento Card Component matching exact editorial reference ─── */
function WorkCaseCard({
  cs,
  isDimmed = false,
  imageAspect = '16 / 9.5',
  style,
}: {
  cs: CaseStudyItem;
  isDimmed?: boolean;
  imageAspect?: string;
  style?: React.CSSProperties;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: isHovered ? '1px solid rgba(0, 0, 0, 0.14)' : '1px solid rgba(0, 0, 0, 0.07)',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 16px 36px -6px rgba(0, 0, 0, 0.08)'
          : '0 4px 18px rgba(0, 0, 0, 0.03)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        opacity: isDimmed ? 0.28 : 1,
        filter: isDimmed ? 'grayscale(40%)' : 'none',
        pointerEvents: isDimmed ? 'none' : 'auto',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Number Overlay */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: imageAspect,
          backgroundColor: '#EBEAE6',
          overflow: 'hidden',
        }}
      >
        <Image
          src={cs.image}
          alt={cs.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
          style={{
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* 01, 02, etc. plain white mono text overlay in top-left */}
        <span
          style={{
            position: 'absolute',
            top: '16px',
            left: '18px',
            color: '#FFFFFF',
            fontSize: '0.78rem',
            fontWeight: 500,
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.04em',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
            zIndex: 2,
          }}
        >
          {cs.num}
        </span>
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '1.25rem 1.35rem 1.35rem 1.35rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(1.15rem, 1.35vw, 1.25rem)',
            fontWeight: 650,
            letterSpacing: '-0.02em',
            color: DARK,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {cs.title}
        </h3>

        <p
          style={{
            fontSize: '0.82rem',
            lineHeight: 1.45,
            color: '#71717A',
            marginTop: '0.35rem',
            marginBottom: '0.85rem',
          }}
        >
          {cs.desc}
        </p>

        {/* Tag Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            marginBottom: '1rem',
          }}
        >
          {cs.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.68rem',
                fontWeight: 500,
                padding: '0.28rem 0.65rem',
                borderRadius: '9999px',
                backgroundColor: '#F4F4F5',
                color: '#52525B',
                border: '1px solid rgba(0, 0, 0, 0.03)',
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Link Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            paddingTop: '0.25rem',
          }}
        >
          <Link
            href={`/work/${cs.slug}`}
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: isHovered ? RED : DARK,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s ease',
            }}
          >
            View case study ↗
          </Link>

          <Link
            href={`/work/${cs.slug}`}
            aria-label={`View ${cs.title} case study`}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: isHovered ? `1px solid ${DARK}` : '1px solid rgba(0, 0, 0, 0.12)',
              backgroundColor: isHovered ? DARK : '#FFFFFF',
              color: isHovered ? '#FFFFFF' : DARK,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}


const DIRECTORY_CATEGORIES = [
  {
    num: '01',
    title: 'Hospitality & F&B',
    subtitle: 'RESTAURANTS · RESORTS · EXPERIENCES',
    clients: [
      { name: 'Bija Resorts', href: '/contact' },
      { name: 'Qubice', href: '/contact' },
      { name: 'Kanopy', href: '/contact' },
      { name: 'Sorriso', href: '/contact' },
      { name: 'Spice Goa', href: '/contact' },
      { name: 'Khana Khazana', href: '/contact' },
      { name: 'Khau Gali', href: '/contact' },
    ],
  },
  {
    num: '02',
    title: 'Real Estate & Built Environment',
    subtitle: 'SPACES · COMMUNITIES · LONG-TERM VALUE',
    clients: [
      { name: 'Raysons Group', href: '/work/raysons-group' },
      { name: 'Citron', href: '/contact' },
      { name: 'Loom Crafts', href: '/work/loom-crafts' },
    ],
  },
  {
    num: '03',
    title: 'Healthcare',
    subtitle: 'CARE · DEDICATION · IMPACT',
    clients: [
      { name: 'RR Skins', href: '/work/rr-skins' },
      { name: 'and other approved healthcare work', href: '/contact' },
    ],
  },
  {
    num: '04',
    title: 'Lifestyle & Consumer',
    subtitle: 'BRANDS FOR EVERYDAY LIFE',
    clients: [
      { name: 'DYK Bankers Jewellery', href: '/contact' },
      { name: 'Fraganza', href: '/contact' },
      { name: 'and other approved consumer work', href: '/contact' },
    ],
  },
  {
    num: '05',
    title: 'Entertainment & Media',
    subtitle: 'CULTURE · CONTENT · CONNECTIONS',
    clients: [{ name: 'PictureTime', href: '/work/picturetime' }],
  },
  {
    num: '06',
    title: 'Travel & Tourism',
    subtitle: 'PLACES · PEOPLE · POSSIBILITIES',
    clients: [
      { name: 'Tourin', href: '/tourin' },
      { name: 'Holiday Village', href: '/contact' },
    ],
  },
  {
    num: '07',
    title: 'Institutional / Community',
    subtitle: 'LARGER STORIES · REAL-WORLD IMPACT',
    clients: [
      { name: 'SHE', href: '/work/she' },
      { name: 'Operation Sampark', href: '/indian-army-projects' },
      { name: 'Indian Army-related projects', href: '/indian-army-projects' },
    ],
  },
];

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reelsScrollRef = useRef<HTMLDivElement>(null);
  const [selectedReelFilter, setSelectedReelFilter] = useState('All');
  const [selectedCaseFilter, setSelectedCaseFilter] = useState('All');
  const [activeDirectoryIndex, setActiveDirectoryIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Filtered Reels
  const filteredReels =
    selectedReelFilter === 'All'
      ? REELS
      : REELS.filter((r) => r.category === selectedReelFilter);

  // Check if a case study card should be dimmed based on active category filter
  const isCardDimmed = (tags: string[]) => {
    if (selectedCaseFilter === 'All') return false;
    return !tags.includes(selectedCaseFilter);
  };

  // Manual scroll helper for Reels Carousel (left / right)
  const scrollReels = (direction: 'left' | 'right') => {
    if (!reelsScrollRef.current) return;
    const scrollAmount = 340;
    reelsScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Auto-scroll animation for reels slider (pauses on user interaction)
  useEffect(() => {
    const el = reelsScrollRef.current;
    if (!el || !isAutoScrolling) return;

    let animId: number;
    const speed = 0.5;

    const step = () => {
      if (el) {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += speed;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isAutoScrolling]);

  // Entrance animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-anim',
        { y: 30, opacity: 0 },
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
            SECTION 1: HERO SECTION ("The work is the proof.")
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 'clamp(5.5rem, 8vw, 7.5rem)',
            paddingBottom: 'clamp(2rem, 3.5vw, 3rem)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'flex-start',
            }}
          >
            {/* Left: Main Heading */}
            <div>
              <h1
                style={{
                  fontSize: 'clamp(3rem, 6.2vw, 6.2rem)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.04em',
                  fontWeight: 650,
                  color: DARK,
                }}
              >
                The
                <br />
                work is
                <br />
                the proof<span style={{ color: RED }}>.</span>
              </h1>
            </div>

            {/* Middle: Featured Case Studies Narrative */}
            <div style={{ paddingTop: 'clamp(0.5rem, 1.5vw, 1.75rem)' }}>
              <div
                className="tag-mono"
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  color: RED,
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                FEATURED CASE STUDIES
              </div>
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                  lineHeight: 1.6,
                  color: BODY_TEXT,
                  maxWidth: '440px',
                }}
              >
                A selection of businesses and projects that show how Arohana brings strategy,
                communications and execution across very different environments.
              </p>
            </div>

            {/* Right: Circle 26 Badge & Stats */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                justifySelf: 'flex-end',
                paddingTop: 'clamp(0.5rem, 1.5vw, 1.75rem)',
              }}
            >
              {/* Large outlined circle 26 */}
              <div
                style={{
                  width: 'clamp(64px, 6vw, 76px)',
                  height: 'clamp(64px, 6vw, 76px)',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(0, 0, 0, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: DARK,
                  flexShrink: 0,
                }}
              >
                &copy;26
              </div>

              <div
                className="tag-mono"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.16em',
                  color: MUTED,
                  lineHeight: 1.6,
                }}
              >
                <div>06 FOCUS</div>
                <div>PROFILES</div>
                <div>STORIES</div>
                <div>PRODUCED 2021 — 25</div>
              </div>
            </div>
          </div>

          {/* Reel Category Filters & Slider Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginTop: 'clamp(2.5rem, 4vw, 3.5rem)',
              paddingBottom: '1.25rem',
            }}
          >
            {/* Filter Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {REEL_FILTERS.map((filter) => {
                const isActive = selectedReelFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedReelFilter(filter)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.74rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      backgroundColor: isActive ? DARK : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : DARK,
                      border: isActive ? `1px solid ${DARK}` : '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.12)' : 'none',
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Slider Navigation Arrows (Easy left/right controls as requested) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollReels('left')}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F2EFEB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                <ChevronLeft size={17} color={DARK} />
              </button>

              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollReels('right')}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: DARK,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.2s ease',
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
                <ChevronRight size={17} color="#FFFFFF" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: INSTAGRAM REELS CAROUSEL / HORIZONTAL SLIDER
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          width: '100%',
          overflow: 'hidden',
          paddingBottom: 'clamp(3.5rem, 5vw, 5rem)',
        }}
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        <div
          ref={reelsScrollRef}
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            paddingLeft: 'max(1.5rem, calc((100vw - 1440px) / 2 + 1.5rem))',
            paddingRight: 'max(1.5rem, calc((100vw - 1440px) / 2 + 1.5rem))',
            paddingTop: '0.5rem',
            paddingBottom: '1.5rem',
          }}
        >
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              style={{
                position: 'relative',
                flex: '0 0 clamp(230px, 20vw, 270px)',
                aspectRatio: '9 / 16',
                borderRadius: '18px',
                overflow: 'hidden',
                backgroundColor: '#1B1B1E',
                boxShadow: '0 14px 30px -8px rgba(0, 0, 0, 0.22)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 22px 42px -10px rgba(0, 0, 0, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 14px 30px -8px rgba(0, 0, 0, 0.22)';
              }}
            >
              {/* Media: Image / Video */}
              {reel.video ? (
                <video
                  src={reel.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Image
                  src={reel.image}
                  alt={reel.hookTitle}
                  fill
                  sizes="280px"
                  style={{ objectFit: 'cover' }}
                />
              )}

              {/* Gradient Dark Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.88) 100%)',
                }}
              />

              {/* Top Row: Number Badge & Instagram Reel Icon */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  right: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 2,
                }}
              >
                <span
                  className="tag-mono"
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                  }}
                >
                  {reel.num}
                </span>

                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <Instagram size={14} />
                </span>
              </div>

              {/* Bottom Details & Direct Reel CTA */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 650,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      lineHeight: 1.2,
                    }}
                  >
                    {reel.hookTitle}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      color: 'rgba(255, 255, 255, 0.72)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {reel.subtitle}
                  </div>
                </div>

                {/* "Watch Reel" button redirecting directly to Instagram as instructed */}
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '9999px',
                    color: '#ffffff',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = DARK;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Play size={11} fill="currentColor" />
                    Watch Reel
                  </span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="padding-global" style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3: FEATURED CASE STUDIES BENTO GRID
            Matching exact editorial reference layout:
            Col 1: Intro + Filter Pills & Card 03 (PictureTime)
            Col 2: Card 01 (Raysons Group) + Subgrid (04 Misu & 05 SHE + Slogan)
            Col 3: Card 02 (Loom Crafts - staggered) & Card 06 (RR Skins)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 'clamp(3.5rem, 5vw, 5rem)',
            paddingBottom: 'clamp(4.5rem, 7vw, 7rem)',
            borderTop: BORDER,
          }}
        >
          <div className="work-bento-grid">
            {/* ─── COLUMN 1: Intro Narrative + Filter Pills & Card 03 (PictureTime) ─── */}
            <div className="work-bento-col-1">
              <div>
                <p
                  style={{
                    fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
                    lineHeight: 1.45,
                    color: '#71717A',
                    maxWidth: '430px',
                    fontWeight: 400,
                  }}
                >
                  A selection of businesses and projects that show how Ārohana thinks,
                  creates and executes across very different environments.
                </p>

                {/* Filter Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.45rem',
                    marginTop: 'clamp(1.5rem, 2.2vw, 2.25rem)',
                  }}
                >
                  {CASE_FILTERS.map((f) => {
                    const isActive = selectedCaseFilter === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setSelectedCaseFilter(f)}
                        style={{
                          padding: '0.42rem 0.95rem',
                          borderRadius: '9999px',
                          fontSize: '0.74rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          backgroundColor: isActive ? DARK : '#FFFFFF',
                          color: isActive ? '#FFFFFF' : '#374151',
                          border: isActive ? `1px solid ${DARK}` : '1px solid rgba(0, 0, 0, 0.12)',
                          boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
                        }}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card 03: PictureTime */}
              <WorkCaseCard
                cs={CASE_STUDIES[2]}
                isDimmed={isCardDimmed(CASE_STUDIES[2].tags)}
                imageAspect="16 / 9"
              />
            </div>

            {/* ─── COLUMN 2: Card 01 (Raysons Group) + Subgrid (Misu & SHE) ─── */}
            <div className="work-bento-col-2">
              {/* Card 01: Raysons Group */}
              <WorkCaseCard
                cs={CASE_STUDIES[0]}
                isDimmed={isCardDimmed(CASE_STUDIES[0].tags)}
                imageAspect="16 / 9.5"
              />

              {/* Nested Subgrid: Misu & SHE */}
              <div className="work-bento-subgrid">
                {/* Card 04: Misu */}
                <WorkCaseCard
                  cs={CASE_STUDIES[3]}
                  isDimmed={isCardDimmed(CASE_STUDIES[3].tags)}
                  imageAspect="1 / 1"
                />

                {/* Card 05: SHE + Tagline */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <WorkCaseCard
                    cs={CASE_STUDIES[4]}
                    isDimmed={isCardDimmed(CASE_STUDIES[4].tags)}
                    imageAspect="16 / 8.5"
                  />

                  {/* Red Accent Dash + Editorial Statement below SHE */}
                  <div style={{ marginTop: 'clamp(1.5rem, 2.5vw, 2.25rem)', paddingLeft: '0.25rem' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '2px',
                        backgroundColor: RED,
                        borderRadius: '2px',
                        marginBottom: '0.85rem',
                      }}
                    />
                    <div
                      style={{
                        fontSize: 'clamp(1.2rem, 1.45vw, 1.4rem)',
                        lineHeight: 1.22,
                        color: '#8E8E93',
                        fontWeight: 400,
                        letterSpacing: '-0.015em',
                      }}
                    >
                      Different
                      <br />
                      environments.
                      <br />
                      Same purpose.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── COLUMN 3: Card 02 (Loom Crafts) & Card 06 (RR Skins) ─── */}
            <div className="work-bento-col-3">
              {/* Card 02: Loom Crafts */}
              <WorkCaseCard
                cs={CASE_STUDIES[1]}
                isDimmed={isCardDimmed(CASE_STUDIES[1].tags)}
                imageAspect="16 / 9.5"
              />

              {/* Card 06: RR Skins */}
              <WorkCaseCard
                cs={CASE_STUDIES[5]}
                isDimmed={isCardDimmed(CASE_STUDIES[5].tags)}
                imageAspect="16 / 10"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4: CLIENT / PROJECT DIRECTORY ("Additional work.")
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 'clamp(4rem, 7vw, 6.5rem)',
            paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
            borderTop: BORDER,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Heading & Directory Context */}
            <div style={{ position: 'sticky', top: '100px' }}>
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
                CLIENT / PROJECT DIRECTORY
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 4.8vw, 4.8rem)',
                  fontWeight: 650,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                  color: DARK,
                  marginBottom: '1.25rem',
                }}
              >
                Additional
                <br />
                work<span style={{ color: RED }}>.</span>
              </h2>

              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)',
                  lineHeight: 1.6,
                  color: BODY_TEXT,
                  maxWidth: '420px',
                  marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
                }}
              >
                A selection of other businesses and projects we&rsquo;ve worked with across different sectors.
              </p>

              <div
                className="tag-mono hide-on-mobile"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  color: FAINT,
                  lineHeight: 1.8,
                  borderLeft: '2px solid rgba(0, 0, 0, 0.1)',
                  paddingLeft: '1rem',
                }}
              >
                <div>DIFFERENT PEOPLE</div>
                <div>DIFFERENT CHALLENGES</div>
                <div>SAME PURPOSE.</div>
              </div>
            </div>

            {/* Right Column: Directory Categories List with timeline nodes */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {/* Connecting vertical line */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  bottom: '20px',
                  left: '32px',
                  width: '1px',
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  zIndex: 0,
                }}
                className="hide-on-mobile"
              />

              {DIRECTORY_CATEGORIES.map((cat, idx) => {
                const isActive = activeDirectoryIndex === idx;
                return (
                  <div
                    key={cat.num}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      paddingTop: 'clamp(1.5rem, 2vw, 2rem)',
                      paddingBottom: 'clamp(1.5rem, 2vw, 2rem)',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    }}
                    onMouseEnter={() => setActiveDirectoryIndex(idx)}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'clamp(50px, 6vw, 70px) minmax(0, 1fr)',
                        gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
                        alignItems: 'flex-start',
                      }}
                    >
                      {/* Node Indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span
                          className="tag-mono"
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: isActive ? RED : MUTED,
                          }}
                        >
                          {cat.num}
                        </span>

                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: isActive ? RED : '#ffffff',
                            border: isActive ? `2px solid ${RED}` : '2px solid rgba(0, 0, 0, 0.25)',
                            transition: 'all 0.25s ease',
                          }}
                          className="hide-on-mobile"
                        />
                      </div>

                      {/* Content Area */}
                      <div>
                        <div style={{ marginBottom: '0.85rem' }}>
                          <h3
                            style={{
                              fontSize: 'clamp(1.25rem, 1.8vw, 1.55rem)',
                              fontWeight: 650,
                              letterSpacing: '-0.02em',
                              color: DARK,
                              marginBottom: '0.25rem',
                            }}
                          >
                            {cat.title}
                          </h3>
                          <div
                            className="tag-mono"
                            style={{
                              fontSize: '0.6rem',
                              letterSpacing: '0.14em',
                              color: MUTED,
                            }}
                          >
                            {cat.subtitle}
                          </div>
                        </div>

                        {/* Client links */}
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.6rem 1.25rem',
                            marginTop: '0.75rem',
                          }}
                        >
                          {cat.clients.map((client) => (
                            <Link
                              key={client.name}
                              href={client.href}
                              style={{
                                fontSize: '0.88rem',
                                color: BODY_TEXT,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                transition: 'color 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = RED;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = BODY_TEXT;
                              }}
                            >
                              <span>{client.name}</span>
                              <ArrowUpRight size={13} color={MUTED} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bottom Explore Button */}
              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#FFFFFF',
                    color: DARK,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = DARK;
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = DARK;
                  }}
                >
                  <span>Explore the directory</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: FOOTER
          ═══════════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          borderTop: BORDER,
          paddingTop: '2rem',
          paddingBottom: '2.5rem',
          backgroundColor: BG_PAGE,
        }}
      >
        <div
          className="padding-global"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Image
              src="/images/arohana-logo.png"
              alt="ĀROHANA"
              width={105}
              height={18}
              style={{ height: '18px', width: 'auto' }}
            />
          </Link>

          {/* Nav Links */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(1rem, 2vw, 2rem)' }}>
            {[
              { label: 'HOME', href: '/' },
              { label: 'STUDIO', href: '/about' },
              { label: 'WORK', href: '/work', active: true },
              { label: 'SERVICES', href: '/services' },
              { label: 'TOURISM', href: '/tourin' },
              { label: 'ARMY PROJECTS', href: '/indian-army-projects' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="tag-mono"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  color: link.active ? DARK : MUTED,
                  fontWeight: link.active ? 700 : 500,
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '4px',
                  borderBottom: link.active ? `2px solid ${RED}` : 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="tag-mono" style={{ fontSize: '0.65rem', color: FAINT, letterSpacing: '0.1em' }}>
            &copy; {new Date().getFullYear()} Arohana Consultancy
          </div>
        </div>
      </footer>
    </div>
  );
}
