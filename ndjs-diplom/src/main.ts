import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  const port = config.settings.appPort;
  await app.listen(port, () => {
    console.log(`Приложение доступно на порту: ${port}`);
  });
}
bootstrap();
