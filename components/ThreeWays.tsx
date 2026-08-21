"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/content";
import { gsap } from "@/lib/gsap";
import { useReducedMotion, useIsMobile } from "@/hooks/useMedia";
import Reveal from "./Reveal";
import Arrow from "./Arrow";
import styles from "./ThreeWays.module.css";

export default function ThreeWays() {
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const quick = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(
    null
  );
  const [active, setActive] = useState<number | null>(null);
  const [touchActive, setTouchActive] = useState<number | null>(null);

  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const interactive = !reduced && !mobile;

  useEffect(() => {
    if (!floatRef.current) return;
    gsap.set(floatRef.current, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    quick.current = {
      x: gsap.quickTo(floatRef.current, "x", { duration: 0.55, ease: "power3" }),
      y: gsap.quickTo(floatRef.current, "y", { duration: 0.55, ease: "power3" }),
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!interactive || !quick.current || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    quick.current.x(e.clientX - r.left);
    quick.current.y(e.clientY - r.top);
  };

  const enter = (i: number) => () => {
    if (!interactive) return;
    setActive(i);
    if (floatRef.current)
      gsap.to(floatRef.current, { autoAlpha: 1, duration: 0.4 });
  };

  const leave = () => {
    if (!interactive) return;
    setActive(null);
    if (floatRef.current)
      gsap.to(floatRef.current, { autoAlpha: 0, duration: 0.3 });
  };

  const handleTouchStart = (e: React.TouchEvent, i: number) => {
    if (interactive) return;
    const target = e.currentTarget as HTMLDivElement;
    const listRect = listRef.current?.getBoundingClientRect();
    if (!listRect || !floatRef.current) return;

    const rect = target.getBoundingClientRect();
    const x = rect.left - listRect.left + rect.width / 2;
    const y = rect.top - listRect.top;

    gsap.set(floatRef.current, { x, y, xPercent: -50, yPercent: 0, autoAlpha: 1 });
    setTouchActive(touchActive === i ? null : i);
  };

  useEffect(() => {
    if (touchActive === null && floatRef.current) {
      gsap.to(floatRef.current, { autoAlpha: 0, duration: 0.3 });
    }
  }, [touchActive]);

  return (
    <section className="section" aria-labelledby="ways-heading">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          What we do
        </Reveal>
        <Reveal as="h2" id="ways-heading" className="section-title" delay={80}>
          Three ways we work
        </Reveal>

        <Reveal className={styles.listWrap} delay={140}>
          <div
            ref={listRef}
            className={styles.list}
            onMouseMove={onMove}
            onMouseLeave={leave}
          >
            {services.map((s, i) => (
              <div
                key={s.number}
                className={styles.row}
                onMouseEnter={enter(i)}
                onTouchStart={(e) => handleTouchStart(e, i)}
                data-cursor="view"
              >
                <span className={styles.num}>{s.number}</span>
                <div className={styles.main}>
                  <h3 className={styles.title}>{s.title}</h3>
                  {!interactive && !touchActive && (
                    <p className={styles.descStatic}>{s.description}</p>
                  )}
                  {!interactive && !touchActive && (
                    <div className={styles.thumb}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.media.src} alt={s.media.alt} loading="lazy" />
                    </div>
                  )}
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  <Arrow />
                </span>
              </div>
            ))}

            {(interactive || touchActive !== null) && (
              <div ref={floatRef} className={styles.float} aria-hidden="true">
                {services.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s.number}
                    src={s.media.src}
                    alt=""
                    className={`${styles.floatImg} ${
                      (interactive ? active === i : touchActive === i) ? styles.floatImgOn : ""
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
