import * as z from "zod";
import { MEGABYTE } from "~/shared";

type GetVideosResponse = {
  videos: string[];
};

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MEGABYTE * 10, {
      message: "File size must be less than 10MB",
    })
    .refine((file) => file.type.startsWith("video/"), {
      message: "Only video files are allowed",
    }),
});

type UploadFormSchema = z.infer<typeof formSchema>;

type UploadVideoResponse = {
  message: string;
  filename: string;
};

export { formSchema };
export type { GetVideosResponse, UploadFormSchema, UploadVideoResponse };
