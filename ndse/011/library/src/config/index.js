import { configDotenv } from 'dotenv';

const config = { 
    appPort: process.env.PORT || 3004,
    dbConnectionUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/library',
    counterUrl: process.env.COUNTER_URL || "http://counter:3003",
}

export default config;