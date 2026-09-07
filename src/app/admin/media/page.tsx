'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Upload, Film, Trash2, Copy, Check, Search, Filter, Loader2, Sparkles } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
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

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteAsset = () => {
    if (!deleteTargetId) return;
    setAssets((prev) => prev.filter((a) => a.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  const filteredAssets = assets.filter((a) => {
    if (filterType !== 'all' && a.type !== filterType) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Upload Zone */}
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
              Drag &amp; Drop Assets Directly From Device
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#71717A', margin: '0 0 1.25rem 0' }}>
              Supports High-Res Images (JPG, PNG, WEBP, SVG) &amp; Videos (MP4, WEBM)
            </p>
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
              }}
            >
              Choose File from Device
            </button>
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
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {t === 'all' ? `All Assets (${assets.length})` : `${t}s`}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media..."
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
                  {copiedId === asset.id ? 'Copied URL' : 'Copy URL'}
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
