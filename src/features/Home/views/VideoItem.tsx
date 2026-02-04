import { Link } from "react-router";

import { Badge, formatTime } from "~/shared";
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
      <div className="relative rounded bg-black">
        <img
          src={replay.thumbnailUrl}
          alt={replay.title}
          className="aspect-video w-full rounded object-contain"
        />

        <Badge
          variant="secondary"
          className="bg-secondary/80 absolute right-2 bottom-2 px-4"
        >
          {formatTime(replay.duration)}
        </Badge>
      </div>

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
