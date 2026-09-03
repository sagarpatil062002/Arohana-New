// src/pages/AboutPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
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
        <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
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
            03 ABOUT
          </span>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ display: 'block' }}>THE ROAD TO</span>
            <span style={{ display: 'block' }}>ĀROHANA WAS</span>
            <span style={{ display: 'block' }}>ANYTHING BUT</span>
            <span style={{ display: 'block' }}>STRAIGHT.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: '#8A919D', lineHeight: 1.6 }}>
            I built it after spending years inside businesses — learning what makes them work, what makes them struggle, and what people see only after they become responsible for the whole thing.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ padding: '1.5rem', background: 'rgba(16, 22, 34, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
            <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '8px' }}>01</span>
            <h3 className="font-display" style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '8px' }}>
              IT STARTED WITH HOSPITALITY
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6 }}>
              From Muscat to Goa, hospitality taught me the meaning of people, operations and detail.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'rgba(16, 22, 34, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
            <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '8px' }}>02</span>
            <h3 className="font-display" style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '8px' }}>
              THERE WERE A FEW UNEXPECTED DETOURS
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6 }}>
              COVID changed the direction of things. The real test of clarity began.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'rgba(16, 22, 34, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
            <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '8px' }}>03</span>
            <h3 className="font-display" style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '8px' }}>
              AND THEN, THE WORK GOT INTERESTING
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6 }}>
              New sectors. New challenges. New perspectives. High-altitude operations in Ladakh.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'rgba(16, 22, 34, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '2px' }}>
            <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block', marginBottom: '8px' }}>04</span>
            <h3 className="font-display" style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '8px' }}>
              WHERE ĀROHANA STANDS TODAY
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6 }}>
              Strategy. Communication. Creativity. Execution. For businesses serious about what they build.
            </p>
          </div>
        </div>
      </section>

      {/* 02 Philosophy Section */}
      <section style={{ backgroundColor: '#F5F2EC', color: '#121215', padding: '100px 2rem' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#5A616C', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              PHILOSOPHY
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.05, color: '#121215', marginBottom: '1.5rem' }}>
              THE CATEGORY CHANGES. THE THINKING HAS TO CHANGE WITH IT.
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#555860', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '580px' }}>
              Every business has its own operating reality. We don't apply templates — we structure hybrid teams around what the business actually needs to grow.
            </p>
            <a
              href="#founder-narrative"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#121215',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '2px',
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.18em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              <span>READ FULL STORY</span>
              <span>↓</span>
            </a>
          </div>

          <div style={{ padding: '2.5rem', background: '#EAE5DC', borderRadius: '2px', border: '1px solid rgba(18, 18, 21, 0.1)' }}>
            <span className="font-mono" style={{ fontSize: '10px', color: '#8A919D', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
              OPERATING PERSPECTIVE // FOUNDER PRINCIPLE
            </span>
            <blockquote className="font-display" style={{ fontSize: '1.5rem', color: '#121215', lineHeight: 1.35, fontWeight: 500 }}>
              “If a strategy cannot survive the chaos of daily operations, it is not a strategy — it is an expensive suggestion.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* 03 Principal Leadership */}
      <section id="founder-narrative" style={{ padding: '100px 2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#080E18' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div style={{ padding: '2.5rem', background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
            <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#C5A46D', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              PRINCIPAL LEADERSHIP
            </span>
            <h2 className="font-display" style={{ fontSize: '2.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
              Madhura Hawal
            </h2>
            <p className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '2rem' }}>
              Founder &amp; Principal Consultant · Kolhapur · Goa · Delhi · Ladakh
            </p>
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C5A46D' }}>✦</span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Taj Management Training Programme</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C5A46D' }}>✦</span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Mother India Cafe Founder &amp; Operator</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C5A46D' }}>✦</span>
                <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>14,000+ FT Indian Army High-Altitude Operations</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.7 }}>
              Madhura brings hands-on entrepreneurial expertise and strategic insight to every client brief. With credentials spanning luxury hospitality management in Muscat and Goa, the Taj Management Training Programme, standalone cafe ownership, craft brewery sales, and field logistics for Indian Army campaigns in Northern India, her consultative framework is rooted in ground execution.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.7 }}>
              At Ārohana, she works directly with business owners, hospitality founders, and institutional leadership teams to eliminate vanity noise and link brand positioning directly to operational ledgers.
            </p>
            <div style={{ padding: '1.5rem', background: '#101622', borderLeft: '3px solid #C5A46D', marginTop: '1rem' }}>
              <p className="font-display" style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                “We believe that communication and commercial strategy are inseparable. Effective design and digital positioning should stem directly from operations and margin realities.”
              </p>
              <p className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D' }}>
                We reject the agency echo chamber where vanity design wins awards while business owners struggle with unit economics and operational leakages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Narrative Timeline */}
      <section style={{ padding: '100px 2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#0A0F14' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ maxWidth: '680px', marginBottom: '4rem' }}>
            <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              NARRATIVE TIMELINE
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.05, color: '#ffffff' }}>
              FROM LUXURY TAJ FLOORS TO 14,000 FT HIMALAYAN SECTORS.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Chapter 01 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>2016 — 2019</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D', display: 'block' }}>Muscat · Goa · Kolhapur</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#C5A46D', fontWeight: 700, marginTop: '4px', display: 'block' }}>[ CHAPTER 01 ]</span>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
                  Hospitality Foundations &amp; Taj Training
                </h3>
                <p className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D', marginBottom: '1rem' }}>
                  Learning operational discipline where small mistakes compound immediately.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  My foundational years were forged directly inside luxury hospitality. I studied Hospitality Management in Muscat before completing my formal degree in Goa. During my university years, I was selected as a Top 13 finalist for Femina Miss India (West Zone) — an intense detour that taught poise and calm under extreme public scrutiny. Shortly after graduating, I qualified as one of just 16 trainees nationwide for the prestigious Taj Management Training Programme. Returning to Kolhapur, I founded Mother India Cafe from scratch, learning real unit economics, kitchen margins, and daily operational ledger realities.
                </p>
                <div className="font-mono" style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>✦ Studied Hospitality Management in Muscat &amp; Goa</div>
                  <div>✦ Top 13 Finalist — Femina Miss India (West Zone)</div>
                  <div>✦ Qualified for Taj Management Training Programme (1 of 16 pan-India)</div>
                  <div>✦ Founder &amp; Operator of Mother India Cafe (Kolhapur)</div>
                </div>
              </div>
            </div>

            {/* Chapter 02 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>2019 — 2021</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D', display: 'block' }}>Goa · Mumbai · Pune</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#C5A46D', fontWeight: 700, marginTop: '4px', display: 'block' }}>[ CHAPTER 02 ]</span>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
                  High-Pace Operations &amp; The Strategic Pivot
                </h3>
                <p className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D', marginBottom: '1rem' }}>
                  Navigating high-turnover dining, craft beverage distribution, and commercial pivots.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Venturing across Goa's hyper-competitive dining sector and regional distribution networks, I led on-ground operations and sales strategy for craft breweries and specialty F&amp;B concepts. Working alongside leading hospitality operators including Passcode Hospitality, I saw firsthand that great food concepts frequently falter not on culinary craft, but because marketing promises and floor operations pull in opposite directions.
                </p>
                <div className="font-mono" style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>✦ Led regional on-ground sales for craft brewery ventures</div>
                  <div>✦ Floor operations and brand consulting with Passcode Hospitality</div>
                  <div>✦ Discovered the critical operational disconnect between agency marketing and kitchen realities</div>
                </div>
              </div>
            </div>

            {/* Chapter 03 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>2021 — 2024</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D', display: 'block' }}>Ladakh · Northern Frontier Theatres</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#C5A46D', fontWeight: 700, marginTop: '4px', display: 'block' }}>[ CHAPTER 03 ]</span>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
                  Demanding Theatres &amp; High-Altitude Operations
                </h3>
                <p className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D', marginBottom: '1rem' }}>
                  Extreme field execution at 14,000+ feet in sub-zero Himalayan conditions.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  In Ladakh, I directed high-altitude logistics and community documentation for the Indian Army under Operation Sadbhavana, including conceptualizing and executing project SHE across 8 remote border villages. Concurrently, I partnered with PictureTime to manage communications for mobile inflatable digital cinemas operating at 11,500+ feet in sub-zero winter temperatures.
                </p>
                <div className="font-mono" style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>✦ Field logistics and documentary production at 14,000+ ft for Indian Army</div>
                  <div>✦ Conceptualized and executed project SHE across 8 border communities</div>
                  <div>✦ Strategic communications for PictureTime inflatable cinema networks in Ladakh &amp; IFFI Goa</div>
                </div>
              </div>
            </div>

            {/* Chapter 04 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>2024 — Present</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D', display: 'block' }}>Pan-India Advisory</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#C5A46D', fontWeight: 700, marginTop: '4px', display: 'block' }}>[ CHAPTER 04 ]</span>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginBottom: '4px' }}>
                  Ārohana Today: Strategy Meets Execution
                </h3>
                <p className="font-mono" style={{ fontSize: '0.85rem', color: '#8A919D', marginBottom: '1rem' }}>
                  Bridging the gap between creative ambition and bottom-line commercial performance.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Ārohana was founded to provide the partner I always wished I had when running businesses: a consultancy that thinks like an owner, executes with creative finesse, and stays on the ground until systems actually produce verified results.
                </p>
                <div className="font-mono" style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>✦ Retainer partnerships spanning real estate, hospitality, defence, and healthcare</div>
                  <div>✦ Zero vanity metrics — all engagements tied to commercial sustainability</div>
                  <div>✦ End-to-end capabilities across digital growth, operations, and documentary cinema</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 Leadership Collective */}
      <section style={{ padding: '100px 2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#080E18' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ maxWidth: '680px', marginBottom: '4rem' }}>
            <span className="font-mono" style={{ fontSize: '11px', color: '#C5A46D', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              LEADERSHIP COLLECTIVE
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.05, color: '#ffffff', marginBottom: '1rem' }}>
              BRAND IS ONLY AS STRONG AS THE THINKING BEHIND IT.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.7 }}>
              Behind Ārohana is an interdisciplinary collective of operators, commercial strategists, filmmakers, and creative architects who have built, run, and scaled systems on the ground.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Madhura Hawal */}
            <div style={{ background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block' }}>Ms.</span>
              <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginTop: '2px' }}>
                Madhura Hawal
              </h3>
              <p className="font-mono" style={{ fontSize: '11px', color: '#8A919D', marginBottom: '1rem' }}>
                Founder &amp; Principal Consultant
              </p>
              <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                With credentials spanning luxury hospitality management in Muscat and Goa, Taj Management training, standalone cafe ownership, craft brewery distribution, and direct field logistics for Indian Army campaigns in Ladakh, Madhura leads every engagement with rigorous commercial discipline.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Commercial Strategy</span>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Hospitality Operations</span>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Military &amp; Special Projects</span>
              </div>
            </div>

            {/* Aditya Kulkarni */}
            <div style={{ background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block' }}>Mr.</span>
              <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginTop: '2px' }}>
                Aditya Kulkarni
              </h3>
              <p className="font-mono" style={{ fontSize: '11px', color: '#8A919D', marginBottom: '1rem' }}>
                Creative Director &amp; Brand Architect
              </p>
              <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Aditya directs identity systems, spatial design, and typography architecture across luxury, retail, and corporate sectors. His approach ensures that brand identity functions as an operational business asset that establishes distinct market authority.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Brand Architecture</span>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Spatial Experience</span>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Typography Systems</span>
              </div>
            </div>

            {/* Tanvi Deshmukh */}
            <div style={{ background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block' }}>Ms.</span>
              <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginTop: '2px' }}>
                Tanvi Deshmukh
              </h3>
              <p className="font-mono" style={{ fontSize: '11px', color: '#8A919D', marginBottom: '1rem' }}>
                Head of Strategic Communications
              </p>
              <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Tanvi oversees brand narrative, institutional positioning, and corporate communications. Specializing in high-stakes briefs and legacy enterprise repositioning, she crafts clear, compelling brand messaging rooted in verified proof.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Brand Positioning</span>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Editorial Architecture</span>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Executive Communication</span>
              </div>
            </div>

            {/* Arjun Patel */}
            <div style={{ background: '#101622', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '2px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: '#C5A46D', fontWeight: 700, display: 'block' }}>Mr.</span>
              <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', marginTop: '2px' }}>
                Arjun Patel
              </h3>
              <p className="font-mono" style={{ fontSize: '11px', color: '#8A919D', marginBottom: '1rem' }}>
                Lead Cinematographer &amp; Film Director
              </p>
              <p style={{ fontSize: '0.85rem', color: '#8A919D', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Arjun directs documentary, film, and multimedia production for commercial campaigns and specialized institutional briefs. Having filmed extensively at 14,000+ feet in high-altitude Himalayan sectors under strict protocols, he brings cinematic precision to demanding environments.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Cinematography</span>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Field Direction</span>
                <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '2px' }}>Post-Production Grading</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 Ready to Build Together CTA */}
      <section style={{ padding: '100px 2rem', textAlign: 'center', backgroundColor: '#0A0F14' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff' }}>
            READY TO BUILD TOGETHER?
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#8A919D', lineHeight: 1.6 }}>
            Let's structure an engagement tailored to your specific commercial milestones.
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

export default AboutPage;
