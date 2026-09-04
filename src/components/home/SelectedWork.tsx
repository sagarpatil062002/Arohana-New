'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);

  const projects = [
    {
      id: 'raysons',
      num: '01',
      title: 'Raysons Group',
      subtitle: 'Unifying Foundry, Castings, Real Estate & Hospitality',
      sector: 'Industrial Castings & Real Estate',
      year: '2023 — Present',
      location: 'Kolhapur, Maharashtra',
      description:
        'Transitioning an established industrial group into a unified commercial brand across manufacturing, commercial real estate, and hospitality.',
      image: '/images/case-studies/raysons/casting-hero.jpg',
      link: '/work/raysons-group',
      tags: ['Corporate Architecture', 'Brand Positioning', 'Digital Systems'],
    },
    {
      id: 'loom-crafts',
      num: '02',
      title: 'Loom Crafts',
      subtitle: 'Bespoke Outdoor Luxury & Modular Pre-fab Architecture',
      sector: 'Luxury Outdoor & Modular Architecture',
      year: '2024 — Present',
      location: 'National / International',
      description:
        'Positioning high-end all-weather furniture and modern pre-fabricated luxury pods to architects, luxury homeowners, and high-end hospitality operators.',
      image: '/images/case-studies/loom/loom-hero.jpg',
      link: '/work/loom-crafts',
      tags: ['Luxury Positioning', 'Architect Community', 'Digital Experience'],
    },
    {
      id: 'picturetime',
      num: '03',
      title: 'PictureTime',
      subtitle: 'Inflatable Digital Cinema Across Remote Frontiers',
      sector: 'Entertainment Infrastructure & Media',
      year: '2022 — Present',
      location: 'Ladakh & Rural India',
      description:
        'Expanding the public narrative of inflatable mobile digital theatres from cinema to national festivals, high-altitude screening, and education.',
      image: '/images/case-studies/picturetime/picturetime-hero.jpg',
      link: '/work/picturetime',
      tags: ['Cultural Storytelling', 'On-ground Media', 'Brand Growth'],
    },
    {
      id: 'she',
      num: '04',
      title: 'The SHE Project',
      subtitle: 'Remote Women Hygiene & Livelihood in High Ladakh',
      sector: 'Social Development & Public Health',
      year: '2023 — Present',
      location: 'Leh & Nubra Valley, Ladakh',
      description:
        'Dignified, culturally sensitive brand and film communication for eco-friendly menstrual hygiene units and livelihood creation in remote Himalayan villages.',
      image: '/images/case-studies/she/she-hero.jpg',
      link: '/work/she',
      tags: ['Documentary Production', 'Field Execution', 'Public Health'],
    },
    {
      id: 'misu',
      num: '05',
      title: 'Misu Pan-Asian',
      subtitle: 'Hospitality Brand Scaling & Experiential Dining',
      sector: 'Hospitality & F&B',
      year: '2022 — 2024',
      location: 'Bangalore, Karnataka',
      description:
        'Building guest repeat behaviour, brand storytelling, and restaurant operational performance without relying on standard discount marketing.',
      image: '/images/case-studies/misu/misu-hero.jpg',
      link: '/work/misu',
      tags: ['Hospitality Consulting', 'Menu Architecture', 'Guest Retention'],
    },
    {
      id: 'rr-skins',
      num: '06',
      title: 'RR Skins Clinic',
      subtitle: 'Medical Authority & Patient Education in Dermatology',
      sector: 'Healthcare & Clinical Dermatology',
      year: '2023 — Present',
      location: 'Kolhapur & Western India',
      description:
        'Elevating patient trust and clinical authority through evidence-led dermatological education rather than superficial cosmetic promises.',
      image: '/images/case-studies/rrskins/rrskins-hero.jpg',
      link: '/work/rr-skins',
      tags: ['Healthcare Branding', 'Patient Education', 'Digital Systems'],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stickyContainer = stickyContainerRef.current;
    if (!section || !stickyContainer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 992;

    if (prefersReducedMotion || isMobile) {
      // Mobile fallback: simple scroll-based trigger
      const triggers = projects.map((_, i) =>
        ScrollTrigger.create({
          trigger: `#mobile-work-item-${i}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        })
      );
      return () => triggers.forEach((t) => t.kill());
    }

    // DESKTOP: True pinned scroll experience with scrubbed project transitions
    const numProjects = projects.length;

    const mainTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${(numProjects - 1) * 100}%`,
      pin: stickyContainer,
      anticipatePin: 1,
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        // Calculate current active project index based on scroll progress
        const rawIndex = progress * (numProjects - 1);
        const newIndex = Math.min(numProjects - 1, Math.max(0, Math.round(rawIndex)));

        if (newIndex !== prevIndexRef.current) {
          prevIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }
      },
    });

    return () => {
      mainTrigger.kill();
    };
  }, [projects.length]);

  return (
    <section
      ref={sectionRef}
      className="section-light"
      style={{
        position: 'relative',
        backgroundColor: '#f5f5f3',
      }}
    >
      {/* DESKTOP PINNED VIEWPORT */}
      <div
        ref={stickyContainerRef}
        className="desktop-sticky-viewport"
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: '5rem',
          paddingBottom: '2.5rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className="padding-global container-large" style={{ width: '100%' }}>
          {/* Top Bar: Section Tag & Project Navigation */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              paddingBottom: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                className="tag-mono"
                style={{
                  color: '#777777',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#ff3b30',
                  }}
                />
                SELECTED WORK
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: '#111',
                  fontWeight: 600,
                  backgroundColor: '#ffffff',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {projects[activeIndex].num} / 06
              </span>
            </div>

            {/* Indicator progress bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  style={{
                    height: '4px',
                    width: activeIndex === idx ? '36px' : '10px',
                    backgroundColor: activeIndex === idx ? '#ff3b30' : 'rgba(0, 0, 0, 0.15)',
                    borderRadius: '2px',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>

            <Link href="/work" className="button-editorial" style={{ height: '38px', padding: '0 1.25rem' }}>
              <div className="button-texts-slider">
                <span className="button-text-item">All Work (06)</span>
                <span className="button-text-item">All Work (06)</span>
              </div>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Main Visual Display & Info Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 1fr',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
              height: 'calc(100vh - 200px)',
              maxHeight: '740px',
            }}
          >
            {/* Left: Large Choreographed Project Image with Masked Reveal & Inner Movement */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: 'clamp(20px, 3vw, 36px)',
                overflow: 'hidden',
                backgroundColor: '#0c0c0e',
                boxShadow: '0 24px 70px rgba(0, 0, 0, 0.12)',
              }}
            >
              {projects.map((proj, idx) => {
                const isActive = activeIndex === idx;
                const isPast = idx < activeIndex;

                return (
                  <div
                    key={proj.id}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? 'scale(1)'
                        : isPast
                        ? 'scale(1.05)'
                        : 'scale(0.96)',
                      clipPath: isActive
                        ? 'inset(0% 0% 0% 0%)'
                        : isPast
                        ? 'inset(0% 0% 8% 0%)'
                        : 'inset(8% 0% 0% 0%)',
                      transition:
                        'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                      willChange: 'transform, opacity, clip-path',
                    }}
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      priority={idx <= 1}
                      style={{
                        objectFit: 'cover',
                        transform: isActive ? 'scale(1.02)' : 'scale(1.08)',
                        transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />

                    {/* Corner Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        padding: '0.45rem 1rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        color: '#111',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <span>VIEW CASE</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Choreographed Project Details & Staggered Text */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '1rem',
              }}
            >
              {projects.map((proj, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={proj.id}
                    style={{
                      position: idx === 0 ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                      transform: isActive ? 'translateY(0)' : 'translateY(24px)',
                      transition:
                        'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      visibility: isActive ? 'visible' : 'hidden',
                    }}
                  >
                    {/* Sector Tag */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: '#ff3b30',
                        }}
                      >
                        {proj.num}
                      </span>
                      <span
                        className="tag-mono"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          color: '#333',
                          fontSize: '0.75rem',
                        }}
                      >
                        {proj.sector}
                      </span>
                    </div>

                    {/* Masked Title Reveal */}
                    <div style={{ overflow: 'hidden', marginBottom: '0.75rem' }}>
                      <h3
                        style={{
                          fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                          fontWeight: 500,
                          letterSpacing: '-0.03em',
                          lineHeight: 1.05,
                          color: '#111111',
                          transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {proj.title}
                      </h3>
                    </div>

                    {/* Subtitle */}
                    <div
                      style={{
                        fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                        color: '#444444',
                        fontWeight: 500,
                        lineHeight: 1.4,
                        marginBottom: '1.25rem',
                      }}
                    >
                      {proj.subtitle}
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#666666',
                        lineHeight: 1.6,
                        marginBottom: '1.75rem',
                        maxWidth: '480px',
                      }}
                    >
                      {proj.description}
                    </p>

                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        marginBottom: '2.5rem',
                      }}
                    >
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            color: '#555',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={proj.link}
                      className="button-editorial button-editorial-dark"
                      style={{ height: '48px', padding: '0 1.75rem' }}
                    >
                      <div className="button-texts-slider">
                        <span className="button-text-item">Read full case study</span>
                        <span className="button-text-item">Read full case study</span>
                      </div>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FALLBACK VIEWPORT (Smooth touch list with active detection) */}
      <div className="mobile-work-container" style={{ display: 'none', padding: '4rem 1.25rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '0.75rem' }}>
            SELECTED WORK • CURATED CASES
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.03em' }}>
            Selected Work.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {projects.map((proj, i) => (
            <div key={proj.id} id={`mobile-work-item-${i}`} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/11',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#0c0c0e',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                }}
              >
                <Image src={proj.image} alt={proj.title} fill style={{ objectFit: 'cover' }} />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {proj.num} / 06
                </div>
              </div>

              <div>
                <div className="tag-mono" style={{ color: '#ff3b30', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  {proj.sector}
                </div>
                <h3 style={{ fontSize: '1.85rem', fontWeight: 500, marginBottom: '0.5rem', color: '#111' }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {proj.description}
                </p>
                <Link
                  href={proj.link}
                  className="button-editorial button-editorial-dark"
                  style={{ height: '42px', padding: '0 1.25rem' }}
                >
                  <div className="button-texts-slider">
                    <span className="button-text-item">Explore case study</span>
                    <span className="button-text-item">Explore case study</span>
                  </div>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .desktop-sticky-viewport {
            display: none !important;
          }
          .mobile-work-container {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
