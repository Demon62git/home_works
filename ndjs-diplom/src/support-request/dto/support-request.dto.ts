import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ID } from '../../common/types';

/** Тело запроса при создании обращения */
export class CreateSupportRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

/** Параметры создание обращения */
export class CreateSupportRequestDto extends CreateSupportRequestBodyDto {
  user: ID;
}

/** Тело запроса при создании сообщения */
export class SendMessageBodyDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

/** Параметры создания сообщения */
export class SendMessageDto extends SendMessageBodyDto {
  author: ID;
  supportRequest: ID;
}

/** Тело запроса при событии, что сообщения прочитаны */
export class MarkMessagesAsReadBodyDto {
  @IsDate()
  @IsNotEmpty()
  createdBefore?: Date;
}

/** Параметры события, что сообщения прочитаны */
export class MarkMessagesAsReadDto extends MarkMessagesAsReadBodyDto {
  user: ID;
  supportRequest: ID;
}

/** Параметры получения списка обращений */
export class GetChatListParams {
  user?: ID;

  @IsNumber()
  limit?: number;

  @IsNumber()
  offset?: number;

  @IsBoolean()
  isActive?: boolean;
}

// интерфейс формата вывода ответа по обращению
export interface ISupportRequestResponse {
  id: string;
  createdAt: string;
  isActive: boolean;
  hasNewMessages: boolean;
  client?: {
    id: string;
    name: string;
    email: string;
    contactPhone?: string;
  };
}

// интерфейс формата вывода данных сообщения
export interface IMessageResponse {
  id: string;
  createdAt: string;
  text: string;
  readAt?: string;
  author: {
    id: string;
    name: string;
  };
}
