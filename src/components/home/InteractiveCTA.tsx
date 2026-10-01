'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useCmsContent } from '@/lib/cms/content-context';

const DEFAULT_TRAIL_IMAGES = [
  '/images/case-studies/raysons/casting-hero.jpg',
  '/images/case-studies/loom/loom-hero.jpg',
  '/images/case-studies/picturetime/picturetime-hero.jpg',
  '/images/case-studies/she/she-hero.jpg',
  '/images/case-studies/misu/misu-hero.jpg',
  '/images/case-studies/rrskins/rrskins-hero.jpg',
  '/images/tourin/tourin-hero.jpg',
];

export default function InteractiveCTA() {
  const { content } = useCmsContent();
  const ctaCms = content?.home?.cta;
  const isSectionEnabled = ctaCms?.visible !== false && ctaCms?.enabled !== false;
  const activeEyebrow = ctaCms?.eyebrow || 'START A CONVERSATION';
  const activeHeadline = ctaCms?.headline || "If you're building something serious, let's talk about what it actually needs.";
  const activeDesc = ctaCms?.description || "Let's start with what you're trying to solve or build, not a cookie-cutter agency proposal.";
  const activeButtonLabel = ctaCms?.buttonLabel || 'Start a conversation';
  const activeButtonLink = ctaCms?.buttonLink || '/contact';
  const activeEmail = ctaCms?.email || 'founder@byarohana.com';

  const showEyebrow = ctaCms?.eyebrowEnabled !== false && ctaCms?.showEyebrow !== false && Boolean(activeEyebrow);
  const showHeadline = ctaCms?.headlineEnabled !== false && ctaCms?.showHeadline !== false;
  const showDesc = ctaCms?.descriptionEnabled !== false && ctaCms?.showDescription !== false;
  const showButton = ctaCms?.buttonEnabled !== false && ctaCms?.showButton !== false;
  const showEmail = ctaCms?.emailEnabled !== false && ctaCms?.showEmail !== false;

  const isHoverEnabled = ctaCms?.hoverImagesEnabled !== false && ctaCms?.hoverEffectEnabled !== false;

  // Extract active trail images from CMS (supports objects with .image or plain string URLs)
  const activeTrailImages: string[] = React.useMemo(() => {
    const rawList = ctaCms?.hoverImages || ctaCms?.trailImages;
    if (Array.isArray(rawList) && rawList.length > 0) {
      const filtered = rawList
        .filter((item: any) => {
          if (typeof item === 'string') return item.trim() !== '';
          return item && item.enabled !== false && item.image && item.image.trim() !== '';
        })
        .map((item: any) => (typeof item === 'string' ? item : item.image));
      if (filtered.length > 0) return filtered;
    }
    return DEFAULT_TRAIL_IMAGES;
  }, [ctaCms?.hoverImages, ctaCms?.trailImages]);

  const trailImagesRef = useRef<string[]>(activeTrailImages);
  useEffect(() => {
    trailImagesRef.current = activeTrailImages;
  }, [activeTrailImages]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const visualWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHoverEnabled) return;
    const section = sectionRef.current;
    const visualWrap = visualWrapRef.current;
    if (!section || !visualWrap) return;
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return;

    let imageIndex = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const list = trailImagesRef.current;
      if (!list || list.length === 0) return;

      const rect = section.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      // Trigger clone only when moved at least 85px
      const dist = Math.hypot(currentX - lastX, currentY - lastY);
      if (dist > 85) {
        lastX = currentX;
        lastY = currentY;

        const imgSrc = list[imageIndex % list.length];
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
  }, [isHoverEnabled]);

  if (!isSectionEnabled) return null;

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

        {showEyebrow && (
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
        )}

        {showHeadline && activeHeadline && (
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
        )}

        {showDesc && activeDesc && (
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
        )}

        {(showButton || showEmail) && (
          <div className="interactive-cta-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '520px' }}>
            {showButton && (
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
            )}

            {showEmail && (
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
            )}
          </div>
        )}

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
