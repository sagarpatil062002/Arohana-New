// src/components/sections/ExecutionChapter.tsx
import React from 'react';
import { AROHANA_DATA } from '../../data/arohanaData';

export const ExecutionChapter: React.FC = () => {
  const { headline, subline, overview, items } = AROHANA_DATA.proof;

  return (
    <section
      id="chapter-execution"
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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '2rem',
          marginBottom: '4rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A46D' }} />
            <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#C5A46D' }}>
              [ PROOF OF WORK ] // EMPIRICAL RIGOR
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
            {headline}
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)' }}>
              {subline}
            </span>
          </h2>
        </div>

        <p
          className="font-mono"
          style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '440px',
            lineHeight: 1.7,
          }}
        >
          {overview}
        </p>
      </div>

      {/* 4 Proof Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {items.map((item) => (
          <div
            key={item.number}
            className="glass-panel tactical-box"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '340px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#C5A46D' }}>
                  {item.number} // {item.label}
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 300,
                    color: '#ffffff',
                    lineHeight: 1,
                  }}
                >
                  {item.metric}
                </span>
              </div>

              <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '8px' }}>
                {item.title}
              </span>
              <h3 className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1.35, marginBottom: '1rem' }}>
                {item.headline}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.65, fontWeight: 300 }}>
                {item.description}
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1rem',
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '9px',
                fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              <span>{item.metricLabel}</span>
              <span style={{ color: '#C5A46D' }}>VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
