import { Injectable } from '@nestjs/common';
import { ServiceBusConsumerService } from './service-bus.gateway';
import { MobileServices } from './mobile.service';

@Injectable()
export class IphoneQueueConsumerService extends ServiceBusConsumerService {
  constructor(private readonly mobileService: MobileServices) {
    super(
      process.env.EVENT_BUS_SERVICE,
      'iphone-queue',
      mobileService
    );
  }

  async handleCustomMessage(message: any): Promise<void> {
    // Implement your custom logic to handle iPhone messages
    console.log(`Received iPhone message: ${message}`);
    console.log(message)
  }
}
