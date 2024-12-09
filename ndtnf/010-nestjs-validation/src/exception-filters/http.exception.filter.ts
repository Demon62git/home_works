import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = {
      timestamp: new Date().toLocaleString(), // дата и время
      status: 'fail',
      data: exception.message, // сведения об ошибке
      code: status, // код ошибки при наличии в объекте ошибки. В случае отсутствия, по умолчанию code = 500
    };

    response.status(status).json(message);
  }
}
