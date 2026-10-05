'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCmsContent } from '@/lib/cms/content-context';
import LivePreviewPanel from '@/components/admin/LivePreviewPanel';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import CmsToggle from '@/components/admin/CmsToggle';
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
  ChevronUp,
  ChevronDown,
  GripVertical,
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
  'she': {
    subtitle: 'Health initiative from concept to communities - On ground',
    heroImage: '/images/case-studies/she/she-hero.jpg',
    heroImageCaption: 'SHE Initiative — connecting Ladakh border village women through education, entrepreneurship, and documentary storytelling.',
    sector: 'Institutions · Social Impact · Community Development',
    snapshot: {
      location: 'Ladakh Border Villages',
      engagementType: 'Identity Design + Documentary Production + Field Communication',
      duration: 'Project-Based Engagement',
      coreCapabilities: [
        'Brand Identity Design',
        'Documentary Production',
        'Field Cinematography',
        'Institutional Communication',
        'Operation Sadbhavana Documentation',
      ],
    },
    situation: [
      'The SHE Initiative operates across remote Ladakh border villages, connecting women to education, skill development and entrepreneurship opportunities through Operation Sadbhavana-linked programmes.',
      'The organisation had meaningful work on the ground but lacked a coherent brand identity and documented communication assets to represent that work to institutional funders, government partners and wider audiences.',
    ],
    realChallenge: [
      'Communicating the reality of health, education and community development initiatives across high-altitude border villages requires on-ground presence, not remote production. The stories exist but needed careful documentation and narrative structure.',
      'The identity had to feel both institutionally credible and human — reflecting the dignity of the women and communities being served.',
    ],
    thinking: [
      'Begin with identity: a visual and verbal foundation that could anchor all communication.',
      'Documentary as the primary medium: field shoots across border villages to capture real stories, participation, skills, and life.',
      'Institutional alignment: all assets built to serve Operation Sadbhavana programmes and be useful in government and funder-facing outreach.',
    ],
    work: [
      {
        title: 'Brand Identity Design',
        description: 'Complete visual identity for the SHE Initiative — logo, colour system, typography and brand guidelines created to function across print, digital and institutional formats.',
        bullets: ['Logo concept and mark development', 'Visual identity system and colour palette', 'Brand guidelines for institutional use', 'Print and digital identity applications'],
      },
      {
        title: 'Field Documentary Production',
        description: 'On-ground documentary production across remote Ladakh border villages — capturing programme participation, community stories and the real texture of the SHE Initiative’s work.',
        bullets: ['High-altitude border village field shoots', 'Community participation and skills documentation', 'Participant storytelling and interview direction', 'End-to-end post-production and film delivery'],
      },
      {
        title: 'Institutional Communication Assets',
        description: 'Documentation and communication materials aligned with Operation Sadbhavana programmes under 14 Corps.',
        bullets: ['Operation Sadbhavana-aligned programme documentation', 'Institutional outreach communication assets', '14 Corps programme reporting support', 'Digital and print formats for partner presentations'],
      },
    ],
    gallery: [
      { image: '/images/case-studies/she/she-hero.jpg', caption: 'SHE Initiative: High-altitude border village field documentation and community engagement.', alt: 'SHE Initiative Ladakh border villages' },
      { image: '/images/case-studies/she/field-1.jpg', caption: 'Field documentation: Women participation and skills development programme in Ladakh.', alt: 'SHE Initiative field programme Ladakh' },
      { image: '/images/case-studies/she/field-2.jpg', caption: 'On-ground community storytelling across remote border village settlements.', alt: 'SHE Initiative border village community' },
      { image: '/images/case-studies/she/film-1.jpg', caption: 'Documentary production: Capturing participant stories and programme reality.', alt: 'SHE Initiative documentary film' },
      { image: '/images/case-studies/she/film-2.jpg', caption: 'Field cinematography across Ladakh — high-altitude, ground-level storytelling.', alt: 'SHE Initiative field cinematography' },
      { image: '/images/case-studies/she/identity-1.jpg', caption: 'SHE Initiative brand identity — visual system for institutional and digital use.', alt: 'SHE Initiative brand identity design' },
    ],
    proof: {
      verifiedText: 'The SHE Initiative now has a defined visual identity and a documented record of its field work — giving the organisation a credible foundation to communicate its impact, engage institutional partners, and build sustained visibility for the women and communities it serves.',
      metricsNote: 'Identity design, field documentary, and institutional assets delivered for Operation Sadbhavana-linked programmes in Ladakh border villages.',
    },
    closingQuote: 'Authentic storytelling about communities requires the same precision and care as any brand brief — perhaps more, because the people in the frame deserve it.',
    closingText: 'Working on institutional communication or community documentation? Let’s talk.',
  },
};

