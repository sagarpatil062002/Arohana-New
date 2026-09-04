'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import {
  CaseStudyItem,
  WorkDirectoryItem,
  TourinPackageItem,
  ArmyProjectItem,
  ClientLogoItem,
  HomePageSingleton,
  AboutPageSingleton,
  ServicesPageSingleton,
  SeoMetadataCollection,
  FullCmsState,
  CrmInquiry,
  InquiryStatus,
} from '@/types/cms';
import {
  SEED_CASE_STUDIES,
  SEED_WORK_DIRECTORY,
  SEED_TOURIN_PACKAGES,
  SEED_ARMY_PROJECTS,
  SEED_CLIENT_LOGOS,
  SEED_HOME_PAGE,
  SEED_ABOUT_PAGE,
  SEED_SERVICES_PAGE,
  SEED_SEO_METADATA,
  SEED_INQUIRIES,
} from '@/data/seed-cms';

const CMS_STORAGE_KEY = 'arohana_cms_master_v5';
const CMS_CHANGE_EVENT = 'arohana:cms_change';

const SERVER_SNAPSHOT: FullCmsState = {
  caseStudies: SEED_CASE_STUDIES,
  workDirectory: SEED_WORK_DIRECTORY,
  tourinPackages: SEED_TOURIN_PACKAGES,
  armyProjects: SEED_ARMY_PROJECTS,
  clientLogos: SEED_CLIENT_LOGOS,
  home: SEED_HOME_PAGE,
  about: SEED_ABOUT_PAGE,
  services: SEED_SERVICES_PAGE,
  seo: SEED_SEO_METADATA,
  inquiries: SEED_INQUIRIES,
  lastUpdated: '',
};

function deepMergeHome(stored?: Partial<HomePageSingleton>): HomePageSingleton {
  return {
    ...SEED_HOME_PAGE,
    ...(stored || {}),
    povSection: {
      ...SEED_HOME_PAGE.povSection,
      ...(stored?.povSection || {}),
    },
    contactDetails: {
      ...SEED_HOME_PAGE.contactDetails,
      ...(stored?.contactDetails || {}),
    },
    featuredCaseStudySlugs:
      Array.isArray(stored?.featuredCaseStudySlugs) && stored!.featuredCaseStudySlugs.length > 0
        ? stored!.featuredCaseStudySlugs
        : SEED_HOME_PAGE.featuredCaseStudySlugs,
    armyTeaserImages:
      Array.isArray(stored?.armyTeaserImages) && stored!.armyTeaserImages.length > 0
        ? stored!.armyTeaserImages
        : SEED_HOME_PAGE.armyTeaserImages,
    tourinTeaserImages:
      Array.isArray(stored?.tourinTeaserImages) && stored!.tourinTeaserImages.length > 0
        ? stored!.tourinTeaserImages
        : SEED_HOME_PAGE.tourinTeaserImages,
  };
}

function deepMergeAbout(stored?: Partial<AboutPageSingleton>): AboutPageSingleton {
  return {
    ...SEED_ABOUT_PAGE,
    ...(stored || {}),
    founderStory:
      Array.isArray(stored?.founderStory) && stored!.founderStory.length > 0
        ? stored!.founderStory
        : SEED_ABOUT_PAGE.founderStory,
    founderPortraits:
      Array.isArray(stored?.founderPortraits) && stored!.founderPortraits.length > 0
        ? stored!.founderPortraits
        : SEED_ABOUT_PAGE.founderPortraits,
    pullQuotes:
      Array.isArray(stored?.pullQuotes) && stored!.pullQuotes.length > 0
        ? stored!.pullQuotes
        : SEED_ABOUT_PAGE.pullQuotes,
  };
}

