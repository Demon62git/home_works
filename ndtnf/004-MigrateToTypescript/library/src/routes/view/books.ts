import express from 'express'
import db from '../../services/db.service'
import Counter from '../../services/counter.service'
import { userAuth, multer } from '../../middleware'

const router = express.Router()

router.use(userAuth)

// все книги
router.get('/index', async (req, res) => {
  res.render('book/index', {
    title: 'Список книг',
    books: await db.bookService.getAll(),
    user: req.user,
  })
})

// Описание книги
router.get('/index/:id', async (req, res) => {
  await Counter.incr(+req.params.id)
  try {
    const book = await db.bookService.get(+req.params.id)
    res.render('book/view', {
      title: 'Описание',
      book: book,
      user: req.user,
    })
  } catch (error) {
    res.redirect(`/error/402`)
  }
})

// открытие страницы "Добавить книгу"
router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Добавить книгу',
    book: {},
    user: req.user,
    attachFile: '',
  })
})

// сохранение книги со страницы "Добавить книгу"
router.post(
  '/create',
  multer.single('attachFile'),
  async (req, res) => {
    try {
      await db.bookService.add(req.body)
      res.redirect('/view/books/index')
    } catch (error) {
      res.redirect(`/error/403`)
    }
  },
)

// открытие страницы "Редактировать книгу"
router.get('/update/:id', async (req, res) => {
  const book = await db.bookService.get(+req.params.id)
  if (book) {
    res.render('book/update', {
      title: 'Редактировать книгу',
      book: book,
      user: req.user,
      attachFile: book.fileName,
    })
  } else {
    res.redirect(`/error/402`)
  }
})

// обновление данных книги
router.post(
  '/update/:id',
  multer.single('attachFile'),
  async (req, res) => {
    try {
      await db.bookService.update(+req.params.id, req.body)
    } catch (error) {
      res.redirect(`/error/403`)
    }
    res.redirect('/view/books/index')
  },
)

// удаление данных книги
router.post('/delete/:id', async (req, res) => {
  try {
    await db.bookService.delete(+req.params.id)
    res.redirect('/view/books/index')
  } catch (error) {
    res.redirect(`/error/403`)
  }
})

// Страница ошибки 404
router.get('/error/:num', (req, res) => {
  let title
  switch (req.params.num) {
    case '404':
      title = '404 - Страница не найдена'
      break
    case '402':
      title = '402 - Запись не найдена'
      break
    case '403':
      title = '403 - Ошибка обновления данных'
      break
  }
  res.render('common/error', {
    title: title,
  })
})

export default router
