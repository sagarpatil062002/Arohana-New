import { finalCta } from "@/data/content";
import Reveal from "./Reveal";
import Arrow from "./Arrow";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.cta} aria-labelledby="cta-heading">
      <div className="container">
        <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
          {finalCta.eyebrow}
        </Reveal>
        <Reveal as="h2" id="cta-heading" className={styles.headline} delay={80}>
          {finalCta.headline}
        </Reveal>

        <Reveal className={styles.actions} delay={160}>
          <a
            href={finalCta.primaryCta.href}
            className={styles.primary}
            data-cursor="cta"
          >
            {finalCta.primaryCta.label}
            <Arrow />
          </a>
        </Reveal>

        <Reveal className={styles.contact} delay={220}>
          <a href={`mailto:${finalCta.contact.email}`}>
            {finalCta.contact.email}
          </a>
          <span className={styles.sep} aria-hidden="true">
            ·
          </span>
          <a href={finalCta.contact.phoneHref}>{finalCta.contact.phone}</a>
        </Reveal>
      </div>
    </section>
  );
}
