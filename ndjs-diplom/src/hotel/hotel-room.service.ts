import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { IHotelRoomService } from '../hotel/interfaces';
import { HotelRoom, HotelRoomDocument } from '../hotel/schemas';
import { FillHotelRoomDto, SearchRoomsParamsDto } from '../hotel/dto';
import { HotelService } from './hotel.service';
import { ID } from '../common/types';
import config from '../config/';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name) private roomModel: Model<HotelRoomDocument>,
    private readonly hotelService: HotelService,
  ) {}

  /** Добавление номера */
  async create(data: FillHotelRoomDto): Promise<HotelRoomDocument> {
    try {
      const room = await new this.roomModel({
        hotel: data.hotelId,
        description: data.description,
        isEnabled: true,
      }).populate('hotel');

      if (!room.hotel) {
        throw new NotFoundException(
          `Гостиница с id "${data.hotelId}" не найдена`,
        );
      }

      room.images = await this.uploadImages(room, data.images);
      return await room.save();
    } catch (e) {
      console.error(e.message, e.stack);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        `Ошибка при добавлении номера: ${e.message}`,
      );
    }
  }

  /** Получение номера по id */
  async findById(id: ID): Promise<HotelRoomDocument> {
    const room = await this.roomModel.findById(id).populate('hotel');
    if (!room) {
      throw new NotFoundException(`Номер с id "${id}" не найден`);
    }
    return room;
  }

  /** Поиск номеров */
  async search(params: SearchRoomsParamsDto): Promise<HotelRoomDocument[]> {
    try {
      const query = this.roomModel.find();
      if (params.hotel) {
        query.where('hotel').equals(new Types.ObjectId(params.hotel));
      }
      if (params.isEnabled) {
        query.where('isEnabled').equals(params.isEnabled);
      }
      return await query
        .limit(params.limit)
        .skip(params.offset)
        .populate('hotel')
        .exec();
    } catch (e) {
      console.error(e.message, e.stack);
      throw new InternalServerErrorException(
        `Ошибка при поиске номеров: ${e.message}`,
      );
    }
  }

  /** Обновление номера */
  async update(id: ID, data: FillHotelRoomDto): Promise<HotelRoomDocument> {
    try {
      const room = await this.findById(id);
      if (data.hotelId && room.hotel.id !== data.hotelId) {
        room.hotel = await this.hotelService.findById(data.hotelId);
      }
      room.description = data.description;
      room.isEnabled = data.isEnabled;

      const images = await this.uploadImages(room, data.images);
      room.images = Array.from(new Set([...room.images, ...images]));
      return await room.save();
    } catch (e) {
      console.error(e.message, e.stack);
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        `Ошибка при обновлении номера: ${e.message}`,
      );
    }
  }

  /** Сохранение изображений на сервере */
  private async uploadImages(
    room: HotelRoomDocument,
    files: Express.Multer.File[],
  ): Promise<string[]> {
    if (!files.length) {
      return [];
    }
    const roomDir = path.join(config.settings.storage, room.hotel.id, room.id);
    fs.mkdirSync(roomDir, { recursive: true });

    const savedImagePaths = await Promise.all(
      files.map(async (file) => {
        const imagePath = path.join(roomDir, file.originalname);
        fs.writeFileSync(imagePath, file.buffer);
        return path.relative(config.settings.storage, imagePath);
      }),
    );
    return savedImagePaths;
  }
}
