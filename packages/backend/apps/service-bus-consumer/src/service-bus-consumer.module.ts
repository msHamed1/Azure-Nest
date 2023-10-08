import { Module } from '@nestjs/common';
import { ServiceBusConsumerController } from './service-bus-consumer.controller';
import { IphoneQueueConsumerService } from './Iphone-consumer.service';
import { AzureServiceBusModule } from 'nestjs-azure-service-bus';
import { SamsungQueueConsumerService } from './samsung-consumer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileServices } from './mobile.service';
import { MobileSchema } from 'libs/src/Entity/Mobile.schema';
import * as dotenv from 'dotenv';
import { LoggerModule } from 'libs/src/logger/loggerFactory';
dotenv.config();
@Module({
  imports: [
   LoggerModule,
    AzureServiceBusModule.forRoot({
      connectionString:process.env.EVENT_BUS_SERVICE
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: 'Mobile', schema: MobileSchema }])
  ],
  controllers: [ServiceBusConsumerController],
  providers: [IphoneQueueConsumerService ,SamsungQueueConsumerService,MobileServices],
})
export class ServiceBusConsumerModule {}
