'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, ShieldCheck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARMY_HERO_DATA, ARMY_TIMELINE_PROJECTS } from '@/data/indian-army-projects';

const CATEGORIES = [
  { id: 'all', label: 'All Assignments', count: 6 },
  { id: 'western-command', label: 'HQ Western Command', count: 2 },
  { id: '14-corps', label: '14 Corps & High Altitude', count: 2 },
  { id: 'border', label: 'Border Initiatives', count: 2 },
];

export default function IndianArmyProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pillPos = useRef({ x: 0, y: 0 });
  const [pillLabel, setPillLabel] = useState('VIEW DOSSIER');

  const filteredProjects = ARMY_TIMELINE_PROJECTS.filter((project) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'western-command') {
      return project.id === 'western-command' || project.organization.includes('WESTERN COMMAND');
    }
    if (activeCategory === '14-corps') {
      return project.id === '14-corps' || project.id === '69-armoured';
    }
    if (activeCategory === 'border') {
      return project.id === 'rezang-la' || project.id === 'vibrant-villages' || project.id === 'project-sampark';
    }
    return true;
  });

  // Mouse Follower Loop (matching home page)
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
      // Header masked slide entrance
      gsap.fromTo(
        '.army-title-masked',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.army-hero-anim',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out', delay: 0.2 }
      );

      // Exact 3D Perspective Scroll Animation (identical to SelectedWork)
      const items = gsap.utils.toArray<HTMLElement>('.army-timeline-item');
      if (items && items.length > 0) {
        const isMobile = window.innerWidth < 768;

        items.forEach((item) => {
          const card = item.querySelector('.army-case-card');
          if (!card) return;

          // Continuous scroll-driven animation timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 100%',
              end: 'bottom 0%',
              scrub: 0.8,
            },
          });

          // Keyframe 0% -> 50%: Enters from bottom tilted with 3D perspective
          tl.fromTo(
            card,
            {
              y: isMobile ? '12vh' : '35vh',
              rotateX: isMobile ? 22 : 65,
              scale: isMobile ? 1.02 : 1.1,
              transformOrigin: '50% 100%',
            },
            {
              y: '0vh',
              rotateX: 0,
              scale: 1.0,
              ease: 'power1.out',
              duration: 1,
            }
          );

          // Keyframe 50% -> 100%: Leaves toward top of screen
          tl.to(card, {
            y: isMobile ? '-8vh' : '-15vh',
            rotateX: isMobile ? -8 : -15,
            scale: isMobile ? 0.96 : 0.9,
            ease: 'power1.in',
            duration: 1,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div
      ref={containerRef}
      className="section-light"
      style={{
        position: 'relative',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        overflow: 'hidden',
      }}
    >
      {/* Interactive Cursor Follower Pill (Matching Home Page) */}
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
          fontFamily: 'var(--font-display)',
          fontSize: '0.78rem',
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

      {/* Ambient background glow blob */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '-5%',
          width: '500px',
          height: '500px',
          backgroundColor: 'rgba(222, 50, 45, 0.04)',
          borderRadius: '50%',
          filter: 'blur(140px)',
          pointerEvents: 'none',
        }}
      />

      <div className="padding-global container-large" style={{ position: 'relative', zIndex: 1 }}>
        {/* Back Link */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-display)',
              color: '#666',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> BACK TO HOME
          </Link>
        </div>

        {/* Hero Header with Tactical Dark Banner */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'clamp(20px, 4vw, 32px)',
            backgroundColor: '#0A0A0C',
            color: '#ffffff',
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            overflow: 'hidden',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Subtle Grid Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.035,
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }}
          />

          {/* Red Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-15%',
              right: '-5%',
              width: '450px',
              height: '450px',
              backgroundColor: 'rgba(222, 50, 45, 0.12)',
              borderRadius: '50%',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '960px' }}>
            <div
              className="army-hero-anim tag-mono"
              style={{
                color: '#DE322D',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
              }}
            >
              <ShieldCheck size={18} />
              <span>DEFENCE & INSTITUTIONAL PRODUCTION</span>
            </div>

            <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
              <h1
                className="army-title-masked"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  lineHeight: 1.06,
                  fontWeight: 500,
                  letterSpacing: '-0.035em',
                  color: '#ffffff',
                }}
              >
                {ARMY_HERO_DATA.heading}
              </h1>
            </div>

            <p
              className="army-hero-anim"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
              }}
            >
              On-location film direction, ceremonial protocol documentation, and high-altitude field
              production conducted directly with Army formations and institutional headquarters.
            </p>

            {/* Tactical Stats Metrics */}
            <div
              className="army-hero-anim army-stats"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                alignItems: 'start',
                gap: '0',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                paddingTop: '2rem',
              }}
            >
              {/* Stat 1 */}
              <div className="army-stat-col" style={{ paddingRight: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 1.9vw, 1.75rem)', fontWeight: 600, color: '#DE322D', lineHeight: 1.15, marginBottom: '0.35rem', whiteSpace: 'nowrap' }}>
                  14,000+ FT
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                  Ladakh High-Altitude Operations
                </div>
              </div>

              {/* Stat 2 */}
              <div className="army-stat-col" style={{ padding: '0 1.5rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 1.9vw, 1.75rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.15, marginBottom: '0.35rem', whiteSpace: 'nowrap' }}>
                  FEB 2026
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                  Western Command Investiture
                </div>
              </div>

              {/* Stat 3 — single line, same baseline and alignment as all stats */}
              <div className="army-stat-col" style={{ padding: '0 1.5rem', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 1.9vw, 1.75rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.15, marginBottom: '0.35rem', whiteSpace: 'nowrap' }}>
                  06 ASSIGNMENTS
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                  Verified Institutional Briefs
                </div>
              </div>

              {/* Stat 4 */}
              <div className="army-stat-col" style={{ paddingLeft: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 1.9vw, 1.75rem)', fontWeight: 600, color: '#DE322D', lineHeight: 1.15, marginBottom: '0.35rem', whiteSpace: 'nowrap' }}>
                  100%
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                  Protocol Clearance & Security
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credibility Notice Banner */}
        <div
          style={{
            padding: '1.25rem clamp(1rem, 3vw, 2rem)',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#28cd41',
              boxShadow: '0 0 8px #28cd41',
              flexShrink: 0,
            }}
          />
          <div style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5 }}>
            <strong>Institutional Integrity:</strong> All presented Indian Army project materials
            represent verified shoot direction, production, post-production and communication
            assignments executed under authorized institutional protocols. No confidential
            operational details are disclosed.
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div
          className="touch-scroll-row"
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: 'clamp(3rem, 5vw, 4rem)',
            paddingBottom: '0.5rem',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  height: '42px',
                  padding: '0 1.25rem',
                  borderRadius: '9999px',
                  border: isSelected ? '1px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: isSelected ? '#111111' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#555555',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: isSelected ? '#DE322D' : '#888888',
                  }}
                >
                  [0{cat.count}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline Projects Showcase — 3D Perspective Scroll (matching SelectedWork) */}
        <div
          className="army-timeline-list"
          style={{
            perspective: '100vw',
            transformStyle: 'preserve-3d',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(5rem, 8vw, 8rem)',
            marginBottom: 'clamp(5rem, 8vw, 8rem)',
            width: '100%',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="army-timeline-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                className="army-timeline-block"
                style={{
                  perspective: '100vw',
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  id={project.id}
                  className="army-timeline-card"
                  onMouseEnter={() => handlePillEnter(`VIEW ${project.indexNumber} DOSSIER`)}
                  onMouseLeave={handlePillLeave}
                  style={{
                    width: '100%',
                    borderRadius: 'clamp(20px, 4vw, 32px)',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    padding: 'clamp(1.5rem, 3.5vw, 4rem)',
                    boxShadow: '0 24px 70px rgba(0, 0, 0, 0.08)',
                    willChange: 'transform',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                  }}
                >
              {/* Project Top Meta */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#DE322D',
                    }}
                  >
                    {project.indexNumber}
                  </span>
                  <span
                    className="tag-mono"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      color: '#222',
                      fontWeight: 600,
                    }}
                  >
                    {project.organization}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    fontSize: '0.85rem',
                    color: '#666',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="#DE322D" /> {project.metadata.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} /> {project.metadata.dateOrPeriod}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div style={{ maxWidth: '920px', marginBottom: '2.5rem' }}>
                <h2
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 3.4rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: '#111',
                    marginBottom: '0.75rem',
                  }}
                >
                  {project.title}
                </h2>
                {project.subtitle && (
                  <div
                    style={{
                      fontSize: '1.1rem',
                      color: '#555',
                      fontWeight: 500,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {project.subtitle}
                  </div>
                )}
                <p style={{ fontSize: '1rem', color: '#444', lineHeight: 1.6 }}>
                  {project.description}
                </p>
              </div>

              {/* Project Scope & Approach Cards */}
              {project.expandableSections && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2.5rem',
                  }}
                >
                  {project.expandableSections.scope && (
                    <div
                      style={{
                        padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                        borderRadius: '16px',
                        backgroundColor: '#fafafa',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '0.5rem', fontWeight: 600 }}>
                        SCOPE OF WORK
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>
                        {project.expandableSections.scope}
                      </p>
                    </div>
                  )}

                  {project.expandableSections.creativeApproach && (
                    <div
                      style={{
                        padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                        borderRadius: '16px',
                        backgroundColor: '#fafafa',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <div className="tag-mono" style={{ color: '#888', marginBottom: '0.5rem' }}>
                        CREATIVE APPROACH
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>
                        {project.expandableSections.creativeApproach}
                      </p>
                    </div>
                  )}

                  {project.expandableSections.productionNotes && (
                    <div
                      style={{
                        padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                        borderRadius: '16px',
                        backgroundColor: '#fafafa',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <div className="tag-mono" style={{ color: '#888', marginBottom: '0.5rem' }}>
                        PRODUCTION DISCIPLINE
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>
                        {project.expandableSections.productionNotes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Project Visuals Gallery */}
              {project.visuals && project.visuals.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {project.visuals.map((visual, vIdx) => (
                    <div key={vIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div
                        onMouseEnter={() => handlePillEnter('DEFENCE STILL')}
                        onMouseLeave={handlePillLeave}
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16/10',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          backgroundColor: '#eee',
                          cursor: 'pointer',
                        }}
                      >
                        <Image
                          src={visual.src}
                          alt={visual.alt}
                          fill
                          style={{
                            objectFit: 'cover',
                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#666',
                          fontFamily: 'var(--font-display)',
                          lineHeight: 1.4,
                        }}
                      >
                        {visual.caption}
                      </p>
                    </div>
                  ))}
                </div>
              )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Consultation CTA */}
        <div
          className="army-cta-banner"
          style={{
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1.25rem, 4vw, 4rem)',
            borderRadius: 'clamp(20px, 4vw, 28px)',
            backgroundColor: '#0A0A0C',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '300px',
              backgroundColor: 'rgba(222, 50, 45, 0.1)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10 }}>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 500, color: '#ffffff' }}>
              Specialised briefs requiring unusual discipline.
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.5rem', fontSize: '1.05rem' }}>
              We bring proven on-ground operational execution to high-stakes assignments.
            </p>
          </div>

          <Link
            href="/contact"
            className="button-editorial button-editorial-white"
            style={{ height: '48px', padding: '0 1.75rem', position: 'relative', zIndex: 10 }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item">Start a conversation</span>
              <span className="button-text-item">Start a conversation</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          :global(.army-cta-banner) {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          :global(.army-cta-banner > a) {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}

