import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const fileName = `${req.body.fileName} - ${new Date().toLocaleDateString()}`;
        cb(null, fileName);
    }
});

const multerStorage = multer({ storage })

export { multerStorage as multer } ;