// src/pages/ServicesPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
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
        <div style={{ maxWidth: '900px' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '12px',
              color: '#C5A46D',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            04 SERVICES OVERVIEW
          </span>
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
            WHAT WE DO DEPENDS ON WHAT THE BUSINESS ACTUALLY NEEDS.
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: '#8A919D', lineHeight: 1.6, marginBottom: '2rem' }}>
            Ārohana can come in as an ongoing digital partner, a hospitality consultant, a content production partner or a combination of these.
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
            }}
          >
            <span>EXPLORE ALL SERVICES</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* 02 Practice Areas Grid */}
      <section style={{ padding: '100px 2rem', backgroundColor: '#0A0F14' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* 01 Digital Brand Growth */}
          <div
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
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                01
              </span>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
                DIGITAL BRAND GROWTH
              </h2>
              <p style={{ fontSize: '1rem', color: '#8A919D', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '480px' }}>
                Strategy-led digital presence, performance and communication that build your brand and grow your business.
              </p>
              <Link
                to="/contact"
                className="font-mono"
                style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#C5A46D', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>EXPLORE CAPABILITIES</span>
                <span>→</span>
              </Link>
            </div>
            <div style={{ padding: '2rem', background: '#0D1524', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                CORE COMPETENCY
              </span>
              <p className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1.4 }}>
                Brand Strategy · Market Positioning · Content Strategy · Acquisition Systems
              </p>
            </div>
          </div>

          {/* 02 Hospitality Consulting */}
          <div
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
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                02
              </span>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
                HOSPITALITY CONSULTING
              </h2>
              <p style={{ fontSize: '1rem', color: '#8A919D', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '480px' }}>
                From concept to operations — we design, streamline and optimize hospitality businesses for consistent experience and profitability.
              </p>
              <Link
                to="/contact"
                className="font-mono"
                style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#C5A46D', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>EXPLORE CAPABILITIES</span>
                <span>→</span>
              </Link>
            </div>
            <div style={{ padding: '2rem', background: '#0D1524', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                OPERATIONAL RIGOR
              </span>
              <p className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1.4 }}>
                Concept Feasibility · Menu Engineering · Food Cost Audits · Floor Choreography
              </p>
            </div>
          </div>

          {/* 03 Content & Brand Production */}
          <div
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
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                03
              </span>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
                CONTENT &amp; BRAND PRODUCTION
              </h2>
              <p style={{ fontSize: '1rem', color: '#8A919D', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '480px' }}>
                Films, brand stories and visual content that communicate clearly and create impact.
              </p>
              <Link
                to="/contact"
                className="font-mono"
                style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#C5A46D', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>EXPLORE CAPABILITIES</span>
                <span>→</span>
              </Link>
            </div>
            <div style={{ padding: '2rem', background: '#0D1524', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                CINEMATIC EXCELLENCE
              </span>
              <p className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1.4 }}>
                Documentary Films · 14,000+ FT High-Altitude Sets · Corporate Manifestos · Institutional Archives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Practice Framework */}
      <section style={{ padding: '100px 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#080E18' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ maxWidth: '700px', marginBottom: '4rem' }}>
            <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              PRACTICE FRAMEWORK
            </span>
            <h3 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
              WE REJECT STANDARDIZED TEMPLATE PACKAGES.
            </h3>
            <p style={{ fontSize: '1rem', color: '#8A919D', lineHeight: 1.7 }}>
              Strategy is mapped directly from business metrics, menu analysis, production protocols, and on-ground deployment parameters.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Framework 01 */}
            <div style={{ padding: '2rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '4px' }}>[01]</span>
              <h4 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1.5rem' }}>
                Digital Brand Growth
              </h4>
              <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                CAPABILITIES
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <li>✦ Brand Strategy</li>
                <li>✦ Market Positioning</li>
                <li>✦ Strategic Communication</li>
                <li>✦ Content Strategy</li>
                <li>✦ Social Media Management</li>
                <li>✦ Creative Direction</li>
                <li>✦ Copywriting &amp; Tone of Voice</li>
              </ul>
            </div>

            {/* Framework 02 */}
            <div style={{ padding: '2rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '4px' }}>[02]</span>
              <h4 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1.5rem' }}>
                Hospitality Consulting
              </h4>
              <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                CAPABILITIES
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <li>✦ Concept Development &amp; Feasibility</li>
                <li>✦ Spatial &amp; Customer Journey Mapping</li>
                <li>✦ Menu Creation &amp; Culinary Direction</li>
                <li>✦ Menu Engineering &amp; Margin Audits</li>
                <li>✦ Recipe &amp; Product Standardization</li>
                <li>✦ Pricing &amp; Food Cost Control</li>
                <li>✦ Kitchen Systems &amp; Workflow Layouts</li>
              </ul>
            </div>

            {/* Framework 03 */}
            <div style={{ padding: '2rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '4px' }}>[03]</span>
              <h4 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1.5rem' }}>
                Content &amp; Brand Production
              </h4>
              <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                CAPABILITIES
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                <li>✦ Corporate Films &amp; Institutional Manifestos</li>
                <li>✦ Brand Films &amp; Origin Story Documentaries</li>
                <li>✦ High-Altitude &amp; Demanding Field Documentaries</li>
                <li>✦ Institutional &amp; Defence Documentation</li>
                <li>✦ Campaign Launch Films &amp; Commercials</li>
                <li>✦ Promotional Films &amp; Product Showcases</li>
                <li>✦ Vertical Video (Reels &amp; Short Form)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Explore Custom Scope CTA */}
      <section style={{ padding: '100px 2rem', textAlign: 'center', backgroundColor: '#0A0F14' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff' }}>
            EXPLORE A CUSTOM SCOPE
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.6 }}>
            Need an assessment of your digital pipeline, hospitality margins, or production scope?
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
            <span>START A CONVERSATION</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
