'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3.5rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Column 1: Navigation */}
          <div>
            <div
              className="tag-mono"
              style={{ color: '#888888', marginBottom: '1.5rem' }}
            >
              EXPLORE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
              style={{ color: '#888888', marginBottom: '1.5rem' }}
            >
              SELECTED WORK
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <Link href="/work/raysons" style={{ color: '#555', fontSize: '0.9rem' }}>
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
              style={{ color: '#888888', marginBottom: '1.5rem' }}
            >
              DIRECT CONTACT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>Direct Email</div>
                <a
                  href="mailto:founder@byarohana.com"
                  style={{
                    fontSize: '1.05rem',
                    color: '#111',
                    fontWeight: 500,
                    textDecoration: 'none',
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
                    fontSize: '1.05rem',
                    color: '#111',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  +91 8380092241
                </a>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>Presence</div>
                <div style={{ fontSize: '0.95rem', color: '#333' }}>
                  Pune • Ladakh • Pan-India Engagements
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter / Inquiries */}
          <div>
            <div
              className="tag-mono"
              style={{ color: '#888888', marginBottom: '1.5rem' }}
            >
              COMMUNICATION
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.25rem' }}>
              Don't start with a service. Start with the business problem. We respond within 24 hours.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for connecting with Ārohana.');
              }}
              style={{ display: 'flex', gap: '0.5rem' }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  height: '46px',
                  padding: '0 1rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  fontSize: '0.875rem',
                  backgroundColor: '#fafafa',
                  outline: 'none',
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
            paddingTop: '2rem',
            paddingBottom: '2.5rem',
            fontSize: '0.8rem',
            color: '#777',
            gap: '1rem',
          }}
        >
          <div>© {new Date().getFullYear()} Ārohana Consultancy. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Business Thinking</span>
            <span>•</span>
            <span>Creative Communication</span>
            <span>•</span>
            <span>Execution</span>
          </div>
          <div>Authentic Strategy & Brand Practice</div>
        </div>

        {/* Giant Oversized Brand Typography */}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            paddingTop: '1.5rem',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 14.5vw, 16rem)',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
              color: '#111111',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            Ārohana
            <span
              style={{
                fontSize: 'clamp(1rem, 3.5vw, 3.5rem)',
                marginLeft: '0.5rem',
                color: '#ff3b30',
                fontWeight: 600,
              }}
            >
              ®
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
