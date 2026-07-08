import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const checks = [
  ["Root metadata", "app/layout.tsx", "metadataBase"],
  ["Security headers", "next.config.ts", "X-Frame-Options"],
  ["Contact rate limit", "app/api/contact/route.ts", "Too many messages"],
  ["Sitemap includes services", "app/sitemap.ts", "waskiServiceDetails"],
  ["Global focus style", "app/globals.css", ":focus-visible"],
  ["Reduced motion", "app/globals.css", "prefers-reduced-motion"],
  ["Runtime error boundary", "app/error.tsx", "Something failed to load cleanly"],
  ["Structured data", "app/layout.tsx", "application/ld+json"],
  ["Dynamic case canonical", "app/case-files/[slug]/page.tsx", "alternates: { canonical"],
  ["Dynamic writeup canonical", "app/writeups/[slug]/page.tsx", "alternates: { canonical"],
  ["Dynamic service canonical", "app/waskizone/services/[slug]/page.tsx", "alternates: { canonical"],
  ["Elite audit scorecard", "docs/elite-audit-scorecard.md", "Overall score"],
];

let failed = 0;
for (const [label, file, needle] of checks) {
  const content = await readFile(join(root, file), "utf8").catch(() => "");
  const ok = content.includes(needle);
  console.log(`${ok ? "✓" : "✕"} ${label}`);
  if (!ok) failed += 1;
}

const pages = await readdir(join(root, "app"), { recursive: true });
const pageCount = pages.filter((file) => String(file).endsWith("page.tsx")).length;
console.log(`Checked ${pageCount} app routes for static audit context.`);

if (failed) process.exit(1);
