import { videosRepository, VideosRepository } from "./VideosRepository";
import type { SuccessResponse } from "~/shared";
import type {
  DeleteVideoData,
  UploadFormSchema,
  UploadVideoData,
  VideoDetails,
  VideoFilters,
  VideoSummary,
} from "../types";

/**
 * VideosManager - mediates between View Layer and data source
 * Handles business rules, transformations, and coordinates repository calls
 */
export class VideosManager {
  constructor(private repository: VideosRepository) {}

  /**
   * List videos with filters
   */
  async listVideos(
    filters: VideoFilters
  ): Promise<SuccessResponse<VideoSummary[]>> {
    return this.repository.list(filters);
  }

  /**
   * Get single video by ID
   */
  async getVideo(id: string): Promise<SuccessResponse<VideoDetails>> {
    return this.repository.getById(id);
  }

  /**
   * Upload video with form data
   */
  async uploadVideo(
    data: UploadFormSchema
  ): Promise<SuccessResponse<UploadVideoData>> {
    const formData = new FormData();
    formData.append("video", data.file);
    formData.append("title", data.title);

    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    if (data.description) {
      formData.append("description", data.description);
    }

    return this.repository.upload(formData);
  }

  /**
   * Delete video by ID
   */
  async deleteVideo(id: string): Promise<SuccessResponse<DeleteVideoData>> {
    return this.repository.delete(id);
  }
}

// Factory function to create manager instance
export function createVideosManager(
  repository: VideosRepository
): VideosManager {
  return new VideosManager(repository);
}

export const videosManager = new VideosManager(videosRepository);
