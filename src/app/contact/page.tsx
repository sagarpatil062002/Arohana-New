'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    serviceInterest: 'Digital Brand Growth',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-light" style={{ paddingTop: '3rem', paddingBottom: '8rem' }}>
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
        <div style={{ maxWidth: '1020px', marginBottom: '5rem' }}>
          <div
            className="tag-mono"
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
              }}
            />
            DIRECT ENGAGEMENT
          </div>

          <h1
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.2rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              color: '#111111',
              marginBottom: '1.5rem',
            }}
          >
            Start a conversation.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#555555',
              lineHeight: 1.5,
              maxWidth: '780px',
            }}
          >
            Don't start with a service. Start with the problem. Tell us what you are trying to build,
            fix or change. We review every brief personally within 24 hours.
          </p>
        </div>

        {/* 2-Column Grid: Direct Info + Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(3rem, 6vw, 6rem)',
          }}
        >
          {/* Left: Contact Channels */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div
                style={{
                  padding: '2.5rem',
                  borderRadius: '24px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="tag-mono" style={{ color: '#888', marginBottom: '1.25rem' }}>
                  DIRECT CHANNELS
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <Mail size={16} /> Direct Email
                    </div>
                    <a
                      href="mailto:founder@byarohana.com"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        color: '#111',
                        textDecoration: 'none',
                      }}
                    >
                      founder@byarohana.com
                    </a>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <Phone size={16} /> Direct Phone / WhatsApp
                    </div>
                    <a
                      href="tel:+918380092241"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        color: '#111',
                        textDecoration: 'none',
                      }}
                    >
                      +91 8380092241
                    </a>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <MapPin size={16} /> Locations & Base
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#222', fontWeight: 500 }}>
                      Pune • Ladakh • Pan-India Engagements
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Standards Note */}
              <div
                style={{
                  padding: '2.5rem',
                  borderRadius: '24px',
                  backgroundColor: '#0c0c0e',
                  color: '#ffffff',
                }}
              >
                <div className="tag-mono" style={{ color: '#ff3b30', marginBottom: '1rem' }}>
                  CONVERSATION ETHICS
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: '1rem' }}>
                  What happens next?
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  You will speak directly with Madhura, not an account executive or sales rep. We
                  assess feasibility, commercial context and scope before proposing a working
                  structure.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Sequential Inquiry Form */}
          <div
            style={{
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              borderRadius: '28px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
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
                  Inquiry Received.
                </h3>
                <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 2rem auto' }}>
                  Thank you for sharing your context. We will review your inquiry and reach out within
                  24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="button-editorial"
                  style={{ height: '46px', padding: '0 1.5rem' }}
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#666',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      height: '52px',
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
                    }}
                  >
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vikram@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      height: '52px',
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
                    }}
                  >
                    COMPANY / ORGANISATION
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Heritage Group or New Venture"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    style={{
                      width: '100%',
                      height: '52px',
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
                    }}
                  >
                    AREA OF INTEREST
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    style={{
                      width: '100%',
                      height: '52px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      padding: '0 1.25rem',
                      fontSize: '1rem',
                      backgroundColor: '#fafafa',
                      outline: 'none',
                    }}
                  >
                    <option value="Digital Brand Growth">Digital Brand Growth & Systems</option>
                    <option value="Hospitality Consulting">Hospitality & F&B Consulting</option>
                    <option value="Content & Brand Production">Content & Brand Production</option>
                    <option value="Tourin Ladakh Travel">Tourin Ladakh Experiential Travel</option>
                    <option value="Special Brief">Special Brief / Multiple Areas</option>
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
                    }}
                  >
                    TELL US WHAT YOU ARE TRYING TO BUILD, FIX OR CHANGE *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide as much context as possible about your challenge, stage, and goals..."
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
                    <span className="button-text-item">Send Inquiry</span>
                    <span className="button-text-item">Send Inquiry</span>
                  </div>
                  <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
