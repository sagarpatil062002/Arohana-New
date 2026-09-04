'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      num: '01',
      title: 'Digital Brand Growth',
      category: 'Brand Systems & Performance',
      summary:
        'Building full digital brand infrastructure — positioning, visual identity, customer acquisition, content velocity, and revenue pipelines.',
      deliverables: ['Positioning & Identity', 'Performance Marketing', 'Website Systems', 'Conversion Strategy'],
      image: '/images/services/digital-growth.jpg',
      href: '/services#digital',
    },
    {
      num: '02',
      title: 'Hospitality Consulting',
      category: 'Concept, Menu & Revenue',
      summary:
        'End-to-end consulting for restaurants, cafes, boutique resorts, and experiential dining — menu engineering, customer journey, and operational economics.',
      deliverables: ['Concept & Narrative', 'Menu Architecture', 'Staff & Service Experience', 'Repeat Guest Strategy'],
      image: '/images/services/hospitality-consulting.jpg',
      href: '/services#hospitality',
    },
    {
      num: '03',
      title: 'Content & Brand Production',
      category: 'Cinematic & Documentary Media',
      summary:
        'Full-scale production for films, architectural shoots, brand documentaries, and narrative social assets designed to shift market perception.',
      deliverables: ['Film & Shoot Direction', 'Architectural Stills', 'Post-production & Sound', 'Digital Asset Libraries'],
      image: '/images/services/content-production.jpg',
      href: '/services#content',
    },
    {
      num: '04',
      title: 'Special & Field Projects',
      category: 'High-Altitude & Sensitive Operations',
      summary:
        'Deploying communication, documentation, and operational initiatives across complex environments — including Ladakh communities and the Indian Army.',
      deliverables: ['High-Altitude Fieldwork', 'Military Ceremonial Films', 'Community Communication', 'On-ground Execution'],
      image: '/images/home/strip-army.jpg',
      href: '/indian-army-projects',
    },
  ];

  // Mouse move tracker for smooth floating preview image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      if (previewRef.current && hoveredIndex !== null) {
        gsap.to(previewRef.current, {
          x: x + 30,
          y: y - 180,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    };

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [hoveredIndex]);

  return (
    <section
      ref={sectionRef}
      className="section-dark"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: '2.5rem',
          }}
        >
          <div>
            <div
              className="tag-mono"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
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
              THREE CORE PILLARS & SPECIAL OPERATIONS
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5.2rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#ffffff',
              }}
            >
              Services.
            </h2>
          </div>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '460px',
              lineHeight: 1.6,
            }}
          >
            Don't start with a service. Start with the problem. We assemble the right specialists
            around each specific brief.
          </p>
        </div>

        {/* Services List with Typographic Presence & Hover Focus */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={service.num}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '2.75rem',
                  paddingBottom: '2.75rem',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isAnyHovered && !isHovered ? 0.35 : 1,
                  transform: isHovered ? 'translateX(12px)' : 'translateX(0)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    alignItems: 'center',
                    gap: '2rem',
                  }}
                >
                  {/* Left: Number & Service Title */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        color: isHovered ? '#ff3b30' : 'rgba(255, 255, 255, 0.4)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {service.num}
                    </span>
                    <div>
                      <Link
                        href={service.href}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                          fontWeight: 400,
                          letterSpacing: '-0.03em',
                          lineHeight: 1.1,
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '1rem',
                        }}
                      >
                        <span>{service.title}</span>
                        <ArrowUpRight
                          size={28}
                          style={{
                            opacity: isHovered ? 1 : 0.3,
                            transform: isHovered ? 'translate(4px, -4px)' : 'none',
                            transition: 'all 0.3s ease',
                            color: isHovered ? '#ff3b30' : '#ffffff',
                          }}
                        />
                      </Link>
                      <div
                        className="tag-mono"
                        style={{
                          color: 'rgba(255, 255, 255, 0.5)',
                          marginTop: '0.4rem',
                          fontSize: '0.8rem',
                        }}
                      >
                        {service.category}
                      </div>
                    </div>
                  </div>

                  {/* Right: Summary & Deliverables */}
                  <div>
                    <p
                      style={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.75)',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem',
                        maxWidth: '520px',
                      }}
                    >
                      {service.summary}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.8)',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Inline Image (Fallback for non-hover touch devices) */}
                <div
                  className="mobile-service-img"
                  style={{
                    display: 'none',
                    marginTop: '1.5rem',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    position: 'relative',
                  }}
                >
                  <Image src={service.image} alt={service.title} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Desktop Cursor Preview Container */}
      <div
        ref={previewRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '380px',
          height: '260px',
          borderRadius: '24px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 50,
          opacity: hoveredIndex !== null ? 1 : 0,
          transform: 'scale(0.95)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
        className="desktop-floating-preview"
      >
        {services.map((service, index) => (
          <div
            key={service.num}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: hoveredIndex === index ? 1 : 0,
              transform: hoveredIndex === index ? 'scale(1)' : 'scale(1.06)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
                color: '#fff',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              PREVIEW • {service.title}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .desktop-floating-preview {
            display: none !important;
          }
          .mobile-service-img {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
