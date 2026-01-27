import { use } from "react";

import { VideoPlayerContext } from "..";

function useVideoPlayerContext() {
  const ctx = use(VideoPlayerContext);
  if (!ctx) {
    throw new Error("useVideoPlayerContext must be used within VideoPlayer");
  }
  return ctx;
}

export { useVideoPlayerContext };
