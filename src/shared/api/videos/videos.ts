import { apiClient } from "~/shared";
import type {
  GetVideosResponse,
  UploadFormSchema,
  UploadVideoResponse,
} from "./types";

async function getVideos() {
  return apiClient.get<GetVideosResponse>("/api/v1/videos");
}

async function uploadVideo({ title, file }: UploadFormSchema) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("video", file);

  return apiClient.postForm<UploadVideoResponse>("/api/v1/upload", formData);
}

export { getVideos, uploadVideo };
