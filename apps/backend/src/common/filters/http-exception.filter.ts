import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { Response } from "express";
import { fail } from "@eduos/shared";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : "Unexpected server error";

    response.status(status).json(
      fail(message, [
        {
          code: status === HttpStatus.INTERNAL_SERVER_ERROR ? "INTERNAL_SERVER_ERROR" : "REQUEST_FAILED",
          message,
        },
      ]),
    );
  }
}
