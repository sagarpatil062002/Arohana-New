'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
  category: string;
  year: string;
  link: string;
  tags: string[];
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: 'MISU',
    subtitle: 'Brand Story',
    bgColor: '#6e300f',
    category: 'Hospitality & F&B',
    year: '2024',
    link: '/work/misu',
    tags: ['Brand Identity', 'Spatial Experience'],
  },
  {
    id: 2,
    title: 'KHAU GULLY',
    subtitle: 'Project',
    bgColor: '#084731',
    category: 'The Urban F&B',
    year: '2024',
    link: '/work',
    tags: ['Experience Design', 'Social Media'],
  },
  {
    id: 3,
    title: 'RAPID WELLNESS',
    subtitle: 'Brand Story',
    bgColor: '#122550',
    category: 'Clinical Dermatology',
    year: '2025',
    link: '/work',
    tags: ['Identity System', 'Packaging'],
  },
  {
    id: 4,
    title: 'SUSPENSION',
    subtitle: 'Project',
    bgColor: '#3d1257',
    category: 'Built Environment',
    year: '2024',
    link: '/work',
    tags: ['Visual Direction', 'Campaign'],
  },
  {
    id: 5,
    title: 'RAPID WEALTH',
    subtitle: 'Brand Story',
    bgColor: '#581127',
    category: 'Wealth Management',
    year: '2025',
    link: '/work',
    tags: ['Digital Platform', 'Brand Narrative'],
  },
  {
    id: 6,
    title: 'VITAL WELLNESS',
    subtitle: 'Brand Story',
    bgColor: '#1b1a52',
    category: 'Healthcare & Wellness',
    year: '2025',
    link: '/work',
    tags: ['Identity', 'Retail Product'],
  },
];

interface TheWorkIsTheProofProps {
  projects?: ProjectItem[];
  autoScrollInterval?: number;
}

