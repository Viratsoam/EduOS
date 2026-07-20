import type { ApiErrorItem, ApiErrorResponse, ApiMeta, ApiSuccessResponse } from "@eduos/types";

export function ok<TData>(
  data: TData,
  message = "Operation completed successfully",
  meta?: ApiMeta,
): ApiSuccessResponse<TData> {
  return {
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  };
}

export function fail(message: string, errors: ApiErrorItem[] = []): ApiErrorResponse {
  return {
    success: false,
    message,
    errors,
  };
}
