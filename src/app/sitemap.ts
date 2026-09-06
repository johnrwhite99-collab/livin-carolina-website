import type { MetadataRoute } from "next";
import { neighborhoods } from "@/lib/neighborhoods";
import { getAllBlogPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const BASE_URL = process.env.SITE_URL ?? `https://${siteConfig.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/start-here",
    "/moving-to-charleston",
    "/cost-of-living",
    "/charleston-area",
    "/buyers",
    "/sellers",
    "/neighborhoods",
    "/blog",
    "/videos",
    "/about",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const neighborhoodRoutes = neighborhoods.map((n) => ({
    url: `${BASE_URL}/neighborhoods/${n.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllBlogPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.dateModified ?? p.datePublished),
  }));

  return [...staticRoutes, ...neighborhoodRoutes, ...postRoutes];
}
