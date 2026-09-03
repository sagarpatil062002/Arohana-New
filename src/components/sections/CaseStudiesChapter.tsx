// src/components/sections/CaseStudiesChapter.tsx
import React, { useState } from 'react';
import { AROHANA_DATA, type CaseStudy } from '../../data/arohanaData';

export const CaseStudiesChapter: React.FC = () => {
  const [activeCase, setActiveCase] = useState<CaseStudy>(AROHANA_DATA.caseStudies[0]);

  return (
    <section
      id="chapter-cases"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 2.5rem',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A46D' }} />
          <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#C5A46D' }}>
            [ 06 CASE STUDIES ] // SELECTED ENTERPRISE COMMISSIONS
          </span>
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: '#ffffff',
          }}
        >
          A FEW BUSINESSES
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)' }}>
            WE'VE HELPED BUILD.
          </span>
        </h2>
      </div>

      {/* Case Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          scrollbarWidth: 'none',
        }}
      >
        {AROHANA_DATA.caseStudies.map((c) => {
          const isSelected = c.id === activeCase.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCase(c)}
              className="tactical-box"
              style={{
                padding: '10px 18px',
                border: isSelected ? '1px solid #C5A46D' : '1px solid rgba(255,255,255,0.1)',
                background: isSelected ? 'rgba(197, 164, 109, 0.15)' : 'rgba(255,255,255,0.02)',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <span className="font-mono" style={{ fontSize: '10px', color: isSelected ? '#C5A46D' : 'rgba(255,255,255,0.4)' }}>
                {c.number}
              </span>
              <span
                className="font-display"
                style={{
                  fontSize: '0.95rem',
                  color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Case Study Dossier Card */}
      <div
        className="glass-panel tactical-box"
        style={{
          padding: '3rem 2.5rem',
          borderRadius: '2px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          minHeight: '440px',
          borderLeft: '3px solid #C5A46D',
        }}
      >
        {/* Left Column: Context & Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D' }}>
                CASE {activeCase.number} // {activeCase.tag}
              </span>
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                color: '#ffffff',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              {activeCase.name}
            </h3>
            <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '1.5rem' }}>
              {activeCase.category} · {activeCase.location}
            </span>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, fontWeight: 300 }}>
              {activeCase.summary}
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', marginTop: '2rem' }}>
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A46D', textTransform: 'uppercase' }}>
              LOCATION &amp; THEATRE:
            </span>
            <div className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
              {activeCase.location}
            </div>
          </div>
        </div>

        {/* Right Column: Strategic Headline & Impact Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div
            style={{
              padding: '2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '2px',
            }}
          >
            <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C5A46D', display: 'block', marginBottom: '8px' }}>
              EXECUTIVE BRIEF:
            </span>
            <p className="font-display" style={{ fontSize: '1.35rem', color: '#ffffff', lineHeight: 1.4, fontWeight: 400 }}>
              “{activeCase.headline}”
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C5A46D', display: 'block', marginBottom: '1rem' }}>
              VERIFIED IMPACT METRICS:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {activeCase.impactMetrics.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.2rem',
                    background: 'rgba(197, 164, 109, 0.05)',
                    border: '1px solid rgba(197, 164, 109, 0.2)',
                    borderRadius: '2px',
                  }}
                >
                  <span className="font-display" style={{ fontSize: '1.6rem', color: '#ffffff', display: 'block' }}>
                    {m.value}
                  </span>
                  <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', marginTop: '4px', display: 'block' }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
