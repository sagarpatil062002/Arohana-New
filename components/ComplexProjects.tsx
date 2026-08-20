import { complexProjects } from "@/data/content";
import Reveal from "./Reveal";
import Media from "./Media";
import Arrow from "./Arrow";
import styles from "./ComplexProjects.module.css";

export default function ComplexProjects() {
  return (
    <section className="section" aria-labelledby="complex-heading">
      <div className="container">
        <div className={styles.head}>
          <Reveal as="p" className="eyebrow">
            {complexProjects.eyebrow}
          </Reveal>
          <Reveal as="h2" id="complex-heading" className={styles.headline} delay={80}>
            {complexProjects.headline}
          </Reveal>
          <Reveal as="p" className={styles.body} delay={150}>
            {complexProjects.body}
          </Reveal>
        </div>

        <div className={styles.strip}>
          {complexProjects.items.map((item, i) => (
            <Reveal key={item.name} className={styles.item} delay={120 + i * 80}>
              <Media media={item.media} ratio="3 / 4" rounded="md" />
              <div className={styles.caption}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.sub}>{item.caption}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.foot} delay={120}>
          <a href={complexProjects.cta.href} className="link-underline">
            {complexProjects.cta.label}
            <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
