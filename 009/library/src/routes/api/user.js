import express from 'express';
import Store from '../../model/store.js';

const router = express.Router();

// авторизация пользователя	метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }
router.post('/login', (req, res) => {
    res = Store.login();
});	

export default router;