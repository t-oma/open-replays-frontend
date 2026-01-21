import * as z from "zod";
import type { uploadVideoSchema } from "./schema";

export type Replay = {
  title: string;
  filename: string;
  fullFilename: string;
  description: string;
  thumbnail: string;
  uploadedAt: string;
};

export type GetVideosResponse = {
  videos: Replay[];
};

export type UploadVideoResponse = {
  filename: string;
};

export type UploadFormSchema = z.infer<typeof uploadVideoSchema>;
