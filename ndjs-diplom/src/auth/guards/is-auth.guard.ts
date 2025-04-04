import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Контроль авторизованного пользователя*/ // +
@Injectable()
export class IsAuthGuard extends AuthGuard('jwt') {
  public async canActivate(context: ExecutionContext) {
    return !!(await super.canActivate(context));
  }
}
