const express = require("express");
const { addsubCategory, postaddsubCategory, deleteSubCategory, editSubCategory, posteditSubCategory, viewSubCategory, getAllSubCategoies } = require("../controller/subcategory.controller");
const subcategoryroute = express.Router();

subcategoryroute.get("/addsubCategory", addsubCategory);
subcategoryroute.post("/addsubCategory", postaddsubCategory);
subcategoryroute.get("/viewsubCategory", viewSubCategory);
subcategoryroute.get("/editsubCategory/:id", editSubCategory);
subcategoryroute.post("/editsubCategory/:id", posteditSubCategory);
subcategoryroute.get("/deletesubCategory/:id", deleteSubCategory);
subcategoryroute.get("/getAllSubCategory", getAllSubCategoies);

module.exports = subcategoryroute;