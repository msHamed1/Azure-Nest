import { NestFactory ,Reflector  } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { TransformInterceptor } from 'libs/src/core/response/response';
import { HttpExceptionFilter } from 'libs/src/core/exception/exception.handler';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {

    cors: true
  });

  dotenv.config();
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
