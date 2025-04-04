import {
  Controller,
  Post,
  Body,
  SetMetadata,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  SearchUserParamsDto,
  CreateUserRetDto,
} from '../user/dto/user.dto';
import { UserResponseInterceptor } from './interceptors/user-response.interceptor';
import { HttpAuthGuard } from '../auth/guards';
import { USER_ROLES } from '../common/constants';

@Controller()
@UseGuards(HttpAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Создание пользователя
  @Post('admin/users')
  @SetMetadata('roles', [USER_ROLES.ADMIN])
  async create(@Body() body: CreateUserDto): Promise<CreateUserRetDto> {
    const user = await this.userService.create(body);
    const { id, email, name, contactPhone, role } = user;
    return { id, email, name, contactPhone, role };
  }

  // Получение списка пользователей (admin)
  @Get('admin/users')
  @SetMetadata('roles', [USER_ROLES.ADMIN])
  @UseInterceptors(UserResponseInterceptor)
  async findAllForAdmin(@Query() params: SearchUserParamsDto) {
    return await this.userService.findAll(params);
  }

  // Получение списка пользователей (manager)
  @Get('manager/users')
  @SetMetadata('roles', [USER_ROLES.MANAGER])
  @UseInterceptors(UserResponseInterceptor)
  async findAllForManager(@Query() params: SearchUserParamsDto) {
    return await this.userService.findAll(params);
  }
}
