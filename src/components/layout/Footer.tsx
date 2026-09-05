'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Footer() {
  const pathname = usePathname();
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === '/tourin') return;
    gsap.registerPlugin(ScrollTrigger);

    const el = brandRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true,
        },
      }
    );
  }, [pathname]);

  if (pathname === '/tourin') {
    return null;
  }

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        paddingTop: '5rem',
        paddingBottom: '2rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="padding-global container-large">
        {/* Main Footer Links & Newsletter Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Column 1: Navigation */}
          <div>
            <div
              className="tag-mono"
              style={{ color: '#888888', marginBottom: '1.25rem' }}
            >
              EXPLORE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/" style={{ color: '#111', fontSize: '0.95rem' }}>
                Home
              </Link>
              <Link href="/about" style={{ color: '#111', fontSize: '0.95rem' }}>
                Studio & Philosophy
              </Link>
              <Link href="/work" style={{ color: '#111', fontSize: '0.95rem' }}>
                Selected Work <span style={{ color: '#ff3b30', fontSize: '0.75rem' }}>(06)</span>
              </Link>
              <Link href="/services" style={{ color: '#111', fontSize: '0.95rem' }}>
                Services & Capabilities
              </Link>
              <Link href="/indian-army-projects" style={{ color: '#111', fontSize: '0.95rem' }}>
                Indian Army Special Projects
              </Link>
              <Link href="/tourin" style={{ color: '#111', fontSize: '0.95rem' }}>
                Tourin — Experiential Ladakh
              </Link>
              <Link href="/contact" style={{ color: '#111', fontSize: '0.95rem' }}>
                Contact & Inquiries
              </Link>
            </div>
          </div>

          {/* Column 2: Featured Case Studies */}
          <div>
            <div
              className="tag-mono"
              style={{ color: '#888888', marginBottom: '1.25rem' }}
            >
              SELECTED WORK
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/work/raysons-group" style={{ color: '#555', fontSize: '0.9rem' }}>
                Raysons Group — Multi-business Growth
              </Link>
              <Link href="/work/loom-crafts" style={{ color: '#555', fontSize: '0.9rem' }}>
                Loom Crafts — Luxury Outdoor & Pre-fab
              </Link>
              <Link href="/work/picturetime" style={{ color: '#555', fontSize: '0.9rem' }}>
                PictureTime — High Altitude Cinema
              </Link>
              <Link href="/work/she" style={{ color: '#555', fontSize: '0.9rem' }}>
                SHE Project — Remote Community Initiative
              </Link>
              <Link href="/work/misu" style={{ color: '#555', fontSize: '0.9rem' }}>
                Misu — Hospitality Brand Scaling
              </Link>
              <Link href="/work/rr-skins" style={{ color: '#555', fontSize: '0.9rem' }}>
                RR Skins — Dermatological Education
              </Link>
            </div>
          </div>

          {/* Column 3: Direct Contact */}
          <div>
            <div
              className="tag-mono"
              style={{ color: '#888888', marginBottom: '1.25rem' }}
            >
              DIRECT CONTACT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>Direct Email</div>
                <a
                  href="mailto:founder@byarohana.com"
                  style={{
                    fontSize: '1rem',
                    color: '#111',
                    fontWeight: 500,
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                  }}
                >
                  founder@byarohana.com
                </a>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>Direct Phone</div>
                <a
                  href="tel:+918380092241"
                  style={{
                    fontSize: '1rem',
                    color: '#111',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  +91 83800 92241
                </a>
              </div>
              <div style={{ marginTop: '0.25rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>Presence</div>
                <div style={{ fontSize: '0.9rem', color: '#333' }}>
                  Goa · Kolhapur · Delhi · Ladakh
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter / Inquiries */}
          <div>
            <div
              className="tag-mono"
              style={{ color: '#888888', marginBottom: '1.25rem' }}
            >
              COMMUNICATION
            </div>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Don't start with a service. Start with the business problem. We respond within 24 hours.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for connecting with Ārohana.');
              }}
              style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                style={{
                  flex: '1 1 180px',
                  height: '46px',
                  padding: '0 1rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  fontSize: '16px',
                  backgroundColor: '#fafafa',
                  outline: 'none',
                  minWidth: '0',
                }}
              />
              <button
                type="submit"
                style={{
                  height: '46px',
                  padding: '0 1.25rem',
                  borderRadius: '9999px',
                  backgroundColor: '#111',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Connect <ArrowUpRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Metadata and Legal Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.75rem',
            paddingBottom: '2rem',
            fontSize: '0.8rem',
            color: '#777',
            gap: '1rem',
          }}
        >
          <div>© {new Date().getFullYear()} Ārohana Consultancy. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span>Business Thinking</span>
            <span>•</span>
            <span>Creative Communication</span>
            <span>•</span>
            <span>Execution</span>
          </div>
          <div>Authentic Strategy & Brand Practice</div>
        </div>

        {/* Giant Oversized Brand Typography with ScrollTrigger Reveal */}
        <div
          ref={brandRef}
          style={{
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            paddingTop: '2.5rem',
            paddingBottom: '1rem',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              height: 'clamp(50px, 12vw, 150px)',
            }}
          >
            <Image
              src="/images/arohana-logo.png"
              alt="ĀROHANA"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
