const express = require("express");
const { addextraCategory, postaddextraCategory, viewextraCategory, editextraCategory, deleteextraCategory, posteditextraCategory, getAllExctraCategories } = require("../controller/extracategory.controller");
const extracategoryroute = express.Router();

extracategoryroute.get("/addextraCategory", addextraCategory);
extracategoryroute.post("/addextraCategory", postaddextraCategory);
extracategoryroute.get("/viewextraCategory", viewextraCategory);
extracategoryroute.get("/editextraCategory/:id", editextraCategory);
extracategoryroute.post("/editextraCategory/:id", posteditextraCategory);
extracategoryroute.get("/deleteextraCategory/:id", deleteextraCategory);
extracategoryroute.get("/getAllExctraCategories", getAllExctraCategories);

module.exports = extracategoryroute;