import { API_URL, apiClient } from "~/shared";
import type {
  GetVideosResponse,
  UploadFormSchema,
  UploadVideoResponse,
} from "./types";

export const videosAPI = {
  getAll: () => apiClient.get<GetVideosResponse>("/api/v1/videos"),

  list: (filters: Record<string, string>) =>
    apiClient.get<GetVideosResponse>(
      `/api/v1/videos?${new URLSearchParams(filters)}`
    ),

  upload: ({ title, file, thumbnail }: UploadFormSchema) => {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);

    return apiClient.postForm<UploadVideoResponse>(
      "/api/v1/videos/upload",
      formData
    );
  },

  delete: (filename: string) => apiClient.delete(`/api/v1/videos/${filename}`),

  getWatchUrl: (filename: string) =>
    `${API_URL}/api/v1/videos/${filename}/watch`,
};
