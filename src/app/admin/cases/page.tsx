'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Search,
  Upload,
  Layers,
  Sparkles,
  ExternalLink,
  RotateCcw,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  ListOrdered,
  HelpCircle,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

const DEFAULT_CASE_DETAILS: Record<string, any> = {
  'raysons-group': {
    subtitle: 'One relationship. Three very different businesses.',
    heroImage: '/images/case-studies/raysons/neora-1.jpg',
    heroImageCaption: 'Neora Deck rooftop hospitality & on-ground execution — the origin of Ārohana’s partnership with Raysons Group.',
    sector: 'Hospitality, Real Estate & Industrial Casting',
    snapshot: {
      location: 'Kolhapur & Western Maharashtra',
      engagementType: 'Relationship-Led Multi-Entity Partnership',
      duration: 'Ongoing Retainers + Specialised Production Project',
      coreCapabilities: [
        'Content Strategy & Planning',
        'Full-Scope Social Media Management',
        'Architectural & Lifestyle Shoots',
        'Technical Scripting & Video Direction',
        'Corporate Presentation Film',
      ],
    },
    situation: [
      'Ārohana’s relationship with Raysons Group began with Neora Deck, the group’s hospitality business.',
      'What started there grew into a broader engagement with the group’s real-estate business, where we manage the complete social-media presence — from strategy and content planning to shoots, scripting, design, editing and publishing.',
      'The third assignment was different again: a corporate film for the group’s casting business, created for prospective clients.',
    ],
    realChallenge: [
      'The value of the relationship is not a single campaign. It is the confidence to bring the same strategic and creative partner into businesses with completely different audiences and communication needs.',
      'The story is not ‘one client, one brief’. It is a relationship that expanded across three very different businesses within the Raysons Group, demonstrating trust, range and long-term execution without making unsupported claims.',
    ],
    thinking: [
      'Lead with the relationship story, not a generic service list.',
      'Different businesses require different communication approaches — Neora Deck demanded vibrant experiential lifestyle content, Raysons Real Estate required credibility, architecture and development quality, while the Casting vertical required a focused corporate industrial film.',
      'Maintain strategy-led execution across all touchpoints rather than forcing every business into the same generic social-media template.',
    ],
    work: [
      {
        title: 'Neora Deck (Hospitality)',
        description: 'For Neora Deck, Ārohana handles the complete social-media function — content calendar, concepts, creative direction, shoots, scripting, graphic design, video editing, posting and ongoing communication.',
        bullets: ['Content calendar & monthly concepts', 'Creative direction & live shoots', 'Scripting & graphic design', 'Video editing & community publishing'],
      },
      {
        title: 'Raysons Real Estate',
        description: 'The real-estate brief required a different communication language built around projects, credibility, architecture, development and business quality. Ārohana manages the complete social-media process: strategy, calendars, concepts, shoots, scripts, design, editing and publishing.',
        bullets: ['Complete social-media process & strategy', 'Architectural & development site shoots', 'Professional representation for target property buyers', 'Consistent digital presence across milestones'],
      },
      {
        title: 'Raysons Casting (Industrial Film)',
        description: 'A focused, high-production corporate film designed to present the casting vertical’s capabilities, infrastructure and quality standards to prospective clients.',
        bullets: ['Concept & technical scripting', 'On-ground industrial cinematography', 'Professional voiceover & audio mastering', 'Precision editing & color grade'],
      },
    ],
    gallery: [
      { image: '/images/case-studies/raysons/neora-1.jpg', caption: 'Neora Deck: Sunset dining aesthetic & architectural geometry', alt: 'Neora Deck Kolhapur' },
      { image: '/images/case-studies/raysons/realestate-1.jpg', caption: 'Raysons Real Estate: Premium residential project showcase', alt: 'Raysons Real Estate' },
      { image: '/images/case-studies/raysons/casting-1.jpg', caption: 'Raysons Casting: High-precision engineering cinematography', alt: 'Raysons Casting' },
    ],
    proof: {
      verifiedText: 'Expanded across three distinct commercial verticals over 18+ months with zero agency churn, delivering high-retention social content, project launches, and commercial film assets.',
      metricsNote: '3 Verticals • 100% Retainer Retention • 45+ Production Assets Delivered',
    },
    closingQuote: 'Long-term client relationships aren’t built on presentations. They are built on delivering quality consistently across completely different business realities.',
    closingText: 'Have a multi-entity or diversified business challenge? Let’s talk.',
  },
};

