"use client";

import { useRef } from "react";
import { workProjects } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, useReducedMotion, useIsMobile } from "@/hooks/useMedia";
import Reveal from "./Reveal";
import Media from "./Media";
import Arrow from "./Arrow";
import styles from "./SelectedWork.module.css";

export default function SelectedWork() {
  const root = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    if (reduced || mobile || !root.current) return;
    const ctx = gsap.context(() => {
      const wraps = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      wraps.forEach((wrap) => {
        const img = wrap.querySelector("img");
        // gentle parallax drift
        gsap.fromTo(
          wrap,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        // image settles from 1.06 -> 1 as it enters
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.06 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "center center",
                scrub: true,
              },
            }
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, mobile]);

  return (
    <section ref={root} className="section" aria-labelledby="work-heading">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Selected work
        </Reveal>
        <Reveal as="h2" id="work-heading" className="section-title" delay={80}>
          A few businesses we&rsquo;ve helped shape, communicate or build.
        </Reveal>

        <div className={styles.grid}>
          {workProjects.projects.map((item, i) => {
            const isFeature = item.size === "feature";
            return (
              <Reveal
                key={item.slug}
                className={`${styles.card} ${isFeature ? styles.feature : styles.standard}`}
                delay={100 + (i % 2) * 80}
              >
                <a href={item.href} className={styles.link} data-cursor="project">
                  <div className={styles.mediaWrap} data-parallax>
                    <Media
                      media={{ src: item.image, alt: item.alt, label: item.title }}
                      ratio={isFeature ? "16 / 10" : "4 / 3"}
                      rounded="md"
                      sizes={
                        isFeature
                          ? "(max-width: 980px) 100vw, 70vw"
                          : "(max-width: 980px) 100vw, 45vw"
                      }
                    />
                  </div>
                  <div className={styles.body}>
                    <div className={styles.head}>
                      <h3 className={styles.title}>{item.title}</h3>
                      <span className={styles.view}>
                        View case study <Arrow size={15} />
                      </span>
                    </div>
                    <p className={styles.desc}>{item.description}</p>
                    <ul className={styles.tags}>
                      {item.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
