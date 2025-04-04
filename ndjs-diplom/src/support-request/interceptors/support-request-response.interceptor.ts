import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SupportRequestDocument } from '../schemas';
import { ISupportRequestResponse } from '../dto/support-request.dto';
import { USER_ROLES } from 'src/common';

/** Преобразование формата выходных данных обращения */
@Injectable()
export class SupportRequestResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ISupportRequestResponse | ISupportRequestResponse[]> {
    const supportRequest = context.switchToHttp().getRequest();
    const user = supportRequest.user;

    const formatSupportRequestResponse = (
      supportRequest: SupportRequestDocument,
    ): ISupportRequestResponse => ({
      id: supportRequest.id.toString(),
      createdAt: supportRequest.createdAt.toString(),
      isActive: supportRequest.isActive,
      hasNewMessages: supportRequest.messages.some(
        (message) => !message.readAt,
      ),
      client:
        // вывод для менеджера !
        user.role === USER_ROLES.MANAGER
          ? {
              id: supportRequest.user.id.toString(),
              name: supportRequest.user.name,
              email: supportRequest.user.email,
              contactPhone: supportRequest.user.contactPhone,
            }
          : undefined,
    });

    return next.handle().pipe(
      map((supportRequest) => {
        return Array.isArray(supportRequest)
          ? supportRequest.map((res) => formatSupportRequestResponse(res))
          : formatSupportRequestResponse(supportRequest);
      }),
    );
  }
}
