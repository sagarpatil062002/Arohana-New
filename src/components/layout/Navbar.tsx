'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  const isTourinDarkHero = pathname === '/tourin' && !isScrolled;

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
          position: 'relative',
        }}
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            zIndex: 2,
          }}
        >
          <Image
            src="/images/arohana-logo.png"
            alt="ĀROHANA"
            width={124}
            height={22}
            style={{
              height: '22px',
              width: 'auto',
              objectFit: 'contain',
              filter: isTourinDarkHero ? 'brightness(0) invert(1)' : 'none',
              transition: 'filter 0.3s ease',
            }}
            priority
          />
        </Link>

        {/* Desktop Navigation Links - Centered */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.25rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isTourin = link.href === '/tourin';
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isTourinDarkHero
                    ? isTourin
                      ? '#DE322D'
                      : 'rgba(255, 255, 255, 0.88)'
                    : isActive
                    ? isTourin
                      ? '#DE322D'
                      : '#000000'
                    : '#444444',
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

        {/* Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
              backgroundColor: isTourinDarkHero ? 'rgba(255, 255, 255, 0.12)' : '#ffffff',
              border: isTourinDarkHero
                ? '1px solid rgba(255, 255, 255, 0.25)'
                : '1px solid rgba(0, 0, 0, 0.08)',
              color: isTourinDarkHero ? '#ffffff' : '#111',
              flexShrink: 0,
              transition: 'all 0.3s ease',
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
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
