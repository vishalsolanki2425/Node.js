const express = require("express");
const { addCategory, viewCategory, postaddCategory, deleteCategory, editCategory, posteditCategory } = require("../controller/category.controller");
const userImage = require("../middleware/image.middleware");
const categoryroute = express.Router();

categoryroute.get("/addCategory", addCategory);
categoryroute.post("/addCategory", userImage.single("categoryimage"), postaddCategory);
categoryroute.get("/viewCategory", viewCategory);
categoryroute.get("/editCategory/:id", editCategory);
categoryroute.post("/editCategory/:id", userImage.single("categoryimage"), posteditCategory);
categoryroute.get("/deleteCategory/:id", deleteCategory);

module.exports = categoryroute;