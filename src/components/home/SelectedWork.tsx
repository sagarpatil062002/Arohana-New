'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hoverWrapRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking with lerp for the floating cursor pill
  const mousePos = useRef({ x: -100, y: -100 });
  const pillPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  const projects = [
    {
      id: 'raysons',
      title: 'Raysons Group',
      image: '/images/case-studies/raysons/casting-hero.jpg',
      link: '/work/raysons-group',
    },
    {
      id: 'loom-crafts',
      title: 'Loom Crafts',
      image: '/images/case-studies/loom/loom-hero.jpg',
      link: '/work/loom-crafts',
    },
    {
      id: 'picturetime',
      title: 'PictureTime',
      image: '/images/case-studies/picturetime/picturetime-hero.jpg',
      link: '/work/picturetime',
    },
    {
      id: 'she',
      title: 'The SHE Project',
      image: '/images/case-studies/she/she-hero.jpg',
      link: '/work/she',
    },
    {
      id: 'misu',
      title: 'Misu Pan-Asian',
      image: '/images/case-studies/misu/misu-hero.jpg',
      link: '/work/misu',
    },
    {
      id: 'rr-skins',
      title: 'RR Skins Clinic',
      image: '/images/case-studies/rrskins/rrskins-hero.jpg',
      link: '/work/rr-skins',
    },
  ];

  // Mouse movement tracking with lerp loop (Alture Action a-34)
  useEffect(() => {
    const pill = hoverPillRef.current;
    if (!pill) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const loop = () => {
      // 0.18 lerp factor for smooth cursor tracking
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

  // Exact 3D Perspective Scroll Animation (Alture Action a-31)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray<HTMLElement>('.work-list_item');
    if (!items || items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const link = item.querySelector('.work-list_link');
        if (!link) return;

        // Continuous scroll-driven 3D animation timeline matching Webflow action a-31
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 100%',
            end: 'bottom 0%',
            scrub: 0.8,
          },
        });

        // Keyframe 0% -> 50%: Enters from bottom tilted in 3D perspective (rotateX: 65deg, y: 35vh, scale: 1.1)
        // Straightens upright to rotateX: 0deg, y: 0vh, scale: 1.0 when centered in viewport
        tl.fromTo(
          link,
          {
            y: '35vh',
            rotateX: 65,
            scale: 1.1,
            transformOrigin: '50% 100%',
          },
          {
            y: '0vh',
            rotateX: 0,
            scale: 1.0,
            ease: 'power1.out',
            duration: 1,
          }
        );

        // Keyframe 50% -> 100%: Leaves toward top of screen, tilts slightly back and scales down to 0.90
        tl.to(link, {
          y: '-15vh',
          rotateX: -15,
          scale: 0.9,
          ease: 'power1.in',
          duration: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseEnter = () => {
    isHovering.current = true;
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  const handleCardMouseLeave = () => {
    isHovering.current = false;
    if (hoverPillRef.current) {
      gsap.to(hoverPillRef.current, {
        opacity: 0,
        scale: 0.75,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section_work-list"
      style={{
        position: 'relative',
        backgroundColor: '#f5f5f3',
        paddingTop: '6rem',
        paddingBottom: '10rem',
        overflow: 'clip',
      }}
    >
      {/* ALTURE FLOATING HOVER PILL (.hover_wrap / .hover_pill) */}
      <div
        ref={hoverWrapRef}
        className="hover_wrap"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <div
          ref={hoverPillRef}
          className="hover_pill"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translate(-50%, -50%) scale(0.75)',
            opacity: 0,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            borderRadius: '4rem',
            padding: '0.75rem 1.25rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
            willChange: 'transform, opacity',
          }}
        >
          <span>View work</span>
        </div>
      </div>

      <div className="padding-global container-medium" style={{ width: '100%', maxWidth: '80rem', margin: '0 auto', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
        {/* ALTURE EXACT HEADER (.work-list_head) */}
        <div
          className="work-list_head"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 0.5fr',
            placeItems: 'end start',
            columnGap: '1.5rem',
            rowGap: '1.5rem',
            width: '100%',
            marginBottom: '6rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Left: Heading wrap with absolute counter circle */}
          <div className="work-list_heading-wrap" style={{ position: 'relative' }}>
            <h2
              className="heading-style-display"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem, 7.5vw, 7.2rem)',
                fontWeight: 400,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#111111',
                margin: 0,
              }}
            >
              Selected<br />Work.
            </h2>
            <div
              className="work-list_number"
              style={{
                color: '#ffffff',
                backgroundColor: '#f3350c',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '22px',
                height: '22px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                position: 'absolute',
                top: '0.2rem',
                left: 'calc(100% + 0.5rem)',
              }}
            >
              6
            </div>
          </div>

          {/* Center: Projects description */}
          <div
            className="work-list_head-texts"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '22rem',
            }}
          >
            <h3
              className="text-style-label"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#111111',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Projects
            </h3>
            <p
              style={{
                color: '#666666',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              A curated selection of businesses and projects showing how Ārohana thinks, creates and executes across commercial and physical operating environments.
            </p>
          </div>

          {/* Right: Editorial Copyright */}
          <div style={{ textAlign: 'right', width: '100%' }}>
            <h2
              className="heading-style-display"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem, 7.5vw, 7.2rem)',
                fontWeight: 400,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#111111',
                margin: 0,
              }}
            >
              ©26
            </h2>
          </div>
        </div>

        {/* ALTURE CONTINUOUS 3D PERSPECTIVE LIST (.work-list_list) */}
        <div
          className="work-list_list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8rem',
            width: '100%',
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="work-list_item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                className="work-list_block"
                style={{
                  perspective: '100vw',
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Link
                  href={project.link}
                  className="work-list_link"
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 9',
                    height: '50vh',
                    width: 'auto',
                    maxWidth: '100%',
                    borderRadius: '2rem',
                    overflow: 'clip',
                    backgroundColor: '#0c0c0e',
                    display: 'block',
                    textDecoration: 'none',
                    boxShadow: '0 24px 70px rgba(0, 0, 0, 0.16)',
                    willChange: 'transform',
                  }}
                >
                  {/* High Quality Project Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={idx <= 1}
                    sizes="(max-width: 991px) 95vw, 50vh"
                    className="work-list_img"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />

                  {/* Alture Exact Bottom-Left Name Pill (.work-list_name) */}
                  <div
                    className="work-list_name"
                    style={{
                      position: 'absolute',
                      bottom: '1.5rem',
                      left: '1.5rem',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      borderRadius: '9rem',
                      padding: '0.35rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    <div
                      className="work-list_dot"
                      style={{
                        backgroundColor: '#f3350c',
                        borderRadius: '50%',
                        width: '0.25rem',
                        height: '0.25rem',
                        flexShrink: 0,
                      }}
                    />
                    <h3
                      className="work-list_title"
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: '120%',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        color: '#000000',
                        margin: 0,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to All Work */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '7rem',
          }}
        >
          <Link
            href="/work"
            className="button-editorial button-editorial-dark"
            style={{ height: '50px', padding: '0 2.25rem' }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item">Explore all 06 case studies</span>
              <span className="button-text-item">Explore all 06 case studies</span>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media screen and (max-width: 991px) {
          .work-list_head {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .work-list_head > div:last-child {
            text-align: left !important;
          }
          .work-list_list {
            gap: 5rem !important;
          }
          .work-list_link {
            height: auto !important;
            width: 100% !important;
            max-width: 600px !important;
          }
          .hover_wrap {
            display: none !important;
          }
        }
        @media screen and (max-width: 767px) {
          .work-list_list {
            gap: 3.5rem !important;
          }
          .work-list_name {
            bottom: 1rem !important;
            left: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
