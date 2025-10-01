const express = require("express");
const uploadImage = require("../middleware/multer.middleware");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");
const { userDelete, userEdit, userviewall } = require("../controller/common.controller");
const { registerUser } = require("../controller/auth.controller");

const routes = express.Router();

routes.post("/employeeadd", verifytoken, Roleverify("Admin", "Manager"), uploadImage.single("profileImage"), registerUser);
routes.put("/employeeedit/:id", verifytoken, uploadImage.single("profileImage"), userEdit);
routes.put("/employeedelete/:id", verifytoken, userDelete);
routes.get("/viewallemployee", verifytoken, Roleverify("Employee"), userviewall);

module.exports = routes;