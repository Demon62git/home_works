import { CallHandler, Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common'
import { catchError, map } from 'rxjs'

@Injectable()
export class Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        map((data) => ({
          status: 'success',
          data,
        })),
        catchError((err) => {
          return [{
            status: 'fail',
            data: { message: err.message }
          }]
        })
      )
  }
}