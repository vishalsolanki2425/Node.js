const userSchema = require("../models/user.models")

exports.dashboard = async (req, res) => {
    try {
        if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.redirect("/");
        } else {
            let user = await userSchema.findById(req.cookies.admin._id);
            return res.render("dashboard", { user });
        }
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.getlogin = (req, res) => {
    try {
        if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
            return res.render("login");
        } else {
            return res.redirect("/dashboard");
        }
    } catch (error) {
        console.log("error", error);
        res.redirect("/");
    }
};

exports.postlogin = async (req, res) => {
    try {
        let user = await userSchema.findOne({ email: req.body.email });
        if (user) {
            if (user.password == req.body.password) {
                res.cookie("admin", user);
                return res.redirect("/dashboard", { user });
            } else {
                console.log("user credential worng");
                res.redirect("/");
            }
        }
    } catch (error) {
        console.log("error", error);
        res.redirect("/");
    }
}

exports.logOut = async (req, res) => {
    try {
        res.clearCookie("admin");
        return res.redirect("/");
    } catch (error) {
        console.log("error", error);
        res.redirect("/dashboard");
    }
}