"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { AROHANA_MASTER_CONTENT } from "@/data/content";

export default function HeroSection() {
  const { brand } = AROHANA_MASTER_CONTENT;
  const [activeSlide, setActiveSlide] = useState(0);

  const montageImages = [
    { src: "/assets/raysons.jpg", caption: "Real Estate & Architecture // Raysons Group" },
    { src: "/assets/misu.jpg", caption: "Hospitality & F&B Mastery // Misu" },
    { src: "/assets/rrskins.jpg", caption: "Healthcare Trust // RR Skins" },
    { src: "/assets/picturetime.jpg", caption: "Cultural Cinema Reach // PictureTime" },
    { src: "/assets/army_projects.jpg", caption: "High-Altitude Institutional // 14 Corps" },
    { src: "/assets/founder_madhura.jpg", caption: "Founder & Strategic Direction // Madhura Hawal" }
  ];

  // 8-12 second muted montage cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % montageImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [montageImages.length]);

  return (
    <section className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden">
      
      {/* Sundown Animated Glowing Ambient Fluid Mesh (Top-Right & Bottom-Right) */}
      <div className="sundown-glow-shape top-[-15%] right-[-10%]" />
      <div className="sundown-glow-shape-secondary bottom-[-10%] right-[15%]" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Master Brand Lines & CTAs (7 Cols) */}
        <div className="lg:col-span-7">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-white/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FE320A] animate-ping" />
            <span>BUSINESS • BRAND • EXPERIENCE</span>
          </div>

          <h1 className="font-display font-display-hero text-[52px] sm:text-[72px] md:text-[88px] lg:text-[104px] text-white mb-8 select-none tracking-tight">
            WE BUILD BRANDS,<br />
            BUSINESSES &<br />
            EXPERIENCES.
          </h1>

          <p className="text-[16px] md:text-[19px] text-[#BDBDBD] max-w-[620px] leading-relaxed mb-10 font-sans">
            Ārohana brings together business thinking, creative communication and execution — from digital brand growth and content to hospitality consulting and complex on-ground projects.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="sundown-pill-btn bg-[#FE320A] border-[#FE320A] text-white shadow-lg shadow-[#FE320A]/25"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#work"
              className="sundown-pill-btn hover:border-white"
            >
              <span>See our work</span>
            </Link>
          </div>

        </div>

        {/* Right Column: 8-12s Muted Montage Reel Simulator (5 Cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/5] bg-neutral-900 border border-white/15 rounded-sm overflow-hidden shadow-2xl">
            
            {montageImages.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  activeSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  priority={idx === 0}
                  className="object-cover img-editorial opacity-90 transition-transform duration-700"
                />
              </div>
            ))}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Bottom Caption & Slide Indicator */}
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#FE320A] uppercase tracking-widest block mb-0.5">
                  SELECTED WORK REEL (0{activeSlide + 1}/0{montageImages.length})
                </span>
                <p className="text-xs text-white font-mono truncate max-w-[220px] sm:max-w-xs">
                  {montageImages[activeSlide].caption}
                </p>
              </div>

              {/* Mini Pagination Dots */}
              <div className="flex gap-1.5">
                {montageImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeSlide === i ? "w-6 bg-[#FE320A]" : "bg-white/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Kinetic Marquee Ticker Strip (Sundown Style) */}
      <div className="relative z-10 w-full mt-12 pt-6 border-t border-white/10 overflow-hidden">
        <div className="marquee-track flex items-center gap-12 text-xs font-mono uppercase tracking-[0.25em] text-white/50">
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> WE BUILD BRANDS, BUSINESSES & EXPERIENCES</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> DIGITAL BRAND GROWTH</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> HOSPITALITY CONSULTING</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> CONTENT & BRAND PRODUCTION</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> ON-GROUND FIELD EXECUTION</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> TOURIN EXPERIENTIAL TRAVEL</span>
          {/* Duplicate for infinite loop */}
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> WE BUILD BRANDS, BUSINESSES & EXPERIENCES</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> DIGITAL BRAND GROWTH</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> HOSPITALITY CONSULTING</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> CONTENT & BRAND PRODUCTION</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> ON-GROUND FIELD EXECUTION</span>
          <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FE320A]" /> TOURIN EXPERIENTIAL TRAVEL</span>
        </div>
      </div>

    </section>
  );
}
