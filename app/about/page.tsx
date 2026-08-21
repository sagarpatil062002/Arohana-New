import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import Media from "@/components/Media";
import Arrow from "@/components/Arrow";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Ārohana | Madhura Hawal, Founder",
  description:
    "Meet Madhura Hawal, founder of Ārohana Consultancy. From hospitality and entrepreneurship to brand strategy, digital growth and complex on-ground projects.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="section" aria-labelledby="about-hero-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              About Ārohana
            </Reveal>
            <Reveal as="h1" id="about-hero-heading" className={styles.heroHeading} delay={80}>
              I didn&rsquo;t plan to build Ārohana.
            </Reveal>
            <Reveal as="p" className={`lead ${styles.heroLead}`} delay={140}>
              The road to Ārohana was anything but straight.
            </Reveal>
          </div>
        </section>

        {/* INTRO */}
        <section className="section" aria-labelledby="about-intro-heading">
          <div className="container">
            <div className={styles.introGrid}>
              <Reveal as="p" className={styles.introBody} delay={100}>
                My name is Madhura Hawal. I started in hospitality — not because it was a plan, but because it was the first thing that made sense. Hospitality Management in Muscat. A degree in Goa. Top 13 West Zone Femina Miss India selection. One of 16 students from India selected for the Taj Management Training Programme.
              </Reveal>
              <Reveal as="p" className={styles.introBody} delay={140}>
                I worked in Muscat, returned to Kolhapur and founded Mother India Cafe. Running a cafe teaches you about people, margins, suppliers, staff, customers, decisions, relationships, negotiation and growth — in that order.
              </Reveal>
              <Reveal className={styles.introMedia} delay={120}>
                <RevealMedia
                  media={{
                    src: "/samples/work-raysons.jpg",
                    alt: "Madhura Hawal — hospitality and early entrepreneurship.",
                    label: "Madhura on-ground / hospitality work.",
                  }}
                  ratio="4 / 5"
                  sizes="(max-width: 880px) 100vw, 38vw"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* IT STARTED WITH HOSPITALITY */}
        <section className="section" aria-labelledby="about-hosp-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              01 — It started with hospitality
            </Reveal>
            <Reveal as="h2" id="about-hosp-heading" className={styles.sectionHeading} delay={80}>
              The business side of people
            </Reveal>
            <div className={styles.bodyGrid}>
              <Reveal as="p" className={styles.body} delay={120}>
                After Mother India Cafe, I joined Passcode Hospitality as Operations Head for Pings Bia Hoi and Jamun — two very different concepts that both needed operational rigour and commercial clarity.
              </Reveal>
              <Reveal as="p" className={styles.body} delay={160}>
                Later, I moved into institutional business and sales at Latambarcem Brewers Private Limited across Goa and Delhi — working with restaurants, hotels and retail partners on the commercial side of craft beer. The through-line was always the same: understand the business, understand the people, and make decisions that are grounded in reality.
              </Reveal>
            </div>
          </div>
        </section>

        {/* UNEXPECTED DETOURS */}
        <section className={`${styles.alt} section`} aria-labelledby="about-detour-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              02 — There were a few unexpected detours
            </Reveal>
            <Reveal as="h2" id="about-detour-heading" className={styles.sectionHeading} delay={80}>
              When the cafe closed, something else began
            </Reveal>
            <Reveal as="p" className={styles.body} delay={140}>
              COVID changed the direction. The cafe closed and hospitality work was disrupted. What started as a pause became the beginning of something different. Digital marketing. Content. Projects that had nothing to do with hospitality and everything to do with the same instincts — understanding context, reading audience, executing with care.
            </Reveal>
            <Reveal className={styles.detourMedia} delay={200}>
              <Media
                media={{
                  src: "/samples/pov.jpg",
                  alt: "Transition period — new direction.",
                  label: "Transition / new direction still.",
                }}
                ratio="16 / 9"
                rounded="lg"
              />
            </Reveal>
          </div>
        </section>

        {/* THE WORK GOT INTERESTING */}
        <section className="section" aria-labelledby="about-interesting-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              03 — And then, the work got interesting
            </Reveal>
            <Reveal as="h2" id="about-interesting-heading" className={styles.sectionHeading} delay={80}>
              From digital marketing to restaurants, films and the Army
            </Reveal>
            <div className={styles.bodyGrid}>
              <Reveal as="p" className={styles.body} delay={120}>
                The work expanded into restaurants and resorts, real estate, healthcare, consumer businesses and entertainment. Requirements ranged from brand strategy and digital presence to campaigns, films, menus and operational problems. Each sector needed a different lens, and the thinking changed with the context.
              </Reveal>
              <Reveal as="p" className={styles.body} delay={160}>
                Then came the Ladakh chapter. Work connected with 14 Corps, Fire & Fury Corps, Operation Sadbhavana and Operation Sampark — later extending to Western Command and 12 Rashtriya Rifles under Delta Force. These were projects where environment, audience and responsibility required a different kind of preparation.
              </Reveal>
            </div>
            <Reveal className={styles.armyMedia} delay={200}>
              <div className={styles.armyMediaGrid}>
                <Media
                  media={{
                    src: "/samples/complex-1.jpg",
                    alt: "Approved Army project still.",
                    label: "Approved work still.",
                  }}
                  ratio="4 / 3"
                  rounded="lg"
                />
                <Media
                  media={{
                    src: "/samples/complex-2.jpg",
                    alt: "Approved Army project still.",
                    label: "Approved work still.",
                  }}
                  ratio="4 / 3"
                  rounded="lg"
                />
                <Media
                  media={{
                    src: "/samples/complex-3.jpg",
                    alt: "Approved Army project still.",
                    label: "Approved work still.",
                  }}
                  ratio="4 / 3"
                  rounded="lg"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHERE AROHANA STANDS TODAY */}
        <section className={`${styles.alt} section`} aria-labelledby="about-today-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              04 — Where Ārohana stands today
            </Reveal>
            <Reveal as="h2" id="about-today-heading" className={styles.sectionHeading} delay={80}>
              Clear thinking, sector-aware strategy, strong creative work and disciplined execution
            </Reveal>
            <Reveal as="p" className={styles.body} delay={140}>
              The category changes but the thinking changes with it. The business may begin with a brand question, a business challenge or something not working. Strategy, communication, creative and execution then come together around what is actually needed — not what a template says should come next.
            </Reveal>
            <Reveal as="p" className={styles.body} delay={180}>
              Ārohana is credible enough for established businesses while remaining flexible enough to work directly with decision-makers. We have real and varied experience, including difficult-to-replicate projects. We can support ongoing partnerships as well as complex, defined projects.
            </Reveal>
          </div>
        </section>

        {/* CLOSING */}
        <section className={`${styles.closing} section`} aria-labelledby="about-closing-heading">
          <div className="container">
            <Reveal as="blockquote" id="about-closing-heading" className={styles.pullQuote} delay={80}>
              &ldquo;A brand is only as strong as the thinking behind it.&rdquo;
            </Reveal>
            <Reveal as="p" className={styles.closingBody} delay={140}>
              If you&rsquo;re building something worth building, let&rsquo;s talk.
            </Reveal>
            <Reveal className={styles.closingCta} delay={200}>
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
