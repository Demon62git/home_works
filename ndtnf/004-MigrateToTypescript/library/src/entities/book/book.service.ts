import { IBook } from './book.interface'
import { BookModel } from './book.model'
import CounterService from '../../services/counter.service'
import { v4 as uuid } from 'uuid'
import { PromiseGetBookDto, UpdateBookDto } from './book.dto'
import { HttpException } from '../../middleware'

/**
 * Сервис взаимодействия с данными книги
 */
export class BookService {
  /**
   * Получить все книги
   *
   * @returns список всех книг
   */
  async getAll(): Promise<IBook[]>  {
    const books = await BookModel.find().select('-__v')
    return books
  }

  /**
   * Получить книгу по ID
   *
   * @returns данные книги по ID
   * @throws Запись не найдена
   */
  async get(id: number): Promise<PromiseGetBookDto>  {
    const book = await BookModel.findOne({ id }).lean()
    if (book) {
      const viewBook = {
        ...book,
        viewsCount: await CounterService.get(id),
      }
      return viewBook
    } else {
      throw new HttpException('Запись не найдена', 404)
    }
  }

  /**
   * Создать книгу и вернуть ID
   *
   * @returns данные новой книги
   */
  async add(data: UpdateBookDto): Promise<IBook>  {
    const book = new BookModel({
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
  async update(id: number, data: UpdateBookDto) {
    try {
      var res = await BookModel.updateOne({ id }, { ...data })
    } catch {
      throw new HttpException('Запись не найдена', 404)
    }
    return res.modifiedCount == 1
  }

  /**
   * Удалить книгу по ID
   *
   * @returns статус удаления
   */
  async delete(id: number): Promise<number>  {
    const result = await BookModel.deleteOne({ id })
    return result.deletedCount
  }
} 
