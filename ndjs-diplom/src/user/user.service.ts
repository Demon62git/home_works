import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserService } from './interfaces/user.interface';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, SearchUserParamsDto } from './dto/user.dto';
import { ID } from '../common/types';
import config from '../config/';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  /** Создание пользователя */
  async create(data: CreateUserDto): Promise<UserDocument> {
    try {
      if (await this.userModel.findOne({ email: data.email })) {
        throw new ConflictException(
          `Пользователь с email ${data.email} уже существует`,
        );
      }
      const user = new this.userModel({
        email: data.email,
        passwordHash: await this.hashPassword(data.password),
        name: data.name,
        contactPhone: data.contactPhone,
        role: data.role,
      });
      return await user.save();
    } catch (error) {
      console.error(error.message, error.stack);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(`Ошибка: ${error.message}`);
    }
  }

  /** Поиск пользователя по id */
  async findById(id: ID): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  /** Поиск пользователя по email */
  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  /** Поиск всех пользователей */
  async findAll(params: SearchUserParamsDto): Promise<UserDocument[]> {
    try {
      const query = this.userModel.find();
      if (params.name) {
        // Поиск по имени пользователя с возможностью частичного совпадения
        query.where('name').regex(new RegExp(params.name, 'i'));
      }
      if (params.email) {
        // Поиск по email пользователя с возможностью частичного совпадения
        query.where('email').regex(new RegExp(params.email, 'i'));
      }
      if (params.contactPhone) {
        // Поиск по номеру телефона пользователя с возможностью частичного совпадения
        query.where('contactPhone').regex(new RegExp(params.contactPhone, 'i'));
      }
      return await query.limit(params.limit).skip(params.offset).exec();
    } catch (error) {
      console.error(error.message, error.stack);
      throw new InternalServerErrorException(`Ошибка: ${error.message}`);
    }
  }

  /** Хеширование пароля */
  async hashPassword(password: string) {
    return await bcrypt.hash(password, config.auth.saltRounds);
  }
}
