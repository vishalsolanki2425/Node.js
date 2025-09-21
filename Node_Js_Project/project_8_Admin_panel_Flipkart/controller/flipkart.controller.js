const Product = require("../models/product.models");
const Category = require("../models/category.model");

exports.flipkartpage = async (req, res) => {
    try {
        let products = await Product.find().populate("categoryname").populate("subcategoryname").populate("extracategoryname");
        res.render("flipkart/homepage", { products });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.singleviewpage = async (req, res) => {
    try {
        let categories = await Category.find();
        let products = await Product.findById(req.params.id).populate("categoryname").populate("subcategoryname").populate("extracategoryname");
        res.render("flipkart/singleviewpage", { products, categories });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};