import { API_URL, apiClient } from "~/shared";
import type {
  GetVideosResponse,
  UploadFormSchema,
  UploadVideoResponse,
} from "./types";

export const videosAPI = {
  url: (path: string) => `${API_URL}${path}`,

  getAll: () => apiClient.get<GetVideosResponse>("/api/v1/videos"),

  list: (filters: Record<string, string>) =>
    apiClient.get<GetVideosResponse>(
      `/api/v1/videos?${new URLSearchParams(filters)}`
    ),

  upload: ({ title, file, thumbnail }: UploadFormSchema) => {
    const formData = new FormData();

    formData.append("video", file);
    formData.append("title", title);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    return apiClient.postForm<UploadVideoResponse>(
      "/api/v1/videos/upload",
      formData
    );
  },

  delete: (filename: string) => apiClient.delete(`/api/v1/videos/${filename}`),

  getWatchUrl: (filename: string) =>
    videosAPI.url(`/api/v1/videos/${filename}/watch`),
};
