import express from 'express';
import Store from '../model/store.js';
import { insMulter } from '../middleware/index.js';

const router = express.Router();

// Главная страница
router.get('/main', (req, res) => {
    res.render('index', {
        title: 'Главная',
    });
});

// все книги  
router.get('/index', (req, res) => {
    res.render('forms/index', {
      title: 'Список книг',
      books: Store.getAllBooks()
    });
  });

// Описание книги  
router.get('/index/:id', async (req, res) => {
  const book = await Store.getBookById(req.params.id);
  if (book) {
  res.render('forms/view', {
    title: 'Описание',
    books: await Store.getBookById(),
    book: book
  });
} 
else {
  res.redirect(`/404`);
}
});

// открытие страницы "Добавить книгу"
router.get('/create', (req, res) => {
  res.render('forms/create', {
    title: 'Добавить книгу',
    book: {},
    attachFile: ''
  });
});

// сохранение книги со страницы "Добавить книгу"
router.post('/create', insMulter.single('attachFile'), (req, res) => {
  Store.addBook(req.body, req.body.attachFile);
    res.redirect('/index');
});

// открытие страницы "Редактировать книгу"
router.get('/update/:id', async (req, res) => {
  const book = await Store.getBookById(req.params.id);
  if (book) {
  res.render('forms/update', {
    title: 'Редактировать книгу',
    book: book,
    attachFile: book.fileBook
  });
} else {
  res.redirect(`/404`);
}
});

// обновление данных книги
router.post('/update/:id', insMulter.single('attachFile'), (req, res) => {
    Store.updateBook(req.params.id, req.body, req.body.attachFile);
    res.redirect('/index');
});

// удаление данных книги
router.post('/delete/:id', (req, res) => {
  Store.deleteBook(req.params.id);
  res.redirect('/index');
});

// Страница ошибки 404  
router.get('/404', (req, res) => {
  res.render('common/error404', {
    title: '404 - Страница не найдена'
  });
});

export default router;