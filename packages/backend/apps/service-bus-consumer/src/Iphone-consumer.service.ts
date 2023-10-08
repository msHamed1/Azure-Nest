import { Injectable ,Inject } from '@nestjs/common';
import { ServiceBusConsumerService } from './service-bus.gateway';
import { MobileServices } from './mobile.service';
import { Logger } from 'winston';

@Injectable()
export class IphoneQueueConsumerService extends ServiceBusConsumerService {
  constructor(private readonly mobileService: MobileServices ,@Inject('winston')
  protected readonly logger: Logger) {
    super(
      process.env.EVENT_BUS_SERVICE,
      'iphone-queue',
      mobileService,
      logger
    );
  }

  async handleCustomMessage(message: any): Promise<void> {
    // Implement your custom logic to handle iPhone messages
    console.log(`Received iPhone message : ${message}`);
    console.log(message)
  }
}
