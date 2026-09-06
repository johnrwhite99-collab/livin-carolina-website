export function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="aspect-video">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
        />
      </div>
    </div>
  );
}
