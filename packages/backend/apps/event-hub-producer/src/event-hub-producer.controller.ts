import { Controller, Inject } from '@nestjs/common';
import { EventHubProducerService } from './event-hub-producer.service';
import { MessagePattern } from '@nestjs/microservices';
import { Logger } from 'winston';

@Controller()
export class EventHubProducerController {
  constructor(
    private readonly producerService: EventHubProducerService,
    @Inject('winston') private readonly logger: Logger 
    ) {}

  @MessagePattern({ cmd: 'DATA_GENERATED' })
  produceData(data: any): any {
    this.logger.info("Micorservice received data From DataGenerator")
    this.producerService.sendDataToEventHub(data)
  }
}
