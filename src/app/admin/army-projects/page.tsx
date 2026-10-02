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
  Film,
  X,
  ExternalLink,
  Play,
  ArrowRight,
  Layers,
  Image as ImageIcon,
  Sliders,
  Sparkles,
} from 'lucide-react';

export default function AdminArmyProjectsPage() {
  const { content, saveDraft, updateDraftInMemory, publishSection } = useCmsContent();
  const [armyData, setArmyData] = useState<any>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('western-command-investiture');
  const [activeTab, setActiveTab] = useState<
    'projects' | 'armyVideos' | 'firefuryCarousel' | 'communicationCards' | 'rezangLaMemorial' | 'hero' | 'closingBanner' | 'pdfViewers'
  >('projects');
  const [savedStatus, setSavedStatus] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const projectGalleryInputRef = useRef<HTMLInputElement>(null);
  const activeProjectGalleryIdxRef = useRef<number>(-1);

  const [mediaPickerConfig, setMediaPickerConfig] = useState<{
    isOpen: boolean;
    mediaType: 'image' | 'video' | 'all';
    target:
      | 'image'
      | 'videoUrl'
      | 'addSidePhoto'
      | { replaceSidePhotoIndex: number }
      | 'bannerImage'
      | 'landscapeImage'
      | 'verticalImage'
      | 'armyVideoThumbnail'
      | 'pdfUrl'
      | 'coffeeTablePdfUrl'
      | 'secondPdfUrl'
      | { cardImageIndex: number }
      | { carouselImageIndex: number }
      | 'addCarouselImage'
      | { galleryImageIndex: number }
      | 'addGalleryImage';
  }>({
    isOpen: false,
    mediaType: 'image',
    target: 'image',
  });

  useEffect(() => {
    if (content['army-projects']) {
      const cloned = JSON.parse(JSON.stringify(content['army-projects']));
      setArmyData(cloned);
    }
  }, [content['army-projects']]);

  if (!armyData) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#71717A' }}>Loading Indian Army Projects...</div>;
  }

  const selectedProject =
    armyData.projects?.find((p: any) => p.id === selectedProjectId) || armyData.projects?.[0];

  // Specific featured projects
  const videoProject = armyData.projects?.find((p: any) => p.id === 'western-command-investiture') || armyData.projects?.[0];
  const commsProject = armyData.projects?.find((p: any) => p.id === '14-corps-communication') || armyData.projects?.[1];
  const firefuryProject = armyData.projects?.find((p: any) => p.id === 'corps-publications') || armyData.projects?.[2];
  const rezangLaProject = armyData.projects?.find((p: any) => p.id === 'rezang-la-memorial') || armyData.projects?.[3];

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
  const handleProjectChange = (field: string, val: any, projectId = selectedProject?.id) => {
    if (!projectId) return;
    const updatedProjects = (armyData.projects || []).map((p: any) =>
      p.id === projectId ? { ...p, [field]: val } : p
    );
    const updated = { ...armyData, projects: updatedProjects };
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  const handleTogglePublished = (id: string) => {
    const updatedProjects = (armyData.projects || []).map((p: any) =>
      p.id === id ? { ...p, published: p.published === false ? true : false } : p
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
      title: 'New Institutional Project',
      subtitle: 'Ceremonial protocol shoot and documentary production.',
      description: 'Detailed description of authorized institutional shoot direction.',
      category: 'Institutional Media',
      layoutStyle: 'layout-1',
      videoUrl: '',
      image: '/images/army/army-hero.jpg',
      landscapeImage: '',
      verticalImage: '',
      sidePhotos: [],
      published: true,
    };
    const updated = {
      ...armyData,
      projects: [...(armyData.projects || []), newProj],
    };
    setArmyData(updated);
    setSelectedProjectId(newId);
    setActiveTab('projects');
    updateDraftInMemory('army-projects', updated);
    showToast('New project added — fill in the details below.', 'info');
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
    showToast('Project deleted successfully.', 'success');
  };

  const handleRemoveSidePhoto = (index: number) => {
    if (!selectedProject) return;
    const existing = [...(selectedProject.sidePhotos || [])];
    existing.splice(index, 1);
    handleProjectChange('sidePhotos', existing);
  };

  const handleProjectDirectUpload = async (file: File, type: 'gallery' | 'image' | 'vertical' | 'landscape') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        if (type === 'gallery') {
          const idx = activeProjectGalleryIdxRef.current;
          if (idx >= 0 && selectedProject?.gallery?.[idx]) {
            const updated = [...(selectedProject.gallery || [])];
            updated[idx].image = data.url;
            handleProjectChange('gallery', updated);
          } else {
            const updated = [...(selectedProject?.gallery || []), { image: data.url, caption: '', enabled: true }];
            handleProjectChange('gallery', updated);
          }
        } else if (type === 'image') {
          handleProjectChange('image', data.url);
        } else if (type === 'vertical') {
          handleProjectChange('verticalImage', data.url);
        } else if (type === 'landscape') {
          handleProjectChange('landscapeImage', data.url);
        }
        showToast('Image uploaded successfully!', 'success');
      } else {
        showToast(data.error || 'Upload failed', 'error');
      }
    } catch {
      showToast('Error uploading file', 'error');
    }
  };

  const handleCreateCaseStudyForProject = (proj: any) => {
    if (!proj) return;
    const slug = proj.slug || proj.id;
    const workData = content.work ? JSON.parse(JSON.stringify(content.work)) : { caseStudies: [] };
    const existing = (workData.caseStudies || []).find((c: any) => c.slug === slug || c.id === slug);

    if (!existing) {
      const newCase = {
        id: slug,
        slug: slug,
        title: proj.title || 'Indian Army Project',
        subtitle: proj.subtitle || proj.description || '',
        category: 'Institutional',
        tags: [proj.command || '14 Corps', 'Institutional'],
        image: proj.image || proj.landscapeImage || '/images/army/army-hero.jpg',
        heroImage: proj.image || proj.landscapeImage || '/images/army/army-hero.jpg',
        layoutStyle: proj.layoutStyle || 'layout-1',
        published: true,
        isClickable: true,
        challenge: proj.challenge || proj.description || '',
        whatWeDid: proj.whatWeDid || '',
        theResult: proj.theResult || '',
        gallery: proj.gallery || (proj.sidePhotos ? proj.sidePhotos.map((p: string) => ({ image: p, caption: '' })) : []),
        closingQuote: proj.closingQuote || '',
        caseStudyBtnText: proj.caseStudyLabel || 'View case study ↗',
      };
      workData.caseStudies = [...(workData.caseStudies || []), newCase];
      updateDraftInMemory('work', workData);
      saveDraft('work', workData);
    }

    handleProjectChange('caseStudyUrl', `/work/${slug}`);
    handleProjectChange('caseStudyEnabled', true);
    showToast(`Case study created & linked: /work/${slug}`, 'success');
  };

  const handleSave = async () => {
    const ok = await saveDraft('army-projects', armyData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2500);
      showToast('Draft saved successfully.', 'success');
    } else {
      showToast('Failed to save draft. Please retry.', 'error');
    }
  };

  const handlePublish = async () => {
    const ok = await publishSection('army-projects', armyData);
    if (ok) {
      showToast('Army Projects published live!', 'success');
    } else {
      showToast('Publish failed. Please retry.', 'error');
    }
  };

  const updateField = (path: string[], value: any) => {
    const updated = JSON.parse(JSON.stringify(armyData));
    let node: any = updated;
    for (let i = 0; i < path.length - 1; i++) {
      if (node[path[i]] === undefined) node[path[i]] = {};
      node = node[path[i]];
    }
    node[path[path.length - 1]] = value;
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.55rem 0.85rem',
    borderRadius: '6px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    fontSize: '0.82rem',
    backgroundColor: '#FFFFFF',
    color: '#111113',
    outline: 'none',
  };

  const hasProjectVideo = Boolean(selectedProject?.videoUrl && selectedProject.videoUrl.trim() !== '');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '1.25rem', height: 'calc(100vh - 120px)' }}>
      {/* ── TOAST NOTIFICATION ── */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 9999,
            padding: '0.85rem 1.35rem',
            borderRadius: '8px',
            backgroundColor: toast.type === 'success' ? '#15803D' : toast.type === 'error' ? '#DC2626' : '#2563EB',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'slideIn 0.25s ease',
          }}
        >
          {toast.type === 'success' ? <Check size={14} /> : <X size={14} />}
          {toast.msg}
        </div>
      )}
      {/* ─── LEFT COLUMN: ARMY PROJECTS & SECTION MANAGERS ─── */}
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
            padding: '1rem 1.25rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#111113' }}>
              Indian Army Projects &amp; Work
            </h2>
            <div style={{ fontSize: '0.75rem', color: '#71717A', marginTop: '2px' }}>
              Verified assignments, videos, carousels, cards &amp; media layouts.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleAddNewProject}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid #FECACA',
                backgroundColor: '#FEF2F2',
                color: '#DE322D',
                fontSize: '0.78rem',
                fontWeight: 650,
                cursor: 'pointer',
              }}
            >
              <Plus size={14} />
              New Project
            </button>

            <button
              type="button"
              onClick={handleSave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '6px',
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
              {savedStatus ? 'Draft Saved!' : 'Save Draft'}
            </button>

            <button
              type="button"
              onClick={handlePublish}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ExternalLink size={14} />
              Publish Live
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.2rem',
            padding: '0.4rem 0.75rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#F4F4F5',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'projects', label: `Projects Directory (${armyData.projects?.length || 0})` },
            { id: 'armyVideos', label: '11. Army Videos' },
            { id: 'firefuryCarousel', label: '12. Firefury Carousel' },
            { id: 'communicationCards', label: '13. 3 Interactive Cards' },
            { id: 'rezangLaMemorial', label: '14. Rezang La Memorial' },
            { id: 'hero', label: 'Page Hero' },
            { id: 'closingBanner', label: 'Closing Banner' },
            { id: 'pdfViewers', label: '15. PDF Viewers (CMS)' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.76rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#111113' : '#71717A',
                  background: active ? '#FFFFFF' : 'transparent',
                  border: active ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid transparent',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── TAB 1: ALL PROJECTS DIRECTORY & NEW PROJECT CREATION ─── */}
        {activeTab === 'projects' && (
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', flex: 1, overflow: 'hidden' }}>
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
                      {p.category || p.command || 'Institutional'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub-Editor for Selected Project */}
            {selectedProject && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {/* Project Header Bar */}
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

                {/* 1. COMMAND / FORMATION & LOCATION */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      COMMAND / FORMATION
                    </label>
                    <input
                      type="text"
                      value={selectedProject.command || ''}
                      onChange={(e) => handleProjectChange('command', e.target.value)}
                      placeholder="e.g. WESTERN COMMAND or 14 CORPS HEADQUARTERS"
                      style={inputStyle}
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
                      placeholder="e.g. HQ Western Command or Ladakh"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* 2. PROJECT TITLE & TIMELINE */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                      PROJECT TITLE
                    </label>
                    <input
                      type="text"
                      value={selectedProject.title || ''}
                      onChange={(e) => handleProjectChange('title', e.target.value)}
                      placeholder="e.g. Investiture Ceremony"
                      style={inputStyle}
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
                      placeholder="e.g. February 2026 or Ongoing"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* 3. CATEGORY (STRICTLY NORMAL TEXT FIELD, NOT A DROPDOWN) */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                      CATEGORY (TEXT FIELD)
                    </label>
                    <span style={{ fontSize: '0.68rem', color: '#71717A', fontStyle: 'italic' }}>
                      Normal text field — no restrictive dropdowns
                    </span>
                  </div>
                  <input
                    type="text"
                    value={selectedProject.category || ''}
                    onChange={(e) => handleProjectChange('category', e.target.value)}
                    placeholder="Enter custom category name (e.g. Western Command, 14 Corps, Border Initiatives)"
                    style={inputStyle}
                  />
                </div>

                {/* 4. BRIEF SUBTITLE */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    BRIEF SUBTITLE
                  </label>
                  <input
                    type="text"
                    value={selectedProject.subtitle || ''}
                    onChange={(e) => handleProjectChange('subtitle', e.target.value)}
                    placeholder="e.g. Shoot · Production · Post-production"
                    style={inputStyle}
                  />
                </div>

                {/* 5. DESCRIPTION */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={3}
                    value={selectedProject.description || ''}
                    onChange={(e) => handleProjectChange('description', e.target.value)}
                    placeholder="Provide detailed description of the project brief, narrative, and execution..."
                    style={inputStyle}
                  />
                </div>

                {/* 5B. PDF DOCUMENT URL */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    PDF DOCUMENT URL (Opens in Reusable Website PDF Viewer)
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={selectedProject.pdfUrl || ''}
                      onChange={(e) => handleProjectChange('pdfUrl', e.target.value)}
                      placeholder="e.g. /pdf/69-armoured-regiment.pdf or https://..."
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setMediaPickerConfig({
                          isOpen: true,
                          mediaType: 'all',
                          target: 'pdfUrl',
                        })
                      }
                      style={{
                        padding: '0.5rem 0.85rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(0,0,0,0.15)',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        fontSize: '0.76rem',
                        fontWeight: 650,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Upload / Pick PDF
                    </button>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#71717A', marginTop: '2px', display: 'block' }}>
                    Configures the PDF document displayed when visitors click &ldquo;View PDF&rdquo; on this project.
                  </span>
                </div>

                {/* 6. CLICKABLE CASE STUDY FLOW & ACTIONS */}
                <div style={{ padding: '1rem', backgroundColor: '#FDF4FF', borderRadius: '10px', border: '1px solid rgba(192, 38, 211, 0.2)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ExternalLink size={15} color="#A21CAF" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A21CAF', letterSpacing: '0.04em' }}>
                        CASE STUDY CLICKABLE &amp; DIRECT LINK
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {selectedProject.caseStudyUrl && (
                        <a
                          href={selectedProject.caseStudyUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 9px',
                            borderRadius: '4px',
                            border: '1px solid rgba(162, 28, 175, 0.3)',
                            backgroundColor: '#FFFFFF',
                            color: '#A21CAF',
                            fontSize: '0.7rem',
                            fontWeight: 650,
                            textDecoration: 'none',
                          }}
                        >
                          View Case Study <ExternalLink size={11} />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCreateCaseStudyForProject(selectedProject)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 9px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: '#9333EA',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 650,
                          cursor: 'pointer',
                        }}
                      >
                        <Plus size={12} />
                        Create New Case Study
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const cur = selectedProject.caseStudyEnabled !== false && Boolean(selectedProject.caseStudyUrl);
                          handleProjectChange('caseStudyEnabled', !cur);
                          showToast(!cur ? 'Case study redirection enabled' : 'Case study redirection disabled', 'info');
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: (selectedProject.caseStudyEnabled !== false && Boolean(selectedProject.caseStudyUrl)) ? '#F0FDF4' : '#FEE2E2',
                          color: (selectedProject.caseStudyEnabled !== false && Boolean(selectedProject.caseStudyUrl)) ? '#15803D' : '#DC2626',
                          fontSize: '0.7rem',
                          fontWeight: 650,
                          cursor: 'pointer',
                        }}
                      >
                        {(selectedProject.caseStudyEnabled !== false && Boolean(selectedProject.caseStudyUrl)) ? <Eye size={11} /> : <EyeOff size={11} />}
                        {(selectedProject.caseStudyEnabled !== false && Boolean(selectedProject.caseStudyUrl)) ? 'Case Study Active' : 'Case Study Disabled'}
                      </button>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#701A75', lineHeight: 1.4 }}>
                    When enabled, renders a clickable "View case study ↗" button and card link like on the Work page, redirecting visitors directly to the detailed case study page.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                        PRESET CASE STUDY
                      </label>
                      <select
                        value={selectedProject.caseStudyUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleProjectChange('caseStudyUrl', val);
                          if (val) handleProjectChange('caseStudyEnabled', true);
                          showToast(val ? `Selected: ${val}` : 'Case study cleared', 'info');
                        }}
                        style={{ ...inputStyle, fontSize: '0.78rem', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                      >
                        <option value="">-- No Case Study Attached --</option>
                        <option value="/work/she">Project SHE (Sadbhavana &amp; Women's Health) — /work/she</option>
                        <option value={`/work/${selectedProject.slug || selectedProject.id}`}>Custom: /work/{selectedProject.slug || selectedProject.id}</option>
                        <option value="/work/raysons-group">Raysons Group — /work/raysons-group</option>
                        <option value="/work/picturetime">PictureTime Cinema — /work/picturetime</option>
                        <option value="/work/loom-crafts">Loom Crafts — /work/loom-crafts</option>
                        <option value="/work/misu">Misu Pan-Asian Dining — /work/misu</option>
                        <option value="/work/rr-skins">RR Skins Dermatology — /work/rr-skins</option>
                        <option value="/work/ladakh-football-association">Ladakh Football Association — /work/ladakh-football-association</option>
                        <option value="/work/save-changthang">Save Changthang — /work/save-changthang</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                        BUTTON LABEL
                      </label>
                      <input
                        type="text"
                        value={selectedProject.caseStudyLabel || 'View case study ↗'}
                        onChange={(e) => handleProjectChange('caseStudyLabel', e.target.value)}
                        placeholder="View case study ↗"
                        style={{ ...inputStyle, fontSize: '0.78rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                      CUSTOM REDIRECTION URL (INTERNAL OR EXTERNAL)
                    </label>
                    <div style={{ display: 'flex', gap: '0.45rem' }}>
                      <input
                        type="text"
                        value={selectedProject.caseStudyUrl || ''}
                        onChange={(e) => {
                          handleProjectChange('caseStudyUrl', e.target.value);
                          if (e.target.value) handleProjectChange('caseStudyEnabled', true);
                        }}
                        placeholder="e.g. /work/she or /work/your-slug"
                        style={{ ...inputStyle, flex: 1, fontSize: '0.78rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 03 NARRATIVE & APPROACH */}
                <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                        03 NARRATIVE &amp; APPROACH
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                        Configure the narrative breakdown for this project case study.
                      </div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.74rem', fontWeight: 650, color: selectedProject.showNarrative !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedProject.showNarrative !== false}
                        onChange={(e) => handleProjectChange('showNarrative', e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: '#16A34A', cursor: 'pointer' }}
                      />
                      <span>{selectedProject.showNarrative !== false ? 'Section: Enabled' : 'Section: Disabled'}</span>
                    </label>
                  </div>

                  {/* 1. THE CHALLENGE */}
                  <div style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B' }}>
                        1. THE CHALLENGE (PROBLEM CONTEXT)
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <button
                          type="button"
                          onClick={() => handleProjectChange('challenge', '')}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Trash2 size={12} /> Clear Challenge
                        </button>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedProject.showChallenge !== false ? '#16A34A' : '#71717A' }}>
                          <input
                            type="checkbox"
                            checked={selectedProject.showChallenge !== false}
                            onChange={(e) => handleProjectChange('showChallenge', e.target.checked)}
                            style={{ width: '14px', height: '14px', accentColor: '#16A34A' }}
                          />
                          <span>{selectedProject.showChallenge !== false ? 'Visible' : 'Hidden'}</span>
                        </label>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={selectedProject.challenge || ''}
                      onChange={(e) => handleProjectChange('challenge', e.target.value)}
                      placeholder="Initial challenge context, operational terrain, institutional protocol brief..."
                      style={inputStyle}
                    />
                  </div>

                  {/* 2. CREATIVE APPROACH / WHAT WE DID */}
                  <div style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B' }}>
                        2. CREATIVE APPROACH / WHAT WE DID
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <button
                          type="button"
                          onClick={() => handleProjectChange('whatWeDid', '')}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Trash2 size={12} /> Clear Approach
                        </button>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedProject.showWhatWeDid !== false ? '#16A34A' : '#71717A' }}>
                          <input
                            type="checkbox"
                            checked={selectedProject.showWhatWeDid !== false}
                            onChange={(e) => handleProjectChange('showWhatWeDid', e.target.checked)}
                            style={{ width: '14px', height: '14px', accentColor: '#16A34A' }}
                          />
                          <span>{selectedProject.showWhatWeDid !== false ? 'Visible' : 'Hidden'}</span>
                        </label>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={selectedProject.whatWeDid || ''}
                      onChange={(e) => handleProjectChange('whatWeDid', e.target.value)}
                      placeholder="Strategic shoot plan, alpine cinematography, ceremonial protocols documented..."
                      style={inputStyle}
                    />
                  </div>

                  {/* 3. OUTCOME / THE RESULT */}
                  <div style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B' }}>
                        3. EXECUTION DISCIPLINE / THE RESULT
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <button
                          type="button"
                          onClick={() => handleProjectChange('theResult', '')}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Trash2 size={12} /> Clear Result
                        </button>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedProject.showResult !== false ? '#16A34A' : '#71717A' }}>
                          <input
                            type="checkbox"
                            checked={selectedProject.showResult !== false}
                            onChange={(e) => handleProjectChange('showResult', e.target.checked)}
                            style={{ width: '14px', height: '14px', accentColor: '#16A34A' }}
                          />
                          <span>{selectedProject.showResult !== false ? 'Visible' : 'Hidden'}</span>
                        </label>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={selectedProject.theResult || ''}
                      onChange={(e) => handleProjectChange('theResult', e.target.value)}
                      placeholder="Authorized archives delivered, high-retention public release, command documentation..."
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* 04 VISUAL GALLERY */}
                <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                        04 VISUAL GALLERY ({(selectedProject.gallery || []).length} Assets)
                      </span>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, color: selectedProject.galleryEnabled !== false ? '#16A34A' : '#71717A' }}>
                        <input
                          type="checkbox"
                          checked={selectedProject.galleryEnabled !== false}
                          onChange={(e) => handleProjectChange('galleryEnabled', e.target.checked)}
                          style={{ width: '15px', height: '15px', accentColor: '#16A34A' }}
                        />
                        <span>{selectedProject.galleryEnabled !== false ? 'Gallery: Enabled' : 'Gallery: Disabled'}</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const existing = [...(selectedProject.gallery || [])];
                        existing.push({ image: '/images/army/army-hero.jpg', caption: 'Archival Still', enabled: true });
                        handleProjectChange('gallery', existing);
                      }}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      + Add Media Asset
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {(selectedProject.gallery || []).map((item: any, gIdx: number) => (
                      <div key={gIdx} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: item.enabled !== false ? '#FFFFFF' : '#F1F5F9', alignItems: 'center' }}>
                        <div style={{ width: '70px', height: '52px', position: 'relative', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#E2E8F0', flexShrink: 0 }}>
                          {item.image ? <Image src={item.image} alt="" fill style={{ objectFit: 'cover' }} /> : null}
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                            <input
                              type="text"
                              value={item.image || ''}
                              onChange={(e) => {
                                const g = [...(selectedProject.gallery || [])];
                                g[gIdx] = { ...g[gIdx], image: e.target.value };
                                handleProjectChange('gallery', g);
                              }}
                              placeholder="Image URL (/images/... or https://...)"
                              style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.75rem', flex: 1 }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                activeProjectGalleryIdxRef.current = gIdx;
                                projectGalleryInputRef.current?.click();
                              }}
                              style={{ padding: '0.35rem 0.65rem', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.72rem', cursor: 'pointer' }}
                            >
                              Upload
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setMediaPickerConfig({
                                  isOpen: true,
                                  mediaType: 'image',
                                  target: { galleryImageIndex: gIdx },
                                })
                              }
                              style={{ padding: '0.35rem 0.65rem', borderRadius: '4px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontSize: '0.72rem', cursor: 'pointer' }}
                            >
                              Pick
                            </button>
                          </div>
                          <input
                            type="text"
                            value={item.caption || ''}
                            onChange={(e) => {
                              const g = [...(selectedProject.gallery || [])];
                              g[gIdx] = { ...g[gIdx], caption: e.target.value };
                              handleProjectChange('gallery', g);
                            }}
                            placeholder="Caption / description text..."
                            style={{ ...inputStyle, padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
                          <button
                            type="button"
                            title={item.enabled !== false ? 'Hide image' : 'Show image'}
                            onClick={() => {
                              const g = [...(selectedProject.gallery || [])];
                              g[gIdx] = { ...g[gIdx], enabled: g[gIdx].enabled === false ? true : false };
                              handleProjectChange('gallery', g);
                            }}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: item.enabled !== false ? '#16A34A' : '#94A3B8' }}
                          >
                            {item.enabled !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                          <button
                            type="button"
                            title="Delete image"
                            onClick={() => {
                              const g = (selectedProject.gallery || []).filter((_: any, idx: number) => idx !== gIdx);
                              handleProjectChange('gallery', g);
                            }}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 05 OUTCOMES & QUOTE */}
                <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                        05 OUTCOMES &amp; QUOTE
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                        Configure the verified outcome statement, metrics note, and closing quote.
                      </div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.74rem', fontWeight: 650, color: selectedProject.showOutcomes !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedProject.showOutcomes !== false}
                        onChange={(e) => handleProjectChange('showOutcomes', e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: '#16A34A', cursor: 'pointer' }}
                      />
                      <span>{selectedProject.showOutcomes !== false ? 'Section: Enabled' : 'Section: Disabled'}</span>
                    </label>
                  </div>

                  {/* VERIFIED OUTCOMES STATEMENT */}
                  <div style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B' }}>
                        VERIFIED OUTCOMES STATEMENT
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <button
                          type="button"
                          onClick={() => handleProjectChange('proofText', '')}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Trash2 size={12} /> Clear Statement
                        </button>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedProject.showProof !== false ? '#16A34A' : '#71717A' }}>
                          <input
                            type="checkbox"
                            checked={selectedProject.showProof !== false}
                            onChange={(e) => handleProjectChange('showProof', e.target.checked)}
                            style={{ width: '14px', height: '14px', accentColor: '#16A34A' }}
                          />
                          <span>{selectedProject.showProof !== false ? 'Visible' : 'Hidden'}</span>
                        </label>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={selectedProject.proofText || ''}
                      onChange={(e) => handleProjectChange('proofText', e.target.value)}
                      placeholder="e.g. Delivered 14 high-altitude documentary features across two military commands with zero security clearance delays..."
                      style={inputStyle}
                    />
                  </div>

                  {/* METRICS NOTE */}
                  <div style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B' }}>
                        METRICS / HIGHLIGHTS NOTE
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <button
                          type="button"
                          onClick={() => handleProjectChange('metricsNote', '')}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Trash2 size={12} /> Clear Metrics
                        </button>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedProject.showMetrics !== false ? '#16A34A' : '#71717A' }}>
                          <input
                            type="checkbox"
                            checked={selectedProject.showMetrics !== false}
                            onChange={(e) => handleProjectChange('showMetrics', e.target.checked)}
                            style={{ width: '14px', height: '14px', accentColor: '#16A34A' }}
                          />
                          <span>{selectedProject.showMetrics !== false ? 'Visible' : 'Hidden'}</span>
                        </label>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={selectedProject.metricsNote || ''}
                      onChange={(e) => handleProjectChange('metricsNote', e.target.value)}
                      placeholder="e.g. 2 Commands · 14 Production Assets · 100% Retainer Retention"
                      style={inputStyle}
                    />
                  </div>

                  {/* CLOSING QUOTE */}
                  <div style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B' }}>
                        CLOSING QUOTE / TESTIMONIAL
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <button
                          type="button"
                          onClick={() => handleProjectChange('closingQuote', '')}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Trash2 size={12} /> Clear Quote
                        </button>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedProject.showClosingQuote !== false ? '#16A34A' : '#71717A' }}>
                          <input
                            type="checkbox"
                            checked={selectedProject.showClosingQuote !== false}
                            onChange={(e) => handleProjectChange('showClosingQuote', e.target.checked)}
                            style={{ width: '14px', height: '14px', accentColor: '#16A34A' }}
                          />
                          <span>{selectedProject.showClosingQuote !== false ? 'Visible' : 'Hidden'}</span>
                        </label>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={selectedProject.closingQuote || ''}
                      onChange={(e) => handleProjectChange('closingQuote', e.target.value)}
                      placeholder="e.g. Long-term institutional trust is built on quiet operational precision..."
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* 7. IMAGE LAYOUT STYLE SELECTOR */}
                <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.35rem' }}>
                    IMAGE LAYOUT STYLE
                  </label>
                  <select
                    value={hasProjectVideo ? 'rezang-la' : (selectedProject.layoutStyle || 'layout-1')}
                    disabled={hasProjectVideo}
                    onChange={(e) => handleProjectChange('layoutStyle', e.target.value)}
                    style={{
                      ...inputStyle,
                      fontWeight: 600,
                      backgroundColor: hasProjectVideo ? '#F1F5F9' : '#FFFFFF',
                      cursor: hasProjectVideo ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <option value="layout-1">Layout 1 — Classic Editorial (Primary Hero + Horizontal Stills)</option>
                    <option value="layout-2">Layout 2 — Split Gallery (Wide banner + side mosaic)</option>
                    <option value="layout-3">Layout 3 — Panoramic Spread (Full-width cinema visual)</option>
                    <option value="rezang-la">Rezang La Style (Dual Media: 1 Vertical Image + 1 Landscape Image)</option>
                  </select>
                  {hasProjectVideo ? (
                    <div style={{ fontSize: '0.72rem', color: '#DE322D', marginTop: '0.4rem', fontWeight: 600 }}>
                      ⚡ Rezang La Style is automatically enforced because a Project Video URL is configured.
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.35rem' }}>
                      Choose how photos and visual assets are arranged when no video is attached.
                    </div>
                  )}
                </div>

                {/* 7. PROJECT VIDEO (YOUTUBE / VIDEO URL) */}
                <div style={{ padding: '1rem', backgroundColor: '#FDF8F6', borderRadius: '10px', border: '1px solid rgba(222, 50, 45, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Film size={15} color="#DE322D" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.04em' }}>
                        PROJECT VIDEO (YOUTUBE / VIDEO URL)
                      </span>
                    </div>
                    {hasProjectVideo && (
                      <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#DCFCE7', color: '#16A34A', fontWeight: 700 }}>
                        Video Active
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A', marginBottom: '0.65rem', lineHeight: 1.4 }}>
                    Enter a YouTube link (e.g. <code>https://youtu.be/...</code>) or MP4 URL. If added, the Rezang La dual media layout will be enforced.
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="e.g. https://www.youtube.com/watch?v=ScMzIvxBSi4 or /videos/project.mp4"
                      value={selectedProject.videoUrl || ''}
                      onChange={(e) => handleProjectChange('videoUrl', e.target.value)}
                      style={{ flex: 1, ...inputStyle }}
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
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Pick Video
                    </button>
                    {hasProjectVideo && (
                      <button
                        type="button"
                        onClick={() => handleProjectChange('videoUrl', '')}
                        style={{
                          padding: '0.45rem 0.65rem',
                          borderRadius: '6px',
                          border: '1px solid #FECACA',
                          backgroundColor: '#FEF2F2',
                          color: '#DE322D',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {hasProjectVideo && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.45rem 0.65rem', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <Play size={13} color="#DE322D" />
                      <span style={{ fontSize: '0.72rem', color: '#18181B', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {selectedProject.videoUrl}
                      </span>
                      <a
                        href={selectedProject.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: '#DE322D', textDecoration: 'none', fontWeight: 600 }}
                      >
                        Open <ExternalLink size={11} />
                      </a>
                    </div>
                  )}
                </div>

                {/* 8. MEDIA CONTROLS — REZANG LA VIDEO LAYOUT OR STANDARD LAYOUT */}
                {hasProjectVideo ? (
                  /* ENFORCED REZANG LA DUAL MEDIA LAYOUT */
                  <div style={{ padding: '1rem', backgroundColor: '#FEF2F2', borderRadius: '10px', border: '1px solid #FECACA' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.35rem' }}>
                      <Layers size={15} color="#DE322D" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991B1B' }}>
                        REZANG LA IMAGE LAYOUT (ENFORCED FOR VIDEO)
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#7F1D1D', marginBottom: '1rem', lineHeight: 1.4 }}>
                      As required: Projects with a video use exactly <strong>1 Landscape Image</strong> (which acts as the video thumbnail with the clickable play/arrow button) and <strong>1 Vertical Image</strong> placed beside it.
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {/* 1 Landscape Image (Video Thumbnail) */}
                      <div style={{ padding: '0.85rem', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#111113', marginBottom: '0.25rem' }}>
                          1. LANDSCAPE IMAGE (VIDEO THUMBNAIL)
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#71717A', marginBottom: '0.5rem' }}>
                          Displays video play button &amp; launches player on click.
                        </div>

                        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#000', marginBottom: '0.5rem' }}>
                          {selectedProject.landscapeImage || selectedProject.thumbnail || selectedProject.image ? (
                            <Image
                              src={selectedProject.landscapeImage || selectedProject.thumbnail || selectedProject.image}
                              alt="Landscape Thumbnail"
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '0.72rem' }}>
                              No Landscape Image
                            </div>
                          )}
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '9999px', backgroundColor: '#DE322D', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Play size={16} fill="#fff" />
                            </div>
                          </div>
                        </div>

                        <input
                          type="text"
                          value={selectedProject.landscapeImage || selectedProject.thumbnail || selectedProject.image || ''}
                          onChange={(e) => {
                            handleProjectChange('landscapeImage', e.target.value);
                            handleProjectChange('thumbnail', e.target.value);
                            handleProjectChange('image', e.target.value);
                          }}
                          placeholder="/uploads/... or https://..."
                          style={{ ...inputStyle, marginBottom: '0.4rem' }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setMediaPickerConfig({
                              isOpen: true,
                              mediaType: 'image',
                              target: 'landscapeImage',
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '0.45rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            backgroundColor: '#F8FAFC',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Pick Landscape Image
                        </button>
                      </div>

                      {/* 1 Vertical Image */}
                      <div style={{ padding: '0.85rem', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#111113', marginBottom: '0.25rem' }}>
                          2. VERTICAL IMAGE
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#71717A', marginBottom: '0.5rem' }}>
                          Displays adjacent vertical still according to Rezang La layout.
                        </div>

                        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#000', marginBottom: '0.5rem' }}>
                          {selectedProject.verticalImage || selectedProject.sidePhotos?.[0] ? (
                            <Image
                              src={selectedProject.verticalImage || selectedProject.sidePhotos?.[0]}
                              alt="Vertical Still"
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '0.72rem' }}>
                              No Vertical Image
                            </div>
                          )}
                        </div>

                        <input
                          type="text"
                          value={selectedProject.verticalImage || selectedProject.sidePhotos?.[0] || ''}
                          onChange={(e) => {
                            handleProjectChange('verticalImage', e.target.value);
                            const updatedSides = [e.target.value, ...(selectedProject.sidePhotos?.slice(1) || [])];
                            handleProjectChange('sidePhotos', updatedSides);
                          }}
                          placeholder="/uploads/... or https://..."
                          style={{ ...inputStyle, marginBottom: '0.4rem' }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setMediaPickerConfig({
                              isOpen: true,
                              mediaType: 'image',
                              target: 'verticalImage',
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '0.45rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            backgroundColor: '#F8FAFC',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Pick Vertical Image
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* NORMAL PROJECT IMAGES (PRIMARY + SIDE PHOTOS) */
                  <>
                    {/* Primary Photo */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                        PRIMARY PROJECT PHOTO
                      </label>
                      <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                        <div
                          style={{
                            position: 'relative',
                            width: '100px',
                            height: '75px',
                            borderRadius: '6px',
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
                          <input
                            type="text"
                            placeholder="/images/army/... or https://..."
                            value={selectedProject.image || ''}
                            onChange={(e) => handleProjectChange('image', e.target.value)}
                            style={{ ...inputStyle, marginBottom: '0.4rem' }}
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
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              border: '1px solid rgba(0, 0, 0, 0.15)',
                              backgroundColor: '#FFFFFF',
                              color: '#111113',
                              fontSize: '0.76rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Pick Image
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Side Photos */}
                    <div style={{ padding: '0.9rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#1E293B' }}>
                            ADDITIONAL GALLERY STILLS &amp; PHOTOS
                          </span>
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
                        <div style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px dashed rgba(0, 0, 0, 0.15)', color: '#94A3B8', fontSize: '0.74rem' }}>
                          No additional stills added. Click &quot;Add Photo&quot; to pick from Media Library.
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.65rem' }}>
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
                              <button
                                type="button"
                                onClick={() => handleRemoveSidePhoto(pIdx)}
                                title="Delete photo"
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  right: '4px',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '4px',
                                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                }}
                              >
                                <X size={11} />
                              </button>
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
                                  fontSize: '0.62rem',
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
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: ARMY RELATED VIDEOS (SECTION 11) ─── */}
        {activeTab === 'armyVideos' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '0.85rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#991B1B' }}>
                11. Army Related Videos Section
              </div>
              <div style={{ fontSize: '0.73rem', color: '#7F1D1D', marginTop: '3px', lineHeight: 1.4 }}>
                Configure video URL, clickable thumbnail, redirection link, and play/arrow button for institutional video assignments.
              </div>
            </div>

            {videoProject && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 650, color: '#1E293B' }}>
                    Enable / Display Video Section on Website
                  </span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', fontWeight: 600, color: videoProject.published !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={videoProject.published !== false}
                      onChange={(e) => handleProjectChange('published', e.target.checked, videoProject.id)}
                      style={{ width: '16px', height: '16px', accentColor: '#16A34A' }}
                    />
                    <span>{videoProject.published !== false ? 'Enabled' : 'Disabled'}</span>
                  </label>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    VIDEO / LINK URL (YOUTUBE / DIRECT VIDEO)
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={videoProject.videoUrl || ''}
                      onChange={(e) => handleProjectChange('videoUrl', e.target.value, videoProject.id)}
                      placeholder="e.g. https://www.youtube.com/watch?v=ScMzIvxBSi4"
                      style={{ ...inputStyle, flex: 1 }}
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
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Pick Video
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    CLICKABLE THUMBNAIL IMAGE (OPENS VIDEO LIGHTBOX)
                  </label>
                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '120px', height: '80px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#000', flexShrink: 0 }}>
                      <Image
                        src={videoProject.thumbnail || videoProject.image || '/images/army/western-command-1.jpg'}
                        alt="Thumbnail"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '9999px', backgroundColor: '#DE322D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          <Play size={14} fill="#fff" />
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        value={videoProject.thumbnail || videoProject.image || ''}
                        onChange={(e) => {
                          handleProjectChange('thumbnail', e.target.value, videoProject.id);
                          handleProjectChange('image', e.target.value, videoProject.id);
                        }}
                        style={{ ...inputStyle, marginBottom: '0.4rem' }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setMediaPickerConfig({
                            isOpen: true,
                            mediaType: 'image',
                            target: 'armyVideoThumbnail',
                          })
                        }
                        style={{
                          padding: '0.4rem 0.85rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(0, 0, 0, 0.15)',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Upload / Replace Thumbnail
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    REDIRECTION LINK (OPTIONAL EXTERNAL OR WORK LINK)
                  </label>
                  <input
                    type="text"
                    value={videoProject.redirectionUrl || ''}
                    onChange={(e) => handleProjectChange('redirectionUrl', e.target.value, videoProject.id)}
                    placeholder="e.g. /work or https://..."
                    style={inputStyle}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── TAB 3: FIREFURY CORPS CAROUSEL (SECTION 12) ─── */}
        {activeTab === 'firefuryCarousel' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '0.85rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#991B1B' }}>
                12. Firefury Corps Carousel Manager
              </div>
              <div style={{ fontSize: '0.73rem', color: '#7F1D1D', marginTop: '3px', lineHeight: 1.4 }}>
                Requirements: Minimum 2 images, Maximum 5 images. Support for reordering, adding, removing, replacing, and per-image enable/disable.
              </div>
            </div>

            {firefuryProject && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 650, color: '#1E293B' }}>
                    Enable / Display Entire Carousel
                  </span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', fontWeight: 600, color: firefuryProject.carouselEnabled !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={firefuryProject.carouselEnabled !== false}
                      onChange={(e) => handleProjectChange('carouselEnabled', e.target.checked, firefuryProject.id)}
                      style={{ width: '16px', height: '16px', accentColor: '#16A34A' }}
                    />
                    <span>{firefuryProject.carouselEnabled !== false ? 'Carousel: Enabled' : 'Carousel: Disabled'}</span>
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111113' }}>
                    CAROUSEL IMAGES ({firefuryProject.carouselImages?.length || 0} of 5)
                  </div>
                  {(firefuryProject.carouselImages?.length || 0) < 5 && (
                    <button
                      type="button"
                      onClick={() =>
                        setMediaPickerConfig({
                          isOpen: true,
                          mediaType: 'image',
                          target: 'addCarouselImage',
                        })
                      }
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #FECACA',
                        backgroundColor: '#FEF2F2',
                        color: '#DE322D',
                        fontSize: '0.74rem',
                        fontWeight: 650,
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={13} />
                      Add Carousel Image
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(firefuryProject.carouselImages || []).map((slide: any, sIdx: number) => (
                    <div
                      key={slide.id || sIdx}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        gap: '0.85rem',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ position: 'relative', width: '100px', height: '65px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#000', flexShrink: 0 }}>
                        <Image src={slide.image} alt={slide.caption || ''} fill style={{ objectFit: 'cover' }} />
                      </div>

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#52525B' }}>
                            SLIDE {sIdx + 1}
                          </span>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: slide.enabled !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={slide.enabled !== false}
                              onChange={(e) => {
                                const updated = [...firefuryProject.carouselImages];
                                updated[sIdx] = { ...updated[sIdx], enabled: e.target.checked };
                                handleProjectChange('carouselImages', updated, firefuryProject.id);
                              }}
                              style={{ width: '14px', height: '14px', accentColor: '#16A34A' }}
                            />
                            <span>{slide.enabled !== false ? 'Active' : 'Disabled'}</span>
                          </label>
                        </div>

                        <input
                          type="text"
                          value={slide.caption || ''}
                          onChange={(e) => {
                            const updated = [...firefuryProject.carouselImages];
                            updated[sIdx] = { ...updated[sIdx], caption: e.target.value };
                            handleProjectChange('carouselImages', updated, firefuryProject.id);
                          }}
                          placeholder="Slide caption..."
                          style={inputStyle}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <button
                          type="button"
                          disabled={sIdx === 0}
                          onClick={() => {
                            const updated = [...firefuryProject.carouselImages];
                            const temp = updated[sIdx];
                            updated[sIdx] = updated[sIdx - 1];
                            updated[sIdx - 1] = temp;
                            handleProjectChange('carouselImages', updated, firefuryProject.id);
                          }}
                          style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #E2E8F0', cursor: sIdx === 0 ? 'not-allowed' : 'pointer' }}
                        >
                          <ChevronUp size={13} />
                        </button>
                        <button
                          type="button"
                          disabled={sIdx === firefuryProject.carouselImages.length - 1}
                          onClick={() => {
                            const updated = [...firefuryProject.carouselImages];
                            const temp = updated[sIdx];
                            updated[sIdx] = updated[sIdx + 1];
                            updated[sIdx + 1] = temp;
                            handleProjectChange('carouselImages', updated, firefuryProject.id);
                          }}
                          style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #E2E8F0', cursor: sIdx === firefuryProject.carouselImages.length - 1 ? 'not-allowed' : 'pointer' }}
                        >
                          <ChevronDown size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setMediaPickerConfig({
                              isOpen: true,
                              mediaType: 'image',
                              target: { carouselImageIndex: sIdx },
                            })
                          }
                          title="Replace Image"
                          style={{ padding: '0.25rem 0.4rem', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '0.68rem', cursor: 'pointer' }}
                        >
                          Replace
                        </button>
                        {(firefuryProject.carouselImages?.length || 0) > 2 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = firefuryProject.carouselImages.filter((_: any, idx: number) => idx !== sIdx);
                              handleProjectChange('carouselImages', updated, firefuryProject.id);
                            }}
                            title="Delete Image"
                            style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #FECACA', background: '#FEF2F2', color: '#DE322D', cursor: 'pointer' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── TAB 4: COMMUNICATION & PRODUCTION (3 INTERACTIVE CARDS) ─── */}
        {activeTab === 'communicationCards' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '0.85rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#991B1B' }}>
                13. Communication &amp; Production Section (3 Interactive Cards)
              </div>
              <div style={{ fontSize: '0.73rem', color: '#7F1D1D', marginTop: '3px', lineHeight: 1.4 }}>
                Control all 3 cards: Card title, description, image, redirection link, and enable/disable. Scope of work, creative approach, and production discipline have been completely removed.
              </div>
            </div>

            {commsProject && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(commsProject.interactiveCards || []).map((card: any, cIdx: number) => (
                  <div
                    key={card.id || cIdx}
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F4F4F5', paddingBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111113' }}>
                        CARD {cIdx + 1}: {card.title || 'Untitled'}
                      </span>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', color: card.enabled !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={card.enabled !== false}
                          onChange={(e) => {
                            const updated = [...commsProject.interactiveCards];
                            updated[cIdx] = { ...updated[cIdx], enabled: e.target.checked };
                            handleProjectChange('interactiveCards', updated, commsProject.id);
                          }}
                          style={{ width: '15px', height: '15px', accentColor: '#16A34A' }}
                        />
                        <span>{card.enabled !== false ? 'Card: Enabled' : 'Card: Disabled'}</span>
                      </label>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                          CARD TITLE
                        </label>
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => {
                            const updated = [...commsProject.interactiveCards];
                            updated[cIdx] = { ...updated[cIdx], title: e.target.value };
                            handleProjectChange('interactiveCards', updated, commsProject.id);
                          }}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                          REDIRECTION LINK
                        </label>
                        <input
                          type="text"
                          value={card.link || ''}
                          onChange={(e) => {
                            const updated = [...commsProject.interactiveCards];
                            updated[cIdx] = { ...updated[cIdx], link: e.target.value };
                            handleProjectChange('interactiveCards', updated, commsProject.id);
                          }}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                        CARD DESCRIPTION
                      </label>
                      <textarea
                        rows={2}
                        value={card.description || ''}
                        onChange={(e) => {
                          const updated = [...commsProject.interactiveCards];
                          updated[cIdx] = { ...updated[cIdx], description: e.target.value };
                          handleProjectChange('interactiveCards', updated, commsProject.id);
                        }}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                        CARD IMAGE
                      </label>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '90px', height: '60px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#000', flexShrink: 0 }}>
                          <Image src={card.image} alt={card.title} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <input
                          type="text"
                          value={card.image || ''}
                          onChange={(e) => {
                            const updated = [...commsProject.interactiveCards];
                            updated[cIdx] = { ...updated[cIdx], image: e.target.value };
                            handleProjectChange('interactiveCards', updated, commsProject.id);
                          }}
                          style={{ ...inputStyle, flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setMediaPickerConfig({
                              isOpen: true,
                              mediaType: 'image',
                              target: { cardImageIndex: cIdx },
                            })
                          }
                          style={{
                            padding: '0.45rem 0.85rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            backgroundColor: '#FFFFFF',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Replace Image
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 5: REZANG LA MEMORIAL (SECTION 14) ─── */}
        {activeTab === 'rezangLaMemorial' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '0.85rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#991B1B' }}>
                14. Rezang La War Memorial — Single Landscape Image
              </div>
              <div style={{ fontSize: '0.73rem', color: '#7F1D1D', marginTop: '3px', lineHeight: 1.4 }}>
                Replaced the two square images with one expansive landscape image that utilizes the available space better.
              </div>
            </div>

            {rezangLaProject && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 650, color: '#1E293B' }}>
                    Enable / Display Rezang La Landscape Section
                  </span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', fontWeight: 600, color: rezangLaProject.landscapeImageEnabled !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rezangLaProject.landscapeImageEnabled !== false}
                      onChange={(e) => handleProjectChange('landscapeImageEnabled', e.target.checked, rezangLaProject.id)}
                      style={{ width: '16px', height: '16px', accentColor: '#16A34A' }}
                    />
                    <span>{rezangLaProject.landscapeImageEnabled !== false ? 'Enabled' : 'Disabled'}</span>
                  </label>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    LANDSCAPE IMAGE PREVIEW
                  </label>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9.5', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000', marginBottom: '0.65rem' }}>
                    <Image
                      src={rezangLaProject.landscapeImage || '/uploads/1790516827847-rezang-la-memorial.jpg'}
                      alt="Rezang La Memorial"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={rezangLaProject.landscapeImage || ''}
                      onChange={(e) => handleProjectChange('landscapeImage', e.target.value, rezangLaProject.id)}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setMediaPickerConfig({
                          isOpen: true,
                          mediaType: 'image',
                          target: 'landscapeImage',
                        })
                      }
                      style={{
                        padding: '0.45rem 0.95rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Upload / Replace
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    OPTIONAL REDIRECTION LINK
                  </label>
                  <input
                    type="text"
                    value={rezangLaProject.landscapeImageLink || ''}
                    onChange={(e) => handleProjectChange('landscapeImageLink', e.target.value, rezangLaProject.id)}
                    placeholder="e.g. /work or external memorial archive link"
                    style={inputStyle}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── TAB 6: HERO SECTION ─── */}
        {activeTab === 'hero' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Section Master Toggle Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                backgroundColor: armyData.heroEnabled !== false ? '#F0FDF4' : '#FEF2F2',
                borderBottom: armyData.heroEnabled !== false ? '1px solid #BBF7D0' : '1px solid #FECACA',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: armyData.heroEnabled !== false ? '#15803D' : '#B91C1C' }}>
                Hero Section: {armyData.heroEnabled !== false ? 'ENABLED (Visible)' : 'DISABLED (Hidden)'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const cur = armyData.heroEnabled !== false;
                  updateField(['heroEnabled'], !cur);
                  showToast(`Hero section ${cur ? 'disabled' : 'enabled'}.`, 'info');
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 0.9rem', borderRadius: '5px', border: 'none',
                  backgroundColor: armyData.heroEnabled !== false ? '#DC2626' : '#16A34A',
                  color: '#fff', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {armyData.heroEnabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {armyData.heroEnabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

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
                style={inputStyle}
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
                style={inputStyle}
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
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* ─── TAB 7: CLOSING BANNER ─── */}
        {activeTab === 'closingBanner' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Section Master Toggle Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                backgroundColor: armyData.closingBannerEnabled !== false ? '#F0FDF4' : '#FEF2F2',
                borderBottom: armyData.closingBannerEnabled !== false ? '1px solid #BBF7D0' : '1px solid #FECACA',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: armyData.closingBannerEnabled !== false ? '#15803D' : '#B91C1C' }}>
                Closing Banner: {armyData.closingBannerEnabled !== false ? 'ENABLED (Visible)' : 'DISABLED (Hidden)'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const cur = armyData.closingBannerEnabled !== false;
                  updateField(['closingBannerEnabled'], !cur);
                  showToast(`Closing banner ${cur ? 'disabled' : 'enabled'}.`, 'info');
                }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 0.9rem', borderRadius: '5px', border: 'none',
                  backgroundColor: armyData.closingBannerEnabled !== false ? '#DC2626' : '#16A34A',
                  color: '#fff', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {armyData.closingBannerEnabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {armyData.closingBannerEnabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Closing Banner &amp; CTA
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                EYEBROW
              </label>
              <input
                type="text"
                value={armyData.closingBanner?.eyebrow || ''}
                onChange={(e) => handleClosingBannerChange('eyebrow', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                HEADING
              </label>
              <textarea
                rows={2}
                value={armyData.closingBanner?.heading || ''}
                onChange={(e) => handleClosingBannerChange('heading', e.target.value)}
                style={inputStyle}
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
                style={inputStyle}
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
                  style={inputStyle}
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
                  style={inputStyle}
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
                    style={{ ...inputStyle, marginBottom: '0.35rem' }}
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

        {/* ─── TAB: PDF VIEWERS (COFFEE TABLE BOOK & SECOND PDF) ─── */}
        {activeTab === 'pdfViewers' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#DE322D' }}>
                PDF Viewers Management (Army Projects)
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '4px 0 0' }}>
                Manage interactive PDF documents embedded in the Army section. Draft changes require clicking &ldquo;Publish Live&rdquo; to reflect on the live site.
              </p>
            </div>

            {/* Coffee Table Book PDF (Flipbook) */}
            <div style={{ padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: '#111113' }}>
                    1. Coffee Table Book (3D Flipbook Experience)
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: '#71717A' }}>Realistic double-page spread with page-turning animation</span>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={armyData.coffeeTableBookPdf?.enabled !== false}
                    onChange={(e) => updateField(['coffeeTableBookPdf', 'enabled'], e.target.checked)}
                  />
                  Enable Flipbook
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>Title</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={armyData.coffeeTableBookPdf?.title || ''}
                    onChange={(e) => updateField(['coffeeTableBookPdf', 'title'], e.target.value)}
                    placeholder="Rezang La War Memorial Coffee Table Book"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>Subtitle</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={armyData.coffeeTableBookPdf?.subtitle || ''}
                    onChange={(e) => updateField(['coffeeTableBookPdf', 'subtitle'], e.target.value)}
                    placeholder="Interactive High-Altitude Commemorative Flipbook"
                  />
                </div>
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>PDF Document URL</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    style={{ ...inputStyle, flex: 1 }}
                    value={armyData.coffeeTableBookPdf?.pdfUrl || ''}
                    onChange={(e) => updateField(['coffeeTableBookPdf', 'pdfUrl'], e.target.value)}
                    placeholder="/pdf/coffee-table-book.pdf or https://..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setMediaPickerConfig({
                        isOpen: true,
                        mediaType: 'all',
                        target: 'coffeeTablePdfUrl',
                      })
                    }
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0,0,0,0.15)',
                      backgroundColor: '#111113',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 650,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Upload / Pick PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Second PDF (Standard Viewer) */}
            <div style={{ padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: '#111113' }}>
                    2. Second PDF Document (Standard Reader View)
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: '#71717A' }}>Clean single-page document reader with page navigation &amp; zoom</span>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={armyData.secondPdf?.enabled !== false}
                    onChange={(e) => updateField(['secondPdf', 'enabled'], e.target.checked)}
                  />
                  Enable Document Viewer
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>Title</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={armyData.secondPdf?.title || ''}
                    onChange={(e) => updateField(['secondPdf', 'title'], e.target.value)}
                    placeholder="Indian Army Field Operations & Protocol Document"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>Subtitle</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={armyData.secondPdf?.subtitle || ''}
                    onChange={(e) => updateField(['secondPdf', 'subtitle'], e.target.value)}
                    placeholder="Official Defence Publication Archive"
                  />
                </div>
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>PDF Document URL</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    style={{ ...inputStyle, flex: 1 }}
                    value={armyData.secondPdf?.pdfUrl || ''}
                    onChange={(e) => updateField(['secondPdf', 'pdfUrl'], e.target.value)}
                    placeholder="/pdf/army-field-document.pdf or https://..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setMediaPickerConfig({
                        isOpen: true,
                        mediaType: 'all',
                        target: 'secondPdfUrl',
                      })
                    }
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0,0,0,0.15)',
                      backgroundColor: '#111113',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 650,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Upload / Pick PDF
                  </button>
                </div>
              </div>
            </div>
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
        initialUrl={''}
        onSelect={(url) => {
          if (mediaPickerConfig.target === 'image') {
            handleProjectChange('image', url);
          } else if (mediaPickerConfig.target === 'videoUrl') {
            handleProjectChange('videoUrl', url);
          } else if (mediaPickerConfig.target === 'landscapeImage') {
            if (activeTab === 'rezangLaMemorial' && rezangLaProject) {
              handleProjectChange('landscapeImage', url, rezangLaProject.id);
            } else if (selectedProject) {
              handleProjectChange('landscapeImage', url);
              handleProjectChange('thumbnail', url);
              handleProjectChange('image', url);
            }
          } else if (mediaPickerConfig.target === 'verticalImage') {
            if (selectedProject) {
              handleProjectChange('verticalImage', url);
              const updatedSides = [url, ...(selectedProject.sidePhotos?.slice(1) || [])];
              handleProjectChange('sidePhotos', updatedSides);
            }
          } else if (mediaPickerConfig.target === 'armyVideoThumbnail') {
            if (videoProject) {
              handleProjectChange('thumbnail', url, videoProject.id);
              handleProjectChange('image', url, videoProject.id);
            }
          } else if (mediaPickerConfig.target === 'addSidePhoto') {
            const existing = [...(selectedProject.sidePhotos || [])];
            existing.push(url);
            handleProjectChange('sidePhotos', existing);
          } else if (typeof mediaPickerConfig.target === 'object' && 'replaceSidePhotoIndex' in mediaPickerConfig.target) {
            const idx = mediaPickerConfig.target.replaceSidePhotoIndex;
            const existing = [...(selectedProject.sidePhotos || [])];
            existing[idx] = url;
            handleProjectChange('sidePhotos', existing);
          } else if (typeof mediaPickerConfig.target === 'object' && 'cardImageIndex' in mediaPickerConfig.target) {
            const idx = mediaPickerConfig.target.cardImageIndex;
            if (commsProject) {
              const updated = [...(commsProject.interactiveCards || [])];
              updated[idx] = { ...updated[idx], image: url };
              handleProjectChange('interactiveCards', updated, commsProject.id);
            }
          } else if (typeof mediaPickerConfig.target === 'object' && 'carouselImageIndex' in mediaPickerConfig.target) {
            const idx = mediaPickerConfig.target.carouselImageIndex;
            if (firefuryProject) {
              const updated = [...(firefuryProject.carouselImages || [])];
              updated[idx] = { ...updated[idx], image: url };
              handleProjectChange('carouselImages', updated, firefuryProject.id);
            }
          } else if (mediaPickerConfig.target === 'addCarouselImage') {
            if (firefuryProject) {
              const existing = [...(firefuryProject.carouselImages || [])];
              existing.push({
                id: String(Date.now()),
                image: url,
                caption: 'Visual Documentation Still',
                enabled: true,
              });
              handleProjectChange('carouselImages', existing, firefuryProject.id);
            }
          } else if (typeof mediaPickerConfig.target === 'object' && 'galleryImageIndex' in mediaPickerConfig.target) {
            const idx = (mediaPickerConfig.target as any).galleryImageIndex;
            if (selectedProject) {
              const updated = [...(selectedProject.gallery || [])];
              updated[idx] = { ...updated[idx], image: url };
              handleProjectChange('gallery', updated);
            }
          } else if (mediaPickerConfig.target === 'addGalleryImage') {
            if (selectedProject) {
              const existing = [...(selectedProject.gallery || [])];
              existing.push({ image: url, caption: 'Archival Still', enabled: true });
              handleProjectChange('gallery', existing);
            }
          } else if (mediaPickerConfig.target === 'pdfUrl') {
            if (selectedProject) {
              handleProjectChange('pdfUrl', url);
            }
          } else if (mediaPickerConfig.target === 'coffeeTablePdfUrl') {
            updateField(['coffeeTableBookPdf', 'pdfUrl'], url);
          } else if (mediaPickerConfig.target === 'secondPdfUrl') {
            updateField(['secondPdf', 'pdfUrl'], url);
          } else if (mediaPickerConfig.target === 'bannerImage') {
            handleClosingBannerChange('image', url);
          }
          setMediaPickerConfig((prev) => ({ ...prev, isOpen: false }));
        }}
      />

      {/* Hidden Upload Input for Project Gallery */}
      <input
        ref={projectGalleryInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleProjectDirectUpload(file, 'gallery');
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
