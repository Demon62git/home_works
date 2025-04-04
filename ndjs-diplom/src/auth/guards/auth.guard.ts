import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { USER_ROLES } from '../../common/constants';

/** Проверка роли при HTTP запрое */
@Injectable()
export class HttpAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  // +
  public async canActivate(context: ExecutionContext) {
    // вызов логики родительского класса
    if (!(await super.canActivate(context))) {
      return false;
    }

    // получение текущего пользователь из контекста
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // Получение ролей установленных в метаданных
    const requiredRoles = this.reflector.get<USER_ROLES[]>(
      'roles',
      context.getHandler(),
    );
    // выход, если нет ограничения по ролям
    if (!requiredRoles) {
      return true;
    }

    // Проверка соответствия роли
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `У роли ${user.role} недостаточно полномочий`,
      );
    }

    return true;
  }
}
