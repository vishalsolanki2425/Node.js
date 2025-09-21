const multer = require("multer");
const path = require("path")


const imgUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/product")
    },
    filename: (req, file, cb) => {
        cb(null, `IMG-${Date.now()}`)
    }
})

const productImage = multer({storage : imgUpload});
module.exports = productImage;