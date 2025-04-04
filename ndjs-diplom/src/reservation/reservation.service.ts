import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { UserDocument } from '../user/schemas/user.schema';
import { IReservationService } from '../reservation/interfaces/reservation.interface';
import {
  CreateReservationDto,
  ReservationSearchOptionsDto,
} from '../reservation/dto/reservation.dto';
import { ID } from '../common/types';
import { USER_ROLES } from '../common/constants';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  /** Бронирование номера */
  async addReservation(
    data: CreateReservationDto,
  ): Promise<ReservationDocument> {
    try {
      if (data.startDate > data.endDate)
        throw new BadRequestException(
          'Дата начала бронирования не может быть больше даты окончания',
        );

      // номер не занят
      const existingReservation = await this.reservationModel.findOne({
        roomId: data.hotelRoom,
        $and: [
          {
            dateStart: { $lte: data.endDate },
            dateEnd: { $gte: data.startDate },
          },
        ],
      });

      // проверка доступности номера на заданную дату
      if (existingReservation)
        throw new BadRequestException('Номер на указанные даты занят');

      // создание бронирования
      const reservation = new this.reservationModel({
        userId: data.userId,
        roomId: data.hotelRoom,
        dateStart: data.startDate,
        dateEnd: data.endDate,
      });
      await reservation.populate('userId');
      await reservation.populate('roomId');
      if (!reservation.roomId)
        throw new BadRequestException(
          `Номер с id "${data.hotelRoom}" не найден`,
        );
      if (!reservation.roomId.isEnabled)
        throw new BadRequestException(
          `Номер с id "${data.hotelRoom}" недоступен`,
        );
      // id отеля из данных номера в бронировании
      reservation.hotelId = reservation.roomId.hotel;
      await reservation.populate('hotelId');
      return await reservation.save();
    } catch (e) {
      console.error(e.message, e.stack);
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException(
        `Ошибка при бронировании номера: ${e.message}`,
      );
    }
  }

  /** Список броней пользователя */ // +
  async getReservations(
    filter: ReservationSearchOptionsDto,
  ): Promise<ReservationDocument[]> {
    try {
      const query: any = { userId: filter.userId };
      if (filter.dateStart) {
        query.dateStart = { $gte: filter.dateStart };
      }
      if (filter.dateEnd) {
        query.dateEnd = { $lte: filter.dateEnd };
      }

      return await this.reservationModel
        .find(query)
        .populate('userId')
        .populate('roomId')
        .populate('hotelId')
        .exec();
    } catch (e) {
      console.error(e.message, e.stack);
      throw new InternalServerErrorException(
        `Ошибка при получении бронирований: ${e.message}`,
      );
    }
  }

  /** Отмена бронирования клиента */
  async removeReservation(id: ID): Promise<void> {
    try {
      await this.findById(id);
      await this.reservationModel.deleteOne({ _id: id });
    } catch (e) {
      console.error(e.message, e.stack);
      if (e instanceof BadRequestException) {
        throw new ForbiddenException(e.message);
      } else {
        throw new InternalServerErrorException(
          `Ошибка при отмене бронирования: ${e.message}`,
        );
      }
    }
  }

  /** Получение бронирования по id */
  async findById(id: ID): Promise<ReservationDocument> {
    const reservation = await this.reservationModel
      .findById(id)
      .populate('userId')
      .populate('roomId')
      .populate('hotelId');
    if (!reservation) {
      throw new BadRequestException(
        `Брони с указанным ID "${id}" не существует`,
      );
    }
    return reservation;
  }

  /** Проверка доступа брони */
  async checkClientAccess(
    reservationId: ID,
    user: UserDocument,
  ): Promise<boolean> {
    if (user.role === USER_ROLES.CLIENT) {
      const reservation = await this.findById(reservationId);
      if (user.id !== reservation.userId.id) {
        throw new ForbiddenException('Нет доступа к данному бронированию');
      }
    }
    return true;
  }
}
