'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Upload,
  Check,
  X,
  Search,
  Film,
  Image as ImageIcon,
  Loader2,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Play,
  RotateCcw,
} from 'lucide-react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  mediaType?: 'image' | 'video' | 'pdf' | 'all';
  initialUrl?: string;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  mediaType = 'all',
  initialUrl = '',
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [assets, setAssets] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUrl, setSelectedUrl] = useState(initialUrl || '');
  const [urlInput, setUrlInput] = useState(initialUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedUrl(initialUrl || '');
      setUrlInput(initialUrl || '');
      setPreviewError(false);
      setCopied(false);

      const mergeLocalAssets = (remoteList: any[]) => {
        try {
          const stored = localStorage.getItem('arohana_cms_media_assets');
          if (stored) {
            const parsed: any[] = JSON.parse(stored);
            const combined = [...parsed];
            remoteList.forEach((a: any) => {
              if (!combined.some((c: any) => c.url === a.url)) {
                combined.push(a);
              }
            });
            return combined;
          }
        } catch (e) {}
        return remoteList;
      };

      fetch('/api/content/media?draft=true')
        .then((r) => r.json())
        .then((res) => {
          const assetList = res?.data?.assets || res?.assets || [];
          setAssets(mergeLocalAssets(assetList));
        })
        .catch(() => {
          fetch('/content/media.json')
            .then((r) => r.json())
            .then((data) => {
              if (data.assets) setAssets(mergeLocalAssets(data.assets));
            })
            .catch(() => {});
        });
    }
  }, [isOpen, initialUrl]);

  if (!isOpen) return null;

  const filteredAssets = assets.filter((item) => {
    if (mediaType === 'image' && item.type !== 'image') return false;
    if (mediaType === 'video' && item.type !== 'video') return false;
    if (mediaType === 'pdf' && item.type !== 'pdf' && !item.url?.endsWith('.pdf')) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'Media Library');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.asset) {
        setAssets((prev) => {
          const updated = [data.asset, ...prev.filter((p) => p.id !== data.asset.id)];
          try {
            localStorage.setItem('arohana_cms_media_assets', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });
        setSelectedUrl(data.url);
        setUrlInput(data.url);
        onSelect(data.url);
        onClose();
      } else {
        alert(data.error || 'Upload failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      alert(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCopyUrl = (urlToCopy: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!urlToCopy) return;
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUrlInputChange = (val: string) => {
    setUrlInput(val);
    setSelectedUrl(val);
    setPreviewError(false);
  };

  const handleApplyUrl = () => {
    const trimmed = (urlInput || selectedUrl).trim();
    if (trimmed) {
      onSelect(trimmed);
      onClose();
    }
  };

  // Helper to detect video format
  const isVideoUrl = (url: string) => {
    const lower = url.toLowerCase();
    return (
      mediaType === 'video' ||
      lower.endsWith('.mp4') ||
      lower.endsWith('.webm') ||
      lower.endsWith('.ogg') ||
      lower.endsWith('.mov') ||
      lower.includes('youtube.com') ||
      lower.includes('youtu.be') ||
      lower.includes('vimeo.com')
    );
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]+)/);
    return ytMatch ? `https://www.youtube-nocookie.com/embed/${ytMatch[1]}` : null;
  };

  const activeUrl = urlInput || selectedUrl;
  const isYoutube = activeUrl ? !!getYouTubeEmbedUrl(activeUrl) : false;

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
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 650, color: '#111113' }}>
              Select, Upload or Share Media URL
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#71717A' }}>
              {mediaType === 'image'
                ? 'Choose from library, upload image file, or paste an external image URL'
                : mediaType === 'video'
                ? 'Choose from library, upload video file (MP4/WEBM), or paste a video link (YouTube/MP4)'
                : 'Choose an asset, upload from device, or paste any media link'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#71717A' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls & Search */}
        <div
          style={{
            padding: '0.85rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            backgroundColor: '#F8F8FA',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeTab === 'library' ? '#111113' : '#E4E4E7',
                color: activeTab === 'library' ? '#FFFFFF' : '#3F3F46',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <ImageIcon size={13} />
              Media Library ({filteredAssets.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeTab === 'upload' ? '#111113' : '#E4E4E7',
                color: activeTab === 'upload' ? '#FFFFFF' : '#3F3F46',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Upload size={14} />
              Upload from Device
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeTab === 'url' ? '#111113' : '#E4E4E7',
                color: activeTab === 'url' ? '#FFFFFF' : '#3F3F46',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <LinkIcon size={13} />
              Paste URL / Web Link
            </button>
          </div>

          {activeTab === 'library' && (
            <div style={{ position: 'relative', width: '220px' }}>
              <Search
                size={14}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assets..."
                style={{
                  width: '100%',
                  padding: '0.35rem 0.65rem 0.35rem 2rem',
                  fontSize: '0.8rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  outline: 'none',
                }}
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem', minHeight: '340px' }}>
          {activeTab === 'library' ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '1rem',
              }}
            >
              {filteredAssets.map((asset) => {
                const isSelected = selectedUrl === asset.url;
                return (
                  <div
                    key={asset.id}
                    onClick={() => {
                      setSelectedUrl(asset.url);
                      setUrlInput(asset.url);
                      setPreviewError(false);
                    }}
                    style={{
                      border: isSelected ? '2px solid #DE322D' : '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundColor: '#F4F4F5',
                      aspectRatio: '1',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {asset.type === 'video' ? (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#1E1E24',
                          color: '#FFFFFF',
                        }}
                      >
                        <Film size={28} />
                      </div>
                    ) : (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                          src={asset.url}
                          alt={asset.name}
                          fill
                          sizes="150px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}

                    {/* Copy URL Quick Button on Card */}
                    <button
                      type="button"
                      title="Copy URL"
                      onClick={(e) => handleCopyUrl(asset.url, e)}
                      style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        color: '#FFFFFF',
                        borderRadius: '4px',
                        border: 'none',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 3,
                      }}
                    >
                      <Copy size={11} />
                    </button>

                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          backgroundColor: '#DE322D',
                          color: '#FFFFFF',
                          borderRadius: '50%',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 3,
                        }}
                      >
                        <Check size={14} />
                      </div>
                    )}

                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        insetInline: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        color: '#FFFFFF',
                        padding: '4px 6px',
                        fontSize: '0.65rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {asset.name}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : activeTab === 'upload' ? (
            /* Upload Screen */
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: dragActive ? '2px dashed #DE322D' : '2px dashed rgba(0, 0, 0, 0.2)',
                borderRadius: '16px',
                padding: '3rem 1.5rem',
                textAlign: 'center',
                backgroundColor: dragActive ? '#FFF5F5' : '#FAFAFA',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '260px',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={
                  mediaType === 'image'
                    ? 'image/*'
                    : mediaType === 'video'
                    ? 'video/*'
                    : 'image/*,video/*'
                }
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              {isUploading ? (
                <div>
                  <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 1rem auto', color: '#DE322D' }} />
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111113' }}>
                    Uploading to server...
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      color: '#DE322D',
                    }}
                  >
                    <Upload size={24} />
                  </div>
                  <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.05rem', fontWeight: 650, color: '#111113' }}>
                    Drag &amp; Drop Media Here
                  </h4>
                  <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.82rem', color: '#71717A' }}>
                    Supports JPG, PNG, WEBP, SVG, MP4, and WEBM
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: '0.6rem 1.4rem',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: '#111113',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Browse From Device
                  </button>
                </>
              )}
            </div>
          ) : (
            /* Tab 3: Paste URL / Web Link */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 650,
                    color: '#18181B',
                    marginBottom: '0.45rem',
                  }}
                >
                  ENTER OR PASTE MEDIA URL
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <LinkIcon
                      size={15}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#71717A',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="e.g. https://... or /images/... or https://youtu.be/..."
                      value={urlInput}
                      onChange={(e) => handleUrlInputChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem 0.65rem 2.2rem',
                        fontSize: '0.86rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                      }}
                    />
                  </div>
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(urlInput)}
                      style={{
                        padding: '0 1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#FFFFFF',
                        color: '#111113',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      {copied ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setUrlInput('');
                        setSelectedUrl('');
                      }}
                      style={{
                        padding: '0 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#F4F4F5',
                        color: '#71717A',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <span style={{ fontSize: '0.73rem', color: '#71717A', marginTop: '0.35rem', display: 'block' }}>
                  Supports absolute URLs (<code>https://...</code>), local assets (<code>/images/...</code>, <code>/uploads/...</code>), MP4/WebM videos, and YouTube links.
                </span>
              </div>

              {/* Live Preview Container */}
              <div
                style={{
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#FAFAFA',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '220px',
                }}
              >
                {!activeUrl ? (
                  <div style={{ textAlign: 'center', color: '#A1A1AA' }}>
                    <LinkIcon size={32} style={{ margin: '0 auto 0.5rem auto', opacity: 0.5 }} />
                    <p style={{ margin: 0, fontSize: '0.84rem' }}>
                      Enter a URL above to see an instant live preview.
                    </p>
                  </div>
                ) : isYoutube ? (
                  <div style={{ width: '100%', maxWidth: '480px', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden' }}>
                    <iframe
                      src={getYouTubeEmbedUrl(activeUrl)!}
                      title="YouTube Preview"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : isVideoUrl(activeUrl) ? (
                  <div style={{ width: '100%', maxWidth: '480px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000000' }}>
                    <video
                      src={activeUrl}
                      controls
                      style={{ width: '100%', maxHeight: '280px', objectFit: 'contain' }}
                      onError={() => setPreviewError(true)}
                    />
                  </div>
                ) : (
                  <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '220px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeUrl}
                      alt="URL Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={() => setPreviewError(true)}
                    />
                  </div>
                )}

                {previewError && (
                  <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Notice: Live preview could not load the resource directly. Verify that the URL is public and allows direct access.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Unified Footer Actions & Shared URL Bar */}
        <div
          style={{
            padding: '0.9rem 1.75rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Quick URL View / Direct Editable Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#71717A', whiteSpace: 'nowrap' }}>
              URL:
            </span>
            <input
              type="text"
              placeholder="Paste or edit URL here..."
              value={urlInput}
              onChange={(e) => handleUrlInputChange(e.target.value)}
              style={{
                flex: 1,
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: '6px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: '#FFFFFF',
                color: '#18181B',
              }}
            />
            {urlInput && (
              <button
                type="button"
                title="Copy URL"
                onClick={() => handleCopyUrl(urlInput)}
                style={{
                  padding: '0.35rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {copied ? <Check size={12} color="#16A34A" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: '#FFFFFF',
                color: '#111113',
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!activeUrl?.trim()}
              onClick={handleApplyUrl}
              style={{
                padding: '0.5rem 1.4rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeUrl?.trim() ? '#111113' : '#D4D4D8',
                color: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: activeUrl?.trim() ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Check size={14} />
              Use This Media / URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
