"use client";

import { useState } from "react";
import { site } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RevealMedia from "@/components/RevealMedia";
import Media from "@/components/Media";
import Arrow from "@/components/Arrow";
import styles from "./contact.module.css";

type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  requirement: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    requirement: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Partial<FormData> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const update = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className={`${styles.hero} section`} aria-labelledby="contact-hero-heading">
          <div className="container">
            <Reveal as="p" className="eyebrow" style={{ justifyContent: "center", marginBottom: "1.4rem" }}>
              Let&rsquo;s talk
            </Reveal>
            <Reveal as="h1" id="contact-hero-heading" className={styles.heroHeading} delay={80}>
              LET&rsquo;S TALK.
            </Reveal>
            <Reveal as="p" className={`lead ${styles.heroBody}`} delay={140}>
              For prospective clients, partners and collaborators — if you&rsquo;re building something serious, we&rsquo;d like to hear about it.
            </Reveal>
          </div>
        </section>

        {/* CONTACT INFO */}
        <section className={`${styles.info} section`} aria-labelledby="contact-info-heading">
          <div className="container">
            <div className={styles.infoGrid}>
              <Reveal delay={80}>
                <span className={styles.infoLabel}>General Enquiries</span>
                <a href={`mailto:${site.contact.email}`} className={styles.infoValue}>
                  {site.contact.email}
                </a>
                <a href={site.contact.phoneHref} className={styles.infoValue}>
                  {site.contact.phone}
                </a>
              </Reveal>
              <Reveal delay={140}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>Mumbai, India</span>
                <span className={styles.infoValue}>Ladakh, India</span>
              </Reveal>
              <Reveal delay={200}>
                <span className={styles.infoLabel}>Social</span>
                <a href="#" className={styles.infoValue}>LinkedIn</a>
                <a href="#" className={styles.infoValue}>Instagram</a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className={`${styles.formSection} section`} aria-labelledby="contact-form-heading">
          <div className="container">
            <div className={styles.formInner}>
              <Reveal as="h2" id="contact-form-heading" className={styles.formHeading} delay={60}>
                Send an enquiry
              </Reveal>
              {submitted ? (
                <Reveal className={styles.submitRow} delay={80}>
                  <p style={{ fontSize: "var(--fs-lead)", color: "var(--ink-soft)" }}>
                    Thank you. We&rsquo;ll be in touch within two working days.
                  </p>
                </Reveal>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="name">Name</label>
                    <input
                      id="name"
                      className={styles.fieldInput}
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={update("name")}
                    />
                    {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="email">Email</label>
                    <input
                      id="email"
                      className={styles.fieldInput}
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update("email")}
                    />
                    {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="company">Company</label>
                    <input
                      id="company"
                      className={styles.fieldInput}
                      type="text"
                      placeholder="Company or organisation"
                      value={form.company}
                      onChange={update("company")}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      className={styles.fieldInput}
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={update("phone")}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="requirement">Project / Requirement</label>
                    <input
                      id="requirement"
                      className={styles.fieldInput}
                      type="text"
                      placeholder="Brief description of what you need"
                      value={form.requirement}
                      onChange={update("requirement")}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      className={styles.fieldInput}
                      placeholder="Tell us more about your project, timeline and expectations"
                      value={form.message}
                      onChange={update("message")}
                    />
                  </div>
                  <Reveal className={styles.submitRow} delay={100}>
                    <button type="submit" className={styles.submitBtn}>
                      Send enquiry <Arrow />
                    </button>
                  </Reveal>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* CLOSING VISUAL */}
        <section className={styles.closing} aria-label="Contact closing visual">
          <div className={styles.closingMedia}>
            <RevealMedia
              media={{
                src: "/samples/work-raysons.jpg",
                alt: "Ārohana built environment project",
                label: "Ārohana built environment project.",
              }}
              ratio="16 / 9"
              sizes="100vw"
            />
          </div>
          <div className={styles.closingOverlay} />
          <div className="container">
            <div className={styles.closingInner}>
              <Reveal as="p" className={`eyebrow`} style={{ justifyContent: "center", marginBottom: "1.4rem", color: "rgba(248, 247, 244, 0.75)" }}>
                Or reach us directly
              </Reveal>
              <Reveal as="p" className={styles.closingText} delay={80}>
                {site.contact.email}
              </Reveal>
              <Reveal as="p" className={styles.closingText} delay={120} style={{ marginTop: "0.6rem" }}>
                {site.contact.phone}
              </Reveal>
              <Reveal className={styles.closingCta} delay={180}>
                <a href="/" className="btn btn--ghost" style={{ borderColor: "rgba(248, 247, 244, 0.35)", color: "#fdfcf9" }}>
                  Back to home <Arrow />
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
