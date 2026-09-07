'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CmsContextType {
  content: Record<string, any>;
  isLoading: boolean;
  refreshSection: (section: string) => Promise<void>;
  updateDraftInMemory: (section: string, data: any) => void;
  saveDraft: (section: string, data: any) => Promise<boolean>;
  publishAll: () => Promise<{ success: boolean; publishedSections: string[] }>;
}

const CmsContext = createContext<CmsContextType | null>(null);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Initial load of sections
  useEffect(() => {
    const sections = ['home', 'work', 'services', 'army-projects', 'tourin', 'about', 'partners', 'contact', 'footer', 'settings'];
    Promise.all(
      sections.map((sec) =>
        fetch(`/api/content/${sec}`)
          .then((r) => r.json())
          .then((res) => ({ section: sec, data: res.data }))
          .catch(() => ({ section: sec, data: null }))
      )
    ).then((results) => {
      const initial: Record<string, any> = {};
      results.forEach((r) => {
        if (r.data) initial[r.section] = r.data;
      });
      setContent(initial);
      setIsLoading(false);
    });

    // Listen to broadcast messages from admin editor if previewing in another tab/frame
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('arohana_cms_preview') : null;
    if (channel) {
      channel.onmessage = (event) => {
        if (event.data?.type === 'DRAFT_UPDATE' && event.data.section && event.data.data) {
          setContent((prev) => ({
            ...prev,
            [event.data.section]: event.data.data,
          }));
        }
      };
      return () => channel.close();
    }
  }, []);

  const refreshSection = async (section: string) => {
    try {
      const res = await fetch(`/api/content/${section}`);
      const json = await res.json();
      if (json.success && json.data) {
        setContent((prev) => ({ ...prev, [section]: json.data }));
      }
    } catch (e) {
      console.error(`Failed to refresh ${section}:`, e);
    }
  };

  const updateDraftInMemory = (section: string, data: any) => {
    setContent((prev) => ({ ...prev, [section]: data }));
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel('arohana_cms_preview');
        channel.postMessage({ type: 'DRAFT_UPDATE', section, data });
        channel.close();
      } catch (err) {}
    }
  };

  const saveDraft = async (section: string, data: any): Promise<boolean> => {
    try {
      updateDraftInMemory(section, data);
      const res = await fetch(`/api/content/${section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const json = await res.json();
      return !!json.success;
    } catch (err) {
      console.error(`Save draft failed for ${section}:`, err);
      return false;
    }
  };

  const publishAll = async () => {
    const res = await fetch('/api/content/publish', { method: 'POST' });
    const json = await res.json();
    return json;
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        isLoading,
        refreshSection,
        updateDraftInMemory,
        saveDraft,
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
