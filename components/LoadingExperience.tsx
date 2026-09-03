"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function LoadingExperience() {
  const [stage, setStage] = useState<"initial" | "revealing" | "moment" | "exiting" | "hidden">("initial");
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. Intelligent repeat visit handling: Check session storage
    const hasSeenIntro = sessionStorage.getItem("arohana_intro_seen_v3");

    if (prefersReducedMotion || hasSeenIntro) {
      setStage("hidden");
      window.dispatchEvent(new CustomEvent("arohana:hero-ready"));
      return;
    }

    // Step 1: Start reveal almost immediately
    const t1 = setTimeout(() => {
      setStage("revealing");
    }, 120);

    // Progress counter animation from 0 to 100 in ~1100ms
    const startProgressTime = Date.now();
    const duration = 1200;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startProgressTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(progressInterval);
      }
    }, 24);

    // Step 2: Brand moment reveal at ~700ms
    const t2 = setTimeout(() => {
      setStage("moment");
    }, 700);

    // Step 3: Screen transition curtain release at ~1800ms
    const t3 = setTimeout(() => {
      setStage("exiting");
      window.dispatchEvent(new CustomEvent("arohana:hero-ready"));
    }, 1850);

    // Step 4: Final unmount at ~2500ms
    const t4 = setTimeout(() => {
      setStage("hidden");
      sessionStorage.setItem("arohana_intro_seen_v3", "true");
    }, 2550);

    // Skip handler (Escape key or click)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    function skipIntro() {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(progressInterval);
      setStage("exiting");
      window.dispatchEvent(new CustomEvent("arohana:hero-ready"));
      setTimeout(() => {
        setStage("hidden");
        sessionStorage.setItem("arohana_intro_seen_v3", "true");
      }, 400);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(progressInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (stage === "hidden") return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Ārohana Identity Intro"
      className={`fixed inset-0 z-[99999] flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none overflow-hidden transition-all duration-700 pointer-events-auto ${
        stage === "exiting"
          ? "-translate-y-full opacity-90 ease-[cubic-bezier(0.76,0,0.24,1)]"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        backgroundColor: "#060911",
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% 50%, rgba(14, 23, 38, 0.7) 0%, rgba(6, 9, 17, 1) 100%),
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 80px 80px, 80px 80px"
      }}
      onClick={() => {
        if (stage !== "exiting") {
          setStage("exiting");
          window.dispatchEvent(new CustomEvent("arohana:hero-ready"));
          setTimeout(() => {
            setStage("hidden");
            sessionStorage.setItem("arohana_intro_seen_v3", "true");
          }, 400);
        }
      }}
    >
      {/* Top Editorial Metadata Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A46D] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.24em] text-white/50 uppercase">
            ĀROHANA CONSULTANCY // 01
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
            BRAND · BUSINESS · EXPERIENCE
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase hover:text-white/70 transition-colors cursor-pointer">
            [ ESC TO SKIP ]
          </span>
        </div>
      </div>

      {/* Center Cinematic Brand Reveal */}
      <div className="flex flex-col items-center justify-center my-auto w-full max-w-3xl mx-auto text-center px-4">
        {/* Subtle Category Microtag */}
        <div
          className={`overflow-hidden mb-6 transition-all duration-700 ease-out ${
            stage === "revealing" || stage === "moment" || stage === "exiting"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.32em] text-[#C5A46D] uppercase">
            EST. 2020 · STRATEGIC PRACTICE
          </span>
        </div>

        {/* Authentic Ārohana Brand Logo Asset */}
        <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] h-16 sm:h-20 md:h-24 mx-auto overflow-hidden">
          <div
            className={`w-full h-full relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              stage === "revealing" || stage === "moment" || stage === "exiting"
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-5"
            }`}
          >
            <Image
              src="/images/arohana-logo.png"
              alt="ĀROHANA"
              fill
              priority
              sizes="(max-width: 640px) 320px, (max-width: 768px) 420px, 500px"
              style={{
                objectFit: "contain",
                filter: "brightness(0) invert(1)"
              }}
            />
          </div>
        </div>

        {/* Separator Hairline */}
        <div
          className={`h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-6 sm:my-8 transition-all duration-700 ease-out ${
            stage === "moment" || stage === "exiting"
              ? "w-48 sm:w-72 opacity-100"
              : "w-0 opacity-0"
          }`}
        />

        {/* Brand Moment Statement */}
        <div
          className={`overflow-hidden transition-all duration-800 delay-100 ease-out ${
            stage === "moment" || stage === "exiting"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-sans text-xs sm:text-sm md:text-base font-light text-white/70 tracking-[0.06em] max-w-lg mx-auto">
            We build brands, businesses &amp; experiences.
          </p>
        </div>
      </div>

      {/* Bottom Editorial Coordinates & Progress */}
      <div className="flex items-end justify-between border-t border-white/[0.08] pt-4">
        <div className="hidden sm:flex flex-col text-left">
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
            GEOGRAPHIC FOCUS
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-white/60">
            MUMBAI · GOA · LADAKH · KOLHAPUR
          </span>
        </div>

        <div className="flex items-baseline gap-3 mx-auto sm:mx-0">
          <span className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
            INITIALIZING
          </span>
          <span className="font-mono text-sm sm:text-base font-medium text-white tabular-nums tracking-wider">
            {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}%
          </span>
        </div>
      </div>

      {/* Subtle Bottom Gold Hairline Sweep */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#C5A46D] to-[#E7D5B6] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
