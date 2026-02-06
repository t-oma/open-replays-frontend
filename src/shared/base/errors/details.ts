/**
 * Details types for each error category
 */
export type ValidationErrorDetails = {
  field?: string;
  value?: unknown;
  constraint?: string;
};

export type FileErrorDetails = {
  filename: string;
  size?: number;
  maxSize?: number;
  allowedTypes?: string[];
  actualType?: string;
};

export type VideoErrorDetails = {
  videoId?: string;
  filename?: string;
};

export type SystemErrorDetails = {
  trace?: string;
  component?: string;
};
