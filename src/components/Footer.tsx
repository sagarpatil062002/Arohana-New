"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AROHANA_CONTENT } from "@/data/content";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#050505] text-white pt-20 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main 4-Column Grid (Figma Specification) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-85 mb-6"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20">
                <Image
                  src="/assets/arohana-logo.png"
                  alt="Ārohana Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white font-display text-3xl md:text-4xl font-bold tracking-wider">
                ĀROHANA
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed font-sans max-w-[360px] mb-6">
              We build brands, businesses & experiences. Ārohana combines business thinking, creative communication and execution across digital brand growth, hospitality consulting and content production.
            </p>
            <div className="text-xs font-mono text-text-muted space-y-1">
              <div>FOUNDER: <a href="mailto:founder@byarohana.com" className="text-white hover:underline">founder@byarohana.com</a></div>
              <div>DIRECT: <a href="tel:+918380092241" className="text-white hover:underline">+91 8380092241</a></div>
            </div>
          </div>

          {/* Column 2: MENU */}
          <div>
            <h4 className="font-mono text-xs text-text-muted tracking-[0.2em] uppercase mb-6">
              MENU
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/work" className="text-text-secondary hover:text-white transition-colors">
                  Work & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-white transition-colors">
                  Services & Capabilities
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-white transition-colors">
                  About & Founder Story
                </Link>
              </li>
              <li>
                <Link href="/tourin" className="text-text-secondary hover:text-white transition-colors">
                  Tourin Experiential Travel
                </Link>
              </li>
              <li>
                <Link href="/indian-army-projects" className="text-text-secondary hover:text-white transition-colors">
                  Special Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-white transition-colors">
                  Start a Conversation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICES */}
          <div>
            <h4 className="font-mono text-xs text-text-muted tracking-[0.2em] uppercase mb-6">
              SERVICES
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/services" className="text-text-secondary hover:text-white transition-colors">
                  Digital Brand Growth
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-white transition-colors">
                  Hospitality Consulting
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-white transition-colors">
                  Content & Production
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-white transition-colors">
                  On-Ground Execution
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-white transition-colors">
                  Hybrid Engagements
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: STAY UPDATED (Newsletter) */}
          <div>
            <h4 className="font-mono text-xs text-text-muted tracking-[0.2em] uppercase mb-6">
              STAY UPDATED
            </h4>
            <p className="text-xs text-text-muted mb-4 font-sans">
              Subscribe to our editorial dispatches on strategy and brand growth.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent border-b border-white/20 pb-3 pr-8 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-white transition-colors font-sans"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-3 text-text-muted hover:text-white transition-colors"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] font-mono text-emerald-400 mt-2">
                Thank you for subscribing.
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-white/5 flex gap-4 text-xs font-mono text-text-muted">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                IG
              </a>
              <span>•</span>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                LN
              </a>
              <span>•</span>
              <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                BE
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Legal Bar (Figma Specification) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-text-muted gap-4">
          <div>
            © 2026 Ārohana Consultancy. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
