"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";
import Arrow from "@/components/Arrow";
import { caseStudies } from "@/data/content";
import styles from "./CaseStudyTemplate.module.css";

type Props = {
  slug: string;
};

export default function CaseStudyTemplate({ slug }: Props) {
  const study = caseStudies[slug];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!study) {
    return (
      <>
        <Header />
        <main className="section">
          <div className="container">
            <h1>Case study not found</h1>
            <p style={{ marginTop: "1rem" }}>
              <a href="/work" className="link-underline">
                Back to work <Arrow />
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className={`${styles.hero} section`} aria-labelledby="cs-hero-heading">
          <div className={styles.heroMedia}>
            <Media media={study.gallery[0]} ratio="16 / 9" priority />
          </div>
          <div className={styles.heroOverlay} />
          <div className="container">
            <div className={styles.heroInner}>
              <Reveal as="p" className={`eyebrow ${styles.heroEyebrow}`}>
                {study.sector}
              </Reveal>
              <Reveal as="h1" id="cs-hero-heading" className={styles.heroHeading} delay={80}>
                {study.client}
              </Reveal>
              <Reveal as="p" className={`lead ${styles.heroSupporting}`} delay={140}>
                {study.headline}
              </Reveal>
              <Reveal as="div" className={styles.heroMeta} delay={180}>
                <span>{study.location}</span>
                <span className={styles.metaDot} aria-hidden="true" />
                <span>{study.engagement}</span>
                <span className={styles.metaDot} aria-hidden="true" />
                <span>{study.duration}</span>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SITUATION */}
        <section className={`${styles.block} section`} aria-labelledby="cs-situation">
          <div className="container">
            <div className={styles.blockInner}>
              <Reveal as="p" className={`eyebrow ${styles.blockLabel}`}>
                The Situation
              </Reveal>
              <Reveal as="h2" id="cs-situation" className={styles.blockHeading} delay={80}>
                What the business was dealing with
              </Reveal>
              <Reveal as="p" className={styles.blockBody} delay={140}>
                {study.situation}
              </Reveal>
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section className={`${styles.block} ${styles.blockAlt} section`} aria-labelledby="cs-challenge">
          <div className="container">
            <div className={styles.blockInner}>
              <Reveal as="p" className={`eyebrow ${styles.blockLabel}`}>
                The Real Challenge
              </Reveal>
              <Reveal as="h2" id="cs-challenge" className={styles.blockHeading} delay={80}>
                What needed to change and why
              </Reveal>
              <Reveal as="p" className={styles.blockBody} delay={140}>
                {study.challenge}
              </Reveal>
            </div>
          </div>
        </section>

        {/* THINKING */}
        <section className={`${styles.block} section`} aria-labelledby="cs-thinking">
          <div className="container">
            <div className={styles.blockInner}>
              <Reveal as="p" className={`eyebrow ${styles.blockLabel}`}>
                The Thinking
              </Reveal>
              <Reveal as="h2" id="cs-thinking" className={styles.blockHeading} delay={80}>
                The key decisions we made
              </Reveal>
              <Reveal as="p" className={styles.blockBody} delay={140}>
                {study.thinking}
              </Reveal>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section className={`${styles.block} ${styles.blockAlt} section`} aria-labelledby="cs-work">
          <div className="container">
            <Reveal as="p" className={`eyebrow ${styles.blockLabel}`} style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}>
              The Work
            </Reveal>
            <div className={styles.workGrid}>
              {study.workstreams.map((ws, i) => (
                <Reveal key={i} className={styles.workItem} delay={100 + i * 80}>
                  <span className={styles.workNum}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={styles.workTitle}>{ws.title}</h3>
                    <p className={styles.workBody}>{ws.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className={`${styles.block} section`} aria-labelledby="cs-proof">
          <div className="container">
            <div className={styles.blockInner}>
              <Reveal as="p" className={`eyebrow ${styles.blockLabel}`}>
                Proof
              </Reveal>
              <Reveal as="h2" id="cs-proof" className={styles.blockHeading} delay={80}>
                What changed
              </Reveal>
              <Reveal as="p" className={styles.blockBody} delay={140}>
                {study.proof}
              </Reveal>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className={`${styles.gallery} section`} aria-label="Project gallery">
          <div className="container">
            <Reveal as="p" className={`eyebrow`} style={{ marginBottom: "clamp(32px, 4vw, 56px)" }}>
              From the project
            </Reveal>
            <div className={styles.galleryGrid}>
              {study.gallery.map((item, i) => (
                <Reveal key={i} className={styles.galleryItem} delay={i * 80}>
                  <Media media={item} ratio="4 / 3" rounded="lg" />
                  <p className={styles.galleryCaption}>{item.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className={`${styles.closing} section`} aria-labelledby="cs-closing">
          <div className="container">
            <Reveal as="h2" id="cs-closing" className={styles.closingStatement} delay={60}>
              Have a similar business challenge?
            </Reveal>
            <Reveal as="p" className={styles.closingBody} delay={120}>
              Let&rsquo;s start with the context, not a template.
            </Reveal>
            <Reveal className={styles.closingCta} delay={180}>
              <a href="/contact" className="btn btn--primary">
                Start a conversation <Arrow />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
