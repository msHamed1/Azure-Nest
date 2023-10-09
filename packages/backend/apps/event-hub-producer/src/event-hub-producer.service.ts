import { Injectable, Inject } from '@nestjs/common';
import { EventHubProducerClient } from '@azure/event-hubs';
import { Logger } from 'winston';
import { transformLogMessage } from 'libs/src';

/**
 * Service for producing data to Azure Event Hub.
 * @class
 */
@Injectable()
export class EventHubProducerService {
  private producerClient: EventHubProducerClient;

  /**
   * Creates an instance of EventHubProducerService.
   * @constructor
   * @param {Logger} logger - The Winston logger instance.
   */
  constructor(@Inject('winston') private readonly logger: Logger) {
    const connectionString = process.env.EVENT_HUB_SEND_CONNECTION;
    const eventHubName = 'mobile-event';

    this.producerClient = new EventHubProducerClient(
      connectionString,
      eventHubName,
    );
  }

  /**
   * Sends data to Azure Event Hub.
   * @param {string} data - The data to be sent to the Event Hub.
   * @returns {Promise<void>} A Promise that resolves when the data is successfully sent.
   */
  async sendDataToEventHub(data: string) {
    try {
      const batch = await this.producerClient.createBatch();
      batch.tryAdd({ body: data });
      this.logger.info( transformLogMessage(`Send the batch of events ${JSON.stringify(data)}`,EventHubProducerService.name,[data]));

      await this.producerClient.sendBatch(batch);
    } catch (error) {
      this.logger.error(
        transformLogMessage("rror sending data to Event Hub:","EventHubProducerService",[error])
       
      );
    }
  }
}
