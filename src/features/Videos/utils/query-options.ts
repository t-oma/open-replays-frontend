import { queryOptions } from "@tanstack/react-query";
import { videoKeys, videosManager } from "..";
import type { VideoFilters } from "../types";

export function createListVideosQueryOptions(filters: VideoFilters) {
  return queryOptions({
    queryKey: videoKeys.list(filters),
    queryFn: () => videosManager.listVideos(filters),
  });
}

export function createGetVideoQueryOptions(id: string) {
  return queryOptions({
    queryKey: videoKeys.detail(id),
    queryFn: () => videosManager.getVideo(id),
    enabled: !!id,
  });
}
