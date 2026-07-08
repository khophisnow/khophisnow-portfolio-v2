import { NextResponse } from "next/server";

const contactEmail = process.env.CONTACT_TO_EMAIL || "juliusmcbrahamsomuah@gmail.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "KhophiSnow Portfolio <onboarding@resend.dev>";
const resendApiKey = process.env.RESEND_API_KEY;
const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestLog = new Map<string, number[]>();

type ContactPayload = {
  name?: string;
  email?: string;
  intent?: string;
  message?: string;
};

function fallbackMailto(payload: ContactPayload) {
  const subject = encodeURIComponent(payload.intent || "Portfolio contact");
  const body = encodeURIComponent(`Name: ${payload.name || ""}
Email: ${payload.email || ""}

${payload.message || ""}`);
  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

function cleanText(value: unknown, limit = 2000) {
  return typeof value === "string" ? value.replace(/[<>]/g, "").trim().slice(0, limit) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((time) => now - time < rateLimitWindowMs);
  if (recent.length >= maxRequestsPerWindow) {
    requestLog.set(key, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(key, recent);
  return false;
}

export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please wait a few minutes and try again." }, { status: 429 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Send the contact request as JSON." }, { status: 415 });
  }

  const payload = (await request.json().catch(() => ({}))) as ContactPayload;
  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 254).toLowerCase();
  const intent = cleanText(payload.intent, 120) || "Portfolio contact";
  const message = cleanText(payload.message, 3000);

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  if (message.length < 20) {
    return NextResponse.json({ ok: false, error: "Please include a little more detail so I can respond usefully." }, { status: 400 });
  }

  if (resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [contactEmail],
        reply_to: email,
        subject: `Portfolio: ${intent}`,
        text: `Name: ${name}
Email: ${email}
Intent: ${intent}

${message}`,
      }),
    });

    if (response.ok) return NextResponse.json({ ok: true, provider: "resend" });
    return NextResponse.json({ ok: false, error: "Message delivery failed.", fallback: fallbackMailto({ name, email, intent, message }) }, { status: 502 });
  }

  if (formspreeEndpoint) {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, intent, message }),
    });

    if (response.ok) return NextResponse.json({ ok: true, provider: "formspree" });
    return NextResponse.json({ ok: false, error: "Message delivery failed.", fallback: fallbackMailto({ name, email, intent, message }) }, { status: 502 });
  }

  return NextResponse.json({ ok: false, fallback: fallbackMailto({ name, email, intent, message }), error: "Contact delivery is not configured yet." }, { status: 503 });
}
