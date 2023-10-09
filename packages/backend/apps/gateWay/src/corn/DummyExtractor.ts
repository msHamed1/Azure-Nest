import { IExtractor } from "./IExtractor";
import { Injectable ,Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { Cron } from '@nestjs/schedule';
import { Imessage, mobileType, uuid } from "libs/src";
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
      resolve({
        data: [{
          id  :   uuid(),
          type :   mobileType(),
          name :   "Mahmoud ",
          price:   300,
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

      this.logger.info(`Connection to PRODUCER_SERVICE `)
      await this.client.connect();
      const pattern = { cmd: 'DATA_GENERATED' };
     // console.log("data to be send")
      this.client.emit<number>(pattern, response.data)
      this.logger.info(`DATA SENT FROM ${this.extractorName} To PRODUCER SERVICE `)
      

    }catch(err){
      
      this.logger.error(`Error connecting to PRODUCER_SERVICE ${err.message} `)

      
    }

    
   



  
  }
}