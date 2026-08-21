"use client";

import { useState, useRef, useEffect } from "react";
import { site } from "@/lib/content";
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
  _honeypot: string;
};

type FormErrors = Partial<Record<keyof Omit<FormData, "_honeypot">, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    requirement: "",
    message: "",
    _honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.requirement.trim()) next.requirement = "Please tell us what you are looking to build, fix or change.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const update = (key: keyof Omit<FormData, "_honeypot">) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setTimeout(() => {
        successRef.current?.focus();
      }, 0);
    } catch {
      setServerError("Something went wrong. Please try again.");
      setStatus("error");
    }
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

              {status === "success" ? (
                <div ref={successRef} tabIndex={-1} className={styles.successBox}>
                  <p className={styles.successTitle}>Thank you. Your enquiry has been received.</p>
                  <p className={styles.successBody}>We&rsquo;ll get back to you shortly.</p>
                  <button
                    type="button"
                    className={`btn btn--ghost ${styles.resetBtn}`}
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", company: "", phone: "", requirement: "", message: "", _honeypot: "" });
                      setErrors({});
                      setServerError("");
                    }}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="_honeypot">Leave this empty</label>
                    <input
                      id="_honeypot"
                      name="_honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form._honeypot}
                      onChange={(e) => setForm((f) => ({ ...f, _honeypot: e.target.value }))}
                    />
                  </div>

                  {serverError && (
                    <div className={styles.formError} role="alert">
                      <p>{serverError}</p>
                      <p className={styles.formErrorAlt}>
                        Or email us directly at{" "}
                        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                      </p>
                    </div>
                  )}

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="name">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      className={`${styles.fieldInput} ${errors.name ? styles.fieldInputError : ""}`}
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={update("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      disabled={status === "loading"}
                    />
                    {errors.name && (
                      <p id="name-error" className={styles.fieldError} role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="email">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      className={`${styles.fieldInput} ${errors.email ? styles.fieldInputError : ""}`}
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      disabled={status === "loading"}
                    />
                    {errors.email && (
                      <p id="email-error" className={styles.fieldError} role="alert">
                        {errors.email}
                      </p>
                    )}
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
                      disabled={status === "loading"}
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
                      disabled={status === "loading"}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="requirement">
                      What are you looking to build, fix or change? <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="requirement"
                      className={`${styles.fieldInput} ${errors.requirement ? styles.fieldInputError : ""}`}
                      type="text"
                      placeholder="Brief description of what you need"
                      value={form.requirement}
                      onChange={update("requirement")}
                      aria-invalid={!!errors.requirement}
                      aria-describedby={errors.requirement ? "requirement-error" : undefined}
                      disabled={status === "loading"}
                    />
                    {errors.requirement && (
                      <p id="requirement-error" className={styles.fieldError} role="alert">
                        {errors.requirement}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="message">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      className={`${styles.fieldInput} ${errors.message ? styles.fieldInputError : ""}`}
                      placeholder="Tell us more about your project, timeline and expectations"
                      value={form.message}
                      onChange={update("message")}
                      rows={5}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      disabled={status === "loading"}
                    />
                    {errors.message && (
                      <p id="message-error" className={styles.fieldError} role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Reveal className={styles.submitRow} delay={100}>
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Sending..." : "Send enquiry"}
                      {status !== "loading" && <Arrow />}
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