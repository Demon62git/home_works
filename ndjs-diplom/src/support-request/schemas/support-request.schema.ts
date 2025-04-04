import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';
import { Message, MessageDocument } from '../schemas/message.schema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: UserDocument;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: [Message], ref: Message.name })
  messages: [MessageDocument];

  @Prop({ type: Boolean })
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
