import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { USER_ROLES } from '../../common/constants';

/** Установка параметра isEnabled номера */
@Injectable()
export class RoomEnabledGuard extends AuthGuard('jwt') {
  public async canActivate(context: ExecutionContext) {
    // Если пользователь не аутентифицирован или его роль client,
    // то при поиске всегда должен использоваться флаг isEnabled: true
    try {
      await super.canActivate(context);
    } catch {}
    // получение данных пользователя из контекста HTTP запроса
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // для роли клиента устанавливается isEnabled в true
    if (!user || user.role === USER_ROLES.CLIENT) {
      request.query.isEnabled = true;
    }

    return true;
  }
}
