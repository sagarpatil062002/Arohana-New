// src/components/sections/CapabilitiesChapter.tsx
import React, { useState } from 'react';
import { AROHANA_DATA, type Capability } from '../../data/arohanaData';

export const CapabilitiesChapter: React.FC = () => {
  const [activeCap, setActiveCap] = useState<Capability>(AROHANA_DATA.capabilities[0]);

  return (
    <section
      id="chapter-capabilities"
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
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A46D' }} />
          <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#C5A46D' }}>
            [ 03 PRACTICE AREAS ] // SPATIAL ARCHITECTURE
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
          ENGINEERED CAPABILITY.
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)' }}>
            COMMERCIAL IMPACT.
          </span>
        </h2>
      </div>

      {/* Grid: 3 Interactive Capability Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {AROHANA_DATA.capabilities.map((cap) => {
          const isSelected = cap.id === activeCap.id;
          return (
            <div
              key={cap.id}
              onClick={() => setActiveCap(cap)}
              className="glass-panel tactical-box"
              style={{
                padding: '2.5rem 2rem',
                borderRadius: '2px',
                cursor: 'pointer',
                border: isSelected ? '1px solid #C5A46D' : '1px solid rgba(255,255,255,0.08)',
                background: isSelected ? 'rgba(197, 164, 109, 0.08)' : 'rgba(10, 16, 26, 0.45)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '400px',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                  <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#C5A46D' }}>
                    {cap.number} // PRACTICE
                  </span>
                  {isSelected && (
                    <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A46D' }}>
                      ACTIVE
                    </span>
                  )}
                </div>

                <h3 className="font-display" style={{ fontSize: '1.8rem', color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '1rem' }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.5rem' }}>
                  {cap.summary}
                </p>
              </div>

              <div>
                <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>
                  SPECIALIZED SCOPE:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {cap.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono"
                      style={{
                        fontSize: '9px',
                        color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '3px 8px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '2px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
