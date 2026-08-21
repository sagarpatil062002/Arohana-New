import { hero } from "@/data/content";
import Reveal from "./Reveal";
import Arrow from "./Arrow";
import HeroMedia from "./HeroMedia";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className="container">
        <Reveal as="p" className="eyebrow" delay={0}>
          <span className="dot" aria-hidden="true" />
          {hero.eyebrow}
        </Reveal>

        <Reveal as="h1" id="hero-heading" className={styles.headline} delay={90}>
          {hero.headline}
        </Reveal>

        <div className={styles.lower}>
          <Reveal as="p" className={`lead ${styles.supporting}`} delay={200}>
            {hero.supporting}
          </Reveal>

          <Reveal className={styles.actions} delay={300}>
            <a href={hero.primaryCta.href} className="btn btn--primary">
              {hero.primaryCta.label}
              <Arrow />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn--ghost">
              {hero.secondaryCta.label}
              <Arrow />
            </a>
          </Reveal>
        </div>
      </div>

      <div className="container">
        <Reveal className={styles.mediaWrap} delay={380}>
          <HeroMedia media={hero.media} />
        </Reveal>
      </div>
    </section>
  );
}
