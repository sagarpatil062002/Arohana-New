// src/components/sections/TourinChapter.tsx
import React from 'react';
import { AROHANA_DATA } from '../../data/arohanaData';

export const TourinChapter: React.FC = () => {
  const { title, descriptor, quote, description, stats } = AROHANA_DATA.tourin;

  return (
    <section
      id="chapter-tourin"
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
        className="glass-panel tactical-box"
        style={{
          width: '100%',
          padding: '4rem 3.5rem',
          borderRadius: '2px',
          borderLeft: '4px solid #C5A46D',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5A46D', animation: 'subtlePulse 2s infinite' }} />
          <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.28em', color: '#C5A46D' }}>
            {descriptor}
          </span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
            fontWeight: 400,
            textTransform: 'uppercase',
            color: '#ffffff',
            lineHeight: 1.02,
            marginBottom: '2rem',
          }}
        >
          {title}
        </h2>

        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1.25rem, 2.2vw, 1.8rem)',
            color: '#F3EFE6',
            lineHeight: 1.4,
            fontWeight: 300,
            fontStyle: 'italic',
            maxWidth: '840px',
            marginBottom: '2rem',
          }}
        >
          {quote}
        </p>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: '820px',
            marginBottom: '3rem',
          }}
        >
          {description}
        </p>

        {/* 4 Expedition Metric Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2.5rem',
          }}
        >
          {stats.map((s, idx) => (
            <div key={idx}>
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 400,
                  color: '#C5A46D',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                {s.value}
              </span>
              <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '6px', display: 'block' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
