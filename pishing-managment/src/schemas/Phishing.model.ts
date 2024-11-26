import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export enum PhishingStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export type PhishingType = HydratedDocument<PhishingRecords>;

@Schema({
    timestamps: true,
})
export class PhishingRecords {
    @Prop({ required: true, unique: true, index: true })
    email: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: PhishingStatus.PENDING, enum: PhishingStatus })
    status: PhishingStatus;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    createdBy: MongooseSchema.Types.ObjectId;
}

export const PhishingSchema = SchemaFactory.createForClass(PhishingRecords);
