import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface ValidationErrorResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

/**
 * Global exception filter to handle all exceptions and format error responses
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Determine HTTP status code
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract error message
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // Get detailed error response if available
    const errorResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    // Extract error details from response
    const errorDetails =
      typeof errorResponse === 'object' && errorResponse !== null
        ? (errorResponse as ValidationErrorResponse).message || message
        : message;

    // Send formatted error response
    response.status(status).json({
      status: 'Error',
      error: errorDetails,
    });
  }
}

