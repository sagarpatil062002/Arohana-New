import { NextRequest, NextResponse } from 'next/server';
import { getSectionContent, saveSectionDraft, writeContentFile } from '@/lib/cms/content-manager';

export async function GET(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const { section } = params;
    const searchParams = req.nextUrl.searchParams;
    const includeDraft = searchParams.get('draft') !== 'false';

    const content = getSectionContent(section, includeDraft);
    if (!content) {
      return NextResponse.json({ error: `Section '${section}' not found` }, { status: 404 });
    }

    return NextResponse.json({ success: true, section, data: content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const { section } = params;
    const body = await req.json();

    // Persist immediately to disk so changes are permanent across server restarts
    const written = writeContentFile(`${section}.json`, body.data);
    saveSectionDraft(section, body.data);

    return NextResponse.json({ success: written, section, draftSaved: true, saved: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
