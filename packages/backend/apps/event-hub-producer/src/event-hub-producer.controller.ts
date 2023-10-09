import { Controller, Inject } from '@nestjs/common';
import { EventHubProducerService } from './event-hub-producer.service';
import { MessagePattern } from '@nestjs/microservices';
import { Logger } from 'winston';
import { transformLogMessage } from 'libs/src';

@Controller()
export class EventHubProducerController {
  constructor(
    private readonly producerService: EventHubProducerService,
    @Inject('winston') private readonly logger: Logger 
    ) {}

  @MessagePattern({ cmd: 'DATA_GENERATED' })
  produceData(data: any): any {
    this.logger.info(transformLogMessage("Received a data From the DataGenerator",EventHubProducerController.name,[data]))
    this.producerService.sendDataToEventHub(data)
  }
}
