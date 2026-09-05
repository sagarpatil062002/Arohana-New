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
    title: 'Brand & Digital Growth',
    tags: ['Brand Strategy', 'Social Ecosystems', 'Creative Direction', 'Performance Marketing', 'Platform Execution'],
    image: '/images/services/digital-growth.jpg',
    alt: 'Digital brand strategy and growth systems',
    description:
      'Brand strategy, content, social media, creative direction, video production, advertising and websites for businesses that need a stronger market presence.',
    href: '/services#digital-growth',
  },
  {
    num: '2',
    title: 'Content & Communication',
    tags: ['Documentaries', 'Films', 'Extreme Terrains', 'Scripting', 'Post-Production'],
    image: '/images/services/content-production.jpg',
    alt: 'Content and brand production from scripting through post-production',
    description:
      'Corporate films, documentaries, campaigns and institutional content — from scripting through post-production.',
    href: '/services#brand-production',
  },
  {
    num: '3',
    title: 'Hospitality & Experience',
    tags: ['Concept & Menu', 'Kitchen Pass', 'Unit Economics', 'Staff Systems', 'Guest Journeys'],
    image: '/images/services/hospitality-consulting.jpg',
    alt: 'Hospitality consulting and operational systems',
    description:
      'Menu creation, operational systems, staff training, revenue optimisation and digital marketing — built from actual hospitality experience.',
    href: '/services#hospitality-consulting',
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
        {/* Large Black Rounded Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: 'clamp(1.5rem, 3vw, 2.5rem)',
            padding: 'clamp(2rem, 4vw, 4.5rem) clamp(1.25rem, 3.5vw, 4rem) clamp(2.5rem, 5vw, 5.5rem)',
            boxSizing: 'border-box',
            overflow: 'visible',
          }}
        >
          {/* Header Row: Services  × × × ×  (04) */}
          <div
            className="services-header-top"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingBottom: '1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
              boxSizing: 'border-box',
            }}
          >
            {/* Header Row */}
            <div style={{ maxWidth: '820px' }}>
              <div
                className="tag-mono"
                style={{
                  color: '#DE322D',
                  marginBottom: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                }}
              >
                Services & Practice Areas
              </div>
              <h2
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  margin: '0 0 1rem 0',
                }}
              >
                Everything we do.
              </h2>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: '740px',
                }}
              >
                Depending on the brief, that can mean building a digital brand, running an ongoing social ecosystem, creating a film, fixing a restaurant's menu and operating systems, or taking a project from an idea to on-ground execution.
              </p>
            </div>

            {/* Right: CTA to Services & (03) */}
            <div className="services-header-cta-wrap" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
              <Link
                href="/services"
                className="button-editorial button-editorial-primary"
                style={{ height: '44px', padding: '0 1.5rem', whiteSpace: 'nowrap' }}
              >
                <div className="button-texts-slider">
                  <span className="button-text-item">Explore Detailed Services</span>
                  <span className="button-text-item">Explore Detailed Services</span>
                </div>
              </Link>
              <div
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(2rem, 4.5vw, 4.25rem)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  padding: 0,
                }}
              >
                (03)
              </div>
            </div>
          </div>

          {/* Services Stack */}
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
                  className="service-card-wrapper"
                  style={{
                    position: 'sticky',
                    top: '16vh',
                    backgroundColor: '#000000',
                    zIndex: index + 1,
                    paddingTop: '1.5rem',
                    paddingBottom: isLast ? '2.5rem' : '6rem',
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
                      marginBottom: '2rem',
                    }}
                  />

                  {/* Two-Column Grid: Left Content & Right Visual */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                      gap: 'clamp(1.75rem, 4vw, 5rem)',
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
                            fontWeight: 500,
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.025em',
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
                            fontFamily: 'var(--font-body)',
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

          {/* Bottom Explore CTA */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '2.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Link
              href="/services"
              className="button-editorial button-editorial-white"
              style={{ height: '48px', padding: '0 2rem' }}
            >
              <div className="button-texts-slider">
                <span className="button-text-item">Explore our services</span>
                <span className="button-text-item">Explore our services</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media screen and (max-width: 639px) {
          .services-header-crosses {
            display: none !important;
          }
        }
        @media screen and (max-width: 767px) {
          :global(.services-header-top) {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          :global(.services-header-cta-wrap) {
            width: 100% !important;
            justify-content: space-between !important;
          }
          :global(.service-card-wrapper) {
            position: relative !important;
            top: auto !important;
            padding-bottom: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
