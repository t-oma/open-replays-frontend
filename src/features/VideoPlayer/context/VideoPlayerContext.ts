import { createContext } from "react";

import type { VideoPlayerContextValue } from "..";

const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

export { VideoPlayerContext };
