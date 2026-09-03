import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080E18] border-t border-white/10 text-white pt-20 pb-10">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
        {/* Main 4-Column Grid matching Figma Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image
                    src="/images/arohana-logo.png"
                    alt="ĀROHANA"
                    fill
                    sizes="28px"
                    style={{ objectFit: "contain" }}
                    className="invert brightness-200"
                  />
                </div>
                <div>
                  <span className="font-clash font-semibold text-lg tracking-[0.18em] text-white uppercase block leading-none">
                    ĀROHANA
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#8A919D] uppercase block mt-1">
                    CONSULTANCY
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-sm text-[#8A919D] leading-relaxed max-w-sm">
              We build brands, businesses &amp; experiences.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C5A46D] flex items-center justify-center font-mono text-[11px] text-[#8A919D] hover:text-[#C5A46D] transition-colors"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Col */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block font-mono text-[11px] font-semibold text-[#8A919D] uppercase tracking-[0.18em]">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs tracking-wide text-white/80">
              <li>
                <Link href="/about" className="hover:text-[#C5A46D] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C5A46D] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#C5A46D] transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/army-projects" className="hover:text-[#C5A46D] transition-colors">
                  Army Projects
                </Link>
              </li>
              <li>
                <Link href="/tourin" className="hover:text-[#C5A46D] transition-colors">
                  Tourin
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A46D] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block font-mono text-[11px] font-semibold text-[#8A919D] uppercase tracking-[0.18em]">
              SERVICES
            </span>
            <ul className="space-y-2.5 text-xs tracking-wide text-white/80">
              <li>
                <Link
                  href="/services/digital-brand-growth"
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Digital Brand Growth
                </Link>
              </li>
              <li>
                <Link
                  href="/services/hospitality-consulting"
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Hospitality Consulting
                </Link>
              </li>
              <li>
                <Link
                  href="/services/content-brand-production"
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Content &amp; Brand Production
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="block font-mono text-[11px] font-semibold text-[#8A919D] uppercase tracking-[0.18em]">
              CONTACT
            </span>
            <div className="space-y-2 text-xs tracking-wide text-white/80">
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#C5A46D] transition-colors break-words"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="text-[#8A919D] pt-1">
                Kolhapur, India
              </p>
            </div>
          </div>
        </div>

        {/* Subbar matching Figma Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A919D] font-mono">
          <div>
            &copy; {new Date().getFullYear()} Ārohana Consultancy. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

