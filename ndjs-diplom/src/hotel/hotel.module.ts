import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelRoom, HotelRoomSchema, HotelSchema } from './schemas';
import { HotelService } from '../hotel/hotel.service';
import { HotelRoomService } from '../hotel/hotel-room.service';
import { HotelController } from './hotel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelController],
  providers: [HotelService, HotelRoomService],
  exports: [HotelService],
})
export class HotelModule {}
