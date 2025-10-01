const express = require("express");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");
const { userprofile, userDelete, userEdit, userviewall } = require("../controller/common.controller");
const uploadImage = require("../middleware/multer.middleware");

const routes = express.Router();

routes.get("/userprofile", verifytoken, Roleverify("Admin"), userprofile);
// routes.put("/userdelete/:id", verifytoken, Roleverify("Admin"), userDelete);
routes.put("/useredit/:id", verifytoken, Roleverify("Admin"), uploadImage.single("profileImage"), userEdit);
routes.get("/userviewall", verifytoken, Roleverify("Admin"), userviewall);

module.exports = routes;