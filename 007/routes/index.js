import Router from 'express';
import Store from '../store.js';
import path from 'path';
import { insMulter } from '../middleware/index.js';

const router = Router();

// авторизация пользователя	метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }
router.post('/user/login', (req, res) => {
    res = Store.login();
});	

// получить все книги получаем массив всех книг
router.get('/books', (req, res) => {
    res.json(Store.getAllBooks());
});	

// получить книгу по ID	получаем объект книги, если запись не найдена, вернём Code: 404
router.get('/books/:id', (req, res) => {
    const data = Store.getBookById(req.params.id);
    if (data) {
        res.json(data);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});	

// создать книгу создаём книгу и возвращаем её же вместе с присвоенным ID
router.post('/books', insMulter.single('attachFile'), (req, res) => {
    const book = Store.addBook(req.body, req.file.path);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json(`Запись не создана`);
    }
});		

// редактировать книгу по ID редактируем объект книги, если запись не найдена, вернём Code: 404
router.put('/books/:id', (req, res) => {
    const book = Store.updateBook(req.params.id, req.body);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});	


// удалить книгу по ID удаляем книгу и возвращаем ответ: 'ok'
router.delete('/books/:id', (req, res) => {
    if (Store.deleteBook(req.params.id)) {
        res.json(`Запись ${req.params.id} удалена`);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});		

// скачивание файла книги
router.get('/books/:id/download', (req, res) => {
    const book = Store.getBookById(req.params.id)
    if (book) {
        const filePath = path.join('uploads', book.fileName);
        res.download(filePath, (err) => {
            if (err) {
                res.status(404)
                res.json(`Файл ${book.fileName} не найден`)
            }
        })
    } else {
        res.status(404)
        res.json(`Запись ${req.params.id} не найдена`)
    }
  })

export { router };