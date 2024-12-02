import { Router } from "express";
import passport from '../../services/passport.service';
import db from "../../services/db.service";
import { userAuth } from "../../middleware";
import { PromiseUserDto } from "../../entities/user/user.dto";

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

router.get('/profile', userAuth, async (req, res) => {
    // const user = await db.userService.find(req.user.email);
    res.render('user/profile', {
        title: 'Профиль',
        user: req.user,
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
    const result = await db.userService.registration(req.body);
    req.session.messageUserSignup = result.message;
    res.redirect('/view/user/profile');
  } catch (error) {
    res.render('user/profile', {
        title: 'Регистрация',
        user: req.user,
        defaults: req.body,
        message: req.session.messageUserSignup,
    });
  }
});

router.get('/logout', userAuth, (req, res) => {
    req.logout(() => { });
    res.redirect('/view/user/login');
  });

export default router;