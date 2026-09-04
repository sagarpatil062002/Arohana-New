'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Lock,
  Mail,
  KeyRound,
  Sparkles,
  LogOut,
  X,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Save,
  Layers,
  FileText,
  Video,
  Compass,
  Shield,
  PhoneCall,
  Sliders,
  FolderKanban,
  Grid,
  Image as ImageIcon,
  Globe,
  Briefcase,
  Search,
  Check,
  Building,
  Edit3,
  MessageSquare,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Clock,
  User,
  Building2,
  Filter,
  Link2,
  ArrowLeft,
  ListPlus,
} from 'lucide-react';
import { useAdminAuth } from '@/lib/auth';
import { useCmsStore } from '@/lib/cmsStore';
import {
  CaseStudyItem,
  WorkDirectoryItem,
  TourinPackageItem,
  ArmyProjectItem,
  ClientLogoItem,
  InquiryStatus,
  CrmInquiry,
  SectorType,
  HomePageSingleton,
  AboutPageSingleton,
  ServicesPageSingleton,
  SeoMetadataCollection,
} from '@/types/cms';

const SECTORS_LIST: SectorType[] = [
  'Hospitality & F&B',
  'Real Estate & Built Environment',
  'Healthcare',
  'Lifestyle & Consumer',
  'Entertainment & Media',
  'Travel & Tourism',
  'Institutional / Community',
];

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  new: { label: 'New Lead', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  contacted: { label: 'Contacted', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  proposal_sent: { label: 'Proposal Sent', bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' },
  closed: { label: 'Closed / Won', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  archived: { label: 'Archived', bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/30' },
};

// Blank Templates
const BLANK_CASE_STUDY: CaseStudyItem = {
  clientName: '',
  slug: '',
  heroBusinessStatement: '',
  heroMedia: '/images/case-studies/raysons-hero.jpg',
  heroMediaCaption: '',
  snapshot: {
    sector: 'Hospitality & F&B',
    location: 'India',
    engagementType: 'Brand Strategy & Retainer Advisory',
    duration: 'Active Client Engagement',
    coreCapabilities: ['Brand Strategy', 'Culinary & Operations Consulting'],
  },
  theSituation: ['Describe the business background, operational context, and initial conditions...'],
  theRealChallenge: ['Identify the core strategic bottleneck that needed to be addressed...'],
  theThinking: ['Detail the strategic philosophy, intellectual decisions, and roadmap...'],
  theWork: [
    {
      workstreamTitle: 'Primary Brand Deliverable',
      workstreamDetails: 'Comprehensive execution deliverables and rollouts...',
    },
  ],
  proofOutcomes: [
    {
      metricOrChange: 'Commercial Metric',
      description: 'Verified operational or financial outcome achieved.',
    },
  ],
  gallery: [
    {
      src: '/images/case-studies/raysons-1.jpg',
      caption: 'Initial deployment photo.',
      alt: 'Deployment',
    },
  ],
  seo: {
    metaTitle: 'Case Study | Ārohana',
    metaDescription: 'Verified commercial case study from Ārohana Consultancy.',
    ogImage: '/images/case-studies/raysons-hero.jpg',
  },
  tags: ['Brand Strategy', 'Execution'],
};

const BLANK_WORK_PROJECT: WorkDirectoryItem = {
  id: '',
  projectTitle: '',
  client: '',
  sector: 'Hospitality & F&B',
  shortDescription: '',
  thumbnail: '/images/work/misu-thumb.jpg',
  tags: ['Brand Strategy', 'Execution'],
  caseStudyLink: '',
};

const BLANK_TOURIN_PACKAGE: TourinPackageItem = {
  id: '',
  title: '',
  subtitle: 'Ladakh & High Himalayas',
  pacingStyle: 'Cultural / 07 Nights',
  overview: 'A bespoke Himalayan journey curated through deep local relationships and slow acclimatisation.',
  itinerary: [
    { dayOrPhase: 'Day 01-02', title: 'Arrival & Slow Acclimatisation', description: 'Rest and hydration in Leh.' },
    { dayOrPhase: 'Day 03-05', title: 'Monasteries & High Passes', description: 'Cultural exploration of Indus Valley.' },
  ],
  gallery: ['/images/tourin/tourin-1.jpg'],
  displayOrder: 1,
};

const BLANK_ARMY_PROJECT: ArmyProjectItem = {
  id: '',
  title: '',
  unitOrContext: 'HQ Northern Theatre',
  tags: ['Publication Design', 'Documentary Film'],
  narrative: 'High-security communication and publication documentation tailored to military standards and operational dignity.',
  gallery: [{ image: '/images/army/western-command-1.jpg', caption: 'Ceremonial documentation.' }],
  isTextOnly: false,
};

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export function AdminModal({ isOpen, onClose, initialTab = 'caseStudies' }: AdminModalProps) {
  const { user, isAuthenticated, login, logout } = useAdminAuth();
  const cms = useCmsStore();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Section Mode: 'list' (shows all items) or 'edit' (shows the edit/create form)
  const [caseStudyMode, setCaseStudyMode] = useState<'list' | 'edit'>('list');
  const [caseStudyDraft, setCaseStudyDraft] = useState<CaseStudyItem>(BLANK_CASE_STUDY);
  const [caseStudySearch, setCaseStudySearch] = useState('');

  const [workMode, setWorkMode] = useState<'list' | 'edit'>('list');
  const [workDraft, setWorkDraft] = useState<WorkDirectoryItem>(BLANK_WORK_PROJECT);
  const [workSearch, setWorkSearch] = useState('');
  const [workSectorFilter, setWorkSectorFilter] = useState('all');

  const [tourinMode, setTourinMode] = useState<'list' | 'edit'>('list');
  const [tourinDraft, setTourinDraft] = useState<TourinPackageItem>(BLANK_TOURIN_PACKAGE);

  const [armyMode, setArmyMode] = useState<'list' | 'edit'>('list');
  const [armyDraft, setArmyDraft] = useState<ArmyProjectItem>(BLANK_ARMY_PROJECT);

  // Client Logos Add state
  const [newLogoName, setNewLogoName] = useState('');
  const [newLogoFile, setNewLogoFile] = useState('');
  const [newLogoSector, setNewLogoSector] = useState<SectorType>('Hospitality & F&B');

  // Singletons Drafts
  const [homeDraft, setHomeDraft] = useState<HomePageSingleton>(cms.home);
  const [aboutDraft, setAboutDraft] = useState<AboutPageSingleton>(cms.about);
  const [servicesDraft, setServicesDraft] = useState<ServicesPageSingleton>(cms.services);
  const [seoDraft, setSeoDraft] = useState<SeoMetadataCollection>(cms.seo);

  // CRM Pipeline State
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);
  const [inquiryNotesDraft, setInquiryNotesDraft] = useState<Record<string, string>>({});
  const [crmSearch, setCrmSearch] = useState('');
  const [crmStatusFilter, setCrmStatusFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      setHomeDraft(JSON.parse(JSON.stringify(cms.home)));
      setAboutDraft(JSON.parse(JSON.stringify(cms.about)));
      setServicesDraft(JSON.parse(JSON.stringify(cms.services)));
      setSeoDraft(JSON.parse(JSON.stringify(cms.seo)));

      if (!expandedInquiryId && cms.inquiries.length > 0) {
        setExpandedInquiryId(cms.inquiries[0].id);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const result = login(loginEmail, loginPassword);
    if (!result.success) {
      setAuthError(result.error || 'Invalid credentials');
    } else {
      showToast('Authenticated as Administrator. CMS active.');
    }
  };

  const formatInquiryDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const copyInquiryDetails = (inq: CrmInquiry) => {
    const text = `Ārohana Client Inquiry\n----------------------\nName: ${inq.name}\nCompany: ${inq.company}\nEmail: ${inq.email}\nPhone: ${inq.phone}\nService: ${inq.service}\nStatus: ${inq.status}\nDate: ${formatInquiryDate(inq.createdAt)}\n\nMessage:\n${inq.message}\n\nNotes:\n${inq.notes || 'None'}`;
    navigator.clipboard.writeText(text);
    showToast(`Copied ${inq.name}'s inquiry details to clipboard.`);
  };

  const filteredInquiries = (cms.inquiries || []).filter((inq) => {
    const matchesStatus = crmStatusFilter === 'all' || inq.status === crmStatusFilter;
    const q = crmSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.phone.toLowerCase().includes(q) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.service && inq.service.toLowerCase().includes(q)) ||
      (inq.message && inq.message.toLowerCase().includes(q)) ||
      (inq.notes && inq.notes.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-[110] animate-bounce">
          <div className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-emerald-500 text-white font-mono text-xs shadow-2xl border border-white/20">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-none">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Studio Card */}
      <div className="w-full max-w-6xl h-full sm:h-auto max-h-[100dvh] sm:max-h-[96vh] rounded-none sm:rounded-3xl bg-stodio-card border-0 sm:border border-stodio-border shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="p-3 sm:p-4 md:p-5 border-b border-stodio-border flex items-center justify-between bg-stodio-surface/50 gap-2 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="flex-shrink-0 flex items-center justify-center py-1">
              <Image
                src="/images/arohana-logo.png"
                alt="Ārohana"
                width={100}
                height={20}
                priority
                className="h-4 sm:h-5 w-auto max-w-[85px] sm:max-w-[100px] object-contain"
              />
            </div>
            <div className="h-4 w-px bg-stodio-border hidden sm:inline-block" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-bold text-stodio-white tracking-tight truncate">
                  CMS Studio
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 sm:px-2 py-0.2 rounded-full hidden sm:inline whitespace-nowrap">
                  Real-Time CRUD
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stodio-muted font-mono truncate hidden xs:block">
                {isAuthenticated ? 'Secure Studio Session' : 'Administrator Authentication'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  showToast('Logged out of Admin Studio.');
                }}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-stodio-red/10 border border-stodio-red/30 text-[10px] sm:text-[11px] font-mono text-stodio-red hover:bg-stodio-red hover:text-white transition-colors cursor-pointer flex items-center gap-1 sm:gap-1.5"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden xs:inline">Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-stodio-surface border border-stodio-border text-stodio-muted hover:text-stodio-white hover:border-stodio-red transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. NOT AUTHENTICATED: LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-14 overflow-y-auto flex items-center justify-center flex-1">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-stodio-surface border border-stodio-border flex items-center justify-center mx-auto text-stodio-red shadow-glow">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stodio-white">Administrator Access</h3>
                <p className="text-xs text-stodio-muted">
                  Enter your administrative credentials to manage content and leads.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-2xl bg-stodio-red/10 border border-stodio-red/30 text-xs text-stodio-red flex items-center gap-2 font-mono">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stodio-muted mb-1">
                    Administrator ID
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter administrator email"
                      className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-4 py-3 text-xs sm:text-sm text-stodio-white placeholder:text-stodio-subtle focus:outline-none focus:border-stodio-red pl-10 font-medium"
                    />
                    <Mail className="w-4 h-4 text-stodio-subtle absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stodio-muted mb-1">
                    Security Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-4 py-3 text-xs sm:text-sm text-stodio-white placeholder:text-stodio-subtle focus:outline-none focus:border-stodio-red pl-10 font-medium"
                    />
                    <KeyRound className="w-4 h-4 text-stodio-subtle absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-stodio-red text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-stodio-redHover hover:rounded-2xl transition-all shadow-glow cursor-pointer"
                >
                  Authorize & Open Studio
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* 2. AUTHENTICATED: FULL TEMPLATE-DRIVEN CMS STUDIO */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar / Horizontal Mobile Tab Rail */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-stodio-border bg-stodio-surface/40 p-2 sm:p-3 flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar flex-shrink-0 gap-1 sm:gap-1.5">
              <div className="text-[10px] font-mono text-stodio-subtle uppercase tracking-wider px-2 md:px-3 py-1 hidden md:block">
                Dynamic Collections
              </div>

              {[
                { id: 'caseStudies', label: 'Case Studies', fullLabel: 'Case Studies (/work/[slug])', icon: FolderKanban, count: cms.caseStudies.length },
                { id: 'workDirectory', label: 'Work Grid', fullLabel: 'Work Directory Grid (/work)', icon: Grid, count: cms.workDirectory.length },
                { id: 'tourinPackages', label: 'Tourin', fullLabel: 'Tourin Itineraries (/tourin)', icon: Compass, count: cms.tourinPackages.length },
                { id: 'armyProjects', label: 'Army Projects', fullLabel: 'Army Projects (/army)', icon: Shield, count: cms.armyProjects.length },
                { id: 'clientLogos', label: 'Client Logos', fullLabel: 'Client Logos & Marquee', icon: ImageIcon, count: cms.clientLogos.length },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCaseStudyMode('list');
                      setWorkMode('list');
                      setTourinMode('list');
                      setArmyMode('list');
                    }}
                    className={`shrink-0 md:w-full px-3 py-2 rounded-xl sm:rounded-2xl text-xs font-medium flex items-center gap-2 whitespace-nowrap md:whitespace-normal justify-between transition-all cursor-pointer ${isActive
                      ? 'bg-stodio-red text-white shadow-glow'
                      : 'text-stodio-muted hover:text-stodio-white hover:bg-stodio-card bg-stodio-surface/70 md:bg-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate hidden md:inline">{tab.fullLabel}</span>
                      <span className="truncate md:hidden">{tab.label}</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono text-white">
                      {tab.count}
                    </span>
                  </button>
                );
              })}

              <div className="text-[10px] font-mono text-stodio-subtle uppercase tracking-wider px-2 md:px-3 pt-0 md:pt-3 pb-0 md:pb-1 hidden md:block">
                CRM & Pipeline
              </div>

              <button
                onClick={() => setActiveTab('crmPipeline')}
                className={`shrink-0 md:w-full px-3 py-2 rounded-xl sm:rounded-2xl text-xs font-medium flex items-center gap-2 whitespace-nowrap md:whitespace-normal justify-between transition-all cursor-pointer ${activeTab === 'crmPipeline'
                  ? 'bg-stodio-red text-white shadow-glow'
                  : 'text-stodio-muted hover:text-stodio-white hover:bg-stodio-card bg-stodio-surface/70 md:bg-transparent'
                  }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate hidden md:inline">Leads CRM Pipeline</span>
                  <span className="truncate md:hidden">CRM Leads</span>
                </div>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-mono font-bold">
                  {cms.inquiries.length}
                </span>
              </button>

              <div className="text-[10px] font-mono text-stodio-subtle uppercase tracking-wider px-2 md:px-3 pt-0 md:pt-3 pb-0 md:pb-1 hidden md:block">
                Page Singletons & Tools
              </div>

              {[
                { id: 'homeSingleton', label: 'Home Copy', fullLabel: 'Home Page Copy (/)', icon: Video },
                { id: 'aboutSingleton', label: 'About Story', fullLabel: 'About Page & Story (/about)', icon: FileText },
                { id: 'servicesSingleton', label: 'Services', fullLabel: 'Services & Pillars (/services)', icon: Layers },
                { id: 'seoSettings', label: 'SEO', fullLabel: 'Global SEO & Metadata', icon: Globe },
                { id: 'factoryReset', label: 'Reset', fullLabel: 'Reset & Diagnostics', icon: RotateCcw },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 md:w-full px-3 py-2 rounded-xl sm:rounded-2xl text-xs font-medium flex items-center gap-2 whitespace-nowrap md:whitespace-normal justify-between transition-all cursor-pointer ${isActive
                      ? 'bg-stodio-red text-white shadow-glow'
                      : 'text-stodio-muted hover:text-stodio-white hover:bg-stodio-card bg-stodio-surface/70 md:bg-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate hidden md:inline">{tab.fullLabel}</span>
                      <span className="truncate md:hidden">{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Workspace Content */}
            <div className="flex-1 p-3.5 sm:p-5 md:p-6 overflow-y-auto bg-stodio-bg">
              {/* ======================================================= */}
              {/* SECTION A: CASE STUDIES (LIST VIEW ↔ EDIT VIEW)         */}
              {/* ======================================================= */}
              {activeTab === 'caseStudies' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Mode 1: List View */}
                  {caseStudyMode === 'list' ? (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stodio-border pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-stodio-white">Case Studies Collection</h4>
                            <span className="px-2 py-0.5 rounded-full bg-stodio-surface border border-stodio-border text-[10px] font-mono text-stodio-red">
                              {cms.caseStudies.length} Total Case Studies
                            </span>
                          </div>
                          <p className="text-xs text-stodio-muted">
                            Manage full case studies shown on `/work/[slug]`. Click any card to edit.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setCaseStudyDraft(JSON.parse(JSON.stringify(BLANK_CASE_STUDY)));
                            setCaseStudyMode('edit');
                            showToast('Loaded new case study template.');
                          }}
                          className="px-4 py-2 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer self-start sm:self-auto"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Case Study</span>
                        </button>
                      </div>

                      {/* Search Bar */}
                      <div className="relative">
                        <input
                          type="text"
                          value={caseStudySearch}
                          onChange={(e) => setCaseStudySearch(e.target.value)}
                          placeholder="Search case studies by client name, sector, or slug..."
                          className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-4 py-2.5 text-xs text-stodio-white placeholder:text-stodio-subtle focus:outline-none focus:border-stodio-red pl-10 font-medium"
                        />
                        <Search className="w-4 h-4 text-stodio-subtle absolute left-3.5 top-3" />
                      </div>

                      {/* Case Studies List Cards */}
                      <div className="grid grid-cols-1 gap-3">
                        {cms.caseStudies
                          .filter((c) => {
                            const q = caseStudySearch.toLowerCase();
                            return (
                              !q ||
                              c.clientName.toLowerCase().includes(q) ||
                              c.slug.toLowerCase().includes(q) ||
                              (c.snapshot?.sector && c.snapshot.sector.toLowerCase().includes(q))
                            );
                          })
                          .map((study) => (
                            <div
                              key={study.slug}
                              className="p-4 sm:p-5 rounded-2xl bg-stodio-surface/50 border border-stodio-border hover:border-stodio-red/50 hover:bg-stodio-surface transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div className="space-y-1.5 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h5 className="text-sm sm:text-base font-bold text-stodio-white tracking-tight">
                                    {study.clientName}
                                  </h5>
                                  <span className="text-[10px] font-mono text-stodio-red bg-stodio-red/10 px-2 py-0.5 rounded-full border border-stodio-red/30">
                                    /work/{study.slug}
                                  </span>
                                  {study.snapshot?.sector && (
                                    <span className="text-[10px] font-mono text-stodio-muted bg-stodio-card px-2 py-0.5 rounded-full border border-stodio-border">
                                      {study.snapshot.sector}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-stodio-muted line-clamp-2 leading-relaxed">
                                  {study.heroBusinessStatement}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-stodio-subtle pt-1">
                                  <span>📍 {study.snapshot?.location || 'India'}</span>
                                  <span>·</span>
                                  <span>⏳ {study.snapshot?.duration || 'Active'}</span>
                                  <span>·</span>
                                  <span>📂 {study.theWork?.length || 0} Workstreams</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCaseStudyDraft(JSON.parse(JSON.stringify(study)));
                                    setCaseStudyMode('edit');
                                  }}
                                  className="px-4 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1.5 cursor-pointer font-medium"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-stodio-red" />
                                  <span>Edit Case Study</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Permanently delete case study "${study.clientName}"?`)) {
                                      cms.deleteCaseStudy(study.slug);
                                      showToast(`Deleted "${study.clientName}".`);
                                    }
                                  }}
                                  className="p-2 text-stodio-subtle hover:text-stodio-red hover:bg-stodio-red/10 rounded-full transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    /* Mode 2: Full Edit / Create Form */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                        <button
                          type="button"
                          onClick={() => setCaseStudyMode('list')}
                          className="flex items-center gap-1.5 text-xs font-mono text-stodio-muted hover:text-stodio-white cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to All Case Studies</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setCaseStudyMode('list')}
                            className="px-3 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-muted hover:text-stodio-white cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!caseStudyDraft.clientName.trim()) {
                                alert('Please provide a Client Name.');
                                return;
                              }
                              const finalSlug = (caseStudyDraft.slug || caseStudyDraft.clientName)
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/(^-|-$)/g, '');

                              const finalStudy = { ...caseStudyDraft, slug: finalSlug };
                              cms.saveCaseStudy(finalStudy);
                              setCaseStudyMode('list');
                              showToast(`Published "${finalStudy.clientName}" case study.`);
                            }}
                            className="px-4 py-1.5 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Publish Case Study</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">
                              Client Name <span className="text-stodio-red">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={caseStudyDraft.clientName}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, clientName: e.target.value })}
                              placeholder="e.g. Raysons Group"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium focus:outline-none focus:border-stodio-red"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">
                              URL Slug <span className="text-stodio-red">*</span> (e.g. `raysons-group`)
                            </label>
                            <input
                              type="text"
                              required
                              value={caseStudyDraft.slug}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, slug: e.target.value })}
                              placeholder="raysons-group"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white focus:outline-none focus:border-stodio-red font-mono font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Hero Headline / Business Statement</label>
                          <textarea
                            rows={2}
                            value={caseStudyDraft.heroBusinessStatement}
                            onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, heroBusinessStatement: e.target.value })}
                            placeholder="Core commercial transformation statement..."
                            className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-sm text-stodio-white font-bold focus:outline-none focus:border-stodio-red"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">
                              Hero Image URL (Local `/images/...` or Web URL `https://...`)
                            </label>
                            <input
                              type="text"
                              value={caseStudyDraft.heroMedia}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, heroMedia: e.target.value })}
                              placeholder="https://... or /images/case-studies/..."
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Sector Vertical</label>
                            <select
                              value={caseStudyDraft.snapshot?.sector || 'Hospitality & F&B'}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, snapshot: { ...caseStudyDraft.snapshot, sector: e.target.value } })}
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium cursor-pointer"
                            >
                              {SECTORS_LIST.map((s) => (
                                <option key={s} value={s} className="bg-stodio-card text-stodio-white">{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Location / Terrain</label>
                            <input
                              type="text"
                              value={caseStudyDraft.snapshot?.location || ''}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, snapshot: { ...caseStudyDraft.snapshot, location: e.target.value } })}
                              placeholder="Kolhapur, Maharashtra"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Engagement Model</label>
                            <input
                              type="text"
                              value={caseStudyDraft.snapshot?.engagementType || ''}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, snapshot: { ...caseStudyDraft.snapshot, engagementType: e.target.value } })}
                              placeholder="Brand Strategy & Retainer"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Duration</label>
                            <input
                              type="text"
                              value={caseStudyDraft.snapshot?.duration || ''}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, snapshot: { ...caseStudyDraft.snapshot, duration: e.target.value } })}
                              placeholder="Active Client Engagement"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                            />
                          </div>
                        </div>

                        {/* Situation, Challenge, Thinking */}
                        <div className="space-y-3 pt-2">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">01. The Situation (Paragraphs)</label>
                            <textarea
                              rows={3}
                              value={(caseStudyDraft.theSituation || []).join('\n\n')}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, theSituation: e.target.value.split('\n\n') })}
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-normal leading-relaxed"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">02. The Real Challenge (Paragraphs)</label>
                            <textarea
                              rows={3}
                              value={(caseStudyDraft.theRealChallenge || []).join('\n\n')}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, theRealChallenge: e.target.value.split('\n\n') })}
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-normal leading-relaxed"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">03. The Thinking (Paragraphs)</label>
                            <textarea
                              rows={3}
                              value={(caseStudyDraft.theThinking || []).join('\n\n')}
                              onChange={(e) => setCaseStudyDraft({ ...caseStudyDraft, theThinking: e.target.value.split('\n\n') })}
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-normal leading-relaxed"
                            />
                          </div>
                        </div>

                        {/* 04. The Workstreams */}
                        <div className="p-4 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase text-stodio-red font-bold flex items-center gap-1.5">
                              <ListPlus className="w-3.5 h-3.5" />
                              <span>04. Workstreams (Deliverables)</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const current = caseStudyDraft.theWork || [];
                                setCaseStudyDraft({
                                  ...caseStudyDraft,
                                  theWork: [...current, { workstreamTitle: 'New Workstream', workstreamDetails: 'Details...' }],
                                });
                              }}
                              className="px-2.5 py-1 rounded-full bg-stodio-surface border border-stodio-border text-[11px] font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1 cursor-pointer font-medium"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Workstream</span>
                            </button>
                          </div>

                          {(caseStudyDraft.theWork || []).map((w, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-stodio-surface border border-stodio-border space-y-2">
                              <div className="flex items-center justify-between">
                                <input
                                  type="text"
                                  value={w.workstreamTitle}
                                  onChange={(e) => {
                                    const copy = [...caseStudyDraft.theWork];
                                    copy[idx].workstreamTitle = e.target.value;
                                    setCaseStudyDraft({ ...caseStudyDraft, theWork: copy });
                                  }}
                                  placeholder="Workstream Title"
                                  className="font-bold text-xs text-stodio-white bg-transparent border-b border-stodio-border/60 pb-1 w-full max-w-sm"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const copy = caseStudyDraft.theWork.filter((_, i) => i !== idx);
                                    setCaseStudyDraft({ ...caseStudyDraft, theWork: copy });
                                  }}
                                  className="p-1 text-stodio-subtle hover:text-stodio-red"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <textarea
                                rows={2}
                                value={w.workstreamDetails}
                                onChange={(e) => {
                                  const copy = [...caseStudyDraft.theWork];
                                  copy[idx].workstreamDetails = e.target.value;
                                  setCaseStudyDraft({ ...caseStudyDraft, theWork: copy });
                                }}
                                className="w-full text-xs text-stodio-muted bg-transparent border border-stodio-border/40 rounded-lg p-2"
                              />
                            </div>
                          ))}
                        </div>

                        {/* 05. Verified Proof / Outcomes */}
                        <div className="p-4 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase text-stodio-red font-bold">05. Verified Proof & Outcomes</span>
                            <button
                              type="button"
                              onClick={() => {
                                const current = caseStudyDraft.proofOutcomes || [];
                                setCaseStudyDraft({
                                  ...caseStudyDraft,
                                  proofOutcomes: [...current, { metricOrChange: 'Metric Metric', description: 'Outcome...' }],
                                });
                              }}
                              className="px-2.5 py-1 rounded-full bg-stodio-surface border border-stodio-border text-[11px] font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1 cursor-pointer font-medium"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Outcome</span>
                            </button>
                          </div>

                          {(caseStudyDraft.proofOutcomes || []).map((o, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-stodio-surface border border-stodio-border flex items-center gap-3">
                              <input
                                type="text"
                                value={o.metricOrChange}
                                onChange={(e) => {
                                  const copy = [...caseStudyDraft.proofOutcomes];
                                  copy[idx].metricOrChange = e.target.value;
                                  setCaseStudyDraft({ ...caseStudyDraft, proofOutcomes: copy });
                                }}
                                placeholder="Metric / Value"
                                className="text-xs font-bold text-stodio-white bg-transparent border-b border-stodio-border/60 pb-1 w-1/3"
                              />
                              <input
                                type="text"
                                value={o.description}
                                onChange={(e) => {
                                  const copy = [...caseStudyDraft.proofOutcomes];
                                  copy[idx].description = e.target.value;
                                  setCaseStudyDraft({ ...caseStudyDraft, proofOutcomes: copy });
                                }}
                                placeholder="Description"
                                className="text-xs text-stodio-muted bg-transparent border-b border-stodio-border/60 pb-1 flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = caseStudyDraft.proofOutcomes.filter((_, i) => i !== idx);
                                  setCaseStudyDraft({ ...caseStudyDraft, proofOutcomes: copy });
                                }}
                                className="p-1 text-stodio-subtle hover:text-stodio-red"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================= */}
              {/* SECTION B: WORK DIRECTORY (LIST VIEW ↔ EDIT VIEW)       */}
              {/* ======================================================= */}
              {activeTab === 'workDirectory' && (
                <div className="space-y-6 animate-fadeIn">
                  {workMode === 'list' ? (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stodio-border pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-stodio-white">Work Directory Grid (`/work`)</h4>
                            <span className="px-2 py-0.5 rounded-full bg-stodio-surface border border-stodio-border text-[10px] font-mono text-stodio-red">
                              {cms.workDirectory.length} Projects
                            </span>
                          </div>
                          <p className="text-xs text-stodio-muted">
                            Manage portfolio cards displayed on `/work`.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setWorkDraft({ ...BLANK_WORK_PROJECT, id: `proj-${Date.now()}` });
                            setWorkMode('edit');
                            showToast('Loaded blank project template.');
                          }}
                          className="px-4 py-2 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer self-start sm:self-auto"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Project</span>
                        </button>
                      </div>

                      {/* Search & Sector Filters */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-7 relative">
                          <input
                            type="text"
                            value={workSearch}
                            onChange={(e) => setWorkSearch(e.target.value)}
                            placeholder="Search projects by title, client, or tags..."
                            className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-4 py-2.5 text-xs text-stodio-white placeholder:text-stodio-subtle focus:outline-none focus:border-stodio-red pl-10 font-medium"
                          />
                          <Search className="w-4 h-4 text-stodio-subtle absolute left-3.5 top-3" />
                        </div>

                        <div className="sm:col-span-5 flex items-center gap-1 overflow-x-auto pb-1">
                          <button
                            onClick={() => setWorkSectorFilter('all')}
                            className={`px-3 py-2 rounded-xl text-[11px] font-mono whitespace-nowrap cursor-pointer ${workSectorFilter === 'all'
                              ? 'bg-stodio-red text-white font-semibold'
                              : 'bg-stodio-surface text-stodio-muted hover:text-stodio-white border border-stodio-border'
                              }`}
                          >
                            All Sectors
                          </button>
                          {SECTORS_LIST.map((s) => (
                            <button
                              key={s}
                              onClick={() => setWorkSectorFilter(s)}
                              className={`px-3 py-2 rounded-xl text-[11px] font-mono whitespace-nowrap cursor-pointer ${workSectorFilter === s
                                ? 'bg-stodio-red text-white font-semibold'
                                : 'bg-stodio-surface text-stodio-muted hover:text-stodio-white border border-stodio-border'
                                }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Projects List Cards */}
                      <div className="grid grid-cols-1 gap-3">
                        {cms.workDirectory
                          .filter((w) => {
                            const matchesSector = workSectorFilter === 'all' || w.sector === workSectorFilter;
                            const q = workSearch.toLowerCase();
                            const matchesSearch =
                              !q ||
                              w.projectTitle.toLowerCase().includes(q) ||
                              w.shortDescription.toLowerCase().includes(q) ||
                              w.sector.toLowerCase().includes(q);
                            return matchesSector && matchesSearch;
                          })
                          .map((item) => (
                            <div
                              key={item.id}
                              className="p-4 sm:p-5 rounded-2xl bg-stodio-surface/50 border border-stodio-border hover:border-stodio-red/50 hover:bg-stodio-surface transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div className="space-y-1.5 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h5 className="text-sm sm:text-base font-bold text-stodio-white tracking-tight">
                                    {item.projectTitle}
                                  </h5>
                                  <span className="text-[10px] font-mono text-stodio-red bg-stodio-red/10 px-2 py-0.5 rounded-full border border-stodio-red/30">
                                    {item.sector}
                                  </span>
                                  {item.caseStudyLink && (
                                    <span className="text-[10px] font-mono text-stodio-muted bg-stodio-card px-2 py-0.5 rounded-full border border-stodio-border">
                                      🔗 {item.caseStudyLink}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-stodio-muted line-clamp-2 leading-relaxed">
                                  {item.shortDescription}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setWorkDraft(JSON.parse(JSON.stringify(item)));
                                    setWorkMode('edit');
                                  }}
                                  className="px-4 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1.5 cursor-pointer font-medium"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-stodio-red" />
                                  <span>Edit Project</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Permanently delete project "${item.projectTitle}"?`)) {
                                      cms.deleteWorkDirectoryItem(item.id);
                                      showToast(`Deleted "${item.projectTitle}".`);
                                    }
                                  }}
                                  className="p-2 text-stodio-subtle hover:text-stodio-red hover:bg-stodio-red/10 rounded-full transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    /* Edit Project Form */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                        <button
                          type="button"
                          onClick={() => setWorkMode('list')}
                          className="flex items-center gap-1.5 text-xs font-mono text-stodio-muted hover:text-stodio-white cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to All Work Projects</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setWorkMode('list')}
                            className="px-3 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-muted hover:text-stodio-white cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!workDraft.projectTitle.trim()) {
                                alert('Please provide a Project Title.');
                              }
                              const toSave = { ...workDraft, id: workDraft.id || `proj-${Date.now()}` };
                              cms.saveWorkDirectoryItem(toSave);
                              setWorkMode('list');
                              showToast(`Saved "${toSave.projectTitle}".`);
                            }}
                            className="px-4 py-1.5 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Publish Project</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">
                              Project Title <span className="text-stodio-red">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={workDraft.projectTitle}
                              onChange={(e) => setWorkDraft({ ...workDraft, projectTitle: e.target.value })}
                              placeholder="e.g. Misu Contemporary Dining"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">Sector Vertical</label>
                            <select
                              value={workDraft.sector}
                              onChange={(e) => setWorkDraft({ ...workDraft, sector: e.target.value as SectorType })}
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium cursor-pointer"
                            >
                              {SECTORS_LIST.map((s) => (
                                <option key={s} value={s} className="bg-stodio-card text-stodio-white">{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">Short Description (Max 3 lines)</label>
                          <textarea
                            rows={3}
                            value={workDraft.shortDescription}
                            onChange={(e) => setWorkDraft({ ...workDraft, shortDescription: e.target.value })}
                            placeholder="Comprehensive operational turnaround, menu engineering, and brand overhaul..."
                            className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-normal leading-relaxed"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">
                              Thumbnail URL (Local `/images/...` or Web URL `https://...`)
                            </label>
                            <input
                              type="text"
                              value={workDraft.thumbnail}
                              onChange={(e) => setWorkDraft({ ...workDraft, thumbnail: e.target.value })}
                              placeholder="https://... or /images/work/..."
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">
                              Case Study Detail Link (Optional e.g. `/work/misu`)
                            </label>
                            <input
                              type="text"
                              value={workDraft.caseStudyLink || ''}
                              onChange={(e) => setWorkDraft({ ...workDraft, caseStudyLink: e.target.value })}
                              placeholder="/work/misu"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================= */}
              {/* SECTION C: TOURIN ITINERARIES (LIST VIEW ↔ EDIT VIEW)   */}
              {/* ======================================================= */}
              {activeTab === 'tourinPackages' && (
                <div className="space-y-6 animate-fadeIn">
                  {tourinMode === 'list' ? (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stodio-border pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-stodio-white">Tourin Himalayan Journeys (`/tourin`)</h4>
                            <span className="px-2 py-0.5 rounded-full bg-stodio-surface border border-stodio-border text-[10px] font-mono text-stodio-red">
                              {cms.tourinPackages.length} Expeditions
                            </span>
                          </div>
                          <p className="text-xs text-stodio-muted">
                            Manage curated Ladakh travel itineraries and multi-day expedition routes.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setTourinDraft({ ...BLANK_TOURIN_PACKAGE, id: `pkg-${Date.now()}` });
                            setTourinMode('edit');
                            showToast('Loaded blank expedition template.');
                          }}
                          className="px-4 py-2 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer self-start sm:self-auto"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Package</span>
                        </button>
                      </div>

                      {/* List View */}
                      <div className="grid grid-cols-1 gap-3">
                        {cms.tourinPackages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="p-4 sm:p-5 rounded-2xl bg-stodio-surface/50 border border-stodio-border hover:border-stodio-red/50 hover:bg-stodio-surface transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h5 className="text-sm sm:text-base font-bold text-stodio-white tracking-tight">
                                  {pkg.title}
                                </h5>
                                <span className="text-[10px] font-mono text-stodio-red bg-stodio-red/10 px-2 py-0.5 rounded-full border border-stodio-red/30">
                                  {pkg.pacingStyle}
                                </span>
                                <span className="text-[10px] font-mono text-stodio-muted bg-stodio-card px-2 py-0.5 rounded-full border border-stodio-border">
                                  {pkg.itinerary?.length || 0} Phases
                                </span>
                              </div>
                              <p className="text-xs text-stodio-muted line-clamp-2 leading-relaxed">
                                {pkg.overview}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <button
                                type="button"
                                onClick={() => {
                                  setTourinDraft(JSON.parse(JSON.stringify(pkg)));
                                  setTourinMode('edit');
                                }}
                                className="px-4 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1.5 cursor-pointer font-medium"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-stodio-red" />
                                <span>Edit Itinerary</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Permanently delete expedition "${pkg.title}"?`)) {
                                    cms.deleteTourinPackage(pkg.id);
                                    showToast(`Deleted "${pkg.title}".`);
                                  }
                                }}
                                className="p-2 text-stodio-subtle hover:text-stodio-red hover:bg-stodio-red/10 rounded-full transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Edit Tourin Form */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                        <button
                          type="button"
                          onClick={() => setTourinMode('list')}
                          className="flex items-center gap-1.5 text-xs font-mono text-stodio-muted hover:text-stodio-white cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to All Expeditions</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setTourinMode('list')}
                            className="px-3 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-muted hover:text-stodio-white cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!tourinDraft.title.trim()) {
                                alert('Please provide a Package Title.');
                                return;
                              }
                              const toSave = { ...tourinDraft, id: tourinDraft.id || `pkg-${Date.now()}` };
                              cms.saveTourinPackage(toSave);
                              setTourinMode('list');
                              showToast(`Published "${toSave.title}".`);
                            }}
                            className="px-4 py-1.5 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Publish Package</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">
                              Package Title <span className="text-stodio-red">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={tourinDraft.title}
                              onChange={(e) => setTourinDraft({ ...tourinDraft, title: e.target.value })}
                              placeholder="e.g. In Search of Solitude — Changthang & High Lakes"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">
                              Pacing Style (e.g. `Cultural / 07 Nights`)
                            </label>
                            <input
                              type="text"
                              value={tourinDraft.pacingStyle}
                              onChange={(e) => setTourinDraft({ ...tourinDraft, pacingStyle: e.target.value })}
                              placeholder="High Himalayan / 09 Days"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">Overview Narrative</label>
                          <textarea
                            rows={3}
                            value={tourinDraft.overview}
                            onChange={(e) => setTourinDraft({ ...tourinDraft, overview: e.target.value })}
                            className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-normal leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">
                            Hero Image URL (Local `/images/...` or Web URL `https://...`)
                          </label>
                          <input
                            type="text"
                            value={tourinDraft.gallery?.[0] || ''}
                            onChange={(e) => setTourinDraft({ ...tourinDraft, gallery: [e.target.value] })}
                            placeholder="https://... or /images/tourin/..."
                            className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                          />
                        </div>

                        {/* Day-by-Day Itinerary Array */}
                        <div className="p-4 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase text-stodio-red font-bold">Itinerary Phases / Days</span>
                            <button
                              type="button"
                              onClick={() => {
                                const current = tourinDraft.itinerary || [];
                                setTourinDraft({
                                  ...tourinDraft,
                                  itinerary: [...current, { dayOrPhase: `Day 0${current.length + 1}`, title: 'Phase Title', description: 'Details...' }],
                                });
                              }}
                              className="px-2.5 py-1 rounded-full bg-stodio-surface border border-stodio-border text-[11px] font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1 cursor-pointer font-medium"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Phase</span>
                            </button>
                          </div>

                          {(tourinDraft.itinerary || []).map((step, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-stodio-surface border border-stodio-border space-y-2">
                              <div className="flex items-center justify-between gap-3">
                                <input
                                  type="text"
                                  value={step.dayOrPhase}
                                  onChange={(e) => {
                                    const copy = [...tourinDraft.itinerary];
                                    copy[idx].dayOrPhase = e.target.value;
                                    setTourinDraft({ ...tourinDraft, itinerary: copy });
                                  }}
                                  placeholder="Day 01"
                                  className="font-mono text-xs text-stodio-red font-bold bg-transparent border-b border-stodio-border/60 pb-1 w-24"
                                />
                                <input
                                  type="text"
                                  value={step.title}
                                  onChange={(e) => {
                                    const copy = [...tourinDraft.itinerary];
                                    copy[idx].title = e.target.value;
                                    setTourinDraft({ ...tourinDraft, itinerary: copy });
                                  }}
                                  placeholder="Title"
                                  className="font-bold text-xs text-stodio-white bg-transparent border-b border-stodio-border/60 pb-1 flex-1"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const copy = tourinDraft.itinerary.filter((_, i) => i !== idx);
                                    setTourinDraft({ ...tourinDraft, itinerary: copy });
                                  }}
                                  className="p-1 text-stodio-subtle hover:text-stodio-red"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <textarea
                                rows={2}
                                value={step.description}
                                onChange={(e) => {
                                  const copy = [...tourinDraft.itinerary];
                                  copy[idx].description = e.target.value;
                                  setTourinDraft({ ...tourinDraft, itinerary: copy });
                                }}
                                placeholder="Phase details..."
                                className="w-full text-xs text-stodio-muted bg-transparent border border-stodio-border/40 rounded-lg p-2"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================= */}
              {/* SECTION D: INDIAN ARMY PROJECTS (LIST VIEW ↔ EDIT VIEW) */}
              {/* ======================================================= */}
              {activeTab === 'armyProjects' && (
                <div className="space-y-6 animate-fadeIn">
                  {armyMode === 'list' ? (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stodio-border pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-stodio-white">Indian Army Projects Collection</h4>
                            <span className="px-2 py-0.5 rounded-full bg-stodio-surface border border-stodio-border text-[10px] font-mono text-stodio-red">
                              {cms.armyProjects.length} Engagements
                            </span>
                          </div>
                          <p className="text-xs text-stodio-muted">
                            Manage defence institutional initiatives shown on `/army`.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setArmyDraft({ ...BLANK_ARMY_PROJECT, id: `army-${Date.now()}` });
                            setArmyMode('edit');
                            showToast('Loaded blank defence brief template.');
                          }}
                          className="px-4 py-2 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer self-start sm:self-auto"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Project</span>
                        </button>
                      </div>

                      {/* List View */}
                      <div className="grid grid-cols-1 gap-3">
                        {cms.armyProjects.map((p) => (
                          <div
                            key={p.id}
                            className="p-4 sm:p-5 rounded-2xl bg-stodio-surface/50 border border-stodio-border hover:border-stodio-red/50 hover:bg-stodio-surface transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h5 className="text-sm sm:text-base font-bold text-stodio-white tracking-tight">
                                  {p.title}
                                </h5>
                                {p.unitOrContext && (
                                  <span className="text-[10px] font-mono text-stodio-muted bg-stodio-card px-2 py-0.5 rounded-full border border-stodio-border">
                                    {p.unitOrContext}
                                  </span>
                                )}
                                {p.isTextOnly && (
                                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                                    🔒 Confidential
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stodio-muted line-clamp-2 leading-relaxed">
                                {p.narrative}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <button
                                type="button"
                                onClick={() => {
                                  setArmyDraft(JSON.parse(JSON.stringify(p)));
                                  setArmyMode('edit');
                                }}
                                className="px-4 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1.5 cursor-pointer font-medium"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-stodio-red" />
                                <span>Edit Brief</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Permanently delete defence project "${p.title}"?`)) {
                                    cms.deleteArmyProject(p.id);
                                    showToast(`Deleted "${p.title}".`);
                                  }
                                }}
                                className="p-2 text-stodio-subtle hover:text-stodio-red hover:bg-stodio-red/10 rounded-full transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Edit Army Form */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                        <button
                          type="button"
                          onClick={() => setArmyMode('list')}
                          className="flex items-center gap-1.5 text-xs font-mono text-stodio-muted hover:text-stodio-white cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to All Defence Briefs</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setArmyMode('list')}
                            className="px-3 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-muted hover:text-stodio-white cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!armyDraft.title.trim()) {
                                alert('Please provide a Project Title.');
                                return;
                              }
                              const toSave = { ...armyDraft, id: armyDraft.id || `army-${Date.now()}` };
                              cms.saveArmyProject(toSave);
                              setArmyMode('list');
                              showToast(`Published "${toSave.title}".`);
                            }}
                            className="px-4 py-1.5 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Publish Project</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">
                              Project Title <span className="text-stodio-red">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={armyDraft.title}
                              onChange={(e) => setArmyDraft({ ...armyDraft, title: e.target.value })}
                              placeholder="e.g. Western Command Investiture Ceremony Films"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">
                              Formation / Unit Context
                            </label>
                            <input
                              type="text"
                              value={armyDraft.unitOrContext || ''}
                              onChange={(e) => setArmyDraft({ ...armyDraft, unitOrContext: e.target.value })}
                              placeholder="HQ Western Command"
                              className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-stodio-muted uppercase mb-1">Description / Narrative</label>
                          <textarea
                            rows={3}
                            value={armyDraft.narrative}
                            onChange={(e) => setArmyDraft({ ...armyDraft, narrative: e.target.value })}
                            className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-normal leading-relaxed"
                          />
                        </div>

                        {/* Confidentiality Toggle */}
                        <div className="p-4 rounded-2xl bg-stodio-surface/50 border border-stodio-border flex items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-stodio-white flex items-center gap-2">
                              <Shield className="w-4 h-4 text-amber-400" />
                              <span>Confidential Project (Text-Only Mode)</span>
                            </span>
                            <p className="text-xs text-stodio-muted">
                              Protects operational privacy by disabling media uploads on the public page.
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={armyDraft.isTextOnly}
                            onChange={(e) => setArmyDraft({ ...armyDraft, isTextOnly: e.target.checked })}
                            className="w-5 h-5 rounded border-stodio-border text-stodio-red cursor-pointer"
                          />
                        </div>

                        {/* Images (when not confidential) */}
                        {!armyDraft.isTextOnly && (
                          <div className="p-4 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono uppercase text-stodio-red font-bold">Image Assets</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const current = armyDraft.gallery || [];
                                  setArmyDraft({
                                    ...armyDraft,
                                    gallery: [...current, { image: '/images/army/western-command-1.jpg', caption: 'Ceremonial photo.' }],
                                  });
                                }}
                                className="px-2.5 py-1 rounded-full bg-stodio-surface border border-stodio-border text-[11px] font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1 cursor-pointer font-medium"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Photo</span>
                              </button>
                            </div>

                            {(armyDraft.gallery || []).map((img, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-stodio-surface border border-stodio-border flex items-center gap-3">
                                <input
                                  type="text"
                                  value={img.image}
                                  onChange={(e) => {
                                    const copy = [...armyDraft.gallery];
                                    copy[idx].image = e.target.value;
                                    setArmyDraft({ ...armyDraft, gallery: copy });
                                  }}
                                  placeholder="Image URL: https://... or /images/army/..."
                                  className="text-xs font-mono text-stodio-white font-medium bg-transparent border-b border-stodio-border/60 pb-1 flex-1"
                                />
                                <input
                                  type="text"
                                  value={img.caption}
                                  onChange={(e) => {
                                    const copy = [...armyDraft.gallery];
                                    copy[idx].caption = e.target.value;
                                    setArmyDraft({ ...armyDraft, gallery: copy });
                                  }}
                                  placeholder="Caption"
                                  className="text-xs text-stodio-muted bg-transparent border-b border-stodio-border/60 pb-1 w-1/3 font-medium"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const copy = armyDraft.gallery.filter((_, i) => i !== idx);
                                    setArmyDraft({ ...armyDraft, gallery: copy });
                                  }}
                                  className="p-1 text-stodio-subtle hover:text-stodio-red"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================= */}
              {/* SECTION E: CLIENT LOGOS & MARQUEE                       */}
              {/* ======================================================= */}
              {activeTab === 'clientLogos' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-stodio-white">Client Logos & Partners</h4>
                        <span className="px-2 py-0.5 rounded-full bg-stodio-surface border border-stodio-border text-[10px] font-mono text-stodio-red">
                          {cms.clientLogos.length} Partners
                        </span>
                      </div>
                      <p className="text-xs text-stodio-muted">
                        Add new logos and manage `✓ Approved` status for the homepage marquee.
                      </p>
                    </div>
                  </div>

                  {/* Add Logo Direct Bar */}
                  <div className="p-4 rounded-2xl bg-stodio-surface/60 border border-stodio-border space-y-3">
                    <span className="text-xs font-mono uppercase text-stodio-red font-bold">Add New Brand / Partner</span>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <input
                        type="text"
                        placeholder="Brand Name (e.g. Taj Hotels)"
                        value={newLogoName}
                        onChange={(e) => setNewLogoName(e.target.value)}
                        className="sm:col-span-4 rounded-xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                      />
                      <input
                        type="text"
                        placeholder="Logo URL: https://... or /images/..."
                        value={newLogoFile}
                        onChange={(e) => setNewLogoFile(e.target.value)}
                        className="sm:col-span-4 rounded-xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                      />
                      <select
                        value={newLogoSector}
                        onChange={(e) => setNewLogoSector(e.target.value as SectorType)}
                        className="sm:col-span-2 rounded-xl bg-stodio-surface border border-stodio-border px-2 py-2 text-xs text-stodio-white font-medium cursor-pointer"
                      >
                        {SECTORS_LIST.map((s) => (
                          <option key={s} value={s} className="bg-stodio-card text-stodio-white">{s}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newLogoName.trim()) {
                            alert('Please provide a brand name.');
                            return;
                          }
                          const newLogo: ClientLogoItem = {
                            id: `logo-${Date.now()}`,
                            brandName: newLogoName.trim(),
                            logoFile: newLogoFile.trim() || newLogoName.toLowerCase().replace(/\s+/g, '-'),
                            sector: newLogoSector,
                            isPublicApproved: true,
                          };
                          cms.saveClientLogo(newLogo);
                          setNewLogoName('');
                          setNewLogoFile('');
                          showToast(`Added "${newLogo.brandName}" to client list.`);
                        }}
                        className="sm:col-span-2 rounded-xl bg-stodio-red text-white text-xs font-mono font-medium hover:bg-stodio-redHover flex items-center justify-center gap-1 cursor-pointer shadow-glow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Logo</span>
                      </button>
                    </div>
                  </div>

                  {/* Interactive Logos Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cms.clientLogos.map((logo) => (
                      <div key={logo.id} className="p-3.5 rounded-2xl bg-stodio-surface/40 border border-stodio-border flex items-center justify-between gap-3 hover:bg-stodio-surface/70 transition-colors">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-stodio-white block">{logo.brandName}</span>
                          <span className="text-[10px] font-mono text-stodio-muted block truncate max-w-xs">{logo.logoFile} · {logo.sector || 'Partner'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              cms.toggleLogoApproval(logo.id);
                              showToast(`Toggled approval for ${logo.brandName}`);
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-mono cursor-pointer transition-all ${logo.isPublicApproved
                              ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                              : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                              }`}
                          >
                            {logo.isPublicApproved ? '✓ Approved' : 'Hidden'}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete logo for ${logo.brandName}?`)) {
                                cms.deleteClientLogo(logo.id);
                                showToast('Deleted logo.');
                              }
                            }}
                            className="p-1.5 text-stodio-subtle hover:text-stodio-red cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* SECTION F: PAGE-LEVEL SINGLETONS (HOME, ABOUT, SERVICES)*/}
              {/* ======================================================= */}
              {activeTab === 'homeSingleton' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    cms.updateHomePage(homeDraft);
                    showToast('Home page singleton saved & published!');
                  }}
                  className="space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                    <div>
                      <h4 className="text-base font-bold text-stodio-white">Home Page Singleton Copy (/)</h4>
                      <p className="text-xs text-stodio-muted">Hero video/image URLs, Point of View narrative, and contact details.</p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Home Page</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Hero Tagline</label>
                      <input
                        type="text"
                        value={homeDraft.heroTagline || ''}
                        onChange={(e) => setHomeDraft({ ...homeDraft, heroTagline: e.target.value })}
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">
                        Hero Video URL (Local `/videos/...` or Web `https://...`)
                      </label>
                      <input
                        type="text"
                        value={homeDraft.heroVideoUrl || ''}
                        onChange={(e) => setHomeDraft({ ...homeDraft, heroVideoUrl: e.target.value })}
                        placeholder="https://.../video.mp4 or /videos/..."
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Main H1 Headline</label>
                      <textarea
                        rows={2}
                        value={homeDraft.heroHeadline || ''}
                        onChange={(e) => setHomeDraft({ ...homeDraft, heroHeadline: e.target.value })}
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-sm text-stodio-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">
                        Mobile Fallback Poster URL (Local `/images/...` or Web `https://...`)
                      </label>
                      <input
                        type="text"
                        value={homeDraft.heroFallbackImage || ''}
                        onChange={(e) => setHomeDraft({ ...homeDraft, heroFallbackImage: e.target.value })}
                        placeholder="https://... or /images/..."
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Hero Description</label>
                    <textarea
                      rows={2}
                      value={homeDraft.heroDescription || ''}
                      onChange={(e) => setHomeDraft({ ...homeDraft, heroDescription: e.target.value })}
                      className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-normal leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Point of View Headline</label>
                    <textarea
                      rows={2}
                      value={homeDraft.povSection?.headline || ''}
                      onChange={(e) =>
                        setHomeDraft({
                          ...homeDraft,
                          povSection: { ...homeDraft.povSection, headline: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-sm text-stodio-white font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={homeDraft.contactDetails?.email || ''}
                        onChange={(e) =>
                          setHomeDraft({
                            ...homeDraft,
                            contactDetails: { ...homeDraft.contactDetails, email: e.target.value },
                          })
                        }
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={homeDraft.contactDetails?.displayPhone || ''}
                        onChange={(e) =>
                          setHomeDraft({
                            ...homeDraft,
                            contactDetails: { ...homeDraft.contactDetails, displayPhone: e.target.value },
                          })
                        }
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* ABOUT SINGLETON */}
              {activeTab === 'aboutSingleton' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    cms.updateAboutPage(aboutDraft);
                    showToast('About page copy published!');
                  }}
                  className="space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                    <div>
                      <h4 className="text-base font-bold text-stodio-white">About Page Singleton (/about)</h4>
                      <p className="text-xs text-stodio-muted">Founder quotes, 4-part narrative story, and portraits.</p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save About Page</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Main Hero Quote</label>
                    <textarea
                      rows={3}
                      value={aboutDraft.heroQuote || ''}
                      onChange={(e) => setAboutDraft({ ...aboutDraft, heroQuote: e.target.value })}
                      className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-sm text-stodio-white font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-stodio-white block">Founder Story Sections</span>
                    {(aboutDraft.founderStory || []).map((sec, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-1.5">
                        <span className="text-xs font-bold text-stodio-red font-mono">{sec.title}</span>
                        <textarea
                          rows={3}
                          value={sec.content || ''}
                          onChange={(e) => {
                            const copy = [...aboutDraft.founderStory];
                            copy[idx].content = e.target.value;
                            setAboutDraft({ ...aboutDraft, founderStory: copy });
                          }}
                          className="w-full rounded-xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-normal leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>
                </form>
              )}

              {/* SERVICES SINGLETON */}
              {activeTab === 'servicesSingleton' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    cms.updateServicesPage(servicesDraft);
                    showToast('Services capabilities published!');
                  }}
                  className="space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                    <div>
                      <h4 className="text-base font-bold text-stodio-white">Services Page Singleton (/services)</h4>
                      <p className="text-xs text-stodio-muted">Capability lists & engagement models.</p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-full bg-stodio-red text-white text-xs font-mono font-semibold hover:bg-stodio-redHover flex items-center gap-1.5 shadow-glow cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Services</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Digital Brand Growth Items (One per line)</label>
                      <textarea
                        rows={4}
                        value={(servicesDraft.digitalBrandGrowthItems || []).join('\n')}
                        onChange={(e) => setServicesDraft({ ...servicesDraft, digitalBrandGrowthItems: e.target.value.split('\n') })}
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stodio-muted mb-1">Hospitality Consulting Items (One per line)</label>
                      <textarea
                        rows={4}
                        value={(servicesDraft.hospitalityConsultingItems || []).join('\n')}
                        onChange={(e) => setServicesDraft({ ...servicesDraft, hospitalityConsultingItems: e.target.value.split('\n') })}
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white font-mono font-medium"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* SEO SETTINGS */}
              {activeTab === 'seoSettings' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-stodio-border pb-3">
                    <div>
                      <h4 className="text-base font-bold text-stodio-white">Global SEO & Metadata</h4>
                      <p className="text-xs text-stodio-muted">Configure Meta Title, Meta Description, and OG Image per route.</p>
                    </div>
                  </div>

                  {Object.entries(seoDraft || {}).map(([pageKey, seoData]) => (
                    <div key={pageKey} className="p-4 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-mono text-stodio-red uppercase">/{pageKey}</span>
                        <button
                          onClick={() => {
                            cms.updateSeo(pageKey as any, seoData);
                            showToast(`Updated SEO for /${pageKey}`);
                          }}
                          className="text-[11px] font-mono text-stodio-white hover:text-stodio-red cursor-pointer font-medium"
                        >
                          Save /{pageKey}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={seoData?.metaTitle || ''}
                        onChange={(e) => setSeoDraft({ ...seoDraft, [pageKey]: { ...seoData, metaTitle: e.target.value } })}
                        placeholder="Meta Title"
                        className="w-full rounded-xl bg-stodio-surface border border-stodio-border px-3 py-1.5 text-xs text-stodio-white font-medium"
                      />
                      <textarea
                        rows={2}
                        value={seoData?.metaDescription || ''}
                        onChange={(e) => setSeoDraft({ ...seoDraft, [pageKey]: { ...seoData, metaDescription: e.target.value } })}
                        placeholder="Meta Description"
                        className="w-full rounded-xl bg-stodio-surface border border-stodio-border px-3 py-1.5 text-xs text-stodio-muted font-normal"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ======================================================= */}
              {/* SECTION G: LEADS CRM PIPELINE                           */}
              {/* ======================================================= */}
              {activeTab === 'crmPipeline' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Top CRM Toolbar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stodio-border pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-stodio-white">Client Inquiry & CRM Pipeline</h4>
                        <span className="px-2 py-0.5 rounded-full bg-stodio-surface border border-stodio-border text-[10px] font-mono text-stodio-red font-semibold">
                          {cms.inquiries.length} Total Submissions
                        </span>
                      </div>
                      <p className="text-xs text-stodio-muted">
                        Review full project scopes, client details, update lead progression, and manage follow-ups.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const csv = cms.exportCsv();
                          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `arohana_leads_${Date.now()}.csv`;
                          a.click();
                          showToast('CSV export downloaded successfully.');
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-stodio-surface border border-stodio-border text-xs font-mono text-stodio-white hover:border-stodio-red flex items-center gap-1.5 cursor-pointer shadow-sm font-medium"
                      >
                        <Download className="w-3.5 h-3.5 text-stodio-red" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3">
                    <div className="sm:col-span-6 md:col-span-7 relative">
                      <input
                        type="text"
                        value={crmSearch}
                        onChange={(e) => setCrmSearch(e.target.value)}
                        placeholder="Search by client name, company, email, phone, message content..."
                        className="w-full rounded-2xl bg-stodio-surface border border-stodio-border px-4 py-2.5 text-xs text-stodio-white placeholder:text-stodio-subtle focus:outline-none focus:border-stodio-red pl-10 font-medium"
                      />
                      <Search className="w-4 h-4 text-stodio-subtle absolute left-3.5 top-3" />
                    </div>

                    <div className="sm:col-span-6 md:col-span-5 flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                      {['all', 'new', 'contacted', 'proposal_sent', 'closed', 'archived'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setCrmStatusFilter(st)}
                          className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-[11px] font-mono whitespace-nowrap shrink-0 transition-all cursor-pointer ${crmStatusFilter === st
                            ? 'bg-stodio-red text-white font-semibold'
                            : 'bg-stodio-surface text-stodio-muted hover:text-stodio-white border border-stodio-border'
                            }`}
                        >
                          {st === 'all' ? 'All' : STATUS_CONFIG[st as InquiryStatus]?.label || st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inquiries List & Full Detail Inspector */}
                  {filteredInquiries.length === 0 ? (
                    <div className="p-8 sm:p-12 text-left rounded-3xl bg-stodio-surface/30 border border-stodio-border space-y-3">
                      <Briefcase className="w-8 h-8 text-stodio-subtle" />
                      <p className="text-sm text-stodio-muted text-left">No client inquiries found matching your filters.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {filteredInquiries.map((inq) => {
                        const isExpanded = expandedInquiryId === inq.id;
                        const cfg = STATUS_CONFIG[inq.status] || STATUS_CONFIG.new;

                        return (
                          <div
                            key={inq.id}
                            className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${isExpanded
                              ? 'bg-stodio-card border-stodio-red shadow-2xl'
                              : 'bg-stodio-card/60 border-stodio-border hover:border-stodio-border/90 hover:bg-stodio-card'
                              }`}
                          >
                            {/* Summary Header Row */}
                            <div
                              onClick={() => setExpandedInquiryId(isExpanded ? null : inq.id)}
                              className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer select-none"
                            >
                              <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 min-w-0">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-stodio-surface border border-stodio-border flex items-center justify-center text-stodio-red flex-shrink-0 mt-0.5 sm:mt-0">
                                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <div className="space-y-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                    <h5 className="text-sm sm:text-base font-bold text-stodio-white tracking-tight break-words">
                                      {inq.name}
                                    </h5>
                                    {inq.company && (
                                      <span className="text-xs font-medium text-stodio-muted truncate max-w-[160px] sm:max-w-none">
                                        · {inq.company}
                                      </span>
                                    )}
                                    <span className={`text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border} font-semibold shrink-0`}>
                                      {cfg.label}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-stodio-muted font-mono">
                                    <span className="truncate max-w-[180px] sm:max-w-none">{inq.email}</span>
                                    <span className="hidden xs:inline">·</span>
                                    <span>{inq.phone}</span>
                                    <span className="hidden sm:inline">·</span>
                                    <span className="text-stodio-subtle flex items-center gap-1">
                                      <Clock className="w-3 h-3 flex-shrink-0" />
                                      {formatInquiryDate(inq.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right Controls */}
                              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stodio-border/40">
                                <span className="text-[10px] sm:text-[11px] font-mono text-stodio-red font-medium">
                                  {isExpanded ? 'Hide Brief' : 'View Brief'}
                                </span>
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-stodio-border flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-stodio-red text-white' : 'text-stodio-muted'}`}>
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            </div>

                            {/* EXPANDED FULL INQUIRY DETAILS VIEW */}
                            {isExpanded && (
                              <div className="p-4 sm:p-6 md:p-8 border-t border-stodio-border/80 bg-stodio-surface/20 space-y-5 sm:space-y-6 animate-fadeIn">
                                <div className="space-y-2">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stodio-red font-bold">
                                      <MessageSquare className="w-4 h-4 text-stodio-red flex-shrink-0" />
                                      <span>Project Inquiry Brief</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        copyInquiryDetails(inq);
                                      }}
                                      className="px-2.5 py-1 rounded-full bg-stodio-surface border border-stodio-border text-[10px] sm:text-[11px] font-mono text-stodio-muted hover:text-stodio-white flex items-center gap-1.5 cursor-pointer font-medium"
                                    >
                                      <Copy className="w-3 h-3" />
                                      <span>Copy Lead Details</span>
                                    </button>
                                  </div>

                                  <div className="p-4 sm:p-5 rounded-2xl bg-stodio-surface/80 border border-stodio-border text-xs sm:text-sm md:text-base text-stodio-white leading-relaxed font-normal shadow-inner whitespace-pre-wrap break-words">
                                    {inq.message || 'No project description was provided.'}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-stodio-surface/50 border border-stodio-border">
                                  <div className="space-y-0.5 sm:space-y-1">
                                    <span className="text-[10px] font-mono uppercase text-stodio-subtle tracking-wider block">Contact Person</span>
                                    <p className="text-xs sm:text-sm font-semibold text-stodio-white break-words">{inq.name}</p>
                                  </div>

                                  <div className="space-y-0.5 sm:space-y-1">
                                    <span className="text-[10px] font-mono uppercase text-stodio-subtle tracking-wider block">Company / Venture</span>
                                    <p className="text-xs sm:text-sm font-semibold text-stodio-white break-words">{inq.company || 'Direct Inquiry'}</p>
                                  </div>

                                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                                    <span className="text-[10px] font-mono uppercase text-stodio-subtle tracking-wider block">Direct Email</span>
                                    <a
                                      href={`mailto:${inq.email}?subject=Re: Ārohana Consultation Brief — ${inq.company || inq.name}`}
                                      className="text-xs font-mono text-stodio-red hover:underline block break-all"
                                    >
                                      {inq.email}
                                    </a>
                                  </div>

                                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                                    <span className="text-[10px] font-mono uppercase text-stodio-subtle tracking-wider block">Phone Number</span>
                                    <a
                                      href={`tel:${inq.phone}`}
                                      className="text-xs font-mono text-stodio-red hover:underline block break-all"
                                    >
                                      {inq.phone}
                                    </a>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="p-4 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-2">
                                    <span className="text-[10px] font-mono uppercase text-stodio-subtle tracking-wider block">
                                      Primary Capability / Service Requested
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-stodio-red" />
                                      <span className="text-sm font-semibold text-stodio-white">
                                        {inq.service || 'Digital Brand Growth & Strategy'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="p-4 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-2">
                                    <span className="text-[10px] font-mono uppercase text-stodio-subtle tracking-wider block">
                                      Update Lead Status in Pipeline
                                    </span>
                                    <select
                                      value={inq.status}
                                      onChange={(e) => {
                                        const newStatus = e.target.value as InquiryStatus;
                                        cms.updateInquiry(inq.id, { status: newStatus });
                                        showToast(`Updated ${inq.name}'s status to ${newStatus}`);
                                      }}
                                      className={`w-full text-xs font-mono uppercase px-3 py-2 rounded-xl border ${cfg.bg} ${cfg.text} ${cfg.border} cursor-pointer focus:outline-none`}
                                    >
                                      <option value="new" className="bg-stodio-card text-emerald-400">● 01. New Lead (Needs Review)</option>
                                      <option value="contacted" className="bg-stodio-card text-amber-400">● 02. Contacted / In Discussion</option>
                                      <option value="proposal_sent" className="bg-stodio-card text-sky-400">● 03. Proposal / Scope Sent</option>
                                      <option value="closed" className="bg-stodio-card text-purple-400">● 04. Closed / Partnered</option>
                                      <option value="archived" className="bg-stodio-card text-zinc-400">● 05. Archived</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-stodio-surface/40 border border-stodio-border space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-stodio-muted font-bold">
                                      <FileText className="w-3.5 h-3.5 text-stodio-red" />
                                      <span>Internal Founder / Team Notes</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const note = inquiryNotesDraft[inq.id] ?? inq.notes ?? '';
                                        cms.updateInquiry(inq.id, { notes: note });
                                        showToast('Saved internal note.');
                                      }}
                                      className="px-3 py-1 rounded-full bg-stodio-red text-white text-xs font-mono hover:bg-stodio-redHover flex items-center gap-1 cursor-pointer shadow-sm"
                                    >
                                      <Save className="w-3 h-3" />
                                      <span>Save Notes</span>
                                    </button>
                                  </div>

                                  <textarea
                                    rows={2}
                                    value={inquiryNotesDraft[inq.id] ?? (inq.notes || '')}
                                    onChange={(e) =>
                                      setInquiryNotesDraft({
                                        ...inquiryNotesDraft,
                                        [inq.id]: e.target.value,
                                      })
                                    }
                                    placeholder="Add private notes on client background, agreed deliverables, or follow-up schedule..."
                                    className="w-full rounded-xl bg-stodio-surface border border-stodio-border px-3 py-2 text-xs text-stodio-white placeholder:text-stodio-subtle focus:outline-none focus:border-stodio-red resize-y font-normal"
                                  />
                                </div>

                                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stodio-border/60">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <a
                                      href={`mailto:${inq.email}?subject=Ārohana Consultation Brief — ${inq.company || inq.name}`}
                                      className="px-4 py-2 rounded-full bg-stodio-red text-white text-xs font-mono font-medium hover:bg-stodio-redHover flex items-center gap-1.5 cursor-pointer shadow-glow"
                                    >
                                      <Mail className="w-3.5 h-3.5" />
                                      <span>Email {inq.name.split(' ')[0]}</span>
                                    </a>

                                    <a
                                      href={`tel:${inq.phone}`}
                                      className="px-4 py-2 rounded-full bg-stodio-surface border border-stodio-border text-stodio-white text-xs font-mono font-medium hover:border-stodio-red flex items-center gap-1.5 cursor-pointer"
                                    >
                                      <Phone className="w-3.5 h-3.5 text-stodio-red" />
                                      <span>Call {inq.phone}</span>
                                    </a>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`Delete inquiry from ${inq.name}?`)) {
                                        cms.deleteInquiry(inq.id);
                                        showToast('Inquiry removed from CRM.');
                                      }
                                    }}
                                    className="px-3 py-1.5 rounded-full text-xs font-mono text-stodio-subtle hover:text-stodio-red hover:bg-stodio-red/10 transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete Inquiry</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* FACTORY RESET */}
              {activeTab === 'factoryReset' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="border-b border-stodio-border pb-3">
                    <h4 className="text-base font-bold text-stodio-white">Factory Reset & Data Health</h4>
                    <p className="text-xs text-stodio-muted">Restore default case studies, packages, and copy.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-stodio-surface border border-stodio-border space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-stodio-white">
                      <RotateCcw className="w-4 h-4 text-stodio-red" />
                      <span>Restore Clean Factory Seed State</span>
                    </div>
                    <p className="text-xs text-stodio-muted leading-relaxed">
                      Resets all dynamic collections (Case Studies, Work Directory, Tourin, Army Projects, Logos) and singletons back to default factory mock values.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Reset entire CMS back to original factory defaults?')) {
                          cms.resetToDefaults();
                          showToast('CMS restored to factory state.');
                        }
                      }}
                      className="px-5 py-2.5 rounded-full bg-stodio-red/10 border border-stodio-red/30 text-xs font-mono uppercase text-stodio-red hover:bg-stodio-red hover:text-white transition-all cursor-pointer font-semibold"
                    >
                      Reset Everything to Default
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
