const userSchema = require("../models/user.models")
const fs = require("fs");
const path = require("path")

exports.addusers = async (req, res) => {
    try {
        return res.render("addusers", { user: req.user });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.viewallusers = async (req, res) => {
    try {
        let users = await userSchema.find();
        return res.render("viewallusers", { users, user: req.user });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }

};

exports.addUser = async (req, res) => {
    try {
        let userImg = req.file ? "/uploads/" + req.file.filename : "";
        await userSchema.create({ ...req.body, image: userImg });
        console.log("Create Successfully");
        req.flash("success", "New User Added.");
        res.redirect('/users/viewallusers');
    } catch (error) {
        console.log("error", error);
    }
}

exports.editUser = async (req, res) => {
    try {
        let userEdit = await userSchema.findById(req.params.id);
        if (!userEdit) {
            return res.redirect("/");
        }
        return res.render("editusers", { user: req.user });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
}

exports.posteditUser = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await userSchema.findById(id);
        if (!user) {
            return res.redirect("back");
        }
        let userpath = user.image;
        if (req.file) {
            if (user.image) {
                let oldPath = path.join(__dirname, "..", user.image);
                fs.unlinkSync(oldPath);
            }
            userpath = `/uploads/${req.file.filename}`;
        }
        await userSchema.findByIdAndUpdate(id, { ...req.body, image: userpath, new: true });

        console.log("Update Successfully");
        req.flash("success", "User Update Successfully.");
        res.redirect('/users/viewAllusers');
    } catch (err) {
        console.error(err);
        res.redirect("back");
    }
};

exports.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let userstore = await userSchema.findById(id);
        if (userstore.image) {
            let userpath = path.join(__dirname, '..', userstore.image)
            if (userpath != "") {
                await fs.unlinkSync(userpath)
            }
            await userSchema.findByIdAndDelete(id)
            console.log("users Delete Successfully")
            req.flash("success", "users Delete Successfully.");
            res.redirect("/users/viewAllusers")
        }
    } catch (error) {
        console.log("error", error);
    }
}

exports.userprofile = async (req, res) => {
    try {
        const id = req.user;
        const user = await userSchema.findById(id);
        if (!user) {
            return res.redirect("/");
        }
        return res.render("profile", { user });
    } catch (error) {
        console.log("viewProfile error:", error);
        return res.redirect("/");
    }
}