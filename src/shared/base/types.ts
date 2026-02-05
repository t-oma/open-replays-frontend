export type ErrorResponse = {
  error: string;
  statusCode?: number;
  details?: unknown;
};

export type SuccessResponse<T> = {
  data: T;
  message?: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is SuccessResponse<T> {
  return "data" in response;
}

export function isErrorResponse(
  response: ApiResponse<unknown>
): response is ErrorResponse {
  return "error" in response;
}
