import { Injectable, Inject } from '@nestjs/common';
import { ServiceBusClient } from '@azure/service-bus';
import { Imessage, transformLogMessage } from 'libs/src';
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
  private qeuueName=process.env.EVENT_HUB_QUEUE_NAME1

   /**
   * Sends a message to the 'iphone-queue'.
   * @param {Imessage} message - The message to be sent to the queue.
   */
  async sendMessage(message: Imessage) {
    try {
      this._logger.info(transformLogMessage('SENDING DATA TO SERVICE BUS QUEUE  iphone-queue',this.qeuueName,[message]));
      const sender = this.serviceBusClient.createSender(this.qeuueName);

      const message1 = {
        body: message,
      };

      await sender.sendMessages(message1);
    } catch (err) {
      this._logger.info(transformLogMessage('Error sending message to SERVICE BUS QUEUE type iphone-queue',this.qeuueName,[err]))
    
    }
  }
}

/**
 * Injectable class for sending messages to the 'samsung-queue' on Azure Service Bus.
 */
@Injectable()
export class SamsungQueue extends MessageBusQueue {

  private queueName=process.env.EVENT_HUB_QUEUE_NAME2
    /**
   * Sends a message to the 'iphone-queue'.
   * @param {Imessage} message - The message to be sent to the queue.
   */
  async sendMessage(message: Imessage) {
    try {
      this._logger.info(transformLogMessage('SENDING DATA TO SERVICE BUS QUEUE :' ,this.queueName,[message]));
      const sender = this.serviceBusClient.createSender(this.queueName);
      const message1 = {
        body: message,
      };
      await sender.sendMessages(message1);
    } catch (err) {
      this._logger.info(transformLogMessage('ERROR  TO SERVICE BUS QUEUE : ',this.queueName [err]));
    }
  }
}
