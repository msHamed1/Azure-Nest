import { Injectable } from '@nestjs/common';
import { ServiceBusConsumerService } from './service-bus.gateway';
import { MobileServices } from './mobile.service';

@Injectable()
export class SamsungQueueConsumerService extends ServiceBusConsumerService {
  constructor(private readonly mobileService: MobileServices) {
    super(
      process.env.EVENT_BUS_SERVICE,
      'samsung-queue',
       mobileService
    );
  }

  async handleCustomMessage(message: any): Promise<void> {
    // Implement your extra logic here .
  }
}
