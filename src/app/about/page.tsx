'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const pillPos = useRef({ x: 0, y: 0 });
  const [pillLabel, setPillLabel] = useState('EXPLORE');

  const milestones = [
    {
      year: 'THE ORIGINS',
      title: 'It started with hospitality.',
      desc: 'Ārohana was born inside live hospitality environments. Understanding restaurants, menus, service flows, guest repeat behaviour and operational margins from the ground up gave us an unshakeable commercial foundation.',
    },
    {
      year: 'EXPANSION',
      title: 'Unexpected detours and industrial depth.',
      desc: 'Trust with early founders led to engagements across industrial manufacturing, foundries, casting facilities, and real estate development. We learned how to communicate technical capabilities to sophisticated commercial buyers.',
    },
    {
      year: 'THE HIGH HIMALAYAS',
      title: 'Ladakh, field operations & Tourin.',
      desc: 'Field execution across high-altitude Ladakh: directing documentaries for the SHE Project, designing experiential travel journeys through Tourin, and navigating remote logistical challenges where standard marketing playbooks fail.',
    },
    {
      year: 'DEFENCE COLLABORATION',
      title: 'Indian Army ceremonial productions.',
      desc: 'Invited to handle critical shoot direction, production and post-production for the Indian Army Western Command Investiture Ceremony and 14 Corps Headquarters, demanding strict protocol and cinematic dignity.',
    },
  ];

  const PRINCIPLES = [
    {
      number: '01',
      title: 'Thinking Beyond Posts',
      description: 'We do not view marketing as a calendar of social posts. Every communication initiative is tied to positioning, commercial clarity and real business outcomes.',
      shortTag: 'Commercial & Strategic Clarity',
    },
    {
      number: '02',
      title: 'Sector Depth Over Templates',
      description: 'We understand the distinct operational and margin realities of hospitality, real estate, healthcare, and consumer businesses rather than applying a single formula to everything.',
      shortTag: 'Operational Realities',
    },
    {
      number: '03',
      title: 'Owning Ground Execution',
      description: 'We bridge strategy and physical execution — directing factory shoots, structuring kitchen pass SOPs, and managing multi-channel rollouts directly.',
      shortTag: 'Boots-on-the-Ground Delivery',
    },
    {
      number: '04',
      title: 'Complex & Long-Term Partnerships',
      description: 'Equipped for multi-year corporate retainers, fast-paced commercial launches, and cross-functional leadership advisory.',
      shortTag: 'Institutional Trust',
    },
    {
      number: '05',
      title: 'Real, Hard-to-Replicate Proof',
      description: 'From high-altitude Himalayan documentary productions and defence projects to luxury architectural spaces and fine dining turnarounds.',
      shortTag: 'Verified Track Record',
    },
    {
      number: '06',
      title: 'Direct Decision-Maker Access',
      description: 'Serious enough for established group businesses, nimble enough to work directly with founders, owners, and leadership teams.',
      shortTag: 'No Agency Bureaucracy',
    },
  ];

  const TEAM_MEMBERS = [
    {
      id: 'madhura-hawal',
      prefix: 'Ms.',
      name: 'Madhura Hawal',
      role: 'Founder & Principal Consultant',
      division: 'Commercial Strategy & Executive Advisory',
      image: '/images/about/madhura-portrait.jpg',
      bio: 'With credentials spanning luxury hospitality management in Muscat and Goa, Taj Management training, standalone cafe ownership, craft brewery distribution, and direct field logistics for Indian Army campaigns in Ladakh, Madhura leads every engagement with rigorous commercial discipline. She bridges the gap between creative ambition and bottom-line margin realities, working directly with founders and leadership teams.',
      focusAreas: ['Commercial Strategy', 'Hospitality Operations', 'Military & Special Projects'],
    },
    {
      id: 'aditya-kulkarni',
      prefix: 'Mr.',
      name: 'Aditya Kulkarni',
      role: 'Creative Director & Brand Architect',
      division: 'Brand Systems & Visual Direction',
      image: '/images/about/team-creative-director.jpg',
      bio: 'Aditya directs identity systems, spatial design, and typography architecture across luxury, retail, and corporate sectors. His approach ensures that brand identity functions not merely as aesthetic styling, but as an operational business asset that establishes distinct market authority and long-term equity across physical environments and digital touchpoints.',
      focusAreas: ['Brand Architecture', 'Spatial Experience', 'Typography Systems'],
    },
    {
      id: 'tanvi-deshmukh',
      prefix: 'Ms.',
      name: 'Tanvi Deshmukh',
      role: 'Head of Strategic Communications',
      division: 'Positioning & Editorial Narrative',
      image: '/images/about/team-strategy-lead.jpg',
      bio: 'Tanvi oversees brand narrative, institutional positioning, and corporate communications. Specializing in high-stakes briefs and legacy enterprise repositioning, she crafts clear, compelling brand messaging rooted in verified proof rather than superficial slogans, ensuring consistent alignment with executive vision.',
      focusAreas: ['Brand Positioning', 'Editorial Architecture', 'Executive Communication'],
    },
    {
      id: 'arjun-patel',
      prefix: 'Mr.',
      name: 'Arjun Patel',
      role: 'Lead Cinematographer & Film Director',
      division: 'Film, Sound & Documentary Media',
      image: '/images/about/team-film-director.jpg',
      bio: 'Arjun directs documentary, film, and multimedia production for commercial campaigns and specialized institutional briefs. Having filmed extensively at 14,000+ feet in high-altitude Himalayan sectors under strict protocols, he brings cinematic precision and storytelling into demanding operational environments.',
      focusAreas: ['High-Altitude Cinematography', 'Master Films', 'Audio Engineering'],
    },
    {
      id: 'neha-sharma',
      prefix: 'Ms.',
      name: 'Neha Sharma',
      role: 'Director of Operations & Ground Logistics',
      division: 'Field Logistics & Execution SOPs',
      image: '/images/about/team-ops-director.jpg',
      bio: 'Neha directs on-ground execution, vendor governance, and standard operating procedures for physical rollouts. Managing complex production schedules across remote theatres and multi-city rollouts, she guarantees that strategic blueprints are materialized with zero operational friction.',
      focusAreas: ['Field Operations', 'Execution SOPs', 'Vendor Governance'],
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
      // Masked title entrance (matching home page PointOfView)
      gsap.fromTo(
        '.about-title-masked',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out' }
      );

      // Hero narrative entrance
      gsap.fromTo(
        '.about-hero-anim',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out', delay: 0.25 }
      );

      // 3D Perspective Scroll on Milestone Cards (matching home page 3D tilt)
      const milestoneItems = gsap.utils.toArray<HTMLElement>('.about-milestone-item');
      milestoneItems.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: '20vh',
            rotateX: 30,
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

      // Philosophy Card reveal
      gsap.fromTo(
        '.about-philosophy-card',
        { scale: 0.94, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-philosophy-card',
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
      style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)', overflow: 'hidden' }}
    >
      {/* Floating Interactive Cursor Pill (matching home page) */}
      <div
        ref={hoverPillRef}
        className="hide-on-mobile"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          backgroundColor: '#0c0c0e',
          color: '#ffffff',
          borderRadius: '9999px',
          padding: '0.6rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <span>{pillLabel}</span>
        <ArrowUpRight size={14} color="#DE322D" />
      </div>

      <div className="padding-global container-large">
        {/* Giant Masked Headline */}
        <div style={{ maxWidth: '1000px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div
            className="about-hero-anim tag-mono"
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
                boxShadow: '0 0 10px #DE322D',
              }}
            />
            THE FOUNDER'S STORY
          </div>

          <div style={{ overflow: 'hidden', paddingBottom: '0.15em' }}>
            <h1
              className="about-title-masked"
              style={{
                fontSize: 'clamp(2.8rem, 6.8vw, 6.2rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.04em',
                fontWeight: 500,
                color: '#111111',
              }}
            >
              I didn't plan to build Ārohana.
            </h1>
          </div>
        </div>

        {/* Hero Narrative with One Strong Portrait */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 6rem)',
            alignItems: 'center',
            marginBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          <div>
            <p
              className="about-hero-anim"
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                lineHeight: 1.55,
                color: '#111111',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              The road to Ārohana was anything but straight. I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.
            </p>

            <p
              className="about-hero-anim"
              style={{
                fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                lineHeight: 1.6,
                color: '#555555',
                marginBottom: '2.5rem',
              }}
            >
              Today, Ārohana brings together that experience with strategy, communication, creativity and execution — for businesses that are serious about what they are building.
            </p>

            <div className="about-hero-anim">
              <Link href="/contact" className="button-editorial button-editorial-dark" style={{ height: '48px', padding: '0 1.75rem' }}>
                <div className="button-texts-slider">
                  <span className="button-text-item">Start a conversation</span>
                  <span className="button-text-item">Start a conversation</span>
                </div>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div
            className="about-hero-anim"
            onMouseEnter={() => handlePillEnter('MADHURA · FOUNDER')}
            onMouseLeave={handlePillLeave}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 'clamp(20px, 4vw, 32px)',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.14)',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.015)';
                e.currentTarget.style.boxShadow = '0 32px 75px rgba(0, 0, 0, 0.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.14)';
              }}
            >
              <Image
                src="/images/home/madhura-editorial.jpg"
                alt="Madhura Hawal, Founder of Ārohana"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'clamp(1.25rem, 3vw, 2rem)',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%)',
                  color: '#ffffff',
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Madhura Hawal
                  <Sparkles size={16} color="#DE322D" />
                </div>
                <div className="tag-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.1em' }}>
                  FOUNDER & PRINCIPAL CONSULTANT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: It started with hospitality */}
        <div
          className="about-milestone-item"
          onMouseEnter={() => handlePillEnter('HOSPITALITY ROOTS')}
          onMouseLeave={handlePillLeave}
          style={{
            padding: 'clamp(2rem, 4vw, 4rem)',
            borderRadius: 'clamp(20px, 3vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
            01 • THE ROOTS
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              marginBottom: '1.75rem',
              color: '#111',
            }}
          >
            It started with hospitality.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2.5rem', color: '#444', lineHeight: 1.7, fontSize: '1.025rem' }}>
            <div>
              <p style={{ marginBottom: '1.25rem' }}>
                My first world was hospitality.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                I studied Hospitality Management in Muscat before completing my degree in Goa. While I was studying in Goa, I was selected among the Top 13 finalists from the West Zone for Femina Miss India — an unexpected opportunity that took me into a completely different world and taught me a great deal about confidence, communication and being comfortable outside my comfort zone. Not long after, I was selected as one of just 16 students from across India for the Taj Management Training Programme.
              </p>
              <p>
                Over the years, I worked in Muscat, returned to Kolhapur and eventually decided to build something of my own — Mother India Cafe.
              </p>
            </div>
            <div>
              <p style={{ marginBottom: '1.25rem' }}>
                Running a café teaches you things no business textbook can quite prepare you for. You learn about people, margins, suppliers, staff, customers, bad days, good days and the uncomfortable reality that every decision eventually shows up in the numbers.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                While the café was still running, another opportunity took me to Goa. I joined Passcode Hospitality as Operations Head and worked on two upcoming restaurants, Pings Bia Hoi and Jamun. That experience took me deeper into the machinery behind a hospitality business — not just how a brand looks, but how an experience is actually built.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                Later, I moved into institutional business and sales with Latambarcem Brewers Private Limited, working across Goa and Delhi. It gave me another perspective on business: relationships, commercial thinking, negotiation and growth.
              </p>
              <p style={{ fontWeight: 500, color: '#111' }}>
                By then, I had understood something that would eventually become central to Ārohana: a business can have a great-looking brand and still have a problem underneath it. And sometimes what looks like a marketing problem isn't a marketing problem at all.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: There were a few unexpected detours */}
        <div
          className="about-milestone-item"
          onMouseEnter={() => handlePillEnter('DETOURS')}
          onMouseLeave={handlePillLeave}
          style={{
            padding: 'clamp(2rem, 4vw, 4rem)',
            borderRadius: 'clamp(20px, 3vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem', fontWeight: 600 }}>
            02 • THE TURNING POINT
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              color: '#111',
            }}
          >
            There were a few unexpected detours.
          </h2>
          <div style={{ maxWidth: '820px', color: '#444', lineHeight: 1.7, fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '1.25rem' }}>
              And then, like it did for so many people, COVID changed the direction of things.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              The café had to close. My work in hospitality was disrupted. What came next wasn't a carefully planned five-year strategy. It was the beginning of a different kind of work.
            </p>
            <p style={{ fontWeight: 500, color: '#111' }}>
              That work gradually became Ārohana.
            </p>
          </div>
        </div>

        {/* SECTION 3: And then, the work got interesting */}
        <div
          className="about-milestone-item"
          onMouseEnter={() => handlePillEnter('THE FIELD & LADAKH')}
          onMouseLeave={handlePillLeave}
          style={{
            padding: 'clamp(2rem, 4vw, 4rem)',
            borderRadius: 'clamp(20px, 3vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
            03 • EXPANSION & LADAKH
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              marginBottom: '1.75rem',
              color: '#111',
            }}
          >
            And then, the work got interesting.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2.5rem', color: '#444', lineHeight: 1.7, fontSize: '1.025rem' }}>
            <div>
              <p style={{ marginBottom: '1.25rem' }}>
                What began with digital marketing projects slowly expanded.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                We found ourselves working with restaurants and resorts, real-estate businesses, healthcare brands, consumer businesses and entertainment companies. Sometimes the requirement was a brand strategy. Sometimes it was a complete digital presence. Sometimes it was a campaign, a film, a new menu or an operational problem inside a restaurant.
              </p>
              <p>
                And sometimes the brief took us somewhere completely unexpected.
              </p>
            </div>
            <div>
              <p style={{ marginBottom: '1.25rem' }}>
                My work in Ladakh became one of those chapters.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                There, I worked on projects associated with the Indian Army, including work connected with 14 Corps, Fire & Fury Corps, Operation Sadbhavana and Operation Sampark. That work eventually extended to other Army environments as well, including Western Command and 12 Rashtriya Rifles under Delta Force.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                The environments were different. The audiences were different. The responsibility was different.
              </p>
              <p style={{ fontWeight: 500, color: '#111' }}>
                And that experience reinforced something I had already learnt from hospitality: you cannot create meaningful communication without understanding the people, the environment and the reality behind it.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: Where Ārohana stands today */}
        <div
          className="about-milestone-item"
          onMouseEnter={() => handlePillEnter('WHERE WE STAND')}
          onMouseLeave={handlePillLeave}
          style={{
            padding: 'clamp(2rem, 4vw, 4rem)',
            borderRadius: 'clamp(20px, 3vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            marginBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem', fontWeight: 600 }}>
            04 • OUR PRACTICE
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              marginBottom: '1.75rem',
              color: '#111',
            }}
          >
            Where Ārohana stands today.
          </h2>

          <div style={{ maxWidth: '920px', color: '#444', lineHeight: 1.75, fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '1.25rem' }}>
              What remains constant is the standard: clear thinking, sector-aware strategy, strong creative work and disciplined execution — brought together to make the business more visible, more relevant and more valuable to the people it is trying to reach.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              That is also why our work can move from a real-estate brand to a healthcare practice, from a restaurant to a consumer brand, or from a commercial campaign to a project in an entirely different environment. The category changes. The thinking has to change with it.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              The work may begin with a brand question, a business challenge or simply the sense that something is not working as it should. From there, strategy, communication, creative and execution come together around what the business actually needs — rather than around a fixed list of deliverables.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              We work with businesses at points where a standard agency approach is not enough — when a brand needs sharper positioning, a stronger market presence, a more deliberate digital strategy, or a hospitality business needs to rethink the experience it is creating.
            </p>
            <p style={{ fontWeight: 600, fontSize: '1.2rem', color: '#111', marginTop: '1.5rem' }}>
              Today, Ārohana sits at the intersection of brand thinking, business understanding and execution.
            </p>
          </div>
        </div>

        {/* SECTION 5: THE STANDARD (OPERATING PRINCIPLES) */}
        <div
          className="about-milestone-item"
          onMouseEnter={() => handlePillEnter('THE STANDARD')}
          onMouseLeave={handlePillLeave}
          style={{
            padding: 'clamp(2rem, 4vw, 4rem)',
            borderRadius: 'clamp(20px, 3vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            marginBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
            [ 02 ] THE STANDARD
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              color: '#111',
            }}
          >
            What we bring to every engagement.
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              color: '#555',
              lineHeight: 1.6,
              maxWidth: '820px',
              marginBottom: '3rem',
            }}
          >
            The rare combination of business-side hospitality experience, digital creative capability, sector-specific execution, and boots-on-the-ground delivery.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderRadius: '18px',
                  backgroundColor: '#fafafa',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(222, 50, 45, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#DE322D',
                    }}
                  >
                    {principle.number}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#888',
                    }}
                  >
                    {principle.shortTag}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', margin: 0 }}>
                  {principle.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: LEADERSHIP COLLECTIVE */}
        <div
          className="about-milestone-item"
          onMouseEnter={() => handlePillEnter('LEADERSHIP')}
          onMouseLeave={handlePillLeave}
          style={{
            padding: 'clamp(2rem, 4vw, 4rem)',
            borderRadius: 'clamp(20px, 3vw, 28px)',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            marginBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', fontWeight: 600 }}>
            [ 03 ] LEADERSHIP COLLECTIVE
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              color: '#111',
            }}
          >
            Brand is only as strong as the thinking behind it.
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              color: '#555',
              lineHeight: 1.6,
              maxWidth: '820px',
              marginBottom: '3.5rem',
            }}
          >
            Behind Ārohana is an interdisciplinary collective of operators, commercial strategists, filmmakers, and creative architects who have built, run, and scaled systems on the ground.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '2rem',
            }}
          >
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.id}
                style={{
                  borderRadius: '24px',
                  backgroundColor: '#fafafa',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/11', backgroundColor: '#e6e6e4' }}>
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.25rem 1rem 0.75rem 1rem',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%)',
                      color: '#ffffff',
                    }}
                  >
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: '#ffffff' }}>
                      {member.prefix} {member.name}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#ff3b30', margin: 0, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {member.role}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1, backgroundColor: '#ffffff' }}>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.6rem',
                      }}
                    >
                      {member.division}
                    </span>
                    <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                      {member.bio}
                    </p>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#999',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Core Competencies
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {member.focusAreas.map((area) => (
                        <span
                          key={area}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: '#444',
                            backgroundColor: '#f2f2f0',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '6px',
                          }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLOSING SECTION */}
        <div
          className="about-philosophy-card"
          onMouseEnter={() => handlePillEnter('LET’S TALK')}
          onMouseLeave={handlePillLeave}
          style={{
            padding: 'clamp(2rem, 5vw, 5rem)',
            borderRadius: 'clamp(20px, 4vw, 32px)',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-15%',
              right: '-10%',
              width: '400px',
              height: '400px',
              backgroundColor: 'rgba(222, 50, 45, 0.12)',
              borderRadius: '50%',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '840px' }}>
            <div className="tag-mono" style={{ color: '#DE322D', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#DE322D', boxShadow: '0 0 8px #DE322D' }} />
              GET IN TOUCH
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              A brand is only as strong as the thinking behind it.
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2.5rem',
              }}
            >
              That thinking comes from years of being inside businesses — building, running, selling, solving and starting again. Today, it is what we bring to the businesses we work with.
              <br /><br />
              If you're building something worth building, let's talk.
            </p>

            <Link href="/contact" className="button-editorial button-editorial-white" style={{ height: '48px', padding: '0 2rem' }}>
              <div className="button-texts-slider">
                <span className="button-text-item">Start a conversation</span>
                <span className="button-text-item">Start a conversation</span>
              </div>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
