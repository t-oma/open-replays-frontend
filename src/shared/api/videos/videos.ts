import { apiClient } from "~/shared";
import type {
  GetVideoResponse,
  ListVideosResponse,
  UploadFormSchema,
  UploadVideoResponse,
} from "./types";

async function getVideoById(id: string) {
  return apiClient.get<GetVideoResponse>(`/api/v1/videos/${id}`);
}

async function listVideos(filters: Record<string, string>) {
  return apiClient.get<ListVideosResponse>(
    `/api/v1/videos?${new URLSearchParams(filters)}`
  );
}

async function uploadVideo({ title, file, thumbnail }: UploadFormSchema) {
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
}

async function deleteVideo(id: string) {
  return apiClient.delete(`/api/v1/videos/${id}`);
}

export { getVideoById, listVideos, uploadVideo, deleteVideo };
