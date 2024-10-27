import express from 'express';
import Store from './store.js';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.listen(port, () => console.log(`Ручки можно проверить на http://localhost:${port}`));

// авторизация пользователя	метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }
app.post('/api/user/login', (req, res) => {
    res = Store.login();
});	

// получить все книги получаем массив всех книг
app.get('/api/books', (req, res) => {
    res.json(Store.getAllBooks());
});	

// получить книгу по ID	получаем объект книги, если запись не найдена, вернём Code: 404
app.get('/api/books/:id', (req, res) => {
    const data = Store.getBookById(req.params.id);
    if (data) {
        res.json(data);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});	

// создать книгу создаём книгу и возвращаем её же вместе с присвоенным ID
app.post('/api/books', (req, res) => {
    const book = Store.addBook(req.body);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json(`Запись не создана`);
    }
});		

// редактировать книгу по ID редактируем объект книги, если запись не найдена, вернём Code: 404
app.put('/api/books/:id', (req, res) => {
    const book = Store.updateBook(req.params.id, req.body);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});	


// удалить книгу по ID удаляем книгу и возвращаем ответ: 'ok'
app.delete('/api/books/:id', (req, res) => {
    if (Store.deleteBook(req.params.id)) {
        res.json(`Запись ${req.params.id} удалена`);
    } else {
        res.status(404);
        res.json(`Запись ${req.params.id} не найдена`);
    }
});		