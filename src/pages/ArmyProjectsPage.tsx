// src/pages/ArmyProjectsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AROHANA_DATA } from '../data/arohanaData';

export const ArmyProjectsPage: React.FC = () => {
  return (
    <div style={{ background: 'transparent', color: '#ffffff', minHeight: '100vh', paddingTop: '100px' }}>
      {/* 01 Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '100px 2rem 80px',
          maxWidth: '1360px',
          margin: '0 auto',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700 }}>07</span>
            <span className="font-mono" style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#8A919D', textTransform: 'uppercase' }}>
              ARMY PROJECTS
            </span>
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}
          >
            BUILT FOR MISSIONS THAT MATTER.
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: '#8A919D', lineHeight: 1.6 }}>
            Communication and content for the Indian Army across units, events and operations. Clarity. Respect. Responsibility.
          </p>
        </div>

        {/* 3 Featured Units Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
            <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
              WESTERN COMMAND
            </h3>
            <p className="font-mono" style={{ fontSize: '12px', color: '#C5A46D' }}>Official Projects</p>
          </div>

          <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
            <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
              14 CORPS
            </h3>
            <p className="font-mono" style={{ fontSize: '12px', color: '#C5A46D' }}>Official Projects</p>
          </div>

          <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
            <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
              FIRE &amp; FURY
            </h3>
            <p className="font-mono" style={{ fontSize: '12px', color: '#C5A46D' }}>A Documentary Film</p>
          </div>
        </div>

        {/* 4 Defence Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2.5rem',
          }}
        >
          <div style={{ padding: '1.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
            <span className="font-display" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>14K+</span>
            <span className="font-mono" style={{ fontSize: '11px', color: '#8A919D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>FT Elevation Theatres</span>
          </div>

          <div style={{ padding: '1.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
            <span className="font-display" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>100%</span>
            <span className="font-mono" style={{ fontSize: '11px', color: '#8A919D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Protocol Compliance</span>
          </div>

          <div style={{ padding: '1.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
            <span className="font-display" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>5+</span>
            <span className="font-mono" style={{ fontSize: '11px', color: '#8A919D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Military Commands</span>
          </div>

          <div style={{ padding: '1.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
            <span className="font-display" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>0</span>
            <span className="font-mono" style={{ fontSize: '11px', color: '#8A919D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>OPSEC Violations</span>
          </div>
        </div>
      </section>

      {/* 02 Verified Military Archives */}
      <section style={{ padding: '100px 2rem', backgroundColor: '#0A0F14', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ maxWidth: '600px', marginBottom: '4rem' }}>
            <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              OPERATIONAL ENGAGEMENTS
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff' }}>
              VERIFIED MILITARY SECTOR ARCHIVES
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {AROHANA_DATA.armyProjects.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '3rem',
                  background: '#101622',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '3rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', fontWeight: 700 }}>
                      [ {item.number} ]
                    </span>
                    <span className="font-mono" style={{ fontSize: '11px', color: '#8A919D', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      {item.formation}
                    </span>
                  </div>

                  <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '8px' }}>
                    {item.title}
                  </h2>
                  <p className="font-mono" style={{ fontSize: '11px', color: '#8A919D', marginBottom: '1.2rem' }}>
                    Theatre: {item.theatre} · Elevation: {item.elevation}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: '#8A919D', lineHeight: 1.7, marginBottom: '2rem' }}>
                    {item.description}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.2rem' }}>
                    <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      OPERATIONAL PROTOCOLS OBSERVED:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      {item.protocols.map((p, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#C5A46D' }}>✓</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '2.5rem', background: '#0D1524', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px', textAlign: 'center' }}>
                  <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#C5A46D', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                    CLASSIFICATION: UNCLASSIFIED PUBLIC ARCHIVE
                  </span>
                  <p className="font-display" style={{ fontSize: '1.4rem', color: '#ffffff', textTransform: 'uppercase' }}>
                    {item.title}
                  </p>
                  <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', marginTop: '10px', display: 'block' }}>
                    OPERATIONAL PROTOCOL COMPLIANCE VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 Institutional Engagements CTA */}
      <section style={{ padding: '100px 2rem', textAlign: 'center', backgroundColor: '#080E18' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff' }}>
            INSTITUTIONAL ENGAGEMENTS
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.6 }}>
            For military historical archiving, documentary commissions, and commemorative visual direction.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#C5A46D',
              color: '#0A0F14',
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              padding: '14px 28px',
              borderRadius: '2px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              marginTop: '1rem',
            }}
          >
            <span>INITIATE FORMAL INQUIRY</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ArmyProjectsPage;
