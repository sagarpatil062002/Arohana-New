'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight, ChevronDown } from 'lucide-react';

interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  image: string;
  link: string;
}

const CATEGORIES = [
  'All Projects',
  'Hospitality & F&B',
  'Lifestyle & Retail',
  'Wellness & Healthcare',
  'Construction & Infrastructure',
  'Events & Experiences',
];

const PROJECTS: ProjectItem[] = [
  {
    id: 'vital-wellness',
    index: '01',
    title: 'Vital Wellness',
    category: 'Wellness & Healthcare',
    desc: 'Holistic health and wellness brand identity, packaging design and spatial experience.',
    tags: ['Brand Identity', 'Experience Design', 'Packaged Goods'],
    image: '/images/case-studies/selected-work/vital-wellness.jpg',
    link: '/work',
  },
  {
    id: 'residency-club',
    index: '02',
    title: 'Residency Club Kolhapur',
    category: 'Hospitality & F&B',
    desc: 'Heritage hospitality branding, content production and spatial identity systems.',
    tags: ['Hospitality Branding', 'Content Production', 'Spatial Identity'],
    image: '/images/case-studies/selected-work/residency-club.jpg',
    link: '/work',
  },
  {
    id: 'raysons-group',
    index: '03',
    title: 'Raysons Group',
    category: 'Construction & Infrastructure',
    desc: 'Corporate rebranding, architectural film series and unified multi-vertical visual language.',
    tags: ['Corporate Branding', 'Brand Film Series', 'Spatial Experience'],
    image: '/images/case-studies/selected-work/raysons-group.jpg',
    link: '/work/raysons-group',
  },
  {
    id: 'abhijeet-magdum',
    index: '04',
    title: 'Abhijeet Magdum\nGroup of Constructions',
    category: 'Construction & Infrastructure',
    desc: 'End-to-end brand identity, high-altitude project documentary, and multi-channel media production.',
    tags: ['Brand Identity', 'Project Documentary', 'Media Production'],
    image: '/images/case-studies/selected-work/abhijeet-magdum.jpg',
    link: '/work',
  },
  {
    id: 'misu',
    index: '05',
    title: 'Misu Restaurant',
    category: 'Hospitality & F&B',
    desc: 'Contemporary Asian dining identity, signage systems, and digital customer acquisition.',
    tags: ['Brand Identity', 'Interior Signage', 'Digital Assets'],
    image: '/images/case-studies/selected-work/misu.jpg',
    link: '/work/misu',
  },
  {
    id: 'khau-gully',
    index: '06',
    title: 'Khau Gully',
    category: 'Hospitality & F&B',
    desc: 'Urban food court concept, dynamic culinary branding, and experiential street-food aesthetics.',
    tags: ['The Urban F&B', 'Experience Design', 'Social Media'],
    image: '/images/case-studies/selected-work/khau-gully.jpg',
    link: '/work',
  },
  {
    id: 'pretty-plants',
    index: '07',
    title: 'The Pretty Plants',
    category: 'Lifestyle & Retail',
    desc: 'Botanical retail branding, flagship floral store experience, and digital campaigns.',
    tags: ['Retail Identity', 'Campaign Shoot', 'Store Branding'],
    image: '/images/case-studies/selected-work/pretty-plants.jpg',
    link: '/work',
  },
];

