import { NestFactory } from '@nestjs/core';
import { EventHubConsumerModule } from './event-hub-consumer.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventHubConsumerModule,{
      transport:Transport.TCP,
      options:{
        port:3001
      }
    }
  
  );
 
  await app.listen();
}
bootstrap();
