import * as z from "zod";
import type { Prettify, uploadVideoSchema } from "~/shared";

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

export type ListVideosData = Prettify<VideoSummary>[];

export type GetVideoData = VideoDetails;

export type UploadVideoData = {
  id: string;
};

export type DeleteVideoData = {
  id: string;
};

export type UploadFormSchema = z.infer<typeof uploadVideoSchema>;
