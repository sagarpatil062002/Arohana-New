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
  Layers,
  Sparkles,
  Video,
  FileText,
} from 'lucide-react';

export default function AdminWorkPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [workData, setWorkData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'header' | 'reels' | 'cases' | 'directory'>('cases');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('raysons-group');
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ path: string; type?: 'image' | 'video' } | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.work) {
      setWorkData(JSON.parse(JSON.stringify(content.work)));
    }
  }, [content.work]);

  if (!workData) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#71717A' }}>Loading Case Studies...</div>;
  }

  const selectedCase = workData.caseStudies?.find((c: any) => c.id === selectedCaseId) || workData.caseStudies?.[0];

  const updateField = (path: string[], val: any) => {
    const updated = JSON.parse(JSON.stringify(workData));
    let current = updated;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    current[path[path.length - 1]] = val;
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

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

  const handleDeleteCase = (id: string) => {
    const updatedCases = workData.caseStudies.filter((c: any) => c.id !== id);
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    if (selectedCaseId === id && updatedCases.length > 0) {
      setSelectedCaseId(updatedCases[0].id);
    }
    updateDraftInMemory('work', updated);
    setDeleteTargetId(null);
  };

  const handleSave = async () => {
    const ok = await saveDraft('work', workData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  const handleUpdateCategory = (catIdx: number, field: string, val: any) => {
    const updatedCats = [...(workData.directoryCategories || [])];
    updatedCats[catIdx] = { ...updatedCats[catIdx], [field]: val };
    const updated = { ...workData, directoryCategories: updatedCats };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const handleAddClientToCategory = (catIdx: number) => {
    const updatedCats = [...(workData.directoryCategories || [])];
    const clients = [...(updatedCats[catIdx].clients || [])];
    clients.push({ name: 'New Client', href: '/contact' });
    updatedCats[catIdx] = { ...updatedCats[catIdx], clients };
    const updated = { ...workData, directoryCategories: updatedCats };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const handleUpdateClient = (catIdx: number, clientIdx: number, field: string, val: any) => {
    const updatedCats = [...(workData.directoryCategories || [])];
    const clients = [...(updatedCats[catIdx].clients || [])];
    clients[clientIdx] = { ...clients[clientIdx], [field]: val };
    updatedCats[catIdx] = { ...updatedCats[catIdx], clients };
    const updated = { ...workData, directoryCategories: updatedCats };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const handleDeleteClient = (catIdx: number, clientIdx: number) => {
    const updatedCats = [...(workData.directoryCategories || [])];
    const clients = updatedCats[catIdx].clients.filter((_: any, i: number) => i !== clientIdx);
    updatedCats[catIdx] = { ...updatedCats[catIdx], clients };
    const updated = { ...workData, directoryCategories: updatedCats };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const handleAddCategory = () => {
    const updatedCats = [...(workData.directoryCategories || [])];
    const nextNum = String(updatedCats.length + 1).padStart(2, '0');
    updatedCats.push({
      num: nextNum,
      title: 'New Sector Category',
      subtitle: 'SPACES · COMMUNITY · PURPOSE',
      clients: [{ name: 'New Project', href: '/contact' }],
    });
    const updated = { ...workData, directoryCategories: updatedCats };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const handleDeleteCategory = (catIdx: number) => {
    const updatedCats = workData.directoryCategories.filter((_: any, i: number) => i !== catIdx);
    const updated = { ...workData, directoryCategories: updatedCats };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const filteredCases = (workData.caseStudies || []).filter(
    (c: any) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* ─── LEFT COLUMN: WORK SECTIONS & FORM EDITOR ─── */}
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
              Work &amp; Case Studies Editor
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Page Header, Instagram Reels carousel &amp; client portfolio.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            {activeTab === 'cases' && (
              <button
                type="button"
                onClick={handleAddNewCase}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
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

            {activeTab === 'directory' && (
              <button
                type="button"
                onClick={handleAddCategory}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={14} />
                Add Category
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
              }}
            >
              {savedStatus ? <Check size={14} /> : <Save size={14} />}
              {savedStatus ? 'Saved' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* Section Tabs Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.65rem 1.25rem', borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#FFFFFF' }}>
          {[
            { id: 'header', label: '01: Page Header', icon: Sparkles },
            { id: 'reels', label: '02: Instagram Reels Carousel', icon: Video },
            { id: 'cases', label: `03: Case Studies (${workData.caseStudies?.length || 0})`, icon: FileText },
            { id: 'directory', label: `04: Directory / Additional Work (${workData.directoryCategories?.length || 0})`, icon: Layers },
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

        {/* ─── TAB 1: PAGE HEADER ─── */}
        {activeTab === 'header' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                PAGE EYEBROW
              </label>
              <input
                type="text"
                value={workData.header?.eyebrow || ''}
                onChange={(e) => updateField(['header', 'eyebrow'], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                MAIN HEADLINE
              </label>
              <input
                type="text"
                value={workData.header?.title || ''}
                onChange={(e) => updateField(['header', 'title'], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                SUBTITLE / DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={workData.header?.subtitle || ''}
                onChange={(e) => updateField(['header', 'subtitle'], e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* ─── TAB 2: INSTAGRAM REELS ─── */}
        {activeTab === 'reels' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Featured Instagram Reels Carousel
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#71717A', margin: '0.15rem 0 0 0' }}>
                  Horizontal swipeable reel cards linking directly to Instagram reels or videos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newReels = [...(workData.featuredReels || [])];
                  newReels.push({
                    id: `reel-${Date.now()}`,
                    hookTitle: 'New Reel Title',
                    subtitle: 'Category Subtitle',
                    coverImage: '/images/case-studies/raysons/neora-1.jpg',
                    instagramUrl: 'https://www.instagram.com/byarohana/',
                    category: 'Creative',
                  });
                  updateField(['featuredReels'], newReels);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  backgroundColor: '#111113',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={13} /> Add Reel
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {(workData.featuredReels || []).map((reel: any, idx: number) => (
                <div
                  key={reel.id || idx}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: '#F8F8FA',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 32px', gap: '0.5rem', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Hook Title</span>
                      <input
                        type="text"
                        value={reel.hookTitle || ''}
                        onChange={(e) => {
                          const updated = [...workData.featuredReels];
                          updated[idx] = { ...updated[idx], hookTitle: e.target.value };
                          updateField(['featuredReels'], updated);
                        }}
                        style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Category / Subtitle</span>
                      <input
                        type="text"
                        value={reel.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...workData.featuredReels];
                          updated[idx] = { ...updated[idx], subtitle: e.target.value };
                          updateField(['featuredReels'], updated);
                        }}
                        style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = workData.featuredReels.filter((_: any, i: number) => i !== idx);
                        updateField(['featuredReels'], updated);
                      }}
                      style={{
                        height: '32px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#EF4444',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Instagram URL</span>
                      <input
                        type="text"
                        value={reel.instagramUrl || ''}
                        onChange={(e) => {
                          const updated = [...workData.featuredReels];
                          updated[idx] = { ...updated[idx], instagramUrl: e.target.value };
                          updateField(['featuredReels'], updated);
                        }}
                        style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Cover Image</span>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <input
                          type="text"
                          value={reel.coverImage || ''}
                          onChange={(e) => {
                            const updated = [...workData.featuredReels];
                            updated[idx] = { ...updated[idx], coverImage: e.target.value };
                            updateField(['featuredReels'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => setMediaPickerTarget({ path: `featuredReels.${idx}.coverImage`, type: 'image' })}
                          style={{ ...mediaBtnStyle, padding: '0 0.5rem', fontSize: '0.7rem' }}
                        >
                          Pick
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 3: CASE STUDIES & WORK DIRECTORY ─── */}
        {activeTab === 'cases' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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

            {/* Split List & Form */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden' }}>
              {/* Left Project List */}
              <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.08)', overflowY: 'auto', padding: '0.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {filteredCases.map((c: any, idx: number) => {
                    const isSelected = c.id === selectedCase?.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCaseId(c.id)}
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
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: isSelected ? 600 : 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {c.title}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: isSelected ? '#A1A1AA' : '#71717A' }}>
                            {c.client}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTogglePublished(c.id);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: c.published ? '#16A34A' : '#A1A1AA',
                              cursor: 'pointer',
                              padding: '2px',
                            }}
                          >
                            {c.published ? <Eye size={13} /> : <EyeOff size={13} />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Form Editor */}
              {selectedCase ? (
                <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                        PROJECT TITLE
                      </label>
                      <input
                        type="text"
                        value={selectedCase.title || ''}
                        onChange={(e) => handleCaseChange('title', e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                        CLIENT NAME
                      </label>
                      <input
                        type="text"
                        value={selectedCase.client || ''}
                        onChange={(e) => handleCaseChange('client', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                        CATEGORY
                      </label>
                      <input
                        type="text"
                        value={selectedCase.category || ''}
                        onChange={(e) => handleCaseChange('category', e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                        YEAR OF DELIVERY
                      </label>
                      <input
                        type="text"
                        value={selectedCase.year || ''}
                        onChange={(e) => handleCaseChange('year', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                      BRIEF / EXECUTIVE SUMMARY
                    </label>
                    <textarea
                      rows={3}
                      value={selectedCase.desc || ''}
                      onChange={(e) => handleCaseChange('desc', e.target.value)}
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
                        value={selectedCase.image || ''}
                        onChange={(e) => handleCaseChange('image', e.target.value)}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget({ path: 'caseStudies.image', type: 'image' })}
                        style={mediaBtnStyle}
                      >
                        Pick Image
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', alignItems: 'center' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!selectedCase.published}
                        onChange={(e) => handleCaseChange('published', e.target.checked)}
                      />
                      Published on Website
                    </label>

                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!selectedCase.featured}
                        onChange={(e) => handleCaseChange('featured', e.target.checked)}
                      />
                      Featured Spotlight
                    </label>

                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(selectedCase.id)}
                      style={{
                        marginLeft: 'auto',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#EF4444',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Trash2 size={14} /> Delete Case Study
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#A1A1AA' }}>
                  Select a project from the left to edit.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 4: ADDITIONAL WORK & DIRECTORY ─── */}
        {activeTab === 'directory' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header / Intro Card */}
            <div style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                Directory Header &amp; Section Context
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                    EYEBROW
                  </label>
                  <input
                    type="text"
                    value={workData.directoryHeader?.eyebrow || 'CLIENT / PROJECT DIRECTORY'}
                    onChange={(e) => updateField(['directoryHeader', 'eyebrow'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                    SECTION TITLE (Without full stop)
                  </label>
                  <input
                    type="text"
                    value={workData.directoryHeader?.title || 'Additional work'}
                    onChange={(e) => updateField(['directoryHeader', 'title'], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                  SUBTITLE / DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={workData.directoryHeader?.subtitle || 'A selection of other businesses and projects we’ve worked with across different sectors.'}
                  onChange={(e) => updateField(['directoryHeader', 'subtitle'], e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Categories & Clients List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                  Sector Categories &amp; Client Projects
                </h4>
                <span style={{ fontSize: '0.74rem', color: '#71717A' }}>
                  Clients with case study URLs (e.g. /work/raysons-group) will show the redirecting arrow.
                </span>
              </div>

              {(workData.directoryCategories || []).map((cat: any, catIdx: number) => (
                <div
                  key={catIdx}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', flex: 1, marginRight: '1rem' }}>
                      <input
                        type="text"
                        value={cat.num || String(catIdx + 1).padStart(2, '0')}
                        onChange={(e) => handleUpdateCategory(catIdx, 'num', e.target.value)}
                        placeholder="01"
                        style={{ ...inputStyle, width: '56px', textAlign: 'center', fontWeight: 700 }}
                      />
                      <input
                        type="text"
                        value={cat.title || ''}
                        onChange={(e) => handleUpdateCategory(catIdx, 'title', e.target.value)}
                        placeholder="Sector Category Title"
                        style={{ ...inputStyle, fontWeight: 650 }}
                      />
                      <input
                        type="text"
                        value={cat.subtitle || ''}
                        onChange={(e) => handleUpdateCategory(catIdx, 'subtitle', e.target.value)}
                        placeholder="TAGS · SUBTITLE"
                        style={{ ...inputStyle, fontSize: '0.78rem' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(catIdx)}
                      title="Delete Category"
                      style={{
                        padding: '0.4rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(220,38,38,0.2)',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Clients List for Category */}
                  <div style={{ backgroundColor: '#F8F8FA', padding: '0.85rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#71717A', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>CLIENTS IN THIS SECTOR</span>
                      <span>LINK (Only detail pages show arrow)</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(cat.clients || []).map((client: any, clientIdx: number) => {
                        const hasDetail = client.href && client.href !== '/contact' && client.href !== '#' && client.href !== '';
                        return (
                          <div key={clientIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="text"
                              value={client.name || ''}
                              onChange={(e) => handleUpdateClient(catIdx, clientIdx, 'name', e.target.value)}
                              placeholder="Client / Brand Name"
                              style={{ ...inputStyle, flex: 1 }}
                            />
                            <div style={{ flex: 1, position: 'relative' }}>
                              <input
                                type="text"
                                value={client.href || ''}
                                onChange={(e) => handleUpdateClient(catIdx, clientIdx, 'href', e.target.value)}
                                placeholder="/work/case-slug or /contact"
                                style={inputStyle}
                              />
                            </div>
                            <span
                              style={{
                                fontSize: '0.68rem',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                whiteSpace: 'nowrap',
                                backgroundColor: hasDetail ? '#DCFCE7' : '#F4F4F5',
                                color: hasDetail ? '#15803D' : '#71717A',
                                fontWeight: 600,
                              }}
                            >
                              {hasDetail ? '↗ Arrow' : 'No Arrow'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteClient(catIdx, clientIdx)}
                              style={{
                                padding: '0.4rem',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: '#9CA3AF',
                                cursor: 'pointer',
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => handleAddClientToCategory(catIdx)}
                        style={{
                          alignSelf: 'flex-start',
                          marginTop: '0.25rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px dashed rgba(0,0,0,0.2)',
                          backgroundColor: '#FFFFFF',
                          color: '#4B5563',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <Plus size={13} />
                        Add Client to {cat.title || 'Sector'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── RIGHT COLUMN: LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/work" />
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Case Study"
        message="Are you sure you want to permanently delete this project? This will remove it from live display."
        onConfirm={() => deleteTargetId && handleDeleteCase(deleteTargetId)}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Media Picker Modal */}
      {mediaPickerTarget && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setMediaPickerTarget(null)}
          mediaType={mediaPickerTarget.type || 'image'}
          onSelect={(url) => {
            if (mediaPickerTarget.path.startsWith('featuredReels.')) {
              const parts = mediaPickerTarget.path.split('.');
              const idx = parseInt(parts[1]);
              const updated = [...workData.featuredReels];
              updated[idx] = { ...updated[idx], coverImage: url };
              updateField(['featuredReels'], updated);
            } else {
              handleCaseChange('image', url);
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

const mediaBtnStyle: React.CSSProperties = {
  padding: '0.5rem 0.85rem',
  borderRadius: '8px',
  backgroundColor: '#111113',
  color: '#FFFFFF',
  border: 'none',
  fontSize: '0.76rem',
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};
