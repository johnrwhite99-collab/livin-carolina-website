import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Relocation, cost-transparency, and market updates for Charleston and Summerville, SC.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = getAllBlogPosts();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-black">Blog</h1>
      <p className="mt-3 text-foreground/70">
        Relocation-buyer content, cost-transparency posts, and market updates.
      </p>
      <div className="mt-10 divide-y divide-border border-t border-border">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block py-6 group">
            <p className="text-xs text-foreground/50">
              {new Date(post.datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {post.category && <span> &middot; {post.category}</span>}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-brand-black group-hover:text-brand-gold-dark">
              {post.title}
            </h2>
            <p className="mt-2 text-foreground/70">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
