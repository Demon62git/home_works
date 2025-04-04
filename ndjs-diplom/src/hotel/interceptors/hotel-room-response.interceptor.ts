import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HotelRoomDocument } from '../schemas/hotel-room.schema';
import { IHotelRoomResponse } from '../dto/hotel-room.dto';

/** Преобразование формата выходных данных ответа для возврата информации по отелям */
@Injectable()
export class HotelRoomResponseInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<IHotelRoomResponse | IHotelRoomResponse[]> {
    // мэппинг полей номера в отеле, которые нужно вернуть клиенту
    const formatHotelRoomResponse = (
      hotelRoom: HotelRoomDocument,
    ): IHotelRoomResponse => ({
      id: hotelRoom.id,
      description: hotelRoom.description,
      images: hotelRoom.images,
      isEnabled: hotelRoom.isEnabled,
      hotel: {
        id: hotelRoom.hotel.id,
        title: hotelRoom.hotel.title,
        description: hotelRoom.hotel.description,
      },
    });

    return next.handle().pipe(
      map((hotelRoom) => {
        return Array.isArray(hotelRoom)
          ? hotelRoom.map((items) => formatHotelRoomResponse(items)) // Если нашлось нескольоколько записей
          : formatHotelRoomResponse(hotelRoom); // Если нашлась одна запись
      }),
    );
  }
}
