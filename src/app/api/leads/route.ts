import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'content', 'leads.json');

function readLeads(): any[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading leads:', err);
    return [];
  }
}

function writeLeads(leads: any[]): boolean {
  try {
    const dir = path.dirname(LEADS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing leads:', err);
    return false;
  }
}

export async function GET() {
  const leads = readLeads();
  return NextResponse.json({ success: true, leads });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organization, serviceInterest, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      organization: String(organization || '').trim(),
      serviceInterest: String(serviceInterest || 'General Inquiry').trim(),
      message: String(message || '').trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    const leads = readLeads();
    leads.unshift(newLead);
    writeLeads(leads);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Lead id and status are required.' },
        { status: 400 }
      );
    }

    const leads = readLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    leads[idx].status = status;
    writeLeads(leads);

    return NextResponse.json({ success: true, lead: leads[idx] });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update lead.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead id is required.' }, { status: 400 });
    }

    const leads = readLeads();
    const filtered = leads.filter((l) => l.id !== id);
    writeLeads(filtered);

    return NextResponse.json({ success: true, remainingCount: filtered.length });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete lead.' },
      { status: 500 }
    );
  }
}
