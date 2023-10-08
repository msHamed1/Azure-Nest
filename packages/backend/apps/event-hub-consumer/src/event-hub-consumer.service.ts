import { Injectable ,Inject } from '@nestjs/common';
import { EventHubConsumerClient, EventPosition, PartitionContext, ReceivedEventData } from '@azure/event-hubs';
import { Imessage, SERVICE_QUEUE_TYPE } from 'libs/src';
import { IphoneQueue, SamsungQueue } from './event-hub-consumer.gateway';
import { Logger } from 'winston';

@Injectable()
export class EventHubConsumerService {
  /**
   * The Azure Event Hub consumer client for receiving events.
   * @private
   * @type {EventHubConsumerClient}
   */
  private consumerClient: EventHubConsumerClient;

  /**
   * Constructor for EventHubConsumerService.
   * @param {IphoneQueue} iPhoneQueue - The service for sending messages to the 'iphone-queue'.
   * @param {SamsungQueue} samsungQueue - The service for sending messages to the 'samsung-queue'.
   * @param {Logger} logger - The Winston logger instance for logging.
   */
  constructor(
    private readonly iPhoneQueue: IphoneQueue,
    private readonly samsungQueue: SamsungQueue,
    @Inject('winston')
    private readonly logger: Logger,
  ) {
    const connectionString = process.env.EVENT_HUB_CONNECTION;
    const eventHubName = "mobile-event";
    const consumerGroupName = process.env.EVENT_HUB_GROUP;

    this.consumerClient = new EventHubConsumerClient(consumerGroupName, connectionString);
  }

  /**
   * Initializes the EventHubConsumerService and starts listening for events from the Azure Event Hub.
   * @async
   */
  async onModuleInit() {
    try {
      this.consumerClient.subscribe({
        processEvents: async (events: ReceivedEventData[], context: PartitionContext) => {
          this.logger.info("EVENT RECEIVED FROM AZURE EVENT HUB");
          for (const event of events) {
            const eventData = event.body as Array<Imessage>;

            this.logger.info("DATA RECEIVED", eventData);

            for await (const item of eventData) {
              if (item.type == SERVICE_QUEUE_TYPE.IPHONE) {
                this.iPhoneQueue.sendMessage(item);
              } else if (item.type == SERVICE_QUEUE_TYPE.SAMSUNG) {
                this.samsungQueue.sendMessage(item);
              } else {
                this.logger.error(`Data is not compatible ${JSON.stringify(item)}`);
              }
            }
          }
        },
        processError: async (err: Error) => {
          // Handle errors here
          this.logger.error(`${err.message} ${JSON.stringify(err)}`);
        },
      });
    } catch (err) {
      this.logger.error(`${err.message} ${JSON.stringify(err)}`);
    }
  }
}