export type ValidationTag =
  | "required"
  | "min_length"
  | "max_length"
  | "min_file_size"
  | "max_file_size"
  | "min_int_size"
  | "max_int_size"
  | "invalid_file_format";

export type ValidationErrorDetails = {
  field: string;
  message?: string;
  tag: ValidationTag;
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
