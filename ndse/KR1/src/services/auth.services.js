import passport from 'passport';
import { Strategy } from 'passport-local';
import { UserService } from '../services/index.js';

passport.use('local', new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        const user = await UserService.findByEmail(email);
        const validPass = await UserService.verifyPass(email, password);
        if (!user || !validPass) {
            return done(null, false, { message: 'Неверный логин или пароль' });
        }
        return done(null, user);
    }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
    if (await UserService.findByEmail(user.email)) {
        return done(null, user);
    } else {
        return done(new Error(`Пользователь ${user.email} не найден`));
    }
});

export const authUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({
            error: 'Пользователь не авторизован',
            status: 'error',
        });
    }
}

export { passport };