import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  requirement: string;
  message: string;
  _honeypot?: string;
}

const rateLimit = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 3;

function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now - entry.ts > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, ts: now });
    return true;
  }
  entry.count += 1;
  return entry.count <= RATE_LIMIT_MAX;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function sendEmail(payload: ContactPayload): Promise<boolean> {
  const contactEmail = process.env.CONTACT_EMAIL || "founder@byarohana.com";

  const emailServiceApiKey = process.env.EMAIL_SERVICE_API_KEY;

  if (!emailServiceApiKey) {
    console.log("[Contact] No EMAIL_SERVICE_API_KEY configured. Payload:", {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      phone: payload.phone,
      requirement: payload.requirement,
      message: payload.message,
    });
    return true;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${emailServiceApiKey}`,
      },
      body: JSON.stringify({
        from: "Ārohana Consultancy <no-reply@byarohana.com>",
        to: [contactEmail],
        subject: `New enquiry from ${payload.name}`,
        text: `
New contact enquiry from Ārohana website:

Name: ${payload.name}
Email: ${payload.email}
Company: ${payload.company || "Not provided"}
Phone: ${payload.phone || "Not provided"}
Requirement: ${payload.requirement}
Message: ${payload.message}
        `.trim(),
        replyTo: payload.email,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Contact] Email send failed:", response.status, error);
      return false;
    }

    console.log("[Contact] Email sent successfully");
    return true;
  } catch (error) {
    console.error("[Contact] Email send error:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const payload = (await request.json()) as ContactPayload;

    if (payload._honeypot && payload._honeypot.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const errors: Record<string, string> = {};

    if (!payload.name || !payload.name.trim()) {
      errors.name = "Please enter your name.";
    }
    if (!payload.email || !payload.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!validateEmail(payload.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!payload.requirement || !payload.requirement.trim()) {
      errors.requirement = "Please tell us what you are looking to build, fix or change.";
    }
    if (!payload.message || !payload.message.trim()) {
      errors.message = "Please enter a message.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const sent = await sendEmail(payload);

    if (!sent) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}