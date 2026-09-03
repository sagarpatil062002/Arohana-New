"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import HeroScene from "./HeroScene";
import HeroOverlay from "./HeroOverlay";

export default function Hero3DExperience() {
  const [progress, setProgress] = useState(0);
  const [isSettled, setIsSettled] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const animRef = useRef<number>();

  const handleSkip = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setProgress(1);
    setIsSettled(true);
    sessionStorage.setItem("arohana_3d_seen", "true");
  }, []);

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setProgress(1);
      setIsSettled(true);
      return;
    }

    // 2. Intelligent repeat visit handling
    const hasSeen3D = sessionStorage.getItem("arohana_3d_seen");
    const duration = hasSeen3D ? 800 : 2600; // 0.8s for repeat visits, 2.6s for initial
    const startTime = performance.now();

    const updateTimeline = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);

      // Smooth custom ease-in-out curve
      const eased =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      setProgress(eased);

      if (rawProgress < 1) {
        animRef.current = requestAnimationFrame(updateTimeline);
      } else {
        setIsSettled(true);
        sessionStorage.setItem("arohana_3d_seen", "true");
      }
    };

    animRef.current = requestAnimationFrame(updateTimeline);

    // Keyboard shortcut for quick skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSkip]);

  // Pointer tracking for subtle 3D mouse parallax
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden bg-[#050811]">
      {/* 1. Full-screen 3D WebGL Scene */}
      <HeroScene progress={progress} mouseX={pointer.x} mouseY={pointer.y} />

      {/* 2. Layered Spatial Typography, Navigation & Telemetry */}
      <HeroOverlay progress={progress} onSkip={handleSkip} isSettled={isSettled} />
    </div>
  );
}
