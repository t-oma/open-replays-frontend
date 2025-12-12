import * as z from "zod";
import type { uploadVideoSchema } from "./schema";

export type GetVideosResponse = {
  videos: string[];
};

export type UploadVideoResponse = {
  message: string;
  filename: string;
};

export type UploadFormSchema = z.infer<typeof uploadVideoSchema>;