export default function AdminCasesPage() {
  const { content, saveDraft, publishSection, updateDraftInMemory, publishAll } = useCmsContent();
  const [workData, setWorkData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'editor' | 'order'>('editor');
  const [caseSubTab, setCaseSubTab] = useState<'card' | 'hero' | 'narrative' | 'gallery' | 'outcomes'>('card');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('raysons-group');
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ path: string; type?: 'image' | 'video' | 'pdf' | 'all' } | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  const caseImgInputRef = useRef<HTMLInputElement>(null);
  const heroImgInputRef = useRef<HTMLInputElement>(null);
  const galleryImgInputRef = useRef<HTMLInputElement>(null);
  const activeGalleryIdxRef = useRef<number>(-1);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const deleteTargetCase = workData.caseStudies?.find(
    (c: any) => c.id === deleteTargetId || c.slug === deleteTargetId
  );

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

  const handleCaseChange = (field: string, val: any) => {
    if (!selectedCase) return;
    const updatedCases = workData.caseStudies.map((c: any) => {
      if (c.id !== selectedCase.id && c.slug !== selectedCase.slug) return c;
      const base = getCaseWithDefaults(c);

      // Support nested gallery paths e.g. "gallery[0].image" or "gallery[1].pdfUrl"
      const galleryMatch = field.match(/^gallery\[(\d+)\]\.(.+)$/);
      if (galleryMatch) {
        const idx = parseInt(galleryMatch[1], 10);
        const prop = galleryMatch[2];
        const g = Array.isArray(base.gallery) ? [...base.gallery] : [];
        if (g[idx]) {
          g[idx] = { ...g[idx], [prop]: val };
          return { ...base, gallery: g };
        }
      }

      return { ...base, [field]: val };
    });
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    updateDraftInMemory('work', updated);

    // Instant zero-refresh broadcast to all preview iframes
    if (typeof window !== 'undefined') {
      const msg = { type: 'CMS_UPDATE', section: 'work', data: updated };
      window.postMessage(msg, '*');
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((ifr) => {
        try {
          ifr.contentWindow?.postMessage(msg, '*');
        } catch (e) {}
      });
    }

    // Auto-save draft so live preview iframe is kept up-to-date
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      saveDraft('work', updated);
    }, 800);
  };

  const handleSaveDraft = async (dataToSave?: any) => {
    const target = dataToSave || workData;
    updateDraftInMemory('work', target);
    const ok = await saveDraft('work', target);
    if (ok) {
      setSavedStatus(true);
      setPreviewKey((k) => k + 1);
      setTimeout(() => setSavedStatus(false), 2200);
    }
    return ok;
  };

  const handleMoveCase = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const cases = [...(workData.caseStudies || [])];
    if (targetIdx < 0 || targetIdx >= cases.length) return;
    const temp = cases[index];
    cases[index] = cases[targetIdx];
    cases[targetIdx] = temp;
    const updated = { ...workData, caseStudies: cases };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
    await handleSaveDraft(updated);
  };

  const toggleCaseEnabled = async (caseId: string) => {
    const originalIdx = (workData.caseStudies || []).findIndex((item: any) => item.id === caseId || item.slug === caseId);
    if (originalIdx === -1) return;
    const item = workData.caseStudies[originalIdx];
    const isCurrentlyEnabled = item.enabled !== false && item.published !== false;
    const nextState = !isCurrentlyEnabled;

    const updatedCases = [...workData.caseStudies];
    updatedCases[originalIdx] = {
      ...updatedCases[originalIdx],
      enabled: nextState,
      published: nextState,
    };
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    updateDraftInMemory('work', updated);
    await handleSaveDraft(updated);
  };

  const handleAddNewCase = async () => {
    const newId = `case-${Date.now()}`;
    const newNum = String((workData.caseStudies?.length || 0) + 1).padStart(2, '0');
    const newCase = {
      id: newId,
      num: newNum,
      slug: newId,
      title: 'New Case Study',
      client: 'Client Name',
      category: 'Hospitality',
      sector: 'Hospitality & Commercial',
      desc: 'Brief overview of strategy, execution and commercial impact.',
      tags: ['Strategy', 'Execution'],
      image: '/images/case-studies/raysons/neora-1.jpg',
      heroImage: '/images/case-studies/raysons/neora-1.jpg',
      heroImageCaption: 'Featured project overview',
      subtitle: 'Comprehensive brand and digital growth partnership.',
      directUrl: `/work/${newId}`,
      caseStudyBtnText: 'View case study ↗',
      snapshot: {
        location: 'Mumbai & Western India',
        engagementType: 'Retainer & Visual Production',
        duration: '2024 — Present',
        coreCapabilities: ['Brand Strategy', 'Content Production'],
      },
      situation: ['The brand required an elevated digital presence.'],
      realChallenge: ['Cutting through generic social media noise with verified quality.'],
      thinking: ['Strategic narrative first, followed by cinematic production.'],
      work: [
        {
          title: 'Brand Identity & Production',
          description: 'Complete creative execution.',
          bullets: ['Strategy', 'Shoots', 'Publishing'],
        },
      ],
      gallery: [
        { image: '/images/case-studies/raysons/neora-1.jpg', caption: 'Initial launch asset', alt: 'Launch' },
      ],
      proof: {
        verifiedText: 'Measurable audience growth and high retainer engagement.',
        metricsNote: 'Verified client engagement',
      },
      closingQuote: 'Quality execution speaks louder than marketing promises.',
      closingText: 'Have a similar challenge? Let’s talk.',
      published: true,
      enabled: true,
      layoutStyle: 'layout-1',
      year: '2026',
    };

    const updated = {
      ...workData,
      caseStudies: [...(workData.caseStudies || []), newCase],
    };
    setWorkData(updated);
    setSelectedCaseId(newId);
    updateDraftInMemory('work', updated);
    await handleSaveDraft(updated);
  };

  const handleDeleteCase = async (id: string) => {
    const updatedCases = (workData.caseStudies || []).filter(
      (c: any) => c.id !== id && c.slug !== id
    );
    const updated = { ...workData, caseStudies: updatedCases };
    setWorkData(updated);
    if (selectedCaseId === id || selectedCase?.slug === id) {
      setSelectedCaseId(updatedCases[0]?.id || updatedCases[0]?.slug || null);
    }
    updateDraftInMemory('work', updated);
    await handleSaveDraft(updated);
    setDeleteTargetId(null);
  };

  const handlePublishLive = async () => {
    const ok = await publishSection('work', workData);
    if (ok) {
      setSavedStatus(true);
      setPreviewKey((k) => k + 1);
      setTimeout(() => setSavedStatus(false), 3000);
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ── TOP ACTION HEADER ── */}
      <div
        style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
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
              marginLeft: '0.25rem',
              fontWeight: 600,
            }}
          >
            <Briefcase size={13} />
            <span>Go to Work Page &amp; Reels</span>
          </Link>

          {/* View Mode: Editor vs Order & Visibility */}
          <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#F4F4F5', borderRadius: '8px', padding: '2px', marginLeft: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setViewMode('editor')}
              style={{
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'editor' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'editor' ? '#111113' : '#71717A',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: viewMode === 'editor' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <FileText size={12} />
              Editor
            </button>
            <button
              type="button"
              onClick={() => setViewMode('order')}
              style={{
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'order' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'order' ? '#111113' : '#71717A',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: viewMode === 'order' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <GripVertical size={12} />
              Order &amp; Visibility
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Amber pill: Save Draft */}
          <button
            type="button"
            onClick={() => handleSaveDraft()}
            title="Save draft to CRM"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '9999px',
              border: '1px solid #D97706',
              backgroundColor: savedStatus ? '#F0FDF4' : '#FEF3C7',
              color: savedStatus ? '#16A34A' : '#92400E',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease',
            }}
          >
            {savedStatus ? <Check size={13} /> : <FileText size={13} />}
            <span>{savedStatus ? 'Draft Saved' : 'Save Draft'}</span>
          </button>

          {/* Red pill: Publish Live */}
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
              boxShadow: '0 2px 8px rgba(222, 50, 45, 0.25)',
            }}
          >
            <Upload size={13} />
            <span>Publish This Page</span>
          </button>
        </div>
      </div>

      {/* ── SPLIT MAIN WORKSPACE: LEFT EDITOR | RIGHT LIVE PREVIEW ── */}
      <div className="admin-split-grid" style={{ padding: '1rem' }}>
        {/* LEFT COLUMN: CASE STUDIES SELECTOR + SUBTABS EDITOR OR ORDER VIEW */}
        {viewMode === 'order' ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              minWidth: 0,
              width: '100%',
            }}
          >
            <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 650, margin: 0, color: '#111113' }}>
                Case Studies Sequence &amp; Visibility Controls
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
                Reorder or toggle visibility for each of the {workData.caseStudies?.length || 0} case studies. Live preview and website update instantly.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(workData.caseStudies || []).map((cs: any, idx: number, arr: any[]) => (
                <div
                  key={cs.id || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: cs.enabled !== false && cs.published !== false ? '#FFFFFF' : '#FAFAFA',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    opacity: cs.enabled !== false && cs.published !== false ? 1 : 0.65,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveCase(idx, 'up')}
                        style={{ border: 'none', background: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                      >
                        <ChevronUp size={14} color={idx === 0 ? '#D4D4D8' : '#71717A'} />
                      </button>
                      <button
                        type="button"
                        disabled={idx === arr.length - 1}
                        onClick={() => handleMoveCase(idx, 'down')}
                        style={{ border: 'none', background: 'transparent', cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                      >
                        <ChevronDown size={14} color={idx === arr.length - 1 ? '#D4D4D8' : '#71717A'} />
                      </button>
                    </div>

                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#71717A', width: '22px' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111113' }}>
                        {cs.title || 'Untitled Project'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#71717A' }}>
                        {cs.client || 'Client'} &bull; {cs.category || 'Category'} &bull; Slug: /{cs.slug || cs.id}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCaseId(cs.id || cs.slug);
                        setViewMode('editor');
                      }}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(0,0,0,0.12)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: '#111113',
                        cursor: 'pointer',
                      }}
                    >
                      Edit Content
                    </button>
                    <CmsToggle
                      checked={cs.enabled !== false && cs.published !== false}
                      onChange={() => toggleCaseEnabled(cs.id || cs.slug)}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
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
              {filteredCases.map((c: any, idx: number, arr: any[]) => {
                const isSelected = (c.id === selectedCase?.id || c.slug === selectedCase?.slug);
                const isCaseEnabled = c.enabled !== false && c.published !== false;
                return (
                  <div
                    key={c.id || c.slug}
                    onClick={() => setSelectedCaseId(c.id || c.slug)}
                    style={{
                      padding: '0.55rem 0.65rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#111113' : (isCaseEnabled ? '#FFFFFF' : '#FEF2F2'),
                      color: isSelected ? '#FFFFFF' : '#111113',
                      border: isSelected ? '1px solid #111113' : (isCaseEnabled ? '1px solid rgba(0,0,0,0.06)' : '1px dashed #FECACA'),
                      cursor: 'pointer',
                      marginBottom: '0.35rem',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.35rem',
                    }}
                  >
                    <div style={{ overflow: 'hidden', flex: 1, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: isSelected ? 650 : 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.title || 'Untitled Case'}
                      </div>
                      <div style={{ fontSize: '0.66rem', color: isSelected ? 'rgba(255, 255, 255, 0.65)' : '#71717A', marginTop: '0.15rem' }}>
                        {c.client || c.category || 'General'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => toggleCaseEnabled(c.id || c.slug)}
                        title={isCaseEnabled ? 'Disable case study' : 'Enable case study'}
                        style={{
                          border: 'none',
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : (isCaseEnabled ? '#ECFDF5' : '#FEE2E2'),
                          color: isSelected ? '#FFFFFF' : (isCaseEnabled ? '#047857' : '#DC2626'),
                          borderRadius: '4px',
                          padding: '3px 4px',
                          cursor: 'pointer',
                        }}
                      >
                        {isCaseEnabled ? <Eye size={12} /> : <EyeOff size={12} />}
                      </button>

                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveCase(idx, 'up')}
                        title="Move up"
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: isSelected ? (idx === 0 ? '#52525B' : '#E4E4E7') : (idx === 0 ? '#D4D4D8' : '#52525B'),
                          cursor: idx === 0 ? 'not-allowed' : 'pointer',
                          padding: '2px',
                        }}
                      >
                        <ChevronUp size={13} />
                      </button>

                      <button
                        type="button"
                        disabled={idx === arr.length - 1}
                        onClick={() => handleMoveCase(idx, 'down')}
                        title="Move down"
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: isSelected ? (idx === arr.length - 1 ? '#52525B' : '#E4E4E7') : (idx === arr.length - 1 ? '#D4D4D8' : '#52525B'),
                          cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer',
                          padding: '2px',
                        }}
                      >
                        <ChevronDown size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(c.id || c.slug)}
                        title="Delete case study"
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: isSelected ? '#FCA5A5' : '#EF4444',
                          borderRadius: '4px',
                          padding: '2px',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <button
                type="button"
                onClick={handleAddNewCase}
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
                {/* PROMINENT CASE STUDY LAYOUT SELECTOR */}
                <div
                  style={{
                    padding: '0.85rem 1.25rem',
                    backgroundColor: '#FDF2F2',
                    borderBottom: '1px solid #FECACA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    flexShrink: 0,
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#DE322D', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Choose Case Study Layout
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#7F1D1D' }}>
                      Selected layout determines the visual architecture across headline, imagery, and narrative blocks.
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    {[
                      { id: 'layout-1', name: 'Layout 1', desc: 'Editorial Classic' },
                      { id: 'layout-2', name: 'Layout 2', desc: 'Split Sidebar' },
                      { id: 'layout-3', name: 'Layout 3', desc: 'Modern Magazine' },
                    ].map((l) => {
                      const isSelected = (selectedCase.layoutStyle || selectedCase.layout || 'layout-1') === l.id;
                      return (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => {
                            handleCaseChange('layoutStyle', l.id);
                            handleCaseChange('layout', l.id);
                          }}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: '6px',
                            border: isSelected ? '1.5px solid #DE322D' : '1px solid #E4E4E7',
                            backgroundColor: isSelected ? '#DE322D' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : '#27272A',
                            fontSize: '0.74rem',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            lineHeight: 1.2,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span>{l.name}</span>
                          <span style={{ fontSize: '0.62rem', opacity: isSelected ? 0.9 : 0.65 }}>{l.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

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
                    { id: 'narrative', label: '3. Narrative & Approach' },
                    { id: 'gallery', label: '4. Visual Gallery' },
                    { id: 'outcomes', label: '5. Outcomes & Quote' },
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
                      {/* CASE STUDY VISIBILITY & DIRECT LINK */}
                      <div style={{ padding: '0.95rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0F172A', letterSpacing: '0.04em' }}>
                            WORK VISIBILITY &amp; DIRECT LINK
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                padding: '0.2rem 0.55rem',
                                borderRadius: '4px',
                                backgroundColor: selectedCase.enabled !== false && selectedCase.published !== false ? '#DCFCE7' : '#FEE2E2',
                                color: selectedCase.enabled !== false && selectedCase.published !== false ? '#15803D' : '#B91C1C',
                              }}
                            >
                              {selectedCase.enabled !== false && selectedCase.published !== false ? 'Active on Website' : 'Hidden / Disabled'}
                            </span>
                            <CmsToggle
                              checked={selectedCase.enabled !== false && selectedCase.published !== false}
                              onChange={() => toggleCaseEnabled(selectedCase.id || selectedCase.slug)}
                              size="sm"
                            />
                          </div>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: 1.4 }}>
                          Work visibility controls both the Work page card and access to the dynamic case study page.
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem', marginTop: '0.2rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                              DIRECT DESTINATION URL
                            </label>
                            <input
                              type="text"
                              value={selectedCase.directUrl !== undefined ? selectedCase.directUrl : (selectedCase.slug ? `/work/${selectedCase.slug}` : (selectedCase.id ? `/work/${selectedCase.id}` : ''))}
                              onChange={(e) => handleCaseChange('directUrl', e.target.value)}
                              placeholder={`/work/${selectedCase.slug || selectedCase.id || ''}`}
                              style={{ ...inputStyle, fontSize: '0.78rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                              BUTTON LABEL
                            </label>
                            <input
                              type="text"
                              value={selectedCase.caseStudyBtnText !== undefined ? selectedCase.caseStudyBtnText : 'View case study ↗'}
                              onChange={(e) => handleCaseChange('caseStudyBtnText', e.target.value)}
                              placeholder="View case study ↗"
                              style={{ ...inputStyle, fontSize: '0.78rem' }}
                            />
                          </div>
                        </div>
                      </div>

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

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#111113' }}>
                          Publish on website:
                        </span>
                        <CmsToggle
                          checked={selectedCase.enabled !== false && selectedCase.published !== false}
                          onChange={(next) => {
                            handleCaseChange('published', next);
                            handleCaseChange('enabled', next);
                          }}
                          size="sm"
                        />
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
                      {/* Page Header Section Controls */}
                      <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1E293B' }}>
                            PAGE HEADER & HERO CONTROLS
                          </span>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', fontWeight: 600, color: selectedCase.showHeader !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={selectedCase.showHeader !== false}
                              onChange={(e) => handleCaseChange('showHeader', e.target.checked)}
                              style={{ width: '16px', height: '16px', accentColor: '#16A34A' }}
                            />
                            <span>{selectedCase.showHeader !== false ? 'Page Header: Enabled' : 'Page Header: Disabled'}</span>
                          </label>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.85rem' }}>
                          Control whether the top case study header, breadcrumb navigation, title, and intro metadata are visible on the website.
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                              DETAIL PAGE HEADLINE
                            </label>
                            <input
                              type="text"
                              value={selectedCase.title || ''}
                              onChange={(e) => handleCaseChange('title', e.target.value)}
                              style={inputStyle}
                              placeholder="Case study headline..."
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                              SUPPORTING TEXT / HERO ONE-LINER
                            </label>
                            <input
                              type="text"
                              value={activeCaseMerged.subtitle || ''}
                              onChange={(e) => handleCaseChange('subtitle', e.target.value)}
                              style={inputStyle}
                              placeholder="e.g. One relationship. Three very different businesses."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hero & Media Section */}
                      <div style={{ padding: '0.85rem', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111113' }}>
                            PRIMARY CASE STUDY MEDIA (IMAGE, VIDEO, OR PDF)
                          </span>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.74rem', fontWeight: 600, color: selectedCase.showHeroImage !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={selectedCase.showHeroImage !== false}
                              onChange={(e) => handleCaseChange('showHeroImage', e.target.checked)}
                              style={{ width: '15px', height: '15px', accentColor: '#16A34A' }}
                            />
                            <span>{selectedCase.showHeroImage !== false ? 'Hero Media: Enabled' : 'Hero Media: Disabled'}</span>
                          </label>
                        </div>

                        {/* Media Type Selector */}
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}>
                            SELECT MEDIA TYPE FOR THIS CASE STUDY
                          </label>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {[
                              { id: 'image', label: '🖼️ Image' },
                              { id: 'video', label: '🎬 Video' },
                              { id: 'pdf', label: '📄 PDF Document' },
                            ].map((mt) => {
                              const activeType = selectedCase.mediaType || (selectedCase.pdfUrl ? 'pdf' : selectedCase.videoUrl ? 'video' : 'image');
                              const isSel = activeType === mt.id;
                              return (
                                <button
                                  key={mt.id}
                                  type="button"
                                  onClick={() => handleCaseChange('mediaType', mt.id)}
                                  style={{
                                    flex: 1,
                                    padding: '0.45rem 0.75rem',
                                    borderRadius: '6px',
                                    border: isSel ? '1.5px solid #DE322D' : '1px solid #E4E4E7',
                                    backgroundColor: isSel ? '#DE322D' : '#F4F4F5',
                                    color: isSel ? '#FFFFFF' : '#27272A',
                                    fontSize: '0.76rem',
                                    fontWeight: isSel ? 700 : 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                  }}
                                >
                                  {mt.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Image Option */}
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.85rem' }}>
                          <div style={{ width: '100px', height: '65px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E4E4E7', flexShrink: 0 }}>
                            {activeCaseMerged.heroImage ? (
                              <Image src={activeCaseMerged.heroImage} alt="" fill style={{ objectFit: 'cover' }} />
                            ) : null}
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: '#52525B', marginBottom: '0.2rem' }}>
                              HERO IMAGE URL
                            </label>
                            <input
                              type="text"
                              value={activeCaseMerged.heroImage || ''}
                              onChange={(e) => handleCaseChange('heroImage', e.target.value)}
                              style={{ ...inputStyle, marginBottom: '0.35rem' }}
                            />
                            <div style={{ display: 'flex', gap: '0.45rem' }}>
                              <button
                                type="button"
                                onClick={() => heroImgInputRef.current?.click()}
                                style={mediaBtnStyle}
                              >
                                Upload Image
                              </button>
                              <button
                                type="button"
                                onClick={() => setMediaPickerTarget({ path: 'heroImage', type: 'image' })}
                                style={mediaBtnStyle}
                              >
                                Pick Image
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.3rem' }}>
                            HERO MEDIA CAPTION
                          </label>
                          <input
                            type="text"
                            value={activeCaseMerged.heroImageCaption || ''}
                            onChange={(e) => handleCaseChange('heroImageCaption', e.target.value)}
                            style={inputStyle}
                            placeholder="Optional caption displayed under the hero image..."
                          />
                        </div>
                      </div>

                      {/* Core Scope Controls */}
                      <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {/* CORE SCOPE - EDIT & ENABLE/DISABLE */}
                        <div style={{ padding: '0.9rem', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#991B1B' }}>
                              CORE SCOPE
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', fontWeight: 600, color: selectedCase.showCoreScope !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={selectedCase.showCoreScope !== false}
                                onChange={(e) => handleCaseChange('showCoreScope', e.target.checked)}
                                style={{ width: '16px', height: '16px', accentColor: '#16A34A' }}
                              />
                              <span>{selectedCase.showCoreScope !== false ? 'Core Scope: Enabled' : 'Core Scope: Disabled'}</span>
                            </label>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#7F1D1D', marginBottom: '0.65rem', lineHeight: 1.4 }}>
                            If disabled, the Core Scope section will not appear on the website. Enter one deliverable or capability per line.
                          </div>
                          <textarea
                            rows={4}
                            value={(activeCaseMerged.snapshot?.coreCapabilities || []).join('\n')}
                            onChange={(e) =>
                              handleCaseChange('snapshot', {
                                ...activeCaseMerged.snapshot,
                                coreCapabilities: e.target.value.split('\n').filter(Boolean),
                              })
                            }
                            placeholder="Deliverable 1&#10;Deliverable 2&#10;Deliverable 3..."
                            style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.78rem' }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* SUBTAB 3: NARRATIVE & APPROACH */}
                  {caseSubTab === 'narrative' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                            03 NARRATIVE &amp; APPROACH SECTION
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                            Master switch to enable or disable the complete Narrative &amp; Approach block on the website.
                          </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.74rem', fontWeight: 650, color: selectedCase.showNarrative !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={selectedCase.showNarrative !== false}
                            onChange={(e) => handleCaseChange('showNarrative', e.target.checked)}
                            style={{ width: '16px', height: '16px', accentColor: '#16A34A', cursor: 'pointer' }}
                          />
                          <span>{selectedCase.showNarrative !== false ? 'Section: Enabled' : 'Section: Disabled'}</span>
                        </label>
                      </div>

                      <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#F4F4F5', borderRadius: '6px', fontSize: '0.74rem', color: '#52525B', lineHeight: 1.4 }}>
                        Configure the 3 core narrative sections of this case study. Each section can be individually enabled, disabled, edited, or cleared.
                      </div>

                      {/* 1. THE CHALLENGE */}
                      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#FAFAFA' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B', letterSpacing: '0.04em' }}>
                            1. THE CHALLENGE (PROBLEM CONTEXT)
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <button
                              type="button"
                              onClick={() => {
                                handleCaseChange('challenge', '');
                                handleCaseChange('realChallenge', []);
                                handleCaseChange('situation', []);
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#EF4444',
                                fontSize: '0.68rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '2px 4px',
                              }}
                            >
                              <Trash2 size={12} />
                              Clear Challenge
                            </button>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedCase.showChallenge !== false ? '#16A34A' : '#71717A' }}>
                              <input
                                type="checkbox"
                                checked={selectedCase.showChallenge !== false}
                                onChange={(e) => handleCaseChange('showChallenge', e.target.checked)}
                                style={{ width: '15px', height: '15px', accentColor: '#16A34A', cursor: 'pointer' }}
                              />
                              <span>{selectedCase.showChallenge !== false ? 'Visible' : 'Hidden'}</span>
                            </label>
                          </div>
                        </div>
                        <textarea
                          rows={4}
                          value={activeCaseMerged.challenge || (activeCaseMerged.realChallenge || []).join('\n\n') || (activeCaseMerged.situation || []).join('\n\n') || ''}
                          onChange={(e) => {
                            handleCaseChange('challenge', e.target.value);
                            handleCaseChange('realChallenge', e.target.value.split('\n\n').filter(Boolean));
                          }}
                          placeholder="Describe the initial brand reality, business context, and the problem Ārohana was called to solve..."
                          style={inputStyle}
                        />
                      </div>

                      {/* 2. WHAT WE DID / WORK PILLARS */}
                      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#FAFAFA' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B', letterSpacing: '0.04em' }}>
                            2. WHAT WE DID / WORK PILLARS (STRATEGY &amp; EXECUTION)
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <button
                              type="button"
                              onClick={() => handleCaseChange('whatWeDid', '')}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#EF4444',
                                fontSize: '0.68rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '2px 4px',
                              }}
                            >
                              <Trash2 size={12} />
                              Clear Execution
                            </button>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedCase.showWhatWeDid !== false ? '#16A34A' : '#71717A' }}>
                              <input
                                type="checkbox"
                                checked={selectedCase.showWhatWeDid !== false}
                                onChange={(e) => handleCaseChange('showWhatWeDid', e.target.checked)}
                                style={{ width: '15px', height: '15px', accentColor: '#16A34A', cursor: 'pointer' }}
                              />
                              <span>{selectedCase.showWhatWeDid !== false ? 'Visible' : 'Hidden'}</span>
                            </label>
                          </div>
                        </div>
                        <textarea
                          rows={5}
                          value={activeCaseMerged.whatWeDid || (activeCaseMerged.work ? activeCaseMerged.work.map((w: any) => `${w.title}: ${w.description}`).join('\n\n') : '')}
                          onChange={(e) => handleCaseChange('whatWeDid', e.target.value)}
                          placeholder="Detail the workstreams delivered, creative direction, photo/video production, and digital management..."
                          style={inputStyle}
                        />
                      </div>

                      {/* 3. THE RESULT */}
                      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#FAFAFA' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B', letterSpacing: '0.04em' }}>
                            3. THE RESULT (MEASURED IMPACT)
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <button
                              type="button"
                              onClick={() => handleCaseChange('theResult', '')}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#EF4444',
                                fontSize: '0.68rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '2px 4px',
                              }}
                            >
                              <Trash2 size={12} />
                              Clear Result
                            </button>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedCase.showResult !== false ? '#16A34A' : '#71717A' }}>
                              <input
                                type="checkbox"
                                checked={selectedCase.showResult !== false}
                                onChange={(e) => handleCaseChange('showResult', e.target.checked)}
                                style={{ width: '15px', height: '15px', accentColor: '#16A34A', cursor: 'pointer' }}
                              />
                              <span>{selectedCase.showResult !== false ? 'Visible' : 'Hidden'}</span>
                            </label>
                          </div>
                        </div>
                        <textarea
                          rows={4}
                          value={activeCaseMerged.theResult || ''}
                          onChange={(e) => handleCaseChange('theResult', e.target.value)}
                          placeholder="Highlight the concrete outcome, commercial retention, or business shift achieved..."
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 4: VISUAL GALLERY */}
                  {caseSubTab === 'gallery' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#111113' }}>
                            Visual Gallery ({activeCaseMerged.gallery?.length || 0} Assets)
                          </span>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, color: selectedCase.galleryEnabled !== false ? '#16A34A' : '#71717A' }}>
                            <input
                              type="checkbox"
                              checked={selectedCase.galleryEnabled !== false}
                              onChange={(e) => handleCaseChange('galleryEnabled', e.target.checked)}
                              style={{ width: '15px', height: '15px', accentColor: '#16A34A', cursor: 'pointer' }}
                            />
                            <span>{selectedCase.galleryEnabled !== false ? 'Gallery Section: Enabled' : 'Gallery Section: Disabled'}</span>
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newG = [
                              ...(activeCaseMerged.gallery || []),
                              { image: '/images/case-studies/raysons/neora-1.jpg', caption: 'New photo showcase', url: '', enabled: true },
                            ];
                            handleCaseChange('gallery', newG);
                          }}
                          style={{ ...mediaBtnStyle, backgroundColor: '#111113', color: '#FFFFFF', border: 'none' }}
                        >
                          + Add Media Asset
                        </button>
                      </div>

                      {/* Heading & Subheading inputs for Stills section */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '0.85rem', backgroundColor: '#F4F4F5', borderRadius: '8px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                            SECTION HEADING (&ldquo;Stills from some of our work..&rdquo;)
                          </label>
                          <input
                            type="text"
                            value={activeCaseMerged.stillsHeading || ''}
                            onChange={(e) => handleCaseChange('stillsHeading', e.target.value)}
                            style={inputStyle}
                            placeholder="Stills from some of our work.."
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#52525B', marginBottom: '0.25rem' }}>
                            SECTION SUBHEADING
                          </label>
                          <input
                            type="text"
                            value={activeCaseMerged.stillsSubheading || ''}
                            onChange={(e) => handleCaseChange('stillsSubheading', e.target.value)}
                            style={inputStyle}
                            placeholder="Visual evidence & production stills..."
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {(activeCaseMerged.gallery || []).map((item: any, gIdx: number) => {
                          const currentType = item.type || (item.pdfUrl || (item.url && item.url.includes('.pdf')) ? 'pdf' : (item.videoUrl ? 'video' : 'image'));

                          return (
                            <div
                              key={gIdx}
                              style={{
                                padding: '1.25rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                backgroundColor: item.enabled !== false ? '#FFFFFF' : '#F8FAFC',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                              }}
                            >
                              {/* Asset Header */}
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '0.65rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111113', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                    PRIMARY MEDIA ASSET 0{gIdx + 1} ({currentType === 'pdf' ? 'PDF DOCUMENT' : currentType.toUpperCase()})
                                  </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', fontSize: '0.76rem', fontWeight: 600, color: item.enabled !== false ? '#16A34A' : '#71717A' }}>
                                    <input
                                      type="checkbox"
                                      checked={item.enabled !== false}
                                      onChange={(e) => {
                                        const g = [...activeCaseMerged.gallery];
                                        g[gIdx].enabled = e.target.checked;
                                        handleCaseChange('gallery', g);
                                      }}
                                      style={{ width: '16px', height: '16px', accentColor: '#16A34A', cursor: 'pointer' }}
                                    />
                                    <span>{item.enabled !== false ? 'Asset Media: Enabled' : 'Asset Media: Disabled'}</span>
                                  </label>

                                  <button
                                    type="button"
                                    title="Delete asset"
                                    onClick={() => {
                                      const g = activeCaseMerged.gallery.filter((_: any, idx: number) => idx !== gIdx);
                                      handleCaseChange('gallery', g);
                                    }}
                                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', padding: '0.25rem' }}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>

                              {/* SELECT MEDIA TYPE BUTTONS */}
                              <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#52525B', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                  SELECT MEDIA TYPE FOR THIS ASSET
                                </label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  {[
                                    { id: 'image', label: '🖼️ Image' },
                                    { id: 'video', label: '🎬 Video' },
                                    { id: 'pdf', label: '📄 PDF Document' },
                                  ].map((mt) => {
                                    const isSel = currentType === mt.id;
                                    return (
                                      <button
                                        key={mt.id}
                                        type="button"
                                        onClick={() => {
                                          const g = [...activeCaseMerged.gallery];
                                          g[gIdx].type = mt.id;
                                          handleCaseChange('gallery', g);
                                        }}
                                        style={{
                                          flex: 1,
                                          padding: '0.5rem 0.75rem',
                                          borderRadius: '6px',
                                          border: isSel ? '1.5px solid #DE322D' : '1px solid #E4E4E7',
                                          backgroundColor: isSel ? '#DE322D' : '#F4F4F5',
                                          color: isSel ? '#FFFFFF' : '#27272A',
                                          fontSize: '0.78rem',
                                          fontWeight: isSel ? 700 : 500,
                                          cursor: 'pointer',
                                          transition: 'all 0.15s ease',
                                        }}
                                      >
                                        {mt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* CONDITIONAL CONTROLS PER MEDIA TYPE */}

                              {/* 1. IMAGE CONTROLS */}
                              {currentType === 'image' && (
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                    ASSET IMAGE URL
                                  </label>
                                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                                    <div style={{ width: '100px', height: '65px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E4E4E7', flexShrink: 0, border: '1px solid rgba(0,0,0,0.08)' }}>
                                      {item.image ? (
                                        <Image src={item.image} alt="" fill style={{ objectFit: 'cover' }} />
                                      ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#71717A' }}>
                                          No Image
                                        </div>
                                      )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                      <input
                                        type="text"
                                        value={item.image || ''}
                                        onChange={(e) => {
                                          const g = [...activeCaseMerged.gallery];
                                          g[gIdx].image = e.target.value;
                                          handleCaseChange('gallery', g);
                                        }}
                                        style={{ ...inputStyle, marginBottom: '0.4rem' }}
                                        placeholder="/images/case-studies/... or https://..."
                                      />
                                      <div style={{ display: 'flex', gap: '0.45rem' }}>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            activeGalleryIdxRef.current = gIdx;
                                            galleryImgInputRef.current?.click();
                                          }}
                                          style={mediaBtnStyle}
                                        >
                                          Upload Image
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setMediaPickerTarget({ path: `gallery[${gIdx}].image`, type: 'image' })}
                                          style={mediaBtnStyle}
                                        >
                                          Pick Image
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* 2. VIDEO CONTROLS */}
                              {currentType === 'video' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                      VIDEO URL (MP4, YouTube, Vimeo, or Hosted Video)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.videoUrl || item.url || ''}
                                      onChange={(e) => {
                                        const g = [...activeCaseMerged.gallery];
                                        g[gIdx].videoUrl = e.target.value;
                                        handleCaseChange('gallery', g);
                                      }}
                                      style={{ ...inputStyle, marginBottom: '0.4rem' }}
                                      placeholder="e.g. https://www.youtube.com/watch?v=... or /uploads/video.mp4"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setMediaPickerTarget({ path: `gallery[${gIdx}].videoUrl`, type: 'video' })}
                                      style={mediaBtnStyle}
                                    >
                                      Pick / Upload Video
                                    </button>
                                  </div>

                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                      POSTER / PREVIEW IMAGE URL
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                                      <div style={{ width: '100px', height: '65px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E4E4E7', flexShrink: 0, border: '1px solid rgba(0,0,0,0.08)' }}>
                                        {item.image ? (
                                          <Image src={item.image} alt="" fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#71717A' }}>
                                            No Poster
                                          </div>
                                        )}
                                      </div>
                                      <div style={{ flex: 1 }}>
                                        <input
                                          type="text"
                                          value={item.image || ''}
                                          onChange={(e) => {
                                            const g = [...activeCaseMerged.gallery];
                                            g[gIdx].image = e.target.value;
                                            handleCaseChange('gallery', g);
                                          }}
                                          style={{ ...inputStyle, marginBottom: '0.4rem' }}
                                          placeholder="Poster image for video (/images/... or https://...)"
                                        />
                                        <div style={{ display: 'flex', gap: '0.45rem' }}>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              activeGalleryIdxRef.current = gIdx;
                                              galleryImgInputRef.current?.click();
                                            }}
                                            style={mediaBtnStyle}
                                          >
                                            Upload Image
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setMediaPickerTarget({ path: `gallery[${gIdx}].image`, type: 'image' })}
                                            style={mediaBtnStyle}
                                          >
                                            Pick Image
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* 3. PDF DOCUMENT CONTROLS */}
                              {currentType === 'pdf' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                      PDF DOCUMENT URL (Opens in Reusable Website PDF Viewer)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.pdfUrl || item.url || ''}
                                      onChange={(e) => {
                                        const g = [...activeCaseMerged.gallery];
                                        g[gIdx].pdfUrl = e.target.value;
                                        handleCaseChange('gallery', g);
                                      }}
                                      style={{ ...inputStyle, marginBottom: '0.4rem' }}
                                      placeholder="e.g. /uploads/she-project-ladakh.pdf or https://..."
                                    />
                                    <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                                      <button
                                        type="button"
                                        onClick={() => setMediaPickerTarget({ path: `gallery[${gIdx}].pdfUrl`, type: 'pdf' })}
                                        style={mediaBtnStyle}
                                      >
                                        Pick / Upload PDF
                                      </button>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#71717A' }}>
                                      Configures the PDF document displayed when visitors view this item.
                                    </div>
                                  </div>

                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                      COVER IMAGE URL (For PDF Card Thumbnail)
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                                      <div style={{ width: '100px', height: '65px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#E4E4E7', flexShrink: 0, border: '1px solid rgba(0,0,0,0.08)' }}>
                                        {item.image ? (
                                          <Image src={item.image} alt="" fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#71717A' }}>
                                            PDF Cover
                                          </div>
                                        )}
                                      </div>
                                      <div style={{ flex: 1 }}>
                                        <input
                                          type="text"
                                          value={item.image || ''}
                                          onChange={(e) => {
                                            const g = [...activeCaseMerged.gallery];
                                            g[gIdx].image = e.target.value;
                                            handleCaseChange('gallery', g);
                                          }}
                                          style={{ ...inputStyle, marginBottom: '0.4rem' }}
                                          placeholder="Thumbnail cover image for PDF (/images/...)"
                                        />
                                        <div style={{ display: 'flex', gap: '0.45rem' }}>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              activeGalleryIdxRef.current = gIdx;
                                              galleryImgInputRef.current?.click();
                                            }}
                                            style={mediaBtnStyle}
                                          >
                                            Upload Image
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setMediaPickerTarget({ path: `gallery[${gIdx}].image`, type: 'image' })}
                                            style={mediaBtnStyle}
                                          >
                                            Pick Image
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* COMMON: CAPTION & REDIRECT */}
                              <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                  MEDIA CAPTION / SUBTITLE
                                </label>
                                <input
                                  type="text"
                                  value={item.caption || ''}
                                  onChange={(e) => {
                                    const g = [...activeCaseMerged.gallery];
                                    g[gIdx].caption = e.target.value;
                                    handleCaseChange('gallery', g);
                                  }}
                                  style={inputStyle}
                                  placeholder="Caption / description text displayed with this asset..."
                                />
                              </div>

                              <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                  TARGET REDIRECT URL (Optional Custom Link)
                                </label>
                                <input
                                  type="text"
                                  value={item.url || item.redirectUrl || ''}
                                  onChange={(e) => {
                                    const g = [...activeCaseMerged.gallery];
                                    g[gIdx].url = e.target.value;
                                    handleCaseChange('gallery', g);
                                  }}
                                  style={inputStyle}
                                  placeholder="Custom redirect link (e.g. /pdf-viewer?url=... or https://...)"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 5: OUTCOMES & QUOTE */}
                  {caseSubTab === 'outcomes' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                            05 OUTCOMES &amp; QUOTE SECTION
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                            Master switch to enable or disable the complete Outcomes &amp; Quote proof block on the website.
                          </div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.74rem', fontWeight: 650, color: selectedCase.showOutcomes !== false ? '#16A34A' : '#71717A', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={selectedCase.showOutcomes !== false}
                            onChange={(e) => handleCaseChange('showOutcomes', e.target.checked)}
                            style={{ width: '16px', height: '16px', accentColor: '#16A34A', cursor: 'pointer' }}
                          />
                          <span>{selectedCase.showOutcomes !== false ? 'Section: Enabled' : 'Section: Disabled'}</span>
                        </label>
                      </div>

                      <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#F4F4F5', borderRadius: '6px', fontSize: '0.74rem', color: '#52525B', lineHeight: 1.4 }}>
                        Configure the verified outcome statement and founder closing quote. Each field has enable/disable controls and a delete/clear option.
                      </div>

                      {/* VERIFIED OUTCOMES */}
                      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#FAFAFA' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B', letterSpacing: '0.04em' }}>
                            VERIFIED OUTCOMES STATEMENT
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <button
                              type="button"
                              onClick={() => handleCaseChange('proof', { ...activeCaseMerged.proof, verifiedText: '' })}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#EF4444',
                                fontSize: '0.68rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '2px 4px',
                              }}
                            >
                              <Trash2 size={12} />
                              Clear Outcomes
                            </button>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedCase.showVerifiedText !== false ? '#16A34A' : '#71717A' }}>
                              <input
                                type="checkbox"
                                checked={selectedCase.showVerifiedText !== false}
                                onChange={(e) => handleCaseChange('showVerifiedText', e.target.checked)}
                                style={{ width: '15px', height: '15px', accentColor: '#16A34A', cursor: 'pointer' }}
                              />
                              <span>{selectedCase.showVerifiedText !== false ? 'Visible' : 'Hidden'}</span>
                            </label>
                          </div>
                        </div>
                        <textarea
                          rows={4}
                          value={activeCaseMerged.proof?.verifiedText || ''}
                          onChange={(e) => handleCaseChange('proof', { ...activeCaseMerged.proof, verifiedText: e.target.value })}
                          placeholder="e.g. Expanded across three distinct commercial verticals over 18+ months with zero agency churn..."
                          style={inputStyle}
                        />
                      </div>

                      {/* FOUNDER CLOSING QUOTE */}
                      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#FAFAFA' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 650, color: '#52525B', letterSpacing: '0.04em' }}>
                            FOUNDER CLOSING QUOTE
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <button
                              type="button"
                              onClick={() => handleCaseChange('closingQuote', '')}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#EF4444',
                                fontSize: '0.68rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                padding: '2px 4px',
                              }}
                            >
                              <Trash2 size={12} />
                              Clear Quote
                            </button>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, color: selectedCase.showClosingQuote !== false ? '#16A34A' : '#71717A' }}>
                              <input
                                type="checkbox"
                                checked={selectedCase.showClosingQuote !== false}
                                onChange={(e) => handleCaseChange('showClosingQuote', e.target.checked)}
                                style={{ width: '15px', height: '15px', accentColor: '#16A34A', cursor: 'pointer' }}
                              />
                              <span>{selectedCase.showClosingQuote !== false ? 'Visible' : 'Hidden'}</span>
                            </label>
                          </div>
                        </div>
                        <textarea
                          rows={3}
                          value={activeCaseMerged.closingQuote || ''}
                          onChange={(e) => handleCaseChange('closingQuote', e.target.value)}
                          placeholder="e.g. Long-term client relationships aren’t built on presentations. They are built on delivering quality consistently..."
                          style={inputStyle}
                        />
                      </div>
                    </div>
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
        )}

        {/* RIGHT COLUMN: INTERACTIVE LIVE PREVIEW */}
        <div className="admin-preview-sticky">
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
        message={
          deleteTargetCase
            ? `Are you sure you want to delete "${deleteTargetCase.title || deleteTargetCase.id}"?\n\nThis action cannot be undone.`
            : 'Are you sure you want to delete this case study?\n\nThis action cannot be undone.'
        }
        confirmLabel="Delete Case Study"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (deleteTargetId) {
            handleDeleteCase(deleteTargetId);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Hidden Upload Inputs */}
      <input
        ref={galleryImgInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleDirectUpload(file, 'gallery');
        }}
      />
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
