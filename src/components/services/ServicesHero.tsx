'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { SERVICES_HERO } from '@/data/services-content';

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-hero-eyebrow, .svc-hero-principle',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.1 }
      );

      gsap.fromTo(
        '.svc-hero-line-inner',
        { yPercent: 112 },
        { yPercent: 0, duration: 1.15, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );

      gsap.fromTo(
        '.svc-hero-intro, .svc-hero-scroll',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out', delay: 0.4 }
      );

      gsap.fromTo(
        '.svc-hero-figure',
        { y: 46, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.16, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.svc-hero-comp-panel',
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.75, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.svc-hero-captionbar',
        { opacity: 0 },
        { opacity: 1, duration: 0.9, delay: 0.9, ease: 'power2.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="svc-hero">
      <div className="padding-global container-large">
        <div className="svc-hero-grid">
          {/* Left — editorial statement */}
          <div className="svc-hero-left">
            <div className="svc-eyebrow svc-eyebrow--red svc-hero-eyebrow">
              <span className="svc-eyebrow-dot" />
              {SERVICES_HERO.eyebrow}
            </div>

            <p className="svc-hero-principle svc-hero-eyebrow">
              {SERVICES_HERO.principle}
            </p>

            <h1 className="svc-hero-headline">
              <span className="svc-hero-line">
                <span className="svc-hero-line-inner">{SERVICES_HERO.headlineLineOne}</span>
              </span>
              <span className="svc-hero-line">
                <span className="svc-hero-line-inner">
                  {SERVICES_HERO.headlineLineTwo}{' '}
                  <span className="svc-hero-headline-red">.</span>
                </span>
              </span>
            </h1>

            <p className="svc-hero-intro">{SERVICES_HERO.intro}</p>

            <div className="svc-hero-scroll">
              <span className="svc-hero-scroll-line" aria-hidden="true" />
              <span className="svc-hero-scroll-label">
                <i aria-hidden="true" />
                Scroll
              </span>
            </div>
          </div>

          {/* Right — layered cinematic plate */}
          <div className="svc-hero-right">
            <div className="svc-hero-comp">
              <div className="svc-hero-comp-panel" />

              <div className="svc-hero-figure svc-hero-figure-large">
                <Image
                  src="/images/home/hero-dusk-mountain.png"
                  alt="Arohana field work against a high-altitude mountain landscape at dusk"
                  fill
                  priority
                  sizes="(max-width: 767px) 82vw, 40vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>

              <div className="svc-hero-figure svc-hero-figure-small">
                <Image
                  src="/images/army/14corps-2.jpg"
                  alt="High-altitude peaks in Ladakh"
                  fill
                  sizes="(max-width: 767px) 48vw, 20vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>

              <div className="svc-hero-captionbar">
                <span className="svc-hero-caption-field">
                  <i aria-hidden="true" />
                  Ladakh · Field · Documentary · Production
                </span>
                <span className="svc-hero-caption-note">
                  <i aria-hidden="true" />
                  14,000 ft — people, places, purpose
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}