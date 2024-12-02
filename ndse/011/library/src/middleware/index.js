import path from 'path';
import fs from 'fs';
import os from 'os';
import multer from 'multer';

const logger = (req, res, next) => {
  const data = `${new Date().toLocaleString()} - ${req.method} - ${req.url}`;
  fs.appendFile(
    path.join('src','log', 'server.log'),
    data + os.EOL,
    (error) => {
      if (error) throw error
    });

  next();
}

const err404 = (req, res) => {
  res.status(404);
  res.json('404 | страница не найдена');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const fileName = `${req.body.fileName} - ${new Date().toLocaleDateString()}`;
      cb(null, fileName);
    }
  });

const insMulter = multer({ storage });

export { insMulter, err404, logger };