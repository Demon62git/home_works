import passport from 'passport';
import { Strategy } from 'passport-local';
import db from './db.service.js';

const options = {
  usernameField: "email",
  passwordField: "password",
}

const strategy = new Strategy(options,
  async (email, password, done) => {
    const user = await db.UserService.find(email);
    if (!user) {
      return done(null, false, { message: `Пользователь ${email} не зарегистрирован` });
    }
    if (!(await db.UserService.verifyPassword(email, password))) {
      return done(null, false, { message: 'Неверный пароль' });
    }
    return done(null, user);
  });

passport.use('local', strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  if (await db.UserService.find(user.email)) {
    return done(null, user);
  } else {
    return done(new Error(`Пользователь ${user.email} не найден`));
  }
});

export default passport;