import { site } from "@/data/content";
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
          <nav className={styles.nav} aria-label="Footer">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.contact}>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={site.contact.phoneHref}>{site.contact.phone}</a>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Ārohana Consultancy. All rights reserved.</p>
          <p>Built with restraint — photography and case studies to follow.</p>
        </div>
      </div>
    </footer>
  );
}
