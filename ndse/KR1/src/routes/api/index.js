import express from 'express';
import advertisementRoute from './advertisement.route.js';
import chatRoute from './chat.route.js';
import userRoute from './user.route.js';

const router = express.Router();

router.use('/advertisements', advertisementRoute);
router.use('/chat', chatRoute);
router.use('/user', userRoute);


export default router;