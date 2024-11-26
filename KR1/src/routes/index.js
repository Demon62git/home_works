import express from 'express';
import config from '../config/index.js';
import apiRoute from './api/index.js';
import { err404 } from '../middleware/index.js';

const router = express.Router();

router.use(express.static(config.storage));
router.use('/api', apiRoute);
router.use(err404);

export default router;