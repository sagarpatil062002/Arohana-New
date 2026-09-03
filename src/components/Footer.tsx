// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#030509',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#ffffff',
        padding: '5rem 0 3rem',
        userSelect: 'none',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Top Tier */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '3.5rem',
            gap: '2rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#C5A46D',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  border: '1px solid rgba(197, 164, 109, 0.4)',
                  borderRadius: '2px',
                  background: 'rgba(197, 164, 109, 0.08)',
                }}
              >
                Ā
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="font-display" style={{ fontSize: '1.2rem', letterSpacing: '0.22em', color: '#ffffff' }}>
                  ĀROHANA
                </span>
                <span className="font-mono" style={{ fontSize: '8px', letterSpacing: '0.24em', color: '#C5A46D' }}>
                  CONSULTANCY
                </span>
              </div>
            </Link>
            <p className="font-display" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', letterSpacing: '-0.01em', maxWidth: '500px' }}>
              We build brands, businesses &amp; experiences.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'flex-start' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.24em', color: '#C5A46D', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                DIRECT ADVISORY
              </span>
              <a href="mailto:hello@arohana.co.in" className="font-mono" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>
                hello@arohana.co.in
              </a>
            </div>
            <div>
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.24em', color: '#C5A46D', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                TELEPHONE
              </span>
              <a href="tel:+919876543210" className="font-mono" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Links Tier */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2.5rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            gap: '1.5rem',
            fontSize: '11px',
            fontFamily: 'Space Mono, monospace',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.8rem', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>About</Link>
            <Link to="/services" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Services</Link>
            <Link to="/work" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Work</Link>
            <Link to="/army-projects" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Army Projects</Link>
            <Link to="/tourin" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Tourin</Link>
            <Link to="/contact" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Contact</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.12em' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>OPERATING HUBS:</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>KOLHAPUR · GOA · DELHI · LADAKH</span>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'rgba(255, 255, 255, 0.4)',
            textTransform: 'uppercase',
          }}
        >
          <span>© 2026 ĀROHANA CONSULTANCY. ALL RIGHTS RESERVED.</span>
          <span>CULTURAL · COMMERCIAL · CINEMATIC</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
