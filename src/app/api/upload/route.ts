import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { readContentFile, writeContentFile } from '@/lib/cms/content-manager';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Clean and unique filename
    const timestamp = Date.now();
    const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const filename = `${timestamp}-${cleanName}`;
    const filePath = path.join(uploadsDir, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    const isVideo = file.type.startsWith('video/') || filename.match(/\.(mp4|webm|mov)$/i);

    // Format human-readable size
    const sizeInKb = Math.round(buffer.length / 1024);
    const formattedSize = sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`;

    // Append to content/media.json
    const mediaRegistry = readContentFile<{ assets: any[] }>('media.json') || { assets: [] };
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

    mediaRegistry.assets.unshift(newAsset);
    writeContentFile('media.json', mediaRegistry);

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
