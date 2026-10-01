import { NextRequest, NextResponse } from 'next/server';
import { getSectionContent } from '@/lib/cms/content-manager';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl?.searchParams;
    const isDraft = searchParams?.get('draft') === 'true';
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
      const val = getSectionContent(sec, isDraft);
      if (val) data[sec] = val;
    }
    return NextResponse.json({ success: true, data, isDraft });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
