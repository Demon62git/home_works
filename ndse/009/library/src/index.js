import express from 'express';
import { logger, err404 } from './middleware/index.js';
import router from './routes/index.js';


const port = process.env.PORT || 3004;
const app = express();

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.json());

app.use(logger);
app.use(router);
app.use(err404);

app.listen(port, () => console.log(`Ручки можно проверить на http://localhost:${port}`));
    