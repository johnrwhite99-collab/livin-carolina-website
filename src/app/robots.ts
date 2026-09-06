import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const BASE_URL = process.env.SITE_URL ?? `https://${siteConfig.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicit per-bot rules, in addition to the wildcard above, so the
      // AI-crawler policy is auditable rather than implicit: this is public
      // marketing/editorial content intended for maximum visibility, so both
      // ChatGPT's search-discoverability crawler and its separate
      // AI-training crawler are allowed.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
