import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

/**
 * Error handler
 */
@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  /**
   * DI method for error catching
   * @param exception         Received error
   * @param host              Actual host
   */
  catch (exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
