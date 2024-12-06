import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GitApiModule } from './gitApi/gitApi.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GitApiModule,
    // MongooseModule.forRoot(process.env.MONGO_CONNECTION),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
