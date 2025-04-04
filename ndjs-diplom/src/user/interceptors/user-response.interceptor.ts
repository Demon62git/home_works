import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserDocument } from '../schemas/user.schema';
import { UserResponseDto } from '../dto/user.dto';

/** Преобразование формата выходных данных ответа для поиска пользователей */
@Injectable()
export class UserResponseInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserResponseDto | UserResponseDto[]> {
    // мэппинг полей пользователя, которые нужно вернуть клиенту
    const formatUserResponse = (user: UserDocument): UserResponseDto => ({
      id: user.id,
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    });

    return next.handle().pipe(
      map((user) => {
        return Array.isArray(user)
          ? user.map((items) => formatUserResponse(items)) // Если возвращаем массив пользователей
          : formatUserResponse(user); // Если нашёлся один пользователь
      }),
    );
  }
}
