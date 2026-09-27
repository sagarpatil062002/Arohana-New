import { NextResponse } from 'next/server';
import { getSectionContent } from '@/lib/cms/content-manager';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sections = [
      'home',
      'work',
      'services',
      'army-projects',
      'tourin',
      'about',
      'partners',
      'contact',
      'footer',
      'settings',
    ];
    const data: Record<string, any> = {};
    for (const sec of sections) {
      const val = getSectionContent(sec, true);
      if (val) data[sec] = val;
    }
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
