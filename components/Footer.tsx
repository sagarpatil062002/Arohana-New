import { site } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <a href="/" className={styles.wordmark} aria-label="Ārohana — home">
            {site.wordmark}
          </a>
          <p className={styles.statement}>
            Business thinking, creative communication and execution — across
            brands, hospitality and complex on-ground projects.
          </p>
          <a href="/contact" className={`link-underline ${styles.cta}`}>
            Start a conversation
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Ārohana Consultancy</p>
          <nav className={styles.legal} aria-label="Legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
