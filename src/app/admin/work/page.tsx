'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Save,
  Check,
  Search,
  Upload,
} from 'lucide-react';

export default function AdminWorkPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [workData, setWorkData] = useState<any>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('raysons-group');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.work) {
      setWorkData(JSON.parse(JSON.stringify(content.work)));
    }
  }, [content.work]);

  if (!workData) {
    return <div style={{ padding: '2rem' }}>Loading Case Studies...</div>;
  }

  const selectedCase = workData.caseStudies?.find((c: any) => c.id === selectedCaseId) || workData.caseStudies?.[0];

  const handleCaseChange = (field: string, val: any) => {
    if (!selectedCase) return;
    const updatedCases = workData.caseStudies.map((c: any) =>
      c.id === selectedCase.id ? { ...c, [field]: val } : c
    );
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const handleTogglePublished = (id: string) => {
    const updatedCases = workData.caseStudies.map((c: any) =>
      c.id === id ? { ...c, published: !c.published } : c
    );
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const moveCase = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= workData.caseStudies.length) return;
    const newCases = [...workData.caseStudies];
    const temp = newCases[index];
    newCases[index] = newCases[targetIdx];
    newCases[targetIdx] = temp;
    const updated = { ...workData, caseStudies: newCases };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const handleAddNewCase = () => {
    const newId = `case-${Date.now()}`;
    const newNum = String(workData.caseStudies.length + 1).padStart(2, '0');
    const newCase = {
      id: newId,
      num: newNum,
      slug: newId,
      title: 'New Case Study',
      client: 'Client Name',
      category: 'Hospitality',
      desc: 'Brief overview of strategy, execution and commercial impact.',
      tags: ['Strategy', 'Execution'],
      image: '/images/case-studies/raysons/neora-1.jpg',
      published: true,
      featured: false,
      year: '2026',
    };

    const updated = {
      ...workData,
      caseStudies: [...workData.caseStudies, newCase],
    };
    setWorkData(updated);
    setSelectedCaseId(newId);
    updateDraftInMemory('work', updated);
  };

  const handleDeleteCase = () => {
    if (!deleteTargetId) return;
    const updatedCases = workData.caseStudies.filter((c: any) => c.id !== deleteTargetId);
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    if (selectedCaseId === deleteTargetId) {
      setSelectedCaseId(updatedCases[0]?.id || null);
    }
    setDeleteTargetId(null);
    updateDraftInMemory('work', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('work', workData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  const filteredCases = (workData.caseStudies || []).filter(
    (c: any) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* ─── LEFT COLUMN: CASE STUDIES LIST & FORM EDITOR ─── */}
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
              Case Studies &amp; Work
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Add, reorder, edit narrative &amp; media assets.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              type="button"
              onClick={handleAddNewCase}
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

        {/* Search Bar */}
        <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies..."
              style={{
                width: '100%',
                padding: '0.4rem 0.65rem 0.4rem 2.2rem',
                fontSize: '0.82rem',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Two-split: Project selection list + Selected project edit form */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 1fr', overflow: 'hidden' }}>
          {/* Projects Mini-List with Reorder buttons */}
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
            {filteredCases.map((cs: any, idx: number) => {
              const isSelected = cs.id === selectedCase?.id;
              return (
                <div
                  key={cs.id}
                  onClick={() => setSelectedCaseId(cs.id)}
                  style={{
                    padding: '0.65rem',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                    border: isSelected ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid transparent',
                    boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.72rem', color: '#DE322D', fontWeight: 700 }}>
                      {cs.num}
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
                      {cs.title}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCase(idx, 'up');
                      }}
                      style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                    >
                      <ChevronUp size={12} color={idx === 0 ? '#D4D4D8' : '#71717A'} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === filteredCases.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCase(idx, 'down');
                      }}
                      style={{ border: 'none', background: 'transparent', cursor: idx === filteredCases.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                    >
                      <ChevronDown size={12} color={idx === filteredCases.length - 1 ? '#D4D4D8' : '#71717A'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Editor for Selected Case Study */}
          {selectedCase ? (
            <div style={{ overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.1em' }}>
                  EDITING CASE STUDY: {selectedCase.num}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => handleTogglePublished(selectedCase.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      backgroundColor: selectedCase.published ? '#DCFCE7' : '#F4F4F5',
                      color: selectedCase.published ? '#16A34A' : '#71717A',
                      cursor: 'pointer',
                    }}
                  >
                    {selectedCase.published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {selectedCase.published ? 'Published' : 'Hidden'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(selectedCase.id)}
                    title="Delete Case Study"
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

              {/* Title & Client */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    PROJECT TITLE
                  </label>
                  <input
                    type="text"
                    value={selectedCase.title || ''}
                    onChange={(e) => handleCaseChange('title', e.target.value)}
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
                    CLIENT / ORGANISATION
                  </label>
                  <input
                    type="text"
                    value={selectedCase.client || ''}
                    onChange={(e) => handleCaseChange('client', e.target.value)}
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

              {/* Category & Slug */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    SECTOR / CATEGORY
                  </label>
                  <input
                    type="text"
                    value={selectedCase.category || ''}
                    onChange={(e) => handleCaseChange('category', e.target.value)}
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
                    URL SLUG
                  </label>
                  <input
                    type="text"
                    value={selectedCase.slug || ''}
                    onChange={(e) => handleCaseChange('slug', e.target.value)}
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

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  OVERVIEW / SCOPE DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={selectedCase.desc || ''}
                  onChange={(e) => handleCaseChange('desc', e.target.value)}
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

              {/* Hero Image */}
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  HERO IMAGE THUMBNAIL
                </label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '90px',
                      height: '60px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#F4F4F5',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      flexShrink: 0,
                    }}
                  >
                    {selectedCase.image ? (
                      <Image src={selectedCase.image} alt={selectedCase.title} fill style={{ objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A1A1AA' }}>
                        No Image
                      </div>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', color: '#71717A', marginBottom: '0.35rem' }}>
                      {selectedCase.image || 'No image set'}
                    </div>
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
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#A1A1AA' }}>
              Select a project from the left or add a new one.
            </div>
          )}
        </div>
      </div>

      {/* ─── RIGHT COLUMN: REAL-TIME LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/work" />
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaType="image"
        onSelect={(url) => {
          handleCaseChange('image', url);
          setIsMediaPickerOpen(false);
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Case Study?"
        message="This case study will be removed from your active portfolio. This action cannot be undone."
        confirmLabel="Delete Project"
        onConfirm={handleDeleteCase}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
