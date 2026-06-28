import { NextResponse } from "next/server";

const contactEmail = process.env.CONTACT_TO_EMAIL || "juliusmcbrahamsomuah@gmail.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "KhophiSnow Portfolio <onboarding@resend.dev>";
const resendApiKey = process.env.RESEND_API_KEY;
const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

type ContactPayload = {
  name?: string;
  email?: string;
  intent?: string;
  message?: string;
};

function fallbackMailto(payload: ContactPayload) {
  const subject = encodeURIComponent(payload.intent || "Portfolio contact");
  const body = encodeURIComponent(`Name: ${payload.name || ""}\nEmail: ${payload.email || ""}\n\n${payload.message || ""}`);
  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as ContactPayload;
  const name = cleanText(payload.name);
  const email = cleanText(payload.email);
  const intent = cleanText(payload.intent) || "Portfolio contact";
  const message = cleanText(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Name, email, and message are required." }, { status: 400 });
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
        text: `Name: ${name}\nEmail: ${email}\nIntent: ${intent}\n\n${message}`,
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
