import express from 'express';
import Db from '../services/mongoDb.service.js';
import Counter from '../services/counter.service.js';
import { insMulter } from '../middleware/index.js';

const router = express.Router();

// Главная страница
router.get('/main', (req, res) => {
    res.render('index', {
        title: 'Главная',
    });
});

// все книги  
router.get('/index', async (req, res) => {
    res.render('forms/index', {
      title: 'Список книг',
      books: await Db.getAll()
    });
  });

// Описание книги  
router.get('/index/:id', async (req, res) => {
  
    await Counter.incr(req.params.id);
  try {  
    const book = await Db.get(req.params.id);
    res.render('forms/view', {
      title: 'Описание',
      book: book
    });
  } catch (error){
    res.redirect(`/error/402`);
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
router.post('/create', insMulter.single('attachFile'), async (req, res) => {
  try{
    await Db.add(req.body);
    res.redirect('/index');
  } catch (error){
    res.redirect(`/error/403`);
  }
});

// открытие страницы "Редактировать книгу"
router.get('/update/:id', async (req, res) => {
  const book = await Db.get(req.params.id);
  if (book) {
  res.render('forms/update', {
    title: 'Редактировать книгу',
    book: book,
    attachFile: book.fileName
  });
} else {
  res.redirect(`/error/402`);
}
});

// обновление данных книги
router.post('/update/:id', insMulter.single('attachFile'), async (req, res) => {
  try {
    await Db.update(req.params.id, req.body);
  } catch (error) {
    res.redirect(`/error/403`);
  }
  res.redirect('/index');
});

// удаление данных книги
router.post('/delete/:id', async (req, res) => {
  try {
    await Db.delete(req.params.id);
    res.redirect('/index');
  } catch (error) {
    res.redirect(`/error/403`);
  }
});

// Страница ошибки 404  
router.get('/error/:num', (req, res) => {
  let title;
  switch (req.params.num) {
    case '404':
      title = '404 - Страница не найдена';
      break;
    case '402':
      title = '402 - Запись не найдена';
      break;
    case '403':
      title = '403 - Ошибка обновления данных';
      break;
  }
  res.render('common/error', {
    title: title
  });
});

export default router;