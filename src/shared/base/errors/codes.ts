import type { Prettify } from "~/shared";

/**
 * Error code definitions with categories
 */
export const ERROR_CODES = {
  validation: [
    "VALIDATION_ERROR",
    "INVALID_REQUEST",
    "MISSING_FIELD",
    "INVALID_FORMAT",
  ] as const,

  file: [
    "FILE_TOO_LARGE",
    "INVALID_FILE_TYPE",
    "UPLOAD_FAILED",
    "FILE_NOT_FOUND",
  ] as const,

  video: ["VIDEO_NOT_FOUND", "VIDEO_ALREADY_EXISTS", "DELETE_FAILED"] as const,

  system: ["INTERNAL_ERROR", "DATABASE_ERROR", "STORAGE_ERROR"] as const,

  client: ["PARSE_ERROR", "UNKNOWN_ERROR", "NETWORK_ERROR"] as const,
} as const;

// Extract types from const
type ExtractCodes<T> = T extends readonly (infer U)[] ? U : never;

export type ValidationErrorCode = ExtractCodes<typeof ERROR_CODES.validation>;
export type FileErrorCode = ExtractCodes<typeof ERROR_CODES.file>;
export type VideoErrorCode = ExtractCodes<typeof ERROR_CODES.video>;
export type SystemErrorCode = ExtractCodes<typeof ERROR_CODES.system>;
export type ClientErrorCode = ExtractCodes<typeof ERROR_CODES.client>;

export type ApiErrorCode =
  | ValidationErrorCode
  | FileErrorCode
  | VideoErrorCode
  | SystemErrorCode;

export type ErrorCode = Prettify<ApiErrorCode | ClientErrorCode>;
