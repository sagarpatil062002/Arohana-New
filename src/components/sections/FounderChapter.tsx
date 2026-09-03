// src/components/sections/FounderChapter.tsx
import React from 'react';
import { AROHANA_DATA } from '../../data/arohanaData';

export const FounderChapter: React.FC = () => {
  const { name, role, subrole, quote, story, pillars } = AROHANA_DATA.founder;

  return (
    <section
      id="chapter-founder"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 2.5rem',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {/* Left Leadership Dossier */}
        <div
          className="glass-panel tactical-box"
          style={{
            padding: '3rem 2.5rem',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '440px',
          }}
        >
          <div>
            <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.24em', color: '#C5A46D' }}>
              PRINCIPAL ADVISORY // GROUND TRUTH
            </span>
            <h3 className="font-display" style={{ fontSize: '2.4rem', color: '#ffffff', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '0.5rem' }}>
              {name}
            </h3>
            <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.18em', display: 'block', marginTop: '4px' }}>
              {role}
            </span>
            <span className="font-mono" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', display: 'block', marginTop: '2px' }}>
              {subrole}
            </span>
          </div>

          {/* Pedigree Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', margin: '2.5rem 0' }}>
            {pillars.map((p) => (
              <div
                key={p.number}
                style={{
                  borderLeft: '2px solid rgba(197, 164, 109, 0.4)',
                  paddingLeft: '1.2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D' }}>{p.number}</span>
                  <span className="font-display" style={{ fontSize: '1.1rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                    {p.title}
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                  {p.detail}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px', fontWeight: 300 }}>
                  {p.note}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
            <span>OPERATIONAL PEDIGREE</span>
            <span>MUMBAI · GOA · LADAKH</span>
          </div>
        </div>

        {/* Right Narrative Philosophy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <blockquote
            className="font-display"
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              color: '#ffffff',
            }}
          >
            {quote}
          </blockquote>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {story.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.74)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
            <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C5A46D' }}>
              DIRECT ADVISORY MODEL
            </span>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
              No junior account executives. Direct partner accountability.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
