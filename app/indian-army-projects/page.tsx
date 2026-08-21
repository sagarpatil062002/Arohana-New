import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import Media from "@/components/Media";
import Arrow from "@/components/Arrow";
import styles from "./indian-army-projects.module.css";

export const metadata: Metadata = {
  title: "Indian Army Projects | Ārohana Consultancy",
  description:
    "Selected Indian Army projects by Ārohana across communication, design, publications, storytelling, video production and community-focused initiatives.",
  alternates: { canonical: "/indian-army-projects" },
};

const projects = [
  {
    num: "01",
    title: "Western Command — Investiture Ceremony",
    body:
      "Ārohana handled the shoot and post-production for the Western Command Investiture Ceremony in February 2026. A disciplined, on-ground production covering ceremony coverage, final film delivery and post-production across a large-scale institutional event.",
    tags: ["Shoot", "Production", "Post-production"],
    media: {
      src: "/samples/work-raysons.jpg",
      alt: "Western Command Investiture Ceremony — ceremony still.",
      label: "Ceremony still (to be replaced with approved asset).",
    },
  },
  {
    num: "02",
    title: "14 Corps Headquarters — Communication & Production",
    body:
      "Communication, design and video-production work, including visual communication and films developed through scripting, voice-over, editing and sound. The work required sensitivity to audience, environment and operational context.",
    tags: ["Communication", "Design", "Video production"],
    media: {
      src: "/samples/work-misu.jpg",
      alt: "14 Corps communication and production work.",
      label: "Approved 14 Corps work still.",
    },
  },
  {
    num: "03",
    title: "Fire & Fury Corps — Selected Work",
    body:
      "Fire & Fury is the designation associated with XIV Corps. Work includes communication, publications, video and community-facing initiatives — produced with the same discipline as any other institutional brief.",
    tags: ["Communication", "Publications", "Video"],
    media: {
      src: "/samples/work-picturetime.jpg",
      alt: "Fire & Fury Corps selected work.",
      label: "Approved Fire & Fury still.",
    },
  },
  {
    num: "04",
    title: "Rezang La War Memorial — Coffee-table Book",
    body:
      "Coffee-table book design and visual communication for the Rezang La War Memorial. The publication required restraint, respect for the subject and clarity in a visually demanding format.",
    tags: ["Publication design", "Visual communication"],
    media: {
      src: "/samples/work-loom.jpg",
      alt: "Rezang La War Memorial publication.",
      label: "Approved publication cover / interior spread.",
    },
  },
  {
    num: "05",
    title: "69 Armoured Regiment — Coffee-table Book",
    body:
      "Coffee-table book design and visual communication. The client-provided designation is 69 Armoured Regiment. Visuals are subject to public-use approval before publication.",
    tags: ["Publication design", "Visual communication"],
    media: {
      src: "/samples/work-she.jpg",
      alt: "69 Armoured Regiment publication.",
      label: "Approved publication cover / interior spread.",
    },
  },
  {
    num: "06",
    title: "SHE — Sustainable Health Empowerment",
    body:
      "Health and hygiene initiative aligned with Operation Sadbhavana and implemented across eight remote villages. Ārohana developed the name and identity and worked across communication and documentary content. Sensitive community communication with responsibility at its centre.",
    tags: ["Community", "Health", "Identity"],
    media: {
      src: "/samples/work-she.jpg",
      alt: "SHE community initiative — health and hygiene.",
      label: "SHE approved field still.",
    },
  },
  {
    num: "07",
    title: "Operation Sampark",
    body:
      "Work with homestay owners in border communities on practical hospitality, hygiene and guest relations, including training material and a supporting video for Fire & Fury social media. On-ground, practical and built around real needs.",
    tags: ["Training", "Video", "Community"],
    media: {
      src: "/samples/complex-1.jpg",
      alt: "Operation Sampark — homestay training on-ground.",
      label: "Operation Sampark approved still.",
    },
  },
  {
    num: "08",
    title: "Vibrant Villages Programme & Border Tourism",
    body:
      "Communication and video work connected with the Vibrant Villages Programme and border-tourism initiatives in Ladakh, including scripting, voice-over and production. Ārohana's contribution is communication and storytelling connected with these initiatives; the programme is not an Indian Army programme.",
    tags: ["Communication", "Video", "Storytelling"],
    media: {
      src: "/samples/complex-2.jpg",
      alt: "Vibrant Villages Programme communication work.",
      label: "Approved initiative still.",
    },
  },
];

export default function IndianArmyProjectsPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className={`${styles.hero} section`} aria-labelledby="army-hero-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow">
              Selected Projects
            </Reveal>
            <Reveal as="h1" id="army-hero-heading" className={styles.heroHeading} delay={80}>
              Selected Indian Army Projects
            </Reveal>
            <Reveal as="p" className={`lead ${styles.heroSupporting}`} delay={140}>
              Communication, storytelling, design and production across different Army environments.
            </Reveal>
          </div>
        </section>

        {/* PROJECTS */}
        <section className={`${styles.list} section`} aria-label="Project list">
          <div className="container">
            {projects.map((project, i) => (
              <article
                key={project.num}
                className={`${styles.project} ${i !== projects.length - 1 ? styles.projectDivider : ""}`}
              >
                <div className={styles.projectHeader}>
                  <Reveal as="span" className={styles.projectNum} delay={60}>
                    {project.num}
                  </Reveal>
                  <Reveal as="h2" className={styles.projectTitle} delay={100}>
                    {project.title}
                  </Reveal>
                </div>
                <div className={styles.projectBody}>
                  <div className={styles.projectText}>
                    <Reveal as="p" className={styles.projectBody} delay={140}>
                      {project.body}
                    </Reveal>
                    <Reveal as="div" className={styles.projectTags} delay={180}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </Reveal>
                  </div>
                  <Reveal className={styles.projectMedia} delay={120}>
                    <Media media={project.media} ratio="4 / 3" rounded="lg" />
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className={`${styles.closing} section`} aria-labelledby="army-closing-heading">
          <div className="container">
            <Reveal as="h2" id="army-closing-heading" className={styles.closingStatement} delay={60}>
              Different environments. Different audiences. Different briefs. The work changes with the context. The standard of thinking and execution does not.
            </Reveal>
            <Reveal className={styles.closingCta} delay={140}>
              <a href="/work" className="btn btn--primary">
                View all work <Arrow />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
