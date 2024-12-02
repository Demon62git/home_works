import express from 'express';
import db from '../../services/db.service.js';
import Counter from '../../services/counter.service.js';
import path from 'path';
import { middleware } from '../../middleware/index.js';

const router = express.Router();

// получить все книги получаем массив всех книг
router.get('/', async (req, res) => {
    try {
        const books = await db.BookService.getAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: `Ошибка: ${error}` });
    }
});	

// получить книгу по ID	получаем объект книги, если запись не найдена, вернём Code: 404
router.get('/books/:id', async (req, res) => {
    await Counter.incr(req.params.id);
    const data = await db.BookService.get(req.params.id);
    if (data) {
        res.json(data);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});	

// создать книгу создаём книгу и возвращаем её же вместе с присвоенным ID
router.post('/books', middleware.multer.single('attachFile'), async (req, res) => {
    const book = await db.BookService.add(req.body);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json(`Запись не создана`);
    }
});		

// редактировать книгу по ID редактируем объект книги, если запись не найдена, вернём Code: 404
router.put('/books/:id', middleware.multer.single('attachFile'), async (req, res) => {
    const book = await db.BookService.update(req.params.id, req.body);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});	


// удалить книгу по ID удаляем книгу и возвращаем ответ: 'ok'
router.delete('/books/:id', async (req, res) => {
    if (await db.BookService.delete(req.params.id)) {
        res.json(`Запись ${req.params.id} удалена`);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});		

// скачивание файла книги
router.get('/books/:id/download', async (req, res) => {
    const book = await db.BookService.get(req.params.id);
    if (book) {
        const filePath = path.join('uploads', book.fileName);
        res.download(filePath, (err) => {
            if (err) {
                res.status(404);
                res.json(`Файл ${book.fileName} не найден`);
            }
        })
    } else {
        res.status(404)
        res.json(`Запись ${req.params.id} не найдена`);
    }
  })

export default router;