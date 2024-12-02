import mongoose from 'mongoose'
import config from '../config/index.js'
import { BookRepository, UserService } from './index.js'
import container from './container.js'

const BookService = container.get(BookRepository)

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

  BookService,
  UserService,
}

export default dbServices
