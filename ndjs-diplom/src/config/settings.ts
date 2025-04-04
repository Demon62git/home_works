const settings = {
  appPort: process.env.PORT || 8080,
  dbConnectionUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/hotel',
  storage: process.env.STORAGE || 'uploads',
};

export default settings;
