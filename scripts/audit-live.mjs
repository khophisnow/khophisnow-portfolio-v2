const baseUrl = process.env.SITE_URL || "https://khophisnow.vercel.app";

const routes = [
  "/",
  "/waskizone",
  "/writeups",
  "/security-notes",
  "/case-files/edumanage",
  "/waskizone/contact",
  "/waskizone/policy",
];

const requiredHeaders = [
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "cross-origin-opener-policy",
  "strict-transport-security",
];

const requiredHomeMarkers = [
  "application/ld+json",
  "KhophiSnow",
  "WaskiZone",
];

let failed = 0;

async function checkRoute(route) {
  const url = new URL(route, baseUrl).toString();
  const response = await fetch(url, { redirect: "manual" });
  const ok = response.status >= 200 && response.status < 400;
  console.log(`${ok ? "✓" : "✕"} ${route} ${response.status}`);
  if (!ok) failed += 1;

  if (route === "/") {
    for (const header of requiredHeaders) {
      const present = response.headers.has(header);
      console.log(`  ${present ? "✓" : "✕"} header:${header}`);
      if (!present) failed += 1;
    }

    const html = await response.text();
    for (const marker of requiredHomeMarkers) {
      const present = html.includes(marker);
      console.log(`  ${present ? "✓" : "✕"} marker:${marker}`);
      if (!present) failed += 1;
    }
  }
}

for (const route of routes) {
  await checkRoute(route);
}

if (failed) {
  console.error(`Live audit failed with ${failed} issue${failed === 1 ? "" : "s"}.`);
  process.exit(1);
}

console.log(`Live audit passed for ${baseUrl}.`);
