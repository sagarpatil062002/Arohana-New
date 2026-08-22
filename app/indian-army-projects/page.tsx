import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import Media from "@/components/Media";
import Arrow from "@/components/Arrow";
import { getArmyProjects } from "@/lib/content/server";
import styles from "./indian-army-projects.module.css";

export const metadata: Metadata = {
  title: "Indian Army Projects | Ārohana Consultancy",
  description:
    "Selected Indian Army projects by Ārohana across communication, design, publications, storytelling, video production and community-focused initiatives.",
  alternates: { canonical: "/indian-army-projects" },
};

const data = getArmyProjects();

export default function IndianArmyProjectsPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className={`${styles.hero} section`} aria-labelledby="army-hero-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              {data.hero.eyebrow}
            </Reveal>
            <Reveal as="h1" id="army-hero-heading" className={styles.heroHeading} delay={80}>
              {data.hero.headline}
            </Reveal>
            <Reveal as="p" className={`lead ${styles.heroSupporting}`} delay={140}>
              {data.hero.supporting}
            </Reveal>
            {data.hero.media && (
              <Reveal className={styles.heroMediaWrap} delay={200}>
                <Media media={data.hero.media} ratio="21 / 9" rounded="lg" priority />
              </Reveal>
            )}
          </div>
        </section>

        {/* PROJECTS */}
        <section className={`${styles.list} section`} aria-label="Project list">
          <div className="container">
            {data.projects.map((project, i) => (
              <article
                key={project.id}
                className={`${styles.project} ${i !== data.projects.length - 1 ? styles.projectDivider : ""}`}
              >
                <div className={styles.projectHeader}>
                  <Reveal as="span" className={styles.projectNum} delay={60}>
                    {project.id}
                  </Reveal>
                  <Reveal as="h2" className={styles.projectTitle} delay={100}>
                    {project.title}
                  </Reveal>
                </div>
                <div className={styles.projectContent}>
                  <div className={styles.projectText}>
                    <Reveal as="p" className={styles.projectParagraph} delay={140}>
                      {project.body}
                    </Reveal>
                    {project.caseStudyHref && (
                      <Reveal className={styles.projectCaseLink} delay={160}>
                        <a href={project.caseStudyHref} className="link-underline">
                          View full SHE case study <Arrow />
                        </a>
                      </Reveal>
                    )}
                    <Reveal as="div" className={styles.projectTags} delay={180}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </Reveal>
                  </div>
                  {project.media && (
                    <Reveal className={styles.projectMedia} delay={120}>
                      <Media media={project.media} ratio="4 / 3" rounded="lg" />
                    </Reveal>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONSOLIDATED CAPABILITY STATEMENT */}
        {data.capabilityStatement && (
          <section className={`${styles.capabilitySection} section`} aria-labelledby="army-capabilities-heading">
            <div className="container">
              <div className={styles.capabilityCard}>
                <Reveal as="p" className="eyebrow">
                  {data.capabilityStatement.eyebrow}
                </Reveal>
                <Reveal as="h2" id="army-capabilities-heading" className={styles.capabilityHeading} delay={80}>
                  {data.capabilityStatement.headline}
                </Reveal>
                {data.capabilityStatement.sub && (
                  <Reveal as="p" className={styles.capabilitySub} delay={140}>
                    {data.capabilityStatement.sub}
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CLOSING */}
        <section className={`${styles.closing} section`} aria-labelledby="army-closing-heading">
          <div className="container">
            <Reveal as="h2" id="army-closing-heading" className={styles.closingStatement} delay={60}>
              {data.closing.statement}
            </Reveal>
            <Reveal className={styles.closingCta} delay={140}>
              <div className={styles.ctaGroup}>
                <a href={data.closing.cta.href} className="btn btn--primary">
                  {data.closing.cta.label} <Arrow />
                </a>
                {data.closing.secondaryCta && (
                  <a href={data.closing.secondaryCta.href} className="btn btn--ghost">
                    {data.closing.secondaryCta.label} <Arrow />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}