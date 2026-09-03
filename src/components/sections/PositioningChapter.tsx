// src/components/sections/PositioningChapter.tsx
import React from 'react';
import { AROHANA_DATA } from '../../data/arohanaData';

export const PositioningChapter: React.FC = () => {
  const { kicker, statementPrimary, statementSecondary, intersection, reality } = AROHANA_DATA.positioning;

  return (
    <section
      id="chapter-positioning"
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
        {/* Left Editorial Narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A46D' }} />
            <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.28em', color: '#C5A46D' }}>
              {kicker}
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4.8vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            <span>{statementPrimary}</span>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.45)', marginTop: '0.6rem' }}>
              {statementSecondary}
            </span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '2rem',
              marginTop: '1rem',
            }}
          >
            <div>
              <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C5A46D', display: 'block', marginBottom: '8px' }}>
                {intersection.title}
              </span>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, fontWeight: 300 }}>
                {intersection.text}
              </p>
            </div>

            <div>
              <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C5A46D', display: 'block', marginBottom: '8px' }}>
                {reality.title}
              </span>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, fontWeight: 300 }}>
                {reality.text}
              </p>
            </div>
          </div>
        </div>

        {/* Right Tactical Spatial Card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="glass-panel tactical-box"
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '2.5rem',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '360px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.24em', color: '#C5A46D' }}>
                DISCIPLINE // 03 PILLARS
              </span>
              <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
                [ FIG. 01 ]
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', margin: '2rem 0' }}>
              <div style={{ padding: '1rem', borderLeft: '2px solid #C5A46D', background: 'rgba(197, 164, 109, 0.05)' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.15em' }}>01</span>
                <h4 className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', marginTop: '2px' }}>COMMERCIAL STRATEGY</h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Unit economics, market positioning, P&amp;L viability.</p>
              </div>

              <div style={{ padding: '1rem', borderLeft: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255, 255, 255, 0.02)' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>02</span>
                <h4 className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', marginTop: '2px' }}>CREATIVE ARCHITECTURE</h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Design systems, cinematic media, visual identity.</p>
              </div>

              <div style={{ padding: '1rem', borderLeft: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255, 255, 255, 0.02)' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>03</span>
                <h4 className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', marginTop: '2px' }}>OPERATIONAL EXECUTION</h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>Kitchen pass SOPs, high-altitude field deployment.</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'Space Mono, monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em' }}>
              <span>CONVERGENCE MATRIX</span>
              <span style={{ color: '#C5A46D' }}>VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
