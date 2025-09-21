const express = require("express");
const { getaddproduct, postaddproduct, viewproduct, editproduct, posteditproduct, deleteproduct, singleproductview, getSubcategoriesByCategory, getExtraCategoriesByCategory } = require("../controller/product.controller");
const productImage = require("../middleware/product.middleware");
const productroute = express.Router();

productroute.get("/addproduct", getaddproduct);
productroute.post("/addproduct", productImage.single("productimage"), postaddproduct);
productroute.get("/viewproduct", viewproduct);
productroute.get("/editproduct/:id", productImage.single("productimage"), editproduct);
productroute.post("/editproduct/:id", productImage.single("productimage"), posteditproduct);
productroute.get("/deleteproduct/:id", deleteproduct);
productroute.get("/singleproductview/:id", singleproductview);
productroute.get("/getSubcategories", getSubcategoriesByCategory);
productroute.get("/getExtraCategories", getExtraCategoriesByCategory);

module.exports = productroute;