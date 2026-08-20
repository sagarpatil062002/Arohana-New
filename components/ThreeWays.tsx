import { services } from "@/data/content";
import Reveal from "./Reveal";
import Media from "./Media";
import styles from "./ThreeWays.module.css";

export default function ThreeWays() {
  return (
    <section className="section" aria-labelledby="ways-heading">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          How we engage
        </Reveal>
        <Reveal as="h2" id="ways-heading" className="section-title" delay={80}>
          Three ways we work
        </Reveal>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <Reveal key={service.number} className={styles.card} delay={120 + i * 90}>
              <article className={styles.cardInner}>
                <div className={styles.media}>
                  <Media media={service.media} ratio="4 / 3" rounded="md" />
                </div>
                <div className={styles.content}>
                  <span className={styles.number}>{service.number}</span>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.desc}>{service.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
