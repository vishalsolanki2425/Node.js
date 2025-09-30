const express = require("express");
const uploadImage = require("../middleware/multer.middleware");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");
const { userDelete, userEdit, userprofile } = require("../controller/common.controller");
const { registerUser } = require("../controller/auth.controller");

const routes = express.Router();

routes.post("/employeeadd", verifytoken, Roleverify("Admin", "Manager"), uploadImage.single("profileImage"), registerUser);
routes.put("/employeeedit", verifytoken, uploadImage.single("profileImage"), userEdit);
routes.put("/employeedelete", verifytoken, userDelete);
routes.get("/employeeprofile", verifytoken, Roleverify("Admin", "Manager","Employee"), userprofile);

module.exports = routes;