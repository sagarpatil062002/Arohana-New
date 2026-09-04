'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FroxenButton from '@/components/ui/FroxenButton';
import FroxenOffCanvasMenu from './FroxenOffCanvasMenu';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'ABOUT', href: '/about' },
    { label: 'SERVICES', href: '/services' },
    { label: 'TOURIN', href: '/tourin' },
    { label: 'INDIAN ARMY', href: '/indian-army-projects' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          isScrolled
            ? 'py-3 bg-[#060607]/85 backdrop-blur-xl border-b border-white/8 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="font-display text-2xl md:text-3xl font-black tracking-wider text-white group-hover:text-froxen-lime transition-colors duration-300">
              ĀROHANA
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-neutral-400 border border-white/10 px-2 py-0.5 rounded-full group-hover:border-froxen-lime/40 group-hover:text-white transition-all">
              CONSULTANCY
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                    isActive
                      ? 'text-froxen-lime'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-froxen-lime rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Rolling CTA Button & Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <FroxenButton href="/contact" variant="primary">
                Start a Conversation
              </FroxenButton>
            </div>

            {/* Menu Toggle Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 p-2 rounded-full border border-white/10 hover:border-froxen-lime/50 bg-white/[0.03] hover:bg-white/[0.06] transition-all cursor-pointer group"
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-1.5 px-2 py-1">
                <span className="w-5 h-[1.5px] bg-white group-hover:bg-froxen-lime group-hover:w-6 transition-all" />
                <span className="w-4 h-[1.5px] bg-white group-hover:bg-froxen-lime group-hover:w-6 transition-all" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Off-canvas Menu */}
      <FroxenOffCanvasMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Header;
