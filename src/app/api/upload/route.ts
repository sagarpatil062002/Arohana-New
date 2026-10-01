import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { readContentFile, writeContentFile } from '@/lib/cms/content-manager';
import { put } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const timestamp = Date.now();
    const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const filename = `${timestamp}-${cleanName}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let publicUrl = '';

    // 1. If Vercel Blob token is configured, upload directly to Vercel Blob CDN
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`uploads/${filename}`, file, {
          access: 'public',
        });
        publicUrl = blob.url;
      } catch (blobErr) {
        console.error('Vercel Blob upload failed, trying local/base64 fallback:', blobErr);
      }
    }

    // 2. If not uploaded to blob yet, try writing to local disk (works in local dev)
    if (!publicUrl) {
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = path.join(uploadsDir, filename);
        fs.writeFileSync(filePath, buffer);
        publicUrl = `/uploads/${filename}`;
      } catch (fsErr) {
        // 3. Filesystem is read-only (e.g. Vercel Serverless environment without Blob token)
        console.warn('Read-only filesystem detected on Vercel. Using Base64 Data URL fallback:', fsErr);
        const mimeType = file.type || 'image/jpeg';
        publicUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      }
    }

    const isVideo = file.type.startsWith('video/') || filename.match(/\.(mp4|webm|mov)$/i);
    const sizeInKb = Math.round(buffer.length / 1024);
    const formattedSize = sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`;

    // Append to content/media.json if possible
    const newAsset = {
      id: `asset-${timestamp}`,
      name: file.name,
      url: publicUrl,
      type: isVideo ? 'video' : 'image',
      size: formattedSize,
      dimensions: isVideo ? 'Video Clip' : 'Standard',
      uploadedAt: new Date().toISOString(),
      usedIn: category,
    };

    try {
      const mediaRegistry = readContentFile<{ assets: any[] }>('media.json') || { assets: [] };
      mediaRegistry.assets.unshift(newAsset);
      writeContentFile('media.json', mediaRegistry);
    } catch (e) {
      console.warn('Could not write to media.json on read-only filesystem:', e);
    }

    return NextResponse.json({
      success: true,
      asset: newAsset,
      url: publicUrl,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
