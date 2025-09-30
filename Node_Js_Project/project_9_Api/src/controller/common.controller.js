const User = require("../models/usermodels");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

exports.userprofile = async (req, res) => {
    try {
        console.log("user profile run");
        return res.json({ status: 200, message: 'Fetch Profile', data: req.user });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};

exports.userDelete = async (req, res) => {
    try {
        let id = req.user._id;
        let user = await User.findByIdAndUpdate(id, { isDelete: true });
        console.log(user);
        return res.json({ status: 200, user: req.user, message: " Delete successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};

exports.userEdit = async (req, res) => {
    try {
        let userId = req.user._id;
        let singleUser = await User.findById(userId);
        let imagePath = singleUser.profileImage;

        if (req.file) {
            let oldImage = singleUser.profileImage;

            if (oldImage && oldImage !== "") {
                let oldImagepath = path.join(__dirname, "..", oldImage.replace(/^\//, ""));
                console.log("Trying to delete:", oldImagepath);

                try {
                    fs.unlinkSync(oldImagepath);
                    console.log("Old Image Deleted Successfully");
                } catch (error) {
                    console.log("Old image not found or already deleted");
                }
            }

            imagePath = `uploads/${req.body.role}-Images/${req.file.filename}`;
        }


        let hashPassword = await bcrypt.hash(req.body.password, 10)

        let updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                profileImage: imagePath,
                password: hashPassword
            },
            { new: true }
        );

        console.log(updatedUser);
        return res.json({ status: 200, user: req.user, message: "User Edited Successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};

exports.userviewall = async (req, res) => {
    try {
        let viewAll = await User.find({ role: req.body.role });
        return res.json({ status: 200, allAdmin: viewAll, message: "view all Admin" });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};