import { sectors } from "@/data/content";
import Reveal from "./Reveal";
import styles from "./SectorBand.module.css";

export default function SectorBand() {
  return (
    <section className="section" aria-labelledby="sectors-heading">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Sectors
        </Reveal>
        <Reveal as="h2" id="sectors-heading" className="section-title" delay={80}>
          Where our experience sits
        </Reveal>

        <ul className={styles.list}>
          {sectors.map((sector, i) => (
            <Reveal as="li" key={sector} className={styles.row} delay={120 + i * 60}>
              <a href="/work" className={styles.link}>
                <span className={styles.index}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.name}>{sector}</span>
                <span className={styles.mark} aria-hidden="true">
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
