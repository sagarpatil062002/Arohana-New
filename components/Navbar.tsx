"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Tourin", href: "/tourin" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#070B14]/90 backdrop-blur-md border-b border-white/[0.06] py-4"
            : "bg-transparent py-6 sm:py-8"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
          {/* Brand Mark Logo (Authentic Ārohana Asset) */}
          <Link
            href="/"
            className="flex items-center group transition-opacity hover:opacity-85"
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

          {/* Clean Desktop Editorial Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8 lg:space-x-10"
            aria-label="Primary Navigation"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] lg:text-xs font-mono tracking-[0.18em] uppercase transition-colors duration-200 relative py-1 ${
                    isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C5A46D]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 text-white/80 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-[1.5px] bg-white transition-transform duration-300 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`w-full h-[1.5px] bg-white transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-[1.5px] bg-white transition-transform duration-300 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#060911] text-white flex flex-col justify-between p-8 pt-28 transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex flex-col space-y-6">
          <span className="font-mono text-[10px] tracking-[0.24em] text-[#C5A46D] uppercase">
            NAVIGATION // INDEX
          </span>
          <nav className="flex flex-col space-y-5">
            {navLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-clash text-2xl sm:text-3xl font-light tracking-tight text-white/80 hover:text-white flex items-center justify-between border-b border-white/[0.08] pb-3"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-white/40">0{index + 1}</span>
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
    </>
  );
}
