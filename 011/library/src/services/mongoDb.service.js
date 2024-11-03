import mongoose from 'mongoose';
import config from '../config/index.js'
import Book from '../model/book.js'
import Counter from '../services/counter.service.js'
import { v4 as uuid } from 'uuid';

/**
 * Сервис взаимодействия с БД
 */
export default new class Db {

    /**
     * Подключение к БД
     *
     * @throws Ошибка соединения
     */
    async connect(){
        try {
            await mongoose.connect(config.dbConnectionUrl);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Получить все книги
     *
     * @returns список всех книг
     */
    async getAll() {
        const books = await Book.find().select('-__v');
        return books;
      }

    /**
     * Получить книгу по ID
     *
     * @returns данные книги по ID
     * @throws Запись не найдена
     */
    async get(id) {
        const book =await Book.findOne({ id });
        if (book) {
            const viewBook = {
                ...book._doc,
                viewsCount: await Counter.get(id) };
            return viewBook;
        } else {
            throw new Error('Запись не найдена');
        }
    }

    /**
     * Создать книгу и вернуть ID
     *
     * @returns данные новой книги
     */
    async add(data) {
        const book = new Book(
            {   
                id: uuid(),
                ...data,
            });
        return await book.save();
    }

    /**
     * Редактировать книгу по ID
     *
     * @returns статус обновления
     */
    async update(id, data) {
        try {
            var res = await Book.updateOne( { id }, { ...data } );
        } catch (Error) {
            throw new Error('Запись не найдена');
        }
        return res.modifiedCount == 1;
    }

    /**
     * Удалить книгу по ID
     *
     * @returns статус удаления
     */
    async delete(id) {
        const result = await Book.deleteOne({ id });
        return (result.deletedCount);
    }
}

   
