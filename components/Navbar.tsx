"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Menu, X, ArrowRight } from "lucide-react";

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
    { label: "ABOUT", href: "/about" },
    { label: "SERVICES", href: "/services" },
    { label: "WORK", href: "/work" },
    { label: "ARMY PROJECTS", href: "/army-projects" },
    { label: "TOURIN", href: "/tourin" },
    { label: "CONTACT", href: "/contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0F14]/90 backdrop-blur-md border-b border-white/10 py-3.5"
            : "bg-gradient-to-b from-[#0A0F14]/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Logo & Wordmark matching Figma */}
          <Link
            href="/"
            className="flex items-center gap-2 select-none group"
            aria-label="Ārohana Consultancy Home"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 flex-shrink-0">
                <Image
                  src="/images/arohana-logo.png"
                  alt="ĀROHANA"
                  fill
                  sizes="28px"
                  style={{ objectFit: "contain" }}
                  className="invert brightness-200"
                  priority
                />
              </div>
              <span className="font-clash font-semibold text-lg tracking-[0.18em] text-white uppercase group-hover:text-[#C5A46D] transition-colors">
                ĀROHANA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links matching Figma Screen 02/03 */}
          <nav
            className="hidden lg:flex items-center space-x-7"
            aria-label="Primary Navigation"
          >
            {navLinks.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] font-medium tracking-[0.14em] uppercase transition-all duration-200 relative py-1 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#8A919D] hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A46D] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Pill Button with Arrow + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 hover:border-[#C5A46D] bg-[#101622]/60 hover:bg-[#101622] text-white font-medium text-[11px] tracking-[0.12em] uppercase transition-all duration-300 group"
            >
              <span className="group-hover:text-[#C5A46D] transition-colors">START A CONVERSATION</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:text-[#C5A46D] group-hover:translate-x-0.5 transition-all" />
            </Link>

            {/* Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-white/15 text-white hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0F14]/98 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between p-8 sm:p-12 pt-28 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-5">
          <span className="text-[10px] font-mono text-[#8A919D] tracking-[0.2em] uppercase">
            NAVIGATION
          </span>
          <Link
            href="/"
            className={`font-clash text-2xl uppercase transition-colors ${
              pathname === "/" ? "text-[#C5A46D] font-bold" : "text-white/70 hover:text-white"
            }`}
          >
            HOME
          </Link>
          {navLinks.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-clash text-2xl uppercase transition-colors flex items-center justify-between ${
                  isActive ? "text-[#C5A46D] font-bold" : "text-white/70 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#C5A46D] text-[#0A0F14] font-bold text-xs uppercase tracking-wider hover:bg-[#D8BC8A] transition-colors"
          >
            <span>START A CONVERSATION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-center font-mono text-[11px] text-[#8A919D]">
            hello@arohana.co.in · Kolhapur, India
          </div>
        </div>
      </div>
    </>
  );
}

