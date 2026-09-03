// src/pages/TourinPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const TourinPage: React.FC = () => {
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
            <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700 }}>08</span>
            <span className="font-mono" style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#8A919D', textTransform: 'uppercase' }}>
              TOURIN
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
            <span style={{ display: 'block' }}>TRAVEL BEYOND</span>
            <span style={{ display: 'block' }}>THE ITINERARY.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: '#8A919D', lineHeight: 1.6, marginBottom: '2rem' }}>
            The Ladakh people experience and the Ladakh most itineraries sell are not always the same. Ladakh is the beginning, not the boundary.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href="#curation-pillars"
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
              <span>EXPLORE EXPERIENCES</span>
              <span>↓</span>
            </a>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '14px 28px',
                borderRadius: '2px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <span>TALK TO US</span>
              <span style={{ color: '#C5A46D' }}>→</span>
            </Link>
          </div>
        </div>

        {/* 4 Expedition Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2.5rem',
          }}
        >
          <div style={{ padding: '1.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '2px' }}>
            <span className="font-display" style={{ fontSize: '2.4rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>15+</span>
            <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', textTransform: 'uppercase', letterSpacing: '0.12em' }}>SEPARATE BOOKINGS COMPLETED</span>
          </div>

          <div style={{ padding: '1.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '2px' }}>
            <span className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#C5A46D', display: 'block' }}>20-BIKER GROUP</span>
            <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', textTransform: 'uppercase', letterSpacing: '0.12em' }}>LADAKH EXPEDITION</span>
          </div>

          <div style={{ padding: '1.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '2px' }}>
            <span className="font-display" style={{ fontSize: '2.4rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>14,000 FT</span>
            <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', textTransform: 'uppercase', letterSpacing: '0.12em' }}>PEAK ELEVATION</span>
          </div>

          <div style={{ padding: '1.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '2px' }}>
            <span className="font-display" style={{ fontSize: '2.4rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>100%</span>
            <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', textTransform: 'uppercase', letterSpacing: '0.12em' }}>LOCAL GROUND GUIDES</span>
          </div>
        </div>
      </section>

      {/* 02 Curation Pillars */}
      <section id="curation-pillars" style={{ padding: '100px 2rem', backgroundColor: '#0A0F14', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ maxWidth: '600px', marginBottom: '4rem' }}>
            <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              CURATION PILLARS
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '8px' }}>
              HOW TOURIN JOURNEYS ARE CRAFTED
            </h2>
            <p style={{ fontSize: '1rem', color: '#8A919D' }}>
              Zero standardized travel packages. Every expedition is individually paced and culturally anchored.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Pillar 01 */}
            <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>01 // ADVENTURE</span>
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
                Raw Expedition Routes
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#8A919D', lineHeight: 1.7 }}>
                Traversing lesser-known high-altitude passes beyond commercial tourist corridors, supported by experienced local drivers, mechanics, and satellite communication.
              </p>
            </div>

            {/* Pillar 02 */}
            <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>02 // CULTURE</span>
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
                Living Himalayan Culture
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#8A919D', lineHeight: 1.7 }}>
                Staying in family-run earthen homestays in Nubra, Sham, and Changthang. Sharing home-cooked Ladakhi meals and participating in traditional orchard harvests.
              </p>
            </div>

            {/* Pillar 03 */}
            <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>03 // FORMATS</span>
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
                Bespoke &amp; Motorcycle Formats
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#8A919D', lineHeight: 1.7 }}>
                From our signature 20-biker Enfield expeditions over Chang La and Khardung La to quiet high-altitude writer retreats and dark-sky astrophotography camps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Field Gallery Text */}
      <section style={{ padding: '100px 2rem', backgroundColor: '#080E18', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
            <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              FIELD GALLERY
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff' }}>
              HIMALAYAN FRONTIERS
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '2rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>EXPEDITION 01</span>
              <p className="font-mono" style={{ fontSize: '0.9rem', color: '#8A919D', lineHeight: 1.6 }}>
                High mountain pass crossing under vast Himalayan skies.
              </p>
            </div>

            <div style={{ padding: '2rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>EXPEDITION 02</span>
              <p className="font-mono" style={{ fontSize: '0.9rem', color: '#8A919D', lineHeight: 1.6 }}>
                Traditional Ladakhi earthen village architecture and apricot orchards.
              </p>
            </div>

            <div style={{ padding: '2rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>EXPEDITION 03</span>
              <p className="font-mono" style={{ fontSize: '0.9rem', color: '#8A919D', lineHeight: 1.6 }}>
                Dark sky stargazing and Milky Way arc over Hanle valley.
              </p>
            </div>

            <div style={{ padding: '2rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '10px', color: '#C5A46D', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>EXPEDITION 04</span>
              <p className="font-mono" style={{ fontSize: '0.9rem', color: '#8A919D', lineHeight: 1.6 }}>
                Biker convoy winding along glacial rivers in Zanskar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Plan a Bespoke Expedition CTA */}
      <section style={{ padding: '100px 2rem', textAlign: 'center', backgroundColor: '#0A0F14' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff' }}>
            PLAN A BESPOKE EXPEDITION
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.6 }}>
            Inquire for upcoming motorcycle rallies, private family retreats, or high-altitude photography journeys.
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
            <span>INQUIRE WITH TOURIN CONCIERGE</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TourinPage;
