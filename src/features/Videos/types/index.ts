import type * as z from "zod";
import type { PaginatedData } from "~/shared/base/response";
import type { uploadVideoSchema } from "../utils/validation";

export type VideoSummary = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  uploadedAt: string;
};

export type VideoDetails = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploadedAt: string;
  duration: number;
  views: number;
  author?: unknown;
  comments: unknown[];
};

export type ListVideosData = PaginatedData<VideoSummary>;

export type GetVideoData = VideoDetails;

export type UploadVideoData = {
  id: string;
};

export type DeleteVideoData = {
  id: string;
};

export type UploadFormSchema = z.infer<typeof uploadVideoSchema>;

export type ListVideosFilters = {
  page?: number;
  pageSize?: number;
};
