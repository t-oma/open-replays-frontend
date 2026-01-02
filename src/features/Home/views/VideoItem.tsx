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
      <video
        src={videosAPI.getWatchUrl(replay.filename)}
        muted
        className="rounded"
      >
        <p>
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that supports HTML5 video
        </p>
      </video>
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
