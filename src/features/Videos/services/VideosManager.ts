import { videosRepository, VideosRepository } from "./VideosRepository";
import type { ListVideosFilters, UploadFormSchema } from "../types";

/**
 * VideosManager - mediates between View Layer and data source
 * Handles business rules, transformations, and coordinates repository calls
 */
export class VideosManager {
  constructor(private repository: VideosRepository) {}

  /**
   * List videos with filters
   */
  async listVideos(filters: ListVideosFilters) {
    const filtersRecord = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      },
      {} as Record<string, string>
    );

    return this.repository.list(filtersRecord);
  }

  /**
   * Get single video by ID
   */
  async getVideo(id: string) {
    return this.repository.getById(id);
  }

  /**
   * Upload video with form data
   */
  async uploadVideo(data: UploadFormSchema) {
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
  async deleteVideo(id: string) {
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
