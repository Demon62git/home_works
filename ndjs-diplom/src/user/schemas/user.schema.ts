import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_ROLES } from '../../common/constants';

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  contactPhone: string;

  @Prop({
    type: String,
    enum: USER_ROLES,
    required: true,
    default: USER_ROLES.CLIENT,
  })
  role: USER_ROLES;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
