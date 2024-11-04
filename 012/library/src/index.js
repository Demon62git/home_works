import express from 'express';
import { middleware } from './middleware/index.js';
import router from './routes/index.js';
import config from './config/index.js';
import db from './services/db.service.js';
import passport from './services/passport.service.js';

const port = config.appPort;
const app = express();

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(middleware.sessionSet);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded());
app.use(express.json());
app.use(middleware.logger);
app.use(router);
app.use(middleware.err404);

await db.connect();
app.listen(port, () => console.log(`Ручки можно проверить на http://localhost:${port}`));
    