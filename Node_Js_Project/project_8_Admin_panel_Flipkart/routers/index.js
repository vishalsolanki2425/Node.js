const express = require("express");
const { dashboard, getlogin, postlogin, logOut, forgotPassword, sendEmail, verifyOTP, resetpassword, resetPassword, otppage } = require("../controller/dashboard.controller");
const usersrouter = require("./user.route");
const blogroute = require("./blog.route");
const router = express.Router();
const passport = require('passport');
const categoryroute = require("./category.route");
const subcategoryroute = require("./subcategory.route");
const extracategoryroute = require("./extracategory.route");
const productroute = require("./product.route");

router.get("/", getlogin);
router.post("/loginUser", passport.authenticate('local', { failureRedirect: "/" }), postlogin);
router.get("/logOut", logOut);
router.get("/dashboard", passport.checkAuthentication, dashboard);
router.use("/users", usersrouter);
// router.use("/blog", blogroute);
router.use("/category", categoryroute);
router.use("/subcategory", subcategoryroute);
router.use("/extracategory", extracategoryroute);
router.use("/product", productroute);


router.get("/forgot-password", forgotPassword);
router.post("/send-email", sendEmail);
router.get("/verify-otp", otppage);
router.post("/verify-otp", verifyOTP);
router.get("/resetPassword", resetpassword);
router.post("/reset-password", resetPassword);


module.exports = router;