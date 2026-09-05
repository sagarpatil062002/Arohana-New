'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  X,
  CheckCircle2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface JourneyItem {
  id: string;
  title: string;
  duration: string;
  type: string;
  desc: string;
  image: string;
  elevation: string;
  highlights: string[];
  phases: { phase: string; title: string; description: string }[];
}

export default function TourinPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pillPos = useRef({ x: 0, y: 0 });
  const [pillLabel, setPillLabel] = useState('EXPLORE');

  // Active Traveller item (0 to 4)
  const [activeTravellerIndex, setActiveTravellerIndex] = useState<number>(0);

  // Active Journey for Itinerary Modal
  const [activeJourney, setActiveJourney] = useState<JourneyItem | null>(null);

  const travellerItems = [
    {
      num: '01',
      text: 'Travellers who are curious rather than purely checklist-driven.',
      image: '/images/tourin/tourin-hero.jpg',
      alt: 'Local conversation in Himalayan village courtyard',
    },
    {
      num: '02',
      text: 'Explorers who want to understand a destination, not only photograph it.',
      image: '/images/tourin/tourin-gallery-1.jpg',
      alt: 'Artisan dialogue and cultural interaction',
    },
    {
      num: '03',
      text: 'People who value local experiences and thoughtful pacing.',
      image: '/images/tourin/tourin-1.jpg',
      alt: 'Quiet heritage homestay in apricot valley',
    },
    {
      num: '04',
      text: 'Small groups, couples, families or individual travellers looking for a more personal journey.',
      image: '/images/tourin/tourin-gallery-6.jpg',
      alt: 'Small group travellers in high mountain pass',
    },
    {
      num: '05',
      text: 'Travellers who want professional planning without feeling like they are being moved through a fixed tourist circuit.',
      image: '/images/tourin/tourin-3.jpg',
      alt: 'Expedition vehicle exploring remote Himalayan trail',
    },
  ];

  const experiencePillars = [
    { label: 'STAYS', image: '/images/tourin/tourin-1.jpg', alt: 'Boutique earthen heritage stay' },
    { label: 'LOCAL LIFE', image: '/images/tourin/tourin-gallery-1.jpg', alt: 'Warm interaction with local family' },
    { label: 'FOOD', image: '/images/tourin/tourin-gallery-2.jpg', alt: 'Traditional high altitude dining' },
    { label: 'CULTURE', image: '/images/tourin/tourin-gallery-4.jpg', alt: 'Centuries-old monastic heritage' },
    { label: 'LANDSCAPES', image: '/images/tourin/tourin-gallery-5.jpg', alt: 'Vast dramatic mountain valleys' },
  ];

  const proofCollage = [
    { src: '/images/tourin/tourin-3.jpg', alt: 'Bikers on mountain pass' },
    { src: '/images/tourin/tourin-gallery-6.jpg', alt: 'Campfire and night sky in Ladakh' },
    { src: '/images/tourin/tourin-hero.jpg', alt: 'Group expedition team in high Himalayas' },
    { src: '/images/tourin/tourin-2.jpg', alt: 'Pangong crystal alpine lake' },
    { src: '/images/tourin/tourin-1.jpg', alt: 'Traditional rammed-earth manor interior' },
    { src: '/images/tourin/tourin-gallery-4.jpg', alt: 'Traveller in ancient monastery window' },
    { src: '/images/tourin/tourin-gallery-1.jpg', alt: 'Traveller seated in wooden pavilion' },
    { src: '/images/tourin/tourin-gallery-3.jpg', alt: 'Scenic mountain road and valley' },
  ];

  const journeys: JourneyItem[] = [
    {
      id: 'slow-ladakh',
      title: 'The Slow Ladakh Odyssey',
      duration: '8 Days / 7 Nights',
      type: 'Cultural Immersion & Slow Exploration',
      desc: 'Leh, Sham Valley, Thiksey, and hidden Indus villages. Staying at heritage homestays, eating local cuisine, and walking ancient paths without rushing.',
      image: '/images/tourin/tourin-gallery-3.jpg',
      elevation: '9,500 — 11,500 FT',
      highlights: [
        'Earthen heritage manor homestays in ancient apricot valleys',
        'Private monastery fresco archives guided by resident monks',
        'Traditional high-altitude buckwheat and herbal dining',
      ],
      phases: [
        { phase: 'Days 1–2', title: 'Arrival & Calm Acclimatisation', description: 'Gentle Indus river walks, old Leh bazaar, rest, and monastery tea.' },
        { phase: 'Days 3–5', title: 'Sham Valley Apricot Orchards', description: 'Heritage stays in Alchi, 11th-century mural tours, and village cooking.' },
        { phase: 'Days 6–8', title: 'Thiksey & Sacred High Trails', description: 'Sunrise monastery prayers, Indus confluence, and contemplative return.' },
      ],
    },
    {
      id: 'nubra-silk-route',
      title: 'Nubra Valley & The Silk Route',
      duration: '7 Days / 6 Nights',
      type: 'High Passes, Deserts & Monasteries',
      desc: 'Crossing Khardung La into the dramatic dune valleys of Hunder and Diskit, spending time with local artisans, and discovering village monasteries.',
      image: '/images/tourin/tourin-gallery-5.jpg',
      elevation: '10,000 — 17,582 FT',
      highlights: [
        'Calibrated crossing of Khardung La pass with emergency medical logistics',
        'Secluded Balti heritage encounters in remote Turtuk village',
        'Diskit and Ensa cliffside monastery meditation halls',
      ],
      phases: [
        { phase: 'Days 1–2', title: 'Leh Acclimatisation & Orientation', description: 'Paced walking, oxygen saturation checks, and cultural briefing.' },
        { phase: 'Days 3–4', title: 'Across Khardung La to Diskit & Hunder', description: 'Dramatic high-pass crossing into dunes and ancient monastic caves.' },
        { phase: 'Days 5–7', title: 'Turtuk Living Silk Route & Return', description: 'Balti apricot orchards, stone irrigation channels, and return.' },
      ],
    },
    {
      id: 'changthang-nomads',
      title: 'Changthang High Lakes & Nomads',
      duration: '9 Days / 8 Nights',
      type: 'Wild Plateaus & High-Altitude Waters',
      desc: 'Expedition across Pangong Tso, Tso Moriri, and the Changpa nomadic settlements. Experience raw silence and vast Himalayan skies.',
      image: '/images/tourin/tourin-2.jpg',
      elevation: '13,500 — 14,764 FT',
      highlights: [
        'Secluded lakeside eco-camps away from mass tourist transit hubs',
        'Respectful encounters with Changpa Pashmina nomadic pastoralists',
        'Night-sky stargazing under India’s premier Dark Sky Reserve in Hanle',
      ],
      phases: [
        { phase: 'Days 1–3', title: 'Leh & Indus Valley Acclimatisation', description: 'Essential rest, hydration, and lower valley exploration.' },
        { phase: 'Days 4–6', title: 'Pangong Tso & Changthang Plateau', description: 'Deep turquoise shoreline walks and nomadic pasture trails.' },
        { phase: 'Days 7–9', title: 'Hanle Dark Sky Reserve & Tso Moriri', description: 'Astronomical observatory night sky and return traverse.' },
      ],
    },
  ];

  // Mouse Follower Loop
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

      if (pill) {
        gsap.set(pill, {
          x: pillPos.current.x,
          y: pillPos.current.y,
        });
      }
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
      gsap.to(hoverPillRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  const handlePillLeave = () => {
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero masked slide entrance
      gsap.fromTo(
        '.tourin-title-masked',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );

      // Hero elements fade
      gsap.fromTo(
        '.tourin-hero-fade',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nextTraveller = () => {
    setActiveTravellerIndex((prev) => (prev + 1) % travellerItems.length);
  };

  const prevTraveller = () => {
    setActiveTravellerIndex((prev) => (prev - 1 + travellerItems.length) % travellerItems.length);
  };

  return (
    <div
      ref={containerRef}
      style={{
        marginTop: '-76px',
        backgroundColor: '#ffffff',
        color: '#111111',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Interactive Cursor Follower Pill */}
      <div
        ref={hoverPillRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          borderRadius: '9999px',
          backgroundColor: '#DE322D',
          color: '#ffffff',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(222, 50, 45, 0.45)',
          whiteSpace: 'nowrap',
        }}
      >
        <span>{pillLabel}</span>
        <ArrowUpRight size={13} />
      </div>

      {/* ================================================================
          01 — HERO (85–100vh Desktop Full Bleed)
      ================================================================ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingTop: '100px',
          paddingBottom: 'clamp(2.5rem, 5vh, 4.5rem)',
          overflow: 'hidden',
          backgroundColor: '#0c0c0e',
          color: '#ffffff',
        }}
      >
        {/* Full-bleed Background Hero Photo */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Image
            src="/images/tourin/tourin-hero.jpg"
            alt="Young traveller conversing with Ladakhi woman elder in Himalayan stone courtyard"
            fill
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }}
          />
          {/* Editorial Vignette & Legibility Gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'linear-gradient(to bottom, rgba(12,12,14,0.55) 0%, rgba(12,12,14,0.15) 35%, rgba(12,12,14,0.7) 75%, rgba(12,12,14,0.95) 100%)',
            }}
          />
        </div>

        {/* Hero Content */}
        <div
          className="padding-global"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            {/* Eyebrow */}
            <div
              className="tourin-hero-fade tag-mono"
              style={{
                fontSize: '0.725rem',
                color: 'rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.14em',
                marginBottom: '1.25rem',
                display: 'block',
                textTransform: 'uppercase',
              }}
            >
              OWNED EXPERIENTIAL TRAVEL BRAND
            </div>

            {/* Main Headline */}
            <div style={{ overflow: 'hidden', marginBottom: '1.75rem' }}>
              <h1
                className="tourin-title-masked"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7.2vw, 6.2rem)',
                  lineHeight: 1.05,
                  fontWeight: 500,
                  letterSpacing: '-0.035em',
                  color: '#ffffff',
                }}
              >
                Travel beyond the
                <br />
                itinerary.
              </h1>
            </div>

            {/* Description */}
            <div
              className="tourin-hero-fade"
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: 'clamp(0.975rem, 1.6vw, 1.2rem)',
                lineHeight: 1.65,
                maxWidth: '620px',
                marginBottom: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <p style={{ margin: 0 }}>
                Some places are better experienced when you stop trying to see everything.
              </p>
              <p style={{ margin: 0 }}>
                Tourin creates experiential journeys for travellers who want more than a checklist
                of sights — beginning with Ladakh.
              </p>
            </div>

            {/* CTAs */}
            <div
              className="tourin-hero-fade"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: 'clamp(2rem, 4vh, 3.5rem)',
              }}
            >
              <a
                href="#curated-journeys"
                className="button-editorial"
                style={{
                  height: '48px',
                  padding: '0 1.75rem',
                  backgroundColor: '#DE322D',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <span>VIEW LADAKH EXPERIENCES</span>
                <ArrowRight size={14} />
              </a>

              <Link
                href="/contact"
                className="button-editorial"
                style={{
                  height: '48px',
                  padding: '0 1.75rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.65)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.65)';
                }}
              >
                <span>TALK TO US ABOUT A JOURNEY</span>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            style={{
              textAlign: 'center',
              paddingTop: '1rem',
            }}
          >
            <a
              href="#the-genesis"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          02 — SECTION: 01 • THE GENESIS — Why Tourin.
      ================================================================ */}
      <section
        id="the-genesis"
        style={{
          paddingTop: 'clamp(4rem, 8vw, 7rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Text */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: '#DE322D',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                01 • THE GENESIS
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#111111',
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                }}
              >
                Why Tourin.
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  color: '#444444',
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.075rem)',
                  lineHeight: 1.7,
                  maxWidth: '560px',
                }}
              >
                <p style={{ margin: 0 }}>
                  Tourin came from a simple realisation: the Ladakh people experience and the
                  Ladakh most itineraries sell are not always the same.
                </p>
                <p style={{ margin: 0 }}>
                  There is the Ladakh of famous passes, lakes and photographs. And then there is the
                  place behind them — its people, food, stories, homes, landscapes, silences and
                  everyday life.
                </p>
                <p style={{ margin: 0 }}>
                  Tourin was created to make space for the second one.
                </p>
                <p style={{ margin: 0 }}>
                  Not by avoiding the places people want to see, but by changing the way the journey
                  is experienced.
                </p>
              </div>
            </div>

            {/* Right Photograph */}
            <div
              onMouseEnter={() => handlePillEnter('LADAKH HERITAGE')}
              onMouseLeave={handlePillLeave}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/11',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)',
                backgroundColor: '#eee',
              }}
            >
              <Image
                src="/images/tourin/tourin-gallery-4.jpg"
                alt="Ancient whitewashed monastery on rugged Ladakh hillside"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          03 — SECTION: 02 • OUR PHILOSOPHY (Dark Section + Quote)
      ================================================================ */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
          backgroundColor: '#0d0d10',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'center',
            }}
          >
            {/* Left: Vertical Image of breakfast/tea in front of mountain window */}
            <div
              onMouseEnter={() => handlePillEnter('NATIVE MORNINGS')}
              onMouseLeave={handlePillLeave}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                maxHeight: '520px',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              }}
            >
              <Image
                src="/images/tourin/tourin-gallery-2.jpg"
                alt="Traditional tea and breakfast table in front of panoramic Himalayan window"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Middle: What we believe text */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: '#DE322D',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                02 • OUR PHILOSOPHY
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '1.75rem',
                }}
              >
                What we believe.
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.15rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: 'clamp(0.925rem, 1.1vw, 1rem)',
                  lineHeight: 1.7,
                }}
              >
                <p style={{ margin: 0 }}>
                  A good trip should leave you with more than photographs.
                </p>
                <p style={{ margin: 0 }}>
                  It should give you a sense of where you were.
                </p>
                <p style={{ margin: 0 }}>
                  That can mean eating something you have never tried, spending time with a local
                  family, understanding a tradition, staying somewhere connected to its
                  surroundings, taking a slower route, or simply having enough time to notice the
                  place instead of rushing through it.
                </p>
                <p style={{ margin: 0 }}>
                  We are interested in travel that feels personal, considered and rooted — not travel
                  that is simply packed with more stops.
                </p>
              </div>
            </div>

            {/* Right: Signature Statement with Large Quote */}
            <div
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.14)',
                paddingLeft: 'clamp(1.5rem, 3vw, 3rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Red Quote Symbol */}
              <div
                style={{
                  color: '#DE322D',
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  lineHeight: 0.8,
                  marginBottom: '1rem',
                }}
              >
                “
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                  lineHeight: 1.25,
                  fontWeight: 500,
                  color: '#ffffff',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                A GOOD JOURNEY
                <br />
                IS NOT ABOUT
                <br />
                HOW MUCH YOU
                <br />
                CAN FIT INTO IT.
              </div>

              {/* Red Accent Divider */}
              <div
                style={{
                  width: '36px',
                  height: '2px',
                  backgroundColor: '#DE322D',
                  marginBottom: '1.25rem',
                }}
              />

              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.65)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                It is about what you have time to notice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          04 — SECTION: 03 • THE DESTINATION — Why Ladakh.
      ================================================================ */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left text */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: '#DE322D',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                03 • THE DESTINATION
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#111111',
                  lineHeight: 1.1,
                  marginBottom: '1.75rem',
                }}
              >
                Why Ladakh.
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  color: '#444444',
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.075rem)',
                  lineHeight: 1.7,
                  maxWidth: '540px',
                }}
              >
                <p style={{ margin: 0 }}>
                  Ladakh is where Tourin begins because it is a place we know closely enough to
                  design experiences around more than the obvious itinerary.
                </p>
                <p style={{ margin: 0 }}>
                  The first journeys are built around exploration, culture, landscapes and
                  meaningful encounters — with enough structure to make the trip comfortable and
                  enough space for the unexpected.
                </p>
              </div>
            </div>

            {/* Right: Landscape Panorama with Route Overlay */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)',
                backgroundColor: '#111',
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                <Image
                  src="/images/tourin/tourin-2.jpg"
                  alt="Dramatic mountain panorama of Ladakh with high altitude lakes"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Bottom Route Timeline Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(15, 15, 18, 0.82)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  overflowX: 'auto',
                }}
              >
                {[
                  { name: 'LEH', active: true },
                  { name: 'SHAM VALLEY', active: false },
                  { name: 'NUBRA', active: false },
                  { name: 'CHANGTHANG', active: false },
                  { name: 'PANGONG', active: false },
                ].map((stop, idx, arr) => (
                  <React.Fragment key={stop.name}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          width: stop.active ? '9px' : '6px',
                          height: stop.active ? '9px' : '6px',
                          borderRadius: '50%',
                          backgroundColor: stop.active ? '#DE322D' : 'rgba(255, 255, 255, 0.4)',
                          boxShadow: stop.active ? '0 0 8px rgba(222, 50, 45, 0.7)' : 'none',
                        }}
                      />
                      <span
                        className="tag-mono"
                        style={{
                          fontSize: '0.675rem',
                          letterSpacing: '0.08em',
                          color: stop.active ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                          fontWeight: stop.active ? 700 : 500,
                        }}
                      >
                        {stop.name}
                      </span>
                    </div>

                    {idx < arr.length - 1 && (
                      <span
                        style={{
                          flex: 1,
                          height: '1px',
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          margin: '0 0.85rem',
                          minWidth: '20px',
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          05 — SECTION: 04 • THE TRAVELLER — Who is Tourin for? (Interactive)
      ================================================================ */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
          backgroundColor: '#0d0d10',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left: Interactive list of travellers */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: '#DE322D',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                04 • THE TRAVELLER
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '2.5rem',
                }}
              >
                Who is Tourin for?
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {travellerItems.map((item, idx) => {
                  const isActive = idx === activeTravellerIndex;
                  return (
                    <div
                      key={item.num}
                      onClick={() => setActiveTravellerIndex(idx)}
                      onMouseEnter={() => handlePillEnter(`0${idx + 1} TRAVELLER`)}
                      onMouseLeave={handlePillLeave}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1.5rem',
                        padding: '1.1rem 1.25rem',
                        borderRadius: '16px',
                        backgroundColor: isActive
                          ? 'rgba(255, 255, 255, 0.06)'
                          : 'transparent',
                        border: isActive
                          ? '1px solid rgba(222, 50, 45, 0.35)'
                          : '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span
                        className="tag-mono"
                        style={{
                          fontSize: '1.15rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: isActive ? '#DE322D' : 'rgba(255, 255, 255, 0.35)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item.num}
                      </span>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                          lineHeight: 1.6,
                          color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                          fontWeight: isActive ? 500 : 400,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Dynamic Photograph + Vertical Arrow Controls */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  flex: 1,
                  aspectRatio: '4/3',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)',
                  backgroundColor: '#111',
                }}
              >
                <Image
                  src={travellerItems[activeTravellerIndex].image}
                  alt={travellerItems[activeTravellerIndex].alt}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'opacity 0.4s ease, transform 0.6s ease',
                  }}
                />
              </div>

              {/* Vertical Navigation Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={prevTraveller}
                  aria-label="Previous traveller profile"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#DE322D',
                    border: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(222, 50, 45, 0.35)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <ArrowUp size={18} />
                </button>

                <button
                  onClick={nextTraveller}
                  aria-label="Next traveller profile"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#DE322D';
                    e.currentTarget.style.borderColor = '#DE322D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <ArrowDown size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          06 — SECTION: 05 • JOURNEY PHILOSOPHY — The experience.
      ================================================================ */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          {/* Top text row: 3 columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
              alignItems: 'flex-start',
              marginBottom: '3.5rem',
            }}
          >
            <div>
              <div
                className="tag-mono"
                style={{
                  color: '#DE322D',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}
              >
                05 • JOURNEY PHILOSOPHY
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#111111',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                The experience.
              </h2>
            </div>

            <div>
              <p
                style={{
                  color: '#444444',
                  fontSize: '0.975rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Tourin's journeys can bring together carefully chosen stays, local experiences, food,
                culture, landscapes and the practical planning that makes travel work.
              </p>
            </div>

            <div>
              <p
                style={{
                  color: '#666666',
                  fontSize: '0.975rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                The point is not to add experiences for the sake of adding them. Each element
                should have a reason to be there.
              </p>
            </div>
          </div>

          {/* Bottom row: 5 Visual Pillar Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {experiencePillars.map((pillar) => (
              <div
                key={pillar.label}
                onMouseEnter={() => handlePillEnter(pillar.label)}
                onMouseLeave={handlePillLeave}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/11',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#eee',
                }}
              >
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1.25rem',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  {pillar.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          07 — EXPERIENCE MARQUEE (Continuous Horizontal Ticker)
      ================================================================ */}
      <div
        style={{
          backgroundColor: '#0d0d10',
          padding: '1.25rem 0',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="marquee-container" style={{ padding: 0 }}>
          <div className="marquee-track">
            {/* Group 1 */}
            <div
              className="marquee-group"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                paddingRight: '2.5rem',
              }}
            >
              {[
                'LOCAL LIFE',
                'SLOW TRAVEL',
                'MOUNTAIN ROADS',
                'HOMESTAYS',
                'LOCAL FOOD',
                'CULTURE',
                'LANDSCAPES',
                'QUIET MOMENTS',
              ].map((text, i) => (
                <React.Fragment key={`ticker-1-${i}`}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      letterSpacing: '0.14em',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {text}
                  </span>
                  <span style={{ color: '#DE322D', fontSize: '1rem' }}>•</span>
                </React.Fragment>
              ))}
            </div>

            {/* Group 2 (Duplicate for Seamless Loop) */}
            <div
              className="marquee-group"
              aria-hidden="true"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                paddingRight: '2.5rem',
              }}
            >
              {[
                'LOCAL LIFE',
                'SLOW TRAVEL',
                'MOUNTAIN ROADS',
                'HOMESTAYS',
                'LOCAL FOOD',
                'CULTURE',
                'LANDSCAPES',
                'QUIET MOMENTS',
              ].map((text, i) => (
                <React.Fragment key={`ticker-2-${i}`}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      letterSpacing: '0.14em',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {text}
                  </span>
                  <span style={{ color: '#DE322D', fontSize: '1rem' }}>•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          08 — SECTION: VALIDATED EXECUTION — Proof that the idea works.
      ================================================================ */}
      <section
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left: Heading and 15+ Statistic */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: '#DE322D',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                VALIDATED EXECUTION
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#111111',
                  lineHeight: 1.15,
                  marginBottom: '2rem',
                }}
              >
                Proof that the
                <br />
                idea works.
              </h2>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3.8rem, 6.5vw, 6rem)',
                    fontWeight: 600,
                    color: '#DE322D',
                    lineHeight: 0.9,
                  }}
                >
                  15+
                </div>

                <div
                  style={{
                    color: '#444444',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    maxWidth: '380px',
                  }}
                >
                  <p style={{ margin: 0, marginBottom: '0.75rem' }}>
                    Tourin has already completed 15+ separate bookings, ranging from individual
                    travellers and small groups to larger groups, including a 20-biker trip.
                  </p>
                  <p style={{ margin: 0, color: '#777777', fontSize: '0.85rem' }}>
                    These are early proof that there is an audience for the kind of travel Tourin is
                    building.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: 8-Photo Collage Grid (2 rows x 4 columns) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.75rem',
              }}
            >
              {proofCollage.map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => handlePillEnter('MOMENTS')}
                  onMouseLeave={handlePillLeave}
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/11',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#eee',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          09 — SECTION: CURATED LADAKH JOURNEYS
      ================================================================ */}
      <section
        id="curated-journeys"
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 300px) 1fr auto',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
              alignItems: 'stretch',
            }}
            className="journeys-layout-grid"
          >
            {/* Left Column: Heading & Large Watermark 'Ā' */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div
                  className="tag-mono"
                  style={{
                    color: '#DE322D',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                  }}
                >
                  CURATED LADAKH JOURNEYS
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: '#111111',
                    lineHeight: 1.15,
                    marginBottom: '1.5rem',
                  }}
                >
                  Journeys designed with a reason to be there.
                </h2>
              </div>

              {/* Large artistic watermark Ā */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(6rem, 10vw, 9.5rem)',
                  color: 'rgba(0, 0, 0, 0.05)',
                  fontWeight: 500,
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                Ā
              </div>
            </div>

            {/* Middle Column: 3 Curated Journey Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '1.5rem',
              }}
            >
              {journeys.map((journey) => (
                <div
                  key={journey.id}
                  className="tourin-journey-card"
                  onMouseEnter={() => handlePillEnter('EXPLORE')}
                  onMouseLeave={handlePillLeave}
                  style={{
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.35s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/10',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={journey.image}
                      alt={journey.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        color: '#111111',
                        lineHeight: 1.25,
                        marginBottom: '0.4rem',
                      }}
                    >
                      {journey.title}
                    </h3>

                    <div
                      className="tag-mono"
                      style={{
                        color: '#DE322D',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {journey.duration}
                    </div>

                    <div
                      style={{
                        fontSize: '0.775rem',
                        color: '#777777',
                        marginBottom: '0.85rem',
                      }}
                    >
                      {journey.type}
                    </div>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#555555',
                        lineHeight: 1.55,
                        marginBottom: '1.25rem',
                        flex: 1,
                      }}
                    >
                      {journey.desc}
                    </p>

                    <button
                      onClick={() => setActiveJourney(journey)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: '#DE322D',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        textAlign: 'left',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span>EXPLORE JOURNEY</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Destination Expansion Vertical Tracker */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '1rem',
                borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
                minWidth: '160px',
              }}
              className="destination-tracker-col"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#DE322D',
                    boxShadow: '0 0 8px rgba(222, 50, 45, 0.6)',
                  }}
                />
                <span
                  className="tag-mono"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#DE322D',
                    letterSpacing: '0.08em',
                  }}
                >
                  LADAKH
                </span>
              </div>

              <div
                style={{
                  width: '1px',
                  height: '48px',
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  margin: '0.5rem 0 0.5rem 3.5px',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    marginLeft: '1px',
                  }}
                />
                <span
                  className="tag-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: '#777777',
                    letterSpacing: '0.08em',
                  }}
                >
                  NORTH INDIA
                </span>
              </div>

              <div
                style={{
                  width: '1px',
                  height: '48px',
                  backgroundColor: 'rgba(0, 0, 0, 0.15)',
                  margin: '0.5rem 0 0.5rem 3.5px',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    marginLeft: '1px',
                  }}
                />
                <span
                  className="tag-mono"
                  style={{
                    fontSize: '0.675rem',
                    color: '#999999',
                    letterSpacing: '0.08em',
                    lineHeight: 1.3,
                  }}
                >
                  MORE PLACES
                  <br />
                  WORTH KNOWING
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          10 — SECTION: FINAL CTA ("Come travel differently.")
      ================================================================ */}
      <section
        style={{
          position: 'relative',
          paddingTop: 'clamp(5rem, 9vw, 8.5rem)',
          paddingBottom: 'clamp(5rem, 9vw, 8.5rem)',
          overflow: 'hidden',
          backgroundColor: '#0c0c0e',
          color: '#ffffff',
        }}
      >
        {/* Background Visual: Expedition Vehicle on Mountain Road */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Image
            src="/images/tourin/tourin-3.jpg"
            alt="Tourin 4x4 expedition vehicle driving on dramatic mountain road"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
              opacity: 0.38,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'linear-gradient(to right, rgba(12,12,14,0.92) 0%, rgba(12,12,14,0.7) 50%, rgba(12,12,14,0.92) 100%)',
            }}
          />
        </div>

        <div
          className="padding-global"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2.5rem',
            }}
          >
            {/* Left Headline */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  lineHeight: 1.05,
                  marginBottom: '1rem',
                }}
              >
                Come travel
                <br />
                differently.
              </h2>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                  margin: 0,
                }}
              >
                Explore our Ladakh journeys.
              </p>
            </div>

            {/* Right Buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'flex-start',
              }}
            >
              <a
                href="#curated-journeys"
                className="button-editorial"
                style={{
                  height: '48px',
                  padding: '0 2rem',
                  backgroundColor: '#DE322D',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <span>VIEW LADAKH EXPERIENCES</span>
                <ArrowRight size={14} />
              </a>

              <Link
                href="/contact"
                className="button-editorial"
                style={{
                  height: '48px',
                  padding: '0 2rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.65)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.65)';
                }}
              >
                <span>TALK TO US ABOUT A JOURNEY</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          11 — PRE-FOOTER TOURIN IDENTITY & FOOTER
      ================================================================ */}
      <footer
        style={{
          backgroundColor: '#0a0a0c',
          color: '#ffffff',
          paddingTop: 'clamp(4rem, 6vw, 6rem)',
          paddingBottom: 'clamp(2rem, 4vw, 3rem)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          {/* Main Footer Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              paddingBottom: '3.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Column 1: TOURIN Brand Identity */}
            <div style={{ gridColumn: 'span 1' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  marginBottom: '0.75rem',
                }}
              >
                TOURIN
              </div>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: '220px',
                }}
              >
                Experiential travel,
                <br />
                beginning with Ladakh.
              </p>
            </div>

            {/* Column 2: ĀROHANA Nav */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                ĀROHANA
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                  fontSize: '0.825rem',
                }}
              >
                {[
                  { label: 'Studio', href: '/about' },
                  { label: 'Work', href: '/work' },
                  { label: 'Services', href: '/services' },
                  { label: 'Tourin', href: '/tourin' },
                  { label: 'Army Projects', href: '/indian-army-projects' },
                  { label: 'Contact', href: '/contact' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      color: item.label === 'Tourin' ? '#DE322D' : 'rgba(255, 255, 255, 0.75)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        item.label === 'Tourin' ? '#DE322D' : 'rgba(255, 255, 255, 0.75)')
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: OFFICE */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                OFFICE
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.825rem',
                  lineHeight: 1.6,
                }}
              >
                <div style={{ color: '#ffffff', fontWeight: 500, marginBottom: '0.25rem' }}>
                  ĀROHANA Consultancy
                </div>
                <div>30, Goodwill Square, Aundh-Ravet BRTS Rd,</div>
                <div style={{ marginBottom: '0.75rem' }}>Near D Mart, Thergaon, Pune 411033, India.</div>

                <div>
                  <a
                    href="mailto:founder@byarohana.com"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '0.2rem',
                    }}
                  >
                    founder@byarohana.com
                  </a>
                  <a
                    href="tel:+918380092241"
                    style={{
                      color: 'rgba(255, 255, 255, 0.75)',
                      textDecoration: 'none',
                    }}
                  >
                    +91 83800 92241
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: SOCIAL */}
            <div>
              <div
                className="tag-mono"
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                SOCIAL
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                  fontSize: '0.825rem',
                }}
              >
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com' },
                  { label: 'Instagram', href: 'https://instagram.com' },
                  { label: 'Behance', href: 'https://behance.net' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'rgba(255, 255, 255, 0.75)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div
            style={{
              paddingTop: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              color: 'rgba(255, 255, 255, 0.45)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div>© 2025 ĀROHANA Consultancy. All Rights Reserved.</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Pune • Ladakh • Pan-India Engagements
            </div>
          </div>
        </div>
      </footer>

      {/* ================================================================
          DETAILED ITINERARY MODAL (Accessible on clicking any Journey Card)
      ================================================================ */}
      {activeJourney && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 2.5rem)',
          }}
          onClick={() => setActiveJourney(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.3)',
            }}
          >
            <button
              onClick={() => setActiveJourney(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#f2f2f0',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#111',
              }}
            >
              <X size={20} />
            </button>

            <div
              className="tag-mono"
              style={{ color: '#DE322D', marginBottom: '0.5rem', fontWeight: 600 }}
            >
              {activeJourney.duration} · {activeJourney.elevation}
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                fontWeight: 500,
                color: '#111',
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              {activeJourney.title}
            </h2>

            <p
              style={{
                fontSize: '1rem',
                color: '#555',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
              }}
            >
              {activeJourney.desc}
            </p>

            {/* Highlights */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.725rem',
                  color: '#888',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Key Experiences & Inclusions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeJourney.highlights.map((hl, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#333',
                    }}
                  >
                    <CheckCircle2 size={16} color="#DE322D" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phases */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.725rem',
                  color: '#888',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Itinerary Flow
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {activeJourney.phases.map((ph, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.1rem 1.25rem',
                      borderRadius: '14px',
                      backgroundColor: '#fafaf8',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: '#DE322D',
                        fontWeight: 700,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {ph.phase} · {ph.title}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>
                      {ph.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#777', maxWidth: '420px' }}>
                Every Tourin journey is completely customized around your preferred dates and pacing.
              </div>

              <Link
                href="/contact"
                className="button-editorial"
                style={{
                  height: '46px',
                  padding: '0 1.75rem',
                  backgroundColor: '#DE322D',
                  color: '#fff',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <span>TALK TO US ABOUT THIS TRIP</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Responsive media query adjustments */}
      <style jsx>{`
        @media (max-width: 991px) {
          .journeys-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .destination-tracker-col {
            flex-direction: row !important;
            border-left: none !important;
            border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
            padding-left: 0 !important;
            padding-top: 1.5rem !important;
            justify-content: space-between !important;
          }
          .destination-tracker-col > div[style*='width: 1px'] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
