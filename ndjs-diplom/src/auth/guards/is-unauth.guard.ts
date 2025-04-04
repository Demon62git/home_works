import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Контроль не авторизованного пользователя */
@Injectable()
export class IsUnauthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch {
      return true;
    }

    throw new ForbiddenException(
      'Доступно только не аутентифицированным пользователям',
    );
  }
}
