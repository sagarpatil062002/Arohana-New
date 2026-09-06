'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hoverWrapRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking with lerp for the floating cursor pill
  const mousePos = useRef({ x: -100, y: -100 });
  const pillPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const projects = [
    {
      id: 'raysons',
      index: '01',
      title: 'Raysons Group',
      desc: 'Expanded organically from hospitality into group real estate and specialized industrial production.',
      tags: 'Hospitality, Real Estate & Industrial Casting',
      image: '/images/case-studies/raysons/casting-hero.jpg',
      link: '/work/raysons-group',
    },
    {
      id: 'loom',
      index: '02',
      title: 'Loom Crafts',
      desc: 'Built consistent digital pipeline and architect-focused content architecture.',
      tags: 'Luxury Outdoor Living & Built Environment',
      image: '/images/case-studies/loom/loom-hero.jpg',
      link: '/work/loom-crafts',
    },
    {
      id: 'picturetime',
      index: '03',
      title: 'PictureTime',
      desc: 'Documented remote cinema installations, special army screenings, and festival presence.',
      tags: 'Cinema Technology & High-Altitude Media',
      image: '/images/case-studies/picturetime/picturetime-hero.jpg',
      link: '/work/picturetime',
    },
    {
      id: 'she-ladakh',
      index: '04',
      title: 'SHE Ladakh',
      desc: 'On-ground coordination and visual documentation across high-altitude border villages.',
      tags: 'Public Health & Remote Community Impact',
      image: '/images/case-studies/she/she-hero.jpg',
      link: '/work/she-ladakh',
    },
    {
      id: 'misu',
      index: '05',
      title: 'Misu Pan-Asian',
      desc: 'Turnaround of guest acquisition flow and high-margin seasonal menu rollout.',
      tags: 'Hospitality Operations & Digital Growth',
      image: '/images/case-studies/misu/misu-hero.jpg',
      link: '/work/misu',
    },
    {
      id: 'rr-skins',
      index: '06',
      title: 'RR Skins',
      desc: 'Demystified complex aesthetic treatments and scaled patient inquiries.',
      tags: 'Clinical Healthcare & Patient Trust',
      image: '/images/case-studies/rrskins/rrskins-hero.jpg',
      link: '/work/rr-skins',
    },
  ];

  const totalProjects = projects.length;

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  // Autoplay every 1.5 seconds from Left to Right
  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isInteracting && !isDragging) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 1500);
    }
  }, [isInteracting, isDragging, nextSlide]);

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

  // Mouse drag handlers (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDelta(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    setDragDelta(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragDelta < -40) {
      nextSlide();
    } else if (dragDelta > 40) {
      prevSlide();
    }
    setIsDragging(false);
    setDragStartX(null);
    setDragDelta(0);
    resetAutoplay();
  };

  const handleMouseLeaveWrapper = () => {
    if (isDragging) {
      if (dragDelta < -40) nextSlide();
      else if (dragDelta > 40) prevSlide();
      setIsDragging(false);
      setDragStartX(null);
      setDragDelta(0);
      resetAutoplay();
    }
  };

  // Touch swipe handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsInteracting(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 35) {
        nextSlide();
      } else if (diff < -35) {
        prevSlide();
      }
      touchStartX.current = null;
    }
    setIsInteracting(false);
    resetAutoplay();
  };

  // Mouse cursor tracking for floating view work pill
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

  // Header word reveal animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const workRevealWords = sectionRef.current?.querySelectorAll<HTMLElement>('.work-word-reveal');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (workRevealWords && workRevealWords.length > 0) {
        if (prefersReducedMotion) {
          gsap.set(workRevealWords, { y: '0%', rotateZ: 0, opacity: 1 });
        } else {
          gsap.set(workRevealWords, { y: '120%', rotateZ: 3, opacity: 0 });
          ScrollTrigger.create({
            trigger: '.work-list_head',
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(workRevealWords, {
                y: '0%',
                rotateZ: 0,
                opacity: 1,
                duration: 0.95,
                stagger: 0.08,
                ease: 'power3.out',
              });
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseEnter = () => {
    isHovering.current = true;
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  const handleCardMouseLeave = () => {
    isHovering.current = false;
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        opacity: 0,
        scale: 0.75,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="section_work-list"
      style={{
        position: 'relative',
        backgroundColor: '#f5f5f3',
        paddingTop: 'clamp(4.5rem, 7vw, 7rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => {
        setIsInteracting(false);
        handleMouseLeaveWrapper();
      }}
    >
      {/* Floating Hover Pill for Desktop */}
      <div
        ref={hoverWrapRef}
        className="hover_wrap"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <div
          ref={hoverPillRef}
          className="hover_pill"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translate(-50%, -50%) scale(0.75)',
            opacity: 0,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            borderRadius: '4rem',
            padding: '0.65rem 1.15rem',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
            willChange: 'transform, opacity',
          }}
        >
          <span>View work</span>
          <ArrowUpRight size={13} />
        </div>
      </div>

      <div className="padding-global container-medium" style={{ width: '100%', maxWidth: '84rem', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          className="work-list_head"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: '100%',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Top: One-line heading on desktop */}
          <div
            className="work-list_heading-wrap"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'flex-start',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            <h2
              className="heading-style-display work-heading-single-line"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 5.2vw, 5.2rem)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#111111',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {['The', 'work', 'is', 'the', 'proof.'].map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    verticalAlign: 'top',
                    marginRight: '0.28em',
                  }}
                >
                  <span
                    className="work-word-reveal"
                    style={{
                      display: 'inline-block',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <div
              className="work-list_number"
              style={{
                color: '#ffffff',
                backgroundColor: '#DE322D',
                borderRadius: '50%',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '24px',
                height: '24px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                marginLeft: '0.75rem',
                marginTop: '0.35rem',
                flexShrink: 0,
              }}
            >
              {totalProjects}
            </div>
          </div>

          {/* Bottom row: Description, Controls & copyright */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div
              className="work-list_head-texts"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                maxWidth: '32rem',
              }}
            >
              <h3
                className="text-style-label"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#DE322D',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                SELECTED WORK
              </h3>
              <p
                style={{
                  color: '#555555',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                A selection of businesses and projects that show how Ārohana thinks, creates and executes across very different environments.
              </p>
            </div>

            {/* Navigation Arrows & Year Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  aria-label="Previous Project"
                  onClick={handlePrev}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#111111',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#DE322D';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#DE322D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#111111';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                  }}
                >
                  <ArrowLeft size={17} />
                </button>

                <button
                  type="button"
                  aria-label="Next Project"
                  onClick={handleNext}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#111111',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#DE322D';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#DE322D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#111111';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                  }}
                >
                  <ArrowRight size={17} />
                </button>
              </div>

              <h2
                className="heading-style-display"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: '#111111',
                  margin: 0,
                }}
              >
                ©26
              </h2>
            </div>
          </div>
        </div>

        {/* HORIZONTAL INTERACTIVE CAROUSEL TRACK */}
        <div
          className="work-carousel-viewport"
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            padding: '1rem 0 2rem 0',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className="work-carousel-track"
            style={{
              display: 'flex',
              gap: isMobile ? '1rem' : '1.75rem',
              transform: isMobile
                ? `translateX(calc(-${currentIndex} * (min(max(280px, 82vw), 360px) + 1rem) + ${dragDelta}px))`
                : `translateX(calc(-${currentIndex} * (min(max(320px, 42vw), 540px) + 1.75rem) + ${dragDelta}px))`,
              transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }}
          >
            {projects.map((project, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={project.id}
                  className="work-carousel-card"
                  style={{
                    flex: isMobile
                      ? '0 0 clamp(280px, 82vw, 360px)'
                      : '0 0 clamp(320px, 42vw, 540px)',
                    position: 'relative',
                  }}
                >
                  <Link
                    href={project.link}
                    className="work-card-inner"
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                    onClick={(e) => {
                      // Prevent click trigger during intentional drag
                      if (Math.abs(dragDelta) > 10) {
                        e.preventDefault();
                      }
                    }}
                    style={{
                      position: 'relative',
                      display: 'block',
                      aspectRatio: '16 / 10',
                      width: '100%',
                      borderRadius: '1.75rem',
                      overflow: 'hidden',
                      backgroundColor: '#0c0c0e',
                      textDecoration: 'none',
                      boxShadow: isActive
                        ? '0 20px 50px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)'
                        : '0 12px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                      transform: isActive ? 'scale(1.01)' : 'scale(0.985)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Project Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={idx <= 1}
                      sizes="(max-width: 768px) 85vw, 45vw"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.8s ease',
                      }}
                    />

                    {/* Subtle dark gradient overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%)',
                      }}
                    />

                    {/* Top Index Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1.25rem',
                        left: '1.25rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                      }}
                    >
                      [ {project.index} ]
                    </div>

                    {/* Bottom-Left Information Pill */}
                    <div
                      className="work-list_name"
                      style={{
                        position: 'absolute',
                        bottom: '1.25rem',
                        left: '1.25rem',
                        right: '1.25rem',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: '#000000',
                        borderRadius: '1.25rem',
                        padding: '0.75rem 1.15rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.3rem',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span
                            style={{
                              backgroundColor: '#DE322D',
                              borderRadius: '50%',
                              width: '0.38rem',
                              height: '0.38rem',
                              flexShrink: 0,
                            }}
                          />
                          <h4
                            style={{
                              fontSize: '0.98rem',
                              lineHeight: 1.2,
                              fontFamily: 'var(--font-display)',
                              fontWeight: 600,
                              color: '#000000',
                              margin: 0,
                            }}
                          >
                            {project.title}
                          </h4>
                        </div>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            color: '#DE322D',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {project.tags}
                        </span>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.8rem',
                          color: '#555555',
                          lineHeight: 1.4,
                        }}
                      >
                        {project.desc}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators & Active Ticker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Active Ticker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#DE322D',
                fontWeight: 700,
              }}
            >
              {projects[currentIndex].index}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#111111',
              }}
            >
              {projects[currentIndex].title}
            </span>
            <span className="hide-on-mobile" style={{ fontSize: '0.8rem', color: '#777777' }}>
              — {projects[currentIndex].tags}
            </span>
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to project slide ${i + 1}`}
                onClick={() => {
                  setCurrentIndex(i);
                  resetAutoplay();
                }}
                style={{
                  height: '4px',
                  width: currentIndex === i ? '26px' : '6px',
                  borderRadius: '9999px',
                  backgroundColor: currentIndex === i ? '#DE322D' : 'rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA to All Work */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <Link
            href="/work"
            className="button-editorial button-editorial-dark"
            style={{ height: '50px', padding: '0 2.25rem' }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item">View all work</span>
              <span className="button-text-item">View all work</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media screen and (min-width: 992px) {
          .work-heading-single-line {
            white-space: nowrap !important;
          }
        }
        @media screen and (max-width: 991px) {
          .work-heading-single-line {
            white-space: normal !important;
          }
          .work-list_head {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
            margin-bottom: 2.5rem !important;
          }
          .hover_wrap {
            display: none !important;
          }
        }
        @media screen and (max-width: 767px) {
          .work-list_name {
            bottom: 0.75rem !important;
            left: 0.75rem !important;
            right: 0.75rem !important;
            padding: 0.65rem 0.85rem !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
