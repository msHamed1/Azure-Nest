import { IGenerator } from "./IGenerator";
import { Injectable ,Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { Cron } from '@nestjs/schedule';
import { Imessage, SERVICE_QUEUE_TYPE, getRandomMobileName, mobileType, transformLogMessage, uuid } from "libs/src";
import { Logger } from "winston";

/**
 * Fake an HTTP call to the specified URL with the given headers and payload.
 * @returns A promise that resolves with the response data.
 */
function FakehttpCall() {
  return new Promise<{data: Imessage[] }>((resolve, reject) => {
    setTimeout(() => {
      const name =  getRandomMobileName();
      const type = name.includes("iPhone")? SERVICE_QUEUE_TYPE.IPHONE : SERVICE_QUEUE_TYPE.SAMSUNG
      resolve({
       
        data: [{
          id  :   uuid(),
          type :   mobileType(),
          name :  getRandomMobileName(),
          price:   (Math.random() * (5000 - 1500) + 1500).toFixed(2),
          imme :   uuid(),
        
        }]
      } as unknown as {data:Imessage[] });
    }, 1000);
  });
}

/**
 * Generator class for Dummy data.
 */
@Injectable()
export class DummyGenerator implements IGenerator {
    constructor(
        @Inject('PRODUCER_SERVICE') private client: ClientProxy,
        @Inject("winston")private readonly logger:Logger
      ) {}
  extractorName = 'DummyGenerator';

  /**
   * generate data . and Emit the data to the Event hub producer microservice
   * @returns Void.
   */
  @Cron('*/5 * * * * *')
  async generate() {
   
    const response = await FakehttpCall();
    try{

      this.logger.info( transformLogMessage("Connection to PRODUCER_SERVICE",this.extractorName))
      
      await this.client.connect();
      const pattern = { cmd: 'DATA_GENERATED' };
     // console.log("data to be send")
      this.client.emit<number>(pattern, response.data)
      this.logger.info(transformLogMessage(`DATA SENT FROM ${this.extractorName} To PRODUCER SERVICE `,this.extractorName))
      

    }catch(err){
      
      this.logger.error(transformLogMessage(`Error connecting to PRODUCER_SERVICE ${err.message} `,this.extractorName))

      
    }
  }
}