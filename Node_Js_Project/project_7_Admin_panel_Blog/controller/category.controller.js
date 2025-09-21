const Category = require("../models/category.model");
const fs = require("fs");
const path = require("path");

exports.addCategory = (req, res) => {
    try {
        res.render("category/addCategory");
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.postaddCategory = async (req, res) => {
    try {
        let categoryExist = await Category.findOne({ categoryname: req.body.categoryname });
        if (categoryExist) {
            if (req.file) {
                let imagePath = path.join(__dirname, "..", "uploads", req.file.filename);
                if (imagePath) {
                    fs.unlinkSync(imagePath);
                }
            }
            req.flash("warning", "Category Already Exist");
            return res.redirect("/category/addcategory");
        }
        let imagepath = '';
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        let newCategory = await Category.create({
            ...req.body,
            categoryimage: imagepath,
        });

        if (newCategory) {
            req.flash("success", "Category Added Successfully!!!");
            return res.redirect("/category/viewCategory");
        } else {
            req.flash("error", "Category Not Added.");
            return res.redirect("/category/addcategory");
        }
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.viewCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        res.render("category/viewCategory", { categories });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let category = await Category.findById(id);
        if (!category) {
            req.flash("error", "Category Not Found");
            return res.redirect("/category/viewCategory");
        }
        if (category.categoryimage) {
            let imagePath = path.join(__dirname, "..", category.categoryimage);
            if (imagePath) {
                fs.unlinkSync(imagePath);
            }
        }

        await Category.findByIdAndDelete(id);
        req.flash("success", "Category Deleted Successfully!!!");
        return res.redirect("/category/viewCategory");
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.editCategory = async (req, res) => {
    try {
        let categoryedit = await Category.findById(req.params.id);
        if (!categoryedit) {
            return res.redirect("/");
        }
        return res.render("category/editCategory", { categories: categoryedit });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.posteditCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            req.flash("error", "Category not found");
            return res.redirect("/category/viewCategory");
        }
        category.categoryname = req.body.categoryname;
        if (req.file) {
            if (category.categoryimage) {
                let oldPath = path.join(__dirname, "..", category.categoryimage);
                if (oldPath) {
                    fs.unlinkSync(oldPath);
                }
            }
            category.categoryimage = `/uploads/${req.file.filename}`;
        }
        await category.save();
        req.flash("success", "Category Updated Successfully!");
        return res.redirect("/category/viewCategory");
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};