import { NextResponse } from 'next/server';
import { getPendingChangesSummary, publishAllDrafts } from '@/lib/cms/content-manager';

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
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
