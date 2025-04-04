import { ObjectId } from 'mongoose';
import { IsDate, IsNotEmpty } from 'class-validator';
import { ID } from '../../common/types';
import { Optional } from '@nestjs/common';

export class CreateReservationBodyDto {
  @IsNotEmpty()
  hotelRoom: ObjectId;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}

export class CreateReservationDto extends CreateReservationBodyDto {
  @IsNotEmpty()
  userId: ID;
}

// для поиска бронирования
export class ReservationSearchOptionsDto {
  @IsNotEmpty()
  userId: ID;

  @IsDate()
  @Optional()
  dateStart?: Date;

  @IsDate()
  @Optional()
  dateEnd?: Date;
}

// интерйес для ответа на запросы бронирования
export interface IReservationResponse {
  startDate: string;
  endDate: string;
  hotelRoom: IHotelRoomResponse;
  hotel: IHotelResponse;
}

// интерфейс для вывода данных по номеру в ответе запроса о бронировании
interface IHotelRoomResponse {
  description?: string;
  images?: string[];
}

// интерфейс для вывода данных по отелю в ответе запроса о бронировании
interface IHotelResponse {
  title: string;
  description?: string;
}
