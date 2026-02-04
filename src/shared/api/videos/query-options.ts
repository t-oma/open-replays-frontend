import { apiClient } from "~/shared";
import { videoKeys } from "./query-keys";
import type { GetVideoResponse, ListVideosResponse } from "~/shared";

export const createListVideosQueryOptions = (
  filters: Record<string, string>
) => {
  return {
    queryKey: videoKeys.list(filters),
    queryFn: async () => {
      return apiClient.get<ListVideosResponse>(
        `/api/v1/videos?${new URLSearchParams(filters)}`
      );
    },
  };
};

export const createGetVideoQueryOptions = (id: string) => {
  return {
    queryKey: videoKeys.get(id),
    queryFn: async () => {
      return apiClient.get<GetVideoResponse>(`/api/v1/videos/${id}`);
    },
  };
};

export const createDeleteVideoQueryOptions = (id: string) => {
  return {
    queryKey: videoKeys.delete(id),
    queryFn: async () => {
      return apiClient.delete(`/api/v1/videos/${id}`);
    },
  };
};
