import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import ThreeWays from "@/components/ThreeWays";
import Arrow from "@/components/Arrow";
import { services, serviceDetails } from "@/data/content";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services | Ārohana Consultancy",
  description:
    "Digital brand growth, content production and hospitality consulting for businesses across India and selected international markets.",
  alternates: { canonical: "/services" },
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
              What we do depends on what the business actually needs.
            </Reveal>
            <Reveal as="p" className={`lead ${styles.heroLead}`} delay={140}>
              Ārohana can act as an ongoing digital partner, hospitality consultant, content/production partner or combination. We assemble the right specialists around the brief.
            </Reveal>
          </div>
        </section>

        {/* SERVICES LIST */}
        <ThreeWays />

        {/* SERVICE DETAIL SECTIONS */}
        {services.map((service, i) => {
          const d = serviceDetails[service.title];
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

        {/* ENGAGEMENT MODELS */}
        <section className={`${styles.models} section`} aria-labelledby="services-models-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow" style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}>
              How engagements can work
            </Reveal>
            <div className={styles.modelsGrid}>
              {[
                { title: "Ongoing digital partnership", body: "Brands needing continuous strategy, content, creative and platform management." },
                { title: "Hospitality consulting", body: "Restaurants, cafés, resorts and hospitality businesses needing operational or commercial intervention." },
                { title: "Project production", body: "Films, documentaries, launches, campaigns, exhibitions or other defined projects." },
                { title: "Hybrid engagement", body: "Businesses where business consulting and digital communication need to move together." },
              ].map((m, i) => (
                <Reveal key={i} className={styles.modelItem} delay={100 + i * 80}>
                  <h3 className={styles.modelTitle}>{m.title}</h3>
                  <p className={styles.modelBody}>{m.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM NOTE */}
        <section className={`${styles.team} section`} aria-labelledby="services-team-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              Team structure
            </Reveal>
            <Reveal as="h2" id="services-team-heading" className={styles.teamHeading} delay={80}>
              The right people for the brief
            </Reveal>
            <Reveal as="p" className={styles.teamBody} delay={140}>
              We don&rsquo;t sell a fixed team chart. The right specialists are assembled around the brief — strategy, design, editing, photography, videography, performance or hospitality specialists as required. The team changes with the work.
            </Reveal>
          </div>
        </section>

        {/* CLOSING */}
        <section className="section" aria-labelledby="services-closing-heading">
          <div className="container">
            <Reveal as="h2" id="services-closing-heading" className={styles.closing} delay={60}>
              Don&rsquo;t start with a service. Start with the problem.
            </Reveal>
            <Reveal as="p" className={styles.closingBody} delay={120}>
              Tell us what you are trying to build, fix or change.
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
