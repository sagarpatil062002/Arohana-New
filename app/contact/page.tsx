import React from "react";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/site";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Ārohana Consultancy. Tell us what you are trying to build, fix or change."
};

export default function ContactPage() {
  return (
    <div className="w-full bg-[#0D1524] text-white">
      {/* ==================== HERO (Figma Screen 09) ==================== */}
      <section className="pt-36 pb-16 border-b border-white/10 bg-gradient-to-b from-[#080E18] to-[#0D1524]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#C5A46D] font-bold">09</span>
              <span className="font-mono text-xs tracking-[0.2em] text-[#8A919D] uppercase">
                CONTACT
              </span>
            </div>
            <h1 className="font-clash text-4xl sm:text-6xl md:text-[4.5rem] font-bold uppercase leading-[1.02] tracking-tight text-white">
              START A CONVERSATION.
            </h1>
            <p className="text-base sm:text-xl text-[#8A919D] font-normal leading-relaxed pt-2 max-w-2xl">
              Tell us what you are trying to build, fix or change.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT FORM & DETAILS ==================== */}
      <section className="py-24 border-b border-white/10 bg-[#0A0F14]">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form Column */}
            <div className="lg:col-span-8 p-8 sm:p-12 rounded-sm bg-[#101622] border border-white/10">
              <ContactForm />
            </div>

            {/* Direct Contact & Locations Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 rounded-sm bg-[#101622] border border-white/10 space-y-6">
                <span className="eyebrow-label">DIRECT CHANNELS</span>
                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#C5A46D] flex-shrink-0 mt-1" />
                    <div>
                      <span className="block font-mono text-[10px] text-[#8A919D] uppercase tracking-widest">
                        EMAIL
                      </span>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-white hover:text-[#C5A46D] font-medium transition-colors"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#C5A46D] flex-shrink-0 mt-1" />
                    <div>
                      <span className="block font-mono text-[10px] text-[#8A919D] uppercase tracking-widest">
                        TELEPHONE
                      </span>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                        className="text-white hover:text-[#C5A46D] font-medium transition-colors"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C5A46D] flex-shrink-0 mt-1" />
                    <div>
                      <span className="block font-mono text-[10px] text-[#8A919D] uppercase tracking-widest">
                        BASE
                      </span>
                      <span className="text-[#8A919D]">
                        {siteConfig.contact.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Presence Theatres */}
              <div className="p-8 rounded-sm bg-[#101622] border border-white/10 space-y-4">
                <span className="eyebrow-label">ACTIVE SECTORS &amp; BASES</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {siteConfig.contact.locations.map((loc) => (
                    <span
                      key={loc}
                      className="px-3 py-1.5 rounded-full bg-[#0D1524] border border-white/10 text-xs font-mono text-[#8A919D]"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#8A919D] pt-2 leading-relaxed">
                  We deploy multidisciplinary teams pan-India, with on-ground execution experience across major metros, coastal hospitality hubs, and high-altitude frontier terrains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

