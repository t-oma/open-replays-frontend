import { apiClient, videoKeys } from "~/shared";
import type { GetVideoData, ListVideosData } from "~/shared";

export const createListVideosQueryOptions = (
  filters: Record<string, string>
) => {
  return {
    queryKey: videoKeys.list(filters),
    queryFn: async () => {
      return apiClient.get<ListVideosData>(
        `/api/v1/videos?${new URLSearchParams(filters)}`
      );
    },
  };
};

export const createGetVideoQueryOptions = (id: string) => {
  return {
    queryKey: videoKeys.detail(id),
    queryFn: async () => {
      return apiClient.get<GetVideoData>(`/api/v1/videos/${id}`);
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
