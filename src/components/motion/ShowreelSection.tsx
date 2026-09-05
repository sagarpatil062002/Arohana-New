'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export interface ShowreelItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

interface ShowreelSectionProps {
  items: ShowreelItem[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  theme?: 'light' | 'dark';
}

export default function ShowreelSection({
  items,
  eyebrow = 'WHERE OUR EXPERIENCE SITS',
  heading = 'Sector understanding that shapes practical, commercially grounded execution.',
  subheading,
  theme = 'light',
}: ShowreelSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinnedBox = pinnedBoxRef.current;
    if (!container || !pinnedBox) return;

    const isMobile = window.innerWidth < 992;
    if (isMobile) return;

    const numItems = items.length;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${(numItems - 1) * 90}%`,
      pin: pinnedBox,
      anticipatePin: 1,
      scrub: 0.5,
      onUpdate: (self) => {
        const raw = self.progress * (numItems - 1);
        const idx = Math.min(numItems - 1, Math.max(0, Math.round(raw)));
        setActiveIndex(idx);
      },
    });

    return () => trigger.kill();
  }, [items.length]);

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: isDark ? '#0b0b0c' : '#f5f5f3',
        color: isDark ? '#ffffff' : '#111111',
      }}
    >
      {/* Pinned Desktop Viewport */}
      <div
        ref={pinnedBoxRef}
        className="showreel-pinned-viewport"
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: '5rem',
          paddingBottom: '2.5rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div className="padding-global container-large" style={{ width: '100%' }}>
          {/* Top Info */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '2rem',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              paddingBottom: '1.25rem',
            }}
          >
            <div>
              <div
                className="tag-mono"
                style={{
                  color: isDark ? '#ff3b30' : '#ff3b30',
                  marginBottom: '0.5rem',
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
                {eyebrow}
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  maxWidth: '820px',
                  marginBottom: subheading ? '0.75rem' : 0,
                }}
              >
                {heading}
              </h2>
              {subheading && (
                <p
                  style={{
                    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                    color: isDark ? 'rgba(255,255,255,0.7)' : '#555555',
                    lineHeight: 1.55,
                    maxWidth: '680px',
                    margin: 0,
                  }}
                >
                  {subheading}
                </p>
              )}
            </div>

            {/* Indicator Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    height: '4px',
                    width: activeIndex === idx ? '32px' : '10px',
                    backgroundColor:
                      activeIndex === idx
                        ? '#ff3b30'
                        : isDark
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.15)',
                    borderRadius: '2px',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Media & Text Split Canvas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'center',
              height: 'calc(100vh - 240px)',
              maxHeight: '660px',
            }}
          >
            {/* Left: Cinematic Media Canvas */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: 'clamp(20px, 3vw, 36px)',
                overflow: 'hidden',
                backgroundColor: '#0c0c0e',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.15)',
              }}
            >
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;
                const isPast = idx < activeIndex;

                return (
                  <div
                    key={item.id}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? 'scale(1)'
                        : isPast
                        ? 'scale(1.05)'
                        : 'scale(0.96)',
                      clipPath: isActive
                        ? 'inset(0% 0% 0% 0%)'
                        : isPast
                        ? 'inset(0% 0% 10% 0%)'
                        : 'inset(10% 0% 0% 0%)',
                      transition:
                        'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={idx === 0}
                      style={{
                        objectFit: 'cover',
                        transform: isActive ? 'scale(1.02)' : 'scale(1.08)',
                        transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        left: '1.5rem',
                        padding: '0.45rem 1rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                      }}
                    >
                      {item.badge}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Narrative Details */}
            <div style={{ position: 'relative' }}>
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={item.id}
                    style={{
                      position: idx === 0 ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                      transition:
                        'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      visibility: isActive ? 'visible' : 'hidden',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#ff3b30',
                        marginBottom: '0.75rem',
                        display: 'block',
                      }}
                    >
                      0{idx + 1} / 0{items.length}
                    </span>

                    <h3
                      style={{
                        fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {item.title}
                    </h3>

                    <div
                      style={{
                        fontSize: '1.1rem',
                        color: isDark ? 'rgba(255,255,255,0.75)' : '#555555',
                        fontWeight: 500,
                        lineHeight: 1.4,
                        marginBottom: '1.5rem',
                      }}
                    >
                      {item.subtitle}
                    </div>

                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: isDark ? 'rgba(255,255,255,0.6)' : '#666666',
                        lineHeight: 1.6,
                        maxWidth: '460px',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CARDS (Fallback for touch screens) */}
      <div className="showreel-mobile-view" style={{ display: 'none', padding: '4rem 1.25rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '0.5rem' }}>
            {eyebrow}
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 500, marginBottom: subheading ? '0.5rem' : 0 }}>{heading}</h2>
          {subheading && (
            <p style={{ fontSize: '0.9rem', color: isDark ? 'rgba(255,255,255,0.7)' : '#555555', lineHeight: 1.5, margin: 0 }}>
              {subheading}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {items.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <span className="tag-mono" style={{ color: '#ff3b30', fontSize: '0.75rem' }}>
                  0{i + 1} • {item.badge}
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 500, margin: '0.25rem 0 0.5rem 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: isDark ? '#aaa' : '#666', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .showreel-pinned-viewport {
            display: none !important;
          }
          .showreel-mobile-view {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
