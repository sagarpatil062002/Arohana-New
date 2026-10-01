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
  Save,
  Check,
  Upload,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function AdminAboutPage() {
  const { content, saveDraft, updateDraftInMemory, publishAll } = useCmsContent();
  const [aboutData, setAboutData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'chapters' | 'team' | 'cta'>('hero');
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>('abijitha');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'member' | 'founder'>('member');
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'member' | 'chapter' | 'stat';
    id: string | number;
    title: string;
    message: string;
  } | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);
  const [publishedStatus, setPublishedStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage({ text, type });
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3500);
  };

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

  // --- SAVE DRAFT & PUBLISH LIVE ---
  const handleSaveDraft = async () => {
    const ok = await saveDraft('about', aboutData);
    if (ok) {
      setSavedStatus(true);
      showToast('About draft saved to CRM!', 'success');
      setTimeout(() => setSavedStatus(false), 2000);
    } else {
      showToast('Failed to save draft', 'error');
    }
  };

  const handlePublishLive = async () => {
    // Save draft first then publish
    await saveDraft('about', aboutData);
    const ok = await publishAll();
    if (ok) {
      setPublishedStatus(true);
      showToast('About page published live to website!', 'success');
      setTimeout(() => setPublishedStatus(false), 2000);
    } else {
      showToast('Failed to publish live', 'error');
    }
  };

  // --- HERO SECTION HANDLERS ---
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

  const toggleHeroSection = () => {
    const isCurrentlyEnabled = aboutData.hero?.enabled !== false;
    const updated = {
      ...aboutData,
      hero: {
        ...(aboutData.hero || {}),
        enabled: !isCurrentlyEnabled,
      },
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
    showToast(`Hero Section ${!isCurrentlyEnabled ? 'Enabled' : 'Disabled'}`, 'info');
  };

  const handleStatChange = (idx: number, field: string, val: any) => {
    const updatedStats = [...(aboutData.hero?.stats || [])];
    if (!updatedStats[idx]) updatedStats[idx] = { value: '', label: '', enabled: true };
    updatedStats[idx] = { ...updatedStats[idx], [field]: val };
    handleHeroChange('stats', updatedStats);
  };

  const handleAddStat = () => {
    const currentStats = aboutData.hero?.stats || [];
    const newStat = { value: '10+', label: 'New Metric', enabled: true };
    const updatedStats = [...currentStats, newStat];
    handleHeroChange('stats', updatedStats);
    showToast('New Stat Added', 'success');
  };

  const handleDeleteStat = (idx: number) => {
    const currentStats = aboutData.hero?.stats || [];
    const updatedStats = currentStats.filter((_: any, i: number) => i !== idx);
    handleHeroChange('stats', updatedStats);
    setDeleteConfirm(null);
    showToast('Stat removed successfully', 'info');
  };

  // --- CHAPTERS HANDLERS ---
  const toggleChaptersSection = () => {
    const isCurrentlyEnabled = aboutData.chaptersEnabled !== false;
    const updated = {
      ...aboutData,
      chaptersEnabled: !isCurrentlyEnabled,
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
    showToast(`Chapters Section ${!isCurrentlyEnabled ? 'Enabled' : 'Disabled'}`, 'info');
  };

  const chapters = aboutData.chapters || [];
  const curChapter = chapters[activeChapterIdx] || chapters[0] || {};

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

  const handleAddChapter = () => {
    const nextNum = String(chapters.length + 1).padStart(2, '0');
    const newChapter = {
      number: nextNum,
      code: `${nextNum} / 03`,
      tag: 'NEW CHAPTER',
      title: 'New Story Title',
      subtitle: 'Chapter premise and narrative context.',
      leftText: 'Narrative column 1 content here.',
      rightText: 'Narrative column 2 content here.',
      quote: 'Inspiring takeaway quote from the journey.',
      attribution: '— MADHURA HAWAL · FOUNDER, ĀROHANA',
      enabled: true,
      showTag: true,
      showTitle: true,
      showSubtitle: true,
      showLeftText: true,
      showRightText: true,
      showQuote: true,
    };
    const updatedChapters = [...chapters, newChapter];
    const updated = { ...aboutData, chapters: updatedChapters };
    setAboutData(updated);
    setActiveChapterIdx(updatedChapters.length - 1);
    updateDraftInMemory('about', updated);
    showToast(`Added Chapter ${nextNum}`, 'success');
  };

  const handleDeleteChapter = (idx: number) => {
    const updatedChapters = chapters.filter((_: any, i: number) => i !== idx);
    const updated = { ...aboutData, chapters: updatedChapters };
    setAboutData(updated);
    if (activeChapterIdx >= updatedChapters.length) {
      setActiveChapterIdx(Math.max(0, updatedChapters.length - 1));
    }
    setDeleteConfirm(null);
    updateDraftInMemory('about', updated);
    showToast('Chapter deleted', 'info');
  };

  const handleMoveChapter = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= chapters.length) return;
    const updatedChapters = [...chapters];
    const temp = updatedChapters[index];
    updatedChapters[index] = updatedChapters[targetIdx];
    updatedChapters[targetIdx] = temp;
    const updated = { ...aboutData, chapters: updatedChapters };
    setAboutData(updated);
    setActiveChapterIdx(targetIdx);
    updateDraftInMemory('about', updated);
  };

  // --- TEAM DIRECTORY HANDLERS ---
  const toggleTeamSection = () => {
    const isCurrentlyEnabled = aboutData.team?.enabled !== false;
    const updated = {
      ...aboutData,
      team: {
        ...(aboutData.team || {}),
        enabled: !isCurrentlyEnabled,
      },
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
    showToast(`Team Section ${!isCurrentlyEnabled ? 'Enabled' : 'Disabled'}`, 'info');
  };

  const handleTeamMetaChange = (field: string, val: any) => {
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
    const updatedMembers = (aboutData.team?.members || []).map((m: any) =>
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
      name: 'New Specialist',
      role: 'CREATIVE & STRATEGY',
      image: '/images/about/team-abijitha.jpg',
      bio: 'Team member background, role, and focus at Ārohana.',
      enabled: true,
      showRole: true,
      showBio: true,
      showImage: true,
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
    showToast('New Team Member Added', 'success');
  };

  const handleDeleteMember = () => {
    if (!deleteConfirm || deleteConfirm.type !== 'member') return;
    const idToDelete = String(deleteConfirm.id);
    const updatedMembers = (aboutData.team?.members || []).filter(
      (m: any) => m.id !== idToDelete
    );
    const updated = {
      ...aboutData,
      team: {
        ...(aboutData.team || {}),
        members: updatedMembers,
      },
    };
    setAboutData(updated);
    if (selectedMemberId === idToDelete) {
      setSelectedMemberId(updatedMembers[0]?.id || null);
    }
    setDeleteConfirm(null);
    updateDraftInMemory('about', updated);
    showToast('Team member removed', 'info');
  };

  const handleMoveMember = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const members = [...(aboutData.team?.members || [])];
    if (targetIdx < 0 || targetIdx >= members.length) return;
    const temp = members[index];
    members[index] = members[targetIdx];
    members[targetIdx] = temp;
    const updated = {
      ...aboutData,
      team: {
        ...(aboutData.team || {}),
        members,
      },
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
  };

  // --- CTA HANDLERS ---
  const toggleCtaSection = () => {
    const isCurrentlyEnabled = aboutData.cta?.enabled !== false;
    const updated = {
      ...aboutData,
      cta: {
        ...(aboutData.cta || {}),
        enabled: !isCurrentlyEnabled,
      },
    };
    setAboutData(updated);
    updateDraftInMemory('about', updated);
    showToast(`Closing CTA Section ${!isCurrentlyEnabled ? 'Enabled' : 'Disabled'}`, 'info');
  };

  const handleCtaChange = (field: string, val: any) => {
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

  // Helper toggle button component for labels
  const FieldToggle = ({
    enabled,
    onToggle,
    label = '',
  }: {
    enabled: boolean;
    onToggle: () => void;
    label?: string;
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
    <div className="admin-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: '100%', minHeight: 0 }}>
      {/* ─── LEFT COLUMN: ABOUT / STUDIO SECTION EDITOR ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          height: '100%',
          minHeight: 0,
          position: 'relative',
        }}
      >
        {/* Toast notification banner */}
        {toastMessage && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              backgroundColor: toastMessage.type === 'error' ? '#EF4444' : toastMessage.type === 'info' ? '#111113' : '#16A34A',
              color: '#FFFFFF',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              pointerEvents: 'none',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <Sparkles size={13} />
            {toastMessage.text}
          </div>
        )}

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
                About / Studio Page
              </h2>
              <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
                Every section, card, metric &amp; field editable with enable/disable switches.
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
                  fontWeight: 650,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="hero">01: Founder &amp; Studio Origin</option>
                <option value="chapters">02: The 3 Core Chapters</option>
                <option value="team">03: Team Directory</option>
                <option value="cta">04: Closing Statement &amp; CTA</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Save Draft Button */}
            <button
              type="button"
              onClick={handleSaveDraft}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: savedStatus ? '#16A34A' : '#FFFFFF',
                color: savedStatus ? '#FFFFFF' : '#111113',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {savedStatus ? <Check size={14} /> : <Save size={14} />}
              {savedStatus ? 'Draft Saved' : 'Save Draft'}
            </button>

            {/* Publish Live Button */}
            <button
              type="button"
              onClick={handlePublishLive}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: publishedStatus ? '#16A34A' : '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 650,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {publishedStatus ? <Check size={14} /> : <Sparkles size={14} />}
              {publishedStatus ? 'Published Live' : 'Publish Live'}
            </button>
          </div>
        </div>

        {/* Section Tabs */}
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
            { id: 'hero', label: '01: Founder Hero & Stats', active: activeTab === 'hero', isSecEnabled: aboutData.hero?.enabled !== false },
            { id: 'chapters', label: `02: Core Chapters (${chapters.length})`, active: activeTab === 'chapters', isSecEnabled: aboutData.chaptersEnabled !== false },
            { id: 'team', label: `03: Team Directory (${aboutData.team?.members?.length || 0})`, active: activeTab === 'team', isSecEnabled: aboutData.team?.enabled !== false },
            { id: 'cta', label: '04: Closing CTA', active: activeTab === 'cta', isSecEnabled: aboutData.cta?.enabled !== false },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.9rem',
                fontSize: '0.78rem',
                fontWeight: tab.active ? 700 : 500,
                color: tab.active ? '#111113' : '#71717A',
                background: tab.active ? '#FFFFFF' : 'transparent',
                border: tab.active ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: tab.isSecEnabled ? '#10B981' : '#EF4444',
                }}
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB 01: HERO & STATS ─── */}
        {activeTab === 'hero' && (
          <div
            className="admin-editor-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem 1.5rem 6rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Section Master Enable / Disable Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1.15rem',
                borderRadius: '10px',
                backgroundColor: aboutData.hero?.enabled !== false ? '#ECFDF5' : '#FEF2F2',
                border: aboutData.hero?.enabled !== false ? '1px solid #A7F3D0' : '1px solid #FECACA',
              }}
            >
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: aboutData.hero?.enabled !== false ? '#065F46' : '#991B1B' }}>
                  Section 01: Studio Hero &amp; Founder Overview
                </div>
                <div style={{ fontSize: '0.72rem', color: aboutData.hero?.enabled !== false ? '#047857' : '#DC2626' }}>
                  {aboutData.hero?.enabled !== false ? 'Currently Visible on live /about page' : 'Currently Hidden on live /about page'}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleHeroSection}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: aboutData.hero?.enabled !== false ? '#047857' : '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '0.76rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {aboutData.hero?.enabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {aboutData.hero?.enabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            {/* Eyebrow */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>EYEBROW</label>
                <FieldToggle
                  enabled={aboutData.hero?.showEyebrow !== false}
                  onToggle={() => handleHeroChange('showEyebrow', aboutData.hero?.showEyebrow === false)}
                />
              </div>
              <input
                type="text"
                value={aboutData.hero?.eyebrow || ''}
                onChange={(e) => handleHeroChange('eyebrow', e.target.value)}
                placeholder="ABOUT ĀROHANA"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            {/* Main Headline */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>MAIN HEADLINE</label>
                <FieldToggle
                  enabled={aboutData.hero?.showHeadline !== false}
                  onToggle={() => handleHeroChange('showHeadline', aboutData.hero?.showHeadline === false)}
                />
              </div>
              <input
                type="text"
                value={aboutData.hero?.headline || ''}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                placeholder="I didn't plan to build Arohana."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            {/* Subheadline / Manifesto Hook */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>SUBHEADLINE / MANIFESTO HOOK</label>
                <FieldToggle
                  enabled={aboutData.hero?.showSubheadline !== false}
                  onToggle={() => handleHeroChange('showSubheadline', aboutData.hero?.showSubheadline === false)}
                />
              </div>
              <textarea
                rows={2}
                value={aboutData.hero?.subheadline || ''}
                onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* Narrative Paragraphs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>INTRO PARAGRAPH 1</label>
                  <FieldToggle
                    enabled={aboutData.hero?.showIntroP1 !== false}
                    onToggle={() => handleHeroChange('showIntroP1', aboutData.hero?.showIntroP1 === false)}
                  />
                </div>
                <textarea
                  rows={4}
                  value={aboutData.hero?.introP1 || ''}
                  onChange={(e) => handleHeroChange('introP1', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>INTRO PARAGRAPH 2</label>
                  <FieldToggle
                    enabled={aboutData.hero?.showIntroP2 !== false}
                    onToggle={() => handleHeroChange('showIntroP2', aboutData.hero?.showIntroP2 === false)}
                  />
                </div>
                <textarea
                  rows={4}
                  value={aboutData.hero?.introP2 || ''}
                  onChange={(e) => handleHeroChange('introP2', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                />
              </div>
            </div>

            {/* Founder Card Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>FOUNDER NAME</label>
                  <FieldToggle
                    enabled={aboutData.hero?.showFounderName !== false}
                    onToggle={() => handleHeroChange('showFounderName', aboutData.hero?.showFounderName === false)}
                  />
                </div>
                <input
                  type="text"
                  value={aboutData.hero?.founderName || ''}
                  onChange={(e) => handleHeroChange('founderName', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>FOUNDER TITLE</label>
                  <FieldToggle
                    enabled={aboutData.hero?.showFounderTitle !== false}
                    onToggle={() => handleHeroChange('showFounderTitle', aboutData.hero?.showFounderTitle === false)}
                  />
                </div>
                <input
                  type="text"
                  value={aboutData.hero?.founderTitle || ''}
                  onChange={(e) => handleHeroChange('founderTitle', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Stats Block */}
            <div style={{ padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#111113' }}>
                    EXPERIENCE &amp; SCALE METRICS
                  </label>
                  <FieldToggle
                    enabled={aboutData.hero?.showStats !== false}
                    onToggle={() => handleHeroChange('showStats', aboutData.hero?.showStats === false)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddStat}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: '#111113',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={12} /> Add Metric
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {(aboutData.hero?.stats || []).map((st: any, idx: number) => {
                  const isStEnabled = st.enabled !== false;
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: isStEnabled ? '1px solid rgba(0,0,0,0.12)' : '1px dashed #FECACA',
                        backgroundColor: isStEnabled ? '#FFFFFF' : '#FEF2F2',
                        position: 'relative',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#71717A' }}>STAT 0{idx + 1}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => handleStatChange(idx, 'enabled', !isStEnabled)}
                            style={{
                              border: 'none',
                              backgroundColor: isStEnabled ? '#ECFDF5' : '#FEE2E2',
                              color: isStEnabled ? '#047857' : '#DC2626',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              fontSize: '0.65rem',
                              cursor: 'pointer',
                            }}
                          >
                            {isStEnabled ? <Eye size={11} /> : <EyeOff size={11} />}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirm({
                                type: 'stat',
                                id: idx,
                                title: 'Delete Metric?',
                                message: `Remove metric "${st.label || st.value}" from the about hero?`,
                              })
                            }
                            style={{
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: '#EF4444',
                              cursor: 'pointer',
                              padding: '2px',
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
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
                  );
                })}
              </div>
            </div>

            {/* Founder Hero Image */}
            <div style={{ padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>
                  FOUNDER PORTRAIT PHOTO / HERO ARTWORK
                </label>
                <FieldToggle
                  enabled={aboutData.hero?.showFounderPhoto !== false}
                  onToggle={() => handleHeroChange('showFounderPhoto', aboutData.hero?.showFounderPhoto === false)}
                />
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '90px',
                    height: '110px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.12)',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={aboutData.hero?.image || '/images/about/madhura-portrait.jpg'}
                    alt="Founder Hero"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
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
                        gap: '0.4rem',
                      }}
                    >
                      <Upload size={13} /> Upload Photo
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
                              showToast('Founder photo uploaded!', 'success');
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
                        gap: '0.4rem',
                      }}
                    >
                      <ImageIcon size={13} /> Select Media
                    </button>
                  </div>
                  <input
                    type="text"
                    value={aboutData.hero?.image || ''}
                    onChange={(e) => handleHeroChange('image', e.target.value)}
                    placeholder="/images/about/madhura-portrait.jpg"
                    style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.78rem' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 02: THREE CHAPTERS ─── */}
        {activeTab === 'chapters' && (
          <div
            className="admin-editor-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem 1.5rem 6rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Section Enable/Disable Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1.15rem',
                borderRadius: '10px',
                backgroundColor: aboutData.chaptersEnabled !== false ? '#ECFDF5' : '#FEF2F2',
                border: aboutData.chaptersEnabled !== false ? '1px solid #A7F3D0' : '1px solid #FECACA',
              }}
            >
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: aboutData.chaptersEnabled !== false ? '#065F46' : '#991B1B' }}>
                  Section 02: The Three Chapters Timeline
                </div>
                <div style={{ fontSize: '0.72rem', color: aboutData.chaptersEnabled !== false ? '#047857' : '#DC2626' }}>
                  {aboutData.chaptersEnabled !== false ? 'Currently Visible on live /about page' : 'Currently Hidden on live /about page'}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleChaptersSection}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: aboutData.chaptersEnabled !== false ? '#047857' : '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '0.76rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {aboutData.chaptersEnabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {aboutData.chaptersEnabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            {/* Chapters Navigation & Add Chapter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {chapters.map((ch: any, idx: number) => {
                  const isChEnabled = ch.enabled !== false;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveChapterIdx(idx)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        border: activeChapterIdx === idx ? '1px solid #DE322D' : '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: activeChapterIdx === idx ? '#FEE2E2' : '#FFFFFF',
                        color: activeChapterIdx === idx ? '#DE322D' : isChEnabled ? '#111113' : '#9CA3AF',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: isChEnabled ? '#10B981' : '#EF4444',
                        }}
                      />
                      Chapter {ch.number || `0${idx + 1}`}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleAddChapter}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '9999px',
                  backgroundColor: '#111113',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Plus size={12} /> Add Chapter
              </button>
            </div>

            {/* Current Chapter Controls & Fields */}
            {curChapter && (
              <div style={{ padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#DE322D' }}>
                      CHAPTER {curChapter.number || `0${activeChapterIdx + 1}`}
                    </span>
                    <FieldToggle
                      enabled={curChapter.enabled !== false}
                      onToggle={() => handleChapterChange('enabled', curChapter.enabled === false)}
                      label="Chapter"
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      type="button"
                      disabled={activeChapterIdx === 0}
                      onClick={() => handleMoveChapter(activeChapterIdx, 'up')}
                      title="Move chapter up"
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: '#FFFFFF',
                        cursor: activeChapterIdx === 0 ? 'not-allowed' : 'pointer',
                        opacity: activeChapterIdx === 0 ? 0.4 : 1,
                      }}
                    >
                      <ChevronUp size={13} />
                    </button>
                    <button
                      type="button"
                      disabled={activeChapterIdx === chapters.length - 1}
                      onClick={() => handleMoveChapter(activeChapterIdx, 'down')}
                      title="Move chapter down"
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: '#FFFFFF',
                        cursor: activeChapterIdx === chapters.length - 1 ? 'not-allowed' : 'pointer',
                        opacity: activeChapterIdx === chapters.length - 1 ? 0.4 : 1,
                      }}
                    >
                      <ChevronDown size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          type: 'chapter',
                          id: activeChapterIdx,
                          title: `Delete Chapter ${curChapter.number || activeChapterIdx + 1}?`,
                          message: `This will permanently delete "${curChapter.title || 'this chapter'}" from the studio story.`,
                        })
                      }
                      title="Delete chapter"
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #FECACA',
                        backgroundColor: '#FEF2F2',
                        color: '#EF4444',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>CHAPTER TAG</label>
                      <FieldToggle
                        enabled={curChapter.showTag !== false}
                        onToggle={() => handleChapterChange('showTag', curChapter.showTag === false)}
                      />
                    </div>
                    <input
                      type="text"
                      value={curChapter.tag || ''}
                      onChange={(e) => handleChapterChange('tag', e.target.value)}
                      placeholder="THE ROOTS"
                      style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>CHAPTER TITLE</label>
                      <FieldToggle
                        enabled={curChapter.showTitle !== false}
                        onToggle={() => handleChapterChange('showTitle', curChapter.showTitle === false)}
                      />
                    </div>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>SUBTITLE / PREMISE</label>
                    <FieldToggle
                      enabled={curChapter.showSubtitle !== false}
                      onToggle={() => handleChapterChange('showSubtitle', curChapter.showSubtitle === false)}
                    />
                  </div>
                  <input
                    type="text"
                    value={curChapter.subtitle || ''}
                    onChange={(e) => handleChapterChange('subtitle', e.target.value)}
                    placeholder="My first world was hospitality."
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>LEFT COLUMN NARRATIVE</label>
                    <FieldToggle
                      enabled={curChapter.showLeftText !== false}
                      onToggle={() => handleChapterChange('showLeftText', curChapter.showLeftText === false)}
                    />
                  </div>
                  <textarea
                    rows={4}
                    value={curChapter.leftText || ''}
                    onChange={(e) => handleChapterChange('leftText', e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>RIGHT COLUMN NARRATIVE</label>
                    <FieldToggle
                      enabled={curChapter.showRightText !== false}
                      onToggle={() => handleChapterChange('showRightText', curChapter.showRightText === false)}
                    />
                  </div>
                  <textarea
                    rows={4}
                    value={curChapter.rightText || ''}
                    onChange={(e) => handleChapterChange('rightText', e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>CALLOUT QUOTE</label>
                      <FieldToggle
                        enabled={curChapter.showQuote !== false}
                        onToggle={() => handleChapterChange('showQuote', curChapter.showQuote === false)}
                      />
                    </div>
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
          </div>
        )}

        {/* ─── TAB 03: TEAM DIRECTORY ─── */}
        {activeTab === 'team' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Section Enable/Disable Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1.15rem',
                margin: '1rem 1rem 0 1rem',
                borderRadius: '10px',
                backgroundColor: aboutData.team?.enabled !== false ? '#ECFDF5' : '#FEF2F2',
                border: aboutData.team?.enabled !== false ? '1px solid #A7F3D0' : '1px solid #FECACA',
              }}
            >
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: aboutData.team?.enabled !== false ? '#065F46' : '#991B1B' }}>
                  Section 03: Team Directory &amp; Roles
                </div>
                <div style={{ fontSize: '0.72rem', color: aboutData.team?.enabled !== false ? '#047857' : '#DC2626' }}>
                  {aboutData.team?.enabled !== false ? 'Currently Visible on live /about page' : 'Currently Hidden on live /about page'}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTeamSection}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: aboutData.team?.enabled !== false ? '#047857' : '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '0.76rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {aboutData.team?.enabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {aboutData.team?.enabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            {/* Team Meta: Eyebrow & Title */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem', padding: '0.75rem 1rem 0 1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#52525B' }}>EYEBROW</label>
                  <FieldToggle
                    enabled={aboutData.team?.showEyebrow !== false}
                    onToggle={() => handleTeamMetaChange('showEyebrow', aboutData.team?.showEyebrow === false)}
                  />
                </div>
                <input
                  type="text"
                  value={aboutData.team?.eyebrow || ''}
                  onChange={(e) => handleTeamMetaChange('eyebrow', e.target.value)}
                  placeholder="OUR TEAM"
                  style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.78rem' }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#52525B' }}>TITLE</label>
                  <FieldToggle
                    enabled={aboutData.team?.showTitle !== false}
                    onToggle={() => handleTeamMetaChange('showTitle', aboutData.team?.showTitle === false)}
                  />
                </div>
                <input
                  type="text"
                  value={aboutData.team?.title || ''}
                  onChange={(e) => handleTeamMetaChange('title', e.target.value)}
                  placeholder="People behind possibilities."
                  style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.78rem' }}
                />
              </div>
            </div>

            {/* 2-Column Split: Member List + Selected Member Form */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '270px 1fr', overflow: 'hidden', marginTop: '0.75rem' }}>
              {/* Member List */}
              <div
                className="admin-editor-scroll"
                style={{
                  borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                  overflowY: 'auto',
                  padding: '0.75rem',
                  backgroundColor: '#FAFAFA',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#52525B', textTransform: 'uppercase' }}>
                    Members ({aboutData.team?.members?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddNewMember}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: '#111113',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>

                {aboutData.team?.members?.map((m: any, idx: number, arr: any[]) => {
                  const isSelected = m.id === selectedMember?.id;
                  const isEnabled = m.enabled !== false;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMemberId(m.id)}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                        border: isSelected ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid transparent',
                        boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.04)' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        opacity: isEnabled ? 1 : 0.6,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0, paddingRight: '0.5rem' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 650, color: '#111113', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: isEnabled ? '#DE322D' : '#71717A', fontWeight: 600, marginTop: '2px' }}>
                          {m.role || 'Team Member'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedMembers = aboutData.team.members.map((item: any) =>
                              item.id === m.id ? { ...item, enabled: !isEnabled } : item
                            );
                            const updated = {
                              ...aboutData,
                              team: { ...(aboutData.team || {}), members: updatedMembers },
                            };
                            setAboutData(updated);
                            updateDraftInMemory('about', updated);
                            showToast(`${m.name} ${!isEnabled ? 'enabled' : 'disabled'}`, 'info');
                          }}
                          title={isEnabled ? 'Disable member' : 'Enable member'}
                          style={{
                            border: 'none',
                            background: isEnabled ? '#ECFDF5' : '#FEE2E2',
                            color: isEnabled ? '#047857' : '#DC2626',
                            borderRadius: '4px',
                            padding: '3px',
                            cursor: 'pointer',
                          }}
                        >
                          {isEnabled ? <Eye size={12} /> : <EyeOff size={12} />}
                        </button>
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveMember(idx, 'up')}
                          title="Move member up"
                          style={{
                            border: 'none',
                            background: 'transparent',
                            color: idx === 0 ? '#D4D4D8' : '#52525B',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            padding: '2px',
                          }}
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === arr.length - 1}
                          onClick={() => handleMoveMember(idx, 'down')}
                          title="Move member down"
                          style={{
                            border: 'none',
                            background: 'transparent',
                            color: idx === arr.length - 1 ? '#D4D4D8' : '#52525B',
                            cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer',
                            padding: '2px',
                          }}
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Member Form Editor */}
              {selectedMember && (
                <div
                  className="admin-editor-scroll"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.25rem 1.5rem 6rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.1em' }}>
                        TEAM MEMBER: {selectedMember.name}
                      </span>
                      <FieldToggle
                        enabled={selectedMember.enabled !== false}
                        onToggle={() => handleMemberChange('enabled', selectedMember.enabled === false)}
                        label="Member"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          type: 'member',
                          id: selectedMember.id,
                          title: `Delete ${selectedMember.name}?`,
                          message: 'This profile will be permanently removed from the studio team section.',
                        })
                      }
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>ROLE / DESIGNATION</label>
                      <FieldToggle
                        enabled={selectedMember.showRole !== false}
                        onToggle={() => handleMemberChange('showRole', selectedMember.showRole === false)}
                      />
                    </div>
                    <input
                      type="text"
                      value={selectedMember.role || ''}
                      onChange={(e) => handleMemberChange('role', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>BIO DESCRIPTION</label>
                      <FieldToggle
                        enabled={selectedMember.showBio !== false}
                        onToggle={() => handleMemberChange('showBio', selectedMember.showBio === false)}
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={selectedMember.bio || ''}
                      onChange={(e) => handleMemberChange('bio', e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.82rem', fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* Member Photo */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>PORTRAIT PHOTO</label>
                      <FieldToggle
                        enabled={selectedMember.showImage !== false}
                        onToggle={() => handleMemberChange('showImage', selectedMember.showImage === false)}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.85rem', backgroundColor: '#FAFAFA', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <div
                        style={{
                          position: 'relative',
                          width: '70px',
                          height: '70px',
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
                            Upload Photo
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const fd = new FormData();
                                  fd.append('file', e.target.files[0]);
                                  fd.append('category', 'Team');
                                  const res = await fetch('/api/upload', { method: 'POST', body: fd });
                                  const data = await res.json();
                                  if (data.success && data.url) {
                                    handleMemberChange('image', data.url);
                                    showToast(`${selectedMember.name} photo updated`, 'success');
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
                            <ImageIcon size={13} /> Select Media
                          </button>
                        </div>
                        <input
                          type="text"
                          value={selectedMember.image || ''}
                          onChange={(e) => handleMemberChange('image', e.target.value)}
                          placeholder="/images/about/team-abijitha.jpg"
                          style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.78rem' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 04: CLOSING CTA ─── */}
        {activeTab === 'cta' && (
          <div
            className="admin-editor-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem 1.5rem 6rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Section Master Enable / Disable Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1.15rem',
                borderRadius: '10px',
                backgroundColor: aboutData.cta?.enabled !== false ? '#ECFDF5' : '#FEF2F2',
                border: aboutData.cta?.enabled !== false ? '1px solid #A7F3D0' : '1px solid #FECACA',
              }}
            >
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: aboutData.cta?.enabled !== false ? '#065F46' : '#991B1B' }}>
                  Section 04: Closing Statement &amp; CTA
                </div>
                <div style={{ fontSize: '0.72rem', color: aboutData.cta?.enabled !== false ? '#047857' : '#DC2626' }}>
                  {aboutData.cta?.enabled !== false ? 'Currently Visible on live /about page' : 'Currently Hidden on live /about page'}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleCtaSection}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: aboutData.cta?.enabled !== false ? '#047857' : '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '0.76rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                }}
              >
                {aboutData.cta?.enabled !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                {aboutData.cta?.enabled !== false ? 'Disable Section' : 'Enable Section'}
              </button>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>CTA EYEBROW</label>
                <FieldToggle
                  enabled={aboutData.cta?.showEyebrow !== false}
                  onToggle={() => handleCtaChange('showEyebrow', aboutData.cta?.showEyebrow === false)}
                />
              </div>
              <input
                type="text"
                value={aboutData.cta?.eyebrow || ''}
                onChange={(e) => handleCtaChange('eyebrow', e.target.value)}
                placeholder="LET'S BUILD TOGETHER"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>CTA HEADLINE</label>
                <FieldToggle
                  enabled={aboutData.cta?.showHeadline !== false}
                  onToggle={() => handleCtaChange('showHeadline', aboutData.cta?.showHeadline === false)}
                />
              </div>
              <textarea
                rows={2}
                value={aboutData.cta?.headline || ''}
                onChange={(e) => handleCtaChange('headline', e.target.value)}
                placeholder="Serious about what you're building."
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#52525B' }}>BUTTON TEXT</label>
                  <FieldToggle
                    enabled={aboutData.cta?.showButton !== false}
                    onToggle={() => handleCtaChange('showButton', aboutData.cta?.showButton === false)}
                  />
                </div>
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
        initialUrl={mediaTarget === 'founder' ? (aboutData.hero?.image || '') : (selectedMember?.image || '')}
        onSelect={(url) => {
          if (mediaTarget === 'member') {
            handleMemberChange('image', url);
          } else if (mediaTarget === 'founder') {
            handleHeroChange('image', url);
          }
          setIsMediaPickerOpen(false);
          showToast('Image updated from media library', 'success');
        }}
      />

      {/* Generic Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title={deleteConfirm?.title || 'Confirm Deletion'}
        message={deleteConfirm?.message || 'This action cannot be undone.'}
        confirmLabel="Delete"
        onConfirm={() => {
          if (!deleteConfirm) return;
          if (deleteConfirm.type === 'member') {
            handleDeleteMember();
          } else if (deleteConfirm.type === 'chapter') {
            handleDeleteChapter(Number(deleteConfirm.id));
          } else if (deleteConfirm.type === 'stat') {
            handleDeleteStat(Number(deleteConfirm.id));
          }
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </div>
  );
}
