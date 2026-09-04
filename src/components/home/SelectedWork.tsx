'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
      link: '/work/raysons',
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

    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      projects.forEach((_, index) => {
        const trigger = ScrollTrigger.create({
          trigger: `#work-step-${index}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
        triggers.push(trigger);
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      ref={containerRef}
      className="section-light"
      style={{
        paddingTop: '6rem',
        paddingBottom: '8rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large">
        {/* Header with Project Counter Badge */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '4rem',
          }}
        >
          <div>
            <div
              className="tag-mono"
              style={{
                color: '#777777',
                marginBottom: '1rem',
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
              PORTFOLIO ARCHITECTURE
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Selected Work.
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>CURATED CASES</span>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: '#111',
                  color: '#fff',
                  fontSize: '0.75rem',
                }}
              >
                06
              </span>
            </div>

            <Link href="/work" className="button-editorial">
              <div className="button-texts-slider">
                <span className="button-text-item">View all projects</span>
                <span className="button-text-item">View all projects</span>
              </div>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Sticky Showcase Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            position: 'relative',
          }}
        >
          {/* Sticky Left / Info Panel */}
          <div
            style={{
              position: 'sticky',
              top: '120px',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 2,
            }}
          >
            {/* Active Project Details with Smooth Fade */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
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
                  {projects[activeIndex].num} / 06
                </span>
                <span
                  className="tag-mono"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    color: '#444',
                  }}
                >
                  {projects[activeIndex].sector}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '0.75rem',
                  color: '#111111',
                }}
              >
                {projects[activeIndex].title}
              </h3>

              <div
                style={{
                  fontSize: '1.1rem',
                  color: '#444444',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                }}
              >
                {projects[activeIndex].subtitle}
              </div>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#666666',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                }}
              >
                {projects[activeIndex].description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {projects[activeIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '4px 10px',
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

              <Link
                href={projects[activeIndex].link}
                className="button-editorial button-editorial-dark"
                style={{ height: '48px', padding: '0 1.5rem' }}
              >
                <div className="button-texts-slider">
                  <span className="button-text-item">Read full case study</span>
                  <span className="button-text-item">Read full case study</span>
                </div>
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Quick Project Switcher Dots */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    const el = document.getElementById(`work-step-${idx}`);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: activeIndex === idx ? '#111' : '#999',
                    fontWeight: activeIndex === idx ? 600 : 400,
                  }}
                >
                  <span
                    style={{
                      width: activeIndex === idx ? '24px' : '8px',
                      height: '4px',
                      borderRadius: '2px',
                      backgroundColor: activeIndex === idx ? '#ff3b30' : '#ccc',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <span>{p.num}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scrolling Right / Image Cards Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                id={`work-step-${index}`}
                style={{
                  minHeight: '75vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Link
                  href={project.link}
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/11',
                    borderRadius: 'clamp(20px, 3vw, 36px)',
                    overflow: 'hidden',
                    backgroundColor: '#e6e6e4',
                    boxShadow:
                      activeIndex === index
                        ? '0 24px 60px rgba(0, 0, 0, 0.16)'
                        : '0 8px 24px rgba(0, 0, 0, 0.06)',
                    transform: activeIndex === index ? 'scale(1)' : 'scale(0.97)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'block',
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />

                  {/* Corner Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.25rem',
                      padding: '0.45rem 0.95rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#111',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
