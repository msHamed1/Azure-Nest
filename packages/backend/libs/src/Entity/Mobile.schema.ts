import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';


export type MobileDocument = HydratedDocument<Mobile>;

@Schema()
export class Mobile {
    _id         : Types.ObjectId

    @Prop({ required: true })
    name        : string;

    @Prop({ required: true })
    type        : string;

    @Prop()
    time       : Date;

    @Prop({ required: true })
    price       : number;

    @Prop({ required: true })
    tax       : number;

    @Prop({ required: true })
    imme        : string;

}

export const MobileSchema = SchemaFactory.createForClass(Mobile);