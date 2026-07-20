import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import type { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ok } from "@eduos/shared";
import type { ApiResponse } from "@eduos/types";

@Injectable()
export class ApiResponseInterceptor<TData>
  implements NestInterceptor<TData, ApiResponse<TData>>
{
  intercept(_context: ExecutionContext, next: CallHandler<TData>): Observable<ApiResponse<TData>> {
    return next.handle().pipe(
      map((data): ApiResponse<TData> => {
        if (isApiResponse(data)) {
          return data as ApiResponse<TData>;
        }

        return ok(data);
      }),
    );
  }
}

function isApiResponse<TData>(value: unknown): value is ApiResponse<TData> {
  return Boolean(
    value &&
      typeof value === "object" &&
      "success" in value &&
      typeof (value as { success: unknown }).success === "boolean",
  );
}
