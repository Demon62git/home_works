import express from 'express';
import db from '../../services/db.service';
import Counter from '../../services/counter.service';
import path from 'path';
import { multer } from '../../middleware';

const router = express.Router();

// получить все книги получаем массив всех книг
router.get('/', async (req, res) => {
    try {
        const books = await db.bookService.getAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: `Ошибка: ${error}` });
    }
});	

// получить книгу по ID	получаем объект книги, если запись не найдена, вернём Code: 404
router.get('/books/:id', async (req, res) => {
    await Counter.incr(+req.params.id);
    const data = await db.bookService.get(+req.params.id);
    if (data) {
        res.json(data);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});	

// создать книгу создаём книгу и возвращаем её же вместе с присвоенным ID
router.post('/books', multer.single('attachFile'), async (req, res) => {
    const book = await db.bookService.add(req.body);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json(`Запись не создана`);
    }
});		

// редактировать книгу по ID редактируем объект книги, если запись не найдена, вернём Code: 404
router.put('/books/:id', multer.single('attachFile'), async (req, res) => {
    const book = await db.bookService.update(+req.params.id, req.body);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});	


// удалить книгу по ID удаляем книгу и возвращаем ответ: 'ok'
router.delete('/books/:id', async (req, res) => {
    if (await db.bookService.delete(+req.params.id)) {
        res.json(`Запись ${req.params.id} удалена`);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});		

// скачивание файла книги
router.get('/books/:id/download', async (req, res) => {
    const book = await db.bookService.get(+req.params.id);
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