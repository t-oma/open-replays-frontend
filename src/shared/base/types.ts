export type ApiResponse<T> =
  | {
      success: true;
      data?: T;
      message?: string;
      code?: number;
    }
  | {
      success: false;
      error?: string;
      code?: number;
    };
