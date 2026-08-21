"use client";

import { useRef } from "react";
import { hero } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, useReducedMotion, useIsMobile } from "@/hooks/useMedia";
import HeroMedia from "./HeroMedia";
import Arrow from "./Arrow";
import MagneticButton from "./MagneticButton";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const bg = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const headlineWords = hero.headline.split(" ");

  useIsomorphicLayoutEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (bg.current) {
        tl.fromTo(
          bg.current,
          { scale: 1.14 },
          { scale: 1, duration: 1.7 },
          0
        );
      }
      tl.fromTo(
        ".js-eyebrow",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.25
      )
        .fromTo(
          ".js-word",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.07 },
          0.4
        )
        .fromTo(
          ".js-supporting",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          0.95
        )
        .fromTo(
          ".js-actions",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          1.15
        )
        .fromTo(
          ".js-cue",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          1.4
        );
    }, root);
    return () => ctx.revert();
  }, [reduced, mobile]);

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-heading">
      <div ref={bg} className={styles.bg} aria-hidden="true">
        <HeroMedia media={hero.media} />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow js-eyebrow ${styles.eyebrow}`}>
          <span className="dot" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 id="hero-heading" className={styles.headline}>
          {headlineWords.map((word, i) => (
            <span key={i} className={`wordMask ${styles.wordMask}`}>
              <span className="js-word">{word}</span>
            </span>
          ))}
        </h1>

        <p className={`lead js-supporting ${styles.supporting}`}>
          {hero.supporting}
        </p>

        <div className={`js-actions ${styles.actions}`}>
          <MagneticButton
            href={hero.primaryCta.href}
            className="btn btn--primary"
          >
            {hero.primaryCta.label}
            <Arrow />
          </MagneticButton>
          <a
            href={hero.secondaryCta.href}
            className="btn btn--ghost"
            data-cursor="cta"
          >
            {hero.secondaryCta.label}
            <Arrow />
          </a>
        </div>
      </div>

      <div className={`js-cue ${styles.cue}`} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.cueLine} />
      </div>
    </section>
  );
}
