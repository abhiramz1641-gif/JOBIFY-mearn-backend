// import multer
const multer = require("multer");

// create disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./resumes");  // folder to save resumes
    },
    filename: (req, file, cb) => {
        cb(null, `resume-${file.originalname}`);
    }
});

// file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error("Only PDF files are allowed for resume upload"));
    }
};

const resumeUpload = multer({
    storage,
    fileFilter
});

module.exports = resumeUpload;
