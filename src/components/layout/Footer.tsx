'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // For Tourin & Army Projects keep dedicated footer matching design; hide on admin
  if (pathname === '/tourin' || pathname === '/indian-army-projects' || pathname === '/army-projects' || pathname?.startsWith('/admin')) {
    return null;
  }

  const NAV_LINKS = [
    { label: 'Studio', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Tourin', href: '/tourin' },
    { label: 'Army Projects', href: '/indian-army-projects' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        color: '#111111',
        paddingTop: 'clamp(3.5rem, 5vw, 5rem)',
        paddingBottom: 'clamp(2rem, 3vw, 2.5rem)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <div
        className="padding-global"
        style={{ maxWidth: '1440px', margin: '0 auto' }}
      >
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.6fr 1.4fr 1fr',
            gap: 'clamp(2rem, 4vw, 4rem)',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}
          className="tourin-footer-grid"
        >
          {/* Column 1: ĀROHANA Brand (with Logo instead of Tourin) */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '0.65rem' }}>
              <Image
                src="/images/arohana-logo.png"
                alt="ĀROHANA"
                width={130}
                height={22}
                style={{ height: '22px', width: 'auto' }}
              />
            </Link>
            <p
              style={{
                color: '#666666',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '240px',
              }}
            >
              Business Thinking • Creative Communication • Execution across very different environments.
            </p>
          </div>

          {/* Column 2: ĀROHANA Nav */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#111111',
                marginBottom: '0.85rem',
              }}
            >
              ĀROHANA
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                fontSize: '0.85rem',
              }}
            >
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      color: isActive ? '#DE322D' : '#555555',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      fontWeight: isActive ? 600 : 400,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = isActive ? '#DE322D' : '#555555')
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 3: OFFICE */}
          <div>
            <div
              className="tag-mono"
              style={{
                color: '#888888',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              OFFICE
            </div>
            <div
              style={{
                color: '#555555',
                fontSize: '0.825rem',
                lineHeight: 1.6,
              }}
            >
              <div style={{ color: '#111111', fontWeight: 600, marginBottom: '0.25rem' }}>
                ĀROHANA Consultancy
              </div>
              <div>30, Goodwill Square, Aundh-Ravet BRTS Rd,</div>
              <div style={{ marginBottom: '0.75rem' }}>
                Near D Mart, Thergaon, Pune 411033, India.
              </div>

              <div>
                <a
                  href="mailto:founder@byarohana.com"
                  style={{
                    color: '#111111',
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: '0.2rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#DE322D')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#111111')}
                >
                  founder@byarohana.com
                </a>
                <a
                  href="tel:+918380092241"
                  style={{
                    color: '#555555',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
                >
                  +91 83800 92241
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: SOCIAL */}
          <div>
            <div
              className="tag-mono"
              style={{
                color: '#888888',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              SOCIAL
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem',
                fontSize: '0.825rem',
              }}
            >
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com' },
                { label: 'Instagram', href: 'https://instagram.com/arohana.studio' },
                { label: 'Behance', href: 'https://behance.net' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#555555',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            color: '#777777',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          <div>© {new Date().getFullYear()} ĀROHANA Consultancy. All Rights Reserved.</div>
          <div style={{ color: '#555555' }}>Pune • Ladakh • Pan-India Engagements</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ color: '#777777' }}>Authentic Strategy &amp; Brand Practice</span>
            <span style={{ color: 'rgba(0, 0, 0, 0.2)' }}>&bull;</span>
            <Link
              href="/admin"
              style={{
                color: '#888888',
                textDecoration: 'none',
                fontSize: '0.72rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#DE322D')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
            >
              Admin CRM
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
