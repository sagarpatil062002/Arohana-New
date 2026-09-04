'use client';

import React from 'react';
import Link from 'next/link';
import FroxenButton from '@/components/ui/FroxenButton';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#060607] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-froxen-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Callout */}
        <div className="flex items-center gap-2 mb-8">
          <span className="pulse-dot" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Let's build together
          </span>
        </div>

        {/* Oversized Statement */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white leading-[0.88] tracking-tight max-w-5xl">
            IF YOU'RE BUILDING SOMETHING SERIOUS, LET'S TALK ABOUT WHAT IT ACTUALLY NEEDS.
          </h2>
        </div>

        {/* CTA & Direct Contact Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-16 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            <FroxenButton href="/contact" variant="lime">
              Start a Conversation
            </FroxenButton>
            <FroxenButton href="/work" variant="outline">
              See Our Work
            </FroxenButton>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                Direct Email
              </p>
              <a
                href="mailto:founder@byarohana.com"
                className="text-neutral-200 hover:text-froxen-lime transition-colors font-medium"
              >
                founder@byarohana.com
              </a>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                Direct Line
              </p>
              <a
                href="tel:+918380092241"
                className="text-neutral-200 hover:text-froxen-lime transition-colors font-medium"
              >
                +91 8380092241
              </a>
            </div>
          </div>
        </div>

        {/* Navigation & Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-sm border-b border-white/10">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/work" className="text-neutral-300 hover:text-froxen-lime transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-froxen-lime transition-colors">
                  About the Founder
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-300 hover:text-froxen-lime transition-colors">
                  Capabilities &amp; Services
                </Link>
              </li>
              <li>
                <Link href="/tourin" className="text-neutral-300 hover:text-froxen-lime transition-colors">
                  Tourin (Travel)
                </Link>
              </li>
              <li>
                <Link href="/indian-army-projects" className="text-neutral-300 hover:text-froxen-lime transition-colors">
                  Indian Army Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
              Practice Areas
            </p>
            <ul className="space-y-2.5 text-neutral-400">
              <li>Digital Brand Growth</li>
              <li>Hospitality Consulting</li>
              <li>Content &amp; Brand Production</li>
              <li>Institutional Briefs</li>
              <li>Experiential Tourism</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
              Locations
            </p>
            <ul className="space-y-2.5 text-neutral-400">
              <li>Goa (Creative Base)</li>
              <li>Ladakh (Field &amp; Production)</li>
              <li>Mumbai (Commercial Network)</li>
              <li>Kolhapur (Heritage &amp; Roots)</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
              Standard
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Ārohana brings together commercial context, sector understanding and creative execution needed to move from an idea to something people can actually see, understand and act on.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wider">ĀROHANA</span>
            <span>© 2026 ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-6">
            <span>INSPIRED BY FROXEN</span>
            <span>STRATEGY &amp; CRAFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
