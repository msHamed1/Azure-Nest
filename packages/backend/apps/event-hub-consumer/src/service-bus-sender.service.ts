import { Injectable } from '@nestjs/common';
import { EventHubConsumerClient, EventPosition, PartitionContext, ReceivedEventData, earliestEventPosition } from '@azure/event-hubs';
import { SERVICE_QUEUE_TYPE } from 'libs/src';
import { IphoneQueue, MessageBusQueue, SamsungQueue } from './event-hub-consumer.gateway';

@Injectable()
export class ServiceBusService {
    private gateWay :Record<string,MessageBusQueue>={}

    public registerServerQueue(queueName:SERVICE_QUEUE_TYPE,gateWay :MessageBusQueue){

      //  this.serviceQueues[queueName]=gateWay;
      }
}