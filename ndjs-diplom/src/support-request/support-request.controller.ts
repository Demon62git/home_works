import {
  Body,
  Controller,
  SetMetadata,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  SupportRequestService,
  SupportRequestClientService,
  SupportRequestEmployeeService,
} from './services';
import {
  CreateSupportRequestBodyDto,
  GetChatListParams,
  MarkMessagesAsReadBodyDto,
  SendMessageBodyDto,
} from './dto/support-request.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { ID } from '../common/types';
import { HttpAuthGuard } from '../auth/guards';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { User } from '../auth/decorators/user.decorator';
import { USER_ROLES } from '../common/constants';
import {
  MessageResponseInterceptor,
  SupportRequestResponseInterceptor,
} from './interceptors';

@Controller()
@UseGuards(HttpAuthGuard)
export class SupportRequestController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestClientService: SupportRequestClientService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
  ) {}

  // Создание обращения в поддержку +
  @Post('client/support-requests')
  @SetMetadata('roles', [USER_ROLES.CLIENT])
  @UseInterceptors(SupportRequestResponseInterceptor)
  async create(
    @Body() body: CreateSupportRequestBodyDto,
    @User() user: UserDocument,
  ) {
    return await this.supportRequestClientService.createSupportRequest({
      user: user._id as ID,
      text: body.text,
    });
  }

  // Получение списка обращений в поддержку для клиента +
  @Get('client/support-requests')
  @SetMetadata('roles', [USER_ROLES.CLIENT])
  @UseInterceptors(SupportRequestResponseInterceptor)
  async getForClient(
    @Query() params: GetChatListParams,
    @User() user: UserDocument,
  ) {
    return await this.supportRequestService.findSupportRequests({
      ...params,
      user: user._id as ID,
    });
  }

  // Получение списка обращений в поддержку для менеджера +
  @Get('manager/support-requests')
  @SetMetadata('roles', [USER_ROLES.MANAGER])
  @UseInterceptors(SupportRequestResponseInterceptor)
  async getForManager(@Query() params: GetChatListParams) {
    // убрать ограничение на параметр user
    delete params.user;
    return await this.supportRequestService.findSupportRequests(params);
  }

  // Получение истории сообщений из обращения в техподдержку +
  @Get('common/support-requests/:id/messages')
  @SetMetadata('roles', [USER_ROLES.MANAGER, USER_ROLES.CLIENT])
  @UseInterceptors(MessageResponseInterceptor)
  async getMessages(@Param('id') id: ID, @User() user: UserDocument) {
    await this.supportRequestService.checkClientAccess(id, user);
    const request = await this.supportRequestService.getMessages(id);
    return request.messages;
  }

  // Отправка сообщения +
  @Post('common/support-requests/:id/messages')
  @SetMetadata('roles', [USER_ROLES.MANAGER, USER_ROLES.CLIENT])
  @UseInterceptors(MessageResponseInterceptor)
  async sendMessage(
    @Param('id', ParseObjectIdPipe) id: ID,
    @Body() body: SendMessageBodyDto,
    @User() user: UserDocument,
  ) {
    await this.supportRequestService.checkClientAccess(id, user);
    return await this.supportRequestService.sendMessage({
      author: user._id as ID,
      supportRequest: id,
      text: body.text,
    });
  }

  // Отправка события, что сообщения прочитаны
  @Post('common/support-requests/:id/messages/read')
  @SetMetadata('roles', [USER_ROLES.MANAGER, USER_ROLES.CLIENT])
  async markMessagesAsRead(
    @Param('id') id: ID,
    @Body() body: MarkMessagesAsReadBodyDto,
    @User() user: UserDocument,
  ) {
    await this.supportRequestService.checkClientAccess(id, user);
    await this.supportRequestService.markMessagesAsRead({
      user: user._id as ID,
      supportRequest: id,
      createdBefore: body.createdBefore,
    });
    return { success: true };
  }

  // Количество непрочитанных сообщений
  @Get('common/support-requests/:id/messages/unread')
  @SetMetadata('roles', [USER_ROLES.MANAGER, USER_ROLES.CLIENT])
  async getUnreadCount(@Param('id') id: ID, @User() user: UserDocument) {
    await this.supportRequestService.checkClientAccess(id, user);
    const count =
      user.role === USER_ROLES.CLIENT
        ? // клиент читает сообщения
          await this.supportRequestClientService.getUnreadCount(id)
        : // менеджер читает сообщения
          await this.supportRequestEmployeeService.getUnreadCount(id);
    return { count };
  }

  // Закрытие обращения
  @Delete('manager/support-requests/:id')
  @SetMetadata('roles', [USER_ROLES.MANAGER])
  async closeRequest(@Param('id') id: ID) {
    return this.supportRequestEmployeeService.closeRequest(id);
  }
}
