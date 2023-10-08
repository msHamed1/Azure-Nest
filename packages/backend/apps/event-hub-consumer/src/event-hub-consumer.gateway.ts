import { Injectable, Inject } from '@nestjs/common';
import { ServiceBusClient } from '@azure/service-bus';
import { Imessage } from 'libs/src';
import { Logger } from 'winston';

@Injectable()
/**
 * Abstract class for interacting with a message queue via Azure Service Bus.
 */
export abstract class MessageBusQueue {
  /**
   * Protected logger instance for logging within subclasses.
   * @protected
   * @type {Logger}
   */
  protected _logger: Logger;
  /**
   * Constructor for MessageBusQueue.
   * @param {Logger} logger - The Winston logger instance for logging.
   */

  constructor( @Inject('winston') private readonly logger: Logger ) {  this._logger = logger;}

  /**
   * Service Bus client for interacting with the message queue.
   * @protected
   * @type {ServiceBusClient}
   */

  protected serviceBusClient = new ServiceBusClient(
    process.env.EVENT_BUS_SERVICE,
  );
  
  /**
   * Abstract method for sending a message to the message queue.
   * @param {Imessage} message - The message to be sent to the queue.
   * @abstract
   */

  abstract sendMessage(message: Imessage): void;
}

/**
 * Injectable class for sending messages to the 'iphone-queue' on Azure Service Bus.
 */
@Injectable()
export class IphoneQueue extends MessageBusQueue {

   /**
   * Sends a message to the 'iphone-queue'.
   * @param {Imessage} message - The message to be sent to the queue.
   */
  async sendMessage(message: Imessage) {
    try {
      this._logger.info('SENDING DATA TO SERVICE BUS QUEUE : iphone-queue');
      const sender = this.serviceBusClient.createSender('iphone-queue');

      const message1 = {
        body: message,
      };

      await sender.sendMessages(message1);
    } catch (err) {
      this._logger.info('ERROR  TO SERVICE BUS QUEUE : samsung-queue', err);
    }
  }
}

/**
 * Injectable class for sending messages to the 'samsung-queue' on Azure Service Bus.
 */
@Injectable()
export class SamsungQueue extends MessageBusQueue {
    /**
   * Sends a message to the 'iphone-queue'.
   * @param {Imessage} message - The message to be sent to the queue.
   */
  async sendMessage(message: Imessage) {
    try {
      this._logger.info('SENDING DATA TO SERVICE BUS QUEUE : samsung-queue');
      const sender = this.serviceBusClient.createSender('samsung-queue');
      const message1 = {
        body: message,
      };
      await sender.sendMessages(message1);
    } catch (err) {
      this._logger.info('ERROR  TO SERVICE BUS QUEUE : samsung-queue', err);
    }
  }
}
