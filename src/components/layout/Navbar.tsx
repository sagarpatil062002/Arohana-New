'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Studio', href: '/about' },
    { label: 'Work', href: '/work', badge: '6' },
    { label: 'Services', href: '/services' },
    { label: 'Tourin', href: '/tourin' },
    { label: 'Army Projects', href: '/indian-army-projects' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled ? 'rgba(245, 245, 243, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid transparent',
      }}
    >
      <div
        className="padding-global"
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: '#111111',
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            Ārohana
            <span style={{ fontSize: '0.75rem', marginLeft: '2px', fontWeight: 400 }}>®</span>
          </span>

          {/* Barcode / Studio Glyph */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.5rem',
              borderLeft: '1px solid rgba(0, 0, 0, 0.15)',
              paddingLeft: '0.85rem',
              marginLeft: '0.25rem',
            }}
            className="navbar-brand-badge"
          >
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '14px' }}>
              <span style={{ width: '2px', height: '14px', backgroundColor: '#111' }} />
              <span style={{ width: '1px', height: '14px', backgroundColor: '#111' }} />
              <span style={{ width: '3px', height: '14px', backgroundColor: '#111' }} />
              <span style={{ width: '1px', height: '14px', backgroundColor: '#111' }} />
              <span style={{ width: '2px', height: '14px', backgroundColor: '#111' }} />
              <span style={{ width: '4px', height: '14px', backgroundColor: '#111' }} />
              <span style={{ width: '1px', height: '14px', backgroundColor: '#111' }} />
            </div>
            <span
              className="tag-mono"
              style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.12em' }}
            >
              CONSULTANCY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#000000' : '#444444',
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
                {link.badge && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#ff3b30',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Link
            href="/contact"
            className="button-editorial navbar-cta"
            style={{ height: '40px', padding: '0 1.15rem' }}
          >
            <div className="button-texts-slider">
              <span className="button-text-item desktop-text">Start a conversation</span>
              <span className="button-text-item desktop-text">Start a conversation</span>
            </div>
            <span className="mobile-text" style={{ display: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
              Contact
            </span>
            <div className="button-dot-wrap">
              <div className="button-dot" />
              <div className="button-dot-pulse" />
            </div>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              color: '#111',
              flexShrink: 0,
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#f5f5f3',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '1.75rem 1.25rem 2.25rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxHeight: 'calc(100vh - 76px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#000000' : '#333333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {link.label}
                    {link.badge && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: '#ff3b30',
                          color: '#ffffff',
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight size={18} color="#888" />
                </Link>
              );
            })}
          </div>

          {/* Mobile Drawer Direct Contact Section */}
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Link
              href="/contact"
              className="button-editorial button-editorial-dark"
              style={{ height: '48px', width: '100%', justifyContent: 'center' }}
            >
              <span>Start a conversation</span>
              <ArrowUpRight size={16} />
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: '#666' }}>
              <div>
                Email:{' '}
                <a href="mailto:founder@byarohana.com" style={{ color: '#111', fontWeight: 500 }}>
                  founder@byarohana.com
                </a>
              </div>
              <div>
                Phone:{' '}
                <a href="tel:+918380092241" style={{ color: '#111', fontWeight: 500 }}>
                  +91 8380092241
                </a>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Pune • Ladakh • Pan-India Engagements
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 639px) {
          .navbar-cta .desktop-text {
            display: none !important;
          }
          .navbar-cta .mobile-text {
            display: inline-block !important;
          }
          .navbar-cta {
            padding: 0 0.85rem !important;
            gap: 0.5rem !important;
          }
        }
        @media (max-width: 360px) {
          .navbar-cta {
            display: none !important;
          }
        }
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .navbar-brand-badge {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
