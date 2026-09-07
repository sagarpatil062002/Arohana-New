'use client';

import React, { useState, useEffect } from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import { Save, Check, Plus, Trash2, ExternalLink, HelpCircle, Phone, Mail, MapPin, Globe, MessageSquare } from 'lucide-react';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';

export default function AdminContactPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [contactData, setContactData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'header' | 'channels' | 'callCta' | 'faqs'>('header');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.contact) {
      setContactData(JSON.parse(JSON.stringify(content.contact)));
    }
  }, [content.contact]);

  if (!contactData) {
    return <div style={{ padding: '2rem' }}>Loading Contact Information...</div>;
  }

  const handleFieldChange = (field: string, val: any) => {
    const updated = { ...contactData, [field]: val };
    setContactData(updated);
    updateDraftInMemory('contact', updated);
  };

  const handleNestedFieldChange = (parent: string, field: string, val: any) => {
    const updated = {
      ...contactData,
      [parent]: {
        ...(contactData[parent] || {}),
        [field]: val,
      },
    };
    setContactData(updated);
    updateDraftInMemory('contact', updated);
  };

  const handleFaqChange = (index: number, field: 'q' | 'a', val: string) => {
    const nextFaqs = [...(contactData.faqs || [])];
    nextFaqs[index] = { ...nextFaqs[index], [field]: val };
    const updated = { ...contactData, faqs: nextFaqs };
    setContactData(updated);
    updateDraftInMemory('contact', updated);
  };

  const handleAddFaq = () => {
    const nextFaqs = [
      ...(contactData.faqs || []),
      { q: 'New inquiry question?', a: 'Detailed answer regarding our advisory or deployment model.' },
    ];
    const updated = { ...contactData, faqs: nextFaqs };
    setContactData(updated);
    updateDraftInMemory('contact', updated);
  };

  const handleRemoveFaq = (index: number) => {
    const nextFaqs = contactData.faqs.filter((_: any, i: number) => i !== index);
    const updated = { ...contactData, faqs: nextFaqs };
    setContactData(updated);
    updateDraftInMemory('contact', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('contact', contactData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  const tabs = [
    { id: 'header', label: '01: Header & Intro' },
    { id: 'channels', label: '02: Direct Channels & Office' },
    { id: 'callCta', label: '03: Discovery Call CTA' },
    { id: 'faqs', label: '04: FAQs Directory' },
  ];

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          backgroundColor: '#FFFFFF',
          padding: '1.25rem 1.75rem',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 650, margin: 0, color: '#111' }}>
              Contact & Inquiries CMS
            </h1>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: '#f4f4f5',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                color: '#71717a',
              }}
            >
              /contact
            </span>
          </div>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.82rem', color: '#71717a' }}>
            Live preview enabled. Re-edit all contact cards, direct channels, and founder FAQs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(0,0,0,0.12)',
              backgroundColor: '#FFFFFF',
              color: '#333',
              fontSize: '0.8rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={14} /> Open Live Page
          </a>

          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1.4rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: savedStatus ? '#16A34A' : '#DE322D',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {savedStatus ? <Check size={15} /> : <Save size={15} />}
            {savedStatus ? 'Saved Successfully' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          paddingBottom: '0.75rem',
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '0.55rem 1.1rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: activeTab === tab.id ? 650 : 500,
              fontFamily: 'var(--font-mono, monospace)',
              backgroundColor: activeTab === tab.id ? '#111113' : 'transparent',
              color: activeTab === tab.id ? '#FFFFFF' : '#71717A',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Split Layout: Editor & Live Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(500px, 1.15fr) 1fr',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        {/* Left Form Panel */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '1.75rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          }}
        >
          {/* TAB 1: HEADER & INTRO */}
          {activeTab === 'header' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111' }}>
                  Header &amp; Page Introduction
                </h2>
                <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
                  The main eyebrow tag, headline, and core narrative premise.
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  MONO TAG (EYEBROW)
                </label>
                <input
                  type="text"
                  value={contactData.tag || ''}
                  onChange={(e) => handleFieldChange('tag', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  MAIN HEADING
                </label>
                <input
                  type="text"
                  value={contactData.heading || ''}
                  onChange={(e) => handleFieldChange('heading', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SUBHEADING / LEAD COPY
                </label>
                <textarea
                  rows={3}
                  value={contactData.subheading || ''}
                  onChange={(e) => handleFieldChange('subheading', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB 2: CHANNELS & OFFICE */}
          {activeTab === 'channels' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111' }}>
                  Direct Channels, Office &amp; Socials
                </h2>
                <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
                  Official direct emails, phones, geographic hubs, and profile URLs.
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    DIRECT EMAIL
                  </label>
                  <input
                    type="email"
                    value={contactData.email || ''}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    DIRECT PHONE / WHATSAPP
                  </label>
                  <input
                    type="text"
                    value={contactData.phone || ''}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  GEOGRAPHIC HUBS (LOCATIONS)
                </label>
                <input
                  type="text"
                  value={contactData.locations || ''}
                  onChange={(e) => handleFieldChange('locations', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div style={{ borderTop: '1px solid #E4E4E7', paddingTop: '1.25rem' }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 600, margin: '0 0 0.85rem 0', color: '#111' }}>
                  Office Registered Entity
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      ENTITY NAME
                    </label>
                    <input
                      type="text"
                      value={contactData.office?.name || ''}
                      onChange={(e) => handleNestedFieldChange('office', 'name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      FULL ADDRESS
                    </label>
                    <textarea
                      rows={2}
                      value={contactData.office?.address || ''}
                      onChange={(e) => handleNestedFieldChange('office', 'address', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E4E4E7', paddingTop: '1.25rem' }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 600, margin: '0 0 0.85rem 0', color: '#111' }}>
                  Social Handles &amp; Profiles
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      LINKEDIN URL
                    </label>
                    <input
                      type="url"
                      value={contactData.socials?.linkedin || ''}
                      onChange={(e) => handleNestedFieldChange('socials', 'linkedin', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      INSTAGRAM URL
                    </label>
                    <input
                      type="url"
                      value={contactData.socials?.instagram || ''}
                      onChange={(e) => handleNestedFieldChange('socials', 'instagram', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      BEHANCE URL
                    </label>
                    <input
                      type="url"
                      value={contactData.socials?.behance || ''}
                      onChange={(e) => handleNestedFieldChange('socials', 'behance', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISCOVERY CALL CTA */}
          {activeTab === 'callCta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111' }}>
                  Discovery Call Banner
                </h2>
                <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
                  Dark callout card for instant founder telephone &amp; consultation bookings.
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BADGE TAG
                </label>
                <input
                  type="text"
                  value={contactData.callCta?.tag || 'DISCOVERY CALL'}
                  onChange={(e) => handleNestedFieldChange('callCta', 'tag', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  CTA TITLE
                </label>
                <input
                  type="text"
                  value={contactData.callCta?.title || ''}
                  onChange={(e) => handleNestedFieldChange('callCta', 'title', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={contactData.callCta?.description || ''}
                  onChange={(e) => handleNestedFieldChange('callCta', 'description', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BUTTON LABEL
                  </label>
                  <input
                    type="text"
                    value={contactData.callCta?.buttonText || 'Book a call'}
                    onChange={(e) => handleNestedFieldChange('callCta', 'buttonText', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    PHONE TARGET
                  </label>
                  <input
                    type="text"
                    value={contactData.callCta?.buttonPhone || contactData.phone || ''}
                    onChange={(e) => handleNestedFieldChange('callCta', 'buttonPhone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQS DIRECTORY */}
          {activeTab === 'faqs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111' }}>
                    Frequently Asked Questions
                  </h2>
                  <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
                    Founder FAQs addressing client engagement, deployment and security.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddFaq}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.12)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={14} /> Add FAQ
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(contactData.faqs || []).map((faq: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      border: '1px solid #E4E4E7',
                      backgroundColor: '#FAFAFA',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#DE322D' }}>
                        QUESTION 0{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '0.2rem',
                        }}
                        title="Delete Question"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                        QUESTION TITLE
                      </label>
                      <input
                        type="text"
                        value={faq.q || ''}
                        onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(0, 0, 0, 0.12)',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                        ANSWER ACCORDION / EXPLANATION
                      </label>
                      <textarea
                        rows={3}
                        value={faq.a || ''}
                        onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(0, 0, 0, 0.12)',
                          fontSize: '0.82rem',
                          fontFamily: 'inherit',
                          lineHeight: 1.5,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Live Preview Panel */}
        <div style={{ position: 'sticky', top: '1.5rem', height: 'calc(100vh - 7rem)' }}>
          <LivePreviewPanel previewUrl="/contact" title="Live Contact Preview" />
        </div>
      </div>
    </div>
  );
}
