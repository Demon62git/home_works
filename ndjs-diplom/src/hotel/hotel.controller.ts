import {
  Body,
  Controller,
  SetMetadata,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from '../hotel/hotel.service';
import { HotelRoomService } from '../hotel/hotel-room.service';
import {
  FillHotelDto,
  FillHotelRoomDataDto,
  SearchHotelParamsDto,
  SearchRoomsParamsDto,
} from '../hotel/dto';
import {
  HotelResponseInterceptor,
  HotelRoomResponseInterceptor,
} from '../hotel/interceptors';
import { HttpAuthGuard } from '../auth/guards';
import { RoomEnabledGuard } from './guards/room-enabled.guard';
import { ID } from '../common/types';
import { FilesInterceptor } from '@nestjs/platform-express';
import { USER_ROLES } from '../common/constants';

@Controller()
@UseGuards(HttpAuthGuard)
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly roomService: HotelRoomService,
  ) {}

  // Добавление гостиницы
  @Post('admin/hotels')
  @UseInterceptors(HotelResponseInterceptor)
  @SetMetadata('roles', [USER_ROLES.ADMIN])
  async createHotel(@Body() body: FillHotelDto) {
    return await this.hotelService.create(body);
  }

  // Изменение гостиницы
  @Put('admin/hotels/:id')
  @SetMetadata('roles', [USER_ROLES.ADMIN])
  @UseInterceptors(HotelResponseInterceptor)
  async updateHotel(@Param('id') id: ID, @Body() body: FillHotelDto) {
    return await this.hotelService.update(id, body);
  }

  // Получение списка гостиниц
  @Get('admin/hotels')
  @SetMetadata('roles', [USER_ROLES.ADMIN])
  @UseInterceptors(HotelResponseInterceptor)
  async searchHotel(@Query() params: SearchHotelParamsDto) {
    return await this.hotelService.search(params);
  }

  // Добавление номера
  @Post('admin/hotel-rooms')
  @SetMetadata('roles', [USER_ROLES.ADMIN])
  @UseInterceptors(FilesInterceptor('images'))
  @UseInterceptors(HotelRoomResponseInterceptor)
  async createRoom(
    @Body() body: FillHotelRoomDataDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.roomService.create({ ...body, images });
  }

  // Информация о номере
  @Get('common/hotel-rooms/:id')
  @UseInterceptors(HotelRoomResponseInterceptor)
  async getRoom(@Param('id') id: ID) {
    return await this.roomService.findById(id);
  }

  //	Поиск номеров
  @Get('common/hotel-rooms')
  @UseGuards(RoomEnabledGuard)
  @UseInterceptors(HotelRoomResponseInterceptor)
  async searchRoom(@Query() params: SearchRoomsParamsDto) {
    return await this.roomService.search(params);
  }

  // Изменение номера
  @Put('admin/hotel-rooms/:id')
  @SetMetadata('roles', [USER_ROLES.ADMIN])
  @UseInterceptors(FilesInterceptor('images'))
  @UseInterceptors(HotelRoomResponseInterceptor)
  async updateRoom(
    @Param('id') id: ID,
    @Body() body: FillHotelRoomDataDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.roomService.update(id, { ...body, images });
  }
}
