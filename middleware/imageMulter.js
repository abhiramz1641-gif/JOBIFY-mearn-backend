const multer = require('multer');
const path = require('path');

// Image storage
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

// filter
const imageFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' ) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only image files are allowed'));
    }
};

const imageMulter = multer({
    storage: imageStorage,
    fileFilter: imageFilter
});

module.exports = imageMulter;
