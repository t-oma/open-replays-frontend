import * as z from "zod";
import type { Prettify } from "~/shared/types";
import type { uploadVideoSchema } from "./schema";

export type Replay = {
  title: string;
  filename: string;
  uploadedAt: string;
};

export type GetVideosSuccess = {
  videos: Replay[];
};

export type GetVideosResponse = Prettify<GetVideosSuccess>;

export type UploadVideoResponse = Prettify<{
  filename: string;
}>;

export type UploadFormSchema = z.infer<typeof uploadVideoSchema>;
