'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Save, Check, Upload } from 'lucide-react';

export default function AdminServicesPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [servicesData, setServicesData] = useState<any>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>('digital-marketing');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.services) {
      setServicesData(JSON.parse(JSON.stringify(content.services)));
    }
  }, [content.services]);

  if (!servicesData) {
    return <div style={{ padding: '2rem' }}>Loading Practice Areas...</div>;
  }

  const selectedService =
    servicesData.services?.find((s: any) => s.id === selectedServiceId) || servicesData.services?.[0];

  const handleServiceChange = (field: string, val: any) => {
    if (!selectedService) return;
    const updatedList = servicesData.services.map((s: any) =>
      s.id === selectedService.id ? { ...s, [field]: val } : s
    );
    const updated = { ...servicesData, services: updatedList };
    setServicesData(updated);
    updateDraftInMemory('services', updated);
  };

  const handleTogglePublished = (id: string) => {
    const updatedList = servicesData.services.map((s: any) =>
      s.id === id ? { ...s, published: !s.published } : s
    );
    const updated = { ...servicesData, services: updatedList };
    setServicesData(updated);
    updateDraftInMemory('services', updated);
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= servicesData.services.length) return;
    const newList = [...servicesData.services];
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;
    const updated = { ...servicesData, services: newList };
    setServicesData(updated);
    updateDraftInMemory('services', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('services', servicesData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* ─── LEFT COLUMN: SERVICES LIST & EDITOR ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.15rem 1.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111113' }}>
              Practice Areas &amp; Capabilities
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Manage consulting scopes, deliverables &amp; images.
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.15rem',
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

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 1fr', overflow: 'hidden' }}>
          {/* Services Mini-List */}
          <div
            style={{
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
              overflowY: 'auto',
              padding: '0.75rem',
              backgroundColor: '#FAFAFA',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            {servicesData.services.map((s: any, idx: number) => {
              const isSelected = s.id === selectedService?.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedServiceId(s.id)}
                  style={{
                    padding: '0.65rem',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                    border: isSelected ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.7rem', color: '#DE322D', fontWeight: 700 }}>
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 650,
                        color: '#111113',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {s.shortTitle || s.title}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveService(idx, 'up');
                      }}
                      style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                    >
                      <ChevronUp size={12} color={idx === 0 ? '#D4D4D8' : '#71717A'} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === servicesData.services.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveService(idx, 'down');
                      }}
                      style={{ border: 'none', background: 'transparent', cursor: idx === servicesData.services.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                    >
                      <ChevronDown size={12} color={idx === servicesData.services.length - 1 ? '#D4D4D8' : '#71717A'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Editor */}
          {selectedService && (
            <div style={{ overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.1em' }}>
                  PRACTICE AREA: {selectedService.num}
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePublished(selectedService.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    backgroundColor: selectedService.published ? '#DCFCE7' : '#F4F4F5',
                    color: selectedService.published ? '#16A34A' : '#71717A',
                    cursor: 'pointer',
                  }}
                >
                  {selectedService.published ? <Eye size={12} /> : <EyeOff size={12} />}
                  {selectedService.published ? 'Visible' : 'Hidden'}
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  FULL TITLE
                </label>
                <input
                  type="text"
                  value={selectedService.title || ''}
                  onChange={(e) => handleServiceChange('title', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  TAGLINE / SPECS
                </label>
                <input
                  type="text"
                  value={selectedService.tagline || ''}
                  onChange={(e) => handleServiceChange('tagline', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={selectedService.description || ''}
                  onChange={(e) => handleServiceChange('description', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BEST FOR (TARGET BUSINESSES)
                </label>
                <input
                  type="text"
                  value={selectedService.bestFor || ''}
                  onChange={(e) => handleServiceChange('bestFor', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Service Visual */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  SERVICE IMAGE / VISUAL
                </label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '60px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#F4F4F5',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      flexShrink: 0,
                    }}
                  >
                    {selectedService.image ? (
                      <Image src={selectedService.image} alt={selectedService.title} fill style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A1A1AA' }}>
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsMediaPickerOpen(true)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Upload size={13} />
                      Replace / Upload Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── RIGHT COLUMN: REAL-TIME LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/services" />
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaType="image"
        onSelect={(url) => {
          handleServiceChange('image', url);
          setIsMediaPickerOpen(false);
        }}
      />
    </div>
  );
}
