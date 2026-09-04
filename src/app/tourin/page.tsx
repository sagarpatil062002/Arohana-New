'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Compass, Check } from 'lucide-react';

export default function TourinPage() {
  const journeys = [
    {
      title: 'The Slow Ladakh Odyssey',
      duration: '8 Days / 7 Nights',
      type: 'Cultural Immersion & Slow Exploration',
      desc: 'Leh, Sham Valley, Thiksey, and hidden Indus villages. Staying at heritage homestays, eating local cuisine, and walking ancient paths without rushing.',
      image: '/images/tourin/tourin-gallery-1.jpg',
    },
    {
      title: 'Nubra Valley & The Silk Route',
      duration: '7 Days / 6 Nights',
      type: 'High Passes, Deserts & Monasteries',
      desc: 'Crossing Khardung La into the dramatic dune valleys of Hunder and Diskit, spending time with local artisans, and discovering village monasteries.',
      image: '/images/tourin/tourin-gallery-2.jpg',
    },
    {
      title: 'Changthang High Lakes & Nomads',
      duration: '9 Days / 8 Nights',
      type: 'Wild Plateaus & High-Altitude Waters',
      desc: 'Expedition across Pangong Tso, Tso Moriri, and the Changpa nomadic settlements. Experience raw silence and vast Himalayan skies.',
      image: '/images/tourin/tourin-gallery-3.jpg',
    },
  ];

  const galleryImages = [
    '/images/tourin/tourin-hero.jpg',
    '/images/tourin/tourin-1.jpg',
    '/images/tourin/tourin-2.jpg',
    '/images/tourin/tourin-3.jpg',
    '/images/tourin/tourin-gallery-4.jpg',
    '/images/tourin/tourin-gallery-5.jpg',
  ];

  return (
    <div className="section-light" style={{ paddingTop: '3rem', paddingBottom: '8rem' }}>
      <div className="padding-global container-large">
        {/* Back Link */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/"
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
            <ArrowLeft size={16} /> BACK TO HOME
          </Link>
        </div>

        {/* Hero Section */}
        <div style={{ maxWidth: '1080px', marginBottom: '4rem' }}>
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
            <Compass size={16} />
            OWNED EXPERIENTIAL TRAVEL BRAND
          </div>

          <h1
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.2rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              color: '#111111',
              marginBottom: '1.75rem',
            }}
          >
            Travel beyond the itinerary.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              color: '#444444',
              lineHeight: 1.5,
              maxWidth: '860px',
            }}
          >
            Some places are better experienced when you stop trying to see everything. Tourin creates
            experiential journeys for travellers who want more than a checklist of sights — beginning with
            Ladakh.
          </p>
        </div>

        {/* Hero Image */}
        <div style={{ marginBottom: '6rem' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 'clamp(24px, 3.5vw, 40px)',
              overflow: 'hidden',
              backgroundColor: '#0c0c0e',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.12)',
            }}
          >
            <Image
              src="/images/tourin/tourin-hero.jpg"
              alt="Tourin Experiential Ladakh"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.85rem',
              color: '#666',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Lived moments, high mountain passes and authentic cultural roots across Ladakh.
          </p>
        </div>

        {/* Narrative Grid: Why Tourin & What We Believe */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            marginBottom: '7rem',
          }}
        >
          <div
            style={{
              padding: 'clamp(2rem, 3.5vw, 3.5rem)',
              borderRadius: '28px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem' }}>
              01 • THE GENESIS
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              Why Tourin came to be
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6, marginBottom: '1rem' }}>
              Tourin came from a simple realisation: the Ladakh people experience and the Ladakh most
              commercial itineraries sell are not always the same.
            </p>
            <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
              There is the Ladakh of famous passes, lakes and tourist photos. And then there is the place
              behind them — its people, food, stories, homes, landscapes, silences and everyday life.
              Tourin was created to make space for the second one.
            </p>
          </div>

          <div
            style={{
              padding: 'clamp(2rem, 3.5vw, 3.5rem)',
              borderRadius: '28px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '1rem' }}>
              02 • TRAVEL PHILOSOPHY
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 500, marginBottom: '1.25rem', color: '#111' }}>
              What we believe
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6, marginBottom: '1rem' }}>
              A good trip should leave you with more than photographs. It should give you a sense of
              where you were.
            </p>
            <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
              That means eating something you have never tried, spending time with a local family,
              staying somewhere deeply connected to its surroundings, taking a slower route, or simply
              having enough time to notice the place instead of rushing through it.
            </p>
          </div>
        </div>

        {/* Verified Proof Banner */}
        <div
          style={{
            borderRadius: '28px',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            marginBottom: '7rem',
          }}
        >
          <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '1rem' }}>
            VERIFIED PROOF OF EXECUTION
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2.5rem',
            }}
          >
            <div style={{ maxWidth: '650px' }}>
              <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '1rem' }}>
                15+ separate curated journeys completed.
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                From solo cultural travellers and couples to a full 20-biker Himalayan expedition —
                demonstrating reliable on-ground high-altitude logistical execution.
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                fontWeight: 600,
                color: '#ff3b30',
                lineHeight: 0.9,
              }}
            >
              15+
            </div>
          </div>
        </div>

        {/* Curated Journeys */}
        <div style={{ marginBottom: '7rem' }}>
          <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem' }}>
            OUR JOURNEYS
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: '3.5rem',
              color: '#111',
            }}
          >
            Thoughtfully planned Ladakh itineraries
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {journeys.map((j) => (
              <div
                key={j.title}
                style={{
                  borderRadius: '24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                  <Image src={j.image} alt={j.title} fill style={{ objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {j.duration}
                  </div>
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="tag-mono" style={{ color: '#ff3b30', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    {j.type}
                  </div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 500, marginBottom: '0.75rem', color: '#111' }}>
                    {j.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>
                    {j.desc}
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#111',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    INQUIRE ABOUT THIS TRIP <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Gallery */}
        <div style={{ marginBottom: '7rem' }}>
          <div className="tag-mono" style={{ color: '#888', marginBottom: '1rem' }}>
            ON-GROUND GALLERY
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: '3.5rem',
              color: '#111',
            }}
          >
            Moments, landscapes and people
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {galleryImages.map((src, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#eee',
                }}
              >
                <Image src={src} alt="Tourin Ladakh" fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div
          style={{
            padding: '4rem clamp(1.5rem, 4vw, 4rem)',
            borderRadius: '28px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 500, color: '#111' }}>
              Come travel differently.
            </h3>
            <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1.05rem' }}>
              Talk to us about designing a custom Ladakh journey for you or your group.
            </p>
          </div>

          <Link href="/contact" className="button-editorial button-editorial-dark" style={{ height: '48px', padding: '0 1.75rem' }}>
            <div className="button-texts-slider">
              <span className="button-text-item">Plan a Journey</span>
              <span className="button-text-item">Plan a Journey</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
