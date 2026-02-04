import * as z from "zod";
import type { Prettify } from "~/shared";
import type { uploadVideoSchema } from "./schema";

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

export type ListVideosResponse = Prettify<VideoSummary>[];

export type GetVideoResponse = VideoDetails;

export type UploadVideoResponse = {
  id: string;
};

export type DeleteVideoResponse = {
  id: string;
};

export type UploadFormSchema = z.infer<typeof uploadVideoSchema>;
