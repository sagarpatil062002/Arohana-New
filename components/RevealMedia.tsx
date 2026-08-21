"use client";

import { useRef } from "react";
import { MediaRef } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, useReducedMotion, useIsMobile } from "@/hooks/useMedia";
import Media from "./Media";

type Props = {
  media: MediaRef;
  ratio?: string;
  rounded?: "sm" | "md" | "lg";
  className?: string;
  parallax?: boolean;
  priority?: boolean;
  sizes?: string;
};

/** Image with a subtle scroll-driven scale-settle + parallax (no new 3D). */
export default function RevealMedia({
  media,
  ratio = "4 / 3",
  rounded = "lg",
  className,
  parallax = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    if (reduced || mobile || !wrap.current) return;
    const ctx = gsap.context(() => {
      const img = wrap.current?.querySelector("img");
      if (parallax) {
        gsap.fromTo(
          wrap.current,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.06 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    }, wrap);
    return () => ctx.revert();
  }, [reduced, mobile, parallax]);

  return (
    <div ref={wrap} className={className} style={{ willChange: "transform" }}>
      <Media media={media} ratio={ratio} rounded={rounded} priority={priority} sizes={sizes} />
    </div>
  );
}
