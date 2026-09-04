'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  const pillars = [
    {
      id: 'digital',
      num: '01',
      title: 'Digital Brand Growth',
      tagline: 'Brand systems that drive commercial momentum.',
      desc: 'Building sustainable commercial velocity across brand positioning, digital visual identity, content strategy, website architecture, and paid/organic acquisition systems.',
      image: '/images/services/digital-growth.jpg',
      capabilities: [
        'Brand Positioning & Value Proposition',
        'Visual Identity & System Design',
        'Website Architecture & Development',
        'Content Velocity & Publishing Frameworks',
        'Performance Marketing & Paid Acquisition',
        'Digital Revenue Pipelines & Analytics',
      ],
      proof: 'Raysons Real Estate digital pipeline, RR Skins patient education growth, Loom Crafts digital reach.',
    },
    {
      id: 'hospitality',
      num: '02',
      title: 'Hospitality Consulting',
      tagline: 'Restaurant fundamentals, guest experience & repeat visits.',
      desc: 'Hands-on advisory across the full lifecycle of experiential dining, boutique resorts, and beverage concepts. We work on menu engineering, guest retention, and operational unit economics.',
      image: '/images/services/hospitality-consulting.jpg',
      capabilities: [
        'Concept Development & Culinary Narrative',
        'Menu Engineering & Margin Architecture',
        'Service Journey & Front-of-House Experience',
        'Staff Training & Brand Touchpoints',
        'Guest Retention & Local Marketing Strategy',
        'Boutique Resort & Dining Diagnostics',
      ],
      proof: 'Misu Pan-Asian restaurant scaling, Neora Deck rooftop concept, Blu Resorts coastal hospitality.',
    },
    {
      id: 'content',
      num: '03',
      title: 'Content & Brand Production',
      tagline: 'Cinematic visual production with editorial discipline.',
      desc: 'High-caliber production across films, architectural stills, documentaries, and digital asset libraries. Directed on-location with technical precision from high Himalayas to industrial foundry floors.',
      image: '/images/services/content-production.jpg',
      capabilities: [
        'On-Location Film & Shoot Direction',
        'Architectural, Interior & Built Stills',
        'Technical Scriptwriting & Narrative Framing',
        'Sound Design, Color Grading & Post-production',
        'High-Altitude & Remote Operating Capabilities',
        'Documentary & Social Asset Toolkits',
      ],
      proof: 'Western Command Investiture Ceremony, Raysons Industrial Casting Film, SHE Project documentary, PictureTime on-ground media.',
    },
  ];

  return (
    <div className="section-light" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
      <div className="padding-global container-large">
        {/* Header */}
        <div style={{ maxWidth: '1080px', marginBottom: '5rem' }}>
          <div
            className="tag-mono"
            style={{
              color: '#ff3b30',
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
                backgroundColor: '#ff3b30',
              }}
            />
            PRACTICE AREAS & CAPABILITIES
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#111111',
              marginBottom: '1.5rem',
            }}
          >
            Three ways we work.
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#555555',
              lineHeight: 1.5,
              maxWidth: '840px',
            }}
          >
            Ārohana brings together commercial context, sector depth and creative execution. We
            operate where business thinking meets craftsmanship.
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', marginBottom: '7rem' }}>
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              id={pillar.id}
              style={{
                borderRadius: '32px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
                padding: 'clamp(2rem, 4vw, 4rem)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 'clamp(2.5rem, 5vw, 5rem)',
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
                        fontWeight: 600,
                        color: '#ff3b30',
                      }}
                    >
                      {pillar.num}
                    </span>
                    <span className="tag-mono" style={{ color: '#888' }}>
                      PRACTICE PILLAR
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
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
                      style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem' }}
                    >
                      SPECIFIC DELIVERABLES
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '0.75rem',
                      }}
                    >
                      {pillar.capabilities.map((cap) => (
                        <div key={cap} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle2 size={16} color="#28cd41" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.85rem', color: '#333' }}>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      paddingTop: '1.5rem',
                      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                      fontSize: '0.85rem',
                      color: '#777',
                    }}
                  >
                    <strong style={{ color: '#111' }}>Representative Proof: </strong>
                    {pillar.proof}
                  </div>
                </div>

                {/* Right Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4/3',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    backgroundColor: '#e6e6e4',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Image src={pillar.image} alt={pillar.title} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Model & How Engagements Work Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            marginBottom: '6rem',
          }}
        >
          <div
            style={{
              padding: 'clamp(2rem, 3.5vw, 3.5rem)',
              borderRadius: '28px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '0.75rem' }}>
              HOW ENGAGEMENTS WORK
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              Focused around the business stage
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#555', fontSize: '0.95rem', lineHeight: 1.6 }}>
              <p>
                <strong>Strategic Retainers:</strong> For ongoing multi-vertical brand growth, content velocity, and hospitality advisory where continuous momentum is vital.
              </p>
              <p>
                <strong>High-Impact Sprints:</strong> Focused 6 to 12-week engagements to establish positioning, overhaul brand systems, or launch a specific venture.
              </p>
              <p>
                <strong>Specialised Production Briefs:</strong> Directed film production, documentary units, and on-ground field execution across sensitive or high-altitude environments.
              </p>
            </div>
          </div>

          <div
            style={{
              padding: 'clamp(2rem, 3.5vw, 3.5rem)',
              borderRadius: '28px',
              backgroundColor: '#0c0c0e',
              color: '#ffffff',
            }}
          >
            <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '0.75rem' }}>
              TEAM STRUCTURE
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '1.25rem' }}>
              Assembled around the brief
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Ārohana does not sell an oversized agency overhead or a rigid org chart. The client
              understands that the right specialists are assembled around the specific challenge —
              strategy, design, editing, photography, videography, performance or hospitality
              specialists as required.
            </p>
            <div className="tag-mono" style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
              DIRECT LEADERSHIP BY FOUNDER • LEAN SPECIALIST TEAMS
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            padding: '4rem clamp(1.5rem, 4vw, 4rem)',
            borderRadius: '28px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 500, color: '#111' }}>
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
