'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ExperienceLoader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if shown in this session already
    try {
      const hasLoaded = sessionStorage.getItem('arohana_loaded');
      if (hasLoaded) {
        setIsVisible(false);
        document.documentElement.classList.remove('arohana-is-loading');
        document.documentElement.classList.add('arohana-already-loaded');
        return;
      }
    } catch (e) {
      setIsVisible(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      // Accelerate toward 100%
      const increment = Math.floor(Math.random() * 8) + 4;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          try {
            sessionStorage.setItem('arohana_loaded', 'true');
          } catch (e) {}
          document.documentElement.classList.remove('arohana-is-loading');
          document.documentElement.classList.add('arohana-already-loaded');
          setTimeout(() => {
            setIsVisible(false);
          }, 600);
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div
      id="arohana-experience-loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#08080A',
        color: '#ffffff',
        userSelect: 'none',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        pointerEvents: isFading ? 'none' : 'auto',
        overflow: 'hidden',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Dot matrix background overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      {/* Red ambient glow in center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(280px, 50vw, 500px)',
          height: 'clamp(280px, 50vw, 500px)',
          backgroundColor: 'rgba(222, 50, 45, 0.12)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Meta Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1080px',
          fontSize: 'clamp(9px, 1.2vw, 11px)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#8E8E96',
          zIndex: 2,
        }}
      >
        <span>ĀROHANA CONSULTANCY</span>
        <span className="hide-on-mobile">BRANDS · BUSINESSES · EXPERIENCES</span>
        <span>EST. 2020</span>
      </div>

      {/* Center Branding & Logo */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto 0',
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'clamp(200px, 35vw, 320px)',
            height: 'clamp(44px, 8vw, 70px)',
            marginBottom: '1.25rem',
          }}
        >
          <Image
            src="/images/arohana-logo.png"
            alt="Ārohana Consultancy"
            fill
            priority
            style={{
              objectFit: 'contain',
              filter: 'brightness(0) invert(1) drop-shadow(0 0 35px rgba(255, 255, 255, 0.3))',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '24px', height: '1px', backgroundColor: '#DE322D' }} />
          <p
            style={{
              fontSize: 'clamp(10px, 1.2vw, 12px)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
            }}
          >
            Brands · Businesses · Experiences
          </p>
          <div style={{ width: '24px', height: '1px', backgroundColor: '#DE322D' }} />
        </div>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div
        style={{
          width: '100%',
          maxWidth: '1080px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(10px, 1.2vw, 12px)',
            color: '#8E8E96',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#DE322D',
                boxShadow: '0 0 10px #DE322D',
              }}
            />
            <span style={{ letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)' }}>
              INITIALIZING EXPERIENCE
            </span>
          </div>

          <span style={{ color: '#ffffff', fontWeight: 600, letterSpacing: '0.05em' }}>
            [ {formattedProgress}% ]
          </span>
        </div>

        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '2px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              backgroundColor: '#DE322D',
              width: `${progress}%`,
              transition: 'width 0.05s linear',
              boxShadow: '0 0 12px rgba(222, 50, 45, 0.8)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
