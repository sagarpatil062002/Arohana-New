'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Upload, Check, X, Search, Film, Image as ImageIcon, Loader2 } from 'lucide-react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  mediaType?: 'image' | 'video' | 'all';
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  mediaType = 'all',
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [assets, setAssets] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUrl, setSelectedUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/content/media.json')
        .then((r) => r.json())
        .then((data) => {
          if (data.assets) setAssets(data.assets);
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredAssets = assets.filter((item) => {
    if (mediaType === 'image' && item.type !== 'image') return false;
    if (mediaType === 'video' && item.type !== 'video') return false;
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
        setAssets((prev) => [data.asset, ...prev]);
        setSelectedUrl(data.url);
        setActiveTab('library');
      }
    } catch (err) {
      console.error('Upload failed:', err);
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
          maxWidth: '820px',
          maxHeight: '85vh',
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
              Select or Upload Media
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#71717A' }}>
              {mediaType === 'image'
                ? 'Choose an image from library or upload from device'
                : mediaType === 'video'
                ? 'Choose a video clip or upload MP4/WEBM'
                : 'All media files'}
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
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
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
              }}
            >
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
                    onClick={() => setSelectedUrl(asset.url)}
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
          ) : (
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
          )}
        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#71717A' }}>
            {selectedUrl ? `Selected: ${selectedUrl}` : 'No asset selected'}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
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
              disabled={!selectedUrl}
              onClick={() => {
                if (selectedUrl) {
                  onSelect(selectedUrl);
                  onClose();
                }
              }}
              style={{
                padding: '0.5rem 1.4rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: selectedUrl ? '#111113' : '#D4D4D8',
                color: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: selectedUrl ? 'pointer' : 'not-allowed',
              }}
            >
              Use Selected Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
