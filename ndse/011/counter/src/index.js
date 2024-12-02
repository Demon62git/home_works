import express from 'express';
import redis from 'redis';

const port = process.env.PORT || 3003;
const app = express();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:3005'; //стандартный порт redis
// инициализация
console.log(redisUrl);
const client = redis.createClient({ url: redisUrl });
 
// подключение к нему тоже асинхронно
// самовызываемая асинхронная функция, т.к. redis работает асинхронно
(async () => await client.connect())()

// увеличить счётчик
app.post('/counter/:bookId/incr', async (req, res) => {
  try {
    const count = await client.incr(req.params.bookId);
    res.json({ count });
  } catch (error) {
    res.json({ code: 500, message: `Ошибка redis: ${error}` });
  }
});

// получить значение счётчика
app.get('/counter/:bookId', async (req, res) => {
  try {
    const count = await client.get(req.params.bookId) || 0;
    res.json({ count });
  } catch (error) {
    res.json({ code: 500, message: `Ошибка redis: ${error}` });
  }
});

try {
app.listen(port, () => console.log(`Приложение счётчика работает на порту ${port}`));
} catch (err){
    console.log(err);
}