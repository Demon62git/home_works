import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Hotel, HotelDocument } from './hotel.schema';

@Schema({
  timestamps: true, // Добавляет поля createdAt и updatedAt в схему
})
export class HotelRoom {
  @Prop({ type: Types.ObjectId, ref: Hotel.name, required: true })
  hotel: HotelDocument;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ type: Boolean, required: true, default: true })
  isEnabled: boolean;
}

export type HotelRoomDocument = HotelRoom & Document;
export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
