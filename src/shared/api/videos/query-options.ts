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

// export const createGetVideoQueryOptions = (filename: string) => {
//   return {
//     queryKey: videoKeys.get(filename),
//     queryFn: videosAPI.get,
//   };
// };
