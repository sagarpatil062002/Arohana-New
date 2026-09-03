// src/components/sections/HeroChapter.tsx
import React from 'react';
import { AROHANA_DATA } from '../../data/arohanaData';

interface HeroChapterProps {
  onExplore: () => void;
}

const CLIENTS = [
  'Raysons Group', 'PictureTime Entertainment', 'Loom Crafts', 'Neora Deck',
  'Misu', 'RR Skins', 'Blu Resorts', 'Passcode Hospitality',
  'Western Command', '14 Corps (Fire & Fury)', 'Qubice', 'Kanopy', 'Citron',
  'DTK Karekar', 'Project SHE', 'Border Roads Organisation'
];

export const HeroChapter: React.FC<HeroChapterProps> = ({ onExplore }) => {
  return (
    <section
      id="chapter-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '120px 2.5rem 40px',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      {/* Top Meta Line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A46D' }} />
          <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.28em', color: '#C5A46D' }}>
            {AROHANA_DATA.hero.tagline}
          </span>
        </div>
        <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>
          [ {AROHANA_DATA.meta.coordinates} ]
        </span>
      </div>

      {/* Monumental Kinetic Headline */}
      <div style={{ margin: 'auto 0', padding: '2rem 0', maxWidth: '1100px' }}>
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 6.2rem)',
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#ffffff',
            textShadow: '0 10px 40px rgba(0,0,0,0.8)',
          }}
        >
          <span style={{ display: 'block' }}>WE BUILD BRANDS,</span>
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.88)' }}>BUSINESSES &amp;</span>
          <span style={{ display: 'block', color: '#F3EFE6', textShadow: '0 0 30px rgba(197, 164, 109, 0.3)' }}>
            EXPERIENCES.
          </span>
        </h1>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
          <p
            className="font-mono"
            style={{
              fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}
          >
            {AROHANA_DATA.hero.subtext}
          </p>

          <button
            onClick={onExplore}
            className="font-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem',
              letterSpacing: '0.18em',
              color: '#ffffff',
              borderBottom: '1px solid #C5A46D',
              paddingBottom: '4px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
            }}
          >
            <span>SCROLL TO ENTER DEPTH</span>
            <span style={{ color: '#C5A46D', transition: 'transform 0.3s' }}>↓</span>
          </button>
        </div>
      </div>

      {/* Marquee Institutional & Client Ticker */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '1.2rem 0',
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', whiteSpace: 'nowrap', animation: 'marqueeScroll 40s linear infinite' }}>
          {[...CLIENTS, ...CLIENTS].map((client, idx) => (
            <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem' }}>
              <span className="font-display" style={{ fontSize: '1.1rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                {client}
              </span>
              <span style={{ color: '#C5A46D', fontSize: '0.8rem' }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Keyframes for Marquee */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
