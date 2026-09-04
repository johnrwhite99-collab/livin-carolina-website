import type { MetadataRoute } from "next";
import { neighborhoods } from "@/lib/neighborhoods";
import { posts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

const BASE_URL = process.env.SITE_URL ?? `https://${siteConfig.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/buyers", "/sellers", "/neighborhoods", "/blog", "/videos"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const neighborhoodRoutes = neighborhoods.map((n) => ({
    url: `${BASE_URL}/neighborhoods/${n.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...neighborhoodRoutes, ...postRoutes];
}
