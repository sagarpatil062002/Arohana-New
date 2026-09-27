'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Upload, Film, Trash2, Copy, Check, Search, Filter, Loader2, Sparkles, Link as LinkIcon, Plus } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showUrlForm, setShowUrlForm] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [typeInput, setTypeInput] = useState<'image' | 'video'>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = () => {
    fetch('/content/media.json')
      .then((r) => r.json())
      .then((data) => {
        if (data.assets) setAssets(data.assets);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const saveAssets = async (newAssets: any[]) => {
    setAssets(newAssets);
    try {
      await fetch('/api/content/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { assets: newAssets } }),
      });
    } catch (err) {
      console.error('Error saving assets registry:', err);
    }
  };

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
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddUrlAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const trimmedUrl = urlInput.trim();
    const isVideo =
      typeInput === 'video' ||
      trimmedUrl.endsWith('.mp4') ||
      trimmedUrl.endsWith('.webm') ||
      trimmedUrl.includes('youtube.com') ||
      trimmedUrl.includes('youtu.be');

    const newAsset = {
      id: `url-${Date.now()}`,
      name: nameInput.trim() || trimmedUrl.split('/').pop()?.split('?')[0] || 'Linked Media',
      url: trimmedUrl,
      type: isVideo ? 'video' : 'image',
      size: 'External / Linked',
      uploadedAt: new Date().toISOString(),
      usedIn: 'Shared URL',
    };

    const updated = [newAsset, ...assets];
    await saveAssets(updated);
    setUrlInput('');
    setNameInput('');
    setShowUrlForm(false);
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteAsset = async () => {
    if (!deleteTargetId) return;
    const updated = assets.filter((a) => a.id !== deleteTargetId);
    await saveAssets(updated);
    setDeleteTargetId(null);
  };

  const filteredAssets = assets.filter((a) => {
    if (filterType !== 'all' && a.type !== filterType) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.url.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Upload Zone & Share URL */}
      <div
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
          }
        }}
        style={{
          border: dragActive ? '2px dashed #DE322D' : '2px dashed rgba(0, 0, 0, 0.15)',
          borderRadius: '16px',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          backgroundColor: dragActive ? '#FFF5F5' : '#FFFFFF',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.02)',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />

        {isUploading ? (
          <div>
            <Loader2 size={32} className="animate-spin" style={{ color: '#DE322D', margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '0.9rem', fontWeight: 650, color: '#111113' }}>
              Uploading to /public/uploads/ ...
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(222, 50, 45, 0.1)',
                color: '#DE322D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.85rem',
              }}
            >
              <Upload size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 650, color: '#111113', margin: '0 0 0.35rem 0' }}>
              Upload Files from Device or Share Web URLs
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#71717A', margin: '0 0 1.25rem 0' }}>
              Supports High-Res Images (JPG, PNG, WEBP, SVG) &amp; Videos (MP4, WEBM, YouTube, Vimeo)
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: '#111113',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Upload size={14} />
                Upload File from Device
              </button>

              <button
                type="button"
                onClick={() => setShowUrlForm((prev) => !prev)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#FFFFFF',
                  color: '#111113',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <LinkIcon size={14} />
                {showUrlForm ? 'Close URL Form' : 'Add / Link Media by URL'}
              </button>
            </div>

            {/* Inline Add URL Form */}
            {showUrlForm && (
              <form
                onSubmit={handleAddUrlAsset}
                style={{
                  marginTop: '1.5rem',
                  width: '100%',
                  maxWidth: '560px',
                  backgroundColor: '#F8F8FA',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 650, color: '#111113' }}>
                  Link an External Media URL
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#71717A', marginBottom: '0.25rem' }}>
                    Media URL (Image or Video)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://... or /images/... or https://youtu.be/..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      fontSize: '0.82rem',
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#71717A', marginBottom: '0.25rem' }}>
                      Asset Title (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hero Skyline Video"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.82rem',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#71717A', marginBottom: '0.25rem' }}>
                      Type
                    </label>
                    <select
                      value={typeInput}
                      onChange={(e) => setTypeInput(e.target.value as 'image' | 'video')}
                      style={{
                        width: '100%',
                        padding: '0.45rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        fontSize: '0.82rem',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.45rem 1.15rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#111113',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Plus size={13} />
                  Add to Media Library
                </button>
              </form>
            )}
          </>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['all', 'image', 'video'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilterType(t)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: filterType === t ? '#111113' : '#E4E4E7',
                color: filterType === t ? '#FFFFFF' : '#3F3F46',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {t} ({t === 'all' ? assets.length : assets.filter((a) => a.type === t).length})
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search
            size={15}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media or URL..."
            style={{
              width: '100%',
              padding: '0.4rem 0.75rem 0.4rem 2.2rem',
              borderRadius: '9999px',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              fontSize: '0.82rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Assets Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', backgroundColor: '#1E1E24' }}>
              {asset.type === 'video' ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <Film size={32} />
                </div>
              ) : (
                <Image src={asset.url} alt={asset.name} fill style={{ objectFit: 'cover' }} sizes="300px" />
              )}
            </div>

            <div style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 650,
                  color: '#111113',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {asset.name}
              </div>

              {/* Display full URL with quick-copy */}
              <div
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'monospace',
                  color: '#71717A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  backgroundColor: '#F4F4F5',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
                title={asset.url}
              >
                {asset.url}
              </div>

              <div style={{ fontSize: '0.72rem', color: '#71717A' }}>
                {asset.size} &bull; {asset.type.toUpperCase()}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleCopyUrl(asset.id, asset.url)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    backgroundColor: copiedId === asset.id ? '#DCFCE7' : '#F8F8FA',
                    color: copiedId === asset.id ? '#16A34A' : '#111113',
                    fontSize: '0.74rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {copiedId === asset.id ? <Check size={12} /> : <Copy size={12} />}
                  {copiedId === asset.id ? 'Copied URL' : 'Copy / Share URL'}
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteTargetId(asset.id)}
                  style={{ border: 'none', backgroundColor: 'transparent', color: '#EF4444', cursor: 'pointer' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Media File?"
        message="This asset will be removed from your media registry."
        confirmLabel="Delete Asset"
        onConfirm={handleDeleteAsset}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
