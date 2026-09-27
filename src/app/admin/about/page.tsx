'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Trash2, Save, Check, Upload, Users, BookOpen, Sparkles, MessageSquare, Image as ImageIcon } from 'lucide-react';

export default function AdminAboutPage() {
  const { content, saveDraft, updateDraftInMemory } = useCmsContent();
  const [aboutData, setAboutData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'chapters' | 'team' | 'cta'>('hero');
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>('abijitha');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'member' | 'founder'>('member');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    if (content.about) {
      setAboutData(JSON.parse(JSON.stringify(content.about)));
      if (!selectedMemberId && content.about?.team?.members?.[0]?.id) {
        setSelectedMemberId(content.about.team.members[0].id);
      }
    }
  }, [content.about]);

  if (!aboutData) {
    return <div style={{ padding: '2rem' }}>Loading About Page Content...</div>;
  }

  const handleHeroChange = (field: string, val: any) => {
    const updated = {
      ...aboutData,
      hero: {
        ...(aboutData.hero || {}),
        [field]: val,
      },
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
  };

  const handleStatChange = (idx: number, field: string, val: string) => {
    const updatedStats = [...(aboutData.hero?.stats || [])];
    if (!updatedStats[idx]) updatedStats[idx] = { value: '', label: '' };
    updatedStats[idx] = { ...updatedStats[idx], [field]: val };
    handleHeroChange('stats', updatedStats);
  };

  const handleChapterChange = (field: string, val: any) => {
    const updatedChapters = [...(aboutData.chapters || [])];
    if (!updatedChapters[activeChapterIdx]) return;
    updatedChapters[activeChapterIdx] = {
      ...updatedChapters[activeChapterIdx],
      [field]: val,
    };
    const updated = { ...aboutData, chapters: updatedChapters };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
  };

  const handleTeamMetaChange = (field: string, val: string) => {
    const updated = {
      ...aboutData,
      team: {
        ...(aboutData.team || {}),
        [field]: val,
      },
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
  };

  const selectedMember =
    aboutData.team?.members?.find((m: any) => m.id === selectedMemberId) ||
    aboutData.team?.members?.[0];

  const handleMemberChange = (field: string, val: any) => {
    if (!selectedMember) return;
    const updatedMembers = aboutData.team.members.map((m: any) =>
      m.id === selectedMember.id ? { ...m, [field]: val } : m
    );
    const updated = {
      ...aboutData,
      team: {
        ...(aboutData.team || {}),
        members: updatedMembers,
      },
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
  };

  const handleAddNewMember = () => {
    const newId = `team-${Date.now()}`;
    const newMember = {
      id: newId,
      name: 'New Team Member',
      role: 'SPECIALIST ROLE',
      image: '/images/about/team-madhura.jpg',
    };
    const updated = {
      ...aboutData,
      team: {
        ...(aboutData.team || {}),
        members: [...(aboutData.team?.members || []), newMember],
      },
    };
    setAboutData(updated);
    setSelectedMemberId(newId);
    updateDraftInMemory('about', updated);
  };

  const handleDeleteMember = () => {
    if (!deleteTargetId) return;
    const updatedMembers = (aboutData.team?.members || []).filter(
      (m: any) => m.id !== deleteTargetId
    );
    const updated = {
      ...aboutData,
      team: {
        ...(aboutData.team || {}),
        members: updatedMembers,
      },
    };
    setAboutData(updated);
    if (selectedMemberId === deleteTargetId) {
      setSelectedMemberId(updatedMembers[0]?.id || null);
    }
    setDeleteTargetId(null);
    updateDraftInMemory('about', updated);
  };

  const handleCtaChange = (field: string, val: string) => {
    const updated = {
      ...aboutData,
      cta: {
        ...(aboutData.cta || {}),
        [field]: val,
      },
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
  };

  const handleSave = async () => {
    const ok = await saveDraft('about', aboutData);
    if (ok) {
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  const curChapter = aboutData.chapters?.[activeChapterIdx] || {};

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* ─── LEFT COLUMN: ABOUT / STUDIO SECTION EDITOR ─── */}
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
              About / Studio Page
            </h2>
            <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
              Founder story, 3 chapters, team directory &amp; mission statement.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            {activeTab === 'team' && (
              <button
                type="button"
                onClick={handleAddNewMember}
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
                Add Member
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
            { id: 'hero', label: '01: Founder Hero & Stats' },
            { id: 'chapters', label: '02: Three Chapters' },
            { id: 'team', label: `03: Team Directory (${aboutData.team?.members?.length || 0})` },
            { id: 'cta', label: '04: Closing CTA' },
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

        {/* ─── TAB 01: HERO & STATS ─── */}
        {activeTab === 'hero' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Section 01: Studio Hero &amp; Founder Overview
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                EYEBROW
              </label>
              <input
                type="text"
                value={aboutData.hero?.eyebrow || ''}
                onChange={(e) => handleHeroChange('eyebrow', e.target.value)}
                placeholder="ABOUT ĀROHANA"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                MAIN HEADLINE
              </label>
              <input
                type="text"
                value={aboutData.hero?.headline || ''}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                placeholder="I didn't plan to build Arohana."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                SUBHEADLINE / MANIFESTO HOOK
              </label>
              <textarea
                rows={2}
                value={aboutData.hero?.subheadline || ''}
                onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  INTRO PARAGRAPH 1
                </label>
                <textarea
                  rows={3}
                  value={aboutData.hero?.introP1 || ''}
                  onChange={(e) => handleHeroChange('introP1', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  INTRO PARAGRAPH 2
                </label>
                <textarea
                  rows={3}
                  value={aboutData.hero?.introP2 || ''}
                  onChange={(e) => handleHeroChange('introP2', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  FOUNDER NAME
                </label>
                <input
                  type="text"
                  value={aboutData.hero?.founderName || ''}
                  onChange={(e) => handleHeroChange('founderName', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  FOUNDER TITLE
                </label>
                <input
                  type="text"
                  value={aboutData.hero?.founderTitle || ''}
                  onChange={(e) => handleHeroChange('founderTitle', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.5rem' }}>
                EXPERIENCE &amp; SCALE METRICS (3 STATS)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                {(aboutData.hero?.stats || [{}, {}, {}]).map((st: any, idx: number) => (
                  <div key={idx} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FAFAFA' }}>
                    <input
                      type="text"
                      value={st.value || ''}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      placeholder="6+"
                      style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}
                    />
                    <input
                      type="text"
                      value={st.label || ''}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      placeholder="Years of Experience"
                      style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.75rem' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Founder Hero Image / Artwork */}
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.5rem' }}>
                FOUNDER HERO ARTWORK / COLLAGE IMAGE
              </label>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', padding: '1rem', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', backgroundColor: '#FAFAFA' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.12)',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={aboutData.hero?.image || '/images/about/hero-founder-collage.png'}
                    alt="Founder Hero Artwork"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flexGrow: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <label
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        border: '1px solid #111113',
                        backgroundColor: '#111113',
                        color: '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <Upload size={13} />
                      Upload From Any Folder
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const fd = new FormData();
                            fd.append('file', e.target.files[0]);
                            fd.append('category', 'Hero Artwork');
                            const res = await fetch('/api/upload', { method: 'POST', body: fd });
                            const data = await res.json();
                            if (data.success && data.url) {
                              handleHeroChange('image', data.url);
                            }
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setMediaTarget('founder');
                        setIsMediaPickerOpen(true);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <ImageIcon size={13} />
                      Browse Media Library
                    </button>
                  </div>
                  <input
                    type="text"
                    value={aboutData.hero?.image || ''}
                    onChange={(e) => handleHeroChange('image', e.target.value)}
                    placeholder="/images/about/hero-founder-collage.png"
                    style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.78rem' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: '#71717A' }}>
                    Tip: The collage layout and framing will be preserved automatically.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 02: THREE CHAPTERS ─── */}
        {activeTab === 'chapters' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Section 02: The Three Chapters Timeline
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveChapterIdx(idx)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: activeChapterIdx === idx ? '1px solid #DE322D' : '1px solid rgba(0,0,0,0.1)',
                      backgroundColor: activeChapterIdx === idx ? '#FEE2E2' : '#FFFFFF',
                      color: activeChapterIdx === idx ? '#DE322D' : '#52525B',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Chapter 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  CHAPTER TAG
                </label>
                <input
                  type="text"
                  value={curChapter.tag || ''}
                  onChange={(e) => handleChapterChange('tag', e.target.value)}
                  placeholder="THE ROOTS"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  CHAPTER TITLE
                </label>
                <input
                  type="text"
                  value={curChapter.title || ''}
                  onChange={(e) => handleChapterChange('title', e.target.value)}
                  placeholder="It started with hospitality."
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                SUBTITLE / PREMISE
              </label>
              <input
                type="text"
                value={curChapter.subtitle || ''}
                onChange={(e) => handleChapterChange('subtitle', e.target.value)}
                placeholder="My first world was hospitality."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                LEFT COLUMN NARRATIVE
              </label>
              <textarea
                rows={4}
                value={curChapter.leftText || ''}
                onChange={(e) => handleChapterChange('leftText', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                RIGHT COLUMN NARRATIVE
              </label>
              <textarea
                rows={4}
                value={curChapter.rightText || ''}
                onChange={(e) => handleChapterChange('rightText', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  CALLOUT QUOTE
                </label>
                <input
                  type="text"
                  value={curChapter.quote || ''}
                  onChange={(e) => handleChapterChange('quote', e.target.value)}
                  placeholder="Sometimes what looks like a marketing problem..."
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  ATTRIBUTION
                </label>
                <input
                  type="text"
                  value={curChapter.attribution || ''}
                  onChange={(e) => handleChapterChange('attribution', e.target.value)}
                  placeholder="— MADHURA HAWAL · FOUNDER, AROHANA"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 03: TEAM DIRECTORY ─── */}
        {activeTab === 'team' && (
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden' }}>
            {/* Team Members List */}
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
              {aboutData.team?.members?.map((m: any) => {
                const isSelected = m.id === selectedMember?.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMemberId(m.id)}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                      border: isSelected ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 650, color: '#111113' }}>
                      {m.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#DE322D', fontWeight: 600, marginTop: '2px' }}>
                      {m.role}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Member Form Editor */}
            {selectedMember && (
              <div style={{ overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.1em' }}>
                    TEAM MEMBER: {selectedMember.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(selectedMember.id)}
                    title="Delete Member"
                    style={{ border: 'none', backgroundColor: 'transparent', color: '#EF4444', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={selectedMember.name || ''}
                    onChange={(e) => handleMemberChange('name', e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    ROLE / DESIGNATION
                  </label>
                  <input
                    type="text"
                    value={selectedMember.role || ''}
                    onChange={(e) => handleMemberChange('role', e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                  />
                </div>

                {/* Member Photo */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    HEADSHOT / PORTRAIT PHOTO
                  </label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.85rem', backgroundColor: '#FAFAFA', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '75px',
                        height: '75px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: '#EBEBEB',
                        border: '2px solid rgba(0,0,0,0.1)',
                        flexShrink: 0,
                      }}
                    >
                      {selectedMember.image ? (
                        <Image src={selectedMember.image} alt={selectedMember.name} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A1A1AA', fontSize: '0.7rem' }}>
                          No Photo
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <label
                          style={{
                            padding: '0.45rem 0.95rem',
                            borderRadius: '9999px',
                            border: '1px solid #111113',
                            backgroundColor: '#111113',
                            color: '#FFFFFF',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <Upload size={13} />
                          Upload From Any Folder
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const fd = new FormData();
                                fd.append('file', e.target.files[0]);
                                fd.append('category', 'Team Headshots');
                                const res = await fetch('/api/upload', { method: 'POST', body: fd });
                                const data = await res.json();
                                if (data.success && data.url) {
                                  handleMemberChange('image', data.url);
                                }
                              }
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setMediaTarget('member');
                            setIsMediaPickerOpen(true);
                          }}
                          style={{
                            padding: '0.45rem 0.95rem',
                            borderRadius: '9999px',
                            border: '1px solid rgba(0, 0, 0, 0.15)',
                            backgroundColor: '#FFFFFF',
                            color: '#111113',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <ImageIcon size={13} />
                          Browse Media Library
                        </button>
                      </div>
                      <input
                        type="text"
                        value={selectedMember.image || ''}
                        onChange={(e) => handleMemberChange('image', e.target.value)}
                        placeholder="/images/about/team-abijitha.jpg"
                        style={{ width: '100%', padding: '0.4rem 0.7rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.78rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Member Bio */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                    MEMBER BIO / STATEMENT
                  </label>
                  <textarea
                    rows={4}
                    value={selectedMember.bio || ''}
                    onChange={(e) => handleMemberChange('bio', e.target.value)}
                    placeholder="Enter member bio or background story..."
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.82rem',
                      fontFamily: 'inherit',
                      lineHeight: 1.5,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 04: CLOSING CTA ─── */}
        {activeTab === 'cta' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 650, color: '#DE322D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Section 04: Bottom Closing Banner &amp; CTA
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                CTA EYEBROW
              </label>
              <input
                type="text"
                value={aboutData.cta?.eyebrow || ''}
                onChange={(e) => handleCtaChange('eyebrow', e.target.value)}
                placeholder="LET'S BUILD TOGETHER"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                CTA HEADLINE
              </label>
              <input
                type="text"
                value={aboutData.cta?.headline || ''}
                onChange={(e) => handleCtaChange('headline', e.target.value)}
                placeholder="Let's discuss what your brand needs next."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BUTTON TEXT
                </label>
                <input
                  type="text"
                  value={aboutData.cta?.buttonText || ''}
                  onChange={(e) => handleCtaChange('buttonText', e.target.value)}
                  placeholder="Start a Conversation"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                  BUTTON DESTINATION URL
                </label>
                <input
                  type="text"
                  value={aboutData.cta?.buttonUrl || ''}
                  onChange={(e) => handleCtaChange('buttonUrl', e.target.value)}
                  placeholder="/contact"
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── RIGHT COLUMN: REAL-TIME LIVE PREVIEW ─── */}
      <div style={{ height: '100%' }}>
        <LivePreviewPanel previewUrl="/about" />
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        mediaType="image"
        onSelect={(url) => {
          if (mediaTarget === 'member') {
            handleMemberChange('image', url);
          } else if (mediaTarget === 'founder') {
            handleHeroChange('image', url);
          }
          setIsMediaPickerOpen(false);
        }}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Team Member?"
        message="This profile will be permanently removed from the studio page."
        confirmLabel="Delete"
        onConfirm={handleDeleteMember}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
