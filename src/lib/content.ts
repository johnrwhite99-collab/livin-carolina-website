// MDX content loader. Editorial prose (guides, blog posts) lives as .mdx
// files under content/, with frontmatter for metadata and JSON-LD — the
// prose itself is markdown/JSX, not TypeScript, per the content model:
// editorial prose = MDX, verifiable facts = structured TS data (see
// neighborhoods.ts, areas.ts), presentation = shared components (mdxComponents).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { extractHeadings, type Heading } from "@/lib/slugify";

export interface Faq {
  question: string;
  answer: string;
}

export interface DocFrontmatter {
  title: string;
  description: string;
  category?: string;
  parentArea?: string;
  author: string; // author slug, see src/lib/authors.ts
  datePublished: string;
  dateModified?: string;
  heroImage?: string;
  youtubeId?: string;
  featured?: boolean;
  relatedContent?: string[]; // slugs, same collection unless prefixed e.g. "blog:slug"
  faq?: Faq[];
  draft?: boolean;
  lastVerified?: string;
}

const GUIDES_DIR = path.join(process.cwd(), "content/guides");
const BLOG_DIR = path.join(process.cwd(), "content/blog");

function listSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readRaw(dir: string, slug: string): string {
  return fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
}

function frontmatterOf(dir: string, slug: string): DocFrontmatter {
  const { data } = matter(readRaw(dir, slug));
  return data as DocFrontmatter;
}

async function compileDoc(dir: string, slug: string) {
  const raw = readRaw(dir, slug);
  const { content, frontmatter } = await compileMDX<DocFrontmatter>({
    source: raw,
    // blockJS defaults to true (it strips JSX attribute expressions like
    // `prop={[{...}]}`), which our own shared components rely on (e.g.
    // SourceNote's `sources` array). Content here is 100% self-authored
    // (not user-submitted), so it's safe to allow JS expressions —
    // blockDangerousJS stays on as defense in depth regardless.
    options: { parseFrontmatter: true, blockJS: false },
    components: mdxComponents,
  });
  const headings: Heading[] = extractHeadings(raw);
  return { content, frontmatter, headings };
}

function nonDraft(dir: string, slugs: string[]): string[] {
  return slugs.filter((s) => !frontmatterOf(dir, s).draft);
}

export function listGuideSlugs(): string[] {
  return nonDraft(GUIDES_DIR, listSlugs(GUIDES_DIR));
}

export function listBlogSlugs(): string[] {
  return nonDraft(BLOG_DIR, listSlugs(BLOG_DIR));
}

export function getAllGuides(): (DocFrontmatter & { slug: string })[] {
  return listGuideSlugs().map((slug) => ({ slug, ...frontmatterOf(GUIDES_DIR, slug) }));
}

export function getAllBlogPosts(): (DocFrontmatter & { slug: string })[] {
  return listBlogSlugs()
    .map((slug) => ({ slug, ...frontmatterOf(BLOG_DIR, slug) }))
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getGuideFrontmatter(slug: string): DocFrontmatter | null {
  return listSlugs(GUIDES_DIR).includes(slug) ? frontmatterOf(GUIDES_DIR, slug) : null;
}

export function getBlogFrontmatter(slug: string): DocFrontmatter | null {
  return listSlugs(BLOG_DIR).includes(slug) ? frontmatterOf(BLOG_DIR, slug) : null;
}

export async function getGuide(slug: string) {
  return compileDoc(GUIDES_DIR, slug);
}

export async function getBlogPost(slug: string) {
  return compileDoc(BLOG_DIR, slug);
}
