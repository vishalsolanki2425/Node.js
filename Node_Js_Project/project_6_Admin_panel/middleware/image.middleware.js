const multer = require("multer");
const path = require("path")


const imgUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `IMG-${Date.now()}`)
    }
})

const userImage = multer({storage : imgUpload});
module.exports = userImage;