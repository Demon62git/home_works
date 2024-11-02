import axios from 'axios';

/**
 * Сервис взаимодейстивия со счётчиком просмотров книг
 */
export default new class Counter {
    counterUrl = process.env.COUNTER_URL || "http://localhost:3003";

    /**
     * Отправляет запрос на прибавление значения счётчика по указанному ID книги
     *
     * @param bookId ID книги
     * @throws Ошибка API счётчика
     */
    async incr(bookId) {
        try {
            await axios.post(`${this.counterUrl}/counter/${bookId}/incr`);
        } catch (error) {
            console.error(error);
            throw new Error(`Ошибка API счётчика: ${error}`);
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
            const response = await axios.get(`${this.counterUrl}/counter/${bookId}`);
            return response.data.count;
        } catch (error) {
            console.error(error);
            throw new Error(`Ошибка API счётчика: ${error}`);
        }
    }
}