export default function SelectedWork() {
  // Start with index 3 (Abhijeet Magdum) to match reference image active state
  const [currentIndex, setCurrentIndex] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Drag / Touch state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = PROJECTS.length;

  // Screen size listener
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay every 1.5 seconds from left to right
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isHovered && !isDragging) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 1500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, isDragging, nextSlide]);

  // Drag / Swipe handlers for Desktop & Mobile
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragOffset(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -40) {
      nextSlide();
    } else if (dragOffset > 40) {
      prevSlide();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Helper for circular difference (-3 to +3)
  const getOffset = (index: number) => {
    let diff = (index - currentIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      id="selected-work"
      className="relative w-full overflow-hidden bg-[#fafaf9] py-16 sm:py-20 lg:py-24 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleDragEnd();
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ================================================================= */}
        {/* 1. SECTION HEADER (Exact layout from reference image)             */}
        {/* ================================================================= */}
        <div className="mb-10 sm:mb-14">
          {/* Small label with red dash */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-4 h-[2px] bg-[#DE322D]" />
            <span className="text-[11px] font-mono tracking-widest text-[#666666] uppercase font-semibold">
              SELECTED WORK
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10">
            {/* Title with red period */}
            <div>
              <h2
                className="text-[38px] sm:text-[50px] lg:text-[62px] font-bold tracking-tight text-[#0f1115] leading-[1.06] m-0"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                The work
                <br />
                is the proof
                <span className="text-[#DE322D]">.</span>
              </h2>
            </div>

            {/* Right side: Description & ©26 Badge */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10">
              <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed max-w-[340px] m-0">
                A selection of brand stories and projects that show how Ārohana thinks, creates and executes across very different environments.
              </p>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span
                  className="text-[46px] sm:text-[54px] font-normal text-[#bcc4cf] tracking-tight leading-none select-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  ©26
                </span>
                <div className="flex flex-col text-[10px] tracking-wider text-[#88909c] font-bold leading-[1.3] uppercase font-mono">
                  <span>REAL BRANDS.</span>
                  <span>REAL IMPACT.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. 3D PERSPECTIVE HORIZONTAL CAROUSEL                            */}
        {/* ================================================================= */}
        <div
          ref={containerRef}
          className="relative w-full h-[420px] sm:h-[460px] lg:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px' }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {/* Navigation Arrows (Left & Right) */}
          <button
            type="button"
            aria-label="Previous Brand"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 sm:left-4 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-black/10 shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-white hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            aria-label="Next Brand"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 sm:right-4 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-black/10 shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-white hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards Track Container */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {PROJECTS.map((project, idx) => {
              const offset = getOffset(idx);
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              // Compute transform based on screen size
              let transformStyle = '';
              let opacity = 0;
              let zIndex = 10;
              let pointerEvents: 'auto' | 'none' = 'none';

              if (isMobile) {
                // Mobile layout: centered active card with peeking side cards
                const cardSpacing = 240;
                const tx = offset * cardSpacing + (isDragging ? dragOffset : 0);
                const scale = isActive ? 1 : 0.88;

                if (absOffset <= 1) {
                  opacity = isActive ? 1 : 0.65;
                  zIndex = 30 - absOffset * 10;
                  pointerEvents = 'auto';
                } else {
                  opacity = 0;
                }

                transformStyle = `translateX(${tx}px) scale(${scale})`;
              } else {
                // Desktop 3D curved perspective layout
                const cardSpacing = 180;
                const tx = offset * cardSpacing + (isDragging ? dragOffset : 0);
                const tz = -absOffset * 80;
                const ry = -offset * 14;
                const scale = isActive ? 1.08 : Math.max(0.76, 1 - absOffset * 0.08);

                if (absOffset <= 3) {
                  if (isActive) opacity = 1;
                  else if (absOffset === 1) opacity = 0.96;
                  else if (absOffset === 2) opacity = 0.85;
                  else opacity = 0.45;

                  zIndex = 40 - absOffset * 8;
                  pointerEvents = 'auto';
                } else {
                  opacity = 0;
                }

                transformStyle = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
              }

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (!isActive && Math.abs(dragOffset) < 10) {
                      setCurrentIndex(idx);
                    }
                  }}
                  className="absolute transition-transform duration-500 ease-out will-change-transform"
                  style={{
                    width: isMobile ? '260px' : '230px',
                    height: isMobile ? '370px' : '380px',
                    transform: transformStyle,
                    opacity,
                    zIndex,
                    pointerEvents,
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                >
                  <div
                    className={`w-full h-full rounded-[20px] overflow-hidden flex flex-col transition-all duration-400 ${
                      isActive
                        ? 'bg-[#15171a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4),0_10px_25px_-5px_rgba(0,0,0,0.2)] ring-1 ring-white/10'
                        : 'bg-[#f4f5f7] border border-black/[0.07] shadow-[0_12px_30px_rgba(0,0,0,0.06)]'
                    }`}
                  >
                    {/* Top Media / Artwork Container */}
                    <div className="relative w-full h-[54%] overflow-hidden bg-gray-200">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 260px, 240px"
                        priority={isActive}
                        className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Bottom Details Container */}
                    <div className="relative w-full h-[46%] p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        <h3
                          className={`font-display text-[15px] sm:text-[16px] font-bold leading-tight mb-2 whitespace-pre-line ${
                            isActive ? 'text-white' : 'text-[#0f1115]'
                          }`}
                        >
                          {project.title}
                        </h3>

                        <div className="flex flex-col gap-0.5">
                          {project.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className={`text-[10px] sm:text-[11px] font-normal leading-tight ${
                                isActive ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom-right diagonal arrow button */}
                      <div className="flex justify-end pt-2">
                        {isActive ? (
                          <Link
                            href={project.link}
                            aria-label={`View ${project.title} case study`}
                            className="w-8 h-8 rounded-full bg-[#202328] border border-white/20 text-white flex items-center justify-center hover:bg-[#DE322D] hover:border-[#DE322D] transition-colors"
                          >
                            <ArrowUpRight size={15} />
                          </Link>
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-white border border-black/10 text-gray-600 flex items-center justify-center shadow-xs">
                            <ArrowUpRight size={13} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. MOBILE CONTROLS (Pagination bar, Dropdown, Full-width CTA)     */}
        {/* ================================================================= */}
        <div className="flex lg:hidden flex-col items-center gap-4 mt-6">
          {/* Progress Indicator: '04 / 07' + Slider track */}
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-mono text-gray-500 font-semibold">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="w-24 h-[3px] bg-gray-200 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#DE322D] rounded-full transition-all duration-300"
                style={{
                  width: `${100 / total}%`,
                  transform: `translateX(${currentIndex * 100}%)`,
                }}
              />
            </div>
          </div>

          {/* Styled Category Dropdown */}
          <div className="relative w-full max-w-[320px]">
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 px-5 flex items-center justify-between text-[13px] font-medium text-gray-800 shadow-xs"
            >
              <span>{selectedCategory}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 py-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-[13px] transition-colors ${
                      selectedCategory === cat
                        ? 'bg-gray-100 text-black font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Full-width Black Pill Button */}
          <Link
            href="/work"
            className="w-full max-w-[320px] bg-[#0f1115] text-white rounded-full py-3.5 px-6 text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#222222] active:scale-98 transition-all shadow-sm"
          >
            <span>View All Case Studies</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* ================================================================= */}
        {/* 4. DESKTOP CONTROLS ROW (Category pills + divider + link)        */}
        {/* ================================================================= */}
        <div className="hidden lg:flex items-center justify-between mt-12 pt-6">
          {/* Left: Category filter buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[13px] font-medium transition-all ${
                    isSelected
                      ? 'bg-[#0f1115] text-white px-5 py-2.5 rounded-full shadow-sm'
                      : 'text-gray-600 hover:text-black px-3.5 py-2 rounded-full hover:bg-gray-100/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Divider line & View All Case Studies link */}
          <div className="flex items-center gap-6">
            <div className="w-16 xl:w-28 h-[1px] bg-gray-300" />
            <Link
              href="/work"
              className="text-[14px] font-semibold text-[#0f1115] hover:text-[#DE322D] flex items-center gap-1.5 transition-colors whitespace-nowrap group"
            >
              <span>View All Case Studies</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
