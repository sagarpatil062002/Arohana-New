'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Mail, Phone, MapPin, CheckCircle2, Shield } from 'lucide-react';
import gsap from 'gsap';

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    serviceInterest: 'Digital Brand Growth',
    message: '',
  });

  const faqs = [
    {
      q: 'How does Ārohana initiate a new client engagement?',
      a: 'We start with a diagnostic discussion directly with the founder to understand your core commercial challenge, current bottlenecks, and specific objectives. If there is mutual alignment, we propose a clear scope — whether a monthly retainer, a consulting sprint, or a project production brief.',
    },
    {
      q: 'Do you work with businesses outside Goa and Maharashtra?',
      a: 'Yes. Ārohana works with clients across India (Delhi, Bangalore, Ladakh, Mumbai, Goa, Kolhapur) and select international markets. For production and on-ground hospitality consulting, our team deploys on-site anywhere in India.',
    },
    {
      q: 'What is the typical turnaround for project proposals?',
      a: 'Following our initial discovery conversation, tailored proposals and scope documents are typically delivered within 48 to 72 business hours.',
    },
    {
      q: 'How do you handle confidential defence or corporate briefs?',
      a: 'We operate under strict confidentiality and standard non-disclosure protocols. We have extensive experience delivering sensitive defence communication and high-security projects.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.contact-card-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power2.out', delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      ref={containerRef}
      className="section-light"
      style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)', overflow: 'hidden' }}
    >
      <div className="padding-global container-large">
        {/* Back Link */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: '#666',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} /> BACK TO HOME
          </Link>
        </div>

        {/* Header */}
        <div style={{ maxWidth: '1020px', marginBottom: 'clamp(2.5rem, 5vw, 5rem)' }}>
          <div
            className="contact-header-anim tag-mono"
            style={{
              color: '#ff3b30',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ff3b30',
                boxShadow: '0 0 8px #ff3b30',
              }}
            />
            DIRECT ENGAGEMENT
          </div>

          <h1
            className="contact-header-anim"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.2rem)',
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: '-0.04em',
              color: '#111111',
              marginBottom: '1.5rem',
            }}
          >
            Let's start a conversation.
          </h1>

          <p
            className="contact-header-anim"
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#555555',
              lineHeight: 1.5,
              maxWidth: '780px',
            }}
          >
            Every conversation starts with understanding your business, your commercial reality, and what actually needs to be created, fixed, or scaled.
          </p>
        </div>

        {/* 2-Column Grid: Direct Info + Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
          }}
        >
          {/* Left: Contact Channels */}
          <div className="contact-card-anim">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div
                style={{
                  padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  borderRadius: 'clamp(18px, 3vw, 24px)',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(222, 50, 45, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                }}
              >
                <div className="tag-mono" style={{ color: '#888', marginBottom: '1.25rem', fontWeight: 600 }}>
                  DIRECT CHANNELS
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <Mail size={16} color="#DE322D" /> Direct Email
                    </div>
                    <a
                      href="mailto:founder@byarohana.com"
                      style={{
                        fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                        fontWeight: 600,
                        color: '#111',
                        textDecoration: 'none',
                        wordBreak: 'break-word',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#DE322D')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#111')}
                    >
                      founder@byarohana.com
                    </a>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <Phone size={16} color="#DE322D" /> Direct Phone / WhatsApp
                    </div>
                    <a
                      href="tel:+918380092241"
                      style={{
                        fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                        fontWeight: 600,
                        color: '#111',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#DE322D')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#111')}
                    >
                      +91 83800 92241
                    </a>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <MapPin size={16} color="#DE322D" /> Locations
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#222', fontWeight: 500 }}>
                      Goa · Kolhapur · Delhi · Ladakh
                    </div>
                  </div>

                  <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <div style={{ color: '#888', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem', fontWeight: 600 }}>
                      SOCIAL LINKS
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.9rem',
                          color: '#111',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: 500,
                        }}
                      >
                        LinkedIn <ArrowUpRight size={13} />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.9rem',
                          color: '#111',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: 500,
                        }}
                      >
                        Instagram <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative CTA */}
              <div
                style={{
                  padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  borderRadius: 'clamp(18px, 3vw, 24px)',
                  backgroundColor: '#0c0c0e',
                  color: '#ffffff',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '180px',
                    height: '180px',
                    backgroundColor: 'rgba(222, 50, 45, 0.12)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Shield size={14} />
                    DISCOVERY CALL
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                    Prefer to start with a call?
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Book a 15-minute discovery call to discuss your business challenge.
                  </p>
                  <a
                    href="tel:+918380092241"
                    className="button-editorial"
                    style={{
                      height: '44px',
                      padding: '0 1.5rem',
                      backgroundColor: '#ffffff',
                      color: '#111111',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Book a call</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sequential Inquiry Form */}
          <div
            className="contact-card-anim"
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 3.5rem)',
              borderRadius: 'clamp(20px, 3vw, 28px)',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#e8f7ec',
                    color: '#28cd41',
                    marginBottom: '1.5rem',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 500, marginBottom: '1rem' }}>
                  Message Sent.
                </h3>
                <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 2rem auto' }}>
                  Thank you for reaching out. We will review your project and get in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="button-editorial"
                  style={{ height: '46px', padding: '0 1.5rem' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#666',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: '0 1.25rem',
                      fontSize: '1rem',
                      backgroundColor: '#fafafa',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#666',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    COMPANY *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Company / Brand"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: '0 1.25rem',
                      fontSize: '1rem',
                      backgroundColor: '#fafafa',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#666',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: '0 1.25rem',
                      fontSize: '1rem',
                      backgroundColor: '#fafafa',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#666',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    PHONE
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: '0 1.25rem',
                      fontSize: '1rem',
                      backgroundColor: '#fafafa',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#666',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    WHAT ARE YOU LOOKING FOR?
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    style={{
                      width: '100%',
                      height: '50px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: '0 1.25rem',
                      fontSize: '1rem',
                      backgroundColor: '#fafafa',
                      outline: 'none',
                    }}
                  >
                    <option value="Digital Brand Growth">Digital Brand Growth</option>
                    <option value="Hospitality Consulting">Hospitality Consulting</option>
                    <option value="Content & Brand Production">Content & Brand Production</option>
                    <option value="Tourin Ladakh Experiences">Tourin Ladakh Experiences</option>
                    <option value="Ongoing Partnership">Ongoing Digital Partnership</option>
                    <option value="Other">Other / Multi-disciplinary Brief</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#666',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    TELL US ABOUT YOUR PROJECT OR CHALLENGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you are trying to build, fix or change..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: '1rem 1.25rem',
                      fontSize: '1rem',
                      backgroundColor: '#fafafa',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="button-editorial button-editorial-dark"
                  style={{ height: '52px', padding: '0 2rem', width: '100%', justifyContent: 'center' }}
                >
                  <div className="button-texts-slider">
                    <span className="button-text-item">Send message</span>
                    <span className="button-text-item">Send message</span>
                  </div>
                  <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div style={{ marginTop: 'clamp(5rem, 9vw, 8rem)' }}>
          <div style={{ maxWidth: '800px', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <div
              className="tag-mono"
              style={{
                color: '#DE322D',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#DE322D' }} />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#111',
                margin: '0 0 0.75rem 0',
              }}
            >
              Everything you need to know about working with Ārohana.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '1.5rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  borderRadius: '20px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#DE322D', fontWeight: 600 }}>
                    0{idx + 1}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#111', margin: 0 }}>
                    {faq.q}
                  </h3>
                </div>
                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
