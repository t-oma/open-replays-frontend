import { queryOptions } from "@tanstack/react-query";
import { videoKeys, videosManager } from "..";
import type { ListVideosFilters } from "../types";

export function createListVideosQueryOptions(filters: ListVideosFilters) {
  return queryOptions({
    queryKey: videoKeys.list(filters),
    queryFn: () => videosManager.listVideos(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function createGetVideoQueryOptions(id: string) {
  return queryOptions({
    queryKey: videoKeys.detail(id),
    queryFn: () => videosManager.getVideo(id),
    enabled: !!id,
  });
}
