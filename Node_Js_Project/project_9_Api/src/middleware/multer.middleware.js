const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let imagepath;

        switch (req.body.role) {
            case "Admin":
                imagepath = "src/uploads/AdminImages"
                break;
            case "Manager":
                imagepath = "src/uploads/ManagerImages"
                break;
            case "Employee":
                imagepath = "src/uploads/EmployeeImages"
                break;
        }
        cb(null, imagepath);
    },
    filename: (req, file, cb) => {
        cb(null, `IMG-${Date.now()}`);
    }
})

const uploadImage = multer({ storage: storage });
module.exports = uploadImage;