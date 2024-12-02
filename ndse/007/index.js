import express from 'express';
import { logger, err404 } from './middleware/index.js';
import { router } from './routes/index.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(logger);
app.use('/api', router);
app.use(err404);
app.use(express.json());
app.listen(port, () => console.log(`Ручки можно проверить на http://localhost:${port}`));
    