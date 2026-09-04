import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES, getCaseStudyBySlug } from '@/data/case-studies';

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  // Find next case study for smooth navigation
  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === caseStudy.slug);
  const nextCase = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <article className="section-light" style={{ paddingTop: '3rem', paddingBottom: '8rem' }}>
      <div className="padding-global container-large">
        {/* Back Link */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: '#666',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> BACK TO SELECTED WORK
          </Link>
        </div>

        {/* Hero Header */}
        <div style={{ maxWidth: '1080px', marginBottom: '3.5rem' }}>
          <div
            className="tag-mono"
            style={{
              color: '#ff3b30',
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
            {caseStudy.sector}
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.6rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              color: '#111111',
              marginBottom: '1.25rem',
            }}
          >
            {caseStudy.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              color: '#444444',
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {caseStudy.subtitle}
          </p>
        </div>

        {/* Snapshot Metadata Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            marginBottom: '4rem',
          }}
        >
          <div>
            <div className="tag-mono" style={{ color: '#888', fontSize: '0.7rem', marginBottom: '0.35rem' }}>
              LOCATION
            </div>
            <div style={{ fontWeight: 500, color: '#111' }}>{caseStudy.snapshot.location}</div>
          </div>
          <div>
            <div className="tag-mono" style={{ color: '#888', fontSize: '0.7rem', marginBottom: '0.35rem' }}>
              ENGAGEMENT TYPE
            </div>
            <div style={{ fontWeight: 500, color: '#111' }}>{caseStudy.snapshot.engagementType}</div>
          </div>
          <div>
            <div className="tag-mono" style={{ color: '#888', fontSize: '0.7rem', marginBottom: '0.35rem' }}>
              DURATION
            </div>
            <div style={{ fontWeight: 500, color: '#111' }}>{caseStudy.snapshot.duration}</div>
          </div>
          <div>
            <div className="tag-mono" style={{ color: '#888', fontSize: '0.7rem', marginBottom: '0.35rem' }}>
              CORE SCOPE
            </div>
            <div style={{ fontWeight: 500, color: '#111', fontSize: '0.9rem' }}>
              {caseStudy.snapshot.coreCapabilities.slice(0, 2).join(' • ')}
            </div>
          </div>
        </div>

        {/* Main Hero Image with Caption */}
        <div style={{ marginBottom: '5rem' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 'clamp(20px, 3vw, 36px)',
              overflow: 'hidden',
              backgroundColor: '#eaeaea',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          {caseStudy.heroImageCaption && (
            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.85rem',
                color: '#666',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {caseStudy.heroImageCaption}
            </p>
          )}
        </div>

        {/* Editorial Narrative: Situation & The Real Challenge */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            marginBottom: '5rem',
          }}
        >
          {/* Situation */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: 'clamp(2rem, 3.5vw, 3rem)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem' }}>
              01 • CONTEXT & SITUATION
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '1.5rem', color: '#111' }}>
              The Operational Context
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {caseStudy.situation.map((para, i) => (
                <p key={i} style={{ fontSize: '1rem', color: '#444', lineHeight: 1.6 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Real Challenge */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: 'clamp(2rem, 3.5vw, 3rem)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '1rem' }}>
              02 • THE CORE PROBLEM
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '1.5rem', color: '#111' }}>
              The Real Challenge
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {caseStudy.realChallenge.map((para, i) => (
                <p key={i} style={{ fontSize: '1rem', color: '#444', lineHeight: 1.6 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Thinking / Approach */}
        <div
          style={{
            borderRadius: '28px',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            marginBottom: '6rem',
          }}
        >
          <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '1rem' }}>
            03 • STRATEGIC APPROACH
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: '2rem',
              lineHeight: 1.1,
            }}
          >
            How Ārohana structured the thinking
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {caseStudy.thinking.map((item, idx) => (
              <div key={idx} style={{ borderLeft: '2px solid #ff3b30', paddingLeft: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#888' }}>
                  PILLAR 0{idx + 1}
                </span>
                <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginTop: '0.5rem' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The Execution Work Modules */}
        <div style={{ marginBottom: '6rem' }}>
          <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem' }}>
            04 • THE DELIVERED WORK
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: '3rem',
              color: '#111',
            }}
          >
            What was built, executed and produced
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {caseStudy.work.map((w, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2.5rem',
                  borderRadius: '24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 500, marginBottom: '1rem', color: '#111' }}>
                    {w.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {w.description}
                  </p>
                </div>

                {w.bullets && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {w.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                        <CheckCircle2 size={16} color="#28cd41" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.875rem', color: '#444' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visual Evidence Gallery */}
        {caseStudy.gallery && caseStudy.gallery.length > 0 && (
          <div style={{ marginBottom: '6rem' }}>
            <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem' }}>
              05 • VISUAL EVIDENCE
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                marginBottom: '3rem',
                color: '#111',
              }}
            >
              On-ground assets and production stills
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
              }}
            >
              {caseStudy.gallery.map((item, gIdx) => (
                <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/11',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      backgroundColor: '#e6e6e4',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt || caseStudy.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#666',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Outcomes & Proof */}
        {caseStudy.proof && (
          <div
            style={{
              padding: '3rem',
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              marginBottom: '5rem',
            }}
          >
            <div className="tag-mono" style={{ color: '#28cd41', marginBottom: '0.75rem' }}>
              VERIFIED IMPACT
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 500, marginBottom: '1rem', color: '#111' }}>
              Outcomes & Commercial Change
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6, maxWidth: '840px' }}>
              {caseStudy.proof.verifiedText}
            </p>
            {caseStudy.proof.metricsNote && (
              <div
                style={{
                  marginTop: '1.25rem',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#888',
                }}
              >
                {caseStudy.proof.metricsNote}
              </div>
            )}
          </div>
        )}

        {/* Authentic Closing Quote */}
        {caseStudy.closingQuote && (
          <div
            style={{
              borderLeft: '3px solid #111',
              paddingLeft: '2rem',
              marginBottom: '6rem',
              maxWidth: '860px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                lineHeight: 1.3,
                color: '#111',
                marginBottom: '1rem',
              }}
            >
              "{caseStudy.closingQuote}"
            </p>
            <div className="tag-mono" style={{ color: '#888' }}>
              {caseStudy.title} • CONSULTANCY OBSERVATION
            </div>
          </div>
        )}

        {/* Next Case Study Navigation Card */}
        <div
          style={{
            padding: '4rem clamp(1.5rem, 4vw, 4rem)',
            borderRadius: '28px',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          <div>
            <div className="tag-mono" style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.5rem' }}>
              NEXT CASE STUDY
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 500,
              }}
            >
              {nextCase.title}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
              {nextCase.subtitle}
            </div>
          </div>

          <Link
            href={`/work/${nextCase.slug}`}
            className="button-editorial button-editorial-white"
            style={{ height: '48px', padding: '0 1.75rem' }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item">View Next Case</span>
              <span className="button-text-item">View Next Case</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
