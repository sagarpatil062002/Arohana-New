// src/components/sections/ContactChapter.tsx
import React, { useState } from 'react';
import { AROHANA_DATA } from '../../data/arohanaData';

export const ContactChapter: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', brief: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="chapter-contact"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '120px 2.5rem 60px',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      {/* Centerpiece Climax Dialogue */}
      <div style={{ margin: 'auto 0', padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Glowing Monogram Ā */}
        <div
          className="font-serif"
          style={{
            fontSize: '5rem',
            color: '#C5A46D',
            lineHeight: 1,
            marginBottom: '1.5rem',
            textShadow: '0 0 35px rgba(197, 164, 109, 0.5)',
          }}
        >
          Ā
        </div>

        <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#C5A46D', textTransform: 'uppercase', marginBottom: '1rem' }}>
          THE CONVERSATION STARTS HERE
        </span>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
            fontWeight: 400,
            textTransform: 'uppercase',
            color: '#ffffff',
            lineHeight: 1.05,
            maxWidth: '960px',
            marginBottom: '2rem',
          }}
        >
          IF YOU'RE BUILDING SOMETHING SERIOUS,
          <span style={{ display: 'block', color: '#C5A46D' }}>LET'S TALK.</span>
        </h2>

        {/* Interactive Brief Form or Confirmation */}
        <div style={{ width: '100%', maxWidth: '640px', marginTop: '1.5rem' }}>
          {formSubmitted ? (
            <div
              className="glass-panel"
              style={{
                padding: '2.5rem',
                borderRadius: '2px',
                border: '1px solid #C5A46D',
                background: 'rgba(197, 164, 109, 0.08)',
              }}
            >
              <h3 className="font-display" style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.8rem' }}>
                TRANSMISSION RECEIVED
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                Thank you, {formData.name || 'Partner'}. Madhura and the principal team will review your brief directly. Expect an executive response within 24 operational hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel tactical-box" style={{ padding: '2.5rem', borderRadius: '2px', textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#C5A46D', display: 'block', marginBottom: '6px' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g., Vikram Singhania"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#C5A46D', display: 'block', marginBottom: '6px' }}>
                    ORGANIZATION / BRAND
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="E.g., Enterprise Group"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#C5A46D', display: 'block', marginBottom: '6px' }}>
                  DIRECT EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    borderRadius: '2px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#C5A46D', display: 'block', marginBottom: '6px' }}>
                  NATURE OF ENGAGEMENT / BRIEF
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder="Outline your commercial challenge, scale, or operating model..."
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    borderRadius: '2px',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                className="font-mono"
                style={{
                  width: '100%',
                  background: '#C5A46D',
                  color: '#04070e',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.22em',
                  padding: '14px 20px',
                  borderRadius: '2px',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                }}
              >
                DISPATCH BRIEF TO LEADERSHIP →
              </button>
            </form>
          )}

          {/* Direct Email Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <a
              href={`mailto:${AROHANA_DATA.meta.contactEmail}`}
              className="font-mono"
              style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#C5A46D', textDecoration: 'underline' }}
            >
              {AROHANA_DATA.meta.contactEmail}
            </a>
            <a
              href={`mailto:${AROHANA_DATA.meta.directEmail}`}
              className="font-mono"
              style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', textDecoration: 'underline' }}
            >
              {AROHANA_DATA.meta.directEmail} (Direct)
            </a>
          </div>
        </div>
      </div>

      {/* Sovereign Colophon Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          fontSize: '11px',
          fontFamily: 'Space Mono, monospace',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#C5A46D' }}>Ā</span>
          <span>ĀROHANA CONSULTANCY // {AROHANA_DATA.meta.territories}</span>
        </div>
        <span>{AROHANA_DATA.meta.archiveCode}</span>
      </footer>
    </section>
  );
};
