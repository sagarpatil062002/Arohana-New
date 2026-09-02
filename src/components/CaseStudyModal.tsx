"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ArrowRight } from "lucide-react";
import { CaseStudy } from "@/data/content";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ caseStudy, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-lg flex justify-end animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="relative z-10 w-full max-w-3xl h-full bg-[#0D0D12] text-white p-8 md:p-14 overflow-y-auto border-l border-white/10 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors z-20"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="clear-both pt-2">
          
          <div className="text-xs font-mono text-text-muted tracking-[0.2em] uppercase mb-3">
            CASE STUDY // {caseStudy.sector}
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
            {caseStudy.title}
          </h2>

          <p className="text-lg md:text-xl text-text-secondary font-medium leading-snug mb-8 font-sans">
            {caseStudy.headline}
          </p>

          {/* Snapshot 4-Box Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white/[0.03] border border-white/10 rounded-sm mb-8 font-mono text-xs">
            <div>
              <span className="text-text-muted block text-[10px] uppercase tracking-wider mb-1">SECTOR</span>
              <span className="text-white font-semibold">{caseStudy.snapshot.sector}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px] uppercase tracking-wider mb-1">LOCATION</span>
              <span className="text-white font-semibold">{caseStudy.snapshot.location}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px] uppercase tracking-wider mb-1">ENGAGEMENT</span>
              <span className="text-white font-semibold">{caseStudy.snapshot.engagement}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px] uppercase tracking-wider mb-1">DURATION</span>
              <span className="text-white font-semibold">{caseStudy.snapshot.duration}</span>
            </div>
          </div>

          {/* Hero Media */}
          <div className="relative w-full aspect-video rounded-sm overflow-hidden mb-10 border border-white/10">
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              className="object-cover img-editorial"
            />
          </div>

          {/* Structured Editorial Narrative (500-900 Words Standard) */}
          <div className="space-y-8 font-sans text-[15px] md:text-base leading-relaxed text-text-secondary">
            
            <div>
              <h3 className="font-display text-xl text-white tracking-wider uppercase mb-3 flex items-center gap-2">
                <span>//</span> THE SITUATION
              </h3>
              <p>{caseStudy.situation}</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-white tracking-wider uppercase mb-3 flex items-center gap-2">
                <span>//</span> THE REAL CHALLENGE
              </h3>
              <p>{caseStudy.challenge}</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-white tracking-wider uppercase mb-3 flex items-center gap-2">
                <span>//</span> THE THINKING
              </h3>
              <p>{caseStudy.thinking}</p>
            </div>

            <div>
              <h3 className="font-display text-xl text-white tracking-wider uppercase mb-3 flex items-center gap-2">
                <span>//</span> THE WORK
              </h3>
              <ul className="space-y-3">
                {caseStudy.work.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-white/[0.02] border-l-2 border-white text-white/90">
                    <Check className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proof & Business Outcomes Box */}
            <div className="p-6 bg-gradient-to-r from-white/[0.08] to-white/[0.02] border border-white/20 rounded-sm">
              <h3 className="font-display text-xl text-white tracking-wider uppercase mb-2">
                VERIFIED BUSINESS OUTCOMES & PROOF
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                {caseStudy.proof}
              </p>
            </div>

            {/* Closing & Direct Action */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-white font-medium mb-6 italic">
                {caseStudy.closing}
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                className="group inline-flex items-center justify-between gap-6 px-6 py-4 bg-white text-black font-mono text-xs tracking-widest uppercase hover:bg-neutral-200 transition-colors"
              >
                <span>DISCUSS A SIMILAR BRIEF</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
