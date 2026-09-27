import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'admin@arohana.com';
const ADMIN_PASSWORD = 'Arohana@2026';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email?.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({
        success: true,
        user: { email: ADMIN_EMAIL, name: 'Ārohana Admin' },
      });

      // Set auth cookie
      response.cookies.set('arohana_admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, loggedOut: true });
  response.cookies.delete('arohana_admin_auth');
  return response;
}
