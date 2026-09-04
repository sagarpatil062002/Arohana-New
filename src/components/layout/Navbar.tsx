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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/contact" className="button-editorial" style={{ height: '42px', padding: '0 1.25rem' }}>
            <div className="button-texts-slider">
              <span className="button-text-item">Start a conversation</span>
              <span className="button-text-item">Start a conversation</span>
            </div>
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
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              color: '#111',
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
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-display)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={18} color="#888" />
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
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
