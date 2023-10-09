import { IExtractor } from "./IExtractor";
import { Injectable ,Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { Cron } from '@nestjs/schedule';
import { Imessage, SERVICE_QUEUE_TYPE, getRandomMobileName, mobileType, transformLogMessage, uuid } from "libs/src";
import { Logger } from "winston";

/**
 * Makes an HTTP call to the specified URL with the given headers and payload.
 * @param url - The URL to make the HTTP call to.
 * @param headers - The headers to include in the HTTP call.
 * @param payload - The payload to include in the HTTP call.
 * @returns A promise that resolves with the response data.
 */
function httpCall<T>() {
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
 * Extractor class for DummyHttp data.
 */
@Injectable()
export class DummyHttpExtractor implements IExtractor {
    constructor(
        @Inject('PRODUCER_SERVICE') private client: ClientProxy,
        @Inject("winston")private readonly logger:Logger
      ) {}
  extractorName = 'DummyHttp';

  /**
   * Extracts data .
   * @returns An object containing the extracted data.
   */
  @Cron('*/5 * * * * *')
  async extract() {
   
    const response = await httpCall<any>();
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