import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Добавляет поля createdAt и updatedAt в схему
})
export class Hotel {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String })
  description?: string;
}

export type HotelDocument = Hotel & Document;
export const HotelSchema = SchemaFactory.createForClass(Hotel);
