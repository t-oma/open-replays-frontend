import { API_URL } from "../constants";
import type {
  GetVideosResponse,
  UploadFormSchema,
  UploadVideoResponse,
} from "../types";

async function getVideos() {
  const response = await fetch(`${API_URL}/api/v1/videos`);

  return response.json() as Promise<GetVideosResponse>;
}

async function uploadVideo({ title, file }: UploadFormSchema) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("video", file);

  const response = await fetch(`${API_URL}/api/v1/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json() as Promise<UploadVideoResponse>;
}

export { getVideos, uploadVideo };