export default function TheWorkIsTheProof({
  projects = DEFAULT_PROJECTS,
  autoScrollInterval = 1500,
}: TheWorkIsTheProofProps) {
  // Triplicate projects array for seamless infinite looping
  const triplicatedProjects = [...projects, ...projects, ...projects];
  const count = projects.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cardMetrics, setCardMetrics] = useState({ width: 280, gap: 24 });

  // Calculate card width and gap dynamically based on screen size
  useEffect(() => {
    const updateMetrics = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setCardMetrics({ width: 240, gap: 16 });
      } else if (window.innerWidth < 1024) {
        setCardMetrics({ width: 260, gap: 20 });
      } else {
        setCardMetrics({ width: 280, gap: 24 });
      }
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, []);

  const totalStep = cardMetrics.width + cardMetrics.gap;
  const [xOffset, setXOffset] = useState(0);

  // Smooth step transition for dots and arrows
  const stepTo = useCallback(
    (newIndex: number) => {
      const normalizedIndex = ((newIndex % count) + count) % count;
      setCurrentIndex(normalizedIndex);

      const targetX = -newIndex * totalStep;
      controls.start({
        x: targetX,
        transition: {
          type: 'spring',
          damping: 28,
          stiffness: 180,
          mass: 0.8,
        },
      });
      setXOffset(targetX);
    },
    [controls, count, totalStep]
  );

  // Auto-scroll loop every 1.5 seconds (pauses on hover and drag)
  useEffect(() => {
    if (isHovered || isDragging) return;

    const timer = setInterval(() => {
      setXOffset((prevOffset) => {
        const nextStep = prevOffset - totalStep;
        const maxThreshold = -(count * 2) * totalStep;

        // When reaching the end of the second set, seamlessly wrap back to start of second set
        if (nextStep <= maxThreshold) {
          const resetX = -count * totalStep;
          controls.set({ x: resetX });
          setCurrentIndex(0);
          return resetX;
        }

        const nextCard = Math.round(Math.abs(nextStep) / totalStep);
        setCurrentIndex(nextCard % count);

        controls.start({
          x: nextStep,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        });

        return nextStep;
      });
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [isHovered, isDragging, totalStep, count, controls, autoScrollInterval]);

  // Prev Button
  const handlePrev = () => {
    const newOffset = xOffset + totalStep;
    if (newOffset > 0) {
      const resetOffset = -(count * totalStep);
      controls.set({ x: resetOffset });
      setXOffset(resetOffset + totalStep);
      controls.start({ x: resetOffset + totalStep, transition: { duration: 0.4 } });
      setCurrentIndex((prev) => (prev - 1 + count) % count);
      return;
    }

    setXOffset(newOffset);
    setCurrentIndex((prev) => (prev - 1 + count) % count);
    controls.start({
      x: newOffset,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    });
  };

  // Next Button
  const handleNext = () => {
    const newOffset = xOffset - totalStep;
    const maxThreshold = -(count * 2) * totalStep;

    if (newOffset <= maxThreshold) {
      const resetOffset = -count * totalStep;
      controls.set({ x: resetOffset });
      setXOffset(resetOffset - totalStep);
      controls.start({ x: resetOffset - totalStep, transition: { duration: 0.4 } });
      setCurrentIndex((prev) => (prev + 1) % count);
      return;
    }

    setXOffset(newOffset);
    setCurrentIndex((prev) => (prev + 1) % count);
    controls.start({
      x: newOffset,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    });
  };

  // Drag End handler
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    let steps = 0;
    if (dragDistance < -50 || velocity < -300) {
      steps = 1;
    } else if (dragDistance > 50 || velocity > 300) {
      steps = -1;
    }

    const targetOffset = xOffset - steps * totalStep;
    setXOffset(targetOffset);

    const calculatedIndex = Math.round(Math.abs(targetOffset) / totalStep) % count;
    setCurrentIndex(calculatedIndex);

    controls.start({
      x: targetOffset,
      transition: { type: 'spring', damping: 25, stiffness: 200 },
    });
  };

  return (
    <section
      className="work-proof-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="proof-container">
        {/* ====================================================================
            HEADER SECTION (Matches Specifications)
            ==================================================================== */}
        <div className="proof-header-row">
          {/* Left Title Area */}
          <div className="proof-title-area">
            <div className="proof-tag-pill">
              SELECTED WORK
            </div>

            <h2 className="proof-heading">
              <span className="heading-light">The work </span>
              <span className="heading-bold">is the proof.</span>
            </h2>

            <p className="proof-subtitle">
              A selection of brand stories and projects that show how Ārohana thinks,
              creates and executes across very different environments.
            </p>
          </div>

          {/* Right Side Metadata & Controls */}
          <div className="proof-meta-area">
            {/* Real Brands Badge & Year */}
            <div className="proof-badge-group">
              <span className="proof-year-badge">&copy;26</span>
              <span className="proof-meta-text">REAL BRANDS. REAL IMPACT.</span>
            </div>

            {/* Navigation Arrows */}
            <div className="proof-arrows-group">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous card"
                className="proof-arrow-btn"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next card"
                className="proof-arrow-btn"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          CAROUSEL VIEWPORT (Infinite Draggable Track)
          ==================================================================== */}
      <div className="carousel-viewport">
        {/* Left & Right Gradient Depth Fades */}
        <div className="carousel-fade-left" />
        <div className="carousel-fade-right" />

        {/* Draggable Track Container */}
        <div ref={containerRef} className="carousel-track-wrapper">
          <motion.div
            className="carousel-motion-track"
            style={{
              gap: `${cardMetrics.gap}px`,
            }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: -count * 2 * totalStep, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {triplicatedProjects.map((project, idx) => (
              <motion.div
                key={`${project.id}-${idx}`}
                className="proof-card"
                style={{
                  width: `${cardMetrics.width}px`,
                  minWidth: `${cardMetrics.width}px`,
                  maxWidth: `${cardMetrics.width}px`,
                  backgroundColor: project.bgColor,
                }}
                whileHover={{
                  scale: 1.025,
                  y: -4,
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.32)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Atmospheric gradient overlay */}
                <div className="card-ambient-gradient" />

                {/* Card Content Stack */}
                <div className="card-inner-content">
                  {/* Top Row: Index & Category */}
                  <div className="card-top-row">
                    <span className="card-index-label">
                      {String((idx % count) + 1).padStart(2, '0')}
                    </span>
                    <span className="card-category-badge">
                      {project.category || 'Featured'}
                    </span>
                  </div>

                  {/* Middle: Brand Title, Divider, Subtitle */}
                  <div className="card-middle-content">
                    <h3 className="card-brand-title">
                      {project.title}
                    </h3>

                    {/* Decorative line/separator */}
                    <div className="card-decor-line" />

                    <div className="card-subtitle-label">
                      {project.subtitle}
                    </div>
                  </div>

                  {/* Bottom Row: Tags & Action Link */}
                  <div className="card-bottom-row">
                    <div className="card-tags-box">
                      {project.tags.slice(0, 2).map((tag, tIdx) => (
                        <span key={tIdx} className="card-tag-item">
                          {tag}
                          {tIdx === 0 && project.tags.length > 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={project.link || '/work'}
                      className="card-link-btn"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ====================================================================
          DOT NAVIGATION INDICATORS
          ==================================================================== */}
      <div className="proof-dots-row">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => stepTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`proof-dot-btn ${currentIndex === i ? 'active-dot' : ''}`}
          />
        ))}
      </div>

      {/* ====================================================================
          SCOPED VANILLA CSS (Guarantees 100% Exact Rendering)
          ==================================================================== */}
      <style jsx>{`
        .work-proof-section {
          width: 100%;
          background-color: #f6f6f4;
          padding-top: clamp(3.5rem, 6vw, 6rem);
          padding-bottom: clamp(3.5rem, 6vw, 6rem);
          overflow: hidden;
          position: relative;
          font-family: var(--font-display, -apple-system, BlinkMacSystemFont, sans-serif);
        }

        .proof-container {
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 3.5rem);
        }

        /* Header Section */
        .proof-header-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: clamp(2.5rem, 4vw, 4rem);
        }

        .proof-title-area {
          max-width: 680px;
        }

        .proof-tag-pill {
          display: inline-block;
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #DE322D;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }

        .proof-heading {
          font-size: clamp(2.4rem, 4.5vw, 4.25rem);
          line-height: 1.04;
          letter-spacing: -0.035em;
          color: #111111;
          margin-bottom: 1.15rem;
        }

        .heading-light {
          font-weight: 400;
          color: #222222;
          display: block;
        }

        .heading-bold {
          font-weight: 800;
          color: #000000;
          display: block;
        }

        .proof-subtitle {
          font-size: clamp(0.95rem, 1.3vw, 1.15rem);
          color: #555555;
          line-height: 1.6;
          max-width: 580px;
        }

        /* Right Meta & Controls */
        .proof-meta-area {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.25rem;
          flex-shrink: 0;
        }

        .proof-badge-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .proof-year-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px 10px;
          border-radius: 9999px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          background-color: rgba(255, 255, 255, 0.8);
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 600;
          color: #111111;
        }

        .proof-meta-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #333333;
          text-transform: uppercase;
        }

        .proof-arrows-group {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .proof-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.15);
          background-color: #ffffff;
          color: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .proof-arrow-btn:hover {
          background-color: #111111;
          color: #ffffff;
          border-color: #111111;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .proof-arrow-btn:active {
          transform: scale(0.95);
        }

        /* Carousel Viewport */
        .carousel-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding-top: 1rem;
          padding-bottom: 1.5rem;
        }

        .carousel-fade-left {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: clamp(24px, 6vw, 100px);
          background: linear-gradient(to right, #f6f6f4 0%, rgba(246, 246, 244, 0) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .carousel-fade-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: clamp(24px, 6vw, 100px);
          background: linear-gradient(to left, #f6f6f4 0%, rgba(246, 246, 244, 0) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .carousel-track-wrapper {
          padding: 0 clamp(1.25rem, 4vw, 3.5rem);
        }

        .carousel-motion-track {
          display: flex;
          align-items: center;
          width: max-content;
          cursor: grab;
        }

        .carousel-motion-track:active {
          cursor: grabbing;
        }

        /* Individual Card */
        .proof-card {
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
          user-select: none;
          flex-shrink: 0;
        }

        .card-ambient-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(0, 0, 0, 0.12) 45%,
            rgba(0, 0, 0, 0.65) 100%
          );
          pointer-events: none;
        }

        .card-inner-content {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #ffffff;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-index-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
        }

        .card-category-badge {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
        }

        .card-middle-content {
          margin: auto 0;
          padding: 1.5rem 0;
        }

        .card-brand-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(1.6rem, 2.2vw, 2rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #ffffff;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }

        .card-decor-line {
          width: 32px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.45);
          margin: 0.85rem 0;
          transition: width 0.3s ease, background-color 0.3s ease;
        }

        .proof-card:hover .card-decor-line {
          width: 54px;
          background-color: #DE322D;
        }

        .card-subtitle-label {
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.02em;
        }

        .card-bottom-row {
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          padding-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-tags-box {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        .card-link-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.25s ease;
          flex-shrink: 0;
          margin-left: 0.5rem;
        }

        .card-link-btn:hover {
          background-color: #ffffff;
          color: #111111;
          transform: scale(1.08);
        }

        /* Dot Indicators */
        .proof-dots-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 2rem;
        }

        .proof-dot-btn {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(0, 0, 0, 0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .proof-dot-btn.active-dot {
          width: 28px;
          background-color: #DE322D;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .proof-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .proof-meta-area {
            align-items: flex-start;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .proof-meta-area {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
