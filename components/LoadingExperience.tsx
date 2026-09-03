"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const INTRO_DURATION = 5000; // 5 seconds

export default function LoadingExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user already saw intro in this session
    const hasSeenIntro = sessionStorage.getItem("arohana_intro_completed");
    if (hasSeenIntro) {
      return;
    }

    setIsVisible(true);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((INTRO_DURATION - elapsed) / 1000));
      setTimeLeft(remaining);

      if (elapsed >= INTRO_DURATION) {
        finishIntro();
      }
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    function finishIntro() {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("arohana_intro_completed", "true");
      }, 700);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isVisible) return null;

  const formattedTime = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("arohana_intro_completed", "true");
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-14 bg-[#080E18] text-white transition-opacity duration-700 ease-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle at center, #0e1726 0%, #060a10 100%)"
      }}
      aria-label="Loading Experience"
    >
      {/* Top Header: 01 LOADING EXPERIENCE | ESC TO SKIP */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#C5A46D] font-semibold">01</span>
          <span className="font-mono text-[11px] tracking-[0.18em] text-[#8A919D] uppercase">
            LOADING EXPERIENCE
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="font-mono text-[11px] tracking-[0.16em] text-[#8A919D] hover:text-white uppercase transition-colors"
        >
          ESC TO SKIP
        </button>
      </div>

      {/* Center: Gold 3D Emblem & ĀROHANA CONSULTANCY */}
      <div className="flex flex-col items-center justify-center text-center my-auto space-y-6 max-w-lg mx-auto">
        {/* Intertwined Metallic Rings Emblem */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#C5A46D]/20 animate-spin" style={{ animationDuration: '18s' }} />
          <div className="absolute inset-3 rounded-full border border-dashed border-[#C5A46D]/40 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
          <div className="w-16 h-16 md:w-20 md:h-20 relative">
            <Image
              src="/images/arohana-logo.png"
              alt="ĀROHANA"
              fill
              sizes="80px"
              style={{ objectFit: "contain" }}
              className="invert brightness-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-clash text-2xl md:text-3xl font-semibold tracking-[0.22em] uppercase text-white">
            ĀROHANA
          </h1>
          <span className="block font-mono text-[10px] tracking-[0.25em] text-[#8A919D] uppercase">
            CONSULTANCY
          </span>
          <p className="text-xs md:text-sm text-[#8A919D] pt-2 font-normal">
            We build brands, businesses &amp; experiences.
          </p>
        </div>
      </div>

      {/* Bottom Bar: ENTERING THE EXPERIENCE 05 SECONDS */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 pt-6 border-t border-white/10">
        <span className="font-mono text-[10px] tracking-[0.22em] text-[#8A919D] uppercase">
          ENTERING THE EXPERIENCE
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-clash text-5xl md:text-6xl font-light text-white tracking-tight tabular-nums">
            {formattedTime}
          </span>
          <span className="font-mono text-[11px] text-[#8A919D] tracking-widest uppercase">
            SECONDS
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="font-mono text-[10px] tracking-[0.16em] text-[#8A919D] hover:text-[#C5A46D] transition-colors pt-2 uppercase"
        >
          PRESS ESC TO SKIP
        </button>
      </div>
    </div>
  );
}

