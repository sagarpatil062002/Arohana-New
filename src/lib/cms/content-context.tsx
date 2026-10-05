'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface CmsContextType {
  content: Record<string, any>;
  isLoading: boolean;
  isDraftMode: boolean;
  refreshSection: (section: string) => Promise<void>;
  updateDraftInMemory: (section: string, data: any) => void;
  saveDraft: (section: string, data: any) => Promise<boolean>;
  publishSection: (section: string, data?: any) => Promise<boolean>;
  publishAll: () => Promise<{ success: boolean; publishedSections: string[] }>;
}

const CmsContext = createContext<CmsContextType | null>(null);

function clone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
}

const CMS_SECTION_KEYS = [
  'home',
  'about',
  'work',
  'services',
  'tourin',
  'army-projects',
  'partners',
  'contact',
  'footer',
  'settings',
];

export function CmsProvider({
  children,
  initialContent = {},
}: {
  children: React.ReactNode;
  initialContent?: Record<string, any>;
}) {
  const [content, setContent] = useState<Record<string, any>>(() => clone(initialContent));
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftMode, setIsDraftMode] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Helper to read localStorage drafts for Admin and Preview only
  const getLocalDrafts = useCallback(() => {
    if (typeof window === 'undefined') return {};
    const cached: Record<string, any> = {};
    CMS_SECTION_KEYS.forEach((sec) => {
      try {
        const val = localStorage.getItem(`arohana_cms_${sec}`);
        if (val) cached[sec] = JSON.parse(val);
      } catch (e) {}
    });
    return cached;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isEditor = window.location.pathname.startsWith('/admin');
    const isPreview = window.location.search.includes('preview=true');
    const isDraftConsumer = isEditor || isPreview;
    setIsDraftMode(isDraftConsumer);

    // CRITICAL ARCHITECTURE RULE:
    // The Live Website must NEVER read from CRM Draft, localStorage, or BroadcastChannel.
    if (!isDraftConsumer) {
      // Live website stays strictly on published data from SSR / layout
      return;
    }

    // --- CRM / PREVIEW DRAFT MODE ---
    setIsLoading(true);
    const cachedDrafts = getLocalDrafts();

    // Fetch centralized draft state (server drafts merged over published)
    fetch('/api/content?draft=true')
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setContent((prev) => ({
            ...prev,
            ...res.data,
            ...cachedDrafts,
          }));
        }
      })
      .catch((err) => {
        console.error('Failed to load centralized drafts batch:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Setup BroadcastChannel ONLY for Admin CRM and Preview iframe
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('arohana_cms_preview') : null;
    channelRef.current = channel;

    if (channel) {
      channel.onmessage = (event) => {
        const { type, section, data } = event.data || {};
        if (!type) return;

        if ((type === 'DRAFT_UPDATE' || type === 'DRAFT_SAVED') && section && data) {
          setContent((prev) => ({
            ...prev,
            [section]: clone(data),
          }));
        } else if (type === 'SECTION_PUBLISHED' && section && data) {
          setContent((prev) => ({
            ...prev,
            [section]: clone(data),
          }));
        } else if (type === 'ALL_PUBLISHED' && data) {
          setContent(clone(data));
        }
      };
    }

    // Setup window postMessage listener for cross-frame iframe sync
    const handleWindowMessage = (event: MessageEvent) => {
      const { type, section, data } = event.data || {};
      if (!type) return;

      if ((type === 'DRAFT_UPDATE' || type === 'DRAFT_SAVED') && section && data) {
        setContent((prev) => ({
          ...prev,
          [section]: clone(data),
        }));
      } else if (type === 'CMS_SCROLL' && typeof event.data.deltaY === 'number') {
        const lenis = (window as any).__lenis;
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(lenis.scroll + event.data.deltaY, { immediate: true });
        } else {
          window.scrollBy({ top: event.data.deltaY, behavior: 'auto' });
        }
      }
    };
    window.addEventListener('message', handleWindowMessage);

    return () => {
      if (channel) {
        channel.close();
        channelRef.current = null;
      }
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [getLocalDrafts]);

  const refreshSection = async (section: string) => {
    try {
      const isDraft = typeof window !== 'undefined' && (
        window.location.pathname.startsWith('/admin') ||
        window.location.search.includes('preview=true')
      );
      const res = await fetch(`/api/content/${section}?draft=${isDraft}`);
      const json = await res.json();
      if (json.success && json.data) {
        setContent((prev) => ({ ...prev, [section]: clone(json.data) }));
      }
    } catch (e) {
      console.error(`Failed to refresh ${section}:`, e);
    }
  };

  const updateDraftInMemory = (section: string, data: any) => {
    const cloned = clone(data);
    setContent((prev) => ({ ...prev, [section]: cloned }));

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`arohana_cms_${section}`, JSON.stringify(cloned));
      } catch (err) {}
    }

    const payload = { type: 'DRAFT_UPDATE', section, data: cloned };
    if (channelRef.current) {
      try {
        channelRef.current.postMessage(payload);
      } catch (err) {}
    }
    // Also postMessage to any child preview iframes on screen
    if (typeof window !== 'undefined') {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((ifr) => {
        try {
          ifr.contentWindow?.postMessage(payload, '*');
        } catch (e) {}
      });
    }
  };

  const saveDraft = async (section: string, data: any): Promise<boolean> => {
    try {
      const cloned = clone(data);
      // Immediately update local state, localStorage, and send broadcast
      updateDraftInMemory(section, cloned);

      // Persist to Centralized CRM Draft Store on server
      const res = await fetch(`/api/content/${section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: cloned, action: 'draft' }),
      });
      const json = await res.json();

      if (json.success) {
        const payload = { type: 'DRAFT_SAVED', section, data: cloned };
        if (channelRef.current) {
          try {
            channelRef.current.postMessage(payload);
          } catch (e) {}
        }
      }
      return !!json.success;
    } catch (err) {
      console.error(`Save draft failed for ${section}:`, err);
      return false;
    }
  };

  const publishSection = async (section: string, data?: any): Promise<boolean> => {
    try {
      const payload = clone(data !== undefined ? data : content[section]);
      const res = await fetch(`/api/content/${section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload, action: 'publish' }),
      });
      const json = await res.json();

      if (json.success && typeof window !== 'undefined') {
        try {
          localStorage.removeItem(`arohana_cms_${section}`);
        } catch (e) {}

        const msg = { type: 'SECTION_PUBLISHED', section, data: payload };
        if (channelRef.current) {
          try {
            channelRef.current.postMessage(msg);
          } catch (e) {}
        }
      }
      return !!json.success;
    } catch (err) {
      console.error(`Publish section failed for ${section}:`, err);
      return false;
    }
  };

  const publishAll = async () => {
    try {
      const res = await fetch('/api/content/publish', { method: 'POST' });
      const json = await res.json();

      if (json.success && typeof window !== 'undefined') {
        try {
          CMS_SECTION_KEYS.forEach((s) => localStorage.removeItem(`arohana_cms_${s}`));
        } catch (e) {}

        // Fetch fresh published data to update all clients
        try {
          const freshRes = await fetch('/api/content?draft=false');
          const freshJson = await freshRes.json();
          if (freshJson.success && freshJson.data) {
            setContent(clone(freshJson.data));
            if (channelRef.current) {
              channelRef.current.postMessage({ type: 'ALL_PUBLISHED', data: freshJson.data });
            }
          }
        } catch (e) {}
      }
      return json;
    } catch (err) {
      console.error('Publish all failed:', err);
      return { success: false, publishedSections: [] };
    }
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        isLoading,
        isDraftMode,
        refreshSection,
        updateDraftInMemory,
        saveDraft,
        publishSection,
        publishAll,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCmsContent() {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCmsContent must be used within a CmsProvider');
  }
  return ctx;
}
