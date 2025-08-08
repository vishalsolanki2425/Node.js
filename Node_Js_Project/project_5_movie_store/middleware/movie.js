const multer = require('multer');
const path = require('path');

const images = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `IMG-${ Date.now()}`);
    }
});

const imageUploads = multer({ storage: images });
module.exports = imageUploads;
