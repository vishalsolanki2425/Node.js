const express = require("express");
const { dashboard, getlogin, postlogin, logOut, forgotPassword, sendEmail, verifyOTP, resetPassword, resetpassword } = require("../controller/dashboard.controller");
const usersrouter = require("./user.route");
const blogroute = require("./blog.route");
const router = express.Router();

router.get("/", getlogin);
router.post("/loginUser", postlogin);
router.get("/logOut", logOut);
router.get("/dashboard", dashboard);
router.use("/users", usersrouter);
router.use("/blog", blogroute);

router.get("/forgot-password", forgotPassword);
router.post("/send-email", sendEmail);
router.post("/verify-otp", verifyOTP);
router.get("/resetPassword", resetpassword);
router.post("/reset-password", resetPassword);

module.exports = router;