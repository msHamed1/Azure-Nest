import { Controller ,Get ,Inject ,LoggerService, NotFoundException  } from "@nestjs/common"
import { Logger } from 'winston';

import { AppService } from "./app.service";
import { ResponseMessage } from "libs/src/core/decorator/response.decorator";
import { GET_LOGS, GET_MOBILES } from "libs/src/core/constants/messages.constant";
import { transformLogMessage } from "libs/src";

@Controller()
export class AppController {
  
  constructor(
    private readonly appService: AppService,
    @Inject('winston')
    private readonly logger: Logger,
    
  ){}


    @Get("/mobile/reports")
    @ResponseMessage(GET_MOBILES)
    getAllReports(){
      this.logger.info(transformLogMessage('Some one access the reports page',AppController.name));  
            
         return this.appService.getMobilesReporter();
    }


    @Get("/logs/logs")
    @ResponseMessage(GET_LOGS)
    getLogs(){
      this.logger.info(transformLogMessage('Some one access the logs page',AppController.name));  
     
         return this.appService.getLogs();
    }
}

