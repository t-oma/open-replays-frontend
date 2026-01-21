import { Link } from "react-router";

import { videosAPI } from "~/shared";
import type { Replay } from "~/shared";

type VideoItemProps = {
  replay: Replay;
};

function VideoItem({ replay }: VideoItemProps) {
  return (
    <Link
      to={`/replays/${replay.filename}`}
      className="bg-muted inline-flex flex-col gap-2 rounded-md p-2"
    >
      <img
        src={videosAPI.url(replay.thumbnail)}
        alt={replay.title}
        className="rounded"
      />
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
