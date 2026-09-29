import React from 'react';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CASE_STUDIES, getCaseStudyBySlug } from '@/data/case-studies';
import { getSectionContent } from '@/lib/cms/content-manager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  const params = CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
  params.push({ slug: 'raysons' });
  params.push({ slug: 'the-she-project' });
  params.push({ slug: 'indian-army' });
  params.push({ slug: 'indian-army-projects' });
  return params;
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'indian-army' || params.slug === 'indian-army-projects') {
    redirect('/indian-army-projects');
  }

  // Handle redirects / aliases
  const targetSlug = params.slug === 'raysons' ? 'raysons-group' : params.slug === 'the-she-project' ? 'she' : params.slug;

  // 1. Fetch from hardcoded base
  const baseStudy = getCaseStudyBySlug(targetSlug);

  // 2. Fetch CMS content if available
  const workCms = getSectionContent<any>('work');
  const cmsStudy = workCms?.caseStudies?.find((c: any) => c.slug === targetSlug || c.id === targetSlug);

  // Merge CMS overrides with base case study
  const caseStudy = cmsStudy
    ? {
        ...baseStudy,
        ...cmsStudy,
        snapshot: {
          ...(baseStudy?.snapshot || {}),
          ...(cmsStudy.snapshot || {}),
        },
        gallery: (cmsStudy.gallery && cmsStudy.gallery.length > 0) ? cmsStudy.gallery : baseStudy?.gallery || [],
      }
    : baseStudy;

  if (!caseStudy) {
    notFound();
  }

  // Find next case study for smooth sequential navigation
  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === targetSlug);
  const nextCase = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  // Derived content
  const brandName = caseStudy.title.replace(/\s*—\s*Case Study/i, '').replace(/\s*—\s*Neora Deck/i, '');
  const challengeText = caseStudy.challenge || caseStudy.realChallenge?.join('\n\n') || caseStudy.situation?.join('\n\n') || '';
  const whatWeDidText = caseStudy.whatWeDid || (caseStudy.work ? caseStudy.work.map((w: any) => `${w.title}: ${w.description}`).join('\n\n') : '');
  const resultText = caseStudy.theResult || caseStudy.proof?.verifiedText || caseStudy.closingQuote || '';
  const stillsSubtitleText = caseStudy.stillsSubtitle || caseStudy.snapshot?.coreCapabilities?.join(' · ') || '';

  return (
    <article style={{ backgroundColor: '#FBF9F5', color: '#111113', minHeight: '100vh', paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'clamp(5rem, 8vw, 8rem)' }}>
      <div className="padding-global" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Back Link */}
        <div style={{ marginBottom: 'clamp(2rem, 3.5vw, 3rem)' }}>
          <Link
            href="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#71717A',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
          >
            <ArrowLeft size={15} /> BACK TO SELECTED WORK
          </Link>
        </div>

        {/* Hero Header */}
        <div style={{ maxWidth: '980px', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div
            className="tag-mono"
            style={{
              color: '#DE322D',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '0.85rem',
              display: 'block',
            }}
          >
            {caseStudy.sector || 'CASE STUDY'}
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
              lineHeight: 1.05,
              fontWeight: 650,
              letterSpacing: '-0.035em',
              color: '#111113',
              marginBottom: '1rem',
            }}
          >
            {caseStudy.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              color: '#4A4A52',
              lineHeight: 1.45,
              fontWeight: 450,
              margin: 0,
            }}
          >
            {caseStudy.subtitle}
          </p>
        </div>

        {/* Core Scope Deliverables Bar */}
        {caseStudy.snapshot?.coreCapabilities && caseStudy.snapshot.coreCapabilities.length > 0 && (
          <div
            style={{
              padding: '1rem 1.4rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.02)',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <span
              className="tag-mono"
              style={{
                color: '#71717A',
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                fontWeight: 700,
                marginRight: '0.5rem',
              }}
            >
              CORE SCOPE:
            </span>
            {caseStudy.snapshot.coreCapabilities.map((cap: string, i: number) => (
              <span
                key={i}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '4px',
                  backgroundColor: '#F4F4F5',
                  color: '#27272A',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                {cap}
              </span>
            ))}
          </div>
        )}

        {/* Main Hero Image */}
        <div style={{ marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              backgroundColor: '#EAEAEA',
              boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.12)',
            }}
          >
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1240px) 100vw, 1240px"
            />
          </div>
          {caseStudy.heroImageCaption && (
            <p
              style={{
                marginTop: '0.85rem',
                fontSize: '0.82rem',
                color: '#71717A',
                fontFamily: 'var(--font-mono, monospace)',
                lineHeight: 1.5,
              }}
            >
              {caseStudy.heroImageCaption}
            </p>
          )}
        </div>

        {/* ─── 3-PART NARRATIVE SECTION: THE CHALLENGE, WHAT WE DID, THE RESULT ─── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            marginBottom: 'clamp(4rem, 6vw, 6rem)',
          }}
        >
          {/* 1. The Challenge */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: 'clamp(2rem, 3.5vw, 3rem)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
            }}
          >
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DE322D', display: 'inline-block' }} />
              THE CHALLENGE
            </div>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.35vw, 1.2rem)',
                lineHeight: 1.7,
                color: '#27272A',
                fontWeight: 450,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {challengeText}
            </p>
          </div>

          {/* 2. What We Did */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: 'clamp(2rem, 3.5vw, 3rem)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
            }}
          >
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DE322D', display: 'inline-block' }} />
              WHAT WE DID
            </div>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.35vw, 1.2rem)',
                lineHeight: 1.7,
                color: '#27272A',
                fontWeight: 450,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {whatWeDidText}
            </p>
          </div>

          {/* 3. The Result */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: 'clamp(2rem, 3.5vw, 3rem)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
            }}
          >
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DE322D', display: 'inline-block' }} />
              THE RESULT
            </div>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.35vw, 1.2rem)',
                lineHeight: 1.7,
                color: '#27272A',
                fontWeight: 450,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {resultText}
            </p>
          </div>
        </div>

        {/* ─── STILLS FROM SOME OF OUR WORK FOR [BRAND] ─── */}
        <section style={{ marginBottom: 'clamp(4rem, 6vw, 6.5rem)' }}>
          <div style={{ marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                fontWeight: 650,
                letterSpacing: '-0.025em',
                color: '#111113',
                marginBottom: '0.5rem',
              }}
            >
              Stills from some of our work for {brandName}
            </h2>
            {stillsSubtitleText && (
              <p
                style={{
                  fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
                  color: '#71717A',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {stillsSubtitleText}
              </p>
            )}
          </div>

          {/* Stills Gallery Grid */}
          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                gap: 'clamp(1.25rem, 2vw, 1.75rem)',
              }}
            >
              {caseStudy.gallery.map((item: any, gIdx: number) => (
                <div
                  key={gIdx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      backgroundColor: '#EBEAE6',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt || `${brandName} still ${gIdx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  {item.caption && (
                    <div style={{ padding: '0.85rem 1.15rem' }}>
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: '#52525B',
                          lineHeight: 1.45,
                          margin: 0,
                        }}
                      >
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ─── NEXT CASE STUDY NAVIGATION CARD ─── */}
        {nextCase && (
          <div
            style={{
              padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: '8px',
              backgroundColor: '#111113',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div>
              <div
                className="tag-mono"
                style={{
                  color: '#DE322D',
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  marginBottom: '0.45rem',
                }}
              >
                NEXT CASE STUDY
              </div>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 650,
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                  marginBottom: '0.25rem',
                }}
              >
                {nextCase.title}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.92rem' }}>
                {nextCase.subtitle}
              </div>
            </div>

            <Link
              href={`/work/${nextCase.slug}`}
              className="button-editorial"
              style={{
                height: '48px',
                padding: '0 1.65rem',
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
              }}
            >
              <span>View Case Study</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
