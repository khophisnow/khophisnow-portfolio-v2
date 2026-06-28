import type { MetadataRoute } from "next";
import { cases, writeupPosts } from "@/lib/portfolio-data";

const siteUrl = "https://khophisnow.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/cert", "/certifications", "/dashboard", "/hack-lab"];
  const projectRoutes = cases.map((project) => `/case-files/${project.slug}`);
  const writeupRoutes = writeupPosts.map((writeup) => `/writeups/${writeup.slug}`);

  return [...staticRoutes, ...projectRoutes, ...writeupRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
