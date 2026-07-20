export interface ApiMeta {
  cursor?: string;
  hasMore?: boolean;
  limit?: number;
  requestId?: string;
  total?: number;
}

export interface ApiErrorItem {
  code: string;
  field?: string;
  message: string;
}

export interface ApiSuccessResponse<TData> {
  success: true;
  message: string;
  data: TData;
  meta?: ApiMeta;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: ApiErrorItem[];
}

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;

export interface CursorPaginationQuery {
  cursor?: string;
  limit?: number;
}
