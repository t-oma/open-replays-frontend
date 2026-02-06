import {
  API_URL,
  ApiError,
  ClientError,
  createApiError,
  isErrorResponse,
} from "~/shared";
import type { ApiResponse, SuccessResponse } from "~/shared";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<SuccessResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      // Parse response body
      let data: ApiResponse<T>;
      try {
        data = await response.json();
      } catch {
        throw new ClientError(
          "PARSE_ERROR",
          response.statusText || "Failed to parse response"
        );
      }

      // Check if response is not OK (4xx or 5xx)
      if (!response.ok) {
        // Check if it's a structured error response from backend
        if (isErrorResponse(data)) {
          throw createApiError(data, response.status);
        }

        // Fallback for unstructured errors
        throw new ClientError(
          "UNKNOWN_ERROR",
          response.statusText || "An unknown error occurred"
        );
      }

      // Check if successful response contains an error (unexpected but possible)
      if (isErrorResponse(data)) {
        throw createApiError(data, response.status);
      }

      // Return the success response with data and message
      return data as SuccessResponse<T>;
    } catch (error) {
      // Re-throw ApiError as-is
      if (error instanceof ApiError) {
        throw error;
      }

      // Wrap other errors
      if (error instanceof Error) {
        throw new ClientError("NETWORK_ERROR", error.message);
      }

      throw new ClientError("UNKNOWN_ERROR", "An unexpected error occurred");
    }
  }

  async get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async postForm<T>(endpoint: string, formData: FormData) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  }

  async put<T>(endpoint: string, data?: unknown) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string) {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient(API_URL);
