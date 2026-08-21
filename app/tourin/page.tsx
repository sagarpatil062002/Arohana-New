"use client";

import { tourin } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import Media from "@/components/Media";
import Arrow from "@/components/Arrow";
import styles from "./tourin.module.css";

export default function TourinPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className={`${styles.hero} section`} aria-labelledby="tourin-hero-heading">
          <div className={styles.heroMedia}>
            <img src="/samples/tourin-1.jpg" alt="Ladakh — local people and everyday life" loading="eager" />
            <div className={styles.heroOverlay} />
          </div>
          <div className="container">
            <div className={styles.heroInner}>
              <Reveal as="p" className={`eyebrow ${styles.heroEyebrow}`}>
                {tourin.eyebrow}
              </Reveal>
              <Reveal as="h1" id="tourin-hero-heading" className={styles.heroHeading} delay={80}>
                {tourin.headline}
              </Reveal>
              <Reveal as="p" className={`lead ${styles.heroBody}`} delay={140}>
                {tourin.body}
              </Reveal>
              <Reveal className={styles.heroStat} delay={200}>
                <span className={styles.heroStatValue}>{tourin.stat.value}</span>
                <span className={styles.heroStatLabel}>{tourin.stat.label}</span>
              </Reveal>
              <Reveal className={styles.heroCta} delay={260}>
                <a href={tourin.cta.href} className="btn btn--primary">
                  {tourin.cta.label} <Arrow />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className={`${styles.intro} section`} aria-labelledby="tourin-intro-heading">
          <div className="container">
            <div className={styles.introInner}>
              <div>
                <Reveal as="p" className={`eyebrow ${styles.introLabel}`}>
                  About Tourin
                </Reveal>
                <Reveal as="h2" id="tourin-intro-heading" className={styles.introHeading} delay={80}>
                  Experiential travel, built from lived experience.
                </Reveal>
              </div>
              <Reveal as="div" className={styles.introBody} delay={140}>
                <p>
                  Tourin is an experiential travel brand beginning with Ladakh — built from lived experience rather than a generic destination catalogue.
                </p>
                <p>
                  Every booking and trip so far has been shaped by the people, food, stays and the roads in between. No templates. No packages. Just a different way of moving through a place.
                </p>
                <p>
                  It sits inside the Ārohana ecosystem as an owned brand — separate, but sharing the same DNA of ground-level thinking and genuine care for experience.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* VISUAL STORY — IMAGE SEQUENCE */}
        <section className={`${styles.sequence} section`} aria-labelledby="tourin-sequence-heading">
          <div className="container">
            <Reveal as="p" className={`eyebrow`} style={{ marginBottom: "clamp(40px, 5vw, 72px)" }}>
              A visual journey through Ladakh
            </Reveal>
            <div>
              {tourin.media.map((m, i) => (
                <Reveal key={i} className={styles.sequenceItem} delay={i * 100}>
                  <div className={styles.sequenceImage}>
                    <Media media={m} ratio="16 / 9" rounded="lg" />
                  </div>
                  <p className={styles.sequenceCaption}>{m.alt}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className={`${styles.highlights} section`} aria-labelledby="tourin-highlights-heading">
          <div className="container">
            <Reveal as="p" className={`eyebrow`} style={{ marginBottom: "clamp(40px, 5vw, 72px)" }}>
              01 — What makes Tourin different
            </Reveal>
            <div role="list">
              <div role="listitem" className={styles.highlightRow}>
                <span className={styles.highlightNum}>01</span>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>Lived experience, not a catalogue</h3>
                  <p className={styles.highlightDesc}>
                    Every route, stay and interaction is shaped by real time spent in Ladakh — not a destination database or a standard itinerary template.
                  </p>
                </div>
              </div>
              <div role="listitem" className={styles.highlightRow}>
                <span className={styles.highlightNum}>02</span>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>People, food & the roads in between</h3>
                  <p className={styles.highlightDesc}>
                    Tourin is built around the moments between the landmarks — local encounters, home-cooked meals and the landscape as it actually is.
                  </p>
                </div>
              </div>
              <div role="listitem" className={styles.highlightRow}>
                <span className={styles.highlightNum}>03</span>
                <div className={styles.highlightContent}>
                  <h3 className={styles.highlightTitle}>An owned brand, not a reseller</h3>
                  <p className={styles.highlightDesc}>
                    Tourin is an independent brand inside the Ārohana ecosystem — designed, operated and owned. No white-labelling, no third-party packaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className={`${styles.gallery} section`} aria-labelledby="tourin-gallery-heading">
          <div className="container">
            <Reveal as="p" className={`eyebrow ${styles.galleryEyebrow}`}>
              02 — From the ground
            </Reveal>
            <div>
              <Reveal className={styles.galleryRow} delay={80}>
                <div className={styles.galleryMedia}>
                  <Media media={tourin.media[0]} ratio="4 / 3" rounded="lg" />
                </div>
                <div className={styles.galleryText}>
                  <h3 className={styles.galleryTitle}>People & everyday life</h3>
                  <p className={styles.galleryDesc}>
                    The real Ladakh is in the daily rhythm — morning routines, market conversations, and the way communities have learned to live with the landscape.
                  </p>
                </div>
              </Reveal>
              <Reveal className={styles.galleryRow} delay={120}>
                <div className={styles.galleryMedia}>
                  <Media media={tourin.media[1]} ratio="4 / 3" rounded="lg" />
                </div>
                <div className={styles.galleryText}>
                  <h3 className={styles.galleryTitle}>Food & stays</h3>
                  <p className={styles.galleryDesc}>
                    From home kitchens to high-altitude stays, the places you stay and the food you eat become the trip — not afterthoughts.
                  </p>
                </div>
              </Reveal>
              <Reveal className={styles.galleryRow} delay={160}>
                <div className={styles.galleryMedia}>
                  <Media media={tourin.media[2]} ratio="4 / 3" rounded="lg" />
                </div>
                <div className={styles.galleryText}>
                  <h3 className={styles.galleryTitle}>Roads & sense of place</h3>
                  <p className={styles.galleryDesc}>
                    Getting there is part of the experience. The routes, the altitude, the landscape unfolding — this is travel that earns its moments.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`${styles.cta} section`} aria-labelledby="tourin-cta-heading">
          <div className="container">
            <div className={styles.ctaInner}>
              <Reveal as="p" className="eyebrow" style={{ justifyContent: "center", marginBottom: "1.4rem" }}>
                Discover Tourin
              </Reveal>
              <Reveal as="h2" id="tourin-cta-heading" className={styles.ctaHeading} delay={80}>
                Not a destination. A different way of moving through one.
              </Reveal>
              <Reveal className={styles.ctaButton} delay={140}>
                <a href={tourin.cta.href} className="btn btn--primary">
                  {tourin.cta.label} <Arrow />
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
