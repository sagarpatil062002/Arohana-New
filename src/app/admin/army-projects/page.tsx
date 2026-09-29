'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Save, Check, Upload, Shield, Film, X, ExternalLink, Play } from 'lucide-react';

export default function AdminArmyProjectsPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [armyData, setArmyData] = useState<any>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('western-command-investiture');
  const [mediaPickerConfig, setMediaPickerConfig] = useState<{
    isOpen: boolean;
    mediaType: 'image' | 'video' | 'all';
    target: 'image' | 'videoUrl' | 'addSidePhoto' | { replaceSidePhotoIndex: number } | 'bannerImage';
  }>({
    isOpen: false,
    mediaType: 'image',
    target: 'image',
  });
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'hero' | 'disclaimer' | 'closingBanner'>('projects');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content['army-projects']) {
      const cloned = JSON.parse(JSON.stringify(content['army-projects']));
      setArmyData(cloned);
    }
  }, [content['army-projects']]);

  if (!armyData) {
    return <div style={{ padding: '2rem' }}>Loading Indian Army Projects...</div>;
  }

  const selectedProject = armyData.projects?.find((p: any) => p.id === selectedProjectId) || armyData.projects?.[0];

  const handleHeroChange = (field: string, val: string) => {
    const updated = {
      ...armyData,
      hero: {
        ...(armyData.hero || {}),
        [field]: val,
      },
    };
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  const handleDisclaimerChange = (val: string) => {
    const updated = { ...armyData, disclaimer: val };
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  const handleClosingBannerChange = (field: string, val: string) => {
    const updated = {
      ...armyData,
      closingBanner: {
        ...(armyData.closingBanner || {}),
        [field]: val,
      },
    };
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  /* Project handlers */
  const handleProjectChange = (field: string, val: any) => {
    if (!selectedProject) return;
    const updatedProjects = (armyData.projects || []).map((p: any) =>
      p.id === selectedProject.id ? { ...p, [field]: val } : p
    );
    const updated = { ...armyData, projects: updatedProjects };
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  const handleTogglePublished = (id: string) => {
    const updatedProjects = (armyData.projects || []).map((p: any) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    const updated = { ...armyData, projects: updatedProjects };
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= armyData.projects.length) return;
    const newProjects = [...armyData.projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIdx];
    newProjects[targetIdx] = temp;
    const updated = { ...armyData, projects: newProjects };
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  const handleAddNewProject = () => {
    const newId = `army-proj-${Date.now()}`;
    const newNum = String((armyData.projects?.length || 0) + 1).padStart(2, '0');
    const newProj = {
      id: newId,
      num: newNum,
      command: '14 CORPS HEADQUARTERS',
      location: 'Ladakh',
      date: '2026',
      title: 'New Institutional Assignment',
      subtitle: 'Ceremonial protocol shoot and documentary production.',
      description: 'Detailed description of authorized institutional shoot direction.',
      scopeOfWork: 'Institutional communication campaigns, internal and public-facing visual communication.',
      creativeApproach: 'Restrained, dignified visual pacing suited to military protocol.',
      productionDiscipline: 'High-altitude cold weather filming and equipment readiness.',
      videoUrl: '',
      image: '/images/army/army-hero.jpg',
      sidePhotos: [],
      category: '14-corps',
      published: true,
    };
    const updated = {
      ...armyData,
      projects: [...(armyData.projects || []), newProj],
    };
    setArmyData(updated);
    setSelectedProjectId(newId);
    updateDraftInMemory('army-projects', updated);
  };

  const handleDeleteProject = () => {
    if (!deleteTargetId) return;
    const updatedProjects = (armyData.projects || []).filter((p: any) => p.id !== deleteTargetId);
    const updated = { ...armyData, projects: updatedProjects };
    setArmyData(updated);
    if (selectedProjectId === deleteTargetId) {
      setSelectedProjectId(updatedProjects[0]?.id || null);
    }
    setDeleteTargetId(null);
    updateDraftInMemory('army-projects', updated);
  };

  const handleRemoveSidePhoto = (index: number) => {
    if (!selectedProject) return;
    const existing = [...(selectedProject.sidePhotos || [])];
    existing.splice(index, 1);
    handleProjectChange('sidePhotos', existing);
  };

  const handleSave = async () => {
    const ok = await saveDraft('army-projects', armyData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2500);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* ─── LEFT COLUMN: ARMY PROJECTS LIST & EDITOR ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        {/* Header Bar */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                Indian Army Projects
              </h2>
              <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
                Institutional briefs, verified assignments, videos &amp; publications.
              </div>
            </div>

            {/* Quick Section Dropdown Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#52525B' }}>Section:</span>
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="projects">01: Project Cards &amp; Assignments</option>
                <option value="hero">02: Page Hero Header</option>
                <option value="disclaimer">03: Institutional Integrity Statement</option>
                <option value="closingBanner">04: Closing Banner &amp; CTA</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            {activeTab === 'projects' && (
              <button
                type="button"
                onClick={handleAddNewProject}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={14} />
                Add Project
              </button>
            )}
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
                transition: 'background-color 0.2s',
              }}
            >
              {savedStatus ? <Check size={14} /> : <Save size={14} />}
              {savedStatus ? 'Saved to Live Site!' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.25rem',
            padding: '0.4rem 1rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#F4F4F5',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'projects', label: `Projects Directory (${armyData.projects?.length || 0})` },
            { id: 'hero', label: 'Hero Section' },
            { id: 'disclaimer', label: 'Disclaimer' },
            { id: 'closingBanner', label: 'Closing Banner' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.78rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#111113' : '#71717A',
                  background: active ? '#FFFFFF' : 'transparent',
                  border: active ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── TAB 1: HERO ─── */}
        {activeTab === 'hero' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Header &amp; Headline
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                EYEBROW
              </label>
              <input
                type="text"
                value={armyData.hero?.eyebrow || ''}
                onChange={(e) => handleHeroChange('eyebrow', e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                MAIN TITLE
              </label>
              <input
                type="text"
                value={armyData.hero?.title || ''}
                onChange={(e) => handleHeroChange('title', e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={armyData.hero?.description || ''}
                onChange={(e) => handleHeroChange('description', e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        )}

        {/* ─── TAB 2: DISCLAIMER ─── */}
        {activeTab === 'disclaimer' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DE322D' }}>
              <Shield size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Institutional Security Notice
              </span>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                CLEARANCE NOTICE
              </label>
              <textarea
                rows={4}
                value={armyData.disclaimer || ''}
                onChange={(e) => handleDisclaimerChange(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem', fontFamily: 'inherit', lineHeight: 1.5 }}
              />
            </div>
          </div>
        )}

        {/* ─── TAB 3: CLOSING BANNER ─── */}
        {activeTab === 'closingBanner' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Full-Width Closing Banner
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                EYEBROW
              </label>
              <input
                type="text"
                value={armyData.closingBanner?.eyebrow || ''}
                onChange={(e) => handleClosingBannerChange('eyebrow', e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                HEADING (SUPPORTS LINE BREAKS)
              </label>
              <textarea
                rows={2}
                value={armyData.closingBanner?.heading || ''}
                onChange={(e) => handleClosingBannerChange('heading', e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={armyData.closingBanner?.description || ''}
                onChange={(e) => handleClosingBannerChange('description', e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BUTTON LABEL
                </label>
                <input
                  type="text"
                  value={armyData.closingBanner?.buttonText || ''}
                  onChange={(e) => handleClosingBannerChange('buttonText', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BUTTON URL
                </label>
                <input
                  type="text"
                  value={armyData.closingBanner?.buttonUrl || ''}
                  onChange={(e) => handleClosingBannerChange('buttonUrl', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                BACKGROUND IMAGE
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '120px', height: '65px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#000' }}>
                  <Image src={armyData.closingBanner?.image || '/images/army/symbolic-army-terrain.jpg'} alt="Banner Preview" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={armyData.closingBanner?.image || ''}
                    onChange={(e) => handleClosingBannerChange('image', e.target.value)}
                    style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.8rem', marginBottom: '0.35rem' }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setMediaPickerConfig({
                        isOpen: true,
                        mediaType: 'image',
                        target: 'bannerImage',
                      })
                    }
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Choose from Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: PROJECTS DIRECTORY ─── */}
        {activeTab === 'projects' && (
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', flex: 1, overflow: 'hidden' }}>
            {/* Sub-list of Projects */}
            <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.08)', overflowY: 'auto', backgroundColor: '#FAFAFA' }}>
              {(armyData.projects || []).map((p: any, idx: number) => {
                const isSelected = p.id === (selectedProject?.id || selectedProjectId);
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                      borderLeft: isSelected ? '3px solid #DE322D' : '3px solid transparent',
                      transition: 'background-color 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700, color: '#DE322D' }}>
                        {p.num || String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          fontSize: '0.66rem',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: p.published !== false ? '#DCFCE7' : '#F4F4F5',
                          color: p.published !== false ? '#16A34A' : '#71717A',
                          fontWeight: 600,
                        }}
                      >
                        {p.published !== false ? 'Live' : 'Hidden'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 650, color: '#111113', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#71717A', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.command} &bull; {p.date}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub-Editor for Selected Project */}
            {selectedProject && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {/* Project Header & Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#DE322D' }}>
                      {selectedProject.num}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      type="button"
                      title="Move Up"
                      onClick={() => moveProject(armyData.projects.findIndex((p: any) => p.id === selectedProject.id), 'up')}
                      style={{ padding: '0.35rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)', background: '#fff', cursor: 'pointer' }}
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      title="Move Down"
                      onClick={() => moveProject(armyData.projects.findIndex((p: any) => p.id === selectedProject.id), 'down')}
                      style={{ padding: '0.35rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)', background: '#fff', cursor: 'pointer' }}
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      title={selectedProject.published !== false ? 'Hide from Live' : 'Show on Live'}
                      onClick={() => handleTogglePublished(selectedProject.id)}
                      style={{
                        padding: '0.35rem 0.65rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        background: selectedProject.published !== false ? '#ECFDF5' : '#F4F4F5',
                        color: selectedProject.published !== false ? '#059669' : '#71717A',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {selectedProject.published !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                      {selectedProject.published !== false ? 'Live' : 'Hidden'}
                    </button>
                    <button
                      type="button"
                      title="Delete Project"
                      onClick={() => setDeleteTargetId(selectedProject.id)}
                      style={{ padding: '0.35rem', borderRadius: '4px', border: '1px solid rgba(222,50,45,0.2)', background: '#FEF2F2', color: '#DE322D', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* 1. TEXT METADATA FIELDS */}
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      NUM
                    </label>
                    <input
                      type="text"
                      value={selectedProject.num || ''}
                      onChange={(e) => handleProjectChange('num', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      COMMAND / FORMATION
                    </label>
                    <input
                      type="text"
                      value={selectedProject.command || ''}
                      onChange={(e) => handleProjectChange('command', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      LOCATION
                    </label>
                    <input
                      type="text"
                      value={selectedProject.location || ''}
                      onChange={(e) => handleProjectChange('location', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      PROJECT TITLE
                    </label>
                    <input
                      type="text"
                      value={selectedProject.title || ''}
                      onChange={(e) => handleProjectChange('title', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      TIMELINE / DATE
                    </label>
                    <input
                      type="text"
                      value={selectedProject.date || ''}
                      onChange={(e) => handleProjectChange('date', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      CATEGORY
                    </label>
                    <select
                      value={selectedProject.category || 'western-command'}
                      onChange={(e) => handleProjectChange('category', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="western-command">Western Command</option>
                      <option value="14-corps">14 Corps / Fire &amp; Fury</option>
                      <option value="border-initiatives">Border Initiatives</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BRIEF SUBTITLE
                  </label>
                  <input
                    type="text"
                    value={selectedProject.subtitle || ''}
                    onChange={(e) => handleProjectChange('subtitle', e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={2}
                    value={selectedProject.description || ''}
                    onChange={(e) => handleProjectChange('description', e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    SCOPE OF WORK
                  </label>
                  <textarea
                    rows={2}
                    value={selectedProject.scopeOfWork || ''}
                    onChange={(e) => handleProjectChange('scopeOfWork', e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      CREATIVE APPROACH
                    </label>
                    <textarea
                      rows={2}
                      value={selectedProject.creativeApproach || ''}
                      onChange={(e) => handleProjectChange('creativeApproach', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.82rem', fontFamily: 'inherit' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      PRODUCTION DISCIPLINE
                    </label>
                    <textarea
                      rows={2}
                      value={selectedProject.productionDiscipline || ''}
                      onChange={(e) => handleProjectChange('productionDiscipline', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', fontSize: '0.82rem', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>

                {/* 2. PROJECT VIDEO MANAGEMENT (Investiture Ceremony & Films) */}
                <div style={{ padding: '1rem', backgroundColor: '#FDF8F6', borderRadius: '10px', border: '1px solid rgba(222, 50, 45, 0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Film size={15} color="#DE322D" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.05em' }}>
                        PROJECT VIDEO (YOUTUBE / MP4 / VIDEO LINK)
                      </span>
                    </div>
                    {selectedProject.videoUrl && (
                      <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#DCFCE7', color: '#16A34A', fontWeight: 600 }}>
                        Active Video Configured
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.73rem', color: '#71717A', margin: '0 0 0.65rem 0', lineHeight: 1.4 }}>
                    Paste a YouTube link (e.g. <code>https://youtu.be/Ki6c7vRhbtA</code> or <code>https://www.youtube.com/watch?v=Ki6c7vRhbtA</code>), MP4 file URL, or choose from Media Library.
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.65rem' }}>
                    <input
                      type="text"
                      placeholder="e.g. https://youtu.be/Ki6c7vRhbtA or /videos/hero-montage.mp4"
                      value={selectedProject.videoUrl || ''}
                      onChange={(e) => handleProjectChange('videoUrl', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        fontSize: '0.82rem',
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setMediaPickerConfig({
                          isOpen: true,
                          mediaType: 'video',
                          target: 'videoUrl',
                        })
                      }
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Upload size={13} />
                      Pick Video
                    </button>
                    {selectedProject.videoUrl && (
                      <button
                        type="button"
                        onClick={() => handleProjectChange('videoUrl', '')}
                        style={{
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#FEE2E2',
                          color: '#DE322D',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {selectedProject.videoUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <Play size={14} color="#DE322D" />
                      <span style={{ fontSize: '0.74rem', color: '#18181B', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {selectedProject.videoUrl}
                      </span>
                      <a
                        href={selectedProject.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: '#DE322D', textDecoration: 'none', fontWeight: 600 }}
                      >
                        Preview <ExternalLink size={11} />
                      </a>
                    </div>
                  )}
                </div>

                {/* 3. PRIMARY HERO / POSTER PHOTO */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    PRIMARY PHOTO / VIDEO POSTER
                  </label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '100px',
                        height: '75px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#F4F4F5',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        flexShrink: 0,
                      }}
                    >
                      {selectedProject.image ? (
                        <Image src={selectedProject.image} alt={selectedProject.title} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A1A1AA', fontSize: '0.7rem' }}>
                          No Image
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="/images/army/... or https://..."
                          value={selectedProject.image || ''}
                          onChange={(e) => handleProjectChange('image', e.target.value)}
                          style={{
                            flex: 1,
                            padding: '0.45rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(0, 0, 0, 0.15)',
                            fontSize: '0.82rem',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setMediaPickerConfig({
                              isOpen: true,
                              mediaType: 'image',
                              target: 'image',
                            })
                          }
                          style={{
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(0, 0, 0, 0.15)',
                            backgroundColor: '#FFFFFF',
                            color: '#111113',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <Upload size={13} />
                          Upload / Pick
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. SIDE PHOTOS / GALLERY STILLS MANAGEMENT */}
                <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1E293B', letterSpacing: '0.04em' }}>
                        SIDE PHOTOS &amp; GALLERY STILLS
                      </span>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Thumbnails, book spreads, and field photos shown alongside the project card.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setMediaPickerConfig({
                          isOpen: true,
                          mediaType: 'image',
                          target: 'addSidePhoto',
                        })
                      }
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Plus size={12} />
                      Add Photo
                    </button>
                  </div>

                  {(!selectedProject.sidePhotos || selectedProject.sidePhotos.length === 0) ? (
                    <div style={{ padding: '1.25rem', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px dashed rgba(0, 0, 0, 0.15)', color: '#94A3B8', fontSize: '0.75rem' }}>
                      No side photos added yet. Click &quot;Add Photo&quot; to pick from Media Library.
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.65rem' }}>
                      {selectedProject.sidePhotos.map((photoUrl: string, pIdx: number) => (
                        <div
                          key={pIdx}
                          style={{
                            position: 'relative',
                            aspectRatio: '4/3',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            backgroundColor: '#E2E8F0',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <Image src={photoUrl} alt={`Side photo ${pIdx + 1}`} fill style={{ objectFit: 'cover' }} />
                          <div
                            style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              display: 'flex',
                              gap: '3px',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => handleRemoveSidePhoto(pIdx)}
                              title="Delete photo"
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '4px',
                                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                color: '#FFFFFF',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                            >
                              <X size={12} />
                            </button>
                          </div>
                          <div
                            onClick={() =>
                              setMediaPickerConfig({
                                isOpen: true,
                                mediaType: 'image',
                                target: { replaceSidePhotoIndex: pIdx },
                              })
                            }
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              backgroundColor: 'rgba(0, 0, 0, 0.6)',
                              color: '#FFFFFF',
                              fontSize: '0.65rem',
                              textAlign: 'center',
                              padding: '2px 0',
                              cursor: 'pointer',
                            }}
                          >
                            Replace
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Save Action */}
                <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleSave}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.55rem 1.35rem',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: savedStatus ? '#16A34A' : '#DE322D',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 650,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {savedStatus ? <Check size={14} /> : <Save size={14} />}
                    {savedStatus ? 'Changes Saved to Live Site!' : 'Save Project Changes'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── RIGHT COLUMN: REAL-TIME LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/indian-army-projects" />
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerConfig.isOpen}
        onClose={() => setMediaPickerConfig((prev) => ({ ...prev, isOpen: false }))}
        mediaType={mediaPickerConfig.mediaType}
        initialUrl={
          mediaPickerConfig.target === 'image'
            ? selectedProject?.image || ''
            : mediaPickerConfig.target === 'videoUrl'
            ? selectedProject?.videoUrl || ''
            : mediaPickerConfig.target === 'bannerImage'
            ? armyData.closingBanner?.image || ''
            : ''
        }
        onSelect={(url) => {
          if (mediaPickerConfig.target === 'image') {
            handleProjectChange('image', url);
          } else if (mediaPickerConfig.target === 'videoUrl') {
            handleProjectChange('videoUrl', url);
          } else if (mediaPickerConfig.target === 'addSidePhoto') {
            const existing = [...(selectedProject.sidePhotos || [])];
            existing.push(url);
            handleProjectChange('sidePhotos', existing);
          } else if (typeof mediaPickerConfig.target === 'object' && 'replaceSidePhotoIndex' in mediaPickerConfig.target) {
            const idx = mediaPickerConfig.target.replaceSidePhotoIndex;
            const existing = [...(selectedProject.sidePhotos || [])];
            existing[idx] = url;
            handleProjectChange('sidePhotos', existing);
          } else if (mediaPickerConfig.target === 'bannerImage') {
            handleClosingBannerChange('image', url);
          }
          setMediaPickerConfig((prev) => ({ ...prev, isOpen: false }));
        }}
      />

      {/* Confirm Delete Project */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Army Project?"
        message="This verified institutional assignment will be removed from your portfolio."
        confirmLabel="Delete"
        onConfirm={handleDeleteProject}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
