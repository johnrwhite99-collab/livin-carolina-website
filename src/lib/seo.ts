// Shared page-metadata builder. Next.js does NOT deep-merge nested metadata
// fields like `openGraph` across layout/page segments — a page that sets its
// own `openGraph` object entirely replaces the root layout's — so this
// helper re-specifies the constant parts (siteName, locale, type, card) on
// every call rather than relying on inheritance from the root layout.

import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export interface BuildMetadataInput {
  title: string;
  description: string;
  path: string; // site-relative, e.g. "/buyers" or "/blog/some-slug"
}

export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.editorialBrand,
      locale: "en_US",
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