function deepMergeServices(stored?: Partial<ServicesPageSingleton>): ServicesPageSingleton {
  return {
    ...SEED_SERVICES_PAGE,
    ...(stored || {}),
    digitalBrandGrowthItems:
      Array.isArray(stored?.digitalBrandGrowthItems) && stored!.digitalBrandGrowthItems.length > 0
        ? stored!.digitalBrandGrowthItems
        : SEED_SERVICES_PAGE.digitalBrandGrowthItems,
    hospitalityConsultingItems:
      Array.isArray(stored?.hospitalityConsultingItems) && stored!.hospitalityConsultingItems.length > 0
        ? stored!.hospitalityConsultingItems
        : SEED_SERVICES_PAGE.hospitalityConsultingItems,
    contentProductionItems:
      Array.isArray(stored?.contentProductionItems) && stored!.contentProductionItems.length > 0
        ? stored!.contentProductionItems
        : SEED_SERVICES_PAGE.contentProductionItems,
    engagementModels:
      Array.isArray(stored?.engagementModels) && stored!.engagementModels.length > 0
        ? stored!.engagementModels
        : SEED_SERVICES_PAGE.engagementModels,
  };
}

function deepMergeSeo(stored?: Partial<SeoMetadataCollection>): SeoMetadataCollection {
  return {
    ...SEED_SEO_METADATA,
    ...(stored || {}),
  };
}

class CmsRepository {
  private state: FullCmsState;
  private isInitialized = false;
  private listeners = new Set<() => void>();

