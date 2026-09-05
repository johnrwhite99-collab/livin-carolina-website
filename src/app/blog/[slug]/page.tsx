import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, posts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const isCddPost = post.slug.includes("cdd");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: siteConfig.teamName,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Link href="/blog" className="text-sm font-medium text-brand-gold-dark">
        &larr; Blog
      </Link>
      <p className="mt-4 text-xs text-foreground/50">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-brand-black sm:text-4xl">{post.title}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {isCddPost && (
        <p className="mt-10 rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-4 text-sm text-brand-black">
          See the real dollar figures for a specific community:{" "}
          <Link href="/neighborhoods" className="font-semibold text-brand-gold-dark hover:underline">
            neighborhood cost guides &rarr;
          </Link>
        </p>
      )}
      {post.source && (
        <p className="mt-10 border-t border-border pt-4 text-xs text-foreground/50">
          Source: {post.source}
        </p>
      )}
    </article>
  );
}
