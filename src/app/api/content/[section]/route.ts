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
    const action = body.action || 'draft';

    if (action === 'publish') {
      const written = writeContentFile(`${section}.json`, body.data);
      return NextResponse.json({
        success: true,
        written,
        section,
        published: true,
        live: true,
        message: `${section} published live successfully`,
      });
    } else {
      // Save to admin CRM draft store (both memory & content/drafts/)
      saveSectionDraft(section, body.data);
      return NextResponse.json({
        success: true,
        section,
        draftSaved: true,
        published: false,
        message: `${section} draft saved to Admin CRM`,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
