import type { MetadataRoute } from "next";
import { cases, writeupPosts } from "@/lib/portfolio-data";

const siteUrl = "https://khophisnow.vercel.app";
const lastModified = new Date("2026-07-08T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/writeups", "/truth-or-dare", "/security-notes", "/w4sk1z0n3", "/cert", "/certifications", "/dashboard", "/hack-lab"];
  const projectRoutes = cases.map((project) => `/case-files/${project.slug}`);
  const writeupRoutes = writeupPosts.map((writeup) => `/writeups/${writeup.slug}`);
  return [...staticRoutes, ...projectRoutes, ...writeupRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
