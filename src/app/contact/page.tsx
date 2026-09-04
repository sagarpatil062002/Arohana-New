'use client';

import React from 'react';
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import FroxenButton from '@/components/ui/FroxenButton';

const STUDIO_LOCATIONS = [
  { city: 'Goa', role: 'Creative Studio & Operations', detail: 'Passcode & Coastal Hospitality Hub' },
  { city: 'Ladakh', role: 'Field Office & Tourin Operations', detail: 'High-Altitude Documentary & Border Sectors' },
  { city: 'Mumbai', role: 'Client Relations & Commercial Advisory', detail: 'Western Region Business Network' },
  { city: 'Kolhapur', role: 'Origins & Commercial Roots', detail: 'Mother India Cafe Heritage & Industry' },
];

export default function ContactPage() {
  return (
    <div className="bg-[#060607] min-h-screen text-[#ECECEF] pt-32 pb-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="pulse-dot" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            Direct Access · Founder &amp; Advisory Team
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-20 pb-12 border-b border-white/10">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase text-white leading-[0.86] tracking-tight mb-8">
            START A <br />
            <span className="text-froxen-lime">CONVERSATION.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal">
            If you're building something serious, let's talk about what it actually needs. Every conversation begins with understanding your business.
          </p>
        </div>

        {/* Grid: Inquiry Form (Left) + Direct Contact Details & Studios (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-28">
          {/* Form Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#09090c] border border-white/10 shadow-2xl">
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white mb-2 tracking-tight">
              Tell Us About The Brief
            </h2>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-8">
              DIRECT INQUIRY · DIRECT FOUNDER REVIEW
            </p>
            <ContactForm />
          </div>

          {/* Direct Details Column */}
          <div className="lg:col-span-5 space-y-10">
            {/* Direct Cards */}
            <div className="p-8 rounded-3xl bg-[#0e0e11] border border-white/10 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block">
                Direct Channels
              </span>

              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
                  Email
                </p>
                <a
                  href="mailto:founder@byarohana.com"
                  className="text-lg sm:text-xl font-medium text-white hover:text-froxen-lime transition-colors block"
                >
                  founder@byarohana.com
                </a>
              </div>

              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
                  Direct Phone &amp; WhatsApp
                </p>
                <a
                  href="tel:+918380092241"
                  className="text-lg sm:text-xl font-medium text-white hover:text-froxen-lime transition-colors block"
                >
                  +91 8380092241
                </a>
              </div>

              <div className="pt-4 border-t border-white/8 text-xs font-mono text-neutral-400 leading-relaxed">
                Expect a response within 24 to 48 business hours directly from Madhura Hawal or senior practice leads.
              </div>
            </div>

            {/* Studio Locations Grid */}
            <div className="p-8 rounded-3xl bg-[#0e0e11] border border-white/10">
              <span className="font-mono text-xs uppercase tracking-widest text-froxen-lime block mb-6">
                Studio Footprint
              </span>

              <div className="space-y-6">
                {STUDIO_LOCATIONS.map((loc) => (
                  <div key={loc.city} className="pb-4 border-b border-white/5 last:border-none last:pb-0">
                    <h3 className="font-display font-bold text-xl uppercase text-white tracking-tight">
                      {loc.city}
                    </h3>
                    <p className="text-xs text-neutral-300 font-medium">{loc.role}</p>
                    <p className="text-[11px] font-mono text-neutral-500 mt-0.5">{loc.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
