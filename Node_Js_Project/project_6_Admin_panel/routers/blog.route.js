const express = require("express");
const { Addblog, viewallblog, addBlog, myblog, blogdelete, editblog, editBlog, singleblogview } = require("../controller/blog.controller");
const blogroute = express.Router();
const userImage = require("../middleware/image.middleware")

blogroute.get("/Addblog", Addblog);
blogroute.post("/Addblog", userImage.single("blogimage"), addBlog);
blogroute.get("/viewAllblog", viewallblog);
blogroute.get("/myblog", myblog);
blogroute.get("/editblog/:id", editblog);
blogroute.post("/editblog/:id", userImage.single("blogimage"), editBlog);
blogroute.get("/blogdelete/:id", blogdelete);
blogroute.get("/singleblogview/:id", singleblogview);

module.exports = blogroute;