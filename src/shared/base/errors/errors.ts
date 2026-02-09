import { ERROR_CODES } from "~/shared";
import type {
  ClientErrorCode,
  ErrorCode,
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
 * Base API Error class
 */
export abstract class ApiError extends Error {
  abstract code: ErrorCode;
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.details = details;

    // Maintain proper stack trace (only in V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Check if error is in specific category
   */
  isCategory(category: keyof typeof ERROR_CODES): boolean {
    return ERROR_CODES[category].includes(this.code as never);
  }
}

/**
 * Validation Error
 */
export class ValidationError extends ApiError {
  code: ValidationErrorCode;
  message: string;
  status: number;
  details?: ValidationErrorDetails;

  constructor(
    code: ValidationErrorCode,
    message: string,
    status: number,
    details?: ValidationErrorDetails
  ) {
    super(message, status, details);
    this.code = code;
    this.message = message;
    this.status = status;
    this.details = details;
  }
}

/**
 * File Error
 */
export class FileError extends ApiError {
  code: FileErrorCode;
  details?: FileErrorDetails;

  constructor(
    code: FileErrorCode,
    message: string,
    status: number,
    details?: FileErrorDetails
  ) {
    super(message, status, details);
    this.code = code;
    this.message = message;
    this.status = status;
    this.details = details;
  }
}

/**
 * Video Error
 */
export class VideoError extends ApiError {
  code: VideoErrorCode;
  message: string;
  status: number;
  details?: VideoErrorDetails;

  constructor(
    code: VideoErrorCode,
    message: string,
    status: number,
    details?: VideoErrorDetails
  ) {
    super(message, status, details);
    this.code = code;
    this.message = message;
    this.status = status;
    this.details = details;
  }
}

/**
 * System Error
 */
export class SystemError extends ApiError {
  code: SystemErrorCode;
  details?: SystemErrorDetails;

  constructor(
    code: SystemErrorCode,
    message: string,
    status: number,
    details?: SystemErrorDetails
  ) {
    super(message, status, details);
    this.code = code;
    this.details = details;
  }
}

/**
 * Client Error (network, parsing, etc)
 */
export class ClientError extends ApiError {
  code: ClientErrorCode;

  constructor(code: ClientErrorCode, message: string, details?: unknown) {
    super(message, 0, details);
    this.code = code;
  }
}
