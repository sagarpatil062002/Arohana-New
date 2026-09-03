"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroOverlayProps {
  progress: number;
  onSkip: () => void;
  isSettled: boolean;
}

export default function HeroOverlay({ progress, onSkip, isSettled }: HeroOverlayProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Tourin", href: "/tourin" },
    { label: "Contact", href: "/contact" }
  ];

  // Opening telemetry visibility
  const showTelemetry = progress < 0.75;
  // Hero elements visibility (fades in as camera pulls back)
  const heroOpacity = Math.max(0, Math.min(1, (progress - 0.45) / 0.55));

  return (
    <div className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none pointer-events-none">
      
      {/* ========================================================
          1. OPENING TELEMETRY (VISIBLE DURING MACRO EXPLORATION)
          ======================================================== */}
      <div
        className={`absolute top-6 left-6 right-6 sm:top-10 sm:left-10 sm:right-10 flex items-center justify-between transition-opacity duration-700 pointer-events-auto ${
          showTelemetry ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.24em] text-white/50 uppercase">
            ĀROHANA // SPATIAL ARCHIVE
          </span>
        </div>

        <button
          onClick={onSkip}
          className="font-mono text-[10px] tracking-[0.2em] text-white/40 hover:text-white/80 uppercase transition-colors px-2 py-1"
          aria-label="Skip opening animation"
        >
          [ ESC TO ENTER ]
        </button>
      </div>

      {/* ========================================================
          2. MINIMAL INTEGRATED NAVIGATION (FADES IN AS CAMERA SETTLES)
          ======================================================== */}
      <header
        className="w-full flex items-center justify-between transition-all duration-1000 ease-out pointer-events-auto"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${(1 - heroOpacity) * -15}px)`
        }}
      >
        {/* Brand Mark Logo (Authentic Ārohana Asset) */}
        <Link
          href="/"
          className="flex items-center group transition-opacity hover:opacity-80"
          aria-label="Ārohana Consultancy Home"
        >
          <div className="relative w-28 sm:w-32 md:w-36 h-6 sm:h-7">
            <Image
              src="/images/arohana-logo.png"
              alt="ĀROHANA"
              fill
              sizes="(max-width: 640px) 112px, 144px"
              style={{
                objectFit: "contain",
                filter: "brightness(0) invert(1)"
              }}
              priority
            />
          </div>
        </Link>

        {/* Minimal Desktop Links */}
        <nav
          className="hidden md:flex items-center space-x-8 lg:space-x-10"
          aria-label="Primary Navigation"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] lg:text-xs font-mono tracking-[0.18em] uppercase text-white/65 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center gap-2 text-white/80 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
          <div className="w-5 h-3.5 relative flex flex-col justify-between">
            <span
              className={`w-full h-[1.5px] bg-white transition-transform duration-300 origin-center ${
                mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`w-full h-[1.5px] bg-white transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-full h-[1.5px] bg-white transition-transform duration-300 origin-center ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* ========================================================
          3. SPATIAL HERO TYPOGRAPHY (SURROUNDING THE 3D SCULPTURE)
          ======================================================== */}
      <div
        className="my-auto w-full max-w-[1360px] mx-auto text-center flex flex-col items-center justify-center transition-all duration-1000 ease-out pointer-events-auto"
        style={{
          opacity: heroOpacity,
          transform: `scale(${0.96 + heroOpacity * 0.04}) translateY(${(1 - heroOpacity) * 20}px)`
        }}
      >
        {/* Subtle Category Microtag */}
        <div className="overflow-hidden mb-4 sm:mb-6">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.32em] text-[#C5A46D] uppercase">
            BRAND · BUSINESS · EXPERIENCE
          </span>
        </div>

        {/* Monumental Master Statement */}
        <h1 className="font-clash text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.4rem] font-medium tracking-[-0.03em] uppercase leading-[0.94] text-white max-w-5xl mx-auto drop-shadow-2xl">
          <span className="block">WE BUILD BRANDS,</span>
          <span className="block text-white/90">BUSINESSES &amp;</span>
          <span className="block text-[#F3EFE6]">EXPERIENCES.</span>
        </h1>

        {/* Supporting Editorial Line & Subtle CTA */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <span className="font-mono text-xs sm:text-sm text-white/50 tracking-wider">
            A strategic creative practice for ambitious enterprises.
          </span>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-white tracking-[0.14em] uppercase border-b border-[#C5A46D] pb-0.5 hover:text-[#C5A46D] transition-colors"
          >
            <span>Start a conversation</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* ========================================================
          4. BOTTOM EDITORIAL COORDINATES & STATUS
          ======================================================== */}
      <footer
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.08] pt-4 sm:pt-5 transition-all duration-1000 ease-out pointer-events-auto"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${(1 - heroOpacity) * 10}px)`
        }}
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase">
            [ 16°41&apos;N 74°14&apos;E — MUMBAI · GOA · LADAKH ]
          </span>
        </div>

        {/* Subtle Scroll Prompt */}
        <a
          href="#marquee"
          className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-white/50 hover:text-[#C5A46D] transition-colors uppercase"
        >
          <span>Scroll to explore</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
        </a>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-white/40 uppercase">
            EST. 2020 · ARCHITECTURAL // 3D
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
        </div>
      </footer>

      {/* ========================================================
          5. MOBILE MENU DRAWER OVERLAY
          ======================================================== */}
      <div
        className={`fixed inset-0 z-50 bg-[#050811] text-white flex flex-col justify-between p-8 pt-24 transition-all duration-500 md:hidden pointer-events-auto ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6">
          <span className="font-mono text-[10px] tracking-[0.24em] text-[#C5A46D] uppercase">
            INDEX // NAVIGATION
          </span>
          <nav className="flex flex-col space-y-5">
            {navLinks.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-clash text-2xl sm:text-3xl font-light tracking-tight text-white/80 hover:text-white flex items-center justify-between border-b border-white/[0.08] pb-3"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/[0.08] pt-6 flex flex-col space-y-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
            ĀROHANA CONSULTANCY
          </span>
          <span className="font-mono text-xs text-white/60">
            We build brands, businesses &amp; experiences.
          </span>
          <span className="font-mono text-[10px] text-white/40 pt-2">
            MUMBAI · GOA · LADAKH
          </span>
        </div>
      </div>
    </div>
  );
}