  constructor() {
    this.state = {
      caseStudies: [...SEED_CASE_STUDIES],
      workDirectory: [...SEED_WORK_DIRECTORY],
      tourinPackages: [...SEED_TOURIN_PACKAGES],
      armyProjects: [...SEED_ARMY_PROJECTS],
      clientLogos: [...SEED_CLIENT_LOGOS],
      home: deepMergeHome(),
      about: deepMergeAbout(),
      services: deepMergeServices(),
      seo: deepMergeSeo(),
      inquiries: [...SEED_INQUIRIES],
      lastUpdated: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.hydrateFromStorage();

    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === CMS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as Partial<FullCmsState>;
          if (parsed) {
            this.state = {
              caseStudies: Array.isArray(parsed.caseStudies) && parsed.caseStudies.length > 0 ? parsed.caseStudies : [...SEED_CASE_STUDIES],
              workDirectory: Array.isArray(parsed.workDirectory) && parsed.workDirectory.length > 0 ? parsed.workDirectory : [...SEED_WORK_DIRECTORY],
              tourinPackages: Array.isArray(parsed.tourinPackages) && parsed.tourinPackages.length > 0 ? parsed.tourinPackages : [...SEED_TOURIN_PACKAGES],
              armyProjects: Array.isArray(parsed.armyProjects) && parsed.armyProjects.length > 0 ? parsed.armyProjects : [...SEED_ARMY_PROJECTS],
              clientLogos: Array.isArray(parsed.clientLogos) && parsed.clientLogos.length > 0 ? parsed.clientLogos : [...SEED_CLIENT_LOGOS],
              home: deepMergeHome(parsed.home),
              about: deepMergeAbout(parsed.about),
              services: deepMergeServices(parsed.services),
              seo: deepMergeSeo(parsed.seo),
              inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [...SEED_INQUIRIES],
              lastUpdated: parsed.lastUpdated || new Date().toISOString(),
            };
            this.notify();
          }
        } catch (err) {
          console.error('[CmsStore] Storage sync error:', err);
        }
      }
    });

    window.addEventListener(CMS_CHANGE_EVENT, () => {
      this.notify();
    });
  }

  private hydrateFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<FullCmsState>;
        if (parsed) {
          this.state = {
            caseStudies: Array.isArray(parsed.caseStudies) && parsed.caseStudies.length > 0 ? parsed.caseStudies : [...SEED_CASE_STUDIES],
            workDirectory: Array.isArray(parsed.workDirectory) && parsed.workDirectory.length > 0 ? parsed.workDirectory : [...SEED_WORK_DIRECTORY],
            tourinPackages: Array.isArray(parsed.tourinPackages) && parsed.tourinPackages.length > 0 ? parsed.tourinPackages : [...SEED_TOURIN_PACKAGES],
            armyProjects: Array.isArray(parsed.armyProjects) && parsed.armyProjects.length > 0 ? parsed.armyProjects : [...SEED_ARMY_PROJECTS],
            clientLogos: Array.isArray(parsed.clientLogos) && parsed.clientLogos.length > 0 ? parsed.clientLogos : [...SEED_CLIENT_LOGOS],
            home: deepMergeHome(parsed.home),
            about: deepMergeAbout(parsed.about),
            services: deepMergeServices(parsed.services),
            seo: deepMergeSeo(parsed.seo),
            inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [...SEED_INQUIRIES],
            lastUpdated: parsed.lastUpdated || new Date().toISOString(),
          };
          return;
        }
      }
      this.persist();
    } catch (err) {
      console.warn('[CmsStore] LocalStorage error:', err);
    }
  }

  private persist(): void {
    if (typeof window === 'undefined') return;
    try {
      this.state = {
        ...this.state,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      console.error('[CmsStore] Save error:', err);
    }
  }

  private notify(): void {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error('[CmsStore] Listener notification error:', err);
      }
    });
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getSnapshot = (): FullCmsState => {
    return this.state;
  };

  // -------------------------------------------------------------
  // 1. REUSABLE COLLECTIONS CRUD
  // -------------------------------------------------------------

  // A. Case Studies
  public getCaseStudies(): CaseStudyItem[] {
    return this.state.caseStudies || [];
  }

  public getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
    return (this.state.caseStudies || []).find((c) => c.slug === slug);
  }

  public saveCaseStudy(item: CaseStudyItem): void {
    const list = this.state.caseStudies || [];
    const idx = list.findIndex((c) => c.slug === item.slug);
    if (idx >= 0) {
      const updated = [...list];
      updated[idx] = item;
      this.state = { ...this.state, caseStudies: updated };
    } else {
      this.state = { ...this.state, caseStudies: [...list, item] };
    }
    this.persist();
    this.notify();
  }

  public deleteCaseStudy(slug: string): boolean {
    const list = this.state.caseStudies || [];
    const filtered = list.filter((c) => c.slug !== slug);
    if (filtered.length !== list.length) {
      this.state = { ...this.state, caseStudies: filtered };
      this.persist();
      this.notify();
      return true;
    }
    return false;
  }

  // B. Work Directory
  public saveWorkDirectoryItem(item: WorkDirectoryItem): void {
    const list = this.state.workDirectory || [];
    const idx = list.findIndex((w) => w.id === item.id);
    if (idx >= 0) {
      const updated = [...list];
      updated[idx] = item;
      this.state = { ...this.state, workDirectory: updated };
    } else {
      this.state = { ...this.state, workDirectory: [...list, item] };
    }
    this.persist();
    this.notify();
  }

  public deleteWorkDirectoryItem(id: string): void {
    const list = this.state.workDirectory || [];
    this.state = { ...this.state, workDirectory: list.filter((w) => w.id !== id) };
    this.persist();
    this.notify();
  }

  // C. Tourin Packages
  public saveTourinPackage(item: TourinPackageItem): void {
    const list = this.state.tourinPackages || [];
    const idx = list.findIndex((t) => t.id === item.id);
    if (idx >= 0) {
      const updated = [...list];
      updated[idx] = item;
      this.state = { ...this.state, tourinPackages: updated };
    } else {
      this.state = { ...this.state, tourinPackages: [...list, item] };
    }
    this.persist();
    this.notify();
  }

  public deleteTourinPackage(id: string): void {
    const list = this.state.tourinPackages || [];
    this.state = { ...this.state, tourinPackages: list.filter((t) => t.id !== id) };
    this.persist();
    this.notify();
  }

  // D. Indian Army Projects
  public saveArmyProject(item: ArmyProjectItem): void {
    const list = this.state.armyProjects || [];
    const idx = list.findIndex((a) => a.id === item.id);
    if (idx >= 0) {
      const updated = [...list];
      updated[idx] = item;
      this.state = { ...this.state, armyProjects: updated };
    } else {
      this.state = { ...this.state, armyProjects: [...list, item] };
    }
    this.persist();
    this.notify();
  }

  public deleteArmyProject(id: string): void {
    const list = this.state.armyProjects || [];
    this.state = { ...this.state, armyProjects: list.filter((a) => a.id !== id) };
    this.persist();
    this.notify();
  }

  // E. Client Logos
  public saveClientLogo(item: ClientLogoItem): void {
    const list = this.state.clientLogos || [];
    const idx = list.findIndex((l) => l.id === item.id);
    if (idx >= 0) {
      const updated = [...list];
      updated[idx] = item;
      this.state = { ...this.state, clientLogos: updated };
    } else {
      this.state = { ...this.state, clientLogos: [...list, item] };
    }
    this.persist();
    this.notify();
  }

  public toggleLogoApproval(id: string): void {
    const list = this.state.clientLogos || [];
    this.state = {
      ...this.state,
      clientLogos: list.map((l) =>
        l.id === id ? { ...l, isPublicApproved: !l.isPublicApproved } : l
      ),
    };
    this.persist();
    this.notify();
  }

  public deleteClientLogo(id: string): void {
    const list = this.state.clientLogos || [];
    this.state = { ...this.state, clientLogos: list.filter((l) => l.id !== id) };
    this.persist();
    this.notify();
  }

  // -------------------------------------------------------------
  // 2. PAGE SINGLETONS
  // -------------------------------------------------------------
  public updateHomePage(updates: Partial<HomePageSingleton>): void {
    this.state = {
      ...this.state,
      home: deepMergeHome({
        ...this.state.home,
        ...updates,
      }),
    };
    this.persist();
    this.notify();
  }

  public updateAboutPage(updates: Partial<AboutPageSingleton>): void {
    this.state = {
      ...this.state,
      about: deepMergeAbout({
        ...this.state.about,
        ...updates,
      }),
    };
    this.persist();
    this.notify();
  }

  public updateServicesPage(updates: Partial<ServicesPageSingleton>): void {
    this.state = {
      ...this.state,
      services: deepMergeServices({
        ...this.state.services,
        ...updates,
      }),
    };
    this.persist();
    this.notify();
  }

  // -------------------------------------------------------------
  // 3. GLOBAL SEO
  // -------------------------------------------------------------
  public updateSeo(pageKey: keyof SeoMetadataCollection, updates: Partial<SeoMetadataCollection[keyof SeoMetadataCollection]>): void {
    this.state = {
      ...this.state,
      seo: {
        ...this.state.seo,
        [pageKey]: {
          ...(this.state.seo?.[pageKey] || {}),
          ...updates,
        },
      },
    };
    this.persist();
    this.notify();
  }

  // -------------------------------------------------------------
  // 4. CRM INQUIRIES
  // -------------------------------------------------------------
  public addInquiry(
    inquiry: Omit<CrmInquiry, 'id' | 'createdAt' | 'status'> & {
      status?: InquiryStatus;
      notes?: string;
    }
  ): CrmInquiry {
    const newInquiry: CrmInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      company: inquiry.company || 'Direct Client',
      service: inquiry.service,
      message: inquiry.message,
      status: inquiry.status || 'new',
      createdAt: new Date().toISOString(),
      notes: inquiry.notes || '',
    };

    this.state = {
      ...this.state,
      inquiries: [newInquiry, ...(this.state.inquiries || [])],
    };
    this.persist();
    this.notify();
    return newInquiry;
  }

  public updateInquiry(id: string, updates: Partial<CrmInquiry>): boolean {
    const list = this.state.inquiries || [];
    const idx = list.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    const updated = [...list];
    updated[idx] = { ...updated[idx], ...updates };
    this.state = { ...this.state, inquiries: updated };
    this.persist();
    this.notify();
    return true;
  }

  public deleteInquiry(id: string): boolean {
    const list = this.state.inquiries || [];
    const filtered = list.filter((i) => i.id !== id);
    if (filtered.length !== list.length) {
      this.state = { ...this.state, inquiries: filtered };
      this.persist();
      this.notify();
      return true;
    }
    return false;
  }

  public exportInquiriesCsv(): string {
    const list = this.state.inquiries || [];
    const headers = ['ID', 'Date', 'Status', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message', 'Notes'];
    const rows = list.map((inq) => [
      `"${inq.id}"`,
      `"${new Date(inq.createdAt).toLocaleString()}"`,
      `"${inq.status}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${inq.phone}"`,
      `"${(inq.company || '').replace(/"/g, '""')}"`,
      `"${inq.service.replace(/"/g, '""')}"`,
      `"${inq.message.replace(/"/g, '""')}"`,
      `"${(inq.notes || '').replace(/"/g, '""')}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  public resetToDefaults(): void {
    this.state = {
      caseStudies: [...SEED_CASE_STUDIES],
      workDirectory: [...SEED_WORK_DIRECTORY],
      tourinPackages: [...SEED_TOURIN_PACKAGES],
      armyProjects: [...SEED_ARMY_PROJECTS],
      clientLogos: [...SEED_CLIENT_LOGOS],
      home: deepMergeHome(),
      about: deepMergeAbout(),
      services: deepMergeServices(),
      seo: deepMergeSeo(),
      inquiries: [...SEED_INQUIRIES],
      lastUpdated: new Date().toISOString(),
    };
    this.persist();
    this.notify();
  }
}

export const cmsStore = new CmsRepository();

const getServerSnapshot = () => SERVER_SNAPSHOT;

// Global Hook for Full CMS Store
export function useCmsStore() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const state = useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getSnapshot,
    getServerSnapshot
  );

  const safeState = state || SERVER_SNAPSHOT;

  return {
    isReady: isClient,
    caseStudies: safeState.caseStudies || SEED_CASE_STUDIES,
    workDirectory: safeState.workDirectory || SEED_WORK_DIRECTORY,
    tourinPackages: safeState.tourinPackages || SEED_TOURIN_PACKAGES,
    armyProjects: safeState.armyProjects || SEED_ARMY_PROJECTS,
    clientLogos: safeState.clientLogos || SEED_CLIENT_LOGOS,
    home: safeState.home || SEED_HOME_PAGE,
    about: safeState.about || SEED_ABOUT_PAGE,
    services: safeState.services || SEED_SERVICES_PAGE,
    seo: safeState.seo || SEED_SEO_METADATA,
    inquiries: safeState.inquiries || SEED_INQUIRIES,
    lastUpdated: safeState.lastUpdated || '',
    // Methods
    saveCaseStudy: (item: CaseStudyItem) => cmsStore.saveCaseStudy(item),
    deleteCaseStudy: (slug: string) => cmsStore.deleteCaseStudy(slug),
    saveWorkDirectoryItem: (item: WorkDirectoryItem) => cmsStore.saveWorkDirectoryItem(item),
    deleteWorkDirectoryItem: (id: string) => cmsStore.deleteWorkDirectoryItem(id),
    saveTourinPackage: (item: TourinPackageItem) => cmsStore.saveTourinPackage(item),
    deleteTourinPackage: (id: string) => cmsStore.deleteTourinPackage(id),
    saveArmyProject: (item: ArmyProjectItem) => cmsStore.saveArmyProject(item),
    deleteArmyProject: (id: string) => cmsStore.deleteArmyProject(id),
    saveClientLogo: (item: ClientLogoItem) => cmsStore.saveClientLogo(item),
    toggleLogoApproval: (id: string) => cmsStore.toggleLogoApproval(id),
    deleteClientLogo: (id: string) => cmsStore.deleteClientLogo(id),
    updateHomePage: (updates: Partial<HomePageSingleton>) => cmsStore.updateHomePage(updates),
    updateAboutPage: (updates: Partial<AboutPageSingleton>) => cmsStore.updateAboutPage(updates),
    updateServicesPage: (updates: Partial<ServicesPageSingleton>) => cmsStore.updateServicesPage(updates),
    updateSeo: (pageKey: keyof SeoMetadataCollection, updates: Partial<SeoMetadataCollection[keyof SeoMetadataCollection]>) =>
      cmsStore.updateSeo(pageKey, updates),
    addInquiry: (inquiry: Parameters<typeof cmsStore.addInquiry>[0]) => cmsStore.addInquiry(inquiry),
    updateInquiry: (id: string, updates: Partial<CrmInquiry>) => cmsStore.updateInquiry(id, updates),
    deleteInquiry: (id: string) => cmsStore.deleteInquiry(id),
    exportCsv: () => cmsStore.exportInquiriesCsv(),
    resetToDefaults: () => cmsStore.resetToDefaults(),
  };
}
