"use client";

import { useEffect, useState } from "react";
import type { MediaRef } from "@/lib/content";

type HeroMediaProps = {
  media: MediaRef;
};

/**
 * Cinematic hero media.
 * - With a real `src`: autoplay / muted / loop / playsInline video on larger
 *   screens, and a static poster fallback on mobile (no autoplay drain).
 * - Without assets yet: a clearly-marked placeholder describing the intended
 *   montage, so the real video can be dropped in later with no redesign.
 */
export default function HeroMedia({ media }: HeroMediaProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!media.src) return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [media.src]);

  if (!media.src) {
    return (
      <div
        className="media placeholder-frame"
        style={{ aspectRatio: "16 / 9", borderRadius: "var(--r-xl)" }}
        role="img"
        aria-label={media.alt}
      >
        <span className="placeholder">
          <span className="placeholder__tag">Hero video — placeholder</span>
          <span className="placeholder__label">{media.label}</span>
          <span className="placeholder__note">
            Supply an 8–12s muted, looping montage (web-optimised) + poster
          </span>
        </span>
      </div>
    );
  }

  return (
    <div
      className="media"
      style={{ aspectRatio: "16 / 9", borderRadius: "var(--r-xl)" }}
    >
      {isMobile ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.poster || media.src} alt={media.alt} loading="eager" />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster || undefined}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
