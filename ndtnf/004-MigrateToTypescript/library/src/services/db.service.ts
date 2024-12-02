import mongoose from 'mongoose'
import config from '../config/index'
import { BookService, UserService } from '../entities'
import container from '../entities/container'

const bookService = container.get(BookService)
const userService = container.get(UserService)

const dbServices = {
  connect:
    /**
     * Подключение к БД
     *
     * @throws Ошибка соединения
     */
    async function connect() {
      try {
        await mongoose.connect(config.dbConnectionUrl)
      } catch (error) {
        console.error(error)
      }
    },

  bookService,
  userService,
}

export default dbServices
