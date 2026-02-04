export type ErrorResponse = {
  error: string;
};

export type SuccessResponse<T> = {
  data: T;
  message?: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export function isSuccessResponse<T>(
  response: SuccessResponse<T> | ErrorResponse
): response is SuccessResponse<T> {
  return "data" in response;
}
