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

export default function AdminWorkPage() {
  const { content, saveDraft, updateDraftInMemory, publishAll } = useCmsContent();
  const [workData, setWorkData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'header' | 'reels' | 'cases'>('cases');
  const [caseSubTab, setCaseSubTab] = useState<'card' | 'hero' | 'narrative' | 'gallery' | 'outcomes'>('card');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('raysons-group');
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ path: string; type?: 'image' | 'video' } | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);
  const [previewUrlType, setPreviewUrlType] = useState<'work' | 'detail'>('work');

  const caseImgInputRef = useRef<HTMLInputElement>(null);
  const heroImgInputRef = useRef<HTMLInputElement>(null);
  const galleryImgInputRef = useRef<HTMLInputElement>(null);
  const activeGalleryIdxRef = useRef<number>(-1);
  const reelImgInputRef = useRef<HTMLInputElement>(null);
  const reelImgTargetIdx = useRef<number>(-1);

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

  // Helper to ensure selectedCase has detail page fields populated
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

  const updateField = async (path: string[], val: any) => {
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
    if (res && res.success) {
      setSavedStatus(true);
      setPreviewKey((k) => k + 1);
      setTimeout(() => setSavedStatus(false), 3000);
    }
  };

  // Direct File Upload Helper with Auto-Save and Instant Preview Reload
  const handleFileUpload = async (
    file: File,
    target: 'case-card' | 'case-hero' | 'gallery-img' | 'reel',
    extraIdx?: number
  ) => {
    const uploadKey = `${target}-${extraIdx ?? '0'}`;
    setUploadingFor(uploadKey);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (json.url) {
        if (!selectedCase) return;

        let updatedCases = [...workData.caseStudies];

        if (target === 'case-card') {
          updatedCases = updatedCases.map((c: any) =>
            c.id === selectedCase.id ? { ...getCaseWithDefaults(c), image: json.url } : c
          );
        } else if (target === 'case-hero') {
          updatedCases = updatedCases.map((c: any) =>
            c.id === selectedCase.id ? { ...getCaseWithDefaults(c), heroImage: json.url } : c
          );
        } else if (target === 'gallery-img' && extraIdx !== undefined) {
          updatedCases = updatedCases.map((c: any) => {
            if (c.id !== selectedCase.id) return c;
            const fullCase = getCaseWithDefaults(c);
            const gallery = [...(fullCase.gallery || [])];
            gallery[extraIdx] = {
              ...gallery[extraIdx],
              image: json.url,
              caption: gallery[extraIdx]?.caption || 'Production Still',
              alt: gallery[extraIdx]?.alt || selectedCase.title,
            };
            return { ...fullCase, gallery };
          });
        } else if (target === 'reel' && extraIdx !== undefined) {
          const updatedReels = [...workData.featuredReels];
          updatedReels[extraIdx] = { ...updatedReels[extraIdx], coverImage: json.url };
          const updated = { ...workData, featuredReels: updatedReels };
          setWorkData(updated);
          await saveDraft('work', updated);
          setPreviewKey((k) => k + 1);
          setSavedStatus(true);
          setTimeout(() => setSavedStatus(false), 2000);
          return;
        }

        const updated = { ...workData, caseStudies: updatedCases };
        setWorkData(updated);
        await saveDraft('work', updated);
        setPreviewKey((k) => k + 1);
        setSavedStatus(true);
        setTimeout(() => setSavedStatus(false), 2000);
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploadingFor(null);
    }
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
      heroImage: '/images/case-studies/raysons/neora-1.jpg',
      heroImageCaption: 'Featured project overview',
      subtitle: 'Comprehensive brand and digital growth partnership.',
      sector: 'Hospitality & Commercial',
      snapshot: {
        location: 'Mumbai & Western India',
        engagementType: 'Retainer & Visual Production',
        duration: '2024 — Present',
        coreCapabilities: ['Brand Strategy', 'Content Production'],
      },
      situation: ['The brand required an elevated digital presence.'],
      realChallenge: ['Cutting through generic social media noise with verified quality.'],
      thinking: ['Strategic narrative first, followed by cinematic production.'],
      work: [{ title: 'Brand Identity & Production', description: 'Complete creative execution.', bullets: ['Strategy', 'Shoots', 'Publishing'] }],
      gallery: [{ image: '/images/case-studies/raysons/neora-1.jpg', caption: 'Initial launch asset', alt: 'Launch' }],
      proof: { verifiedText: 'Measurable audience growth and high retainer engagement.', metricsNote: 'Verified client engagement' },
      closingQuote: 'Quality execution speaks louder than marketing promises.',
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
    handleSaveAndSync(updated);
  };

  const handleDeleteCase = (id: string) => {
    const updatedCases = workData.caseStudies.filter((c: any) => c.id !== id);
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    if (selectedCaseId === id && updatedCases.length > 0) {
      setSelectedCaseId(updatedCases[0].id);
    }
    updateDraftInMemory('work', updated);
    handleSaveAndSync(updated);
    setDeleteTargetId(null);
  };

  const filteredCases = (workData.caseStudies || []).filter(
    (c: any) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const detailSlug = selectedCase?.slug || selectedCase?.id || 'raysons-group';
  const effectivePreviewUrl = previewUrlType === 'work' ? '/work' : `/work/${detailSlug}`;

  return (
    <div className="admin-split-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '1.5rem', height: '100%', minHeight: 0 }}>
      {/* ─── LEFT COLUMN: WORK SECTIONS & FORM EDITOR ─── */}
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
              Edit portfolio cards, reels carousel, and full detail pages (/work/[slug]).
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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

            <button
              type="button"
              onClick={() => handleSaveAndSync()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: savedStatus ? '#16A34A' : '#111113',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {savedStatus ? <Check size={14} /> : <Sparkles size={14} />}
              {savedStatus ? 'Saved & Synced' : 'Save Changes'}
            </button>

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
                backgroundColor: '#DE322D',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Publish Live
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#FFFFFF',
            padding: '0 1rem',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('cases')}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: activeTab === 'cases' ? '2px solid #111113' : '2px solid transparent',
              backgroundColor: 'transparent',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'cases' ? 650 : 500,
              color: activeTab === 'cases' ? '#111113' : '#71717A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Layers size={14} />
            Case Studies ({workData.caseStudies?.length || 0})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reels')}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: activeTab === 'reels' ? '2px solid #111113' : '2px solid transparent',
              backgroundColor: 'transparent',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'reels' ? 650 : 500,
              color: activeTab === 'reels' ? '#111113' : '#71717A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <ImageIcon size={14} />
            Reels Showcase ({workData.featuredReels?.length || 0})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('header')}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: activeTab === 'header' ? '2px solid #111113' : '2px solid transparent',
              backgroundColor: 'transparent',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'header' ? 650 : 500,
              color: activeTab === 'header' ? '#111113' : '#71717A',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <FileText size={14} />
            Page Header
          </button>
        </div>

        {/* ── TAB 1: PAGE HEADER ── */}
        {activeTab === 'header' && (
          <div className="admin-editor-scroll" style={{ padding: '1.5rem 1.5rem 6rem 1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                EYEBROW LABEL
              </label>
              <input
                type="text"
                value={workData.header?.eyebrow || ''}
                onChange={(e) => updateField(['header', 'eyebrow'], e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                PAGE TITLE
              </label>
              <input
                type="text"
                value={workData.header?.title || ''}
                onChange={(e) => updateField(['header', 'title'], e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                SUBTITLE / PHILOSOPHY
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

        {/* ── TAB 2: REELS CAROUSEL ── */}
        {activeTab === 'reels' && (
          <div className="admin-editor-scroll" style={{ padding: '1.5rem 1.5rem 6rem 1.5rem', overflowY: 'auto', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111113' }}>
                Featured Reels (Static Cover Images + Reel Links)
              </div>
              <button
                type="button"
                onClick={() => {
                  const newReel = {
                    id: `reel-${Date.now()}`,
                    hookTitle: 'New Story',
                    subtitle: 'Category · Sector',
                    category: 'Hospitality & F&B',
                    coverImage: '/images/case-studies/raysons/neora-1.jpg',
                    instagramUrl: 'https://www.instagram.com/byarohana/',
                  };
                  updateField(['featuredReels'], [...(workData.featuredReels || []), newReel]);
                }}
                style={{
                  ...mediaBtnStyle,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
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
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          value={reel.coverImage || ''}
                          onChange={(e) => {
                            const updated = [...workData.featuredReels];
                            updated[idx] = { ...updated[idx], coverImage: e.target.value };
                            updateField(['featuredReels'], updated);
                          }}
                          style={{ ...inputStyle, padding: '0.35rem 0.55rem', flex: 1, minWidth: '100px' }}
                        />
                        <button
                          type="button"
                          disabled={uploadingFor === `reel-${idx}`}
                          onClick={() => {
                            reelImgTargetIdx.current = idx;
                            reelImgInputRef.current?.click();
                          }}
                          style={{
                            ...mediaBtnStyle,
                            padding: '0.35rem 0.65rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            opacity: uploadingFor === `reel-${idx}` ? 0.6 : 1,
                          }}
                        >
                          <Upload size={12} />
                          {uploadingFor === `reel-${idx}` ? '...' : 'Upload'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setMediaPickerTarget({ path: `featuredReels.${idx}.coverImage`, type: 'image' })}
                          style={{ ...mediaBtnStyle, padding: '0.35rem 0.65rem' }}
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

        {/* ── TAB 3: CASE STUDIES & FULL DETAIL PAGE EDITOR ── */}
        {activeTab === 'cases' && (
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', flex: 1, overflow: 'hidden' }}>
            {/* Left Case Studies Sidebar */}
            <div
              style={{
                borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#FAF9F6',
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

              {/* Case Studies List */}
              <div className="admin-editor-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
                {filteredCases.map((c: any) => {
                  const isSelected = selectedCase?.id === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedCaseId(c.id);
                        if (previewUrlType === 'detail') {
                          setPreviewKey((k) => k + 1);
                        }
                      }}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: '8px',
                        marginBottom: '0.35rem',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#111113' : 'transparent',
                        color: isSelected ? '#FFFFFF' : '#111113',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <div
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: isSelected ? 600 : 500,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }}
                        >
                          {c.title}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: isSelected ? '#A1A1AA' : '#71717A' }}>
                          {c.client}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span
                          style={{
                            color: c.published ? '#16A34A' : '#A1A1AA',
                            padding: '2px',
                          }}
                          title={c.published ? 'Published' : 'Hidden'}
                        >
                          {c.published ? <Eye size={13} /> : <EyeOff size={13} />}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Editor Area */}
            {activeCaseMerged ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                {/* Subtabs for Case Study Editor */}
                <div
                  className="admin-tabs-row"
                  style={{
                    display: 'flex',
                    gap: '4px',
                    padding: '0.6rem 1rem',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#FAFAFA',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setCaseSubTab('card')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: caseSubTab === 'card' ? '#111113' : 'transparent',
                      color: caseSubTab === 'card' ? '#FFFFFF' : '#52525B',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    01 Card Overview
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCaseSubTab('hero');
                      setPreviewUrlType('detail');
                    }}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: caseSubTab === 'hero' ? '#111113' : 'transparent',
                      color: caseSubTab === 'hero' ? '#FFFFFF' : '#52525B',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    02 Detail Hero &amp; Snapshot
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCaseSubTab('narrative');
                      setPreviewUrlType('detail');
                    }}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: caseSubTab === 'narrative' ? '#111113' : 'transparent',
                      color: caseSubTab === 'narrative' ? '#FFFFFF' : '#52525B',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    03 Narrative &amp; Approach
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCaseSubTab('gallery');
                      setPreviewUrlType('detail');
                    }}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: caseSubTab === 'gallery' ? '#111113' : 'transparent',
                      color: caseSubTab === 'gallery' ? '#FFFFFF' : '#52525B',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    04 Visual Gallery
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCaseSubTab('outcomes');
                      setPreviewUrlType('detail');
                    }}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: caseSubTab === 'outcomes' ? '#111113' : 'transparent',
                      color: caseSubTab === 'outcomes' ? '#FFFFFF' : '#52525B',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    05 Outcomes &amp; Quote
                  </button>
                </div>

                {/* Subtab Content Form */}
                <div
                  className="admin-editor-scroll"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.25rem 1.25rem 6rem 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    scrollBehavior: 'smooth',
                    overscrollBehavior: 'contain',
                  }}
                >
                  {/* ── SUBTAB 1: CARD OVERVIEW ── */}
                  {caseSubTab === 'card' && (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                            PROJECT TITLE
                          </label>
                          <input
                            type="text"
                            value={activeCaseMerged.title || ''}
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
                            value={activeCaseMerged.client || ''}
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
                            value={activeCaseMerged.category || ''}
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
                            value={activeCaseMerged.year || ''}
                            onChange={(e) => handleCaseChange('year', e.target.value)}
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          BRIEF / EXECUTIVE SUMMARY (FOR CARD)
                        </label>
                        <textarea
                          rows={3}
                          value={activeCaseMerged.desc || ''}
                          onChange={(e) => handleCaseChange('desc', e.target.value)}
                          style={inputStyle}
                        />
                      </div>

                      {/* Card Cover Image */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                            PORTFOLIO CARD COVER IMAGE
                          </label>
                          <span style={{ fontSize: '0.68rem', color: '#16A34A', fontWeight: 600 }}>
                            Auto-syncs to live preview
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <input
                            type="text"
                            value={activeCaseMerged.image || ''}
                            onChange={(e) => handleCaseChange('image', e.target.value)}
                            placeholder="/uploads/image.jpg or URL"
                            style={{ ...inputStyle, flex: 1, minWidth: '140px' }}
                          />
                          <button
                            type="button"
                            onClick={() => caseImgInputRef.current?.click()}
                            disabled={uploadingFor === 'case-card-0'}
                            style={{
                              ...mediaBtnStyle,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              opacity: uploadingFor === 'case-card-0' ? 0.6 : 1,
                            }}
                          >
                            <Upload size={13} />
                            {uploadingFor === 'case-card-0' ? 'Uploading...' : 'Upload'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setMediaPickerTarget({ path: 'caseStudies.image', type: 'image' })}
                            style={mediaBtnStyle}
                          >
                            Pick
                          </button>
                        </div>
                        {activeCaseMerged.image && (
                          <div style={{ marginTop: '0.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', height: '140px', position: 'relative' }}>
                            <img
                              src={activeCaseMerged.image}
                              alt="Card cover preview"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          TAGS (COMMA SEPARATED)
                        </label>
                        <input
                          type="text"
                          value={Array.isArray(activeCaseMerged.tags) ? activeCaseMerged.tags.join(', ') : ''}
                          onChange={(e) =>
                            handleCaseChange(
                              'tags',
                              e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                            )
                          }
                          style={inputStyle}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', alignItems: 'center' }}>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={!!activeCaseMerged.published}
                            onChange={(e) => handleCaseChange('published', e.target.checked)}
                          />
                          Published on Website
                        </label>

                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={!!activeCaseMerged.featured}
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
                          <Trash2 size={14} /> Delete Project
                        </button>
                      </div>
                    </>
                  )}

                  {/* ── SUBTAB 2: DETAIL PAGE HERO & SNAPSHOT ── */}
                  {caseSubTab === 'hero' && (
                    <>
                      <div
                        style={{
                          padding: '0.65rem 0.85rem',
                          backgroundColor: '#F0F9FF',
                          borderRadius: '8px',
                          border: '1px solid #BAE6FD',
                          fontSize: '0.78rem',
                          color: '#0369A1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <Sparkles size={14} />
                        Editing Live Case Study Page at <strong>/work/{detailSlug}</strong>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          PAGE HERO HEADLINE / SUBTITLE
                        </label>
                        <input
                          type="text"
                          value={activeCaseMerged.subtitle || ''}
                          onChange={(e) => handleCaseChange('subtitle', e.target.value)}
                          placeholder="e.g. One relationship. Three very different businesses."
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          SECTOR EYEBROW
                        </label>
                        <input
                          type="text"
                          value={activeCaseMerged.sector || ''}
                          onChange={(e) => handleCaseChange('sector', e.target.value)}
                          placeholder="e.g. Hospitality, Real Estate & Industrial Casting"
                          style={inputStyle}
                        />
                      </div>

                      {/* Detail Page Hero Image */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                            DETAIL PAGE MAIN HERO IMAGE
                          </label>
                          <span style={{ fontSize: '0.68rem', color: '#16A34A', fontWeight: 600 }}>
                            High-Resolution 16:9 Banner
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <input
                            type="text"
                            value={activeCaseMerged.heroImage || ''}
                            onChange={(e) => handleCaseChange('heroImage', e.target.value)}
                            placeholder="/uploads/... or URL"
                            style={{ ...inputStyle, flex: 1, minWidth: '140px' }}
                          />
                          <button
                            type="button"
                            onClick={() => heroImgInputRef.current?.click()}
                            disabled={uploadingFor === 'case-hero-0'}
                            style={{
                              ...mediaBtnStyle,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              opacity: uploadingFor === 'case-hero-0' ? 0.6 : 1,
                            }}
                          >
                            <Upload size={13} />
                            {uploadingFor === 'case-hero-0' ? 'Uploading...' : 'Upload Hero'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setMediaPickerTarget({ path: 'caseStudies.heroImage', type: 'image' })}
                            style={mediaBtnStyle}
                          >
                            Pick
                          </button>
                        </div>
                        {activeCaseMerged.heroImage && (
                          <div style={{ marginTop: '0.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', height: '140px' }}>
                            <img
                              src={activeCaseMerged.heroImage}
                              alt="Detail Hero preview"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          HERO IMAGE CAPTION
                        </label>
                        <input
                          type="text"
                          value={activeCaseMerged.heroImageCaption || ''}
                          onChange={(e) => handleCaseChange('heroImageCaption', e.target.value)}
                          placeholder="e.g. Neora Deck rooftop hospitality & on-ground execution"
                          style={inputStyle}
                        />
                      </div>

                      {/* Snapshot Metadata Bar */}
                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '0.85rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 650, color: '#111113', marginBottom: '0.65rem' }}>
                          Snapshot Metadata Bar
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Location</span>
                            <input
                              type="text"
                              value={activeCaseMerged.snapshot?.location || ''}
                              onChange={(e) =>
                                handleCaseChange('snapshot', {
                                  ...activeCaseMerged.snapshot,
                                  location: e.target.value,
                                })
                              }
                              style={{ ...inputStyle, padding: '0.4rem 0.6rem' }}
                            />
                          </div>
                          <div>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Engagement Type</span>
                            <input
                              type="text"
                              value={activeCaseMerged.snapshot?.engagementType || ''}
                              onChange={(e) =>
                                handleCaseChange('snapshot', {
                                  ...activeCaseMerged.snapshot,
                                  engagementType: e.target.value,
                                })
                              }
                              style={{ ...inputStyle, padding: '0.4rem 0.6rem' }}
                            />
                          </div>
                          <div>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Duration</span>
                            <input
                              type="text"
                              value={activeCaseMerged.snapshot?.duration || ''}
                              onChange={(e) =>
                                handleCaseChange('snapshot', {
                                  ...activeCaseMerged.snapshot,
                                  duration: e.target.value,
                                })
                              }
                              style={{ ...inputStyle, padding: '0.4rem 0.6rem' }}
                            />
                          </div>
                          <div>
                            <span style={{ fontSize: '0.68rem', color: '#71717A' }}>Core Capabilities (comma separated)</span>
                            <input
                              type="text"
                              value={
                                Array.isArray(activeCaseMerged.snapshot?.coreCapabilities)
                                  ? activeCaseMerged.snapshot.coreCapabilities.join(', ')
                                  : ''
                              }
                              onChange={(e) =>
                                handleCaseChange('snapshot', {
                                  ...activeCaseMerged.snapshot,
                                  coreCapabilities: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean),
                                })
                              }
                              style={{ ...inputStyle, padding: '0.4rem 0.6rem' }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ── SUBTAB 3: NARRATIVE & APPROACH ── */}
                  {caseSubTab === 'narrative' && (
                    <>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B' }}>
                            OPERATIONAL CONTEXT &amp; SITUATION (ONE PARAGRAPH PER LINE)
                          </label>
                        </div>
                        <textarea
                          rows={4}
                          value={
                            Array.isArray(activeCaseMerged.situation)
                              ? activeCaseMerged.situation.join('\n\n')
                              : activeCaseMerged.situation || ''
                          }
                          onChange={(e) =>
                            handleCaseChange(
                              'situation',
                              e.target.value.split('\n\n').map((p) => p.trim()).filter(Boolean)
                            )
                          }
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#DE322D', marginBottom: '0.3rem' }}>
                          THE CORE PROBLEM &amp; REAL CHALLENGE (ONE PARAGRAPH PER LINE)
                        </label>
                        <textarea
                          rows={4}
                          value={
                            Array.isArray(activeCaseMerged.realChallenge)
                              ? activeCaseMerged.realChallenge.join('\n\n')
                              : activeCaseMerged.realChallenge || ''
                          }
                          onChange={(e) =>
                            handleCaseChange(
                              'realChallenge',
                              e.target.value.split('\n\n').map((p) => p.trim()).filter(Boolean)
                            )
                          }
                          style={inputStyle}
                        />
                      </div>

                      {/* Strategic Pillars */}
                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '0.85rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 650, color: '#111113', marginBottom: '0.65rem' }}>
                          How Ārohana Structured the Thinking (Strategic Pillars)
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {(activeCaseMerged.thinking || []).map((pillar: string, pIdx: number) => (
                            <div key={pIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#DE322D', minWidth: '60px' }}>
                                PILLAR 0{pIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={pillar}
                                onChange={(e) => {
                                  const updated = [...activeCaseMerged.thinking];
                                  updated[pIdx] = e.target.value;
                                  handleCaseChange('thinking', updated);
                                }}
                                style={{ ...inputStyle, padding: '0.35rem 0.55rem' }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* ── SUBTAB 4: VISUAL EVIDENCE GALLERY ── */}
                  {caseSubTab === 'gallery' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 650, color: '#111113' }}>
                            Visual Evidence &amp; Production Stills
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#71717A' }}>
                            Assets displayed in the on-ground visual grid of the case study.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [
                              ...(activeCaseMerged.gallery || []),
                              {
                                image: '/images/case-studies/raysons/neora-1.jpg',
                                caption: 'Production Asset Caption',
                                alt: activeCaseMerged.title,
                              },
                            ];
                            handleCaseChange('gallery', updated);
                          }}
                          style={{
                            ...mediaBtnStyle,
                            padding: '0.35rem 0.75rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                          }}
                        >
                          <Plus size={13} /> Add Gallery Image
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {(activeCaseMerged.gallery || []).map((item: any, gIdx: number) => (
                          <div
                            key={gIdx}
                            style={{
                              padding: '0.85rem',
                              borderRadius: '10px',
                              border: '1px solid rgba(0,0,0,0.08)',
                              backgroundColor: '#FAFAFA',
                              display: 'grid',
                              gridTemplateColumns: '100px 1fr 32px',
                              gap: '0.85rem',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ width: '100px', height: '65px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#E5E5E5' }}>
                              <img
                                src={item.image}
                                alt={item.alt || 'Asset'}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                              <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <input
                                  type="text"
                                  value={item.image || ''}
                                  onChange={(e) => {
                                    const updated = [...activeCaseMerged.gallery];
                                    updated[gIdx] = { ...updated[gIdx], image: e.target.value };
                                    handleCaseChange('gallery', updated);
                                  }}
                                  placeholder="Image URL"
                                  style={{ ...inputStyle, padding: '0.3rem 0.5rem', flex: 1 }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    activeGalleryIdxRef.current = gIdx;
                                    galleryImgInputRef.current?.click();
                                  }}
                                  style={{ ...mediaBtnStyle, padding: '0.3rem 0.6rem' }}
                                >
                                  Upload
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMediaPickerTarget({ path: `gallery.${gIdx}.image`, type: 'image' })
                                  }
                                  style={{ ...mediaBtnStyle, padding: '0.3rem 0.6rem' }}
                                >
                                  Pick
                                </button>
                              </div>

                              <input
                                type="text"
                                value={item.caption || ''}
                                onChange={(e) => {
                                  const updated = [...activeCaseMerged.gallery];
                                  updated[gIdx] = { ...updated[gIdx], caption: e.target.value };
                                  handleCaseChange('gallery', updated);
                                }}
                                placeholder="Caption (e.g. Architectural elevation)"
                                style={{ ...inputStyle, padding: '0.3rem 0.5rem' }}
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = activeCaseMerged.gallery.filter((_: any, idx: number) => idx !== gIdx);
                                handleCaseChange('gallery', updated);
                              }}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: '#EF4444',
                                cursor: 'pointer',
                                padding: '4px',
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ── SUBTAB 5: OUTCOMES & CLOSING QUOTE ── */}
                  {caseSubTab === 'outcomes' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#16A34A', marginBottom: '0.3rem' }}>
                          VERIFIED IMPACT: OUTCOMES &amp; COMMERCIAL CHANGE
                        </label>
                        <textarea
                          rows={3}
                          value={activeCaseMerged.proof?.verifiedText || ''}
                          onChange={(e) =>
                            handleCaseChange('proof', {
                              ...activeCaseMerged.proof,
                              verifiedText: e.target.value,
                            })
                          }
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          METRICS &amp; RETENTION NOTE
                        </label>
                        <input
                          type="text"
                          value={activeCaseMerged.proof?.metricsNote || ''}
                          onChange={(e) =>
                            handleCaseChange('proof', {
                              ...activeCaseMerged.proof,
                              metricsNote: e.target.value,
                            })
                          }
                          placeholder="e.g. 3 Verticals • 100% Retainer Retention • 45+ Production Assets"
                          style={inputStyle}
                        />
                      </div>

                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '0.85rem' }}>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#111113', marginBottom: '0.3rem' }}>
                          AUTHENTIC CLOSING OBSERVATION / QUOTE
                        </label>
                        <textarea
                          rows={3}
                          value={activeCaseMerged.closingQuote || ''}
                          onChange={(e) => handleCaseChange('closingQuote', e.target.value)}
                          placeholder="e.g. Long-term client relationships aren’t built on presentations..."
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                          CLOSING CALLOUT QUESTION
                        </label>
                        <input
                          type="text"
                          value={activeCaseMerged.closingText || ''}
                          onChange={(e) => handleCaseChange('closingText', e.target.value)}
                          placeholder="e.g. Have a multi-entity or diversified business challenge? Let’s talk."
                          style={inputStyle}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#A1A1AA' }}>
                Select a project from the left to edit.
              </div>
            )}
          </div>
        )}

        {/* Hidden inputs for native file uploads */}
        <input
          ref={caseImgInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, 'case-card');
            e.target.value = '';
          }}
        />
        <input
          ref={heroImgInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, 'case-hero');
            e.target.value = '';
          }}
        />
        <input
          ref={galleryImgInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, 'gallery-img', activeGalleryIdxRef.current);
            e.target.value = '';
          }}
        />
        <input
          ref={reelImgInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, 'reel', reelImgTargetIdx.current);
            e.target.value = '';
          }}
        />
      </div>

      {/* ─── RIGHT COLUMN: LIVE PREVIEW WITH INSTANT TOGGLE ─── */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Preview Switcher Bar */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#A1A1AA', fontWeight: 600 }}>PREVIEW:</span>
            <button
              type="button"
              onClick={() => {
                setPreviewUrlType('work');
                setPreviewKey((k) => k + 1);
              }}
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: previewUrlType === 'work' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.1)',
                color: previewUrlType === 'work' ? '#111113' : '#D4D4D8',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              /work (Overview)
            </button>

            <button
              type="button"
              onClick={() => {
                setPreviewUrlType('detail');
                setPreviewKey((k) => k + 1);
              }}
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: previewUrlType === 'detail' ? '#DE322D' : 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              /work/{detailSlug} (Detail)
            </button>
          </div>

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
              href={effectivePreviewUrl}
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
          <LivePreviewPanel key={`${effectivePreviewUrl}-${previewKey}`} previewUrl={effectivePreviewUrl} />
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Project"
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
          onSelect={async (url) => {
            if (mediaPickerTarget.path.startsWith('featuredReels.')) {
              const parts = mediaPickerTarget.path.split('.');
              const idx = parseInt(parts[1]);
              const updated = [...workData.featuredReels];
              updated[idx] = { ...updated[idx], coverImage: url };
              const newWork = { ...workData, featuredReels: updated };
              setWorkData(newWork);
              await saveDraft('work', newWork);
              setPreviewKey((k) => k + 1);
            } else if (mediaPickerTarget.path === 'caseStudies.image') {
              if (selectedCase) {
                const updatedCases = workData.caseStudies.map((c: any) =>
                  c.id === selectedCase.id ? { ...getCaseWithDefaults(c), image: url } : c
                );
                const newWork = { ...workData, caseStudies: updatedCases };
                setWorkData(newWork);
                await saveDraft('work', newWork);
                setPreviewKey((k) => k + 1);
              }
            } else if (mediaPickerTarget.path === 'caseStudies.heroImage') {
              if (selectedCase) {
                const updatedCases = workData.caseStudies.map((c: any) =>
                  c.id === selectedCase.id ? { ...getCaseWithDefaults(c), heroImage: url } : c
                );
                const newWork = { ...workData, caseStudies: updatedCases };
                setWorkData(newWork);
                await saveDraft('work', newWork);
                setPreviewKey((k) => k + 1);
              }
            } else if (mediaPickerTarget.path.startsWith('gallery.')) {
              const parts = mediaPickerTarget.path.split('.');
              const gIdx = parseInt(parts[1]);
              if (selectedCase && !isNaN(gIdx)) {
                const updatedCases = workData.caseStudies.map((c: any) => {
                  if (c.id !== selectedCase.id) return c;
                  const full = getCaseWithDefaults(c);
                  const gallery = [...(full.gallery || [])];
                  gallery[gIdx] = { ...gallery[gIdx], image: url };
                  return { ...full, gallery };
                });
                const newWork = { ...workData, caseStudies: updatedCases };
                setWorkData(newWork);
                await saveDraft('work', newWork);
                setPreviewKey((k) => k + 1);
              }
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
