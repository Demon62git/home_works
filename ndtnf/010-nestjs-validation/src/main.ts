import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Interceptor } from './interceptors/interceptor';
import { HttpExceptionFilter } from './exception-filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Interceptor())
  app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
