import { Controller ,Get ,Inject ,LoggerService  } from "@nestjs/common"
import { Logger } from 'winston';

import { AppService } from "./app.service";

@Controller()
export class AppController {
  
  constructor(
    private readonly appService: AppService,
    @Inject('winston')
    private readonly logger: Logger,
    
  ){}


    @Get("/mobile/reports")
    getAllReports(){
      this.logger.info('Some one access the reports page');  
            
     
         return this.appService.getMobilesReporter();
    }


    @Get("/logs/logs")
    getLogs(){
      this.logger.info('Some one access the logs page',);     
     
         return this.appService.getLogs();
    }
}

