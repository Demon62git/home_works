import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHotelService } from '../hotel/interfaces';
import { Hotel, HotelDocument } from '../hotel/schemas';
import {
  //   CreateHotelDto,
  //   SearchHotelParams,
  //   UpdateHotelDto,
  FillHotelDto,
  SearchHotelParamsDto,
} from '../hotel/dto';
import { ID } from '../common/types';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  /** Добавление отеля */
  async create(data: FillHotelDto): Promise<HotelDocument> {
    try {
      const hotel = new this.hotelModel(data);
      return await hotel.save();
    } catch (e) {
      console.error(e.message, e.stack);
      throw new InternalServerErrorException(
        `Ошибка при добавлении гостиницы: ${e.message}`,
      );
    }
  }

  /** Обновление отеля */
  async update(id: ID, data: FillHotelDto): Promise<HotelDocument> {
    try {
      const hotel = await this.hotelModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!hotel) {
        throw new NotFoundException(`Гостиница с id "${id}" не найдена`);
      }
      return hotel;
    } catch (e) {
      console.error(e.message, e.stack);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        `Ошибка при обновлении гостиницы: ${e.message}`,
      );
    }
  }

  /** Получение списка отелей */
  async search(params: SearchHotelParamsDto): Promise<HotelDocument[]> {
    try {
      const query = this.hotelModel.find();
      if (params.title) {
        query.where('title').regex(new RegExp(params.title, 'i'));
      }
      return await query.limit(params.limit).skip(params.offset).exec();
    } catch (e) {
      console.error(e.message, e.stack);
      throw new InternalServerErrorException(
        `Ошибка при поиске гостиниц: ${e.message}`,
      );
    }
  }

  /** Получение отеля по id */
  async findById(id: ID): Promise<HotelDocument> {
    const hotel = await this.hotelModel.findById(id);
    if (!hotel) {
      throw new NotFoundException(`Гостиница с id "${id}" не найдена`);
    }
    return hotel;
  }
}
