import { videoKeys } from "./query-keys";
import { getVideoById, listVideos } from "./videos";

export const createListVideosQueryOptions = (
  filters: Record<string, string>
) => {
  return {
    queryKey: videoKeys.list(filters),
    queryFn: () => listVideos(filters),
  };
};

export const createGetVideoQueryOptions = (id: string) => {
  return {
    queryKey: videoKeys.get(id),
    queryFn: () => getVideoById(id),
  };
};
