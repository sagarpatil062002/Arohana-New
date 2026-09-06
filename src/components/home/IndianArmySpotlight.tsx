'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface ArmyCard {
  id: string;
  index: string;
  category: string;
  title: string;
  location: string;
  image: string;
  activeBadge?: boolean;
}

const ARMY_CAROUSEL_ITEMS: ArmyCard[] = [
  {
    id: 'she-ladakh',
    index: '01',
    category: 'Community Health Initiative',
    title: 'SHE Ladakh',
    location: '14 CORPS · REMOTE BORDER VALLEYS',
    image: '/images/army/symbolic-army-terrain.jpg',
    activeBadge: true,
  },
  {
    id: 'field-ops',
    index: '02',
    category: 'Operation Sampark / Homestays',
    title: 'Field Operations & Training',
    location: 'ZANSKAR · NUBRA · CHANGTHANG',
    image: '/images/army/sampark-1.jpg',
  },
  {
    id: 'western-command-film',
    index: '03',
    category: 'Investiture Documentary',
    title: 'Western Command Film',
    location: 'HQ WESTERN COMMAND · CHANDIMANDIR',
    image: '/images/army/western-command-1.jpg',
  },
  {
    id: 'rezang-la',
    index: '04',
    category: 'Battle Heritage & Archival',
    title: 'Rezang La Memorial',
    location: 'CHUSHUL · 16,000 FT BORDER DEFENCE',
    image: '/images/army/rezang-la-1.jpg',
  },
  {
    id: 'vibrant-villages',
    index: '05',
    category: 'Border Community Protocol',
    title: 'Vibrant Villages Initiative',
    location: 'EASTERN LADAKH · LAC BORDER',
    image: '/images/army/vibrant-villages-1.jpg',
  },
  {
    id: 'western-command-master',
    index: '06',
    category: 'Ceremonial Master Film',
    title: 'Western Command Sound & Master',
    location: 'THEATRE COMMAND · PROTOCOL',
    image: '/images/army/symbolic-army-terrain.jpg',
  },
];

