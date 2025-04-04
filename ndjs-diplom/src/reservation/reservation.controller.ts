import {
  Body,
  Controller,
  SetMetadata,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';
import { ReservationService } from './reservation.service';
import { CreateReservationBodyDto } from '../reservation/dto/reservation.dto';
import { USER_ROLES } from '../common/constants';
import { ID } from '../common/types';
import { HttpAuthGuard } from '../auth/guards';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { User } from '../auth/decorators/user.decorator';
import { ReservationResponseInterceptor } from './interceptors/reservation-response.interceptor';

@Controller()
@UseGuards(HttpAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Бронирование номера клиентом
  @Post('client/reservations')
  @SetMetadata('roles', [USER_ROLES.CLIENT])
  @UseInterceptors(ReservationResponseInterceptor)
  async addReservation(
    @Body() body: CreateReservationBodyDto,
    @User() user: UserDocument,
  ) {
    return await this.reservationService.addReservation({
      ...body,
      userId: user._id as ID,
    });
  }

  // Список броней текущего пользователя +
  @Get('client/reservations')
  @SetMetadata('roles', [USER_ROLES.CLIENT])
  @UseInterceptors(ReservationResponseInterceptor)
  async get(@User() user: UserDocument) {
    return await this.reservationService.getReservations({
      userId: user._id as ID,
    });
  }

  // Отмена бронирования клиентом +
  @Delete('client/reservations/:id')
  @SetMetadata('roles', [USER_ROLES.CLIENT])
  async removeReservationForClient(
    @Param('id') id: ID,
    @User() user: UserDocument,
  ) {
    await this.reservationService.checkClientAccess(id, user);
    return await this.reservationService.removeReservation(id);
  }

  // Список броней конкретного пользователя +
  @Get('manager/reservations/:userId')
  @SetMetadata('roles', [USER_ROLES.MANAGER])
  @UseInterceptors(ReservationResponseInterceptor)
  async getByUserId(@Param('userId', ParseObjectIdPipe) userId: ID) {
    return await this.reservationService.getReservations({
      userId,
    });
  }

  // Отмена бронирования менеджером +
  @Delete('manager/reservations/:id')
  @SetMetadata('roles', [USER_ROLES.MANAGER])
  async removeReservationForManager(@Param('id') id: ID) {
    return await this.reservationService.removeReservation(id);
  }
}
