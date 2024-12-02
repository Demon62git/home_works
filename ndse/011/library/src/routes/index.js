import express from 'express';
import db from './db/index.js';
import view from './view.js';

const router = express.Router();

router.use('/api', db);
router.use(view);

export default router;