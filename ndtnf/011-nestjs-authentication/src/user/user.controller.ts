import { Controller, Get, Param } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  public getByEmail(@Param('email') email: string): Promise<UserDocument> {
    return this.userService.findByEmail(email);
  }
}
