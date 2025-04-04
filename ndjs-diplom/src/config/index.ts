import * as configDotenv from 'dotenv';
configDotenv.config();

import auth from './auth';
import settings from './settings';

const config = {
  auth,
  settings,
};

export default config;
