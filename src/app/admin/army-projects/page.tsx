'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import CmsToggle from '@/components/admin/CmsToggle';
import CmsSectionCard from '@/components/admin/CmsSectionCard';
import {
  Plus,
  Trash2,
  Save,
  Check,
  Upload,
  Play,
  ArrowRight,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Video,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  GripVertical,
  Briefcase,
} from 'lucide-react';

export default function AdminArmyProjectsPage() {
  const { content, saveDraft, updateDraftInMemory, publishSection } = useCmsContent();
  const [armyData, setArmyData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'hero' | 'western-command' | '14-corps' | 'corps-publications' | 'rezang-la' | 'closing' | 'order'>('all');
  const [isDirty, setIsDirty] = useState(false);
  const [draftSavedStatus, setDraftSavedStatus] = useState(false);
  const [publishedStatus, setPublishedStatus] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [mediaPickerConfig, setMediaPickerConfig] = useState<{
    isOpen: boolean;
    mediaType: 'image' | 'video' | 'pdf' | 'all';
    targetPath: any[];
  }>({
    isOpen: false,
    mediaType: 'all',
    targetPath: [],
  });

  const editorScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content['army-projects']) {
      const cloned = JSON.parse(JSON.stringify(content['army-projects']));
      setArmyData(cloned);
    }
  }, [content['army-projects']]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  if (!armyData) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#71717A' }}>
        Loading Indian Army Projects CMS...
      </div>
    );
  }

  // Deep update helper
  const updateField = (path: any[], val: any) => {
    const updated = JSON.parse(JSON.stringify(armyData));
    let current = updated;
    for (let i = 0; i < path.length - 1; i++) {
      if (current[path[i]] === undefined) {
        current[path[i]] = typeof path[i + 1] === 'number' ? [] : {};
      }
      current = current[path[i]];
    }
    current[path[path.length - 1]] = val;
    setArmyData(updated);
    setIsDirty(true);
    updateDraftInMemory('army-projects', updated);
  };

  // Reorder Army Project Section (↑ Move Up / ↓ Move Down)
  const moveProject = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const projects = armyData.projects || [];
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIdx];
    newProjects[targetIdx] = temp;

    const updated = { ...armyData, projects: newProjects };
    setArmyData(updated);
    setIsDirty(true);
    updateDraftInMemory('army-projects', updated);
    showToast(`✓ Section moved ${direction}`);
  };

  // Toggle collapse state for a section
  const toggleCollapse = (secId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  // Collapse or Expand All Sections
  const handleToggleAllCollapse = (collapseAll: boolean) => {
    const newMap: Record<string, boolean> = {
      hero: collapseAll,
      disclaimer: collapseAll,
      closingBanner: collapseAll,
    };
    (armyData.projects || []).forEach((p: any) => {
      newMap[p.id] = collapseAll;
    });
    setCollapsedSections(newMap);
  };

  // Save draft to Centralized CRM Draft Store
  const handleSaveDraft = async () => {
    try {
      await saveDraft('army-projects', armyData);
      setIsDirty(false);
      setDraftSavedStatus(true);
      showToast('✓ Army Projects draft saved to Centralized Draft Store');
      setTimeout(() => setDraftSavedStatus(false), 3000);
    } catch {
      showToast('✕ Error saving draft');
    }
  };

  // Publish Army Projects to Live Website
  const handlePublishLive = async () => {
    try {
      await publishSection('army-projects', armyData);
      setIsDirty(false);
      setPublishedStatus(true);
      showToast('✓ Indian Army Projects published LIVE to website!');
      setTimeout(() => setPublishedStatus(false), 3500);
    } catch {
      showToast('✕ Error publishing live');
    }
  };

  // Add a new project section
  const handleAddNewProject = (type: 'video' | 'pdf' | 'carousel' | 'image') => {
    const newId = `army-proj-${Date.now()}`;
    let newProject: any = {
      id: newId,
      command: 'INDIAN ARMY',
      location: 'Ladakh',
      date: '2026',
      title: 'New Army Assignment',
      subtitle: 'Documentation · Content creation',
      description: 'Comprehensive assignment documentation executed with authorized military protocol.',
      published: true,
      caseStudyEnabled: true,
      caseStudyUrl: '',
      caseStudyLabel: 'View case study ↗',
    };

    if (type === 'video') {
      newProject = {
        ...newProject,
        title: 'New Video Production',
        subtitle: 'Shoot · Production · Master Delivery',
        videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        thumbnail: '/images/army/western-command-1.jpg',
        image: '/images/army/western-command-1.jpg',
        sidePhotos: ['/images/army/western-command-official.jpg', '/images/army/western-command-2.jpg'],
        layoutStyle: 'video-investiture',
      };
    } else if (type === 'pdf') {
      newProject = {
        ...newProject,
        title: 'New PDF Publication & Memorial',
        subtitle: 'Editorial publication · Tactile archival',
        pdfUrl: '/uploads/1790923450984-69-armoured-regimet-.pdf',
        landscapeImage: '/uploads/1790516827847-rezang-la-memorial.jpg',
        image: '/uploads/1790516737581-rezangla.jpg',
        layoutStyle: 'rezang-la',
      };
    } else if (type === 'carousel') {
      newProject = {
        ...newProject,
        title: 'New Regiment Publication & Carousel',
        subtitle: 'Collateral designing · Publications',
        carouselEnabled: true,
        carouselImages: [
          { id: '1', image: '/uploads/1790516375474-firefury1.jpg', caption: 'Publication Architecture', enabled: true },
          { id: '2', image: '/images/army/69armoured-2.jpg', caption: 'Alpine Desert Formations', enabled: true },
        ],
        layoutStyle: 'publications-carousel',
      };
    } else {
      newProject = {
        ...newProject,
        image: '/uploads/1790515799187-high-alltitude-1.jpg',
        layoutStyle: 'standard',
      };
    }

    const updatedProjects = [...(armyData.projects || []), newProject];
    const updated = { ...armyData, projects: updatedProjects };
    setArmyData(updated);
    setIsDirty(true);
    updateDraftInMemory('army-projects', updated);
    setIsAddSectionOpen(false);
    showToast('✓ New Army section added to stack');
  };

  // Delete project confirmation
  const confirmDeleteProject = () => {
    if (!deleteTargetId) return;
    const updatedProjects = (armyData.projects || []).filter((p: any) => p.id !== deleteTargetId);
    const updated = { ...armyData, projects: updatedProjects };
    setArmyData(updated);
    setIsDirty(true);
    updateDraftInMemory('army-projects', updated);
    setDeleteTargetId(null);
    showToast('✓ Section removed from page');
  };

  // Input styles
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.42rem 0.65rem',
    borderRadius: '6px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: '#FFFFFF',
    fontSize: '0.78rem',
    color: '#111113',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 650,
    color: '#52525B',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const mediaBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.35rem 0.65rem',
    borderRadius: '6px',
    border: '1px solid rgba(0,0,0,0.12)',
    backgroundColor: '#F8F8FA',
    color: '#27272A',
    fontSize: '0.74rem',
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.15s ease',
  };

  const projects = armyData.projects || [];

  return (
    <div className="admin-split-grid">
      {/* ─── LEFT COLUMN: RESTRUCTURED ARMY SECTION EDITOR ─── */}
      <div
        className="admin-editor-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          minWidth: 0,
          width: '100%',
        }}
      >
        {/* Editor Top Bar */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            flexWrap: 'wrap',
            gap: '0.75rem',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111113' }}>
              Indian Army Projects
            </div>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: '#F4F4F5', color: '#52525B', fontWeight: 600 }}>
              {armyData.projects?.length || 4} Projects
            </span>

            {/* Segmented Toggle: Editor vs Order & Visibility */}
            <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#F4F4F5', borderRadius: '8px', padding: '2px', marginLeft: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'order' ? 'all' : activeTab)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab !== 'order' ? '#FFFFFF' : 'transparent',
                  color: activeTab !== 'order' ? '#111113' : '#71717A',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: activeTab !== 'order' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <FileText size={12} />
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('order')}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeTab === 'order' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'order' ? '#111113' : '#71717A',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: activeTab === 'order' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <GripVertical size={12} />
                Order &amp; Visibility
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Add Section Quick Action */}
            <button
              type="button"
              onClick={() => setIsAddSectionOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                backgroundColor: '#FFFFFF',
                color: '#111113',
                fontSize: '0.76rem',
                fontWeight: 650,
                cursor: 'pointer',
              }}
            >
              <Plus size={14} /> Add Section
            </button>

            {/* Amber pill: Save Draft */}
            <button
              type="button"
              onClick={handleSaveDraft}
              title="Save draft to CRM"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid #D97706',
                backgroundColor: draftSavedStatus ? '#F0FDF4' : '#FEF3C7',
                color: draftSavedStatus ? '#16A34A' : '#92400E',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease',
              }}
            >
              {draftSavedStatus ? <Check size={13} /> : <FileText size={13} />}
              <span>{draftSavedStatus ? 'Draft Saved' : 'Save Draft'}</span>
            </button>

            {/* Red pill: Publish This Page */}
            <button
              type="button"
              onClick={handlePublishLive}
              title="Publish live to production"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(222, 50, 45, 0.25)',
              }}
            >
              <Upload size={13} />
              <span>Publish This Page</span>
            </button>
          </div>
        </div>

        {/* Section Tabs Row */}
        <div
          className="admin-tabs-row"
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
            { id: 'all', label: 'All Sections' },
            { id: 'hero', label: '01: Hero & Notice', isSecEnabled: armyData.heroEnabled !== false },
            { id: 'western-command', label: '02: Western Command', isSecEnabled: (projects[0]?.published !== false) },
            { id: '14-corps', label: '03: 14 Corps HQ', isSecEnabled: (projects[1]?.published !== false) },
            { id: 'corps-publications', label: '04: Fire & Fury', isSecEnabled: (projects[2]?.published !== false) },
            { id: 'rezang-la', label: '05: Rezang La', isSecEnabled: (projects[3]?.published !== false) },
            { id: 'closing', label: '06: Closing Banner', isSecEnabled: armyData.closingBannerEnabled !== false },
            { id: 'order', label: 'Order & Visibility', icon: GripVertical },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? '#111113' : '#71717A',
                background: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.isSecEnabled !== undefined && (
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: tab.isSecEnabled ? '#10B981' : '#EF4444',
                  }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div
            style={{
              padding: '0.6rem 1.25rem',
              backgroundColor: '#111113',
              color: '#FFFFFF',
              fontSize: '0.76rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#4ADE80', fontWeight: 700 }}>●</span>
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage('')}
              style={{ background: 'transparent', border: 'none', color: '#A1A1AA', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Natural Vertical Content Container */}
        <div
          ref={editorScrollRef}
          className="admin-editor-scroll"
          style={{
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* ════════════════════════════════════════════════════════════
              SECTION 01: HERO / INTRODUCTION & DISCLAIMER
             ════════════════════════════════════════════════════════════ */}
          {(activeTab === 'all' || activeTab === 'hero') && (
            <>
              <CmsSectionCard
                id="hero"
                title="Hero / Introduction"
                subtitle="Himalayan soldier atmospheric banner, headline & eyebrow"
                badge="SECTION 01"
                enabled={armyData.heroEnabled !== false}
                onToggleEnabled={(next) => updateField(['heroEnabled'], next)}
                isCollapsed={collapsedSections['hero']}
                onToggleCollapse={() => toggleCollapse('hero')}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <div>
                    <label style={labelStyle}>Eyebrow Protocol Badge</label>
                    <input
                      type="text"
                      value={armyData.hero?.eyebrow || ''}
                      placeholder="DEFENCE & INSTITUTIONAL PRODUCTION"
                      onChange={(e) => updateField(['hero', 'eyebrow'], e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Hero Headline</label>
                    <input
                      type="text"
                      value={armyData.hero?.title || ''}
                      placeholder="Stories of service"
                      onChange={(e) => updateField(['hero', 'title'], e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Hero Description</label>
                    <textarea
                      rows={2}
                      value={armyData.hero?.description || ''}
                      placeholder="On-location film direction, ceremonial protocol documentation..."
                      onChange={(e) => updateField(['hero', 'description'], e.target.value)}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>
                </div>
              </CmsSectionCard>

              {/* SECTION 02: INSTITUTIONAL INTEGRITY STATEMENT */}
              <CmsSectionCard
                id="disclaimer"
                title="Institutional Integrity Disclaimer"
                subtitle="Verified assignment protocol and authorized disclosure statement"
                badge="SECTION 02"
                enabled={armyData.disclaimerEnabled !== false}
                onToggleEnabled={(next) => updateField(['disclaimerEnabled'], next)}
                isCollapsed={collapsedSections['disclaimer']}
                onToggleCollapse={() => toggleCollapse('disclaimer')}
              >
                <div>
                  <label style={labelStyle}>Disclaimer Statement Text</label>
                  <textarea
                    rows={3}
                    value={armyData.disclaimer || ''}
                    placeholder="Institutional Integrity: All presented Indian Army project materials represent verified shoot direction..."
                    onChange={(e) => updateField(['disclaimer'], e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </CmsSectionCard>
            </>
          )}

          {/* ════════════════════════════════════════════════════════════
              ARMY PROJECT SECTIONS (DYNAMICALLY ORDERED BY CMS)
             ════════════════════════════════════════════════════════════ */}
          {projects.map((project: any, index: number) => {
            if (activeTab === 'western-command' && project.id !== 'western-command-investiture' && index !== 0) return null;
            if (activeTab === '14-corps' && project.id !== '14-corps-communication' && index !== 1) return null;
            if (activeTab === 'corps-publications' && project.id !== 'corps-publications' && index !== 2) return null;
            if (activeTab === 'rezang-la' && project.id !== 'rezang-la-memorial' && index !== 3) return null;
            if (activeTab === 'hero' || activeTab === 'closing' || activeTab === 'order') return null;
            const isVideoSection = Boolean(project.videoUrl) || project.layoutStyle === 'video-investiture';
            const isCarouselSection = Boolean(project.carouselImages) || project.layoutStyle === 'publications-carousel';
            const isInteractiveCardsSection = Boolean(project.interactiveCards) || project.layoutStyle === 'interactive-cards';
            const isPdfSection = Boolean(project.pdfUrl || project.pdf) && !isCarouselSection;

            const badgeText = isVideoSection
              ? 'VIDEO SECTION'
              : isCarouselSection
              ? 'PDF + CAROUSEL'
              : isInteractiveCardsSection
              ? 'INTERACTIVE CARDS'
              : isPdfSection
              ? 'PDF + IMAGE'
              : 'PROJECT CARD';

            const sectionNum = `SECTION ${String(index + 3).padStart(2, '0')}`;

            return (
              <CmsSectionCard
                key={project.id || index}
                id={project.id}
                title={project.title || `Project #${index + 1}`}
                subtitle={`${project.command || 'Indian Army'} • ${project.location || 'Ladakh'}`}
                badge={`${sectionNum} • ${badgeText}`}
                enabled={project.published !== false}
                onToggleEnabled={(next) => {
                  const updatedProjects = [...projects];
                  updatedProjects[index] = { ...updatedProjects[index], published: next };
                  updateField(['projects'], updatedProjects);
                }}
                onMoveUp={() => moveProject(index, 'up')}
                onMoveDown={() => moveProject(index, 'down')}
                canMoveUp={index > 0}
                canMoveDown={index < projects.length - 1}
                canDelete={projects.length > 1}
                onDelete={() => setDeleteTargetId(project.id)}
                isCollapsed={collapsedSections[project.id]}
                onToggleCollapse={() => toggleCollapse(project.id)}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Row 1: Command, Location & Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '0.65rem' }}>
                    <div>
                      <label style={labelStyle}>Command / Formation</label>
                      <input
                        type="text"
                        value={project.command || ''}
                        placeholder="e.g. 69 Armoured, WESTERN COMMAND"
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = { ...updated[index], command: e.target.value };
                          updateField(['projects'], updated);
                        }}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Location</label>
                      <input
                        type="text"
                        value={project.location || ''}
                        placeholder="e.g. Ladakh"
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = { ...updated[index], location: e.target.value };
                          updateField(['projects'], updated);
                        }}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Date / Period</label>
                      <input
                        type="text"
                        value={project.date || ''}
                        placeholder="e.g. February 2026"
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = { ...updated[index], date: e.target.value };
                          updateField(['projects'], updated);
                        }}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Row 2: Title & Subtitle */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr', gap: '0.65rem' }}>
                    <div>
                      <label style={labelStyle}>Project Title / Headline</label>
                      <input
                        type="text"
                        value={project.title || ''}
                        placeholder="e.g. 69 Armoured Regiment"
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = { ...updated[index], title: e.target.value };
                          updateField(['projects'], updated);
                        }}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Subtitle / Scope Tags</label>
                      <input
                        type="text"
                        value={project.subtitle || ''}
                        placeholder="e.g. Collateral designing · Publications"
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = { ...updated[index], subtitle: e.target.value };
                          updateField(['projects'], updated);
                        }}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Row 3: Description */}
                  <div>
                    <label style={labelStyle}>Description</label>
                    <textarea
                      rows={2}
                      value={project.description || ''}
                      placeholder="Summary of assignment, archival production, or field documentation..."
                      onChange={(e) => {
                        const updated = [...projects];
                        updated[index] = { ...updated[index], description: e.target.value };
                        updateField(['projects'], updated);
                      }}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  {/* ─── MEDIA TYPE SPECIFIC CONTROLS ─── */}

                  {/* 1. VIDEO CONTROLS */}
                  {(isVideoSection || project.videoUrl !== undefined) && (
                    <div style={{ padding: '0.85rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem', color: '#DE322D', fontWeight: 650, fontSize: '0.78rem' }}>
                        <Video size={14} /> Video Assignment Media Controls
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginBottom: '0.65rem' }}>
                        <div>
                          <label style={labelStyle}>Video URL (YouTube, Vimeo, MP4)</label>
                          <input
                            type="text"
                            value={project.videoUrl || ''}
                            placeholder="https://www.youtube.com/watch?v=..."
                            onChange={(e) => {
                              const updated = [...projects];
                              updated[index] = { ...updated[index], videoUrl: e.target.value };
                              updateField(['projects'], updated);
                            }}
                            style={inputStyle}
                          />
                        </div>
                        {project.videoUrl && (
                          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <button
                              type="button"
                              onClick={() => setActiveVideoModal(project.videoUrl)}
                              style={{ ...mediaBtnStyle, backgroundColor: '#111113', color: '#fff' }}
                            >
                              <Play size={12} fill="#fff" /> Test Play
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Video Thumbnail Image */}
                      <div>
                        <label style={labelStyle}>Video Thumbnail / Cover Image</label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={project.thumbnail || project.image || ''}
                            placeholder="/images/army/..."
                            onChange={(e) => {
                              const updated = [...projects];
                              updated[index] = { ...updated[index], thumbnail: e.target.value, image: e.target.value };
                              updateField(['projects'], updated);
                            }}
                            style={{ ...inputStyle, flex: 1 }}
                          />
                          <button
                            type="button"
                            onClick={() => setMediaPickerConfig({
                              isOpen: true,
                              mediaType: 'image',
                              targetPath: ['projects', index, 'thumbnail'],
                            })}
                            style={mediaBtnStyle}
                          >
                            <ImageIcon size={13} /> Pick Image
                          </button>
                        </div>
                      </div>

                      {/* Stacked Side Photos 1 & 2 */}
                      <div style={{ marginTop: '0.65rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                        <div>
                          <label style={labelStyle}>Side Photo 01 (Official Contingent)</label>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={project.sidePhotos?.[0] || ''}
                              placeholder="/images/army/western-command-official.jpg"
                              onChange={(e) => {
                                const updated = [...projects];
                                const currentSides = [...(updated[index].sidePhotos || [])];
                                currentSides[0] = e.target.value;
                                updated[index] = { ...updated[index], sidePhotos: currentSides };
                                updateField(['projects'], updated);
                              }}
                              style={{ ...inputStyle, flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setMediaPickerConfig({
                                isOpen: true,
                                mediaType: 'image',
                                targetPath: ['projects', index, 'sidePhotos', 0],
                              })}
                              style={mediaBtnStyle}
                            >
                              <ImageIcon size={13} /> Pick
                            </button>
                          </div>
                        </div>

                        <div>
                          <label style={labelStyle}>Side Photo 02 (Parade March)</label>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={project.sidePhotos?.[1] || ''}
                              placeholder="/images/army/western-command-2.jpg"
                              onChange={(e) => {
                                const updated = [...projects];
                                const currentSides = [...(updated[index].sidePhotos || [])];
                                currentSides[1] = e.target.value;
                                updated[index] = { ...updated[index], sidePhotos: currentSides };
                                updateField(['projects'], updated);
                              }}
                              style={{ ...inputStyle, flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => setMediaPickerConfig({
                                isOpen: true,
                                mediaType: 'image',
                                targetPath: ['projects', index, 'sidePhotos', 1],
                              })}
                              style={mediaBtnStyle}
                            >
                              <ImageIcon size={13} /> Pick
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. PDF CONTROLS */}
                  {(project.pdfUrl !== undefined || project.pdf !== undefined || isPdfSection || isCarouselSection) && (
                    <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#0369A1', fontWeight: 650, fontSize: '0.78rem' }}>
                          <FileText size={14} /> PDF Document Controls
                        </div>
                        {(project.pdfUrl || project.pdf) && (
                          <a
                            href={`/pdf-viewer?url=${encodeURIComponent(project.pdfUrl || project.pdf)}&title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.subtitle || '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '0.72rem', color: '#0369A1', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                          >
                            Open PDF Viewer <ExternalLink size={11} />
                          </a>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={project.pdfUrl || project.pdf || ''}
                          placeholder="/uploads/...pdf"
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[index] = { ...updated[index], pdfUrl: e.target.value, pdf: e.target.value };
                            updateField(['projects'], updated);
                          }}
                          style={{ ...inputStyle, flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => setMediaPickerConfig({
                            isOpen: true,
                            mediaType: 'pdf',
                            targetPath: ['projects', index, 'pdfUrl'],
                          })}
                          style={mediaBtnStyle}
                        >
                          <FileText size={13} /> Pick PDF
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. LANDSCAPE ARCHIVAL IMAGE CONTROLS (Rezang La style) */}
                  {project.landscapeImage !== undefined && (
                    <div style={{ padding: '0.85rem', backgroundColor: '#FDF8F6', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <label style={labelStyle}>Single Archival Landscape Image</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <input
                          type="text"
                          value={project.landscapeImage || ''}
                          placeholder="/uploads/...jpg"
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[index] = { ...updated[index], landscapeImage: e.target.value };
                            updateField(['projects'], updated);
                          }}
                          style={{ ...inputStyle, flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => setMediaPickerConfig({
                            isOpen: true,
                            mediaType: 'image',
                            targetPath: ['projects', index, 'landscapeImage'],
                          })}
                          style={mediaBtnStyle}
                        >
                          <ImageIcon size={13} /> Pick Image
                        </button>
                      </div>

                      <div>
                        <label style={labelStyle}>Optional Image Click Destination URL</label>
                        <input
                          type="text"
                          value={project.landscapeImageLink || ''}
                          placeholder="e.g. /work or https://..."
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[index] = { ...updated[index], landscapeImageLink: e.target.value };
                            updateField(['projects'], updated);
                          }}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  )}

                  {/* 4. CAROUSEL IMAGES CONTROLS (69 Armoured style) */}
                  {Array.isArray(project.carouselImages) && (
                    <div style={{ padding: '0.85rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 650, fontSize: '0.78rem', color: '#111113' }}>
                          <Layers size={14} /> Publication Carousel Images ({project.carouselImages.length} images)
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const current = [...(project.carouselImages || [])];
                            current.push({
                              id: String(Date.now()),
                              image: '/images/army/69armoured-2.jpg',
                              caption: 'New Archival Photo',
                              enabled: true,
                            });
                            const updated = [...projects];
                            updated[index] = { ...updated[index], carouselImages: current };
                            updateField(['projects'], updated);
                          }}
                          style={mediaBtnStyle}
                        >
                          <Plus size={12} /> Add Carousel Image
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {project.carouselImages.map((cImg: any, cIdx: number) => (
                          <div
                            key={cImg.id || cIdx}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '60px 1fr 1fr auto auto',
                              gap: '0.5rem',
                              alignItems: 'center',
                              padding: '0.45rem',
                              backgroundColor: '#FFFFFF',
                              borderRadius: '6px',
                              border: '1px solid rgba(0,0,0,0.08)',
                            }}
                          >
                            <div style={{ width: 60, height: 40, position: 'relative', borderRadius: 4, overflow: 'hidden', backgroundColor: '#000' }}>
                              {cImg.image && <Image src={cImg.image} alt={cImg.caption || ''} fill style={{ objectFit: 'cover' }} />}
                            </div>
                            <input
                              type="text"
                              value={cImg.caption || ''}
                              placeholder="Caption..."
                              onChange={(e) => {
                                const current = [...project.carouselImages];
                                current[cIdx] = { ...current[cIdx], caption: e.target.value };
                                const updated = [...projects];
                                updated[index] = { ...updated[index], carouselImages: current };
                                updateField(['projects'], updated);
                              }}
                              style={inputStyle}
                            />
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <input
                                type="text"
                                value={cImg.image || ''}
                                placeholder="Image URL..."
                                onChange={(e) => {
                                  const current = [...project.carouselImages];
                                  current[cIdx] = { ...current[cIdx], image: e.target.value };
                                  const updated = [...projects];
                                  updated[index] = { ...updated[index], carouselImages: current };
                                  updateField(['projects'], updated);
                                }}
                                style={{ ...inputStyle, flex: 1 }}
                              />
                              <button
                                type="button"
                                onClick={() => setMediaPickerConfig({
                                  isOpen: true,
                                  mediaType: 'image',
                                  targetPath: ['projects', index, 'carouselImages', cIdx, 'image'],
                                })}
                                style={{ ...mediaBtnStyle, padding: '0 6px' }}
                              >
                                Pick
                              </button>
                            </div>
                            <CmsToggle
                              checked={cImg.enabled !== false}
                              onChange={(val) => {
                                const current = [...project.carouselImages];
                                current[cIdx] = { ...current[cIdx], enabled: val };
                                const updated = [...projects];
                                updated[index] = { ...updated[index], carouselImages: current };
                                updateField(['projects'], updated);
                              }}
                              size="sm"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const current = project.carouselImages.filter((_: any, i: number) => i !== cIdx);
                                const updated = [...projects];
                                updated[index] = { ...updated[index], carouselImages: current };
                                updateField(['projects'], updated);
                              }}
                              style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. INTERACTIVE CARDS CONTROLS (14 Corps style) */}
                  {Array.isArray(project.interactiveCards) && (
                    <div style={{ padding: '0.85rem', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 650, fontSize: '0.78rem', color: '#111113' }}>
                          <Sparkles size={14} /> Interactive Story Cards ({project.interactiveCards.length} cards)
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {project.interactiveCards.map((card: any, cardIdx: number) => (
                          <div
                            key={card.id || cardIdx}
                            style={{
                              padding: '0.65rem',
                              backgroundColor: '#FFFFFF',
                              borderRadius: '6px',
                              border: '1px solid rgba(0,0,0,0.08)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.45rem',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#111113' }}>
                                Card #{cardIdx + 1}: {card.title || 'Untitled'}
                              </span>
                              <CmsToggle
                                checked={card.enabled !== false}
                                onChange={(val) => {
                                  const current = [...project.interactiveCards];
                                  current[cardIdx] = { ...current[cardIdx], enabled: val };
                                  const updated = [...projects];
                                  updated[index] = { ...updated[index], interactiveCards: current };
                                  updateField(['projects'], updated);
                                }}
                                size="sm"
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                              <input
                                type="text"
                                value={card.title || ''}
                                placeholder="Title..."
                                onChange={(e) => {
                                  const current = [...project.interactiveCards];
                                  current[cardIdx] = { ...current[cardIdx], title: e.target.value };
                                  const updated = [...projects];
                                  updated[index] = { ...updated[index], interactiveCards: current };
                                  updateField(['projects'], updated);
                                }}
                                style={inputStyle}
                              />
                              <input
                                type="text"
                                value={card.link || ''}
                                placeholder="Link (e.g. /work/she)..."
                                onChange={(e) => {
                                  const current = [...project.interactiveCards];
                                  current[cardIdx] = { ...current[cardIdx], link: e.target.value };
                                  const updated = [...projects];
                                  updated[index] = { ...updated[index], interactiveCards: current };
                                  updateField(['projects'], updated);
                                }}
                                style={inputStyle}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input
                                type="text"
                                value={card.image || ''}
                                placeholder="Card image URL..."
                                onChange={(e) => {
                                  const current = [...project.interactiveCards];
                                  current[cardIdx] = { ...current[cardIdx], image: e.target.value };
                                  const updated = [...projects];
                                  updated[index] = { ...updated[index], interactiveCards: current };
                                  updateField(['projects'], updated);
                                }}
                                style={{ ...inputStyle, flex: 1 }}
                              />
                              <button
                                type="button"
                                onClick={() => setMediaPickerConfig({
                                  isOpen: true,
                                  mediaType: 'image',
                                  targetPath: ['projects', index, 'interactiveCards', cardIdx, 'image'],
                                })}
                                style={mediaBtnStyle}
                              >
                                Pick
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 6. CASE STUDY & ASSIGNMENT LINK */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr auto', gap: '0.65rem', alignItems: 'flex-end', paddingTop: '0.5rem', borderTop: '1px dashed rgba(0,0,0,0.06)' }}>
                    <div>
                      <label style={labelStyle}>Case Study / Redirection Link</label>
                      <input
                        type="text"
                        value={project.caseStudyUrl || project.redirectionUrl || ''}
                        placeholder="e.g. /work/western-command"
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = { ...updated[index], caseStudyUrl: e.target.value, redirectionUrl: e.target.value };
                          updateField(['projects'], updated);
                        }}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Button Label</label>
                      <input
                        type="text"
                        value={project.caseStudyLabel || 'View case study ↗'}
                        placeholder="View case study ↗"
                        onChange={(e) => {
                          const updated = [...projects];
                          updated[index] = { ...updated[index], caseStudyLabel: e.target.value };
                          updateField(['projects'], updated);
                        }}
                        style={inputStyle}
                      />
                    </div>
                    <CmsToggle
                      label="Link Button"
                      checked={project.caseStudyEnabled !== false}
                      onChange={(val) => {
                        const updated = [...projects];
                        updated[index] = { ...updated[index], caseStudyEnabled: val };
                        updateField(['projects'], updated);
                      }}
                      size="sm"
                    />
                  </div>
                </div>
              </CmsSectionCard>
            );
          })}

          {/* ════════════════════════════════════════════════════════════
              SECTION: CLOSING PANORAMIC BANNER
             ════════════════════════════════════════════════════════════ */}
          {(activeTab === 'all' || activeTab === 'closing') && (
            <CmsSectionCard
              id="closingBanner"
              title="Closing Panoramic Banner"
              subtitle="Full-width sunset horizon photo, institutional statement & contact CTA"
              badge="FOOTER BANNER"
              enabled={armyData.closingBannerEnabled !== false}
              onToggleEnabled={(next) => updateField(['closingBannerEnabled'], next)}
              isCollapsed={collapsedSections['closingBanner']}
              onToggleCollapse={() => toggleCollapse('closingBanner')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div>
                  <label style={labelStyle}>Eyebrow Slogan</label>
                  <input
                    type="text"
                    value={armyData.closingBanner?.eyebrow || ''}
                    placeholder="PEOPLE · PLACES · SACRIFICE · A STRONGER TOMORROW"
                    onChange={(e) => updateField(['closingBanner', 'eyebrow'], e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Headline (Supports line breaks)</label>
                  <textarea
                    rows={2}
                    value={armyData.closingBanner?.heading || ''}
                    placeholder="Documenting\na stronger tomorrow"
                    onChange={(e) => updateField(['closingBanner', 'heading'], e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Description Statement</label>
                  <textarea
                    rows={2}
                    value={armyData.closingBanner?.description || ''}
                    placeholder="Whether covering an investiture, archiving veteran history..."
                    onChange={(e) => updateField(['closingBanner', 'description'], e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                {/* Panoramic Background Photo */}
                <div>
                  <label style={labelStyle}>Panoramic Background Image</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={armyData.closingBanner?.image || ''}
                      placeholder="/uploads/...jpg"
                      onChange={(e) => updateField(['closingBanner', 'image'], e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerConfig({
                        isOpen: true,
                        mediaType: 'image',
                        targetPath: ['closingBanner', 'image'],
                      })}
                      style={mediaBtnStyle}
                    >
                      <ImageIcon size={13} /> Pick Image
                    </button>
                  </div>
                </div>

                {/* CTA Button */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <div>
                    <label style={labelStyle}>Button Label</label>
                    <input
                      type="text"
                      value={armyData.closingBanner?.buttonText || ''}
                      placeholder="Start a conversation"
                      onChange={(e) => updateField(['closingBanner', 'buttonText'], e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Button URL</label>
                    <input
                      type="text"
                      value={armyData.closingBanner?.buttonUrl || ''}
                      placeholder="/contact"
                      onChange={(e) => updateField(['closingBanner', 'buttonUrl'], e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </CmsSectionCard>
          )}

          {/* ════════════════════════════════════════════════════════════
              SECTION SEQUENCE & VISIBILITY CONTROLS (ORDER TAB)
             ════════════════════════════════════════════════════════════ */}
          {activeTab === 'order' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Section Sequence &amp; Visibility Controls
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                  Reorder or toggle visibility for each live army section. Live preview updates instantly.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* Hero */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: armyData.heroEnabled !== false ? '#FFFFFF' : '#FAFAFA',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    opacity: armyData.heroEnabled !== false ? 1 : 0.6,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#71717A', width: '22px' }}>
                      01
                    </span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111113' }}>
                        Hero Banner &amp; Protocol Notice
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#A1A1AA' }}>
                        ID: hero &bull; Type: atmospheric-hero
                      </div>
                    </div>
                  </div>
                  <CmsToggle
                    checked={armyData.heroEnabled !== false}
                    onChange={(val) => updateField(['heroEnabled'], val)}
                    size="sm"
                  />
                </div>

                {/* Project cards in current sequence */}
                {projects.map((p: any, idx: number) => (
                  <div
                    key={p.id || idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: p.published !== false ? '#FFFFFF' : '#FAFAFA',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      opacity: p.published !== false ? 1 : 0.6,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveProject(idx, 'up')}
                          style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                        >
                          <ChevronUp size={14} color={idx === 0 ? '#D4D4D8' : '#71717A'} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === projects.length - 1}
                          onClick={() => moveProject(idx, 'down')}
                          style={{ border: 'none', background: 'transparent', cursor: idx === projects.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                        >
                          <ChevronDown size={14} color={idx === projects.length - 1 ? '#D4D4D8' : '#71717A'} />
                        </button>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#71717A', width: '22px' }}>
                        0{idx + 2}
                      </span>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111113' }}>
                          {p.title || `Project #${idx + 1}`}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#A1A1AA' }}>
                          ID: {p.id} &bull; Formation: {p.command || 'Indian Army'}
                        </div>
                      </div>
                    </div>

                    <CmsToggle
                      checked={p.published !== false}
                      onChange={(val) => {
                        const updated = [...projects];
                        updated[idx] = { ...updated[idx], published: val };
                        updateField(['projects'], updated);
                      }}
                      size="sm"
                    />
                  </div>
                ))}

                {/* Closing Banner */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: armyData.closingBannerEnabled !== false ? '#FFFFFF' : '#FAFAFA',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    opacity: armyData.closingBannerEnabled !== false ? 1 : 0.6,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#71717A', width: '22px' }}>
                      0{projects.length + 2}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111113' }}>
                        Closing Banner CTA &amp; Panoramic Archive
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#A1A1AA' }}>
                        ID: closingBanner &bull; Type: cta-banner
                      </div>
                    </div>
                  </div>
                  <CmsToggle
                    checked={armyData.closingBannerEnabled !== false}
                    onChange={(val) => updateField(['closingBannerEnabled'], val)}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── RIGHT COLUMN: CRM PREVIEW PANEL ─── */}
      <div className="admin-preview-sticky">
        <LivePreviewPanel previewUrl="/indian-army-projects" title="Indian Army Projects" />
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerConfig.isOpen}
        mediaType={mediaPickerConfig.mediaType}
        onClose={() => setMediaPickerConfig((prev) => ({ ...prev, isOpen: false }))}
        onSelect={(selectedUrl) => {
          if (mediaPickerConfig.targetPath.length > 0) {
            updateField(mediaPickerConfig.targetPath, selectedUrl);
          }
          setMediaPickerConfig((prev) => ({ ...prev, isOpen: false }));
        }}
      />

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '850px',
              aspectRatio: '16/9',
              backgroundColor: '#000',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideoModal(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <X size={18} />
            </button>
            {activeVideoModal.includes('youtube') || activeVideoModal.includes('youtu.be') ? (
              <iframe
                src={
                  activeVideoModal.includes('watch?v=')
                    ? `https://www.youtube.com/embed/${activeVideoModal.split('watch?v=')[1]?.split('&')[0]}?autoplay=1`
                    : activeVideoModal
                }
                title="Army Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            ) : (
              <video src={activeVideoModal} controls autoPlay style={{ width: '100%', height: '100%' }} />
            )}
          </div>
        </div>
      )}

      {/* Add New Section Modal */}
      {isAddSectionOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setIsAddSectionOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#111113' }}>
                  Add New Army Section
                </h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#71717A' }}>
                  Select the media type for this new section card:
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddSectionOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#71717A' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => handleAddNewProject('video')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: '#FAFAFA',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Video size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 650, color: '#111113' }}>Video Assignment Section</div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A' }}>Clickable video thumbnail, YouTube/Vimeo embed, protocol coverage</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleAddNewProject('pdf')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: '#FAFAFA',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#E0F2FE', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 650, color: '#111113' }}>PDF Publication &amp; Memorial Section</div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A' }}>PDF document viewer, archival landscape cover, war memorial focus</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleAddNewProject('carousel')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: '#FAFAFA',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#F3E8FF', color: '#7E22CE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 650, color: '#111113' }}>Regiment Publications &amp; Carousel</div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A' }}>Multi-image slideshow carousel, regiment collateral and design</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleAddNewProject('image')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: '#FAFAFA',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#ECFDF5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ImageIcon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 650, color: '#111113' }}>Standard Photographic Section</div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A' }}>High-definition photography, case study assignment link</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete Army Section?"
        message="Are you sure you want to remove this project section from the page? This action will take effect in your Draft."
        confirmLabel="Delete Section"
        isDestructive={true}
        onConfirm={confirmDeleteProject}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
