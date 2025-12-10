// import multer
const multer = require('multer');
const path = require('path');

// create disk Storage
const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, './uploads');  
    },

    filename: (req, file, callback) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        callback(null, uniqueName);
    }
});

// File filter (ONLY PDF)
const fileFilter = (req, file, callback) => {

    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === '.pdf') {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error('Only PDF files are allowed'));
    }
};

const multerConfig = multer({
    storage,
    fileFilter
});

module.exports = multerConfig;
