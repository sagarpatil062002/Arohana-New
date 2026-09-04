'use client';

import React from 'react';

export default function StatsProof() {
  const stats = [
    {
      num: '06',
      label: 'Verified Case Studies',
      desc: 'In-depth problem, approach, evidence and outcome narratives without marketing fluff.',
    },
    {
      num: '15+',
      label: 'Ladakh Journeys Executed',
      desc: 'Through Tourin, delivering experiential travel from individuals to 20-biker expeditions.',
    },
    {
      num: '10+',
      label: 'Years Operational Practice',
      desc: 'Deep commercial experience in hospitality, industrial manufacturing, and media.',
    },
    {
      num: '0',
      label: 'Vanity Metrics Claimed',
      desc: 'No fabricated awards, fake performance statistics, or generated client testimonials.',
    },
  ];

  return (
    <section
      className="section-light"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large">
        <div style={{ marginBottom: '4rem' }}>
          <div
            className="tag-mono"
            style={{
              color: '#777777',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ff3b30',
              }}
            />
            PROOF & VERIFIABLE STANDARDS
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
              fontWeight: 400,
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              style={{
                borderTop: '2px solid #111111',
                paddingTop: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.5rem, 6.5vw, 6.5rem)',
                  fontWeight: 500,
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: '#111111',
                  marginBottom: '1.25rem',
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
