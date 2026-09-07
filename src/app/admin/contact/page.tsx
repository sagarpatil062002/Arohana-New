'use client';

import React, { useState, useEffect } from 'react';
import { useCmsContent } from '@/lib/cms/content-context';
import { Save, Check, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function AdminContactPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [contactData, setContactData] = useState<any>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.contact) {
      setContactData(JSON.parse(JSON.stringify(content.contact)));
    }
  }, [content.contact]);

  if (!contactData) {
    return <div style={{ padding: '2rem' }}>Loading Contact Information...</div>;
  }

  const handleChange = (field: string, val: any) => {
    const updated = { ...contactData, [field]: val };
    setContactData(updated);
    updateDraftInMemory('contact', updated);
  };

  const handleOfficeChange = (field: string, val: any) => {
    const updated = {
      ...contactData,
      office: { ...contactData.office, [field]: val },
    };
    setContactData(updated);
    updateDraftInMemory('contact', updated);
  };

  const handleSocialChange = (network: string, val: any) => {
    const updated = {
      ...contactData,
      socials: { ...contactData.socials, [network]: val },
    };
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

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '1.75rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 650, margin: 0, color: '#111113' }}>
              Contact &amp; Inquiry Details
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
              Official contact emails, phone numbers &amp; office address.
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: savedStatus ? '#16A34A' : '#111113',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {savedStatus ? <Check size={14} /> : <Save size={14} />}
            {savedStatus ? 'Saved' : 'Save Draft'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
              CONTACT HEADING
            </label>
            <input
              type="text"
              value={contactData.heading || ''}
              onChange={(e) => handleChange('heading', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                fontSize: '0.85rem',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PRIMARY INQUIRY EMAIL
              </label>
              <input
                type="email"
                value={contactData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
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
                DIRECT PHONE NUMBER
              </label>
              <input
                type="text"
                value={contactData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
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
              OFFICE ADDRESS
            </label>
            <textarea
              rows={3}
              value={contactData.office?.address || ''}
              onChange={(e) => handleOfficeChange('address', e.target.value)}
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
                INSTAGRAM PROFILE URL
              </label>
              <input
                type="text"
                value={contactData.socials?.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
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
                LINKEDIN PROFILE URL
              </label>
              <input
                type="text"
                value={contactData.socials?.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
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
    </div>
  );
}
