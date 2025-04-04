import {
  IsNumber,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { USER_ROLES } from '../../common/constants';
import { IRegisterClientResponse } from '../../auth/dto/auth.dto';
import { ID } from 'src/common/';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('RU')
  @IsOptional()
  contactPhone?: string;

  @IsEnum(USER_ROLES)
  @IsNotEmpty()
  role: USER_ROLES;
}

export class SearchUserParamsDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('RU')
  @IsOptional()
  contactPhone?: string;
}

export interface CreateUserRetDto extends IRegisterClientResponse {
  contactPhone?: string;
  role: USER_ROLES;
}

export class UserResponseDto {
  @IsNotEmpty()
  id: ID;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('RU')
  @IsOptional()
  contactPhone?: string;
}
