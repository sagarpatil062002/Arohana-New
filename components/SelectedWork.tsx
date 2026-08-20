import { selectedWork } from "@/data/content";
import Reveal from "./Reveal";
import Media from "./Media";
import Arrow from "./Arrow";
import styles from "./SelectedWork.module.css";

export default function SelectedWork() {
  return (
    <section className="section" aria-labelledby="work-heading">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Selected work
        </Reveal>
        <Reveal as="h2" id="work-heading" className="section-title" delay={80}>
          A few businesses we&rsquo;ve helped shape, communicate or build.
        </Reveal>

        <div className={styles.grid}>
          {selectedWork.map((item, i) => {
            const isFeature = item.size === "feature";
            return (
              <Reveal
                key={item.name}
                className={`${styles.card} ${isFeature ? styles.feature : styles.standard}`}
                delay={100 + (i % 2) * 80}
              >
                <a href={item.href} className={styles.link}>
                  <div className={styles.media}>
                    <Media
                      media={item.media}
                      ratio={isFeature ? "16 / 10" : "4 / 3"}
                      rounded="md"
                      sizes={
                        isFeature
                          ? "(max-width: 980px) 100vw, 70vw"
                          : "(max-width: 980px) 100vw, 45vw"
                      }
                    />
                  </div>
                  <div className={styles.body}>
                    <div className={styles.head}>
                      <h3 className={styles.title}>{item.name}</h3>
                      <span className={styles.view}>
                        View case study <Arrow size={15} />
                      </span>
                    </div>
                    <p className={styles.desc}>{item.description}</p>
                    <ul className={styles.tags}>
                      {item.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
