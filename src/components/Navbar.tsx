"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "WORK", href: "/work" },
    { name: "SERVICES", href: "/services" },
    { name: "ABOUT", href: "/about" },
    { name: "TOURIN", href: "/tourin" },
    { name: "SPECIAL PROJECTS", href: "/indian-army-projects" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050505]/85 backdrop-blur-md py-4 border-b border-white/10"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-85"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
              <Image
                src="/assets/arohana-logo.png"
                alt="Ārohana Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-white font-display text-2xl md:text-3xl tracking-wider font-bold">
              ĀROHANA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[12px] font-mono tracking-[0.2em] uppercase transition-colors nav-link-hover ${
                    isActive ? "text-white font-semibold active text-[#FE320A]" : "text-text-secondary hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Menu Trigger Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white/70 hover:text-white p-1 transition-colors"
              aria-label="Open Overlay Menu"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white p-2"
              aria-label="Open Navigation"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Overlay Navigation (Matching Figma Specification) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-between p-8 md:p-16 animate-fadeIn">
          
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                <Image
                  src="/assets/arohana-logo.png"
                  alt="Ārohana Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white font-display text-3xl font-bold tracking-wider">
                ĀROHANA
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2 hover:opacity-75 transition-opacity"
              aria-label="Close Navigation"
            >
              <X className="w-8 h-8 stroke-[1.5]" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto">
            {[
              { name: "01. WORK", href: "/work" },
              { name: "02. SERVICES", href: "/services" },
              { name: "03. ABOUT FOUNDER", href: "/about" },
              { name: "04. TOURIN LADAKH", href: "/tourin" },
              { name: "05. SPECIAL PROJECTS", href: "/indian-army-projects" },
              { name: "06. CONTACT", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-4xl sm:text-6xl md:text-7xl text-white hover:text-[#FE320A] transition-colors tracking-tight uppercase flex items-center justify-between group"
              >
                <span>{item.name}</span>
                <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between text-xs font-mono text-text-muted gap-4">
            <div>
              ĀROHANA CONSULTANCY — WE BUILD BRANDS, BUSINESSES & EXPERIENCES.
            </div>
            <div className="flex gap-6">
              <a href="mailto:founder@byarohana.com" className="text-white hover:underline">
                founder@byarohana.com
              </a>
              <a href="tel:+918380092241" className="text-white hover:underline">
                +91 8380092241
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
