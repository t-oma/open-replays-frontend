import { videoKeys } from "./query-keys";
import { videosAPI } from "./videos";

export const createListVideosQueryOptions = (
  filters: Record<string, unknown>
) => {
  return {
    queryKey: videoKeys.list(filters),
    queryFn: videosAPI.getAll,
  };
};
