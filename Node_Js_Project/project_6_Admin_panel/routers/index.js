const express = require("express");
const { dashboard, getlogin, postlogin, logOut } = require("../controller/dashboard.controller");
const usersrouter = require("./user.route");
const blogroute = require("./blog.route");
const router = express.Router();

router.get("/", getlogin);
router.post("/loginUser", postlogin);
router.get("/logOut", logOut);
router.get("/dashboard", dashboard);
router.use("/users", usersrouter);
router.use("/blog", blogroute);

module.exports = router;