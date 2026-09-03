// src/pages/WorkPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AROHANA_DATA } from '../data/arohanaData';

const FILTERS = [
  'ALL',
  'HOSPITALITY',
  'REAL ESTATE',
  'HEALTHCARE',
  'LIFESTYLE',
  'ENTERTAINMENT',
  'TRAVEL',
  'INSTITUTIONAL',
];

const SECTOR_PARTNERS = [
  { name: 'Raysons Group', desc: 'Industry & Realty' },
  { name: 'PictureTime', desc: 'Entertainment & Media' },
  { name: 'Loom Crafts', desc: 'Luxury & Architecture' },
  { name: 'Neora Deck', desc: 'Hospitality & Dining' },
  { name: 'Misu', desc: 'Pan-Asian Restaurant' },
  { name: 'RR Skins', desc: 'Clinical Dermatology' },
  { name: 'Blu Resorts', desc: 'Luxury Resorts' },
  { name: 'Qubice', desc: 'Design & Realty' },
  { name: 'Kanopy', desc: 'Bespoke Lifestyle' },
  { name: 'Citron', desc: 'Boutique Hospitality' },
  { name: 'DTK Karekar', desc: 'Luxury Retail' },
  { name: 'Western Command', desc: 'Indian Army Headquarters' },
  { name: '14 Corps', desc: 'Fire & Fury Corps' },
  { name: 'Fire & Fury', desc: 'Northern High-Altitude Theatre' },
];

export const WorkPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<typeof AROHANA_DATA.caseStudies[0] | null>(null);

  return (
    <div style={{ background: 'transparent', color: '#ffffff', minHeight: '100vh', paddingTop: '100px' }}>
      {/* 01 Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '100px 2rem 60px',
          maxWidth: '1360px',
          margin: '0 auto',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '12px',
              color: '#C5A46D',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            05 WORK
          </span>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}
          >
            THE WORK IS THE PROOF.
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: '#8A919D', lineHeight: 1.6 }}>
            We work with business owners, operators, and institutional leads who care about commercial performance as much as creative distinction.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {FILTERS.map((f) => {
            const isSelected = f === activeFilter;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-mono"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #C5A46D' : '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: isSelected ? '#C5A46D' : 'rgba(16, 22, 34, 0.7)',
                  color: isSelected ? '#0A0F14' : '#8A919D',
                  fontWeight: isSelected ? 700 : 400,
                  transition: 'all 0.25s ease',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* 02 Case Studies Grid */}
      <section style={{ padding: '100px 2rem', background: 'rgba(10, 15, 20, 0.65)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
          }}
        >
          {AROHANA_DATA.caseStudies.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedProject(c)}
              style={{
                padding: '2.5rem',
                background: 'rgba(16, 22, 34, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '380px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C5A46D';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700 }}>
                    {c.number}
                  </span>
                  <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>
                    CLICK TO EXPAND
                  </span>
                </div>
                <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
                  {c.name}
                </h2>
                <p className="font-mono" style={{ fontSize: '11px', color: '#8A919D', marginBottom: '1.2rem' }}>
                  {c.category}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#8A919D', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {c.summary}
                </p>
              </div>

              <div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px', marginBottom: '1.5rem' }}>
                  <span className="font-mono" style={{ fontSize: '9px', color: '#C5A46D', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    EXECUTIVE BRIEF
                  </span>
                  <p className="font-display" style={{ fontSize: '1rem', color: '#ffffff', lineHeight: 1.4 }}>
                    “{c.headline}”
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {c.impactMetrics.map((m, idx) => (
                    <div key={idx} style={{ padding: '8px', background: 'rgba(197, 164, 109, 0.05)', border: '1px solid rgba(197, 164, 109, 0.2)', borderRadius: '2px' }}>
                      <span className="font-display" style={{ fontSize: '1.2rem', color: '#ffffff', display: 'block' }}>{m.value}</span>
                      <span className="font-mono" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block' }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Individual Case Study Modal Showcase */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1050,
            background: 'rgba(5, 8, 17, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              maxWidth: '800px',
              width: '100%',
              background: '#0D1524',
              border: '1px solid #C5A46D',
              borderRadius: '2px',
              padding: '3rem',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700 }}>
                  {selectedProject.number}
                </span>
                <span className="font-mono" style={{ fontSize: '11px', color: '#8A919D', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  {selectedProject.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="font-mono"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                }}
              >
                CLOSE [✕]
              </button>
            </div>

            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '8px' }}>
              {selectedProject.name}
            </h2>

            <p className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', marginBottom: '1.5rem' }}>
              “{selectedProject.headline}”
            </p>

            <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.7, marginBottom: '2rem' }}>
              {selectedProject.summary}
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                VERIFIED PERFORMANCE DELIVERABLES
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {selectedProject.impactMetrics.map((m, idx) => (
                  <div key={idx} style={{ padding: '12px', background: 'rgba(197, 164, 109, 0.08)', border: '1px solid rgba(197, 164, 109, 0.3)', borderRadius: '2px' }}>
                    <span className="font-display" style={{ fontSize: '1.5rem', color: '#ffffff', display: 'block' }}>{m.value}</span>
                    <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#C5A46D',
                  color: '#0A0F14',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  padding: '12px 24px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                <span>COMMISSION SIMILAR BRIEF</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 03 Sector Coverage Grid */}
      <section style={{ padding: '100px 2rem', background: 'rgba(8, 14, 24, 0.7)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ maxWidth: '600px', marginBottom: '3rem' }}>
            <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              SECTOR COVERAGE
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '8px' }}>
              ACROSS SECTORS. ACROSS STORIES.
            </h2>
            <p style={{ fontSize: '1rem', color: '#8A919D' }}>
              Direct engagements across industry, luxury, hospitality, healthcare, and defence institutions.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {SECTOR_PARTNERS.map((p, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem 1rem',
                  backgroundColor: 'rgba(13, 21, 36, 0.85)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minHeight: '100px',
                }}
              >
                <span className="font-display" style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ffffff' }}>
                  {p.name}
                </span>
                <span className="font-mono" style={{ fontSize: '9px', color: '#8A919D', marginTop: '4px' }}>
                  {p.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Have a Project CTA */}
      <section style={{ padding: '100px 2rem', textAlign: 'center', background: 'transparent' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff' }}>
            HAVE A PROJECT TO BUILD?
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.6 }}>
            Let's evaluate your current commercial bottlenecks and structure a proven solution.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#C5A46D',
              color: '#0A0F14',
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              padding: '14px 28px',
              borderRadius: '2px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              marginTop: '1rem',
            }}
          >
            <span>START A CONVERSATION</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkPage;
