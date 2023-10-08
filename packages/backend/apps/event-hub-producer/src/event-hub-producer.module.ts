import { Module } from '@nestjs/common';
import { EventHubProducerController } from './event-hub-producer.controller';
import { EventHubProducerService } from './event-hub-producer.service';
import { LoggerModule } from 'libs/src/logger/loggerFactory';

@Module({
  imports: [LoggerModule],
  controllers: [EventHubProducerController],
  providers: [EventHubProducerService],
})
export class EventHubProducerModule {}
