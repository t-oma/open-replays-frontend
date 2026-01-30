import { Link } from "react-router";

import type { VideoSummary } from "~/shared";

type VideoItemProps = {
  replay: VideoSummary;
};

function VideoItem({ replay }: VideoItemProps) {
  return (
    <Link
      to={`/replays/${replay.id}`}
      className="bg-muted inline-flex flex-col gap-2 rounded-md p-2"
    >
      <img src={replay.thumbnailUrl} alt={replay.title} className="rounded" />
      <div className="flex items-center justify-between">
        <h2 className="text-foreground">{replay.title}</h2>
        <span className="text-muted-foreground text-xs">
          {new Date(replay.uploadedAt).toLocaleString()}
        </span>
      </div>
    </Link>
  );
}

export { VideoItem };
