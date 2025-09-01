const blogSchema = require("../models/blog.models");
const userSchema = require("../models/user.models");
const fs = require("fs");
const path = require("path");

exports.myblog = async (req, res) => {
    try {
        let user = req.user;
        let blogs = await blogSchema.find({ authorid: user._id })
        return res.render("myblog", { user, blogs });
    }
    catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
}

exports.Addblog = async (req, res) => {
    try {
        let user = req.user;
        return res.render("Addblog", { user });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.viewallblog = async (req, res) => {
    try {
        let user = req.user;
        let filter = {};
        let category = req.query.category || "";

        if (category !== "") {
            filter.category = category;
        }
        let blogs = await blogSchema.find(filter);
        return res.render("viewallblog", { user, blogs, category });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};


exports.addBlog = async (req, res) => {
    try {
        let user = req.user;
        let blogImg = req.file ? "/uploads/" + req.file.filename : "";
        const newBlog = new blogSchema({
            ...req.body,
            authname: user.firstname + " " + user.lastname,
            blogimage: blogImg,
            authorid: user._id,
        });

        await newBlog.save();

        return res.redirect("/blog/viewallblog");
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.editblog = async (req, res) => {
    try {
        let user = req.user;
        let id = req.params.id;
        let blog = await blogSchema.findById(id);
        return res.render("editblog", { user, blog });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
}

exports.editBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await blogSchema.findById(id);
        if (!blog) {
            return res.redirect("back");
        }
        let blogpath = blog.blogimage;
        if (req.file) {
            if (blog.blogimage) {
                let oldPath = path.join(__dirname, "..", blog.blogimage);
                if (oldPath) {
                    fs.unlinkSync(oldPath);
                }
            }
            blogpath = `/uploads/${req.file.filename}`;
        }
        await blogSchema.findByIdAndUpdate(id, { ...req.body, blogimage: blogpath }, { new: true });

        console.log("Blog Updated Successfully");
        res.redirect('/blog/myblog');
    } catch (err) {
        console.error(err);
        res.redirect("back");
    }
};

exports.blogdelete = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await blogSchema.findById(id);
        if (blog.blogimage) {
            let blogpath = path.join(__dirname, '..', blog.blogimage)
            if (blogpath != "") {
                await fs.unlinkSync(blogpath);
            }
            await blogSchema.findByIdAndDelete(id)
            console.log("users Delete Successfully")
            res.redirect("/blog/myblog")
        }
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.singleblogview = async (req, res) => {
    try {
        let id = req.params.id;
        let blogs = await blogSchema.findById(id);
        let user = req.user;
        res.render("singleblogview", { user, blogs })
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
}