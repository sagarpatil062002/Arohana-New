'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PointOfView() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Tag line — slides up
      if (tagRef.current) {
        gsap.fromTo(
          tagRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: tagRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // Heading — masked slide up with slight delay
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            delay: 0.08,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // Body paragraphs — fade + slide up
      if (bodyRef.current) {
        const paras = bodyRef.current.querySelectorAll('p');
        gsap.fromTo(
          paras,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.14,
            delay: 0.15,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // Buttons — subtle fade in
      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.3,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: buttonsRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }

      // Image — slight scale reveal + clip from bottom
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );

        // Subtle parallax on image while scrolling
        const imgEl = rightRef.current.querySelector('img');
        if (imgEl) {
          gsap.to(imgEl, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-light"
      style={{
        paddingTop: 'clamp(5rem, 8vw, 9rem)',
        paddingBottom: 'clamp(5rem, 8vw, 9rem)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f5f5f3',
      }}
    >
      <div className="padding-global container-large">

        {/* Strict 50/50 split on desktop */}
        <div className="pov-grid">

          {/* LEFT — Text content */}
          <div ref={leftRef} className="pov-left">

            {/* Tag */}
            <div
              ref={tagRef}
              className="tag-mono"
              style={{
                color: '#DE322D',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.76rem',
                letterSpacing: '0.08em',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                opacity: 0, // starts hidden
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#DE322D',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              04 · POSITIONING &amp; PHILOSOPHY
            </div>

            {/* Heading — uses overflow:hidden + yPercent for mask effect */}
            <div
              style={{
                overflow: 'hidden',
                marginBottom: '1.75rem',
              }}
            >
              <h2
                ref={headingRef}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                  lineHeight: 1.08,
                  fontWeight: 500,
                  letterSpacing: '-0.035em',
                  color: '#111111',
                  margin: 0,
                  opacity: 0, // starts hidden
                }}
              >
                Some businesses need better marketing. Others need a better way of thinking about the business itself.
              </h2>
            </div>

            {/* Body Copy */}
            <div
              ref={bodyRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                marginBottom: '2.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                  color: '#111111',
                  fontWeight: 500,
                  lineHeight: 1.7,
                  margin: 0,
                  opacity: 0, // starts hidden
                }}
              >
                Ārohana works with businesses where communication cannot be separated from the business itself. We combine commercial thinking, sector experience and creative execution to help brands become clearer, more credible and more relevant to the people they need to reach.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                  color: '#555555',
                  lineHeight: 1.7,
                  margin: 0,
                  opacity: 0, // starts hidden
                }}
              >
                Depending on the brief, that can mean building a digital brand, running an ongoing social ecosystem, creating a film, fixing a restaurant&apos;s menu and operating systems, or taking a project from an idea to on-ground execution.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="pov-buttons-wrap"
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                opacity: 0, // starts hidden
              }}
            >
              <Link
                href="/about"
                className="button-editorial button-editorial-dark"
                style={{ height: '46px', padding: '0 1.5rem' }}
              >
                <div className="button-texts-slider">
                  <span className="button-text-item">Read Founder Story &amp; Philosophy</span>
                  <span className="button-text-item">Read Founder Story &amp; Philosophy</span>
                </div>
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/services"
                className="button-editorial"
                style={{ height: '46px', padding: '0 1.5rem', backgroundColor: '#e8e8e6', color: '#111' }}
              >
                <div className="button-texts-slider">
                  <span className="button-text-item">Explore Three Practice Areas</span>
                  <span className="button-text-item">Explore Three Practice Areas</span>
                </div>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* RIGHT — Portrait image */}
          <div
            ref={rightRef}
            className="pov-right"
            style={{ opacity: 0 }} // starts hidden
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.14)',
                width: '100%',
              }}
            >
              <Image
                src="/images/home/madhura-editorial.jpg"
                alt="Madhura Hawal on-ground directing a project in Ladakh"
                fill
                style={{ objectFit: 'cover', transformOrigin: 'center center' }}
                sizes="(max-width: 900px) 90vw, 45vw"
                priority
              />
              {/* Caption overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem 1.75rem 1.75rem',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.82) 100%)',
                  color: '#ffffff',
                }}
              >
                <div
                  className="tag-mono"
                  style={{
                    fontSize: '0.68rem',
                    color: '#ff4d4f',
                    fontWeight: 600,
                    marginBottom: '0.3rem',
                    letterSpacing: '0.14em',
                  }}
                >
                  MADHURA HAWAL · FOUNDER
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.88)',
                    lineHeight: 1.5,
                  }}
                >
                  Madhura Hawal on-ground directing projects across Ladakh and regional commercial hubs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 480px) {
          :global(.pov-buttons-wrap > a) {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
