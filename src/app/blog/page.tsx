import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Relocation, cost-transparency, and market updates for Summerville, SC.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
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
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-brand-black group-hover:text-brand-gold-dark">
              {post.title}
            </h2>
            <p className="mt-2 text-foreground/70">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
