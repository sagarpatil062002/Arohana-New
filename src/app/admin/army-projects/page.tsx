'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Save, Check, Upload, Shield } from 'lucide-react';

export default function AdminArmyProjectsPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [armyData, setArmyData] = useState<any>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('western-command-investiture');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content['army-projects']) {
      setArmyData(JSON.parse(JSON.stringify(content['army-projects'])));
    }
  }, [content['army-projects']]);

  if (!armyData) {
    return <div style={{ padding: '2rem' }}>Loading Indian Army Projects...</div>;
  }

  const selectedProject =
    armyData.projects?.find((p: any) => p.id === selectedProjectId) || armyData.projects?.[0];

  const handleProjectChange = (field: string, val: any) => {
    if (!selectedProject) return;
    const updatedProjects = armyData.projects.map((p: any) =>
      p.id === selectedProject.id ? { ...p, [field]: val } : p
    );
    const updated = { ...armyData, projects: updatedProjects };
    setArmyData(updated);
    updateDraftInMemory('army-projects', updated);
  };

  const handleTogglePublished = (id: string) => {
    const updatedProjects = armyData.projects.map((p: any) =>
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
    const newNum = String(armyData.projects.length + 1).padStart(2, '0');
    const newProj = {
      id: newId,
      num: newNum,
      command: '14 CORPS HEADQUARTERS',
      location: 'Ladakh Theatre',
      date: '2026',
      title: 'New Institutional Assignment',
      subtitle: 'Ceremonial protocol shoot and documentary production.',
      description: 'Detailed description of authorized institutional shoot direction.',
      scopeOfWork: 'Institutional communication campaigns, internal and public-facing visual communication.',
      creativeApproach: 'Restrained, dignified visual pacing suited to military protocol.',
      productionDiscipline: 'High-altitude cold weather filming and equipment readiness.',
      image: '/images/army/army-hero.jpg',
      category: '14-corps',
      published: true,
    };
    const updated = {
      ...armyData,
      projects: [...armyData.projects, newProj],
    };
    setArmyData(updated);
    setSelectedProjectId(newId);
    updateDraftInMemory('army-projects', updated);
  };

  const handleDeleteProject = () => {
    if (!deleteTargetId) return;
    const updatedProjects = armyData.projects.filter((p: any) => p.id !== deleteTargetId);
    const updated = { ...armyData, projects: updatedProjects };
    setArmyData(updated);
    if (selectedProjectId === deleteTargetId) {
      setSelectedProjectId(updatedProjects[0]?.id || null);
    }
    setDeleteTargetId(null);
    updateDraftInMemory('army-projects', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('army-projects', armyData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
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
              Indian Army Projects
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Institutional briefs, verified assignments &amp; publications.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
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
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '210px 1fr', overflow: 'hidden' }}>
          {/* Projects List */}
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
            {armyData.projects.map((p: any, idx: number) => {
              const isSelected = p.id === selectedProject?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
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
                      {p.num}
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
                      {p.title}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveProject(idx, 'up');
                      }}
                      style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                    >
                      <ChevronUp size={12} color={idx === 0 ? '#D4D4D8' : '#71717A'} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === armyData.projects.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveProject(idx, 'down');
                      }}
                      style={{ border: 'none', background: 'transparent', cursor: idx === armyData.projects.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                    >
                      <ChevronDown size={12} color={idx === armyData.projects.length - 1 ? '#D4D4D8' : '#71717A'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Editor */}
          {selectedProject && (
            <div style={{ overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.1em' }}>
                  ARMY PROJECT: {selectedProject.num}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => handleTogglePublished(selectedProject.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      backgroundColor: selectedProject.published ? '#DCFCE7' : '#F4F4F5',
                      color: selectedProject.published ? '#16A34A' : '#71717A',
                      cursor: 'pointer',
                    }}
                  >
                    {selectedProject.published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {selectedProject.published ? 'Visible' : 'Hidden'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(selectedProject.id)}
                    title="Delete Project"
                    style={{ border: 'none', backgroundColor: 'transparent', color: '#EF4444', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    PROJECT TITLE
                  </label>
                  <input
                    type="text"
                    value={selectedProject.title || ''}
                    onChange={(e) => handleProjectChange('title', e.target.value)}
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
                    COMMAND / FORMATION
                  </label>
                  <input
                    type="text"
                    value={selectedProject.command || ''}
                    onChange={(e) => handleProjectChange('command', e.target.value)}
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={selectedProject.location || ''}
                    onChange={(e) => handleProjectChange('location', e.target.value)}
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
                    TIMELINE / DATE
                  </label>
                  <input
                    type="text"
                    value={selectedProject.date || ''}
                    onChange={(e) => handleProjectChange('date', e.target.value)}
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
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BRIEF SUBTITLE
                </label>
                <input
                  type="text"
                  value={selectedProject.subtitle || ''}
                  onChange={(e) => handleProjectChange('subtitle', e.target.value)}
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
                  rows={2}
                  value={selectedProject.description || ''}
                  onChange={(e) => handleProjectChange('description', e.target.value)}
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
                  SCOPE OF WORK
                </label>
                <textarea
                  rows={2}
                  value={selectedProject.scopeOfWork || ''}
                  onChange={(e) => handleProjectChange('scopeOfWork', e.target.value)}
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

              {/* Media selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HERO PHOTO / PUBLICATION IMAGE
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
                    {selectedProject.image ? (
                      <Image src={selectedProject.image} alt={selectedProject.title} fill style={{ objectFit: 'cover' }} />
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
        <LivePreviewPanel previewUrl="/indian-army-projects" />
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaType="image"
        onSelect={(url) => {
          handleProjectChange('image', url);
          setIsMediaPickerOpen(false);
        }}
      />

      {/* Confirm Delete */}
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
