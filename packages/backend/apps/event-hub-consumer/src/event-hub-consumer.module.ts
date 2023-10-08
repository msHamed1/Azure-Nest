import { Module } from '@nestjs/common';
import { EventHubConsumerService } from './event-hub-consumer.service';
import { IphoneQueue, SamsungQueue } from './event-hub-consumer.gateway';
import { LoggerModule } from 'libs/src/logger/loggerFactory';

@Module({
  imports: [LoggerModule],
  controllers: [],
  providers: [EventHubConsumerService ,SamsungQueue,IphoneQueue],
  
})
export class EventHubConsumerModule {}
