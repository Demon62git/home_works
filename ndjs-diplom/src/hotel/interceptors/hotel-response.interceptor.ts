import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HotelDocument } from '../schemas/hotel.schema';
import { IHotelResponse } from '../dto/hotel.dto';

/** Преобразование формата ответа для возврата информации по отелям */
@Injectable()
export class HotelResponseInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<IHotelResponse | IHotelResponse[]> {
    // мэппинг полей отеля, которые нужно вернуть клиенту
    const formatHotelResponse = (hotel: HotelDocument): IHotelResponse => ({
      id: hotel.id,
      title: hotel.title,
      description: hotel.description,
    });

    return next.handle().pipe(
      map((hotel) => {
        return Array.isArray(hotel)
          ? hotel.map((items) => formatHotelResponse(items)) // Если нашлось нескольоколько записей
          : formatHotelResponse(hotel); // Если нашлась одна запись
      }),
    );
  }
}
