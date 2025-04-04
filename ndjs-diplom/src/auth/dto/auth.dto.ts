import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/** Параметры входа */
export class LoginDto {
  @IsEmail({}, { message: 'Некорректный формат почты' })
  @IsNotEmpty({ message: 'Поле email обязательна для заполнения' })
  email: string;

  @IsString({ message: 'Пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Поле password обязательно для заполнения' })
  password: string;
}

/** Формат ответа при входе */
export interface ILoginResponse {
  email: string;
  name: string;
  contactPhone: string;
}

/** Параметры регистрации */
export class RegisterClientDto {
  @IsEmail({}, { message: 'Некорректный формат почты' })
  @IsNotEmpty({ message: 'Поле email обязательно для заполнения' })
  email: string;

  @IsString({ message: 'Пароль должно быть строкой' })
  @MinLength(4, { message: 'Пароль должен быть не менее 4 символов' })
  @MaxLength(20, { message: 'Пароль должен быть не более 20 символов' })
  @IsNotEmpty({ message: 'Поле password обязательно для заполнения' })
  password: string;

  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @MinLength(4, { message: 'Имя пользователя должно быть не менее 4 символов' })
  @IsNotEmpty({ message: 'Поле name обязательно для заполнения' })
  name: string;

  @IsPhoneNumber('RU', { message: 'Некорректный номер телефона' })
  @IsOptional()
  contactPhone?: string;
}

/** Формат ответа при регистрации клиента */
export interface IRegisterClientResponse {
  id: string;
  email: string;
  name: string;
}
