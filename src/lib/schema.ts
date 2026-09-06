// JSON-LD builder functions. Use these only where the schema accurately
// describes what's actually visible on the page — don't add a schema type
// just because it exists.

import { siteConfig } from "@/lib/site-config";
import type { Author } from "@/lib/authors";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brokerageName,
  };
}

export function realEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.teamName,
    areaServed: [siteConfig.primaryArea, ...siteConfig.extendedAreas],
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.brokerageName,
    },
  };
}

export function personJsonLd(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    affiliation: {
      "@type": "Organization",
      name: author.brokerageAffiliation,
    },
  };
}

export function articleJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  author,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: Author;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: author.name,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path,
    })),
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function videoObjectJsonLd({
  name,
  description,
  youtubeId,
  uploadDate,
}: {
  name: string;
  description: string;
  youtubeId: string;
  uploadDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    uploadDate,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
  };
}
