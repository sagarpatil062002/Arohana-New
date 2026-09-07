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
  ChevronDown,
  Play,
  Instagram,
  Compass,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCmsContent } from '@/lib/cms/content-context';

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

/* ─── ©26 Editorial Badge Component matching exact design reference ─── */
function Circle26Badge({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div
      className={`c26-badge ${isMobile ? 'c26-badge-mobile' : 'c26-badge-desktop'}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isMobile ? '8px' : 'clamp(12px, 1.2vw, 18px)',
        userSelect: 'none',
        flexShrink: 0,
      }}
      aria-label="Copyright 2026 Brands People Places Possibilities"
    >
      {/* ©26 Mark */}
      <div
        className="c26-mark"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: isMobile ? '3px' : 'clamp(4px, 0.35vw, 6px)',
          color: '#A1A1AA',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {/* Circle with c */}
        <span
          className="c26-c-ring"
          style={{
            width: isMobile ? '26px' : 'clamp(38px, 3.4vw, 48px)',
            height: isMobile ? '26px' : 'clamp(38px, 3.4vw, 48px)',
            borderRadius: '50%',
            border: isMobile ? '2px solid #A1A1AA' : 'clamp(2.4px, 0.22vw, 3px) solid #A1A1AA',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <span
            className="c26-c-inner"
            style={{
              fontSize: isMobile ? '13px' : 'clamp(19px, 1.7vw, 24px)',
              fontWeight: 600,
              color: '#A1A1AA',
              lineHeight: 1,
              transform: 'translateY(-1px)',
              textTransform: 'lowercase',
              fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif)',
            }}
          >
            c
          </span>
        </span>

        {/* 26 Digits */}
        <span
          className="c26-digits"
          style={{
            fontSize: isMobile ? '26px' : 'clamp(38px, 3.4vw, 48px)',
            lineHeight: 1,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#A1A1AA',
            fontFamily: 'var(--font-display, var(--font-sans, sans-serif))',
          }}
        >
          26
        </span>
      </div>

      {/* Vertical Divider */}
      <div
        className="c26-divider"
        style={{
          width: '1px',
          height: isMobile ? '38px' : 'clamp(46px, 4vw, 56px)',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          flexShrink: 0,
        }}
        aria-hidden="true"
      />

      {/* 4 Stacked Words: BRANDS / PEOPLE / PLACES / POSSIBILITIES */}
      <div
        className="c26-words"
        style={{
          display: 'flex',
          flexDirection: 'column',
          color: '#7A7A82',
          fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif)',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: isMobile ? '7.5px' : 'clamp(9.5px, 0.72vw, 11px)',
          letterSpacing: isMobile ? '0.14em' : '0.2em',
          lineHeight: 1.5,
          whiteSpace: 'nowrap',
        }}
      >
        <span>BRANDS</span>
        <span>PEOPLE</span>
        <span>PLACES</span>
        <span>POSSIBILITIES</span>
      </div>
    </div>
  );
}

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
  const { content } = useCmsContent();
  const workCms = content?.work;
  const activeReelsList: ReelItem[] = (workCms?.featuredReels && workCms.featuredReels.length > 0)
    ? workCms.featuredReels.map((r: any, i: number) => ({
        id: r.id || `reel-${i}`,
        num: String(i + 1).padStart(2, '0'),
        hookTitle: r.hookTitle || '',
        subtitle: r.subtitle || '',
        category: r.category || '',
        image: r.coverImage || r.image || '/images/case-studies/raysons/neora-1.jpg',
        video: r.video || '/videos/hero-montage.mp4',
        instagramUrl: r.instagramUrl || 'https://www.instagram.com/byarohana/',
      }))
    : REELS;

  const containerRef = useRef<HTMLDivElement>(null);
  const reelsScrollRef = useRef<HTMLDivElement>(null);
  const [selectedReelFilter, setSelectedReelFilter] = useState('All');
  const [selectedCaseFilter, setSelectedCaseFilter] = useState('All');
  const [activeDirectoryIndex, setActiveDirectoryIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Filtered Reels
  const filteredReels =
    selectedReelFilter === 'All'
      ? activeReelsList
      : activeReelsList.filter((r) => r.category === selectedReelFilter);

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
            position: 'relative',
            paddingTop: 'clamp(4.5rem, 7vw, 7rem)',
            paddingBottom: 'clamp(1.75rem, 3vw, 2.5rem)',
          }}
        >
          {/* Top-right red indicator ring matching desktop reference */}
          <div className="work-hero-top-dot" aria-hidden="true" />

          {/* Desktop & Tablet Layout (> 860px) */}
          <div className="work-hero-grid">
            {/* Left: Main Heading */}
            <div className="work-hero-left">
              <h1 className="work-hero-headline">
                The
                <br />
                work is
                <br />
                <span style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
                  the proof
                  <span
                    className="hero-red-dot"
                    style={{
                      display: 'inline-block',
                      width: 'clamp(9px, 0.85vw, 13px)',
                      height: 'clamp(9px, 0.85vw, 13px)',
                      borderRadius: '50%',
                      backgroundColor: '#FF3838',
                      marginLeft: 'clamp(4px, 0.35vw, 7px)',
                      verticalAlign: 'baseline',
                      transform: 'translateY(-0.06em)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                </span>
              </h1>
            </div>

            {/* Middle: Featured Case Studies Narrative */}
            <div className="work-hero-middle">
              <div className="work-hero-eyebrow">
                {workCms?.header?.eyebrow || 'FEATURED CASE STUDIES'}
              </div>
              <p className="work-hero-desc">
                {workCms?.header?.subtitle ||
                  'A selection of businesses and projects that show how Ārohana thinks, creates and executes across very different environments.'}
              </p>
            </div>

            {/* Right: Desktop Circle 26 Badge & 4 Words */}
            <div className="work-hero-badge-desktop">
              <Circle26Badge />
            </div>
          </div>

          {/* Mobile Layout (<= 860px) - Exact match to reference mockup */}
          <div className="work-hero-mobile-layout">
            <div className="work-hero-mobile-row">
              <h1 className="work-hero-headline-mobile">
                The work is
                <br />
                <span style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
                  the proof
                  <span
                    className="hero-red-dot"
                    style={{
                      display: 'inline-block',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#FF3838',
                      marginLeft: '3px',
                      verticalAlign: 'baseline',
                      transform: 'translateY(-0.06em)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                </span>
              </h1>
              <div className="work-hero-badge-mobile">
                <Circle26Badge isMobile />
              </div>
            </div>

            <div className="work-hero-mobile-narrative">
              <div className="work-hero-eyebrow">
                {workCms?.header?.eyebrow || 'FEATURED CASE STUDIES'}
              </div>
              <p className="work-hero-desc">
                {workCms?.header?.subtitle ||
                  'A selection of businesses and projects that show how Ārohana thinks, creates and executes across very different environments.'}
              </p>
            </div>
          </div>

          {/* Reel Category Filters & Slider Controls */}
          <div className="work-reel-filters-bar">
            {/* Filter Pills */}
            <div className="work-reel-filters-scroll">
              {REEL_FILTERS.map((filter) => {
                const isActive = selectedReelFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedReelFilter(filter)}
                    className={`work-filter-pill-btn ${isActive ? 'active' : ''}`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Slider Navigation Arrows (Desktop / Compact) */}
            <div className="work-reel-nav-arrows">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollReels('left')}
                className="work-nav-arrow-btn"
              >
                <ChevronLeft size={17} color={DARK} />
              </button>

              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollReels('right')}
                className="work-nav-arrow-btn work-nav-arrow-dark"
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

        {/* Mobile bottom scroll indicator matching Phone 1 */}
        <div className="work-reels-mobile-indicator">
          <ArrowDown size={16} color={MUTED} />
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
            SECTION 4: CLIENT / PROJECT DIRECTORY ("Additional work")
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
                {workCms?.directoryHeader?.eyebrow || 'CLIENT / PROJECT DIRECTORY'}
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
                {workCms?.directoryHeader?.title ? (
                  workCms.directoryHeader.title
                ) : (
                  <>
                    Additional
                    <br />
                    work
                  </>
                )}
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
                {workCms?.directoryHeader?.subtitle || 'A selection of other businesses and projects we’ve worked with across different sectors.'}
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

            {/* Right Column: Directory Categories List with timeline nodes (Accordion on Mobile matching Phone 2) */}
            <div className="work-directory-column">
              {/* Connecting vertical line (Desktop only) */}
              <div className="work-directory-line" />

              {((workCms?.directoryCategories && workCms.directoryCategories.length > 0)
                ? workCms.directoryCategories
                : DIRECTORY_CATEGORIES
              ).map((cat: any, idx: number) => {
                const isExpanded = activeDirectoryIndex === idx;
                return (
                  <div
                    key={cat.num || idx}
                    className={`work-directory-card ${isExpanded ? 'is-expanded' : ''}`}
                    onClick={() => setActiveDirectoryIndex(isExpanded ? -1 : idx)}
                  >
                    {/* Header Row */}
                    <div className="work-dir-row">
                      <div className="work-dir-node-group">
                        <span className={`tag-mono work-dir-num ${isExpanded ? 'active' : ''}`}>
                          {cat.num}
                        </span>

                        <span className={`work-dir-dot ${isExpanded ? 'active' : ''}`} />

                        <div className="work-dir-title-box">
                          <h3 className="work-dir-title">{cat.title}</h3>
                          <div className="tag-mono work-dir-subtitle">{cat.subtitle}</div>
                        </div>
                      </div>

                      {/* Right Chevron for Mobile Accordion */}
                      <span className="work-dir-toggle-icon">
                        <ChevronRight size={17} className={`work-dir-chevron ${isExpanded ? 'rotated' : ''}`} />
                      </span>
                    </div>

                    {/* Client links (Always visible on desktop, expandable on mobile) */}
                    <div className={`work-dir-clients-wrap ${isExpanded ? 'show' : ''}`}>
                      <div className="work-dir-clients-grid">
                        {cat.clients.map((client: any) => {
                          const hasDetailPage = Boolean(
                            client.href &&
                            client.href !== '/contact' &&
                            client.href !== '#' &&
                            client.href !== ''
                          );

                          return hasDetailPage ? (
                            <Link
                              key={client.name}
                              href={client.href}
                              className="work-dir-client-item"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>{client.name}</span>
                              <ArrowUpRight size={13} className="work-dir-client-arrow" />
                            </Link>
                          ) : (
                            <span
                              key={client.name}
                              className="work-dir-client-item work-dir-client-static"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>{client.name}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bottom Explore Button */}
              <div className="work-directory-footer">
                <Link href={workCms?.directoryHeader?.ctaHref || '/contact'} className="work-dir-explore-btn">
                  <span>{workCms?.directoryHeader?.ctaText || 'Explore the directory'}</span>
                  <ArrowRight size={16} color="#ffffff" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        /* ── SECTION 1: HERO SECTION STYLES ── */
        .work-hero-top-dot {
          position: absolute;
          top: clamp(0.75rem, 1.5vw, 1.6rem);
          right: 0;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 3.2px solid #FF3838;
          background-color: transparent;
          box-sizing: border-box;
        }
        .work-hero-grid {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: clamp(2rem, 4vw, 5rem);
          align-items: flex-end;
          position: relative;
        }
        .work-hero-left {
          display: flex;
          flex-direction: column;
        }
        .work-hero-headline {
          font-family: var(--font-display, var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif));
          font-size: clamp(4.4rem, 6.3vw, 6.8rem);
          font-weight: 800;
          line-height: 0.94;
          letter-spacing: -0.04em;
          color: #111113;
          margin: 0;
        }
        .hero-red-dot {
          color: #FF3838;
          display: inline-block;
          margin-left: 0.02em;
        }
        .work-hero-middle {
          display: flex;
          flex-direction: column;
          padding-bottom: 0.35rem;
        }
        .work-hero-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          color: #FF3838;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }
        .work-hero-desc {
          font-size: clamp(0.88rem, 1.05vw, 1rem);
          line-height: 1.55;
          color: #4A4A52;
          max-width: 420px;
          margin: 0;
        }
        .work-hero-badge-desktop {
          display: flex;
          align-items: flex-end;
          padding-bottom: 0.35rem;
        }

        /* ── ©26 EDITORIAL BADGE DESIGN ── */
        .c26-badge {
          display: inline-flex;
          align-items: center;
          user-select: none;
        }
        .c26-badge-desktop {
          gap: clamp(0.75rem, 1.1vw, 1.25rem);
        }
        .c26-badge-mobile {
          gap: 0.55rem;
          flex-shrink: 0;
        }
        .c26-mark {
          display: inline-flex;
          align-items: center;
          gap: clamp(3px, 0.35vw, 5px);
          line-height: 1;
          color: #A1A1AA;
          font-weight: 550;
        }
        .c26-badge-desktop .c26-mark {
          font-size: clamp(2.8rem, 3.8vw, 4.2rem);
        }
        .c26-badge-mobile .c26-mark {
          font-size: clamp(1.85rem, 5.4vw, 2.35rem);
        }
        .c26-c-ring {
          width: 0.9em;
          height: 0.9em;
          border-radius: 50%;
          border: clamp(2.2px, 0.22vw, 3px) solid #A1A1AA;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          flex-shrink: 0;
        }
        .c26-badge-mobile .c26-c-ring {
          border-width: 2px;
        }
        .c26-c-inner {
          font-size: 0.56em;
          font-weight: 600;
          color: #A1A1AA;
          line-height: 1;
          transform: translateY(-0.04em);
          text-transform: lowercase;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
        }
        .c26-digits {
          font-size: 1em;
          line-height: 1;
          font-weight: 550;
          letter-spacing: -0.03em;
          color: #A1A1AA;
          font-family: var(--font-display, var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif));
        }
        .c26-divider {
          width: 1px;
          background-color: rgba(0, 0, 0, 0.14);
          flex-shrink: 0;
        }
        .c26-badge-desktop .c26-divider {
          height: clamp(50px, 4.2vw, 62px);
        }
        .c26-badge-mobile .c26-divider {
          height: clamp(38px, 10vw, 45px);
        }
        .c26-words {
          display: flex;
          flex-direction: column;
          color: #7A7A82;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
          font-weight: 600;
          text-transform: uppercase;
        }
        .c26-badge-desktop .c26-words {
          font-size: clamp(0.6rem, 0.7vw, 0.68rem);
          letter-spacing: 0.2em;
          line-height: 1.55;
        }
        .c26-badge-mobile .c26-words {
          font-size: clamp(0.44rem, 1.35vw, 0.5rem);
          letter-spacing: 0.14em;
          line-height: 1.45;
        }
        .work-hero-mobile-layout {
          display: none;
        }
        .work-reel-filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-top: clamp(2.5rem, 4vw, 3.5rem);
          padding-bottom: 1.25rem;
        }
        .work-reel-filters-scroll {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .work-reel-filters-scroll::-webkit-scrollbar {
          display: none;
        }
        .work-filter-pill-btn {
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          font-size: 0.74rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          background-color: #FFFFFF;
          color: #111113;
          border: 1px solid rgba(0, 0, 0, 0.1);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .work-filter-pill-btn.active {
          background-color: #111113;
          color: #FFFFFF;
          border-color: #111113;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }
        .work-reel-nav-arrows {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .work-nav-arrow-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .work-nav-arrow-btn:hover {
          background-color: #F2EFEB;
        }
        .work-nav-arrow-dark {
          background-color: #111113;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .work-nav-arrow-dark:hover {
          background-color: #2A2A30;
        }
        .work-reels-mobile-indicator {
          display: none;
        }

        /* Directory Section */
        .work-directory-column {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .work-directory-line {
          position: absolute;
          top: 20px;
          bottom: 20px;
          left: 32px;
          width: 1px;
          background-color: rgba(0, 0, 0, 0.12);
          z-index: 0;
        }
        .work-directory-card {
          position: relative;
          z-index: 1;
          padding: clamp(1.5rem, 2vw, 2rem) 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.25s ease;
        }
        .work-dir-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: flex-start;
        }
        .work-dir-node-group {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }
        .work-dir-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: #71717A;
          width: 24px;
          flex-shrink: 0;
          padding-top: 3px;
        }
        .work-dir-num.active {
          color: #DE322D;
        }
        .work-dir-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 2px solid rgba(0, 0, 0, 0.25);
          flex-shrink: 0;
          margin-top: 6px;
          transition: all 0.25s ease;
        }
        .work-dir-dot.active {
          background-color: #DE322D;
          border-color: #DE322D;
          box-shadow: 0 0 0 3px rgba(222, 50, 45, 0.2);
        }
        .work-dir-title-box {
          flex: 1;
        }
        .work-dir-title {
          font-size: clamp(1.25rem, 1.8vw, 1.55rem);
          font-weight: 650;
          letter-spacing: -0.02em;
          color: #111113;
          margin-bottom: 0.25rem;
        }
        .work-dir-subtitle {
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          color: #71717A;
        }
        .work-dir-toggle-icon {
          display: none;
        }
        .work-dir-clients-wrap {
          margin-top: 0.85rem;
          padding-left: 3.5rem;
        }
        .work-dir-clients-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 1.25rem;
        }
        .work-dir-client-item {
          font-size: 0.88rem;
          color: #4A4A52;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: color 0.2s ease;
        }
        .work-dir-client-item:hover {
          color: #DE322D;
        }
        .work-dir-client-item.work-dir-client-static {
          cursor: default;
          color: #64748B;
        }
        .work-dir-client-item.work-dir-client-static:hover {
          color: #1E293B;
        }
        .work-directory-footer {
          margin-top: 2.5rem;
          display: flex;
          justify-content: flex-end;
        }
        .work-dir-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.8rem 1.65rem;
          border-radius: 9999px;
          border: 1px solid #000000;
          background-color: #000000;
          color: #FFFFFF;
          font-family: var(--font-display, sans-serif);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .work-dir-explore-btn:hover {
          background-color: #222226;
          border-color: #222222;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
        }

        /* ── MOBILE VIEWPORT OPTIMIZATIONS (Exact match to reference mockup) ── */
        @media (max-width: 860px) {
          .work-hero-top-dot {
            display: none !important;
          }

          .work-hero-grid {
            display: none !important;
          }

          .work-hero-mobile-layout {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }

          .work-hero-mobile-row {
            display: flex !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 0.75rem !important;
            width: 100% !important;
          }

          .work-hero-headline-mobile {
            font-family: var(--font-display, var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif)) !important;
            font-size: clamp(2.2rem, 8.2vw, 3.1rem) !important;
            font-weight: 800 !important;
            line-height: 1.02 !important;
            letter-spacing: -0.038em !important;
            color: #111113 !important;
            margin: 0 !important;
          }

          .work-hero-badge-mobile {
            display: flex !important;
            align-items: flex-start !important;
            padding-top: 0.35rem !important;
          }

          .work-hero-mobile-narrative {
            display: flex !important;
            flex-direction: column !important;
          }

          .work-reel-filters-bar {
            margin-top: 1.5rem !important;
            padding-bottom: 0.5rem !important;
          }

          .work-reel-filters-scroll {
            width: 100% !important;
            padding-bottom: 0.4rem !important;
          }

          .work-reel-nav-arrows {
            display: none !important;
          }

          .work-reels-mobile-indicator {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            padding-top: 1.25rem !important;
          }

          /* Accordion list matching Phone 2 mockup */
          .work-directory-line {
            display: none !important;
          }

          .work-directory-card {
            border-radius: 14px !important;
            padding: 1.15rem 1rem !important;
            margin-bottom: 0.65rem !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            background-color: #FFFFFF !important;
            cursor: pointer !important;
          }

          .work-directory-card.is-expanded {
            border-color: rgba(222, 50, 45, 0.25) !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04) !important;
          }

          .work-dir-node-group {
            gap: 0.65rem !important;
          }

          .work-dir-num {
            width: 20px !important;
            font-size: 0.72rem !important;
          }

          .work-dir-title {
            font-size: 1.05rem !important;
          }

          .work-dir-subtitle {
            margin-top: 0.2rem !important;
          }

          .work-dir-toggle-icon {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 28px !important;
            height: 28px !important;
            color: #71717A !important;
          }

          .work-dir-chevron {
            transition: transform 0.25s ease !important;
          }

          .work-dir-chevron.rotated {
            transform: rotate(90deg) !important;
            color: #DE322D !important;
          }

          .work-dir-clients-wrap {
            display: none !important;
            padding-left: 0 !important;
            margin-top: 1rem !important;
            padding-top: 0.85rem !important;
            border-top: 1px solid rgba(0, 0, 0, 0.06) !important;
          }

          .work-dir-clients-wrap.show {
            display: block !important;
          }

          .work-dir-clients-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
          }

          .work-dir-client-item {
            display: flex !important;
            justify-content: space-between !important;
            padding: 0.35rem 0 !important;
            border-bottom: 1px dashed rgba(0, 0, 0, 0.06) !important;
            font-size: 0.86rem !important;
          }

          .work-directory-footer {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
