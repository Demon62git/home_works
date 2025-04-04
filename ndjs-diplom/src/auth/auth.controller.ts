import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import {
  ILoginResponse,
  IRegisterClientResponse,
  LoginDto,
  RegisterClientDto,
} from './dto/auth.dto';
import { IsAuthGuard, IsUnauthGuard } from './guards';
import { USER_ROLES } from '../common/constants';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /** Вход */
  @Post('auth/login')
  @UseGuards(IsUnauthGuard)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const { token } = await this.authService.getToken(user);
    res.cookie('token', token, { httpOnly: true });
    const response: ILoginResponse = {
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    };
    return res.status(HttpStatus.OK).json(response);
  }

  /** Выход */
  @Post('auth/logout')
  @UseGuards(IsAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.sendStatus(HttpStatus.OK);
  }

  /** Регистрация */
  @Post('client/register')
  @UseGuards(IsUnauthGuard)
  async register(
    @Body() dto: RegisterClientDto,
  ): Promise<IRegisterClientResponse> {
    const user = await this.userService.create({
      ...dto,
      role: USER_ROLES.CLIENT,
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
