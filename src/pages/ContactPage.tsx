// src/pages/ContactPage.tsx
import React, { useState } from 'react';

const INTERESTS = [
  'Digital Brand Growth',
  'Hospitality Consulting',
  'Content & Brand Production',
  'Defence & Special Documentation',
  'Tourin Experiential Journeys',
];

export const ContactPage: React.FC = () => {
  const [selectedInterest, setSelectedInterest] = useState('Digital Brand Growth');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: 'transparent', color: '#ffffff', minHeight: '100vh', paddingTop: '100px' }}>
      {/* 01 Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '100px 2rem 60px',
          maxWidth: '1360px',
          margin: '0 auto',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700 }}>09</span>
            <span className="font-mono" style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#8A919D', textTransform: 'uppercase' }}>
              CONTACT
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
            START A CONVERSATION.
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: '#8A919D', lineHeight: 1.6 }}>
            Tell us what you are trying to build, fix or change.
          </p>
        </div>
      </section>

      {/* 02 Form & Direct Channels Grid */}
      <section style={{ padding: '100px 2rem', backgroundColor: '#0A0F14' }}>
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Form Side */}
          <div style={{ padding: '3rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <span style={{ fontSize: '2.5rem', color: '#C5A46D', display: 'block', marginBottom: '1rem' }}>✓</span>
                <h3 className="font-display" style={{ fontSize: '1.8rem', color: '#ffffff', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  ENQUIRY DISPATCHED
                </h3>
                <p style={{ fontSize: '1rem', color: '#8A919D', lineHeight: 1.6 }}>
                  Thank you, {formData.name || 'Partner'}. Your brief has been received directly by Madhura and the principal team. We will review and respond within 24 operational hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label className="font-mono" style={{ fontSize: '11px', color: '#8A919D', letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                    I'M INTERESTED IN
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {INTERESTS.map((item) => {
                      const isSel = item === selectedInterest;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSelectedInterest(item)}
                          className="font-mono"
                          style={{
                            fontSize: '11px',
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                            border: isSel ? '1px solid #C5A46D' : '1px solid rgba(255,255,255,0.1)',
                            backgroundColor: isSel ? '#C5A46D' : '#0D1524',
                            color: isSel ? '#0A0F14' : '#8A919D',
                            fontWeight: isSel ? 700 : 400,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label className="font-mono" style={{ fontSize: '11px', color: '#8A919D', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sagar Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#0D1524',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        borderRadius: '2px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ fontSize: '11px', color: '#8A919D', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#0D1524',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        borderRadius: '2px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label className="font-mono" style={{ fontSize: '11px', color: '#8A919D', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#0D1524',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        borderRadius: '2px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ fontSize: '11px', color: '#8A919D', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                      COMPANY / BRAND
                    </label>
                    <input
                      type="text"
                      placeholder="Enterprise or Venture Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: '#0D1524',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        borderRadius: '2px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono" style={{ fontSize: '11px', color: '#8A919D', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                    TELL US MORE ABOUT THE CHALLENGE
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe what you are trying to build, fix or change..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#0D1524',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
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
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#C5A46D',
                    color: '#0A0F14',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    padding: '14px 28px',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginTop: '0.5rem',
                  }}
                >
                  <span>SEND ENQUIRY</span>
                  <span>→</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Channels & Active Bases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Direct Channels */}
            <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>
                DIRECT CHANNELS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem' }}>
                <div>
                  <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    EMAIL
                  </span>
                  <a href="mailto:hello@arohana.co.in" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500 }}>
                    hello@arohana.co.in
                  </a>
                </div>

                <div>
                  <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    TELEPHONE
                  </span>
                  <a href="tel:+919876543210" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500 }}>
                    +91 98765 43210
                  </a>
                </div>

                <div>
                  <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    BASE
                  </span>
                  <span style={{ color: '#8A919D' }}>Kolhapur, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Active Bases */}
            <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                ACTIVE SECTORS &amp; BASES
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                <span style={{ padding: '6px 12px', borderRadius: '9999px', background: '#0D1524', border: '1px solid rgba(255,255,255,0.1)', fontSize: '11px', fontFamily: 'Space Mono, monospace', color: '#8A919D' }}>
                  Kolhapur
                </span>
                <span style={{ padding: '6px 12px', borderRadius: '9999px', background: '#0D1524', border: '1px solid rgba(255,255,255,0.1)', fontSize: '11px', fontFamily: 'Space Mono, monospace', color: '#8A919D' }}>
                  Goa
                </span>
                <span style={{ padding: '6px 12px', borderRadius: '9999px', background: '#0D1524', border: '1px solid rgba(255,255,255,0.1)', fontSize: '11px', fontFamily: 'Space Mono, monospace', color: '#8A919D' }}>
                  Delhi
                </span>
                <span style={{ padding: '6px 12px', borderRadius: '9999px', background: '#0D1524', border: '1px solid rgba(255,255,255,0.1)', fontSize: '11px', fontFamily: 'Space Mono, monospace', color: '#8A919D' }}>
                  Ladakh
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6 }}>
                We deploy multidisciplinary teams pan-India, with on-ground execution experience across major metros, coastal hospitality hubs, and high-altitude frontier terrains.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
