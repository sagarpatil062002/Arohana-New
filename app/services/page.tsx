import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import ThreeWays from "@/components/ThreeWays";
import Arrow from "@/components/Arrow";
import { services } from "@/data/content";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services — Ārohana Consultancy",
  description:
    "Ārohana works across digital brand growth, hospitality consulting and content & brand production — combining strategy, creativity and execution.",
  alternates: { canonical: "/services" },
};

const details: Record<
  string,
  { capabilities: string[]; projects: string[] }
> = {
  "Digital Brand Growth": {
    capabilities: [
      "Brand & communication strategy",
      "Social ecosystems & content",
      "Creative direction & production",
      "Performance & platform execution",
    ],
    projects: ["Raysons Group", "Loom Crafts", "PictureTime"],
  },
  "Hospitality Consulting": {
    capabilities: [
      "Concept & menu development",
      "Food cost & pricing",
      "SOPs & staffing",
      "Kitchen control & revenue optimisation",
    ],
    projects: ["Misu"],
  },
  "Content & Brand Production": {
    capabilities: [
      "Films & documentaries",
      "Corporate / institutional videos",
      "Campaign content",
      "Scripting, shoots & post-production",
    ],
    projects: ["PictureTime", "SHE"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="section" aria-labelledby="services-hero-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              What we do
            </Reveal>
            <Reveal as="h1" id="services-hero-heading" className={styles.heroHeading} delay={80}>
              Business thinking, creative communication and execution.
            </Reveal>
            <div className={styles.heroGrid}>
              <Reveal as="p" className={`lead ${styles.heroLead}`} delay={140}>
                From digital brand growth and content to hospitality consulting and
                complex on-ground projects.
              </Reveal>
              <Reveal className={styles.heroMedia} delay={120}>
                <RevealMedia
                  media={{
                    src: "/samples/svc-production.jpg",
                    alt: "Ārohana content and brand production work.",
                    label: "Film / production still.",
                  }}
                  ratio="4 / 3"
                  sizes="(max-width: 880px) 100vw, 46vw"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* SERVICES LIST */}
        <ThreeWays />

        {/* SERVICE DETAIL SECTIONS */}
        {services.map((service, i) => {
          const d = details[service.title];
          const reverse = i % 2 === 1;
          return (
            <section
              key={service.title}
              className="section"
              aria-labelledby={`svc-${i}-heading`}
            >
              <div className="container">
                <div className={`${styles.detail} ${reverse ? styles.reverse : ""}`}>
                  <Reveal className={styles.detailMedia} delay={100}>
                    <RevealMedia media={service.media} ratio="4 / 3" />
                  </Reveal>
                  <div className={styles.detailInner}>
                    <Reveal as="p" className="eyebrow">
                      Service {service.number}
                    </Reveal>
                    <Reveal as="h2" id={`svc-${i}-heading`} className={styles.detailTitle} delay={80}>
                      {service.title}
                    </Reveal>
                    <Reveal as="p" className={styles.detailStatement} delay={130}>
                      {service.description}
                    </Reveal>

                    <Reveal className={styles.detailCols} delay={180}>
                      <div>
                        <p className={styles.colLabel}>What it includes</p>
                        <ul className={styles.caps}>
                          {d.capabilities.map((c) => (
                            <li key={c} className={styles.cap}>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className={styles.colLabel}>Seen in</p>
                        <ul className={styles.projects}>
                          {d.projects.map((p) => (
                            <li key={p} className={styles.projectTag}>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>

                    <Reveal className={styles.detailCta} delay={220}>
                      <a href="/contact" className="link-underline">
                        Discuss this service
                        <Arrow />
                      </a>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* CLOSING */}
        <section className="section" aria-labelledby="services-closing-heading">
          <div className="container">
            <Reveal as="h2" id="services-closing-heading" className={styles.closing} delay={60}>
              Not sure which of these you need? That&rsquo;s where we start.
            </Reveal>
            <Reveal className={styles.closingCta} delay={140}>
              <a href="/contact" className="btn btn--primary">
                Start a conversation
                <Arrow />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
