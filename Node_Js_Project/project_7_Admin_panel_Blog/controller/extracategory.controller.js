const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.models");
const Extracategory = require("../models/extracategory.models")

exports.addextraCategory = async (req, res) => {
    try {
        let categories = await Category.find();
        let subcategories = await Subcategory.find();
        return res.render("extracategory/addextraCategory", { categories, subcategories });
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.postaddextraCategory = async (req, res) => {
    try {
        let subCatExist = await Extracategory.findOne({ extracategoryname: req.body.extracategoryname });
        if (subCatExist) {
            req.flash('warning', 'ExtraCategory Already Exist');
            return res.redirect("/extracategory/addextraCategory");
        }
        let newCategory = await Extracategory.create(req.body);
        if (newCategory) {
            req.flash('success', 'Extracategory Added Successfully');
            return res.redirect("/extracategory/viewextraCategory");
        } else {
            req.flash('error', 'Extracategory not Added');
            return res.redirect("/extracategory/addextraCategory");
        }
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.viewextraCategory = async (req, res) => {
    try {
        let extracategory = await Extracategory.find().populate("subcategoryname").populate("categoryname");
        return res.render("extracategory/viewextraCategory", { extracategory });
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.editextraCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let extracategory = await Extracategory.findById(id);
        let category = await Category.find();
        let subcategories = await Subcategory.find();
        return res.render("extracategory/editextraCategory", { extracategory, category, subcategories });
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.posteditextraCategory = async (req, res) => {
    try {
        const { categoryname, subcategoryname, extracategoryname } = req.body;
        const { id } = req.params;

        await Extracategory.findByIdAndUpdate(id, {
            categoryname,
            subcategoryname,
            extracategoryname
        });

        req.flash("success", "Extra Category updated successfully");
        return res.redirect("/extracategory/viewextracategory");
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};

exports.deleteextraCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let extracategory = await Extracategory.findById(id);
        if (!extracategory) {
            req.flash("error", "Extra Category not found!");
            return res.redirect("/extracategory/viewextraCategory");
        }
        await Extracategory.findByIdAndDelete(id);
        req.flash("success", "Extra Category deleted successfully!");
        return res.redirect("/extracategory/viewextraCategory");
    } catch (error) {
        console.log(error);
        req.flash("error", "Server Error");
        return res.redirect("/");
    }
};