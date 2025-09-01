const blogSchema = require("../models/blog.models");
const User = require("../models/webUser.model");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

exports.homepage = async (req, res) => {
    try {
        let blogs = await blogSchema.find();
        res.render("web/home", { blogs });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.loginpage = (req, res) => {
    try {
        res.render("web/loginpage");
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.postloginpage = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/web/dashboard",
        failureRedirect: "/web/register",
        failureFlash: true
    })(req, res, next);
};

exports.registerpage = (req, res) => {
    try {
        res.render("web/register");
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.postregisterpage = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            req.flash("error", "Email already registered!");
            return res.redirect("/web/register");
        }

        user = new User({ name, email, password });
        await user.save();

        req.flash("success", "Registered successfully. Please login.");
        res.redirect("/web/login");
    } catch (err) {
        console.log(err);
        res.redirect("/web/register");
    }
};

exports.singleblogpage = async (req, res) => {
    try {
        let id = req.params.id;
        let blogs = await blogSchema.findById(id);
        res.render("web/singleblog", { blogs });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }

};
exports.contactpage = (req, res) => {
    try {
        res.render("web/contact");
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};