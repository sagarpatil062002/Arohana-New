'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import {
  Shield,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ChevronRight,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Assignments', count: '06' },
  { id: 'western-command', label: 'HQ Western Command', count: '02' },
  { id: '14-corps', label: '14 Corps & High Altitude', count: '02' },
  { id: 'border-initiatives', label: 'Border Initiatives', count: '02' },
];

const SPREAD_PAGES = [
  { id: '01', image: '/images/army/vibrant-villages-1.jpg', alt: 'High Altitude Ladakh Plateau' },
  { id: '02', image: '/images/army/69armoured-2.jpg', alt: 'Armoured Formation in Alpine Desert' },
  { id: '03', image: '/images/army/rezang-la-2.jpg', alt: 'Memorial Archival Photography' },
  { id: '04', image: '/images/army/sampark-1.jpg', alt: 'High Altitude Highway Infrastructure' },
];

export default function IndianArmyProjectsPage() {
  const { content } = useCmsContent();
  const armyCms = content['army-projects'] || {};
  const hero = armyCms.hero || {
    eyebrow: 'Defence & Institutional Production',
    title: 'Stories of service',
    description: 'On-location film direction, ceremonial protocol documentation, and high-altitude field production conducted directly with Army formations and institutional headquarters.',
    scrollLabel: 'Scroll to explore',
  };
  const disclaimerText = armyCms.disclaimer || 'Institutional Integrity: All presented Indian Army project materials represent verified shoot direction, post-production and communication assignments executed under authorized institutional protocols. No confidential operational details are disclosed.';
  const projectsList = armyCms.projects || [];
  const closingBanner = armyCms.closingBanner || {
    eyebrow: 'PEOPLE · PLACES · SACRIFICE · A STRONGER TOMORROW',
    heading: 'Documenting\na stronger tomorrow',
    description: 'Whether covering an investiture, archiving veteran history, or filming at 16,000 feet, Ārohana brings reverence, discipline, and visual depth to institutional defence communication.',
    buttonText: "Let's Discuss a Project",
    buttonUrl: '/contact',
    image: '/images/army/symbolic-army-terrain.jpg',
  };

  const p1 = projectsList.find((p: any) => p.id === 'western-command-investiture') || projectsList[0] || {
    id: 'western-command-investiture',
    num: '01',
    command: 'WESTERN COMMAND',
    location: 'HQ Western Command Theatre',
    date: 'February 2026',
    title: 'Investiture Ceremony',
    subtitle: 'Ceremonial protocol shoot and documentary post-production.',
    description: 'Ārohana handled the shoot and post-production for the Western Command Investiture Ceremony in February 2026.',
    scopeOfWork: 'Coverage of formal investiture protocols, honors and awards distribution, parade sequences.',
    creativeApproach: 'Restrained, dignified visual pacing tailored to military protocol and ceremonial integrity.',
    productionDiscipline: 'Tight turnaround master post-production with multi-track sound engineering and high-definition mastering.',
    image: '/images/army/western-command-1.jpg',
    sidePhotos: [
      '/images/army/western-command-official.jpg',
      '/images/army/western-command-2.jpg',
    ],
    category: 'western-command',
    published: true,
  };

  const p2 = projectsList.find((p: any) => p.id === '14-corps-communication') || projectsList[1] || {
    id: '14-corps-communication',
    num: '02',
    command: '14 CORPS HEADQUARTERS',
    location: 'Leh & Indus Valley, Ladakh',
    date: '2023 – Present',
    title: 'Communication & Production',
    subtitle: 'High-altitude visual communication, films and archival design.',
    description: 'Ārohana has undertaken communication, design and visual production work for 14 Corps Headquarters, including visual communication and films developed through scripting, voice-over, editing and sound.',
    scopeOfWork: 'Institutional communications campaign, internal and public-facing visual communication, and photo documentation.',
    creativeApproach: 'Authentic high-altitude cinematography paired with authoritative scripting and professional narration.',
    productionDiscipline: 'Field filming in sub-zero and remote mountain environments requiring specialised equipment and acclimatised crews.',
    image: '/images/army/14corps-hall-of-fame.jpg',
    sidePhotos: [
      '/images/army/adgpi-firstvillages.jpg',
      '/images/army/14corps-ladakh-ops.jpg',
      '/images/army/firefury-changthang-health.jpg',
    ],
    category: '14-corps',
    published: true,
  };

  const p3 = projectsList.find((p: any) => p.id === 'corps-publications') || projectsList[2] || {
    id: 'corps-publications',
    num: '03',
    command: 'FIRE & FURY CORPS',
    location: 'Ladakh Theatre',
    date: 'Multi-Year Engagements',
    title: 'Corps-Level Communication & Publications',
    subtitle: 'XIV Corps communication, publications and community initiatives.',
    description: 'Fire & Fury Corps is the designation associated with XIV Corps. Ārohana has undertaken project work across communication, publications, photo documentation and community-facing initiatives.',
    scopeOfWork: 'Spans historical commemorative literature, community welfare communication, and visual documentation.',
    creativeApproach: 'Balancing historical gravitas with contemporary digital readability across diverse audiences.',
    productionDiscipline: 'Seamless integration between on-ground research, military history curation, and modern typography.',
    image: '/images/army/firefury-corps-hq.jpg',
    sidePhotos: [
      '/images/army/fire-fury-1.jpg',
      '/images/army/firefury-kargil-memorial.jpg',
      '/images/army/wangchuk-army-friendship.jpg',
      '/images/army/firefury-veterans.jpg',
    ],
    category: '14-corps',
    published: true,
  };

  const p4 = projectsList.find((p: any) => p.id === 'rezang-la-memorial') || projectsList[3] || {
    id: 'rezang-la-memorial',
    num: '04',
    command: 'FIRE & FURY CORPS',
    location: 'Chushul Sector, Ladakh (16,000+ ft)',
    date: 'Commemorative Edition',
    title: 'Rezang La War Memorial',
    subtitle: 'Commemorative coffee-table book design and visual communication.',
    description: 'Coffee-table book design and visual communication for the Rezang La War Memorial.',
    scopeOfWork: 'Complete publication design including hardbound cover architecture, typographic systems, and archival photo restoration.',
    creativeApproach: 'Subtle, dignified layout allowing historical accounts and veteran testimonies to stand out with gravitas.',
    productionDiscipline: 'High-specification tactile print finishing, custom clothbound styling, and museum-grade archival reproduction.',
    image: '/images/army/rezang-la-1.jpg',
    sidePhotos: [
      '/images/army/rezangla-tribute.jpg',
      '/images/army/rezang-la-2.jpg',
    ],
    category: 'border-initiatives',
    published: true,
  };

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSpreadPage, setActiveSpreadPage] = useState('01');

  const currentSpread = SPREAD_PAGES.find((p) => p.id === activeSpreadPage) || SPREAD_PAGES[0];

  return (
    <div className="army-page-wrapper">
      {/* ==========================================================================
          1. HERO SECTION (Light Editorial Theme Matching Reference Image)
          ========================================================================== */}
      {/* ==========================================================================
          1. HERO SECTION (Atmospheric High-Altitude Soldier Backdrop Blended into Background)
          ========================================================================== */}
      <section className="army-hero-section">
        {/* Blended High-Altitude Himalayan Soldier Backdrop */}
        <div className="hero-bg-blend" aria-hidden="true">
          <Image
            src="/images/army/soldier-peak.jpg"
            alt="Indian Army soldier overlooking Himalayan mountain ranges"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="hero-soldier-img"
          />
          {/* Seamless gradient blend overlays into page background #f6f6f4 */}
          <div className="hero-blend-left" />
          <div className="hero-blend-bottom" />
          <div className="hero-blend-top" />
          <div className="hero-blend-radial" />
        </div>

        <div className="army-container hero-content-wrap">
          <div className="hero-left">
            {/* Elegant Military Protocol Eyebrow */}
            <div className="hero-eyebrow">
              <span className="eyebrow-badge">
                <Shield size={12} className="shield-icon" />
                <span>DEFENCE &amp; INSTITUTIONAL PRODUCTION</span>
              </span>
              <span className="eyebrow-dot" />
              <span className="eyebrow-sub">HIGH-ALTITUDE THEATRE</span>
            </div>

            {/* Attractive Architectural Headline */}
            <h1 className="hero-title">
              {hero.title?.includes('service') ? (
                <>
                  <span className="hero-title-top">Stories</span>
                  <br />
                  <span className="hero-title-bottom">
                    of service<span className="accent-dot">.</span>
                  </span>
                </>
              ) : (
                hero.title
              )}
            </h1>

            {/* Lead Description with Enhanced Readability */}
            <p className="hero-desc">
              {hero.description}
            </p>

            {/* Distinctive Pillar Badges */}
            <div className="hero-pillars">
              <span className="pillar-item">
                <span className="pillar-dot" /> HQ Western Command
              </span>
              <span className="pillar-item">
                <span className="pillar-dot" /> 14 Corps &amp; High Altitude
              </span>
              <span className="pillar-item">
                <span className="pillar-dot" /> Rezang La War Memorial
              </span>
            </div>

            {/* Attractive CTA Group */}
            <div className="hero-cta-group">
              <a href="#army-projects" className="hero-primary-btn">
                <span>Explore Assignments</span>
                <ArrowRight size={15} />
              </a>


            </div>
          </div>
        </div>
      </section>


      {/* ==========================================================================
          3. INSTITUTIONAL INTEGRITY STATEMENT
          ========================================================================== */}
      <div className="army-container">
        <div className="integrity-banner">
          <div className="integrity-dot" />
          <p className="integrity-text">
            {disclaimerText}
          </p>
        </div>
      </div>

      {/* ==========================================================================
          4. FILTER PILL TABS
          ========================================================================== */}
      <div className="army-container filter-section">
        <div className="filter-pills" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-pill ${isActive ? 'active' : ''}`}
                role="tab"
                aria-selected={isActive}
              >
                <span>{cat.label}</span>
                <span className="pill-count">({cat.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==========================================================================
          5. PROJECT CARDS SHOWCASE (4 CARDS MATCHING REFERENCE IMAGE)
          ========================================================================== */}
      <main className="army-container projects-stack" id="army-projects">
        {/* ----------------------------------------------------------------------
            CARD 1: "01 | INVESTITURE CEREMONY" (LIGHT CARD)
            ---------------------------------------------------------------------- */}
        {(p1.published !== false && (activeCategory === 'all' || activeCategory === (p1.category || 'western-command'))) && (
          <article className="project-card card-light" data-category={p1.category || 'western-command'}>
            {/* Top Meta Bar */}
            <div className="card-meta-bar">
              <div className="card-meta-left">
                <span className="meta-badge-num">{p1.num}</span>
                <span className="meta-tag-pill">{p1.command}</span>
              </div>
              <div className="card-meta-right">
                <span className="meta-meta-item">
                  <MapPin size={13} />
                  {p1.location}
                </span>
                <span className="meta-meta-item">
                  <Calendar size={13} />
                  {p1.date}
                </span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="card-1-grid">
              {/* Left Text & Sub-sections */}
              <div>
                <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                  {p1.title}
                </h2>
                <div className="card-subhead">
                  {p1.subtitle}
                </div>
                <p className="card-description">
                  {p1.description}
                </p>




              </div>

              {/* Right Media Collage */}
              <div className="card-1-media-group">
                {/* Main Photo Card */}
                <div
                  className="card-1-main-photo"
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <Image
                    src={p1.image || '/images/army/western-command-1.jpg'}
                    alt={p1.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="photo-bottom-caption">
                    <span className="p-label">{p1.title}</span>
                    <span className="p-tag">Ceremonial Protocol &amp; Honours</span>
                  </div>
                </div>

                {/* Stacked Side Photos */}
                <div className="card-1-sub-photos">
                  <div className="sub-photo-item">
                    <Image
                      src={p1.sidePhotos?.[0] || '/images/army/western-command-1.jpg'}
                      alt="Western Command Investiture Ceremony"
                      fill
                      sizes="220px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="sub-photo-item">
                    <Image
                      src={p1.sidePhotos?.[1] || '/images/army/western-command-2.jpg'}
                      alt="Parade March Contingent"
                      fill
                      sizes="220px"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="more-badge">+4</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ----------------------------------------------------------------------
            CARD 2: "02 | 14 CORPS HEADQUARTERS" (TACTICAL DARK CARD)
            ---------------------------------------------------------------------- */}
        {(p2.published !== false && (activeCategory === 'all' || activeCategory === (p2.category || '14-corps'))) && (
          <article className="project-card card-dark" data-category={p2.category || '14-corps'}>
            {/* Top Meta Bar */}
            <div className="card-meta-bar">
              <div className="card-meta-left">
                <span className="meta-badge-num">{p2.num}</span>
                <span className="meta-tag-pill">{p2.command}</span>
              </div>
              <div className="card-meta-right">
                <span className="meta-meta-item">
                  <MapPin size={13} />
                  {p2.location}
                </span>
                <span className="meta-meta-item">
                  <Calendar size={13} />
                  {p2.date}
                </span>
              </div>
            </div>

            {/* Top Row: Text Description + 3D Publications */}
            <div className="card-2-top-grid">
              <div>
                <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                  {p2.title}
                </h2>
                <div className="card-subhead">
                  {p2.subtitle}
                </div>
                <p className="card-description">
                  {p2.description}
                </p>

                {/* Visual Communication Featured Image */}
                <div
                  className="card-2-photo-preview"
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <Image
                    src={p2.image || '/images/army/14corps-hall-of-fame.jpg'}
                    alt={p2.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-2-photo-caption">14 Corps Field Documentation</div>
                </div>
              </div>

              {/* Right: 3 Standing 3D Publication Volumes */}
              <div className="books-showcase-row">
                <div className="book-3d-item">
                  <Image
                    src={p2.sidePhotos?.[0] || '/images/army/adgpi-firstvillages.jpg'}
                    alt="First Villages Community Initiative"
                    fill
                    sizes="180px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="book-spine-lighting" />
                </div>

                <div className="book-3d-item featured">
                  <Image
                    src={p2.sidePhotos?.[1] || '/images/army/firefury-changthang-health.jpg'}
                    alt="SHE Ladakh Outreach"
                    fill
                    sizes="200px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="book-spine-lighting" />
                </div>

                <div className="book-3d-item">
                  <Image
                    src={p2.sidePhotos?.[2] || '/images/army/adgpi-she-thumb-2.jpg'}
                    alt="Women Empowerment Ladakh"
                    fill
                    sizes="180px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="book-spine-lighting" />
                </div>
              </div>
            </div>


          </article>
        )}

        {/* ----------------------------------------------------------------------
            CARD 3: "03 | FIRE & FURY CORPS" (LIGHT CARD)
            ---------------------------------------------------------------------- */}
        {(p3.published !== false && (activeCategory === 'all' || activeCategory === (p3.category || '14-corps'))) && (
          <article
            className="project-card card-light"
            id="card-corps-publications"
            data-category={p3.category || '14-corps'}
          >
            {/* Top Meta Bar */}
            <div className="card-meta-bar">
              <div className="card-meta-left">
                <span className="meta-badge-num">{p3.num}</span>
                <span className="meta-tag-pill">{p3.command}</span>
              </div>
              <div className="card-meta-right">
                <span className="meta-meta-item">
                  <MapPin size={13} />
                  {p3.location}
                </span>
                <span className="meta-meta-item">
                  <Calendar size={13} />
                  {p3.date}
                </span>
              </div>
            </div>

            <div className="card-3-grid">
              {/* Left Side: Title & Vertical Stepper */}
              <div>
                <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                  {p3.title}
                </h2>
                <div className="card-subhead">
                  {p3.subtitle}
                </div>
                <p className="card-description">
                  {p3.description}
                </p>




              </div>

              {/* Right Side: Open Book & Spread Thumbnails */}
              <div className="card-3-visuals">
                <div className="book-composition-wrapper">
                  {/* Standing Book */}
                  <div className="standing-fury-book">
                    <Image
                      src={p3.sidePhotos?.[0] || p3.image || '/images/army/fire-fury-1.jpg'}
                      alt="Fire and Fury XIV Corps Volume"
                      fill
                      sizes="180px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Open Hardbound Book Spread */}
                  <div className="open-spread-book">
                    <div className="open-spread-left">
                      <h4>
                        In Service
                        <br />
                        of a Greater
                        <br />
                        Tomorrow
                      </h4>
                    </div>
                    <div className="open-spread-right">
                      <Image
                        src={currentSpread.image}
                        alt={currentSpread.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        style={{ objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        className="spread-arrow-btn"
                        aria-label="Next Spread Page"
                        onClick={() => {
                          const pages = ['01', '02', '03', '04'];
                          const nextIdx = (pages.indexOf(activeSpreadPage) + 1) % pages.length;
                          setActiveSpreadPage(pages[nextIdx]);
                        }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Thumbnails & Number Indicator */}
                <div className="card-3-thumbs-row">
                  <div className="thumbs-mini-grid">
                    <button
                      type="button"
                      className={`mini-spread-thumb ${activeSpreadPage === '02' ? 'thumb-active' : ''}`}
                      onClick={() => setActiveSpreadPage('02')}
                    >
                      <Image
                        src="/images/army/69armoured-2.jpg"
                        alt="Interior Spread 1"
                        fill
                        sizes="80px"
                        style={{ objectFit: 'cover' }}
                      />
                    </button>
                    <button
                      type="button"
                      className={`mini-spread-thumb ${activeSpreadPage === '03' ? 'thumb-active' : ''}`}
                      onClick={() => setActiveSpreadPage('03')}
                    >
                      <Image
                        src="/images/army/rezang-la-2.jpg"
                        alt="Interior Spread 2"
                        fill
                        sizes="80px"
                        style={{ objectFit: 'cover' }}
                      />
                    </button>
                    <button
                      type="button"
                      className={`mini-spread-thumb ${activeSpreadPage === '04' ? 'thumb-active' : ''}`}
                      onClick={() => setActiveSpreadPage('04')}
                    >
                      <Image
                        src="/images/army/sampark-1.jpg"
                        alt="Interior Spread 3"
                        fill
                        sizes="80px"
                        style={{ objectFit: 'cover' }}
                      />
                    </button>
                  </div>

                  <div className="pagination-tabs">
                    {SPREAD_PAGES.map((pg) => (
                      <button
                        key={pg.id}
                        type="button"
                        onClick={() => setActiveSpreadPage(pg.id)}
                        className={`page-tab-btn ${activeSpreadPage === pg.id ? 'active' : ''}`}
                      >
                        {pg.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ----------------------------------------------------------------------
            CARD 4: "04 | REZANG LA WAR MEMORIAL" (TACTICAL DARK CARD)
            ---------------------------------------------------------------------- */}
        {(p4.published !== false && (activeCategory === 'all' || activeCategory === (p4.category || 'border-initiatives'))) && (
          <article className="project-card card-dark" data-category={p4.category || 'border-initiatives'}>
            {/* Top Meta Bar */}
            <div className="card-meta-bar">
              <div className="card-meta-left">
                <span className="meta-badge-num">{p4.num}</span>
                <span className="meta-tag-pill">{p4.command}</span>
              </div>
              <div className="card-meta-right">
                <span className="meta-meta-item">
                  <MapPin size={13} />
                  {p4.location}
                </span>
                <span className="meta-meta-item">
                  <Calendar size={13} />
                  {p4.date}
                </span>
              </div>
            </div>

            <div className="card-4-grid">
              {/* Left Side: Title & Subsections */}
              <div>
                <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                  {p4.title}
                </h2>
                <div className="card-subhead">
                  {p4.subtitle}
                </div>
                <p className="card-description">
                  {p4.description}
                </p>




              </div>

              {/* Right Side: Hardbound Book + Archival Photos + Script Quote */}
              <div className="card-4-media-composition">
                {/* Hardbound Volume */}
                <div className="rezang-hardbound-book">
                  <Image
                    src={p4.image || '/images/army/rezang-la-1.jpg'}
                    alt={p4.title}
                    fill
                    sizes="240px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Archival Vertical Photo Cards */}
                <div className="rezang-archival-column">
                  <div className="archival-photo-card">
                    <Image
                      src={p4.sidePhotos?.[0] || '/images/army/rezangla-tribute.jpg'}
                      alt="Major Shaitan Singh PVC Family Tribute"
                      fill
                      sizes="130px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="archival-photo-card">
                    <Image
                      src={p4.sidePhotos?.[1] || '/images/army/rezang-la-2.jpg'}
                      alt="1962 Battlefield Archival"
                      fill
                      sizes="130px"
                      style={{ objectFit: 'cover', filter: 'grayscale(0.7) contrast(1.1)' }}
                    />
                  </div>
                </div>

                {/* Handwritten Script Calligraphy */}
                <div className="rezang-quote-col">
                  <div className="rezang-script-quote">
                    Some
                    <br />
                    sacrifices
                    <br />
                    never fade.
                  </div>
                  <span className="rezang-quote-author">— REZANG LA</span>
                </div>

                <button
                  type="button"
                  className="card-4-bottom-arrow"
                  aria-label="Next Section"
                  onClick={() => {
                    const el = document.getElementById('closing-panoramic-banner');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Additional Custom Projects from CMS */}
        {projectsList
          .filter((p: any) => p.id !== p1.id && p.id !== p2.id && p.id !== p3.id && p.id !== p4.id && p.published !== false)
          .map((p: any) => {
            const isMatch = activeCategory === 'all' || activeCategory === p.category;
            if (!isMatch) return null;
            return (
              <article key={p.id} className="project-card card-light" data-category={p.category}>
                <div className="card-meta-bar">
                  <div className="card-meta-left">
                    <span className="meta-badge-num">{p.num}</span>
                    <span className="meta-tag-pill">{p.command}</span>
                  </div>
                  <div className="card-meta-right">
                    <span className="meta-meta-item"><MapPin size={13} /> {p.location}</span>
                    <span className="meta-meta-item"><Calendar size={13} /> {p.date}</span>
                  </div>
                </div>
                <div className="card-1-grid">
                  <div>
                    <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>{p.title}</h2>
                    <div className="card-subhead">{p.subtitle}</div>
                    <p className="card-description">{p.description}</p>
                    <div className="three-subsections-row">
                      {p.scopeOfWork && (
                        <div className="subsection-box">
                          <span className="subsection-title highlight">Scope of Work</span>
                          <p className="subsection-desc">{p.scopeOfWork}</p>
                        </div>
                      )}
                      {p.creativeApproach && (
                        <div className="subsection-box">
                          <span className="subsection-title">Creative Approach</span>
                          <p className="subsection-desc">{p.creativeApproach}</p>
                        </div>
                      )}
                      {p.productionDiscipline && (
                        <div className="subsection-box">
                          <span className="subsection-title">Production Discipline</span>
                          <p className="subsection-desc">{p.productionDiscipline}</p>
                        </div>
                      )}
                    </div>

                  </div>
                  {p.image && (
                    <div style={{ position: 'relative', width: '100%', minHeight: '280px', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
                      <Image src={p.image} alt={p.title} fill sizes="450px" style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
      </main>

      {/* ==========================================================================
          6. FULL-WIDTH PANORAMIC BANNER (Soldiers Silhouette Sunset Horizon)
          ========================================================================== */}
      <section className="army-container closing-banner-section" id="closing-panoramic-banner">
        <div className="closing-banner-card">
          {/* Background Panoramic Photo */}
          <div className="closing-banner-bg">
            <Image
              src={closingBanner.image || '/images/army/symbolic-army-terrain.jpg'}
              alt="Soldiers on Himalayan Mountain Patrol at Dusk"
              fill
              quality={95}
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center bottom',
                filter: 'brightness(0.7) contrast(1.15)',
              }}
            />
          </div>

          <div className="closing-banner-overlay" />

          {/* Left Text & CTA */}
          <div className="closing-banner-content">
            <div className="banner-eyebrow">{closingBanner.eyebrow}</div>
            <h2 className="banner-heading" style={{ whiteSpace: 'pre-line' }}>
              {closingBanner.heading}
            </h2>
            <p className="banner-subhead">
              {closingBanner.description}
            </p>

            <Link href={closingBanner.buttonUrl || '/contact'} className="banner-btn">
              <span>{closingBanner.buttonText || "Let's Discuss a Project"}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right Signature Calligraphy */}
          <div className="banner-right-script">
            For
            <br />
            Those
            <br />
            Who Protect
            <br />
            Ours.
          </div>
        </div>
      </section>

      {/* ==========================================================================
          7. DEDICATED SITE FOOTER (Matching Reference Image)
          ========================================================================== */}
      <footer className="site-footer" id="contact">
        <div className="army-container">
          <div className="footer-top-grid">
            {/* Brand Summary */}
            <div className="footer-brand">
              <p className="f-tagline" style={{ marginTop: 0 }}>
                Strategic Communication.
                <br />
                Real-World Impact.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <div className="footer-col-title">Navigation</div>
              <ul className="footer-links-list">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">Studio</Link>
                </li>
                <li>
                  <Link href="/work">Work</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/tourin">Tourin</Link>
                </li>
                <li>
                  <Link href="/indian-army-projects" className="f-active-link">
                    Army Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Office Details */}
            <div className="footer-office">
              <div className="footer-col-title">Office</div>
              <p>
                <strong>ĀROHANA Consultancy</strong>
              </p>
              <p>
                60, Goodwill Square, Aundh-Ravet BRTS Rd,
                <br />
                Near D Mart, Thergaon, Pune 416033, India.
              </p>
              <p>
                <a href="mailto:founder@byarohana.com">founder@byarohana.com</a>
              </p>
              <p>
                <a href="tel:+918380092241">+91 83800 92241</a>
              </p>
            </div>

            {/* Social Channels */}
            <div>
              <div className="footer-col-title">Social</div>
              <ul className="footer-links-list">
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://behance.net" target="_blank" rel="noopener noreferrer">
                    Behance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <div>&copy; {new Date().getFullYear()} Ārohana Consultancy. All Rights Reserved.</div>
            <div>Pune &middot; Ladakh &middot; Pan-India Engagements</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span>Army Projects &middot; Institutional Production</span>
              <span>&bull;</span>
              <Link
                href="/admin"
                style={{
                  color: '#777777',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                Admin CRM
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================================================
          8. SCOPED COMPONENT STYLES MATCHING THE REFERENCE IMAGE EXACTLY
          ========================================================================== */}
      <style jsx>{`
        .army-page-wrapper {
          background-color: #f6f6f4;
          color: #111111;
          font-family: var(--font-main, 'Inter', -apple-system, sans-serif);
          line-height: 1.5;
          overflow-x: hidden;
          padding-top: 1rem;
        }

        .army-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 3.5vw, 3.5rem);
        }

        /* ---------------- Hero Section (Atmospheric Blended Soldier Backdrop) ---------------- */
        .army-hero-section {
          position: relative;
          min-height: clamp(560px, 78vh, 760px);
          display: flex;
          align-items: center;
          background-color: #f6f6f4;
          overflow: hidden;
          padding-top: clamp(3rem, 6vw, 5.5rem);
          padding-bottom: clamp(3.5rem, 6vw, 5rem);
        }

        /* The soldier image positioned seamlessly on the right & spanning backward */
        .hero-bg-blend {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 65%;
          min-width: 520px;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        :global(.hero-soldier-img) {
          object-fit: cover !important;
          object-position: 70% 20% !important;
        }

        /* Seamless gradient blend overlays into page background #f6f6f4 */
        .hero-blend-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #f6f6f4 0%,
            #f6f6f4 12%,
            rgba(246, 246, 244, 0.94) 28%,
            rgba(246, 246, 244, 0.65) 50%,
            rgba(246, 246, 244, 0.2) 75%,
            transparent 100%
          );
          z-index: 2;
        }

        .hero-blend-bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 180px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(246, 246, 244, 0.5) 45%,
            rgba(246, 246, 244, 0.92) 80%,
            #f6f6f4 100%
          );
          z-index: 2;
        }

        .hero-blend-top {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 90px;
          background: linear-gradient(
            to bottom,
            rgba(246, 246, 244, 0.85) 0%,
            transparent 100%
          );
          z-index: 2;
        }

        .hero-blend-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 85% 50%,
            transparent 35%,
            rgba(246, 246, 244, 0.25) 70%,
            #f6f6f4 100%
          );
          z-index: 2;
        }

        .hero-content-wrap {
          position: relative;
          z-index: 3;
          width: 100%;
        }

        .hero-left {
          max-width: 680px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Eyebrow badge */
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.85rem;
          border-radius: 3px;
          background-color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #111113;
          text-transform: uppercase;
        }

        .eyebrow-badge .shield-icon {
          color: #de322d;
        }

        .eyebrow-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #a1a1aa;
        }

        .eyebrow-sub {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #6b7280;
          text-transform: uppercase;
        }

        /* Attractive, punchy, editorial headline */
        .hero-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(3.4rem, 6.8vw, 6.2rem);
          font-weight: 750;
          line-height: 0.98;
          letter-spacing: -0.04em;
          color: #0f172a;
          margin: 0 0 1.75rem 0;
        }

        .hero-title-top {
          display: inline-block;
          font-weight: 750;
          color: #0f172a;
        }

        .hero-title-bottom {
          display: inline-block;
          font-weight: 750;
          color: #1e293b;
        }

        .hero-title .accent-dot {
          color: #de322d;
        }

        /* Attractive Description */
        .hero-desc {
          font-size: clamp(1.05rem, 1.35vw, 1.25rem);
          line-height: 1.68;
          color: #475569;
          max-width: 540px;
          margin: 0 0 2rem 0;
          font-weight: 450;
        }

        /* Clean pillar badges */
        .hero-pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          margin-bottom: 2.25rem;
        }

        .pillar-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #334155;
          text-transform: uppercase;
        }

        .pillar-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #de322d;
        }

        /* CTA Buttons */
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .hero-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.85rem;
          border-radius: 4px;
          background-color: #111113;
          color: #ffffff;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
          transition: all 0.28s ease;
          border: 1px solid #111113;
        }

        .hero-primary-btn:hover {
          background-color: #de322d;
          border-color: #de322d;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(222, 50, 45, 0.28);
        }

        .scroll-explore {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #475569;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.25s ease;
        }

        .scroll-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 0, 0, 0.16);
          background: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1e293b;
          transition: all 0.25s ease;
        }

        .scroll-explore:hover {
          color: #111113;
        }

        .scroll-explore:hover .scroll-circle {
          border-color: #de322d;
          background: #de322d;
          color: #ffffff;
          transform: translateY(2px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-bg-blend {
            width: 80%;
            opacity: 0.92;
          }
          .hero-blend-left {
            background: linear-gradient(
              to right,
              #f6f6f4 0%,
              #f6f6f4 15%,
              rgba(246, 246, 244, 0.92) 35%,
              rgba(246, 246, 244, 0.5) 65%,
              transparent 100%
            );
          }
        }

        @media (max-width: 860px) {
          .army-hero-section {
            min-height: auto;
            padding-top: 3.25rem;
            padding-bottom: 3.5rem;
          }
          .hero-bg-blend {
            width: 100%;
            min-width: 0;
            opacity: 0.92;
          }
          :global(.hero-soldier-img) {
            object-position: 78% 22% !important;
          }
          .hero-blend-left {
            background: linear-gradient(
              to right,
              rgba(246, 246, 244, 0.96) 0%,
              rgba(246, 246, 244, 0.88) 32%,
              rgba(246, 246, 244, 0.45) 65%,
              rgba(246, 246, 244, 0.08) 100%
            );
          }
          .hero-blend-bottom {
            height: 120px;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(246, 246, 244, 0.75) 50%,
              #f6f6f4 100%
            );
          }
          .hero-left {
            max-width: 100%;
          }
          .hero-title {
            font-size: clamp(2.8rem, 10vw, 4.2rem);
            color: #0b1120;
            text-shadow: 0 1px 6px rgba(255, 255, 255, 0.75);
          }
          .hero-desc {
            color: #1e293b;
            font-weight: 500;
            max-width: 95%;
            text-shadow: 0 1px 4px rgba(255, 255, 255, 0.8);
          }
        }

        @media (max-width: 600px) {
          .hero-eyebrow {
            gap: 0.45rem;
            margin-bottom: 1.15rem;
          }
          .eyebrow-badge {
            font-size: 0.65rem;
            padding: 0.3rem 0.7rem;
            letter-spacing: 0.08em;
          }
          .eyebrow-sub {
            font-size: 0.62rem;
            letter-spacing: 0.1em;
          }
          .hero-pillars {
            margin-bottom: 1.75rem;
            gap: 0.45rem 0.65rem;
          }
          .pillar-item {
            font-size: 0.68rem;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(6px);
            padding: 0.25rem 0.55rem;
            border-radius: 6px;
            border: 1px solid rgba(0, 0, 0, 0.06);
          }
        }

        /* ---------------- Stats Section ---------------- */
        .stats-section {
          padding: clamp(2rem, 3.5vw, 3rem) 0;
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: stretch;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 1.75rem 0;
        }

        .stat-card {
          padding: 0 1.5rem;
          position: relative;
        }

        .stat-card:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background-color: rgba(0, 0, 0, 0.1);
        }

        .stat-card:first-child {
          padding-left: 0;
        }

        .stat-card:last-child {
          padding-right: 0;
        }

        .stat-number {
          font-size: clamp(1.4rem, 2.2vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #111111;
          line-height: 1.1;
          margin-bottom: 0.4rem;
          white-space: nowrap;
        }

        .stat-label {
          font-size: 0.82rem;
          color: #666666;
          line-height: 1.35;
          font-weight: 500;
        }

        /* ---------------- Institutional Integrity ---------------- */
        .integrity-banner {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 6px;
          padding: 1.1rem 1.75rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: clamp(2rem, 3.5vw, 2.75rem);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
        }

        .integrity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #28cd41;
          box-shadow: 0 0 8px rgba(40, 205, 65, 0.8);
          flex-shrink: 0;
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.75; }
        }

        .integrity-text {
          font-size: 0.84rem;
          line-height: 1.5;
          color: #555555;
          margin: 0;
        }

        .integrity-text strong {
          color: #111111;
          font-weight: 700;
        }

        /* ---------------- Filter Section ---------------- */
        .filter-section {
          margin-bottom: clamp(3rem, 5vw, 4.5rem);
        }

        .filter-pills {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: none;
        }

        .filter-pills::-webkit-scrollbar {
          display: none;
        }

        .filter-pill {
          height: 42px;
          padding: 0 1.25rem;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background-color: #ffffff;
          color: #444444;
          font-size: 0.84rem;
          font-weight: 500;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .filter-pill:hover {
          border-color: #111111;
          color: #111111;
        }

        .filter-pill.active {
          background-color: #111111;
          color: #ffffff;
          border-color: #111111;
        }

        .filter-pill .pill-count {
          font-size: 0.78rem;
          font-weight: 600;
          color: #777777;
        }

        .filter-pill.active .pill-count {
          color: #de322d;
        }

        /* ---------------- Common Project Cards ---------------- */
        .projects-stack {
          display: flex;
          flex-direction: column;
          gap: clamp(3.5rem, 6vw, 6rem);
          margin-bottom: clamp(4rem, 8vw, 7rem);
        }

        .project-card {
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }

        .card-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid;
        }

        .card-meta-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .meta-badge-num {
          font-size: 1.15rem;
          font-weight: 700;
          color: #de322d;
        }

        .meta-tag-pill {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 3px;
        }

        .card-meta-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.84rem;
          font-weight: 500;
        }

        .meta-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .card-title {
          font-size: clamp(2.2rem, 3.8vw, 3.4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.035em;
          margin: 0 0 0.85rem 0;
        }

        .card-subhead {
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          font-weight: 500;
          line-height: 1.45;
          margin-bottom: 1.25rem;
        }

        .card-description {
          font-size: 0.95rem;
          line-height: 1.65;
          margin-bottom: 2.25rem;
        }

        .card-action-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.84rem;
          font-weight: 550;
          color: #ffffff;
          background: #000000;
          border: 1px solid #000000;
          border-radius: 4px;
          padding: 0.75rem 1.6rem;
          margin-top: 1.25rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .card-action-link:hover {
          background-color: #222226;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .three-subsections-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 2rem;
        }

        .subsection-box {
          padding: 1.25rem;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .subsection-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .subsection-desc {
          font-size: 0.84rem;
          line-height: 1.5;
          margin: 0;
        }

        /* ---------------- CARD 1: LIGHT ---------------- */
        .card-light {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: clamp(2rem, 4vw, 4rem);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
        }

        .card-light .card-meta-bar {
          border-color: rgba(0, 0, 0, 0.08);
        }

        .card-light .meta-tag-pill {
          background-color: rgba(0, 0, 0, 0.05);
          color: #222222;
        }

        .card-light .card-meta-right {
          color: #666666;
        }

        .card-light .card-title {
          color: #111111;
        }

        .card-light .card-subhead {
          color: #444444;
        }

        .card-light .card-description {
          color: #555555;
        }

        .card-light .subsection-box {
          background-color: #f8f8f7;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .card-light .subsection-title {
          color: #888888;
        }

        .card-light .subsection-title.highlight {
          color: #de322d;
        }

        .card-light .subsection-desc {
          color: #555555;
        }

        .card-1-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: clamp(2rem, 3.5vw, 3.5rem);
          align-items: stretch;
        }

        .card-1-media-group {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 1rem;
          height: 100%;
          min-height: 380px;
        }

        .card-1-main-photo,
        .card-1-video-thumb {
          position: relative;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          background: #18181a;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
          min-height: 280px;
        }

        .photo-bottom-caption,
        .video-bottom-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.25rem 1rem 0.85rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 2;
        }

        .photo-bottom-caption .p-label,
        .video-bottom-caption .v-label {
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .photo-bottom-caption .p-tag,
        .video-bottom-caption .v-time {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-1-sub-photos {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
        }

        .sub-photo-item {
          position: relative;
          flex: 1;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          background: #111111;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
        }

        .more-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 3px;
        }

        /* ---------------- CARD 2: DARK ---------------- */
        .card-dark {
          background-color: #0b0c0e;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: clamp(2rem, 4vw, 4rem);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
          color: #ffffff;
        }

        .card-dark .card-meta-bar {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .card-dark .meta-tag-pill {
          background-color: rgba(255, 255, 255, 0.1);
          color: #e5e5e5;
        }

        .card-dark .card-meta-right {
          color: rgba(255, 255, 255, 0.72);
        }

        .card-dark .card-title {
          color: #ffffff;
        }

        .card-dark .card-subhead {
          color: rgba(255, 255, 255, 0.8);
        }

        .card-dark .card-description {
          color: rgba(255, 255, 255, 0.65);
        }

        .card-dark .subsection-box {
          background-color: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .card-dark .subsection-title {
          color: rgba(255, 255, 255, 0.5);
        }

        .card-dark .subsection-desc {
          color: rgba(255, 255, 255, 0.72);
        }

        .card-2-top-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .card-2-photo-preview,
        .card-2-video-preview {
          position: relative;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          aspect-ratio: 16/9;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
          margin-top: 1.5rem;
        }

        .card-2-photo-caption,
        .card-2-video-caption {
          position: absolute;
          bottom: 12px;
          right: 16px;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(0, 0, 0, 0.65);
          padding: 5px 12px;
          border-radius: 4px;
          backdrop-filter: blur(6px);
          z-index: 2;
        }

        /* 3D Publication Books Shelf */
        .books-showcase-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(1rem, 2vw, 1.75rem);
          perspective: 1200px;
          padding: 1rem 0;
        }

        .book-3d-item {
          position: relative;
          width: clamp(120px, 14vw, 175px);
          aspect-ratio: 1 / 1.48;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: -8px 14px 30px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3);
          transform: rotateY(-12deg) rotateX(4deg);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          background: #18191c;
          border-left: 3px solid rgba(255, 255, 255, 0.3);
        }

        .book-3d-item.featured {
          transform: rotateY(-8deg) rotateX(2deg) scale(1.05);
          z-index: 2;
        }

        .book-3d-item:hover {
          transform: rotateY(0deg) rotateX(0deg) translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
        }

        .book-spine-lighting {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0%, transparent 12%, rgba(0, 0, 0, 0.45) 100%);
          pointer-events: none;
        }

        .book-overlay-title {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1.15;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.85);
        }

        .card-2-bottom-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          align-items: flex-end;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 2rem;
        }

        .card-2-bottom-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-dark-pill {
          height: 44px;
          padding: 0 1.6rem;
          border-radius: 4px;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 0.84rem;
          font-weight: 550;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .btn-dark-pill:hover {
          background: #222226;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.4);
        }

        .btn-circle-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-circle-arrow:hover {
          background: #ffffff;
          color: #000000;
        }

        /* ---------------- CARD 3: LIGHT SPREAD ---------------- */
        .card-3-grid {
          display: grid;
          grid-template-columns: 1.05fr 1.35fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }

        .vertical-stepper {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-left: 26px;
          margin: 2rem 0;
        }

        .vertical-stepper::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 10px;
          bottom: 24px;
          width: 1px;
          background: rgba(0, 0, 0, 0.15);
        }

        .stepper-item {
          position: relative;
          margin-bottom: 1.6rem;
        }

        .stepper-item:last-child {
          margin-bottom: 0;
        }

        .stepper-node {
          position: absolute;
          left: -26px;
          top: 4px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #888888;
        }

        .stepper-item:first-child .stepper-node {
          border-color: #de322d;
          background: #de322d;
        }

        .stepper-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #777777;
          margin-bottom: 0.35rem;
        }

        .stepper-item:first-child .stepper-title {
          color: #de322d;
        }

        .stepper-desc {
          font-size: 0.88rem;
          color: #444444;
          line-height: 1.5;
          margin: 0;
        }

        .card-3-visuals {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .book-composition-wrapper {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .standing-fury-book {
          width: clamp(120px, 14vw, 170px);
          aspect-ratio: 1 / 1.45;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: -6px 12px 28px rgba(0, 0, 0, 0.22);
          flex-shrink: 0;
          position: relative;
        }

        .open-spread-book {
          position: relative;
          flex: 1;
          aspect-ratio: 1.8 / 1;
          background: #ffffff;
          border-radius: 6px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .open-spread-left {
          padding: clamp(1rem, 2vw, 2rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fafaf8;
          border-right: 1px solid rgba(0, 0, 0, 0.06);
        }

        .open-spread-left h4 {
          font-size: clamp(1.1rem, 2vw, 1.85rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #111111;
          text-transform: uppercase;
          margin: 0;
        }

        .open-spread-right {
          position: relative;
          height: 100%;
        }

        .spread-arrow-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111111;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 2;
        }

        .spread-arrow-btn:hover {
          background: #ffffff;
          transform: translateY(-50%) scale(1.1);
        }

        .card-3-thumbs-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .thumbs-mini-grid {
          display: flex;
          gap: 0.75rem;
        }

        .mini-spread-thumb {
          position: relative;
          width: 75px;
          height: 48px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.08);
          cursor: pointer;
          padding: 0;
          background: #000;
          transition: all 0.2s ease;
        }

        .mini-spread-thumb.thumb-active {
          border-color: #de322d;
          transform: scale(1.05);
        }

        .pagination-tabs {
          display: flex;
          gap: 4px;
          background: #eeeeea;
          padding: 4px;
          border-radius: 6px;
        }

        .page-tab-btn {
          padding: 3px 8px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #666666;
          border-radius: 4px;
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-tab-btn.active {
          background: #111111;
          color: #ffffff;
        }

        /* ---------------- CARD 4: REZANG LA ---------------- */
        .card-4-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }

        .card-4-media-composition {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 2.5vw, 2.5rem);
          position: relative;
        }

        .rezang-hardbound-book {
          width: clamp(150px, 18vw, 230px);
          aspect-ratio: 1 / 1.45;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: -10px 20px 40px rgba(0, 0, 0, 0.7);
          flex-shrink: 0;
          position: relative;
          border-left: 3px solid rgba(255, 255, 255, 0.2);
        }

        .rezang-archival-column {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 120px;
          flex-shrink: 0;
        }

        .archival-photo-card {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          aspect-ratio: 1 / 1.1;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .rezang-quote-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
        }

        .rezang-script-quote {
          font-family: var(--font-script, 'Caveat', cursive, sans-serif);
          font-size: clamp(1.6rem, 2.5vw, 2.25rem);
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          font-weight: 700;
        }

        .rezang-quote-author {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
        }

        .card-4-bottom-arrow {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .card-4-bottom-arrow:hover {
          background: #ffffff;
          color: #000000;
        }

        /* ---------------- CLOSING PANORAMIC BANNER ---------------- */
        .closing-banner-section {
          margin-bottom: clamp(3rem, 6vw, 5rem);
        }

        .closing-banner-card {
          position: relative;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          min-height: clamp(360px, 42vw, 480px);
          display: flex;
          align-items: center;
          padding: clamp(2rem, 5vw, 4.5rem);
          color: #ffffff;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
          background-color: #0c0d10;
        }

        .closing-banner-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .closing-banner-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            90deg,
            rgba(12, 13, 16, 0.92) 0%,
            rgba(12, 13, 16, 0.65) 50%,
            rgba(12, 13, 16, 0.4) 100%
          );
        }

        .closing-banner-content {
          position: relative;
          z-index: 3;
          max-width: 650px;
        }

        .banner-eyebrow {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 1.25rem;
        }

        .banner-heading {
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          font-weight: 600;
          line-height: 1.06;
          letter-spacing: -0.035em;
          color: #ffffff;
          margin: 0 0 1.25rem 0;
        }

        .banner-subhead {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 2.25rem;
        }

        .banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: #000000;
          color: #ffffff;
          padding: 0.85rem 1.85rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          font-size: 0.88rem;
          font-weight: 550;
          letter-spacing: 0.01em;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .banner-btn:hover {
          background-color: #222226;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .banner-right-script {
          position: absolute;
          right: clamp(2rem, 5vw, 4.5rem);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          font-family: var(--font-script, 'Caveat', cursive, sans-serif);
          font-size: clamp(1.8rem, 3.2vw, 3rem);
          line-height: 1.15;
          color: rgba(255, 255, 255, 0.85);
          text-align: right;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
          max-width: 280px;
          font-weight: 700;
        }

        /* ---------------- SITE FOOTER ---------------- */
        .site-footer {
          background-color: #ffffff;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: clamp(3rem, 5vw, 4.5rem) 0 2rem;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.25fr 0.75fr;
          gap: clamp(2rem, 3.5vw, 3.5rem);
          padding-bottom: clamp(2.5rem, 4vw, 3.5rem);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .footer-brand .f-logo {
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.18em;
          color: #111111;
          margin-bottom: 0.75rem;
          display: inline-block;
          text-transform: uppercase;
          text-decoration: none;
        }

        .footer-brand .f-tagline {
          font-size: 0.84rem;
          color: #666666;
          line-height: 1.5;
        }

        .footer-col-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888888;
          margin-bottom: 1.25rem;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links-list li a {
          font-size: 0.85rem;
          color: #444444;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links-list li a:hover,
        .footer-links-list li a.f-active-link {
          color: #000000;
          font-weight: 600;
        }

        .footer-office p {
          font-size: 0.84rem;
          color: #555555;
          line-height: 1.6;
          margin: 0 0 0.4rem 0;
        }

        .footer-office a {
          color: #111111;
          font-weight: 600;
          text-decoration: none;
        }

        .footer-bottom-bar {
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.78rem;
          color: #777777;
        }



        /* ---------------- RESPONSIVE MEDIA QUERIES ---------------- */
        @media (max-width: 1100px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-right {
            justify-content: center;
          }
          .card-1-grid,
          .card-2-top-grid,
          .card-3-grid,
          .card-4-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .card-2-bottom-row {
            grid-template-columns: 1fr;
          }
          .books-showcase-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: clamp(1rem, 2vw, 1.5rem);
            padding: 1.25rem 0;
            width: 100%;
          }
          .book-3d-item {
            width: clamp(115px, 16vw, 150px);
          }
          .book-composition-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            width: 100%;
          }
          .standing-fury-book {
            width: clamp(130px, 16vw, 170px);
            flex-shrink: 0;
          }
          .open-spread-book {
            flex: 1;
            min-height: 220px;
          }
          .card-4-media-composition {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: clamp(1.5rem, 3vw, 2.5rem);
            width: 100%;
          }
          .rezang-hardbound-book {
            width: clamp(160px, 20vw, 210px);
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 2rem;
          }
          .stat-card:nth-child(2)::after {
            display: none;
          }
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            row-gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-side-stack,
          .hero-radar-lines {
            display: none !important;
          }
          .hero-visual-wrapper {
            justify-content: center !important;
            max-width: 100% !important;
          }
          .hero-main-photo-card {
            width: 100% !important;
            max-width: 320px !important;
            height: 380px !important;
            margin: 0 auto !important;
          }
          .hero-script-card {
            left: 0 !important;
            bottom: 15px !important;
            top: auto !important;
          }
          .hero-title {
            font-size: clamp(2.4rem, 8vw, 3.4rem) !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-desc {
            font-size: 1rem !important;
            margin-bottom: 2rem !important;
          }
          .project-card {
            padding: 1.5rem 1.15rem !important;
            border-radius: 6px !important;
            margin-bottom: 2.5rem !important;
          }
          .card-meta-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.65rem !important;
            margin-bottom: 1.5rem !important;
          }
          .card-meta-right {
            flex-wrap: wrap !important;
            gap: 0.75rem !important;
          }
          /* Card 1 */
          .three-subsections-row {
            grid-template-columns: 1fr;
          }
          .card-1-media-group {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            gap: 0.75rem !important;
          }
          .card-1-main-photo {
            min-height: 240px !important;
            height: 260px !important;
          }
          .card-1-sub-photos {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            height: 130px !important;
            gap: 0.75rem !important;
          }
          .sub-photo-item {
            height: 100% !important;
          }

          /* Card 2: 3D Books Shelf */
          .card-2-photo-preview {
            height: 220px !important;
            min-height: 220px !important;
          }
          .books-showcase-row {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            gap: clamp(8px, 2.5vw, 14px) !important;
            padding: 1.5rem 0.25rem !important;
            overflow: visible !important;
            width: 100% !important;
            max-width: 100% !important;
            perspective: 800px !important;
          }
          .book-3d-item {
            flex: 1 1 0 !important;
            min-width: 0 !important;
            max-width: clamp(92px, 28vw, 120px) !important;
            width: auto !important;
            aspect-ratio: 1 / 1.48 !important;
            transform: rotateY(-8deg) rotateX(2deg) !important;
            box-shadow: -4px 8px 18px rgba(0, 0, 0, 0.5) !important;
          }
          .book-3d-item.featured {
            transform: rotateY(-3deg) rotateX(1deg) scale(1.05) !important;
            box-shadow: -6px 12px 24px rgba(0, 0, 0, 0.6) !important;
          }
          .card-2-bottom-row {
            margin-top: 1.5rem !important;
          }
          .card-2-bottom-actions {
            justify-content: flex-start !important;
            margin-top: 1.25rem !important;
          }

          /* Card 3: Fire & Fury Corps */
          .book-composition-wrapper {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 1.25rem !important;
            width: 100% !important;
          }
          .standing-fury-book {
            width: clamp(140px, 42vw, 180px) !important;
            max-width: 180px !important;
            aspect-ratio: 1 / 1.45 !important;
            margin: 0 auto !important;
            box-shadow: -6px 10px 22px rgba(0, 0, 0, 0.2) !important;
          }
          .open-spread-book {
            width: 100% !important;
            display: grid !important;
            grid-template-columns: 1fr 1.15fr !important;
            min-height: 180px !important;
            aspect-ratio: auto !important;
            border-radius: 6px !important;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12) !important;
          }
          .open-spread-left {
            width: 100% !important;
            padding: clamp(0.85rem, 2.5vw, 1.25rem) !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }
          .open-spread-left h4 {
            font-size: clamp(0.95rem, 3.4vw, 1.35rem) !important;
            line-height: 1.15 !important;
          }
          .open-spread-right {
            position: relative !important;
            width: 100% !important;
            min-height: 180px !important;
            height: 100% !important;
          }
          .card-3-thumbs-row {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            flex-wrap: wrap !important;
            gap: 0.75rem !important;
            width: 100% !important;
            margin-top: 0.5rem !important;
          }
          .thumbs-mini-grid {
            display: flex !important;
            gap: 0.4rem !important;
            flex-wrap: wrap !important;
          }
          .mini-spread-thumb {
            width: clamp(52px, 14vw, 68px) !important;
            height: clamp(34px, 9vw, 44px) !important;
            flex-shrink: 0 !important;
          }
          .pagination-tabs {
            flex-shrink: 0 !important;
          }
          .page-tab-btn {
            padding: 3px 6px !important;
            font-size: 0.7rem !important;
          }

          /* Card 4: Rezang La */
          .card-4-media-composition {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
            gap: 1.25rem !important;
            position: relative !important;
            padding-bottom: 3.5rem !important;
          }
          .rezang-hardbound-book {
            width: clamp(160px, 48vw, 210px) !important;
            aspect-ratio: 1 / 1.45 !important;
            margin: 0 auto !important;
            box-shadow: -8px 16px 32px rgba(0, 0, 0, 0.6) !important;
          }
          .rezang-archival-column {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            gap: clamp(0.6rem, 2.5vw, 1rem) !important;
          }
          .archival-photo-card {
            flex: 1 1 0 !important;
            max-width: 150px !important;
            height: clamp(100px, 28vw, 130px) !important;
            aspect-ratio: auto !important;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4) !important;
          }
          .rezang-quote-col {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
            margin-top: 0.5rem !important;
          }
          .rezang-script-quote {
            font-size: clamp(1.4rem, 4.5vw, 1.85rem) !important;
            line-height: 1.2 !important;
          }
          .rezang-quote-author {
            font-size: 0.72rem !important;
            margin-top: 0.25rem !important;
          }
          .card-4-bottom-arrow {
            position: absolute !important;
            right: 0 !important;
            bottom: 0 !important;
          }

          /* General components on mobile */
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .stat-card:not(:last-child)::after {
            display: none;
          }
          .stat-card {
            padding: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            padding-bottom: 1rem;
            margin-bottom: 1rem;
          }
          .stat-card:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .banner-right-script {
            display: none;
          }
          .footer-top-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .project-card {
            padding: 1.25rem 0.85rem !important;
          }
          .card-title {
            font-size: 1.6rem !important;
          }
          .hero-title {
            font-size: 2.2rem !important;
          }
          .category-filter-pills {
            gap: 0.4rem !important;
          }
          .filter-pill {
            padding: 5px 10px !important;
            font-size: 0.72rem !important;
          }
          .open-spread-book {
            grid-template-columns: 1fr 1fr !important;
          }
          .open-spread-left h4 {
            font-size: 0.95rem !important;
          }
          .card-3-thumbs-row {
            justify-content: center !important;
            gap: 0.75rem !important;
          }
          .closing-banner-card {
            padding: 1.75rem 1.25rem !important;
            min-height: 320px !important;
          }
          .banner-heading {
            font-size: 1.85rem !important;
          }
          .footer-top-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}
