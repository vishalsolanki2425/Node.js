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
        let id = req.params.id;
        let single = await User.findById(id);

        if (req.user.id === single.id && req.user.id === single.id) {
            return res.json({ status: 403, message: "Admin Cannot Delete" });
        }

        if ((req.user.id === single.id) || (req.user.role === "Admin") || (single.role === "Employee" && req.user.role === "Manager")) {
            await User.findByIdAndUpdate(id, { isDelete: true });
            return res.json({ status: 200, message: " Delete successfully" });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};

exports.userEdit = async (req, res) => {
    try {
        let userId = req.params.id;
        let singleUser = await User.findById(userId);
        let imagePath = singleUser.profileImage;

        if ((req.user.role === "Admin" && singleUser.role === "Admin") && (req.user.id != singleUser.id)) {
            return res.json({ status: 403, message: "Admin Cannot Edit Anohther Admin" });
        }

        if ((req.user.id === singleUser.id) || (req.user.role === "Admin") || (singleUser.role === "Employee" && req.user.role === "Manager")) {
            if (req.file) {
                let oldImage = singleUser.profileImage;

                if (oldImage && oldImage !== "") {
                    let oldImagepath = path.join(__dirname, "..", oldImage.replace(/^\//, ""));
                    console.log("Trying to delete:", oldImagepath);

                    try {
                        fs.unlinkSync(oldImagepath);
                    } catch (error) {
                        console.log("Old image not found or already deleted");
                    }
                }

                imagePath = `uploads/${req.body.role}-Images/${req.file.filename}`;
            }


            let hashPassword = await bcrypt.hash(req.body.password, 10)

            await User.findByIdAndUpdate(
                userId,
                {
                    ...req.body,
                    profileImage: imagePath,
                    password: hashPassword
                },
                { new: true }
            );

            return res.json({ status: 200, message: "User Edited Successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};

exports.userviewall = async (req, res) => {
    try {
        if (req.user.role == "Admin") {
            let viewAll = await User.find();
            return res.json({ status: 200, users: viewAll, message: "Users fetched successfully" });
        }
        if (req.user.role == "Manager") {
            let viewAll = await User.find({ role: { $nin: ["Admin"] } });
            return res.json({ status: 200, users: viewAll, message: "Users fetched successfully" });
        }
        if (req.user.role == "Employee") {
            let viewAll = await User.find({ role: "Employee"});
            return res.json({ status: 200, users: viewAll, message: "Users fetched successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Server Error' });
    }
};