import { ServiceBusClient, ServiceBusReceiver } from '@azure/service-bus';
import { OnModuleInit } from '@nestjs/common';
import { MobileServices } from './mobile.service';
import { Mobile } from 'libs/src/Entity/Mobile.schema';
import { Imessage } from 'libs/src';

/**
 * Abstract class for creating Azure Service Bus consumers in NestJS.
 */
export abstract class ServiceBusConsumerService implements OnModuleInit {
  private serviceBusClient: ServiceBusClient;
  private receiver: ServiceBusReceiver;
  private readonly _mobileService: MobileServices
   /**
   * Create an instance of the ServiceBusConsumerService.
   * @param {string} connectionString - The Azure Service Bus connection string.
   * @param {string} queueName - The name of the Azure Service Bus queue.
   * @param {MobileServices} _mobileService - The Repo for Mobile Enitity.
   * 
   */
  constructor(connectionString: string, queueName: string , _mobileService: MobileServices) {
    this.serviceBusClient = new ServiceBusClient(connectionString);
    this.receiver = this.serviceBusClient.createReceiver(queueName);
    this._mobileService= _mobileService
    
    
  }

  /**
   * Abstract method for handling custom message processing.
   * Child classes must implement this method with specific logic.
   * @param {any} message - The message to be processed.
   * @returns {Promise<void>} A Promise that resolves when message processing is complete.
   */
  abstract handleCustomMessage(message: any): Promise<void>;

  /**
   * Common message handling logic that can be shared among child classes.
   * Calls the child class-specific message handling logic defined in handleCustomMessage.
   * @param {any} message - The message to be processed.
   * @returns {Promise<void>} A Promise that resolves when message processing is complete.
   */
  handleMessage(message: Imessage): Promise<void> {
    // Common logic that can be shared among all child classes { Map }
    const tax= message.price*0.15;
    
    this._mobileService.create({
      imme:message.imme ||" ",
      time:new Date(),
      name:message.name ||" ",
      price:message.price || 0,
      type:message.type ||" ",
      tax
    }
      )
    // Call the child class-specific logic
    return this.handleCustomMessage(message);
  }


  onModuleInit() {
    this.receiver.subscribe({
      processMessage: async (message) => {
        try {
          const messageBody = message.body;
          await this.handleMessage(messageBody);
        } catch (error) {
          console.error('Error handling message:', error);
        }
      },
      processError: async (args) => {
        console.error(
          `Error occurred with ${args.entityPath} within ${args.fullyQualifiedNamespace}: `,
          args.error,
        );
      },
    });
  }
}
