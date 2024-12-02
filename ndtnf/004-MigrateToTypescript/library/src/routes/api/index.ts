import express from 'express';
import user from './user.js';
import books from './books.js';

const router = express.Router();

router.use('/user', user);
router.use('/books', books);

export default router;