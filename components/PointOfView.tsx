import { pointOfView } from "@/lib/content";
import Reveal from "./Reveal";
import Media from "./Media";
import styles from "./PointOfView.module.css";

export default function PointOfView() {
  return (
    <section className="section" aria-labelledby="pov-heading">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.text}>
            <Reveal as="p" className="eyebrow">
              {pointOfView.eyebrow}
            </Reveal>
            <Reveal as="h2" id="pov-heading" className={styles.headline} delay={80}>
              {pointOfView.headline}
            </Reveal>
            {pointOfView.body.map((p, i) => (
              <Reveal as="p" className={styles.body} key={i} delay={160 + i * 80}>
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.media} delay={120}>
            <Media media={pointOfView.media} ratio="4 / 5" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
