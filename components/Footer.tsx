"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Army Projects", href: "/army-projects" },
    { label: "Tourin", href: "/tourin" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <footer className="w-full bg-[#030509] border-t border-white/[0.08] text-white pt-20 pb-12 select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Top Dominant Brand Wordmark & Master Line */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.08] pb-14 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative w-36 sm:w-44 h-7 sm:h-8">
                <Image
                  src="/images/arohana-logo.png"
                  alt="ĀROHANA"
                  fill
                  sizes="180px"
                  style={{
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)"
                  }}
                  className="opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>

            <p className="font-clash text-2xl sm:text-3xl font-light text-white/80 uppercase tracking-tight max-w-lg">
              We build brands, businesses &amp; experiences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div>
              <span className="font-mono text-[9px] tracking-[0.24em] text-[#C5A46D] uppercase block mb-1">
                DIRECT ADVISORY
              </span>
              <a
                href="mailto:hello@arohana.co.in"
                className="font-mono text-sm text-white/80 hover:text-white transition-colors"
              >
                hello@arohana.co.in
              </a>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.24em] text-[#C5A46D] uppercase block mb-1">
                TELEPHONE
              </span>
              <a
                href="tel:+919876543210"
                className="font-mono text-sm text-white/80 hover:text-white transition-colors"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Operational Locations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/[0.08] text-xs font-mono">
          {/* Nav Links */}
          <div className="md:col-span-6 flex flex-wrap gap-x-8 gap-y-3 uppercase tracking-[0.16em]">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/60 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Locations */}
          <div className="md:col-span-6 flex md:justify-end items-center gap-4 text-white/40 tracking-wider">
            <span>OPERATING HUBS:</span>
            <span className="text-white/70">KOLHAPUR · GOA · DELHI · LADAKH</span>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
          <span>© {new Date().getFullYear()} ĀROHANA CONSULTANCY. ALL RIGHTS RESERVED.</span>
          <span>CULTURAL · COMMERCIAL · CINEMATIC</span>
        </div>
      </div>
    </footer>
  );
}
