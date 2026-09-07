'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  link: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'vital-wellness',
    index: '01',
    title: 'Vital Wellness',
    category: 'Wellness & Healthcare',
    tags: ['Brand Identity', 'Experience Design', 'Packaged Goods'],
    image: '/images/case-studies/selected-work/vital-wellness.jpg',
    link: '/work',
  },
  {
    id: 'residency-club',
    index: '02',
    title: 'Residency Club Kolhapur',
    category: 'Hospitality & F&B',
    tags: ['Hospitality Branding', 'Content Production', 'Spatial Identity'],
    image: '/images/case-studies/selected-work/residency-club.jpg',
    link: '/work',
  },
  {
    id: 'raysons-group',
    index: '03',
    title: 'Raysons Group',
    category: 'Construction & Infrastructure',
    tags: ['Corporate Branding', 'Brand Film Series', 'Spatial Experience'],
    image: '/images/case-studies/selected-work/raysons-group.jpg',
    link: '/work/raysons-group',
  },
  {
    id: 'abhijeet-magdum',
    index: '04',
    title: 'Abhijeet Magdum\nGroup of Constructions',
    category: 'Construction & Infrastructure',
    tags: ['Brand Identity', 'Project Documentary', 'Media Production'],
    image: '/images/case-studies/selected-work/abhijeet-magdum.jpg',
    link: '/work',
  },
  {
    id: 'misu',
    index: '05',
    title: 'Misu Pan-Asian',
    category: 'Hospitality & F&B',
    tags: ['Brand Identity', 'Interior Signage', 'Digital Assets'],
    image: '/images/case-studies/selected-work/misu.jpg',
    link: '/work/misu',
  },
  {
    id: 'khau-gully',
    index: '06',
    title: 'Khau Gully',
    category: 'Hospitality & F&B',
    tags: ['The Urban F&B', 'Experience Design', 'Social Media'],
    image: '/images/case-studies/selected-work/khau-gully.jpg',
    link: '/work',
  },
  {
    id: 'pretty-plants',
    index: '07',
    title: 'The Pretty Plants',
    category: 'Lifestyle & Retail',
    tags: ['Retail Identity', 'Campaign Shoot', 'Store Branding'],
    image: '/images/case-studies/selected-work/pretty-plants.jpg',
    link: '/work',
  },
];

