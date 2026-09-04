'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import {
  CrmInquiry,
  HeroContent,
  PovContent,
  OfferingsContent,
  ProofContent,
  DefenceContent,
  TourinContent,
  FinalCtaContent,
  CrmStoreState,
  InquiryStatus,
} from '@/types/crm';
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_POV_CONTENT,
  DEFAULT_OFFERINGS_CONTENT,
  DEFAULT_PROOF_CONTENT,
  DEFAULT_DEFENCE_CONTENT,
  DEFAULT_TOURIN_CONTENT,
  DEFAULT_FINAL_CTA_CONTENT,
  DEFAULT_INQUIRIES,
} from '@/data/seed-crm';

const STORAGE_KEY = 'arohana_crm_store_v2';
const CRM_CHANGE_EVENT = 'arohana:crm_change';

class CrmRepository {
  private state: CrmStoreState;
  private isInitialized = false;
  private listeners = new Set<() => void>();

  constructor() {
    this.state = {
      hero: { ...DEFAULT_HERO_CONTENT },
      pov: { ...DEFAULT_POV_CONTENT },
      offerings: { ...DEFAULT_OFFERINGS_CONTENT },
      proof: { ...DEFAULT_PROOF_CONTENT },
      defence: { ...DEFAULT_DEFENCE_CONTENT },
      tourin: { ...DEFAULT_TOURIN_CONTENT },
      finalCta: { ...DEFAULT_FINAL_CTA_CONTENT },
      inquiries: [...DEFAULT_INQUIRIES],
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
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as CrmStoreState;
          if (parsed && Array.isArray(parsed.inquiries)) {
            this.state = {
              hero: { ...DEFAULT_HERO_CONTENT, ...(parsed.hero || {}) },
              pov: { ...DEFAULT_POV_CONTENT, ...(parsed.pov || {}) },
              offerings: { ...DEFAULT_OFFERINGS_CONTENT, ...(parsed.offerings || {}) },
              proof: { ...DEFAULT_PROOF_CONTENT, ...(parsed.proof || {}) },
              defence: { ...DEFAULT_DEFENCE_CONTENT, ...(parsed.defence || {}) },
              tourin: { ...DEFAULT_TOURIN_CONTENT, ...(parsed.tourin || {}) },
              finalCta: { ...DEFAULT_FINAL_CTA_CONTENT, ...(parsed.finalCta || {}) },
              inquiries: parsed.inquiries || [...DEFAULT_INQUIRIES],
              lastUpdated: parsed.lastUpdated || new Date().toISOString(),
            };
            this.notify();
          }
        } catch (err) {
          console.error('[CrmStore] Failed to parse cross-tab storage payload:', err);
        }
      }
    });

    window.addEventListener(CRM_CHANGE_EVENT, () => {
      this.notify();
    });
  }

  private hydrateFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<CrmStoreState>;
        if (parsed && Array.isArray(parsed.inquiries)) {
          this.state = {
            hero: { ...DEFAULT_HERO_CONTENT, ...(parsed.hero || {}) },
            pov: { ...DEFAULT_POV_CONTENT, ...(parsed.pov || {}) },
            offerings: { ...DEFAULT_OFFERINGS_CONTENT, ...(parsed.offerings || {}) },
            proof: { ...DEFAULT_PROOF_CONTENT, ...(parsed.proof || {}) },
            defence: { ...DEFAULT_DEFENCE_CONTENT, ...(parsed.defence || {}) },
            tourin: { ...DEFAULT_TOURIN_CONTENT, ...(parsed.tourin || {}) },
            finalCta: { ...DEFAULT_FINAL_CTA_CONTENT, ...(parsed.finalCta || {}) },
            inquiries: parsed.inquiries,
            lastUpdated: parsed.lastUpdated || new Date().toISOString(),
          };
          return;
        }
      }
      this.persist();
    } catch (err) {
      console.warn('[CrmStore] Operating in memory:', err);
    }
  }

  private persist(): void {
    if (typeof window === 'undefined') return;
    try {
      this.state.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      console.error('[CrmStore] LocalStorage write error:', err);
    }
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  public getSnapshot = (): CrmStoreState => {
    return this.state;
  };

  // Section Update Methods
  public updateHero(updates: Partial<HeroContent>): void {
    this.state = {
      ...this.state,
      hero: { ...this.state.hero, ...updates },
    };
    this.persist();
    this.notify();
  }

  public updatePov(updates: Partial<PovContent>): void {
    this.state = {
      ...this.state,
      pov: { ...this.state.pov, ...updates },
    };
    this.persist();
    this.notify();
  }

  public updateOfferings(updates: Partial<OfferingsContent>): void {
    this.state = {
      ...this.state,
      offerings: { ...this.state.offerings, ...updates },
    };
    this.persist();
    this.notify();
  }

  public updateProof(updates: Partial<ProofContent>): void {
    this.state = {
      ...this.state,
      proof: { ...this.state.proof, ...updates },
    };
    this.persist();
    this.notify();
  }

  public updateDefence(updates: Partial<DefenceContent>): void {
    this.state = {
      ...this.state,
      defence: { ...this.state.defence, ...updates },
    };
    this.persist();
    this.notify();
  }

  public updateTourin(updates: Partial<TourinContent>): void {
    this.state = {
      ...this.state,
      tourin: { ...this.state.tourin, ...updates },
    };
    this.persist();
    this.notify();
  }

  public updateFinalCta(updates: Partial<FinalCtaContent>): void {
    this.state = {
      ...this.state,
      finalCta: { ...this.state.finalCta, ...updates },
    };
    this.persist();
    this.notify();
  }

  // Inquiry Operations
  public getInquiries(): CrmInquiry[] {
    return this.state.inquiries;
  }

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
      inquiries: [newInquiry, ...this.state.inquiries],
    };

    this.persist();
    this.notify();
    return newInquiry;
  }

  public updateInquiry(id: string, updates: Partial<CrmInquiry>): boolean {
    const index = this.state.inquiries.findIndex((item) => item.id === id);
    if (index === -1) return false;

    const newInquiries = [...this.state.inquiries];
    newInquiries[index] = { ...newInquiries[index], ...updates };

    this.state = {
      ...this.state,
      inquiries: newInquiries,
    };

    this.persist();
    this.notify();
    return true;
  }

  public deleteInquiry(id: string): boolean {
    const prevLen = this.state.inquiries.length;
    const newInquiries = this.state.inquiries.filter((item) => item.id !== id);
    if (newInquiries.length === prevLen) return false;

    this.state = {
      ...this.state,
      inquiries: newInquiries,
    };

    this.persist();
    this.notify();
    return true;
  }

  public resetToDefaults(): void {
    this.state = {
      hero: { ...DEFAULT_HERO_CONTENT },
      pov: { ...DEFAULT_POV_CONTENT },
      offerings: { ...DEFAULT_OFFERINGS_CONTENT },
      proof: { ...DEFAULT_PROOF_CONTENT },
      defence: { ...DEFAULT_DEFENCE_CONTENT },
      tourin: { ...DEFAULT_TOURIN_CONTENT },
      finalCta: { ...DEFAULT_FINAL_CTA_CONTENT },
      inquiries: [...DEFAULT_INQUIRIES],
      lastUpdated: new Date().toISOString(),
    };

    this.persist();
    this.notify();
  }

  public exportInquiriesCsv(): string {
    const headers = ['ID', 'Date', 'Status', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message', 'Notes'];
    const rows = this.state.inquiries.map((inq) => [
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
}

export const crmStore = new CrmRepository();

export function useCrmStore() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const state = useSyncExternalStore(
    crmStore.subscribe,
    crmStore.getSnapshot,
    () => ({
      hero: DEFAULT_HERO_CONTENT,
      pov: DEFAULT_POV_CONTENT,
      offerings: DEFAULT_OFFERINGS_CONTENT,
      proof: DEFAULT_PROOF_CONTENT,
      defence: DEFAULT_DEFENCE_CONTENT,
      tourin: DEFAULT_TOURIN_CONTENT,
      finalCta: DEFAULT_FINAL_CTA_CONTENT,
      inquiries: DEFAULT_INQUIRIES,
      lastUpdated: '',
    })
  );

  return {
    isReady: isClient,
    hero: state.hero,
    heroContent: state.hero, // Alias for backwards compatibility
    pov: state.pov,
    offerings: state.offerings,
    proof: state.proof,
    defence: state.defence,
    tourin: state.tourin,
    finalCta: state.finalCta,
    inquiries: state.inquiries,
    lastUpdated: state.lastUpdated,
    updateHero: (u: Partial<HeroContent>) => crmStore.updateHero(u),
    updateHeroContent: (u: Partial<HeroContent>) => crmStore.updateHero(u),
    updatePov: (u: Partial<PovContent>) => crmStore.updatePov(u),
    updateOfferings: (u: Partial<OfferingsContent>) => crmStore.updateOfferings(u),
    updateProof: (u: Partial<ProofContent>) => crmStore.updateProof(u),
    updateDefence: (u: Partial<DefenceContent>) => crmStore.updateDefence(u),
    updateTourin: (u: Partial<TourinContent>) => crmStore.updateTourin(u),
    updateFinalCta: (u: Partial<FinalCtaContent>) => crmStore.updateFinalCta(u),
    addInquiry: (data: Parameters<typeof crmStore.addInquiry>[0]) => crmStore.addInquiry(data),
    updateInquiry: (id: string, updates: Partial<CrmInquiry>) => crmStore.updateInquiry(id, updates),
    deleteInquiry: (id: string) => crmStore.deleteInquiry(id),
    resetToDefaults: () => crmStore.resetToDefaults(),
    exportCsv: () => crmStore.exportInquiriesCsv(),
  };
}
