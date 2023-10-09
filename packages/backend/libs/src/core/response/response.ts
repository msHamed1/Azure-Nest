import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessageKey } from '../decorator/response.decorator';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: responseMessage,
        data: {
          result: data,
        },
      })),
    );
  }
}

export class ResponseModel {
  statusCode: number;
  message: string;
  data: any;
  constructor(statusCode: number, message: string, data: any) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}