export default function SelectedWork() {
  const { content } = useCmsContent();
  const workCms = content?.home?.selectedWork;
  const activeEyebrow = workCms?.eyebrow || 'SELECTED WORK';
  const activeTitle = workCms?.title || 'The work is the proof.';
  const activeSubtitle = workCms?.subtitle || 'A selection of brand stories and projects that show how Ārohana thinks, creates and executes across very different environments.';
  const projectsList: ProjectItem[] = (workCms?.projects && workCms.projects.length > 0) ? workCms.projects : PROJECTS;

  // Center card initially on Abhijeet Magdum (index 3) to match reference layout
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Drag / Swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const total = projectsList.length;

  // Responsive screen check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay automatically from left to right
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isDragging) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 2500);
    }
  }, [isDragging, nextSlide]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  const handlePrev = () => {
    prevSlide();
    resetAutoplay();
  };

  const handleNext = () => {
    nextSlide();
    resetAutoplay();
  };

  // Mouse & Touch drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragDelta(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragDelta(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    if (dragDelta < -40) {
      nextSlide();
      resetAutoplay();
    } else if (dragDelta > 40) {
      prevSlide();
      resetAutoplay();
    }
    setIsDragging(false);
    setDragDelta(0);
  };

  return (
    <section
      id="selected-work"
      className="selected-work-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleDragEnd();
      }}
    >
      <div className="sw-container">
        {/* ================================================================= */}
        {/* 1. SECTION HEADER (Exact match to Reference Image)                */}
        {/* ================================================================= */}
        <div className="sw-header">
          {/* Eyebrow with red bar */}
          <div className="sw-eyebrow-row">
            <span className="sw-red-bar" />
            <span className="sw-eyebrow-text">{activeEyebrow}</span>
          </div>

          <div className="sw-header-main">
            {/* Title with red period */}
            <div className="sw-title-col">
              <h2 className="sw-title">
                {activeTitle}
              </h2>
            </div>

            {/* Description & ©26 Badge & Manual < > buttons */}
            <div className="sw-meta-col">
              <p className="sw-description">
                {activeSubtitle}
              </p>

              <div className="sw-meta-right-group">
                <div className="sw-watermark-wrap">
                  <span className="sw-watermark-num">&copy;26</span>
                  <div className="sw-watermark-labels">
                    <span>REAL BRANDS.</span>
                    <span>REAL IMPACT.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. 3D COVERFLOW HORIZONTAL CAROUSEL (ARMY SECTION ANIMATION STYLE)*/}
        {/* ================================================================= */}
        <div
          className="sw-carousel-stage"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {/* Floating Left Arrow Button */}
          <button
            type="button"
            aria-label="Previous Brand"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePrev();
            }}
            className="sw-stage-nav-btn sw-stage-prev"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Floating Right Arrow Button */}
          <button
            type="button"
            aria-label="Next Brand"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNext();
            }}
            className="sw-stage-nav-btn sw-stage-next"
          >
            <ChevronRight size={20} />
          </button>

          {/* 3D Cards Perspective Stage */}
          <div className="sw-cards-stage">
            {projectsList.map((project, idx) => {
              // Calculate position offset relative to currentIndex (-3, -2, -1, 0, 1, 2, 3)
              let offset = (idx - currentIndex + total) % total;
              if (offset > total / 2) {
                offset -= total;
              }

              const isActive = offset === 0;

              // 3D Perspective Parameters (Exact Army Section Style)
              let translateX = 0;
              let translateY = 0;
              let translateZ = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 100;

              if (isMobile) {
                if (offset === 0) {
                  translateX = 0;
                  translateY = 0;
                  translateZ = 0;
                  rotateY = 0;
                  scale = 1.0;
                  opacity = 1;
                  zIndex = 100;
                } else if (offset === -1) {
                  translateX = -95;
                  translateY = 0;
                  translateZ = -45;
                  rotateY = 12;
                  scale = 0.86;
                  opacity = 0.45;
                  zIndex = 90;
                } else if (offset === 1) {
                  translateX = 95;
                  translateY = 0;
                  translateZ = -45;
                  rotateY = -12;
                  scale = 0.86;
                  opacity = 0.45;
                  zIndex = 90;
                } else {
                  translateX = offset > 0 ? 170 : -170;
                  translateY = 0;
                  translateZ = -100;
                  rotateY = offset > 0 ? -20 : 20;
                  scale = 0.72;
                  opacity = 0;
                  zIndex = 50;
                }
              } else {
                // Desktop 7-card 3D perspective coverflow
                if (offset === 0) {
                  translateX = 0;
                  translateY = -10;
                  translateZ = 0;
                  rotateY = 0;
                  scale = 1.08;
                  opacity = 1;
                  zIndex = 100;
                } else if (offset === -1) {
                  translateX = -215;
                  translateY = 0;
                  translateZ = -60;
                  rotateY = 16;
                  scale = 0.94;
                  opacity = 0.95;
                  zIndex = 90;
                } else if (offset === 1) {
                  translateX = 215;
                  translateY = 0;
                  translateZ = -60;
                  rotateY = -16;
                  scale = 0.94;
                  opacity = 0.95;
                  zIndex = 90;
                } else if (offset === -2) {
                  translateX = -395;
                  translateY = 0;
                  translateZ = -130;
                  rotateY = 28;
                  scale = 0.86;
                  opacity = 0.85;
                  zIndex = 80;
                } else if (offset === 2) {
                  translateX = 395;
                  translateY = 0;
                  translateZ = -130;
                  rotateY = -28;
                  scale = 0.86;
                  opacity = 0.85;
                  zIndex = 80;
                } else if (offset === -3) {
                  translateX = -550;
                  translateY = 0;
                  translateZ = -200;
                  rotateY = 36;
                  scale = 0.78;
                  opacity = 0.65;
                  zIndex = 70;
                } else if (offset === 3) {
                  translateX = 550;
                  translateY = 0;
                  translateZ = -200;
                  rotateY = -36;
                  scale = 0.78;
                  opacity = 0.65;
                  zIndex = 70;
                }
              }

              // Real-time drag displacement
              const appliedTranslateX = translateX + (isDragging ? dragDelta * 0.65 : 0);

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (Math.abs(dragDelta) < 10) {
                      if (!isActive) {
                        setCurrentIndex(idx);
                        resetAutoplay();
                      } else {
                        // Clicking active card directly opens case study
                        window.location.href = project.link;
                      }
                    }
                  }}
                  className={`sw-card-shell ${isActive ? 'is-active-shell' : ''}`}
                  style={{
                    transform: `translate3d(${appliedTranslateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: isMobile && Math.abs(offset) > 1 ? 'none' : 'auto',
                    transition: isDragging
                      ? 'none'
                      : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
                  }}
                >
                  <div className={`sw-card-box ${isActive ? 'active-card-box' : 'inactive-card-box'}`}>
                    {/* Top Photo Container */}
                    <div className="sw-card-img-wrap">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 260px, 240px"
                        priority={isActive}
                        style={{
                          objectFit: 'cover',
                          transform: isActive ? 'scale(1.04)' : 'scale(1.0)',
                          transition: 'transform 0.8s ease',
                        }}
                      />
                    </div>

                    {/* Bottom Details Container */}
                    <div className="sw-card-details">
                      <div className="sw-card-text-col">
                        <h3 className={`sw-card-title ${isActive ? 'text-white' : 'text-dark'}`}>
                          {project.title}
                        </h3>

                        <div className="sw-card-tags">
                          {project.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className={`sw-tag-line ${isActive ? 'tag-light' : 'tag-dark'}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom-right diagonal arrow redirecting directly to case study */}
                      <div className="sw-card-action">
                        <Link
                          href={project.link}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          aria-label={`View ${project.title} case study`}
                          className={`sw-action-btn ${isActive ? 'active-btn' : 'inactive-btn'}`}
                        >
                          <ArrowUpRight size={isActive ? 16 : 14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. MOBILE CONTROLS (Matching Reference Image Right Side)          */}
        {/* ================================================================= */}
        <div className="sw-mobile-controls">
          {/* Slide counter & red indicator line */}
          <div className="sw-mobile-counter-row">
            <span className="sw-counter-text">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="sw-counter-bar-bg">
              <div
                className="sw-counter-bar-fill"
                style={{
                  width: `${100 / total}%`,
                  transform: `translateX(${currentIndex * 100}%)`,
                }}
              />
            </div>
          </div>

          {/* Full-width Black Pill Button on Mobile */}
          <Link href="/work" className="sw-mobile-all-btn">
            <span>View All Case Studies</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* ================================================================= */}
        {/* 4. DESKTOP BOTTOM CONTROLS ROW                                    */}
        {/* ================================================================= */}
        <div className="sw-desktop-controls">
          {/* Divider line & View All Case Studies link */}
          <div className="sw-desktop-all-wrap" style={{ width: '100%' }}>
            <div className="sw-horizontal-divider" />
            <Link href="/work" className="sw-all-link">
              <span>View All Case Studies</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 5. 100% PURE BULLETPROOF VANILLA CSS                              */}
      {/* ================================================================= */}
      <style jsx>{`
        /* Overall Section Container */
        .selected-work-section {
          background-color: #fbfbfb;
          color: #111111;
          padding: clamp(3.5rem, 6vw, 6rem) 0 clamp(4rem, 7vw, 6.5rem);
          position: relative;
          overflow: hidden;
          width: 100%;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .sw-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          box-sizing: border-box;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .sw-container {
            padding: 0 3rem;
          }
        }

        /* 1. Header Styles */
        .sw-header {
          margin-bottom: clamp(2rem, 3.5vw, 3rem);
        }

        .sw-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }

        .sw-red-bar {
          display: inline-block;
          width: 22px;
          height: 2px;
          background-color: #DE322D;
        }

        .sw-eyebrow-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #DE322D;
          text-transform: uppercase;
        }

        .sw-header-main {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 900px) {
          .sw-header-main {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .sw-title-col {
          flex: 1;
        }

        .sw-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(2.4rem, 4.5vw, 4.2rem);
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: #111111;
          margin: 0;
          font-weight: 400;
        }

        .sw-title br + span,
        .sw-title :global(strong) {
          font-weight: 700;
        }

        .sw-dot-red {
          color: #DE322D;
        }

        .sw-meta-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        @media (min-width: 900px) {
          .sw-meta-col {
            flex-direction: row;
            align-items: flex-end;
            gap: clamp(1.5rem, 3vw, 2.75rem);
          }
        }

        .sw-description {
          font-size: 0.92rem;
          color: #555555;
          line-height: 1.6;
          max-width: 340px;
          margin: 0;
        }

        .sw-meta-right-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .sw-watermark-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .sw-watermark-num {
          font-size: clamp(2.8rem, 4vw, 3.5rem);
          font-weight: 400;
          color: #bcc4cf;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .sw-watermark-labels {
          display: flex;
          flex-direction: column;
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #88909c;
          line-height: 1.35;
          text-transform: uppercase;
        }

        /* Header Navigation Buttons (< >) */
        .sw-header-nav-btns {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sw-hdr-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333333;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sw-hdr-nav-btn:hover {
          background: #111216;
          border-color: #111216;
          color: #ffffff;
          transform: scale(1.06);
        }

        /* 2. 3D Carousel Stage (Army section style) */
        .sw-carousel-stage {
          position: relative;
          width: 100%;
          height: clamp(420px, 48vw, 490px);
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          user-select: none;
          margin: 1.5rem 0 2.5rem;
        }

        .sw-carousel-stage:active {
          cursor: grabbing;
        }

        .sw-cards-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        /* Floating Stage Nav Buttons */
        .sw-stage-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 120;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #222222;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(4px);
        }

        .sw-stage-nav-btn:hover {
          background: #ffffff;
          color: #DE322D;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        }

        .sw-stage-prev {
          left: 4px;
        }

        .sw-stage-next {
          right: 4px;
        }

        @media (min-width: 1024px) {
          .sw-stage-prev {
            left: 12px;
          }
          .sw-stage-next {
            right: 12px;
          }
        }

        /* Card Shell & 3D Positioning */
        .sw-card-shell {
          position: absolute;
          width: clamp(210px, 24vw, 240px);
          height: clamp(360px, 40vw, 410px);
          cursor: pointer;
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }

        .is-active-shell {
          width: clamp(225px, 26vw, 255px);
          height: clamp(380px, 42vw, 430px);
        }

        .sw-card-box {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          transition: all 0.5s ease;
        }

        /* Active Card (Dark theme with elevated shadow) */
        .active-card-box {
          background-color: #111216;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06);
        }

        /* Inactive Cards (Light theme matching reference image) */
        .inactive-card-box {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 30px -8px rgba(0, 0, 0, 0.08);
        }

        .inactive-card-box:hover {
          border-color: rgba(0, 0, 0, 0.16);
          box-shadow: 0 14px 36px -8px rgba(0, 0, 0, 0.12);
        }

        /* Top Photo Wrap */
        .sw-card-img-wrap {
          position: relative;
          width: 100%;
          height: 58%;
          overflow: hidden;
          background-color: #0d0e12;
        }

        /* Bottom Details */
        .sw-card-details {
          position: relative;
          height: 42%;
          padding: 1.1rem 1.15rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          box-sizing: border-box;
        }

        .sw-card-text-col {
          flex: 1;
          min-width: 0;
          padding-right: 0.5rem;
        }

        .sw-card-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(0.95rem, 1.15vw, 1.12rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin: 0 0 0.6rem 0;
          white-space: pre-line;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .text-white {
          color: #ffffff;
        }

        .text-dark {
          color: #151618;
        }

        .sw-card-tags {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .sw-tag-line {
          font-size: 0.68rem;
          line-height: 1.35;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tag-light {
          color: rgba(255, 255, 255, 0.65);
        }

        .tag-dark {
          color: #777e8a;
        }

        /* Bottom-right diagonal arrow redirecting directly to case study */
        .sw-card-action {
          flex-shrink: 0;
        }

        .sw-action-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .active-btn {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .active-btn:hover {
          background: #DE322D;
          border-color: #DE322D;
          color: #ffffff;
          transform: scale(1.1);
        }

        .inactive-btn {
          background: #f3f4f6;
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #151618;
        }

        .inactive-btn:hover {
          background: #DE322D;
          border-color: #DE322D;
          color: #ffffff;
          transform: scale(1.1);
        }

        /* 3. Mobile Controls */
        .sw-mobile-controls {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1.5rem;
        }

        @media (min-width: 768px) {
          .sw-mobile-controls {
            display: none;
          }
        }

        .sw-mobile-counter-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .sw-counter-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.8rem;
          font-weight: 700;
          color: #555555;
          letter-spacing: 0.05em;
        }

        .sw-counter-bar-bg {
          flex: 1;
          height: 2px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .sw-counter-bar-fill {
          height: 100%;
          background: #DE322D;
          transition: transform 0.4s ease;
        }

        .sw-mobile-dropdown-wrap {
          position: relative;
          width: 100%;
        }

        .sw-dropdown-btn {
          width: 100%;
          padding: 0.85rem 1.2rem;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.88rem;
          font-weight: 500;
          color: #222222;
          cursor: pointer;
        }

        .sw-dropdown-menu {
          position: absolute;
          bottom: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          padding: 0.5rem;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sw-dropdown-item {
          padding: 0.65rem 1rem;
          text-align: left;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #444444;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .sw-dropdown-item:hover,
        .sw-dropdown-item.is-selected {
          background: #f4f5f7;
          color: #111111;
          font-weight: 600;
        }

        .sw-mobile-all-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.95rem;
          background: #111216;
          color: #ffffff;
          border-radius: 9999px;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          box-sizing: border-box;
          transition: background 0.2s ease;
        }

        .sw-mobile-all-btn:hover {
          background: #252830;
        }

        /* 4. Desktop Controls */
        .sw-desktop-controls {
          display: none;
        }

        @media (min-width: 768px) {
          .sw-desktop-controls {
            display: flex;
            flex-direction: column;
            gap: 1.75rem;
            margin-top: 1rem;
          }
        }

        .sw-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .sw-pill-btn {
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: #666666;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .sw-pill-btn:hover {
          color: #111111;
          background: rgba(0, 0, 0, 0.04);
        }

        .active-pill {
          background: #111216;
          color: #ffffff;
          border-color: #111216;
        }

        .active-pill:hover {
          background: #222328;
          color: #ffffff;
        }

        .sw-desktop-all-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .sw-horizontal-divider {
          flex: 1;
          height: 1px;
          background: rgba(0, 0, 0, 0.08);
        }

        .sw-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background-color: #000000;
          color: #ffffff;
          padding: 0.8rem 1.65rem;
          border-radius: 9999px;
          font-family: var(--font-display, sans-serif);
          font-size: 0.86rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .sw-all-link:hover {
          background-color: #222222;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
        }
      `}</style>
    </section>
  );
}
