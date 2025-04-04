import {
  Injectable,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISupportRequestService } from '../interfaces';
import {
  MessageDocument,
  SupportRequest,
  SupportRequestDocument,
} from '../schemas';
import { EventEmitter } from 'events';
import { UserDocument } from '../../user/schemas/user.schema';
import {
  GetChatListParams,
  MarkMessagesAsReadDto,
  SendMessageDto,
} from '../dto/support-request.dto';
import { MESSAGE_SRC, USER_ROLES } from '../../common/constants';
import { ID } from '../../common/types';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  private eventEmitter: EventEmitter;

  constructor(
    @InjectModel(SupportRequest.name)
    protected supportRequestModel: Model<SupportRequestDocument>,
  ) {
    this.eventEmitter = new EventEmitter();
  }

  /** Получение списка обращений в поддержку */ // +
  async findSupportRequests(
    data: GetChatListParams,
  ): Promise<SupportRequestDocument[]> {
    try {
      const query = this.supportRequestModel.find();
      if (data.user) {
        query.where('user').equals(data.user);
      }
      if (data.isActive !== undefined) {
        query.where('isActive').equals(!!data.isActive);
      }
      return await query
        .limit(data.limit)
        .skip(data.offset)
        .populate('user')
        .exec();
    } catch (e) {
      console.error(e.message, e.stack);
      throw new InternalServerErrorException(
        `Ошибка при получение списка обращений: ${e.message}`,
      );
    }
  }

  /** Получение истории сообщений из обращения в техподдержку */ // +
  async getMessages(supportRequest: ID): Promise<SupportRequestDocument> {
    try {
      return this.findById(supportRequest);
    } catch (e) {
      console.error(e.message, e.stack);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        `Ошибка при получение истории сообщений: ${e.message}`,
      );
    }
  }

  /** Отправка сообщения */ // +
  async sendMessage(data: SendMessageDto): Promise<MessageDocument> {
    try {
      const request = await this.findById(data.supportRequest);
      request.messages.push({
        author: data.author,
        sentAt: new Date(),
        text: data.text,
      } as MessageDocument);

      await request.save();
      await request.populate('messages.author');
      const message = request.messages.at(-1);
      // Генерируем событие о новом сообщении в обращении
      this.eventEmitter.emit(
        `message:${data.supportRequest}`,
        request,
        message,
      );
      return message;
    } catch (e) {
      console.error(e.message, e.stack);
      throw new InternalServerErrorException(
        `Ошибка при создании обращения: ${e.message}`,
      );
    }
  }

  /** Отправка события, что сообщения прочитаны */ // +
  async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
    try {
      // в зависимости от вызывающего метод, обновляются сообщения собеседника
      const request = await this.findById(params.supportRequest);

      // определение, является ли текущий пользователь автором сообщений
      const isAuthor = request.user.id.toString() === params.user.toString();

      // перебор сообщений и проставление отметки, если сообщение не прочитано и подходит по времени
      request.messages.forEach((message) => {
        if (!message.readAt && message.sentAt < params.createdBefore) {
          const isQuestion =
            (message.author as UserDocument).id === request.user.id;
          // автор обращения отправляет сообщения, а пользователь вопросы
          if ((isAuthor && !isQuestion) || (!isAuthor && isQuestion)) {
            message.readAt = new Date();
          }
        }
      });
      await request.save();
    } catch (e) {
      console.error(e.message, e.stack);
      throw new InternalServerErrorException(
        `Ошибка при проставлении отметки о прочтении: ${e.message}`,
      );
    }
  }

  /** Количество непрочитанных сообщении */
  async getUnreadCount(supportRequest: ID, type: MESSAGE_SRC): Promise<number> {
    try {
      const request = await this.findById(supportRequest);

      const unreadMessages = request.messages.filter((message) => {
        // автор обращения отправляет сообщения, а пользователь вопросы
        const isQuestion =
          (message.author as UserDocument).id === request.user.id;
        return (
          !message.readAt &&
          ((type === MESSAGE_SRC.USER && isQuestion) ||
            (type === MESSAGE_SRC.SUPPORT && !isQuestion))
        );
      });
      return unreadMessages.length;
    } catch (e) {
      console.error(e.message, e.stack);
      throw new InternalServerErrorException(
        `Ошибка при подсчете непрочитанных сообщений: ${e.message}`,
      );
    }
  }

  /** Получение обращения по id */
  async findById(id: ID): Promise<SupportRequestDocument> {
    const request = await this.supportRequestModel
      .findById(id)
      .populate('user')
      .populate({ path: 'messages.author' });
    if (!request) {
      throw new NotFoundException(`Обращение с id "${id}" не найдено`);
    }
    return request;
  }

  /** Проверка доступа к обращению */
  async checkClientAccess(
    supportRequestId: ID,
    user: UserDocument,
  ): Promise<boolean> {
    if (user.role === USER_ROLES.CLIENT) {
      const request = await this.findById(supportRequestId);
      if (user.id !== request.user.id) {
        throw new ForbiddenException('Нет доступа к данному обращению');
      }
    }
    return true;
  }

  /** Подписка на обращение */
  subscribe(
    supportRequestId: string,
    handler: (
      supportRequest: SupportRequestDocument,
      message: MessageDocument,
    ) => void,
  ): () => void {
    // Подписка
    this.eventEmitter.on(`message:${supportRequestId}`, handler);
    return () => {
      // Отписка
      this.eventEmitter.removeListener(`message:${supportRequestId}`, handler);
    };
  }
}
