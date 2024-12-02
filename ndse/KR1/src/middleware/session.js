import session from 'express-session';
import config from '../config/index.js';

export const sessionMiddleware = session({
    secret: config.authPass,
    resave: false,
    saveUninitialized: true
});