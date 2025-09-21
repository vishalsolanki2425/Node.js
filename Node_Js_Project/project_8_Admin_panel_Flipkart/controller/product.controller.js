const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.models");
const ExtraCategory = require("../models/extracategory.models");
const Product = require("../models/product.models");
const fs = require("fs");
const path = require("path");

exports.getaddproduct = async (req, res) => {
    try {
        let category = await Category.find();
        let subcategory = await Subcategory.find();
        let extracategory = await ExtraCategory.find();
        return res.render("product/AddProduct", { category, subcategory, extracategory });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.postaddproduct = async (req, res) => {
    try {
        let imagepath = '';
        if (req.file) { imagepath = `/uploads/product/${req.file.filename}`; }

        let existProduct = await Product.findOne({ name: req.body.name });
        if (existProduct) {
            req.flash("warning", "Product is already exists!");
            return res.redirect("/product/addproduct");
        }

        let newproduct = await Product.create({ ...req.body, productimage: imagepath, });

        if (newproduct) {
            req.flash("success", "Product Added Successfully!!!");
            return res.redirect("/product/viewproduct");
        } else {
            req.flash("error", "Product Not Added.");
            return res.redirect("/product/addproduct");
        }
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.viewproduct = async (req, res) => {
    try {
        let search = req.query.search || "";
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                ]
            };
        }
        let product = await Product.find(query).populate("categoryname").populate("subcategoryname").populate("extracategoryname");
        return res.render("product/viewproduct", { product, search });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.editproduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).populate("categoryname").populate("subcategoryname").populate("extracategoryname");
        let categories = await Category.find();
        let subcategories = await Subcategory.find();
        let extracategories = await ExtraCategory.find();
        return res.render("product/editproduct", { product, categories, subcategories, extracategories });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.posteditproduct = async (req, res) => {
    try {
        let id = req.params.id;
        let oldProduct = await Product.findById(id);
        if (req.file) {
            if (oldProduct.productimage) {
                let oldPath = path.join(__dirname, "..", oldProduct.productimage);
                if (oldPath) {
                    fs.unlinkSync(oldPath);
                }
            }
            req.body.productimage = "/uploads/product/" + req.file.filename;
        }
        await Product.findByIdAndUpdate(id, { ...req.body });

        req.flash("success", "Product updated successfully");
        return res.redirect("/product/viewproduct");
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.deleteproduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            req.flash("error", "Product not found");
            return res.redirect("/product/viewproduct");
        }

        if (product.productimage) {
            let imagePath = product.productimage.includes("uploads")
                ? path.join(__dirname, "..", product.productimage)
                : path.join(__dirname, "..", "uploads", "product", product.productimage);

            if (imagePath) {
                fs.unlinkSync(imagePath);
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        req.flash("success", "Product deleted successfully");
        return res.redirect("/product/viewproduct");
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.singleproductview = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).populate("categoryname").populate("subcategoryname").populate("extracategoryname");
        let categories = await Category.find();
        let subcategories = await Subcategory.find();
        let extracategories = await ExtraCategory.find();
        return res.render("product/singleproductview", { product, categories, subcategories, extracategories });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.getSubcategoriesByCategory = async (req, res) => {
    try {
        let subcategories = await Subcategory.find({ categoryname: req.query.categoryId });
        return res.json({ subcategories });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

// API: Get Extra Categories by Category
exports.getExtraCategoriesByCategory = async (req, res) => {
    try {
        let extracategories = await ExtraCategory.find({ categoryname: req.query.categoryId });
        return res.json({ extracategories });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};