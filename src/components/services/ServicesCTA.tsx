'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SERVICES_CTA_CONTENT } from '@/data/services-content';

export default function ServicesCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-cta-copy',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-cta', start: 'top 75%', once: true } }
      );
      gsap.fromTo(
        '.svc-cta-bg',
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.svc-cta', start: 'top 100%', end: 'bottom 0%', scrub: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="svc-cta">
      <div className="svc-cta-bg">
        <Image
          src="/images/home/hero-mountain-sky.png"
          alt="Mountain landscape at dusk"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </div>
      <div className="svc-cta-overlay" aria-hidden="true" />

      <div className="padding-global container-large">
        <div className="svc-cta-inner">
          <div className="svc-cta-copy svc-eyebrow svc-cta-eyebrow">
            <span className="svc-eyebrow-dot" />
            {SERVICES_CTA_CONTENT.eyebrow}
          </div>
          <h2 className="svc-cta-headline svc-cta-copy">
            {SERVICES_CTA_CONTENT.headlineLineOne}
            <br />
            {SERVICES_CTA_CONTENT.headlineLineTwo}
          </h2>
          <p className="svc-cta-sub svc-cta-copy">{SERVICES_CTA_CONTENT.sub}</p>
          <Link href="/contact" className="svc-cta-btn svc-cta-copy">
            {SERVICES_CTA_CONTENT.cta}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}