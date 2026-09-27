'use client';

import React, { useState, useMemo } from 'react';
import { Play, Film, Maximize2, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CaseStudyMediaLink } from '@/types';

interface CaseStudyVideoHubProps {
  videos: CaseStudyMediaLink[];
  brandTitle: string;
}

export function getEmbedInfo(url: string): { embedUrl: string | null; platform: 'reel' | 'post' | 'youtube' | 'drive' | 'unknown' } {
  if (!url) return { embedUrl: null, platform: 'unknown' };

  // Instagram Reel
  const reelMatch = url.match(/instagram\.com\/reel\/([A-Za-z0-9_-]+)/);
  if (reelMatch) {
    return {
      embedUrl: `https://www.instagram.com/reel/${reelMatch[1]}/embed`,
      platform: 'reel',
    };
  }

  // Instagram Post
  const postMatch = url.match(/instagram\.com\/p\/([A-Za-z0-9_-]+)/);
  if (postMatch) {
    return {
      embedUrl: `https://www.instagram.com/p/${postMatch[1]}/embed`,
      platform: 'post',
    };
  }

  // YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]+)/);
  if (ytMatch) {
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1`,
      platform: 'youtube',
    };
  }

  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/);
  if (driveMatch) {
    return {
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      platform: 'drive',
    };
  }

  return { embedUrl: null, platform: 'unknown' };
}

export default function CaseStudyVideoHub({ videos, brandTitle }: CaseStudyVideoHubProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!videos || videos.length === 0) return null;

  const activeVideo = videos[activeIndex] || videos[0];
  const activeEmbed = getEmbedInfo(activeVideo.url);
  const isVertical = activeEmbed.platform === 'reel' || activeEmbed.platform === 'post';

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section style={{ marginBottom: 'clamp(4rem, 7vw, 7rem)' }} id="video-proof-hub">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div
          className="tag-mono"
          style={{
            color: '#ff3b30',
            marginBottom: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <Film size={14} /> LIVE PRODUCTION VIDEOS &amp; REELS
        </div>
        <h2
          style={{
            fontSize: 'clamp(1.85rem, 3.8vw, 2.75rem)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: '#111',
            marginBottom: '0.5rem',
          }}
        >
          Watch On-Ground Production Work
        </h2>
        <p style={{ color: '#555', maxWidth: '720px', fontSize: '0.98rem', lineHeight: 1.55 }}>
          Explore actual production videos, reels, and digital broadcasts executed for {brandTitle}. Play directly on this page below.
        </p>
      </div>

      {/* Featured Main In-Page Player */}
      <div
        style={{
          backgroundColor: '#0c0c0e',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}
      >
        {/* Player Top Navigation Bar */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#28cd41',
                boxShadow: '0 0 10px #28cd41',
              }}
            />
            <span
              className="tag-mono"
              style={{
                color: '#fff',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
              }}
            >
              PLAYING [{activeIndex + 1} OF {videos.length}]: {activeVideo.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Video"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                borderRadius: '4px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Video"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                borderRadius: '4px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                borderRadius: '4px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Maximize2 size={13} />
              <span>Cinema Mode</span>
            </button>
          </div>
        </div>

        {/* Video Viewport */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#050506',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: isVertical ? '560px' : '440px',
            padding: isVertical ? '1.5rem 0.5rem' : '0',
          }}
        >
          {activeEmbed.embedUrl ? (
            <iframe
              key={activeVideo.url}
              src={activeEmbed.embedUrl}
              title={activeVideo.title}
              style={{
                width: isVertical ? 'min(100%, 420px)' : '100%',
                height: isVertical ? '540px' : '480px',
                border: 'none',
                borderRadius: isVertical ? '8px' : '0',
                boxShadow: isVertical ? '0 12px 36px rgba(0, 0, 0, 0.6)' : 'none',
                backgroundColor: '#000',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>
              <p>Media Preview available</p>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff3b30', textDecoration: 'underline' }}
              >
                Open directly
              </a>
            </div>
          )}
        </div>

        {/* Active Video Meta Details */}
        <div
          style={{
            padding: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#0f0f12',
            color: '#fff',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
              <span
                className="tag-mono"
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 650,
                  color: '#ff3b30',
                }}
              >
                {activeEmbed.platform === 'reel'
                  ? 'INSTAGRAM REEL'
                  : activeEmbed.platform === 'post'
                  ? 'CAMPAIGN POST'
                  : activeEmbed.platform === 'youtube'
                  ? 'YOUTUBE FILM'
                  : activeEmbed.platform === 'drive'
                  ? 'DRIVE MASTER'
                  : 'CLIENT MEDIA'}
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>&bull;</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                {brandTitle}
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', margin: 0 }}>
              {activeVideo.title}
            </h3>
            {activeVideo.caption && (
              <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.4rem', marginBottom: 0, maxWidth: '780px' }}>
                {activeVideo.caption}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#ff3b30',
              color: '#ffffff',
              padding: '0.65rem 1.25rem',
              borderRadius: '4px',
              fontWeight: 650,
              fontSize: '0.82rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            <Play size={14} fill="#fff" />
            <span>Theater Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Playlist Selector Grid */}
      <div>
        <div
          style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: '#888',
            marginBottom: '0.85rem',
            letterSpacing: '0.08em',
          }}
        >
          SELECT DELIVERABLE TO PLAY ({videos.length} AVAILABLE):
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1rem',
          }}
        >
          {videos.map((vid, idx) => {
            const isCurrent = idx === activeIndex;
            const embed = getEmbedInfo(vid.url);
            const badge =
              embed.platform === 'reel'
                ? 'REEL'
                : embed.platform === 'post'
                ? 'POST'
                : embed.platform === 'youtube'
                ? 'YOUTUBE'
                : embed.platform === 'drive'
                ? 'DRIVE'
                : 'MEDIA';

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  const hub = document.getElementById('video-proof-hub');
                  hub?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  textAlign: 'left',
                  padding: '1.15rem 1.25rem',
                  borderRadius: '6px',
                  backgroundColor: isCurrent ? '#0c0c0e' : '#ffffff',
                  color: isCurrent ? '#ffffff' : '#111111',
                  border: isCurrent ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: isCurrent
                    ? '0 8px 24px rgba(0, 0, 0, 0.15)'
                    : '0 2px 8px rgba(0, 0, 0, 0.03)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.65rem',
                    }}
                  >
                    <span
                      className="tag-mono"
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: isCurrent ? '#ff3b30' : '#888',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')} &bull; {badge}
                    </span>
                    {isCurrent ? (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          backgroundColor: 'rgba(255, 59, 48, 0.2)',
                          color: '#ff3b30',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '3px',
                          fontWeight: 600,
                        }}
                      >
                        PLAYING
                      </span>
                    ) : (
                      <Play size={13} color="#888" />
                    )}
                  </div>

                  <h4
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      lineHeight: 1.35,
                      margin: 0,
                      color: isCurrent ? '#ffffff' : '#111111',
                    }}
                  >
                    {vid.title}
                  </h4>

                  {vid.caption && (
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: isCurrent ? 'rgba(255, 255, 255, 0.65)' : '#666',
                        marginTop: '0.35rem',
                        lineHeight: 1.4,
                        marginBottom: 0,
                      }}
                    >
                      {vid.caption}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    marginTop: '0.85rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: isCurrent ? '#ff3b30' : '#111',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span>{isCurrent ? 'Currently Active' : 'Click to Play in Page'}</span>
                  &rarr;
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cinema Mode Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Close Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close Theater Player"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#fff',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10001,
            }}
          >
            <X size={20} />
          </button>

          {/* Modal Content */}
          <div
            style={{
              width: '100%',
              maxWidth: isVertical ? '480px' : '960px',
              height: isVertical ? 'min(85vh, 720px)' : 'auto',
              aspectRatio: isVertical ? 'auto' : '16/9',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#000',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {activeEmbed.embedUrl && (
              <iframe
                src={activeEmbed.embedUrl}
                title={activeVideo.title}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <div
            style={{
              marginTop: '1rem',
              color: '#fff',
              textAlign: 'center',
              maxWidth: '640px',
            }}
          >
            <h4 style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>{activeVideo.title}</h4>
            {activeVideo.caption && (
              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '0.35rem' }}>
                {activeVideo.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
