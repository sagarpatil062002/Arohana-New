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
  ChevronLeft,
  Play,
  X,
  FileText,
} from 'lucide-react';
import CoffeeTableBookFlipbook from '@/components/army/CoffeeTableBookFlipbook';
import StandardPdfViewer from '@/components/army/StandardPdfViewer';

const CATEGORIES = [
  { id: 'all', label: 'All Assignments' },
  { id: 'western-command', label: 'Western Command' },
  { id: '14-corps', label: 'Fire & Fury Corps (XIV Corps)' },
  { id: 'border-initiatives', label: 'Rezang La Memorial' },
];

const SPREAD_PAGES = [
  { id: '01', image: '/images/army/vibrant-villages-1.jpg', alt: 'High Altitude Ladakh Plateau' },
  { id: '02', image: '/images/army/69armoured-2.jpg', alt: 'Armoured Formation in Alpine Desert' },
  { id: '03', image: '/images/army/rezang-la-2.jpg', alt: 'Memorial Archival Photography' },
  { id: '04', image: '/images/army/sampark-1.jpg', alt: 'High Altitude Highway Infrastructure' },
];

function getEmbedUrl(url: string) {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=')) {
    const id = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return url;
}

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
    buttonText: 'Start a conversation',
    buttonUrl: '/contact',
    image: '/uploads/1790516827847-rezang-la-memorial.jpg',
  };

  const p1 = projectsList.find((p: any) => p.id === 'western-command-investiture') || projectsList[0] || {
    id: 'western-command-investiture',
    num: '01',
    command: 'WESTERN COMMAND',
    location: 'HQ Western Command',
    date: 'February 2026',
    title: 'Investiture Ceremony',
    subtitle: 'Shoot · Production · Post-production',
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
    location: 'Ladakh',
    date: '',
    title: 'Communication & Production',
    subtitle: 'Design · Scripting · films',
    description: 'Ārohana has undertaken communication, design and visual production work for 14 Corps Headquarters, including visual communication and films developed through scripting, voice-over, editing and sound.',
    scopeOfWork: 'Institutional communications campaign, internal and public-facing visual communication, and photo documentation.',
    creativeApproach: 'Authentic high-altitude cinematography paired with authoritative scripting and professional narration.',
    productionDiscipline: 'Field filming in sub-zero and remote mountain environments requiring specialised equipment and acclimatised crews.',
    image: '/uploads/1790515799187-high-alltitude-1.jpg',
    sidePhotos: [
      '/images/army/firefury-changthang-health.jpg',
      '/uploads/1790515822524-high-altitude-2.jpg',
      '/uploads/1790515846174-highlatude-3.jpg',
    ],
    category: '14-corps',
    published: true,
  };

  const p3 = projectsList.find((p: any) => p.id === 'corps-publications') || projectsList[2] || {
    id: 'corps-publications',
    num: '03',
    command: 'FIRE & FURY CORPS',
    location: 'Ladakh',
    date: '',
    title: 'Fire & Fury Corps — XIV Corps, Rezang La & 69 Armoured',
    subtitle: 'Collateral designing · Content creation · Publications',
    description: 'Fire & Fury Corps is the designation associated with XIV Corps. Ārohana has undertaken project work across communication, publications, 69 Armoured Regiment collateral designing and content creation, and Rezang La War Memorial documentation.',
    scopeOfWork: 'Spans historical commemorative literature, coffee table books, community welfare communication, and visual documentation.',
    creativeApproach: 'Balancing historical gravitas with contemporary digital readability across diverse audiences.',
    productionDiscipline: 'Seamless integration between on-ground research, military history curation, and modern typography.',
    image: '/uploads/1790516375474-firefury1.jpg',
    sidePhotos: [
      '/images/army/69armoured-2.jpg',
      '/uploads/1790516827847-rezang-la-memorial.jpg',
      '/uploads/1790516538989-communtiy.jpg',
    ],
    category: '14-corps',
    published: true,
  };

  const p4 = projectsList.find((p: any) => p.id === 'rezang-la-memorial') || projectsList[3] || {
    id: 'rezang-la-memorial',
    num: '04',
    command: 'FIRE & FURY CORPS',
    location: 'Ladakh',
    date: '',
    title: 'Rezang La War Memorial',
    subtitle: 'Collateral designing | Content production',
    description: 'Coffee-table book design, editorial publication architecture, and visual communication for the Rezang La War Memorial.',
    scopeOfWork: 'Complete publication design including hardbound cover architecture, typographic systems, and archival photo restoration.',
    creativeApproach: 'Subtle, dignified layout allowing historical accounts and veteran testimonies to stand out with gravitas.',
    productionDiscipline: 'High-specification tactile print finishing, custom clothbound styling, and museum-grade archival reproduction.',
    image: '/uploads/1790516737581-rezangla.jpg',
    sidePhotos: [
      '/images/army/rezangla-tribute.jpg',
      '/uploads/1790516827847-rezang-la-memorial.jpg',
    ],
    category: 'border-initiatives',
    published: true,
  };

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSpreadPage, setActiveSpreadPage] = useState('01');
  const [firefuryIndex, setFirefuryIndex] = useState(0);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const currentSpread = SPREAD_PAGES.find((p) => p.id === activeSpreadPage) || SPREAD_PAGES[0];

  return (
    <div className="army-page-wrapper">
      {/* ==========================================================================
          1. HERO SECTION (Light Editorial Theme Matching Reference Image)
          ========================================================================== */}
      {/* ==========================================================================
          1. HERO SECTION (Atmospheric High-Altitude Soldier Backdrop Blended into Background)
          ========================================================================== */}
      {armyCms.heroEnabled !== false && (
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
      )}

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
              {/* Left Text */}
              <div>
                <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                  {p1.caseStudyEnabled !== false && (p1.caseStudyUrl || '/work/western-command') ? (
                    <Link href={p1.caseStudyUrl || '/work/western-command'} style={{ textDecoration: 'none', color: 'inherit' }} className="title-case-link">
                      {p1.title}
                    </Link>
                  ) : (
                    p1.title
                  )}
                </h2>
                <div className="card-subhead">
                  {p1.subtitle}
                </div>
                <p className="card-description">
                  {p1.description}
                </p>

                {(p1.videoUrl || p1.redirectionUrl || (p1.caseStudyEnabled !== false && p1.caseStudyUrl)) && (
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {(p1.videoUrl || p1.redirectionUrl) && (
                      <button
                        type="button"
                        onClick={() => {
                          if (p1.videoUrl) setActiveVideoUrl(p1.videoUrl);
                          else if (p1.redirectionUrl) window.open(p1.redirectionUrl, '_blank');
                        }}
                        className="hero-primary-btn"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                      >
                        <Play size={15} fill="currentColor" />
                        <span>{p1.videoUrl ? 'Watch Film' : 'View Assignment'}</span>
                        <ArrowRight size={15} />
                      </button>
                    )}

                    {p1.caseStudyEnabled !== false && p1.caseStudyUrl && (
                      <Link
                        href={p1.caseStudyUrl}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 1.15rem',
                          borderRadius: '9999px',
                          border: '1px solid rgba(0,0,0,0.14)',
                          backgroundColor: '#FFFFFF',
                          color: '#111113',
                          fontSize: '0.82rem',
                          fontWeight: 650,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span>{p1.caseStudyLabel || 'View case study ↗'}</span>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#111113', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ArrowRight size={12} />
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Right Media Collage / Clickable Video Thumbnail */}
              <div className="card-1-media-group">
                {/* Main Photo Card */}
                <div
                  className="card-1-main-photo"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: (p1.videoUrl || p1.redirectionUrl) ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (p1.videoUrl) setActiveVideoUrl(p1.videoUrl);
                    else if (p1.redirectionUrl) window.open(p1.redirectionUrl, '_blank');
                  }}
                >
                  <Image
                    src={p1.thumbnail || p1.image || '/images/army/western-command-1.jpg'}
                    alt={p1.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Clickable Play / Arrow Overlay */}
                  {(p1.videoUrl || p1.redirectionUrl) && (
                    <div className="video-thumb-overlay">
                      <div className="video-play-pulse-btn">
                        <Play size={22} fill="#ffffff" color="#ffffff" style={{ marginLeft: '3px' }} />
                      </div>
                    </div>
                  )}
                  <div className="photo-bottom-caption">
                    <span className="p-label">{p1.title}</span>
                    <span className="p-tag">{p1.videoUrl ? 'Click to Play Film' : 'Ceremonial Protocol & Honours'}</span>
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
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ----------------------------------------------------------------------
            CARD 2: "02 | 14 CORPS HEADQUARTERS" (TACTICAL DARK CARD)
            Enlarged 3 Interactive Cards (Title, Description, Image, Link, Toggle)
            Legacy fields (Scope of Work, Creative Approach, Production Discipline) Removed
            ---------------------------------------------------------------------- */}
        {(p2.published !== false && (activeCategory === 'all' || activeCategory === (p2.category || '14-corps'))) && (
          <article className="project-card card-dark" data-category={p2.category || '14-corps'}>
            {/* Top Meta Bar */}
            <div className="card-meta-bar">
              <div className="card-meta-left">
                <span className="meta-tag-pill">{p2.command}</span>
              </div>
              <div className="card-meta-right">
                {p2.location && (
                  <span className="meta-meta-item">
                    <MapPin size={13} />
                    {p2.location}
                  </span>
                )}
                {p2.date && (
                  <span className="meta-meta-item">
                    <Calendar size={13} />
                    {p2.date}
                  </span>
                )}
              </div>
            </div>

            {/* Top Row: Description + Large Interactive Cards */}
            <div className="card-2-top-grid">
              <div className="card-2-content-col">
                <h2 className="card-title card-2-title">
                  {p2.caseStudyEnabled !== false && (p2.caseStudyUrl || '/work/she') ? (
                    <Link href={p2.caseStudyUrl || '/work/she'} style={{ textDecoration: 'none', color: 'inherit' }} className="title-case-link">
                      {p2.title}
                    </Link>
                  ) : (
                    p2.title
                  )}
                </h2>
                <div className="card-subhead">
                  {p2.subtitle}
                </div>
                <p className="card-description">
                  {p2.description}
                </p>

                {(p2.caseStudyEnabled !== false && (p2.caseStudyUrl || '/work/she')) && (
                  <div style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                    <Link
                      href={p2.caseStudyUrl || '/work/she'}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 1.25rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255,255,255,0.25)',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 650,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{p2.caseStudyLabel || 'View case study ↗'}</span>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#DE322D', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  </div>
                )}

                {/* Visual Communication Featured Image */}
                <div
                  className="card-2-photo-preview"
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <Image
                    src={p2.image || '/images/army/14corps-hall-of-fame.jpg'}
                    alt={p2.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-2-photo-caption">14 Corps Field Documentation</div>
                </div>
              </div>

              {/* Right: 3 ENLARGED Interactive Cards */}
              <div className="interactive-cards-container">
                {(() => {
                  const defaultCards = [
                    {
                      id: 'c1',
                      title: 'First Villages',
                      description: 'Comprehensive outreach documentation across border settlements.',
                      image: p2.sidePhotos?.[0] || '/images/army/adgpi-firstvillages.jpg',
                      link: '/work',
                      enabled: true,
                    },
                    {
                      id: 'c2',
                      title: 'SHE Ladakh',
                      description: 'Women empowerment and healthcare visual communications initiative.',
                      image: p2.sidePhotos?.[1] || '/images/army/firefury-changthang-health.jpg',
                      link: '/work/she',
                      enabled: true,
                    },
                    {
                      id: 'c3',
                      title: 'Border Health',
                      description: 'On-ground medical support campaigns in remote high-altitude sectors.',
                      image: p2.sidePhotos?.[2] || '/images/army/adgpi-she-thumb-2.jpg',
                      link: '/work',
                      enabled: true,
                    },
                  ];
                  const cards = (p2.interactiveCards && p2.interactiveCards.length > 0)
                    ? p2.interactiveCards.filter((c: any) => c.enabled !== false)
                    : defaultCards;

                  return (
                    <div className="enlarged-interactive-cards-grid">
                      {cards.map((card: any, idx: number) => {
                        const cardContent = (
                          <div key={card.id || idx} className="enlarged-interactive-card">
                            <div className="enlarged-card-img-wrap">
                              <Image
                                src={card.image || '/images/army/adgpi-firstvillages.jpg'}
                                alt={card.title || 'Interactive Project Card'}
                                fill
                                sizes="(max-width: 768px) 100vw, 240px"
                                style={{ objectFit: 'cover' }}
                              />
                              <div className="enlarged-card-glow" />
                            </div>
                            <div className="enlarged-card-body">
                              <h4 className="enlarged-card-title">{card.title}</h4>
                              {card.description && <p className="enlarged-card-desc">{card.description}</p>}
                            </div>
                          </div>
                        );

                        if (card.link) {
                          return (
                            <Link key={card.id || idx} href={card.link} className="enlarged-card-anchor">
                              {cardContent}
                            </Link>
                          );
                        }
                        return cardContent;
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </article>
        )}

        {/* ----------------------------------------------------------------------
            CARD 3: "03 | FIRE & FURY CORPS" (CAROUSEL SECTION: 2-5 IMAGES)
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
              {/* Left Side: Title & Info */}
              <div>
                <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                  {p3.caseStudyEnabled !== false && (p3.caseStudyUrl || '/work/firefury') ? (
                    <Link href={p3.caseStudyUrl || '/work/firefury'} style={{ textDecoration: 'none', color: 'inherit' }} className="title-case-link">
                      {p3.title}
                    </Link>
                  ) : (
                    p3.title
                  )}
                </h2>
                <div className="card-subhead">
                  {p3.subtitle}
                </div>
                <p className="card-description">
                  {p3.description}
                </p>

                {p3.caseStudyEnabled !== false && p3.caseStudyUrl && (
                  <div style={{ marginTop: '1.25rem' }}>
                    <Link
                      href={p3.caseStudyUrl}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.55rem 1.15rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0,0,0,0.14)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.82rem',
                        fontWeight: 650,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{p3.caseStudyLabel || 'View case study ↗'}</span>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#111113', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  </div>
                )}

                {(p3.pdfUrl || p3.pdf) && (
                  <div style={{ marginTop: '1rem' }}>
                    <Link
                      href={`/pdf-viewer?url=${encodeURIComponent(p3.pdfUrl || p3.pdf)}&title=${encodeURIComponent(p3.title)}&subtitle=${encodeURIComponent(p3.subtitle || '')}&back=/indian-army-projects`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 1.25rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0,0,0,0.15)',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 650,
                        textDecoration: 'none',
                      }}
                    >
                      <FileText size={15} />
                      <span>View PDF Document</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Side: FIREFURY CORPS CAROUSEL (Min 2, Max 5 Images) */}
              <div className="card-3-visuals">
                {(() => {
                  const defaultCarousel = [
                    { id: '1', image: p3.image || '/uploads/1790516375474-firefury1.jpg', caption: 'Fire & Fury XIV Corps Publication Architecture', enabled: true },
                    { id: '2', image: p3.sidePhotos?.[0] || '/images/army/69armoured-2.jpg', caption: '69 Armoured Regiment Alpine Desert Formations', enabled: true },
                    { id: '3', image: p3.sidePhotos?.[1] || '/uploads/1790516827847-rezang-la-memorial.jpg', caption: 'Rezang La Commemorative Archive', enabled: true },
                  ];
                  const rawList = (p3.carouselImages && p3.carouselImages.length > 0)
                    ? p3.carouselImages.filter((img: any) => img.enabled !== false)
                    : defaultCarousel;
                  // Enforce min 2, max 5 images
                  const carouselImages = rawList.slice(0, 5);
                  if (carouselImages.length < 2 && defaultCarousel.length >= 2) {
                    carouselImages.push(defaultCarousel[1]);
                  }

                  const activeImg = carouselImages[firefuryIndex] || carouselImages[0];

                  return (
                    <div className="firefury-carousel-box">
                      {/* Active Large Display */}
                      <div className="carousel-main-slide">
                        <Image
                          src={activeImg?.image || '/uploads/1790516375474-firefury1.jpg'}
                          alt={activeImg?.caption || 'Fire & Fury Corps Archive'}
                          fill
                          sizes="(max-width: 768px) 100vw, 620px"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="carousel-slide-overlay">
                          <span className="carousel-slide-caption">{activeImg?.caption || 'Corps Visual Archive'}</span>
                          <span className="carousel-slide-counter">
                            {firefuryIndex + 1} / {carouselImages.length}
                          </span>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                          type="button"
                          className="carousel-nav-btn prev"
                          aria-label="Previous Slide"
                          onClick={() => {
                            setFirefuryIndex((prev) => (prev > 0 ? prev - 1 : carouselImages.length - 1));
                          }}
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          className="carousel-nav-btn next"
                          aria-label="Next Slide"
                          onClick={() => {
                            setFirefuryIndex((prev) => (prev < carouselImages.length - 1 ? prev + 1 : 0));
                          }}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </article>
        )}

        {/* ----------------------------------------------------------------------
            CARD 4: "04 | REZANG LA WAR MEMORIAL" (TACTICAL DARK CARD)
            Single Landscape Image Replacing 2 Square Images
            Legacy fields removed
            ---------------------------------------------------------------------- */}
        {(p4.published !== false && (activeCategory === 'all' || activeCategory === (p4.category || 'border-initiatives'))) && (
          <article className="project-card card-dark" data-category={p4.category || 'border-initiatives'}>
            {/* Top Meta Bar */}
            <div className="card-meta-bar">
              <div className="card-meta-left">
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
              {/* Left Side: Title & Description */}
              <div>
                <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                  {p4.caseStudyEnabled !== false && (p4.caseStudyUrl || '/work/rezang-la-memorial') ? (
                    <Link href={p4.caseStudyUrl || '/work/rezang-la-memorial'} style={{ textDecoration: 'none', color: 'inherit' }} className="title-case-link">
                      {p4.title}
                    </Link>
                  ) : (
                    p4.title
                  )}
                </h2>
                <div className="card-subhead">
                  {p4.subtitle}
                </div>
                <p className="card-description">
                  {p4.description}
                </p>

                {p4.caseStudyEnabled !== false && p4.caseStudyUrl && (
                  <div style={{ marginTop: '1.25rem' }}>
                    <Link
                      href={p4.caseStudyUrl}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 1.25rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255,255,255,0.25)',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 650,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{p4.caseStudyLabel || 'View case study ↗'}</span>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#DE322D', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  </div>
                )}

                {(p4.pdfUrl || p4.pdf) && (
                  <div style={{ marginTop: '1rem' }}>
                    <Link
                      href={`/pdf-viewer?url=${encodeURIComponent(p4.pdfUrl || p4.pdf)}&title=${encodeURIComponent(p4.title)}&subtitle=${encodeURIComponent(p4.subtitle || '')}&back=/indian-army-projects`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 1.25rem',
                        borderRadius: '9999px',
                        border: 'none',
                        backgroundColor: '#DE322D',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 650,
                        textDecoration: 'none',
                      }}
                    >
                      <FileText size={15} />
                      <span>View Rezang La PDF Document</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Right Side: ONE Landscape Image (Replacing 2 Square Archival Images) */}
              <div className="card-4-landscape-container">
                {(() => {
                  const landscapeSrc = p4.landscapeImage || p4.sidePhotos?.[0] || '/uploads/1790516827847-rezang-la-memorial.jpg';
                  const landscapeNode = (
                    <div className="rezang-single-landscape-wrap">
                      <Image
                        src={landscapeSrc}
                        alt={p4.title || 'Rezang La War Memorial Archival Landscape'}
                        fill
                        sizes="(max-width: 768px) 100vw, 650px"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="landscape-caption-pill">
                        <span>Rezang La War Memorial · High-Altitude Memorial Archival</span>
                      </div>
                    </div>
                  );

                  if (p4.landscapeImageLink) {
                    return (
                      <Link href={p4.landscapeImageLink} className="rezang-landscape-anchor">
                        {landscapeNode}
                      </Link>
                    );
                  }
                  return landscapeNode;
                })()}
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

            const hasVideo = Boolean(p.videoUrl);
            const isRezangLaLayout = p.layoutStyle === 'rezang-la' || hasVideo;

            return (
              <article key={p.id} className="project-card card-light" data-category={p.category}>
                <div className="card-meta-bar">
                  <div className="card-meta-left">
                    <span className="meta-tag-pill">{p.command}</span>
                  </div>
                  <div className="card-meta-right">
                    {p.location && <span className="meta-meta-item"><MapPin size={13} /> {p.location}</span>}
                    {p.date && <span className="meta-meta-item"><Calendar size={13} /> {p.date}</span>}
                  </div>
                </div>

                {isRezangLaLayout ? (
                  /* Rezang La Layout: 1 Vertical Image + 1 Landscape Image (Landscape is Clickable Video Thumbnail) */
                  <div className="card-4-grid" style={{ alignItems: 'center' }}>
                    <div>
                      <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                        {p.caseStudyEnabled !== false && p.caseStudyUrl ? (
                          <Link href={p.caseStudyUrl} style={{ textDecoration: 'none', color: 'inherit' }} className="title-case-link">
                            {p.title}
                          </Link>
                        ) : (
                          p.title
                        )}
                      </h2>
                      <div className="card-subhead">{p.subtitle}</div>
                      <p className="card-description">{p.description}</p>
                      {hasVideo && (
                        <div style={{ marginTop: '1.25rem' }}>
                          <button
                            type="button"
                            onClick={() => setActiveVideoUrl(p.videoUrl)}
                            className="hero-primary-btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                          >
                            <Play size={14} fill="currentColor" />
                            <span>Play Project Video</span>
                          </button>
                        </div>
                      )}

                      {p.caseStudyEnabled !== false && p.caseStudyUrl && (
                        <div style={{ marginTop: '1.25rem' }}>
                          <Link
                            href={p.caseStudyUrl}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              padding: '0.55rem 1.15rem',
                              borderRadius: '9999px',
                              border: '1px solid rgba(0,0,0,0.14)',
                              backgroundColor: '#FFFFFF',
                              color: '#111113',
                              fontSize: '0.82rem',
                              fontWeight: 650,
                              textDecoration: 'none',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <span>{p.caseStudyLabel || 'View case study ↗'}</span>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#111113', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <ArrowRight size={12} />
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="rezang-la-dual-media-grid">
                      {/* 1 Vertical Image */}
                      <div className="rezang-vertical-img-wrap">
                        <Image
                          src={p.verticalImage || p.image || '/images/army/western-command-official.jpg'}
                          alt={p.title}
                          fill
                          sizes="240px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      {/* 1 Landscape Image (Video Thumbnail with Play/Arrow Button) */}
                      <div
                        className="rezang-landscape-video-wrap"
                        style={{ cursor: hasVideo ? 'pointer' : 'default' }}
                        onClick={() => hasVideo && setActiveVideoUrl(p.videoUrl)}
                      >
                        <Image
                          src={p.landscapeImage || p.videoThumbnail || p.sidePhotos?.[0] || '/uploads/1790516827847-rezang-la-memorial.jpg'}
                          alt={`${p.title} Video Thumbnail`}
                          fill
                          sizes="400px"
                          style={{ objectFit: 'cover' }}
                        />
                        {hasVideo && (
                          <div className="video-thumb-overlay">
                            <div className="video-play-pulse-btn">
                              <Play size={22} fill="#ffffff" color="#ffffff" style={{ marginLeft: '3px' }} />
                            </div>
                          </div>
                        )}
                        <div className="landscape-caption-pill">
                          <span>{hasVideo ? 'Click to Watch Video' : p.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Project Layout */
                  <div className="card-1-grid">
                    <div>
                      <h2 className="card-title" style={{ whiteSpace: 'pre-line' }}>{p.title}</h2>
                      <div className="card-subhead">{p.subtitle}</div>
                      <p className="card-description">{p.description}</p>

                      {p.caseStudyEnabled !== false && p.caseStudyUrl && (
                        <div style={{ marginTop: '1.25rem' }}>
                          <Link
                            href={p.caseStudyUrl}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              padding: '0.55rem 1.15rem',
                              borderRadius: '9999px',
                              border: '1px solid rgba(0,0,0,0.14)',
                              backgroundColor: '#FFFFFF',
                              color: '#111113',
                              fontSize: '0.82rem',
                              fontWeight: 650,
                              textDecoration: 'none',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <span>{p.caseStudyLabel || 'View case study ↗'}</span>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#111113', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <ArrowRight size={12} />
                            </div>
                          </Link>
                        </div>
                      )}

                      {(p.pdfUrl || p.pdf) && (
                        <div style={{ marginTop: '1rem' }}>
                          <Link
                            href={`/pdf-viewer?url=${encodeURIComponent(p.pdfUrl || p.pdf)}&title=${encodeURIComponent(p.title)}&subtitle=${encodeURIComponent(p.subtitle || '')}&back=/indian-army-projects`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.55rem 1.25rem',
                              borderRadius: '9999px',
                              border: '1px solid rgba(0,0,0,0.15)',
                              backgroundColor: '#111113',
                              color: '#FFFFFF',
                              fontSize: '0.82rem',
                              fontWeight: 650,
                              textDecoration: 'none',
                            }}
                          >
                            <FileText size={15} />
                            <span>View PDF Document</span>
                          </Link>
                        </div>
                      )}
                    </div>
                    {p.image && (
                      <div style={{ position: 'relative', width: '100%', minHeight: '280px', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
                        <Image src={p.image} alt={p.title} fill sizes="450px" style={{ objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}

        {/* ----------------------------------------------------------------------
            PDF PUBLICATIONS (Clean Button Action → Opens PDF Viewer)
            ---------------------------------------------------------------------- */}
        {armyCms.coffeeTableBookPdf?.enabled !== false && (
          <div
            style={{
              marginTop: '3rem',
              padding: '1.75rem 2rem',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                INSTITUTIONAL PUBLICATION
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111113', margin: 0 }}>
                {armyCms.coffeeTableBookPdf?.title || 'Rezang La War Memorial Coffee Table Book'}
              </h3>
              {armyCms.coffeeTableBookPdf?.subtitle && (
                <p style={{ fontSize: '0.86rem', color: '#71717A', margin: '0.25rem 0 0' }}>
                  {armyCms.coffeeTableBookPdf.subtitle}
                </p>
              )}
            </div>

            <Link
              href={`/pdf-viewer?url=${encodeURIComponent(armyCms.coffeeTableBookPdf?.pdfUrl || '/pdf/coffee-table-book.pdf')}&title=${encodeURIComponent(armyCms.coffeeTableBookPdf?.title || 'Coffee Table Book')}&subtitle=${encodeURIComponent(armyCms.coffeeTableBookPdf?.subtitle || '')}&back=/indian-army-projects`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                backgroundColor: '#111113',
                color: '#FFFFFF',
                fontSize: '0.84rem',
                fontWeight: 650,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              }}
            >
              <FileText size={16} />
              <span>View PDF Publication ↗</span>
            </Link>
          </div>
        )}

        {armyCms.secondPdf?.enabled !== false && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1.75rem 2rem',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                DEFENCE ARCHIVE DOCUMENT
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111113', margin: 0 }}>
                {armyCms.secondPdf?.title || 'Indian Army Field Operations & Protocol Document'}
              </h3>
              {armyCms.secondPdf?.subtitle && (
                <p style={{ fontSize: '0.86rem', color: '#71717A', margin: '0.25rem 0 0' }}>
                  {armyCms.secondPdf.subtitle}
                </p>
              )}
            </div>

            <Link
              href={`/pdf-viewer?url=${encodeURIComponent(armyCms.secondPdf?.pdfUrl || '/pdf/army-field-document.pdf')}&title=${encodeURIComponent(armyCms.secondPdf?.title || 'Defence Document')}&subtitle=${encodeURIComponent(armyCms.secondPdf?.subtitle || '')}&back=/indian-army-projects`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.84rem',
                fontWeight: 650,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(222, 50, 45, 0.25)',
              }}
            >
              <FileText size={16} />
              <span>View PDF Document ↗</span>
            </Link>
          </div>
        )}
      </main>

      {/* ==========================================================================
          6. FULL-WIDTH PANORAMIC BANNER (Soldiers Silhouette Sunset Horizon)
          ========================================================================== */}
      {armyCms.closingBannerEnabled !== false && (
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
              <span>{closingBanner.buttonText || 'Start a conversation'}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Video Lightbox Modal */}
      {activeVideoUrl && (
        <div className="army-video-modal-backdrop" onClick={() => setActiveVideoUrl(null)}>
          <div className="army-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveVideoUrl(null)}
              aria-label="Close Video"
            >
              <X size={20} />
            </button>
            <div className="modal-iframe-wrapper">
              {activeVideoUrl.includes('youtube') || activeVideoUrl.includes('youtu.be') || activeVideoUrl.includes('vimeo') ? (
                <iframe
                  src={getEmbedUrl(activeVideoUrl)}
                  title="Project Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={activeVideoUrl} controls autoPlay style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          8. SCOPED COMPONENT STYLES MATCHING THE REFERENCE IMAGE EXACTLY
          ========================================================================== */}
      <style jsx>{`
        /* Clickable Video Thumb Overlay & Pulse Button */
        .video-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          transition: background 0.3s ease;
        }
        .clickable-video-thumb:hover .video-thumb-overlay,
        .rezang-landscape-video-wrap:hover .video-thumb-overlay {
          background: rgba(0, 0, 0, 0.2);
        }
        .video-play-pulse-btn {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #d8232a;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 0 rgba(216, 35, 42, 0.7);
          animation: videoPulse 2s infinite;
          transition: transform 0.25s ease;
        }
        .clickable-video-thumb:hover .video-play-pulse-btn,
        .rezang-landscape-video-wrap:hover .video-play-pulse-btn {
          transform: scale(1.1);
        }
        @keyframes videoPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(216, 35, 42, 0.7);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(216, 35, 42, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(216, 35, 42, 0);
          }
        }

        /* Enlarged Interactive Cards */
        .interactive-cards-container {
          width: 100%;
          max-width: 100%;
        }
        .enlarged-interactive-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .enlarged-interactive-cards-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.85rem;
          }
          .enlarged-card-body {
            padding: 0.85rem 0.65rem;
          }
          .enlarged-card-title {
            font-size: 0.88rem;
          }
          .enlarged-card-desc {
            font-size: 0.75rem;
          }
        }
        @media (max-width: 768px) {
          .enlarged-interactive-cards-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.65rem;
          }
          .enlarged-card-body {
            padding: 0.65rem 0.45rem;
          }
          .enlarged-card-title {
            font-size: 0.8rem;
          }
          .enlarged-card-desc {
            font-size: 0.7rem;
            line-height: 1.35;
          }
        }
        @media (max-width: 480px) {
          .enlarged-interactive-cards-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.45rem;
          }
          .enlarged-card-body {
            padding: 0.5rem 0.35rem;
          }
          .enlarged-card-title {
            font-size: 0.72rem;
            margin-bottom: 0.2rem;
          }
          .enlarged-card-desc {
            font-size: 0.64rem;
            line-height: 1.25;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        .enlarged-card-anchor {
          text-decoration: none;
          display: block;
          color: inherit;
        }
        .enlarged-interactive-card {
          background: #18191c;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .enlarged-interactive-card:hover {
          transform: translateY(-4px);
          border-color: rgba(216, 35, 42, 0.6);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
        }
        .enlarged-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }
        .enlarged-card-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(24, 25, 28, 0.95) 0%, transparent 60%);
        }
        .enlarged-card-body {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .enlarged-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.4rem 0;
        }
        .enlarged-card-desc {
          font-size: 0.8rem;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.65);
          margin: 0 0 0.75rem 0;
          flex-grow: 1;
        }
        .enlarged-card-link-text {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #d8232a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Firefury Carousel */
        .firefury-carousel-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .carousel-main-slide {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          min-height: 280px;
          border-radius: 8px;
          overflow: hidden;
          background: #0f1012;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
        }
        .carousel-slide-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ffffff;
          z-index: 2;
        }
        .carousel-slide-caption {
          font-size: 0.85rem;
          font-weight: 600;
        }
        .carousel-slide-counter {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }
        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
          z-index: 3;
        }
        .carousel-nav-btn:hover {
          background: #d8232a;
        }
        .carousel-nav-btn.prev {
          left: 12px;
        }
        .carousel-nav-btn.next {
          right: 12px;
        }
        .carousel-thumb-strip {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .carousel-thumb-btn {
          position: relative;
          width: 72px;
          height: 48px;
          border-radius: 4px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          flex-shrink: 0;
          opacity: 0.65;
          transition: opacity 0.2s, border-color 0.2s;
        }
        .carousel-thumb-btn.active,
        .carousel-thumb-btn:hover {
          opacity: 1;
          border-color: #d8232a;
        }

        /* Rezang La Single Landscape Layout */
        .card-4-landscape-container {
          width: 100%;
        }
        .rezang-single-landscape-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9.5;
          min-height: 290px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .rezang-landscape-anchor {
          text-decoration: none;
          display: block;
        }
        .landscape-caption-pill {
          position: absolute;
          left: 14px;
          bottom: 14px;
          background: rgba(0, 0, 0, 0.75);
          color: rgba(255, 255, 255, 0.9);
          padding: 6px 14px;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 500;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 2;
        }

        /* Dual Media Grid for Project Video + Rezang La Layout */
        .rezang-la-dual-media-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 1.25rem;
          align-items: stretch;
          width: 100%;
        }
        .rezang-vertical-img-wrap {
          position: relative;
          width: 100%;
          min-height: 260px;
          aspect-ratio: 3 / 4;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .rezang-landscape-video-wrap {
          position: relative;
          width: 100%;
          min-height: 260px;
          aspect-ratio: 16 / 10;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        /* Video Modal Lightbox */
        .army-video-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          backdrop-filter: blur(8px);
        }
        .army-video-modal-content {
          position: relative;
          width: 100%;
          max-width: 900px;
          background: #000000;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
        }
        .modal-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s;
        }
        .modal-close-btn:hover {
          background: #d8232a;
        }
        .modal-iframe-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect */
          height: 0;
        }
        .modal-iframe-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

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
        .title-case-link {
          transition: color 0.2s ease, opacity 0.2s ease;
          display: inline-block;
        }
        .title-case-link:hover {
          color: #de322d !important;
          opacity: 0.92;
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
          grid-template-columns: 1fr 1.25fr;
          gap: clamp(1.75rem, 3.5vw, 3.5rem);
          align-items: center;
          margin-bottom: 2.5rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .card-2-content-col {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow: visible;
        }

        .card-2-title {
          font-size: clamp(1.65rem, 3.2vw, 2.75rem);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.03em;
          margin: 0 0 0.85rem 0;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .card-2-photo-preview,
        .card-2-video-preview {
          position: relative;
          width: 100%;
          max-width: 100%;
          aspect-ratio: 16/9;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
          margin-top: 1.5rem;
          background: #18191c;
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
          gap: clamp(0.75rem, 1.8vw, 1.5rem);
          perspective: 1000px;
          padding: 1rem 0;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .book-3d-item {
          position: relative;
          width: clamp(105px, 12.5vw, 155px);
          aspect-ratio: 1 / 1.48;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: -8px 14px 30px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3);
          transform: rotateY(-10deg) rotateX(3deg);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          background: #18191c;
          border-left: 3px solid rgba(255, 255, 255, 0.3);
          flex-shrink: 1;
        }

        .book-3d-item.featured {
          transform: rotateY(-6deg) rotateX(2deg) scale(1.04);
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
        @media (max-width: 1200px) {
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
            gap: 2.25rem;
          }
          .card-2-top-grid {
            margin-bottom: 2rem;
          }
          .card-2-content-col {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
          .card-2-title {
            font-size: clamp(1.55rem, 3.2vw, 2.2rem) !important;
            line-height: 1.15 !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
          }
          .card-2-bottom-row {
            grid-template-columns: 1fr;
            margin-top: 1.5rem;
          }
          .books-showcase-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: clamp(1rem, 2.5vw, 1.5rem);
            padding: 1.25rem 0;
            width: 100%;
            max-width: 100%;
          }
          .book-3d-item {
            width: clamp(110px, 16vw, 145px);
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
          .card-2-top-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            margin-bottom: 1.25rem !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .card-2-content-col {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
          .card-2-title {
            font-size: clamp(1.35rem, 5.5vw, 1.85rem) !important;
            line-height: 1.15 !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
          }
          .card-subhead {
            font-size: 0.88rem !important;
            line-height: 1.4 !important;
            margin-bottom: 0.75rem !important;
          }
          .card-description {
            font-size: 0.88rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1.25rem !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
          }
          .card-2-photo-preview {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            aspect-ratio: 16 / 9 !important;
            margin-top: 1.25rem !important;
            box-sizing: border-box !important;
          }
          .card-2-photo-caption {
            bottom: 8px !important;
            right: 10px !important;
            font-size: 0.7rem !important;
            padding: 3px 8px !important;
            max-width: calc(100% - 20px) !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .books-showcase-row {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            gap: clamp(6px, 2vw, 12px) !important;
            padding: 1rem 0 !important;
            overflow: visible !important;
            width: 100% !important;
            max-width: 100% !important;
            perspective: 500px !important;
            box-sizing: border-box !important;
          }
          .book-3d-item {
            flex: 0 1 auto !important;
            min-width: 0 !important;
            width: clamp(72px, 26vw, 110px) !important;
            max-width: 110px !important;
            aspect-ratio: 1 / 1.48 !important;
            transform: rotateY(-5deg) rotateX(1deg) !important;
            box-shadow: -4px 8px 16px rgba(0, 0, 0, 0.5) !important;
          }
          .book-3d-item.featured {
            transform: rotateY(0deg) scale(1.03) !important;
            box-shadow: -6px 10px 20px rgba(0, 0, 0, 0.6) !important;
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
          .card-title,
          .card-2-title {
            font-size: clamp(1.25rem, 5.2vw, 1.55rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 0.5rem !important;
          }
          .card-subhead {
            font-size: 0.82rem !important;
            line-height: 1.35 !important;
            margin-bottom: 0.65rem !important;
          }
          .card-description {
            font-size: 0.84rem !important;
            line-height: 1.5 !important;
            margin-bottom: 1rem !important;
          }
          .card-2-top-grid {
            gap: 1.15rem !important;
          }
          .card-2-photo-preview {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            aspect-ratio: 16 / 9 !important;
            border-radius: 6px !important;
          }
          .card-2-photo-caption {
            font-size: 0.65rem !important;
            padding: 3px 8px !important;
          }
          .books-showcase-row {
            gap: 6px !important;
            padding: 0.75rem 0 !important;
            perspective: 400px !important;
          }
          .book-3d-item {
            width: clamp(65px, 27vw, 92px) !important;
            max-width: 92px !important;
            transform: rotateY(-3deg) !important;
            border-radius: 4px !important;
          }
          .book-3d-item.featured {
            transform: rotateY(0deg) scale(1.02) !important;
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
