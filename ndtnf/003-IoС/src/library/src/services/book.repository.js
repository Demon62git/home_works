import Book from '../model/book.model.js'
import { CounterService } from './index.js'
import { v4 as uuid } from 'uuid'

/**
 * Сервис взаимодействия с данными книги
 */
class BookRepository {
  /**
   * Получить все книги
   *
   * @returns список всех книг
   */
  async getAll() {
    const books = await Book.find().select('-__v')
    return books
  }

  /**
   * Получить книгу по ID
   *
   * @returns данные книги по ID
   * @throws Запись не найдена
   */
  async get(id) {
    const book = await Book.findOne({ id })
    if (book) {
      const viewBook = {
        ...book._doc,
        viewsCount: await CounterService.get(id),
      }
      return viewBook
    } else {
      throw new Error('Запись не найдена')
    }
  }

  /**
   * Создать книгу и вернуть ID
   *
   * @returns данные новой книги
   */
  async add(data) {
    const book = new Book({
      id: uuid(),
      ...data,
    })
    return await book.save()
  }

  /**
   * Редактировать книгу по ID
   *
   * @returns статус обновления
   */
  async update(id, data) {
    try {
      var res = await Book.updateOne({ id }, { ...data })
    } catch (Error) {
      throw new Error('Запись не найдена')
    }
    return res.modifiedCount == 1
  }

  /**
   * Удалить книгу по ID
   *
   * @returns статус удаления
   */
  async delete(id) {
    const result = await Book.deleteOne({ id })
    return result.deletedCount
  }
}

export default BookRepository
