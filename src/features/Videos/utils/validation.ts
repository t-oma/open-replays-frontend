import * as z from "zod";
import { MEGABYTE } from "~/shared";

export const UPLOAD_RULES = {
  title: {
    min: 5,
    max: 32,
  },
  description: {
    max: 100,
  },
  thumbnail: {
    max: MEGABYTE * 2,
    type: "image/",
  },
  file: {
    max: MEGABYTE * 100,
    type: "video/",
  },
} as const;

export const uploadVideoSchema = z.object({
  title: z
    .string()
    .min(UPLOAD_RULES.title.min, "Title must be at least 5 characters.")
    .max(UPLOAD_RULES.title.max, "Title must be at most 32 characters.")
    .nonoptional(),
  description: z
    .string()
    .max(
      UPLOAD_RULES.description.max,
      "Description must be at most 100 characters."
    )
    .optional(),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size <= UPLOAD_RULES.thumbnail.max, {
      message: "File size must be less than 2MB",
    })
    .refine((file) => file.type.startsWith(UPLOAD_RULES.thumbnail.type), {
      message: "Only image files are allowed",
    })
    .optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= UPLOAD_RULES.file.max, {
      message: "File size must be less than 10MB",
    })
    .refine((file) => file.type.startsWith(UPLOAD_RULES.file.type), {
      message: "Only video files are allowed",
    })
    .nonoptional(),
});
