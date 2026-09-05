'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TourinPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pillPos = useRef({ x: 0, y: 0 });
  const [pillLabel, setPillLabel] = useState('EXPLORE TOURIN');

  const journeys = [
    {
      title: 'The Slow Ladakh Odyssey',
      duration: '8 Days / 7 Nights',
      type: 'Cultural Immersion & Slow Exploration',
      desc: 'Leh, Sham Valley, Thiksey, and hidden Indus villages. Staying at heritage homestays, eating local cuisine, and walking ancient paths without rushing.',
      image: '/images/tourin/tourin-gallery-1.jpg',
    },
    {
      title: 'Nubra Valley & The Silk Route',
      duration: '7 Days / 6 Nights',
      type: 'High Passes, Deserts & Monasteries',
      desc: 'Crossing Khardung La into the dramatic dune valleys of Hunder and Diskit, spending time with local artisans, and discovering village monasteries.',
      image: '/images/tourin/tourin-gallery-2.jpg',
    },
    {
      title: 'Changthang High Lakes & Nomads',
      duration: '9 Days / 8 Nights',
      type: 'Wild Plateaus & High-Altitude Waters',
      desc: 'Expedition across Pangong Tso, Tso Moriri, and the Changpa nomadic settlements. Experience raw silence and vast Himalayan skies.',
      image: '/images/tourin/tourin-gallery-3.jpg',
    },
  ];

  const galleryImages = [
    '/images/tourin/tourin-hero.jpg',
    '/images/tourin/tourin-1.jpg',
    '/images/tourin/tourin-2.jpg',
    '/images/tourin/tourin-3.jpg',
    '/images/tourin/tourin-gallery-4.jpg',
    '/images/tourin/tourin-gallery-5.jpg',
  ];

  // Mouse Follower Loop (matching home page)
  useEffect(() => {
    const pill = hoverPillRef.current;
    if (!pill) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const loop = () => {
      pillPos.current.x += (mousePos.current.x - pillPos.current.x) * 0.18;
      pillPos.current.y += (mousePos.current.y - pillPos.current.y) * 0.18;

      if (pill) {
        gsap.set(pill, {
          x: pillPos.current.x,
          y: pillPos.current.y,
        });
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handlePillEnter = (label: string) => {
    setPillLabel(label);
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  const handlePillLeave = () => {
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header masked slide entrance
      gsap.fromTo(
        '.tourin-title-masked',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );

      // Hero entrance
      gsap.fromTo(
        '.tourin-hero-fade',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );

      // Parallax zoom on hero image
      gsap.fromTo(
        '.tourin-hero-img-wrap',
        { scale: 0.96, opacity: 0.8 },
        {
          scale: 1.0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.tourin-hero-img-wrap',
            start: 'top 90%',
          },
        }
      );

      // Curated journey cards 3D perspective reveal (matching home page)
      const journeyCards = gsap.utils.toArray<HTMLElement>('.tourin-journey-card');
      journeyCards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: '18vh',
            rotateX: 25,
            scale: 1.04,
            transformOrigin: '50% 100%',
          },
          {
            y: '0vh',
            rotateX: 0,
            scale: 1.0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 60%',
              scrub: 0.8,
            },
          }
        );
      });

      // Gallery photos reveal
      gsap.fromTo(
        '.tourin-gallery-item',
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.tourin-gallery-grid',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="section-light"
      style={{
        position: 'relative',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        overflow: 'hidden',
      }}
    >
      {/* Interactive Cursor Follower Pill (Matching Home Page) */}
      <div
        ref={hoverPillRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          borderRadius: '9999px',
          backgroundColor: '#DE322D',
          color: '#ffffff',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(222, 50, 45, 0.45)',
          whiteSpace: 'nowrap',
        }}
      >
        <span>{pillLabel}</span>
        <ArrowUpRight size={13} />
      </div>

      {/* Ambient background glow blob */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          right: '-5%',
          width: '500px',
          height: '500px',
          backgroundColor: 'rgba(222, 50, 45, 0.05)',
          borderRadius: '50%',
          filter: 'blur(140px)',
          pointerEvents: 'none',
        }}
      />

      <div className="padding-global container-large" style={{ position: 'relative', zIndex: 1 }}>
        {/* Back Link */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: '#666',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> BACK TO HOME
          </Link>
        </div>

        {/* Hero Section */}
        <div style={{ maxWidth: '1080px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div
            className="tourin-hero-fade tag-mono"
            style={{
              color: '#DE322D',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Compass size={16} />
            OWNED EXPERIENTIAL TRAVEL BRAND
          </div>

          <div style={{ overflow: 'hidden', marginBottom: '1.75rem' }}>
            <h1
              className="tourin-title-masked"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6.2rem)',
                lineHeight: 1.05,
                fontWeight: 400,
                letterSpacing: '-0.04em',
                color: '#111111',
              }}
            >
              Travel beyond the itinerary.
            </h1>
          </div>

          <p
            className="tourin-hero-fade"
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
              color: '#444444',
              lineHeight: 1.5,
              maxWidth: '860px',
            }}
          >
            Some places are better experienced when you stop trying to see everything. Tourin creates experiential journeys for travellers who want more than a checklist of sights — beginning with Ladakh.
          </p>
        </div>

        {/* Hero Image */}
        <div className="tourin-hero-fade tourin-hero-img-wrap" style={{ marginBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
          <div
            onMouseEnter={() => handlePillEnter('EXPEDITION LADAKH')}
            onMouseLeave={handlePillLeave}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 'clamp(20px, 3.5vw, 40px)',
              overflow: 'hidden',
              backgroundColor: '#0c0c0e',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.12)',
            }}
          >
            <Image
              src="/images/tourin/tourin-hero.jpg"
              alt="Tourin Experiential Ladakh"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.85rem',
              color: '#666',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Lived moments, high mountain passes and authentic cultural roots across Ladakh.
          </p>
        </div>

        {/* Section 1: Why Tourin & What We Believe */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            marginBottom: 'clamp(3.5rem, 6vw, 5.5rem)',
          }}
        >
          <div
            onMouseEnter={() => handlePillEnter('WHY TOURIN')}
            onMouseLeave={handlePillLeave}
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.35s ease, border-color 0.35s ease',
            }}
          >
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
              01 • THE GENESIS
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              Why Tourin.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
              <p>
                Tourin came from a simple realisation: the Ladakh people experience and the Ladakh most itineraries sell are not always the same.
              </p>
              <p>
                There is the Ladakh of famous passes, lakes and photographs. And then there is the place behind them — its people, food, stories, homes, landscapes, silences and everyday life.
              </p>
              <p>
                Tourin was created to make space for the second one.
              </p>
              <p>
                Not by avoiding the places people want to see, but by changing the way the journey is experienced.
              </p>
            </div>
          </div>

          <div
            onMouseEnter={() => handlePillEnter('OUR BELIEF')}
            onMouseLeave={handlePillLeave}
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.35s ease, border-color 0.35s ease',
            }}
          >
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
              02 • OUR PHILOSOPHY
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              What we believe.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
              <p>
                A good trip should leave you with more than photographs. It should give you a sense of where you were.
              </p>
              <p>
                That can mean eating something you have never tried, spending time with a local family, understanding a tradition, staying somewhere connected to its surroundings, taking a slower route, or simply having enough time to notice the place instead of rushing through it.
              </p>
              <p>
                We are interested in travel that feels personal, considered and rooted — not travel that is simply packed with more stops.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Why Ladakh & Who Is Tourin For */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            marginBottom: 'clamp(3.5rem, 6vw, 5.5rem)',
          }}
        >
          <div
            onMouseEnter={() => handlePillEnter('WHY LADAKH')}
            onMouseLeave={handlePillLeave}
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
              03 • THE DESTINATION
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              Why Ladakh.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
              <p>
                Ladakh is where Tourin begins because it is a place we know closely enough to design experiences around more than the obvious itinerary.
              </p>
              <p>
                The first journeys are built around exploration, culture, landscapes and meaningful encounters — with enough structure to make the trip comfortable and enough space for the unexpected.
              </p>
            </div>
          </div>

          <div
            onMouseEnter={() => handlePillEnter('AUDIENCE')}
            onMouseLeave={handlePillLeave}
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
              04 • AUDIENCE
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              Who is Tourin for?
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Travellers who are curious rather than purely checklist-driven',
                'Explorers who want to understand a destination, not only photograph it',
                'People who value local experiences and thoughtful pacing',
                'Small groups, couples, families or individual travellers looking for a more personal journey',
                'Travellers who want professional planning without feeling like they are being moved through a fixed tourist circuit',
              ].map((bullet) => (
                <li
                  key={bullet}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.95rem',
                    color: '#444',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: '#DE322D', fontWeight: 700, marginTop: '2px' }}>—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: The Experience */}
        <div
          style={{
            padding: 'clamp(1.75rem, 4vw, 3.5rem)',
            borderRadius: 'clamp(20px, 4vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            marginBottom: 'clamp(3.5rem, 6vw, 5.5rem)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '0.75rem', fontWeight: 600 }}>
            05 • JOURNEY PHILOSOPHY
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, marginBottom: '1rem', color: '#111' }}>
            The experience.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.7, maxWidth: '850px', marginBottom: '0.75rem' }}>
            Tourin's journeys can bring together carefully chosen stays, local experiences, food, culture, landscapes and the practical planning that makes travel work.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#666', lineHeight: 1.7, maxWidth: '850px' }}>
            The point is not to add experiences for the sake of adding them. Each element should have a reason to be there.
          </p>
        </div>

        {/* Section 4: Proof That The Idea Works */}
        <div
          style={{
            borderRadius: 'clamp(20px, 4vw, 28px)',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            padding: 'clamp(2rem, 4vw, 4.5rem)',
            marginBottom: 'clamp(3.5rem, 6vw, 5.5rem)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '350px',
              height: '350px',
              backgroundColor: 'rgba(222, 50, 45, 0.12)',
              borderRadius: '50%',
              filter: 'blur(90px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#DE322D', boxShadow: '0 0 8px #DE322D' }} />
              VALIDATED EXECUTION
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <div style={{ maxWidth: '650px' }}>
                <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '1rem' }}>
                  Proof that the idea works.
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Tourin has already completed 15+ separate bookings, ranging from individual travellers and small groups to larger groups, including a 20-biker trip.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6 }}>
                  These are early proof that there is an audience for the kind of travel Tourin is building.
                </p>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                  fontWeight: 700,
                  color: '#DE322D',
                  lineHeight: 0.9,
                  textShadow: '0 0 30px rgba(222, 50, 45, 0.4)',
                }}
              >
                15+
              </div>
            </div>
          </div>
        </div>

        {/* Curated Sample Journeys */}
        <div id="ladakh-experiences" style={{ marginBottom: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
          <div className="tag-mono" style={{ color: '#888', marginBottom: '0.75rem', fontWeight: 600 }}>
            SAMPLE ITINERARIES
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: '#111',
            }}
          >
            Curated Ladakh journeys.
          </h2>

          <div
            className="tourin-journeys-grid"
            style={{
              perspective: '1200px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2rem',
            }}
          >
            {journeys.map((j) => (
              <div
                key={j.title}
                className="tourin-journey-card"
                onMouseEnter={() => handlePillEnter(`VIEW TRIP`)}
                onMouseLeave={handlePillLeave}
                style={{
                  borderRadius: 'clamp(16px, 3vw, 24px)',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <Image
                    src={j.image}
                    alt={j.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {j.duration}
                  </div>
                </div>

                <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="tag-mono" style={{ color: '#DE322D', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                    {j.type}
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', fontWeight: 500, marginBottom: '0.75rem', color: '#111' }}>
                    {j.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>
                    {j.desc}
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#111',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    TALK TO US ABOUT A JOURNEY <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Gallery: 6-9 strong images */}
        <div style={{ marginBottom: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
          <div className="tag-mono" style={{ color: '#888', marginBottom: '0.75rem', fontWeight: 600 }}>
            ON-GROUND VISUALS
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: '#111',
            }}
          >
            Moments, people and landscapes.
          </h2>

          <div
            className="tourin-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="tourin-gallery-item"
                onMouseEnter={() => handlePillEnter('VIEW MOMENT')}
                onMouseLeave={handlePillLeave}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#eee',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                }}
              >
                <Image
                  src={src}
                  alt="Tourin Ladakh on-ground moments"
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: From Ārohana to Tourin & The Next Chapter */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            marginBottom: 'clamp(3.5rem, 6vw, 6rem)',
          }}
        >
          <div
            onMouseEnter={() => handlePillEnter('THE EXTENSION')}
            onMouseLeave={handlePillLeave}
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
              06 • CONNECTED PURPOSE
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              From Ārohana to Tourin.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
              <p>
                Tourin is an extension of the same instinct that sits behind Ārohana: create something with a clear point of view rather than simply offering what everyone else offers.
              </p>
              <p>
                Ārohana builds brands and businesses. Tourin applies that thinking to travel — turning a destination into an experience people can connect with.
              </p>
            </div>
          </div>

          <div
            onMouseEnter={() => handlePillEnter('FUTURE DESTINATIONS')}
            onMouseLeave={handlePillLeave}
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
              07 • HORIZON
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              The next chapter.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
              <p>
                Ladakh is the beginning, not the boundary.
              </p>
              <p>
                As Tourin grows, the intention is to take the same approach to other destinations — places with enough character, culture and story to create journeys worth remembering.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div
          style={{
            padding: 'clamp(2rem, 5vw, 4rem)',
            borderRadius: 'clamp(20px, 4vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 500, color: '#111' }}>
              Come travel differently.
            </h3>
            <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1.1rem' }}>
              Explore our Ladakh journeys.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href="#ladakh-experiences"
              className="button-editorial"
              style={{
                height: '48px',
                padding: '0 1.5rem',
                backgroundColor: '#111111',
                color: '#ffffff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                letterSpacing: '0.06em',
              }}
            >
              <span>VIEW LADAKH EXPERIENCES</span>
              <ArrowUpRight size={15} />
            </a>

            <Link
              href="/contact"
              className="button-editorial"
              style={{
                height: '48px',
                padding: '0 1.5rem',
                backgroundColor: '#DE322D',
                color: '#ffffff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                letterSpacing: '0.06em',
              }}
            >
              <span>TALK TO US ABOUT A JOURNEY</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
