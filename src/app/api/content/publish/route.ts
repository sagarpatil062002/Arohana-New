import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPendingChangesSummary, publishAllDrafts } from '@/lib/cms/content-manager';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const summary = getPendingChangesSummary();
    return NextResponse.json({ success: true, summary });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = publishAllDrafts();
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
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
