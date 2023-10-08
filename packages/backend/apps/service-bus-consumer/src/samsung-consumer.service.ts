import { Injectable , Inject} from '@nestjs/common';
import { ServiceBusConsumerService } from './service-bus.gateway';
import { MobileServices } from './mobile.service';
import { Logger } from 'winston';

@Injectable()
export class SamsungQueueConsumerService extends ServiceBusConsumerService {
  constructor(private readonly mobileService: MobileServices ,@Inject('winston')
  protected readonly logger: Logger) {
    super(
      process.env.EVENT_BUS_SERVICE,
      'samsung-queue',
       mobileService,
       logger

    );
  }

  async handleCustomMessage(message: any): Promise<void> {
    // Implement your extra logic here .
  }
}
