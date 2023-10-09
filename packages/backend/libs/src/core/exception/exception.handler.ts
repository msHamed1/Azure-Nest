import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * This is Middleware to manage exception
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // get response of request
    const body = exception.getResponse();

    if (body['message'] != null) {
      body['error'] = { message: body['message'] };
    }

    response.status(status).json({
      statusCode: status,
      data: null,
      timestamp: new Date().toISOString(),
      message: Array.isArray(body['error']['message'])
        ? body['error']['message']
        : [body['error']['message']],
    });
  }
}

/// This function to handle exception by status with message

export function exceptionHandler(error: any): any {

  if (error.status == 401 || error.response?.status == 401) {
    throw new UnauthorizedException(error.response?.data);
  } else if (error.status == 404 || error.response?.status == 404) {
    throw new NotFoundException(error.response?.data);
  } else if (error.status == 400 || error.response?.status == 400) {
    throw new BadRequestException(error.response?.data);
  }

  throw new InternalServerErrorException(error.response?.data);
}
