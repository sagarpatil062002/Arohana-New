"use client";

import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export default function CtaSection() {
  const { brand } = AROHANA_MASTER_CONTENT;

  return (
    <section className="relative bg-[#050505] text-white pt-28 pb-32 px-6 md:px-12 border-b border-white/10 overflow-hidden">
      
      {/* Sundown Glowing Bottom Ambient Shape */}
      <div className="sundown-glow-shape bottom-[-30%] left-[20%] opacity-70" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-[#FE320A] uppercase block mb-4">
            ● START A CONVERSATION
          </span>
          <h2 className="font-display font-display-section text-[44px] sm:text-[64px] md:text-[84px] lg:text-[100px] text-white leading-none mb-8">
            IF YOU'RE BUILDING SOMETHING SERIOUS, LET'S TALK ABOUT WHAT IT ACTUALLY NEEDS.
          </h2>
          <p className="text-lg md:text-xl text-[#BDBDBD] font-sans leading-relaxed mb-10 max-w-2xl">
            Don't start with a service. Start with the problem. Tell us what you are trying to build, fix or change.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="sundown-pill-btn bg-[#FE320A] border-[#FE320A] text-white shadow-xl shadow-[#FE320A]/30 text-base py-4 px-10"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-white/80">
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-2 hover:text-[#FE320A] transition-colors p-2 bg-white/5 border border-white/10"
              >
                <Mail className="w-4 h-4 text-[#FE320A]" />
                <span>{brand.email}</span>
              </a>
              <a
                href={`tel:${brand.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-[#FE320A] transition-colors p-2 bg-white/5 border border-white/10"
              >
                <Phone className="w-4 h-4 text-[#FE320A]" />
                <span>{brand.phone}</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Giant Bottom Reveal Typography (Sundown Studio Signature) */}
      <div className="relative z-10 max-w-[1440px] mx-auto mt-20 pt-12 border-t border-white/10 select-none pointer-events-none">
        <div className="font-display text-[16vw] leading-none tracking-tighter text-white/10 text-center">
          ĀROHANA
        </div>
      </div>

    </section>
  );
}
