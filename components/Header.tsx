"use client";

import { useEffect, useState, useCallback } from "react";
import { site } from "@/lib/content";
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

  // handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // lock scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.menuIsOpen : ""}`}
    >
      <div className={styles.inner}>
        <a
          href="/"
          className={styles.wordmark}
          aria-label="Ārohana — home"
          onClick={() => setOpen(false)}
        >
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
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">
            {open ? "Close menu" : "Open menu"}
          </span>
          <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} />
        </button>
      </div>

      {open && (
        <div
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
        aria-hidden={!open}
        data-lenis-prevent
      >
        <div className={styles.mobileInner}>
          <nav className={styles.mobileNav} aria-label="Mobile">
            {site.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileLink} ${active ? styles.mobileLinkActive : ""}`}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {active && <span className={styles.activeIndicator} aria-hidden="true" />}
                </a>
              );
            })}
          </nav>

          <div className={styles.mobileFooter}>
            <a
              href="/contact"
              className={`btn btn--primary ${styles.mobileCta}`}
              onClick={() => setOpen(false)}
            >
              Start a conversation
              <Arrow />
            </a>

            <div className={styles.mobileContact}>
              <span className={styles.contactLabel}>Get in touch</span>
              <a href={`mailto:${site.contact.email}`} className={styles.contactLink}>
                {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className={styles.contactLink}>
                {site.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
