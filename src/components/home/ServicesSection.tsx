'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const previewWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Position tracking with smooth lerp
  const mousePos = useRef({ x: 0, y: 0 });
  const previewPos = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

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

  // Smooth lerp mouse tracking loop for the floating image container
  useEffect(() => {
    const section = sectionRef.current;
    const previewEl = previewWrapRef.current;
    if (!section || !previewEl) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const loop = () => {
      if (isHoveringRef.current) {
        // Interpolate preview position towards mouse position with a 0.12 lerp factor
        previewPos.current.x += (mousePos.current.x + 40 - previewPos.current.x) * 0.12;
        previewPos.current.y += (mousePos.current.y - 140 - previewPos.current.y) * 0.12;

        gsap.set(previewEl, {
          x: previewPos.current.x,
          y: previewPos.current.y,
        });
      }
      rafId = requestAnimationFrame(loop);
    };

    section.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Mobile scroll-driven activation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 992;
    if (!isMobile) return;

    const triggers = services.map((_, idx) =>
      ScrollTrigger.create({
        trigger: `#mobile-service-${idx}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setMobileActiveIndex(idx),
        onEnterBack: () => setMobileActiveIndex(idx),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, [services.length]);

  const handleMouseEnter = (index: number) => {
    isHoveringRef.current = true;
    setHoveredIndex(index);

    if (previewWrapRef.current) {
      gsap.to(previewWrapRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    setHoveredIndex(null);

    if (previewWrapRef.current) {
      gsap.to(previewWrapRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.35,
        ease: 'power3.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-dark"
      style={{
        paddingTop: '9rem',
        paddingBottom: '9rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0b0b0c',
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
            marginBottom: '6rem',
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
              THREE CORE PILLARS & SPECIAL BRIEF
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

        {/* Services List with Typographic Dominance */}
        <div style={{ display: 'flex', flexDirection: 'column' }} onMouseLeave={handleMouseLeave}>
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={service.num}
                id={`mobile-service-${index}`}
                onMouseEnter={() => handleMouseEnter(index)}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '3rem',
                  paddingBottom: '3rem',
                  transition:
                    'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isAnyHovered && !isHovered ? 0.25 : 1,
                  transform: isHovered ? 'translateX(16px)' : 'translateX(0)',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    alignItems: 'center',
                    gap: '2.5rem',
                  }}
                >
                  {/* Left: Number & Giant Service Title */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        color: isHovered ? '#ff3b30' : 'rgba(255, 255, 255, 0.35)',
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
                          textDecoration: 'none',
                        }}
                      >
                        <span>{service.title}</span>
                        <ArrowUpRight
                          size={28}
                          style={{
                            opacity: isHovered ? 1 : 0.25,
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

                {/* Mobile Inline Image (Scroll-driven activation) */}
                <div
                  className="mobile-service-img"
                  style={{
                    display: 'none',
                    marginTop: '1.75rem',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    position: 'relative',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <Image src={service.image} alt={service.title} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP FLOATING PREVIEW IMAGE WITH LERP CURSOR-FOLLOW & CLIP-PATH CROSSFADE */}
      <div
        ref={previewWrapRef}
        className="desktop-floating-preview"
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
          opacity: 0,
          transform: 'scale(0.9)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          willChange: 'transform, opacity',
        }}
      >
        {services.map((service, index) => {
          const isActive = hoveredIndex === index;

          return (
            <div
              key={service.num}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.06)',
                clipPath: isActive ? 'inset(0% 0% 0% 0%)' : 'inset(8% 8% 8% 8%)',
                transition:
                  'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform, opacity, clip-path',
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
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{service.title}</span>
                <span style={{ color: '#ff3b30' }}>{service.num}</span>
              </div>
            </div>
          );
        })}
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
