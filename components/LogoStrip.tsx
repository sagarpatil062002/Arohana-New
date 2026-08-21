import { workProjects } from "@/lib/content";
import Reveal from "./Reveal";
import styles from "./LogoStrip.module.css";

/**
 * Clean, understated logo strip. Only approved names are shown — rendered as
 * refined text wordmarks until real logo files are supplied (then swap each
 * cell to an <img>). No fabricated logos, no "trusted by N+" claims.
 */
export default function LogoStrip() {
  return (
    <section className="section" aria-labelledby="brands-heading">
      <div className="container">
        <Reveal as="h2" id="brands-heading" className={styles.heading}>
          Brands and organisations we&rsquo;ve worked with
        </Reveal>

        <Reveal className={styles.strip} delay={80}>
          <ul className={styles.grid}>
            {workProjects.brands.map((name) => (
              <li key={name} className={styles.cell}>
                <span className={styles.wordmark}>{name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
