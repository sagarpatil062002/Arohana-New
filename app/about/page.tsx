import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import SectorBand from "@/components/SectorBand";
import Arrow from "@/components/Arrow";
import { hero, pointOfView } from "@/data/content";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Ārohana Consultancy",
  description:
    "Ārohana brings together business thinking, creative communication and execution — working directly with founders, owners and decision-makers across sectors.",
  alternates: { canonical: "/about" },
};

const steps = [
  {
    num: "01",
    title: "Understand",
    desc: "We start with the business itself — its context, constraints and the people who decide.",
  },
  {
    num: "02",
    title: "Strategize",
    desc: "We shape positioning, communication and a roadmap that fits the sector, not a template.",
  },
  {
    num: "03",
    title: "Execute",
    desc: "We own the work — from content and production to hospitality operations and on-ground projects.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "We measure against what the business actually needs, and stay through implementation.",
  },
];

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
              {hero.headline}
            </Reveal>
            <div className={styles.heroGrid}>
              <Reveal as="p" className={`lead ${styles.heroLead}`} delay={140}>
                {hero.supporting}
              </Reveal>
              <Reveal className={styles.heroMedia} delay={120}>
                <RevealMedia
                  media={{
                    src: "/samples/work-raysons.jpg",
                    alt: "Ārohana project and built-environment work.",
                    label: "Real estate / built environment still.",
                  }}
                  ratio="4 / 3"
                  sizes="(max-width: 880px) 100vw, 46vw"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 01 INTRODUCTION */}
        <section className="section" aria-labelledby="about-intro-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              01 — Introduction
            </Reveal>
            <Reveal as="h2" id="about-intro-heading" className={styles.statement} delay={80}>
              {pointOfView.headline}
            </Reveal>
            <Reveal as="p" className={styles.body} delay={150}>
              {pointOfView.body[0]}
            </Reveal>
          </div>
        </section>

        {/* 02 WHO WE ARE */}
        <section className="section" aria-labelledby="about-who-heading">
          <div className="container">
            <div className={styles.twoCol}>
              <div>
                <Reveal as="p" className="eyebrow">
                  02 — Who we are
                </Reveal>
                <Reveal as="h2" id="about-who-heading" className={styles.statement} delay={80}>
                  A consultancy, a creative studio and a strategic partner.
                </Reveal>
              </div>
              <Reveal as="p" className={styles.body} delay={120}>
                We are as comfortable in a founder&rsquo;s first conversation as we are
                on a shoot, in a kitchen, or on the ground in a place most agencies
                never visit. Ārohana thinks beyond social-media posts — understanding
                different sectors, owning execution, and working directly with the
                people who decide.
              </Reveal>
            </div>
          </div>
        </section>

        {/* 03 FOUNDER */}
        <section className="section" aria-labelledby="about-founder-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              03 — Founder
            </Reveal>
            <div className={styles.founder}>
              <Reveal className={styles.founderMedia} delay={100}>
                <RevealMedia
                  media={pointOfView.media}
                  ratio="4 / 5"
                  sizes="(max-width: 880px) 100vw, 40vw"
                />
              </Reveal>
              <div className={styles.founderText}>
                <Reveal as="h2" id="about-founder-heading" className={styles.founderName} delay={80}>
                  Madhura
                </Reveal>
                <Reveal as="p" className={styles.founderRole} delay={120}>
                  Founder
                </Reveal>
                <Reveal as="p" className={styles.body} delay={160}>
                  A bridge between business thinking and creative execution, Madhura
                  works directly with founders, owners and decision-makers. Her
                  approach is grounded in sector understanding and a willingness to be
                  on the ground — from hospitality and built-environment projects to
                  community and field work in Ladakh.
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 04 APPROACH */}
        <section className="section" aria-labelledby="about-approach-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              04 — Our approach
            </Reveal>
            <Reveal as="h2" id="about-approach-heading" className="section-title" delay={80}>
              A sequence, not a service menu.
            </Reveal>
            <div className={styles.approach}>
              {steps.map((s, i) => (
                <Reveal key={s.num} className={styles.step} delay={100 + i * 80}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepDesc}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 05 EXPERIENCE */}
        <SectorBand />

        {/* 06 CLOSING */}
        <section className="section" aria-labelledby="about-closing-heading">
          <div className="container">
            <Reveal as="h2" id="about-closing-heading" className={styles.closing} delay={60}>
              Let&rsquo;s build what comes next.
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
