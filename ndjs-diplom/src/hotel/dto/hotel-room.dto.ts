import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { IHotelResponse } from '../dto/hotel.dto';
import { ID } from 'src/common';

// используется для создании и обновления данных номеров
export class FillHotelRoomDataDto {
  @IsNotEmpty()
  hotelId: ObjectId;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}

// используется для передачи путей к картинкам
export class FillHotelRoomDto extends FillHotelRoomDataDto {
  images: Express.Multer.File[];
}

// используется для поиска номеров
export class SearchRoomsParamsDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  hotel?: string;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}

// используется для создании и обновления данных номеров
export interface IHotelRoomResponse {
  id: ID;
  description?: string;
  images?: string[];
  isEnabled?: boolean;
  hotel: IHotelResponse;
}
