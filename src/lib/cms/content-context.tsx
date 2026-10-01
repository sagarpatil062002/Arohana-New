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

export function CmsProvider({
  children,
  initialContent = {},
}: {
  children: React.ReactNode;
  initialContent?: Record<string, any>;
}) {
  const [content, setContent] = useState<Record<string, any>>(initialContent);
  const [isLoading, setIsLoading] = useState(false);

  const channelRef = React.useRef<BroadcastChannel | null>(null);

  // Helper to read localStorage drafts
  const getLocalDrafts = () => {
    if (typeof window === 'undefined') return {};
    const sections = ['home', 'work', 'services', 'army-projects', 'tourin', 'about', 'partners', 'contact', 'footer', 'settings'];
    const cached: Record<string, any> = {};
    sections.forEach((sec) => {
      try {
        const val = localStorage.getItem(`arohana_cms_${sec}`);
        if (val) cached[sec] = JSON.parse(val);
      } catch (e) {}
    });
    return cached;
  };

  // Initial load of sections via single batch endpoint
  useEffect(() => {
    const cached = getLocalDrafts();

    fetch('/api/content')
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setContent({ ...res.data, ...cached });
          setIsLoading(false);
        } else {
          throw new Error('Fallback to individual');
        }
      })
      .catch(() => {
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
          setContent({ ...initial, ...cached });
          setIsLoading(false);
        });
      });

    // Listen to broadcast messages from admin editor if previewing in another tab/frame
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('arohana_cms_preview') : null;
    channelRef.current = channel;
    if (channel) {
      channel.onmessage = (event) => {
        if (event.data?.type === 'DRAFT_UPDATE' && event.data.section && event.data.data) {
          setContent((prev) => ({
            ...prev,
            [event.data.section]: event.data.data,
          }));
        }
      };
      return () => {
        channel.close();
        channelRef.current = null;
      };
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
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`arohana_cms_${section}`, JSON.stringify(data));
      } catch (err) {}
    }
    if (channelRef.current) {
      try {
        channelRef.current.postMessage({ type: 'DRAFT_UPDATE', section, data });
      } catch (err) {}
    } else if (typeof BroadcastChannel !== 'undefined') {
      try {
        const ch = new BroadcastChannel('arohana_cms_preview');
        ch.postMessage({ type: 'DRAFT_UPDATE', section, data });
        setTimeout(() => ch.close(), 1000);
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
