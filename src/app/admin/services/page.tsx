'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Save, Check, Upload, Sparkles, Layers, Send } from 'lucide-react';

export default function AdminServicesPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [servicesData, setServicesData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'cta'>('services');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>('digital-marketing');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.services) {
      setServicesData(JSON.parse(JSON.stringify(content.services)));
    }
  }, [content.services]);

  if (!servicesData) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#71717A' }}>Loading Practice Areas...</div>;
  }

  const selectedService =
    servicesData.services?.find((s: any) => s.id === selectedServiceId) || servicesData.services?.[0];

  const updateField = (path: string[], val: any) => {
    const updated = JSON.parse(JSON.stringify(servicesData));
    let current = updated;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    current[path[path.length - 1]] = val;
    setServicesData(updated);
    updateDraftInMemory('services', updated);
  };

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
        {/* Top Header */}
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
              Practice Areas &amp; Capabilities Editor
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Strategic overview, consulting scopes, deliverables &amp; images.
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

        {/* Section Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.65rem 1.25rem', borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#FFFFFF' }}>
          {[
            { id: 'overview', label: '01: Hero & Strategic Overview', icon: Sparkles },
            { id: 'services', label: `02: Practice Areas (${servicesData.services?.length || 0})`, icon: Layers },
            { id: 'cta', label: '03: Engagement & CTA', icon: Send },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #111113' : '1px solid rgba(0,0,0,0.08)',
                  backgroundColor: isActive ? '#111113' : '#F8F8FA',
                  color: isActive ? '#FFFFFF' : '#52525B',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                }}
              >
                <Icon size={13} color={isActive ? '#FFFFFF' : '#71717A'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── TAB 1: HERO & STRATEGIC OVERVIEW ─── */}
        {activeTab === 'overview' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PAGE EYEBROW
              </label>
              <input
                type="text"
                value={servicesData.eyebrow || ''}
                onChange={(e) => updateField(['eyebrow'], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                MAIN HEADLINE
              </label>
              <textarea
                rows={2}
                value={servicesData.headline || ''}
                onChange={(e) => updateField(['headline'], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                SECTION SUB-LABEL
              </label>
              <input
                type="text"
                value={servicesData.sectionLabel || ''}
                onChange={(e) => updateField(['sectionLabel'], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                EXECUTIVE SUMMARY / DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={servicesData.description || ''}
                onChange={(e) => updateField(['description'], e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* ─── TAB 2: THREE PRACTICE AREAS ─── */}
        {activeTab === 'services' && (
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
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#111113' : 'transparent',
                      color: isSelected ? '#FFFFFF' : '#111113',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: isSelected ? 600 : 500 }}>
                        {s.shortTitle || s.title}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: isSelected ? '#A1A1AA' : '#71717A' }}>
                        Scope {s.num}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePublished(s.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: s.published ? '#16A34A' : '#A1A1AA',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                    >
                      {s.published ? <Eye size={13} /> : <EyeOff size={13} />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Service Form */}
            {selectedService ? (
              <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                    FULL PRACTICE TITLE
                  </label>
                  <input
                    type="text"
                    value={selectedService.title || ''}
                    onChange={(e) => handleServiceChange('title', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                      SHORT TITLE (Tabs &amp; Badges)
                    </label>
                    <input
                      type="text"
                      value={selectedService.shortTitle || ''}
                      onChange={(e) => handleServiceChange('shortTitle', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                      NUMERICAL ORDER
                    </label>
                    <input
                      type="text"
                      value={selectedService.num || ''}
                      onChange={(e) => handleServiceChange('num', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                    SCOPE TAGLINE
                  </label>
                  <input
                    type="text"
                    value={selectedService.tagline || ''}
                    onChange={(e) => handleServiceChange('tagline', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                    PRACTICE DESCRIPTION
                  </label>
                  <textarea
                    rows={3}
                    value={selectedService.description || ''}
                    onChange={(e) => handleServiceChange('description', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                    BEST FOR / CLIENT FIT
                  </label>
                  <input
                    type="text"
                    value={selectedService.bestFor || ''}
                    onChange={(e) => handleServiceChange('bestFor', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                    COVER IMAGE
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={selectedService.image || ''}
                      onChange={(e) => handleServiceChange('image', e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerTarget('service.image')}
                      style={{
                        padding: '0.5rem 0.85rem',
                        borderRadius: '8px',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Pick Image
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                    KEY CAPABILITIES (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={(selectedService.capabilities || []).join('\n')}
                    onChange={(e) =>
                      handleServiceChange(
                        'capabilities',
                        e.target.value.split('\n').filter((l) => l.trim().length > 0)
                      )
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ─── TAB 3: ENGAGEMENT & CTA ─── */}
        {activeTab === 'cta' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                CLOSING CTA HEADLINE
              </label>
              <input
                type="text"
                value={servicesData.cta?.heading || "Don't start with a service. Start with the problem."}
                onChange={(e) => updateField(['cta', 'heading'], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                CLOSING CTA SUBTITLE
              </label>
              <textarea
                rows={2}
                value={servicesData.cta?.subheading || "Tell us what your business needs to achieve. We'll tell you how we'd approach it."}
                onChange={(e) => updateField(['cta', 'subheading'], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BUTTON LABEL
                </label>
                <input
                  type="text"
                  value={servicesData.cta?.buttonText || 'Start a Conversation'}
                  onChange={(e) => updateField(['cta', 'buttonText'], e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BUTTON LINK
                </label>
                <input
                  type="text"
                  value={servicesData.cta?.buttonLink || '/contact'}
                  onChange={(e) => updateField(['cta', 'buttonLink'], e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── RIGHT COLUMN: LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/services" />
      </div>

      {/* Media Picker Modal */}
      {mediaPickerTarget && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setMediaPickerTarget(null)}
          mediaType="image"
          onSelect={(url) => {
            handleServiceChange('image', url);
            setMediaPickerTarget(null);
          }}
        />
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  fontSize: '0.84rem',
  outline: 'none',
  fontFamily: 'inherit',
};
