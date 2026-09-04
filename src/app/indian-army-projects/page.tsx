'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { ARMY_HERO_DATA, ARMY_TIMELINE_PROJECTS } from '@/data/indian-army-projects';

export default function IndianArmyProjectsPage() {
  return (
    <div className="section-light" style={{ paddingTop: '3rem', paddingBottom: '8rem' }}>
      <div className="padding-global container-large">
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

        {/* Hero Header */}
        <div style={{ maxWidth: '1080px', marginBottom: '4rem' }}>
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
            <ShieldCheck size={16} />
            {ARMY_HERO_DATA.eyebrow}
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              color: '#111111',
              marginBottom: '1.5rem',
            }}
          >
            {ARMY_HERO_DATA.heading}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#555555',
              lineHeight: 1.5,
              maxWidth: '820px',
            }}
          >
            {ARMY_HERO_DATA.supportingStatement}
          </p>
        </div>

        {/* Credibility Notice Banner */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
            marginBottom: '5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#28cd41',
              flexShrink: 0,
            }}
          />
          <div style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>
            <strong>Institutional Integrity:</strong> All presented Indian Army project materials
            represent verified shoot direction, production, post-production and communication
            assignments executed under authorized institutional protocols. No confidential
            operational details are disclosed.
          </div>
        </div>

        {/* Timeline Projects Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', marginBottom: '6rem' }}>
          {ARMY_TIMELINE_PROJECTS.map((project) => (
            <div
              key={project.id}
              id={project.id}
              style={{
                borderRadius: '32px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                padding: 'clamp(2rem, 4vw, 4rem)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.03)',
              }}
            >
              {/* Project Top Meta */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingBottom: '2rem',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  marginBottom: '2.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: '#ff3b30',
                    }}
                  >
                    {project.indexNumber}
                  </span>
                  <span
                    className="tag-mono"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      color: '#333',
                    }}
                  >
                    {project.organization}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#666', fontFamily: 'var(--font-mono)' }}>
                  {project.metadata.location} • {project.metadata.dateOrPeriod}
                </div>
              </div>

              {/* Title & Description */}
              <div style={{ maxWidth: '920px', marginBottom: '3rem' }}>
                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: '#111',
                    marginBottom: '0.75rem',
                  }}
                >
                  {project.title}
                </h2>
                {project.subtitle && (
                  <div
                    style={{
                      fontSize: '1.15rem',
                      color: '#555',
                      fontWeight: 500,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {project.subtitle}
                  </div>
                )}
                <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6 }}>
                  {project.description}
                </p>
              </div>

              {/* Project Scope & Approach Cards */}
              {project.expandableSections && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem',
                  }}
                >
                  {project.expandableSections.scope && (
                    <div
                      style={{
                        padding: '1.75rem',
                        borderRadius: '16px',
                        backgroundColor: '#fafafa',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <div className="tag-mono" style={{ color: '#888', marginBottom: '0.5rem' }}>
                        SCOPE OF WORK
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>
                        {project.expandableSections.scope}
                      </p>
                    </div>
                  )}

                  {project.expandableSections.creativeApproach && (
                    <div
                      style={{
                        padding: '1.75rem',
                        borderRadius: '16px',
                        backgroundColor: '#fafafa',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <div className="tag-mono" style={{ color: '#888', marginBottom: '0.5rem' }}>
                        CREATIVE APPROACH
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>
                        {project.expandableSections.creativeApproach}
                      </p>
                    </div>
                  )}

                  {project.expandableSections.productionNotes && (
                    <div
                      style={{
                        padding: '1.75rem',
                        borderRadius: '16px',
                        backgroundColor: '#fafafa',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <div className="tag-mono" style={{ color: '#888', marginBottom: '0.5rem' }}>
                        PRODUCTION DISCIPLINE
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>
                        {project.expandableSections.productionNotes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Project Visuals Gallery */}
              {project.visuals && project.visuals.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                  }}
                >
                  {project.visuals.map((visual, vIdx) => (
                    <div key={vIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16/10',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          backgroundColor: '#eee',
                        }}
                      >
                        <Image
                          src={visual.src}
                          alt={visual.alt}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#666',
                          fontFamily: 'var(--font-mono)',
                          lineHeight: 1.4,
                        }}
                      >
                        {visual.caption}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Closing Consultation CTA */}
        <div
          style={{
            padding: '4rem clamp(1.5rem, 4vw, 4rem)',
            borderRadius: '28px',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 500 }}>
              Specialised briefs requiring unusual discipline.
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.5rem', fontSize: '1.05rem' }}>
              We bring proven on-ground operational execution to high-stakes assignments.
            </p>
          </div>

          <Link href="/contact" className="button-editorial button-editorial-white" style={{ height: '48px', padding: '0 1.75rem' }}>
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
