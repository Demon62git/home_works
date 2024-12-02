import express from 'express';
import { logger, err404 } from './middleware/index.js';
import { router } from './routes/index.js';
import { viewRouter } from './routes/view.js';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(logger);
app.use('/', viewRouter);
app.use(err404);
app.use(express.json());
app.listen(port, () => console.log(`Ручки можно проверить на http://localhost:${port}`));
    