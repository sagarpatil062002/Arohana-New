'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useCmsContent } from '@/lib/cms/content-context';

export default function InteractiveCTA() {
  const { content } = useCmsContent();
  const ctaCms = content?.home?.cta;
  const activeEyebrow = ctaCms?.eyebrow || 'START A CONVERSATION';
  const activeHeadline = ctaCms?.headline || "If you're building something serious, let's talk about what it actually needs.";
  const activeDesc = ctaCms?.description || "Let's start with what you're trying to solve or build, not a cookie-cutter agency proposal.";
  const activeButtonLabel = ctaCms?.buttonLabel || 'Start a conversation';
  const activeButtonLink = ctaCms?.buttonLink || '/contact';
  const activeEmail = ctaCms?.email || 'founder@byarohana.com';

  const sectionRef = useRef<HTMLDivElement>(null);
  const visualWrapRef = useRef<HTMLDivElement>(null);

  const trailImages = [
    '/images/case-studies/raysons/casting-hero.jpg',
    '/images/case-studies/loom/loom-hero.jpg',
    '/images/case-studies/picturetime/picturetime-hero.jpg',
    '/images/case-studies/she/she-hero.jpg',
    '/images/case-studies/misu/misu-hero.jpg',
    '/images/case-studies/rrskins/rrskins-hero.jpg',
    '/images/tourin/tourin-hero.jpg',
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const visualWrap = visualWrapRef.current;
    if (!section || !visualWrap) return;
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return;

    let imageIndex = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      // Trigger clone only when moved at least 85px
      const dist = Math.hypot(currentX - lastX, currentY - lastY);
      if (dist > 85) {
        lastX = currentX;
        lastY = currentY;

        const imgSrc = trailImages[imageIndex % trailImages.length];
        imageIndex++;

        // Create trailing card element
        const card = document.createElement('div');
        card.style.position = 'absolute';
        card.style.left = `${currentX - 90}px`;
        card.style.top = `${currentY - 60}px`;
        card.style.width = '180px';
        card.style.height = '120px';
        card.style.borderRadius = '6px';
        card.style.overflow = 'hidden';
        card.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)';
        card.style.border = '1px solid rgba(255,255,255,0.2)';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '5';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        card.appendChild(img);

        visualWrap.appendChild(card);

        // GSAP Trail Animation
        const tl = gsap.timeline({
          onComplete: () => {
            if (card.parentNode) card.parentNode.removeChild(card);
          },
        });

        tl.fromTo(card, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
        tl.to(card, {
          y: '+=25',
          scale: 0.7,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in',
        }, '+=0.2');
      }
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-dark"
      style={{
        paddingTop: 'clamp(4.5rem, 8vw, 9rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 9rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating Visual Clones Container */}
      <div
        ref={visualWrapRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 1,
        }}
      />

      <div
        className="padding-global container-large"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
            className="tag-mono"
            style={{
              color: '#888888',
              marginBottom: '1.5rem',
              display: 'block',
            }}
          >
            {activeEyebrow}
          </div>

        <h2
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)',
            fontWeight: 500,
            letterSpacing: '-0.035em',
            lineHeight: 1.06,
            color: '#ffffff',
            maxWidth: '1080px',
            marginBottom: '1.25rem',
          }}
        >
          {activeHeadline}
        </h2>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '680px',
            lineHeight: 1.5,
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          {activeDesc}
        </p>

        <div className="interactive-cta-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '520px' }}>
          <Link
            href={activeButtonLink}
            className="button-editorial button-editorial-dark"
            style={{
              height: '52px',
              padding: '0 2rem',
              fontSize: '0.95rem',
              backgroundColor: '#000000',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item">{activeButtonLabel}</span>
              <span className="button-text-item">{activeButtonLabel}</span>
            </div>
            <ArrowRight size={16} />
          </Link>

          <a
            href={`mailto:${activeEmail}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '52px',
              padding: '0 1.5rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              fontSize: '0.925rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {activeEmail}
          </a>
        </div>

        {/* Trust Badges */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span>Direct Founder Access</span>
          <span>·</span>
          <span>No Generic Jargon</span>
          <span>·</span>
          <span>Proof Over Claims</span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 480px) {
          :global(.interactive-cta-btns > *) {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
