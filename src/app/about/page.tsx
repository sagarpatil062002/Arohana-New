'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
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

  return (
    <div className="section-light" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
      <div className="padding-global container-large">
        {/* Giant Split Studio Headline */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '4rem',
            overflow: 'hidden',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 11rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              fontWeight: 500,
              color: '#111111',
            }}
          >
            Our
          </h1>
          <div
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 11rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              fontWeight: 500,
              color: '#111111',
            }}
          >
            Studio.
          </div>
        </div>

        {/* Hero Narrative with Founder Portrait */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
            marginBottom: '7rem',
          }}
        >
          <div>
            <div
              className="tag-mono"
              style={{
                color: '#ff3b30',
                marginBottom: '1.25rem',
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
              THE THINKING BEHIND THE WORK
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
                lineHeight: 1.1,
                fontWeight: 400,
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
                color: '#111111',
              }}
            >
              We bring commercial context, sector depth and creative execution together.
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
                lineHeight: 1.6,
                color: '#444444',
                marginBottom: '1.5rem',
              }}
            >
              Ārohana is a strategic creative consultancy founded by Madhura. We work directly with
              founders, leadership teams, and institutions who need more than superficial marketing
              noise.
            </p>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#666666',
                marginBottom: '2.5rem',
              }}
            >
              We believe great branding is grounded in operational truth. Whether crafting a digital
              acquisition pipeline for an industrial group, engineering restaurant profitability, or
              directing high-altitude documentaries in the Himalayas, our work is shaped by context,
              evidence, and craft.
            </p>

            <Link href="/contact" className="button-editorial button-editorial-dark" style={{ height: '48px', padding: '0 1.75rem' }}>
              <div className="button-texts-slider">
                <span className="button-text-item">Start a conversation</span>
                <span className="button-text-item">Start a conversation</span>
              </div>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
              }}
            >
              <Image
                src="/images/home/madhura-editorial.jpg"
                alt="Madhura - Founder Ārohana"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
                  color: '#ffffff',
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 500 }}>Madhura</div>
                <div className="tag-mono" style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  FOUNDER & PRINCIPAL CONSULTANT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Trajectory Timeline */}
        <div style={{ marginBottom: '7rem' }}>
          <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem' }}>
            HOW WE GOT HERE
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: '3.5rem',
              color: '#111',
            }}
          >
            The Journey & Evolution
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                style={{
                  padding: '2.5rem',
                  borderRadius: '24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    className="tag-mono"
                    style={{ color: '#ff3b30', fontSize: '0.75rem', marginBottom: '1rem' }}
                  >
                    0{idx + 1} • {m.year}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 500,
                      marginBottom: '1rem',
                      color: '#111',
                    }}
                  >
                    {m.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Card */}
        <div
          style={{
            padding: 'clamp(2.5rem, 5vw, 5rem)',
            borderRadius: '32px',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            marginBottom: '5rem',
          }}
        >
          <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '1rem' }}>
            OUR CORE CODE
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.4rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: '920px',
              marginBottom: '2.5rem',
            }}
          >
            "Never sell a client a solution before you understand their unit economics, their
            audience truth, and their real operational challenge."
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '2.5rem',
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Operational Grounding
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
                We spend time inside your physical kitchens, production floors, and client meetings.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Editorial Restraint
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
                No hyperbolic claims, no fake awards, no buzzwords. Clarity and conviction win.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Direct Accountability
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
                Engagements are personally led by senior practitioners with specialists built around the brief.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
