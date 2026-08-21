"use client";

import { tourinData } from "@/lib/content";
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
                {tourinData.meta.eyebrow}
              </Reveal>
              <Reveal as="h1" id="tourin-hero-heading" className={styles.heroHeading} delay={80}>
                {tourinData.meta.headline}
              </Reveal>
              <Reveal as="p" className={`lead ${styles.heroBody}`} delay={140}>
                Travel beyond the itinerary.
              </Reveal>
              <Reveal as="p" className={styles.heroSupporting} delay={180}>
                Some places are better experienced when you stop trying to see everything. Tourin creates experiential journeys for travellers who want more than a checklist of sights — beginning with Ladakh.
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHY TOURIN */}
        <section className={`${styles.why} section`} aria-labelledby="tourin-why-heading">
          <div className="container">
            <div className={styles.whyInner}>
              <Reveal as="p" className="eyebrow">
                01 — Why Tourin
              </Reveal>
              <Reveal as="h2" id="tourin-why-heading" className={styles.whyHeading} delay={80}>
                The Ladakh many itineraries sell and the Ladakh people experience are not always the same.
              </Reveal>
              <Reveal as="p" className={styles.whyBody} delay={140}>
                Tourin focuses on the people, food, stories, homes, landscapes, silences and everyday life behind the famous places. Not because the landmarks don&rsquo;t matter, but because they&rsquo;re only part of the story.
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHAT WE BELIEVE */}
        <section className={`${styles.believe} section`} aria-labelledby="tourin-believe-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
              02 — What we believe
            </Reveal>
            <Reveal as="h2" id="tourin-believe-heading" className={styles.believeHeading} delay={80}>
              A good trip should leave travellers with more than photographs.
            </Reveal>
            <Reveal as="p" className={styles.believeBody} delay={140}>
              It should create a sense of where they were — through food, local families, traditions, connected stays, slower routes and enough time to notice the place. The goal is not to check every landmark. It is to understand a destination, not only photograph it.
            </Reveal>
          </div>
        </section>

        {/* WHY LADAKH */}
        <section className={`${styles.ladakh} section`} aria-labelledby="tourin-ladakh-heading">
          <div className="container">
            <div className={styles.ladakhInner}>
              <div>
                <Reveal as="p" className="eyebrow">
                  03 — Why Ladakh
                </Reveal>
                <Reveal as="h2" id="tourin-ladakh-heading" className={styles.ladakhHeading} delay={80}>
                  Ladakh is where Tourin begins
                </Reveal>
                <Reveal as="p" className={styles.ladakhBody} delay={140}>
                  Ārohana knows Ladakh closely enough to design experiences beyond the obvious itinerary. First journeys centre on exploration, culture, landscapes and meaningful encounters — with enough structure for comfort and enough space for the unexpected.
                </Reveal>
              </div>
              <Reveal className={styles.ladakhMedia} delay={120}>
                <Media media={tourinData.experiences[0].images[0]} ratio="4 / 3" rounded="lg" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHO TOURIN IS FOR */}
        <section className={`${styles.audience} section`} aria-labelledby="tourin-audience-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
              04 — Who Tourin is for
            </Reveal>
            <div className={styles.audienceGrid}>
              {[
                "Curious rather than checklist-driven travellers",
                "People who want to understand a destination, not only photograph it",
                "People who value local experiences and thoughtful pacing",
                "Small groups, couples, families or individual travellers wanting a more personal journey",
                "Travellers wanting professional planning without a fixed tourist circuit",
              ].map((item, i) => (
                <Reveal key={i} className={styles.audienceItem} delay={100 + i * 80}>
                  <span className={styles.audienceNum}>{String(i + 1).padStart(2, "0")}</span>
                  <p className={styles.audienceBody}>{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* THE EXPERIENCE */}
        <section className={`${styles.experience} section`} aria-labelledby="tourin-experience-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
              05 — The experience
            </Reveal>
            <Reveal as="h2" id="tourin-experience-heading" className={styles.experienceHeading} delay={80}>
              Carefully chosen stays, local experiences, food, culture, landscapes and practical planning.
            </Reveal>
            <Reveal as="p" className={styles.experienceBody} delay={140}>
              Each element has a reason to be there. No template itineraries. No unnecessary stops. Every route, stay and interaction is shaped by real time spent in Ladakh — not a destination database or a standard template.
            </Reveal>
            <Reveal className={styles.experienceMedia} delay={200}>
              <div className={styles.experienceGrid}>
                {tourinData.experiences[0].images.map((m, i) => (
                  <Media key={i} media={m} ratio="16 / 9" rounded="lg" />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FROM AROHANA TO TOURIN */}
        <section className={`${styles.from} section`} aria-labelledby="tourin-from-heading">
          <div className="container">
            <div className={styles.fromInner}>
              <Reveal as="p" className="eyebrow">
                06 — From Ārohana to Tourin
              </Reveal>
              <Reveal as="h2" id="tourin-from-heading" className={styles.fromHeading} delay={80}>
                The same instinct, applied to travel
              </Reveal>
              <Reveal as="p" className={styles.fromBody} delay={140}>
                Tourin extends the same instinct as Ārohana: create something with a clear point of view rather than offering what everyone else offers. Ārohana builds brands and businesses; Tourin applies that thinking to travel.
              </Reveal>
            </div>
          </div>
        </section>

        {/* NEXT CHAPTER */}
        <section className={`${styles.next} section`} aria-labelledby="tourin-next-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              07 — The next chapter
            </Reveal>
            <Reveal as="h2" id="tourin-next-heading" className={styles.nextHeading} delay={80}>
              Ladakh is the beginning, not the boundary
            </Reveal>
            <Reveal as="p" className={styles.nextBody} delay={140}>
              The approach can expand to other destinations with enough character, culture and story. The thinking remains the same: ground-level understanding, genuine care for experience, and a refusal to compete on cheap packages or number of destinations.
            </Reveal>
          </div>
        </section>

        {/* PACKAGES */}
        <section className={`${styles.packages} section`} aria-labelledby="tourin-packages-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
              Ladakh experiences
            </Reveal>
            <Reveal as="h2" id="tourin-packages-heading" className={styles.packagesHeading} delay={80}>
              15+ separate bookings and trips so far
            </Reveal>
            <Reveal as="p" className={styles.packagesBody} delay={140}>
              From individual travellers and small groups to larger parties, including a 20-biker trip. Each journey is planned around the traveller, not a fixed template.
            </Reveal>
              <Reveal className={styles.packagesCta} delay={200}>
                <a href={tourinData.meta.cta.href} className="btn btn--primary">
                  Talk to us about a journey <Arrow />
                </a>
              </Reveal>
          </div>
        </section>

        {/* CLOSING */}
        <section className={`${styles.closing} section`} aria-labelledby="tourin-closing-heading">
          <div className="container">
            <Reveal as="h2" id="tourin-closing-heading" className={styles.closingHeading} delay={80}>
              Come travel differently.
            </Reveal>
            <Reveal className={styles.closingCta} delay={160}>
              <a href={tourinData.meta.cta.href} className="btn btn--primary">
                View Ladakh Experiences <Arrow />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
