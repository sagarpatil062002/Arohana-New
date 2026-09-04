'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface ServiceItemData {
  num: string;
  title: string;
  tags: string[];
  image: string;
  alt: string;
  description: string;
  href: string;
}

const SERVICES_DATA: ServiceItemData[] = [
  {
    num: '1',
    title: 'Digital Brand Growth',
    tags: ['Brand Systems', 'Positioning', 'Website Architecture', 'Performance Marketing', 'Conversion Strategy'],
    image: '/images/services/digital-growth.jpg',
    alt: 'Digital brand systems and architecture showcase',
    description:
      'Architecting end-to-end digital infrastructure — brand positioning, visual identity, customer acquisition, content velocity, and revenue pipelines designed for market authority.',
    href: '/services#digital',
  },
  {
    num: '2',
    title: 'Hospitality Consulting',
    tags: ['Concept & Narrative', 'Menu Architecture', 'Service Journey', 'Repeat Strategy', 'Unit Economics'],
    image: '/images/services/hospitality-consulting.jpg',
    alt: 'Hospitality dining and experiential space design',
    description:
      'Transformative advisory for luxury hospitality, boutique resorts, and experiential dining — aligning operational rhythm, menu engineering, and staff culture with emotional narrative.',
    href: '/services#hospitality',
  },
  {
    num: '3',
    title: 'Content & Brand Production',
    tags: ['Film Direction', 'Architectural Stills', 'Documentary Narratives', 'Post-Production', 'Asset Libraries'],
    image: '/images/services/content-production.jpg',
    alt: 'Cinematic brand production and editorial cinematography',
    description:
      'Cinematic brand storytelling, high-precision visual assets, and documentary films designed to alter perception, command cultural credibility, and endure over decades.',
    href: '/services#content',
  },
  {
    num: '4',
    title: 'Special & Field Projects',
    tags: ['High-Altitude Fieldwork', 'Military Documentation', 'Civic Initiatives', 'Ladakh Briefs', 'On-ground Execution'],
    image: '/images/home/strip-army.jpg',
    alt: 'Special field operations with Indian Army and remote communities',
    description:
      'Deploying communication, documentary filmmaking, and operational initiatives across complex and austere environments — including landmark collaborations with the Indian Army.',
    href: '/indian-army-projects',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Subtle image scale matching Webflow Action a-45 (1.0 -> 1.1) as each item scrolls into view
      const imgElements = gsap.utils.toArray<HTMLElement>('.service-card-img');
      imgElements.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#f5f5f3',
        paddingTop: '2rem',
        paddingBottom: '3.5rem',
        overflow: 'visible',
      }}
    >
      {/* Outer page margin container */}
      <div
        style={{
          width: '100%',
          maxWidth: '1520px',
          margin: '0 auto',
          paddingLeft: 'clamp(1rem, 3vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 3vw, 2.5rem)',
          boxSizing: 'border-box',
          overflow: 'visible',
        }}
      >
        {/* Large Black Rounded Container (Matching Image 2 Reference) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '2.5rem',
            padding: 'clamp(2.5rem, 4.5vw, 4.5rem) clamp(1.75rem, 4vw, 4rem) clamp(3.5rem, 5vw, 5.5rem)',
            boxSizing: 'border-box',
            overflow: 'visible',
          }}
        >
          {/* Header Row: Services  × × × ×  (04) — Perfectly Horizontal Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingBottom: '2rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '3.5rem',
              boxSizing: 'border-box',
            }}
          >
            {/* Left: Services */}
            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)',
                fontWeight: 500,
                fontFamily: 'var(--font-display, "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                margin: 0,
                padding: 0,
              }}
            >
              Services
            </h2>

            {/* Center: 4 delicate crosses spaced evenly */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 'clamp(180px, 35vw, 450px)',
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: 'clamp(0.9rem, 1.3vw, 1.25rem)',
                userSelect: 'none',
              }}
            >
              <span>×</span>
              <span>×</span>
              <span>×</span>
              <span>×</span>
            </div>

            {/* Right: (04) */}
            <div
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)',
                fontWeight: 500,
                fontFamily: 'var(--font-display, "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                margin: 0,
                padding: 0,
              }}
            >
              (04)
            </div>
          </div>

          {/* Sticky Services Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {SERVICES_DATA.map((service, index) => {
              const isLast = index === SERVICES_DATA.length - 1;

              return (
                <div
                  key={service.num}
                  style={{
                    position: 'sticky',
                    top: '18vh',
                    backgroundColor: '#000000',
                    zIndex: index + 1,
                    paddingTop: '1.5rem',
                    paddingBottom: isLast ? '3rem' : '7rem',
                    boxSizing: 'border-box',
                    width: '100%',
                  }}
                >
                  {/* Subtle top divider line */}
                  <div
                    style={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      marginBottom: '2.5rem',
                    }}
                  />

                  {/* Two-Column Grid: Left Content & Right Visual */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: 'clamp(2rem, 5vw, 5rem)',
                      alignItems: 'start',
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: '#000000',
                    }}
                  >
                    {/* Left Column: Number Badge, Title, Tags, CTA */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {/* Header: Red Badge + Title */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                        }}
                      >
                        {/* Red circular badge */}
                        <div
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            backgroundColor: '#f3350c',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          {service.num}
                        </div>

                        {/* Service Title */}
                        <h3
                          style={{
                            color: '#f0eee6',
                            fontSize: 'clamp(1.75rem, 2.5vw, 2.35rem)',
                            fontWeight: 600,
                            fontFamily: 'var(--font-display, "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.15,
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          {service.title}
                        </h3>
                      </div>

                      {/* Tag Pills */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          maxWidth: '380px',
                          marginTop: '1.75rem',
                        }}
                      >
                        {service.tags.map((tag) => (
                          <div
                            key={tag}
                            style={{
                              padding: '0.45rem 0.95rem',
                              borderRadius: '9999px',
                              backgroundColor: '#19191c',
                              color: '#8c8c93',
                              fontSize: '0.825rem',
                              fontWeight: 500,
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              letterSpacing: '0.01em',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>

                      {/* White "Get in touch" Pill Button on Service 04 */}
                      {isLast && (
                        <div style={{ marginTop: '2.5rem' }}>
                          <Link
                            href="/contact"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.85rem',
                              padding: '0.85rem 1.75rem',
                              borderRadius: '9999px',
                              backgroundColor: '#ffffff',
                              color: '#000000',
                              fontWeight: 600,
                              fontSize: '0.925rem',
                              letterSpacing: '-0.01em',
                              textDecoration: 'none',
                              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                              transition: 'transform 0.25s ease, background-color 0.25s ease',
                            }}
                          >
                            <span>Get in touch</span>
                            <span
                              style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                backgroundColor: '#f3350c',
                                display: 'inline-block',
                              }}
                            />
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Compact 16:9 Image & Description */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                      }}
                    >
                      {/* Image card (compact, elegant, matching Image 2) */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          maxWidth: '440px',
                          aspectRatio: '16 / 9',
                          borderRadius: '18px',
                          overflow: 'hidden',
                          backgroundColor: '#161618',
                          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        <Image
                          src={service.image}
                          alt={service.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 440px"
                          className="service-card-img"
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.5s ease-out',
                          }}
                        />
                      </div>

                      {/* Description Paragraph */}
                      <div
                        style={{
                          maxWidth: '440px',
                          marginTop: '1.25rem',
                        }}
                      >
                        <p
                          style={{
                            color: '#8c8c93',
                            fontSize: '0.925rem',
                            lineHeight: 1.6,
                            margin: 0,
                            fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif)',
                          }}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
