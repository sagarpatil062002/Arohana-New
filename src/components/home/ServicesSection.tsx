'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface ServiceItemData {
  num: string;
  title: string;
  tags: string[];
  image: string;
  alt: string;
  description: string;
  href: string;
}

const SERVICES_DATA: ServiceItemData[] = [
  {
    num: '1',
    title: 'Digital Brand Growth',
    tags: ['Brand Systems', 'Positioning', 'Website Architecture', 'Performance Marketing', 'Conversion Strategy'],
    image: '/images/services/digital-growth.jpg',
    alt: 'Digital brand systems and architecture showcase',
    description:
      'Architecting end-to-end digital infrastructure — brand positioning, visual identity, customer acquisition, content velocity, and revenue pipelines designed for market authority.',
    href: '/services#digital',
  },
  {
    num: '2',
    title: 'Hospitality Consulting',
    tags: ['Concept & Narrative', 'Menu Architecture', 'Service Journey', 'Repeat Strategy', 'Unit Economics'],
    image: '/images/services/hospitality-consulting.jpg',
    alt: 'Hospitality dining and experiential space design',
    description:
      'Transformative advisory for luxury hospitality, boutique resorts, and experiential dining — aligning operational rhythm, menu engineering, and staff culture with emotional narrative.',
    href: '/services#hospitality',
  },
  {
    num: '3',
    title: 'Content & Brand Production',
    tags: ['Film Direction', 'Architectural Stills', 'Documentary Narratives', 'Post-Production', 'Asset Libraries'],
    image: '/images/services/content-production.jpg',
    alt: 'Cinematic brand production and editorial cinematography',
    description:
      'Cinematic brand storytelling, high-precision visual assets, and documentary films designed to alter perception, command cultural credibility, and endure over decades.',
    href: '/services#content',
  },
  {
    num: '4',
    title: 'Special & Field Projects',
    tags: ['High-Altitude Fieldwork', 'Military Documentation', 'Civic Initiatives', 'Ladakh Briefs', 'On-ground Execution'],
    image: '/images/home/strip-army.jpg',
    alt: 'Special field operations with Indian Army and remote communities',
    description:
      'Deploying communication, documentary filmmaking, and operational initiatives across complex and austere environments — including landmark collaborations with the Indian Army.',
    href: '/indian-army-projects',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const card = cardContainerRef.current;
    const track = trackRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !track) return;

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;

      if (isDesktop) {
        // Compute the translation distance accurately:
        // Distance from item 0 top to item 3 top so that item 3 aligns exactly in the viewport
        const items = track.querySelectorAll<HTMLElement>('.home-services_item');
        if (items.length >= 4) {
          const firstItem = items[0];
          const lastItem = items[items.length - 1];
          const totalDistance = lastItem.offsetTop - firstItem.offsetTop;

          // Main timeline for the pinned scroll-driven sequence
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: card,
              start: 'top top+=24',
              end: '+=300%',
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // 1. Continuous vertical translation of the services track
          tl.to(track, {
            y: -totalDistance,
            ease: 'none',
            duration: 1,
          }, 0);

          // 2. Subtle image scale effect matching Webflow Action a-45 (1.0 -> 1.1)
          const imgs = track.querySelectorAll<HTMLElement>('.home-services_img');
          imgs.forEach((img, idx) => {
            const startFrac = Math.max(0, (idx - 0.5) / items.length);
            const endFrac = Math.min(1, (idx + 0.8) / items.length);

            tl.fromTo(
              img,
              { scale: 1 },
              {
                scale: 1.08,
                ease: 'power1.out',
                duration: endFrac - startFrac,
              },
              startFrac
            );
          });

          // 3. CTA "Get in touch" button appears gracefully when Service 04 enters
          if (cta) {
            tl.fromTo(
              cta,
              { opacity: 0, y: 28, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: 'power2.out',
                duration: 0.2,
              },
              0.72 // Enters during the transition to Service 04
            );
          }
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section_home-services relative w-full overflow-visible"
      style={{
        backgroundColor: '#f5f5f3',
        paddingTop: '2.5rem',
        paddingBottom: '3.5rem',
      }}
    >
      {/* Outer page margin container (Webflow .padding-global.is-tiny) */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 md:px-7">
        {/* Large Black Rounded Container (Webflow .home-services_component) */}
        <div
          ref={cardContainerRef}
          className="home-services_component relative w-full bg-[#0b0b0c] text-white flex flex-col justify-between"
          style={{
            borderRadius: '2.5rem',
            padding: 'clamp(2rem, 3.5vw, 3.5rem) clamp(1.5rem, 3.5vw, 3.5rem) clamp(2.5rem, 4vw, 4rem)',
            minHeight: '84vh',
            height: 'clamp(620px, 86vh, 840px)',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Stable Header (.head-grid): Services  × × × ×  (04) */}
          <div className="head-grid flex items-center justify-between w-full pb-5 md:pb-7 border-b border-white/[0.08] flex-shrink-0">
            {/* Left: Services */}
            <div className="text-white">
              <h2
                className="font-medium tracking-tight text-white m-0"
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 3.25rem)',
                  fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                }}
              >
                Services
              </h2>
            </div>

            {/* Center: 4 delicate crosses */}
            <div className="hidden md:flex items-center justify-between w-1/3 max-w-sm text-white/30 text-xs sm:text-sm select-none">
              <span>✕</span>
              <span>✕</span>
              <span>✕</span>
              <span>✕</span>
            </div>

            {/* Right: (04) */}
            <div className="text-white">
              <div
                className="font-medium tracking-tight text-white"
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 3.25rem)',
                  fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                }}
              >
                (04)
              </div>
            </div>
          </div>

          {/* Masked Services Viewport (.home-services_content) */}
          <div
            ref={viewportRef}
            className="home-services_viewport relative w-full flex-1 overflow-hidden mt-6 md:mt-8"
          >
            {/* Vertically Moving Track (.home-services_items) */}
            <div
              ref={trackRef}
              className="home-services_items flex flex-col w-full relative"
              style={{
                willChange: 'transform',
              }}
            >
              {SERVICES_DATA.map((service, index) => {
                const isLast = index === SERVICES_DATA.length - 1;

                return (
                  <div
                    key={service.num}
                    className={`home-services_item flex flex-col w-full ${
                      isLast ? 'pb-8' : 'pb-16 lg:pb-24'
                    }`}
                    style={{
                      minHeight: '440px',
                    }}
                  >
                    {/* Top divider line if not the very first item */}
                    {index > 0 && (
                      <div
                        className="line is-darker w-full mb-8 lg:mb-12"
                        style={{
                          height: '1px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        }}
                      />
                    )}

                    {/* Two-column item layout (.home-services_item-in) */}
                    <div className="home-services_item-in grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Left Column (.home-services_examples): Title, Number, Tags, CTA */}
                      <div className="lg:col-span-6 flex flex-col items-start justify-start">
                        {/* Header: Red/Orange Badge + Title */}
                        <div className="home-services_item-head flex items-center gap-3.5">
                          {/* Circular Red Badge (.home-services_number) */}
                          <div
                            className="home-services_number flex items-center justify-center rounded-full text-white flex-shrink-0"
                            style={{
                              width: '1.4rem',
                              height: '1.4rem',
                              backgroundColor: '#f3350c',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              lineHeight: 1,
                            }}
                          >
                            <span>{service.num}</span>
                          </div>

                          {/* Service Title (.home-services_title) */}
                          <h3
                            className="home-services_title text-[#e5e3dc] font-semibold tracking-tight m-0"
                            style={{
                              fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                              fontFamily: 'var(--font-display, "Plus Jakarta Sans", sans-serif)',
                              letterSpacing: '-0.02em',
                              lineHeight: 1.15,
                            }}
                          >
                            {service.title}
                          </h3>
                        </div>

                        {/* Tag Pills (.home-services_services) */}
                        <div
                          className="home-services_services flex flex-wrap gap-2 mt-5 lg:mt-6"
                          style={{ maxWidth: '380px' }}
                        >
                          {service.tags.map((tag) => (
                            <div
                              key={tag}
                              className="home-services_service px-3.5 py-1.5 rounded-full text-[#a1a1aa] text-xs md:text-[0.825rem] font-medium"
                              style={{
                                backgroundColor: '#1f1f22',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                letterSpacing: '0.01em',
                              }}
                            >
                              {tag}
                            </div>
                          ))}
                        </div>

                        {/* White "Get in touch" Pill Button on Service 04 (.button-secondary) */}
                        {isLast && (
                          <div
                            ref={ctaRef}
                            className="home-services_cta-wrap mt-8 lg:mt-12"
                            style={{ opacity: 0 }}
                          >
                            <Link
                              href="/contact"
                              className="button-secondary inline-flex items-center gap-3.5 px-7 py-3.5 rounded-full bg-white text-[#0b0b0c] font-semibold text-sm tracking-tight transition-all duration-300 hover:bg-[#eae8e3] hover:scale-[1.03] shadow-lg group"
                              style={{
                                borderRadius: '9999px',
                              }}
                            >
                              <span className="font-medium text-[0.925rem]">Get in touch</span>
                              <span
                                className="button_dot w-2 h-2 rounded-full bg-[#f3350c] flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                                style={{ backgroundColor: '#f3350c' }}
                              />
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Right Column (.home-services_desc): Image + Description */}
                      <div className="lg:col-span-6 flex flex-col items-start w-full">
                        {/* Image wrapper (.home-services_img-wrap) */}
                        <div
                          className="home-services_img-wrap relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#161618]"
                          style={{
                            borderRadius: '1.25rem',
                            maxWidth: '540px',
                          }}
                        >
                          <Image
                            src={service.image}
                            alt={service.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 540px"
                            className="home-services_img object-cover w-full h-full"
                            style={{
                              transition: 'transform 0.5s ease-out',
                            }}
                          />
                        </div>

                        {/* Text wrapper (.home-services_text-wrap) */}
                        <div
                          className="home-services_text-wrap mt-4 lg:mt-5"
                          style={{ maxWidth: '36rem' }}
                        >
                          <p
                            className="text-[#a1a1aa] text-sm md:text-base leading-relaxed m-0"
                            style={{
                              lineHeight: 1.6,
                              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                            }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
