import { apiClient } from "~/shared";
import type { PaginatedData } from "~/shared/base/response";
import type {
  DeleteVideoData,
  ListVideosFilters,
  UploadVideoData,
  VideoDetails,
  VideoSummary,
} from "../types";

/**
 * VideosRepository - interacts with the data source
 * No business rules, no error handling - just raw API calls
 */
export class VideosRepository {
  async list(filters: Record<string, string>) {
    return apiClient.get<PaginatedData<VideoSummary>>(
      `/api/v1/videos?${new URLSearchParams(filters)}`
    );
  }

  async getById(id: string) {
    return apiClient.get<VideoDetails>(`/api/v1/videos/${id}`);
  }

  async upload(formData: FormData) {
    return apiClient.postForm<UploadVideoData>(
      "/api/v1/videos/upload",
      formData
    );
  }

  async delete(id: string) {
    return apiClient.delete<DeleteVideoData>(`/api/v1/videos/${id}`);
  }
}

export const videosRepository = new VideosRepository();
