import {
  ApiError,
  ClientError,
  ERROR_CODES,
  FileError,
  SystemError,
  ValidationError,
  VideoError,
} from "~/shared";
import type {
  ClientErrorCode,
  ErrorResponse,
  FileErrorCode,
  FileErrorDetails,
  SystemErrorCode,
  SystemErrorDetails,
  ValidationErrorCode,
  ValidationErrorDetails,
  VideoErrorCode,
  VideoErrorDetails,
} from "~/shared";

/**
 * Factory function to create appropriate error based on error code
 */
export function createApiError(
  errorResponse: ErrorResponse,
  status: number
): ApiError {
  const { code, message, details } = errorResponse;

  // Check which category the code belongs to
  if (ERROR_CODES.validation.includes(code as ValidationErrorCode)) {
    return new ValidationError(
      code as ValidationErrorCode,
      message,
      status,
      details as ValidationErrorDetails
    );
  }

  if (ERROR_CODES.file.includes(code as FileErrorCode)) {
    return new FileError(
      code as FileErrorCode,
      message,
      status,
      details as FileErrorDetails
    );
  }

  if (ERROR_CODES.video.includes(code as VideoErrorCode)) {
    return new VideoError(
      code as VideoErrorCode,
      message,
      status,
      details as VideoErrorDetails
    );
  }

  if (ERROR_CODES.system.includes(code as SystemErrorCode)) {
    return new SystemError(
      code as SystemErrorCode,
      message,
      status,
      details as SystemErrorDetails
    );
  }

  if (ERROR_CODES.client.includes(code as ClientErrorCode)) {
    return new ClientError(code as ClientErrorCode, message, details);
  }

  // Fallback to generic client error
  return new ClientError("UNKNOWN_ERROR", message, details);
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isFileError(error: unknown): error is FileError {
  return error instanceof FileError;
}

export function isVideoError(error: unknown): error is VideoError {
  return error instanceof VideoError;
}

export function isSystemError(error: unknown): error is SystemError {
  return error instanceof SystemError;
}

export function isClientError(error: unknown): error is ClientError {
  return error instanceof ClientError;
}
