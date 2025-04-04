import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import config from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // получение jwt из куки запроса по HTTP
        (req) => req?.cookies?.token,
        // получение jwt из куки заголовка запроса по WebSocket
        (req) =>
          req?.handshake?.headers?.cookie
            .split('; ')
            .find((cookie: string) => cookie.startsWith('token'))
            .split('=')[1],
      ]),
      secretOrKey: config.auth.jwtSecret,
    });
  }

  /** Данные пользователя полученные по email */
  async validate(payload: any) {
    return await this.userService.findByEmail(payload.email);
  }
}
