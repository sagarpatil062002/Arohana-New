"use client";

import { useEffect, useRef } from "react";
import { workProjects } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import Media from "@/components/Media";
import Arrow from "@/components/Arrow";
import LogoStrip from "@/components/LogoStrip";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect, useReducedMotion, useIsMobile } from "@/hooks/useMedia";
import styles from "./work.module.css";

export default function WorkPage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const hoverImageRef = useRef<{ src: string; alt: string } | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (reduced || mobile || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const parallaxWraps = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallaxWraps.forEach((wrap) => {
        const img = wrap.querySelector("img");
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
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, mobile]);

  useEffect(() => {
    if (reduced || mobile || !imageRef.current) return;

    const handleMove = (e: MouseEvent) => {
      if (!imageRef.current || !hoverImageRef.current) return;
      gsap.to(imageRef.current, {
        x: e.clientX + 20,
        y: e.clientY - 160,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduced, mobile]);

  const handleRowEnter = (item: { image: string; alt: string }) => {
    if (reduced || mobile || !imageRef.current) return;
    hoverImageRef.current = { src: item.image, alt: item.alt };
    imageRef.current.src = item.image;
    imageRef.current.alt = item.alt;
    gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
  };

  const handleRowLeave = () => {
    if (!imageRef.current) return;
    hoverImageRef.current = null;
    gsap.to(imageRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" });
  };

  const featureProjects = workProjects.projects.filter((p) => p.size === "feature");
  const standardProjects = workProjects.projects.filter((p) => p.size === "standard");

  return (
    <>
      <Header />
      <main ref={rootRef}>
        {/* HERO */}
        <section className={`${styles.hero} section`} aria-labelledby="work-hero-heading">
          <div className={styles.heroMedia}>
            <img src="/samples/work-raysons.jpg" alt="Ārohana project environment" loading="eager" />
            <div className={styles.heroOverlay} />
          </div>
          <div className="container">
            <div className={styles.heroInner}>
              <Reveal as="p" className={`eyebrow ${styles.heroEyebrow}`}>
                Selected Work
              </Reveal>
              <Reveal as="h1" id="work-hero-heading" className={styles.heroHeading} delay={80}>
                The work is the proof.
              </Reveal>
              <Reveal as="p" className={`lead ${styles.heroSupporting}`} delay={140}>
                A selection of businesses and projects showing how Ārohana thinks, creates and executes across very different environments.
              </Reveal>
              <Reveal className={styles.heroScroll} delay={220}>
                Scroll to explore
              </Reveal>
            </div>
          </div>
        </section>

        {/* STATEMENT */}
        <section className={`${styles.statement} section`} aria-labelledby="work-statement">
          <div className="container">
            <Reveal as="p" className={`eyebrow ${styles.statementEyebrow}`}>
              Selected Projects
            </Reveal>
            <Reveal as="h2" id="work-statement" className={styles.statementText} delay={80}>
              We don&rsquo;t do templates. Every engagement starts with the business, the context and the people involved.
            </Reveal>
          </div>
        </section>

        {/* PROJECT INDEX */}
        <section className={`${styles.index} section`} aria-labelledby="work-index-heading">
          <div className="container">
            <Reveal as="p" className={`eyebrow ${styles.indexEyebrow}`}>
              01 — Project Index
            </Reveal>
            <div role="list">
              {workProjects.projects.map((item, i) => (
                <div
                  key={item.slug}
                  role="listitem"
                  className={styles.projectRow}
                  onMouseEnter={() => handleRowEnter(item)}
                  onMouseLeave={handleRowLeave}
                  onMouseMove={(e) => {
                    if (!reduced && !mobile && imageRef.current && hoverImageRef.current) {
                      gsap.to(imageRef.current, {
                        x: e.clientX + 20,
                        y: e.clientY - 160,
                        duration: 0.6,
                        ease: "power3.out",
                      });
                    }
                  }}
                >
                  <span className={styles.projectNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.projectName}>{item.title}</span>
                  <span className={styles.projectMeta}>{item.tags.join(" / ")}</span>
                </div>
              ))}
            </div>
            <img
              ref={imageRef}
              src=""
              alt=""
              className={styles.projectImage}
              style={{ opacity: 0, scale: 0.95 }}
            />
          </div>
        </section>

        {/* FEATURE PROJECTS */}
        {featureProjects.map((item, i) => (
          <section key={item.slug} className={`${styles.feature} section`} aria-labelledby={`feature-${i}-heading`}>
            <div className="container">
              <div className={styles.featureInner}>
                <div>
                  <Reveal as="p" className="eyebrow">
                    Project {String(i + 1).padStart(2, "0")}
                  </Reveal>
                  <Reveal as="h2" id={`feature-${i}-heading`} className={styles.featureTitle} delay={80}>
                    {item.title}
                  </Reveal>
                  <Reveal className={styles.featureMeta} delay={120}>
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </Reveal>
                  <Reveal as="p" className={styles.featureDesc} delay={160}>
                    {item.description}
                  </Reveal>
                  <Reveal className={styles.featureCta} delay={200}>
                    <a href={item.href} className="link-underline">
                      View project <Arrow />
                    </a>
                  </Reveal>
                </div>
                <Reveal className={styles.featureMedia} delay={100}>
                  <RevealMedia
                    media={{ src: item.image, alt: item.alt, label: item.title }}
                    ratio="16 / 10"
                    sizes="(max-width: 980px) 100vw, 55vw"
                  />
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* STANDARD PROJECTS */}
        {standardProjects.map((item, i) => (
          <section key={item.slug} className={`${styles.feature} section`} aria-labelledby={`std-${i}-heading`}>
            <div className="container">
              <div className={styles.featureInner}>
                <div>
                  <Reveal as="p" className="eyebrow">
                    Project {String(workProjects.projects.indexOf(item) + 1).padStart(2, "0")}
                  </Reveal>
                  <Reveal as="h2" id={`std-${i}-heading`} className={styles.featureTitle} delay={80}>
                    {item.title}
                  </Reveal>
                  <Reveal className={styles.featureMeta} delay={120}>
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </Reveal>
                  <Reveal as="p" className={styles.featureDesc} delay={160}>
                    {item.description}
                  </Reveal>
                  <Reveal className={styles.featureCta} delay={200}>
                    <a href={item.href} className="link-underline">
                      View project <Arrow />
                    </a>
                  </Reveal>
                </div>
                <Reveal className={styles.featureMedia} delay={100}>
                  <RevealMedia
                    media={{ src: item.image, alt: item.alt, label: item.title }}
                    ratio="4 / 3"
                    sizes="(max-width: 980px) 100vw, 50vw"
                  />
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* FEATURED PROJECT */}
        <section className={`${styles.featured} section`} aria-labelledby="work-featured-heading">
          <div className={styles.featuredMedia}>
            <RevealMedia
              media={{
                src: "/samples/work-she.jpg",
                alt: "SHE community initiative",
                label: "SHE community initiative — people and everyday life.",
              }}
              ratio="16 / 9"
              sizes="100vw"
            />
          </div>
          <div className={styles.featuredOverlay} />
          <div className="container">
            <div className={styles.featuredInner}>
              <Reveal as="p" className={`eyebrow ${styles.featuredLabel}`}>
                Featured Project
              </Reveal>
              <Reveal as="h2" id="work-featured-heading" className={styles.featuredTitle} delay={80}>
                SHE
              </Reveal>
              <Reveal as="p" className={styles.featuredDesc} delay={140}>
                A community initiative built around health, dignity and sustainability — communication with responsibility at its centre.
              </Reveal>
              <Reveal className={styles.featuredCta} delay={200}>
                <a href="/work/she" className="btn btn--ghost">
                  Explore project <Arrow />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROJECT DIRECTORY */}
        <section className={`${styles.directory} section`} aria-labelledby="work-directory-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow" style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}>
              02 — Client & Project Directory
            </Reveal>
            {workProjects.sectors.map((sector, i) => {
              const projects = (workProjects.sectorProjects as Record<string, string[]>)[sector] || [];
              return (
                <div key={sector} className={`${styles.sector} ${i !== workProjects.sectors.length - 1 ? styles.sectorDivider : ""}`}>
                  <Reveal as="h3" className={styles.sectorTitle} delay={60}>
                    {sector}
                  </Reveal>
                  <div className={styles.sectorProjects}>
                    {projects.map((name) => (
                      <span key={name} className={styles.sectorProject}>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* LOGO STRIP */}
        <section className={`${styles.logos} section`} aria-label="Brands and organisations we've worked with">
          <div className="container">
            <Reveal as="p" className="eyebrow" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
              Brands and organisations we&rsquo;ve worked with
            </Reveal>
            <LogoStrip />
          </div>
        </section>

        {/* CLOSING */}
        <section className={`${styles.closing} section`} aria-labelledby="work-closing-heading">
          <div className="container">
            <div className={styles.closingInner}>
              <Reveal as="h2" id="work-closing-heading" className={styles.closingStatement} delay={60}>
                Every project starts with a question.
              </Reveal>
              <Reveal className={styles.closingCta} delay={140}>
                <a href="/contact" className="btn btn--primary">
                  Let&rsquo;s start a conversation <Arrow />
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
