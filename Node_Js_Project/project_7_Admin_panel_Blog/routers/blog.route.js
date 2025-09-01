const express = require("express");
const { Addblog, viewallblog, addBlog, myblog, blogdelete, editblog, editBlog, singleblogview } = require("../controller/blog.controller");
const blogroute = express.Router();
const userImage = require("../middleware/image.middleware");
const passport = require("../middleware/LocalStrategy");

blogroute.get("/Addblog", passport.checkAuthentication, Addblog);
blogroute.post("/Addblog", userImage.single("blogimage"), addBlog);
blogroute.get("/viewAllblog", passport.checkAuthentication, viewallblog);
blogroute.get("/myblog", passport.checkAuthentication, myblog);
blogroute.get("/editblog/:id", passport.checkAuthentication, editblog);
blogroute.post("/editblog/:id", userImage.single("blogimage"), editBlog);
blogroute.get("/blogdelete/:id", passport.checkAuthentication, blogdelete);
blogroute.get("/singleblogview/:id", passport.checkAuthentication, singleblogview);

module.exports = blogroute;