import { tourinData } from "@/lib/content";
import Reveal from "./Reveal";
import Media from "./Media";
import Arrow from "./Arrow";
import styles from "./TourinSection.module.css";

export default function TourinSection() {
  return (
    <section className="section" aria-labelledby="tourin-heading">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.text}>
            <Reveal as="p" className="eyebrow">
              {tourinData.meta.eyebrow}
            </Reveal>
            <Reveal as="h2" id="tourin-heading" className={styles.headline} delay={80}>
              {tourinData.meta.subheadline || "And then there is Tourin."}
            </Reveal>
            <Reveal as="p" className={styles.body} delay={150}>
              {tourinData.meta.body}
            </Reveal>

            <Reveal className={styles.stat} delay={210}>
              <span className={styles.statValue}>{tourinData.meta.stat.value}</span>
              <span className={styles.statLabel}>{tourinData.meta.stat.label}</span>
            </Reveal>

            <Reveal delay={260}>
              <a href="/tourin" className="btn btn--ghost">
                Explore Tourin
                <Arrow />
              </a>
            </Reveal>
          </div>

          <div className={styles.media}>
            <Reveal className={styles.mediaMain}>
              <Media media={tourinData.experiences[0].images[0]} ratio="4 / 5" />
            </Reveal>
            <div className={styles.mediaSide}>
              <Reveal delay={120}>
                <Media media={tourinData.experiences[0].images[1]} ratio="4 / 3" />
              </Reveal>
              <Reveal delay={200}>
                <Media media={tourinData.experiences[0].images[2]} ratio="4 / 3" />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
