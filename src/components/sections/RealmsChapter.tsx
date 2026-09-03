// src/components/sections/RealmsChapter.tsx
import React, { useState } from 'react';
import { AROHANA_DATA, type RealmItem } from '../../data/arohanaData';

export const RealmsChapter: React.FC = () => {
  const [activeRealm, setActiveRealm] = useState<RealmItem>(AROHANA_DATA.realms[0]);

  return (
    <section
      id="chapter-realms"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '120px 2.5rem',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      {/* Chapter Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C5A46D', animation: 'subtlePulse 2s infinite' }} />
          <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.6)' }}>
            OPERATIONAL THEATRES // 04 REALMS
          </span>
        </div>
        <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#C5A46D' }}>
          HOVER OR SELECT TO EXPLORE DEPTH
        </span>
      </div>

      {/* Interactive 4 Realms Spatial List */}
      <div style={{ margin: 'auto 0', padding: '3rem 0', display: 'flex', flexDirection: 'column' }}>
        {AROHANA_DATA.realms.map((realm) => {
          const isActive = realm.id === activeRealm.id;
          return (
            <div
              key={realm.id}
              onClick={() => setActiveRealm(realm)}
              onMouseEnter={() => setActiveRealm(realm)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1.5rem 0',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                paddingLeft: isActive ? '1.5rem' : '0rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '1.2rem',
                    letterSpacing: '0.1em',
                    color: isActive ? '#C5A46D' : 'rgba(255, 255, 255, 0.3)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {realm.number}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
                    fontWeight: isActive ? 500 : 300,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  {realm.name}
                </h3>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: isActive ? '#C5A46D' : 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  {realm.subtitle}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '4px',
                  }}
                >
                  {realm.location}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Realm Detailed Card */}
      <div
        className="glass-panel"
        style={{
          padding: '1.8rem 2.5rem',
          borderRadius: '2px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderLeft: `3px solid ${activeRealm.themeColor}`,
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: activeRealm.themeColor, textTransform: 'uppercase' }}>
            ACTIVE THEATRE // {activeRealm.name} ({activeRealm.subtitle})
          </span>
          <p style={{ fontSize: '1.05rem', color: '#ffffff', marginTop: '6px', lineHeight: 1.6, fontWeight: 300 }}>
            {activeRealm.description}
          </p>
        </div>

        <div className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255, 255, 255, 0.5)' }}>
          <span>RANGE OVER NARROW SPECIALIZATION</span>
        </div>
      </div>
    </section>
  );
};
