'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Save,
  Check,
  Upload,
  Sparkles,
  Layers,
  Send,
  Users,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

export default function AdminServicesPage() {
  const { content, saveDraft, updateDraftInMemory, publishAll } = useCmsContent();
  const [servicesData, setServicesData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'team' | 'cta'>('services');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>('digital-marketing');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  // Floating Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveServicesTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage({ text, type });
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3500);
  };

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

    // Instant zero-refresh broadcast to all preview iframes
    if (typeof window !== 'undefined') {
      const msg = { type: 'CMS_UPDATE', section: 'services', data: updated };
      window.postMessage(msg, '*');
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((ifr) => {
        try {
          ifr.contentWindow?.postMessage(msg, '*');
        } catch (e) {}
      });
    }

    if (autoSaveServicesTimerRef.current) clearTimeout(autoSaveServicesTimerRef.current);
    autoSaveServicesTimerRef.current = setTimeout(() => {
      saveDraft('services', updated);
    }, 600);
  };

  const handleToggleServiceEnabled = (id: string) => {
    const target = servicesData.services.find((s: any) => s.id === id);
    const newEnabled = target ? target.enabled === false : false;
    const updatedList = servicesData.services.map((s: any) =>
      s.id === id ? { ...s, enabled: newEnabled } : s
    );
    const updated = { ...servicesData, services: updatedList };
    setServicesData(updated);
    updateDraftInMemory('services', updated);
    showToast(`Practice area ${newEnabled ? 'enabled' : 'disabled'}`, 'info');
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

  const handleAddService = () => {
    const newId = `service-${Date.now()}`;
    const nextNum = String((servicesData.services?.length || 0) + 1).padStart(2, '0');
    const newService = {
      id: newId,
      num: nextNum,
      title: 'New Practice Area',
      shortTitle: 'Practice Area',
      tagline: 'Strategic advisory, operational systems & brand execution.',
      description: 'Comprehensive scope description detailing strategic impact and business outcomes.',
      bestFor: 'Growth-stage businesses, enterprise teams, and multi-location operations.',
      image: '/images/services/services-hero-collage.png',
      capabilities: [
        'Strategic Planning & Audits',
        'Operational Architecture',
        'End-to-End Creative Direction',
        'Continuous Reporting & Impact Review',
      ],
      published: true,
      enabled: true,
      showTitle: true,
      showShortTitle: true,
      showNum: true,
      showTagline: true,
      showDescription: true,
      showBestFor: true,
      showImage: true,
      showCapabilities: true,
    };
    const updated = {
      ...servicesData,
      services: [...(servicesData.services || []), newService],
    };
    setServicesData(updated);
    setSelectedServiceId(newId);
    updateDraftInMemory('services', updated);
    showToast('New practice area added!', 'success');
  };

  const handleDeleteService = (id: string) => {
    const updatedList = (servicesData.services || []).filter((s: any) => s.id !== id);
    const updated = { ...servicesData, services: updatedList };
    setServicesData(updated);
    if (selectedServiceId === id && updatedList.length > 0) {
      setSelectedServiceId(updatedList[0].id);
    }
    updateDraftInMemory('services', updated);
    setDeleteTargetId(null);
    showToast('Practice area deleted', 'info');
  };

  const handleSave = async () => {
    const ok = await saveDraft('services', servicesData);
    if (ok) {
      setSavedStatus(true);
      showToast('Services draft saved successfully!', 'success');
      setTimeout(() => setSavedStatus(false), 2500);
    } else {
      showToast('Failed to save draft', 'error');
    }
  };

  const handlePublishLive = async () => {
    setIsPublishing(true);
    await saveDraft('services', servicesData);
    const res = await publishAll();
    setIsPublishing(false);
    if (res && res.success) {
      setSavedStatus(true);
      setPreviewKey((k) => k + 1);
      showToast('Services page published live to website!', 'success');
      setTimeout(() => setSavedStatus(false), 3000);
    } else {
      showToast('Failed to publish live', 'error');
    }
  };

  const FieldToggle = ({
    enabled,
    onToggle,
  }: {
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      title={enabled ? 'Field is visible on website. Click to disable.' : 'Field is hidden. Click to enable.'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 7px',
        borderRadius: '9999px',
        border: 'none',
        backgroundColor: enabled ? '#ECFDF5' : '#FEE2E2',
        color: enabled ? '#047857' : '#DC2626',
        fontSize: '0.68rem',
        fontWeight: 650,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {enabled ? <Eye size={11} /> : <EyeOff size={11} />}
      {enabled ? 'Visible' : 'Hidden'}
    </button>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)', position: 'relative' }}>
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            zIndex: 9999,
            backgroundColor: toastMessage.type === 'success' ? '#047857' : toastMessage.type === 'error' ? '#DC2626' : '#1E293B',
            color: '#FFFFFF',
            padding: '0.55rem 1.15rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <span>{toastMessage.text}</span>
        </div>
      )}

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
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 650, margin: 0, color: '#111113' }}>
              Practice Areas &amp; Capabilities Editor
            </h2>
            <div style={{ fontSize: '0.72rem', color: '#71717A' }}>
              Strategic overview, consulting scopes, deliverables &amp; images.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleSave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: savedStatus ? '#16A34A' : '#FFFFFF',
                color: savedStatus ? '#FFFFFF' : '#111113',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {savedStatus ? <Check size={13} /> : <Save size={13} />}
              {savedStatus ? 'Saved Draft' : 'Save Draft'}
            </button>

            <button
              type="button"
              onClick={handlePublishLive}
              disabled={isPublishing}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 650,
                cursor: isPublishing ? 'wait' : 'pointer',
                boxShadow: '0 2px 8px rgba(222, 50, 45, 0.25)',
              }}
            >
              <Send size={13} />
              {isPublishing ? 'Publishing...' : 'Publish Live'}
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1.25rem', borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#FFFFFF', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: '01: Hero & Overview', icon: Sparkles },
            { id: 'services', label: `02: Practice Areas (${servicesData.services?.length || 0})`, icon: Layers },
            { id: 'team', label: '03: Team Structure', icon: Users },
            { id: 'cta', label: '04: Engagement & CTA', icon: Send },
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
                  padding: '0.4rem 0.8rem',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #111113' : '1px solid rgba(0,0,0,0.08)',
                  backgroundColor: isActive ? '#111113' : '#F8F8FA',
                  color: isActive ? '#FFFFFF' : '#52525B',
                  fontSize: '0.76rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={12} color={isActive ? '#FFFFFF' : '#71717A'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── TAB 1: HERO & STRATEGIC OVERVIEW ─── */}
        {activeTab === 'overview' && (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {/* Master Toggle Bar for Hero */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1.25rem',
                backgroundColor: servicesData.heroEnabled !== false ? '#F0FDF4' : '#FEF2F2',
                borderBottom: servicesData.heroEnabled !== false ? '1px solid #BBF7D0' : '1px solid #FECACA',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: servicesData.heroEnabled !== false ? '#15803D' : '#B91C1C' }}>
                Hero &amp; Overview Section: {servicesData.heroEnabled !== false ? 'ENABLED (Visible)' : 'DISABLED (Hidden)'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = servicesData.heroEnabled !== false;
                  updateField(['heroEnabled'], !current);
                  showToast(`Hero section ${!current ? 'enabled' : 'disabled'}`, 'info');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: servicesData.heroEnabled !== false ? '#DC2626' : '#16A34A',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {servicesData.heroEnabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {servicesData.heroEnabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    PAGE EYEBROW
                  </label>
                  <FieldToggle
                    enabled={servicesData.showEyebrow !== false}
                    onToggle={() => {
                      const cur = servicesData.showEyebrow !== false;
                      updateField(['showEyebrow'], !cur);
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={servicesData.eyebrow || ''}
                  onChange={(e) => updateField(['eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    MAIN HEADLINE
                  </label>
                  <FieldToggle
                    enabled={servicesData.showHeadline !== false}
                    onToggle={() => {
                      const cur = servicesData.showHeadline !== false;
                      updateField(['showHeadline'], !cur);
                    }}
                  />
                </div>
                <textarea
                  rows={2}
                  value={servicesData.headline || ''}
                  onChange={(e) => updateField(['headline'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    SECTION SUB-LABEL
                  </label>
                  <FieldToggle
                    enabled={servicesData.showSectionLabel !== false}
                    onToggle={() => {
                      const cur = servicesData.showSectionLabel !== false;
                      updateField(['showSectionLabel'], !cur);
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={servicesData.sectionLabel || ''}
                  onChange={(e) => updateField(['sectionLabel'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    EXECUTIVE SUMMARY / DESCRIPTION
                  </label>
                  <FieldToggle
                    enabled={servicesData.showDescription !== false}
                    onToggle={() => {
                      const cur = servicesData.showDescription !== false;
                      updateField(['showDescription'], !cur);
                    }}
                  />
                </div>
                <textarea
                  rows={3}
                  value={servicesData.description || ''}
                  onChange={(e) => updateField(['description'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    HERO COLLAGE IMAGE
                  </label>
                  <FieldToggle
                    enabled={servicesData.showHeroImage !== false}
                    onToggle={() => {
                      const cur = servicesData.showHeroImage !== false;
                      updateField(['showHeroImage'], !cur);
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={servicesData.heroImage || ''}
                    onChange={(e) => updateField(['heroImage'], e.target.value)}
                    placeholder="/images/services/services-hero-collage.png or URL"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerTarget('heroImage')}
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
                    Pick
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: PRACTICE AREAS ─── */}
        {activeTab === 'services' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Master Toggle Bar for Practice Areas Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1.25rem',
                backgroundColor: servicesData.practiceAreasEnabled !== false ? '#F0FDF4' : '#FEF2F2',
                borderBottom: servicesData.practiceAreasEnabled !== false ? '1px solid #BBF7D0' : '1px solid #FECACA',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: servicesData.practiceAreasEnabled !== false ? '#15803D' : '#B91C1C' }}>
                Practice Areas Section: {servicesData.practiceAreasEnabled !== false ? 'ENABLED (Visible)' : 'DISABLED (Hidden)'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = servicesData.practiceAreasEnabled !== false;
                  updateField(['practiceAreasEnabled'], !current);
                  showToast(`Practice Areas section ${!current ? 'enabled' : 'disabled'}`, 'info');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: servicesData.practiceAreasEnabled !== false ? '#DC2626' : '#16A34A',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {servicesData.practiceAreasEnabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {servicesData.practiceAreasEnabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr', overflow: 'hidden' }}>
              {/* Left Practice Areas Sidebar */}
              <div
                style={{
                  borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                  overflowY: 'auto',
                  padding: '0.75rem',
                  backgroundColor: '#FAF9F6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <button
                  type="button"
                  onClick={handleAddService}
                  style={{
                    width: '100%',
                    padding: '0.45rem',
                    borderRadius: '7px',
                    backgroundColor: '#111113',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Plus size={13} /> Add Practice Area
                </button>

                {(servicesData.services || []).map((s: any, idx: number, arr: any[]) => {
                  const isSelected = s.id === selectedService?.id;
                  const isEnabled = s.enabled !== false;
                  return (
                    <div
                      key={s.id || idx}
                      onClick={() => setSelectedServiceId(s.id)}
                      style={{
                        padding: '0.55rem 0.65rem',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? '#111113' : (isEnabled ? '#FFFFFF' : '#FEF2F2'),
                        color: isSelected ? '#FFFFFF' : '#111113',
                        border: isSelected ? '1px solid #111113' : (isEnabled ? '1px solid rgba(0,0,0,0.06)' : '1px dashed #FECACA'),
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.35rem',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ overflow: 'hidden', flex: 1 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: isSelected ? 600 : 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {s.shortTitle || s.title}
                        </div>
                        <div style={{ fontSize: '0.66rem', color: isSelected ? '#A1A1AA' : '#71717A' }}>
                          Scope {s.num || String(idx + 1).padStart(2, '0')}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} onClick={(e) => e.stopPropagation()}>
                        {/* Eye Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleServiceEnabled(s.id)}
                          title={isEnabled ? 'Disable practice area' : 'Enable practice area'}
                          style={{
                            border: 'none',
                            backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : (isEnabled ? '#ECFDF5' : '#FEE2E2'),
                            color: isSelected ? '#FFFFFF' : (isEnabled ? '#047857' : '#DC2626'),
                            borderRadius: '4px',
                            padding: '3px 4px',
                            cursor: 'pointer',
                          }}
                        >
                          {isEnabled ? <Eye size={12} /> : <EyeOff size={12} />}
                        </button>

                        {/* Move Up */}
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveService(idx, 'up')}
                          title="Move up"
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: isSelected ? (idx === 0 ? '#52525B' : '#E4E4E7') : (idx === 0 ? '#D4D4D8' : '#52525B'),
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            padding: '2px',
                          }}
                        >
                          <ChevronUp size={13} />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          disabled={idx === arr.length - 1}
                          onClick={() => moveService(idx, 'down')}
                          title="Move down"
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: isSelected ? (idx === arr.length - 1 ? '#52525B' : '#E4E4E7') : (idx === arr.length - 1 ? '#D4D4D8' : '#52525B'),
                            cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer',
                            padding: '2px',
                          }}
                        >
                          <ChevronDown size={13} />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(s.id)}
                          title="Delete practice area"
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: isSelected ? '#FCA5A5' : '#EF4444',
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Service Form */}
              {selectedService ? (
                <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#18181B', letterSpacing: '0.04em' }}>
                        FULL PRACTICE TITLE
                      </label>
                      <FieldToggle
                        enabled={selectedService.showTitle !== false}
                        onToggle={() => handleServiceChange('showTitle', selectedService.showTitle === false)}
                      />
                    </div>
                    <input
                      type="text"
                      value={selectedService.title || ''}
                      onChange={(e) => handleServiceChange('title', e.target.value)}
                      placeholder="e.g. Digital Brand Growth"
                      style={{ ...inputStyle, fontSize: '1.08rem', fontWeight: 700, padding: '0.75rem 0.95rem' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                        PRACTICE DESCRIPTION
                      </label>
                      <FieldToggle
                        enabled={selectedService.showDescription !== false}
                        onToggle={() => handleServiceChange('showDescription', selectedService.showDescription === false)}
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={selectedService.description || ''}
                      onChange={(e) => handleServiceChange('description', e.target.value)}
                      placeholder="e.g. Digital presence that helps brands stay relevant, consistent and connected with their audiences while resulting in business growth."
                      style={{ ...inputStyle, fontSize: '0.84rem', color: '#52525B', lineHeight: 1.55 }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                        BEST FOR / CLIENT FIT
                      </label>
                      <FieldToggle
                        enabled={selectedService.showBestFor !== false}
                        onToggle={() => handleServiceChange('showBestFor', selectedService.showBestFor === false)}
                      />
                    </div>
                    <input
                      type="text"
                      value={selectedService.bestFor || ''}
                      onChange={(e) => handleServiceChange('bestFor', e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                        COVER IMAGE
                      </label>
                      <FieldToggle
                        enabled={selectedService.showImage !== false}
                        onToggle={() => handleServiceChange('showImage', selectedService.showImage === false)}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={selectedService.image || ''}
                        onChange={(e) => handleServiceChange('image', e.target.value)}
                        placeholder="/uploads/... or URL"
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
                        Pick
                      </button>
                    </div>
                    {selectedService.image && (
                      <div style={{ marginTop: '0.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', height: '140px', position: 'relative' }}>
                        <img
                          src={selectedService.image}
                          alt="Cover preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                        KEY CAPABILITIES / DELIVERABLES (One per line)
                      </label>
                      <FieldToggle
                        enabled={selectedService.showCapabilities !== false}
                        onToggle={() => handleServiceChange('showCapabilities', selectedService.showCapabilities === false)}
                      />
                    </div>
                    <textarea
                      rows={5}
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
          </div>
        )}

        {/* ─── TAB 3: TEAM STRUCTURE ─── */}
        {activeTab === 'team' && (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {/* Master Toggle Bar for Team Structure */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1.25rem',
                backgroundColor: servicesData.teamStructureEnabled !== false ? '#F0FDF4' : '#FEF2F2',
                borderBottom: servicesData.teamStructureEnabled !== false ? '1px solid #BBF7D0' : '1px solid #FECACA',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: servicesData.teamStructureEnabled !== false ? '#15803D' : '#B91C1C' }}>
                Team Structure Section: {servicesData.teamStructureEnabled !== false ? 'ENABLED (Visible)' : 'DISABLED (Hidden)'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = servicesData.teamStructureEnabled !== false;
                  updateField(['teamStructureEnabled'], !current);
                  showToast(`Team Structure section ${!current ? 'enabled' : 'disabled'}`, 'info');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: servicesData.teamStructureEnabled !== false ? '#DC2626' : '#16A34A',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {servicesData.teamStructureEnabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {servicesData.teamStructureEnabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    EYEBROW TAG
                  </label>
                  <FieldToggle
                    enabled={servicesData.teamStructure?.showEyebrow !== false}
                    onToggle={() => {
                      const cur = servicesData.teamStructure?.showEyebrow !== false;
                      updateField(['teamStructure', 'showEyebrow'], !cur);
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={servicesData.teamStructure?.eyebrow || 'TEAM STRUCTURE'}
                  onChange={(e) => updateField(['teamStructure', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    HEADLINE
                  </label>
                  <FieldToggle
                    enabled={servicesData.teamStructure?.showHeading !== false}
                    onToggle={() => {
                      const cur = servicesData.teamStructure?.showHeading !== false;
                      updateField(['teamStructure', 'showHeading'], !cur);
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={servicesData.teamStructure?.heading || 'Assembled around the brief.'}
                  onChange={(e) => updateField(['teamStructure', 'heading'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    DESCRIPTION
                  </label>
                  <FieldToggle
                    enabled={servicesData.teamStructure?.showDescription !== false}
                    onToggle={() => {
                      const cur = servicesData.teamStructure?.showDescription !== false;
                      updateField(['teamStructure', 'showDescription'], !cur);
                    }}
                  />
                </div>
                <textarea
                  rows={3}
                  value={servicesData.teamStructure?.description || 'We bring together specialists from strategy, creative, design, technology, hospitality and production — depending on your goals, sector and scale.'}
                  onChange={(e) => updateField(['teamStructure', 'description'], e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: ENGAGEMENT & CTA ─── */}
        {activeTab === 'cta' && (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {/* Master Toggle Bar for CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1.25rem',
                backgroundColor: servicesData.ctaEnabled !== false ? '#F0FDF4' : '#FEF2F2',
                borderBottom: servicesData.ctaEnabled !== false ? '1px solid #BBF7D0' : '1px solid #FECACA',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: servicesData.ctaEnabled !== false ? '#15803D' : '#B91C1C' }}>
                Closing CTA Section: {servicesData.ctaEnabled !== false ? 'ENABLED (Visible)' : 'DISABLED (Hidden)'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = servicesData.ctaEnabled !== false;
                  updateField(['ctaEnabled'], !current);
                  showToast(`Closing CTA section ${!current ? 'enabled' : 'disabled'}`, 'info');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: servicesData.ctaEnabled !== false ? '#DC2626' : '#16A34A',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {servicesData.ctaEnabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {servicesData.ctaEnabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    EYEBROW TAG
                  </label>
                  <FieldToggle
                    enabled={servicesData.cta?.showEyebrow !== false}
                    onToggle={() => {
                      const cur = servicesData.cta?.showEyebrow !== false;
                      updateField(['cta', 'showEyebrow'], !cur);
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={servicesData.cta?.eyebrow || "LET'S BUILD"}
                  onChange={(e) => updateField(['cta', 'eyebrow'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    CLOSING CTA HEADLINE
                  </label>
                  <FieldToggle
                    enabled={servicesData.cta?.showHeading !== false}
                    onToggle={() => {
                      const cur = servicesData.cta?.showHeading !== false;
                      updateField(['cta', 'showHeading'], !cur);
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={servicesData.cta?.heading || "Don't start with a service. Start with the problem."}
                  onChange={(e) => updateField(['cta', 'heading'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                    CLOSING CTA SUBTITLE
                  </label>
                  <FieldToggle
                    enabled={servicesData.cta?.showSubheading !== false}
                    onToggle={() => {
                      const cur = servicesData.cta?.showSubheading !== false;
                      updateField(['cta', 'showSubheading'], !cur);
                    }}
                  />
                </div>
                <textarea
                  rows={2}
                  value={servicesData.cta?.subheading || "Tell us what your business needs to achieve. We'll tell you how we'd approach it."}
                  onChange={(e) => updateField(['cta', 'subheading'], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                      BUTTON LABEL
                    </label>
                    <FieldToggle
                      enabled={servicesData.cta?.showButton !== false}
                      onToggle={() => {
                        const cur = servicesData.cta?.showButton !== false;
                        updateField(['cta', 'showButton'], !cur);
                      }}
                    />
                  </div>
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
          </div>
        )}
      </div>

      {/* ─── RIGHT COLUMN: LIVE PREVIEW ─── */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.45rem 0.85rem',
            backgroundColor: '#1E1E24',
            borderRadius: '16px 16px 0 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: '#A1A1AA', fontWeight: 600 }}>PREVIEW: /services</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={() => setPreviewKey((k) => k + 1)}
              title="Reload preview"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#A1A1AA',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
            >
              <RotateCcw size={13} />
            </button>
            <a
              href="/services"
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#A1A1AA',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <LivePreviewPanel key={`/services-${previewKey}`} previewUrl="/services" />
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Practice Area"
        message="Are you sure you want to delete this practice area? This will remove it from live display."
        onConfirm={() => deleteTargetId && handleDeleteService(deleteTargetId)}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Media Picker Modal */}
      {mediaPickerTarget && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setMediaPickerTarget(null)}
          mediaType="image"
          initialUrl={mediaPickerTarget === 'heroImage' ? servicesData.heroImage || '' : selectedService?.image || ''}
          onSelect={(url) => {
            if (mediaPickerTarget === 'heroImage') {
              updateField(['heroImage'], url);
            } else {
              handleServiceChange('image', url);
            }
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
