const express = require("express");
const uploadImage = require("../middleware/multer.middleware");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");
const { userDelete, userEdit, userprofile } = require("../controller/common.controller");
const { registerUser } = require("../controller/auth.controller");

const routes = express.Router();

routes.post("/manageradd", verifytoken, Roleverify("Admin"), uploadImage.single("profileImage"), registerUser);
routes.put("/manageredit", verifytoken, Roleverify("Admin" , "Manager"), uploadImage.single("profileImage"), userEdit);
routes.put("/managerdelete", verifytoken, Roleverify("Admin", "Manager"), userDelete);
routes.get("/managerprofile", verifytoken, Roleverify("Admin", "Manager"), userprofile);

module.exports = routes;