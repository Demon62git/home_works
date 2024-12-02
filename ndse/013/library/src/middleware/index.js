import err404 from './error.js';
import logger from './logger.js';
import multer from './multer.js';
import sessionSet from './session.js';
import userAuth from './userAuth.js';

export const middleware = 
  { err404, logger, multer, sessionSet, userAuth };