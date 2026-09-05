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

  const featuredCaseStudies = [
    {
      slug: 'raysons-group',
      title: 'Raysons Group',
      desc: 'Shows long-term digital partnership across real estate and hospitality, plus project production.',
      tags: ['Real Estate', 'Hospitality', 'Digital Growth'],
      heroImage: '/images/case-studies/raysons/neora-1.jpg',
      sector: 'Real Estate · Hospitality',
    },
    {
      slug: 'loom-crafts',
      title: 'Loom Crafts',
      desc: 'Shows how one brand can require different communication systems across furniture and prefab.',
      tags: ['Real Estate', 'Built Environment', 'Brand Strategy'],
      heroImage: '/images/case-studies/loom/loom-hero.jpg',
      sector: 'Real Estate · Built Environment',
    },
    {
      slug: 'picturetime',
      title: 'PictureTime',
      desc: 'Shows digital brand work plus cultural/event/on-ground content.',
      tags: ['Entertainment', 'Events', 'Content Production'],
      heroImage: '/images/case-studies/picturetime/picturetime-hero.jpg',
      sector: 'Entertainment · Events',
    },
    {
      slug: 'she',
      title: 'SHE',
      desc: 'Shows complex institutional/community communication and on-ground execution.',
      tags: ['Institutional', 'Community', 'Documentary'],
      heroImage: '/images/case-studies/she/she-hero.jpg',
      sector: 'Institutional · Community',
    },
    {
      slug: 'misu',
      title: 'Misu',
      desc: 'Shows the depth of hospitality consulting and digital execution.',
      tags: ['Hospitality', 'Consulting', 'Digital'],
      heroImage: '/images/case-studies/misu/misu-hero.jpg',
      sector: 'Hospitality · Consulting',
    },
    {
      slug: 'rr-skins',
      title: 'RR Skins',
      desc: 'Shows healthcare communication built around trust and education.',
      tags: ['Healthcare', 'Brand Strategy', 'Content'],
      heroImage: '/images/case-studies/rrskins/rrskins-hero.jpg',
      sector: 'Healthcare',
    },
  ];

  const filters = [
    'All',
    'Real Estate & Built Environment',
    'Hospitality & F&B',
    'Healthcare',
    'Entertainment & Media',
    'Institutional & Community',
  ];

  const filteredCases =
    selectedFilter === 'All'
      ? featuredCaseStudies
      : featuredCaseStudies.filter((cs) => {
          if (selectedFilter === 'Real Estate & Built Environment')
            return cs.tags.includes('Real Estate') || cs.tags.includes('Built Environment');
          if (selectedFilter === 'Hospitality & F&B')
            return cs.tags.includes('Hospitality');
          if (selectedFilter === 'Healthcare')
            return cs.tags.includes('Healthcare');
          if (selectedFilter === 'Entertainment & Media')
            return cs.tags.includes('Entertainment') || cs.tags.includes('Events');
          if (selectedFilter === 'Institutional & Community')
            return cs.tags.includes('Institutional') || cs.tags.includes('Community');
          return true;
        });

  const directoryCategories = [
    {
      title: 'Hospitality & F&B',
      items: ['Neora Deck', 'Blu Resorts', 'Qubice', 'Kanopy', 'Sorriso', 'Spice Goa', 'Khana Khazana', 'Khau Gali'],
    },
    {
      title: 'Real Estate & Built Environment',
      items: ['Raysons Group', 'Citron', 'Loom Crafts'],
    },
    {
      title: 'Healthcare',
      items: ['RR Skins and other approved healthcare work'],
    },
    {
      title: 'Lifestyle & Consumer',
      items: ['DTK Karekar Jewellery', 'Fraganta and other approved consumer work'],
    },
    {
      title: 'Entertainment & Media',
      items: ['PictureTime'],
    },
    {
      title: 'Travel & Tourism',
      items: ['Tourin', 'Holiday Village'],
    },
    {
      title: 'Institutional / Community',
      items: ['SHE', 'Operation Sampark', 'Indian Army-related projects'],
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
      const isMobile = window.innerWidth < 768;

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

        tl.to(link, {
          y: isMobile ? '-8vh' : '-15vh',
          rotateX: isMobile ? -8 : -15,
          scale: isMobile ? 0.96 : 0.9,
          ease: 'power1.in',
          duration: 1,
        });
      });

      gsap.fromTo(
        '.work-title-masked',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );
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

      <div className="padding-global container-medium" style={{ width: '100%', maxWidth: '80rem', margin: '0 auto' }}>
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
            <div style={{ overflow: 'hidden' }}>
              <h1
                className="heading-style-display work-title-masked"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.2rem, 7.5vw, 7.2rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: '#111111',
                  margin: 0,
                }}
              >
                The work is<br />the proof.
              </h1>
            </div>
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
              maxWidth: '24rem',
            }}
          >
            <div
              className="text-style-label"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#DE322D',
                textTransform: 'uppercase',
              }}
            >
              FEATURED CASE STUDIES
            </div>
            <p
              style={{
                color: '#666666',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              A selection of businesses and projects that show how Ārohana thinks, creates and executes across very different environments.
            </p>
          </div>

          {/* Right: Editorial Copyright */}
          <div style={{ textAlign: 'right', width: '100%' }}>
            <h2
              className="heading-style-display"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem, 7.5vw, 7.2rem)',
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

        {/* Filter Bar */}
        <div
          className="touch-scroll-row work-filter-bar"
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

                {/* Case Study Info Block */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '850px',
                    marginTop: '1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0 0.5rem',
                  }}
                >
                  <div style={{ flex: '1 1 300px' }}>
                    <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                      {cs.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {cs.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#777',
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/work/${cs.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#DE322D',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>View case study</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
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
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '0.5rem', fontWeight: 600 }}>
              CLIENT / PROJECT DIRECTORY
            </div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 500, color: '#111', marginBottom: '0.5rem' }}>
              Additional work.
            </h3>
            <p style={{ color: '#666', fontSize: '1rem' }}>
              A selection of other businesses and projects we've worked with.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {directoryCategories.map((cat) => (
              <div
                key={cat.title}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#111', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem' }}>
                  {cat.title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontSize: '0.88rem',
                        color: '#444',
                        backgroundColor: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(0,0,0,0.04)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div
          style={{
            marginTop: 'clamp(4rem, 7vw, 6rem)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            borderRadius: 'clamp(20px, 4vw, 28px)',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 500, color: '#ffffff' }}>
              Want to see what this could look like for your business?
            </h3>
          </div>

          <Link href="/contact" className="button-editorial" style={{ height: '48px', padding: '0 1.75rem', backgroundColor: '#ffffff', color: '#111' }}>
            <div className="button-texts-slider">
              <span className="button-text-item">Start a conversation</span>
              <span className="button-text-item">Start a conversation</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media screen and (max-width: 991px) {
          .work-list_head {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
            margin-bottom: 3.5rem !important;
          }
          .work-list_head > div:last-child {
            text-align: left !important;
          }
          .work-list_list {
            gap: 4rem !important;
            margin-bottom: 6rem !important;
          }
          .work-page-link {
            height: auto !important;
            width: 100% !important;
            max-width: 600px !important;
            border-radius: 1.25rem !important;
          }
          .hover_wrap {
            display: none !important;
          }
        }
        @media screen and (max-width: 767px) {
          .work-filter-bar {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 1rem !important;
            margin-bottom: 3.5rem !important;
            scrollbar-width: none;
          }
          .work-filter-bar::-webkit-scrollbar {
            display: none;
          }
          .work-filter-bar > button {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }
          .work-list_list {
            gap: 2.5rem !important;
            margin-bottom: 4.5rem !important;
          }
          .work-list_name {
            bottom: 0.75rem !important;
            left: 0.75rem !important;
            right: 0.75rem !important;
            max-width: calc(100% - 1.5rem) !important;
            padding: 0.55rem 0.85rem !important;
          }
          .work-list_name > div:first-child {
            flex-wrap: wrap !important;
            gap: 0.25rem 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
