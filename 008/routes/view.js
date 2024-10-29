import Router from 'express';
import Store from '../store.js';
import { insMulter } from '../middleware/index.js';

const viewRouter = Router();

// Главная страница
viewRouter.get('/main', (req, res) => {
    res.render('index', {
        title: 'Главная',
    });
});

// все книги  
viewRouter.get('/index', (req, res) => {
    res.render('forms/index', {
      title: 'Список книг',
      books: Store.getAllBooks()
    });
  });

// Описание книги  
viewRouter.get('/index/:id', (req, res) => {
  const book = Store.getBookById(req.params.id);
  if (book) {
  res.render('forms/view', {
    title: 'Описание',
    books: Store.getBookById(),
    book: book
  });
} 
else {
  res.redirect(`/404`);
}
});

// открытие страницы "Добавить книгу"
viewRouter.get('/create', (req, res) => {
  res.render('forms/create', {
    title: 'Добавить книгу',
    book: {},
    attachFile: ''
  });
});

// сохранение книги со страницы "Добавить книгу"
viewRouter.post('/create', insMulter.single('attachFile'), (req, res) => {
  Store.addBook(req.body, req.body.attachFile);
    res.redirect('/index');
});

// открытие страницы "Редактировать книгу"
viewRouter.get('/update/:id', (req, res) => {
  const book = Store.getBookById(req.params.id);
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
viewRouter.post('/update/:id', insMulter.single('attachFile'), (req, res) => {
    Store.updateBook(req.params.id, req.body, req.body.attachFile);
    res.redirect('/index');
});

// обновление данных книги
viewRouter.post('/delete/:id', (req, res) => {
  Store.deleteBook(req.params.id);
  res.redirect('/index');
});

// Страница ошибки 404  
viewRouter.get('/404', (req, res) => {
  res.render('common/error404', {
    title: '404 - Страница не найдена'
  });
});

export { viewRouter };