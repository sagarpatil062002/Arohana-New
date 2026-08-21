"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMedia";

/**
 * Initialises Lenis smooth scrolling and wires it to GSAP ScrollTrigger so
 * scroll-driven animations stay in sync. Disabled entirely under
 * prefers-reduced-motion (native scrolling is used instead).
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    // refresh once layout settles
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(id);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
