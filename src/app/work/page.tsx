'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CASE_STUDIES } from '@/data/case-studies';

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const sectionRef = useRef<HTMLDivElement>(null);
  const hoverWrapRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const pillPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  const filters = [
    'All',
    'Industrial & Multi-Entity',
    'Luxury & Architecture',
    'Media & Culture',
    'Social Development',
    'Hospitality & F&B',
    'Healthcare',
  ];

  const filteredCases =
    selectedFilter === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => {
          if (selectedFilter === 'Industrial & Multi-Entity')
            return cs.sector.includes('Industrial') || cs.sector.includes('Real Estate');
          if (selectedFilter === 'Luxury & Architecture')
            return cs.sector.includes('Luxury') || cs.sector.includes('Modular');
          if (selectedFilter === 'Media & Culture')
            return cs.sector.includes('Media') || cs.sector.includes('Entertainment');
          if (selectedFilter === 'Social Development') return cs.sector.includes('Social');
          if (selectedFilter === 'Hospitality & F&B') return cs.sector.includes('Hospitality');
          if (selectedFilter === 'Healthcare') return cs.sector.includes('Healthcare');
          return true;
        });

  const directoryProjects = [
    {
      title: 'Western Command — Indian Army',
      sector: 'Ceremonial Documentary & Production',
      year: '2023 — 2024',
      link: '/indian-army-projects',
    },
    {
      title: 'Neora Deck',
      sector: 'Rooftop Experiential Hospitality',
      year: '2023 — Present',
      link: '/work/raysons-group',
    },
    {
      title: 'Tourin Ladakh',
      sector: 'Experiential High-Altitude Travel',
      year: '2023 — Present',
      link: '/tourin',
    },
    {
      title: 'Blu Resorts Goa',
      sector: 'Boutique Coastal Resort Hospitality',
      year: '2022',
      link: '/services#hospitality',
    },
    {
      title: 'Qubice Systems',
      sector: 'Architectural Modular Solutions',
      year: '2023',
      link: '/work/loom-crafts',
    },
    {
      title: 'DTK Karekar Jewellery',
      sector: 'Heritage Fine Jewelry & Retail',
      year: '2022 — 2023',
      link: '/services#digital',
    },
  ];

  // Mouse tracking with lerp
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

  // Exact 3D Perspective Scroll Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray<HTMLElement>('.work-page-item');
    if (!items || items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const link = item.querySelector('.work-page-link');
        if (!link) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 100%',
            end: 'bottom 0%',
            scrub: 0.8,
          },
        });

        tl.fromTo(
          link,
          {
            y: '35vh',
            rotateX: 65,
            scale: 1.1,
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

        tl.to(link, {
          y: '-15vh',
          rotateX: -15,
          scale: 0.9,
          ease: 'power1.in',
          duration: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredCases]);

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
    <div
      ref={sectionRef}
      className="section-light"
      style={{
        paddingTop: '5rem',
        paddingBottom: '10rem',
        position: 'relative',
        overflow: 'clip',
      }}
    >
      {/* FLOATING HOVER PILL */}
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
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            borderRadius: '4rem',
            padding: '0.75rem 1.25rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
            willChange: 'transform, opacity',
          }}
        >
          <span>View case</span>
        </div>
      </div>

      <div className="padding-global container-medium" style={{ width: '100%', maxWidth: '80rem', margin: '0 auto', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
        {/* Alture Reference Header */}
        <div
          className="work-list_head"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 0.5fr',
            placeItems: 'end start',
            columnGap: '1.5rem',
            rowGap: '1.5rem',
            width: '100%',
            marginBottom: '4.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Left: Heading wrap with absolute counter circle */}
          <div className="work-list_heading-wrap" style={{ position: 'relative' }}>
            <h1
              className="heading-style-display"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem, 7.5vw, 7.2rem)',
                fontWeight: 400,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#111111',
                margin: 0,
              }}
            >
              Selected<br />Work.
            </h1>
            <div
              className="work-list_number"
              style={{
                color: '#ffffff',
                backgroundColor: '#f3350c',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '22px',
                height: '22px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                position: 'absolute',
                top: '0.2rem',
                left: 'calc(100% + 0.5rem)',
              }}
            >
              {filteredCases.length}
            </div>
          </div>

          {/* Center: Projects description */}
          <div
            className="work-list_head-texts"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '22rem',
            }}
          >
            <div
              className="text-style-label"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#111111',
                textTransform: 'uppercase',
              }}
            >
              PROJECTS
            </div>
            <p
              style={{
                color: '#666666',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              A curated selection of businesses and projects showing how Ārohana thinks, creates and executes across commercial and physical operating environments.
            </p>
          </div>

          {/* Right: Editorial Copyright */}
          <div style={{ textAlign: 'right', width: '100%' }}>
            <h2
              className="heading-style-display"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem, 7.5vw, 7.2rem)',
                fontWeight: 400,
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

        {/* Filter Bar */}
        <div
          style={{
            display: 'flex',
            gap: '0.65rem',
            flexWrap: 'wrap',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            marginBottom: '6rem',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                backgroundColor: selectedFilter === filter ? '#111111' : '#ffffff',
                color: selectedFilter === filter ? '#ffffff' : '#555555',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Alture Continuous 3D Perspective List */}
        <div
          className="work-list_list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8rem',
            width: '100%',
            marginBottom: '9rem',
          }}
        >
          {filteredCases.map((cs, index) => (
            <div
              key={cs.slug}
              className="work-page-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                className="work-list_block"
                style={{
                  perspective: '100vw',
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Link
                  href={`/work/${cs.slug}`}
                  className="work-page-link"
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 9',
                    height: '50vh',
                    width: 'auto',
                    maxWidth: '100%',
                    borderRadius: '2rem',
                    overflow: 'clip',
                    backgroundColor: '#0c0c0e',
                    display: 'block',
                    textDecoration: 'none',
                    boxShadow: '0 24px 70px rgba(0, 0, 0, 0.16)',
                    willChange: 'transform',
                  }}
                >
                  <Image
                    src={cs.heroImage}
                    alt={cs.title}
                    fill
                    priority={index <= 1}
                    sizes="(max-width: 991px) 95vw, 50vh"
                    className="work-list_img"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />

                  {/* Alture Exact Bottom-Left Name Pill */}
                  <div
                    className="work-list_name"
                    style={{
                      position: 'absolute',
                      bottom: '1.5rem',
                      left: '1.5rem',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      borderRadius: '9rem',
                      padding: '0.35rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    <div
                      className="work-list_dot"
                      style={{
                        backgroundColor: '#f3350c',
                        borderRadius: '50%',
                        width: '0.25rem',
                        height: '0.25rem',
                        flexShrink: 0,
                      }}
                    />
                    <h3
                      className="work-list_title"
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: '120%',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        color: '#000000',
                        margin: 0,
                      }}
                    >
                      {cs.title}
                    </h3>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Client & Project Directory */}
        <div
          style={{
            borderRadius: '28px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: 'clamp(2rem, 4vw, 4rem)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="tag-mono" style={{ color: '#888', marginBottom: '0.5rem' }}>
              PROJECT & CLIENT DIRECTORY
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 500 }}>
              Additional engagements & brand briefs
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {directoryProjects.map((p) => (
              <Link
                key={p.title}
                href={p.link}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0ee';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 500, fontSize: '1.05rem', color: '#111' }}>{p.title}</div>
                  <ArrowUpRight size={16} color="#777" />
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: 'var(--font-mono)' }}>
                  {p.sector} • {p.year}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media screen and (max-width: 991px) {
          .work-list_head {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .work-list_head > div:last-child {
            text-align: left !important;
          }
          .work-list_list {
            gap: 5rem !important;
          }
          .work-page-link {
            height: auto !important;
            width: 100% !important;
            max-width: 600px !important;
          }
          .hover_wrap {
            display: none !important;
          }
        }
        @media screen and (max-width: 767px) {
          .work-list_list {
            gap: 3.5rem !important;
          }
          .work-list_name {
            bottom: 1rem !important;
            left: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
