import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuide, getGuideFrontmatter } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { getAuthor } from "@/lib/authors";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { AuthorBox } from "@/components/AuthorBox";
import { FAQSection } from "@/components/FAQSection";

export async function guideMetadata(slug: string): Promise<Metadata> {
  const frontmatter = getGuideFrontmatter(slug);
  if (!frontmatter) return {};
  return buildMetadata({ title: frontmatter.title, description: frontmatter.description, path: `/${slug}` });
}

export async function GuidePage({ slug }: { slug: string }) {
  const frontmatter = getGuideFrontmatter(slug);
  if (!frontmatter) notFound();

  const { content, headings } = await getGuide(slug);
  const author = getAuthor(frontmatter.author);
  const faqs = frontmatter.faq ?? [];

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        data={articleJsonLd({
          headline: frontmatter.title,
          description: frontmatter.description,
          datePublished: frontmatter.datePublished,
          dateModified: frontmatter.dateModified,
          author,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: frontmatter.title, path: `/${slug}` },
        ])}
      />
      {faqs.length > 0 && <JsonLd data={faqPageJsonLd(faqs)} />}
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: frontmatter.title, href: `/${slug}` }]} />
      {frontmatter.category && (
        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-brand-gold-dark">
          {frontmatter.category}
        </p>
      )}
      <h1 className="mt-2 text-3xl font-bold text-brand-black sm:text-4xl">{frontmatter.title}</h1>
      <p className="mt-2 text-xs text-foreground/50">
        Published{" "}
        {new Date(frontmatter.datePublished).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {frontmatter.dateModified && frontmatter.dateModified !== frontmatter.datePublished && (
          <>
            {" "}
            &middot; updated{" "}
            {new Date(frontmatter.dateModified).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </>
        )}
      </p>

      {headings.length > 0 && (
        <div className="mt-6">
          <TableOfContents headings={headings} />
        </div>
      )}

      <div className="mt-8 text-lg leading-relaxed text-foreground/80">{content}</div>

      <FAQSection faqs={faqs} />
      <AuthorBox author={author} />
    </article>
  );
}
