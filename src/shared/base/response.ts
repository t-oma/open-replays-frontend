import type {
  ClientErrorCode,
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
 * Error Response types
 */
export type ErrorResponse =
  | {
      code: ValidationErrorCode;
      message: string;
      details?: ValidationErrorDetails;
    }
  | {
      code: FileErrorCode;
      message: string;
      details?: FileErrorDetails;
    }
  | {
      code: VideoErrorCode;
      message: string;
      details?: VideoErrorDetails;
    }
  | {
      code: SystemErrorCode;
      message: string;
      details?: SystemErrorDetails;
    }
  | {
      code: ClientErrorCode;
      message: string;
      details?: unknown;
    };

export type SuccessResponse<T> = {
  data: T;
  message?: string;
};

export type PaginationInfo = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PaginatedData<T> = {
  items: T[];
  pagination: PaginationInfo;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Type guards
 */
export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is SuccessResponse<T> {
  return "data" in response && response.data !== undefined;
}

export function isErrorResponse(
  response: ApiResponse<unknown>
): response is ErrorResponse {
  return "code" in response && "message" in response;
}
