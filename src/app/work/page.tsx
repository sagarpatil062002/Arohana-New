'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '@/data/case-studies';

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    'All',
    'Industrial & Multi-Entity',
    'Luxury & Architecture',
    'Media & Culture',
    'Social Development',
    'Hospitality & F&B',
    'Healthcare',
  ];

  const filteredCases = selectedFilter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((cs) => {
        if (selectedFilter === 'Industrial & Multi-Entity') return cs.sector.includes('Industrial') || cs.sector.includes('Real Estate');
        if (selectedFilter === 'Luxury & Architecture') return cs.sector.includes('Luxury') || cs.sector.includes('Modular');
        if (selectedFilter === 'Media & Culture') return cs.sector.includes('Media') || cs.sector.includes('Entertainment');
        if (selectedFilter === 'Social Development') return cs.sector.includes('Social');
        if (selectedFilter === 'Hospitality & F&B') return cs.sector.includes('Hospitality');
        if (selectedFilter === 'Healthcare') return cs.sector.includes('Healthcare');
        return true;
      });

  const directoryProjects = [
    {
      title: 'Western Command — Indian Army',
      sector: 'Ceremonial Documentary & Production',
      year: '2023 — 2024',
      link: '/indian-army-projects',
    },
    {
      title: 'Neora Deck',
      sector: 'Rooftop Experiential Hospitality',
      year: '2023 — Present',
      link: '/work/raysons',
    },
    {
      title: 'Tourin Ladakh',
      sector: 'Experiential High-Altitude Travel',
      year: '2023 — Present',
      link: '/tourin',
    },
    {
      title: 'Blu Resorts Goa',
      sector: 'Boutique Coastal Resort Hospitality',
      year: '2022',
      link: '/services#hospitality',
    },
    {
      title: 'Qubice Systems',
      sector: 'Architectural Modular Solutions',
      year: '2023',
      link: '/work/loom-crafts',
    },
    {
      title: 'DTK Karekar Jewellery',
      sector: 'Heritage Fine Jewelry & Retail',
      year: '2022 — 2023',
      link: '/services#digital',
    },
  ];

  return (
    <div className="section-light" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
      <div className="padding-global container-large">
        {/* Header */}
        <div style={{ maxWidth: '1020px', marginBottom: '4rem' }}>
          <div
            className="tag-mono"
            style={{
              color: '#777777',
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
            PORTFOLIO & CASE STUDIES
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
            The work is the proof.
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              color: '#555555',
              lineHeight: 1.6,
            }}
          >
            A curated selection of businesses and projects showing how Ārohana thinks, creates and executes
            across very different commercial and physical operating environments.
          </p>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            display: 'flex',
            gap: '0.65rem',
            flexWrap: 'wrap',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            marginBottom: '4rem',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                backgroundColor: selectedFilter === filter ? '#111111' : '#ffffff',
                color: selectedFilter === filter ? '#ffffff' : '#555555',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured Case Studies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3rem',
            marginBottom: '7rem',
          }}
        >
          {filteredCases.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '28px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 24px 50px rgba(0, 0, 0, 0.09)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.04)';
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  backgroundColor: '#eee',
                }}
              >
                <Image
                  src={cs.heroImage}
                  alt={cs.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowUpRight size={18} color="#111" />
                </div>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div
                  className="tag-mono"
                  style={{ color: '#ff3b30', marginBottom: '0.5rem', fontSize: '0.75rem' }}
                >
                  {cs.sector}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.85rem',
                    fontWeight: 500,
                    color: '#111111',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.65rem',
                  }}
                >
                  {cs.title}
                </h2>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#555555',
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                    flex: 1,
                  }}
                >
                  {cs.subtitle}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#888888',
                  }}
                >
                  <span>{cs.snapshot.location}</span>
                  <span style={{ color: '#111', fontWeight: 600 }}>EXPLORE CASE →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Client & Project Directory */}
        <div
          style={{
            borderRadius: '28px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: ' clamp(2rem, 4vw, 4rem)',
          }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="tag-mono" style={{ color: '#888', marginBottom: '0.5rem' }}>
              PROJECT & CLIENT DIRECTORY
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 500 }}>
              Additional engagements & brand briefs
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {directoryProjects.map((p) => (
              <Link
                key={p.title}
                href={p.link}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0ee';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 500, fontSize: '1.05rem', color: '#111' }}>{p.title}</div>
                  <ArrowUpRight size={16} color="#777" />
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: 'var(--font-mono)' }}>
                  {p.sector} • {p.year}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
