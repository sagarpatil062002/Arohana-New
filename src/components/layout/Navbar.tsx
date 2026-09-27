'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react';

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

  interface NavLinkItem {
    label: string;
    href: string;
    badge?: string;
  }

  const navLinks: NavLinkItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Studio', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Tourin', href: '/tourin' },
    { label: 'Army Projects', href: '/indian-army-projects' },
    { label: 'Contact', href: '/contact' },
  ];

  const isTourin = pathname === '/tourin';
  const isArmyProjects = pathname === '/indian-army-projects' || pathname === '/army-projects';
  // Studio/About page uses light editorial styling matching design
  const isDarkHero = false;

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled
          ? isDarkHero
            ? 'rgba(10, 10, 10, 0.88)'
            : 'rgba(247, 247, 248, 0.92)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled
          ? isDarkHero
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.06)'
          : '1px solid transparent',
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
        {isTourin ? (
          <Link
            href="/tourin"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              zIndex: 2,
            }}
          >
            <Image
              src="/images/tourin/tourin-logo.png"
              alt="Tourin by Ārohana"
              width={120}
              height={44}
              style={{
                height: '44px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              priority
            />
          </Link>
        ) : (
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
                filter: isDarkHero ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.3s ease',
              }}
              priority
            />
          </Link>
        )}

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
            const isActive =
              pathname === link.href ||
              (link.href === '/indian-army-projects' && pathname === '/army-projects');
            const isTourin = link.href === '/tourin';
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isDarkHero
                    ? 'rgba(255, 255, 255, 0.88)'
                    : isActive
                    ? '#000000'
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
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: '2px',
                      backgroundColor: isDarkHero ? '#d4af37' : '#DE322D',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button (Desktop) & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isTourin ? (
            <Link
              href="/contact"
              className="desktop-header-cta"
              style={{
                height: '42px',
                padding: '0 1.5rem',
                backgroundColor: '#111111',
                color: '#ffffff',
                borderRadius: '4px',
                display: 'none',
                alignItems: 'center',
                gap: '0.55rem',
                fontSize: '0.84rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.16)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.backgroundColor = '#222222';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#111111';
              }}
            >
              <span>Plan a Journey</span>
              <ArrowUpRight size={14} />
            </Link>
          ) : (
            <Link
              href="/contact"
              className="desktop-header-cta"
              style={{
                height: '42px',
                padding: '0 1.45rem',
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '4px',
                display: 'none',
                alignItems: 'center',
                gap: '0.55rem',
                fontSize: '0.84rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.18)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.backgroundColor = '#222226';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#000000';
              }}
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight size={14} color="#ffffff" />
            </Link>
          )}

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
              backgroundColor: isDarkHero ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
              border: isDarkHero
                ? '1px solid rgba(255, 255, 255, 0.2)'
                : '1px solid rgba(0, 0, 0, 0.08)',
              color: isDarkHero ? '#ffffff' : '#111',
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
              backgroundColor: isDarkHero ? '#0a0a0a' : '#f5f5f3',
              borderBottom: isDarkHero ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
              padding: '1.75rem 1.25rem 2.25rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: 'calc(100vh - 76px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              boxShadow: isDarkHero ? '0 20px 40px rgba(0, 0, 0, 0.5)' : '0 20px 40px rgba(0, 0, 0, 0.08)',
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
                    color: isDarkHero
                      ? isActive
                        ? '#d4af37'
                        : 'rgba(255, 255, 255, 0.8)'
                      : isActive
                      ? '#000000'
                      : '#333333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0',
                    borderBottom: isDarkHero ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
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
                  <ArrowUpRight size={18} color={isDarkHero ? '#d4af37' : '#888'} />
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
              className="button-editorial"
              style={{
                height: '48px',
                width: '100%',
                justifyContent: 'center',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                fontWeight: 600,
              }}
            >
              <span>Start a conversation</span>
              <ArrowRight size={16} color="#ffffff" />
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: isDarkHero ? 'rgba(255, 255, 255, 0.5)' : '#666' }}>
              <div>
                Email:{' '}
                <a href="mailto:founder@byarohana.com" style={{ color: isDarkHero ? '#d4af37' : '#111', fontWeight: 500 }}>
                  founder@byarohana.com
                </a>
              </div>
              <div>
                Phone:{' '}
                <a href="tel:+918380092241" style={{ color: isDarkHero ? '#d4af37' : '#111', fontWeight: 500 }}>
                  +91 8380092241
                </a>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.25rem', color: isDarkHero ? 'rgba(255, 255, 255, 0.4)' : 'inherit' }}>
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
          .desktop-header-cta {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
