"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/content";
import { usePathname } from "next/navigation";
import Arrow from "./Arrow";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.wordmark} aria-label="Ārohana — home">
          {site.wordmark}
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {site.nav.map((item) => {
            const active =
              item.href !== "/" && pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a href="/contact" className={`btn btn--primary ${styles.cta}`}>
          Start a conversation
        </a>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">
            {open ? "Close menu" : "Open menu"}
          </span>
          <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
        hidden={!open}
      >
        <nav className={styles.mobileNav} aria-label="Mobile">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.mobileLink}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="/contact" className={`btn btn--primary ${styles.mobileCta}`}>
          Start a conversation
          <Arrow />
        </a>
        <div className={styles.mobileContact}>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={site.contact.phoneHref}>{site.contact.phone}</a>
        </div>
      </div>
    </header>
  );
}
