import multer from 'multer';
import config from '../config/index.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.storage);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export default multer({ storage });