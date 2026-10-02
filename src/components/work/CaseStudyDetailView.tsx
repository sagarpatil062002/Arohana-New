'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { useCmsContent } from '@/lib/cms/content-context';

interface CaseStudyDetailViewProps {
  initialCaseStudy: any;
  targetSlug: string;
  nextCase?: any;
}

export default function CaseStudyDetailView({
  initialCaseStudy,
  targetSlug,
  nextCase,
}: CaseStudyDetailViewProps) {
  const { content } = useCmsContent();
  const [liveStudy, setLiveStudy] = useState(initialCaseStudy);

  // Sync with CMS content in context if present
  useEffect(() => {
    const cmsStudy = content?.work?.caseStudies?.find(
      (c: any) => c.slug === targetSlug || c.id === targetSlug
    );
    if (cmsStudy) {
      setLiveStudy((prev: any) => ({
        ...prev,
        ...cmsStudy,
        snapshot: {
          ...(prev?.snapshot || {}),
          ...(cmsStudy.snapshot || {}),
        },
        gallery: cmsStudy.gallery && cmsStudy.gallery.length > 0 ? cmsStudy.gallery : prev?.gallery || [],
      }));
    }
  }, [content?.work, targetSlug]);

  // Listen to postMessage from Admin preview and BroadcastChannel for instant zero-refresh updates
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_UPDATE' && e.data.section === 'work') {
        const found = e.data.data?.caseStudies?.find(
          (c: any) => c.slug === targetSlug || c.id === targetSlug
        );
        if (found) {
          setLiveStudy((prev: any) => ({
            ...prev,
            ...found,
            snapshot: {
              ...(prev?.snapshot || {}),
              ...(found.snapshot || {}),
            },
            gallery: found.gallery && found.gallery.length > 0 ? found.gallery : prev?.gallery || [],
          }));
        }
      }
    };

    window.addEventListener('message', handleMessage);

    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel('arohana_cms_preview');
        channel.onmessage = (event) => {
          if (event.data?.type === 'DRAFT_UPDATE' && event.data.section === 'work') {
            const found = event.data.data?.caseStudies?.find(
              (c: any) => c.slug === targetSlug || c.id === targetSlug
            );
            if (found) {
              setLiveStudy((prev: any) => ({
                ...prev,
                ...found,
                snapshot: {
                  ...(prev?.snapshot || {}),
                  ...(found.snapshot || {}),
                },
                gallery: found.gallery && found.gallery.length > 0 ? found.gallery : prev?.gallery || [],
              }));
            }
          }
        };
      } catch (err) {}
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      if (channel) channel.close();
    };
  }, [targetSlug]);

  const caseStudy = liveStudy || initialCaseStudy;
  if (!caseStudy) return null;

  // Derived content
  const brandName = (caseStudy.title || '')
    .replace(/\s*—\s*Case Study/i, '')
    .replace(/\s*—\s*Neora Deck/i, '');

  const showChallenge = caseStudy.showChallenge !== false;
  const showWhatWeDid = caseStudy.showWhatWeDid !== false;
  const showResult = caseStudy.showResult !== false;

  const challengeText = showChallenge
    ? (typeof caseStudy.challenge === 'string' && caseStudy.challenge.trim()
        ? caseStudy.challenge
        : Array.isArray(caseStudy.realChallenge)
          ? caseStudy.realChallenge.join('\n\n')
          : typeof caseStudy.realChallenge === 'string'
            ? caseStudy.realChallenge
            : Array.isArray(caseStudy.situation)
              ? caseStudy.situation.join('\n\n')
              : typeof caseStudy.situation === 'string'
                ? caseStudy.situation
                : '')
    : '';

  const whatWeDidText = showWhatWeDid
    ? (typeof caseStudy.whatWeDid === 'string' && caseStudy.whatWeDid.trim()
        ? caseStudy.whatWeDid
        : Array.isArray(caseStudy.work)
          ? caseStudy.work
              .map((w: any) =>
                typeof w === 'string'
                  ? w
                  : `${w?.title || ''}${w?.title && w?.description ? ': ' : ''}${w?.description || ''}`
              )
              .filter(Boolean)
              .join('\n\n')
          : typeof caseStudy.work === 'string'
            ? caseStudy.work
            : '')
    : '';

  const resultText = showResult
    ? (typeof caseStudy.theResult === 'string' && caseStudy.theResult.trim()
        ? caseStudy.theResult
        : (caseStudy.showVerifiedText !== false && typeof caseStudy.proof?.verifiedText === 'string'
            ? caseStudy.proof.verifiedText
            : '') ||
          (caseStudy.showClosingQuote !== false && typeof caseStudy.closingQuote === 'string'
            ? caseStudy.closingQuote
            : '') ||
          '')
    : '';

  const coreCaps: string[] = Array.isArray(caseStudy.snapshot?.coreCapabilities)
    ? caseStudy.snapshot.coreCapabilities.filter((c: any) => typeof c === 'string' && c.trim().length > 0)
    : (typeof caseStudy.snapshot?.coreCapabilities === 'string' && caseStudy.snapshot.coreCapabilities.trim()
        ? [caseStudy.snapshot.coreCapabilities.trim()]
        : []);

  const stillsSubtitleText =
    caseStudy.stillsSubtitle ||
    coreCaps.join(' · ') ||
    '';

  const layoutStyle = caseStudy.layoutStyle || caseStudy.layout || 'layout-1';
  const showHeader = caseStudy.headerEnabled !== false && caseStudy.showHeader !== false;
  const showHeroImage =
    caseStudy.heroImageEnabled !== false &&
    caseStudy.showHeroImage !== false &&
    typeof caseStudy.heroImage === 'string' &&
    caseStudy.heroImage.trim().length > 0;

  const showCoreScope =
    caseStudy.coreScopeEnabled !== false &&
    caseStudy.showCoreScope !== false &&
    caseStudy.snapshot?.coreScopeEnabled !== false &&
    coreCaps.length > 0;

  const showNarrative = caseStudy.narrativeEnabled !== false && caseStudy.showNarrative !== false;
  const showOutcomes = caseStudy.outcomesEnabled !== false && caseStudy.showOutcomes !== false;
  const showGallery = caseStudy.galleryEnabled !== false && caseStudy.showGallery !== false;
  const activeGallery = showGallery && Array.isArray(caseStudy.gallery)
    ? caseStudy.gallery.filter(
        (item: any) =>
          item &&
          item.enabled !== false &&
          typeof item.image === 'string' &&
          item.image.trim().length > 0
      )
    : [];

  return (
    <article
      className={`case-study-root layout-${
        layoutStyle === 'layout-2' ? '2-split' : layoutStyle === 'layout-3' ? '3-magazine' : '1-editorial'
      }`}
      style={{
        backgroundColor: '#FBF9F5',
        color: '#111113',
        minHeight: '100vh',
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
      }}
    >
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

        {/* ══════════════════════════════════════════════════════════════════
            LAYOUT 1: CLASSIC EDITORIAL STACK (DEFAULT)
            ══════════════════════════════════════════════════════════════════ */}
        {layoutStyle === 'layout-1' && (
          <>
            {/* Hero Header */}
            {showHeader && (
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

                {caseStudy.subtitle && (
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
                )}

                {caseStudy.pdfUrl && (
                  <div style={{ marginTop: '1.25rem' }}>
                    <Link
                      href={`/pdf-viewer?url=${encodeURIComponent(caseStudy.pdfUrl)}&title=${encodeURIComponent(caseStudy.title)}&subtitle=${encodeURIComponent(caseStudy.subtitle || '')}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.55rem',
                        padding: '0.6rem 1.35rem',
                        borderRadius: '9999px',
                        backgroundColor: '#DE322D',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 650,
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px rgba(222, 50, 45, 0.25)',
                      }}
                    >
                      <FileText size={15} />
                      <span>View PDF Document</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Core Scope Deliverables Bar */}
            {showCoreScope && (
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
                  gap: '0.65rem 1.25rem',
                }}
              >
                <span
                  className="tag-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: '#DE322D',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  CORE SCOPE:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  {coreCaps.map((cap: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        padding: '0.35rem 0.75rem',
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
              </div>
            )}

            {/* Hero Media (Image, Video, or PDF) */}
            {showHeroImage && (
              <div style={{ marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
                {(() => {
                  const mediaType = caseStudy.mediaType || (caseStudy.pdfUrl ? 'pdf' : caseStudy.videoUrl ? 'video' : 'image');

                  // 1. VIDEO MEDIA
                  if (mediaType === 'video' && caseStudy.videoUrl) {
                    const url = caseStudy.videoUrl;
                    const isEmbed = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');

                    let embedSrc = url;
                    if (url.includes('youtube.com/watch?v=')) {
                      embedSrc = `https://www.youtube.com/embed/${url.split('v=')[1]?.split('&')[0]}`;
                    } else if (url.includes('youtu.be/')) {
                      embedSrc = `https://www.youtube.com/embed/${url.split('youtu.be/')[1]?.split('?')[0]}`;
                    } else if (url.includes('vimeo.com/')) {
                      embedSrc = `https://player.vimeo.com/video/${url.split('vimeo.com/')[1]?.split('?')[0]}`;
                    }

                    return (
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16 / 9',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: '#000000',
                        }}
                      >
                        {isEmbed ? (
                          <iframe
                            src={embedSrc}
                            title={caseStudy.title || 'Case Study Video'}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={url}
                            controls
                            poster={caseStudy.heroImage || ''}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        )}
                      </div>
                    );
                  }

                  // 2. PDF MEDIA WITH CLICKABLE COVER IMAGE
                  if (mediaType === 'pdf' && caseStudy.pdfUrl) {
                    const pdfTargetUrl = `/pdf-viewer?url=${encodeURIComponent(caseStudy.pdfUrl)}&title=${encodeURIComponent(caseStudy.title)}&subtitle=${encodeURIComponent(caseStudy.subtitle || '')}&back=/work/${caseStudy.slug || caseStudy.id}`;
                    const coverImgSrc = caseStudy.pdfCoverImage || caseStudy.heroImage || caseStudy.image || '/images/work-placeholder.jpg';

                    return (
                      <Link
                        href={pdfTargetUrl}
                        style={{
                          display: 'block',
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16 / 9',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          textDecoration: 'none',
                          cursor: 'pointer',
                        }}
                        className="pdf-cover-image-trigger"
                      >
                        <Image
                          src={coverImgSrc}
                          alt={caseStudy.title || 'PDF Document Cover'}
                          fill
                          priority
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          style={{ objectFit: 'cover' }}
                        />
                        {/* Vignette & Information Overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.25) 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 'clamp(1.25rem, 3vw, 2.25rem)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                padding: '0.45rem 1rem',
                                borderRadius: '9999px',
                                backgroundColor: '#DE322D',
                                color: '#FFFFFF',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                boxShadow: '0 4px 14px rgba(222, 50, 45, 0.4)',
                              }}
                            >
                              <FileText size={14} />
                              <span>Click Cover to View PDF</span>
                            </span>
                          </div>

                          <div>
                            <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', fontWeight: 650, color: '#FFFFFF', margin: 0, marginBottom: '0.35rem', lineHeight: 1.2 }}>
                              {caseStudy.title}
                            </h3>
                            <p style={{ fontSize: '0.88rem', color: '#E4E4E7', margin: 0, marginBottom: '1.15rem', maxWidth: '650px', lineHeight: 1.45 }}>
                              {caseStudy.subtitle || 'Official publication document. Click anywhere on this cover image to open in interactive PDF viewer.'}
                            </p>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.55rem',
                                padding: '0.65rem 1.45rem',
                                borderRadius: '9999px',
                                backgroundColor: '#FFFFFF',
                                color: '#111113',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                              }}
                            >
                              <FileText size={16} color="#DE322D" />
                              <span>Open Interactive PDF Viewer ↗</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  }

                  // 3. IMAGE MEDIA (DEFAULT)
                  return (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 9',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <Image
                        src={caseStudy.heroImage || '/images/work-placeholder.jpg'}
                        alt={caseStudy.title || 'Case Study Image'}
                        fill
                        priority
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  );
                })()}

                {caseStudy.heroImageCaption && (
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#71717A',
                      marginTop: '0.75rem',
                      lineHeight: 1.45,
                    }}
                  >
                    {caseStudy.heroImageCaption}
                  </p>
                )}
              </div>
            )}

            {/* 3-Part Narrative Section */}
            {showNarrative && (challengeText || whatWeDidText || resultText) && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  marginBottom: 'clamp(4rem, 6vw, 6rem)',
                }}
              >
                {challengeText && (
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
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#DE322D',
                          display: 'inline-block',
                        }}
                      />
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
                )}

                {whatWeDidText && (
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
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#DE322D',
                          display: 'inline-block',
                        }}
                      />
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
                )}

                {resultText && (
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
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#DE322D',
                          display: 'inline-block',
                        }}
                      />
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
                )}
              </div>
            )}

            {/* Gallery Stills */}
            {activeGallery.length > 0 && (
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
                    {caseStudy.stillsHeading || `Stills from some of our work for ${brandName}`}
                  </h2>
                  {(caseStudy.stillsSubheading || stillsSubtitleText) && (
                    <p style={{ fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)', color: '#71717A', fontWeight: 500, margin: 0 }}>
                      {caseStudy.stillsSubheading || stillsSubtitleText}
                    </p>
                  )}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                    gap: 'clamp(1.25rem, 2vw, 1.75rem)',
                  }}
                >
                  {activeGallery.map((item: any, gIdx: number) => {
                    if (item.enabled === false) return null;
                    const hasLink = Boolean(item.url || item.redirectUrl || item.link);
                    const targetUrl = item.url || item.redirectUrl || item.link || '';
                    const finalHref = targetUrl.endsWith('.pdf') || targetUrl.includes('/pdf/')
                      ? `/pdf-viewer?url=${encodeURIComponent(targetUrl)}&title=${encodeURIComponent(item.caption || brandName)}`
                      : targetUrl;

                    const cardContent = (
                      <div
                        key={gIdx}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '6px',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          overflow: 'hidden',
                          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16 / 10',
                            backgroundColor: '#EBEAE6',
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.alt || `${brandName} still`}
                            fill
                            sizes="(max-width: 768px) 100vw, 420px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        {item.caption && (
                          <div style={{ padding: '0.85rem 1.15rem', flex: 1 }}>
                            <p style={{ fontSize: '0.82rem', color: '#52525B', lineHeight: 1.45, margin: 0 }}>
                              {item.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    );

                    if (hasLink) {
                      return (
                        <Link key={gIdx} href={finalHref} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {cardContent}
                        </Link>
                      );
                    }
                    return cardContent;
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            LAYOUT 2: ASYMMETRIC SPLIT ARCHITECTURE (STICKY SIDEBAR + VISUALS)
            ══════════════════════════════════════════════════════════════════ */}
        {layoutStyle === 'layout-2' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(2.5rem, 4vw, 4rem)',
              alignItems: 'start',
              marginBottom: 'clamp(4rem, 6vw, 6rem)',
            }}
          >
            {/* Left Sticky Sidebar */}
            <div
              style={{
                position: 'sticky',
                top: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {showHeader && (
                <div>
                  <div
                    className="tag-mono"
                    style={{
                      color: '#DE322D',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      marginBottom: '0.85rem',
                    }}
                  >
                    {caseStudy.sector || 'CASE STUDY'}
                  </div>
                  <h1
                    style={{
                      fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                      lineHeight: 1.08,
                      fontWeight: 650,
                      letterSpacing: '-0.035em',
                      color: '#111113',
                      marginBottom: '1rem',
                    }}
                  >
                    {caseStudy.title}
                  </h1>
                  {caseStudy.subtitle && (
                    <p style={{ fontSize: '1.15rem', color: '#4A4A52', lineHeight: 1.5, fontWeight: 450, margin: 0 }}>
                      {caseStudy.subtitle}
                    </p>
                  )}
                </div>
              )}

              {showCoreScope && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div
                    className="tag-mono"
                    style={{
                      color: '#71717A',
                      fontSize: '0.68rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                    }}
                  >
                    CORE SCOPE &amp; DELIVERABLES:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {coreCaps.map((cap: string, i: number) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          padding: '0.3rem 0.75rem',
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
                </div>
              )}

              {showOutcomes && caseStudy.showClosingQuote !== false && caseStudy.closingQuote && (
                <div
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#111113',
                    color: '#ffffff',
                    borderRadius: '8px',
                    borderLeft: '4px solid #DE322D',
                  }}
                >
                  <p style={{ fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                    "{caseStudy.closingQuote}"
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Hero Image & Narrative Blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {showHeroImage && (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Image
                    src={caseStudy.heroImage}
                    alt={caseStudy.title}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1024px) 100vw, 680px"
                  />
                </div>
              )}

              {showNarrative && (
                <>
                  {challengeText && (
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        padding: '2rem',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      <span
                        className="tag-mono"
                        style={{
                          color: '#DE322D',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '0.75rem',
                        }}
                      >
                        01 / THE CHALLENGE
                      </span>
                      <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#27272A', margin: 0, whiteSpace: 'pre-line' }}>
                        {challengeText}
                      </p>
                    </div>
                  )}

                  {whatWeDidText && (
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        padding: '2rem',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      <span
                        className="tag-mono"
                        style={{
                          color: '#DE322D',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '0.75rem',
                        }}
                      >
                        02 / WHAT WE DID
                      </span>
                      <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#27272A', margin: 0, whiteSpace: 'pre-line' }}>
                        {whatWeDidText}
                      </p>
                    </div>
                  )}

                  {resultText && (
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        padding: '2rem',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      <span
                        className="tag-mono"
                        style={{
                          color: '#DE322D',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '0.75rem',
                        }}
                      >
                        03 / THE RESULT
                      </span>
                      <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#27272A', margin: 0, whiteSpace: 'pre-line' }}>
                        {resultText}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Gallery in Layout 2 */}
              {activeGallery.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                    gap: '1.25rem',
                    marginTop: '1rem',
                  }}
                >
                  {activeGallery.map((item: any, gIdx: number) => (
                    <div
                      key={gIdx}
                      style={{
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3' }}>
                        <Image
                          src={item.image}
                          alt={item.alt || `${brandName} still`}
                          fill
                          sizes="340px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      {item.caption && (
                        <p style={{ fontSize: '0.78rem', color: '#71717A', padding: '0.65rem 0.85rem', margin: 0 }}>
                          {item.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            LAYOUT 3: CINEMATIC PANORAMIC SHOWCASE (IMMERSIVE FULL-WIDTH FLOW)
            ══════════════════════════════════════════════════════════════════ */}
        {layoutStyle === 'layout-3' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              marginBottom: 'clamp(4rem, 6vw, 6.5rem)',
            }}
          >
            {/* Panoramic Hero Banner Card */}
            {showHeroImage ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '440px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.18)',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Image
                  src={caseStudy.heroImage}
                  alt={caseStudy.title || ''}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(17, 17, 19, 0.2) 0%, rgba(17, 17, 19, 0.9) 100%)',
                  }}
                />
                {showHeader && (
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: 'clamp(2rem, 4vw, 3.5rem)',
                      color: '#ffffff',
                      maxWidth: '880px',
                    }}
                  >
                    <div
                      className="tag-mono"
                      style={{
                        color: '#DE322D',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '0.6rem',
                      }}
                    >
                      {caseStudy.sector || 'FEATURED CASE STUDY'}
                    </div>
                    <h1
                      style={{
                        fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                        lineHeight: 1.08,
                        fontWeight: 700,
                        letterSpacing: '-0.035em',
                        margin: 0,
                        marginBottom: '0.75rem',
                        color: '#ffffff',
                      }}
                    >
                      {caseStudy.title}
                    </h1>
                    {caseStudy.subtitle && (
                      <p
                        style={{
                          fontSize: '1.15rem',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {caseStudy.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : showHeader ? (
              <div style={{ maxWidth: '880px', marginBottom: '1.5rem' }}>
                <div
                  className="tag-mono"
                  style={{
                    color: '#DE322D',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                  }}
                >
                  {caseStudy.sector || 'FEATURED CASE STUDY'}
                </div>
                <h1
                  style={{
                    fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                    lineHeight: 1.08,
                    fontWeight: 700,
                    letterSpacing: '-0.035em',
                    margin: 0,
                    marginBottom: '0.75rem',
                    color: '#111113',
                  }}
                >
                  {caseStudy.title}
                </h1>
                {caseStudy.subtitle && (
                  <p style={{ fontSize: '1.15rem', color: '#4A4A52', lineHeight: 1.5, margin: 0 }}>
                    {caseStudy.subtitle}
                  </p>
                )}
              </div>
            ) : null}

            {/* Core Scope Bar */}
            {showCoreScope && (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1.25rem 2rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                }}
              >
                <span
                  className="tag-mono"
                  style={{
                    color: '#DE322D',
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    marginRight: '0.5rem',
                  }}
                >
                  CORE SCOPE:
                </span>
                {coreCaps.map((cap: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      padding: '0.4rem 1rem',
                      borderRadius: '4px',
                      backgroundColor: '#F4F4F5',
                      color: '#111113',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            )}

            {/* Alternating Narrative Feature Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {showNarrative && (
                <>
                  {challengeText && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                        gap: '2rem',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        padding: 'clamp(2rem, 3.5vw, 3rem)',
                        borderRadius: '10px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div>
                        <span
                          className="tag-mono"
                          style={{
                            color: '#DE322D',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.16em',
                            display: 'block',
                            marginBottom: '0.75rem',
                          }}
                        >
                          THE STRATEGIC CHALLENGE
                        </span>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 650, letterSpacing: '-0.025em', margin: '0 0 1rem 0' }}>
                          Identifying what actually matters
                        </h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#3F3F46', margin: 0, whiteSpace: 'pre-line' }}>
                          {challengeText}
                        </p>
                      </div>
                      {activeGallery[0]?.image && (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16 / 11',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          <Image
                            src={activeGallery[0].image}
                            alt="Challenge visual"
                            fill
                            sizes="500px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {whatWeDidText && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                        gap: '2rem',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        padding: 'clamp(2rem, 3.5vw, 3rem)',
                        borderRadius: '10px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {activeGallery[1]?.image && (
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16 / 11',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          <Image
                            src={activeGallery[1].image}
                            alt="Execution visual"
                            fill
                            sizes="500px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div>
                        <span
                          className="tag-mono"
                          style={{
                            color: '#DE322D',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.16em',
                            display: 'block',
                            marginBottom: '0.75rem',
                          }}
                        >
                          CREATIVE &amp; ON-GROUND EXECUTION
                        </span>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 650, letterSpacing: '-0.025em', margin: '0 0 1rem 0' }}>
                          Rigorous delivery across touchpoints
                        </h3>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#3F3F46', margin: 0, whiteSpace: 'pre-line' }}>
                          {whatWeDidText}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {showOutcomes && resultText && (
                <div
                  style={{
                    backgroundColor: '#111113',
                    color: '#ffffff',
                    borderRadius: '10px',
                    padding: 'clamp(2rem, 4vw, 3.5rem)',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <span
                    className="tag-mono"
                    style={{
                      color: '#DE322D',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    MEASURED BUSINESS OUTCOME
                  </span>
                  <p
                    style={{
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
                      lineHeight: 1.6,
                      fontWeight: 500,
                      margin: 0,
                      whiteSpace: 'pre-line',
                      color: 'rgba(255, 255, 255, 0.92)',
                    }}
                  >
                    {resultText}
                  </p>
                </div>
              )}
            </div>

            {/* Mosaic Gallery in Layout 3 */}
            {activeGallery.length > 2 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                  gap: '1.5rem',
                }}
              >
                {activeGallery.slice(2).map((item: any, gIdx: number) => (
                  <div
                    key={gIdx}
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
                      <Image
                        src={item.image}
                        alt={item.alt || `${brandName} still`}
                        fill
                        sizes="420px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    {item.caption && (
                      <p style={{ fontSize: '0.82rem', color: '#71717A', padding: '0.85rem 1rem', margin: 0 }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── NEXT CASE STUDY NAVIGATION CARD ─── */}
        {nextCase && (nextCase.slug || nextCase.id) && (
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
              href={`/work/${nextCase.slug || nextCase.id}`}
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
