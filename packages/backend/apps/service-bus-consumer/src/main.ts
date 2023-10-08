import { NestFactory } from '@nestjs/core';
import { ServiceBusConsumerModule } from './service-bus-consumer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ServiceBusConsumerModule,{
    transport:Transport.TCP,
    options:{
      port:3004
    }
  });

  await app.listen();
}
bootstrap();
