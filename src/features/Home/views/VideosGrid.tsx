import { VideoItem } from "./VideoItem";
import type { Replay } from "~/shared";

type VideosGridProps = {
  videos?: Replay[];
};

function VideosGrid({ videos }: VideosGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {videos?.map((replay) => (
        <VideoItem key={replay.title} replay={replay} />
      ))}
    </div>
  );
}

export { VideosGrid };
