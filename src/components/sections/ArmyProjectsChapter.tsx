// src/components/sections/ArmyProjectsChapter.tsx
import React, { useState } from 'react';
import { AROHANA_DATA, type ArmyProject } from '../../data/arohanaData';

export const ArmyProjectsChapter: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ArmyProject>(AROHANA_DATA.armyProjects[0]);

  return (
    <section
      id="chapter-army"
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
      {/* Chapter Title */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff3344', animation: 'subtlePulse 1.8s infinite' }} />
          <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#C5A46D' }}>
            [ SPECIAL ENGAGEMENTS ] // DEFENCE &amp; INSTITUTIONAL MEDIA
          </span>
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.2rem, 5.2vw, 4.8rem)',
            fontWeight: 400,
            textTransform: 'uppercase',
            color: '#ffffff',
            lineHeight: 1.05,
          }}
        >
          INDIAN ARMY PROJECTS
          <span
            className="font-mono"
            style={{
              display: 'block',
              fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.16em',
              fontWeight: 300,
              marginTop: '0.6rem',
            }}
          >
            WESTERN COMMAND · 14 CORPS · REZANG LA · LADAKH
          </span>
        </h2>
      </div>

      {/* Grid: Tactical Selector on Left, Active Dossier on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Left List of Formations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {AROHANA_DATA.armyProjects.map((item) => {
            const isSelected = item.id === activeProject.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveProject(item)}
                className="tactical-box"
                style={{
                  textAlign: 'left',
                  padding: '1.4rem 1.6rem',
                  border: isSelected ? '1px solid #C5A46D' : '1px solid rgba(255,255,255,0.08)',
                  background: isSelected ? 'rgba(197, 164, 109, 0.08)' : 'rgba(10, 16, 26, 0.4)',
                  borderRadius: '2px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span className="font-mono" style={{ fontSize: '10px', color: isSelected ? '#C5A46D' : 'rgba(255,255,255,0.4)' }}>
                      {item.number}
                    </span>
                    <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                      {item.formation}
                    </span>
                  </div>
                  <h4 className="font-display" style={{ fontSize: '1.1rem', color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                    {item.title}
                  </h4>
                </div>
                <span className="font-mono" style={{ fontSize: '10px', color: isSelected ? '#C5A46D' : 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                  {item.elevation}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Active Tactical Dossier Card */}
        <div
          className="glass-panel tactical-box"
          style={{
            padding: '2.5rem',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '440px',
            borderLeft: '3px solid #C5A46D',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.24em', color: '#C5A46D', textTransform: 'uppercase' }}>
                THEATRE // {activeProject.theatre}
              </span>
              <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                ELEVATION: {activeProject.elevation}
              </span>
            </div>

            <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
              {activeProject.formation}
            </span>
            <h3 className="font-display" style={{ fontSize: '1.8rem', color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '1.2rem' }}>
              {activeProject.title}
            </h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, fontWeight: 300 }}>
              {activeProject.description}
            </p>
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C5A46D', display: 'block', marginBottom: '8px' }}>
              SECURITY &amp; DOCUMENTATION PROTOCOLS:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {activeProject.protocols.map((protocol, idx) => (
                <span
                  key={idx}
                  className="font-mono"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(255,255,255,0.04)',
                    padding: '4px 10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '2px',
                  }}
                >
                  {protocol}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
