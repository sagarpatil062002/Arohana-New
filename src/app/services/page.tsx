'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pillPos = useRef({ x: 0, y: 0 });
  const [pillLabel, setPillLabel] = useState('EXPLORE PILLAR');

  const pillars = [
    {
      id: 'digital',
      num: '01',
      title: 'Digital Brand Growth',
      tagline: 'Brand strategy, content, social media, creative direction, video production, advertising and websites for businesses that need a stronger market presence.',
      desc: 'For businesses that need a stronger brand presence, better communication and consistent execution — not just a schedule of posts.',
      image: '/images/services/digital-growth.jpg',
      capabilities: [
        'Brand strategy and positioning',
        'Strategic communication',
        'Content strategy and monthly calendars',
        'Social media management',
        'Creative direction',
        'Copywriting and scripting',
        'Graphic design',
        'Photography and videography',
        'Video production and editing',
        'Campaign development',
        'Meta advertising',
        'Google advertising',
        'SEO',
        'Website strategy/design',
        'Lead generation',
      ],
      note: 'Performance marketing, SEO, websites and lead generation are capabilities, not implied to be included in every social-media retainer.',
    },
    {
      id: 'hospitality',
      num: '02',
      title: 'Hospitality Consulting',
      tagline: 'Menu creation, operational systems, staff training, revenue optimisation and digital marketing — built from actual hospitality experience.',
      desc: 'This is where Ārohana is different from a conventional marketing agency. Hospitality consulting comes from actual industry experience as well as consulting work.',
      image: '/images/services/hospitality-consulting.jpg',
      capabilities: [
        'Restaurant / café concept development',
        'Menu creation and menu engineering',
        'Recipe and product development',
        'Pricing and food-cost control',
        'Kitchen and operational systems',
        'SOPs',
        'Staff training',
        'Service systems',
        'Revenue optimisation',
        'Social-media and digital marketing',
        'Zomato / Swiggy management where required',
        'OTA consulting and digital distribution',
        'Operational setup and handover',
      ],
      relevantExperience: 'Misu, Spice Goa, Khana Khazana, Khau Gali, Resort Blu and Holiday Village, among other hospitality projects.',
    },
    {
      id: 'content',
      num: '03',
      title: 'Content & Brand Production',
      tagline: 'Corporate films, documentaries, campaigns and institutional content — from scripting through post-production.',
      desc: 'When the story needs to be bigger than a post, Ārohana can take the idea through scripting, production and post-production.',
      image: '/images/services/content-production.jpg',
      capabilities: [
        'Corporate films',
        'Brand films',
        'Documentaries',
        'Institutional films',
        'Campaign films',
        'Promotional films and reels',
        'Scripting',
        'Voice-over',
        'Shoot direction',
        'Editing',
        'Sound and post-production',
      ],
      proof: 'SHE documentary/content, Western Command Investiture Ceremony, Indian Army project videos, PictureTime festival/on-ground content, Raysons industrial/casting film.',
    },
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
        '.services-title-masked',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.services-header-anim',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out', delay: 0.2 }
      );

      // Pillars 3D perspective card reveal & scroll scrub (matching home page)
      const cards = gsap.utils.toArray<HTMLElement>('.service-pillar-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: '20vh',
            rotateX: 28,
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
              end: 'top 55%',
              scrub: 0.8,
            },
          }
        );
      });

      // Engagement and CTA reveal
      gsap.fromTo(
        '.services-secondary-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-secondary-row',
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
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
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
          top: '5%',
          right: '-5%',
          width: '500px',
          height: '500px',
          backgroundColor: 'rgba(222, 50, 45, 0.04)',
          borderRadius: '50%',
          filter: 'blur(140px)',
          pointerEvents: 'none',
        }}
      />

      <div className="padding-global container-large" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ maxWidth: '1080px', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div
            className="services-header-anim tag-mono"
            style={{
              color: '#DE322D',
              marginBottom: '1rem',
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
                backgroundColor: '#DE322D',
                boxShadow: '0 0 8px #DE322D',
              }}
            />
            [ 01 ] Capabilities & How We Work
          </div>

          <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <h1
              className="services-title-masked"
              style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
                fontWeight: 400,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#111111',
              }}
            >
              What we do depends on what the business actually needs.
            </h1>
          </div>

          <p
            className="services-header-anim"
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#555555',
              lineHeight: 1.5,
              maxWidth: '840px',
            }}
          >
            Ārohana can come in as an ongoing digital partner, a hospitality consultant, a content/production partner or a combination of these.
          </p>
        </div>

        {/* The 3 Core Pillars with 3D Perspective */}
        <div
          style={{
            perspective: '1200px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(3rem, 6vw, 6rem)',
            marginBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              id={pillar.id}
              className="service-pillar-card"
              onMouseEnter={() => handlePillEnter(`EXPLORE ${pillar.title.toUpperCase()}`)}
              onMouseLeave={handlePillLeave}
              style={{
                borderRadius: 'clamp(20px, 4vw, 32px)',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
                padding: 'clamp(1.5rem, 3.5vw, 4rem)',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: 'clamp(2rem, 4vw, 5rem)',
                  alignItems: 'center',
                }}
              >
                {/* Left Text */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#ff3b30',
                      }}
                    >
                      {pillar.num}
                    </span>
                    <span className="tag-mono" style={{ color: '#888', fontWeight: 600 }}>
                      PRACTICE PILLAR
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                      fontWeight: 500,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      color: '#111',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {pillar.title}
                  </h2>

                  <div
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: '#444',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {pillar.tagline}
                  </div>

                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#666',
                      lineHeight: 1.6,
                      marginBottom: '2rem',
                    }}
                  >
                    {pillar.desc}
                  </p>

                  <div style={{ marginBottom: '2.5rem' }}>
                    <div
                      className="tag-mono"
                      style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem', fontWeight: 600 }}
                    >
                      SPECIFIC DELIVERABLES
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                        gap: '0.75rem',
                      }}
                    >
                      {pillar.capabilities.map((cap) => (
                        <div
                          key={cap}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            backgroundColor: '#fafafa',
                            border: '1px solid rgba(0, 0, 0, 0.04)',
                            transition: 'background-color 0.2s ease',
                          }}
                        >
                          <CheckCircle2 size={16} color="#28cd41" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.85rem', color: '#333' }}>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {pillar.note && (
                    <div
                      style={{
                        paddingTop: '1.25rem',
                        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                        fontSize: '0.85rem',
                        color: '#666',
                        fontStyle: 'italic',
                      }}
                    >
                      <strong style={{ color: '#111', fontStyle: 'normal' }}>Note: </strong>
                      {pillar.note}
                    </div>
                  )}

                  {pillar.relevantExperience && (
                    <div
                      style={{
                        paddingTop: '1.25rem',
                        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                        fontSize: '0.85rem',
                        color: '#666',
                      }}
                    >
                      <strong style={{ color: '#111' }}>Relevant Experience: </strong>
                      {pillar.relevantExperience}
                    </div>
                  )}

                  {pillar.proof && (
                    <div
                      style={{
                        paddingTop: '1.25rem',
                        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                        fontSize: '0.85rem',
                        color: '#666',
                      }}
                    >
                      <strong style={{ color: '#111' }}>Proof: </strong>
                      {pillar.proof}
                    </div>
                  )}
                </div>

                {/* Right Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4/3',
                    borderRadius: 'clamp(16px, 3vw, 24px)',
                    overflow: 'hidden',
                    backgroundColor: '#e6e6e4',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Model & How Engagements Work Section */}
        <div
          className="services-secondary-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            marginBottom: 'clamp(4rem, 7vw, 6rem)',
          }}
        >
          <div
            className="services-secondary-card"
            onMouseEnter={() => handlePillEnter('ENGAGEMENT MODELS')}
            onMouseLeave={handlePillLeave}
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
            }}
          >
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '0.75rem', fontWeight: 600 }}>
              ENGAGEMENT MODELS
            </div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              How engagements can work.
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>
              <div>
                <strong style={{ color: '#111', display: 'block', fontSize: '1rem', marginBottom: '0.2rem' }}>
                  Ongoing digital partnership
                </strong>
                <span style={{ color: '#666' }}>Best for: Brands needing continuous strategy, content, creative and platform management</span>
              </div>
              <div>
                <strong style={{ color: '#111', display: 'block', fontSize: '1rem', marginBottom: '0.2rem' }}>
                  Hospitality consulting
                </strong>
                <span style={{ color: '#666' }}>Best for: Restaurants, cafés, resorts and hospitality businesses needing operational or commercial intervention</span>
              </div>
              <div>
                <strong style={{ color: '#111', display: 'block', fontSize: '1rem', marginBottom: '0.2rem' }}>
                  Project production
                </strong>
                <span style={{ color: '#666' }}>Best for: Films, documentaries, launches, campaigns, exhibitions or other defined projects</span>
              </div>
              <div>
                <strong style={{ color: '#111', display: 'block', fontSize: '1rem', marginBottom: '0.2rem' }}>
                  Hybrid engagement
                </strong>
                <span style={{ color: '#666' }}>Best for: Businesses where business consulting and digital communication need to move together</span>
              </div>
            </div>
          </div>

          <div
            className="services-secondary-card"
            onMouseEnter={() => handlePillEnter('SPECIALIST TEAMS')}
            onMouseLeave={handlePillLeave}
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              backgroundColor: '#0c0c0e',
              color: '#ffffff',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '200px',
                height: '200px',
                backgroundColor: 'rgba(222, 50, 45, 0.12)',
                borderRadius: '50%',
                filter: 'blur(70px)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={14} />
                TEAM STRUCTURE
              </div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 500, marginBottom: '1.25rem' }}>
                A note on team structure.
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Ārohana does not need to sell a fixed team chart on the website. The client should understand that the right specialists are assembled around the brief — strategy, design, editing, photography, videography, performance or hospitality specialists as required.
              </p>
              <div className="tag-mono" style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                CURATED AROUND THE CHALLENGE • BESPOKE TEAMS
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1.25rem, 4vw, 4rem)',
            borderRadius: 'clamp(20px, 4vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 500, color: '#111' }}>
              Don't start with a service. Start with the problem.
            </h3>
            <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1.05rem' }}>
              Tell us what you are trying to build, fix or change.
            </p>
          </div>

          <Link href="/contact" className="button-editorial button-editorial-dark" style={{ height: '48px', padding: '0 1.75rem' }}>
            <div className="button-texts-slider">
              <span className="button-text-item">Start a conversation</span>
              <span className="button-text-item">Start a conversation</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
