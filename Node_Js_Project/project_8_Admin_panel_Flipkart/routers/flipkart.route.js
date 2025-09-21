const express = require("express");
const { flipkartpage, singleviewpage } = require("../controller/flipkart.controller");
const flipkartrouter = express.Router();

flipkartrouter.get("/", flipkartpage);
flipkartrouter.get("/singleview/:id", singleviewpage);

module.exports = flipkartrouter;