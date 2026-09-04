'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineLeftRef = useRef<HTMLHeadingElement>(null);
  const headlineRightRef = useRef<HTMLHeadingElement>(null);
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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Masked reveal for split headline
      tl.fromTo(
        [headlineLeftRef.current, headlineRightRef.current],
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.15 }
      );

      // Card scale & reveal
      tl.fromTo(
        cardRef.current,
        { scale: 0.96, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2 },
        '-=0.7'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-light"
      style={{
        paddingTop: '2.5rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large">
        {/* Giant Split Editorial Headline */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1.75rem',
            overflow: 'hidden',
          }}
        >
          <h1
            ref={headlineLeftRef}
            style={{
              fontSize: 'clamp(3.8rem, 13.5vw, 13rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              fontWeight: 500,
              color: '#111111',
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            Ārohana
            <span
              style={{
                fontSize: 'clamp(1.2rem, 3.5vw, 3.2rem)',
                marginLeft: '0.35rem',
                fontWeight: 400,
                color: '#555',
              }}
            >
              ®
            </span>
          </h1>

          <div
            ref={headlineRightRef}
            style={{
              fontSize: 'clamp(3.8rem, 13.5vw, 13rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              fontWeight: 500,
              color: '#111111',
              textAlign: 'right',
            }}
          >
            Consultancy
          </div>
        </div>

        {/* Large Rounded Media Card with Category Tabs & Video Embed */}
        <div
          ref={cardRef}
          style={{
            position: 'relative',
            borderRadius: 'clamp(24px, 3.5vw, 40px)',
            overflow: 'hidden',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16)',
            minHeight: 'clamp(480px, 68vh, 760px)',
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
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(1rem, 2.5vw, 1.75rem)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              overflowX: 'auto',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'nowrap' }}>
              {tabs.map((tab, idx) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                    padding: '0.55rem 1.15rem',
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
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            {/* Statement */}
            <div style={{ maxWidth: '640px' }}>
              <div
                className="tag-mono"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#ff3b30',
                  }}
                />
                WE ARE ĀROHANA
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)',
                  lineHeight: 1.1,
                  fontWeight: 400,
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                We build brands, businesses & experiences.
              </h2>
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.5,
                  maxWidth: '540px',
                }}
              >
                Bringing together commercial context, sector depth and creative execution —
                from digital brand growth to hospitality consulting and complex on-ground briefs.
              </p>
            </div>

            {/* Founder Contact Pill directly inside hero */}
            <Link
              href="/contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                padding: '0.65rem 1.25rem 0.65rem 0.65rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Image
                  src="/images/home/madhura-editorial.jpg"
                  alt="Madhura - Founder Ārohana"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  Contact Madhura
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#28cd41',
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.65)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Founder & Principal Director
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
