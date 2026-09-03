// src/components/sections/PrinciplesChapter.tsx
import React, { useState } from 'react';
import { AROHANA_DATA, type Principle } from '../../data/arohanaData';

export const PrinciplesChapter: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<Principle>(AROHANA_DATA.principles[0]);

  return (
    <section
      id="chapter-principles"
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
            [ THE STANDARD ] // OPERATING CODE
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
          WHAT WE BRING TO
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)' }}>
            EVERY ENGAGEMENT.
          </span>
        </h2>
      </div>

      {/* Grid: 6 Principle Tabs on Left, Active Detailed Principle on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Left List */}
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {AROHANA_DATA.principles.map((p) => {
            const isSelected = p.number === activePrinciple.number;
            return (
              <button
                key={p.number}
                onClick={() => setActivePrinciple(p)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.2rem 1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  background: isSelected ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.85rem', color: isSelected ? '#C5A46D' : 'rgba(255,255,255,0.4)' }}>
                    {p.number}
                  </span>
                  <span
                    className="font-display"
                    style={{
                      fontSize: '1.2rem',
                      color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.6)',
                      fontWeight: isSelected ? 500 : 300,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {p.title}
                  </span>
                </div>
                <span style={{ color: isSelected ? '#C5A46D' : 'transparent', fontSize: '0.9rem' }}>→</span>
              </button>
            );
          })}
        </div>

        {/* Right Active Principle Card */}
        <div
          className="glass-panel tactical-box"
          style={{
            padding: '3rem 2.5rem',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '380px',
            borderLeft: '3px solid #C5A46D',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.8rem' }}>
              <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.24em', color: '#C5A46D', textTransform: 'uppercase' }}>
                PRINCIPLE // {activePrinciple.number} · {activePrinciple.category}
              </span>
              <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                {activePrinciple.number} / 06
              </span>
            </div>

            <h3 className="font-display" style={{ fontSize: '2.2rem', color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.15, marginBottom: '1.2rem' }}>
              {activePrinciple.title}
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.76)', lineHeight: 1.7, fontWeight: 300 }}>
              {activePrinciple.description}
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', marginTop: '2rem' }}>
            <p className="font-mono" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: '8px' }}>
              “{activePrinciple.quote}”
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
              <span>VERIFIED STANDARD</span>
              <span style={{ color: '#C5A46D' }}>ACTIVE DISCIPLINE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
