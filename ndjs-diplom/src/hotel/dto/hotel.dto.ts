import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ID } from 'src/common';

// используется для создании и обновления данных по отелям
export class FillHotelDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

// используется для поиска отелей
export class SearchHotelParamsDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  title?: string;
}

// используется для формата ответа по отелям
export interface IHotelResponse {
  id: ID;
  title: string;
  description?: string;
}
