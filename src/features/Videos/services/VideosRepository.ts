import { apiClient } from "~/shared";
import type { SuccessResponse } from "~/shared";
import type {
  DeleteVideoData,
  UploadVideoData,
  VideoDetails,
  VideoFilters,
  VideoSummary,
} from "../types";

/**
 * VideosRepository - interacts with the data source
 * No business rules, no error handling - just raw API calls
 */
export class VideosRepository {
  async list(filters: VideoFilters): Promise<SuccessResponse<VideoSummary[]>> {
    return apiClient.get<VideoSummary[]>(
      `/api/v1/videos?${new URLSearchParams(filters)}`
    );
  }

  async getById(id: string): Promise<SuccessResponse<VideoDetails>> {
    return apiClient.get<VideoDetails>(`/api/v1/videos/${id}`);
  }

  async upload(formData: FormData): Promise<SuccessResponse<UploadVideoData>> {
    return apiClient.postForm<UploadVideoData>(
      "/api/v1/videos/upload",
      formData
    );
  }

  async delete(id: string): Promise<SuccessResponse<DeleteVideoData>> {
    return apiClient.delete<DeleteVideoData>(`/api/v1/videos/${id}`);
  }
}

export const videosRepository = new VideosRepository();
