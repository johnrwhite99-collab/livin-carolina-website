import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getBlogFrontmatter, listBlogSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { getAuthor } from "@/lib/authors";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { AuthorBox } from "@/components/AuthorBox";

export function generateStaticParams() {
  return listBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const frontmatter = getBlogFrontmatter(slug);
  if (!frontmatter) return {};
  return buildMetadata({ title: frontmatter.title, description: frontmatter.description, path: `/blog/${slug}` });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const frontmatter = getBlogFrontmatter(slug);
  if (!frontmatter) notFound();

  const doc = await getBlogPost(slug);
  if (!doc) notFound();
  const { content, headings } = doc;
  const author = getAuthor(frontmatter.author);

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
          { name: "Blog", path: "/blog" },
          { name: frontmatter.title, path: `/blog/${slug}` },
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: frontmatter.title, href: `/blog/${slug}` }]} />
      <Link href="/blog" className="mt-2 inline-block text-sm font-medium text-brand-gold-dark">
        &larr; Blog
      </Link>
      <p className="mt-4 text-xs text-foreground/50">
        {new Date(frontmatter.datePublished).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {frontmatter.category && <span> &middot; {frontmatter.category}</span>}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-brand-black sm:text-4xl">{frontmatter.title}</h1>

      {headings.length > 0 && (
        <div className="mt-6">
          <TableOfContents headings={headings} />
        </div>
      )}

      <div className="mt-8 text-lg leading-relaxed text-foreground/80">{content}</div>

      <AuthorBox author={author} />
    </article>
  );
}
