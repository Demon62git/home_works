import express from 'express';
import books from './books.js';
import user from './user.js';

const router = express.Router();

router.use('/user', user);
router.use('/books', books);

export default router;