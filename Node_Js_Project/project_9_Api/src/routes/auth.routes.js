const express = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller");
const uploadImage = require("../middleware/multer.middleware");
const { verifytoken } = require("../middleware/verifytoken.middleware");
const { userprofile } = require("../controller/common.controller");

const routes = express.Router();

routes.post("/registerUser", uploadImage.single("profileImage"), registerUser);
routes.post("/loginUser", loginUser);
routes.get("/profile", verifytoken, userprofile);

module.exports = routes;