export default function AdminCasesPage() {
  const { content, saveDraft, updateDraftInMemory, publishAll } = useCmsContent();
  const [workData, setWorkData] = useState<any>(null);
  const [caseSubTab, setCaseSubTab] = useState<'card' | 'hero' | 'narrative' | 'gallery' | 'outcomes'>('card');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('raysons-group');
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ path: string; type?: 'image' | 'video' } | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  const caseImgInputRef = useRef<HTMLInputElement>(null);
  const heroImgInputRef = useRef<HTMLInputElement>(null);
  const galleryImgInputRef = useRef<HTMLInputElement>(null);
  const activeGalleryIdxRef = useRef<number>(-1);

  useEffect(() => {
    if (content.work) {
      setWorkData(JSON.parse(JSON.stringify(content.work)));
    }
  }, [content.work]);

  if (!workData) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#71717A' }}>Loading Case Studies...</div>;
  }

  const selectedCase =
    workData.caseStudies?.find((c: any) => c.id === selectedCaseId || c.slug === selectedCaseId) ||
    workData.caseStudies?.[0];

  const getCaseWithDefaults = (c: any) => {
    if (!c) return null;
    const defaults = DEFAULT_CASE_DETAILS[c.slug || c.id] || {};
    return {
      subtitle: c.subtitle || defaults.subtitle || c.desc || '',
      heroImage: c.heroImage || defaults.heroImage || c.image || '',
      heroImageCaption: c.heroImageCaption || defaults.heroImageCaption || '',
      sector: c.sector || defaults.sector || c.category || '',
      snapshot: {
        location: c.snapshot?.location || defaults.snapshot?.location || '',
        engagementType: c.snapshot?.engagementType || defaults.snapshot?.engagementType || '',
        duration: c.snapshot?.duration || defaults.snapshot?.duration || '',
        coreCapabilities: Array.isArray(c.snapshot?.coreCapabilities)
          ? c.snapshot.coreCapabilities
          : defaults.snapshot?.coreCapabilities || [],
      },
      situation: Array.isArray(c.situation)
        ? c.situation
        : defaults.situation || (c.desc ? [c.desc] : []),
      realChallenge: Array.isArray(c.realChallenge)
        ? c.realChallenge
        : defaults.realChallenge || [],
      thinking: Array.isArray(c.thinking)
        ? c.thinking
        : defaults.thinking || [],
      work: Array.isArray(c.work) ? c.work : defaults.work || [],
      gallery: Array.isArray(c.gallery) ? c.gallery : defaults.gallery || [],
      proof: {
        verifiedText: c.proof?.verifiedText || defaults.proof?.verifiedText || '',
        metricsNote: c.proof?.metricsNote || defaults.proof?.metricsNote || '',
      },
      closingQuote: c.closingQuote || defaults.closingQuote || '',
      closingText: c.closingText || defaults.closingText || '',
      ...c,
    };
  };

  const activeCaseMerged = getCaseWithDefaults(selectedCase);

  const handleCaseChange = async (field: string, val: any) => {
    if (!selectedCase) return;
    const updatedCases = workData.caseStudies.map((c: any) =>
      c.id === selectedCase.id ? { ...getCaseWithDefaults(c), [field]: val } : c
    );
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
  };

  const handleSaveAndSync = async (dataToSave?: any) => {
    const target = dataToSave || workData;
    const ok = await saveDraft('work', target);
    if (ok) {
      setSavedStatus(true);
      setPreviewKey((k) => k + 1);
      setTimeout(() => setSavedStatus(false), 2200);
    }
  };

  const handlePublishLive = async () => {
    await saveDraft('work', workData);
    const res = await publishAll();
    if (res.success) {
      alert('All case studies published live successfully!');
    }
  };

  const handleDirectUpload = async (file: File, target: 'card' | 'hero' | 'gallery') => {
    if (!selectedCase) return;
    setUploadingFor(target);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        if (target === 'card') {
          handleCaseChange('image', data.url);
        } else if (target === 'hero') {
          handleCaseChange('heroImage', data.url);
        } else if (target === 'gallery' && activeGalleryIdxRef.current >= 0) {
          const g = [...(activeCaseMerged?.gallery || [])];
          g[activeGalleryIdxRef.current].image = data.url;
          handleCaseChange('gallery', g);
        }
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploadingFor(null);
    }
  };

  const filteredCases = (workData.caseStudies || []).filter((c: any) =>
    (c.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    borderRadius: '6px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    fontSize: '0.85rem',
    backgroundColor: '#FFFFFF',
    color: '#111113',
    outline: 'none',
  };

  const mediaBtnStyle = {
    padding: '0.45rem 0.85rem',
    borderRadius: '6px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: '#FFFFFF',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    color: '#111113',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 72px)', overflow: 'hidden' }}>
      {/* ── TOP ACTION HEADER ── */}
      <div
        style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111113' }}>
            Case Studies Directory
          </div>
          <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: '#F4F4F5', color: '#52525B', fontWeight: 600 }}>
            {workData.caseStudies?.length || 0} Case Studies
          </span>
          <Link
            href="/admin/work"
            style={{
              fontSize: '0.78rem',
              color: '#DE322D',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              marginLeft: '0.5rem',
              fontWeight: 600,
            }}
          >
            <Briefcase size={13} />
            <span>Go to Work Page & Reels</span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={() => handleSaveAndSync()}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '6px',
              backgroundColor: '#111113',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}
          >
            {savedStatus ? <Check size={14} color="#4ADE80" /> : null}
            <span>{savedStatus ? 'Saved & Synced' : 'Save Changes'}</span>
          </button>
          <button
            type="button"
            onClick={handlePublishLive}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '6px',
              backgroundColor: '#DE322D',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Publish Live
          </button>
        </div>
      </div>

      {/* ── SPLIT MAIN WORKSPACE: LEFT EDITOR | RIGHT LIVE PREVIEW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
        {/* LEFT COLUMN: CASE STUDIES SELECTOR + SUBTABS EDITOR */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: '100%', overflow: 'hidden', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
          {/* Sub-Sidebar: Project Cards List */}
          <div
            style={{
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FAF9F6',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '0.75rem', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '0.4rem 0.6rem',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                <Search size={14} color="#71717A" style={{ marginRight: '0.4rem' }} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '0.78rem',
                    width: '100%',
                  }}
                />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
              {filteredCases.map((c: any) => {
                const isSelected = (c.id === selectedCase?.id || c.slug === selectedCase?.slug);
                return (
                  <div
                    key={c.id || c.slug}
                    onClick={() => setSelectedCaseId(c.id || c.slug)}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#111113' : 'transparent',
                      color: isSelected ? '#FFFFFF' : '#111113',
                      cursor: 'pointer',
                      marginBottom: '0.35rem',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: isSelected ? 650 : 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.title || 'Untitled Case'}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: isSelected ? 'rgba(255, 255, 255, 0.65)' : '#71717A', marginTop: '0.15rem' }}>
                        {c.category || 'General'}
                      </div>
                    </div>
                    {c.published === false && (
                      <EyeOff size={13} color={isSelected ? '#9CA3AF' : '#A1A1AA'} />
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <button
                type="button"
                onClick={() => {
                  const newSlug = `new-project-${Date.now().toString().slice(-4)}`;
                  const newCase = {
                    id: newSlug,
                    slug: newSlug,
                    title: 'New Case Study',
                    category: 'Brand Strategy',
                    desc: 'Project brief and narrative summary.',
                    tags: ['Brand Strategy'],
                    image: '/images/case-studies/raysons/neora-1.jpg',
                    published: true,
                  };
                  const updated = { ...workData, caseStudies: [...(workData.caseStudies || []), newCase] };
                  setWorkData(updated);
                  setSelectedCaseId(newSlug);
                  updateDraftInMemory('work', updated);
                }}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  border: '1px dashed rgba(0, 0, 0, 0.25)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  color: '#111113',
                }}
              >
                <Plus size={14} />
                <span>Add Case Study</span>
              </button>
            </div>
          </div>

          {/* Sub-Editor: Details for Selected Case Study */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
            {selectedCase ? (
              <>
                {/* Case Study Sub-Tabs */}
                <div
                  style={{
                    display: 'flex',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    padding: '0 1rem',
                    backgroundColor: '#FAFAFA',
                    flexShrink: 0,
                  }}
                >
                  {[
                    { id: 'card', label: '1. Card Info' },
                    { id: 'hero', label: '2. Hero & Lead' },
                    { id: 'narrative', label: '3. Narrative & Pillars' },
                    { id: 'gallery', label: '4. Visual Gallery' },
                    { id: 'outcomes', label: '5. Proof & Closing' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setCaseSubTab(st.id as any)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        border: 'none',
                        borderBottom: caseSubTab === st.id ? '2px solid #DE322D' : '2px solid transparent',
                        backgroundColor: 'transparent',
                        fontSize: '0.78rem',
                        fontWeight: caseSubTab === st.id ? 650 : 500,
                        color: caseSubTab === st.id ? '#DE322D' : '#71717A',
                        cursor: 'pointer',
                      }}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* Sub-Tab Content Editor */}
                <div className="admin-editor-scroll" style={{ padding: '1.5rem 1.5rem 6rem 1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {/* SUBTAB 1: CARD INFO */}
                  {caseSubTab === 'card' && (
                    <>
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

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                            SLUG (URL PATH: /work/[slug])
                          </label>
                          <input
                            type="text"
                            value={selectedCase.slug || selectedCase.id || ''}
                            onChange={(e) => handleCaseChange('slug', e.target.value)}
                            style={inputStyle}
                          />
                        </div>
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
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          DIRECTORY SUMMARY / HOOK
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
                          TAGS (COMMA SEPARATED)
                        </label>
                        <input
                          type="text"
                          value={(selectedCase.tags || []).join(', ')}
                          onChange={(e) => handleCaseChange('tags', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          DIRECTORY COVER IMAGE
                        </label>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <div style={{ width: '80px', height: '60px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E4E4E7' }}>
                            {selectedCase.image ? (
                              <Image src={selectedCase.image} alt={selectedCase.title || ''} fill style={{ objectFit: 'cover' }} />
                            ) : null}
                          </div>
                          <div style={{ flex: 1 }}>
                            <input
                              type="text"
                              value={selectedCase.image || ''}
                              onChange={(e) => handleCaseChange('image', e.target.value)}
                              style={{ ...inputStyle, marginBottom: '0.35rem' }}
                            />
                            <div style={{ display: 'flex', gap: '0.45rem' }}>
                              <input
                                ref={caseImgInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleDirectUpload(file, 'card');
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => caseImgInputRef.current?.click()}
                                style={mediaBtnStyle}
                              >
                                Upload
                              </button>
                              <button
                                type="button"
                                onClick={() => setMediaPickerTarget({ path: 'image', type: 'image' })}
                                style={mediaBtnStyle}
                              >
                                Pick from Media
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingTop: '0.5rem' }}>
                        <input
                          type="checkbox"
                          id="publish-toggle"
                          checked={selectedCase.published !== false}
                          onChange={(e) => handleCaseChange('published', e.target.checked)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <label htmlFor="publish-toggle" style={{ fontSize: '0.82rem', fontWeight: 500, color: '#111113', cursor: 'pointer' }}>
                          Publish on website (Uncheck to hide)
                        </label>
                      </div>

                      <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(selectedCase.id || selectedCase.slug)}
                          style={{
                            padding: '0.5rem 0.85rem',
                            borderRadius: '6px',
                            backgroundColor: '#FEF2F2',
                            color: '#DE322D',
                            border: '1px solid #FCA5A5',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Delete Case Study</span>
                        </button>
                      </div>
                    </>
                  )}

                  {/* SUBTAB 2: HERO & LEAD */}
                  {caseSubTab === 'hero' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          PAGE SUBTITLE / HERO ONE-LINER
                        </label>
                        <input
                          type="text"
                          value={activeCaseMerged.subtitle || ''}
                          onChange={(e) => handleCaseChange('subtitle', e.target.value)}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          DETAIL HERO BANNER IMAGE
                        </label>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <div style={{ width: '100px', height: '65px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E4E4E7' }}>
                            {activeCaseMerged.heroImage ? (
                              <Image src={activeCaseMerged.heroImage} alt="" fill style={{ objectFit: 'cover' }} />
                            ) : null}
                          </div>
                          <div style={{ flex: 1 }}>
                            <input
                              type="text"
                              value={activeCaseMerged.heroImage || ''}
                              onChange={(e) => handleCaseChange('heroImage', e.target.value)}
                              style={{ ...inputStyle, marginBottom: '0.35rem' }}
                            />
                            <div style={{ display: 'flex', gap: '0.45rem' }}>
                              <input
                                ref={heroImgInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleDirectUpload(file, 'hero');
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => heroImgInputRef.current?.click()}
                                style={mediaBtnStyle}
                              >
                                Upload
                              </button>
                              <button
                                type="button"
                                onClick={() => setMediaPickerTarget({ path: 'heroImage', type: 'image' })}
                                style={mediaBtnStyle}
                              >
                                Pick
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          HERO IMAGE CAPTION
                        </label>
                        <input
                          type="text"
                          value={activeCaseMerged.heroImageCaption || ''}
                          onChange={(e) => handleCaseChange('heroImageCaption', e.target.value)}
                          style={inputStyle}
                        />
                      </div>

                      <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '1rem' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 650, color: '#111113', marginBottom: '0.75rem' }}>
                          Project Snapshot Card
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                              LOCATION
                            </label>
                            <input
                              type="text"
                              value={activeCaseMerged.snapshot?.location || ''}
                              onChange={(e) => handleCaseChange('snapshot', { ...activeCaseMerged.snapshot, location: e.target.value })}
                              style={inputStyle}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                              DURATION
                            </label>
                            <input
                              type="text"
                              value={activeCaseMerged.snapshot?.duration || ''}
                              onChange={(e) => handleCaseChange('snapshot', { ...activeCaseMerged.snapshot, duration: e.target.value })}
                              style={inputStyle}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* SUBTAB 3: NARRATIVE & PILLARS */}
                  {caseSubTab === 'narrative' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          THE SITUATION (PARAGRAPHS - ONE PER LINE)
                        </label>
                        <textarea
                          rows={4}
                          value={(activeCaseMerged.situation || []).join('\n\n')}
                          onChange={(e) => handleCaseChange('situation', e.target.value.split('\n\n').filter(Boolean))}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          THE REAL CHALLENGE
                        </label>
                        <textarea
                          rows={4}
                          value={(activeCaseMerged.realChallenge || []).join('\n\n')}
                          onChange={(e) => handleCaseChange('realChallenge', e.target.value.split('\n\n').filter(Boolean))}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          OUR THINKING / STRATEGY
                        </label>
                        <textarea
                          rows={4}
                          value={(activeCaseMerged.thinking || []).join('\n\n')}
                          onChange={(e) => handleCaseChange('thinking', e.target.value.split('\n\n').filter(Boolean))}
                          style={inputStyle}
                        />
                      </div>
                    </>
                  )}

                  {/* SUBTAB 4: VISUAL GALLERY */}
                  {caseSubTab === 'gallery' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111113' }}>
                          Media Gallery ({activeCaseMerged.gallery?.length || 0} Assets)
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newG = [
                              ...(activeCaseMerged.gallery || []),
                              { image: '/images/case-studies/raysons/neora-1.jpg', caption: 'New photo showcase', alt: '' },
                            ];
                            handleCaseChange('gallery', newG);
                          }}
                          style={mediaBtnStyle}
                        >
                          + Add Media
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {(activeCaseMerged.gallery || []).map((item: any, gIdx: number) => (
                          <div key={gIdx} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#FAFAFA', alignItems: 'center' }}>
                            <div style={{ width: '60px', height: '45px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E4E4E7' }}>
                              {item.image ? <Image src={item.image} alt="" fill style={{ objectFit: 'cover' }} /> : null}
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              <input
                                type="text"
                                value={item.image || ''}
                                onChange={(e) => {
                                  const g = [...activeCaseMerged.gallery];
                                  g[gIdx].image = e.target.value;
                                  handleCaseChange('gallery', g);
                                }}
                                style={{ ...inputStyle, padding: '0.4rem 0.6rem' }}
                                placeholder="Image URL..."
                              />
                              <input
                                type="text"
                                value={item.caption || ''}
                                onChange={(e) => {
                                  const g = [...activeCaseMerged.gallery];
                                  g[gIdx].caption = e.target.value;
                                  handleCaseChange('gallery', g);
                                }}
                                style={{ ...inputStyle, padding: '0.4rem 0.6rem' }}
                                placeholder="Caption..."
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const g = activeCaseMerged.gallery.filter((_: any, idx: number) => idx !== gIdx);
                                handleCaseChange('gallery', g);
                              }}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* SUBTAB 5: PROOF & CLOSING */}
                  {caseSubTab === 'outcomes' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          VERIFIED OUTCOMES STATEMENT
                        </label>
                        <textarea
                          rows={4}
                          value={activeCaseMerged.proof?.verifiedText || ''}
                          onChange={(e) => handleCaseChange('proof', { ...activeCaseMerged.proof, verifiedText: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          METRICS BADGE / SUMMARY
                        </label>
                        <input
                          type="text"
                          value={activeCaseMerged.proof?.metricsNote || ''}
                          onChange={(e) => handleCaseChange('proof', { ...activeCaseMerged.proof, metricsNote: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          FOUNDER CLOSING QUOTE
                        </label>
                        <textarea
                          rows={3}
                          value={activeCaseMerged.closingQuote || ''}
                          onChange={(e) => handleCaseChange('closingQuote', e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#71717A' }}>
                Select a case study from the left sidebar to edit.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE LIVE PREVIEW */}
        <div style={{ height: '100%', overflow: 'hidden', backgroundColor: '#F4F4F5' }}>
          <LivePreviewPanel
            key={previewKey}
            previewUrl={`/work/${selectedCase?.slug || selectedCase?.id || 'raysons-group'}`}
            title={`Preview: ${selectedCase?.title || 'Case Study'}`}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete Case Study?"
        message="Are you sure you want to permanently remove this case study from Ārohana?"
        onConfirm={() => {
          if (!deleteTargetId) return;
          const updatedCases = (workData.caseStudies || []).filter(
            (c: any) => c.id !== deleteTargetId && c.slug !== deleteTargetId
          );
          const updated = { ...workData, caseStudies: updatedCases };
          setWorkData(updated);
          setSelectedCaseId(updatedCases[0]?.slug || updatedCases[0]?.id || null);
          updateDraftInMemory('work', updated);
          setDeleteTargetId(null);
        }}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Media Picker Modal */}
      {mediaPickerTarget && (
        <MediaPickerModal
          isOpen={true}
          onClose={() => setMediaPickerTarget(null)}
          onSelect={(url: string) => {
            handleCaseChange(mediaPickerTarget.path, url);
            setMediaPickerTarget(null);
          }}
          mediaType={mediaPickerTarget.type || 'image'}
        />
      )}
    </div>
  );
}
