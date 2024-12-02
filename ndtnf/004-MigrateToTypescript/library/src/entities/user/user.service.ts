import { HttpException } from '../../middleware'
import { PromiseUserDto, RegistrationUserDto } from './user.dto'
import { IUser } from './user.interface'
import { UserModel } from './user.model'

/**
 * Сервис взаимодействия с данными пользователя
 */
export class UserService {
  async find(email: string): Promise<PromiseUserDto> {
    const user = await UserModel.findOne({ email }).lean()
    return user
  }

  async verifyPassword(email: string, password: string): Promise<PromiseUserDto> {
    return await UserModel.findOne({ email }).lean()
  }

  async registration(body: IUser): Promise<RegistrationUserDto> {
    if (!body.email || !body.login || !body.password) {
      throw new HttpException('Заполните все поля', 400)
    }
    if (await this.find(body.email)) {
      throw new HttpException('Пользователь с таким e-mail уже зарегистрирован', 400)
    }
    try {
      const user = new UserModel({
        login: body.login,
        email: body.email,
        firstname: body.firstname,
        name: body.name,
        thirdname: body.thirdname,
        password: body.password,
      }).save()
      return {
        ...body,
        message: `Пользователь ${body.login} зарегистрирован`,
      }
    } catch (error) {
      throw new HttpException(`Ошибка при регистрации пользователя`, 500)
    }
  }
} 
