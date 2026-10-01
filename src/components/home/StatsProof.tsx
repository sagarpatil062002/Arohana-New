'use client';

import React from 'react';

export default function StatsProof() {
  const stats = [
    {
      num: '25+',
      label: 'Commercial Engagements',
      desc: 'Direct partnerships across hospitality, enterprise and consumer brands.',
    },
    {
      num: '10+',
      label: 'Industry Sectors',
      desc: 'Deep commercial experience in hospitality, real estate, healthcare, media and defence.',
    },
    {
      num: '15+',
      label: 'Himalayan Expeditions',
      desc: 'Through Tourin, delivering experiential travel from individuals to expeditions.',
    },
  ];

  return (
    <section
      className="section-light"
      style={{
        paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 6rem)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large">
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div
            className="tag-mono"
            style={{
              color: '#777777',
              marginBottom: '1rem',
              display: 'block',
            }}
          >
            PROOF & VERIFIABLE STANDARDS
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 4.4rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#111111',
              maxWidth: '960px',
            }}
          >
            Clear numbers. Authentic work. No fabricated claims.
          </h2>
        </div>

        {/* 4-Column Editorial Numbers Grid with slot-machine feel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'clamp(1.75rem, 3vw, 2.5rem)',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              style={{
                borderTop: '2px solid #111111',
                paddingTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
                  fontWeight: 500,
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: '#111111',
                  marginBottom: '1rem',
                }}
              >
                {stat.num}
              </div>

              <div>
                <div
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    color: '#111111',
                  }}
                >
                  {stat.label}
                </div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#666666',
                    lineHeight: 1.5,
                  }}
                >
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
