import { WinstonModule } from 'nest-winston';
import { Module} from '@nestjs/common';

import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as mongoLogs from "winston-mongodb"

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports:[
        new DailyRotateFile({
          level: 'info', // Log level
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m', // Maximum log file size
          maxFiles: '14d', // Retention period (e.g., keep logs for 14 days)
        }),
        // new DailyRotateFile({
        //   level: 'warn', // Log level
        //   filename: 'logs/warn-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: true,
        //   maxSize: '20m', // Maximum log file size
        //   maxFiles: '14d', // Retention period (e.g., keep logs for 14 days)
        // }),
        new DailyRotateFile({
          level: 'error', 
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m', 
          maxFiles: '14d', 
        }),
        new mongoLogs.MongoDB({
          level: 'info',
          db: 'mongodb://root:password@localhost:27017', 
          options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },
        
          collection: 'logs', 
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),

      ]
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
