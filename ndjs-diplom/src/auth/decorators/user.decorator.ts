import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**Получение информации о текущем пользователе */
export const User = createParamDecorator(
  (_unknown: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
