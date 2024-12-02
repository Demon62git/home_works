import axios from 'axios'
import config from '../config/index.js'

/**
 * Сервис взаимодейстивия со счётчиком просмотров книг
 */
class CounterService {
  /**
   * Отправляет запрос на прибавление значения счётчика по указанному ID книги
   *
   * @param bookId ID книги
   * @throws Ошибка API счётчика
   */
  async incr(bookId) {
    try {
      await axios.post(`${config.counterUrl}/counter/${bookId}/incr`)
    } catch (error) {
      console.error(error)
      throw new Error(`Ошибка API счётчика: ${error}`)
    }
  }

  /**
   * Отправляет запрос на получение кол-ва просмотров книги по переданному ID
   *
   * @param bookId ID книги
   * @returns кол-во просмотров
   * @throws Ошибка API счётчика
   */
  async get(bookId) {
    try {
      const response = await axios.get(`${config.counterUrl}/counter/${bookId}`)
      return response.data.count
    } catch (error) {
      console.error(error)
      throw new Error(`Ошибка API счётчика: ${error}`)
    }
  }
}

export default new CounterService()
