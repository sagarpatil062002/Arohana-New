'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, UploadCloud, X, Loader2 } from 'lucide-react';

interface PublishDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishSuccess: () => void;
}

export default function PublishDialog({ isOpen, onClose, onPublishSuccess }: PublishDialogProps) {
  const [summary, setSummary] = useState<{ sectionsModified: string[]; totalChangesCount: number } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      fetch('/api/content/publish')
        .then((r) => r.json())
        .then((res) => {
          if (res.summary) {
            setSummary(res.summary);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/content/publish', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onPublishSuccess();
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error('Publish error:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '480px',
          padding: '2rem',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#71717A',
          }}
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 650, color: '#111113', margin: '0 0 0.5rem 0' }}>
              Changes Published!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#52525B', margin: 0 }}>
              The live website is now updated with your latest changes.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#F4F4F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#111113',
                  flexShrink: 0,
                }}
              >
                <UploadCloud size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 650, color: '#111113' }}>
                  Publish All Changes?
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#71717A' }}>
                  Commit all saved CRM drafts across the website to live
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#F8F8FA',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                margin: '1.25rem 0 1.75rem 0',
                fontSize: '0.88rem',
                color: '#3F3F46',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#111113' }}>
                You are about to publish:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                <li>
                  <strong>{summary?.totalChangesCount || 1}</strong> active section update(s)
                </li>
                {summary?.sectionsModified && summary.sectionsModified.length > 0 ? (
                  <li>Sections: {summary.sectionsModified.join(', ')}</li>
                ) : (
                  <li>All current draft revisions</li>
                )}
                <li>All uploaded assets and reordered items</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                disabled={isPublishing}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: '#DE322D',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(222, 50, 45, 0.28)',
                }}
              >
                {isPublishing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Publishing All Changes...
                  </>
                ) : (
                  'Publish All Changes'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
