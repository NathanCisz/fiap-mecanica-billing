import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillingLogDocument = BillingLog & Document;

@Schema({ timestamps: true, collection: 'billing_logs' })
export class BillingLog {
  @Prop({ required: true })
  event!: string;

  @Prop({ required: true })
  serviceOrderId!: string;

  @Prop()
  budgetId?: string;

  @Prop()
  paymentId?: string;

  @Prop({ type: Object })
  payload!: Record<string, any>;

  @Prop({ default: 'info' })
  level!: string;
}

export const BillingLogSchema = SchemaFactory.createForClass(BillingLog);
