import { NestFactory } from '@nestjs/core';
import { EventHubProducerModule } from './event-hub-producer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventHubProducerModule,{
      transport:Transport.TCP,
      options:{
        port:3002
      }
    }
  
  );
 
  await app.listen();
}
bootstrap();
