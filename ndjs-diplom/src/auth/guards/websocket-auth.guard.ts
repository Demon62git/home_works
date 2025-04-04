import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { USER_ROLES } from 'src/common';

/** Проверка роли при websocket взаимодействии */ // +
@Injectable()
export class WebSocketAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  public async canActivate(context: ExecutionContext) {
    // вызов логики родительского класса
    if (!(await super.canActivate(context))) {
      return false;
    }

    // текущий пользователь из контекста
    const client = context.switchToWs().getClient();
    const user = client.user;
    // роли из метаданных
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

  // получение контекста запроса
  getRequest(context: ExecutionContext) {
    // +
    return context.switchToWs().getClient();
  }
  // получение данных из контекста
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // +
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const request = this.getRequest(context);
    request.user = user;
    return user;
  }
}
