import { NextRequest, NextResponse } from 'next/server';
import { getDraftSiteData, getPublishedSiteData } from '@/lib/cms/content-manager';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl?.searchParams;
    const isDraft = searchParams?.get('draft') === 'true';
    const data = isDraft ? getDraftSiteData() : getPublishedSiteData();
    return NextResponse.json({ success: true, data, isDraft });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
