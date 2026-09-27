import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authCookie = req.cookies.get('arohana_admin_auth');
  const isAuthenticated = authCookie?.value === 'authenticated';

  return NextResponse.json({ isAuthenticated });
}
