import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';


export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
    _id         : Types.ObjectId

    @Prop({ required: true })
    message     : string;

    @Prop({ required: true })
    location        : string;

    @Prop()
    createdAt       : Date;

    @Prop()
    type       : string;

}

export const LogSchema = SchemaFactory.createForClass(Log);