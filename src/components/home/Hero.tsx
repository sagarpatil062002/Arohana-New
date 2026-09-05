'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Digital Brand Growth', href: '/services#digital' },
    { label: 'Hospitality Consulting', href: '/services#hospitality' },
    { label: 'Content Production', href: '/services#content' },
    { label: 'Special & Field Projects', href: '/indian-army-projects' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card scale & reveal
      gsap.fromTo(
        cardRef.current,
        { scale: 0.96, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-light"
      style={{
        paddingTop: 'clamp(1rem, 2vw, 2rem)',
        paddingBottom: 'clamp(3rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large">
        {/* Large Rounded Media Card with Category Tabs & Video Embed */}
        <div
          ref={cardRef}
          style={{
            position: 'relative',
            borderRadius: 'clamp(20px, 3.5vw, 40px)',
            overflow: 'hidden',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16)',
            minHeight: 'clamp(440px, 68vh, 760px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Background Video / Media with Cinematic Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              overflow: 'hidden',
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/images/home/hero-poster.jpg"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.65,
                filter: 'brightness(0.85) contrast(1.1)',
              }}
            >
              <source src="/videos/hero-montage.mp4" type="video/mp4" />
            </video>

            {/* Subtle Gradient Overlays for High Contrast Readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(12, 12, 14, 0.75) 0%, rgba(12, 12, 14, 0.1) 40%, rgba(12, 12, 14, 0.88) 100%)',
              }}
            />
          </div>

          {/* Top Category Tabs Bar */}
          <div
            className="touch-scroll-row"
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(0.85rem, 2vw, 1.75rem)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              gap: '0.75rem',
            }}
          >
            <div className="hero-tabs-wrap">
              {tabs.map((tab, idx) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    backgroundColor:
                      activeTab === idx
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    color: activeTab === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    border:
                      activeTab === idx
                        ? '1px solid rgba(255, 255, 255, 0.35)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            <div
              className="tag-mono"
              style={{
                display: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.7rem',
                whiteSpace: 'nowrap',
              }}
            >
              SCROLL TO EXPLORE ↓
            </div>
          </div>

          {/* Bottom Hero Statement & Founder Action Pill */}
          <div
            className="hero-bottom-wrap"
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(1.25rem, 3.5vw, 3rem)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            {/* Statement */}
            <div style={{ maxWidth: '640px' }}>
              <div
                className="tag-mono"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '0.85rem',
                  display: 'block',
                }}
              >
                WE ARE ĀROHANA
              </div>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4.2vw, 3.6rem)',
                  lineHeight: 1.08,
                  fontWeight: 500,
                  marginBottom: '1rem',
                  letterSpacing: '-0.03em',
                }}
              >
                We build brands, businesses & experiences.
              </h1>
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.35vw, 1.15rem)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.55,
                  maxWidth: '580px',
                  marginBottom: '1.5rem',
                }}
              >
                Ārohana brings together business thinking, creative communication and execution — from digital brand growth and content to hospitality consulting and complex on-ground projects.
              </p>

              <Link
                href="/contact"
                className="button-editorial button-editorial-white"
                style={{ height: '44px', padding: '0 1.5rem' }}
              >
                <div className="button-texts-slider">
                  <span className="button-text-item">Start a conversation</span>
                  <span className="button-text-item">Start a conversation</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-tabs-wrap {
          display: flex;
          gap: 0.65rem;
          flex-wrap: nowrap;
          width: max-content;
        }
        @media (max-width: 640px) {
          .hero-bottom-wrap {
            padding: 1.5rem 1.25rem 1.75rem !important;
            gap: 1.25rem !important;
          }
          .hero-tabs-wrap {
            padding-right: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
