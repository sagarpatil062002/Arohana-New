'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      num: '1',
      fullNum: '01',
      title: 'Digital Brand Growth',
      summary:
        'Building full digital brand infrastructure — positioning, visual identity, customer acquisition, content velocity, and revenue pipelines.',
      tags: ['Positioning & Identity', 'Performance Marketing', 'Website Systems', 'Conversion Strategy'],
      image: '/images/services/digital-growth.jpg',
      href: '/services#digital',
    },
    {
      num: '2',
      fullNum: '02',
      title: 'Hospitality Consulting',
      summary:
        'End-to-end consulting for restaurants, cafes, boutique resorts, and experiential dining — menu engineering, customer journey, and operational economics.',
      tags: ['Concept & Narrative', 'Menu Architecture', 'Staff & Service Experience', 'Repeat Guest Strategy'],
      image: '/images/services/hospitality-consulting.jpg',
      href: '/services#hospitality',
    },
    {
      num: '3',
      fullNum: '03',
      title: 'Content & Brand Production',
      summary:
        'Full-scale production for films, architectural shoots, brand documentaries, and narrative social assets designed to shift market perception.',
      tags: ['Film & Shoot Direction', 'Architectural Stills', 'Post-production & Sound', 'Digital Asset Libraries'],
      image: '/images/services/content-production.jpg',
      href: '/services#content',
    },
    {
      num: '4',
      fullNum: '04',
      title: 'Special & Field Projects',
      summary:
        'Deploying communication, documentation, and operational initiatives across complex environments — including Ladakh communities and the Indian Army.',
      tags: ['High-Altitude Fieldwork', 'Military Ceremonial Films', 'Community Communication', 'On-ground Execution'],
      image: '/images/home/strip-army.jpg',
      href: '/indian-army-projects',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rows = gsap.utils.toArray<HTMLElement>('.service-row-item');
    if (!rows || rows.length === 0) return;

    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger && (t.vars.trigger as HTMLElement).classList?.contains('service-row-item')) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-dark"
      style={{
        paddingTop: '8rem',
        paddingBottom: '9rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0b0b0c',
        color: '#ffffff',
      }}
    >
      <div className="padding-global container-large" style={{ position: 'relative', zIndex: 10 }}>
        {/* Alture Reference Header (Frame 20): Services + + + + (04) */}
        <div
          className="services-header-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {/* Left: Services */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Services
          </h2>

          {/* Center: Four delicate plus crosses (+ + + +) */}
          <div
            className="header-crosses"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              color: 'rgba(255, 255, 255, 0.35)',
              fontSize: '1.25rem',
              fontFamily: 'var(--font-mono)',
              userSelect: 'none',
            }}
          >
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
          </div>

          {/* Right: (04) */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#ffffff',
              margin: 0,
            }}
          >
            (04)
          </div>
        </div>

        {/* Services List matching Video (Frames 22, 24) */}
        <div
          style={{ display: 'flex', flexDirection: 'column' }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={service.fullNum}
                className="service-row-item"
                onMouseEnter={() => setHoveredIndex(index)}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
                  paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
                  transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isAnyHovered && !isHovered ? 0.3 : 1,
                }}
              >
                <div
                  className="service-grid-layout"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.1fr 1fr',
                    gap: 'clamp(2.5rem, 5vw, 5rem)',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Left Column: Number Circle + Title + Tag Capsules (Frame 22, 24) */}
                  <div>
                    {/* Circle badge with number + Title */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '1.25rem',
                        marginBottom: '2rem',
                      }}
                    >
                      {/* Orange circular number badge */}
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#ff5500',
                          color: '#ffffff',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transform: 'translateY(-4px)',
                          boxShadow: '0 2px 8px rgba(255, 85, 0, 0.4)',
                        }}
                      >
                        {service.num}
                      </span>

                      {/* Title */}
                      <Link
                        href={service.href}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                          fontWeight: 400,
                          letterSpacing: '-0.025em',
                          lineHeight: 1.1,
                          color: '#ffffff',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          transition: 'color 0.3s ease',
                        }}
                        className="hover:text-neutral-200"
                      >
                        <span>{service.title}</span>
                        <ArrowUpRight
                          size={28}
                          style={{
                            opacity: isHovered ? 1 : 0.25,
                            transform: isHovered ? 'translate(4px, -4px)' : 'none',
                            transition: 'all 0.3s ease',
                            color: isHovered ? '#ff5500' : '#ffffff',
                          }}
                        />
                      </Link>
                    </div>

                    {/* Tag Badges in Sleek Dark Capsules */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.65rem',
                        flexWrap: 'wrap',
                        maxWidth: '520px',
                      }}
                    >
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.825rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '0.5rem 1.15rem',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: 'rgba(255, 255, 255, 0.85)',
                            letterSpacing: '0.02em',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: In-Layout Rounded Image Card + Description (Frame 22, 24) */}
                  <div>
                    {/* Rounded Image Card */}
                    <Link
                      href={service.href}
                      style={{
                        display: 'block',
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16/10',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        backgroundColor: '#161618',
                        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
                      }}
                      className="group"
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 900px) 95vw, 540px"
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className="group-hover:scale-105"
                      />
                    </Link>

                    {/* Summary Description Paragraph */}
                    <p
                      style={{
                        fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                        color: 'rgba(255, 255, 255, 0.72)',
                        lineHeight: 1.65,
                        marginTop: '1.5rem',
                        marginBottom: '1rem',
                        maxWidth: '560px',
                      }}
                    >
                      {service.summary}
                    </p>

                    {/* Subtle Explore Link */}
                    <Link
                      href={service.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#ff5500',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                      }}
                      className="hover:underline"
                    >
                      <span>EXPLORE PRACTICE AREA</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .service-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .header-crosses {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
