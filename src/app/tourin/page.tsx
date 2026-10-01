'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import {
  ArrowRight,
  ArrowLeft,
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
  const { content } = useCmsContent();
  const tourinCms = content.tourin || {};

  const hero = tourinCms.hero || {
    enabled: true,
    eyebrow: 'OWNED EXPERIENTIAL TRAVEL BRAND',
    eyebrowEnabled: true,
    headline: 'Travel\nbeyond\nthe itinerary.',
    headlineEnabled: true,
    quote: 'Some places are better experienced when you stop trying to see everything.',
    quoteEnabled: true,
    description: 'Tourin creates experiential journeys for travellers who want more than a checklist of sights — beginning with Ladakh, and beyond.',
    descriptionEnabled: true,
    season: 'May to October Active Windows',
  };

  // Section 01 image composition: Image 1 (large) + Image 2 & Image 3 (equal, stacked)
  const heroImage1 = hero.image1 || {
    src: '/images/tourin/tourin-hero.jpg',
    alt: 'High altitude mountain landscape in Ladakh',
    enabled: true,
  };
  const heroImage2 = hero.image2 || {
    src: '/images/tourin/dest-ladakh.jpg',
    alt: 'Pristine alpine landscape with turquoise lake',
    enabled: true,
  };
  const heroImage3 = hero.image3 || {
    src: '/images/tourin/tourin-3.jpg',
    alt: 'High mountain pass and valley in Ladakh',
    enabled: true,
  };

  const genesis = tourinCms.genesis || {
    tag: '',
    heading: 'Why Tourin.',
    p1: 'Tourin came from a simple realisation: the places people experience and the places most itineraries sell are not always the same.',
    p2: 'There are the famous sights and photographs. And then there is the place behind them — its people, food, stories, homes, landscapes, silences and everyday life.',
    p3: 'Tourin was created to make space for the second one.',
    storyLinkText: 'OUR STORY',
  };

  const philosophy = tourinCms.philosophy || {
    tag: 'OUR PHILOSOPHY',
    heading: 'What we believe.',
    p1: 'A good trip should leave you with more than photographs. It should give you a sense of where you were.',
    p2: 'That can mean eating something you have never tried, spending time with a local family, understanding a tradition, staying somewhere connected to its surroundings, taking a slower route, or simply having enough time to notice the place instead of rushing through it.',
    p3: 'We are interested in travel that feels personal, considered and rooted — not travel that is simply packed with more stops.',
    quote: 'Travel should not merely fill your calendar; it should reshape how you observe the earth.',
  };

  const destination = tourinCms.destination || {
    tag: 'THE DESTINATION',
    heading: 'Where we go.',
    primary:
      'Ladakh is our home ground and primary destination — where our roots, local relationships, and deep operational presence allow us to craft truly authentic, slow-paced journeys.',
    upcoming: 'We will be adding more places (coming soon) as new journeys and routes are finalized.',
  };

  const journeysTaken = tourinCms.journeysTaken || {
    tag: 'PROOF THAT IT WORKS',
    heading: 'Journeys already taken.',
    p1: 'Tourin has successfully guided private cultural journeys, intimate escapes, and bespoke high-altitude expeditions across Ladakh\'s most remote valleys and mountain passes.',
    p2: 'Proven on high-altitude routes with trusted local relationships, tailored medical acclimatisation, and zero-compromise logistical care.',
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pillPos = useRef({ x: 0, y: 0 });
  const [pillLabel, setPillLabel] = useState('EXPLORE');

  // Active Traveller item (0 to 4)
  const [activeTravellerIndex, setActiveTravellerIndex] = useState<number>(0);

  // Active Journey for Itinerary Modal
  const [activeJourney, setActiveJourney] = useState<JourneyItem | null>(null);

  // Toggle for View More Destinations
  const [showAllPlaces, setShowAllPlaces] = useState<boolean>(false);

  const defaultPlaces = [
    {
      id: 'ladakh',
      name: 'LADAKH',
      status: 'Active',
      subtitle: 'High Passes, Starlit Deserts & Living Monasteries',
      regions: 'Nubra · Sham Valley · Hanle Dark Sky · Zanskar',
      image: '/images/tourin/dest-ladakh.jpg',
    },
    {
      id: 'more-places',
      name: 'ADDING MORE PLACES',
      status: 'Coming Soon',
      subtitle: 'New Routes & Untouched Terrains',
      regions: 'Carefully scouting new regions with local hosts and unhurried pacing.',
      image: '/images/tourin/dest-more-places.jpg',
      isComingSoon: true,
    },
  ];

  const destinationPlaces = (destination.places && destination.places.length > 0)
    ? destination.places
    : defaultPlaces;

  const journeysScrollRef = useRef<HTMLDivElement>(null);

  const scrollJourneys = (direction: 'left' | 'right') => {
    if (journeysScrollRef.current) {
      const scrollAmount = 380;
      journeysScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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
    { src: '/images/tourin/tourin-hero.jpg', alt: 'Hikers walking on mountain trail' },
    { src: '/images/tourin/tourin-campfire.jpg', alt: 'Campfire and night gathering' },
    { src: '/images/tourin/tourin-gallery-6.jpg', alt: 'Group expedition team in high Himalayas' },
    { src: '/images/tourin/tourin-lake-deck.jpg', alt: 'Wooden viewpoint terrace overlooking alpine lake' },
    { src: '/images/tourin/tourin-lantern-street.jpg', alt: 'Historic Asian street with hanging lanterns' },
    { src: '/images/tourin/santorini-sunset.jpg', alt: 'Coastal cliffside town over the blue sea' },
  ];

  const defaultJourneys: JourneyItem[] = [
    {
      id: 'slow-ladakh',
      title: 'The Slow Ladakh Odyssey',
      duration: '8 Days / 7 Nights',
      type: 'Cultural Immersion & Slow Exploration',
      desc: 'Apricot valley heritage stays, 11th-century monastic fresco libraries, and unhurried Indus trails.',
      image: '/images/tourin/dest-ladakh.jpg',
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
      id: 'hanle-dark-sky',
      title: 'Silent Frontiers: Hanle & High Lakes',
      duration: '8 Days / 7 Nights',
      type: 'Nomadic Grasslands & Dark Sky Sanctuaries',
      desc: 'Stargazing at India’s premier Dark Sky Reserve, secluded turquoise lake shores, and Changpa nomadic pastoralists.',
      image: '/images/tourin/tourin-2.jpg',
      elevation: '13,500 — 14,764 FT',
      highlights: [
        'Night-sky astronomy and telescope stargazing in the Hanle Dark Sky Reserve',
        'Warm encounters with Changpa Pashmina nomadic herders on high plateaus',
        'Private lakeside eco-camps on secluded meadow shores away from crowds',
      ],
      phases: [
        { phase: 'Days 1–3', title: 'Leh Acclimatisation & Indus Valley', description: 'Calibrated ascent, monastery libraries, and medical briefing.' },
        { phase: 'Days 4–5', title: 'Hanle Dark Sky Sanctuary (14,764 FT)', description: 'Observatory night skies and high-altitude grassland silence.' },
        { phase: 'Days 6–8', title: 'Pangong Tso & Pastoral Plains', description: 'Secluded turquoise lake shores and nomadic pastoral encounters.' },
      ],
    },
    {
      id: 'zanskar-traverse',
      title: 'The Ancient Kingdom: Zanskar Traverse',
      duration: '9 Days / 8 Nights',
      type: 'Expedition Traverse & Living Faith',
      desc: 'Cliffside rock-hewn cave monasteries, glacial river canyons, and traditional Zanskari guest lodges.',
      image: '/images/tourin/tourin-3.jpg',
      elevation: '11,000 — 14,500 FT',
      highlights: [
        'Hike to the legendary cliff-embedded cave monastery of Phugtal Gompa',
        'Dramatic vistas of the twin glacial peaks of Mount Nun and Mount Kun',
        'Stays in family-run Zanskari guest lodges with warm wood-stove hospitality',
      ],
      phases: [
        { phase: 'Days 1–2', title: 'Suru Valley & Nun-Kun Glacier Views', description: 'Traversing lush green valleys towards glacial peaks.' },
        { phase: 'Days 3–6', title: 'Heart of Zanskar & Phugtal Cave Monastery', description: 'Hike to the cliffside monastery of Phugtal and Karsha Gompa.' },
        { phase: 'Days 7–9', title: 'Padum Fortress Ruins & High Pass Return', description: 'Ancient palace ruins, local feast, and return traverse.' },
      ],
    },
  ];

  const journeys: JourneyItem[] = (tourinCms.journeys && tourinCms.journeys.length > 0)
    ? tourinCms.journeys
        .filter((j: any) => j.published !== false)
        .map((j: any) => {
          const matched = defaultJourneys.find((dj) => dj.id === j.id);
          return {
            id: j.id,
            title: j.title || matched?.title || 'Curated Expedition',
            duration: j.duration || matched?.duration || '7 Days',
            type: j.type || matched?.type || 'Cultural & Landscape Immersion',
            desc: j.desc || j.overview || matched?.desc || '',
            image: j.image || matched?.image || '/images/tourin/dest-ladakh.jpg',
            elevation: j.elevation || matched?.elevation || 'Various',
            highlights: matched?.highlights || [
              'Curated offbeat destinations away from typical tourist circuits',
              'Authentic local food experiences and community interactions',
              'Thoughtful pacing with time for personal exploration',
            ],
            phases: matched?.phases || [
              { phase: 'Phase 1', title: 'Arrival & Immersion', description: 'Settle in, explore the neighbourhood, meet local hosts.' },
              { phase: 'Phase 2', title: 'Deep Exploration', description: 'Off-the-beaten-path trails, cultural sites, and community connections.' },
              { phase: 'Phase 3', title: 'Farewell & Return', description: 'Storytelling evenings, reflection, and comfortable departure.' },
            ],
          };
        })
    : defaultJourneys;

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
        className="tourin-cursor-pill"
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
          borderRadius: '3px',
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
          01 — SECTION 01: HERO EDITORIAL GRID & STORYTELLING
              (Admin CRM controllable: master enable + per-field enable/disable)
      ================================================================ */}
      {hero.enabled !== false && (
      <section
        className="tourin-hero-editorial-section"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#f8f8f9',
          color: '#111111',
          paddingTop: 'clamp(100px, 13vh, 128px)',
          paddingBottom: 'clamp(48px, 7vh, 72px)',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          className="padding-global"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div className="tourin-editorial-grid">
            {/* ── LEFT COLUMN: Storytelling, Headline, Copy & CTAs ── */}
            <div className="tourin-col-left">
              {/* Eyebrow */}
              {hero.eyebrowEnabled !== false && hero.eyebrow && (
                <div className="tourin-tag-eyebrow">{hero.eyebrow}</div>
              )}

              {/* Main Headline */}
              {hero.headlineEnabled !== false && hero.headline && (
                <h1 className="tourin-editorial-headline" style={{ whiteSpace: 'pre-line' }}>
                  {hero.headline?.includes('itinerary') ? (
                    <>
                      Travel
                      <br />
                      beyond
                      <br />
                      the itinerary<span className="tourin-red-dot">.</span>
                    </>
                  ) : (
                    hero.headline
                  )}
                </h1>
              )}

              {/* Sub-quote */}
              {hero.quoteEnabled !== false && hero.quote && (
                <p className="tourin-quote-text">{hero.quote}</p>
              )}

              {/* Description Body */}
              {hero.descriptionEnabled !== false && hero.description && (
                <p className="tourin-desc-text">{hero.description}</p>
              )}


              {/* Action Buttons Row */}
              <div className="tourin-action-buttons">
                <Link href="/contact" className="tourin-secondary-pill" style={{ backgroundColor: '#111113', color: '#ffffff' }}>
                  <span>Talk to us about a journey</span>
                  <ArrowRight size={15} strokeWidth={2.4} />
                </Link>
              </div>

            </div>

            {/* ── CENTER COLUMN: Image 1 (large / main image) ── */}
            <div className="tourin-col-center">
              {heroImage1.enabled !== false && heroImage1.src && (
                <div className="santorini-feature-card">
                  <Image
                    src={heroImage1.src}
                    alt={heroImage1.alt || 'High altitude mountain landscape in Ladakh'}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="santorini-card-img"
                  />
                  <div className="santorini-vignette-overlay" />
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: Image 2 (upper) + Image 3 (lower) — exactly equal size ── */}
            <div className="tourin-col-right">
              {heroImage2.enabled !== false && heroImage2.src && (
                <div className="tourin-img-slot">
                  <Image
                    src={heroImage2.src}
                    alt={heroImage2.alt || 'Pristine alpine landscape'}
                    fill
                    sizes="(max-width: 1024px) 100vw, 22vw"
                    className="lake-card-img"
                  />
                  <div className="lake-gradient-dim" />
                </div>
              )}
              {heroImage3.enabled !== false && heroImage3.src && (
                <div className="tourin-img-slot">
                  <Image
                    src={heroImage3.src}
                    alt={heroImage3.alt || 'High mountain pass and valley in Ladakh'}
                    fill
                    sizes="(max-width: 1024px) 100vw, 22vw"
                    className="lake-card-img"
                  />
                  <div className="lake-gradient-dim" />
                  <Link href="/contact" className="lake-action-circle" aria-label="Talk to us about a journey">
                    <ArrowRight size={14} strokeWidth={2.4} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </section>
      )}

      {/* ================================================================
           02 — SECTION: 01 • THE GENESIS — Why Tourin.
      ================================================================ */}
      {genesis.enabled !== false && (
      <section
        id="the-genesis"
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
          paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
          backgroundColor: '#fafafb',
          color: '#111111',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          className="padding-global"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Main Wrapper with Timeline + Content */}
          <div className="genesis-main-container">

            {/* ── ROW 1: 01 • THE GENESIS ── */}
            <div className="genesis-row">
              {/* Timeline Indicator Column */}
              <div className="genesis-timeline-col">
                <div className="timeline-badge-wrap">
                  <span className="timeline-dot-red" />
                </div>
                <div className="timeline-connector-line" />
              </div>

              {/* Row 1 Content Grid: Left Text Column + Right Media Gallery */}
              <div className="genesis-row-content">
                <div className="genesis-text-col">
                  {genesis.tagEnabled !== false && genesis.tag ? (
                    <div className="genesis-tag">
                      <span className="tag-red-bullet">•</span>
                      <span>{genesis.tag}</span>
                    </div>
                  ) : null}

                  {genesis.headingEnabled !== false && genesis.heading && (
                    <h2 className="genesis-heading">
                      {genesis.heading}
                    </h2>
                  )}

                  <div className="genesis-paragraphs">
                    {genesis.p1Enabled !== false && genesis.p1 && <p>{genesis.p1}</p>}
                    {genesis.p2Enabled !== false && genesis.p2 && <p>{genesis.p2}</p>}
                    {genesis.p3Enabled !== false && genesis.p3 && <p>{genesis.p3}</p>}
                  </div>
                </div>

                {/* Right Side: Two Image Cards + Vertical Editorial Slogan */}
                <div className="genesis-media-col">
                  {/* Image 1: Lush Terrace Valley */}
                  <div className="genesis-img-card terrace-card">
                    <Image
                      src="/images/tourin/tourin-genesis-terrace.jpg"
                      alt="Lush green stepped rice terraces in mountain valley"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 360px"
                      className="object-cover"
                    />
                  </div>

                  {/* Image 2: Wooden Veranda Balcony */}
                  <div className="genesis-img-card veranda-card">
                    <Image
                      src="/images/tourin/tourin-genesis-veranda.jpg"
                      alt="Rustic wooden veranda overlooking mountain forest"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 240px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>

      </section>
      )}



      {/* ================================================================
           03 — SECTION: 03 • THE DESTINATION — Where we go.
      ================================================================ */}
      {destination.enabled !== false && (
      <section
        id="the-destination"
        style={{
          paddingTop: 'clamp(4rem, 7vw, 6.5rem)',
          paddingBottom: 'clamp(4rem, 7vw, 6.5rem)',
          backgroundColor: '#fafafb',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          {/* Section Row */}
          <div className="tourin-section-row">
            {/* Timeline Col */}
            <div className="genesis-timeline-col">
              <div className="timeline-badge-wrap">
                <span className="timeline-dot-red" />
              </div>
              <div className="timeline-connector-line" />
            </div>

            {/* Content: Left text + Right destination cards grid */}
            <div className="tourin-section-inner dest-section-inner">
              {/* Left Text */}
              <div className="tourin-section-left">
                {destination.tagEnabled !== false && destination.tag && (
                  <div className="genesis-tag">
                    <span className="tag-red-bullet">•</span>
                    <span>{destination.tag}</span>
                  </div>
                )}

                {destination.headingEnabled !== false && destination.heading && (
                  <h2 className="tourin-section-heading">
                    {destination.heading}
                  </h2>
                )}

                <div className="tourin-section-body">
                  {destination.primaryEnabled !== false && destination.primary && (
                    <p>{destination.primary}</p>
                  )}
                  {destination.upcomingEnabled !== false && destination.upcoming && (
                    <p style={{ marginTop: '0.85rem' }}>{destination.upcoming}</p>
                  )}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'flex-start' }}>
                  {/* View More button for destinations */}
                  <button
                    type="button"
                    onClick={() => setShowAllPlaces(!showAllPlaces)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#DE322D',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      marginTop: '0.25rem',
                    }}
                  >
                    <span>{showAllPlaces ? 'View Less Places' : 'View More Places'}</span>
                    <ArrowRight size={13} style={{ transform: showAllPlaces ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>
                </div>
              </div>

              {/* Right: Destination Cards Grid (Ladakh + Adding More Places Coming Soon) */}
              <div style={{ width: '100%' }}>
                <div className="dest-cards-grid">
                  {(showAllPlaces ? destinationPlaces : destinationPlaces.slice(0, 2)).filter((p: any) => p.enabled !== false).map((place: any) => (
                    <div key={place.id} className="dest-card-wrap">
                      <div
                        className="dest-card"
                        style={{
                          height: '310px',
                          position: 'relative',
                          border: place.isComingSoon ? '1px dashed rgba(222, 50, 45, 0.4)' : '1px solid rgba(0,0,0,0.08)',
                          backgroundColor: place.isComingSoon ? '#0f1014' : '#e5e7eb',
                        }}
                      >
                        <Image
                          src={place.image || '/images/tourin/dest-ladakh.jpg'}
                          alt={place.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover dest-card-img"
                          style={{
                            opacity: place.isComingSoon ? 0.35 : 1,
                            filter: place.isComingSoon ? 'grayscale(0.3)' : 'none',
                          }}
                        />
                        <div
                          className="dest-card-overlay"
                          style={{
                            background: place.isComingSoon
                              ? 'linear-gradient(to top, rgba(12, 12, 16, 0.96) 0%, rgba(12, 12, 16, 0.6) 50%, rgba(12, 12, 16, 0.35) 100%)'
                              : 'linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)',
                          }}
                        />

                        {/* Top Badge: Active or Coming Soon */}
                        <div style={{ position: 'absolute', top: '0.9rem', right: '0.9rem', zIndex: 3 }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.28rem 0.65rem',
                              borderRadius: '9999px',
                              fontSize: '0.65rem',
                              fontFamily: 'var(--font-mono)',
                              letterSpacing: '0.1em',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              backgroundColor: place.isComingSoon ? '#DE322D' : 'rgba(0, 0, 0, 0.7)',
                              color: '#FFFFFF',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                            }}
                          >
                            {place.isComingSoon ? 'Coming Soon' : 'Active'}
                          </span>
                        </div>

                        {place.isComingSoon && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '1.25rem',
                              left: '1.25rem',
                              right: '1.25rem',
                              zIndex: 3,
                            }}
                          >
                            <div
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.68rem',
                                color: '#DE322D',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                marginBottom: '0.25rem',
                                textTransform: 'uppercase',
                              }}
                            >
                              Future Destinations
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.18rem',
                                fontWeight: 550,
                                color: '#FFFFFF',
                                lineHeight: 1.2,
                                marginBottom: '0.35rem',
                              }}
                            >
                              Adding More Places
                            </div>
                            <p
                              style={{
                                fontSize: '0.78rem',
                                color: 'rgba(255, 255, 255, 0.75)',
                                lineHeight: 1.45,
                                margin: 0,
                              }}
                            >
                              Scouting unhurried routes, authentic village stays and mountain passes.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="dest-card-meta" style={{ marginTop: '0.65rem' }}>
                        <span className="dest-card-label" style={{ fontSize: '0.88rem' }}>
                          {place.name}
                        </span>
                        <span className="dest-card-sub" style={{ fontSize: '0.82rem' }}>
                          {place.subtitle}
                        </span>
                        {place.regions && (
                          <span style={{ fontSize: '0.75rem', color: '#777', marginTop: '0.15rem' }}>
                            {place.regions}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ================================================================
           UNIFIED MASTER SECTION: PHILOSOPHY, TRAVELLER & EXPERIENCE
           Combined into ONE seamless section as requested
      ================================================================ */}
      {philosophy.enabled !== false && (
      <section
        id="what-we-believe"
        style={{
          paddingTop: 'clamp(4.5rem, 7vw, 6.5rem)',
          paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)',
          backgroundColor: '#fafafb',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div className="tourin-section-row">
            {/* Timeline Col */}
            <div className="genesis-timeline-col">
              <div className="timeline-badge-wrap">
                <span className="timeline-dot-red" />
              </div>
              <div className="timeline-connector-line" />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* 1. MASTER HEADER & PHILOSOPHY */}
              <div style={{ marginBottom: 'clamp(2rem, 3.5vw, 3rem)' }}>
                {philosophy.tagEnabled !== false && philosophy.tag && (
                  <div className="genesis-tag">
                    <span className="tag-red-bullet">•</span>
                    <span>{philosophy.tag}</span>
                  </div>
                )}
                {philosophy.headingEnabled !== false && philosophy.heading && (
                  <h2 className="genesis-heading">
                    {philosophy.heading}
                  </h2>
                )}
              </div>

          {/* Core Philosophy Narrative & Quote Grid */}
          <div
            className="genesis-row-content"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4.5rem)',
              alignItems: 'center',
              marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
            }}
          >
            <div className="genesis-text-col">
              <div className="genesis-paragraphs">
                {philosophy.p1Enabled !== false && philosophy.p1 && <p>{philosophy.p1}</p>}
                {philosophy.p2Enabled !== false && philosophy.p2 && <p>{philosophy.p2}</p>}
                {philosophy.p3Enabled !== false && philosophy.p3 && <p>{philosophy.p3}</p>}
              </div>
            </div>

            {/* The Stylized Quote Block */}
            {philosophy.quoteEnabled !== false && philosophy.quote && (
              <div className="genesis-quote-col">
                <div className="quote-watermark-ring" />
                <div className="quote-mark">“</div>
                <blockquote className="quote-statement" style={{ whiteSpace: 'pre-line' }}>
                  {philosophy.quote}
                </blockquote>
                <p className="quote-attribution">
                  It is about what you have time to notice.
                </p>
              </div>
            )}
          </div>

          {/* 2. THE TRAVELLER (Who Tourin is for) */}
          <div
            style={{
              paddingTop: 'clamp(2.5rem, 4vw, 3.5rem)',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="tag-mono" style={{ fontSize: '0.68rem', color: '#DE322D', fontWeight: 700, letterSpacing: '0.14em' }}>
                WHO THIS IS FOR
              </span>
              <h3 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.75rem)', fontWeight: 650, letterSpacing: '-0.02em', color: '#111113', marginTop: '0.35rem' }}>
                Travel designed for those who value depth over checklists.
              </h3>
            </div>

            <div className="tourin-section-inner traveller-section-inner">
              {/* Left: Traveller criteria list */}
              <div className="tourin-section-left">
                <div className="traveller-list">
                  {travellerItems.map((item, idx) => {
                    const isActive = idx === activeTravellerIndex;
                    return (
                      <div
                        key={item.num}
                        onClick={() => setActiveTravellerIndex(idx)}
                        className={`traveller-row${isActive ? ' traveller-row--active' : ''}`}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: isActive ? '#DE322D' : 'rgba(0, 0, 0, 0.25)',
                            flexShrink: 0,
                            marginTop: '0.55rem',
                          }}
                        />
                        <p className="traveller-row-text">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Atmospheric Photo without script overlay */}
              <div className="traveller-photo-wrap">
                <div className="traveller-photo-card">
                  <Image
                    src={travellerItems[activeTravellerIndex].image}
                    alt={travellerItems[activeTravellerIndex].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                    className="object-cover traveller-photo-img"
                  />
                  <div className="traveller-photo-overlay" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. THE 5 PILLARS (More than just a trip) */}
          <div
            style={{
              paddingTop: 'clamp(2.5rem, 4vw, 3.5rem)',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="tag-mono" style={{ fontSize: '0.68rem', color: '#DE322D', fontWeight: 700, letterSpacing: '0.14em' }}>
                THE EXPERIENCE PILLARS
              </span>
              <h3 style={{ fontSize: 'clamp(1.35rem, 2vw, 1.75rem)', fontWeight: 650, letterSpacing: '-0.02em', color: '#111113', marginTop: '0.35rem', marginBottom: '0.5rem' }}>
                More than just a trip — every detail chosen with purpose.
              </h3>
              <p style={{ maxWidth: '640px', color: '#555558', fontSize: '0.96rem', lineHeight: 1.65 }}>
                Tourin&apos;s journeys bring together carefully chosen stays, local experiences, food, culture, landscapes and practical planning that makes travel work. Each element should have a reason to be there.
              </p>
            </div>

            {/* 5 experience category image cards */}
            <div className="exp-grid">
              {experiencePillars.map((pillar) => (
                <div key={pillar.label} className="exp-card-wrap">
                  <div className="exp-card">
                    <Image
                      src={pillar.image}
                      alt={pillar.alt}
                      fill
                      sizes="(max-width: 768px) 40vw, (max-width: 1200px) 18vw, 200px"
                      className="object-cover exp-card-img"
                    />
                    <div className="exp-card-overlay" />
                  </div>
                  <span className="exp-card-label">{pillar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      )}

      {/* ================================================================
           06 — EXPERIENCE MARQUEE (Continuous Horizontal Ticker)
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
            {/* Group 2 */}
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
           06 — SECTION: PROOF THAT IT WORKS — Journeys already taken.
      ================================================================ */}
      {journeysTaken.enabled !== false && (
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
          <div className="tourin-section-row">
            {/* Timeline Col */}
            <div className="genesis-timeline-col">
              <div className="timeline-badge-wrap">
                <span className="timeline-dot-red" />
              </div>
              <div className="timeline-connector-line" />
            </div>

            {/* Content */}
            <div className="proof-content-grid">
              {/* Left: Text */}
              <div>
                {journeysTaken.tagEnabled !== false && journeysTaken.tag && (
                  <div className="genesis-tag">
                    <span className="tag-red-bullet">•</span>
                    <span>{journeysTaken.tag}</span>
                  </div>
                )}

                {journeysTaken.headingEnabled !== false && journeysTaken.heading && (
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                      fontWeight: 500,
                      letterSpacing: '-0.03em',
                      color: '#111111',
                      lineHeight: 1.12,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {journeysTaken.heading}
                  </h2>
                )}

                <div style={{ maxWidth: '380px', marginTop: '1.25rem' }}>
                  {journeysTaken.p1Enabled !== false && journeysTaken.p1 && (
                    <p
                      style={{
                        fontSize: '0.98rem',
                        color: '#444444',
                        lineHeight: 1.7,
                        marginBottom: '0.85rem',
                        fontWeight: 450,
                      }}
                    >
                      {journeysTaken.p1}
                    </p>
                  )}
                  {journeysTaken.p2Enabled !== false && journeysTaken.p2 && (
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#777777',
                        lineHeight: 1.65,
                      }}
                    >
                      {journeysTaken.p2}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: 3-Column Photo Grid (responsive 2-col on mobile) */}
              <div className="proof-photo-grid">
                {proofCollage.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/11',
                      borderRadius: '6px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      overflow: 'hidden',
                      backgroundColor: '#eee',
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 33vw, 220px"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ================================================================
           07 — SECTION: CURATED JOURNEYS
      ================================================================ */}
      {tourinCms.journeysEnabled !== false && journeys.length > 0 && (
      <section
        id="curated-journeys"
        style={{
          paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
          paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
          backgroundColor: '#ffffff',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          className="padding-global"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div className="tourin-section-row">
            {/* Timeline Col */}
            <div className="genesis-timeline-col">
              <div className="timeline-badge-wrap">
                <span className="timeline-num-badge">05</span>
                <span className="timeline-dot-red" />
              </div>
              <div className="timeline-connector-line" />
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Header Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  marginBottom: '2.5rem',
                }}
              >
                <div>
                  <div className="genesis-tag">
                    <span className="timeline-mobile-badge">05</span>
                    <span className="tag-red-bullet">•</span>
                    <span>CURATED JOURNEYS</span>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                      fontWeight: 500,
                      letterSpacing: '-0.03em',
                      color: '#111111',
                      lineHeight: 1.12,
                      margin: 0,
                    }}
                  >
                    Journeys designed with a reason.
                  </h2>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                  }}
                >
                  <Link
                    href="/tourin#curated-journeys"
                    className="genesis-story-link"
                    style={{ margin: 0 }}
                  >
                    <span>VIEW ALL JOURNEYS</span>
                    <ArrowUpRight size={15} strokeWidth={2.4} />
                  </Link>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => scrollJourneys('left')}
                      aria-label="Previous journey"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#111111',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#111111';
                        e.currentTarget.style.backgroundColor = '#f7f7f7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={() => scrollJourneys('right')}
                      aria-label="Next journey"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#111111',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#111111';
                        e.currentTarget.style.backgroundColor = '#f7f7f7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Curated Journeys: 1 Active Journey + Adding More Places Coming Soon Card */}
              <div
                ref={journeysScrollRef}
                className="curated-cards-grid"
              >
                {/* Published Curated Journeys */}
                {journeys.map((journey) => (
                  <div
                    key={journey.id}
                    className="tourin-journey-card"
                    onClick={() => setActiveJourney(journey)}
                    onMouseEnter={() => handlePillEnter('EXPLORE')}
                    onMouseLeave={handlePillLeave}
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                  >
                    {/* Top Image */}
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
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.66rem',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.08em',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            color: '#FFFFFF',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          Curated Expedition
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div
                      style={{
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.35rem',
                          fontWeight: 500,
                          color: '#111111',
                          lineHeight: 1.2,
                          marginBottom: '0.35rem',
                        }}
                      >
                        {journey.title}
                      </h3>

                      <div
                        style={{
                          fontSize: '0.85rem',
                          color: '#777777',
                          marginBottom: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        {journey.duration} · {journey.elevation || '11,500 FT'}
                      </div>

                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: '#555555',
                          lineHeight: 1.6,
                          marginBottom: '1.5rem',
                          flex: 1,
                        }}
                      >
                        {journey.desc}
                      </p>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#111111',
                        }}
                      >
                        <span>Explore Journey</span>
                        <ArrowUpRight size={15} />
                      </div>
                    </div>
                  </div>
                ))}

                {/* 2. Adding More Places / Coming Soon Card */}
                <div
                  className="tourin-journey-card"
                  style={{
                    borderRadius: '16px',
                    backgroundColor: '#0d0e12',
                    border: '1px dashed rgba(222, 50, 45, 0.4)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Top Image with Atmospheric Wash */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/10',
                      overflow: 'hidden',
                      backgroundColor: '#16171d',
                    }}
                  >
                    <Image
                      src="/images/tourin/tourin-hero.jpg"
                      alt="Adding More Places"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: 'cover',
                        opacity: 0.32,
                        filter: 'grayscale(0.4)',
                        transition: 'transform 0.6s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, #0d0e12 0%, rgba(13, 14, 18, 0.6) 60%, rgba(13, 14, 18, 0.3) 100%)',
                      }}
                    />

                    {/* Coming Soon Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        zIndex: 2,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.28rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.1em',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          backgroundColor: '#DE322D',
                          color: '#FFFFFF',
                          boxShadow: '0 2px 10px rgba(222, 50, 45, 0.35)',
                        }}
                      >
                        Coming Soon
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div
                    style={{
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      color: '#ffffff',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#DE322D',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        marginBottom: '0.35rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      UPCOMING ITINERARIES
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        fontWeight: 500,
                        color: '#ffffff',
                        lineHeight: 1.2,
                        marginBottom: '0.35rem',
                      }}
                    >
                      Adding More Places
                    </h3>

                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255, 255, 255, 0.55)',
                        marginBottom: '0.85rem',
                        fontWeight: 450,
                      }}
                    >
                      New Itineraries &amp; Routes in Preparation
                    </div>

                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.72)',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                        flex: 1,
                      }}
                    >
                      We are scouting and designing new slow-travel routes across untouched valleys and remote mountain communities. New curated journeys will be announced soon.
                    </p>

                    <Link
                      href="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#DE322D',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      <span>Inquire about upcoming journeys</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ================================================================
           07 — SECTION: OPERATIONAL READINESS STATS
      ================================================================ */}
      {tourinCms.statsEnabled !== false && (tourinCms.stats || []).filter((s: any) => s.enabled !== false && (s.value || s.label)).length > 0 && (
        <section
          style={{
            padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
            backgroundColor: '#fafafb',
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          <div className="padding-global" style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {(tourinCms.stats || []).filter((s: any) => s.enabled !== false && (s.value || s.label)).map((stat: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.75rem',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#DE322D',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#555558', fontWeight: 550, lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
           08 — SECTION: CTA BANNER ("Come travel differently.")
      ================================================================ */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0a1017',
          color: '#ffffff',
          padding: 'clamp(4.5rem, 7vw, 7rem) 0',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background Panoramic Photo */}
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
            src="/images/tourin/tourin-lake-deck.jpg"
            alt="Traveller looking out over high altitude landscape"
            fill
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
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
                'linear-gradient(to right, rgba(16, 28, 40, 0.94) 0%, rgba(16, 28, 40, 0.82) 45%, rgba(16, 28, 40, 0.35) 80%, rgba(16, 28, 40, 0.5) 100%)',
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
          {/* Top Location Tabs */}
          <div className="cta-location-tabs">
            <span>LADAKH</span>
            <span>NORTH INDIA</span>
            <span>MORE PLACES WORTH KNOWING</span>
          </div>

          <div className="cta-content-row">
            {/* Left Headline & Buttons */}
            <div style={{ maxWidth: '620px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                Come travel differently.
              </h2>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                  marginBottom: '2.5rem',
                  lineHeight: 1.6,
                }}
              >
                Custom journeys designed around character, culture, and high-altitude quietude.
              </p>

              <div className="cta-action-buttons">
                <Link
                  href="/contact"
                  style={{
                    height: '48px',
                    padding: '0 2rem',
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontSize: '0.88rem',
                    fontWeight: 550,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
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
                  <span>Talk to us about a journey</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ================================================================
          DETAILED ITINERARY MODAL (Accessible on clicking any Journey Card)
      ================================================================ */}
      {activeJourney && (
        <div
          className="tourin-modal-backdrop"
          onClick={() => setActiveJourney(null)}
        >
          <div
            className="tourin-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveJourney(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '38px',
                height: '38px',
                borderRadius: '4px',
                backgroundColor: '#f2f2f0',
                border: '1px solid rgba(0, 0, 0, 0.08)',
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
                      borderRadius: '4px',
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
              className="tourin-modal-footer"
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
                  height: '48px',
                  padding: '0 1.85rem',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  borderRadius: '4px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                }}
              >
                <span>Talk to us about this trip</span>
                <ArrowRight size={16} color="#ffffff" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
