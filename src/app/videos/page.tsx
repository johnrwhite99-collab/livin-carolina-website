import type { Metadata } from "next";
import { neighborhoods } from "@/lib/neighborhoods";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

export const metadata: Metadata = buildMetadata({
  title: "Video Hub",
  description: "Charleston-area walkthroughs and market updates from the John in Charleston YouTube channel.",
  path: "/videos",
});

// Populate as specific videos get tied to a community — until then, each
// section links out to the channel rather than showing an empty grid.
const videosByNeighborhood: Record<string, { title: string; videoId: string }[]> = {
  nexton: [],
  "cane-bay-plantation": [],
  "carnes-crossroads": [],
  "the-ponds": [],
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-black">Video hub</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">
        Charleston-area walkthroughs and market updates, organized by community. Full library lives
        on the{" "}
        <a href={siteConfig.youtubeChannelUrl} className="font-medium text-brand-gold-dark hover:underline">
          John in Charleston YouTube channel
        </a>
        .
      </p>
      <a
        href={siteConfig.youtubeChannelUrl}
        className="mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-gold-dark"
      >
        Watch on YouTube
      </a>
      <div className="mt-10 space-y-12">
        {neighborhoods.map((n) => {
          const videos = videosByNeighborhood[n.slug] ?? [];
          return (
            <div key={n.slug}>
              <h2 className="text-xl font-semibold text-brand-black">{n.name}</h2>
              {videos.length === 0 ? (
                <p className="mt-2 text-sm text-foreground/50">
                  No videos tied to {n.name} yet &mdash; check the full channel above.
                </p>
              ) : (
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {videos.map((v) => (
                    <div key={v.videoId}>
                      <YouTubeEmbed videoId={v.videoId} title={v.title} />
                      <p className="mt-2 text-sm font-medium text-brand-black">{v.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
