import type { Metadata } from "next";
import { neighborhoods } from "@/lib/neighborhoods";

export const metadata: Metadata = {
  title: "Video Hub",
  description: "Neighborhood walkthroughs and market updates from the YouTube channel.",
};

// Placeholder video hub, organized by neighborhood. Replace the `videoId`
// values with real YouTube video IDs as they're published, and add entries
// for topic-based playlists (market updates, buyer tips, etc.) as needed.
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
        Neighborhood walkthroughs and market updates from the channel, organized by community.
      </p>
      <div className="mt-10 space-y-12">
        {neighborhoods.map((n) => {
          const videos = videosByNeighborhood[n.slug] ?? [];
          return (
            <div key={n.slug}>
              <h2 className="text-xl font-semibold text-brand-black">{n.name}</h2>
              {videos.length === 0 ? (
                <p className="mt-2 text-sm text-foreground/50">
                  Videos coming soon &mdash; embed IDs go in{" "}
                  <code className="rounded bg-black/5 px-1.5 py-0.5">
                    src/app/videos/page.tsx
                  </code>
                  .
                </p>
              ) : (
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {videos.map((v) => (
                    <div key={v.videoId} className="overflow-hidden rounded-xl border border-border">
                      <div className="aspect-video">
                        <iframe
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${v.videoId}`}
                          title={v.title}
                          allowFullScreen
                        />
                      </div>
                      <p className="p-3 text-sm font-medium text-brand-black">{v.title}</p>
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
