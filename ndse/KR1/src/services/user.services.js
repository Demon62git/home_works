import { UserModel } from '../model/index.js'
import { ErrorHttp } from '../services/index.js'
import { hashPass, verifyPass } from '../services/hash.service.js'

class UserService {

/**
* Поиск пользователя по email
*/
async findByEmail(email) {
    try {
        const user = await UserModel.findOne({ email }, { passwordHash: 0, __v: 0 }).lean();
        return user;
    } catch (error) {
      console.log(error);
        return null;
    }
}

  async verifyPass(email, password) {
    try {
      const user = await UserModel.findOne({ email }).lean();
      if (user) {
        return await verifyPass(password, user.passwordHash);
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

/**
* Создание пользователя
*/
async create(body) {
    const existUser = await this.findByEmail(body.email);
    if (existUser) {
        throw new ErrorHttp(500, 'Пользователь уже существует');
    }

    try {
        const user = new UserModel({
            email: body.email,
            passwordHash: await hashPass(body.password),
            name: body.name,
            contactPhone: body.contactPhone,
      });
        await user.save();
        return this.findByEmail(body.email);
    } catch (error) {
        throw new ErrorHttp(500, error.message);
    }
}
}

export default new UserService();