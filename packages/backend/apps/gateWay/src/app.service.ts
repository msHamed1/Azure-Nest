import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mobile } from 'libs/src';
import { Model } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {

    constructor(@InjectModel(Mobile.name) private readonly _mobile: Model<Mobile>,
    @InjectConnection() private connection: Connection
    ){}


    async getMobilesReporter(): Promise<Mobile[]>{
        return  await this._mobile.find()
    }
    async getLogs(){
        
        try {
            const db = this.connection.db;
            const logsCollection = db.collection('logs'); 
            const logs = (await logsCollection.find({}).toArray()).reverse()
            return logs;
          } catch (error) {
            throw new Error(error.message);
          }
    }

}