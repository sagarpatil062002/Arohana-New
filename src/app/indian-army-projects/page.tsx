'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  MapPin,
  Calendar,
  ArrowUpRight,
  Play,
  ArrowRight,
  ChevronRight,
  X,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Assignments', count: '06' },
  { id: 'western-command', label: 'HQ Western Command', count: '02' },
  { id: '14-corps', label: '14 Corps & High Altitude', count: '02' },
  { id: 'border-initiatives', label: 'Border Initiatives', count: '02' },
];

export default function IndianArmyProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSpreadPage, setActiveSpreadPage] = useState('01');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="army-page-wrapper">
      
      {/* ==========================================================================
          1. HERO SECTION
          ========================================================================== */}
      <section className="army-hero-section">
        <div className="army-container army-hero-grid">
          
          {/* Left Column: Heading & Lead */}
          <div className="army-hero-left">
            <div className="army-hero-tag">
              <Shield size={14} className="shield-icon" />
              <span>DEFENCE &amp; INSTITUTIONAL PRODUCTION</span>
            </div>

            <h1 className="army-hero-title">
              Stories<br />of service<span className="dot-red">.</span>
            </h1>

            <p className="army-hero-subtext">
              On-location film direction, ceremonial protocol documentation, and high-altitude field
              production conducted directly with Army formations and institutional headquarters.
            </p>

            <a href="#projects-showcase" className="army-scroll-link">
              <span className="scroll-arrow-circle">
                <ArrowRight size={15} />
              </span>
              <span>SCROLL TO EXPLORE</span>
            </a>
          </div>

          {/* Right Column: Exact Visual Collage from Reference Image */}
          <div className="army-hero-right">
            <div className="army-hero-composition">
              
              {/* Concentric Radar / Topographic Contour Lines */}
              <div className="contour-radar-ring outer-ring" />
              <div className="contour-radar-ring inner-ring" />

              {/* Main Soldier Photo Card */}
              <div className="soldier-main-card">
                <Image
                  src="/images/army/army-hero.jpg"
                  alt="High-Altitude Indian Army documentation by Ārohana"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                />
              </div>

              {/* Overlapping Angled Postcard with Cursive Calligraphy */}
              <div className="script-postcard">
                <Image
                  src="/images/home/hero-mountain-sky.png"
                  alt="People Places Purpose"
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(0.65) contrast(1.1)' }}
                />
                <div className="script-postcard-text">
                  People<br />Places<br />Purpose<br />A Stronger<br />Tomorrow
                </div>
              </div>

              {/* Far Right Typographic Vertical Stack */}
              <div className="hero-editorial-stack">
                <div className="editorial-words">
                  INDIAN ARMY<br />
                  PEOPLE<br />
                  PLACES<br />
                  PURPOSE<br />
                  A STRONGER<br />
                  TOMORROW
                </div>

                <div className="mountain-mini-thumb">
                  <Image
                    src="/images/army/14corps-2.jpg"
                    alt="Ladakh Mountain Peaks"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="editorial-values">
                  TRUSTED<br />
                  DISCIPLINED<br />
                  DOCUMENTED<br />
                  <span className="red-status-dot" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================================
          2. STATS SECTION (4 Columns with Clean Vertical Dividers)
          ========================================================================== */}
      <section className="army-stats-section" id="projects-showcase">
        <div className="army-container">
          <div className="army-stats-row">
            
            <div className="stat-item">
              <div className="stat-number">14,000+ FT</div>
              <div className="stat-caption">Ladakh High-Altitude Operations</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">FEB 2026</div>
              <div className="stat-caption">Western Command Investiture</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">06 ASSIGNMENTS</div>
              <div className="stat-caption">Verified Institutional Briefs</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-caption">Protocol Clearance &amp; Security</div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
          3. INSTITUTIONAL INTEGRITY BANNER
          ========================================================================== */}
      <div className="army-container">
        <div className="integrity-card">
          <div className="integrity-pulse-dot" />
          <p className="integrity-copy">
            <strong>Institutional Integrity:</strong> All presented Indian Army project materials represent
            verified shoot direction, post-production and communication assignments executed under authorized
            institutional protocols. No confidential operational details are disclosed.
          </p>
        </div>
      </div>

      {/* ==========================================================================
          4. FILTER PILL TABS
          ========================================================================== */}
      <div className="army-container">
        <div className="filter-pill-row">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-pill-btn ${isActive ? 'active' : ''}`}
              >
                <span>{cat.label}</span>
                <span className={`cat-count ${isActive ? 'active-count' : ''}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==========================================================================
          5. PROJECT CARDS SHOWCASE
          ========================================================================== */}
      <div className="army-container projects-vertical-list">

        {/* ----------------------------------------------------------------------
            PROJECT CARD 1: "01 | INVESTITURE CEREMONY" (LIGHT CARD)
            ---------------------------------------------------------------------- */}
        {(activeCategory === 'all' || activeCategory === 'western-command') && (
          <article className="project-card-light">
            
            {/* Meta Top Bar */}
            <div className="card-top-bar light-bar">
              <div className="card-top-left">
                <span className="card-index-num">01</span>
                <span className="card-tag-pill light-pill">WESTERN COMMAND</span>
              </div>
              <div className="card-top-right light-meta">
                <span className="meta-pair">
                  <MapPin size={13} className="meta-icon" />
                  HQ Western Command Theatre
                </span>
                <span className="meta-pair">
                  <Calendar size={13} className="meta-icon" />
                  February 2026
                </span>
              </div>
            </div>

            <div className="card-one-grid">
              
              {/* Left Column: Heading & 3 Sub-sections */}
              <div className="card-one-left">
                <h2 className="card-title-main">Investiture<br />Ceremony</h2>
                <div className="card-subtitle-main">
                  Ceremonial protocol shoot and documentary post-production.
                </div>
                <p className="card-desc-main">
                  Ārohana handled the shoot and post-production for the Western Command Investiture
                  Ceremony in February 2026.
                </p>

                {/* 3 Sub-sections */}
                <div className="card-subsections-triplet">
                  <div className="subsection-col light-box">
                    <div className="subsection-label label-red">SCOPE OF WORK</div>
                    <p className="subsection-text">
                      Coverage of formal investiture protocols, honors and awards distribution, parade sequences.
                    </p>
                  </div>
                  <div className="subsection-col light-box">
                    <div className="subsection-label">CREATIVE APPROACH</div>
                    <p className="subsection-text">
                      Restrained, dignified visual pacing tailored to military protocol and ceremonial integrity.
                    </p>
                  </div>
                  <div className="subsection-col light-box">
                    <div className="subsection-label">PRODUCTION DISCIPLINE</div>
                    <p className="subsection-text">
                      Tight turnaround master post-production with multi-track sound engineering and high-definition mastering.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="card-action-link"
                >
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Right Column: Video & Marching/Medal Photos */}
              <div className="card-one-media-grid">
                
                {/* Large Video Card */}
                <div
                  className="card-one-video"
                  onClick={() => setIsVideoModalOpen(true)}
                  role="button"
                  tabIndex={0}
                >
                  <Image
                    src="/images/army/western-command-1.jpg"
                    alt="Western Command Investiture Ceremony honours"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="play-button-frost">
                    <Play size={18} fill="#111" />
                  </div>
                  <div className="video-time-overlay">
                    <div className="v-label">Watch Project Film</div>
                    <div className="v-duration">02:14</div>
                  </div>
                </div>

                {/* Stacked Photos */}
                <div className="card-one-sub-stack">
                  <div className="sub-stack-photo">
                    <Image
                      src="/images/army/western-command-2.jpg"
                      alt="Ceremonial parade contingent"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="sub-stack-photo">
                    <Image
                      src="/images/army/symbolic-army-terrain.jpg"
                      alt="Medals and insignia documentation"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="plus-badge">+4</span>
                  </div>
                </div>

              </div>

            </div>
          </article>
        )}

        {/* ----------------------------------------------------------------------
            PROJECT CARD 2: "02 | 14 CORPS HEADQUARTERS" (TACTICAL DARK CARD)
            ---------------------------------------------------------------------- */}
        {(activeCategory === 'all' || activeCategory === '14-corps') && (
          <article className="project-card-dark">
            
            {/* Meta Top Bar */}
            <div className="card-top-bar dark-bar">
              <div className="card-top-left">
                <span className="card-index-num">02</span>
                <span className="card-tag-pill dark-pill">14 CORPS HEADQUARTERS</span>
              </div>
              <div className="card-top-right dark-meta">
                <span className="meta-pair">
                  <MapPin size={13} className="meta-icon" />
                  Leh &amp; Indus Valley, Ladakh
                </span>
                <span className="meta-pair">
                  <Calendar size={13} className="meta-icon" />
                  2023 – Present
                </span>
              </div>
            </div>

            {/* Top Grid: Description on Left & 3D Publications on Right */}
            <div className="card-two-top-grid">
              
              <div className="card-two-left">
                <h2 className="card-title-main dark-title">Communication<br />&amp; Production</h2>
                <div className="card-subtitle-main dark-sub">
                  High-altitude visual communication, films and archival design.
                </div>
                <p className="card-desc-main dark-desc">
                  Ārohana has undertaken communication, design and video-production work for 14 Corps
                  Headquarters, including visual communication and films developed through scripting, voice-over,
                  editing and sound.
                </p>

                {/* Left Mini Video Card */}
                <div
                  className="card-two-video-preview"
                  onClick={() => setIsVideoModalOpen(true)}
                  role="button"
                  tabIndex={0}
                >
                  <Image
                    src="/images/army/14corps-2.jpg"
                    alt="High-Altitude Stories by 14 Corps"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="play-button-frost small">
                    <Play size={14} fill="#111" />
                  </div>
                  <span className="video-preview-badge">High-Altitude Stories</span>
                </div>
              </div>

              {/* Right: Three 3D Publications Standing Upright */}
              <div className="books-shelf-row">
                
                {/* Book 1 */}
                <div className="standing-3d-book">
                  <Image
                    src="/images/army/69armoured-1.jpg"
                    alt="Courage Lives Higher"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="book-depth-glare" />
                  <div className="book-cover-title">COURAGE<br />LIVES HIGHER</div>
                </div>

                {/* Book 2 */}
                <div className="standing-3d-book featured">
                  <Image
                    src="/images/army/army-hero.jpg"
                    alt="Guardians of the North"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="book-depth-glare" />
                  <div className="book-cover-title">GUARDIANS<br />OF THE NORTH</div>
                </div>

                {/* Book 3 */}
                <div className="standing-3d-book">
                  <Image
                    src="/images/army/14corps-1.jpg"
                    alt="People Terrains Stories"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="book-depth-glare" />
                  <div className="book-cover-title">PEOPLE<br />TERRAINS<br />STORIES</div>
                </div>

              </div>

            </div>

            {/* Bottom Row: 3 Sub-sections + Navigation Action */}
            <div className="card-two-bottom-row">
              <div className="card-subsections-triplet">
                <div className="subsection-col dark-box">
                  <div className="subsection-label dark-label">SCOPE OF WORK</div>
                  <p className="subsection-text dark-text">
                    Institutional communications campaign, internal and public-facing visual communication, and video production.
                  </p>
                </div>
                <div className="subsection-col dark-box">
                  <div className="subsection-label dark-label">CREATIVE APPROACH</div>
                  <p className="subsection-text dark-text">
                    Authentic high-altitude cinematography paired with authoritative scripting and professional narration.
                  </p>
                </div>
                <div className="subsection-col dark-box">
                  <div className="subsection-label dark-label">PRODUCTION DISCIPLINE</div>
                  <p className="subsection-text dark-text">
                    Field filming in sub-zero and remote mountain environments requiring specialised equipment and acclimatised crews.
                  </p>
                </div>
              </div>

              <div className="card-two-actions">
                <Link href="/contact" className="btn-tactical-pill">
                  <span>View Project</span>
                  <ArrowUpRight size={14} />
                </Link>
                <button
                  type="button"
                  aria-label="Next Project"
                  className="btn-tactical-circle"
                  onClick={() => {
                    const el = document.getElementById('card-three-fury');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </article>
        )}

        {/* ----------------------------------------------------------------------
            PROJECT CARD 3: "03 | FIRE & FURY CORPS" (LIGHT CARD)
            ---------------------------------------------------------------------- */}
        {(activeCategory === 'all' || activeCategory === '14-corps') && (
          <article className="project-card-light" id="card-three-fury">
            
            {/* Meta Top Bar */}
            <div className="card-top-bar light-bar">
              <div className="card-top-left">
                <span className="card-index-num">03</span>
                <span className="card-tag-pill light-pill">FIRE &amp; FURY CORPS</span>
              </div>
              <div className="card-top-right light-meta">
                <span className="meta-pair">
                  <MapPin size={13} className="meta-icon" />
                  Ladakh Theatre
                </span>
                <span className="meta-pair">
                  <Calendar size={13} className="meta-icon" />
                  Multi-Year Engagements
                </span>
              </div>
            </div>

            <div className="card-three-grid">
              
              {/* Left Column: Heading & Vertical Dotted Stepper */}
              <div className="card-three-left">
                <h2 className="card-title-main">Corps-Level<br />Communication &amp; Publications</h2>
                <div className="card-subtitle-main">
                  XIV Corps communication, publications and community initiatives.
                </div>
                <p className="card-desc-main">
                  Fire &amp; Fury Corps is the designation associated with XIV Corps. Ārohana has
                  undertaken project work across communication, publications, video and community-facing initiatives.
                </p>

                {/* Vertical Dotted Stepper Timeline */}
                <div className="vertical-dotted-stepper">
                  <div className="stepper-node-item active-node">
                    <div className="node-dot" />
                    <div className="node-content">
                      <div className="node-title red-title">SCOPE OF WORK</div>
                      <p className="node-desc">
                        Spans historical commemorative literature, community welfare communication, and social video production.
                      </p>
                    </div>
                  </div>

                  <div className="stepper-node-item">
                    <div className="node-dot" />
                    <div className="node-content">
                      <div className="node-title">CREATIVE APPROACH</div>
                      <p className="node-desc">
                        Balancing historical gravitas with contemporary digital readability across diverse audiences.
                      </p>
                    </div>
                  </div>

                  <div className="stepper-node-item">
                    <div className="node-dot" />
                    <div className="node-content">
                      <div className="node-title">PRODUCTION DISCIPLINE</div>
                      <p className="node-desc">
                        Seamless integration between on-ground research, military history curation, and modern typography.
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/contact" className="card-action-link">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* Right Column: Open Book Spread & Thumbnails */}
              <div className="card-three-visuals">
                
                <div className="spread-composition-box">
                  {/* Standing Volume */}
                  <div className="fury-standing-book">
                    <Image
                      src="/images/army/fire-fury-1.jpg"
                      alt="Fire & Fury XIV Corps hardbound volume"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Open 2-Page Spread */}
                  <div className="open-two-page-spread">
                    <div className="open-page-left">
                      <h3>IN SERVICE<br />OF A GREATER<br />TOMORROW</h3>
                    </div>
                    <div className="open-page-right">
                      <Image
                        src="/images/army/vibrant-villages-1.jpg"
                        alt="High Ladakh Plateau"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        aria-label="Next spread image"
                        className="spread-nav-arrow"
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

                {/* Thumbnails Row + Pagination */}
                <div className="spread-thumbs-bar">
                  <div className="spread-mini-thumbs">
                    <div className="mini-thumb-pic">
                      <Image
                        src="/images/army/69armoured-2.jpg"
                        alt="Spread 1"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="mini-thumb-pic">
                      <Image
                        src="/images/army/rezang-la-2.jpg"
                        alt="Spread 2"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="mini-thumb-pic">
                      <Image
                        src="/images/army/sampark-1.jpg"
                        alt="Spread 3"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  <div className="spread-pagination-pills">
                    {['01', '02', '03', '04'].map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setActiveSpreadPage(pg)}
                        className={`pg-tab-btn ${activeSpreadPage === pg ? 'active' : ''}`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </article>
        )}

        {/* ----------------------------------------------------------------------
            PROJECT CARD 4: "04 | REZANG LA WAR MEMORIAL" (TACTICAL DARK CARD)
            ---------------------------------------------------------------------- */}
        {(activeCategory === 'all' || activeCategory === 'border-initiatives') && (
          <article className="project-card-dark">
            
            {/* Meta Top Bar */}
            <div className="card-top-bar dark-bar">
              <div className="card-top-left">
                <span className="card-index-num">04</span>
                <span className="card-tag-pill dark-pill">FIRE &amp; FURY CORPS</span>
              </div>
              <div className="card-top-right dark-meta">
                <span className="meta-pair">
                  <MapPin size={13} className="meta-icon" />
                  Chushul Sector, Ladakh (16,000+ ft)
                </span>
                <span className="meta-pair">
                  <Calendar size={13} className="meta-icon" />
                  Commemorative Edition
                </span>
              </div>
            </div>

            <div className="card-four-grid">
              
              {/* Left Column: Heading & 3 Subsections */}
              <div className="card-four-left">
                <h2 className="card-title-main dark-title">Rezang La<br />War Memorial</h2>
                <div className="card-subtitle-main dark-sub">
                  Commemorative coffee-table book design and visual communication.
                </div>
                <p className="card-desc-main dark-desc">
                  Coffee-table book design and visual communication for the Rezang La War Memorial.
                </p>

                <div className="card-subsections-triplet">
                  <div className="subsection-col dark-box">
                    <div className="subsection-label dark-label">SCOPE OF WORK</div>
                    <p className="subsection-text dark-text">
                      Complete publication design including hardbound cover architecture, typographic systems, and archival photo restoration.
                    </p>
                  </div>
                  <div className="subsection-col dark-box">
                    <div className="subsection-label dark-label">CREATIVE APPROACH</div>
                    <p className="subsection-text dark-text">
                      Subtle, dignified layout allowing historical accounts and veteran testimonies to stand out with gravitas.
                    </p>
                  </div>
                  <div className="subsection-col dark-box">
                    <div className="subsection-label dark-label">PRODUCTION DISCIPLINE</div>
                    <p className="subsection-text dark-text">
                      High-specification tactile print finishing, custom clothbound styling, and museum-grade archival reproduction.
                    </p>
                  </div>
                </div>

                <Link href="/contact" className="card-action-link">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* Right Column: Hardbound Book + Archival Photos + Handwritten Script */}
              <div className="card-four-media-composition">
                
                {/* Standing Hardbound Volume */}
                <div className="rezang-standing-book">
                  <Image
                    src="/images/army/rezang-la-1.jpg"
                    alt="Rezang La An Epic of Eternal Valour"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="book-depth-glare" />
                </div>

                {/* Archival Photos Column */}
                <div className="rezang-archival-stack">
                  <div className="archival-pic-card">
                    <Image
                      src="/images/army/rezang-la-2.jpg"
                      alt="1962 Battlefield Memorial Archival"
                      fill
                      style={{ objectFit: 'cover', filter: 'grayscale(0.75) contrast(1.1)' }}
                    />
                  </div>
                  <div className="archival-pic-card">
                    <Image
                      src="/images/army/symbolic-army-terrain.jpg"
                      alt="Chushul Sector High Altitude"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* Handwritten Script Calligraphy */}
                <div className="rezang-script-box">
                  <div className="script-lines">
                    Some<br />sacrifices<br />never fade.
                  </div>
                  <div className="script-author">— REZANG LA</div>
                </div>

                <button
                  type="button"
                  aria-label="Next"
                  className="btn-tactical-circle card-four-next"
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

      </div>

      {/* ==========================================================================
          6. FULL-WIDTH PANORAMIC BANNER (Soldiers Sunset Horizon)
          ========================================================================== */}
      <section className="army-container banner-container-wrap" id="closing-panoramic-banner">
        <div className="panoramic-banner-box">
          
          <div className="banner-backdrop-img">
            <Image
              src="/images/army/symbolic-army-terrain.jpg"
              alt="Soldiers on high-altitude ridge patrol at dusk"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center bottom', filter: 'brightness(0.68) contrast(1.15)' }}
            />
          </div>

          <div className="banner-dark-gradient" />

          {/* Left Text & CTA */}
          <div className="banner-text-content">
            <div className="banner-tagline">
              PEOPLE · PLACES · SACRIFICE · A STRONGER TOMORROW
            </div>
            <h2 className="banner-main-title">
              Documenting<br />a stronger tomorrow
            </h2>
            <p className="banner-subtitle">
              Trusted by our armed forces. Crafted with responsibility.
            </p>

            <Link href="/contact" className="banner-cta-button">
              <span>Let&apos;s Discuss a Project</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Right Script Signature */}
          <div className="banner-script-signature">
            For<br />Those<br />Who Protect<br />Ours.
          </div>

        </div>
      </section>

      {/* ==========================================================================
          7. EXACT SITE FOOTER (MATCHING REFERENCE IMAGE)
          ========================================================================== */}
      <footer className="army-exact-footer">
        <div className="army-container">
          <div className="footer-cols-grid">
            
            {/* Col 1: Brand */}
            <div className="f-col-brand">
              <div className="f-brand-logo">ĀROHANA</div>
              <p className="f-brand-tagline">
                Strategic Communication.<br />
                Real-World Impact.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="f-col-nav">
              <Link href="/" className="f-nav-item">Home</Link>
              <Link href="/about" className="f-nav-item">Studio</Link>
              <Link href="/work" className="f-nav-item">Work</Link>
              <Link href="/services" className="f-nav-item">Services</Link>
              <Link href="/tourin" className="f-nav-item">Tourin</Link>
              <Link href="/indian-army-projects" className="f-nav-item f-active-link">Army Projects</Link>
              <Link href="/contact" className="f-nav-item">Contact</Link>
            </div>

            {/* Col 3: Office */}
            <div className="f-col-office">
              <div className="f-heading">OFFICE</div>
              <p className="f-company-name">ĀROHANA Consultancy</p>
              <p className="f-address">
                GG Godbole Square, Aundh-Ravet BRTS Rd,<br />
                Near 3 Murti, Thergaon, Pune 411033, India.
              </p>
              <p className="f-contact-line">
                <a href="mailto:founder@byarohana.com">founder@byarohana.com</a>
              </p>
              <p className="f-contact-line">
                <a href="tel:+918280062241">+91 82800 62241</a>
              </p>
            </div>

            {/* Col 4: Social */}
            <div className="f-col-social">
              <div className="f-heading">SOCIAL</div>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="f-social-item">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="f-social-item">Instagram</a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="f-social-item">Behance</a>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-line">
            <div>&copy; 2025 Ārohana Consultancy. All Rights Reserved.</div>
            <div>Pune &middot; Ladakh &middot; Pan-India Engagements</div>
            <div>Army Projects | Institutional Production</div>
          </div>
        </div>
      </footer>

      {/* ==========================================================================
          VIDEO MODAL OVERLAY
          ========================================================================== */}
      {isVideoModalOpen && (
        <div
          className="army-video-modal-backdrop"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="army-video-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-icon"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <div className="modal-video-wrapper">
              <video controls autoPlay poster="/images/army/western-command-1.jpg">
                <source src="/services.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          SCOPED STYLES (MATCHING REFERENCE IMAGE 100%)
          ========================================================================== */}
      <style jsx>{`
        /* Page Base */
        .army-page-wrapper {
          background-color: #f6f6f4;
          color: #111111;
          font-family: var(--font-display);
          overflow-x: hidden;
        }

        .army-container {
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3.5rem);
        }

        /* Hero Section */
        .army-hero-section {
          padding-top: clamp(2rem, 4.5vw, 3.5rem);
          padding-bottom: clamp(3rem, 5vw, 4.5rem);
          position: relative;
        }

        .army-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4vw, 4.5rem);
          align-items: center;
        }

        .army-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #444444;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .army-hero-title {
          font-size: clamp(3rem, 6.2vw, 5.75rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: #111111;
          margin-bottom: 1.75rem;
        }

        .dot-red {
          color: #de322d;
        }

        .army-hero-subtext {
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          line-height: 1.6;
          color: #555555;
          max-width: 540px;
          margin-bottom: 2.75rem;
        }

        .army-scroll-link {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #222222;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .scroll-arrow-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .army-scroll-link:hover .scroll-arrow-circle {
          border-color: #de322d;
          background-color: #de322d;
          color: #ffffff;
          transform: translateY(2px);
        }

        /* Hero Right Composition */
        .army-hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .army-hero-composition {
          position: relative;
          width: 100%;
          max-width: 580px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .contour-radar-ring {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.08);
          pointer-events: none;
          z-index: 1;
        }

        .outer-ring {
          width: 520px;
          height: 520px;
        }

        .inner-ring {
          width: 360px;
          height: 360px;
        }

        .soldier-main-card {
          position: relative;
          z-index: 3;
          width: clamp(280px, 32vw, 390px);
          height: clamp(380px, 44vw, 500px);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16);
          background-color: #1a1c20;
        }

        .script-postcard {
          position: absolute;
          left: clamp(-25px, -4vw, -45px);
          top: 28%;
          z-index: 5;
          width: clamp(160px, 18vw, 210px);
          height: clamp(110px, 14vw, 150px);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
          border: 2px solid rgba(255, 255, 255, 0.85);
          transform: rotate(-3deg);
          transition: transform 0.4s ease;
        }

        .script-postcard:hover {
          transform: rotate(0deg) scale(1.04);
        }

        .script-postcard-text {
          position: absolute;
          inset: 0;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #ffffff;
          font-family: 'Caveat', cursive, sans-serif;
          font-size: 1.35rem;
          line-height: 1.15;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .hero-editorial-stack {
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          width: 140px;
          pointer-events: none;
        }

        .editorial-words {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #666;
          line-height: 1.55;
          text-transform: uppercase;
        }

        .mountain-mini-thumb {
          position: relative;
          width: 100px;
          height: 75px;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          border: 1px solid rgba(0,0,0,0.08);
          pointer-events: auto;
        }

        .editorial-values {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #444;
          line-height: 1.6;
          text-transform: uppercase;
        }

        .red-status-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #de322d;
          margin-top: 6px;
        }

        /* Stats Row */
        .army-stats-section {
          padding: clamp(1.5rem, 3vw, 2.5rem) 0;
          margin-bottom: 2rem;
        }

        .army-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: stretch;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 1.75rem 0;
        }

        .stat-item {
          padding: 0 1.5rem;
          position: relative;
        }

        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background-color: rgba(0, 0, 0, 0.1);
        }

        .stat-item:first-child {
          padding-left: 0;
        }

        .stat-item:last-child {
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

        .stat-caption {
          font-size: 0.82rem;
          color: #666666;
          line-height: 1.35;
          font-weight: 500;
        }

        /* Integrity Notice */
        .integrity-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 1.1rem 1.75rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
        }

        .integrity-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #28cd41;
          box-shadow: 0 0 8px rgba(40, 205, 65, 0.8);
          flex-shrink: 0;
        }

        .integrity-copy {
          font-size: 0.84rem;
          line-height: 1.5;
          color: #555555;
        }

        .integrity-copy strong {
          color: #111111;
          font-weight: 700;
        }

        /* Filter Pills */
        .filter-pill-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: clamp(3rem, 5vw, 4.5rem);
          scrollbar-width: none;
        }

        .filter-pill-btn {
          height: 42px;
          padding: 0 1.25rem;
          border-radius: 9999px;
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

        .filter-pill-btn:hover {
          border-color: #111111;
          color: #111111;
        }

        .filter-pill-btn.active {
          background-color: #111111;
          color: #ffffff;
          border-color: #111111;
        }

        .cat-count {
          font-size: 0.78rem;
          font-weight: 600;
          color: #777777;
        }

        .active-count {
          color: #de322d !important;
        }

        /* Project Cards General */
        .projects-vertical-list {
          display: flex;
          flex-direction: column;
          gap: clamp(3.5rem, 6vw, 6rem);
          margin-bottom: clamp(4rem, 8vw, 7rem);
        }

        .project-card-light {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          padding: clamp(2rem, 4vw, 4rem);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.07);
          overflow: hidden;
        }

        .project-card-dark {
          background-color: #0b0c0e;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 28px;
          padding: clamp(2rem, 4vw, 4rem);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
          color: #ffffff;
          overflow: hidden;
        }

        /* Card Top Meta Bars */
        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid;
        }

        .light-bar {
          border-color: rgba(0, 0, 0, 0.08);
        }

        .dark-bar {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .card-top-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .card-index-num {
          font-size: 1.15rem;
          font-weight: 700;
          color: #de322d;
        }

        .card-tag-pill {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 9999px;
        }

        .light-pill {
          background-color: rgba(0, 0, 0, 0.05);
          color: #222;
        }

        .dark-pill {
          background-color: rgba(255, 255, 255, 0.1);
          color: #e5e5e5;
        }

        .card-top-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.84rem;
          font-weight: 500;
        }

        .light-meta {
          color: #666;
        }

        .dark-meta {
          color: rgba(255, 255, 255, 0.7);
        }

        .meta-pair {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Card Title & Text */
        .card-title-main {
          font-size: clamp(2.2rem, 3.8vw, 3.4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.035em;
          margin-bottom: 0.85rem;
          color: #111111;
        }

        .dark-title {
          color: #ffffff;
        }

        .card-subtitle-main {
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          font-weight: 500;
          line-height: 1.45;
          margin-bottom: 1.25rem;
          color: #444444;
        }

        .dark-sub {
          color: rgba(255, 255, 255, 0.8);
        }

        .card-desc-main {
          font-size: 0.95rem;
          line-height: 1.65;
          margin-bottom: 2.25rem;
          color: #555555;
        }

        .dark-desc {
          color: rgba(255, 255, 255, 0.65);
        }

        /* Triplet Subsections */
        .card-subsections-triplet {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 1.75rem;
        }

        .subsection-col {
          padding: 1.25rem;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .light-box {
          background-color: #f8f8f7;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .dark-box {
          background-color: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .subsection-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #888888;
        }

        .label-red {
          color: #de322d !important;
        }

        .dark-label {
          color: rgba(255, 255, 255, 0.5);
        }

        .subsection-text {
          font-size: 0.84rem;
          line-height: 1.5;
          color: #555555;
        }

        .dark-text {
          color: rgba(255, 255, 255, 0.72);
        }

        .card-action-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #de322d;
          margin-top: 1.75rem;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .card-action-link:hover {
          color: #b5221d;
          transform: translateX(3px);
        }

        /* CARD 1 SPECIFICS */
        .card-one-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: clamp(2rem, 3.5vw, 3.5rem);
          align-items: stretch;
        }

        .card-one-media-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 1rem;
          min-height: 380px;
        }

        .card-one-video {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background-color: #111;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
          cursor: pointer;
        }

        .play-button-frost {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: all 0.3s ease;
        }

        .play-button-frost.small {
          width: 42px;
          height: 42px;
        }

        .card-one-video:hover .play-button-frost {
          transform: translate(-50%, -50%) scale(1.1);
          background: #ffffff;
        }

        .video-time-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.25rem 1rem 0.85rem;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
          color: #ffffff;
        }

        .v-label {
          font-size: 0.78rem;
          font-weight: 600;
        }

        .v-duration {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .card-one-sub-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sub-stack-photo {
          position: relative;
          flex: 1;
          border-radius: 16px;
          overflow: hidden;
          background-color: #111;
        }

        .plus-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 9999px;
        }

        /* CARD 2 SPECIFICS */
        .card-two-top-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .card-two-video-preview {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 16/9;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
          margin-top: 1.5rem;
          cursor: pointer;
        }

        .video-preview-badge {
          position: absolute;
          bottom: 12px;
          right: 16px;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(0, 0, 0, 0.6);
          padding: 4px 10px;
          border-radius: 9999px;
        }

        .books-shelf-row {
          display: flex;
          justify-content: center;
          gap: clamp(1rem, 2vw, 1.75rem);
          perspective: 1200px;
          padding: 1rem 0;
        }

        .standing-3d-book {
          position: relative;
          width: clamp(120px, 14vw, 175px);
          aspect-ratio: 1 / 1.48;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: -8px 14px 30px rgba(0, 0, 0, 0.6);
          transform: rotateY(-12deg) rotateX(4deg);
          transition: all 0.4s ease;
          background: #18191c;
          border-left: 3px solid rgba(255, 255, 255, 0.3);
        }

        .standing-3d-book:hover {
          transform: rotateY(0deg) rotateX(0deg) translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
        }

        .book-depth-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0.15) 0%, transparent 12%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }

        .book-cover-title {
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
          text-shadow: 0 2px 6px rgba(0,0,0,0.8);
        }

        .card-two-bottom-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          align-items: flex-end;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 2rem;
        }

        .card-two-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-tactical-pill {
          height: 44px;
          padding: 0 1.5rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 0.84rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-tactical-pill:hover {
          background: #ffffff;
          color: #000000;
        }

        .btn-tactical-circle {
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
          border: none;
        }

        .btn-tactical-circle:hover {
          background: #ffffff;
          color: #000000;
        }

        /* CARD 3 SPECIFICS */
        .card-three-grid {
          display: grid;
          grid-template-columns: 1.05fr 1.35fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }

        .vertical-dotted-stepper {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-left: 26px;
          margin: 2rem 0;
        }

        .vertical-dotted-stepper::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 10px;
          bottom: 24px;
          width: 1px;
          background: rgba(0, 0, 0, 0.15);
        }

        .stepper-node-item {
          position: relative;
          margin-bottom: 1.6rem;
        }

        .stepper-node-item:last-child {
          margin-bottom: 0;
        }

        .node-dot {
          position: absolute;
          left: -26px;
          top: 4px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #888888;
        }

        .active-node .node-dot {
          border-color: #de322d;
          background-color: #de322d;
        }

        .node-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #777777;
          margin-bottom: 0.35rem;
        }

        .red-title {
          color: #de322d !important;
        }

        .node-desc {
          font-size: 0.88rem;
          color: #444444;
          line-height: 1.5;
        }

        .card-three-visuals {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .spread-composition-box {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .fury-standing-book {
          position: relative;
          width: clamp(120px, 14vw, 170px);
          aspect-ratio: 1 / 1.45;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: -6px 12px 28px rgba(0, 0, 0, 0.22);
          flex-shrink: 0;
        }

        .open-two-page-spread {
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

        .open-page-left {
          padding: clamp(1rem, 2vw, 2rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fafaf8;
          border-right: 1px solid rgba(0, 0, 0, 0.06);
        }

        .open-page-left h3 {
          font-size: clamp(1.1rem, 2vw, 1.85rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #111;
          text-transform: uppercase;
        }

        .open-page-right {
          position: relative;
          height: 100%;
        }

        .spread-nav-arrow {
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
          color: #111;
          border: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          cursor: pointer;
        }

        .spread-thumbs-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .spread-mini-thumbs {
          display: flex;
          gap: 0.75rem;
        }

        .mini-thumb-pic {
          position: relative;
          width: 75px;
          height: 48px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .spread-pagination-pills {
          display: flex;
          gap: 4px;
          background: #eeeeea;
          padding: 4px;
          border-radius: 6px;
        }

        .pg-tab-btn {
          padding: 3px 8px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #666;
          border-radius: 4px;
          border: none;
          background: none;
          cursor: pointer;
        }

        .pg-tab-btn.active {
          background: #111;
          color: #fff;
        }

        /* CARD 4 SPECIFICS */
        .card-four-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }

        .card-four-media-composition {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 2.5vw, 2.5rem);
          position: relative;
        }

        .rezang-standing-book {
          position: relative;
          width: clamp(150px, 18vw, 230px);
          aspect-ratio: 1 / 1.45;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: -10px 20px 40px rgba(0, 0, 0, 0.7);
          flex-shrink: 0;
          border-left: 3px solid rgba(255, 255, 255, 0.2);
        }

        .rezang-archival-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 120px;
          flex-shrink: 0;
        }

        .archival-pic-card {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          aspect-ratio: 1 / 1.1;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .rezang-script-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
        }

        .script-lines {
          font-family: 'Caveat', cursive, sans-serif;
          font-size: clamp(1.6rem, 2.5vw, 2.25rem);
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .script-author {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
        }

        .card-four-next {
          position: absolute;
          right: 0;
          bottom: 0;
        }

        /* Full-Width Panoramic Banner */
        .banner-container-wrap {
          margin-bottom: clamp(3rem, 6vw, 5rem);
        }

        .panoramic-banner-box {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          min-height: clamp(360px, 42vw, 480px);
          display: flex;
          align-items: center;
          padding: clamp(2rem, 5vw, 4.5rem);
          color: #ffffff;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
          background-color: #0c0d10;
        }

        .banner-backdrop-img {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .banner-dark-gradient {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(90deg, rgba(12,13,16,0.92) 0%, rgba(12,13,16,0.65) 50%, rgba(12,13,16,0.4) 100%);
        }

        .banner-text-content {
          position: relative;
          z-index: 3;
          max-width: 650px;
        }

        .banner-tagline {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 1.25rem;
        }

        .banner-main-title {
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          font-weight: 600;
          line-height: 1.06;
          letter-spacing: -0.035em;
          color: #ffffff;
          margin-bottom: 1.25rem;
        }

        .banner-subtitle {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 2.25rem;
        }

        .banner-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: #ffffff;
          color: #111111;
          padding: 0.85rem 1.85rem;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          transition: all 0.25s ease;
        }

        .banner-cta-button:hover {
          background-color: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
        }

        .banner-script-signature {
          position: absolute;
          right: clamp(2rem, 5vw, 4.5rem);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          font-family: 'Caveat', cursive, sans-serif;
          font-size: clamp(1.8rem, 3.2vw, 3rem);
          line-height: 1.15;
          color: rgba(255, 255, 255, 0.85);
          text-align: right;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
          max-width: 280px;
        }

        /* Exact Site Footer */
        .army-exact-footer {
          background-color: #ffffff;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: clamp(3rem, 5vw, 4.5rem) 0 2rem;
          margin-top: 2rem;
        }

        .footer-cols-grid {
          display: grid;
          grid-template-columns: 1.4fr 1.1fr 1.4fr 0.8fr;
          gap: clamp(2rem, 3.5vw, 3.5rem);
          padding-bottom: clamp(2.5rem, 4vw, 3.5rem);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .f-brand-logo {
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.18em;
          color: #111111;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .f-brand-tagline {
          font-size: 0.84rem;
          color: #666666;
          line-height: 1.5;
        }

        .f-col-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .f-nav-item {
          font-size: 0.86rem;
          color: #444444;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .f-nav-item:hover {
          color: #000000;
        }

        .f-active-link {
          font-weight: 700;
          color: #000000 !important;
        }

        .f-heading {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888888;
          margin-bottom: 1.1rem;
        }

        .f-company-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #111111;
          margin-bottom: 0.25rem;
        }

        .f-address {
          font-size: 0.84rem;
          color: #666666;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }

        .f-contact-line {
          font-size: 0.84rem;
          margin-bottom: 0.25rem;
        }

        .f-contact-line a {
          color: #111111;
          font-weight: 500;
          text-decoration: none;
        }

        .f-col-social {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .f-social-item {
          font-size: 0.86rem;
          color: #444444;
          text-decoration: none;
        }

        .f-social-item:hover {
          color: #000000;
        }

        .footer-bottom-line {
          padding-top: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.78rem;
          color: #777777;
        }

        /* Video Modal */
        .army-video-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .army-video-modal-dialog {
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          width: 100%;
          max-width: 900px;
          overflow: hidden;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.8);
          position: relative;
        }

        .modal-close-icon {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          cursor: pointer;
        }

        .modal-video-wrapper {
          width: 100%;
          aspect-ratio: 16/9;
          background: #0a0a0a;
        }

        .modal-video-wrapper video {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .army-hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .army-hero-right {
            justify-content: center;
          }
          .card-one-grid,
          .card-two-top-grid,
          .card-three-grid,
          .card-four-grid {
            grid-template-columns: 1fr;
          }
          .card-two-bottom-row {
            grid-template-columns: 1fr;
          }
          .army-stats-row {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 2rem;
          }
          .stat-item:nth-child(2)::after {
            display: none;
          }
          .footer-cols-grid {
            grid-template-columns: 1fr 1fr;
            row-gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .card-subsections-triplet {
            grid-template-columns: 1fr;
          }
          .card-one-media-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .card-one-sub-stack {
            flex-direction: row;
            height: 160px;
          }
          .spread-composition-box {
            flex-direction: column;
          }
          .fury-standing-book {
            width: 100%;
            max-width: 220px;
          }
          .army-stats-row {
            grid-template-columns: 1fr;
          }
          .stat-item:not(:last-child)::after {
            display: none;
          }
          .stat-item {
            padding: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            padding-bottom: 1rem;
            margin-bottom: 1rem;
          }
          .stat-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .card-four-media-composition {
            flex-direction: column;
            align-items: flex-start;
          }
          .banner-script-signature {
            display: none;
          }
          .footer-cols-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

    </div>
  );
}
