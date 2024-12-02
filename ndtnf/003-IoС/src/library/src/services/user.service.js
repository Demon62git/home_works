import UserModel from '../model/user.model.js'

/**
 * Сервис взаимодействия с данными пользователя
 */
class UserService {
  async find(email) {
    const user = await UserModel.findOne({ email }).lean()
    return user
  }

  async verifyPassword(email, password) {
    return await UserModel.findOne({ email }).lean()
  }

  async registration(body) {
    if (!body.email || !body.login || !body.password) {
      throw new Error('Заполните все поля', 400)
    }
    if (await this.find(body.email)) {
      throw new Error('Пользователь с таким e-mail уже зарегистрирован', 400)
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
        message: `Пользователь ${body.login} зарегистрирован`,
      }
    } catch (error) {
      throw new Error(`Ошибка при регистрации пользователя`, 500)
    }
  }
}

export default new UserService()
