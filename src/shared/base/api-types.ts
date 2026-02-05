/**
 * API Error Response structure from backend
 * Matches Go struct: type ErrorResponse struct {
 *   Code    string `json:"code"`
 *   Message string `json:"message"`
 *   Details any    `json:"details,omitempty"`
 * }
 */
export type ErrorResponse = {
  code: string;
  message: string;
  details?: unknown;
};

export type SuccessResponse<T> = {
  data: T;
  message?: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Custom API Error class that wraps backend error response
 */
export class ApiError extends Error {
  code: string;
  status: number;
  details?: unknown;

  constructor(errorResponse: ErrorResponse, status: number) {
    super(errorResponse.message);
    this.name = "ApiError";
    this.code = errorResponse.code;
    this.status = status;
    this.details = errorResponse.details;
  }
}

/**
 * Type guard to check if response is a success response
 */
export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is SuccessResponse<T> {
  return "data" in response && response.data !== undefined;
}

/**
 * Type guard to check if response is an error response
 */
export function isErrorResponse(
  response: ApiResponse<unknown>
): response is ErrorResponse {
  return "code" in response && "message" in response;
}

/**
 * Type guard to check if error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Common error codes that backend might return
 */
export type ErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_REQUEST"
  | "MISSING_FIELD"
  | "INVALID_FORMAT"
  | "FILE_TOO_LARGE"
  | "INVALID_FILE_TYPE"
  | "UPLOAD_FAILED"
  | "FILE_NOT_FOUND"
  | "VIDEO_NOT_FOUND"
  | "VIDEO_ALREADY_EXISTS"
  | "DELETE_FAILED"
  | "INTERNAL_ERROR"
  | "DATABASE_ERROR"
  | "STORAGE_ERROR";

/**
 * Get user-friendly error message based on error code and status
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    // Use backend message if available
    if (error.message) {
      return error.message;
    }

    // Fallback messages based on status code
    switch (error.status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Please sign in to continue.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "This action conflicts with the current state.";
      case 422:
        return "Validation failed. Please check your input.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Something went wrong on our end. Please try again.";
      default:
        return "An unexpected error occurred.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export function isNotFoundError(error: unknown): boolean {
  return isApiError(error) && error.status === 404;
}

export function isValidationError(error: unknown): boolean {
  return isApiError(error) && (error.status === 400 || error.status === 422);
}
