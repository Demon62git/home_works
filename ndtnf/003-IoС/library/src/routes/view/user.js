import { Router } from "express";
import passport from '../../services/passport.service.js';
import db from "../../services/db.service.js";
import userAuth from "../../middleware/userAuth.js";

const router = Router();

router.get('/login', async (req, res) => {
  let message = req.session.messageUserSignup;
  req.session.messageUserSignup = '';

  res.render('user/login', {
    title: 'Авторизация',
    user: req.user,
    defaults: {},
    message: message,
  });
});

router.post('/login', passport.authenticate('local', 
    {   passReqToCallback: true,
        failureMessage: true,
        failWithError: true }),
    async (req, res) => {
        res.redirect('/view/books/index');
    });

router.use((err, req, res, next) => {
    switch(err.status){
        case 400:
            req.session.messageUserSignup = 'Введены не верные данные';
            break;
        case 401:
            req.session.messageUserSignup = 'Пользователь не найден';
            break;
        case 500:
            req.session.messageUserSignup = 'Ошибка другая';
            break;
    };
    res.redirect('/view/user/login');
});

router.get('/profile', userAuth, async (req, res) => {
    const user = await db.UserService.find(req.user.email);
    res.render('user/profile', {
        title: 'Профиль',
        user: user,
        defaults: req.user,
        message: '',
    });
});

router.get('/signup', async (req, res) => {
    res.render('user/profile', {
        title: 'Регистрация',
        user: req.user,
        defaults: {},
        message: '',
    });
});

router.post('/signup', async (req, res) => {
  try {
    const result = await db.UserService.registration(req.body);
    req.session.messageUserSignup = result.message;
    res.redirect('/view/user/profile');
  } catch (error) {
    res.render('user/profile', {
        title: 'Регистрация',
        user: req.user,
        defaults: req.body,
        message: error.message,
    });
  }
});

router.get('/logout', userAuth, (req, res) => {
    req.logout(() => { });
    res.redirect('/view/user/login');
  });

export default router;