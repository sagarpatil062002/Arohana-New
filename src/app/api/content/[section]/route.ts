import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getSectionContent,
  saveSectionDraft,
  publishSectionContent,
  discardSectionDraft,
} from '@/lib/cms/content-manager';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const { section } = params;
    const searchParams = req.nextUrl.searchParams;
    const includeDraft = searchParams.get('draft') === 'true';

    const content = getSectionContent(section, includeDraft);
    if (!content) {
      return NextResponse.json({ error: `Section '${section}' not found` }, { status: 404 });
    }

    return NextResponse.json({ success: true, section, data: content, isDraft: includeDraft });
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
      // Publishes ONLY this single section to live
      const result = publishSectionContent(section, body.data);
      try {
        revalidatePath('/', 'layout');
        revalidatePath('/');
        revalidatePath('/work');
        revalidatePath('/work/[slug]', 'page');
        revalidatePath('/tourin');
        revalidatePath('/army-projects');
        revalidatePath('/services');
        revalidatePath('/about');
        revalidatePath('/contact');
      } catch (e) {}

      return NextResponse.json({
        success: result.success,
        section,
        published: true,
        live: true,
        message: `${section} published live successfully`,
      });
    } else if (action === 'discard') {
      discardSectionDraft(section);
      const published = getSectionContent(section, false);
      return NextResponse.json({
        success: true,
        section,
        discarded: true,
        data: published,
        message: `${section} draft discarded; reverted to published state`,
      });
    } else {
      // Save to centralized CRM draft store only (memory + content/drafts/)
      saveSectionDraft(section, body.data);
      return NextResponse.json({
        success: true,
        section,
        draftSaved: true,
        published: false,
        message: `${section} draft saved to Central CRM Store`,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
