import session from 'express-session';
import config from '../config/index.js';

const sessionSet = session({
    secret: config.authPass,
    resave: false,
});

export default sessionSet;