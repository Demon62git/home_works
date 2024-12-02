import express from 'express';
import api from './api/index.js';
import view from './view/index.js';
import main from './main.js';

const router = express.Router();

router.use('/api', api);
router.use('/view', view);
router.use('/', main);

export default router;