export default function IndianArmySpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = ARMY_CAROUSEL_ITEMS.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay every 1.5 seconds, resetting on interaction
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isHovered && !isDragging) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 1500);
    }
  }, [isHovered, isDragging, nextSlide]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  // Manual Arrow / Button Navigation
  const handlePrev = () => {
    prevSlide();
    resetAutoplay();
  };

  const handleNext = () => {
    nextSlide();
    resetAutoplay();
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetAutoplay();
    }
    touchStartX.current = null;
  };

  // Desktop Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = () => {
    // optional move tracking
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) {
      isMouseDown.current = false;
      setIsDragging(false);
      return;
    }
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetAutoplay();
    }
    isMouseDown.current = false;
    mouseStartX.current = null;
    setIsDragging(false);
  };

  const handleMouseLeaveWrapper = () => {
    if (isMouseDown.current) {
      isMouseDown.current = false;
      setIsDragging(false);
      mouseStartX.current = null;
    }
  };

  return (
    <section
      id="army-projects"
      className="section-dark"
      style={{
        backgroundColor: '#0A0A0C',
        color: '#ffffff',
        paddingTop: 'clamp(4.5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 9rem)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tactical Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      {/* Red Ambient Glow in Top Center */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(350px, 60vw, 750px)',
          height: 'clamp(300px, 45vw, 550px)',
          backgroundColor: 'rgba(222, 50, 45, 0.08)',
          borderRadius: '50%',
          filter: 'blur(140px)',
          pointerEvents: 'none',
        }}
      />

      <div className="padding-global container-large" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header Block */}
        <div
          className="army-spotlight-header"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '2rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          <div style={{ maxWidth: '840px' }}>
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                marginBottom: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                fontWeight: 600,
              }}
            >
              <ShieldCheck size={16} />
              <span>DEFENCE &amp; STRATEGIC BRIEFS</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
              <span style={{ color: '#ffffff' }}>HIGH-ALTITUDE IMPACT</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
                fontWeight: 500,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                color: '#ffffff',
                marginBottom: '0.65rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              INDIAN ARMY PROJECTS
            </h2>

            <h3
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.75rem)',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.85)',
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                lineHeight: 1.25,
              }}
            >
              Work that doesn&apos;t fit a standard agency box.
            </h3>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.6,
                maxWidth: '740px',
              }}
            >
              From remote-community health initiatives in high-altitude Ladakh to official investiture
              ceremony films for the Indian Army, Ārohana has worked on briefs where the environment,
              audience and institutional responsibility demanded an entirely different level of
              preparation and discipline.
            </p>
          </div>

          <Link
            href="/indian-army-projects"
            className="button-editorial button-editorial-white"
            style={{
              height: '48px',
              padding: '0 1.75rem',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
            }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item">Explore Selected Projects</span>
              <span className="button-text-item">Explore Selected Projects</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* 3D PERSPECTIVE CAROUSEL STACK */}
        <div
          className="collins-carousel-wrapper"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            userSelect: 'none',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            position: 'relative',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeaveWrapper}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(340px, 45vw, 460px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
              margin: '1.5rem auto',
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Flanking Left Arrow Button (as requested in PDF: "ADD THE ARROWS LIKE THIS") */}
            <button
              type="button"
              aria-label="Previous Indian Army Project"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              style={{
                position: 'absolute',
                left: isMobile ? '-6px' : '-16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 120,
                width: isMobile ? '42px' : '52px',
                height: isMobile ? '42px' : '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(18, 18, 22, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.65)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DE322D';
                e.currentTarget.style.borderColor = '#DE322D';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(222, 50, 45, 0.65)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(18, 18, 22, 0.88)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.65)';
              }}
            >
              <ArrowLeft size={isMobile ? 18 : 22} />
            </button>

            {/* Flanking Right Arrow Button (as requested in PDF: "ADD THE ARROWS LIKE THIS") */}
            <button
              type="button"
              aria-label="Next Indian Army Project"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              style={{
                position: 'absolute',
                right: isMobile ? '-6px' : '-16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 120,
                width: isMobile ? '42px' : '52px',
                height: isMobile ? '42px' : '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(18, 18, 22, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.65)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DE322D';
                e.currentTarget.style.borderColor = '#DE322D';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(222, 50, 45, 0.65)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(18, 18, 22, 0.88)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.65)';
              }}
            >
              <ArrowRight size={isMobile ? 18 : 22} />
            </button>

            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
              }}
            >
              {ARMY_CAROUSEL_ITEMS.map((item, index) => {
                // Calculate offset relative to activeIndex (-2, -1, 0, 1, 2)
                let offset = (index - activeIndex + total) % total;
                if (offset > total / 2) {
                  offset -= total;
                }

                // If beyond 2 cards away, hide
                const isVisible = Math.abs(offset) <= 2;
                if (!isVisible) return null;

                const isActive = offset === 0;

                // 3D positioning
                let translateX = 0;
                let translateZ = 0;
                let rotateY = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = 100;

                if (offset === 0) {
                  translateX = 0;
                  translateZ = 0;
                  rotateY = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 100;
                } else if (offset === -1) {
                  translateX = isMobile ? -68 : -180;
                  translateZ = isMobile ? -50 : -70;
                  rotateY = isMobile ? 16 : 18;
                  scale = isMobile ? 0.84 : 0.88;
                  opacity = isMobile ? 0.45 : 0.75;
                  zIndex = 90;
                } else if (offset === 1) {
                  translateX = isMobile ? 68 : 180;
                  translateZ = isMobile ? -50 : -70;
                  rotateY = isMobile ? -16 : -18;
                  scale = isMobile ? 0.84 : 0.88;
                  opacity = isMobile ? 0.45 : 0.75;
                  zIndex = 90;
                } else if (offset === -2) {
                  translateX = isMobile ? 0 : -320;
                  translateZ = -140;
                  rotateY = isMobile ? 0 : 32;
                  scale = 0.76;
                  opacity = isMobile ? 0 : 0.35;
                  zIndex = 80;
                } else if (offset === 2) {
                  translateX = isMobile ? 0 : 320;
                  translateZ = -140;
                  rotateY = isMobile ? 0 : -32;
                  scale = 0.76;
                  opacity = isMobile ? 0 : 0.35;
                  zIndex = 80;
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      position: 'absolute',
                      width: isMobile ? 'clamp(230px, 72vw, 280px)' : 'clamp(220px, 30vw, 290px)',
                      height: isMobile ? 'clamp(310px, 46vh, 370px)' : 'clamp(290px, 38vw, 380px)',
                      cursor: 'pointer',
                      pointerEvents: isMobile && Math.abs(offset) > 1 ? 'none' : 'auto',
                      willChange: 'transform, opacity',
                      transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '16px',
                        clipPath:
                          'polygon(18px 0%, calc(100% - 18px) 0%, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 18px)',
                        WebkitClipPath:
                          'polygon(18px 0%, calc(100% - 18px) 0%, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 18px)',
                        overflow: 'hidden',
                        border: isActive
                          ? '1px solid rgba(222, 50, 45, 0.8)'
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: isActive
                          ? '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(222, 50, 45, 0.3)'
                          : '0 15px 40px rgba(0, 0, 0, 0.6)',
                        backgroundColor: '#111215',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{
                          objectFit: 'cover',
                          transform: isActive ? 'scale(1.06)' : 'scale(1.0)',
                          transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />

                      {/* Dark Gradient Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.92) 100%)',
                        }}
                      />

                      {/* Top Badges */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          right: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          pointerEvents: 'none',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                          }}
                        >
                          [ {item.index} ]
                        </span>

                        {item.activeBadge && (
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              backgroundColor: '#DE322D',
                              color: '#ffffff',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              fontWeight: 600,
                              boxShadow: '0 0 12px rgba(222, 50, 45, 0.6)',
                            }}
                          >
                            <span
                              style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: '#ffffff',
                              }}
                            />
                            ACTIVE
                          </span>
                        )}
                      </div>

                      {/* Bottom Info Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          textAlign: 'left',
                          pointerEvents: 'none',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#DE322D',
                            marginBottom: '0.35rem',
                          }}
                        >
                          {item.category}
                        </span>

                        <h4
                          style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                            fontWeight: 600,
                            color: '#ffffff',
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            marginBottom: '0.35rem',
                          }}
                        >
                          {item.title}
                        </h4>

                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'rgba(255, 255, 255, 0.6)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Bottom Controls & Ticker Bar */}
          <div
            style={{
              width: '100%',
              marginTop: '1.25rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              position: 'relative',
              zIndex: 20,
            }}
          >
            {/* Active Project Ticker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: '#DE322D',
                  fontWeight: 700,
                }}
              >
                {ARMY_CAROUSEL_ITEMS[activeIndex].index}
              </span>
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {ARMY_CAROUSEL_ITEMS[activeIndex].title}
              </span>
              <span className="hide-on-mobile" style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                — {ARMY_CAROUSEL_ITEMS[activeIndex].location}
              </span>
            </div>

            {/* Indicator Pills & Prev/Next Arrows */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {ARMY_CAROUSEL_ITEMS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      height: '4px',
                      width: activeIndex === i ? '24px' : '6px',
                      borderRadius: '9999px',
                      backgroundColor: activeIndex === i ? '#DE322D' : 'rgba(255, 255, 255, 0.25)',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  aria-label="Previous Project"
                  onClick={handlePrev}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  aria-label="Next Project"
                  onClick={handleNext}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Proof Metric Pills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '1rem',
            paddingTop: '1.5rem',
          }}
        >
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.65rem',
                fontWeight: 700,
                color: '#DE322D',
                marginBottom: '0.25rem',
              }}
            >
              14,000+ FT
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              High-Altitude Logistics in Eastern Ladakh
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.65rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.25rem',
              }}
            >
              100%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Protocol Security & Institutional Clearance
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.65rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.25rem',
              }}
            >
              MULTI-CAM
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Ceremonial Filming & 4K Master Sound
            </div>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.65rem',
                fontWeight: 700,
                color: '#DE322D',
                marginBottom: '0.25rem',
              }}
            >
              HQ THEATRE
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Western Command & 14 Corps Headquarters
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .army-spotlight-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
