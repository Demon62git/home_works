import { configDotenv } from 'dotenv';

const config = { 
    appPort: process.env.PORT || 3004,
    dbConnectionUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/advertisement',
    authPass: process.env.AUTH_PASS || 'SECRET',
    storage: process.env.STORAGE || 'uploads',
}

export default config;