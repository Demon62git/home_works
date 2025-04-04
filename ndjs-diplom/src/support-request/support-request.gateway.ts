import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SupportRequestService } from '../support-request/services';
import { WebSocketAuthGuard } from '../auth/guards';
import { USER_ROLES } from '../common/constants';
import { ID } from '../common/types';

@WebSocketGateway()
export class SupportRequestGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly supportRequestService: SupportRequestService) {}

  // Подписка на обращение при подключении
  @UseGuards(WebSocketAuthGuard)
  @SetMetadata('roles', [USER_ROLES.MANAGER, USER_ROLES.CLIENT])
  @SubscribeMessage('subscribeToSupportRequest')
  handleSubscribe(client: Socket, payload: { supportRequest: string }): void {
    const unsubscribe = this.supportRequestService.subscribe(
      payload.supportRequest,
      (supportRequest, message) => {
        client.emit('message', {
          // Отправка события на клиент
          supportRequestId: supportRequest.id,
          message,
        });
      },
    );

    // отписка при отключении
    client.on('disconnect', unsubscribe);
  }

  // Получение сообщения
  @UseGuards(WebSocketAuthGuard)
  @SetMetadata('roles', [USER_ROLES.MANAGER, USER_ROLES.CLIENT])
  @SubscribeMessage('message')
  handleMessage(
    client: any,
    payload: { supportRequest: ID; text: string },
  ): void {
    this.supportRequestService.sendMessage({
      supportRequest: payload.supportRequest,
      author: client.user._id,
      text: payload.text,
    });
  }
}
