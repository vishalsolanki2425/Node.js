const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.models");

exports.addsubCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        res.render("subcategory/addsubCategory", { categories });
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.postaddsubCategory = async (req, res) => {
    try {
        let subCatExist = await Subcategory.findOne({ subcategoryname: req.body.subcategoryname });
        if (subCatExist) {
            req.flash('warning', 'SubCategory Already Exist');
            return res.redirect("/subcategory/addsubCategory");
        }

        let newCategory = await Subcategory.create(req.body);

        if (newCategory) {
            req.flash('success', 'Subcategory Added Successfully');
            return res.redirect("/subcategory/viewsubCategory");
        } else {
            req.flash('error', 'Subcategory not Added');
            return res.redirect("/subcategory/addsubCategory");
        }
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.viewSubCategory = async (req, res) => {
    try {
        let subcategories = await Subcategory.find().populate("categoryname");
        return res.render("subcategory/viewsubCategory", { subcategories });
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.editSubCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let subcategories = await Subcategory.findById(id);
        let categories = await Category.find();
        return res.render("subcategory/editsubCategory", { subcategories, categories });
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.posteditSubCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let subcat = await Subcategory.findById(id);
        if (!subcat) {
            req.flash("error", "SubCategory not found!");
            return res.redirect("/subcategory/viewsubCategory");
        }

        subcat.subcategoryname = req.body.subcategoryname;
        subcat.category = req.body.category;
        subcat.categoryimage = req.body.categoryimage;

        await subcat.save();

        req.flash("success", "SubCategory updated successfully!");
        return res.redirect("/subcategory/viewsubCategory");
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.deleteSubCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let subcat = await Subcategory.findById(id);
        if (!subcat) {
            req.flash("error", "SubCategory not found!");
            return res.redirect("/subcategory/viewsubCategory");
        }
        await Subcategory.findByIdAndDelete(id);
        req.flash("success", "SubCategory deleted successfully!");
        return res.redirect("/subcategory/viewsubCategory");
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.getAllSubCategoies = async (req, res) => {
    try {
        let categories = await Subcategory.find({ category: req.query.categoryId })
        console.log("Data: ",categories);
        return res.json({ categories, message: "All SubCategory Fetchd!!!" });
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};