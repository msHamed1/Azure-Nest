import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MobileSchema } from 'libs/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'libs/src/logger/loggerFactory';
import { DummyGenerator } from './corn/DummyGenerator';



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{name: 'Mobile', schema: MobileSchema}]),
    LoggerModule,
    ScheduleModule.forRoot(),
   // ScheduleModule.forRoot(),
    ClientsModule.register([
      { name: 'PRODUCER_SERVICE', transport: Transport.TCP ,options:{port:3002} },
      { name: 'EL_SERIVCE', transport: Transport.TCP ,options:{port:3001} }
    ]),
  ],
    
  controllers: [AppController],
  providers: [AppService
  ,DummyGenerator
  ]})
export class AppModule {}
