'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Trash2, ChevronUp, ChevronDown, Save, Check, Upload, ExternalLink, FileText } from 'lucide-react';

export default function AdminPartnersPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [partnerData, setPartnerData] = useState<any>(null);
  const [activePartnerIdForUpload, setActivePartnerIdForUpload] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.partners) {
      setPartnerData(JSON.parse(JSON.stringify(content.partners)));
    }
  }, [content.partners]);

  if (!partnerData) {
    return <div style={{ padding: '2rem' }}>Loading Partners &amp; Logos...</div>;
  }

  const handlePartnerChange = (id: string, field: string, val: any) => {
    const updatedPartners = partnerData.partners.map((p: any) =>
      p.id === id ? { ...p, [field]: val } : p
    );
    const updated = { ...partnerData, partners: updatedPartners };
    setPartnerData(updated);
    updateDraftInMemory('partners', updated);
  };

  const movePartner = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= partnerData.partners.length) return;
    const newList = [...partnerData.partners];
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;
    const updated = { ...partnerData, partners: newList };
    setPartnerData(updated);
    updateDraftInMemory('partners', updated);
  };

  const handleAddPartner = () => {
    const newId = `p-${Date.now()}`;
    const newPartner = {
      id: newId,
      name: 'New Client Partner',
      category: 'Hospitality & Dining',
      url: '/contact',
      logo: '/images/partners/raysons.svg',
    };
    const updated = {
      ...partnerData,
      partners: [...partnerData.partners, newPartner],
    };
    setPartnerData(updated);
    updateDraftInMemory('partners', updated);
  };

  const handleDeletePartner = () => {
    if (!deleteTargetId) return;
    const updatedPartners = partnerData.partners.filter((p: any) => p.id !== deleteTargetId);
    const updated = { ...partnerData, partners: updatedPartners };
    setPartnerData(updated);
    setDeleteTargetId(null);
    updateDraftInMemory('partners', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('partners', partnerData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
              Partner &amp; Client Brand Logos
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#71717A' }}>
              Manage logo marquee brands, destination links &amp; display order.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              type="button"
              onClick={handleAddPartner}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                backgroundColor: '#FFFFFF',
                color: '#111113',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Plus size={14} />
              Add Logo
            </button>
            {/* Amber pill: Save Draft */}
            <button
              type="button"
              onClick={handleSave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid #D97706',
                backgroundColor: savedStatus ? '#F0FDF4' : '#FEF3C7',
                color: savedStatus ? '#16A34A' : '#92400E',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease',
              }}
            >
              {savedStatus ? <Check size={13} /> : <FileText size={13} />}
              <span>{savedStatus ? 'Draft Saved' : 'Save Draft'}</span>
            </button>
          </div>
        </div>

        {/* Partners Table / Card List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {partnerData.partners.map((partner: any, idx: number) => (
            <div
              key={partner.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                backgroundColor: '#F8F8FA',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                gap: '1.25rem',
              }}
            >
              {/* Reorder and index */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => movePartner(idx, 'up')}
                    style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                  >
                    <ChevronUp size={14} color={idx === 0 ? '#D4D4D8' : '#71717A'} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === partnerData.partners.length - 1}
                    onClick={() => movePartner(idx, 'down')}
                    style={{ border: 'none', background: 'transparent', cursor: idx === partnerData.partners.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                  >
                    <ChevronDown size={14} color={idx === partnerData.partners.length - 1 ? '#D4D4D8' : '#71717A'} />
                  </button>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DE322D', width: '20px' }}>
                  {idx + 1}
                </span>
              </div>

              {/* Logo Preview */}
              <div
                style={{
                  width: '64px',
                  height: '42px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                {partner.logo ? (
                  <Image src={partner.logo} alt={partner.name} fill style={{ objectFit: 'contain', padding: '4px' }} />
                ) : (
                  <span style={{ fontSize: '0.65rem', color: '#A1A1AA' }}>No Logo</span>
                )}
              </div>

              {/* Editable Fields */}
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: '#71717A', marginBottom: '0.2rem' }}>
                    BRAND NAME
                  </label>
                  <input
                    type="text"
                    value={partner.name || ''}
                    onChange={(e) => handlePartnerChange(partner.id, 'name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.82rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: '#71717A', marginBottom: '0.2rem' }}>
                    DESTINATION LINK
                  </label>
                  <input
                    type="text"
                    value={partner.url || ''}
                    onChange={(e) => handlePartnerChange(partner.id, 'url', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.82rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: '#71717A', marginBottom: '0.2rem' }}>
                    LOGO URL
                  </label>
                  <input
                    type="text"
                    value={partner.logo || ''}
                    placeholder="/images/partners/... or https://..."
                    onChange={(e) => handlePartnerChange(partner.id, 'logo', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.82rem',
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setActivePartnerIdForUpload(partner.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#FFFFFF',
                    color: '#111113',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Upload size={12} />
                  Upload / Pick
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(partner.id)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#EF4444',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={!!activePartnerIdForUpload}
        onClose={() => setActivePartnerIdForUpload(null)}
        mediaType="image"
        initialUrl={partnerData.find((p: any) => p.id === activePartnerIdForUpload)?.logo || ''}
        onSelect={(url) => {
          if (activePartnerIdForUpload) {
            handlePartnerChange(activePartnerIdForUpload, 'logo', url);
          }
          setActivePartnerIdForUpload(null);
        }}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Remove Partner Logo?"
        message="This brand will be removed from the homepage marquee."
        confirmLabel="Remove"
        onConfirm={handleDeletePartner}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
