import express from 'express';
import api from './api';
import view from './view';
import { mainRouter } from './main';
import { err404 } from '../middleware';

const router = express.Router();

router.use('/api', api);
router.use('/view', view);
router.use('/', mainRouter);
router.use(err404);

export { router };