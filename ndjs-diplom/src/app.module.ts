import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { UserModule } from './user/user.module';
import { HotelModule } from './hotel/hotel.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ReservationModule } from './reservation/reservation.module';
import { SupportRequestModule } from './support-request/support-request.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(config.settings.dbConnectionUrl),
    UserModule,
    HotelModule,
    ReservationModule,
    SupportRequestModule,
    AuthModule,
    ServeStaticModule.forRoot({ rootPath: 'public' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
