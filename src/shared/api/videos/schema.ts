import * as z from "zod";
import { MEGABYTE } from "~/shared";

export const uploadVideoSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MEGABYTE * 10, {
      message: "File size must be less than 10MB",
    })
    .refine((file) => file.type.startsWith("video/"), {
      message: "Only video files are allowed",
    }),
});
