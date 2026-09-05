'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function BrandsMarquee() {
  const brands = [
    { name: 'Raysons Group', desc: 'Industrial Castings & Real Estate', link: '/work/raysons' },
    { name: 'PictureTime', desc: 'High-Altitude Inflatable Cinema', link: '/work/picturetime' },
    { name: 'Loom Crafts', desc: 'Luxury Outdoor & Modular Structures', link: '/work/loom-crafts' },
    { name: 'Indian Army', desc: 'Western Command & 14 Corps', link: '/indian-army-projects' },
    { name: 'Misu', desc: 'Contemporary Pan-Asian Hospitality', link: '/work/misu' },
    { name: 'RR Skins', desc: 'Clinical Dermatology & Patient Education', link: '/work/rr-skins' },
    { name: 'Blu Resorts', desc: 'Boutique Coastal Living & Hospitality', link: '/work' },
    { name: 'Qubice', desc: 'Architectural Modular Solutions', link: '/work' },
    { name: 'Neora Deck', desc: 'Wood Composite & Built Environment', link: '/work' },
    { name: 'SHE Project', desc: 'High-Altitude Livelihood Initiative', link: '/work/she' },
    { name: 'DTK Karekar', desc: 'Heritage Fine Jewellery & Retail', link: '/work' },
    { name: 'Tourin', desc: 'Experiential Travel Ladakh', link: '/tourin' },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);

  const xRef = useRef<number>(0);
  const setWidthRef = useRef<number>(0);
  const currentSpeedRef = useRef<number>(1.0);
  const targetSpeedRef = useRef<number>(1.0);
  const isHoveredRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    const firstGroup = firstGroupRef.current;
    const container = containerRef.current;
    if (!track || !firstGroup || !container) return;

    // Disable CSS keyframe animation so JavaScript RAF takes over with smooth physics
    track.style.animation = 'none';

    // Measure single set width (including gap)
    const updateWidth = () => {
      if (firstGroup) {
        setWidthRef.current = firstGroup.offsetWidth;
      }
    };
    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    resizeObserver.observe(firstGroup);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hover listeners with smooth deceleration
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      targetSpeedRef.current = 0.18; // Smooth cinematic deceleration rather than abrupt freeze
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      targetSpeedRef.current = 1.0;
    };

    // Optional gentle cursor physics: subtly influence speed based on cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHoveredRef.current) return;
      const rect = container.getBoundingClientRect();
      // Normalized offset from center: -0.5 to +0.5
      const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
      // Slight smooth variation around 0.18
      targetSpeedRef.current = Math.max(0.08, 0.22 + normalizedX * 0.15);
    };

    container.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    let rafId: number;
    lastTimeRef.current = performance.now();

    const baseSpeed = 1.05; // ~63px/sec at 60fps - deliberate, premium velocity

    const tick = (now: number) => {
      if (prefersReducedMotion) {
        return;
      }

      // Compute delta time normalized to 60fps (16.67ms)
      const delta = Math.min((now - lastTimeRef.current) / 16.667, 2.0);
      lastTimeRef.current = now;

      // Smooth lerp deceleration/acceleration (smooth interpolation)
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.055 * delta;

      // Move leftwards
      xRef.current -= baseSpeed * currentSpeedRef.current * delta;

      // Mathematically seamless loop: when set 1 fully moves past, offset by set 1 width
      const setWidth = setWidthRef.current;
      if (setWidth > 0) {
        if (xRef.current <= -setWidth) {
          xRef.current += setWidth;
        } else if (xRef.current > 0) {
          xRef.current -= setWidth;
        }
      }

      // GPU translate3d compositor transform - zero layout reflows, 0 React re-renders
      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      className="section-light"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
      }}
    >
      <div className="padding-global container-large" style={{ marginBottom: '3.5rem' }}>
        <div
          className="tag-mono"
          style={{
            color: '#777777',
            marginBottom: '1rem',
            display: 'block',
          }}
        >
          PARTNERSHIPS
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4.2vw, 3.8rem)',
            maxWidth: '1080px',
            lineHeight: 1.1,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: '#111111',
          }}
        >
          Brands and organisations we've worked with.
        </h2>
      </div>

      {/* Marquee Container with Subtle Edge Masks */}
      <div ref={containerRef} className="marquee-container">
        <div
          ref={trackRef}
          className="marquee-track"
          style={{
            display: 'flex',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {/* Primary Group */}
          <div ref={firstGroupRef} className="marquee-group">
            {brands.map((brand, index) => (
              <Link
                key={`primary-${brand.name}-${index}`}
                href={brand.link}
                className="marquee-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 'clamp(260px, 28vw, 330px)',
                  minWidth: 'clamp(260px, 28vw, 330px)',
                  height: 'clamp(150px, 18vh, 175px)',
                  padding: 'clamp(1.25rem, 2vw, 1.6rem)',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                  textDecoration: 'none',
                  transition:
                    'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.07)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 500,
                      color: '#111111',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {brand.name}
                  </div>
                  <ArrowUpRight size={17} color="#888888" />
                </div>

                <div>
                  <p
                    style={{
                      fontSize: '0.825rem',
                      color: '#666666',
                      lineHeight: 1.4,
                    }}
                  >
                    {brand.desc}
                  </p>
                  <span
                    className="tag-mono"
                    style={{
                      fontSize: '0.625rem',
                      color: '#888888',
                      marginTop: '0.45rem',
                      display: 'block',
                      letterSpacing: '0.08em',
                    }}
                  >
                    VIEW WORK →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary Duplicate Group for Gapless Loop */}
          <div className="marquee-group" aria-hidden="true">
            {brands.map((brand, index) => (
              <Link
                key={`secondary-${brand.name}-${index}`}
                href={brand.link}
                tabIndex={-1}
                className="marquee-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 'clamp(260px, 28vw, 330px)',
                  minWidth: 'clamp(260px, 28vw, 330px)',
                  height: 'clamp(150px, 18vh, 175px)',
                  padding: 'clamp(1.25rem, 2vw, 1.6rem)',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                  textDecoration: 'none',
                  transition:
                    'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.07)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 500,
                      color: '#111111',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {brand.name}
                  </div>
                  <ArrowUpRight size={17} color="#888888" />
                </div>

                <div>
                  <p
                    style={{
                      fontSize: '0.825rem',
                      color: '#666666',
                      lineHeight: 1.4,
                    }}
                  >
                    {brand.desc}
                  </p>
                  <span
                    className="tag-mono"
                    style={{
                      fontSize: '0.625rem',
                      color: '#888888',
                      marginTop: '0.45rem',
                      display: 'block',
                      letterSpacing: '0.08em',
                    }}
                  >
                    VIEW WORK →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
